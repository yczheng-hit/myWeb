"use strict"
//鼠标跟随函数
var Follow = function () {
	//用id获取
	var $ = function (i) {return document.getElementById(i)},
		//添加事件 在e上触发f事件
		addEvent = function (o, e, f) {o.addEventListener ? o.addEventListener(e, f, false) : o.attachEvent('on'+e, function(){f.call(o)})},
		OBJ = [], sp, rs, N = 0, m;
	var init = function (id, config) {
		this.config = config || {};
		this.obj = $(id);
		sp = this.config.speed || 4;
		rs = this.config.animR || 1;
		m = {x: $(id).offsetWidth * .5, y: $(id).offsetHeight * .5};
		this.setXY();
		this.element = this.start();
	};
	init.prototype = {
		setXY : function () {
			this.obj.onmousemove = function (e) {
				e = e || window.event;
				m.x = e.pageX;
				m.y = e.pageY;
			};
		},
		start : function () {
			//fn是外部传入的函数 这部分只执行一次
			var  OO, o, fn = this.config.fn;
			OBJ[N++] = OO = new CObj(null, 0, 0);
			OO.css.display = "none";
			for(var i=0;i<200;i+=20){
				var O = OO;
				for(var j=10; j<40; j+=1){
					var x = fn(i, j).x,
						y = fn(i, j).y;
					//父元素一级一级往下叠加
					OBJ[N++] = o = new CObj(O , x, y);
					o.css.backgroundColor = "rgb("+j*10+",99,88)";
					O = o;
				}
			}
			//这部分会持续执行 16ms一次
			setInterval(function() {
				for (var i = 0; i < N; i++) {
					OBJ[i].run();
				}
			}, 16);
			return OBJ;
		},
		stop : function () {
			var obj = document.getElementsByClassName("mouseEffectClass");
			var tmp = obj.length;
			for (let i=0 ;i<tmp;i++){
				document.body.removeChild(obj[0]);
			}
			N = 0;
		}

	}
	var CObj = function (p, cx, cy) {
		var obj = document.createElement("span");
		obj.className = "mouseEffectClass";
		this.css = obj.style;
		this.css.position = "absolute";
		this.css.left = "50%";
		this.css.zIndex = 1000 + N;
		this.css.background = "rgb("+N*2+",0,0)";

		document.getElementById("screen").appendChild(obj);
		this.ddx = 0;
		this.ddy = 0;
		//用来存储上一次位置
		this.PX = 0;
		this.PY = 0;
		//初始化为0
		this.x = 0;
		this.y = 0;
		//父元素（上一个点）的位置
		this.x0 = 0;
		this.y0 = 0;
		//恒定偏移量
		this.cx = cx;
		this.cy = cy;
		//指向上一个
		this.parent = p;
	}
	// 决定运动轨迹
	CObj.prototype.run = function () {
		//xy是坐标值
		if (!this.parent) {
			this.x0 = m.x;
			this.y0 = m.y;
		} else {
			this.x0 = this.parent.x;
			this.y0 = this.parent.y;
		}
		this.x = this.PX += (this.ddx += ((this.x0 - this.PX - this.ddx) + this.cx) / rs) / sp;
		this.y = this.PY += (this.ddy += ((this.y0 - this.PY - this.ddy) + this.cy) / rs) / sp;
		// this.x = this.PX += ((this.x0 - this.PX ) + this.cx) ;
		// this.y = this.PY += ((this.y0 - this.PY ) + this.cy) ;
		this.css.left = Math.round(this.x) + 'px';
		this.css.top = Math.round(this.y) + 'px';
	}
	return init;
}();
//拖拽函数
function drag(obj){
	obj.onmousedown = function(event){
		var dx=0,
			dy=0;
		dx = event.pageX - obj.offsetLeft;
		dy = event.pageY - obj.offsetTop;
		document.onmousemove = function (event) {
			obj.style.left = event.pageX -dx+ "px";
			obj.style.top = event.pageY -dy+ "px";
		};
		document.onmouseup = function (event) {
			document.onmousedown = document.onmousemove = null;
		};
	};
}
//添加事件函数
var addEvent = function (o, e, f) {o.addEventListener ? o.addEventListener(e, f, false): o.attachEvent('on'+e, function(){f.call(o)})};

function hasclass(obj,cn) {
	var reg = new RegExp("\\b"+cn+"\\b");
	return reg.test(obj.className);
}

function addClass(obj,cn) {
	if(!hasclass(obj,cn)){
		obj.className += " "+cn;
	}
}

function removeClass(obj,cn) {
	var reg = new RegExp("\\b"+cn+"\\b");
	obj.className = obj.className.replace(reg,"");
}

function toggleClass(obj,cn) {
	if(hasclass(obj,cn)){
		removeClass(obj,cn);
	}else {
		addClass(obj,cn);
	}
}

