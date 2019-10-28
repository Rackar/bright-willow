import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    name: "login",
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../pages/login.vue")
  },
  {
    name: "signup",
    path: "/signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../pages/signup.vue")
  },
  {
    name: "home",
    path: "/home",
    component: () => import(/* webpackChunkName: "home" */ "../pages/home.vue")
  },
  {
    name: "my",
    path: "/my",
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "my" */ "../pages/my.vue")
  },
  {
    name: "list",
    path: "/list",
    component: () =>
      import(/* webpackChunkName: "personlist" */ "../pages/personlist.vue")
  },

  {
    name: "single",
    path: "/single/:id",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "singlePerson" */
        "../pages/singlePerson.vue"
      )
  },

  {
    name: "personCreate",
    path: "/personCreate",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "personCreate" */
        "../pages/PersonCreate.vue"
      )
  },
  {
    name: "personEdit",
    path: "/personEdit/:id",
    meta: { requiresAuth: true },
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "personEdit" */
        "../pages/PersonEdit.vue"
      )
  },
  {
    name: "article",
    path: "/article/:id",
    props: true,

    component: () =>
      import(
        /* webpackChunkName: "articleShow" */
        "../pages/articleShow.vue"
      )
  },
  {
    name: "articleCreate",
    path: "/articleCreate/:id",
    props: true,
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "articleCreate" */
        "../pages/articleCreate.vue"
      )
  },
  {
    name: "imageAdd",
    path: "/imageAdd/:id",
    props: true,
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "imageAdd" */
        "../pages/imageAdd.vue"
      )
  }
];

const router = new VueRouter({
  routes
});

export default router;
