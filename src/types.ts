import { Timestamp } from "firebase/firestore";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

export type RootStackParamList = {
  Home: undefined;
  GF: undefined;
  Auchan: undefined;
  Others: undefined;
  Recipe: undefined
}

export type State = {
  bottomNavBgColor: string;
  activeButton: string;
  gradientColors: string[];
}

export type Item = {
  id: string,
  name?: string,
  screen?: string,
  primary?: boolean,
  secondary?: boolean,
  valid?: boolean,
  resto?: boolean,
  count?: number,
  cost?: Float,
}

export type DayRecipes = {
  id: string,
  date?: Timestamp,
  lunch?: Recipe,
  dinner?: Recipe
}

export type Recipe = {
  name?: string
  ingredients?: Ingredient[],
}

export type Ingredient = {
  id: string,
  name?: string,
  valid?: boolean
}