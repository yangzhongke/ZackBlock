(async function() {
  var saveToString=function(){
	  var flow = Blockly.serialization.workspaces.save(
        Blockly.getMainWorkspace());
	  return JSON.stringify(flow);
  }
  var loadFromString=function(str){
	  var flow = JSON.parse(str);
	  const workspace = Blockly.getMainWorkspace();
	  Blockly.serialization.workspaces.load(flow, workspace);	
  }
  var save=function(){
	  let str = saveToString();
	  localStorage.setItem("savedCode",str);	  
  }
  var load=function(){
	  var str = localStorage.getItem("savedCode");
	  if(str)
	  {
		  loadFromString(str);	  
	  }	  
  }
  var execute=async function(mode){
	let workspace = Blockly.getMainWorkspace();
	Blockly.CSharp.init(workspace);
	let errors =checkBeforeRun(workspace);
	if(errors.length>0)
	{
		alert("Error!\r\n"+errors.join('\r\n'));
		//layer.msg(errors.join(), {icon: 2});
		return;
	}
	let code;
	if(mode=="C#")
	{
		code = Blockly.CSharp.workspaceToCode(workspace);		
	}
	else
	{
		code = Blockly.JavaScript.workspaceToCode(workspace);
	}
	console.log("mode="+mode+"\n"+code);
    if(mode=='C#'&&code.indexOf('GameCore')<0)
	{
		const btnRun = document.getElementById("btnRun");
		btnRun.disabled=true;
		try
		{
			await IDE.csharp.runInPlace(code);
		}
		finally
		{
			btnRun.disabled=false;
		}		
	}
	else
	{
		layer.open({type: 2,content: 'gameplayer.html?'+new Date(),
			title:"Run", fixed: false,maxmin: true,area: ['80vw', '80vh'],
			success: function(dom, index){
				var framePlayer = window['layui-layer-iframe' + index];
				framePlayer.postMessage({mode:mode,code:code});
			}	  
		});
	}
  }
  document.getElementById("btnRun").onclick=function(){
	  execute("C#");
  };
  document.getElementById("btnRunFast").onclick=function(){
	  execute("js");
  };
  document.getElementById("btnNew").onclick=function(){
	  if(!confirm("Will you remove the current code and add a new one?"))return;
	  const workspace = Blockly.getMainWorkspace();
	  Blockly.serialization.workspaces.load({}, workspace);		  
  };
  document.getElementById("btnSave").onclick=function(){
	  var code = saveToString();
	  var file = new File([code], "project.zbk", { type: "text/plain;charset=utf-8" });
      saveAs(file);
  };
  document.getElementById("btnOpen").onclick=function(){
	  document.getElementById("fileLoadFrom").click();
  };  
  document.getElementById("btnCopyCode").onclick=function(){
	let code = Blockly.CSharp.workspaceToCode(Blockly.getMainWorkspace());
	navigator.clipboard.writeText(code);
	layer.msg('Code copied', {icon: 4});
  };
  document.getElementById("fileLoadFrom").onchange=function(){
	if(!this.files.length) return;
	var inputFile = this;
	let file = this.files[0];
	let reader = new FileReader();
	reader.onload = function(){
		loadFromString(this.result);
		inputFile.value=null;//确保让下次重新打开同一个文件的时候，还会触发onchange事件
	};
	reader.readAsText(file);  
  };
  Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox-categories'),
    scrollbars: true,
	media:'blocklymedia/',
  });
  load();
  var workspace = Blockly.getMainWorkspace();
  workspace.addChangeListener(function(){
	Blockly.CSharp.init(workspace);//https://github.com/google/blockly/issues/4060
	checkBlocks(workspace);
	let code = Blockly.CSharp.workspaceToCode(workspace);
	document.getElementById("code").textContent=code;
	hljs.highlightAll();
	save();
  });
  
})();

function findDefVarTypeBlock(workspace, varId)
{
	const allBlocks =workspace.getAllBlocks(false);
	const defVarTypeBlocks = allBlocks
		.filter(b=>b.type=='DefVarType'&&b.getField("VAR").getValue()==varId);
	if(defVarTypeBlocks.length>0)
	{
		return defVarTypeBlocks[0];
	}
	else
	{
		return null;
	}
}

//can varType be assigned from  valueType
function isAssignableFrom(varType, valueType)
{
	if(varType==valueType)
	{
		return true;
	}
	else if(valueType=='int')
	{
		return varType=='double'||varType=='float'||varType=='long';
	}
	else if(valueType=='double')
	{
		return false;
	}
	else if(valueType=='long')
	{
		return false;
	}
	else if(valueType=='float')
	{
		return varType=='double';
	}
	else if(valueType=='byte')
	{
		return varType=='int'||varType=='double'||varType=='long'||varType=='float';
	}
	else
	{
		return false;
	}
}

function checkTypeValueCompatibility(workspace, block, valueName)
{
	const varId = block.getField("VAR").getValue();
	const defVarTypeBlock=findDefVarTypeBlock(workspace,varId);
	if(!defVarTypeBlock) return;
	const varDefinedType = defVarTypeBlock.getField("TYPE").getValue();//type of variable on left side
	const inputConnection = block.getInput(valueName).connection;
	const valueBlock = inputConnection.targetBlock();
	if(!valueBlock) return;
	const valueType = inferValueTypeFromBlock(valueBlock);
	if(!varDefinedType||!valueType) return;
	if(!isAssignableFrom(varDefinedType,valueType))
	{
		inputConnection.disconnect();
		valueBlock.bumpNeighbours();
		//fix the bug, when a shadow block is disconnected.
		if(valueBlock.isShadow())
		{
			valueBlock.dispose();
		}
	}	
}

