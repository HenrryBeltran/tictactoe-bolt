<script setup lang="ts">
  import { useTemplateRef, watch } from "vue";

  const props = defineProps<{ isOpen: boolean }>();
  const emit = defineEmits<{ close: [] }>();
  const dialog = useTemplateRef("dialogRef");

  watch(
    () => props.isOpen,
    (newVal) => {
      if (dialog.value === null) return;
      if (newVal) {
        dialog.value.showModal();
      } else {
        dialog.value.close();
      }
    },
  );

  const closeModal = () => {
    if (dialog.value !== null) {
      dialog.value.close();
    }
  };

  const onClose = () => {
    emit("close");
  };

  defineExpose({ closeModal });
</script>

<template>
  <dialog ref="dialogRef" @close="onClose" class="backdrop:bg-neutral-600/30 backdrop:backdrop-blur-lg" tabindex="-1">
    <slot />
  </dialog>
</template>
