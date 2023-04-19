import { TreeState } from "../model/enumerations/TreeState";
import Tree from "../model/interfaces/Tree";
import Coordinate2D from "../model/interfaces/Coordinate2D";
import axios, { AxiosResponse } from "axios";
import Forest from "../model/interfaces/Forest";

export async function nextStep(forest: Forest): Promise<AxiosResponse> {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/simulation/step`,
    forest
  );
}

export async function allSteps(forest: Forest): Promise<AxiosResponse> {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/simulation/steps`,
    forest
  );
}
