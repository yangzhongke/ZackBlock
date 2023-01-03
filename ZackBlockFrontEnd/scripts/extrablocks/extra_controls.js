Blockly.defineBlocksWithJsonArray([
  {
    'type': 'countdown_for',
    'message0': 'countdown %1 from %2 to %3 by %4',
    'args0': [
      {
        'type': 'field_variable',
        'name': 'VAR',
        'variable': null,
      },
      {
        'type': 'input_value',
        'name': 'FROM',
        'check': 'Number',
        'align': 'RIGHT',
      },
      {
        'type': 'input_value',
        'name': 'TO',
        'check': 'Number',
        'align': 'RIGHT',
      },
      {
        'type': 'input_value',
        'name': 'BY',
        'check': 'Number',
        'align': 'RIGHT',
      },
    ],
    'message1': '%{BKY_CONTROLS_REPEAT_INPUT_DO} %1',
    'args1': [{
      'type': 'input_statement',
      'name': 'DO',
    }],
    'inputsInline': true,
    'previousStatement': null,
    'nextStatement': null,
    'style': 'loop_blocks',
    'helpUrl': '%{BKY_CONTROLS_FOR_HELPURL}',
    'extensions': [
      'contextMenu_newGetVariableBlock',
      'controls_for_tooltip',
    ],
  },
]);

Blockly.JavaScript['countdown_for'] = function(block) {
	var variable0 = Blockly.JavaScript.nameDB_.getName(
	  block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
	var argument0 = Blockly.JavaScript.valueToCode(block, 'FROM',
	  Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	var argument1 = Blockly.JavaScript.valueToCode(block, 'TO',
	  Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	var increment = Blockly.JavaScript.valueToCode(block, 'BY',
	  Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';
	var branch = Blockly.JavaScript.statementToCode(block, 'DO');
	branch = Blockly.JavaScript.addLoopTrap(branch, block);
	let code;
	if(Blockly.isNumber(increment)&&Number(increment)==1)
	{
		code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
		variable0 + ' >= ' + argument1 + '; ' +
		variable0+'--';
		code += ') {\n' + branch + '}\n';
	}
	else
	{
		code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
		variable0 + ' >= ' + argument1 + '; ' +
		variable0+'-='+increment;
		code += ') {\n' + branch + '}\n';		
	}  
	return code;
};
Blockly.CSharp['countdown_for'] = function(block) {
	var variable0 = Blockly.CSharp.nameDB_.getName(
	  block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
	var argument0 = Blockly.CSharp.valueToCode(block, 'FROM',
	  Blockly.CSharp.ORDER_ASSIGNMENT) || '0';
	var argument1 = Blockly.CSharp.valueToCode(block, 'TO',
	  Blockly.CSharp.ORDER_ASSIGNMENT) || '0';
	var increment = Blockly.CSharp.valueToCode(block, 'BY',
	  Blockly.CSharp.ORDER_ASSIGNMENT) || '1';
	var branch = Blockly.CSharp.statementToCode(block, 'DO');
	branch = Blockly.CSharp.addLoopTrap(branch, block);
	let code;
	if(Blockly.isNumber(increment)&&Number(increment)==1)
	{
		code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
		variable0 + ' >= ' + argument1 + '; ' +
		variable0+'--';
		code += ') {\n' + branch + '}\n';
	}
	else
	{
		code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
		variable0 + ' >= ' + argument1 + '; ' +
		variable0+'-='+increment;
		code += ') {\n' + branch + '}\n';		
	}  
	return code;
};