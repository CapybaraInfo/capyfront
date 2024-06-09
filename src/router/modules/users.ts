export default {
  path: "/persons",
  redirect: "/persons/users",
  meta: {
    icon: "ri:edit-box-line",
    title: "Pessoas",
    rank: 9

  },
  children: [
    {
      path: "/persons/users",
      name: "Usuários",
      component: () => import("@/views/user/index.vue"),
      meta: {
        title: "Usuarios",
      }
    },
    {
      path: "/error/404",
      name: "404",
      component: () => import("@/views/error/404.vue"),
      meta: {
        title: "404"
      }
    },
  ]
} satisfies RouteConfigsTable;