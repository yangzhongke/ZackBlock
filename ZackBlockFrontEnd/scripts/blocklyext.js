//add DefVarType to category 'Variable'
//store the original function 'flyoutCategoryBlocks'
Blockly.Variables.original_flyoutCategoryBlocks=Blockly.Variables.flyoutCategoryBlocks;
Blockly.Variables.flyoutCategoryBlocks=function(workspace){
	const utilsXml=Blockly.utils.xml;
	const block = utilsXml.createElement('block');
	block.setAttribute('type', 'DefVarType');
	block.setAttribute('gap', 20);
	const xmlList = Blockly.Variables.original_flyoutCategoryBlocks(workspace);
	xmlList.unshift(block);	//prepend the DefVarType block to the category
	return xmlList;
}
