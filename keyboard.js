var KEYBOARD = {};
KEYBOARD.MAIN = 1;
KEYBOARD.JOYSTICK = 2;
KEYBOARD.SPECIAL = 0;

var BUTTONSSCHEMAT = {};
BUTTONSSCHEMAT[KEYBOARD.MAIN] = {info: {maxX: 10,maxY: 3}, data:[{type:"normal",value:'q',startX:0,endX:1,startY:0,endY:1},{type:"normal",value:'w',startX:1,endX:2,startY:0,endY:1},{type:"normal",value:'e',startX:2,endX:3,startY:0,endY:1},{type:"normal",value:'r',startX:3,endX:4,startY:0,endY:1},{type:"normal",value:'t',startX:4,endX:5,startY:0,endY:1}]};

function Keyboard(pageSizeX, pageSizeY, keyboardArea, editor){
	this.keyboardSize = {x: pageSizeX, y: 2*(pageSizeY/5)};
	this.editor = editor;
	this.selectedKeyboard = KEYBOARD.MAIN;
	this.keyboardArea = keyboardArea;
	this.keyboards = [];
	//this.buttons = [];
	keyboardArea.style.height = this.keyboardSize.y + "px";
	keyboardArea.style.width = this.keyboardSize.x + "px";
	
	var k = this;
	
	var specialKeyboard = this.keyboards[KEYBOARD.SPECIAL] = document.createElement("div");
	specialKeyboard.classList.add("specialKeyboard");
	specialKeyboard.onclick = function(e){
		if(e.target == specialKeyboard){
			if(e.clientX < (pageSizeX/2)){
				k.selectKeyboard((KEYBOARD.SPECIAL > 0) ? KEYBOARD.SPECIAL-1 : KEYBOARD.SPECIAL);
			}
			else {
				k.selectKeyboard((KEYBOARD.SPECIAL < 2) ? KEYBOARD.SPECIAL+1 : KEYBOARD.SPECIAL);
			}
		}
	}
	keyboardArea.appendChild(specialKeyboard);
	
	var mainKeyboard = this.keyboards[KEYBOARD.MAIN] = document.createElement("div");
	mainKeyboard.classList.add("mainKeyboard");
	mainKeyboard.onclick = function(e){
		if(e.target == mainKeyboard){
			if(e.clientX < (pageSizeX/2)){
				k.selectKeyboard((KEYBOARD.MAIN > 0) ? KEYBOARD.MAIN-1 : KEYBOARD.MAIN);
			}
			else {
				k.selectKeyboard((KEYBOARD.MAIN < 2) ? KEYBOARD.MAIN+1 : KEYBOARD.MAIN);
			}
		}
	}
	keyboardArea.appendChild(mainKeyboard);
	
	var joystickKeyboard = this.keyboards[KEYBOARD.JOYSTICK] = document.createElement("div");
	joystickKeyboard.classList.add("joystickKeyboard");
	joystickKeyboard.onclick = function(e){
		if(e.target == joystickKeyboard){
			if(e.clientX < (pageSizeX/2)){
				k.selectKeyboard((KEYBOARD.JOYSTICK > 0) ? KEYBOARD.JOYSTICK-1 : KEYBOARD.JOYSTICK);
			}
			else {
				k.selectKeyboard((KEYBOARD.JOYSTICK < 2) ? KEYBOARD.JOYSTICK+1 : KEYBOARD.JOYSTICK);
			}
		}
	}
	keyboardArea.appendChild(joystickKeyboard);
	
	//var buttonsSchemat = this.buttonsSchemat = [];
	
	//buttonsSchemat[KEYBOARD.MAIN] = "[q;0;1;0;1][w;1;2;0;1][e;2;3;0;1][r;4;5;0;1][t;5;6;0;1][y;6;7;0;1][u;7;8;0;1][i;8;9;0;1][o;10;1][p;1;1]/[a;1;2][s;1;2][d;2;2][f;2;2][g;2;2][h;2;2][j;2;2][k;1;2][l;1;2]";
	//buttonsSchemat[KEYBOARD.SPECIAL] = "[qwe][wer][ert][rty][tyu]/[<][>][[}]/[[[]/[[]]";
	//buttonsSchemat[KEYBOARD.JOYSTICK] = "[JOYSTICK]";
	
	this.replanKeyboardButtons(KEYBOARD.MAIN);
	//this.replanKeyboardButtons(KEYBOARD.SPECIAL);
	
	this.refreshKeyboardsElement();
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
		if(data[i].type == "normal"){
			button.innerHTML = data[i].value;
			button.code = data[i].value;
			button.onclick = function(e){
				editor.write(this.code);
			}
		}
		keyboard.appendChild(button);
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
