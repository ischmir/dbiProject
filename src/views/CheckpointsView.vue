<script setup>
import TabMenuComp from "@/components/TabMenuComp.vue";
import IconsComp from "@/components/IconsComp.vue";
import TableColumn from "@/components/TableColumnComp.vue";
import TableComp from "@/components/TableComp.vue";
import TableRow from "@/components/TableRowComp.vue";
// import { ref } from 'vue';

const dummyFolders = [
  "Navn på lokation",
  "Navn på lokation",
  "Førstehjælp (skoler)",
  "Navn på lokation",
  "Navn på lokation",
  "Navn på lokation",
  "Navn på lokation",
  "Navn på lokation",
  "Navn på lokation",
];
</script>

<template>
  <TabMenuComp />
  <div class="container">
    <TableComp :cols="['Lokation']">
      <template #header>
        <IconsComp iconName="add-folder" title="Opret lokation" />
      </template>
      <TableRow v-for="folderName in dummyFolders" v-bind:key="folderName" class="folder">
        <TableColumn> {{ folderName }} </TableColumn>
        <TableColumn> <IconsComp iconName="arrow-right" /> </TableColumn>
      </TableRow>
    </TableComp>

    <TableComp :cols="['UCL Seebladsgade']">
      <template #header>
        <IconsComp iconName="sort" title="Sorter alfabetisk" />
        <IconsComp iconName="print" title="Print alle" />
        <IconsComp iconName="qr-code-group" title="Gruppeopret tjekpunkter" />
        <IconsComp iconName="qr-code" title="Opret tjekpunkt" />
      </template>
      <TableRow>
        <TableColumn>
          <div class="group-container">
            <IconsComp iconName="qr-code" />
            Tjekpunkt
          </div>
        </TableColumn>
        <TableColumn> <IconsComp iconName="checkpoints" /> </TableColumn>
      </TableRow>
      <TableRow>
        <TableColumn>
          <div class="group-container">
            <IconsComp iconName="qr-code-group" />
            Førstehjælp
          </div>
        </TableColumn>
        <TableColumn> <IconsComp iconName="checkpoints" /> </TableColumn>
      </TableRow>
      <TableRow>
        <TableColumn>
          <div class="group-container">
            <IconsComp iconName="qr-code" />
            Tjekpunktgruppe
          </div>
        </TableColumn>
        <TableColumn> <IconsComp iconName="checkpoints" /> </TableColumn>
      </TableRow>
      <TableRow>
        <TableColumn>
          <div class="group-container">
            <IconsComp iconName="qr-code-group" />
            Tjekpunkt
          </div>
        </TableColumn>
        <TableColumn> <IconsComp iconName="checkpoints" /> </TableColumn>
      </TableRow>
      <TableRow>
        <TableColumn>
          <div class="group-container">
            <IconsComp iconName="qr-code" />
            Tjekpunktgruppe
          </div>
        </TableColumn>
        <TableColumn> <IconsComp iconName="checkpoints" /> </TableColumn>
      </TableRow>
      <TableRow>
        <TableColumn>
          <div class="group-container">
            <IconsComp iconName="qr-code-group" />
            Tjekpunkt
          </div>
        </TableColumn>
        <TableColumn> <IconsComp iconName="checkpoints" /> </TableColumn>
      </TableRow>
      <TableRow>
        <TableColumn>
          <div class="group-container">
            <IconsComp iconName="qr-code" />
            Tjekpunkt
          </div>
        </TableColumn>
        <TableColumn> <IconsComp iconName="checkpoints" /> </TableColumn>
      </TableRow>
      <TableRow>
        <TableColumn>
          <div class="group-container">
            <IconsComp iconName="qr-code-group" />
            Tjekpunktgruppe
          </div>
        </TableColumn>
        <TableColumn> <IconsComp iconName="checkpoints" /> </TableColumn>
      </TableRow>
      <TableRow>
        <TableColumn>
          <div class="group-container">
            <IconsComp iconName="qr-code-group" />
            Tjekpunktgruppe
          </div>
        </TableColumn>
        <TableColumn> <IconsComp iconName="checkpoints" /> </TableColumn>
      </TableRow>
    </TableComp>
  </div>
</template>

<style lang="scss" scoped>
.group-container {
  display: flex;
  gap: 5px;
}
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

.folder {
  cursor: pointer;
}
</style>
