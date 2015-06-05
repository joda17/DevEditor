var KEYBOARD = {};
KEYBOARD.MAIN = 1;
KEYBOARD.JOYSTICK = 2;
KEYBOARD.SPECIAL = 0;

var BUTTONSSCHEMAT = {};
BUTTONSSCHEMAT[KEYBOARD.MAIN] = {info: {maxX: 8,maxY: 5}, data:[
{type:"normal",value:'q',startX:0,endX:1,startY:1,endY:2},{type:"normal",value:'w',startX:1,endX:2,startY:1,endY:2},{type:"normal",value:'e',startX:2,endX:3,startY:1,endY:2},{type:"normal",value:'r',startX:3,endX:4,startY:1,endY:2},{type:"normal",value:'t',startX:4,endX:5,startY:1,endY:2},{type:"normal",value:'y',startX:5,endX:6,startY:1,endY:2},{type:"normal",value:'u',startX:6,endX:7,startY:1,endY:2},{type:"normal",value:'i',startX:7,endX:8,startY:1,endY:2},{type:"normal",value:'o',startX:8,endX:9,startY:1,endY:2},{type:"normal",value:'p',startX:9,endX:10,startY:1,endY:2},{type:"normal",value:'1',svalue:'!',startX:0,endX:1,startY:0,endY:1},{type:"normal",value:'2',svalue:'+',startX:1,endX:2,startY:0,endY:1},{type:"normal",value:'3',svalue:'-',startX:2,endX:3,startY:0,endY:1},{type:"normal",value:'4',svalue:'*',startX:3,endX:4,startY:0,endY:1},{type:"normal",value:'5',svalue:'/',startX:4,endX:5,startY:0,endY:1},{type:"normal",value:'6',svalue:'=',startX:5,endX:6,startY:0,endY:1},{type:"normal",value:'7',svalue:'^',startX:6,endX:7,startY:0,endY:1},{type:"normal",value:'8',svalue:'%',startX:7,endX:8,startY:0,endY:1},{type:"normal",value:'9',svalue:'~',startX:8,endX:9,startY:0,endY:1},{type:"normal",value:'0',svalue:'\\',startX:9,endX:10,startY:0,endY:1},
{type:"normal",value:'↑',startX:0,endX:1,startY:2,endY:3},{type:"normal",value:'a',startX:1,endX:2,startY:2,endY:3},{type:"normal",value:'s',startX:2,endX:3,startY:2,endY:3},{type:"normal",value:'d',startX:3,endX:4,startY:2,endY:3},{type:"normal",value:'f',startX:4,endX:5,startY:2,endY:3},{type:"normal",value:'g',startX:5,endX:6,startY:2,endY:3},{type:"normal",value:'h',startX:6,endX:7,startY:2,endY:3},{type:"normal",value:'j',startX:7,endX:8,startY:2,endY:3},{type:"normal",value:'k',startX:8,endX:9,startY:2,endY:3},{type:"normal",value:'l',startX:9,endX:10,startY:2,endY:3}
]};

function Keyboard(pageSizeX, pageSizeY, keyboardArea, editor){
	this.shift = false;
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
	
	//var buttonsSchemat = this.buttonsSchemat = [];
	
	//buttonsSchemat[KEYBOARD.MAIN] = "[q;0;1;0;1][w;1;2;0;1][e;2;3;0;1][r;4;5;0;1][t;5;6;0;1][y;6;7;0;1][u;7;8;0;1][i;8;9;0;1][o;10;1][p;1;1]/[a;1;2][s;1;2][d;2;2][f;2;2][g;2;2][h;2;2][j;2;2][k;1;2][l;1;2]";
	//buttonsSchemat[KEYBOARD.SPECIAL] = "[qwe][wer][ert][rty][tyu]/[<][>][[}]/[[[]/[[]]";
	//buttonsSchemat[KEYBOARD.JOYSTICK] = "[JOYSTICK]";
	
	this.replanKeyboardButtons(KEYBOARD.MAIN);
	//this.replanKeyboardButtons(KEYBOARD.SPECIAL);
	
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
	var moveY = k.touchInfo.moveY = k.touchInfo.endX - k.touchInfo.startY;
	var time = k.touchInfo.time = k.touchInfo.endTime - k.touchInfo.startTime;
	var speedX = moveX/time;
	k.touchInfo.speedX = speedX;
	if(Math.abs(speedX) > 1.0){
		if(k.keyboards[k.selectedKeyboard + ((speedX >= 0) ? -1 : 1)])k.selectKeyboard(k.selectedKeyboard + ((speedX >= 0) ? -1 : 1));  
	}
}

