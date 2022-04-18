let textItems = new Array();
let imageItems = new Array();
let spriteItems = new Array();
let spriteManifest=null;

let offscreenCanvas = document.createElement('canvas');

function delay(ms)
{
	return new Promise(r => setTimeout(r, ms));
}

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

function _createImg(url)
{
	let img = new Image();
	img.loaded = false;
	img.onload=function()
	{
		img.loaded = true;	
	}
	img.src = url;
	return img;
}

function ImageItem(num, imgURL)
{
	this.num=num;
    this.imgLoaded=false;
	this.img=_createImg(imgURL);
	this.x=0;
	this.y=0;
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
		let img = _createImg(imgURL);
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

async function initSpriteAsync()
{
	setInterval(function(){
		for(var i=0;i<spriteItems.length;i++)
		{
			var item = spriteItems[i];
			let currentFrameIndex = item.currentFrameIndex;
			currentFrameIndex++;
			if (currentFrameIndex >= item.frameImages.length)
			{
				currentFrameIndex = 0;//如果到了最后一张，则重新回到第一张
			}
			item.currentFrameIndex = currentFrameIndex;//更换为下一张			
		}
	},200);	
	var res = await axios('sprites/manifest.json');	
	spriteManifest = res.data;
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
	this.frameImages=new Array();//帧画面的数组
	this.currentFrameIndex=-1;
	this.visible=true;
	this.scaleX=-1;
	this.scaleY=1;
	//this.rotation=
}

function findSprite(num)
{
	var items = spriteItems.filter(e=>e.num==num);
	if(items.length<=0)
	{
		return null;
	}
	else
	{
		return items[0];
	}	
}
function createSprite(num,spriteName)
{
	if(findSprite(num)!=null)
		throw num+" already exists";
	let item = new SpriteItem(num,spriteName);
	spriteItems.push(item);
}

function setSpritePosition(num, x, y)
{
	let item = findSprite(num);
	if(item)
	{
		item.x=x;
		item.y=y;
	}
}

function setSpriteScaleX(num, scaleX)
{
	let item = findSprite(num);
	if(item)
	{
		item.scaleX=scaleX;
	}	
}

function setSpriteScaleY(num, scaleY)
{
	let item = findSprite(num);
	if(item)
	{
		item.scaleY=scaleY;
	}	
}

function showSprite(num)
{
	let item = findSprite(num);
	if(item)
	{
		item.visible=true;
	}	
}

function hideSprite(num)
{
	let item = findSprite(num);
	if(item)
	{
		item.visible=false;
	}	
}

function playSpriteAnimation(num, animateName)
{
	let item = findSprite(num);
	if(!item)return;
	if(item.currentAnimationName==animateName)return;
	item.frameFilePaths=new Array();
	item.currentAnimationName = animateName;
	item.currentFrameIndex = 0;
	let sprite = spriteManifest.filter(s=>s.name==item.spriteName)[0];
	let animation = sprite.animations.filter(a=>a.name==animateName)[0];
	item.frameImages = new Array();
	for(var i=0;i<animation.fileNames.length;i++)
	{
		let imgName = animation.fileNames[i];
		let imgURL = "sprites/"+item.spriteName+"/"
			+animateName+"/"+imgName;
		let img = _createImg(imgURL);
		item.frameImages.push(img);
	}
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
		offscreenCtx.save();
		offscreenCtx.font = item.font;
		offscreenCtx.fillStyle= item.color;
		offscreenCtx.fillText(item.text, item.x, item.y);
		offscreenCtx.restore();
	}
	for(var i=0;i<imageItems.length;i++)
	{
		let item = imageItems[i];
		if(!item.visible||!item.img.loaded) continue;
		offscreenCtx.drawImage(item.img,item.x,item.y);
	}
	for(var i=0;i<spriteItems.length;i++)
	{
		let spriteItem = spriteItems[i];
		if(!spriteItem.visible) continue;

		let currentFrameIndex = spriteItem.currentFrameIndex;
		let currentFrameImg = spriteItem.frameImages[currentFrameIndex];
		if (!currentFrameImg.loaded) continue;
		spriteItem.height = currentFrameImg.height;
		spriteItem.width = currentFrameImg.width;
		let posX = spriteItem.x;
		let posY = spriteItem.y;
		offscreenCtx.save();
		offscreenCtx.translate(currentFrameImg.width*(1-spriteItem.scaleX)/2, 
			currentFrameImg.height*(1-spriteItem.scaleY)/2);
		offscreenCtx.scale(spriteItem.scaleX,spriteItem.scaleY);
		offscreenCtx.drawImage(currentFrameImg,posX,posY);
		offscreenCtx.restore();
	}
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, width, height);
	ctx.drawImage(offscreenCanvas, 0, 0);
}