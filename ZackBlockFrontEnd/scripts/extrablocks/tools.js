Blockly.defineBlocksWithJsonArray([
  {
    "type": "convert",
    "message0": "convert %1 to %2",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      },
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["int", "int"],
          ["string", "string"],
          ["bool", "bool"],
          ["double", "double"],
          ["long", "long"],
		  ["float", "float"],
		  ["byte", "byte"],
		  ["DateTime", "DateTime"]
        ]
      }	  
    ],
	"output":null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['convert'] = function(block) {
  let type = block.getFieldValue('TYPE');
  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_MODULUS);
  var code;
  switch(type)
  {
	case "long":
	case "int":
	case "byte":
		code='parseInt('+argument0+')';break;
	case "string":
		code="''+"+argument0;break;  
	case "bool":
		code='Boolean('+argument0+')';break;     
	case "float":
	case "double":
		code='parseFloat('+argument0+')';break;					
	case "DateTime":
		code='Date.parse('+argument0+')';break;	
	default:
		throw "unknown type "+type;
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.CSharp['convert'] = function(block) {
  let type = block.getFieldValue('TYPE');
  var argument0 = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_MODULUS);
  var code;
  switch(type)
  {
	case "byte":
		code='Convert.ToByte('+argument0+')';break;
	case "int":
		code='Convert.ToInt32('+argument0+')';break;
	case "string":
		code='Convert.ToString('+argument0+')';break; 
	case "bool":
		code='Convert.ToBoolean('+argument0+')';break;     
	case "float":
		code='float.Parse('+argument0+')';break;   
	case "double":
		code='Convert.ToDouble('+argument0+')';break;		
	case "long":
		code='Convert.ToInt64('+argument0+')';break;			
	case "DateTime":
		code='Convert.ToDateTime('+argument0+')';break;	
	default:
		throw "unknown type "+type;
  }
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "CastAs",
    "message0": "Cast %1 as %2",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      },
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["int", "int"],
          ["double", "double"],
          ["long", "long"],
		  ["float", "float"],
		  ["byte", "byte"]
        ]
      }	  
    ],
	"output":null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['CastAs'] = function(block) {
  let argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_MODULUS);
  let code=argument0;
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.CSharp['CastAs'] = function(block) {
  let type = block.getFieldValue('TYPE');
  var argument0 = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_MODULUS);
  let code='('+type+')'+argument0;
  return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "confirm",
    "message0": "confirm(\"%1\")",
    "args0": [
      {
        "type": "field_input",
        "name": "MESSAGE",
		'check': 'String'
      }  
    ],
	"output":"Boolean",
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['confirm'] = function(block) {
  var message = this.getFieldValue('MESSAGE');
  var code="confirm('"+message+"')"
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.CSharp['confirm'] = function(block) {
	var message = this.getFieldValue('MESSAGE');

	if (!Blockly.CSharp.definitions_['ShowConfirm']) 
	{
	  var functionName = Blockly.CSharp.variableDB_.getDistinctName('ShowConfirm', Blockly.Generator.NAME_TYPE);
	  var func = [];
	  func.push('bool ' + functionName + '(string message){');
	  func.push('  Console.WriteLine(message);');
	  func.push('  Console.WriteLine("确认请输入y，输入其他为否认。");');	  
	  func.push('  string ret = Console.ReadLine();');
	  func.push('  return ret.ToLower()=="y";');
	  func.push('};');
	  Blockly.CSharp.definitions_['ShowConfirm'] = func.join('\n');
	}  
	var code='ShowConfirm("'+message+'")';
	return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "delay",
    "message0": "delay for %1 ms",
    'args0': [{
      'type': 'field_number',
      'name': 'VALUE',
      'value': 1000,
    }],
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks"
  }
]);

