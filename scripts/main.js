(function() {
  var load=function(){
	  var code = localStorage.getItem("savedCode");
	  var flow = JSON.parse(code);
	  const workspace = Blockly.getMainWorkspace();
	  Blockly.serialization.workspaces.load(flow, workspace);	  	  
  }
  document.getElementById("btnExecute").onclick=function(){
	let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    code += 'MusicMaker.play();';
    try {
      eval(code);
    } catch (error) {
      console.log(error);
    }	  	  
  };
  document.getElementById("btnSave").onclick=function(){
	  var flow = Blockly.serialization.workspaces.save(
        Blockly.getMainWorkspace());
	  var code = JSON.stringify(flow);
	  localStorage.setItem("savedCode",code);
  };
  document.getElementById("btnLoad").onclick=load;  
  
  Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox-categories'),
    scrollbars: false,
  });
  load();
  var workspace = Blockly.getMainWorkspace();
  workspace.addChangeListener(function(){
	  let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
	  document.getElementById("code").innerText=code;
  });
})();
