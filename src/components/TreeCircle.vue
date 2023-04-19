<template>
  <span :class="getcircleClass()"></span>
</template>

<script setup lang="ts">
import { PropType, onMounted } from "vue";
import Tree from "../model/interfaces/Tree";
import { TreeState } from "../model/enumerations/TreeState";
import { useToast } from "primevue/usetoast";

const props = defineProps({
  tree: {
    type: Object as PropType<Tree>,
    required: true,
  },
});

/**
 * Return css class based on TreeState.
 */
function getcircleClass(): string {
  switch (props.tree.state) {
    case TreeState.EXTINCT:
      return "circle extinct";
      break;
    case TreeState.FIRE:
      return "circle fire";
      break;
    case TreeState.INITIAL:
      return "circle initial";
      break;
    default:
      useToast().add({
        severity: "error",
        summary: "Error",
        detail: "Width, height or fire spread probability incorrect",
        life: 3000,
      });
      return "circle error";
      break;
  }
}
</script>

<style scoped lang="css">
.circle {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  -webkit-transition: background-color 550ms linear;
  -ms-transition: background-color 550ms linear;
  transition: background-color 550ms linear;
}

.fire {
  background-color: #ff2015;
}
.initial {
  background-color: #77dd77;
}

.extinct {
  background-color: #73706a;
}

.error {
  display: none;
}
</style>
