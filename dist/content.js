function n(){console.log("I am content!445");const e=document.querySelector("body");if(e){const o=document.createElement("div");o.style.cssText=`
      width: fit-content;
      height: 40px;
      border-radius: 6px;
      background:red;
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 9999;
      color: #fff;
    `,o.innerHTML="I am content",e.appendChild(o)}else alert("body not found")}window.addEventListener("load",n);
