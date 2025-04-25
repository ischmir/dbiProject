<script setup>
import { ref } from "vue";

const menuItems = ["Skemaer", "Skemabibliotek", "Tjekpunkter"];
const activeIndex = ref(null);

function handleClick(index) {
  activeIndex.value = index;
  console.log(`Klikket på: ${menuItems[index]}`);
}
</script>

<template>
  <nav>
    <div class="menuBox">
      <h3
        v-for="(item, index) in menuItems"
        :key="index"
        class="skemaMenu"
        :class="{ active: index === activeIndex }"
        @click="handleClick(index)"
      >
        {{ item }}
      </h3>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.menuBox {
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
  width: 100%;
}

.skemaMenu {
  color: #252323;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 100%;
  padding: 15px 10px;
  flex-grow: 1; /* Gør menupunkterne lige store og udfylder hele containeren */

  &:hover {
    background-color: #f1f1f1;
  }

  &.active {
    background-color: #fff7e7; /* Baggrund for aktivt menupunkt */
    margin: 0%;
  }
}
</style>
