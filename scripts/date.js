Blockly.defineBlocksWithJsonArray([
  {
    "type": "now",
    "message0": "now",
	"output":"DateTime",
    "style": "text_blocks"
  }
]);

Blockly.defineBlocksWithJsonArray([
  {
    "type": "today",
    "message0": "today",
	"output":"DateTime",
    "style": "text_blocks"
  }
]);

Blockly.defineBlocksWithJsonArray([
  {
    "type": "get_datetime_part",
    "message0": "get %1 from %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "TYPE",
        "options": [
          ["year", "year"],
          ["month", "month"],
          ["day", "day"],
          ["hour", "hour"],
          ["minute", "minute"],
		  ["second", "second"]
        ]
      },
      {
        "type": "input_value",
        "name": "VALUE",
		"check": "DateTime"
      }
    ],
	"output":"Number",
    "style": "text_blocks"
  }
]);

Blockly.defineBlocksWithJsonArray([
  {
    "type": "create_datetime_from",
    "message0": "create datetime from %1-%2-%3 %4:%5:%6",
    "args0": [
      {
        "type": "input_value",
        "name": "YEAR",
		"check": "NUM"
      },
      {
        "type": "input_value",
        "name": "MONTH",
		"check": "NUM"
      },
      {
        "type": "input_value",
        "name": "DAY",
		"check": "NUM"
      },
      {
        "type": "input_value",
        "name": "HOUR",
		"check": "NUM"
      },
      {
        "type": "input_value",
        "name": "MINUTE",
		"check": "NUM"
      },
      {
        "type": "input_value",
        "name": "SECOND",
		"check": "NUM"
      },	  
    ],
	"inputsInline": true,
	"output":"DateTime",
    "style": "text_blocks"
  }
]);

Blockly.JavaScript['now'] = function() {	
  return ["new Date()", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.CSharp['now'] = function() {
  return ["DateTime.Now", Blockly.CSharp.ORDER_ATOMIC];
};

Blockly.JavaScript['today'] = function() {	
  return ["new Date(new Date().toDateString())", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.CSharp['today'] = function() {
  return ["DateTime.Today", Blockly.CSharp.ORDER_ATOMIC];
};

Blockly.JavaScript['get_datetime_part'] = function(block) {	
  let type = block.getFieldValue('TYPE');
  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_MODULUS);
  let code;
  switch(type)
  {
	  case "year":
		code = argument0+'.'+"getFullYear()";break;
	  case "month":
	    code = argument0+'.'+"getMonth()+1";break;
	  case "day":
	    code = argument0+'.'+"getDate()";break;
	  case "hour":
	    code = argument0+'.'+"getHours()";break;
	  case "minute":
	    code = argument0+'.'+"getMinutes()";break;
	  case "second":
	    code = argument0+'.'+"getSeconds()";break;
	  default:
		throw "unkown type:"+type;
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.CSharp['get_datetime_part'] = function(block) {
  let type = block.getFieldValue('TYPE');
  var argument0 = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_MODULUS);
  let funcName;
  switch(type)
  {
	  case "year":
		funcName="Year";
	    break;
	  case "month":
	    funcName="Month";
	    break;
	  case "day":
	    funcName="Day";	  
	    break;
	  case "hour":
	    funcName="Hour";	  
	    break;
	  case "minute":
	    funcName="Minute";	  
	    break;
	  case "second":
	    funcName="Second";	  
	    break;		
	  default:
		throw "unkown type:"+type;
  }
  return [argument0+'.'+funcName, Blockly.CSharp.ORDER_ATOMIC];
};

Blockly.JavaScript['create_datetime_from'] = function(block) {	
  var year = Blockly.JavaScript.valueToCode(block, 'YEAR',
      Blockly.JavaScript.ORDER_MODULUS);
  var month = Blockly.JavaScript.valueToCode(block, 'MONTH',
      Blockly.JavaScript.ORDER_MODULUS);
  var day = Blockly.JavaScript.valueToCode(block, 'DAY',
      Blockly.JavaScript.ORDER_MODULUS);
  var hour = Blockly.JavaScript.valueToCode(block, 'HOUR',
      Blockly.JavaScript.ORDER_MODULUS);
  var minute = Blockly.JavaScript.valueToCode(block, 'MINUTE',
      Blockly.JavaScript.ORDER_MODULUS);
  var second = Blockly.JavaScript.valueToCode(block, 'SECOND',
      Blockly.JavaScript.ORDER_MODULUS);  
  
  return ['new Date('+year+','+month+','+day+','+hour+','+minute+','+'second'+')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.CSharp['create_datetime_from'] = function(block) {
  let type = block.getFieldValue('TYPE');
  var argument0 = Blockly.CSharp.valueToCode(block, 'VALUE',
      Blockly.CSharp.ORDER_MODULUS);
  
  return [argument0+'.'+funcName, Blockly.CSharp.ORDER_ATOMIC];
};
