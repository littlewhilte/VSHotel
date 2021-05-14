import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
//主页面（统计）
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '/',   
    meta: { title: '', icon: 'index' },
    children: [{
      path: '/',
      name:'/',
      component: () => import('@/views/dashboard/index'),
      meta:{title:'首页',icon:'example'}
    },
    // {
    //   path: 'show',
    //   name:'图标显示',
    //   component: () => import('@/views/dashboard/index'),
    //   meta:{title:'图表显示',icon:'example'}      
    // }
  ]
  },
  //用户管理
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/table',
    name: '管理员',
    meta: { title: '管理员', icon: 'table' },
    children: [
      {
        path: 'table',
        name: '管理员个人信息',
        component: () => import('@/views/hotel/admin/list'),
        meta: { title: '管理员个人信息', icon: 'table' }
      },
      {
        path: 'eidt',
        name: '修改信息',
        component: () => import('@/views/hotel/admin/edit'),
        meta: { title: '修改信息', icon: 'tree' }
      },
      {
        path: 'edit/:id',   
        name: '修改',
        component: () => import('@/views/hotel/admin/edit'),
        meta: { title: '修改信息', noCache: true },
        hidden: true
      }
    ]
  },
    //房间管理
    {
      path: '/room',
      component: Layout,
      redirect: '/room/table',
      name: '房间管理',
      meta: { title: '房间管理', icon: 'table' },
      children: [
        {
          path: 'create/:id',
          name: '开房',
          component: () => import('@/views/hotel/room/create'),
          meta: { title: '开房间', noCache:true },
          hidden:true        
        },
        {
          path: 'table',
          name: '房间列表',
          component: () => import('@/views/hotel/room/roomList'),
          meta: { title: '管理房间', icon: 'table' }
        },
        {
          path: 'save',
          name: '添加房间',
          component: () => import('@/views/hotel/room/save'),
          meta: { title: '添加房间', icon: 'tree' }
        },
        {
          path: 'edit/:id',   
          name: '修改房间信息',
          component: () => import('@/views/hotel/room/save'),
          meta: { title: '修改房间', noCache: true },
          hidden: true
        }
      ]
    },
  //游客管理
  {
    path: '/guest',
    component: Layout,
    redirect: '/guest/table',
    name: '游客管理',
    meta: { title: '游客管理', icon: 'table' },
    children: [
      {
        path: 'table',
        name: '游客列表',
        component: () => import('@/views/hotel/guest/list'),
        meta: { title: '查询游客', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加游客',
        component: () => import('@/views/hotel/guest/save'),
        meta: { title: '添加游客', icon: 'tree' }
      },
      {
        path: 'edit/:id',   
        name: '修改游客信息',
        component: () => import('@/views/hotel/guest/save'),
        meta: { title: '修改游客', noCache: true },
        hidden: true
      }
    ]
  },

  //订单管理
  //TODO
  {
    path: '/order',
    name: 'order',
    component: Layout,
    redirect: '/order/table',
    meta: { title: '订单管理', icon: 'form' },
    children: [
      {
        path: 'table',
        name: 'Order',
        component: () => import('@/views/hotel/order/list'),
        meta: { title: '订单管理', icon: 'form' },
      },
      {
        path: 'paylog',
        name: 'payLog',
        component: () => import('@/views/hotel/order/payLog'),
        meta: { title: '订单日志', icon: 'form' },
      }
    ] 
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://element.eleme.cn/#/zh-CN',
        meta: { title: 'Element Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
