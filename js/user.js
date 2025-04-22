document.addEventListener('DOMContentLoaded', function () {
    //设置baseURL
    axios.defaults.baseURL = 'https://abmy.online/cs';
    // 从 sessionStorage 中读取数据
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
        console.log(userData);
        // 获取模板内容
        const templateSource = document.getElementById('template').innerHTML;

        // 编译模板
        const render = template.compile(templateSource);

        // 渲染数据
        const html = render({ data: userData });

        // 将渲染结果插入到页面中
        document.getElementById('container').innerHTML = html;
    }

    document.querySelector('.btn-exit').addEventListener('click', () => {
        axios({
            url: '/user/logout',
            params: {
                token: `${userData.token}`
            }
        }).then(result => {
            console.log(result);
            alert(result.data.message);
            window.location.href = '/work/views/index.html';
        })
    })
});
