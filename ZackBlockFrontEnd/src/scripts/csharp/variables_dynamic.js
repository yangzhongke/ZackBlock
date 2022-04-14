/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating JavaScript for dynamic variable blocks.
 * @author fenichel@google.com (Rachel Fenichel)
 */
'use strict';

goog.provide('Blockly.CSharp.variablesDynamic');

goog.require('Blockly.CSharp');
goog.require('Blockly.CSharp.variables');


// JavaScript is dynamically typed.
Blockly.CSharp['variables_get_dynamic'] =
    Blockly.CSharp['variables_get'];
Blockly.CSharp['variables_set_dynamic'] =
    Blockly.CSharp['variables_set'];
