export default {
  path: "/registrations",
  redirect: "/registrations/materials/types/index",
  meta: {
    icon: "ep:operation",
    title: "Cadastros",
    rank: 1
  },
  children: [
    {
      path: "/registrations/materials",
      meta: {
        icon: "ep:box",
        title: "Materiais"
      },
      children: [
        {
          path: "/material-type",
          name: "Tipos de Material",
          component: () => import("@/views/materials/material-type/index.vue"),
          meta: {
            title: "Tipos de Material",
            icon: "ri:edit-box-line"
          }
        },
        {
          path: "/materials",
          name: "Material",
          component: () => import("@/views/materials/index.vue"),
          meta: {
            title: "Material",
            icon: "ri:edit-box-line"
          }
        }
      ]
    },
    {
      path: "/medicines",
      meta: {
        icon: "solar:pills-outline",
        title: "Medicamentos"
      },
      children: [
        {
          path: "/unit",
          name: "Unidade",
          component: () => import("@/views/medicines/unit/index.vue"),
          meta: {
            title: "Unidade",
            icon: "ph:eyedropper"
          }
        },
        {
          path: "/medicine",
          name: "Medicamento",
          component: () => import("@/views/medicines/index.vue"),
          meta: {
            title: "Medicamento",
            icon: "ph:eyedropper"
          }
        }
      ]
    },
    {
      path: "/error/404",
      name: "404",
      component: () => import("@/views/error/404.vue"),
      meta: {
        title: "404"
      }
    }
  ]
} satisfies RouteConfigsTable;
