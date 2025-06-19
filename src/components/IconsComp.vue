<script setup>
import { computed } from "vue";

// Props for the icon component
const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
});

// Map of icon names to their background positions
const iconPositions = {
  "more-horizon": "0 0",
  help: "-60px 0",
  settings: "-120px 0",
  "add-schedule": "-180px 0",
  users: "-240px 0",
  "qr-code": "-300px 0",
  groups: "-360px 0",
  "qr-code-group": "-420px 0",
  report: "-480px 0",
  "move-file": "-540px 0",
  calendar: "0 -60px",
  notifications: "-60px -60px",
  dashboard: "-120px -60px",
  "edit-schedule": "-180px -60px",
  "add-folder": "-240px -60px",
  back: "-300px -60px",
  "arrow-up": "-360px -60px",
  "arrow-down": "-360px -60px",
  "arrow-right": "-420px -60px",
  "edit-calendar": "-480px -60px",
  sort: "-540px -60px",
  warning: "0 -120px",
  user: "-60px -120px",
  folder: "-120px -120px",
  logout: "-180px -120px",
  check: "-240px -120px",
  print: "-300px -120px",
  search: "-360px -120px",
  copy: "-420px -120px",
  delete: "-480px -120px",
  close: "-540px -120px",
  drag: "0 -180px",
  schema: "-60px -180px",
  save: "-120px -180px",
  id: "-180px -180px",
  img: "-240px -180px",
  list: "-300px -180px",
  mail: "-360px -180px",
  checklist: "-420px -180px",
  photo: "-480px -180px",
  "radio-button-unchecked": "-540px -180px",
  "text-fields": "0 -240px",
  title: "-60px -240px",
  "text-line": "-120px -240px",
  signature: "-180px -240px",
  subject: "-240px -240px",
  comment: "-300px -240px",
  "check-all": "-360px -240px",
  checkbox: "-420px -240px",
  history: "-480px -240px",
};
//computed property for at få background positionen for den valgte icon
const backgroundPosition = computed(() => iconPositions[props.iconName] || "0 0");
</script>

<template>
  <span
    class="icon"
    :class="{ flipped: iconName === 'arrow-up' }"
    :style="{ backgroundPosition }"
  ></span>
</template>

<style scoped>
.flipped {
  transform: rotate(180deg);
}

.icon {
  width: 24px;
  height: 24px;
  background-image: url("@/assets/icons/icon-spritesheet.svg");
  background-repeat: no-repeat;
  display: block;
}
</style>
