(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{220:function(e,t,r){"use strict";r.r(t);r(317);var n=r(211),o={props:{top:{type:Number,default:0},endTrigger:{type:[String,Function],default:null}},mounted:function(){var e=this;this.$nextTick((function(){var t=document.getElementById("scroller"),r=e.$slots.default[0].elm,o={pin:!0,trigger:e.$refs.header,pinSpacing:!1,anticipatePin:1,start:function(){return"top top+=".concat(e.top+Object(n.e)(t,"padding-top"))},end:function(){return"bottom top+=".concat(r.offsetHeight)}};e.endTrigger&&(o.endTrigger=e.endTrigger),e.anim=ScrollTrigger.create(o)}))},destroyed:function(){this.anim&&this.anim.kill()}},c=(r(343),r(9)),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{ref:"header",staticClass:"c-slicky-header"},[e._t("default")],2)}),[],!1,null,null,null);t.default=component.exports},317:function(e,t,r){"use strict";var n=r(15),o=r(2),c=r(3),f=r(110),l=r(25),d=r(16),h=r(213),m=r(47),N=r(109),v=r(212),I=r(6),E=r(80).f,y=r(40).f,T=r(24).f,_=r(318),k=r(319).trim,x="Number",S=o.Number,w=S.prototype,A=o.TypeError,F=c("".slice),M=c("".charCodeAt),O=function(e){var t=v(e,"number");return"bigint"==typeof t?t:G(t)},G=function(e){var t,r,n,o,c,f,l,code,d=v(e,"number");if(N(d))throw A("Cannot convert a Symbol value to a number");if("string"==typeof d&&d.length>2)if(d=k(d),43===(t=M(d,0))||45===t){if(88===(r=M(d,2))||120===r)return NaN}else if(48===t){switch(M(d,1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+d}for(f=(c=F(d,2)).length,l=0;l<f;l++)if((code=M(c,l))<48||code>o)return NaN;return parseInt(c,n)}return+d};if(f(x,!S(" 0o1")||!S("0b1")||S("+0x1"))){for(var $,R=function(e){var t=arguments.length<1?0:S(O(e)),r=this;return m(w,r)&&I((function(){_(r)}))?h(Object(t),r,R):t},V=n?E(S):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),j=0;V.length>j;j++)d(S,$=V[j])&&!d(R,$)&&T(R,$,y(S,$));R.prototype=w,w.constructor=R,l(o,x,R)}},318:function(e,t,r){var n=r(3);e.exports=n(1..valueOf)},319:function(e,t,r){var n=r(3),o=r(23),c=r(13),f=r(320),l=n("".replace),d="["+f+"]",h=RegExp("^"+d+d+"*"),m=RegExp(d+d+"*$"),N=function(e){return function(t){var r=c(o(t));return 1&e&&(r=l(r,h,"")),2&e&&(r=l(r,m,"")),r}};e.exports={start:N(1),end:N(2),trim:N(3)}},320:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},333:function(e,t,r){var content=r(344);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(22).default)("14d0e8e0",content,!0,{sourceMap:!1})},343:function(e,t,r){"use strict";r(333)},344:function(e,t,r){var n=r(21)(!1);n.push([e.i,".c-slicky-header{position:relative;z-index:50}",""]),n.locals={lightGrey:"#f7f7f9",darkGrey:"#282833",pink:"#ff0093",purple:"#5600f7",blue:"#00aeef",orange:"#fe692c",lime:"#e4fe57",lime2:"#c2fa45",black:"#0a0a0e"},e.exports=n}}]);