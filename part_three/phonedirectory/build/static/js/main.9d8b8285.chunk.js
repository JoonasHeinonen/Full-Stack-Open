(this.webpackJsonpphonedirectory=this.webpackJsonpphonedirectory||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t(14),o=t.n(r),u=t(3),i=t(0),a=function(e){return Object(i.jsxs)("div",{children:[Object(i.jsxs)("p",{children:[e.name," ",e.number]}),Object(i.jsx)("button",{onClick:e.deleteEntity,children:"delete"})]})},l=function(e){return Object(i.jsx)("div",{children:e.persons.filter((function(n){return n.name.toLowerCase().includes(e.filter.toLowerCase())})).map((function(n){return Object(i.jsx)(a,{name:n.name,number:n.number,deleteEntity:function(){return e.deleteEntity(n.name,n.id)}},n.name)}))})},s=function(e){return Object(i.jsxs)("div",{children:["Filter with",Object(i.jsx)("input",{value:e.filter,onChange:e.onChangeHandler})]})},d=function(e){return Object(i.jsx)("div",{children:Object(i.jsx)("form",{onSubmit:e.addPerson,children:Object(i.jsxs)("div",{children:["name:",Object(i.jsx)("input",{value:e.name,onChange:e.nameHandler}),Object(i.jsx)("br",{}),"number:",Object(i.jsx)("input",{value:e.number,onChange:e.numberHandler}),Object(i.jsx)("br",{}),Object(i.jsx)("button",{type:"submit",children:"add"})]})})})},j=function(e){var n=e.notification;return null===n?null:Object(i.jsx)("div",{className:"notification",children:n})},b=function(e){var n=e.error;return null===n?null:Object(i.jsx)("div",{className:"error",children:n})},f=t(4),h=t.n(f),m="http://127.0.0.1:3001/api/persons",O=function(){return h.a.get(m).then((function(e){return e.data}))},p=function(e){return h.a.post(m,e).then((function(e){return e.data}))},x=function(e,n){return h.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},v=function(e,n){return h.a.delete("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},g=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],o=Object(c.useState)(""),a=Object(u.a)(o,2),f=a[0],h=a[1],m=Object(c.useState)(""),g=Object(u.a)(m,2),y=g[0],w=g[1],C=Object(c.useState)(""),S=Object(u.a)(C,2),k=S[0],E=S[1],H=Object(c.useState)(null),P=Object(u.a)(H,2),D=P[0],N=P[1],J=Object(c.useState)(null),L=Object(u.a)(J,2),T=L[0],A=L[1];Object(c.useEffect)((function(){O().then((function(e){r(e)}))}),[]),console.log("render",t.length,"persons");return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(j,{notification:D}),Object(i.jsx)(b,{error:T}),Object(i.jsx)(s,{filter:k,onChangeHandler:function(e){console.log(k),E(e.target.value)}}),Object(i.jsx)("h2",{children:"Add a new"}),Object(i.jsx)(d,{addPerson:function(e,n){e.preventDefault();var c={name:f,number:y,id:t.length+1};t.some((function(e){return e.name===c.name}))?window.confirm("".concat(f," is already added to phonebook! Would you like to change update the phonenumber?"))?x(c.id,c).then((function(){alert("Gone here!")})):alert("".concat(f," ")):(p(c).then((function(e){r(t.concat(e)),h(""),w("")})),setTimeout((function(){N(null),A(null)}),5e3))},name:f,number:y,nameHandler:function(e){h(e.target.value)},numberHandler:function(e){w(e.target.value)}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(l,{persons:t,filter:k,deleteEntity:function(e,n){window.confirm("Do you want to delete ".concat(e," from the phone directory?"))&&v(n).then((function(){r(t.filter((function(e){return e.id!==n}))),alert("Deleted ".concat(e," successfully from the phone directory!")),h(""),w("")})).catch((function(n){A("Problems deleting the ".concat(e," from the records.")),setTimeout((function(){A(null)}),5e3)}))}})]})};t(38);o.a.render(Object(i.jsx)(g,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.9d8b8285.chunk.js.map