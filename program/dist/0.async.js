webpackJsonp([0],{509:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(25),a=n.n(r),s=n(76),u=n.n(s),o=n(77),c=n.n(o),i=n(143),p=n.n(i),l=n(99),d=n.n(l),f=n(38),v=n.n(f),h=n(62),y=function(){var t=p()(u.a.mark(function t(e){var n,r;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=v.a.get("access_token"),r=window.sessionStorage.getItem("user_id"),t.abrupt("return",d()({method:"get",url:h.g+"/users/".concat(r,"/reqs/").concat(e,"/solutions"),headers:{Authorization:n}}).then(function(t){var e=t.status,n=t.statusText;return c.a.resolve(a()({status:e,statusText:n},t.data))}));case 3:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),w=function(){var t=p()(u.a.mark(function t(e,n){var r,s;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=v.a.get("access_token"),s=window.sessionStorage.getItem("user_id"),t.abrupt("return",d()({method:"get",url:h.g+"/users/".concat(s,"/reqs/").concat(e,"/solutions/").concat(n),headers:{Authorization:r}}).then(function(t){var e=t.status,n=t.statusText;return c.a.resolve(a()({status:e,statusText:n},t.data))}));case 3:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}();e.default={namespace:"me",state:{reqSolutions:[],myReqSolution:{}},effects:{saveSolutions:u.a.mark(function t(e,n){var r,a,s,o;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.reqId,a=n.call,s=n.put,t.next=4,a(y,r);case 4:return o=t.sent,t.next=7,s({type:"save",payload:o});case 7:case"end":return t.stop()}},t,this)}),fetchMyReqSolution:u.a.mark(function t(e,n){var r,a,s,o,c;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.reqId,a=e.solutionId,s=n.call,o=n.put,t.next=4,s(w,r,a);case 4:return c=t.sent,t.next=7,o({type:"saveMyReqSolution",payload:c});case 7:case"end":return t.stop()}},t,this)})},reducers:{save:function(t,e){return a()({},t,{reqSolutions:e.payload.data})},saveMyReqSolution:function(t,e){return a()({},t,{myReqSolution:e.payload.data})}}}}});