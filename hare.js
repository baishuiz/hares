// JavaScript Document
(function(window,undefined){
	var _frame = 25; //默认帧
	var _frameFnList = [];
	
	
	var hare = function(){};
	
	
	var _frameBind = function(fn){
		fn&&_frameFnList.push(fn);
	};
	
	//帧计时器执行
	var _onFrame = function(){
		window.clearInterval(_onFrameHandle);
		//for(var currentFn in _frameFnList)	{
		//    _frameFnList[currentFn]();
		//}
		for (var currentFn=0,l=_frameFnList.length;currentFn<l;currentFn++){
		    	_frameFnList[currentFn]();
		}
		_onFrameHandle = window.setInterval(_onFrame,1000/_frame);
	}; 
	
	var _onFrameHandle =  _frameFn(_frame);
	

	var animationFn = function(){};
    animationFn.dom = [];
	//更改宽度
    animationFn.width = function(dom,time,value){
		var currentWidth = parseInt(_css(dom,'width'));
		var step = (value-currentWidth)/(_frame*time);
		var _changeWidth = function(dom,step){
			//var newWidth = currentWidth + Math.floor(step);
			var newWidth = currentWidth;
			var isStop = false;
			return function(){
				newWidth +=step;
				var result = Math.round(newWidth);
				if(!isStop){
				    _css(dom,'width',result+'px');
					isStop = isStop||value==Math.abs(result);
				}
			}
		};
		_frameBind(_changeWidth(dom,step));
		
	};//更改宽度
	
	
	//更改高度
    animationFn.height = function(dom,time,value){
		var currentHeight = parseInt(_css(dom,'height'));
		var step = (value-currentHeight)/(_frame*time);
		var _changeHeight = function(dom,step){
			var newHeight = currentHeight;
			var isStop = false;
			return function(){
				newHeight +=step;
				var result = Math.round(newHeight);
				if(!isStop){
				    _css(dom,'height',result+'px');
					isStop = isStop||value==Math.abs(result);
				}
			}
		};
		_frameBind(_changeHeight(dom,step));
		
	};//更改高度	
	
	
	//更改透明度
    animationFn.alpha=animationFn.opacity = function(dom,time,value){
		var opacity = typeof dom.style.opacity=='undefined'?animationFn.alpha.forIE:animationFn.alpha.forW3c;
		var currentOpacity = opacity(dom);
		var step = (value-currentOpacity)/(_frame*time);
		var _changeOpacity = function(dom,step){
			var newOpacity = currentOpacity;
			var isStop = false;
			return function(){
				newOpacity +=step;
				var result = newOpacity;
				if(!isStop){
					opacity(dom,result);
					isStop = isStop||Math.abs(value-result)<0.001;
				}
			}
		};
		_frameBind(_changeOpacity(dom,step));
		
	};//更改透明度
	
	animationFn.alpha.forIE = function(dom,value){
		    //value && (value = dom.filters.alpha.opacity = value*100);
			if(value){
				dom.style.filter="alpha(opacity="+value*100+")";
				//value
			}
			//value && 
			value =_css(dom,'opacity',value);
			return parseInt(value)
	}
		
	animationFn.alpha.forW3c = function(dom,value){
			value =_css(dom,'opacity',value);	
			return parseInt(value)
	}
		
	
	//动画方法
	var _moveTo = function(sprite,time,option){
		if(!option||!sprite) return ;
		time = time||0;

		//循环设置 option中涉及到的属性
		for (attr in option){
		    animationFn[attr](sprite,time,option[attr]);
		}
	};
	
	
    //Css样式
    var _css = function(dom,styleTitle,styleValue){
        styleTitle=styleTitle.replace(/-(.)/ig,function($0){return ($0.toUpperCase().substring(1))}); //ie只支持驼峰式写法
		//styleTitle = /opacity/ig.test(styleTitle)?;
		styleValue&&(dom.style[styleTitle] = styleValue);
        var style = window.getComputedStyle?window.getComputedStyle(dom,null)[styleTitle]:dom.currentStyle[styleTitle];
        return style;
    };
		
	
	//设置帧频
	function _frameFn(frame){
	    frame&&(_frame=frame);
		_resetFrameHandel();
		return _frame;
	};

    //重置计时器
	function _resetFrameHandel(){
		window.clearInterval(_onFrameHandle);
		_onFrameHandle = window.setInterval(_onFrame,1000/_frame);
		//_onFrameHandle = window.setInterval(function(){},1000/_frame);
	};
	 
	hare.prototype = {
		moveTo: _moveTo,
		moveFrom:function(){},
		frame:function(){}
	};		
	
	window.hare = new hare;
})(window);

