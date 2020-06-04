// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.


//addEventListener() 用于向指定元素添加事件
//DOMContentLoaded 相当于jQuery中的ready
//没有参数的箭头函数
window.addEventListener('DOMContentLoaded', () => {
  //函数变量
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