Keyboard.prototype.replanKeyboardButtons = function(k){
	var keyboard = this.keyboards[k];
	
	var schemat = BUTTONSSCHEMAT[k];
	var unitX = this.keyboardSize.x/schemat.info.maxX;
	var unitY = this.keyboardSize.y/schemat.info.maxY;
	console.log("ux: " + unitX + " uy: " + unitY)
	var data = schemat.data;
	var editor = this.editor;
	for(var i in data) {
		var button = document.createElement("div");
		button.style.position = "absolute";
		button.style.top = (data[i].startY*unitY) + "px";
		button.style.left = (data[i].startX*unitX) + "px";
		button.style.border = "solid black 1px";
		button.style.width = ((data[i].endX-data[i].startX)*unitX) + "px";
		button.style.height = ((data[i].endY-data[i].startY)*unitY) + "px";
		button.style.textAlign = "center";
		button.style.color = "white";
		//button.style.fontSize = charSize + "px";
		button.style.verticalAlign = "middle";
		button.style.lineHeight = ((data[i].endY-data[i].startY)*unitY) + "px";
		var t = this;
		if(data[i].type == "normal"){
			button.code = data[i].value;
			button.scode = (data[i].svalue) ? data[i].svalue:data[i].value.toUpperCase();
			button.onclick = function(e){
				editor.write((t.shift) ? this.scode : this.code);
			}
			button.innerHTML = data[i].value;
		}
		keyboard.children[0].appendChild(button);
	}
	
	
	/*
	for(var i in this.buttons[k]){
		keyboard.removeChild(this.buttons[k][i].element);
	}
	this.buttons[k] = [];
	var sizeX = this.keyboardSize.x;
	var sizeY = this.keyboardSize.y;
	*/
	
	//var schemat = this.buttonsSchemat[k];
	
	
	/*
	var buttons = [[]];
	
	var lock = false;
	var memory = "";
	var level = 0;
	var nextSpecial = false;
	for(var i = 0;i < schemat.length;i++){
		if(!lock){
			if(schemat[i] == '[' || schemat[i] == '{'){
				lock = true;
				memory = "";
			}
			else if(schemat[i] == '/'){
				level++;
				buttons[level] = [];
			}
		}
		else {
			if(!nextSpecial){
				if(schemat[i] == '[')nextSpecial = true;
				else if(schemat[i] == ']'){
					lock = false;
					buttons[level].push({type: "normal", code: memory});
				}
				else if(schemat[i] == '}'){
					lock = false;
					buttons[level].push({type: "special", code: memory})
				}
				else {
					memory += schemat[i];
				}
			}
			else {
				memory += schemat[i];
				nextSpecial = false;
			}

		} 
	}
	var buttonHeight = sizeY/(level+1);
	var paddingVertical = 5;
	var charSize = Math.floor(buttonHeight - (2*paddingVertical));
	var paddingHorizontal = sizeX;
	var charsAmount = []
	for(var i = 0;i < level+1;i++){
		charsAmount[i] = 0;
		for(var j = 0;j < buttons[i].length;j++){
			charsAmount[i] += buttons[i][j].code.length;
		}
		var calcPaddingHorizontal = (sizeX - (charsAmount[i]*charSize))/(2*buttons[i].length);
		console.log("level: " + i + "cph " + calcPaddingHorizontal);
		console.log("cs: " + charSize + "  ca: " + charsAmount[i]);
		console.log("ca*cs: " + charsAmount[i]*charSize );
		paddingHorizontal = Math.min(calcPaddingHorizontal, paddingHorizontal);
	}
	var levelsSize = [];
	var marginsLeft = [];
	for(var i = 0;i < level+1;i++){
		levelsSize[i] = (charsAmount[i]*charSize) + (paddingHorizontal*2*buttons[i].length);
		console.log("ls: " + levelsSize[i]);
		console.log("but: " + buttons[i].length);
		console.log("ph: " + paddingHorizontal);
		marginsLeft[i] = (sizeX - levelsSize[i])/2;
	}
	for(var i = 0;i < level+1;i++){
		console.log("ml: " + marginsLeft);
		var fromLeft = marginsLeft[i];
		for(var j = 0;j < buttons[i].length;j++){
			var width = (buttons[i][j].code.length*charSize) + (2*paddingHorizontal);
			var button = document.createElement("div");
			button.style.position = "absolute";
			button.style.top = i*buttonHeight + "px";
			button.style.left = fromLeft + "px";
			button.style.border = "solid black 1px";
			button.style.width = width + "px";
			button.style.height = buttonHeight + "px";
			button.style.textAlign = "center";
			button.style.color = "white";
			button.style.fontSize = charSize + "px";
			button.style.verticalAlign = "middle";
			button.style.lineHeight = buttonHeight + "px";
			button.innerHTML = buttons[i][j].code;
			button.code = buttons[i][j].code;
			var editor = this.editor;
			button.onclick = function(e){
				editor.write(this.code);
			}
			buttons[i][j].element = button;
			this.buttons[k].push(buttons[i][j]);
			keyboard.appendChild(button);
			fromLeft += width;
		}
	}*/
	
}

Keyboard.prototype.refreshKeyboardsElement = function(){
	for(var i in this.keyboards){
		this.keyboards[i].style.display = "none";
	}
	this.keyboards[this.selectedKeyboard].style.display = "block";
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
