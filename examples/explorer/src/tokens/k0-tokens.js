export const global = {
  colors: {
    neutral: {
      0: "#ffffff",
      50: "#f3f4f6",
      100: "#e7e9ec",
      200: "#ced3da",
      300: "#b6bcc7",
      400: "#9da6b5",
      500: "#8590a2",
      600: "#667286",
      700: "#4d5664",
      800: "#333943",
      900: "#1a1d21",
      950: "#0d0e11",
      1000: "#000000"
    },
    charcoal: {
      50: "#ebebeb",
      100: "#d6d6d6",
      200: "#adadad",
      300: "#858585",
      400: "#5c5c5c",
      500: "#333333",
      600: "#292929",
      700: "#1f1f1f",
      800: "#141414",
      900: "#0a0a0a",
      950: "#050505"
    },
    cyan: {
      50: "#f2f6fa",
      100: "#e5eef4",
      200: "#cadde9",
      300: "#b0ccdf",
      400: "#95bbd4",
      500: "#7baac9",
      600: "#4d8cb6",
      700: "#386a8a",
      800: "#26465c",
      900: "#13232e",
      950: "#091217"
    },
    purple: {
      50: "#f8f4fa",
      100: "#f0e9f4",
      200: "#e1d3ea",
      300: "#d2bddf",
      400: "#c3a7d5",
      500: "#b491ca",
      600: "#9462b3",
      700: "#70448d",
      800: "#4b2d5e",
      900: "#25172f",
      950: "#130b17"
    },
    teal: {
      50: "#f4faf7",
      100: "#e8f4ef",
      200: "#d1e9df",
      300: "#baded0",
      400: "#a3d3c0",
      500: "#8cc8b0",
      600: "#5eb290",
      700: "#428a6d",
      800: "#2c5c49",
      900: "#162e24",
      950: "#0b1712"
    },
    yellow: {
      50: "#fafcf1",
      100: "#f6f9e2",
      200: "#ecf2c5",
      300: "#e3eca8",
      400: "#d9e58b",
      500: "#d0df6e",
      600: "#bed337",
      700: "#93a424",
      800: "#626d18",
      900: "#31370c",
      950: "#181b06"
    },
    pink: {
      50: "#fdecf3",
      100: "#fad9e8",
      200: "#f6b2d1",
      300: "#f18cba",
      400: "#ed65a3",
      500: "#e83f8c",
      600: "#d3196e",
      700: "#9e1352",
      800: "#690d37",
      900: "#35061b",
      950: "#1a030e"
    },
    red: {
      50: "#fcefea",
      100: "#faded4",
      200: "#f4bdaa",
      300: "#ef9c7f",
      400: "#e97b55",
      500: "#e45a2a",
      600: "#c04418",
      700: "#903312",
      800: "#60220c",
      900: "#301106",
      950: "#180803"
    },
    green: {
      50: "#f5fae9",
      100: "#ebf4d3",
      200: "#d7eaa8",
      300: "#c3df7c",
      400: "#afd450",
      500: "#96bf2f",
      600: "#789926",
      700: "#5a731c",
      800: "#3c4c13",
      900: "#1e2609",
      950: "#0f1305"
    },
    orange: {
      50: "#fef8ed",
      100: "#fcf1db",
      200: "#f9e3b7",
      300: "#f6d693",
      400: "#f3c86f",
      500: "#f0ba4b",
      600: "#e9a313",
      700: "#ae7a0f",
      800: "#74510a",
      900: "#3a2905",
      950: "#1d1402"
    },
    blue: {
      50: "#eff3fa",
      100: "#dee7f5",
      200: "#bdcfeb",
      300: "#9cb6e2",
      400: "#7b9ed8",
      500: "#5a86ce",
      600: "#3667b7",
      700: "#294d89",
      800: "#1b335b",
      900: "#0e1a2e",
      950: "#070d17"
    },
    accent: {
      primary: "{global.colors.blue.600}",
      secondary: "{global.colors.pink.600}"
    },
    text: {
      default: "{global.colors.charcoal.800}",
      subtle: "{global.colors.neutral.500}",
      warning: "{global.colors.orange.600}",
      error: "{global.colors.red.600}",
      success: "{global.colors.green.600}",
      info: "{global.colors.blue.600}"
    },
    icon: {
      primary: "{global.colors.charcoal.500}",
      warning: "{global.colors.orange.600}",
      error: "{global.colors.red.600}",
      success: "{global.colors.green.600}",
      info: "{global.colors.blue.600}"
    }
  },
  font: {
    size: {
      1: "10px",
      2: "12px",
      3: "14px",
      4: "16px",
      5: "18px",
      6: "20px",
      7: "24px",
      8: "28px",
      9: "32px",
      base: "16px"
    },
    lineHeight: {
      1: "14px",
      2: "16px",
      3: "20px",
      4: "24px",
      5: "28px",
      6: "32px"
    },
    family: {
      title: "Grueber, Arial, sans-serif",
      heading: "Lato, Arial, sans-serif",
      body: "Lato, Arial, sans-serif"
    },
    weight: {
      regular: "400",
      bold: "700"
    }
  }
};

