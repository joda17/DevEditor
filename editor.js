
var DIRECTION = {};
DIRECTION.UP = 0;
DIRECTION.DOWN = 1;
DIRECTION.LEFT = 2;
DIRECTION.RIGHT = 3;

function Editor(editorArea, startRowsAmount){
	this.editorArea = editorArea;
	
	var rowsData = this.rowsData = [];
	var rows = this.rows = [];
	var cursor = this.cursor = [0, 0];
	
	for(var i = 0;i < startRowsAmount;i++){
		rowsData[i] = "abc<div><br></div>" + i;
		var row = rows[i] = document.createElement("div");
		row.innerHTML = this.formatRowData(rowsData[i], -1);
		row.classList.add("editRow");
		var editor = this;
		row.rowId = i;
		row.onclick = function(e){
			editor.callClickedRowEvent(this.rowId, e.clientX, e.clientY);
		}
		editorArea.appendChild(row);
	}
	
	rows[cursor[0]].innerHTML = this.formatRowData(rowsData[cursor[0]], cursor[1]);
}

Editor.prototype.callClickedRowEvent = function(id, x, y){
	var cursor = 0;
	for(var i in this.rows[id].children){
		if(this.rows[id].children[i].offsetLeft < x + window.pageXOffset)cursor = Number(i);
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
			char = char.replace(/&/gi, "&amp;");
			char = char.replace(/</gi, "&lt;");
			char = char.replace(/>/gi, "&gt;");
			f += "<span charId='" + i + "'>" + formated[i] + "</span>"; 
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
