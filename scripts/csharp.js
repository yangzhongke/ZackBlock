/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helper functions for generating JavaScript for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

window.goog = {provide:function(){},require:function(){}};//polyfill

goog.provide('Blockly.CSharp');

goog.require('Blockly.Generator');
goog.require('Blockly.inputTypes');
goog.require('Blockly.utils.global');
goog.require('Blockly.utils.string');

/**
 * JavaScript code generator.
 * @type {!Blockly.Generator}
 */
Blockly.CSharp = new Blockly.Generator('CSharp');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.CSharp.addReservedWords(
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords
    'break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,new,return,super,switch,this,throw,try,typeof,var,void,while,with,yield,' +
    'enum,' +
    'implements,interface,let,package,private,protected,public,static,' +
    'await,' +
    'null,true,false,' +
    // Magic variable.
    'arguments,' +
    // Everything in the current environment (835 items in Chrome, 104 in Node).
    Object.getOwnPropertyNames(Blockly.utils.global).join(','));

/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/JavaScript/Reference/Operators/Operator_Precedence
 */
Blockly.CSharp.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.CSharp.ORDER_NEW = 1.1;            // new
Blockly.CSharp.ORDER_MEMBER = 1.2;         // . []
Blockly.CSharp.ORDER_FUNCTION_CALL = 2;    // ()
Blockly.CSharp.ORDER_INCREMENT = 3;        // ++
Blockly.CSharp.ORDER_DECREMENT = 3;        // --
Blockly.CSharp.ORDER_BITWISE_NOT = 4.1;    // ~
Blockly.CSharp.ORDER_UNARY_PLUS = 4.2;     // +
Blockly.CSharp.ORDER_UNARY_NEGATION = 4.3; // -
Blockly.CSharp.ORDER_LOGICAL_NOT = 4.4;    // !
Blockly.CSharp.ORDER_TYPEOF = 4.5;         // typeof
Blockly.CSharp.ORDER_VOID = 4.6;           // void
Blockly.CSharp.ORDER_DELETE = 4.7;         // delete
Blockly.CSharp.ORDER_AWAIT = 4.8;          // await
Blockly.CSharp.ORDER_EXPONENTIATION = 5.0; // **
Blockly.CSharp.ORDER_MULTIPLICATION = 5.1; // *
Blockly.CSharp.ORDER_DIVISION = 5.2;       // /
Blockly.CSharp.ORDER_MODULUS = 5.3;        // %
Blockly.CSharp.ORDER_SUBTRACTION = 6.1;    // -
Blockly.CSharp.ORDER_ADDITION = 6.2;       // +
Blockly.CSharp.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
Blockly.CSharp.ORDER_RELATIONAL = 8;       // < <= > >=
Blockly.CSharp.ORDER_IN = 8;               // in
Blockly.CSharp.ORDER_INSTANCEOF = 8;       // instanceof
Blockly.CSharp.ORDER_EQUALITY = 9;         // == != === !==
Blockly.CSharp.ORDER_BITWISE_AND = 10;     // &
Blockly.CSharp.ORDER_BITWISE_XOR = 11;     // ^
Blockly.CSharp.ORDER_BITWISE_OR = 12;      // |
Blockly.CSharp.ORDER_LOGICAL_AND = 13;     // &&
Blockly.CSharp.ORDER_LOGICAL_OR = 14;      // ||
Blockly.CSharp.ORDER_CONDITIONAL = 15;     // ?:
Blockly.CSharp.ORDER_ASSIGNMENT = 16;      // = += -= **= *= /= %= <<= >>= ...
Blockly.CSharp.ORDER_YIELD = 17;           // yield
Blockly.CSharp.ORDER_COMMA = 18;           // ,
Blockly.CSharp.ORDER_NONE = 99;            // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.CSharp.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.CSharp.ORDER_FUNCTION_CALL, Blockly.CSharp.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.CSharp.ORDER_FUNCTION_CALL, Blockly.CSharp.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.CSharp.ORDER_MEMBER, Blockly.CSharp.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.CSharp.ORDER_MEMBER, Blockly.CSharp.ORDER_FUNCTION_CALL],

  // !(!foo) -> !!foo
  [Blockly.CSharp.ORDER_LOGICAL_NOT, Blockly.CSharp.ORDER_LOGICAL_NOT],
  // a * (b * c) -> a * b * c
  [Blockly.CSharp.ORDER_MULTIPLICATION, Blockly.CSharp.ORDER_MULTIPLICATION],
  // a + (b + c) -> a + b + c
  [Blockly.CSharp.ORDER_ADDITION, Blockly.CSharp.ORDER_ADDITION],
  // a && (b && c) -> a && b && c
  [Blockly.CSharp.ORDER_LOGICAL_AND, Blockly.CSharp.ORDER_LOGICAL_AND],
  // a || (b || c) -> a || b || c
  [Blockly.CSharp.ORDER_LOGICAL_OR, Blockly.CSharp.ORDER_LOGICAL_OR]
];

