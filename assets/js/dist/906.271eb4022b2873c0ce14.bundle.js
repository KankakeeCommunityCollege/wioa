"use strict";(self.webpackChunkkcc_wioa=self.webpackChunkkcc_wioa||[]).push([[906],{906:function(e,t,o){o.r(t);const c=document.querySelector('button[data-target="#videoModal"]');function n(e){const t=document.querySelector(e.target.dataset.target).querySelector("#videoWrapper");!function(e,t){const o=document.createElement("video");!function(e,t){t.split(",").map((t=>{const o=document.createElement("source");o.src=t,e.append(o)}))}(o,e),o.controls=!0,o.classList.add("video__one-stop-intro"),t.innerHTML="",t.append(o),function(e,t){document.querySelectorAll('button[data-dismiss="modal"]').forEach((t=>{t.onclick=t=>e.pause()})),window.setTimeout((()=>{e.play()}),1500)}(o),c.removeEventListener("click",n)}(t.dataset.videoSrc,t)}t.default=function(){c.addEventListener("click",n)}}}]);