//引入模板引擎
// import template from 'art-template';
// import axios, { defaults } from 'axios';
// import { join } from 'path';
//设置baseURL
axios.defaults.baseURL = 'https://abmy.online/cs';
// 给 storageToken 赋值
var storageToken = 'token';
//配置模板的根目录
// template.defaults.root = path.join(__dirname, 'views');
//存储token
function saveToken(token) {
    localStorage.setItem(storageToken, token);
}
//读取token
function getToken(token) {
    return localStorage.getItem(storageToken);
}

//移除token
function removeToken(token) {
    localStorage.removeItem(storageToken);
}
document.querySelector('.btn-login').addEventListener('click', () => {
    //获取用户名和密码
    const form = document.querySelector('.login-form');
    const dataserialize = serialize(form, { hash: true, empty: true });
    //解构
    const { username, password } = dataserialize;
    console.log(username, password);
    //基于axios提交用户名和密码
    axios({
        url: '/user/testLogin',
        method: 'post',
        data: {
            account: username,
            password: password
        }
    }).then(result => {
        console.log(result);
        console.log(result.data.message);
        if (result.data.status === false && result.data.message.includes('密码错误')) {
            alert('登录失败：密码错误，请重新输入！');
        } else {
            // 保存token
            saveToken(result.data.data.token);
            console.log(getToken());
            if (result.data.code == 200) {
                axios({
                    url: '/user/testInfo',
                    method: 'get',
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    },
                    params: {
                        token: getToken()
                    }
                }).then(result => {
                    console.log(result);
                    console.log(result.data);
                    // 获取用户数据和 token
                    const userData = result.data.data;
                    const token = getToken();

                    // 将 token 添加到用户数据中
                    userData.token = token;

                    // 转换为 JSON 字符串
                    const jsonString = JSON.stringify(userData);

                    // 存储到 sessionStorage
                    sessionStorage.setItem('userData', jsonString);
                    window.location.href = '/work/views/user.html';

                }).catch(error => {
                    console.log(error);
                    alert('获取用户信息失败，请稍后重试！');
                });
            }
        }
    }).catch(error => {
        alert('登录失败：网络错误或服务器无响应，请稍后重试！');
    });

})