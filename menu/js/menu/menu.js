var MENUTAB = {};
MENUTAB.FILES = "Files";
MENUTAB.MEMORY = "Memory";
MENUTAB.GITHUB = "Github";

function Menu(element){
	this.element = element;
	var tabmenu_element = document.createElement("div");
	element.appendChild(tabmenu_element);
	var tabmenu = this.tabmenu = new Tabmenu(tabmenu_element, this);
}
Menu.prototype.openMenu = function(menu){
	console.log("test " + menu);
}
