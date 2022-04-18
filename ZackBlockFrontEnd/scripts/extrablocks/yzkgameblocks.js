//Text

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

Blockly.defineBlocksWithJsonArray([
  {
    "type": "setTextColor",
    "message0": "setTextColor num%1 color%2",
    "args0": [
      {
        "type": "field_number",
        "name": "NUMBER"
      },
      {
        "type": "input_value",
        "name": "COLOR",
		"check": "Colour"
      }  
    ],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['setTextColor'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var color = Blockly.JavaScript.valueToCode(block, 'COLOR',
      Blockly.JavaScript.ORDER_MODULUS);
	var code="setTextColor("+number+","+color+");\r\n";
	return code;
};
Blockly.CSharp['setTextColor'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var color = Blockly.CSharp.valueToCode(block, 'COLOR',
      Blockly.CSharp.ORDER_MODULUS);
	var code="setTextColor("+number+","+color+");\r\n";
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "setTextFont",
    "message0": "setTextFont num%1 font%2",
    "args0": [
      {
        "type": "field_number",
        "name": "NUMBER"
      },
      {
        "type": "input_value",
        "name": "FONT",
		"check": "String"
      }  
    ],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['setTextFont'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var font = Blockly.JavaScript.valueToCode(block, 'FONT',
      Blockly.JavaScript.ORDER_MODULUS);
	var code="setTextFont("+number+","+font+");\r\n";
	return code;
};
Blockly.CSharp['setTextFont'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var font = Blockly.CSharp.valueToCode(block, 'FONT',
      Blockly.CSharp.ORDER_MODULUS);
	var code="setTextFont("+number+","+font+");\r\n";
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "hideText",
    "message0": "hideText num%1",
    "args0": [
      {
        "type": "field_number",
        "name": "NUMBER"
      }
    ],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['hideText'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var code="hideText("+number+");\r\n";
	return code;
};
Blockly.CSharp['hideText'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var code="hideText("+number+");\r\n";
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "showText",
    "message0": "showText num%1",
    "args0": [
      {
        "type": "field_number",
        "name": "NUMBER"
      }
    ],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['showText'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var code="showText("+number+");\r\n";
	return code;
};
Blockly.CSharp['showText'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var code="showText("+number+");\r\n";
	return code;
};

//Image
Blockly.defineBlocksWithJsonArray([
  {
    "type": "createImage",
    "message0": "createImage num%1 URL%2",
    "args0": [
      {
        "type": "field_number",
        "name": "NUMBER"
      },
      {
        "type": "input_value",
        "name": "URL",
		"check": "String"
      }	  
    ],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['createImage'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var url = Blockly.JavaScript.valueToCode(block, 'URL',
      Blockly.JavaScript.ORDER_MODULUS);
	var code="createImage("+number+","+url+");\r\n";
	return code;
};
Blockly.CSharp['createImage'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var url = Blockly.CSharp.valueToCode(block, 'URL',
      Blockly.CSharp.ORDER_MODULUS);
	var code="createImage("+number+","+url+");\r\n";
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "setImagePosition",
    "message0": "setImagePosition num%1(%2,%3)",
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

Blockly.JavaScript['setImagePosition'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var x = Blockly.JavaScript.valueToCode(block, 'X',
      Blockly.JavaScript.ORDER_MODULUS);
	var y = Blockly.JavaScript.valueToCode(block, 'Y',
      Blockly.JavaScript.ORDER_MODULUS);
	var code="setImagePosition("+number+","+x+","+y+");\r\n";
	return code;
};
Blockly.CSharp['setImagePosition'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var x = Blockly.CSharp.valueToCode(block, 'X',
      Blockly.CSharp.ORDER_MODULUS);
	var y = Blockly.CSharp.valueToCode(block, 'Y',
      Blockly.CSharp.ORDER_MODULUS);
	var code="setImagePosition("+number+","+x+","+y+");\r\n";
	return code;
};


Blockly.defineBlocksWithJsonArray([
  {
    "type": "hideImage",
    "message0": "hideImage num%1",
    "args0": [
      {
        "type": "field_number",
        "name": "NUMBER"
      }
    ],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['hideImage'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var code="hideImage("+number+");\r\n";
	return code;
};
Blockly.CSharp['hideImage'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var code="hideImage("+number+");\r\n";
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "showImage",
    "message0": "showImage num%1",
    "args0": [
      {
        "type": "field_number",
        "name": "NUMBER"
      }
    ],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['showImage'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var code="showImage("+number+");\r\n";
	return code;
};
Blockly.CSharp['showImage'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var code="showImage("+number+");\r\n";
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "setImageURL",
    "message0": "setImageURL num%1 URL%2",
    "args0": [
      {
        "type": "field_number",
        "name": "NUMBER"
      },
      {
        "type": "input_value",
        "name": "URL",
		"check": "String"
      }	  
    ],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['setImageURL'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var url = Blockly.JavaScript.valueToCode(block, 'URL',
      Blockly.JavaScript.ORDER_MODULUS);
	var code="setImageURL("+number+","+url+");\r\n";
	return code;
};
Blockly.CSharp['setImageURL'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var url = Blockly.CSharp.valueToCode(block, 'URL',
      Blockly.CSharp.ORDER_MODULUS);
	var code="setImageURL("+number+","+url+");\r\n";
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "setImageScaleX",
    "message0": "setImageScaleX num%1 scale%2",
    "args0": [
      {
        "type": "field_number",
        "name": "NUMBER"
      },
      {
        "type": "input_value",
        "name": "SCALE",
		"check": "Number"
      }	  
    ],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['setImageScaleX'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var scale = Blockly.JavaScript.valueToCode(block, 'SCALE',
      Blockly.JavaScript.ORDER_MODULUS);
	var code="setImageScaleX("+number+","+scale+");\r\n";
	return code;
};
Blockly.CSharp['setImageScaleX'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var scale = Blockly.CSharp.valueToCode(block, 'SCALE',
      Blockly.CSharp.ORDER_MODULUS);
	var code="setImageScaleX("+number+","+scale+");\r\n";
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "setImageScaleY",
    "message0": "setImageScaleY num%1 scale%2",
    "args0": [
      {
        "type": "field_number",
        "name": "NUMBER"
      },
      {
        "type": "input_value",
        "name": "SCALE",
		"check": "Number"
      }	  
    ],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['setImageScaleY'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var scale = Blockly.JavaScript.valueToCode(block, 'SCALE',
      Blockly.JavaScript.ORDER_MODULUS);
	var code="setImageScaleY("+number+","+scale+");\r\n";
	return code;
};
Blockly.CSharp['setImageScaleY'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var scale = Blockly.CSharp.valueToCode(block, 'SCALE',
      Blockly.CSharp.ORDER_MODULUS);
	var code="setImageScaleY("+number+","+scale+");\r\n";
	return code;
};