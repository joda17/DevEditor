var KEYBOARD = {};
KEYBOARD.MAIN = 1;
KEYBOARD.JOYSTICK = 2;
KEYBOARD.SPECIAL = 0;

var BUTTONSSCHEMAT = {};
BUTTONSSCHEMAT[KEYBOARD.MAIN] = {info: {maxX: 10,maxY: 5}, data:[
{type:"normal",value:'q',startX:0,endX:1,startY:1,endY:2,color:"#BCD784",fcolor:"#8F8F8F"},{type:"normal",value:'w',startX:1,endX:2,startY:1,endY:2,color:"#BCD784",fcolor:"#8F8F8F"},{type:"normal",value:'e',startX:2,endX:3,startY:1,endY:2,color:"#BCD784",fcolor:"#8F8F8F"},{type:"normal",value:'r',startX:3,endX:4,startY:1,endY:2,color:"#BCD784",fcolor:"#8F8F8F"},{type:"normal",value:'t',startX:4,endX:5,startY:1,endY:2,color:"#BCD784",fcolor:"#8F8F8F"},{type:"normal",value:'y',startX:5,endX:6,startY:1,endY:2,color:"#BCD784",fcolor:"#8F8F8F"},{type:"normal",value:'u',startX:6,endX:7,startY:1,endY:2,color:"#BCD784",fcolor:"#8F8F8F"},{type:"normal",value:'i',startX:7,endX:8,startY:1,endY:2,color:"#BCD784",fcolor:"#8F8F8F"},{type:"normal",value:'o',startX:8,endX:9,startY:1,endY:2,color:"#BCD784",fcolor:"#8F8F8F"},{type:"normal",value:'p',startX:9,endX:10,startY:1,endY:2,color:"#BCD784",fcolor:"#8F8F8F"},{type:"normal",value:'1',svalue:'!',startX:0,endX:1,startY:0,endY:1,color:"#DEF1B6",fcolor:"#646464"},{type:"normal",value:'2',svalue:'+',startX:1,endX:2,startY:0,endY:1,color:"#DEF1B6",fcolor:"#646464"},{type:"normal",value:'3',svalue:'-',startX:2,endX:3,startY:0,endY:1,color:"#DEF1B6",fcolor:"#646464"},{type:"normal",value:'4',svalue:'*',startX:3,endX:4,startY:0,endY:1,color:"#DEF1B6",fcolor:"#646464"},{type:"normal",value:'5',svalue:'/',startX:4,endX:5,startY:0,endY:1,color:"#DEF1B6",fcolor:"#646464"},{type:"normal",value:'6',svalue:'=',startX:5,endX:6,startY:0,endY:1,color:"#DEF1B6",fcolor:"#646464"},{type:"normal",value:'7',svalue:'^',startX:6,endX:7,startY:0,endY:1,color:"#DEF1B6",fcolor:"#646464"},{type:"normal",value:'8',svalue:'%',startX:7,endX:8,startY:0,endY:1,color:"#DEF1B6",fcolor:"#646464"},{type:"normal",value:'9',svalue:'<',startX:8,endX:9,startY:0,endY:1,color:"#DEF1B6",fcolor:"#646464"},{type:"normal",value:'0',svalue:'>',startX:9,endX:10,startY:0,endY:1,color:"#DEF1B6",fcolor:"#646464"},{type:"normal",value:'	',display:'TAB',sdisplay:'TAB',ssdisplay:'TAB', startX:0,endX:1,startY:2,endY:3,color:"#91B251",fcolor:"#E4E4E4"},{type:"normal",value:'a',startX:1,endX:2,startY:2,endY:3,color:"#91B251",fcolor:"#E4E4E4"},{type:"normal",value:'s',startX:2,endX:3,startY:2,endY:3,color:"#91B251",fcolor:"#E4E4E4"},{type:"normal",value:'d',startX:3,endX:4,startY:2,endY:3,color:"#91B251",fcolor:"#E4E4E4"},{type:"normal",value:'f',startX:4,endX:5,startY:2,endY:3,color:"#91B251",fcolor:"#E4E4E4"},{type:"normal",value:'g',startX:5,endX:6,startY:2,endY:3,color:"#91B251",fcolor:"#E4E4E4"},{type:"normal",value:'h',startX:6,endX:7,startY:2,endY:3,color:"#91B251",fcolor:"#E4E4E4"},{type:"normal",value:'j',startX:7,endX:8,startY:2,endY:3,color:"#91B251",fcolor:"#E4E4E4"},{type:"normal",value:'k',startX:8,endX:9,startY:2,endY:3,color:"#91B251",fcolor:"#E4E4E4"},{type:"normal",value:'l',startX:9,endX:10,startY:2,endY:3,color:"#91B251",fcolor:"#E4E4E4"},{type:"normal",value:'"',svalue:"'",startX:0,endX:1,startY:3,endY:4,color:"#71922E",fcolor:"#E7E7E7"},{type:"normal",value:'z',startX:1,endX:2,startY:3,endY:4,color:"#71922E",fcolor:"#E7E7E7"},{type:"normal",value:'x',startX:2,endX:3,startY:3,endY:4,color:"#71922E",fcolor:"#E7E7E7"},{type:"normal",value:'c',startX:3,endX:4,startY:3,endY:4,color:"#71922E",fcolor:"#E7E7E7"},{type:"normal",value:'v',startX:4,endX:5,startY:3,endY:4,color:"#71922E",fcolor:"#E7E7E7"},{type:"normal",value:'b',startX:5,endX:6,startY:3,endY:4,color:"#71922E",fcolor:"#E7E7E7"},{type:"normal",value:'n',startX:6,endX:7,startY:3,endY:4,color:"#71922E",fcolor:"#E7E7E7"},{type:"normal",value:'m',startX:7,endX:8,startY:3,endY:4,color:"#71922E",fcolor:"#E7E7E7"},{type:"special",value:'←',startX:8,endX:10,startY:3,endY:4,color:"#71922E",fcolor:"#E7E7E7", onclick: function(e, k){k.editor.callBackspaceEvent();}},{type:"normal",value:'(',svalue: ')', startX:0,endX:1,startY:4,endY:5,color:"#4C690F",fcolor:"#FFFFFF"},{type:"normal",value:'{',svalue: '}', startX:1,endX:2,startY:4,endY:5,color:"#4C690F",fcolor:"#FFFFFF"},{type:"normal",value:'[',svalue: ']', startX:2,endX:3,startY:4,endY:5,color:"#4C690F",fcolor:"#FFFFFF"},{type:"normal",value:' ', startX:3,endX:6,startY:4,endY:5,color:"#4C690F",fcolor:"#FFFFFF"},{type:"normal",value:';',svalue: ':', startX:6,endX:7,startY:4,endY:5,color:"#4C690F",fcolor:"#FFFFFF"},{type:"normal",value:'.',svalue: ',', startX:7,endX:8,startY:4,endY:5,color:"#4C690F",fcolor:"#FFFFFF"},{type:"special",value:'↲',startX:8,endX:10,startY:4,endY:5,color:"#4C690F",fcolor:"#FFFFFF", onclick: function(e, k){k.editor.callEnterEvent();}}
]}

