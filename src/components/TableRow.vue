<script setup></script>

<template>
  <tr class="rows">
    <slot></slot>
  </tr>
</template>

<style lang="scss" scoped>
tr {
  border-bottom: 1px solid var(--strokes-lines);
}
</style>
