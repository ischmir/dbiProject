<script setup>
// definerer menuItems som en array af objekter med navn og path
const menuItems = [
  { name: "Skemaer", path: "/form-overview" },
  { name: "Skemabibliotek", path: "/form-library" },
  { name: "Tjekpunkter", path: "/checkpoints" },
];
</script>

<template>
  <nav>
    <div class="nav__menuBox">
      <router-link
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.path"
        class="menu-box__title"
        activeClass="active"
      >
        {{ item.name }}
      </router-link>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.nav__menuBox {
  display: flex;
  justify-content: space-around;
  background-color: var(--forms-charts);
  width: 100%;
}

.menu-box__title {
  color: var(--headlines-paragraphs);
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 100%;
  padding: 15px 10px;
  flex-grow: 1;
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 2rem; /* 32px / 16 = 2rem */
  line-height: 2.5rem; /* 40px / 16 = 2.5rem */
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;

  &:hover {
    background-color: var(--inactive-buttons-backgrounds);
  }

  &.active {
    background-color: var(--primary-color);
    margin: 0%;
    box-shadow: 1px -2px 1px 1px var(--strokes-lines);
  }
}
</style>
