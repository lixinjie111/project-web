import Simple from '@/layout/SimpleNav.vue'
import Archive from '@/views/report/archive.vue'
import Notarchive from '@/views/report/notarchive.vue'
import Schedule from '@/views/report/notarchive/schedule.vue'
import Project from '@/views/report/notarchive/project.vue'
import Plan from '@/views/report/notarchive/plan.vue'
import Deliverables from '@/views/report/notarchive/deliverables.vue'

export default {
    name: '周报',
    path: '',
    component: Simple,
    meta: {
        isAuth: true
    },
    children: [
        {
            path: '/report/notarchive',
            component: Notarchive,
            name: '未归档',
            meta: {isAuth: true},
            children: [
                {
                    path: '/report/notarchive/schedule',
                    component: Schedule,
                    name: '工作进度',
                    meta: {isAuth: true, permissionKey: null, entryPath: '/report/notarchive'}
                },
                {
                    path: '/report/notarchive/project',
                    component: Project,
                    name: '重点项目',
                    meta: {isAuth: true, permissionKey: null, entryPath: '/report/notarchive'}
                },
                {
                    path: '/report/notarchive/plan',
                    component: Plan,
                    name: '月度计划',
                    meta: {isAuth: true, permissionKey: null, entryPath: '/report/notarchive'}
                },                {
                    path: '/report/notarchive/deliverables',
                    component: Deliverables,
                    name: '月度交付物验收',
                    meta: {isAuth: true, permissionKey: null, entryPath: '/report/notarchive'}
                }
            ]
        },
        {
            path: '/report/archive',
            component: Archive,
            name: '已归档',
            meta: {isAuth: true}
        }
    ]
}