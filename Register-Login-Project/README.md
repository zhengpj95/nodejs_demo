
# Register-Login-Project

使用 Node.js + Express + MongoDB 实现基本的用户注册，用户登录

基本功能：

* MongoDB 存储数据
* 首页显示所有已注册用户
* 跳转到登陆页面，用户可以登录。
  * 登陆成功，保存到session中，然后跳转到首页。
* 跳转到注册页面，注册验证用户名是否可用。
  * 注册成功保存到session中，然后跳转到首页。
* 在首页会显示登陆的用户名
