var dfdPrompt = null
var button = document.getElementById('btn')

window.addEventListener('beforeinstallprompt', function (e) {
    // 存储事件
    dfdPrompt = e
    // 显示按钮
    button.style.display = 'block'
    // 阻止默认事件
    e.preventDefault()
    return false
})

button.addEventListener('click', function (e) {
    if (dfdPrompt == null) {
        return
    }
    // 通过按钮点击事件触发横幅显示
    dfdPrompt.prompt()
    // 监控用户的安装行为
    dfdPrompt.userChoice.then(function (choiceResult) {
        alert(choiceResult.outcome)
    })
    // 隐藏按钮
    button.style.display = 'none'
    dfdPrompt = null
})
