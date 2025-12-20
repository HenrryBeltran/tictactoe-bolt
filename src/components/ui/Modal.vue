<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";

const emit = defineEmits<{ close: [] }>();
const dialog = useTemplateRef<HTMLDialogElement>("dialogRef");

onMounted(() => {
  dialog.value?.showModal();
});

const onCancel = (e: Event) => {
  e.preventDefault();
  emit("close");
};

const onClick = (e: MouseEvent) => {
  if (e.target === dialog.value) {
    emit("close");
  }
};
</script>

<template>
  <dialog
    ref="dialogRef"
    @cancel="onCancel"
    @click="onClick"
    class="backdrop:bg-(--base-color)/45 backdrop:backdrop-blur-lg"
  >
    <slot />
  </dialog>
</template>
