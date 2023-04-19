<template>
  <Toast />
  <h2>FIRE SPREAD SIMULATION</h2>
  <div class="forestContainer">
    <TreeRow
      :tree-row="treeRow"
      v-for="treeRow in trees"
      v-if="trees"
    ></TreeRow>
  </div>
  <div class="actionContainer">
    <div>
      <Button
        label="Next"
        @click="nextStep()"
        :disabled="!canNextStep() || doSimulation"
      />
    </div>
    <div>
      <Button
        :label="doSimulation ? 'Stop simulation' : 'Start simulation'"
        @click="doSimulation ? stopSimulation() : allPropagation()"
        :disabled="!canNextStep()"
      />
    </div>
    <div>
      <Button
        label="Display final result"
        @click="simulateToEnd()"
        :disabled="!canNextStep() || doSimulation"
      />
    </div>
    <div>
      <Button label="Reset" @click="reset()" :disabled="doSimulation" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import * as simulationApiService from "../services/simulationApiService";
import * as simulationService from "../services/simulationService";
import { onMounted, ref } from "vue";
import Tree from "../model/interfaces/Tree";
import { useToast } from "primevue/usetoast";
import { ToastServiceMethods } from "primevue/toastservice";
import Toast from "primevue/toast";
import TreeRow from "../components/TreeRow.vue";
import Coordinate2D from "../model/interfaces/Coordinate2D";

const probability = ref<number>();
const trees = ref<Tree[][]>();
const toast = ref<ToastServiceMethods>(useToast());
const doSimulation = ref<boolean>(false);
const initFireTrees = ref<Coordinate2D[]>();
/**
 * Tree array initialisation with data in .env file.
 */
onMounted(() => {
  probability.value = import.meta.env.VITE_PROBABILITY;
  initFireTrees.value = simulationService.convertStringToCoordinateArray(
    import.meta.env.VITE_FIRE_TREES
  );
  createTree2DArray(
    import.meta.env.VITE_WIDTH,
    import.meta.env.VITE_HEIGHT,
    probability.value
  );
});

function reset() {
  if (trees.value && initFireTrees.value) {
    simulationService.resetTree2DArray(trees.value, initFireTrees.value);
  }
}

/**
 * Call next() all 0.6s while at least a tree is in fire and the simulation isn't paused.
 */
function allPropagation() {
  doSimulation.value = true;
  const interval = setInterval(() => {
    if (
      trees.value &&
      simulationService.stillTreeInFire(trees.value) &&
      doSimulation.value
    ) {
      nextStep();
    } else {
      doSimulation.value = false;
      clearInterval(interval);
    }
  }, 600);
}

function stopSimulation() {
  doSimulation.value = false;
}

/**
 * Call api to get final result of the simulation.
 */
function simulateToEnd() {
  if (canNextStep()) {
    simulationApiService
      .allSteps({ probability: probability.value!, trees: trees.value! })
      .then((res) => {
        trees.value = res.data;
      })
      .catch(() => {
        toast.value.add({
          severity: "error",
          summary: "Error",
          detail: "API during the simulation of next step",
          life: 3000,
        });
      });
  }
}

/**
 * Call api to get next result of the simulation.
 */
function nextStep() {
  if (canNextStep()) {
    simulationApiService
      .nextStep({ probability: probability.value!, trees: trees.value! })
      .then((res) => {
        trees.value = res.data;
      })
      .catch(() => {
        toast.value.add({
          severity: "error",
          summary: "Error",
          detail: "API during the simulation of next step",
          life: 3000,
        });
      });
  }
}

function canNextStep(): boolean {
  return (
    probability.value !== undefined &&
    probability.value >= 0 &&
    probability.value <= 1 &&
    trees.value !== undefined &&
    simulationService.stillTreeInFire(trees.value)
  );
}

/**
 * Create a Tree 2d Array with width
 */
function createTree2DArray(
  width: number,
  height: number,
  probability: number | undefined
): boolean {
  if (
    width > 0 &&
    height > 0 &&
    probability &&
    probability >= 0 &&
    probability <= 1 &&
    initFireTrees.value
  ) {
    trees.value = simulationService.createTrees2DArray(
      width,
      height,
      initFireTrees.value
    );
    return true;
  } else {
    toast.value.add({
      severity: "error",
      summary: "Error",
      detail: "Width, height or fire spread probability incorrect",
      life: 3000,
    });
    return false;
  }
}
</script>
<style scoped lang="css">
.forestContainer {
  width: 100%;
  height: 70vh;
  overflow: auto;
}

.actionContainer {
  display: flex;
  justify-content: center;
}

.actionContainer div {
  margin: 2em;
}
</style>
