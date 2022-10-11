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
	let code = Blockly.CSharp.workspaceToCode(workspace);
	document.getElementById("code").innerText=code;
	save();
  });

	const createFlyout = function(workspace) {
		let xmlList = [];
		const button = document.createElement('button');
		button.setAttribute('text', 'Create Typed Variable');
		button.setAttribute('callbackKey', 'callbackName');
		xmlList.push(button);

		// This gets all the variables that the user creates and adds them to the
		// flyout.
		const blockList = Blockly.VariablesDynamic.flyoutCategoryBlocks(workspace);
		xmlList = xmlList.concat(blockList);
		return xmlList;
	};  	
	workspace.registerToolboxCategoryCallback('CREATE_TYPED_VARIABLE', createFlyout);
	var types = ['int','string','bool','double','DateTime'];
	var typesMap=[];
	for(var i=0;i<types.length;i++)
	{
		var t = types[i];
		typesMap.push([t,t]);
	}
	const typedVarModal = new TypedVariableModal(workspace, 'callbackName', typesMap);
	typedVarModal.init();
})();
