"use client"

import { Box, Text, Table } from "@chakra-ui/react"

const BarChartTable = () => {
  const data = [
    { windows: 186, mac: 80, linux: 120, month: "January" },
    { windows: 165, mac: 95, linux: 110, month: "February" },
    { windows: 190, mac: 87, linux: 125, month: "March" },
    { windows: 195, mac: 88, linux: 130, month: "May" },
    { windows: 182, mac: 98, linux: 122, month: "June" },
    { windows: 175, mac: 90, linux: 115, month: "August" },
    { windows: 180, mac: 86, linux: 124, month: "October" },
    { windows: 185, mac: 91, linux: 126, month: "November" },
  ]

  return (
    <Box p={2}>
      <Text as="h3" mb={4}>Operating System Usage by Month</Text>
      <Table.ScrollArea>
        <Table.Root 
          striped
          size="md" 
          w="100%"
          aria-label="Operating System Usage by Month"
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Month</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Windows</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Mac</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Linux</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Total</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((row) => {
              const total = row.windows + row.mac + row.linux
              return (
                <Table.Row key={row.month}>
                  <Table.Cell fontWeight="medium">{row.month}</Table.Cell>
                  <Table.Cell textAlign="end">{row.windows}</Table.Cell>
                  <Table.Cell textAlign="end">{row.mac}</Table.Cell>
                  <Table.Cell textAlign="end">{row.linux}</Table.Cell>
                  <Table.Cell textAlign="end" fontWeight="bold" color="accent.primary">{total}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  )
}

export default BarChartTable 
