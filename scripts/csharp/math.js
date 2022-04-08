/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating JavaScript for math blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.CSharp.math');

goog.require('Blockly.CSharp');


Blockly.CSharp['math_number'] = function(block) {
  // Numeric value.
  var code = Number(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.CSharp.ORDER_ATOMIC :
              Blockly.CSharp.ORDER_UNARY_NEGATION;
  return [code, order];
};

Blockly.CSharp['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'ADD': [' + ', Blockly.CSharp.ORDER_ADDITION],
    'MINUS': [' - ', Blockly.CSharp.ORDER_SUBTRACTION],
    'MULTIPLY': [' * ', Blockly.CSharp.ORDER_MULTIPLICATION],
    'DIVIDE': [' / ', Blockly.CSharp.ORDER_DIVISION],
    'POWER': [null, Blockly.CSharp.ORDER_NONE]  // Handle power separately.
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.CSharp.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.CSharp.valueToCode(block, 'B', order) || '0';
  var code;
  // Power in JavaScript requires a special case since it has no operator.
  if (!operator) {
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.CSharp['math_single'] = function(block) {
  // Math operators with single operand.
  var operator = this.getFieldValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    arg = Blockly.CSharp.valueToCode(this, 'NUM',
        Blockly.CSharp.ORDER_UNARY_NEGATION) || '0.0';
    if (arg[0] == '-') {
      // --3 is not allowed
      arg = ' ' + arg;
    }
    code = '-' + arg;
    return [code, Blockly.CSharp.ORDER_UNARY_NEGATION];
  }
  if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
    arg = Blockly.CSharp.valueToCode(this, 'NUM',
        Blockly.CSharp.ORDER_DIVISION) || '0';
  } else {
    arg = Blockly.CSharp.valueToCode(this, 'NUM',
        Blockly.CSharp.ORDER_NONE) || '0.0';
  }
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'Math.Abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'Math.Sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'Math.Log(' + arg + ')';
      break;
    case 'LOG10':
      code = 'Math.Log10(' + arg + ')';
      break;
    case 'EXP':
      code = 'Math.Exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'Math.Pow(' + arg + ', 10)';
      break;
    case 'ROUND':
      code = 'Math.Round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'Math.Ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'Math.Floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'Math.Sin(' + arg + ' / 180 * Math.PI)';
      break;
    case 'COS':
      code = 'Math.Cos(' + arg + ' / 180 * Math.PI)';
      break;
    case 'TAN':
      code = 'Math.Tan(' + arg + ' / 180 * Math.PI)';
      break;
  }
  if (code) {
    return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ASIN':
      code = 'Math.Asin(' + arg + ') / Math.PI * 180';
      break;
    case 'ACOS':
      code = 'Math.Acos(' + arg + ') / Math.PI * 180';
      break;
    case 'ATAN':
      code = 'Math.Atan(' + arg + ') / Math.PI * 180';
      break;
    default:
      throw 'Unknown math operator: ' + operator;
  }
  return [code, Blockly.CSharp.ORDER_DIVISION];
};

Blockly.CSharp['math_constant'] = function(block) {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  var CONSTANTS = {
    'PI': ['Math.PI', Blockly.CSharp.ORDER_MEMBER],
    'E': ['Math.E', Blockly.CSharp.ORDER_MEMBER],
    'GOLDEN_RATIO':
        ['(1 + Math.sqrt(5)) / 2', Blockly.CSharp.ORDER_DIVISION],
    'SQRT2': ['Math.SQRT2', Blockly.CSharp.ORDER_MEMBER],
    'SQRT1_2': ['Math.SQRT1_2', Blockly.CSharp.ORDER_MEMBER],
    'INFINITY': ['Infinity', Blockly.CSharp.ORDER_ATOMIC]
  };
  return CONSTANTS[block.getFieldValue('CONSTANT')];
};

