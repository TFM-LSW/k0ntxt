"use client"

import React from 'react';

import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import type { BarProps } from "recharts"
import { getAccessibleChartColorTokenByCategory } from "./chartA11yTokens"

interface CustomBarProps extends Omit<BarProps, 'shape'> {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  index: number;
  showPatternOverlay?: boolean;
}

const CustomBar = (props: CustomBarProps) => {
  const {
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    fill = 'black',
    index,
    showPatternOverlay = true,
  } = props;
  const patternSize = 10;
  
  const renderPattern = () => {
    const elements = [];
    
    switch (index) {
      case 0:
        // Diagonal lines
        for (let i = 0; i < width; i += patternSize) {
          elements.push(
            <line
              key={`line-${i}`}
              x1={i}
              y1={0}
              x2={i + patternSize}
              y2={height}
              stroke={fill}
              strokeWidth={1}
            />
          );
        }
        break;
      case 1:
        // Dots
        for (let i = 0; i < width; i += patternSize) {
          for (let j = 0; j < height; j += patternSize) {
            elements.push(
              <circle
                key={`dot-${i}-${j}`}
                cx={i + patternSize/2}
                cy={j + patternSize/2}
                r={2}
                fill={fill}
              />
            );
          }
        }
        break;
      case 2:
        // Checkerboard
        for (let i = 0; i < width; i += patternSize) {
          for (let j = 0; j < height; j += patternSize) {
            if ((i + j) % (patternSize * 2) === 0) {
              elements.push(
                <rect
                  key={`check-${i}-${j}`}
                  x={i}
                  y={j}
                  width={patternSize/2}
                  height={patternSize/2}
                  fill={fill}
                />
              );
            }
          }
        }
        break;
      case 3:
        // Crosshatch
        for (let i = 0; i < width; i += patternSize) {
          elements.push(
            <g key={`cross-${i}`}>
              <line
                x1={i}
                y1={0}
                x2={i + patternSize}
                y2={height}
                stroke={fill}
                strokeWidth={1}
              />
              <line
                x1={i + patternSize}
                y1={0}
                x2={i}
                y2={height}
                stroke={fill}
                strokeWidth={1}
              />
            </g>
          );
        }
        break;
    }
    
    return elements;
  };

  if (!showPatternOverlay) {
    return <rect x={x} y={y} width={width} height={height} fill={fill} />;
  }

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} opacity={0.3} />
      <g transform={`translate(${x}, ${y})`}>
        {renderPattern()}
      </g>
    </g>
  );
};

type DIBarChartProps = {
  showPatternOverlay?: boolean;
};

const DIBarChart: React.FC<DIBarChartProps> = ({ showPatternOverlay = true }) => {
    const chart = useChart({
        data: [
          { allocation: 60, type: "Stock", color: getAccessibleChartColorTokenByCategory(1) },
          { allocation: 45, type: "Crypto", color: getAccessibleChartColorTokenByCategory(2) },
          { allocation: 12, type: "ETF", color: getAccessibleChartColorTokenByCategory(3) },
          { allocation: 4, type: "Cash", color: getAccessibleChartColorTokenByCategory(4) },
        ],
        series: [{ name: "allocation" }],
      })
    
      return (
        <div role="region" aria-label="Patterned allocation bar chart">
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
              <Bar
                isAnimationActive={false}
                dataKey={chart.key("allocation")}
                shape={(props: BarProps) => (
                  <CustomBar
                    {...props as CustomBarProps}
                    showPatternOverlay={showPatternOverlay}
                  />
                )}
              >
                {chart.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chart.color(entry.color)}
                  />
                ))}
              </Bar>
            </BarChart>
          </Chart.Root>
        </div>
      )
};

export default DIBarChart;
