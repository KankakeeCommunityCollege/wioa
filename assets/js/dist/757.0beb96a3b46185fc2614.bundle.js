"use strict";(self.webpackChunkkcc_wioa=self.webpackChunkkcc_wioa||[]).push([[757],{757:function(e,t,n){n.r(t);const d=document.getElementById("JobBoardRow"),c=window.URL||window.webkitURL;function a(e){if(200==this.status){const t=this.response,n=document.createElement("img"),a=document.createElement("div"),s=document.createElement("a"),o=e.currentTarget.currentIndex;let[l,r,i]=e.currentTarget.jobInfoArr;const u=document.createElement("div"),p=document.createElement("div"),m=document.createElement("div");u.classList.add("card"),p.classList.add("card-header","d-flex","justify-content-between","align-items-center"),m.classList.add("card-body","d-flex","flex-column","justify-content-center"),p.innerHTML=`<h5 class="typography__h5">${l}<h5> <p class="mb-0 ms-2 float-end"><strong>${i}</strong> - ${r}</p>`,s.href=`#jobModal${o}`,s.dataset.bsToggle="modal",s.type="button",s.classList.add("d-flex"),n.onload=e=>{c.revokeObjectURL(n.src)},n.src=c.createObjectURL(t),n.classList.add("img-fluid","img--drop-shadow","mx-auto"),a.classList.add("col-md-6","mb-4","d-flex"),s.appendChild(n),m.appendChild(s),u.appendChild(p),u.appendChild(m),a.appendChild(u),d.appendChild(a)}}t.default=function(e){e.forEach(((e,t)=>{let[,n,,d,c,,,,,,,,s,,,,,,,,,,,,,]=e;const o=""!=s?s:null;null!==o&&function(e,t,n){const d=new XMLHttpRequest;d.open("GET",e,!0),d.responseType="blob",d.currentIndex=t,d.jobInfoArr=n,d.addEventListener("load",a,!1),d.send()}(o,t,[n,d,c])}))}}}]);