<template>
<div>
    <div class="blockly-editor" id="blocklyEditor" style="float:left;height: 480px; width: 50vw;">
      <div id="blocklyDiv" style="height: 100%; width: 100%;"></div>
    </div>
	<div style="float:left;margin-left:10px;width: 46vw;overflow-x: scroll;">
		<input type="button" @click="btnExecute" value="执行"/>
		<input type="button" @click="btnNewClick" value="新建" />
		<input type="button" @click="btnOpenOnClick" value="打开"/>
		<input type="button" @click="btnSaveOnClick" value="保存" /> 
		<input type="file" @change="fileLoadFromOnChange" name="upload" style="display:none"/>
		<pre id="code" @dblclick="codeOnDblclick" >
		</pre>			
   </div>	

  <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox-categories" style="display: none">
    <category name="Logic" categorystyle="logic_category">
      <block type="controls_if"></block>
      <block type="logic_compare"></block>
      <block type="logic_operation"></block>
      <block type="logic_negate"></block>
      <block type="logic_boolean"></block>
      <block type="logic_null"></block>
      <block type="logic_ternary"></block>
    </category>
    <category name="Loops" categorystyle="loop_category">
      <block type="controls_repeat_ext">
        <value name="TIMES">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>
      <block type="controls_whileUntil"></block>
      <block type="controls_for">
        <value name="FROM">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="TO">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
        <value name="BY">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="controls_forEach"></block>
      <block type="controls_flow_statements"></block>
    </category>
    <category name="Math" categorystyle="math_category">
      <block type="math_number" gap="32">
        <field name="NUM">123</field>
      </block>
      <block type="math_arithmetic">
        <value name="A">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="B">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="math_single">
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">9</field>
          </shadow>
        </value>
      </block>
      <block type="math_trig">
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">45</field>
          </shadow>
        </value>
      </block>
      <block type="math_constant"></block>
      <block type="math_number_property">
        <value name="NUMBER_TO_CHECK">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
      <block type="math_round">
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">3.1</field>
          </shadow>
        </value>
      </block>
      <block type="math_modulo">
        <value name="DIVIDEND">
          <shadow type="math_number">
            <field name="NUM">64</field>
          </shadow>
        </value>
        <value name="DIVISOR">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>
      <block type="math_constrain">
        <value name="VALUE">
          <shadow type="math_number">
            <field name="NUM">50</field>
          </shadow>
        </value>
        <value name="LOW">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="HIGH">
          <shadow type="math_number">
            <field name="NUM">100</field>
          </shadow>
        </value>
      </block>
      <block type="math_random_int">
        <value name="FROM">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="TO">
          <shadow type="math_number">
            <field name="NUM">100</field>
          </shadow>
        </value>
      </block>
      <block type="math_random_float"></block>
    </category>
    <category name="Text" categorystyle="text_category">
      <block type="text_print">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_prompt">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>	
      <label text="String function:" web-class="ioLabel"></label>	  
      <block type="text"></block>
      <block type="text_multiline"></block>
      <block type="text_join"></block>
      <block type="text_append">
        <value name="TEXT">
          <shadow type="text"></shadow>
        </value>
      </block>
      <block type="text_length">
        <value name="VALUE">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_isEmpty">
        <value name="VALUE">
          <shadow type="text">
            <field name="TEXT"></field>
          </shadow>
        </value>
      </block>
      <block type="text_indexOf">
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR">text</field>
          </block>
        </value>
        <value name="FIND">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_charAt">
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR">text</field>
          </block>
        </value>
      </block>
      <block type="text_getSubstring">
        <value name="STRING">
          <block type="variables_get">
            <field name="VAR">text</field>
          </block>
        </value>
      </block>
      <block type="text_changeCase">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_trim">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>  
    </category>
    <category name="Colour" categorystyle="colour_category">
      <block type="colour_picker"></block>
      <block type="colour_random"></block>
      <block type="colour_rgb">
        <value name="RED">
          <shadow type="math_number">
            <field name="NUM">100</field>
          </shadow>
        </value>
        <value name="GREEN">
          <shadow type="math_number">
            <field name="NUM">50</field>
          </shadow>
        </value>
        <value name="BLUE">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
      <block type="colour_blend">
        <value name="COLOUR1">
          <shadow type="colour_picker">
            <field name="COLOUR">#ff0000</field>
          </shadow>
        </value>
        <value name="COLOUR2">
          <shadow type="colour_picker">
            <field name="COLOUR">#3333ff</field>
          </shadow>
        </value>
        <value name="RATIO">
          <shadow type="math_number">
            <field name="NUM">0.5</field>
          </shadow>
        </value>
      </block>
    </category>
    <sep></sep>
    <category name="Variables" categorystyle="variable_category" custom="VARIABLE"></category>
	<category name="Tools" categorystyle="colour_category">
		<block kind="block" type="convert"></block>
    </category>	
	<category name="DateTime" categorystyle="colour_category">
		<block kind="block" type="now"></block>
		<block kind="block" type="today"></block>
		<block kind="block" type="get_datetime_part"></block>
		<block kind="block" type="create_datetime_from"></block>
		<block kind="block" type="create_date_from"></block>
    </category>
  </xml>	
</div>
</template>
<script>
	import {reactive,onMounted} from 'vue';
	import Blockly from 'blockly';
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
	  if(!str)return;
	  loadFromString(str);	  
	} 
 export default {
	 name: 'FlowEditor',
	 setup(){
		const state=reactive({loginData:{},processes:[]});
		var btnExecute=function(){
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
		var btnNewClick = function(){
		  if(!confirm("确认要清除现在的项目，创建新的？"))return;
		  const workspace = Blockly.getMainWorkspace();
		  Blockly.serialization.workspaces.load({}, workspace);		  
		};
		var codeOnDblclick=function(){
			var range = document.createRange();
			range.selectNode(this);
			window.getSelection().removeAllRanges();
			window.getSelection().addRange(range);	  
		};
		var btnSaveOnClick=function(){
		  var code = saveToString();
		  var file = new File([code], "project.zbk", { type: "text/plain;charset=utf-8" });
		  saveAs(file);
		};
		var btnOpenOnClick=function(){
		  document.getElementById("fileLoadFrom").click();
		};  
		var fileLoadFromOnChange=function(){
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
		return {state,btnExecute, btnNewClick, codeOnDblclick,btnSaveOnClick,btnOpenOnClick,fileLoadFromOnChange,};
	 },
	 mounted() {  
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
	 }
 }
</script>