!function(t){var e={};function o(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";var n=a(o(1)),i=a(o(2)),r=a(o(3));function a(t){return t&&t.__esModule?t:{default:t}}n.default.init(),i.default.init(),r.default.init()},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={init:function(){this.cacheDOM()},cacheDOM:function(){this.elements=document.querySelectorAll("[data-tooltip]"),this.bindEvents()},bindEvents:function(){var t=this;this.elements&&this.elements.forEach((function(e){t.attachTooltip(e)}))},attachTooltip:function(t){var e=this,o=t.getAttribute("data-tooltip");t.addEventListener("mouseover",(function(t){e.showTooltip(t,o)})),t.addEventListener("mouseout",(function(t){e.hideTooltip(t,o)}))},showTooltip:function(t,e){var o=document.createElement("span");o.classList.add("tooltip"),o.innerHTML="<p>"+e+"</p>",t.target.appendChild(o),setTimeout((function(){o.style.opacity=1}),100)},hideTooltip:function(t,e){var o=t.target.querySelector(".tooltip");o.style.opacity=0,t.target.removeChild(o)}};e.default=n},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}}(),i=function(){function t(e,o,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.options=Object.assign({},{},n),this.history=[],this.possibleAnswers=o}return n(t,[{key:"clear",value:function(){this.history=[]}},{key:"vote",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Anonymouse";if(this.possibleAnswers[t]){var o=(new Date).toLocaleString();return this.history.push({id:t,name:e,date:o}),!0}throw new Error("Incorrect answer's id")}},{key:"results",get:function(){var t=this,e=this.history.length,o=[];return Object.keys(this.possibleAnswers).forEach((function(n){var i=0,r=[];t.history.forEach((function(t){n==t.id&&(i++,r.push(t.name))}));var a=i/e*100,l=isNaN(a)?0:parseFloat(a).toFixed(3).slice(0,-1);o.push({votes:i,voters:r,percent:l})})),o}}]),t}(),r={init:function(){this.mountPoll()},mountPoll:function(){for(var t=new i("Qual o percentual aproximado da população litorânea mundial?",{0:{title:"40%"},1:{title:"50%"},2:{title:"20%"},3:{title:"70%"}}),e=new i("O que é aquecimento global?",{0:{title:"Efeito dos raios ultra ultravioleta na Terra"},1:{title:"Uma teoria da conspiração"},2:{title:"Movimento em prol de solidariedade e colaboração mundial"},3:{title:"Aumento da temperatura média dos oceanos e da atmosfera da Terra"}}),o=0;o<2;o++)t.vote(1),e.vote(3);for(var n=0;n<3;n++)t.vote(0),e.vote(2);for(var r=0;r<5;r++)t.vote(2),e.vote(0);for(var a=0;a<7;a++)t.vote(3),e.vote(1);document.querySelectorAll(".poll-container").forEach((function(e,o){e.querySelectorAll(".poll-panel-btn").forEach((function(o){o.onclick=function(){"disabled"!=o.getAttribute("disabled")&&(o.parentNode.classList.add("poll-voted"),o.classList.add("--user-choice"),t.vote(o.dataset.vote),e.querySelectorAll(".poll-panel-btn").forEach((function(e){e.setAttribute("disabled","disabled");var o=t.results[e.dataset.vote].percent+"%";e.style.width=o,e.dataset.result=o})))}}))}))}};e.default=r},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={init:function(){var t,e;for(t=document.getElementsByClassName("comp-overlay"),e=0;e<t.length;e++)o(t[e]);function o(t){var e,o,n,i=0;function r(t){t.preventDefault(),i=1,window.addEventListener("mousemove",l),window.addEventListener("touchmove",l)}function a(){i=0}function l(n){var r;if(0==i)return!1;(r=function(e){var o;return e=e||window.event,o=t.getBoundingClientRect(),e.pageX-o.left-window.pageXOffset}(n))<0&&(r=0),r>o&&(r=o),function(o){t.style.width=o+"px",e.style.left=t.offsetWidth-e.offsetWidth/2+"px"}(r)}o=t.offsetWidth,n=t.offsetHeight,t.style.width=o/2+"px",(e=document.createElement("div")).setAttribute("class","comp-slider"),t.parentElement.insertBefore(e,t),e.style.top=n/2-e.offsetHeight/2+"px",e.style.left=o/2-e.offsetWidth/2+"px",e.addEventListener("mousedown",r),window.addEventListener("mouseup",a),e.addEventListener("touchstart",r),window.addEventListener("touchstop",a)}}};e.default=n}]);