/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating JavaScript for procedure blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.CSharp.procedures');

goog.require('Blockly.CSharp');


Blockly.CSharp['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.CSharp.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME);
  var xfix1 = '';
  if (Blockly.CSharp.STATEMENT_PREFIX) {
    xfix1 += Blockly.CSharp.injectId(Blockly.CSharp.STATEMENT_PREFIX,
        block);
  }
  if (Blockly.CSharp.STATEMENT_SUFFIX) {
    xfix1 += Blockly.CSharp.injectId(Blockly.CSharp.STATEMENT_SUFFIX,
        block);
  }
  if (xfix1) {
    xfix1 = Blockly.CSharp.prefixLines(xfix1, Blockly.CSharp.INDENT);
  }
  var loopTrap = '';
  if (Blockly.CSharp.INFINITE_LOOP_TRAP) {
    loopTrap = Blockly.CSharp.prefixLines(
        Blockly.CSharp.injectId(Blockly.CSharp.INFINITE_LOOP_TRAP,
        block), Blockly.CSharp.INDENT);
  }
  var branch = Blockly.CSharp.statementToCode(block, 'STACK');
  var returnValue = Blockly.CSharp.valueToCode(block, 'RETURN',
      Blockly.CSharp.ORDER_NONE) || '';
  var xfix2 = '';
  if (branch && returnValue) {
    // After executing the function body, revisit this block for the return.
    xfix2 = xfix1;
  }
  if (returnValue) {
    returnValue = Blockly.CSharp.INDENT + 'return ' + returnValue + ';\n';
  }
  var args = [];
  var variables = block.getVars();
  for (var i = 0; i < variables.length; i++) {
    args[i] = Blockly.CSharp.variableDB_.getName(variables[i],
        Blockly.VARIABLE_CATEGORY_NAME);
  }
  var code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
      xfix1 + loopTrap + branch + xfix2 + returnValue + '}';
  code = Blockly.CSharp.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.CSharp.definitions_['%' + funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.CSharp['procedures_defnoreturn'] =
    Blockly.CSharp['procedures_defreturn'];

Blockly.CSharp['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.CSharp.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME);
  var args = [];
  var variables = block.getVars();
  for (var i = 0; i < variables.length; i++) {
    args[i] = Blockly.CSharp.valueToCode(block, 'ARG' + i,
        Blockly.CSharp.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.CSharp['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  // Generated code is for a function call as a statement is the same as a
  // function call as a value, with the addition of line ending.
  var tuple = Blockly.CSharp['procedures_callreturn'](block);
  return tuple[0] + ';\n';
};

Blockly.CSharp['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.CSharp.valueToCode(block, 'CONDITION',
      Blockly.CSharp.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (Blockly.CSharp.STATEMENT_SUFFIX) {
    // Inject any statement suffix here since the regular one at the end
    // will not get executed if the return is triggered.
    code += Blockly.CSharp.prefixLines(
        Blockly.CSharp.injectId(Blockly.CSharp.STATEMENT_SUFFIX, block),
        Blockly.CSharp.INDENT);
  }
  if (block.hasReturnValue_) {
    var value = Blockly.CSharp.valueToCode(block, 'VALUE',
        Blockly.CSharp.ORDER_NONE) || 'null';
    code += Blockly.CSharp.INDENT + 'return ' + value + ';\n';
  } else {
    code += Blockly.CSharp.INDENT + 'return;\n';
  }
  code += '}\n';
  return code;
};
