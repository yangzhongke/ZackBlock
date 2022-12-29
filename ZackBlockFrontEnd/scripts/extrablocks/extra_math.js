Blockly.defineBlocksWithJsonArray([
  {
    "type": "IncOp",
    "message0": "%1++",
    "args0": [
      {
		'type': 'field_variable',
		'name': 'VAR',
		'variable': 'i',
      }  
    ],
	'previousStatement': null,
    'nextStatement': null,
    "style": "math_blocks",
  }
]);

Blockly.JavaScript['IncOp'] = function(block) {
	var varName = Blockly.JavaScript.nameDB_.getName(
			block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
	return varName+"++;\r\n";
};
Blockly.CSharp['IncOp'] = function(block) {
  var varName = Blockly.CSharp.nameDB_.getName(
			block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
	return varName+"++;\r\n";
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "DecOp",
    "message0": "%1--",
    "args0": [
      {
		'type': 'field_variable',
		'name': 'VAR',
		'variable': 'i',
      }  
    ],
	'previousStatement': null,
    'nextStatement': null,
    "style": "math_blocks",
  }
]);

Blockly.JavaScript['DecOp'] = function(block) {
	var varName = Blockly.JavaScript.nameDB_.getName(
			block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
	return varName+"--;\r\n";
};
Blockly.CSharp['DecOp'] = function(block) {
  var varName = Blockly.CSharp.nameDB_.getName(
			block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
	return varName+"--;\r\n";
};