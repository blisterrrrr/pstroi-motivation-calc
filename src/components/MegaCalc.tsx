import { useState } from "react";
import { calculate } from "@/utils";
import { settings } from "../utils/defaults.ts";
import {Input} from "@/components/ui/input.tsx";

type TPerc = ReturnType<typeof calculate> | null;

export function MegaCalc() {
  const [expenses, setExpenses] = useState(1);
  const [income, setIncome] = useState(1);
  const [percentage, setPercentage] = useState<TPerc>(null);

  const handleClick = () => {
    setPercentage(calculate(expenses, income, settings));
  };
  console.log('rerender')
  return (
    <>
      <label htmlFor="exp">Расходы: </label>
      <Input
        id="exp"
        type="number"
        min={1}
        value={expenses}
        onInput={(e) => setExpenses(Number(e.currentTarget.value))}
      />
      <br />
      <label htmlFor="income">Доходы: </label>
      <input
        id="income"
        type="number"
        min={1}
        value={income}
        onInput={(e) => setIncome(Number(e.currentTarget.value))}
      />
      <br />
      <button onClick={handleClick}>Посчитать</button>
      <h2>{percentage?.itog.toFixed(2) || 0}</h2>
      <p>
        {percentage ? (
          percentage?.additional.percentage ? (
            <>По проценту {percentage?.additional.percentage}%</>
          ) : (
            <>По комплексному проценту</>
          )
        ) : (
          "Нажмите на кнопку!"
        )}
      </p>
    </>
  );
}
