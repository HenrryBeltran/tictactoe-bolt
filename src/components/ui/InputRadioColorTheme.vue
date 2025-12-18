<script setup lang="ts">
const props = defineProps<{
  value: string;
  modelValue: string;
  id: string;
  name: string;
}>();

const emit = defineEmits<{
  updateTheme: [];
}>();

function updateThemeValue() {
  emit("updateTheme");
}
</script>

<template>
  <div>
    <input
      type="radio"
      :id="id"
      :name="props.name"
      :value="value"
      :checked="modelValue === value"
      @change="updateThemeValue()"
      hidden
      class="peer hidden"
    />
    <label
      :for="id"
      class="inline-block w-full rounded-full px-6 py-1.5 font-semibold tracking-tight"
      :class="{
        'text-crust': modelValue === value,
        'text-text-color': modelValue !== value,
        'bg-primary': modelValue === value,
        'bg-base-color': modelValue !== value,
      }"
    >
      <slot />
    </label>
  </div>
</template>
