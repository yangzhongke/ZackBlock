/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating JavaScript for text blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.CSharp.texts');

goog.require('Blockly.CSharp');


Blockly.CSharp['text'] = function(block) {
  // Text value.
  var code = Blockly.CSharp.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.CSharp.ORDER_ATOMIC];
};

Blockly.CSharp['text_multiline'] = function(block) {
  // Text value.
  var code = Blockly.CSharp.multiline_quote_(block.getFieldValue('TEXT'));
  var order = code.indexOf('+') != -1 ? Blockly.CSharp.ORDER_ADDITION :
      Blockly.CSharp.ORDER_ATOMIC;
  return [code, order];
};

/**
 * Enclose the provided value in 'String(...)' function.
 * Leave string literals alone.
 * @param {string} value Code evaluating to a value.
 * @return {[string, number]} Array containing code evaluating to a string and
 *    the order of the returned code.
 * @private
 */
Blockly.CSharp.text.forceString_ = function(value) {
  if (Blockly.CSharp.text.forceString_.strRegExp.test(value)) {
    return [value, Blockly.CSharp.ORDER_ATOMIC];
  }
  return ['String(' + value + ')', Blockly.CSharp.ORDER_FUNCTION_CALL];
};

/**
 * Regular expression to detect a single-quoted string literal.
 */
Blockly.CSharp.text.forceString_.strRegExp = /^\s*'([^']|\\')*'\s*$/;

Blockly.CSharp['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  switch (block.itemCount_) {
    case 0:
      return ['\'\'', Blockly.CSharp.ORDER_ATOMIC];
    case 1:
      var element = Blockly.CSharp.valueToCode(block, 'ADD0',
          Blockly.CSharp.ORDER_NONE) || '\'\'';
      var codeAndOrder = Blockly.CSharp.text.forceString_(element);
      return codeAndOrder;
    case 2:
      var element0 = Blockly.CSharp.valueToCode(block, 'ADD0',
          Blockly.CSharp.ORDER_NONE) || '\'\'';
      var element1 = Blockly.CSharp.valueToCode(block, 'ADD1',
          Blockly.CSharp.ORDER_NONE) || '\'\'';
      var code = Blockly.CSharp.text.forceString_(element0)[0] +
          ' + ' + Blockly.CSharp.text.forceString_(element1)[0];
      return [code, Blockly.CSharp.ORDER_ADDITION];
    default:
      var elements = new Array(block.itemCount_);
      for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.CSharp.valueToCode(block, 'ADD' + i,
            Blockly.CSharp.ORDER_NONE) || '\'\'';
      }
      var code = '[' + elements.join(',') + '].join(\'\')';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
  }
};

Blockly.CSharp['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.CSharp.nameDB_.getName(
      block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var value = Blockly.CSharp.valueToCode(block, 'TEXT',
      Blockly.CSharp.ORDER_NONE) || '\'\'';
  var code = varName + ' += ' +
      Blockly.CSharp.text.forceString_(value)[0] + ';\n';
  return code;
};

Blockly.CSharp['text_length'] = function(block) {
  // String or array length.
  var text = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_MEMBER) || '\'\'';
  return [text + '.length', Blockly.CSharp.ORDER_MEMBER];
};

Blockly.CSharp['text_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var text = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_MEMBER) || '\'\'';
  return ['!' + text + '.length', Blockly.CSharp.ORDER_LOGICAL_NOT];
};

Blockly.CSharp['text_indexOf'] = function(block) {
  // Search the text for a substring.
  var operator = block.getFieldValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  var substring = Blockly.CSharp.valueToCode(block, 'FIND',
      Blockly.CSharp.ORDER_NONE) || '\'\'';
  var text = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_MEMBER) || '\'\'';
  var code = text + '.' + operator + '(' + substring + ')';
  // Adjust index if using one-based indices.
  if (block.workspace.options.oneBasedIndex) {
    return [code + ' + 1', Blockly.CSharp.ORDER_ADDITION];
  }
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.CSharp['text_charAt'] = function(block) {
  // Get letter at index.
  // Note: Until January 2013 this block did not have the WHERE input.
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var textOrder = (where == 'RANDOM') ? Blockly.CSharp.ORDER_NONE :
      Blockly.CSharp.ORDER_MEMBER;
  var text = Blockly.CSharp.valueToCode(block, 'VALUE',
      textOrder) || '\'\'';
  switch (where) {
    case 'FIRST':
      var code = text + '.charAt(0)';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
    case 'LAST':
      var code = text + '.slice(-1)';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
    case 'FROM_START':
      var at = Blockly.CSharp.getAdjusted(block, 'AT');
      // Adjust index if using one-based indices.
      var code = text + '.charAt(' + at + ')';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
    case 'FROM_END':
      var at = Blockly.CSharp.getAdjusted(block, 'AT', 1, true);
      var code = text + '.slice(' + at + ').charAt(0)';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
    case 'RANDOM':
      var functionName = Blockly.CSharp.provideFunction_(
          'textRandomLetter',
          ['function ' + Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_ +
              '(text) {',
           '  var x = Math.floor(Math.random() * text.length);',
           '  return text[x];',
           '}']);
      var code = functionName + '(' + text + ')';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
  }
  throw Error('Unhandled option (text_charAt).');
};

