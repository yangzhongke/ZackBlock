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

Blockly.CSharp['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  switch (block.itemCount_) {
    case 0:
      return ['""', Blockly.CSharp.ORDER_ATOMIC];
    case 1:
      var code = Blockly.CSharp.valueToCode(block, 'ADD0',
          Blockly.CSharp.ORDER_NONE) || ['""', Blockly.CSharp.ORDER_ATOMIC];
	  return [code, Blockly.CSharp.ORDER_ATOMIC];
    case 2:
      var element0 = Blockly.CSharp.valueToCode(block, 'ADD0',
          Blockly.CSharp.ORDER_NONE) || ['""', Blockly.CSharp.ORDER_ATOMIC];
      var element1 = Blockly.CSharp.valueToCode(block, 'ADD1',
          Blockly.CSharp.ORDER_NONE) || ['""', Blockly.CSharp.ORDER_ATOMIC];
      var code = element0 + ' + ' + element1;
      return [code, Blockly.CSharp.ORDER_ADDITION];
    default:
      var elements = new Array(block.itemCount_);
      for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.CSharp.valueToCode(block, 'ADD' + i,
            Blockly.CSharp.ORDER_NONE) || ['""', Blockly.CSharp.ORDER_ATOMIC];
      }
      var code = elements.join('+');
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
  }
};

Blockly.CSharp['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.CSharp.nameDB_.getName(
      block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var value = Blockly.CSharp.valueToCode(block, 'TEXT',
      Blockly.CSharp.ORDER_NONE) || ['""', Blockly.CSharp.ORDER_ATOMIC];
	  
  var code = varName + ' += ' +value[0] + ';\n';
  return code;
};

Blockly.CSharp['text_length'] = function(block) {
  // String or array length.
  var text = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_MEMBER) || ['""', Blockly.CSharp.ORDER_ATOMIC];
  return [text + '.Length', Blockly.CSharp.ORDER_MEMBER];
};

Blockly.CSharp['text_isEmpty'] = function(block) {
  var argument0 = Blockly.CSharp.valueToCode(this, 'VALUE', Blockly.CSharp.ORDER_MEMBER) || ['""', Blockly.CSharp.ORDER_ATOMIC];
  return [argument0 + '.Length == 0', Blockly.CSharp.ORDER_EQUALITY];
};

Blockly.CSharp['text_indexOf'] = function(block) {
  var operator = this.getFieldValue('END') == 'FIRST' ?
      'IndexOf' : 'LastIndexOf';
  var argument0 = Blockly.CSharp.valueToCode(this, 'FIND', Blockly.CSharp.ORDER_NONE) || ['""', Blockly.CSharp.ORDER_ATOMIC];
  var argument1 = Blockly.CSharp.valueToCode(this, 'VALUE', Blockly.CSharp.ORDER_MEMBER) || ['""', Blockly.CSharp.ORDER_ATOMIC];
  var code = argument1 + '.' + operator + '(' + argument0 + ')';
  return [code, Blockly.CSharp.ORDER_MEMBER];
};

