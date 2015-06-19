var devEditor;
var tm;
window.onload = function(){
	devEditor = new DevEditor(document.getElementById("menu"), document.getElementById("editor"), document.getElementById("navbar"));
	//tm = new TouchManager(document.getElementById("navbar"), true);
}

function DevEditor(menuBox, editorBox, navbarBox){
	var BOXTYPE = this.BOXTYPE = {MENU:0, NAVBAR:1, EDITOR:2};
	var POSITION = this.POSITION = {EDITOR:0, MENU: 1};
	var boxes = this.boxes = [];
	this.pos = POSITION.MENU;
	boxes[BOXTYPE.MENU] = menuBox;
	boxes[BOXTYPE.EDITOR] = editorBox;
	boxes[BOXTYPE.NAVBAR] = navbarBox;
	
	var menu = this.menu = new Menu(menuBox); 
}
DevEditor.prototype.setPosition = function(pos){
	var boxes = this.boxes;
	var BOXTYPE = this.BOXTYPE;
	if(this.pos==pos)return;
	var dir = "top";
	if(pos==this.POSITION.MENU){
		dir = "bottom";
	}
	boxes[BOXTYPE.EDITOR].style.animation = "1s cubic-bezier(0.68,-0.55,0.27,1.55) 0s normal none infinite running editor-to-" + dir;
	boxes[BOXTYPE.NAVBAR].style.animation = "1s cubic-bezier(0.68,-0.55,0.27,1.55) 0s normal none infinite running navbar-to-" + dir;
	//boxes[BOXTYPE.MENU].style.animation = "1s cubic-bezier(0.68,-0.55,0.27,1.55) 0s normal none infinite running menu-to-" + dir;
	var t = this;
	setTimeout(function(){
		boxes[BOXTYPE.EDITOR].style.animation = "";
		boxes[BOXTYPE.NAVBAR].style.animation = "";
		//boxes[BOXTYPE.MENU].style.animation = "";
		boxes[BOXTYPE.EDITOR].classList.remove("top");
		boxes[BOXTYPE.EDITOR].classList.remove("bottom");
		boxes[BOXTYPE.NAVBAR].classList.remove("top");
		boxes[BOXTYPE.NAVBAR].classList.remove("bottom");
		//boxes[BOXTYPE.MENU].classList.remove("top");
		//boxes[BOXTYPE.MENU].classList.remove("bottom");
		boxes[BOXTYPE.EDITOR].classList.add(dir);
		boxes[BOXTYPE.NAVBAR].classList.add(dir);
		//boxes[BOXTYPE.MENU].classList.add(dir);
		t.pos = pos;
	}, 1000);
}