function checkBlocks(workspace)
{
	const allBlocks =workspace.getAllBlocks(false);
	
	//begin: check variables_set
	const varSetBlocks = allBlocks.filter(b=>b.type=='variables_set');
	for(let i=0;i<varSetBlocks.length;i++)
	{
		checkTypeValueCompatibility(workspace,varSetBlocks[i],'VALUE');
	}
	//end
	//begin: check variables_set
	const varMathChangeBlocks = allBlocks.filter(b=>b.type=='math_change');
	for(let i=0;i<varMathChangeBlocks.length;i++)
	{
		checkTypeValueCompatibility(workspace,varMathChangeBlocks[i],'DELTA');
	}
	//end
	//begin: check DefVarType
	const defVarTypeBlocks = allBlocks.filter(b=>b.type=='DefVarType');
	for(let i=0;i<defVarTypeBlocks.length;i++)
	{
		checkTypeValueCompatibility(workspace,defVarTypeBlocks[i],'INIT_VALUE');
	}
	//end	
	
	//begin: check 'CastAs'
	const defCastAsBlocks = allBlocks.filter(b=>b.type=='CastAs');
	for(let i=0;i<defCastAsBlocks.length;i++)
	{
		const block = defCastAsBlocks[0];
		let type = block.getFieldValue('TYPE');//type of variable on left side
		const inputConnection = block.getInput("VALUE").connection;
		const valueBlock = inputConnection.targetBlock();
		if(!valueBlock) return;
		const valueType = inferValueTypeFromBlock(valueBlock);
		if(!valueType) return;
		if(valueType!='int'&&valueType!='double'&&valueType!='long'
			&&valueType!='float'&&valueType!='byte')
		{
			inputConnection.disconnect();
			valueBlock.bumpNeighbours();
			//fix the bug, when a shadow block is disconnected.
			if(valueBlock.isShadow())
			{
				valueBlock.dispose();
			}
		}	
	}
	//end		
}

function checkBeforeRun(workspace)
{
	const errors = [];
	const allBlocks =workspace.getAllBlocks(true).filter(b=>b.isEnabled()&&!b.getInheritedDisabled());
	
	//begin: check duplicated variables declarations.
	const varDefTypeData=[];//key: varId, value:occurrence count
	const varDefTypeBlocks = allBlocks.filter(b=>b.type=='DefVarType');
	for(let i=0;i<varDefTypeBlocks.length;i++)
	{
		const varDefTypeBlock = varDefTypeBlocks[i];
		//original variable name is more reasonable than nameDB_.getName() for message
		const varName = varDefTypeBlock.getField("VAR").variable_.name;
		if(varDefTypeData[varName])
		{
			varDefTypeData[varName]=(varDefTypeData[varName]+1);
		}
		else
		{
			varDefTypeData[varName]= 1;
		}
	}
	for(let varName in varDefTypeData)
	{
		let count = varDefTypeData[varName];
		if(count>1)
		{
			if(isChineseUser())
			{
				errors.push("多次("+count
				+") 定义了变量"+varName);
			}
			else
			{
				errors.push("Multiple("+count
				+") 'Define variable type' block for variable:"+varName);
			}			
		}	
	}
	//end	
	
	//begin: check uninitialized variables before using
	const varGetBlocks = allBlocks.filter(b=>b.type=='variables_get');
	for(let i=0;i<varGetBlocks.length;i++)
	{
		const varGetBlock = varGetBlocks[i];
		const varId = varGetBlock.getField("VAR").getValue();
		if(!findVarSetBlockBefore(allBlocks,varId,varGetBlock))
		{
			const varName = varGetBlock.getField("VAR").variable_.name;
			if(isChineseUser())
			{
				errors.push(varName+" 变量在使用前没有被初始化");
			}
			else
			{
				errors.push(varName+" is used before initialization");
			}			
		}
	}
	//end
	return errors;
}

//find the first 'variables_get','controls_for','countdown_for' block or 'DefVarType' block which has INIT_VALUE for variable 'varId', before the block 'locationBlock'
function findVarSetBlockBefore(allBlocks, varId,locationBlock)
{
	for(let i=0;i<allBlocks.length;i++)
	{
		let block = allBlocks[i];
		if(block==locationBlock)break;
		if(block.type=="variables_set"&&
			block.getField("VAR").getValue()==varId)
		{
			return block;
		}
		//count with
		if(block.type=="controls_for"&&
			block.getField("VAR").getValue()==varId)
		{
			return block;
		}
		if(block.type=="countdown_for"&&
			block.getField("VAR").getValue()==varId)
		{
			return block;
		}
		//DefVarType
		if(block.type=="DefVarType"
			&&block.getField("VAR").getValue()==varId
			&&block.getInput("INIT_VALUE").connection.targetBlock())
		{
			return block;
		}
	}
	return null;
}