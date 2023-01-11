window.IDE={};
window.IDE.csharp={
	runInPlayer:function(code){
		//execute the code in a separate iframe, so that the code can be ran multiple times without confliction.		
		layer.open({type: 2,content: 'gameplayer.html?'+new Date(),
			title:"Run", fixed: false,maxmin: true,area: ['80vw', '80vh'],
			success: function(dom, index){
				var framePlayer = window['layui-layer-iframe' + index];
				framePlayer.postMessage({mode:"C#",code:code});
			}	  
		});
	},
	runInPlace:async function(code){
		try
		{			
			await webcsc.ensureStarted();
			var r = await webcsc.run(code, { libraries: ["/_framework/WebCSC.dll"] });	
			if (!r.success)
			{
				alert("Compilation Error\r\n" + r.message);
			}
			return r;
		}
		catch(err)
		{
			alert("Error\r\n"+err);
		}		
	},
	runCode:async function(code){
		if(code.indexOf("GameCore")>=0)
		{
			this.runInPlayer(code);
		}
		else
		{
			return await this.runInPlace(code);
		}
	},
};