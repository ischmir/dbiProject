<script setup>
import TabMenuComp from '@/components/TabMenuComp.vue';
import IconsComp from '@/components/IconsComp.vue';
import TableColumn from '@/components/TableColumnComp.vue';
import TableComp from '@/components/TableComp.vue';
import TableRow from '@/components/TableRowComp.vue';
import SearchInputComp from '@/components/SearchInputComp.vue';
const dummyFolders = ['Mappe1', 'Mappe2', 'Mappe3'];
</script>

<template>
  <TabMenuComp />
  <div class="container">
    <TableComp :cols="['Skemaer']">
      <template #header>
        <SearchInputComp />
        <IconsComp iconName="sort" />
      </template>
      <TableRow v-for="folderName in dummyFolders" v-bind:key="folderName">
        <TableColumn> {{ folderName }} </TableColumn>
      </TableRow>
    </TableComp>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 12px;
}

.icons-th {
  display: flex;
  gap: 24px;
}
</style>
