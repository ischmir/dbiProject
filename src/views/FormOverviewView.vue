<script setup>
import TabMenuComp from '@/components/TabMenuComp.vue';
import IconsComp from '@/components/IconsComp.vue';
import TableColumn from '@/components/TableColumnComp.vue';
import TableComp from '@/components/TableComp.vue';
import TableRow from '@/components/TableRowComp.vue';
// import { ref } from 'vue';

const dummyFolders = ['Mappe1', 'Mappe2', 'Mappe3'];
</script>

<template>
  <TabMenuComp />
  <div class="container">
    <TableComp :cols="['Mapper']">
      <template #header>
        <IconsComp iconName="add-folder" />
      </template>
      <TableRow v-for="folderName in dummyFolders" v-bind:key="folderName">
        <TableColumn> {{ folderName }} </TableColumn>
      </TableRow>
    </TableComp>

    <TableComp :cols="['Indhold']">
      <template #header>
        <IconsComp iconName="sort" />
        <IconsComp iconName="add-schedule" />
      </template>
      <TableRow>
        <TableColumn> skemanavn </TableColumn>
        <TableColumn> <IconsComp iconName="checkpoints" /> </TableColumn>
      </TableRow>
      <TableRow>
        <TableColumn> Førstehjælp </TableColumn>
        <TableColumn> <IconsComp iconName="checkpoints" /> </TableColumn>
      </TableRow>
    </TableComp>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 12px;
  padding: 12px;
}

.icons-th {
  display: flex;
  gap: 24px;
}
</style>
