import Empty from '@/layout/EmptyLayout.vue'
import Home from '@/views/task/home.vue'
// import Team from '@/views/task/team.vue'
import Archive from '@/views/task/archive.vue'
import Dynamic from '@/views/task/dynamic.vue'
import Member from '@/views/task/member.vue'

export default {
  name: '项目',
  path: '',
  component: Empty,
  meta: {
    isAuth: true
  },
  children: [
    {path: '/task/home', component: Home, name: '任务', meta: {isAuth: true}},
    {path: '/task/team', component: Member, name: '团队', meta: { isAuth: true }},
    {path: '/task/archive', component: Archive, name: '文档', meta: { isAuth: true }},
    {path: '/task/dynamic', component: Dynamic, name: '动态', meta: { isAuth: true }},
  ]
}
