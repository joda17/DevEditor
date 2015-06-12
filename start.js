	var editorElement = document.createElement("div");
	editorElement.classList.add("editor");
	var editArea = document.createElement("div");
	editArea.classList.add("editArea");
	editorElement.appendChild(editArea);
	document.getElementById("body").appendChild(editorElement);
	var editor = new Editor(editArea, 10,document.body.clientWidth, document.body.clientHeight);
	
	
	var keyboardElement = document.createElement("div");
	keyboardElement.classList.add("keyboard");
	document.getElementById("body").appendChild(keyboardElement);
	var keyboard = new Keyboard(document.body.clientWidth, document.body.clientHeight, keyboardElement, editor);
	
	/*
	//keyboard
	var chars = "qwertyuiopasdfghjklzxcvbnm,.[];:{}<>?/\|+=-_*&^%$#@!~`'" + '"';
	var keyboardDiv = document.getElementById("keyboard");
	for(var i = 0;i < chars.length;i++){
		var button = document.createElement("button");
		button.value = chars[i];
		button.innerHTML = chars[i];
		button.onclick = function(e){
			editor.write(this.value);
		}
		keyboardDiv.appendChild(button);
	}
	var buttonEnter = document.createElement("button");
	buttonEnter.innerHTML = "Enter";
	buttonEnter.onclick = function(e){
		editor.callEnterEvent();
	}
	keyboardDiv.appendChild(buttonEnter);
	var buttonBackspace = document.createElement("button");
	buttonBackspace.innerHTML = "Backspace";
	buttonBackspace.onclick = function(e){
		editor.callBackspaceEvent();
	}
	keyboardDiv.appendChild(buttonBackspace);
	*/
