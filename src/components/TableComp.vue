<script setup>
// definerer props for at sikre at cols er en array og at det er obligatorisk
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
          <th v-if="$slots.header">
            <div class="icon-container">
              <slot name="header" />
            </div>
          </th>
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

.icon-container {
  display: flex;
  justify-content: flex-end;
  gap: 24px;
}

th {
  padding: 12px 24px;
  text-align: left;
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
