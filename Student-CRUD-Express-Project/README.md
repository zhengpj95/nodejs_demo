
# 学生信息的增删查改操作

## 路径分析

| 请求方法  |   请求路径       | get 参数  |  post 参数                 | 备注             |
| :------- | ---------------- | -------- | -------------------------- | :-------------- |
| GET      | /students        |          |                            | 渲染首页，展示学生数据 |
| GET      | /students/new    |          |                            | 渲染添加学生页面 |
| POST     | /students/new    |          | name, age, gender, hobbies | 处理添加学生请求 |
| GET      | /students/edit   | id       |                            | 渲染编辑页面     |
| POST     | /students/edit   |          | id, age, gender, hobbies   | 处理编辑学生请求 |
| GET      | /students/delete | id       |                            | 处理删除数据     |

## 模板引擎

- 继承语句 `{{extend '...'}}`
- 包含其他页面的语句 `{{include '...'}}`
- `_layouts/template.html`是模板页面
- `index.html, topic/new.html, topic/edit.html`是继承模板页面的子页面
