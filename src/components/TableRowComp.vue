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

tr:hover {
  color: var(--cta-button-hover-link-hover);
}
</style>
