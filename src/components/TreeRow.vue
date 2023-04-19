<template>
  <div class="treeRowContainer">
    <TreeCircle :tree="tree" v-for="tree in treeRow" v-if="treeRow" />
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import Tree from "../model/interfaces/Tree";
import TreeCircle from "../components/TreeCircle.vue";
const props = defineProps({
  treeRow: {
    type: Array as PropType<Tree[]>,
    required: true,
  },
});
</script>
<style scoped lang="css">
.treeRowContainer {
  white-space: nowrap;
  height: 25px;
}
</style>
