const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const y = localStorage.getItem('y')
const yObject = JSON.parse(y)
    //字符串变回对象
const hashMap = yObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' },
    { logo: 'D', url: 'https://dmzj.com' },
    { logo: 'M', url: 'https://www.missevan.com' },
    { logo: 'P', url: 'https://www.pixiv.net' },
    { logo: 'U', url: 'https://www.u17.com' },
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除/开头的后面内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                    <div class="site">
                        <div class="logo">${node.logo}</div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class="close"><svg class="icon">
                        <use ylink:href="#icon-close"></use></svg></div>
                    </div>
             </li>`).insertBefore($lastLi);
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()

$('.addButton').on('click', () => {
    let url = window.prompt('请输入要添加的网址')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo: simplifyUrl(url)[0],
        logoType: 'text',
        url: url
    });
    render()
});

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('y', string)
}

$(document).on('keypress', (e) => {
    const focus = document.getElementById('input');
    if (focus === document.activeElement) {
        console.log('hi')
    } else {
        const { key } = e
        for (let i = 0; i < hashMap.length; i++) {
            if (hashMap[i].logo.toLowerCase() === key) {
                window.open(hashMap[i].url, "_self")
            }
        }
    }

})