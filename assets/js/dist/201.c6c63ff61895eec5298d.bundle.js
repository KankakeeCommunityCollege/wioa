"use strict";(self.webpackChunkkcc_wioa=self.webpackChunkkcc_wioa||[]).push([[201],{201:function(e,t,n){n.r(t);const o=document.getElementById("iframeLink"),c=document.querySelector('iframe[src^="https://form.jotform.com"]');function i(){const{height:e}=document.getElementById("mainNav").getBoundingClientRect(),{height:t}=document.getElementById("globalNav").getBoundingClientRect();return Math.round(e)+Math.round(t)}function u(e){const{top:t}=e.getBoundingClientRect();return{top:Math.round(t)-i(),behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}}t.default=function(){o.addEventListener("click",(e=>{e.preventDefault(),window.scrollTo(u(c))})),"#62244641777966"===window.location.hash&&window.scrollTo(u(c))}}}]);