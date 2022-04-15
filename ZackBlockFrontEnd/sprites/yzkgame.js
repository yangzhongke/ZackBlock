let textItems = new Array();
let imageItems = new Array();
let spriteItems = new Array();

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

function SpriteItem(num,spriteName)
{
	this.num=num;
	this.spriteName=spriteName;
	this.currentAnimationName=null;//当前动作名
	this.x=0;
	this.y=0;
	this.frameImages=new Array();//帧画面的数组
	this.currentFrameIndex=-1;
	this.visible=true;
	this.isFlipX=false;//是否x方向翻转
	this.isFlipY=false;//是否y方向翻转
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

function setSpriteFlipX(num, isFlipX)
{
	let item = findSprite(num);
	if(item)
	{
		item.isFlipX=isFlipX;
	}	
}

function setSpriteFlipY(num, isFlipY)
{
	let item = findSprite(num);
	if(item)
	{
		item.isFlipY=isFlipY;
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
	let item = findSpriteItem(num);
	if(!item)return;
	if(item.currentAnimationName==animateName)return;
	item.frameFilePaths=new Array();
	item.currentAnimationName = animateName;
	item.currentFrameIndex = 0;
	
	sprintf(animateDir, "%s\\%s", item->spritePath, animateName);
	if (access(animateDir, 0) != 0)
	{
		LeaveCriticalSection(&csModels);
		reportErrorExit("%s精灵中没有名字为%s的动作，因为查找%s这个路径不存在", item->spriteName, animateName, animateDir);
		return;
	}

	//搜索所有*.png文件
	
	sprintf(searchFormat, "%s\\*.png", animateDir);
	
	SL_Creat(&subFiles);
	getSubFiles(searchFormat, subFiles);

	filesCount = SL_Size(subFiles);
	//准备进行排序的文件名数组
	fileNames = (char**)malloc(sizeof(char*)*filesCount);	
	for (i = 0; i < filesCount; i++)
	{
		char* animteFileName = (char*)SL_GetItem(subFiles, i);
		fileNames[i] = animteFileName;
	}

	//按照文件名的数字部分进行正序排序
	qsort(fileNames, filesCount, sizeof(char*), fileNameIntCompare);

	SL_Creat(&item->frameFilePaths);
	//把文件名全路径拼接上
	for (i = 0; i < filesCount; i++)
	{
		char* filename = fileNames[i];
		char frameFilePath[PR_MAX_PATH] = { 0 };
		sprintf(frameFilePath, "%s\\%s", animateDir, filename);
		SL_Append(item->frameFilePaths, strdup(frameFilePath));
	}


	//因为getSubFiles中把搜索出来的文件名strdup了，所以需要手动释放内存
	for (i = 0; i < SL_Size(subFiles); i++)
	{
		char* animteFileName = (char*)SL_GetItem(subFiles, i);
		free(animteFileName);
	}
	SL_Clear(&subFiles);//释放内存
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
		if(!item.visible||!item.img.loaded) continue;
		offscreenCtx.drawImage(item.img,item.x,item.y);
	}		
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, width, height);
	ctx.drawImage(offscreenCanvas, 0, 0);
}