function Keyboard(pageSizeX, pageSizeY, keyboardArea, editor){
	this.log = [];
	this.log.push("Keyboard start");
	this.shift = 0;
	this.keyboardSize = {x: pageSizeX, y: 2*(pageSizeY/5)};
	this.editor = editor;
	this.selectedKeyboard = KEYBOARD.MAIN;
	this.keyboardArea = keyboardArea;
	this.keyboards = [];
	this.touchInfo = {};
	keyboardArea.style.height = this.keyboardSize.y + "px";
	keyboardArea.style.width = this.keyboardSize.x + "px";
	
	var k = this;
	
	var specialKeyboard = this.keyboards[KEYBOARD.SPECIAL] = document.createElement("div");
	specialKeyboard.classList.add("specialKeyboard");
	specialKeyboard.addEventListener("touchstart", function(e){k.handleTouchStart(e,k);}, false);
	specialKeyboard.addEventListener("touchend", function(e){k.handleTouchEnd(e,k);}, false);
	keyboardArea.appendChild(specialKeyboard);
	
	var mainKeyboard = this.keyboards[KEYBOARD.MAIN] = document.createElement("div");
	mainKeyboard.classList.add("mainKeyboard");
	mainKeyboard.addEventListener("touchstart", function(e){k.handleTouchStart(e,k);}, false);
	mainKeyboard.addEventListener("touchend", function(e){k.handleTouchEnd(e,k);}, false);
	var buttonBox = document.createElement("div");
	mainKeyboard.classList.add("buttonBox");
	mainKeyboard.appendChild(buttonBox);
	keyboardArea.appendChild(mainKeyboard);
	
	var joystickKeyboard = this.keyboards[KEYBOARD.JOYSTICK] = document.createElement("div");
	joystickKeyboard.classList.add("joystickKeyboard");
	joystickKeyboard.addEventListener("touchstart", function(e){k.handleTouchStart(e,k);}, false);
	joystickKeyboard.addEventListener("touchend", function(e){k.handleTouchEnd(e,k);}, false);
	keyboardArea.appendChild(joystickKeyboard);
	
	
	this.refreshKeyboardsElement();

}