Blockly.CSharp['text_charAt'] = function(block) {
  var where = this.getFieldValue('WHERE') || 'FROM_START';
  var at = Blockly.CSharp.valueToCode(this, 'AT',
      Blockly.CSharp.ORDER_UNARY_NEGATION) || '1';
  var text = Blockly.CSharp.valueToCode(this, 'VALUE',
      Blockly.CSharp.ORDER_MEMBER);

  // Blockly uses one-based indicies.

  switch (where) {
    case 'FIRST':
      var code = text + '.First()';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
    case 'LAST':
      var code = text + '.Last()';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
    case 'FROM_START':
      var code = text + '[' + at + ' - 1]';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
    case 'FROM_END':
        var code = text + '[text.Length - ' + at + ']';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
    case 'RANDOM':
      if (!Blockly.CSharp.definitions_['Text_random_letter']) {
        var functionName = Blockly.CSharp.variableDB_.getDistinctName(
            'Text_random_letter', Blockly.Generator.NAME_TYPE);
        Blockly.CSharp.text_charAt.text_random_letter = functionName;
        var func = [];
        func.push('char '+functionName + '(string text){');
        func.push('  var x = (new Random()).Next(text.length);');
        func.push('  return text[x];');
        func.push('}');
        Blockly.CSharp.definitions_['Text_random_letter'] = func.join('\n');
      }
      code = Blockly.CSharp.text_charAt.text_random_letter +
          '(' + text + ')';
      return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
  }
  throw 'Unhandled option (text_charAt).';
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
    return stringName + '.Length - 1 - ' + opt_at;
  } else if (where == 'LAST') {
    return stringName + '.Length - 1';
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
      textOrder) || '""';
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
  var mode = this.getFieldValue('CASE');
  var operator = Blockly.CSharp.text_changeCase.OPERATORS[mode];
  var code;
  if (operator) {
    // Upper and lower case are functions built into CSharp.
    var argument0 = Blockly.CSharp.valueToCode(this, 'TEXT', Blockly.CSharp.ORDER_MEMBER) || '""';
    code = argument0 + operator;
  } else {
    if (!Blockly.CSharp.definitions_['Text_ToTitleCase']) {
      // Title case is not a native CSharp function.  Define one.
      var functionName = Blockly.CSharp.variableDB_.getDistinctName('Text_ToTitleCase', Blockly.Generator.NAME_TYPE);
      Blockly.CSharp.text_changeCase.toTitleCase = functionName;
      var func = [];
      func.push('string ' + functionName + '(string str){');
      func.push('  var buf = new System.Text.StringBuilder(str.Length);');
      func.push('  var toUpper = true;');
      func.push('  foreach (var ch in str) {');
      func.push('    buf.Append(toUpper ? Char.ToUpper(ch) : ch);');
      func.push('    toUpper = Char.IsWhiteSpace(ch);');
      func.push('  }');
      func.push('  return buf.ToString();');
      func.push('}');
      Blockly.CSharp.definitions_['Text_ToTitleCase'] = func.join('\n');
    }
    var argument0 = Blockly.CSharp.valueToCode(this, 'TEXT',
        Blockly.CSharp.ORDER_NONE) || ['""', Blockly.CSharp.ORDER_ATOMIC];
    code = Blockly.CSharp.text_changeCase.toTitleCase + '(' + argument0 + ')';
  }
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.CSharp.text_changeCase.OPERATORS = {
  UPPERCASE: '.ToUpper()',
  LOWERCASE: '.ToLower()',
  TITLECASE: null
};

Blockly.CSharp['text_trim'] = function(block) {
  // Trim spaces.
  var mode = this.getFieldValue('MODE');
  var operator = Blockly.CSharp.text_trim.OPERATORS[mode];
  var argument0 = Blockly.CSharp.valueToCode(this, 'TEXT', Blockly.CSharp.ORDER_MEMBER) || '""';
  return [argument0 + operator, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.CSharp.text_trim.OPERATORS = {
  LEFT: '.TrimStart()',
  RIGHT: '.TrimEnd()',
  BOTH: '.Trim()'
};


Blockly.CSharp['text_print'] = function(block) {
  // Print statement.
  var msg = Blockly.CSharp.valueToCode(block, 'TEXT',
      Blockly.CSharp.ORDER_NONE) || ['""', Blockly.CSharp.ORDER_ATOMIC];
  return 'Console.WriteLine(' + msg + ');\n';
};

Blockly.CSharp['text_prompt'] = function(block) {
    var msg = Blockly.CSharp.quote_(this.getFieldValue('TEXT'));
    var toNumber = this.getFieldValue('TYPE') == 'NUMBER';

	var code;
	if(this.getFieldValue('TEXT'))
	{
		if(toNumber)
		{
			if (!Blockly.CSharp.definitions_['Text_PromptInputNumber'])
			{
				var functionName = Blockly.CSharp.variableDB_.getDistinctName('Text_PromptInputNumber', Blockly.Generator.NAME_TYPE);
				Blockly.CSharp.text_prompt.promptInputNumber = functionName;
				var func = [];		
				func.push('int ' + functionName + '(string msg){');
				func.push('  Console.WriteLine(msg);');
				func.push('  var res = Console.ReadLine();');
				func.push('  return int.Parse(res);');
				func.push('}');
				Blockly.CSharp.definitions_['Text_PromptInputNumber'] = func.join('\n');
			}
			code = Blockly.CSharp.text_prompt.promptInputNumber + '(' + msg + ')';		
		}
		else
		{
			if (!Blockly.CSharp.definitions_['Text_PromptInputString'])
			{
				var functionName = Blockly.CSharp.variableDB_.getDistinctName('Text_PromptInputString', Blockly.Generator.NAME_TYPE);
				Blockly.CSharp.text_prompt.promptInputString = functionName;
				var func = [];
				func.push('string ' + functionName + '(string msg){');
				func.push('  Console.WriteLine(msg);');
				func.push('  var res = Console.ReadLine();');
				func.push('  return res;');
				func.push('}');	
				Blockly.CSharp.definitions_['Text_PromptInputString'] = func.join('\n');
			}
			code = Blockly.CSharp.text_prompt.promptInputString + '(' + msg + ')';		
		}		
	}
	else
	{
		if(toNumber)
		{
			code = 'int.Parse(Console.ReadLine())';	
		}
		else
		{
			code = 'Console.ReadLine()';	
		}
	}

    
    return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};
