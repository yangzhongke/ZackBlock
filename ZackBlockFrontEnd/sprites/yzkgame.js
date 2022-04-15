let textItems = new Array();
let imageItems = new Array();
let offscreenCanvas = document.createElement('canvas');

function TextItem(num,txt)
{
	this.num=num;
	this.text=txt;
	this.x=0;
	this.y=0;
	this.visible=true;
	this.color='#000000';
	this.font="20px sans-serif";
}

function findText(num)
{
	var items = textItems.filter(e=>e.num==num);
	if(items.length<=0)
	{
		return null;
	}
	else
	{
		return items[0];
	}	
}
function createText(num,txt)
{
	if(findText(num)!=null)
		throw num+" already exists";
	let txtItem = new TextItem(num,txt);
	textItems.push(txtItem);
}
function setTextPosition(num, x, y)
{
	let txtItem = findText(num);
	if(txtItem)
	{
		txtItem.x=x;
		txtItem.y=y;
	}
}
function setText(num, text)
{
	let txtItem = findText(num);
	if(txtItem)
	{
		txtItem.text = text;
	}	
}

function setTextColor(num, color)
{
	let txtItem = findText(num);
	if(txtItem)
	{
		txtItem.color = color;
	}	
}

function setTextFont(num, font)
{
	let txtItem = findText(num);
	if(txtItem)
	{
		txtItem.font = font;
	}		
}

function hideText(num)
{
	let txtItem = findText(num);
	if(txtItem)
	{
		txtItem.visible = false;
	}	
}

function showText(num)
{
	let txtItem = findText(num);
	if(txtItem)
	{
		txtItem.visible = true;
	}	
}

function ImageItem(num, imgURL)
{
	this.num=num;
    this.imgLoaded=false;
	this.width=0;
	this.height=0;
	let img = new Image();
	let imgItem = this;
	img.onload=function()
	{
		imgItem.imgLoaded = true;
		imgItem.width=this.width;
		imgItem.height=this.height;		
	}
	img.src = imgURL;
	this.img=img;
	this.x=0;
	this.y=0;
	//this.width;
	//this.height;
	this.visible=true;	
}

function findImage(num)
{
	var items = imageItems.filter(e=>e.num==num);
	if(items.length<=0)
	{
		return null;
	}
	else
	{
		return items[0];
	}	
}
function createImage(num,imageURL)
{
	if(findImage(num)!=null)
		throw num+" already exists";
	let item = new ImageItem(num,imageURL);
	imageItems.push(item);
}
function setImagePosition(num, x, y)
{
	let item = findImage(num);
	if(item)
	{
		item.x=x;
		item.y=y;
	}
}

function setImageURL(num, imgURL)
{
	let item = findImage(num);
	if(item)
	{
		let img = new Image();
		item.imgLoaded = false;
		item.width=0;
		item.height=0;		
		img.onload=function()
		{
			item.imgLoaded = true;
			item.width=this.width;
			item.height=this.height;				
		}
		img.src = imgURL;
		item.img=img;
	}	
}

function showImage(num)
{
	let item = findImage(num);
	if(item)
	{
		item.visible=true;
	}		
}

function hideImage(num)
{
	let item = findImage(num);
	if(item)
	{
		item.visible=false;
	}		
}

function SpriteItem(num,spriteName)
{
	this.num=num;
	this.spriteName=spriteName;
	this.currentAnimationName=null;//当前动作名
	this.x=0;
	this.y=0;
	this.width=0;
	this.height=0;
	this.frameFilePaths=new Array();//帧画面文件路径的List
	this.currentFrameIndex=-1;
	this.visible=true;
	this.isFlipX=false;//是否x方向翻转
	this.isFlipY=false;//是否y方向翻转
	this.isRepeat=true;//是否重复播放当前动作
}

function rpDisplay(canvas)
{
	let width = canvas.width;
	let height = canvas.height;
	offscreenCanvas.width = width;
	offscreenCanvas.height = height;
	
	let offscreenCtx = offscreenCanvas.getContext('2d');
	offscreenCtx.textBaseline = 'top';//https://segmentfault.com/q/1010000008657193
	offscreenCtx.clearRect(0, 0, width, height);
	for(var i=0;i<textItems.length;i++)
	{
		let item = textItems[i];
		if(!item.visible) continue;
		offscreenCtx.font = item.font;
		offscreenCtx.fillStyle= item.color;
		offscreenCtx.fillText(item.text, item.x, item.y);
	}
	for(var i=0;i<imageItems.length;i++)
	{
		let item = imageItems[i];
		if(!item.visible||!item.imgLoaded) continue;
		offscreenCtx.drawImage(item.img,item.x,item.y);
	}		
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, width, height);
	ctx.drawImage(offscreenCanvas, 0, 0);
}