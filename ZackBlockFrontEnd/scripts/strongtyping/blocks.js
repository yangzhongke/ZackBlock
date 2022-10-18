Blockly.defineBlocksWithJsonArray([
  {
    "type": "DefVarType",
    "message0": "Define %1 as %2",
    "args0": [
      {
		'type': 'field_variable',
		'name': 'VAR',
		'variable': 'i',
      },
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["int", "int"],
          ["string", "string"],
          ["bool", "bool"],
          ["double", "double"],
		  ["DateTime", "DateTime"]
        ]
      }	  
    ],
	'previousStatement': null,
    'nextStatement': null,
    "style": "variable_blocks",
  }
]);

Blockly.JavaScript['DefVarType'] = function(block) {
  return ""
};
Blockly.CSharp['DefVarType'] = function(block) {
  return "";
};