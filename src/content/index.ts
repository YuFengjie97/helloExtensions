
function onLoad() {
  // alert('content.js 开始执行喽!')
  console.log('I am content!');
  
  const body = document.querySelector('body')
  if (body) {
    const box = document.createElement('div')
    box.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background:red;
      position: fixed;
      top: 400px;
      left: 400px;
      z-index: 9999;
    `
    body.appendChild(box)
  } else {
    alert('body not found')
  }
}

window.addEventListener('load', onLoad)

export {}