Keyboard.prototype.handleTouchStart = function(e, k){
	if(k.touchInfo.started)return;
	k.touchInfo.started = true;
	k.touchInfo.startX = e.targetTouches[0].screenX;
	k.touchInfo.startY = e.targetTouches[0].screenY;
	k.touchInfo.startTime = new Date().getTime();
}

Keyboard.prototype.handleTouchEnd = function(e, k){
	if(!k.touchInfo.started)return;
	k.touchInfo.started = false;
	k.touchInfo.endX = e.changedTouches[0].screenX;
	k.touchInfo.endY = e.changedTouches[0].screenY;
	k.touchInfo.endTime = new Date().getTime();
	var moveX = k.touchInfo.moveX = k.touchInfo.endX - k.touchInfo.startX;
	var moveY = k.touchInfo.moveY = k.touchInfo.endY - k.touchInfo.startY;
	var time = k.touchInfo.time = k.touchInfo.endTime - k.touchInfo.startTime;
	var speedX = k.touchInfo.speedX = moveX/time;
	var speedY = k.touchInfo.speedY = moveY/time;
	
	if((Math.abs(speedX) > 0.5) && (Math.abs(k.touchInfo.startX - (0.5*k.keyboardSize.x)) > 0.25*k.keyboardSize.x)){
		if(k.keyboards[k.selectedKeyboard + ((speedX >= 0) ? -1 : 1)])k.selectKeyboard(k.selectedKeyboard + ((speedX >= 0) ? -1 : 1));  
	}
	else if(speedY < -0.6){
		k.shift = (k.shift < 1) ? 1:2;
		k.replanKeyboardButtons(k.selectedKeyboard);
	}
	else if(speedY > 0.6){
		k.shift = 0;
		k.replanKeyboardButtons(k.selectedKeyboard);
	}
}

Keyboard.prototype.renameKeyboardButtons = function(k){
	var keyboard = this.keyboards[k];
	var buttonBox = keyboard.children[0];
	
	for(var i in buttonBox.children) {
		var b = buttonBox.children[i];
		if(b.classList.contains("buttonVr"))continue;
		var level = [];
		level[0] = (b.display) ? b.display:b.code;
		level[1] = (b.sdisplay) ? b.sdisplay:((b.scode) ? b.scode:level[0]);
		level[2] = (b.ssdisplay) ? b.ssdisplay:((b.sscode) ? b.sscode:level[1]);
		b.innerHTML = level[this.shift];
	}
}

Keyboard.prototype.replanKeyboardButtons = function(k){
	var keyboard = this.keyboards[k];
	var buttonBox = keyboard.children[0];
	
	while (buttonBox.firstChild) {
		buttonBox.removeChild(buttonBox.firstChild);
	}
	
	var schemat = BUTTONSSCHEMAT[k];
	var unitX = this.keyboardSize.x/schemat.info.maxX;
	var unitY = this.keyboardSize.y/schemat.info.maxY;
	var data = schemat.data;
	var editor = this.editor;
	for(var i in data) {
		var button = document.createElement("div");
		button.style.position = "absolute";
		button.style.top = (data[i].startY*unitY) + "px";
		button.style.left = (data[i].startX*unitX) + "px";
		//button.style.borderLeft = "solid black 1px";
		button.style.width = ((data[i].endX-data[i].startX)*unitX) + "px";
		button.style.height = ((data[i].endY-data[i].startY)*unitY) + "px";
		button.style.textAlign = "center";
		button.style.color = (data[i].fcolor) ? data[i].fcolor:"white";
		button.style.fontSize = 0.4*((data[i].endY-data[i].startY)*unitY) + "px";
		button.style.verticalAlign = "middle";
		button.style.lineHeight = ((data[i].endY-data[i].startY)*unitY) + "px";
		button.color = (data[i].color) ? data[i].color:"";
		button.style.backgroundColor = button.color;
		button.style.fontWeight = "600";
		button.style.boxShadow = "0 0 2px " + button.color + ", inset -3px 0 4px -4px white" + ", inset 3px 0 4px -4px white";
		var t = this;
		if(data[i].type == "normal"){
			button.code = data[i].value;
			button.scode = (data[i].svalue) ? data[i].svalue:data[i].value.toUpperCase();
			button.sscode = (data[i].ssvalue) ? data[i].ssvalue:button.scode;
			if(data[i].display)button.display = data[i].display;
			if(data[i].sdisplay)button.sdisplay = data[i].sdisplay;
			if(data[i].ssdisplay)button.ssdisplay = data[i].ssdisplay;
			button.keepShift = (data[i].keepShift) ? true : false;
			button.onclick = function(e){
				var b = this;
				b.style.backgroundColor = "#D5E1FF";
				setTimeout(function(){
					b.style.backgroundColor = b.color;
				}, 300);
				editor.write((t.shift > 0) ? this.scode : this.code);
				if(t.shift == 1 && !this.keepShift){
					t.shift = 0;
					t.renameKeyboardButtons(k);
				}
			}
			//button.innerHTML = (data[i].display) ? data[i].display : ((t.shift == 2) ? button.sscode : ((t.shift > 0) ? button.scode : button.code));
		}
		else if(data[i].type == "special"){
			if(data[i].display)button.display = data[i].display;
			if(data[i].sdisplay)button.sdisplay = data[i].sdisplay;
			if(data[i].ssdisplay)button.ssdisplay = data[i].ssdisplay;
			button.code = data[i].value;
			button.scode = (data[i].svalue) ? data[i].svalue:data[i].value.toUpperCase();
			button.sscode = (data[i].ssvalue) ? data[i].ssvalue:button.scode;
			button.s = data[i];
			button.keepShift = (data[i].keepShift) ? true : false;
			button.onclick = function(e){
				var b = this;
				this.style.backgroundColor = "#D5E1FF";
				setTimeout(function(){
					b.style.backgroundColor = b.color;
				}, 300);
				this.s.onclick(e,t);
				if(t.shift == 1 && !this.keepShift){
					t.shift = 0;
					t.renameKeyboardButtons(k);
				}
			};
			//button.innerHTML = (data[i].display) ? data[i].display : ((t.shift == 2) ? button.sscode : ((t.shift > 0) ? button.scode : button.code));
		}

		keyboard.children[0].appendChild(button);
	}
	this.renameKeyboardButtons(k);
}

