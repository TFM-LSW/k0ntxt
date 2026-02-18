"use client"

import React from 'react';

import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"


const DIBarChart: React.FC = () => {
    const chart = useChart({
        data: [
          { allocation: 60, type: "Stock" },
          { allocation: 45, type: "Crypto", color: "chart.categorical.2" },
          { allocation: 12, type: "ETF" },
          { allocation: 4, type: "Cash" },
        ],
        series: [{ name: "allocation", color: "chart.categorical.1" }],
      })
    
      return (
        <Chart.Root maxH="sm" chart={chart}>
          <BarChart data={chart.data}>
            <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
            <XAxis axisLine={false} tickLine={false} dataKey={chart.key("type")} />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            {chart.series.map((item) => (
              <Bar
                key={item.name}
                isAnimationActive={false}
                dataKey={chart.key(item.name)}
                fill={chart.color(item.color)}
              />
            ))}
          </BarChart>
        </Chart.Root>
      )
};

export default DIBarChart;
