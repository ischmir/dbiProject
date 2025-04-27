<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import IconsComp from './IconsComp.vue';

const router = useRouter();
const routes = router.options.routes;

// Track hover state for each route
const hoveredRoute = ref(null);

const handleMouseOver = (path) => {
  hoveredRoute.value = path;
};

const handleMouseLeave = () => {
  hoveredRoute.value = null;
};
</script>

<template>
  <nav class="sidenav base-container">
    <div class="sidenav__container">
      <ul class="sidenav__menu">
        <li
          v-for="route in routes"
          :key="route.path"
          class="sidenav__item"
          @mouseover="handleMouseOver(route.path)"
          @mouseleave="handleMouseLeave"
        >
          <router-link :to="route.path" class="sidenav__link" v-slot="{ isActive }">
            <span
              class="sidenav__icon-wrapper"
              :style="{
                filter: isActive
                  ? 'invert(14%) sepia(100%) saturate(4437%) hue-rotate(349deg) brightness(78%) contrast(95%)'
                  : hoveredRoute === route.path
                  ? 'invert(13%) sepia(96%) saturate(748%) hue-rotate(356deg) brightness(85%) contrast(119%)'
                  : 'none',
              }"
            >
              <IconsComp :iconName="route.meta.iconName" />
            </span>
            <span
              class="sidenav__link-text"
              :style="{
                color: isActive
                  ? 'var(--cta-button-link-active)'
                  : hoveredRoute === route.path
                  ? 'var(--cta-button-hover-link-hover)'
                  : 'var(--headlines-paragraphs)',
              }"
            >
              {{ route.meta.title || route.name || route.path }}
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.sidenav__container {
  display: flex;
  justify-content: center;
  margin: 1vh;
}

.sidenav__menu {
  list-style-type: none;
  padding-left: 0;
}

.sidenav__menu li {
  padding: 1.5vh;
}

.sidenav__menu li a {
  text-decoration: none;
  font-size: 1rem;
  font-weight: bolder;
  display: flex;
  align-items: center;
}

.sidenav__icon-wrapper {
  display: inline-flex;
  margin-right: 1vh;
}

.sidenav__link-text {
  font-size: 1rem;
  font-weight: bolder;
}
</style>