Keyboard.prototype.refreshKeyboardsElement = function(){
	for(var i in this.keyboards){
		this.keyboards[i].style.display = "none";
	}
	this.keyboards[this.selectedKeyboard].style.display = "block";
	this.replanKeyboardButtons(KEYBOARD.MAIN);
}

Keyboard.prototype.getKeyboard = function(k){
	return this.keyboards[k];
}

Keyboard.prototype.selectKeyboard = function(k){
	if(this.animationLock)return;
	if(k == this.selectedKeyboard - 1){
		var toOpen = this.getKeyboard(k);
		var toClose = this.getKeyboard(k+1);
		
		toOpen.style.display = "block";
		toOpen.style.animation = "moveKeyboardFromLeft 0.4s";
		toClose.style.animation = "moveKeyboardToRight 0.4s";
		
		var kb = this;
		
		this.animationLock = true;
		
		setTimeout(function(){
			kb.animationLock = false;
			toClose.style.animation = "";
			toClose.style.display = "none";
			toOpen.style.animation = "";
			kb.selectedKeyboard = k;
		}, 400);
	}
	else if(k == this.selectedKeyboard + 1){
		var toOpen = this.getKeyboard(k);
		var toClose = this.getKeyboard(k-1);
		
		toOpen.style.display = "block";
		toOpen.style.animation = "moveKeyboardFromRight 0.4s";
		toClose.style.animation = "moveKeyboardToLeft 0.4s";
		
		var kb = this;
		
		this.animationLock = true;
		
		setTimeout(function(){
			kb.animationLock = false;
			toClose.style.animation = "";
			toClose.style.display = "none";
			toOpen.style.animation = "";
			kb.selectedKeyboard = k;
		}, 400);
	}
	else if(k < this.selectedKeyboard){
		this.selectKeyboard(this.selectedKeyboard - 1);
		var kb = this;
		setTimeout(function(){
			kb.selectKeyboard(k);
		}, 400);

	}
	else if(k > this.selectedKeyboard){
		this.selectKeyboard(this.selectedKeyboard + 1);
		var kb = this;
		setTimeout(function(){
			kb.selectKeyboard(k);
		}, 400);
	}
	/*
	console.log("select" + k);
	this.joystickKeyboard.style.display = "block";
	this.mainKeyboard.style.zIndex = 30;
	this.mainKeyboard.style.animation = "moveKeyboardToLeft 1s 1";
	this.joystickKeyboard.style.animation = "moveKeyboardFromRight 1s 1";
	var keyboard = this;
	setTimeout(function(){
		keyboard.mainKeyboard.style.animation = "";
		keyboard.mainKeyboard.style.display = "none";
	
		keyboard.joystickKeyboard.style.animation = "";
	}, 1000);*/
}