/**
 * Whether the init method has been called.
 * @type {?boolean}
 */
Blockly.CSharp.isInitialized = false;

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.CSharp.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.CSharp.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.CSharp.functionNames_ = Object.create(null);

  if (!Blockly.CSharp.variableDB_) {
    Blockly.CSharp.variableDB_ =
        new Blockly.Names(Blockly.CSharp.RESERVED_WORDS_);
  } else {
    Blockly.CSharp.variableDB_.reset();
  }

  Blockly.CSharp.variableDB_.setVariableMap(workspace.getVariableMap());

  var defvars = [];
  // Add developer variables (not created or named by the user).
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    defvars.push(Blockly.CSharp.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE));
  }

  // Add user variables, but only ones that are being used.
  var variables = Blockly.Variables.allUsedVarModels(workspace);
  for (var i = 0; i < variables.length; i++) {
    defvars.push(Blockly.CSharp.variableDB_.getName(variables[i].getId(),
        Blockly.VARIABLE_CATEGORY_NAME));
  }

  // Declare all of the variables.
  if (defvars.length) {
    Blockly.CSharp.definitions_['variables'] =
        'var ' + defvars.join(', ') + ';';
  }
  this.isInitialized = true;
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.CSharp.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.CSharp.definitions_) {
    definitions.push(Blockly.CSharp.definitions_[name]);
  }
  // Clean up temporary data.
  delete Blockly.CSharp.definitions_;
  delete Blockly.CSharp.functionNames_;
  Blockly.CSharp.variableDB_.reset();
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.CSharp.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped JavaScript string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} JavaScript string.
 * @protected
 */
Blockly.CSharp.quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Encode a string as a properly escaped multiline JavaScript string, complete
 * with quotes.
 * @param {string} string Text to encode.
 * @return {string} JavaScript string.
 * @protected
 */
Blockly.CSharp.multiline_quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  var lines = string.split(/\n/g).map(Blockly.CSharp.quote_);
  return lines.join(' + \'\\n\' +\n');
};

/**
 * Common tasks for generating JavaScript from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The JavaScript code created for this block.
 * @param {boolean=} opt_thisOnly True to generate code for only this statement.
 * @return {string} JavaScript code with comments and subsequent blocks added.
 * @protected
 */
Blockly.CSharp.scrub_ = function(block, code, opt_thisOnly) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      comment = Blockly.utils.string.wrap(comment,
          Blockly.CSharp.COMMENT_WRAP - 3);
      commentCode += Blockly.CSharp.prefixLines(comment + '\n', '// ');
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.inputTypes.VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          comment = Blockly.CSharp.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.CSharp.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = opt_thisOnly ? '' : Blockly.CSharp.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @param {number=} opt_order The highest order acting on this value.
 * @return {string|number}
 */
Blockly.CSharp.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.CSharp.ORDER_NONE;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  if (delta > 0) {
    var at = Blockly.CSharp.valueToCode(block, atId,
        Blockly.CSharp.ORDER_ADDITION) || defaultAtIndex;
  } else if (delta < 0) {
    var at = Blockly.CSharp.valueToCode(block, atId,
        Blockly.CSharp.ORDER_SUBTRACTION) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.CSharp.valueToCode(block, atId,
        Blockly.CSharp.ORDER_UNARY_NEGATION) || defaultAtIndex;
  } else {
    var at = Blockly.CSharp.valueToCode(block, atId, order) ||
        defaultAtIndex;
  }

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = Number(at) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = at + ' + ' + delta;
      var innerOrder = Blockly.CSharp.ORDER_ADDITION;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.CSharp.ORDER_SUBTRACTION;
    }
    if (opt_negate) {
      if (delta) {
        at = '-(' + at + ')';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.CSharp.ORDER_UNARY_NEGATION;
    }
    innerOrder = Math.floor(innerOrder);
    order = Math.floor(order);
    if (innerOrder && order >= innerOrder) {
      at = '(' + at + ')';
    }
  }
  return at;
};
