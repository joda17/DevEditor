
var DIRECTION = {};
DIRECTION.UP = 0;
DIRECTION.DOWN = 1;
DIRECTION.LEFT = 2;
DIRECTION.RIGHT = 3;

function Editor(editorArea, startRowsAmount,pageSizeX, pageSizeY){
	this.editorArea = editorArea;
	editorArea.style.height = pageSizeY - (2*(pageSizeY/5)) - 5;
	var rowsData = this.rowsData = [];
	var rows = this.rows = [];
	var cursor = this.cursor = [0, 0];
	
	for(var i = 0;i < startRowsAmount;i++){
		this.addRow();
		rowsData[i] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
		this.refreshRow(i);
	}
	
	rows[cursor[0]].innerHTML = this.formatRowData(rowsData[cursor[0]], cursor[1]);
}

Editor.prototype.callClickedRowEvent = function(id, x, y){
	var cursor = 0;
	for(var i in this.rows[id].children){
		if(this.rows[id].children[i].offsetLeft < x + window.pageXOffset + this.editorArea.parentElement.scrollLeft)cursor = Number(i);
	}
	this.setCursor(id, cursor);

}
Editor.prototype.selectRow = function(id){
	for(var i in this.rows){
		if(i!=id)this.rows[i].classList.remove("selectedRow");
	}
	this.rows[id].classList.add("selectedRow");
}
Editor.prototype.formatRowData = function(data, cursor){
	var formated = data;
	if(cursor >= 0 && cursor <= formated.length){
		formated = this.formatRowData(formated.slice(0, cursor)) + "<span class='cursor'>|</span>" + this.formatRowData(formated.slice(cursor, formated.length));
	}
	else {
		var f = "";
		for(var i = 0;i < formated.length;i++){
			var char = formated[i];
			char = char.replace(/&/gi, "&amp;");//must be first
			char = char.replace(/</gi, "&lt;");
			char = char.replace(/>/gi, "&gt;");
			char = char.replace(/\t/gi, '    ');
			char = char.replace(/\s/gi, '&nbsp;');
			f += "<span charId='" + i + "'>" + char + "</span>"; 
		}
		formated = f;
	}
	return formated;
}
Editor.prototype.refreshRow = function(id){
	this.rows[id].innerHTML = this.formatRowData(this.rowsData[id], (this.cursor[0]==id) ? this.cursor[1]:-1);
}
Editor.prototype.moveCursor = function(direction){
	if(direction == DIRECTION.UP){
		this.setCursor(this.cursor[0] - 1, this.cursor[1]);
	}
	else if(direction == DIRECTION.DOWN){
		this.setCursor(this.cursor[0] + 1, this.cursor[1]);
	}
	else if(direction == DIRECTION.LEFT){
		this.setCursor(this.cursor[0], this.cursor[1] - 1);
	}
	else if(direction == DIRECTION.RIGHT){
		this.setCursor(this.cursor[0], this.cursor[1] + 1);
	}
}
Editor.prototype.setCursor = function(row, col){
	if(row < 0 || row >= this.rows.length || col < 0 || col > this.rowsData[row].length)return;
	var oldRow = this.cursor[0];
	this.cursor = [row, col];
	this.refreshRow(oldRow);
	this.refreshRow(row);
	this.selectRow(row);
}
Editor.prototype.write = function(char){
	var row = this.rowsData[this.cursor[0]];
	row = row.slice(0, this.cursor[1]) + char + row.slice(this.cursor[1], row.length);
	this.rowsData[this.cursor[0]] = row;
	this.setCursor(this.cursor[0], this.cursor[1] + char.length);
}
Editor.prototype.addRow = function(){
	var id = this.rows.length;
	this.rowsData[id] = "";
	var row = this.rows[id] = document.createElement("div");
	row.innerHTML = this.formatRowData(this.rowsData[id], -1);
	row.classList.add("editRow");
	var editor = this;
	row.rowId = id;
	row.onclick = function(e){
		editor.callClickedRowEvent(this.rowId, e.clientX, e.clientY);
	}
	this.editorArea.appendChild(row);
}
Editor.prototype.callEnterEvent = function(){
	this.addRowAt(this.cursor[0]+1);
	this.rowsData[this.cursor[0]+1] = this.rowsData[this.cursor[0]].slice(this.cursor[1], this.rowsData[this.cursor[0]].length);
	this.rowsData[this.cursor[0]] = this.rowsData[this.cursor[0]].slice(0, this.cursor[1]);
	this.setCursor(this.cursor[0]+1, 0);
}
Editor.prototype.callBackspaceEvent = function(){
	if(this.cursor[1] > 0){
		this.rowsData[this.cursor[0]] = this.rowsData[this.cursor[0]].slice(0, this.cursor[1] - 1) + this.rowsData[this.cursor[0]].slice(this.cursor[1], this.rowsData[this.cursor[0]].length);
		this.setCursor(this.cursor[0], this.cursor[1] - 1);
		this.refreshRow(this.cursor[0]);
	}
	else if(this.cursor[0] > 0) {
		var newCursorPos = this.rowsData[this.cursor[0]-1].length;
		this.rowsData[this.cursor[0]-1] += this.rowsData[this.cursor[0]];
		this.removeRowAt(this.cursor[0]);
		this.setCursor(this.cursor[0]-1, newCursorPos);
		this.refreshRow(this.cursor[0]);
		this.refreshRow(this.cursor[0]+1);
	}
}
Editor.prototype.addRowAt = function(id){
	if(id < 0)id = 0;
	if(id > this.rows.length)id = this.rows.length;
	
	this.addRow();
	
	for(var i = this.rows.length-2;i >= id;i--){
		this.rowsData[i+1] = this.rowsData[i];
		this.refreshRow(i+1);
	}
	this.rowsData[id] = "";
	this.refreshRow(id);
}
Editor.prototype.removeLastRow = function(){
	var id = this.rows.length - 1;
	this.rowsData.pop(id);
	this.editorArea.removeChild(this.rows[id]);
	this.rows.pop(id);
}
Editor.prototype.removeRowAt = function(id){
	if(id < 0)id = 0;
	if(id >= this.rows.length)id = this.rows.length - 1;
	
	for(var i = id;i < this.rows.length - 1;i++){
		this.rowsData[i] = this.rowsData[i+1];
		this.refreshRow(i);
	}
	
	this.removeLastRow();
}
