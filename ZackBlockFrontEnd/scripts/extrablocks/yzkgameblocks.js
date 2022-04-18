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
		"check": "String",
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
	if(!text){text="''";}
	var code="createText("+number+","+text+");\r\n";
	return code;
};
Blockly.CSharp['createText'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var text = Blockly.CSharp.valueToCode(block, 'TEXT',
      Blockly.CSharp.ORDER_MODULUS);
	if(!text){text="''";}
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
	if(!x){x=0;}
	if(!y){y=0;}
	var code="setTextPosition("+number+","+x+","+y+");\r\n";
	return code;
};
Blockly.CSharp['setTextPosition'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var x = Blockly.CSharp.valueToCode(block, 'X',
      Blockly.CSharp.ORDER_MODULUS);
	var y = Blockly.CSharp.valueToCode(block, 'Y',
      Blockly.CSharp.ORDER_MODULUS);
	if(!x){x=0;}
	if(!y){y=0;}	  
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
		if(!x){x=0;}
	if(!text){text="''";}  
	var code="setText("+number+","+text+");\r\n";
	return code;
};
Blockly.CSharp['setText'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var text = Blockly.CSharp.valueToCode(block, 'TEXT',
      Blockly.CSharp.ORDER_MODULUS);
	if(!text){text="''";}  
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
	if(!color){color="'#000000'";}  
	var code="setTextColor("+number+","+color+");\r\n";
	return code;
};
Blockly.CSharp['setTextColor'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var color = Blockly.CSharp.valueToCode(block, 'COLOR',
      Blockly.CSharp.ORDER_MODULUS);
	if(!color){color="System.Drawing.Color.Black";}  
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
	if(!font){font="";}  
	var code="setTextFont("+number+","+font+");\r\n";
	return code;
};
Blockly.CSharp['setTextFont'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var font = Blockly.CSharp.valueToCode(block, 'FONT',
      Blockly.CSharp.ORDER_MODULUS);
	if(!font){font="null";}  
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
	if(!url){font="''";}  
	var code="createImage("+number+","+url+");\r\n";
	return code;
};
Blockly.CSharp['createImage'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var url = Blockly.CSharp.valueToCode(block, 'URL',
      Blockly.CSharp.ORDER_MODULUS);
	if(!url){font="null";}  
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
	if(!x){x=0;}  
	if(!y){y=0;}  
	var code="setImagePosition("+number+","+x+","+y+");\r\n";
	return code;
};
Blockly.CSharp['setImagePosition'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var x = Blockly.CSharp.valueToCode(block, 'X',
      Blockly.CSharp.ORDER_MODULUS);
	var y = Blockly.CSharp.valueToCode(block, 'Y',
      Blockly.CSharp.ORDER_MODULUS);
	if(!x){x=0;}  
	if(!y){y=0;}  	  
	var code="setImagePosition("+number+","+x+","+y+");\r\n";
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
	if(!url){url="''";}
	var code="setImageURL("+number+","+url+");\r\n";
	return code;
};
Blockly.CSharp['setImageURL'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var url = Blockly.CSharp.valueToCode(block, 'URL',
      Blockly.CSharp.ORDER_MODULUS);
	if(!url){url="null";}
	var code="setImageURL("+number+","+url+");\r\n";
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

//Sprite
Blockly.defineBlocksWithJsonArray([
  {
    "type": "createSprite",
    "message0": "createSprite num%1 Name%2",
    "args0": [
      {
        "type": "field_number",
        "name": "NUMBER"
      },
      {
        "type": "input_dummy",
        "name": "NAME",
      }	  
    ],
	"extensions": ["createSprite_menu_extension"],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.Extensions.register('createSprite_menu_extension',
  function() {
    this.getInput('NAME')
      .appendField(new Blockly.FieldDropdown(
        function() {
		  //spriteManifest is defined and loaded in yzkgame.js
		  var spriteNames = spriteManifest.map(s=>[s.name,s.name]);	
		  return spriteNames;
        }
		),"NAME");
});	

Blockly.JavaScript['createSprite'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var name = this.getFieldValue("NAME");
	if(!name){name="''";}  
	var code="createSprite("+number+",'"+name+"');\r\n";
	return code;
};
Blockly.CSharp['createSprite'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var name = this.getFieldValue("NAME");
	if(!name){name="null";}  
	var code='createSprite('+number+',"'+name+'");\r\n';
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "playSpriteAnimation",
    "message0": "playSpriteAnimation num%1 Name%2",
    "args0": [
      {
        "type": "field_number",
        "name": "NUMBER"
      },
      {
        "type": "input_dummy",
        "name": "NAME",
      }	  
    ],
	"extensions": ["playSpriteAnimation_menu_extension"],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.Extensions.register('playSpriteAnimation_menu_extension',
  function() {
	let thisBlock =this;
    this.getInput('NAME')
      .appendField(new Blockly.FieldDropdown(
        function() {
		  let number = thisBlock.getFieldValue("NUMBER");
		  var allBlocks =Blockly.getMainWorkspace()
			.getAllBlocks(false);
	      //find the related createSprite
		  var createSpriteBlocks = allBlocks
		    .filter(b=>b.type=='createSprite'
			&&b.getFieldValue('NUMBER')==number);
		  if(createSpriteBlocks.length>0)
		  {
			  let spriteName = createSpriteBlocks[0].getFieldValue("NAME");
			  //load animations
			  let animationNames=spriteManifest.filter(s=>s.name==spriteName)[0]
			    .animations.map(a=>[a.name,a.name]);
			  return animationNames;
		  }
		  return [["empty","empty"]];
        }
		),"NAME");
});	

Blockly.JavaScript['playSpriteAnimation'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var name = this.getFieldValue("NAME");
	if(!name){name="''";}  
	var code="playSpriteAnimation("+number+",'"+name+"');\r\n";
	return code;
};
Blockly.CSharp['playSpriteAnimation'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var name = this.getFieldValue("NAME");
	if(!name){name="null";}  
	var code='playSpriteAnimation('+number+',"'+name+'");\r\n';
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "setSpritePosition",
    "message0": "setSpritePosition num%1(%2,%3)",
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

Blockly.JavaScript['setSpritePosition'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var x = Blockly.JavaScript.valueToCode(block, 'X',
      Blockly.JavaScript.ORDER_MODULUS);
	var y = Blockly.JavaScript.valueToCode(block, 'Y',
      Blockly.JavaScript.ORDER_MODULUS);
	if(!x){x=0;}  
	if(!y){y=0;}  
	var code="setSpritePosition("+number+","+x+","+y+");\r\n";
	return code;
};
Blockly.CSharp['setSpritePosition'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var x = Blockly.CSharp.valueToCode(block, 'X',
      Blockly.CSharp.ORDER_MODULUS);
	var y = Blockly.CSharp.valueToCode(block, 'Y',
      Blockly.CSharp.ORDER_MODULUS);
	if(!x){x=0;}  
	if(!y){y=0;}  	  
	var code="setSpritePosition("+number+","+x+","+y+");\r\n";
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "hideSprite",
    "message0": "hideSprite num%1",
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

Blockly.JavaScript['hideSprite'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var code="hideSprite("+number+");\r\n";
	return code;
};
Blockly.CSharp['hideSprite'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var code="hideSprite("+number+");\r\n";
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "showSprite",
    "message0": "showSprite num%1",
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

Blockly.JavaScript['showSprite'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var code="showSprite("+number+");\r\n";
	return code;
};
Blockly.CSharp['showSprite'] = function(block) {
	var number = this.getFieldValue('NUMBER');
	var code="showSprite("+number+");\r\n";
	return code;
};