Blockly.JavaScript['delay'] = function(block) {
	var value = this.getFieldValue('VALUE');
	var code="await new Promise(r => setTimeout(r, "+value+"));\r\n";
	return code;
};
Blockly.CSharp['delay'] = function(block) {
	var value = this.getFieldValue('VALUE');
	var code='await Task.Delay('+value+');\r\n';
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "writelog",
    "message0": "writelog %1",
    'args0': [{
      'type': 'input_value',
      'name': 'VALUE',
    }],
	"inputsInline": true,
	'previousStatement': null,
    'nextStatement': null,
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['writelog'] = function(block) {
	var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_MODULUS);
	var code="console.log("+value+");\r\n";
	return code;
};
Blockly.CSharp['writelog'] = function(block) {
	var value = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_MODULUS);
	var code='Console.WriteLine('+value+');\r\n';
	return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "getWindowWidth",
    "message0": "getWindowWidth",
	"output":"Number",
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['getWindowWidth'] = function(block) {
  var code="window.innerWidth";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.CSharp['getWindowWidth'] = function(block) {
	var code='GetWindowWidth()';
	return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "getWindowHeight",
    "message0": "getWindowHeight",
	"output":"Number",
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['getWindowHeight'] = function(block) {
  var code="window.innerHeight";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.CSharp['getWindowHeight'] = function(block) {
	var code='GetWindowHeight()';
	return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "promptString",
    "message0": "promptString(\"%1\")",
    "args0": [
      {
        "type": "field_input",
        "name": "MESSAGE",
		'check': 'String'
      }  
    ],
	"output":"String",
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['promptString'] = function(block) {
	var msg = Blockly.JavaScript.quote_(this.getFieldValue('MESSAGE'));
	code = 'prompt(' + msg + ')';
	return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.CSharp['promptString'] = function(block) {
	var msg = Blockly.CSharp.quote_(this.getFieldValue('MESSAGE'));
	var functionName = Blockly.CSharp.variableDB_.getDistinctName('PromptString', Blockly.Generator.NAME_TYPE);
	if (!Blockly.CSharp.definitions_['PromptString'])
	{
		var func = [];
		func.push('string ' + functionName + '(string msg){');
		func.push('  Console.WriteLine(msg);');
		func.push('  var res = Console.ReadLine();');
		func.push('  return res;');
		func.push('};');	
		Blockly.CSharp.definitions_['PromptString'] = func.join('\n');
	}
	code = functionName+'(' + msg + ')';
	return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};


Blockly.defineBlocksWithJsonArray([
  {
    "type": "promptInteger",
    "message0": "promptInteger(\"%1\")",
    "args0": [
      {
        "type": "field_input",
        "name": "MESSAGE",
		'check': 'String'
      }  
    ],
	"output":"Number",
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['promptInteger'] = function(block) {
	var msg = Blockly.JavaScript.quote_(this.getFieldValue('MESSAGE'));
	code = 'parseInt(prompt(' + msg + '))';
	return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.CSharp['promptInteger'] = function(block) {
	var msg = Blockly.CSharp.quote_(this.getFieldValue('MESSAGE'));
	var functionName = Blockly.CSharp.variableDB_.getDistinctName('PromptInteger', Blockly.Generator.NAME_TYPE);
	if (!Blockly.CSharp.definitions_['PromptInteger'])
	{
		var func = [];
		func.push('int ' + functionName + '(string msg){');
		func.push('  Console.WriteLine(msg);');
		func.push('  var res = Console.ReadLine();');
		func.push('  return Convert.ToInt32(res);');
		func.push('};');	
		Blockly.CSharp.definitions_['PromptInteger'] = func.join('\n');
	}
	code = functionName+'(' + msg + ')';
	return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "promptDouble",
    "message0": "promptDouble(\"%1\")",
    "args0": [
      {
        "type": "field_input",
        "name": "MESSAGE",
		'check': 'String'
      }  
    ],
	"output":"Number",
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['promptDouble'] = function(block) {
	var msg = Blockly.JavaScript.quote_(this.getFieldValue('MESSAGE'));
	code = 'parseFloat(prompt(' + msg + '))';
	return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.CSharp['promptDouble'] = function(block) {
	var msg = Blockly.CSharp.quote_(this.getFieldValue('MESSAGE'));
	var functionName = Blockly.CSharp.variableDB_.getDistinctName('PromptDouble', Blockly.Generator.NAME_TYPE);
	if (!Blockly.CSharp.definitions_['promptDouble'])
	{
		var func = [];
		func.push('double ' + functionName + '(string msg){');
		func.push('  Console.WriteLine(msg);');
		func.push('  var res = Console.ReadLine();');
		func.push('  return Convert.ToDouble(res);');
		func.push('};');	
		Blockly.CSharp.definitions_['promptDouble'] = func.join('\n');
	}
	code = functionName+'(' + msg + ')';
	return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "readLine",
    "message0": "readLine",
	"output":"String",
    "style": "text_blocks",
  }
]);

Blockly.JavaScript['readLine'] = function(block) {
	const code = 'prompt()';
	return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.CSharp['readLine'] = function(block) {
	const code = 'Console.ReadLine()';
	return [code, Blockly.CSharp.ORDER_FUNCTION_CALL];
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "SingleLineComment",
    "message0": "//%1",
    "args0": [
      {
        "type": "field_input",
        "name": "MESSAGE",
		'check': 'String',
      }  
    ],
	'previousStatement': null,
    'nextStatement': null,
    "style": "variable_blocks",
  }
]);

Blockly.JavaScript['SingleLineComment'] = function(block) {
	var msg = this.getFieldValue('MESSAGE');
	return'//'+msg+'\r\n';
};
Blockly.CSharp['SingleLineComment'] = function(block) {
	var msg = this.getFieldValue('MESSAGE');
	return '//'+msg+'\r\n';
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "MultiLineComment",
    "message0": "/*%1*/",
    "args0": [
      {
        "type": "field_multilinetext",
        "name": "MESSAGE",
		'check': 'String',
      }  
    ],
	'previousStatement': null,
    'nextStatement': null,
    "style": "variable_blocks",
  }
]);

Blockly.JavaScript['MultiLineComment'] = function(block) {
	var msg = this.getFieldValue('MESSAGE');
	return'/*'+msg+'*/\r\n';
};
Blockly.CSharp['MultiLineComment'] = function(block) {
	var msg = this.getFieldValue('MESSAGE');
	return '/*'+msg+'*/\r\n';
};