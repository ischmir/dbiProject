<script setup>
// Importerer nødvendige komponenter til at bygge skema biblioteket
import TabMenuComp from "@/components/TabMenuComp.vue";
import IconsComp from "@/components/IconsComp.vue";
import TableColumn from "@/components/TableColumnComp.vue";
import TableComp from "@/components/TableComp.vue";
import TableRow from "@/components/TableRowComp.vue";
import SearchInputComp from "@/components/SearchInputComp.vue";
// Importerer hjælpefunktioner til at sortere og filtrere data
import { sort, filter } from "@/components/utils.js";
// Importerer Firebase funktioner til at hente data fra databasen
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { onMounted, ref } from "vue";

// Opretter reaktive variabler til at holde styr på skemaer og sortering
const forms = ref([]);
const db = getFirestore();
const formCollection = collection(db, "forms");
const ordering = ref("desc");

// Funktion der henter skemaer fra databasen
// Kan sortere og filtrere skemaerne baseret på parametre
const getForms = async (order = ordering.value, searchTerm = "") => {
  ordering.value = order;
  // Henter alle skemaer fra databasen
  const q = query(formCollection);
  const querySnapshot = await getDocs(q);
  const array = [];
  // Konverterer hvert skema til et objekt med id
  querySnapshot.forEach((doc) => {
    array.push({ ...doc.data(), id: doc.id });
  });
  // Sorterer og filtrerer skemaerne baseret på navn
  forms.value = filter(sort(array, "name", order), "name", searchTerm);
};

// Henter skemaer når siden indlæses
onMounted(() => {
  getForms();
});
</script>

<template>
  <TabMenuComp />
  <div class="container">
    <TableComp :cols="['Skemaer']">
      <template #header>
        <SearchInputComp :onChange="(text) => getForms(ordering.value, text)" />
        <IconsComp
          iconName="sort"
          title="Sorter alfabetisk"
          @click="() => getForms(ordering == 'asc' ? 'desc' : 'asc')"
        />
      </template>
      <TableRow v-for="form in forms" v-bind:key="form.name">
        <TableColumn> {{ form.name }} </TableColumn>
        <TableColumn></TableColumn>
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
