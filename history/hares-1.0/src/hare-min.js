(function(k,d){var g=25;var f=[];var l={x:"left",y:"top"};var e={alpha:true,opacity:true};var p=function(){};var q=function(r){r&&f.push(r)};var o=function(){k.clearInterval(i);for(var s=0,r=f.length;s<r;s++){f[s]()}i=k.setInterval(o,1000/g)};var i=a(g);var j=function(){};j.dom=[];var m=function(r){if(r in l){r=l[r]}return r};j.layout=function(r,x,v,u){var w=parseInt(n(x,r))||0;var t=(u-w)/(g*v);var s=function(B,z){var A=w;var y=false;return function(){A+=z;var C=Math.round(A);if(!y){n(B,r,C+"px");y=y||Math.abs(u)<=Math.abs(C);y&&n(B,r,u+"px")}}};q(s(x,t))};j.alpha=j.opacity=function(x,w,v){var t=typeof x.style.opacity=="undefined"?j.alpha.forIE:j.alpha.forW3c;var s=t(x);var u=(v-s)/(g*w);var r=function(B,z){var A=s;var y=false;return function(){A+=z;var C=A;if(!y){t(B,C);y=y||Math.abs(v-C)<0.001}}};q(r(x,u))};j.alpha.forIE=function(s,r){if(r){s.style.filter="alpha(opacity="+r*100+")"}r=n(s,"opacity",r);return parseInt(r)};j.alpha.forW3c=function(s,r){r=n(s,"opacity",r);return parseInt(r)};var h=function(s,u,t){if(!t||!s){return}u=u||0;for(attr in t){var r=m(attr);if(e[r]){j[r](s,u,t[attr])}else{j.layout(r,s,u,t[attr])}}};var b=function(s,u,t){if(!t||!s){return}u=u||0;for(attr in t){var r=m(attr);var v=parseInt(n(s,r))||0;if(e[r]){j[r](s,u,v+t[attr])}else{j.layout(r,s,u,v+t[attr])}}};var n=function(u,s,r){s=s.replace(/-(.)/ig,function(v){return(v.toUpperCase().substring(1))});r&&(u.style[s]=r);var t=k.getComputedStyle?k.getComputedStyle(u,null)[s]:u.currentStyle[s];return t};function a(r){r&&(g=r);c();return g}function c(){k.clearInterval(i);i=k.setInterval(o,1000/g)}p.prototype={moveTo:h,moveBy:b,moveFrom:function(){},frame:a};k.hare=new p})(window);
