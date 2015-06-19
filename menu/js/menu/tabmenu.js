function Tabmenu(element, menu){
	this.menu = menu;
	this.element = element;
	element.classList.add("tabmenu");
	var tabs = this.tabs = [];
	this.createTabs();
}
Tabmenu.prototype.createTabs = function(){
	for(var i in MENUTAB){
		var tab = MENUTAB[i];
		var element = document.createElement("div");
		element.tabname = tab;
		var t = this;
		element.onclick = function(e){
			t.openTab(this.tabname);
		}
		element.classList.add("tabButton");
		element.innerHTML = tab;
		this.tabs.push(element);
		this.element.appendChild(element);
	}

}
Tabmenu.prototype.openTab = function(tabName){
	this.menu.openMenu(tabName);
}
