/*
作者：baishuiz@gmail.com
*/
(function(window,undefined){
	var _frame = 25; //默认帧频
	var _frameFnList = [];
	
    //属性别名
    var _alias = {
    	x:'left',
    	y:'top'
    };
    //特殊属性
	var _specialAttribute = {
		alpha:true,
		opacity:true
	};
	
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


    //规范属性名
    var _getAttributeName = function(attrName){
    	if(attrName in _alias){
    		attrName = _alias[attrName];
    	}
    	return attrName;
    };
    
    //更改指定属性(有计量单位的)
    animationFn.layout = function(attr,dom,time,value){
		var currentAttrValue = parseInt(_css(dom,attr))||0;
		var step = (value-currentAttrValue)/(_frame*time);//此处根据缓动公式，重新计算step
		var _changeAttrValue = function(dom,step){
			//var newValue = currentAttrValue + Math.floor(step);
			var newValue = currentAttrValue;
			var isStop = false;
			return function(){
				newValue +=step;
				var result = Math.round(newValue);
				if(!isStop){
				    _css(dom,attr,result+'px');
					isStop = isStop||Math.abs(value)<=Math.abs(result);
					isStop && _css(dom,attr,value+'px');
				}
			}
		};
		_frameBind(_changeAttrValue(dom,step));    	
    };

	
	
	//更改透明度
    animationFn.alpha = animationFn.opacity = function(dom,time,value){
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
			var attrFix = _getAttributeName(attr);
		    if(_specialAttribute[attrFix]){
		    	animationFn[attrFix](sprite,time,option[attr]);
			}else{
		    	animationFn.layout(attrFix,sprite,time,option[attr]);
			}
		}
	};

    //相对位置移动
	var _moveBy = function(sprite,time,option){
		if(!option||!sprite) return ;
		time = time||0;

		//循环设置 option中涉及到的属性
		for (attr in option){
			var attrFix = _getAttributeName(attr);
			var currentAttrValue = parseInt(_css(sprite,attrFix))||0;
		    if(_specialAttribute[attrFix]){
		    	animationFn[attrFix](sprite,time,currentAttrValue+option[attr]);
			}else{
		    	animationFn.layout(attrFix,sprite,time,currentAttrValue+option[attr]);
			}
		}
	};//over	
	
	
    //Css样式
	//首先将css名称 统一为 驼峰式；
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
		moveBy: _moveBy,
		moveFrom:function(){},
		frame:_frameFn
	};		
	
	window.hare = new hare;
})(window);

