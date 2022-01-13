import { AccountType } from "@/models/enum/AccountType.js";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/User/HomePage/HomePage.vue"),
    meta: {
      Title: "i18nMenu.Home",
      permission: [AccountType.USER, AccountType.GUEST]
    }
  },
  {
    path: "/meansure",
    name: "Meansure",
    component: () => import("@/views/User/Meansure/Meansure.vue"),
    meta: {
      Title: "i18nMenu.Meansure",
      permission: [AccountType.USER, AccountType.GUEST]
    }
  },
  {
    path: "/messenger",
    name: "Messenger",
    component: () => import("@/views/User/Messenger/Messenger.vue"),
    meta: {
      Title: "i18nMenu.Messenger",
      permission: [AccountType.USER]
    }
  }
];
export default routes;
