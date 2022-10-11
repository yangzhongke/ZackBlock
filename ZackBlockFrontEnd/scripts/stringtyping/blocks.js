Blockly.defineBlocksWithJsonArray([
  {
    "type": "DefVarType",
    "message0": "Define %1 as %2",
    "args0": [
      {
		'type': 'field_variable',
		'name': 'VAR',
		'variable': '%{BKY_VARIABLES_DEFAULT_NAME}',
      },
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["int", "int"],
          ["string", "string"],
          ["bool", "bool"],
          ["double", "double"],
		  ["float", "float"],
          ["long", "long"],
		  ["DateTime", "DateTime"]
        ]
      }	  
    ],
	"output":"TypeDef",
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['DefVarType'] = function(block) {
  return ["", Blockly.JavaScript.ORDER_NONE];
};
Blockly.CSharp['DefVarType'] = function(block) {
  return ["", Blockly.CSharp.ORDER_NONE];
};