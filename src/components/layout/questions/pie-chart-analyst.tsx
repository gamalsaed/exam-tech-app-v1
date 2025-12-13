"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ExamDonutChart({
  wrong,
  correct,
}: {
  wrong: number;
  correct: number;
}) {
  const data = [
    { name: "Correct", value: correct },
    { name: "Incorrect", value: wrong },
  ];

  const COLORS = ["#00BC7D", "#EF4444"];

  return (
    <div className="w-full flex flex-col items-center font-mono">
      <div className="h-[250px] w-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={105}
              paddingAngle={0}
              rootTabIndex={0}
              activeShape={false}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <span className="font-semibold absolute text-emerald-500 text-4xl font-mono top-28 left-24">
          {Math.floor((correct * 100) / (correct + wrong))}%
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-sm font-medium">
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
