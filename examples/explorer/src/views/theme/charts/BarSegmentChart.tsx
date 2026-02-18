"use client"

import { BarSegment, useChart } from "@chakra-ui/charts"

const BarSegmentChart = () => {
  const chart = useChart({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Google", value: 500000, color: "chart.categorical.1" },
      { name: "Direct", value: 100000, color: "chart.categorical.2" },
      { name: "Bing", value: 200000, color: "chart.categorical.3" },
      { name: "Yandex", value: 100000, color: "chart.categorical.4" },
    ],
  })

  return (
    <BarSegment.Root chart={chart}>
      <BarSegment.Content>
        <BarSegment.Value />
        <BarSegment.Bar />
        <BarSegment.Label />
      </BarSegment.Content>
    </BarSegment.Root>
  )
}

export default BarSegmentChart;