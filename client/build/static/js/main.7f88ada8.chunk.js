(window.webpackJsonphealthcaretest=window.webpackJsonphealthcaretest||[]).push([[0],{28:function(e,t,n){e.exports=n(67)},33:function(e,t,n){},34:function(e,t,n){},67:function(e,t,n){"use strict";n.r(t);var a=n(15),r=n(0),i=n.n(r),c=n(8),o=n.n(c),l=(n(33),n(34),n(35),n(23)),u=n(14),p=n(27),s=n(69);function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(n,!0).forEach(function(t){Object(a.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var f=function(){return i.a.createElement(l.ClipLoader,{sizeUnit:"px",size:50,color:"#123abc",loading:!0})},h=function(e){var t=e.patient,n=t.lastName,a=void 0===n?"":n,r=t.firstName,c=void 0===r?"":r,o=t.uiPulse,l=t.uiTemp,u=t.town,p=void 0===u?"":u,d=t.Medications,m=t.pulse,h=t.temp,b=t.patientSelected,v=void 0!==b&&b,E=t._id,y=t.selectPatient,O=void 0===y?function(){}:y,g=t.handleChange,P=void 0===g?function(){}:g,j=t.updateStatus,w=void 0===j?function(){}:j,S=t.showForm,D=void 0===S?function(){}:S,k=t.displayForm,x=void 0!==k&&k,C=t.patientIndex,F=void 0===C?0:C;return i.a.createElement("div",null,i.a.createElement("h2",null,"Patient:"),i.a.createElement(s.a,{onClick:function(){return O({patientIndex:F,_id:E})}},v?"Hide Patient":"Select Patient"),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement("p",null,"FirstName: ",c),i.a.createElement("p",null,"LastName: ",a),i.a.createElement("p",null,"Town: ",p),v&&i.a.createElement("h3",null,"Medicine:"),v&&(d?d.map(function(e,t){var n=e.medname,a=e.dose,r=e.startDate,c=e.stopDate;return i.a.createElement("div",{key:"".concat(F,"-").concat(t,"-medicine-key")},i.a.createElement("h3",null,t+1,")"),i.a.createElement("p",null,"Medicine Name: ",n),i.a.createElement("p",null,"Dosage: ",a),i.a.createElement("p",null,"Start Date: ",r),c&&i.a.createElement("p",null,"Stop Date: ",c),i.a.createElement("br",null))}):f()),i.a.createElement("br",null),v&&i.a.createElement("h3",null,"Status:"),v&&(h&&m?i.a.createElement("div",null,i.a.createElement("p",null,"Temperature: ",l||h),i.a.createElement("p",null,"Pulse: ",o||m)):f()),v&&i.a.createElement("div",null,x?i.a.createElement("div",null,i.a.createElement("input",{name:"temp",placeholder:"Temperature",onChange:function(e){return P("uiTemp",e,F)}}),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement("input",{name:"pulse",placeholder:"Pulse",onChange:function(e){return P("uiPulse",e,F)}}),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(s.a,{onClick:function(){return w({patientIndex:F,_id:E,temp:l||h,pulse:o||m})}},"Save")):i.a.createElement(s.a,{onClick:function(){return D({patientIndex:F})}},"Edit Status")),i.a.createElement("hr",null))},b=Object(p.a)(function(e){var t=e.mobxStore,n=t.patients,a=void 0===n?[]:n,r=t.selectPatient,c=void 0===r?function(){}:r,o=t.updateStatus,l=void 0===o?function(){}:o,p=t.handleChange,s=void 0===p?function(){}:p,d=t.showForm,f=void 0===d?function(){}:d;return i.a.createElement("div",{className:"App"},i.a.createElement("header",{className:"App-header"},i.a.createElement(u.a,null),i.a.createElement("h1",null,"Medical Startup App #91235!")),a.map(function(e,t){return i.a.createElement(h,{key:"patient-".concat(t),patient:m({},e,{patientIndex:t,selectPatient:c,updateStatus:l,handleChange:s,showForm:f})})}))}),v=n(2),E=(n(66),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Wow so easy!",t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return t?u.b.success(e):u.b.error(e)});function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}var O=Object(v.k)({showForm:function(e){var t=e.patientIndex;O.patients[t].displayForm=!0},handleChange:function(e,t,n){O.patients[n][e]=t.target.value},updateStatus:function(e){var t=e.patientIndex,n=e._id,a=e.temp,r=e.pulse,i=O.patients[t].temp,c=O.patients[t].pulse;try{O.patients[t].temp=a,O.patients[t].pulse=r,fetch("/patient-status/".concat(n),{method:"PUT",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrer:"no-referrer",body:JSON.stringify({temp:a,pulse:r})}).then(function(e){return E("Successful update!",!0)})}catch(o){O.patients[t].temp=i,O.patients[t].pulse=c,E("Did not update!",!1)}O.patients[t].displayForm=!1},getPatients:function(){var e=[];try{0===O.patients.length&&fetch("/patients").then(function(e){return e.json()}).then(function(t){Object.keys(t).map(function(n){return e.push(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(n,!0).forEach(function(t){Object(a.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({_id:n},t[n]))}),O.patients=e})}catch(t){E("Failed to fetch patients!",!1)}},selectPatient:function(e){var t=e.patientIndex,n=e._id;try{O.patients[t].temp&&!O.patients[t].pulse||fetch("/patient-status/".concat(n)).then(function(e){return e.json()}).then(function(e){var n=e.temp,a=e.pulse;O.patients[t].temp=n,O.patients[t].pulse=a}),O.patients[t].Medications||fetch("/medications/".concat(n)).then(function(e){return e.json()}).then(function(e){O.patients[t].Medications=e.Medications})}catch(a){E("Failed to fetch medications/patient status!",!1)}O.patients[t].patientSelected=!O.patients[t].patientSelected},patients:[]});O.getPatients(),o.a.render(i.a.createElement(b,{mobxStore:O}),document.getElementById("root"))}},[[28,1,2]]]);
//# sourceMappingURL=main.7f88ada8.chunk.js.map