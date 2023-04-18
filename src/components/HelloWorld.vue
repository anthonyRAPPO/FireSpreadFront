<template>
  <Button label="Submit" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
