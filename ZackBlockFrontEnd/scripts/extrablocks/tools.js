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
	case "int":
		code='parseInt('+argument0+')';break;
	case "string":
		code="''+"+argument0;break;  
	case "bool":
		code='Boolean('+argument0+')';break;     		
	case "double":
		code='parseFloat('+argument0+')';break;		
	case "long":
		code='parseInt('+argument0+')';break;			
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
	case "int":
		code='Convert.ToInt32('+argument0+')';break;
	case "string":
		code='Convert.ToString('+argument0+')';break; 
	case "bool":
		code='Convert.ToBoolean('+argument0+')';break;     		
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