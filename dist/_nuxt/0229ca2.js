(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{334:function(e,t,n){"use strict";var r=n(7),o=(n(33),n(26),n(66),n(107)),c={name:"Page",asyncData:function(e){return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,c,d,l,f,data,m,h;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.$prismic,r=e.route,c=e.error,d=e.store,l=e.payload,f=r.path.replace("/",""),!d.state.pages[f]){t.next=4;break}return t.abrupt("return",{data:d.state.pages[f]});case 4:if(!l||!l.data){t.next=9;break}return t.next=7,Object(o.a)(l.data.body);case 7:return data=t.sent,t.abrupt("return",{data:data});case 9:return t.next=11,n.api.getByUID("page",f||"home");case 11:if(!(m=t.sent)){t.next=18;break}return t.next=15,Object(o.a)(m.data.body);case 15:return h=t.sent,d.commit("pages",{page:f,data:h}),t.abrupt("return",{data:h});case 18:c({statusCode:404,message:"Page not found"});case 19:case"end":return t.stop()}}),t)})))()},mounted:function(){this.$bus.$emit("LOADED")},data:function(){return{data:[]}}},d=n(9),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",{key:e.$route.path},[e._l(e.data,(function(t,a){return[t.hasComponent&&t.primary.publish?n(t.component,{tag:"component",attrs:{data:t}}):e._e()]}))],2)}),[],!1,null,null,null);t.a=component.exports},370:function(e,t,n){"use strict";n.r(t);var r=n(334).a,o=n(9),component=Object(o.a)(r,undefined,undefined,!1,null,null,null);t.default=component.exports}}]);