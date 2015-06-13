var TOUCHDIRECTION = {};
TOUCHDIRECTION.UP = [[(7/4)*Math.PI, 2*Math.PI],[0, (1/4)*Math.PI]];
TOUCHDIRECTION.RIGHT = [[(1/4)*Math.PI, (3/4)*Math.PI]];
TOUCHDIRECTION.DOWN = [[(3/4)*Math.PI, (5/4)*Math.PI]];
TOUCHDIRECTION.LEFT = [[(5/4)*Math.PI, (7/4)*Math.PI]]; 
function TouchManager(element, singleTouch){
	this.singleTouch = singleTouch;
	this.history = {};
	this.log = [];
	this.listener = {onstart: null, onmove: null, onend: null};
	this.element = element;
	var t = this;
	element.addEventListener("touchstart", function(e){t.handleTouchStart(e,t);}, false);
	element.addEventListener("touchend", function(e){t.handleTouchEnd(e,t);}, false);
	element.addEventListener("touchcancel", function(e){t.handleTouchCancel(e,t);}, false);
	element.addEventListener("touchleave", function(e){t.handleTouchLeave(e,t);}, false);
	element.addEventListener("touchmove", function(e){t.handleTouchMove(e,t);}, false);
}

TouchManager.prototype.getAngle = function(x,y){
	var a = Math.atan2(y,x);
	a-=(Math.PI/2);
	if(a < 0){
		a+=(2*Math.PI);
	}
	return (2*Math.PI)-a;
}
TouchManager.prototype.handleTouchStart = function(e,t){
	if(t.singleTouch){
		if(Object.keys(t.history).length > 0){
			return;
		}	
	}
	var time = e.timeStamp;
	var touches = e.changedTouches;
	for(var i in touches){
		var touch = touches[i];
		if(t.history[touch.identifier]){
			t.history[touch.identifier] = null;
		}
		t.history[touch.identifier] = [];
		t.history[touch.identifier].push({time: time, x: touch.clientX, y: touch.clientY});
		
		if(!t.listener.onstart)return;
		
		var event = {id:touch.identifier, x:touch.clientX, y:touch.clientY, time:time};		
		t.listener.onstart(event);
				
		if(t.singleTouch)break;
	}
}
TouchManager.prototype.handleTouchEnd = function(e,t){
	var time = e.timeStamp;
	var touches = e.changedTouches;
	for(var i in touches){
		var touch = touches[i];
		if(!t.history[touch.identifier])return;
		t.history[touch.identifier].push({time: time, x: touch.clientX, y: touch.clientY});
		
		if(!t.listener.onend)return;
		var event = {id:touch.identifier, part: {}, total: {}};		
		
		var touchFirst = t.history[touch.identifier][0];
		var touchPenultimate = t.history[touch.identifier][t.history[touch.identifier].length-2];
		var touchLast = t.history[touch.identifier][t.history[touch.identifier].length-1];

		event.part.startX = touchPenultimate.x;
		event.part.endX = touchLast.x;
		event.part.startY = touchPenultimate.y;
		event.part.endY = touchLast.y;
		event.total.startX = touchFirst.x;
		event.total.endX = touchLast.x;
		event.total.startY = touchFirst.Y;
		event.total.endY = touchLast.Y;

		event.part.moveX = touchLast.x - touchPenultimate.x;
		event.part.moveY = touchPenultimate.y - touchLast.y;
		event.part.move = Math.sqrt(Math.pow(event.part.moveX,2)+Math.pow(event.part.moveY,2));
		event.total.moveX = touchLast.x - touchFirst.x;
		event.total.moveY = touchFirst.y - touchLast.y;
		event.total.move = Math.sqrt(Math.pow(event.total.moveX,2)+Math.pow(event.total.moveY,2));
		
		event.part.angle = t.getAngle(event.part.moveX, event.part.moveY);
		event.total.angle = t.getAngle(event.total.moveX, event.total.moveY);
		
		event.part.time = touchLast.time - touchPenultimate.time;
		event.total.time = touchLast.time - touchFirst.time;
		
		event.part.speedX = event.part.moveX/event.part.time;
		event.part.speedY = event.part.moveY/event.part.time;
		event.part.speed = event.part.move/event.part.time;
		event.total.speedX = event.total.moveX/event.total.time;
		event.total.speedY = event.total.moveY/event.total.time;
		event.total.speed = event.total.move/event.total.time;
		
		for(var j in TOUCHDIRECTION){
			var dir = TOUCHDIRECTION[j];
			for(var k in dir){
				if(event.part.angle >= dir[k][0] && event.part.angle <= dir[k][1])event.part.dir = j;
				if(event.total.angle >= dir[k][0] && event.total.angle <= dir[k][1])event.total.dir = j;
			}
		}
		
		t.listener.onend(event);
		
		t.history[touch.identifier] = null;
	}
}
TouchManager.prototype.handleTouchLeave = function(e,t){
	this.log.push(e);
}
TouchManager.prototype.handleTouchCancel = function(e,t){
	this.log.push(e);
}
TouchManager.prototype.handleTouchMove = function(e,t){
	var time = e.timeStamp;
	var touches = e.changedTouches;
	for(var i in touches){
		var touch = touches[i];
		if(!t.history[touch.identifier])continue;
		t.history[touch.identifier].push({time: time, x: touch.clientX, y: touch.clientY});
		if(!t.listener.onmove)return;
		var event = {id:touch.identifier, part: {}, total: {}};		
		
		var touchFirst = t.history[touch.identifier][0];
		var touchPenultimate = t.history[touch.identifier][t.history[touch.identifier].length-2];
		var touchLast = t.history[touch.identifier][t.history[touch.identifier].length-1];

		event.part.startX = touchPenultimate.x;
		event.part.endX = touchLast.x;
		event.part.startY = touchPenultimate.y;
		event.part.endY = touchLast.y;
		event.total.startX = touchFirst.x;
		event.total.endX = touchLast.x;
		event.total.startY = touchFirst.Y;
		event.total.endY = touchLast.Y;

		event.part.moveX = touchLast.x - touchPenultimate.x;
		event.part.moveY = touchPenultimate.y - touchLast.y;
		event.part.move = Math.sqrt(Math.pow(event.part.moveX,2)+Math.pow(event.part.moveY,2));
		event.total.moveX = touchLast.x - touchFirst.x;
		event.total.moveY = touchFirst.y - touchLast.y;
		event.total.move = Math.sqrt(Math.pow(event.total.moveX,2)+Math.pow(event.total.moveY,2));
		
		event.part.angle = t.getAngle(event.part.moveX, event.part.moveY);
		event.total.angle = t.getAngle(event.total.moveX, event.total.moveY);
		
		event.part.time = touchLast.time - touchPenultimate.time;
		event.total.time = touchLast.time - touchFirst.time;
		
		event.part.speedX = event.part.moveX/event.part.time;
		event.part.speedY = event.part.moveY/event.part.time;
		event.part.speed = event.part.move/event.part.time;
		event.total.speedX = event.total.moveX/event.total.time;
		event.total.speedY = event.total.moveY/event.total.time;
		event.total.speed = event.total.move/event.total.time;
		
		for(var j in TOUCHDIRECTION){
			var dir = TOUCHDIRECTION[j];
			for(var k in dir){
				if(event.part.angle >= dir[k][0] && event.part.angle <= dir[k][1])event.part.dir = j;
				if(event.total.angle >= dir[k][0] && event.total.angle <= dir[k][1])event.total.dir = j;
			}
		}
		
		t.listener.onmove(event);
	}
	
}

