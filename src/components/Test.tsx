import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { calculate } from "@/utils";
import { settings } from "@/utils/defaults.ts";

type TPerc = ReturnType<typeof calculate> | null;

export function LoginForm() {
  const [expenses, setExpenses] = useState(1);
  const [income, setIncome] = useState(1);
  const [percentage, setPercentage] = useState<TPerc>(null);

  const handleClick = () => {
    const newResult = calculate(expenses, income, settings)
    setPercentage(newResult);
    console.log(newResult)
  };
  return (
    <div className='flex flex-col gap-3 sm:flex-row'>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Мотиватор</CardTitle>
          <CardDescription>
            Подними свою мотивацию в получении доходов
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="exp">Расходы</Label>
            <Input
              id="exp"
              type="number"
              required
              value={expenses}
              onChange={(e) => setExpenses(Number(e.currentTarget.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="income">Доход</Label>
            <Input
              id="income"
              type="number"
              required
              value={income}
              onChange={(e) => setIncome(Number(e.currentTarget.value))}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleClick}>
            Посчитать
          </Button>
        </CardFooter>
      </Card>
      {percentage?.itog !== undefined ? (
        <Card className='flex flex-col justify-between'>
          <CardHeader>
            {percentage.additional.delta >= 0 ? (
              <CardTitle>Ваша выручка: {percentage.itog.toFixed(2)}</CardTitle>
            ) : (
              <CardTitle>Расходы превысили доходы</CardTitle>
            )}
            <CardDescription>
              Траты: {expenses.toLocaleString()}. <br/> Доход: {income.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={handleClick}>Пересчитать</Button>
          </CardFooter>
        </Card>
      ) : null}
    </div>
  );
}
