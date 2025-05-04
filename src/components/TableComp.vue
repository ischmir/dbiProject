<script setup>
const props = defineProps({
  cols: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="col in props.cols" v-bind:key="col">{{ col }}</th>
          <slot name="header" />
        </tr>
      </thead>

      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
thead {
  border-radius: 4px;
  box-shadow: 0px 1px 4px 0px var(--strokes-lines);
}

th {
  padding: 12px 24px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--forms-charts);
  padding-bottom: 6px;
  border-radius: 4px;
  border: 1px solid var(--strokes-lines);
}
</style>
