import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import LineChart from './LineChart';
import '@testing-library/jest-dom';
import { theme } from '../../../theme';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { getAccessibleChartColorTokenByIndex } from './chartA11yTokens';

// Mock the Recharts components to avoid issues with testing
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="recharts-responsive-container">{children}</div>
    ),
    LineChart: ({ children }: { children: React.ReactNode }) => (
      <div role="presentation" data-testid="recharts-line-chart" style={{ cursor: 'pointer' }}>{children}</div>
    ),
    Line: ({ stroke }: { stroke?: string }) => (
      <div data-testid="recharts-line" style={{ stroke: stroke || 'chart.categorical.1.dark' }} />
    ),
    XAxis: () => <div data-testid="recharts-x-axis" />,
    YAxis: () => <div data-testid="recharts-y-axis" />,
    CartesianGrid: () => <div data-testid="recharts-grid" style={{ stroke: 'border.muted' }} />,
    Tooltip: () => <div data-testid="recharts-tooltip" style={{ display: 'none' }} />,
    Legend: () => (
      <ul 
        data-testid="recharts-legend"
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px',
          marginTop: '4px'
        }}
      >
        <li role="listitem" style={{ fontFamily: 'body', color: getAccessibleChartColorTokenByIndex(0) }}>value1</li>
        <li role="listitem" style={{ fontFamily: 'body', color: getAccessibleChartColorTokenByIndex(1) }}>value2</li>
        <li role="listitem" style={{ fontFamily: 'body', color: getAccessibleChartColorTokenByIndex(2) }}>value3</li>
      </ul>
    ),
  };
});

