Blockly.defineBlocksWithJsonArray([
  {
    "type": "DefVarType",
    "message0": "Define %1 as %2 Value=%3",
    "args0": [
		{
		'type': 'field_variable',
		'name': 'VAR',
		'variable': 'i',
		},
		{
		"type": "field_dropdown",
		"name": "TYPE",
		"options": [["int", "int"],
		  ["string", "string"],
		  ["bool", "bool"],
		  ["double", "double"],
		  ["long", "long"],
		  ["float", "float"],
		  ["byte", "byte"],
		  ["DateTime", "DateTime"]]
		},
		{
		'type': 'input_value',
		'name': 'INIT_VALUE',
		},	  
    ],
	'previousStatement': null,
    'nextStatement': null,
    "style": "variable_blocks",
  }
]);

Blockly.JavaScript['DefVarType'] = function(block) {
  //for JS, there is no generating statement, so assignment for default value will be generated in place here.
	const initValueConn = block.getInput("INIT_VALUE").connection.targetConnection;
	if(initValueConn)//if there is initial value
	{
		var varName = Blockly.JavaScript.nameDB_.getName(
			block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
		var initValue = Blockly.CSharp.valueToCode(block, 
			'INIT_VALUE', Blockly.CSharp.ORDER_MODULUS);
		return varName+" = "+initValue+";\r\n";
	}
	else
	{
		return "";
	}	
};
Blockly.CSharp['DefVarType'] = function(block) {
  //C# version will generate statement in csharp.js
  return "";
};