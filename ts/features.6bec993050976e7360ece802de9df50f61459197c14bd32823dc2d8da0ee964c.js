(()=>{var s=class{constructor(e){this.localStorageKey="ThemeColorScheme";this.bindMatchMedia(),this.currentScheme=this.getSavedScheme(),this.dispatchEvent(document.documentElement.dataset.userColorScheme),e&&this.bindClick(e),document.body.style.transition==""&&document.body.style.setProperty("transition","background-color .3s ease")}saveScheme(){localStorage.setItem(this.localStorageKey,this.currentScheme)}bindClick(e){e.addEventListener("click",n=>{this.isDark()?this.currentScheme="light":this.currentScheme="dark",this.setBodyClass(),this.currentScheme==this.systemPreferScheme&&(this.currentScheme="auto"),this.saveScheme()})}isDark(){return this.currentScheme=="dark"||this.currentScheme=="auto"&&this.systemPreferScheme=="dark"}dispatchEvent(e){let n=new CustomEvent("onColorSchemeChange",{detail:e});window.dispatchEvent(n)}setBodyClass(){this.isDark()?document.documentElement.dataset.userColorScheme="dark":document.documentElement.dataset.userColorScheme="light",this.dispatchEvent(document.documentElement.dataset.userColorScheme)}getSavedScheme(){let e=localStorage.getItem(this.localStorageKey);return e=="light"||e=="dark"||e=="auto"?e:"auto"}bindMatchMedia(){window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{e.matches?this.systemPreferScheme="dark":this.systemPreferScheme="light",this.setBodyClass()})}},a=s;var S=document.querySelectorAll(".article-post div.highlight"),d="Copy",f="Copied!",l=function(){S.forEach(t=>{let e=document.createElement("button");e.innerHTML=d,e.classList.add("copyCodeButton"),t.appendChild(e);let n=t.querySelector("code[data-lang]");!n||e.addEventListener("click",()=>{navigator.clipboard.writeText(n.textContent).then(()=>{e.textContent=f,setTimeout(()=>{e.textContent=d},1e3)}).catch(r=>{alert(r),console.log("Something went wrong",r)})})})};var o=t=>{!t||(t.remove?t.remove():t.parentNode.removeChild(t))},i=(t,e)=>{t.after?t.after(e):t.parentNode.insertBefore(e,t.nextSibling)},p=t=>{var e=t.parentNode,n=t.innerHTML,r=document.createElement("div");i(e,r),r.appendChild(t),t.innerHTML="",t.appendChild(e),e.innerHTML=n,i(r,r.firstElementChild),o(r)},m=function(){document.querySelectorAll('.footnotes > ol > li[id^="fn"], #refs > div[id^="ref-"]').forEach(function(t){let e=document.querySelectorAll('a[href="#'+t.id+'"]');if(e.length===0)return;e.forEach(function(c){c.removeAttribute("href")});let n=e[0],r=document.createElement("div");if(r.className="side side-right",/^fn/.test(t.id)){r.innerHTML=t.innerHTML;var u=n.innerHTML;r.firstElementChild.innerHTML='<span class="bg-number">'+u+"</span> "+r.firstElementChild.innerHTML,o(r.querySelector('a[href^="#fnref"]')),n.parentNode.tagName==="SUP"&&p(n)}else r.innerHTML=t.outerHTML,n=n.parentNode;i(n,r),n.classList.add("note-ref"),o(t)}),document.querySelectorAll(".footnotes, #refs").forEach(function(t){var e=t.children;if(t.id==="refs")return e.length===0&&o(t);e.length!==2||e[0].tagName!=="HR"||e[1].tagName!=="OL"||e[1].childElementCount===0&&o(t)})};var h=!1;document.currentScript&&(h=document.currentScript.dataset.enableFootnotes=="true");var v=()=>{new a(document.getElementById("dark-mode-button")),h&&m(),l()};window.addEventListener("load",()=>{setTimeout(function(){v()},0)});})();
