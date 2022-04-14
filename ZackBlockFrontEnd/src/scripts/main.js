(function() {
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
	  loadFromString(str);	  
  }
  var execute=function(){
	let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
	console.log(code);
    try
	{
		eval(code);  
	}
	catch(err)
	{
		console.error(err);
		alert("Error: "+err);
	}
  }
  document.getElementById("btnExecute").onclick=execute;
  document.getElementById("btnNew").onclick=function(){
	  if(!confirm("确认要清除现在的项目，创建新的？"))return;
	  const workspace = Blockly.getMainWorkspace();
	  Blockly.serialization.workspaces.load({}, workspace);		  
  };
  document.getElementById("code").ondblclick=function(){
	var range = document.createRange();
	range.selectNode(this);
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(range);	  
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
	//let code = Blockly.JavaScript.workspaceToCode(workspace);
	document.getElementById("code").innerText=code;
	save();
  });
  
  //Blockly.setLocale('zh-hans');
})();
