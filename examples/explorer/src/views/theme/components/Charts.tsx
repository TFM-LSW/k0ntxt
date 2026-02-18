import React, { memo, useState } from "react";
import DIBarChart from "../charts/BarChart";
import BarChartStacked from "../charts/BarChartStacked";
import PieChartLabelled from "../charts/PieChartLabelled";
import BarSegmentChart from "../charts/BarSegmentChart";
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import LineChart from "../charts/LineChart";
import BarChartAccessible from "../charts/BarChartAccessible";
import BarChartTable from "../charts/BarChartTable";

type ChartPanelProps = {
  title: string;
  description: string;
  tags: string[];
  a11y?: boolean;
  children: React.ReactNode;
};

const ChartPanel = ({ title, description, tags, a11y, children }: ChartPanelProps) => {
  return (
    <Card.Root variant="outline" borderColor="border.muted" bg="bg" h="full">
      <Card.Header pb="2">
        <Flex justify="space-between" gap="3" align="start">
          <Stack gap="1">
            <Heading size="sm">{title}</Heading>
            <Text color="fg.muted" textStyle="sm">
              {description}
            </Text>
          </Stack>
          {a11y && (
            <Badge colorPalette="status.positive" variant="subtle">
              A11y sample
            </Badge>
          )}
        </Flex>
        <HStack mt="3" gap="1.5" flexWrap="wrap">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" colorPalette="brand.neutral">
              {tag}
            </Badge>
          ))}
        </HStack>
      </Card.Header>
      <Card.Body pt="0">
        <Box
          minH={{ base: "220px", md: "260px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          css={{
            "& > *": { width: "100%" },
            "& table": { width: "100%" },
          }}
        >
          {children}
        </Box>
      </Card.Body>
    </Card.Root>
  );
};

const Charts: React.FC = () => {
  const [showAccessibilityAids, setShowAccessibilityAids] = useState(true);

  return (
    <Stack gap="6" mt="4" mb="4">
      <Card.Root variant="outline" borderColor="border.muted" bg="bg.subtle">
        <Card.Body p={{ base: "4", md: "5" }}>
          <Stack gap="3">
            <HStack justify="space-between" flexWrap="wrap" gap="2">
              <Heading size="md">Charts Accessibility Showcase</Heading>
              <HStack gap="2">
                <Badge colorPalette="accent.primary" variant="subtle">
                  Token-driven
                </Badge>
                <Badge colorPalette="status.positive" variant="subtle">
                  Accessibility samples
                </Badge>
              </HStack>
            </HStack>
            <Text color="fg.muted" maxW="4xl">
              Sample data visualizations demonstrating semantic color tokens, contrast-aware patterns,
              and inclusive alternatives such as patterned marks and tabular equivalents.
            </Text>
          </Stack>
        </Card.Body>
      </Card.Root>

      <Stack gap="3">
        <Heading size="sm" color="fg.emphasized">
          Accessibility-first patterns
        </Heading>
        <Card.Root variant="outline" borderColor="border.muted" bg="bg.subtle">
          <Card.Body p={{ base: "3", md: "4" }}>
            <HStack gap="4" flexWrap="wrap">
              <Switch.Root
                checked={showAccessibilityAids}
                onCheckedChange={(details) => setShowAccessibilityAids(!!details.checked)}
                colorPalette="status.info"
              >
                <Switch.HiddenInput />
                <Switch.Control />
                <Switch.Label>Show accessibility aids</Switch.Label>
              </Switch.Root>
            </HStack>
          </Card.Body>
        </Card.Root>
        <SimpleGrid columns={{ base: 1, xl: 2 }} gap="5">
          <ChartPanel
            title="Line Trends with Focusable Data Marks"
            description="Point markers and legend affordances designed for readability and keyboard focus."
            tags={["line", "legend", "focus states"]}
            a11y
          >
            <LineChart showPoints={showAccessibilityAids} />
          </ChartPanel>
          <ChartPanel
            title="Patterned Bar Comparison"
            description="Pattern overlays reduce color-only dependency for category differentiation."
            tags={["bar", "pattern fill", "contrast"]}
            a11y
          >
            <BarChartAccessible showPatternOverlay={showAccessibilityAids} />
          </ChartPanel>
          <ChartPanel
            title="Chart Data Table"
            description="Tabular fallback supports users who prefer structured numeric views."
            tags={["table", "fallback", "screen reader"]}
            a11y
          >
            <BarChartTable />
          </ChartPanel>
        </SimpleGrid>
      </Stack>

      <Stack gap="3">
        <Heading size="sm" color="fg.emphasized">
          Comparative and composition patterns
        </Heading>
        <SimpleGrid columns={{ base: 1, xl: 2 }} gap="5">
          <ChartPanel
            title="Single-Series Bar Allocation"
            description="Baseline categorical comparison using semantic chart scales."
            tags={["bar", "single series"]}
          >
            <DIBarChart />
          </ChartPanel>
          <ChartPanel
            title="Stacked Platform Mix"
            description="Part-to-whole comparison across months for trend and composition reading."
            tags={["stacked", "composition"]}
          >
            <BarChartStacked />
          </ChartPanel>
          <ChartPanel
            title="Labelled Categorical Pie"
            description="Categorical distribution with direct labels and token-based series mapping."
            tags={["pie", "categorical"]}
          >
            <PieChartLabelled />
          </ChartPanel>
          <ChartPanel
            title="Segment Summary Bar"
            description="Compact ranked contribution view for quick channel or source analysis."
            tags={["segment", "ranking"]}
          >
            <BarSegmentChart />
          </ChartPanel>
        </SimpleGrid>
      </Stack>
    </Stack>
  );
};

export default memo(Charts);