export const alias = {
  color: {
    brand: {
      charcoal: "{global.colors.charcoal.500}",
      white: "{global.colors.neutral.0}",
      blue: "{global.colors.cyan.500}",
      purple: "{global.colors.purple.500}",
      green: "{global.colors.teal.500}",
      yellow: "{global.colors.yellow.500}",
      pink: "{global.colors.pink.500}"
    },
    accent: {
      primary: "{global.colors.blue.500}",
      secondary: "{global.colors.pink.500}"
    },
    status: {
      negative: "{global.colors.red.500}",
      positive: "{global.colors.green.500}",
      caution: "{global.colors.orange.500}",
      info: "{global.colors.blue.500}"
    },
    chart: {
      categorical: {
        1: {
          lighter: "{global.colors.yellow.100}",
          light: "{global.colors.yellow.300}",
          base: "{global.colors.yellow.500}",
          dark: "{global.colors.yellow.700}",
          darker: "{global.colors.yellow.900}",
          hover: "{global.colors.yellow.700}"
        },
        2: {
          lighter: "{global.colors.teal.100}",
          light: "{global.colors.teal.300}",
          base: "{global.colors.teal.500}",
          dark: "{global.colors.teal.700}",
          darker: "{global.colors.teal.900}",
          hover: "{global.colors.teal.700}"
        },
        3: {
          lighter: "{global.colors.cyan.100}",
          light: "{global.colors.cyan.300}",
          base: "{global.colors.cyan.500}",
          dark: "{global.colors.cyan.700}",
          darker: "{global.colors.cyan.900}",
          hover: "{global.colors.cyan.700}"
        },
        4: {
          lighter: "{global.colors.purple.100}",
          light: "{global.colors.purple.300}",
          base: "{global.colors.purple.500}",
          dark: "{global.colors.purple.700}",
          darker: "{global.colors.purple.900}",
          hover: "{global.colors.purple.700}"
        },
        5: {
          lighter: "{global.colors.charcoal.100}",
          light: "{global.colors.charcoal.300}",
          base: "{global.colors.charcoal.500}",
          dark: "{global.colors.charcoal.700}",
          darker: "{global.colors.charcoal.900}",
          hover: "{global.colors.charcoal.700}"
        },
        6: {
          lighter: "{global.colors.blue.100}",
          light: "{global.colors.blue.300}",
          base: "{global.colors.blue.500}",
          dark: "{global.colors.blue.700}",
          darker: "{global.colors.blue.900}",
          hover: "{global.colors.blue.700}"
        }
      }
    },
    text: {
      default: "{global.colors.text.default}",
      link: {
        default: "{global.colors.blue.500}",
        hover: "{global.colors.cyan.700}"
      },
      warning: "{global.colors.text.warning}",
      error: "{global.colors.text.error}",
      success: "{global.colors.text.success}",
      info: "{global.colors.text.info}"
    },
    icon: {
      primary: "{global.colors.icon.primary}",
      success: "{global.colors.icon.success}",
      warning: "{global.colors.icon.warning}",
      error: "{global.colors.icon.error}",
      info: "{global.colors.icon.info}"
    },
    background: "{global.colors.neutral.100}",
    header: "{global.colors.charcoal.500}"
  },
  font: {
    title: {
      xlarge: {
        fontSize: "32px",
        fontWeight: "700",
        lineHeight: "32px",
        fontFamily: "Grueber, Arial, sans-serif"
      },
      large: {
        fontSize: "28px",
        fontWeight: "700",
        lineHeight: "28px",
        fontFamily: "Grueber, Arial, sans-serif"
      },
      medium: {
        fontSize: "24px",
        fontWeight: "700",
        lineHeight: "24px",
        fontFamily: "Grueber, Arial, sans-serif"
      },
      small: {
        fontSize: "20px",
        fontWeight: "700",
        lineHeight: "20px",
        fontFamily: "Grueber, Arial, sans-serif"
      },
      xsmall: {
        fontSize: "16px",
        fontWeight: "700",
        lineHeight: "16px",
        fontFamily: "Grueber, Arial, sans-serif"
      }
    },
    heading: {
      xlarge: {
        fontSize: "32px",
        fontWeight: "700",
        lineHeight: "32px",
        fontFamily: "Lato, Arial, sans-serif"
      },
      large: {
        fontSize: "28px",
        fontWeight: "700",
        lineHeight: "28px",
        fontFamily: "Lato, Arial, sans-serif"
      },
      medium: {
        fontSize: "24px",
        fontWeight: "700",
        lineHeight: "24px",
        fontFamily: "Lato, Arial, sans-serif"
      },
      small: {
        fontSize: "20px",
        fontWeight: "700",
        lineHeight: "20px",
        fontFamily: "Lato, Arial, sans-serif"
      },
      xsmall: {
        fontSize: "16px",
        fontWeight: "700",
        lineHeight: "16px",
        fontFamily: "Lato, Arial, sans-serif"
      }
    },
    body: {
      large: {
        fontSize: "18px",
        fontWeight: "400",
        lineHeight: "28px",
        fontFamily: "Lato, Arial, sans-serif"
      },
      medium: {
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "24px",
        fontFamily: "Lato, Arial, sans-serif"
      },
      small: {
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "20px",
        fontFamily: "Lato, Arial, sans-serif"
      },
      xsmall: {
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "16px",
        fontFamily: "Lato, Arial, sans-serif"
      }
    }
  }
};