<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";

const emit = defineEmits<{ close: [] }>();
const dialog = useTemplateRef("dialogRef");

onMounted(() => {
  dialog.value?.showModal();
});

const onCancel = (e: Event) => {
  e.preventDefault();
  requestClose();
};

const requestClose = () => {
  dialog.value?.close();
  emit("close");
};
</script>

<template>
  <!-- class="backdrop:bg-(--base-color)/45 backdrop:backdrop-blur-lg" -->
  <dialog ref="dialogRef" @cancel="onCancel">
    <slot />
  </dialog>
</template>
