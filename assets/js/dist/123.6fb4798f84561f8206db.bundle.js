(self.webpackChunkkcc_wioa=self.webpackChunkkcc_wioa||[]).push([[123],{7123:function(n,a,r){"use strict";function t(n,a){(null==a||a>n.length)&&(a=n.length);for(var r=0,t=new Array(a);r<a;r++)t[r]=n[r];return t}r.r(a),r(4916),r(5306),r(2222),r(4747),r(2526),r(1817),r(1539),r(2165),r(6992),r(8783),r(3948),r(7042),r(8309),r(1038);var e=/^(.+)$/gm,o={email:/(\S+@\S+\.\S+)/g,strong:/(\*\*([^\*]+)\*\*|__([^_]+)__)/g,em:/(\*([^\*]+)\*|_([^_]+)_)/g,link:/\[([^\]]+)\]\(([^\)]+)\)/g,phone:/(\d{3})(\d{3})(\d{4})/g,strikeout:/~([^~]+)~/g,url:/[^\("](https?:\/\/\S+)[^\)"]/g,replacers:{email:'<a href="mailto:$1">$1</a>',strong:"<strong>$2</strong>",em:"<em>$2</em>",link:'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',phone:'<a href="tel:+1$1$2$3">$1-$2-$3</a>',strikeout:"<s>$1</s>",url:'<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'}};function s(n){var a=n;for(var r in o)if(Object.hasOwnProperty.call(o,r)&&"replacers"!=r){var t=o[r],e=o.replacers[r];a=a.replace(t,e)}return a.replace(/^([-\*]\s(.+)|(.+))$/gm,(function(n,a,r){return null==r?'<p class="mb-2 mt-1">'.concat(n,"</p>"):'<p class="mb-0 ml-3 typography--text-indent"><span class="ml-3">&bull;&nbsp;'.concat(r,"</span></p>")}))}function c(n){var a="";return n.forEach((function(n,r){var c,l=function(n,a){return function(n){if(Array.isArray(n))return n}(n)||function(n,a){var r=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=r){var t,e,o=[],s=!0,c=!1;try{for(r=r.call(n);!(s=(t=r.next()).done)&&(o.push(t.value),!a||o.length!==a);s=!0);}catch(n){c=!0,e=n}finally{try{s||null==r.return||r.return()}finally{if(c)throw e}}return o}}(n,a)||function(n,a){if(n){if("string"==typeof n)return t(n,a);var r=Object.prototype.toString.call(n).slice(8,-1);return"Object"===r&&n.constructor&&(r=n.constructor.name),"Map"===r||"Set"===r?Array.from(n):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(n,a):void 0}}(n,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(n,25),i=l[1],d=l[2],p=l[3],b=l[4],m=l[5],u=l[6],g=l[7],v=l[8],f=l[9],y=l[12],h=l[13],$=l[14],_=l[15],k=l[16],w=l[17],S=l[18],j=function(n,a,r,t,e){var s="";return""!=n&&(s+="<strong>Phone:</strong> "+n.replace(o.phone,o.replacers.phone)+"<br>"),""!=a&&(s+='<strong>Email resume to:</strong> <a href="mailto:'.concat(a,'">').concat(a,"</a><br>")),""!=r&&(s+='<strong>Company website:</strong> <a target="_blank" rel="noopener noreferrer" href="'.concat(r,'">').concat(r,"</a><br>")),""!=e&&(s+="<strong>Fax resume to:</strong> ".concat(e,"<br>")),""!=t&&(s+='<a href="'.concat(t,'" class="btn btn-primary mt-2" target="_blank" rel="noopener noreferrer">Apply Online</a>')),s}(v,g,d,u,f),x=""!=y?'<div class="text-center mt-4" data-flyer-src="'.concat(y,'">\n    <img src="/assets/img/loader.min.svg" class="loader loader--animate" alt="Loading...">\n  </div>'):"";return a+='<div class="modal fade" id="jobModal'.concat(r,'" tabindex="-1" aria-labelledby="jobModalLabel').concat(r,'" aria-hidden="true">\n    <div class="modal-dialog modal-lg">\n      <div class="modal-content">\n        <div class="modal-header">\n          <h5 class="modal-title typography__h3" id="jobModalLabel').concat(r,'">').concat(i,'</h5>\n          <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n            <span aria-hidden="true">&times;</span>\n          </button>\n        </div>\n        <div class="modal-body mx-lg-3">\n          <div class="card card-body">\n            <p class="mb-0"><strong>Company name/employer:</strong>&nbsp;').concat(b,'</p>\n          </div>\n          <div class="card card-body">\n            <p class="mb-0"><strong>Location:</strong>&nbsp;').concat(p,'</p>\n          </div>\n          <div class="card card-body">\n            <p class="mb-2"><strong>Description:</strong></p>\n            <div class="mx-3">\n              ').concat(h.replace(e,s),'\n            </div>\n          </div>\n          <div class="card card-body">\n            <p class="mb-2"><strong>Requirements:</strong></p>\n            <div class="mx-3">\n              ').concat($.replace(e,s),'</span>\n            </div>\n          </div>\n          <div class="card card-body">\n            <p class="mb-0"><strong>Job Type:</strong> ').concat(_,"</p>\n            ").concat(""!=w?'<p class="pl-3 mb-0">&bull;&nbsp;'+w+"</p>":"",'\n          </div>\n          <div class="card card-body">\n            <p class="mb-0">\n              <strong>Shift/schedule:</strong>&nbsp;').concat(k.replace(o.url,o.replacers.url),"\n            </p>\n          </div>\n          ").concat(""==S?"":(c=S,'<div class="card card-body">\n    <p class="mb-0">\n      <strong>Pay & benefits:</strong>&nbsp;'.concat(c.replace(/^(.+)$/gm,s),"\n    </p>\n  </div>")),'\n          <div class="card card-body">\n            <p class="mb-0">\n              <strong>How to apply:</strong>&nbsp;').concat(m,"<br>\n              ").concat(j,"\n            </p>\n          </div>\n          ").concat(x,'\n        </div>\n        <div class="modal-footer">\n          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n        </div>\n      </div>\n    </div>\n  </div>')})),a}a.default=function(n,a){var r=c(n);a.insertAdjacentHTML("beforeend",r)}}}]);