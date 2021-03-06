import Empty from '@/layout/EmptyLayout.vue'
import Home from '@/views/mine/home.vue'
import Project from '@/views/mine/project.vue'
import Task from '@/views/mine/task.vue'
import Dynamic from '@/views/mine/dynamic.vue'

export default {
  name: '我的',
  path: '',
  component: Empty,
  meta: {
    isAuth: true
  },
  children: [
    {path: '/mine/home', component: Home, name: '首页', meta: { isAuth: true }},
    {path: '/mine/project', component: Project, name: '项目', meta: { isAuth: true }},
    {path: '/mine/task', component: Task, name: '任务', meta: { isAuth: true }},
    {path: '/mine/dynamic', component: Dynamic, name: '动态', meta: { isAuth: true }}
  ]
}