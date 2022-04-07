(function() {
  var save=function(){
	  var flow = Blockly.serialization.workspaces.save(
        Blockly.getMainWorkspace());
	  var code = JSON.stringify(flow);
	  localStorage.setItem("savedCode",code);	  
  }
  var load=function(){
	  var code = localStorage.getItem("savedCode");
	  var flow = JSON.parse(code);
	  const workspace = Blockly.getMainWorkspace();
	  Blockly.serialization.workspaces.load(flow, workspace);	  	  
  }
  var execute=function(){
	let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    code += 'MusicMaker.play();';
    try
	{
		eval(code);  
	}
	catch(err)
	{
		alert("Error: "+err);
	}
  }
  document.getElementById("btnExecute").onclick=execute;
  document.getElementById("btnNew").onclick=function(){
	  if(!confirm("确认要清除现在的项目，创建新的？"))return;
	  const workspace = Blockly.getMainWorkspace();
	  Blockly.serialization.workspaces.load({}, workspace);		  
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
})();
