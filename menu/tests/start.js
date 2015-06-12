		var t = [];
		var main = -1;
		t[0] = document.getElementById("t1");
		t[1] = document.getElementById("t2");
		t[2] = document.getElementById("t3");
		var c = document.getElementById("circle");
		
		t[0].onclick = function(){
			setMain(0);
		}
		t[1].onclick = function(){
			setMain(1);
		}
		t[2].onclick = function(){
			setMain(2);
		}
		
		function setMain(id){
			main = id;
			for(var i in t){
				if(i!=id){
					t[i].style.animation = "t" + (1+Number(i)) +"-off 0.3s infinite";
				}
			}
			setTimeout(function(){
				for(var i in t){
					if(i!=id){
						t[i].style.display="none";
						t[id].style.animation ="";
					}
				}
				t[id].style.animation = "t" + (1+id) +"-main 1s infinite";
				c.style.animation = "circle-off 0.3s 0.3s infinite";
				setTimeout(function(){
					t[id].style.width="calc(100% - 30px)";
					t[id].style.top="0";
					t[id].style.right="0";
					t[id].style.transform="rotate(0deg)";
					t[id].style.animation ="";
				}, 1000);
				setTimeout(function(){
					c.style.display = "none";
					c.style.animation = "";
				}, 600);
			}, 300);
		}

