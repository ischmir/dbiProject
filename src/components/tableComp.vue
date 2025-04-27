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
          <th v-for="col in props.cols">{{ col }}</th>
        </tr>
      </thead>

      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
thead {
  border-radius: 4px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
}

th {
  padding: 12px 24px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  padding-bottom: 6px;
  border-radius: 4px;
  border: 1px solid #d5d5d5;
}
</style>
