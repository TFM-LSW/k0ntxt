import { render, screen } from '@testing-library/react';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import FontExamples, { resolveTokenValue } from '../FontExamples';
import { theme } from '../../../../theme';

// Mock the token imports
jest.mock('@/tokens/alias.json', () => ({
  alias: {
    font: {
      title: {
        xlarge: {
          $value: {
            fontSize: '{global.font.size.9}',
            fontWeight: '{global.font.weight.regular}',
            lineHeight: '{global.font.lineHeight.6}',
            fontFamily: '{global.font.family.title}'
          }
        }
      }
    }
  }
}));

jest.mock('@/tokens/global.light.json', () => ({
  global: {
    font: {
      size: {
        '9': { $value: '32px' }
      },
      weight: {
        regular: { $value: '400' }
      },
      lineHeight: {
        '6': { $value: '1.2' }
      },
      family: {
        title: { $value: 'Lato, Arial, sans-serif' }
      }
    }
  }
}));

describe('resolveTokenValue', () => {
  it('should resolve font size token', () => {
    expect(resolveTokenValue('{global.font.size.9}')).toBe('32px');
  });

  it('should resolve font weight token', () => {
    expect(resolveTokenValue('{global.font.weight.regular}')).toBe('400');
  });

  it('should resolve line height token', () => {
    expect(resolveTokenValue('{global.font.lineHeight.6}')).toBe('1.2');
  });

  it('should resolve font family token', () => {
    expect(resolveTokenValue('{global.font.family.title}')).toBe('Lato, Arial, sans-serif');
  });

  it('should return original value if token not found', () => {
    expect(resolveTokenValue('{global.font.size.invalid}')).toBe('{global.font.size.invalid}');
  });
});

describe('FontExamples', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    const system = createSystem(defaultConfig, theme);
    return render(
      <ChakraProvider value={system}>
        {component}
      </ChakraProvider>
    );
  };

  it('should render the component title', () => {
    renderWithProvider(<FontExamples />);
    expect(screen.getByText('Font')).toBeInTheDocument();
  });

  it('should render font categories', () => {
    renderWithProvider(<FontExamples />);
    expect(screen.getByText('title')).toBeInTheDocument();
  });

  it('should render font variations', () => {
    renderWithProvider(<FontExamples />);
    expect(screen.getByText('title.xlarge')).toBeInTheDocument();
  });

  it('should apply correct font styles', () => {
    renderWithProvider(<FontExamples />);
    const exampleText = screen.getByText('The quick brown fox jumps over the lazy dog.');
    
    // Check if the styles are applied correctly using computed styles
    const computedStyle = window.getComputedStyle(exampleText);
    expect(computedStyle.getPropertyValue('font-size')).toBe('32px');
    expect(computedStyle.getPropertyValue('font-weight')).toBe('400');
    expect(computedStyle.getPropertyValue('line-height')).toBe('1.2');
    expect(computedStyle.getPropertyValue('font-family')).toBe('Lato,Arial,sans-serif');
  });
}); 
