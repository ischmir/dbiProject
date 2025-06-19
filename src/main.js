//SPA begynder sin opstartproces her ved at importere Vue, Pinia, App.vue, router, userStore og main.scss
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useUserStore } from "@/stores/userStore";
import "./assets/styles/main.scss";

//Opretter en app og en pinia
const app = createApp(App);
const pinia = createPinia();

//Bruger pinia og router
app.use(pinia);
app.use(router);

//Bruger userStore
const userStore = useUserStore();
userStore.init().then(() => {
  console.log("User store initialized. Mounting app...");
  app.mount("#app");
});
