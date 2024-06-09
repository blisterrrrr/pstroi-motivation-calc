import {
  between,
  type ISettingDictionary,
  numArrUpTo,
  type TSetting,
} from "./defaults.ts";

export const getFinancialIndex = (
  expenses: number,
  income: number,
  settings: TSetting,
) => {
  const delta = income - expenses;
  const fixedDelta = +(delta / 1_000_000).toFixed(1);
  const ret = settings.find((setting) => {
    if (between(delta, numArrUpTo(setting.fromTo, 6))) {
      return true;
    }
  });
  return {
    ret,
    delta,
    fixedDelta,
  };
};

export const calcPercentage = (
  setting: ISettingDictionary | undefined,
  delta: number,
) => {
  if (!setting || delta < 0) return 0;
  if (typeof setting.percentage === "function") {
    return setting.percentage(delta);
  }
  return delta * (setting.percentage / 100);
};

export const calculate = (
  expenses: number,
  income: number,
  settings: TSetting,
) => {
  const { ret, delta, fixedDelta } = getFinancialIndex(
    expenses,
    income,
    settings,
  );
  // console.log(
  //   `${typeof ret?.percentage === "number" ? ret?.percentage : "oleg"}, delta: ${delta}, fixedDelta: ${fixedDelta}`,
  // );
  return {
    itog: calcPercentage(ret, delta),
    additional: {
      delta,
      fixedDelta,
      range: ret?.fromTo,
      percentage: typeof ret?.percentage === "number" && ret?.percentage,
    },
  };
};
