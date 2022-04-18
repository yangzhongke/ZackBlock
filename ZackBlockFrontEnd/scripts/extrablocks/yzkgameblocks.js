Blockly.defineBlocksWithJsonArray([
  {
    "type": "createText",
    "message0": "createText num%1 text%2",
    "args0": [
      {
        "type": "field_number",
        "name": "NUMBER"
      },
      {
        "type": "input_value",
        "name": "TEXT",
		"check": "String"
      }	  
    ],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['createText'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var text = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_MODULUS);
	var code="createText("+number+","+text+");\r\n";
	return code;
};
Blockly.CSharp['createText'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var text = Blockly.CSharp.valueToCode(block, 'TEXT',
      Blockly.CSharp.ORDER_MODULUS);
	var code="createText("+number+","+text+");\r\n";
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "setTextPosition",
    "message0": "setTextPosition num%1(%2,%3)",
    "args0": [
      {
        "type": "field_number",
        "name": "NUMBER"
      },
      {
        "type": "input_value",
        "name": "X",
		"check": "Number"
      }	,
      {
        "type": "input_value",
        "name": "Y",
		"check": "Number"
      }	  
    ],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['setTextPosition'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var x = Blockly.JavaScript.valueToCode(block, 'X',
      Blockly.JavaScript.ORDER_MODULUS);
	var y = Blockly.JavaScript.valueToCode(block, 'Y',
      Blockly.JavaScript.ORDER_MODULUS);
	var code="setTextPosition("+number+","+x+","+y+");\r\n";
	return code;
};
Blockly.CSharp['setTextPosition'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var x = Blockly.CSharp.valueToCode(block, 'X',
      Blockly.CSharp.ORDER_MODULUS);
	var y = Blockly.CSharp.valueToCode(block, 'Y',
      Blockly.CSharp.ORDER_MODULUS);
	var code="setTextPosition("+number+","+x+","+y+");\r\n";
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "setText",
    "message0": "setText num%1 text%2",
    "args0": [
      {
        "type": "field_number",
        "name": "NUMBER"
      },
      {
        "type": "input_value",
        "name": "TEXT",
		"check": "String"
      }  
    ],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['setText'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var text = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_MODULUS);
	var code="setText("+number+","+text+");\r\n";
	return code;
};
Blockly.CSharp['setText'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var text = Blockly.CSharp.valueToCode(block, 'TEXT',
      Blockly.CSharp.ORDER_MODULUS);
	var code="setText("+number+","+text+");\r\n";
	return code;
};
