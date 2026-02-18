import { Chart, useChart } from "@chakra-ui/charts";
import {
  Line,
  LineChart as RechartsLineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { memo, useMemo } from "react";
import { Box, Flex } from "@chakra-ui/react";

interface DataPoint {
  name: string;
  value1?: number;
  value2?: number;
  value3?: number;
  value4?: number;
}

interface LineChartProps {
  data?: DataPoint[];
  showPoints?: boolean;
}

interface DotProps {
  cx: number;
  cy: number;
  fill: string;
  stroke: string;
  payload?: DataPoint;
  dataKey?: string;
}

interface LegendPayload {
  value: string;
  color: string;
}

const data: DataPoint[] = [
  { name: "Jan", value1: 400, value2: 200, value3: 300 },
  { name: "Feb", value1: 300, value2: 400, value3: 500 },
  { name: "Mar", value1: 600, value2: 300, value3: 400 },
  { name: "Apr", value1: 800, value2: 500, value3: 600 },
  { name: "May", value1: 500, value2: 700, value3: 800 },
  { name: "Jun", value1: 700, value2: 600, value3: 700 },
  { name: "Jul", value1: 900, value2: 800, value3: 900 },
];

// Circle dot component
const CircleDot = memo(({ cx, cy, fill, stroke, payload, dataKey }: DotProps) => {
  const value = payload?.[dataKey as keyof DataPoint] ?? 'unknown';
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill={fill}
        stroke={stroke}
        strokeWidth={2}
        role="img"
        aria-label={`Data point: ${value}`}
        tabIndex={0}
      />
    </g>
  );
});

// Triangle dot component
const TriangleDot = memo(({ cx, cy, fill, stroke, payload, dataKey }: DotProps) => {
  const value = payload?.[dataKey as keyof DataPoint] ?? 'unknown';
  const size = 5;
  return (
    <g>
      <polygon
        points={`
          ${cx},${cy - size}
          ${cx - size * 0.866},${cy + size * 0.5}
          ${cx + size * 0.866},${cy + size * 0.5}
        `}
        fill={fill}
        stroke={stroke}
        strokeWidth={2}
        role="img"
        aria-label={`Data point: ${value}`}
        tabIndex={0}
      />
    </g>
  );
});

// Square dot component
const SquareDot = memo(({ cx, cy, fill, stroke, payload, dataKey }: DotProps) => {
  const value = payload?.[dataKey as keyof DataPoint] ?? 'unknown';
  const size = 4;
  return (
    <g>
      <rect
        x={cx - size}
        y={cy - size}
        width={size * 2}
        height={size * 2}
        fill={fill}
        stroke={stroke}
        strokeWidth={2}
        role="img"
        aria-label={`Data point: ${value}`}
        tabIndex={0}
      />
    </g>
  );
});

// Get dot component based on index
const getDotComponent = (index: number) => {
  switch (index) {
    case 0:
      return CircleDot;
    case 1:
      return TriangleDot;
    case 2:
      return SquareDot;
    default:
      return CircleDot;
  }
};

// Custom legend component
const CustomLegend = memo(({ payload = [] }: { payload?: LegendPayload[] }) => {
  return (
    <Flex 
      role="list" 
      aria-label="Chart legend"
      justifyContent="center"
      gap="20px"
      marginTop="4"
    >
      {payload.map((entry: LegendPayload, index: number) => {
        const DotComponent = getDotComponent(index);
        return (
          <Box 
            key={entry.value} 
            role="listitem"
            display="flex"
            alignItems="center"
            gap="8px"
          >
            <svg 
              width="20" 
              height="20" 
              style={{ display: 'block' }}
              aria-hidden="true"
            >
              <DotComponent 
                cx={10} 
                cy={10} 
                fill={entry.color} 
                stroke={entry.color}
                payload={undefined}
                dataKey={undefined}
              />
            </svg>
            <span 
              style={{ color: entry.color }}
              aria-label={`${entry.value} data series`}
            >
              {entry.value}
            </span>
          </Box>
        );
      })}
    </Flex>
  );
});

export default function LineChart({ data: propData = data, showPoints = true }: LineChartProps) {
  // Get all possible value keys from the data
  const valueKeys = useMemo(() => {
    const keys = new Set<keyof DataPoint>();
    propData?.forEach(point => {
      Object.keys(point).forEach(key => {
        if (key.startsWith('value')) {
          keys.add(key as keyof DataPoint);
        }
      });
    });
    return Array.from(keys);
  }, [propData]);

  const chart = useChart({
    data: propData,
    series: valueKeys.map((key, index) => ({
      name: key,
      color: `chart.categorical.${(index % 4) + 1}` // Cycle through 4 colors
    })),
  });

  const chartMargin = useMemo(() => ({ top: 20, right: 20, bottom: 20, left: 20 }), []);

  return (
    <Chart.Root
      maxH="sm"
      chart={chart}
      bg="transparent"
      borderWidth="0"
      boxShadow="none"
      p="0"
    >
      <div 
        role="region" 
        aria-label={`Line chart showing ${valueKeys.length} data series`}
        style={{ width: '100%', height: '100%', minHeight: '300px' }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart 
            data={chart.data}
            margin={chartMargin}
          >
            <CartesianGrid 
              stroke={chart.color("border.muted")} 
              vertical={false}
              role="presentation"
            />
            <XAxis 
              axisLine={false} 
              tickLine={false} 
              dataKey={chart.key("name")}
              tick={{ fill: chart.color("text.default") }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: chart.color("text.default") }}
            />
            <Tooltip
              cursor={false}
              animationDuration={100}
              content={<Chart.Tooltip />}
            />
            <Legend content={<CustomLegend />} />
            {chart.series.map((item, index) => {
              const DotComponent = getDotComponent(index);
              const color = chart.color(item.color);
              return (
                <Line
                  key={item.name}
                  isAnimationActive={false}
                  type="monotone"
                  dataKey={chart.key(item.name)}
                  stroke={color}
                  dot={showPoints ? ((props: any) => {
                    const { key, ...restProps } = props;
                    return <DotComponent key={key} {...restProps} fill={color} stroke={color} />;
                  }) : false}
                  activeDot={showPoints ? ((props: any) => {
                    const { key, ...restProps } = props;
                    return <DotComponent key={key} {...restProps} fill={color} stroke={color} />;
                  }) : false}
                  name={item.name}
                  aria-label={`${item.name} data series`}
                />
              );
            })}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </Chart.Root>
  );
}