Blockly.CSharp['math_number_property'] = function(block) {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  var number_to_check = Blockly.CSharp.valueToCode(block, 'NUMBER_TO_CHECK',
      Blockly.CSharp.ORDER_MODULUS) || '0';
  var dropdown_property = block.getFieldValue('PROPERTY');
  var code;
  if (dropdown_property == 'PRIME') {
    // Prime is a special case as it is not a one-liner test.
    var functionName = Blockly.CSharp.provideFunction_(
        'mathIsPrime',
        ['function ' + Blockly.CSharp.FUNCTION_NAME_PLACEHOLDER_ + '(n) {',
         '  // https://en.wikipedia.org/wiki/Primality_test#Naive_methods',
         '  if (n == 2 || n == 3) {',
         '    return true;',
         '  }',
         '  // False if n is NaN, negative, is 1, or not whole.',
         '  // And false if n is divisible by 2 or 3.',
         '  if (isNaN(n) || n <= 1 || n % 1 != 0 || n % 2 == 0 ||' +
            ' n % 3 == 0) {',
         '    return false;',
         '  }',
         '  // Check all the numbers of form 6k +/- 1, up to sqrt(n).',
         '  for (var x = 6; x <= Math.sqrt(n) + 1; x += 6) {',
         '    if (n % (x - 1) == 0 || n % (x + 1) == 0) {',
         '      return false;',
         '    }',
         '  }',
         '  return true;',
         '}']);
    code = functionName + '(' + number_to_check + ')';
    return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
  }
  switch (dropdown_property) {
    case 'EVEN':
      code = number_to_check + ' % 2 == 0';
      break;
    case 'ODD':
      code = number_to_check + ' % 2 == 1';
      break;
    case 'WHOLE':
      code = number_to_check + ' % 1 == 0';
      break;
    case 'POSITIVE':
      code = number_to_check + ' > 0';
      break;
    case 'NEGATIVE':
      code = number_to_check + ' < 0';
      break;
    case 'DIVISIBLE_BY':
      var divisor = Blockly.CSharp.valueToCode(block, 'DIVISOR',
          Blockly.CSharp.ORDER_MODULUS) || '0';
      code = number_to_check + ' % ' + divisor + ' == 0';
      break;
  }
  return [code, Blockly.CSharp.ORDER_EQUALITY];
};

Blockly.CSharp['math_change'] = function(block) {
  // Add to a variable in place.
  var argument0 = Blockly.CSharp.valueToCode(block, 'DELTA',
      Blockly.CSharp.ORDER_ADDITION) || '0';
  var varName = Blockly.CSharp.nameDB_.getName(
      block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  return varName + ' = (typeof ' + varName + ' == \'number\' ? ' + varName +
      ' : 0) + ' + argument0 + ';\n';
};

// Rounding functions have a single operand.
Blockly.CSharp['math_round'] = Blockly.CSharp['math_single'];
// Trigonometry functions have a single operand.
Blockly.CSharp['math_trig'] = Blockly.CSharp['math_single'];

Blockly.CSharp['math_modulo'] = function(block) {
  // Remainder computation.
  var argument0 = Blockly.CSharp.valueToCode(block, 'DIVIDEND',
      Blockly.CSharp.ORDER_MODULUS) || '0';
  var argument1 = Blockly.CSharp.valueToCode(block, 'DIVISOR',
      Blockly.CSharp.ORDER_MODULUS) || '0';
  var code = argument0 + ' % ' + argument1;
  return [code, Blockly.CSharp.ORDER_MODULUS];
};

Blockly.CSharp['math_constrain'] = function(block) {
  // Constrain a number between two limits.
  var argument0 = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_NONE) || '0';
  var argument1 = Blockly.CSharp.valueToCode(block, 'LOW',
      Blockly.CSharp.ORDER_NONE) || '0';
  var argument2 = Blockly.CSharp.valueToCode(block, 'HIGH',
      Blockly.CSharp.ORDER_NONE) || 'Infinity';
  var code = 'Math.min(Math.max(' + argument0 + ', ' + argument1 + '), ' +
      argument2 + ')';
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.CSharp['math_random_int'] = function(block) {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.CSharp.valueToCode(this, 'FROM',
      Blockly.CSharp.ORDER_COMMA) || '0.0';
  var argument1 = Blockly.CSharp.valueToCode(this, 'TO',
      Blockly.CSharp.ORDER_COMMA) || '0.0';
  if (!Blockly.CSharp.definitions_['math_random_int']) {
    var functionName = Blockly.CSharp.variableDB_.getDistinctName(
        'math_random_int', Blockly.Generator.NAME_TYPE);
    Blockly.CSharp.math_random_int.random_function = functionName;
    var func = [];
    func.push('var ' + functionName + '= delegate(int a,int b){');
    func.push('  int delta=Math.Abs(a-b);');
    func.push('  return (int)Math.Floor(a + (double)Random.Shared.Next(delta));');
    func.push('};');
    Blockly.CSharp.definitions_['math_random_int'] = func.join('\n');
  }
  var code = Blockly.CSharp.math_random_int.random_function +
      '(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.CSharp['math_random_float'] = function(block) {
  return ['Random.Shared.NextDouble()', Blockly.CSharp.ORDER_FUNCTION_CALL];
};