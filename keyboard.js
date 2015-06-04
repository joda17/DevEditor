var KEYBOARD = {};
KEYBOARD.MAIN = 1;
KEYBOARD.JOYSTICK = 2;
KEYBOARD.SPECIAL = 0;

function Keyboard(pageSizeX, pageSizeY, keyboardArea){
	this.selectedKeyboard = KEYBOARD.MAIN;
	this.keyboardArea = keyboardArea;
	this.keyboards = [];
	keyboardArea.style.height = (pageSizeY/3) + "px";
	keyboardArea.style.width = "100%";
	
	var k = this;
	
	var specialKeyboard = this.keyboards[KEYBOARD.SPECIAL] = document.createElement("div");
	specialKeyboard.classList.add("specialKeyboard");
	specialKeyboard.onclick = function(e){
		k.selectKeyboard(KEYBOARD.MAIN);
	}
	keyboardArea.appendChild(specialKeyboard);
	
	var mainKeyboard = this.keyboards[KEYBOARD.MAIN] = document.createElement("div");
	mainKeyboard.classList.add("mainKeyboard");
	mainKeyboard.onclick = function(e){
		k.selectKeyboard(KEYBOARD.JOYSTICK);
	}
	keyboardArea.appendChild(mainKeyboard);
	
	var joystickKeyboard = this.keyboards[KEYBOARD.JOYSTICK] = document.createElement("div");
	joystickKeyboard.classList.add("joystickKeyboard");
	joystickKeyboard.onclick = function(e){
		k.selectKeyboard(KEYBOARD.SPECIAL);
	}
	keyboardArea.appendChild(joystickKeyboard);
	this.refreshKeyboardsElement();
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
		toOpen.style.animation = "moveKeyboardFromLeft 0.5s";
		toClose.style.animation = "moveKeyboardToRight 0.5s";
		
		var kb = this;
		
		this.animationLock = true;
		
		setTimeout(function(){
			kb.animationLock = false;
			toClose.style.animation = "";
			toClose.style.display = "none";
			toOpen.style.animation = "";
			kb.selectedKeyboard = k;
		}, 500);
	}
	else if(k == this.selectedKeyboard + 1){
		var toOpen = this.getKeyboard(k);
		var toClose = this.getKeyboard(k-1);
		
		toOpen.style.display = "block";
		toOpen.style.animation = "moveKeyboardFromRight 0.5s";
		toClose.style.animation = "moveKeyboardToLeft 0.5s";
		
		var kb = this;
		
		this.animationLock = true;
		
		setTimeout(function(){
			kb.animationLock = false;
			toClose.style.animation = "";
			toClose.style.display = "none";
			toOpen.style.animation = "";
			kb.selectedKeyboard = k;
		}, 500);
	}
	else if(k < this.selectedKeyboard){
		this.selectKeyboard(this.selectedKeyboard - 1);
		var kb = this;
		setTimeout(function(){
			kb.selectKeyboard(k);
		}, 500);

	}
	else if(k > this.selectedKeyboard){
		this.selectKeyboard(this.selectedKeyboard + 1);
		var kb = this;
		setTimeout(function(){
			kb.selectKeyboard(k);
		}, 500);
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