/**
 * Returns an expression calculating the index into a string.
 * @param {string} stringName Name of the string, used to calculate length.
 * @param {string} where The method of indexing, selected by dropdown in Blockly
 * @param {string=} opt_at The optional offset when indexing from start/end.
 * @return {string|undefined} Index expression.
 * @private
 */
Blockly.CSharp.text.getIndex_ = function(stringName, where, opt_at) {
  if (where == 'FIRST') {
    return '0';
  } else if (where == 'FROM_END') {
    return stringName + '.length - 1 - ' + opt_at;
  } else if (where == 'LAST') {
    return stringName + '.length - 1';
  } else {
    return opt_at;
  }
};

Blockly.CSharp['text_getSubstring'] = function(block) {
  // Get substring.
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  var requiresLengthCall = (where1 != 'FROM_END' && where1 != 'LAST' &&
      where2 != 'FROM_END' && where2 != 'LAST');
  var textOrder = requiresLengthCall ? Blockly.CSharp.ORDER_MEMBER :
      Blockly.CSharp.ORDER_NONE;
  var text = Blockly.CSharp.valueToCode(block, 'STRING',
      textOrder) || '\'\'';
  if (where1 == 'FIRST' && where2 == 'LAST') {
    var code = text;
    return [code, Blockly.CSharp.ORDER_NONE];
  } else if (text.match(/^'?\w+'?$/) || requiresLengthCall) {
    // If the text is a variable or literal or doesn't require a call for
    // length, don't generate a helper function.
    switch (where1) {
      case 'FROM_START':
        var at1 = Blockly.CSharp.getAdjusted(block, 'AT1');
        break;
      case 'FROM_END':
        var at1 = Blockly.CSharp.getAdjusted(block, 'AT1', 1, false,
            Blockly.CSharp.ORDER_SUBTRACTION);
        at1 = text + '.length - ' + at1;
        break;
      case 'FIRST':
        var at1 = '0';
        break;
      default:
        throw Error('Unhandled option (text_getSubstring).');
    }
    switch (where2) {
      case 'FROM_START':
        var at2 = Blockly.CSharp.getAdjusted(block, 'AT2', 1);
        break;
      case 'FROM_END':
        var at2 = Blockly.CSharp.getAdjusted(block, 'AT2', 0, false,
            Blockly.CSharp.ORDER_SUBTRACTION);
        at2 = text + '.length - ' + at2;
        break;
      case 'LAST':
        var at2 = text + '.length';
        break;
      default:
        throw Error('Unhandled option (text_getSubstring).');
    }
    code = text + '.slice(' + at1 + ', ' + at2 + ')';
  } else {
    var at1 = Blockly.CSharp.getAdjusted(block, 'AT1');
    var at2 = Blockly.CSharp.getAdjusted(block, 'AT2');
    var getIndex_ = Blockly.CSharp.text.getIndex_;
    var wherePascalCase = {'FIRST': 'First', 'LAST': 'Last',
      'FROM_START': 'FromStart', 'FROM_END': 'FromEnd'};
    var functionName = Blockly.CSharp.provideFunction_(
        'subsequence' + wherePascalCase[where1] + wherePascalCase[where2],
        ['function ' + Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_ +
        '(sequence' +
        // The value for 'FROM_END' and'FROM_START' depends on `at` so
        // we add it as a parameter.
        ((where1 == 'FROM_END' || where1 == 'FROM_START') ? ', at1' : '') +
        ((where2 == 'FROM_END' || where2 == 'FROM_START') ? ', at2' : '') +
        ') {',
          '  var start = ' + getIndex_('sequence', where1, 'at1') + ';',
          '  var end = ' + getIndex_('sequence', where2, 'at2') + ' + 1;',
          '  return sequence.slice(start, end);',
          '}']);
    var code = functionName + '(' + text +
        // The value for 'FROM_END' and 'FROM_START' depends on `at` so we
        // pass it.
        ((where1 == 'FROM_END' || where1 == 'FROM_START') ? ', ' + at1 : '') +
        ((where2 == 'FROM_END' || where2 == 'FROM_START') ? ', ' + at2 : '') +
        ')';
  }
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.CSharp['text_changeCase'] = function(block) {
  // Change capitalization.
  var OPERATORS = {
    'UPPERCASE': '.toUpperCase()',
    'LOWERCASE': '.toLowerCase()',
    'TITLECASE': null
  };
  var operator = OPERATORS[block.getFieldValue('CASE')];
  var textOrder = operator ? Blockly.CSharp.ORDER_MEMBER :
      Blockly.CSharp.ORDER_NONE;
  var text = Blockly.CSharp.valueToCode(block, 'TEXT',
      textOrder) || '\'\'';
  if (operator) {
    // Upper and lower case are functions built into JavaScript.
    var code = text + operator;
  } else {
    // Title case is not a native JavaScript function.  Define one.
    var functionName = Blockly.CSharp.provideFunction_(
        'textToTitleCase',
        ['function ' + Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_ +
            '(str) {',
         '  return str.replace(/\\S+/g,',
         '      function(txt) {return txt[0].toUpperCase() + ' +
            'txt.substring(1).toLowerCase();});',
         '}']);
    var code = functionName + '(' + text + ')';
  }
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.CSharp['text_trim'] = function(block) {
  // Trim spaces.
  var OPERATORS = {
    'LEFT': ".replace(/^[\\s\\xa0]+/, '')",
    'RIGHT': ".replace(/[\\s\\xa0]+$/, '')",
    'BOTH': '.trim()'
  };
  var operator = OPERATORS[block.getFieldValue('MODE')];
  var text = Blockly.CSharp.valueToCode(block, 'TEXT',
      Blockly.CSharp.ORDER_MEMBER) || '\'\'';
  return [text + operator, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.CSharp['text_print'] = function(block) {
  // Print statement.
  var msg = Blockly.CSharp.valueToCode(block, 'TEXT',
      Blockly.CSharp.ORDER_NONE) || '\'\'';
  return 'window.alert(' + msg + ');\n';
};

Blockly.CSharp['text_prompt_ext'] = function(block) {
  // Prompt function.
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.CSharp.quote_(block.getFieldValue('TEXT'));
  } else {
    // External message.
    var msg = Blockly.CSharp.valueToCode(block, 'TEXT',
        Blockly.CSharp.ORDER_NONE) || '\'\'';
  }
  var code = 'window.prompt(' + msg + ')';
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'Number(' + code + ')';
  }
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.CSharp['text_prompt'] = Blockly.CSharp['text_prompt_ext'];

Blockly.CSharp['text_count'] = function(block) {
  var text = Blockly.CSharp.valueToCode(block, 'TEXT',
      Blockly.CSharp.ORDER_NONE) || '\'\'';
  var sub = Blockly.CSharp.valueToCode(block, 'SUB',
      Blockly.CSharp.ORDER_NONE) || '\'\'';
  var functionName = Blockly.CSharp.provideFunction_(
      'textCount',
      ['function ' + Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_ +
          '(haystack, needle) {',
       '  if (needle.length === 0) {',
       '    return haystack.length + 1;',
       '  } else {',
       '    return haystack.split(needle).length - 1;',
       '  }',
       '}']);
  var code = functionName + '(' + text + ', ' + sub + ')';
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.CSharp['text_replace'] = function(block) {
  var text = Blockly.CSharp.valueToCode(block, 'TEXT',
      Blockly.CSharp.ORDER_NONE) || '\'\'';
  var from = Blockly.CSharp.valueToCode(block, 'FROM',
      Blockly.CSharp.ORDER_NONE) || '\'\'';
  var to = Blockly.CSharp.valueToCode(block, 'TO',
      Blockly.CSharp.ORDER_NONE) || '\'\'';
  // The regex escaping code below is taken from the implementation of
  // goog.string.regExpEscape.
  var functionName = Blockly.CSharp.provideFunction_(
      'textReplace',
      ['function ' + Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_ +
          '(haystack, needle, replacement) {',
       '  needle = ' +
           'needle.replace(/([-()\\[\\]{}+?*.$\\^|,:#<!\\\\])/g,"\\\\$1")',
       '                 .replace(/\\x08/g,"\\\\x08");',
       '  return haystack.replace(new RegExp(needle, \'g\'), replacement);',
       '}']);
  var code = functionName + '(' + text + ', ' + from + ', ' + to + ')';
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.CSharp['text_reverse'] = function(block) {
  var text = Blockly.CSharp.valueToCode(block, 'TEXT',
      Blockly.CSharp.ORDER_MEMBER) || '\'\'';
  var code = text + '.split(\'\').reverse().join(\'\')';
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};
