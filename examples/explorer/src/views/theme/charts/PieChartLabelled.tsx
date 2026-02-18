"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Cell, Pie, PieChart, Tooltip } from "recharts"
import { getAccessibleChartColorTokenByCategory } from "./chartA11yTokens"

const PieChartLabelled = () => {
  const chart = useChart({
    data: [
      { name: "Cat one", value: 400, color: getAccessibleChartColorTokenByCategory(1) },
      { name: "Cat two", value: 300, color: getAccessibleChartColorTokenByCategory(2) },
      { name: "Cat three", value: 300, color: getAccessibleChartColorTokenByCategory(3) },
      { name: "Cat four", value: 200, color: getAccessibleChartColorTokenByCategory(4) },
      { name: "Cat five", value: 200, color: getAccessibleChartColorTokenByCategory(5) },
      { name: "other", value: 200, color: getAccessibleChartColorTokenByCategory(6) },
    ],
  })

  return (
    <div role="region" aria-label="Categorical pie chart">
      <Chart.Root boxSize="200px" chart={chart} mx="auto">
        <PieChart margin={{ left: 40 }}>
          <Tooltip
            cursor={false}
            animationDuration={100}
            content={<Chart.Tooltip hideLabel />}
          />
          <Pie
            innerRadius={50}
            outerRadius={100}
            isAnimationActive={false}
            data={chart.data}
            dataKey={chart.key("value")}
            nameKey="name"
            labelLine={{ strokeWidth: 1 }}
            label={{
              fill: chart.color("fg.muted"),
            }}
          >
            {chart.data.map((item) => (
              <Cell
                key={item.name}
                strokeWidth={0}
                fill={chart.color(item.color)}
              />
            ))}
          </Pie>
        </PieChart>
      </Chart.Root>
    </div>
  )
}

export default PieChartLabelled;
