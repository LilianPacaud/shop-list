export type RootStackParamList = {
  Home: undefined;
  GF: undefined;
  Auchan: undefined;
  Others: undefined;
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
  count?: number
}