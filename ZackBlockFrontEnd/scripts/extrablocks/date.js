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
    "message0": "create datetime %1-%2-%3 %4:%5:%6",
    "args0": [
      {
        "type": "input_value",
        "name": "YEAR",
		"check": "Number"
      },
      {
        "type": "input_value",
        "name": "MONTH",
		"check": "Number"
      },
      {
        "type": "input_value",
        "name": "DAY",
		"check": "Number"
      },
      {
        "type": "input_value",
        "name": "HOUR",
		"check": "Number"
      },
      {
        "type": "input_value",
        "name": "MINUTE",
		"check": "Number"
      },
      {
        "type": "input_value",
        "name": "SECOND",
		"check": "Number"
      },	  
    ],
	"inputsInline": true,
	"output":"DateTime",
    "style": "text_blocks"
  }
]);

Blockly.defineBlocksWithJsonArray([
  {
    "type": "create_date_from",
    "message0": "create date %1-%2-%3",
    "args0": [
      {
        "type": "input_value",
        "name": "YEAR",
		"check": "Number"
      },
      {
        "type": "input_value",
        "name": "MONTH",
		"check": "Number"
      },
      {
        "type": "input_value",
        "name": "DAY",
		"check": "Number"
      }	  
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
  let order=Blockly.JavaScript.ORDER_FUNCTION_CALL;
  switch(type)
  {
	  case "year":
		code = argument0+'.'+"getFullYear()";break;
	  case "month":
	    order=Blockly.JavaScript.ORDER_ADDITION;
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
  return [code, order];
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
      Blockly.JavaScript.ORDER_COMMA);
  if(!year){year=2019;}
  var month = Blockly.JavaScript.valueToCode(block, 'MONTH',
      Blockly.JavaScript.ORDER_COMMA);
  if(!month){month=1;}
  var day = Blockly.JavaScript.valueToCode(block, 'DAY',
      Blockly.JavaScript.ORDER_COMMA);
  if(!day){day=1;}
  var hour = Blockly.JavaScript.valueToCode(block, 'HOUR',
      Blockly.JavaScript.ORDER_COMMA);
  if(!hour){hour=0;}
  var minute = Blockly.JavaScript.valueToCode(block, 'MINUTE',
      Blockly.JavaScript.ORDER_COMMA);
  if(!minute){minute=0;}
  var second = Blockly.JavaScript.valueToCode(block, 'SECOND',
      Blockly.JavaScript.ORDER_COMMA);  
  if(!second){second=0;}
  return ['new Date('+year+',('+month+'-1),'+day+','+hour+','+minute+','+second+')', Blockly.JavaScript.ORDER_NEW];
};
Blockly.CSharp['create_datetime_from'] = function(block) {
  var year = Blockly.CSharp.valueToCode(block, 'YEAR',
      Blockly.CSharp.ORDER_COMMA);
  if(!year){year=2019;}
  var month = Blockly.CSharp.valueToCode(block, 'MONTH',
      Blockly.CSharp.ORDER_COMMA);
  if(!month){month=1;}
  var day = Blockly.CSharp.valueToCode(block, 'DAY',
      Blockly.CSharp.ORDER_COMMA);
  if(!day){day=1;}
  var hour = Blockly.CSharp.valueToCode(block, 'HOUR',
      Blockly.CSharp.ORDER_COMMA);
  if(!hour){hour=0;}
  var minute = Blockly.CSharp.valueToCode(block, 'MINUTE',
      Blockly.CSharp.ORDER_COMMA);
  if(!minute){minute=0;}
  var second = Blockly.CSharp.valueToCode(block, 'SECOND',
      Blockly.CSharp.ORDER_COMMA);  
  if(!second){second=0;}
  return ['new DateTime('+year+','+month+','+day+','+hour+','+minute+','+second+')', Blockly.CSharp.ORDER_NEW];
};

Blockly.JavaScript['create_date_from'] = function(block) {	
  var year = Blockly.JavaScript.valueToCode(block, 'YEAR',
      Blockly.JavaScript.ORDER_COMMA);
  if(!year){year=2019;}
  var month = Blockly.JavaScript.valueToCode(block, 'MONTH',
      Blockly.JavaScript.ORDER_COMMA);
  if(!month){month=1;}
  var day = Blockly.JavaScript.valueToCode(block, 'DAY',
      Blockly.JavaScript.ORDER_COMMA);
  if(!day){day=1;}
  
  return ['new Date('+year+',('+month+'-1),'+day+')', Blockly.JavaScript.ORDER_NEW];
};
Blockly.CSharp['create_date_from'] = function(block) {
  var year = Blockly.CSharp.valueToCode(block, 'YEAR',
      Blockly.CSharp.ORDER_COMMA);
  if(!year){year=2019;}
  var month = Blockly.CSharp.valueToCode(block, 'MONTH',
      Blockly.CSharp.ORDER_COMMA);
  if(!month){month=1;}
  var day = Blockly.CSharp.valueToCode(block, 'DAY',
      Blockly.CSharp.ORDER_COMMA); 
  if(!day){day=1;}
  
  return ['new DateTime('+year+','+month+','+day+')', Blockly.CSharp.ORDER_NEW];
};
