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
  var execute=function(){
	let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
	let fullCode="try{clearGame();"+code+"}catch(err){console.error(err);alert(err)}";
	console.log(code);
	//execute the code in a separate iframe, so that the code can be ran multiple times without confliction.
	layer.open({type: 2,content: 'gameplayer.html?'+new Date(),
		title:"Run", fixed: false,maxmin: true,area: ['80vw', '80vh'],
		success: function(dom, index){
			var framePlayer = window['layui-layer-iframe' + index];
			framePlayer.postMessage("(async () => {" + fullCode + "})()");
		}	  
	});	
  }
  document.getElementById("btnExecute").onclick=execute;
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
  });
  load();
  var workspace = Blockly.getMainWorkspace();
  workspace.addChangeListener(function(){
	checkBlocks(workspace);	  
	let code = Blockly.CSharp.workspaceToCode(workspace);
	document.getElementById("code").innerText=code;
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
	else if(varType=='double'&&valueType=='int')
	{
		return true;
	}
	else
	{
		return false;
	}
}

function checkBlocks(workspace)
{
	const allBlocks =workspace.getAllBlocks(false);
	
	//begin: check variables_set
	const varSetBlocks = allBlocks.filter(b=>b.type=='variables_set'||b.type=='math_change');
	for(let i=0;i<varSetBlocks.length;i++)
	{
		const varSetBlock = varSetBlocks[i];
		const varId = varSetBlock.getField("VAR").getValue();
		const defVarTypeBlock=findDefVarTypeBlock(workspace,varId);
		if(!defVarTypeBlock) continue;
		const varDefinedType = defVarTypeBlock.getField("TYPE").getValue();//type of variable on left side
		const inputConnection = varSetBlock.inputList[0].connection;
		const valueBlock = inputConnection.targetBlock();
		if(!valueBlock) continue;
		const valueType = inferValueTypeFromBlock(valueBlock);
		if(!varDefinedType||!valueType) continue;
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
	//end
}