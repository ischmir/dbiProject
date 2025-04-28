<script setup>
import SkemaComp from '@/components/SkemaComp.vue';
import TableColumn from '@/components/TableColumn.vue';
import TableComp from '@/components/TableComp.vue';
import TableRow from '@/components/TableRowComp.vue';
</script>

<template>
  <SkemaComp />
  <TableComp :cols="['Indhold', 'IKONER']">
    <TableRow>
      <TableColumn> skemanavn </TableColumn>
      <TableColumn> ... </TableColumn>
    </TableRow>
    <TableRow>
      <TableColumn> Førstehjælp </TableColumn>
      <TableColumn> ... </TableColumn>
    </TableRow>
  </TableComp>
</template>

<style lang="scss" scoped></style>
