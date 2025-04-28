<script setup>
import { ref } from 'vue';

const menuItems = ['Skemaer', 'Skemabibliotek', 'Tjekpunkter'];
const activeIndex = ref(null);

function handleClick(index) {
  activeIndex.value = index;
  console.log(`Klikket på: ${menuItems[index]}`);
}
</script>

<template>
  <nav>
    <div class="nav__menuBox">
      <h2
        v-for="(item, index) in menuItems"
        :key="index"
        class="menu-box__title"
        :class="{ active: index === activeIndex }"
        @click="handleClick(index)"
      >
        {{ item }}
      </h2>
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
  flex-grow: 1; /* Gør menupunkterne lige store og udfylder hele containeren */

  &:hover {
    background-color: var(--inactive-buttons-backgrounds);
  }

  &.active {
    background-color: var(--primary-color);
    margin: 0%;
  }
}
</style>
