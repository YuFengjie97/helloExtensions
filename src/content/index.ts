
function onLoad() {
  // alert('content.js 开始执行喽!')
  console.log('I am content!445');
  
  const body = document.querySelector('body')
  if (body) {
    const box = document.createElement('div')
    box.style.cssText = `
      width: fit-content;
      height: 40px;
      border-radius: 6px;
      background:red;
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 9999;
      color: #fff;
    `
    box.innerHTML = 'I am content'
    body.appendChild(box)
  } else {
    alert('body not found')
  }
}

window.addEventListener('load', onLoad)


window.addEventListener('beforeunload', (event) => {
  // 提示用户是否要离开
  const message = "你有未保存的更改，确定离开吗？";
  return message;  // 现代浏览器提示
});

export {}

