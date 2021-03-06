const login = r => require.ensure([], () => r(require('../components/login/Login.vue')), 'login')
const pwd = r => require.ensure([], () => r(require('../components/login/childen/Pwd.vue')), 'pwd')
const access = r => require.ensure([], () => r(require('../components/login/Access.vue')), 'access')
export default [{
  name: 'access',
  path: 'access/:id',
  meta: {
    login: false,
  },
  component: access
}, {
  name: 'login',
  path: 'login/:id',
  meta: {
    login: false,
    title: "登录"
  },
  component: login
}, {
  name: 'pwd',
  path: 'pwd',
  meta: {
    login: false,
    title: "忘记密码"
  },
  component: pwd
}]