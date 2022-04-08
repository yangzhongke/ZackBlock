/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating JavaScript for colour blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.CSharp.colour');

goog.require('Blockly.CSharp');


Blockly.CSharp['colour_picker'] = function(block) {
  var code = 'System.Drawing.ColorTranslator.FromHtml("' + this.getFieldValue('COLOUR') + '")';
  return [code, Blockly.CSharp.ORDER_ATOMIC];
};

Blockly.CSharp['colour_random'] = function(block) {
  var code = 'System.Drawing.Color.FromArgb(1, Random.Shared.Next(256), Random.Shared.Next(256), Random.Shared.Next(256))';
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.CSharp['colour_rgb'] = function(block) {
  // Compose a colour from RGB components expressed as percentages.
  var red = Blockly.CSharp.valueToCode(this, 'RED',
      Blockly.CSharp.ORDER_COMMA) || 0;
  var green = Blockly.CSharp.valueToCode(this, 'GREEN',
      Blockly.CSharp.ORDER_COMMA) || 0;
  var blue = Blockly.CSharp.valueToCode(this, 'BLUE',
      Blockly.CSharp.ORDER_COMMA) || 0;
  var code = 'System.Drawing.Color.FromArgb(' + red + ', ' + green + ', ' + blue + ')';
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.CSharp['colour_blend'] = function(block) {
  // Blend two colours together.
  var c1 = Blockly.CSharp.valueToCode(this, 'COLOUR1',
      Blockly.CSharp.ORDER_COMMA) || 'Color.Black';
  var c2 = Blockly.CSharp.valueToCode(this, 'COLOUR2',
      Blockly.CSharp.ORDER_COMMA) || 'Color.Black';
  var ratio = Blockly.CSharp.valueToCode(this, 'RATIO',
      Blockly.CSharp.ORDER_COMMA) || 0.5;

  if (!Blockly.CSharp.definitions_['colour_blend']) {
    var functionName = Blockly.CSharp.variableDB_.getDistinctName(
        'colour_blend', Blockly.Generator.NAME_TYPE);
    Blockly.CSharp.colour_blend.functionName = functionName;
    var func = [];
    func.push('var ' + functionName + ' = delegate(System.Drawing.Color c1, System.Drawing.Color c2, double ratio) {');
    func.push('  ratio = Math.Max(Math.Min((double)ratio, 1), 0);');
    func.push('  var r = (int)Math.Round(c1.R * (1 - ratio) + c2.R * ratio);');
    func.push('  var g = (int)Math.Round(c1.G * (1 - ratio) + c2.G * ratio);');
    func.push('  var b = (int)Math.Round(c1.B * (1 - ratio) + c2.B * ratio);');
    func.push('  var res = System.Drawing.Color.FromArgb(1, r, g, b);');
    func.push('  return res;');
    func.push('};');
    Blockly.CSharp.definitions_['colour_blend'] = func.join('\n');
  }
  var code = Blockly.CSharp.colour_blend.functionName +
      '(' + c1 + ', ' + c2 + ', ' + ratio + ')';
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};
