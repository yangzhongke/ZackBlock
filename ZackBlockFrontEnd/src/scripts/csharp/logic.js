/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating JavaScript for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.CSharp.logic');

goog.require('Blockly.CSharp');


Blockly.CSharp['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  if (Blockly.CSharp.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += Blockly.CSharp.injectId(Blockly.CSharp.STATEMENT_PREFIX,
        block);
  }
  do {
    conditionCode = Blockly.CSharp.valueToCode(block, 'IF' + n,
        Blockly.CSharp.ORDER_NONE) || 'false';
    branchCode = Blockly.CSharp.statementToCode(block, 'DO' + n);
    if (Blockly.CSharp.STATEMENT_SUFFIX) {
      branchCode = Blockly.CSharp.prefixLines(
          Blockly.CSharp.injectId(Blockly.CSharp.STATEMENT_SUFFIX,
          block), Blockly.CSharp.INDENT) + branchCode;
    }
    code += (n > 0 ? ' else ' : '') +
        'if (' + conditionCode + ')\n{\n' + branchCode + '}';
    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE') || Blockly.CSharp.STATEMENT_SUFFIX) {
    branchCode = Blockly.CSharp.statementToCode(block, 'ELSE');
    if (Blockly.CSharp.STATEMENT_SUFFIX) {
      branchCode = Blockly.CSharp.prefixLines(
          Blockly.CSharp.injectId(Blockly.CSharp.STATEMENT_SUFFIX,
          block), Blockly.CSharp.INDENT) + branchCode;
    }
    code += ' else \n{\n' + branchCode + '}';
  }
  return code + '\n';
};

Blockly.CSharp['controls_ifelse'] = Blockly.CSharp['controls_if'];

Blockly.CSharp['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.CSharp.ORDER_EQUALITY : Blockly.CSharp.ORDER_RELATIONAL;
  var argument0 = Blockly.CSharp.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.CSharp.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.CSharp['logic_operation'] = function(block) {
  var operator = (this.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.CSharp.ORDER_LOGICAL_AND :
      Blockly.CSharp.ORDER_LOGICAL_OR;
  var argument0 = Blockly.CSharp.valueToCode(this, 'A', order) || 'false';
  var argument1 = Blockly.CSharp.valueToCode(this, 'B', order) || 'false';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.CSharp['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.CSharp.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.CSharp.valueToCode(block, 'BOOL', order) ||
      'true';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.CSharp['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.CSharp.ORDER_ATOMIC];
};

Blockly.CSharp['logic_null'] = function(block) {
  // Null data type.
  return ['null', Blockly.CSharp.ORDER_ATOMIC];
};

Blockly.CSharp['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.CSharp.valueToCode(block, 'IF',
      Blockly.CSharp.ORDER_CONDITIONAL) || 'false';
  var value_then = Blockly.CSharp.valueToCode(block, 'THEN',
      Blockly.CSharp.ORDER_CONDITIONAL) || 'null';
  var value_else = Blockly.CSharp.valueToCode(block, 'ELSE',
      Blockly.CSharp.ORDER_CONDITIONAL) || 'null';
  var code = value_if + ' ? ' + value_then + ' : ' + value_else;
  return [code, Blockly.CSharp.ORDER_CONDITIONAL];
};