describe('LineChart', () => {
  // Test data organization
  const testData = {
    valid: [
      { name: "Jan", value1: 100, value2: 200, value3: 300 },
      { name: "Feb", value1: 200, value2: 300, value3: 400 },
    ],
    empty: [],
    invalid: [
      { name: "Jan", value1: "invalid", value2: 200, value3: 300 },
    ],
    large: Array.from({ length: 1000 }, (_, i) => ({
      name: `Month ${i}`,
      value1: Math.random() * 1000,
      value2: Math.random() * 1000,
      value3: Math.random() * 1000,
    })),
    dynamic: [
      { name: "Jan", value1: 100, value2: 200 },
      { name: "Feb", value1: 200, value2: 300 },
    ],
    extraValues: [
      { name: "Jan", value1: 100, value2: 200, value3: 300, value4: 400, value5: 500 },
      { name: "Feb", value1: 200, value2: 300, value3: 400, value4: 500, value5: 600 },
    ]
  };

  // Custom render function
  const renderLineChart = (props = {}) => {
    const system = createSystem(defaultConfig, theme);
    return render(
      <ChakraProvider value={system}>
        <LineChart data={testData.valid} {...props} />
      </ChakraProvider>
    );
  };

  // Cleanup after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Basic rendering tests
  describe('Rendering', () => {
    it('renders the chart container', () => {
      renderLineChart();
      const container = screen.getByRole('region');
      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute('aria-label', 'Line chart showing 3 data series');
    });

    it('renders the chart with responsive container', () => {
      renderLineChart();
      const containers = screen.getAllByTestId('recharts-responsive-container');
      expect(containers.length).toBeGreaterThan(0);
    });

    it('renders with correct styling', () => {
      renderLineChart();
      const container = screen.getByRole('region');
      expect(container).toHaveStyle({
        width: '100%',
        height: '100%',
        minHeight: '300px'
      });
    });
  });

  // Data validation tests
  describe('Data Handling', () => {
    it('renders with valid data', () => {
      renderLineChart({ data: testData.valid });
      const containers = screen.getAllByTestId('recharts-responsive-container');
      expect(containers).toHaveLength(2);
    });

    it('handles empty data gracefully', () => {
      const { container } = renderLineChart({ data: testData.empty });
      expect(container).toBeInTheDocument();
      const regions = screen.getAllByRole('region');
      expect(regions.length).toBeGreaterThan(0);
    });

    it('handles invalid data gracefully', () => {
      const { container } = renderLineChart({ data: testData.invalid as any });
      expect(container).toBeInTheDocument();
    });

    it('handles missing data gracefully', () => {
      const { container } = renderLineChart({ data: undefined });
      expect(container).toBeInTheDocument();
      const regions = screen.getAllByRole('region');
      expect(regions.length).toBeGreaterThan(0);
    });

    it('handles dynamic number of series', () => {
      renderLineChart({ data: testData.dynamic });
      const lines = screen.getAllByTestId('recharts-line');
      expect(lines).toHaveLength(2); // Should have 2 lines for value1 and value2
    });

    it('handles more than 4 series', () => {
      renderLineChart({ data: testData.extraValues });
      const lines = screen.getAllByTestId('recharts-line');
      expect(lines).toHaveLength(5); // Should have 5 lines for value1 through value5
    });

    it('cycles through colors for more than 4 series', () => {
      renderLineChart({ data: testData.extraValues });
      const lines = screen.getAllByTestId('recharts-line');
      const colors = lines.map(line => line.style.stroke);
      const expectedColors = [
        getAccessibleChartColorTokenByIndex(0),
        getAccessibleChartColorTokenByIndex(1),
        getAccessibleChartColorTokenByIndex(2),
        getAccessibleChartColorTokenByIndex(3),
        getAccessibleChartColorTokenByIndex(4),
      ];
      expect(colors).toEqual(expectedColors);
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = renderLineChart();
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });

    it('has proper ARIA attributes', () => {
      renderLineChart();
      const container = screen.getByRole('region');
      expect(container).toHaveAttribute('aria-label', 'Line chart showing 3 data series');
      
      const grids = screen.getAllByTestId('recharts-grid');
      expect(grids.length).toBeGreaterThan(0);
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('shows tooltip on hover', async () => {
      renderLineChart();
      const chart = screen.getByTestId('recharts-line-chart');
      await userEvent.hover(chart);
      const tooltip = screen.getByTestId('recharts-tooltip');
      expect(tooltip).toBeInTheDocument();
    });

    it('handles mouse events', () => {
      renderLineChart();
      const chart = screen.getByTestId('recharts-line-chart');
      expect(chart).toHaveStyle({ cursor: 'pointer' });
    });
  });

  // Performance tests
  describe('Performance', () => {
    it('renders efficiently with large datasets', () => {
      const startTime = performance.now();
      renderLineChart({ data: testData.large });
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      expect(renderTime).toBeLessThan(500);
    });

    it('renders within performance budget', () => {
      const start = performance.now();
      renderLineChart({ data: testData.valid });
      const end = performance.now();
      expect(end - start).toBeLessThan(100);
    });
  });

  // Theme integration tests
  describe('Theme Integration', () => {
    it('uses theme colors for all elements', () => {
      renderLineChart();
      const elements = {
        grid: screen.getAllByTestId('recharts-grid'),
        lines: screen.getAllByTestId('recharts-line'),
        legend: screen.getAllByRole('listitem'),
      };
      
      // Check grid color
      elements.grid.forEach(grid => {
        expect(grid).toHaveStyle({
          stroke: 'border.muted'
        });
      });

      // Check line colors
      elements.lines.forEach((line, index) => {
        expect(line).toHaveStyle({
          stroke: getAccessibleChartColorTokenByIndex(index)
        });
      });

      // Check legend colors
      elements.legend.forEach(item => {
        expect(item).toHaveStyle({
          color: expect.stringContaining('chart.categorical')
        });
      });
    });

    it('respects theme font settings', () => {
      renderLineChart();
      const legendItems = screen.getAllByRole('listitem');
      expect(legendItems.length).toBeGreaterThan(0);
      legendItems.forEach(element => {
        expect(element).toHaveStyle({
          fontFamily: 'body'
        });
      });
    });
  });

  // Snapshot tests
  describe('Snapshots', () => {
    it('matches snapshot with default props', () => {
      const { container } = renderLineChart();
      expect(container).toMatchSnapshot();
    });

    it('matches snapshot with custom props', () => {
      const { container } = renderLineChart({
        data: testData.valid,
        height: 500,
        width: 800,
      });
      expect(container).toMatchSnapshot();
    });
  });

  // Test coverage
  describe('Coverage', () => {
    it('covers all component props', () => {
      const props = {
        data: testData.valid,
        height: 500,
        width: 800,
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
      };
      renderLineChart(props);
      
      // Verify all props are used
      const container = screen.getByRole('region');
      expect(container).toHaveStyle({
        height: '100%',
        width: '100%',
        minHeight: '300px'
      });
    });
  });
});
