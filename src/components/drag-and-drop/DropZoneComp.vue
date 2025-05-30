<script setup>
import { onMounted, ref } from 'vue';
import DroppedTitleItemComp from '../drag-and-drop/dropped-items/DroppedTitleItemComp.vue';
import DroppedTextItemComp from '../drag-and-drop/dropped-items/DroppedTextItemComp.vue';
import IconsComp from '../IconsComp.vue';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router';

const droppedItems = ref([]);

const db = getFirestore();

const route = useRoute();
const router = useRouter();

const getFormComponents = async () => {
  const formRef = doc(db, 'forms', route.params.id);
  const form = await getDoc(formRef);

  const data = form.data();

  droppedItems.value = data.components ||[];

  console.log(data);

  // const q = query(formCollection, where("id", ));
  // const querySnapshot = await getDocs(q);
  // const array = [];
  // querySnapshot.forEach((doc) => {
  //   array.push({ ...doc.data(), id: doc.id });
  // });
  // forms.value = array;
};

const saveComponents = async () => {
  const formRef = doc(db, 'forms', route.params.id);
  const form = await getDoc(formRef);

  await updateDoc(formRef, {
    ...form.data(),
    components: droppedItems.value,
  });

  alert('Saved');
  router.go(-1);
};

onMounted(() => {
  getFormComponents();
});

const componentMap = {
  title: DroppedTitleItemComp,
  text: DroppedTextItemComp,
};

function onDrop(event) {
  const json = event.dataTransfer.getData('application/json');
  if (!json) return;

  const data = JSON.parse(json);
  console.log(data);
  droppedItems.value.push({
    ...data,
    id: Date.now(),
    inputValue: '',
  });
}

function duplicateItem(index) {
  const item = droppedItems.value[index];
  droppedItems.value.splice(index + 1, 0, {
    ...item,
    id: Date.now(),
  });
}

console.log('Data', droppedItems.value);
</script>

<template>
  <div class="dropzone">
    <div class="dropzone__header">
      <h2 class="header__title">Skema Titel</h2>
      <div class="header__dropzone-actions">
        <IconsComp class="dropzone-actions__icon" iconName="more-horizon" />
        <IconsComp
          class="dropzone-actions__icon"
          iconName="save"
          @click="saveComponents"
        />
      </div>
    </div>
    <hr class="dropzone__divider" />
    <div class="dropzone__container" @dragover.prevent @drop="onDrop">
      <component
        v-for="(item, index) in droppedItems"
        :is="componentMap[item.type]"
        :key="item.id"
        :componentData="item"
        @delete="() => droppedItems.splice(index, 1)"
        @duplicate="() => duplicateItem(index)"
        @change="(data) => (droppedItems[index] = data)"
      />
    </div>
  </div>
</template>

<style scoped>
.dropzone {
  height: 100%;
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.dropzone__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.header__title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: start;
}
.header__dropzone-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-bottom: 1rem;
}

.dropzone-actions__icon {
  cursor: pointer;
}

.dropzone__divider {
  border: 1px solid var(--placeholder-text-inactive-text);
  margin: 0.1rem 1rem 2rem 1rem;
}

.dropzone__container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  overflow-y: auto;
  scroll-behavior: auto;
}
</style>
