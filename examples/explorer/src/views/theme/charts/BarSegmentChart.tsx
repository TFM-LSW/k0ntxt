"use client"

import { BarSegment, useChart } from "@chakra-ui/charts"
import { getAccessibleChartColorTokenByCategory } from "./chartA11yTokens"

const BarSegmentChart = () => {
  const chart = useChart({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Google", value: 500000, color: getAccessibleChartColorTokenByCategory(1) },
      { name: "Direct", value: 100000, color: getAccessibleChartColorTokenByCategory(2) },
      { name: "Bing", value: 200000, color: getAccessibleChartColorTokenByCategory(3) },
      { name: "Yandex", value: 100000, color: getAccessibleChartColorTokenByCategory(4) },
    ],
  })

  return (
    <div role="region" aria-label="Ranked traffic segment chart">
      <BarSegment.Root chart={chart}>
        <BarSegment.Content>
          <BarSegment.Value />
          <BarSegment.Bar />
          <BarSegment.Label />
        </BarSegment.Content>
      </BarSegment.Root>
    </div>
  )
}

export default BarSegmentChart;
