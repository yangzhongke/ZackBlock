/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helper functions for generating JavaScript for blocks.
 * @author fraser@google.com (Neil Fraser)
 * @author yangzhongke8@gmail.com (Zack Yang)
 */
 
 /**
 * add strong-typing
 * @author yangzhongke8@gmail.com (Zack Yang)
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
 
var reservedWords='abstract,event,namespace,as,explicit,string,base,extern,struct,bool,'+
	'object,operator,float,override,params,checked,goto,uint,implicit,readonly,'
	+'unchecked,ref,unsafe,decimal,interface,sbyte,using,delegate,internal,'+
     'sealed,virtual,double,lock,sizeof,volatile,long,stackalloc,'+'break,case,catch,class,const,continue,default,do,else,finally,for,if,in,new,return,switch,this,throw,try,typeof,var,void,while,with,yield,' +
    'enum,byte,fixed,out,int,ushort,' +
    'private,protected,public,static,' +
    'await,' +
    'null,true,false';
var contextualKeywords='add,get,notnull,set,and,global,nuint,unmanaged,alias,group,'+
'on,ascending,init,or,args,into,orderby,async,join,partial,let,value,by,'+
'managed,record,descending,remove,when,dynamic,select,equals,nameof,where,'+
'from,nint,not,with';
Blockly.CSharp.addReservedWords(
    //https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/
     reservedWords+','+contextualKeywords+','+
    // Everything in the current environment (835 items in Chrome, 104 in Node).
    Object.getOwnPropertyNames(Blockly.utils.global).join(','));
Blockly.CSharp.RESERVED_WORDS_=Blockly.CSharp.RESERVED_WORDS_.replace('name,','');//remove reserved words: name

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

const arrayEquals=function (a, b) 
{
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

const getVarName=function(varBlock)
{
  const varId = varBlock.getField("VAR").getValue();
  return Blockly.CSharp.nameDB_.getName(varId,
	Blockly.VARIABLE_CATEGORY_NAME);
}

const findDefVarBlockByVarName=function(varName)
{
	const allBlocks =Blockly.getMainWorkspace()
		.getAllBlocks(false);
	const defVarTypeBlocks = allBlocks
		.filter(b=>b.type=='DefVarType'&&getVarName(b)==varName);
	if(defVarTypeBlocks.length>0)
	{
		return defVarTypeBlocks[0];
	}
	else
	{
		return null;
	}
}

const findDefVarType=function(varName)
{
	const block = findDefVarBlockByVarName(varName);
	if(!block)return null;
	const typeName = block.getField("TYPE").getValue();
	return typeName;
}

//whether the connected input with name='name' is of type 'string'
function isStringInput(block,name)
{
	const inputConnection = block.getInput(name).connection;
	if(!inputConnection)return false;
	const valueBlock = inputConnection.targetBlock();
	const valueType = inferValueTypeFromBlock(valueBlock);
	return valueType=='string'||valueType=='String';
}

function inferValueTypeFromMathArithBlock(block)
{
	var blockLeft = block.getInputTargetBlock("A");
	var blockRight = block.getInputTargetBlock("B");
	if(!blockLeft||!blockRight)
	{
		return null;
	}
	var typeLeft = inferValueTypeFromBlock(blockLeft);
	var typeRight = inferValueTypeFromBlock(blockRight);
	if(!typeLeft&&!typeRight)//if both are null
	{
		return null;
	}
	//only number values are valid for MathArithBlock
	else if(typeLeft=='double'||typeRight=='double')
	{
		return 'double';
	}
	else if(typeLeft=='int'&&typeRight=='int')
	{
		return 'int';
	}
	else
	{
		return null;
	}
}

function inferValueTypeFromBlock(block)
{
	let typeName = block.type;
	//get the output type
	const check = block.outputConnection.getCheck();
	if(typeName=="text"||arrayEquals(check,['String']))
	{
	  return 'string';
	}
	else if(typeName=="math_random_int")
	{
		return 'int';
	}
	else if(typeName=="math_number")
	{
	  const value = block.getFieldValue("NUM");
	  if(Number.isInteger(value))
	  {
		  const numValue = parseInt(value);
		  if(numValue>=0&&numValue<=255) return "byte";
		  if(numValue>=	-2147483648&&numValue<=2147483647) return "int";
		  return "long";
	  }
	  else
	  {
		  return "double";
	  }
	  return Number.isInteger(value)?'int':'double';
	}
	else if(typeName=="logic_boolean"||arrayEquals(check,['Boolean']))
	{
	  return 'bool';
	}
	else if(typeName=="variables_get")
	{
		const varName = getVarName(block);
		return findDefVarType(varName);
	}
	else if(typeName=="math_arithmetic")//i+1,age+name,name+(age+1)
	{
		return inferValueTypeFromMathArithBlock(block);
	}
	else if(typeName=='convert')
	{
		let type = block.getFieldValue('TYPE');
		return type;
	}
	else if(typeName=='CastAs')
	{
		let type = block.getFieldValue('TYPE');
		return type;
	}
	else if(typeName=='promptInteger')
	{
		return 'int';
	}
	else if(arrayEquals(check,['DateTime']))
	{
	  return 'DateTime';
	}
	else if(arrayEquals(check,['Number']))
	{
	  return 'double';
	}
	else if(arrayEquals(check,['Colour']))
	{
	  return 'System.Drawing.Color';
	}
	else
	{
		return null;
	}
}

const inferVarType = function (varName)
{
  //try to find DefVarType
  var defVarType = findDefVarType(varName);
  if(defVarType)
  {
	  return defVarType;
  }
  //if there is no DefVarType defined, then infer type from variables_set
  var allBlocks =Blockly.getMainWorkspace()
		.getAllBlocks(false);
  
  var setVarBlocks = allBlocks
		.filter(b=>b.type=='variables_set'
		&&getVarName(b)==varName);
  if(setVarBlocks.length<=0)
  {
	  var countWithBlocks = allBlocks
		.filter(b=>(b.type=='controls_for'||b.type=='countdown_for')
		&&getVarName(b)==varName);
	  if(countWithBlocks.length<=0)
	  {
		  return "dynamic";
	  }
	  else
	  {
		  return 'int';
	  }
  }
  //find the first variables_set 
  let setVarBlock = setVarBlocks[0];
  let setValueBlock = setVarBlock.getInputTargetBlock("VALUE");
  if(!setValueBlock)return 'dynamic';
  const netType = inferValueTypeFromBlock(setValueBlock);
  return netType?netType:'dynamic';
}
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

  if (!Blockly.CSharp.nameDB_) {
    Blockly.CSharp.nameDB_ =
        new Blockly.Names(Blockly.CSharp.RESERVED_WORDS_);
  } else {
    Blockly.CSharp.nameDB_.reset();
  }

  Blockly.CSharp.nameDB_.setVariableMap(workspace.getVariableMap());

  var defvars = [];
  // Add developer variables (not created or named by the user).
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    defvars.push(Blockly.CSharp.nameDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE));
  }

  // Add user variables, but only ones that are being used.
  var variables = Blockly.Variables.allUsedVarModels(workspace);
  for (var i = 0; i < variables.length; i++) {
    defvars.push(Blockly.CSharp.nameDB_.getName(variables[i].getId(),
        Blockly.VARIABLE_CATEGORY_NAME));
  }

  // Declare all of the variables.
  if (defvars.length) 
  {
    let varDefs=[];
	for(var i=0;i<defvars.length;i++)
	{
		const varName = defvars[i];		
		const typeName = inferVarType(varName);
		let statement = typeName+" "+varName;
		const varDefBlock = findDefVarBlockByVarName(varName);
		if(varDefBlock)//if found DefVarBlock for the variable
		{
			const initValueConn = varDefBlock.getInput("INIT_VALUE").connection.targetConnection;
			if(initValueConn)//if there is initial value
			{
				var initValue = Blockly.CSharp.valueToCode(varDefBlock, 'INIT_VALUE',
      Blockly.CSharp.ORDER_MODULUS);
				statement+=" = "+initValue;
			}
		}
		varDefs.push(statement);
	}
	let varDefCodes = varDefs.join(';\r\n')+';';
	Blockly.CSharp.definitions_['variables']=varDefCodes;
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
  Blockly.CSharp.nameDB_.reset();
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
                 .replace(/"/g, '\\\"');
  return '\"' + string + '\"';
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
