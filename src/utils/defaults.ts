export interface ISettingDictionary {
  fromTo: [number, number];
  percentage: TPercentage;
}

export type TPercentage =
  | number
  | ((delta: number, percentage?: number) => number);

export type TSetting = ISettingDictionary[];

export const between = (
  num: number,
  arr: [number, number],
  inclusive: [boolean, boolean] = [true, true],
) =>
  (inclusive[0] ? num >= arr[0] : num > arr[0]) &&
  (inclusive[0] ? num <= arr[1] : num < arr[1]);

export const numArrUpTo = (
  arr: [number, number],
  stepen: number = 1,
): [number, number] => {
  return [arr[0] * Math.pow(10, stepen), arr[1] * Math.pow(10, stepen)];
};

export const settings: TSetting = [
  {
    fromTo: [0, 10],
    percentage: 0,
  },
  {
    fromTo: [10, 20],
    percentage: 2.1,
  },
  {
    fromTo: [20, 30],
    percentage: 2.3,
  },
  {
    fromTo: [30, 40],
    percentage: 2.4,
  },
  {
    fromTo: [40, Infinity],
    percentage: (delta, percentage = 2.4) => {
      return delta * (percentage / 100) + (delta - 40_000_000) * 0.05;
    },
  },
];
