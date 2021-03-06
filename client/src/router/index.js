import Vue from "vue";
import VueRouter from "vue-router";
import LoginComponent from "../components/views/login.vue";
import RegisterComponent from "../components/views/register.vue";
import HomeComponent from "../components/views/home.vue";
import WelcomeComponent from "../components/views/welcome.vue";
import AdminDashboard from "../components/views/adminDashboard.vue";
import CompanyUserDashBoard from "../components/views/companyUserDashBoard.vue";
import UserDashboard from "../components/views/userDashboard.vue";

import store from "../store";

import SecureComponent from "../components/views/secure.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      name: "welcome",
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginComponent,
  },
  {
    path: "/home",
    name: "home",
    component: HomeComponent,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterComponent,
  },
  {
    path: "/secure",
    name: "secure",
    component: SecureComponent,
  },
  {
    path: "/welcome",
    name: "welcome",
    component: WelcomeComponent,
  },
  {
    path: "/companyUserDashboard",
    name: "CompanyUserDashboard",
    component: CompanyUserDashBoard,
  },
  {
    path: "/adminDashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
  },
  {
    path: "/userDashboard",
    name: "UserDashboard",
    component: UserDashboard,
  },
];

const router = new VueRouter({
  routes,
  store,
});

router.beforeEach((to, from, next) => {
  console.log(store.getters.loggedIn, "----------router before each");
  console.log(to.path);
  if (to.path == "/welcome" || to.path == "/register") {
    next();
  } else if (!store.getters.loggedIn && to.path != "/login") {
    console.log("in login");
    next({ name: "login" });
  } else {
    console.log("to path is ", to.path);
    if (store.getters.loggedIn && to.path == "/home") {
      let role = store.getters.userDetails.role;
      console.log("role is the", role);
      if (role == "admin") {
        next({ name: "AdminDashboard" });
      }
      if (role == "companyUser") {
        next({ name: "CompanyUserDashboard" });
      }
      if (role == "user") {
        console.log("user role");
        next({ name: "UserDashboard" });
      }
    } else {
      next();
    }
  }
});

export default router;
