export const global = {
  colors: {
    white: "#ffffff",
    black: "#000000",
    neutral: {
      0: "#ffffff",
      50: "#f6f8fb",
      100: "#edf1f6",
      200: "#dce4ee",
      300: "#c5d2e0",
      400: "#adbfd1",
      500: "#93aac1",
      600: "#73889f",
      700: "#566678",
      800: "#394652",
      900: "#1f2a32",
      950: "#0f151b",
      1000: "#000000"
    },
    charcoal: {
      50: "#f7f7f8",
      100: "#ededf0",
      200: "#d9dce1",
      300: "#c0c6cf",
      400: "#9ea8b5",
      500: "#7b8695",
      600: "#5f6977",
      700: "#474f5b",
      800: "#323842",
      900: "#20252d",
      950: "#12161b"
    },
    cyan: {
      50: "#effbfd",
      100: "#d8f5fb",
      200: "#b5ebf8",
      300: "#89ddf3",
      400: "#5bcce9",
      500: "#2fb7dc",
      600: "#1f95bc",
      700: "#177297",
      800: "#0f526f",
      900: "#083547",
      950: "#041a24"
    },
    purple: {
      50: "#f4f2fd",
      100: "#e6e1fc",
      200: "#cdc1f8",
      300: "#ae99f1",
      400: "#8f71e8",
      500: "#7350db",
      600: "#5b3fc0",
      700: "#442f96",
      800: "#30206b",
      900: "#1d1443",
      950: "#0f0a24"
    },
    teal: {
      50: "#eefbf8",
      100: "#d7f6ef",
      200: "#b2ecdf",
      300: "#85dfca",
      400: "#56cfb2",
      500: "#2fbb99",
      600: "#22967b",
      700: "#1a735f",
      800: "#125042",
      900: "#0b312a",
      950: "#041a15"
    },
    yellow: {
      50: "#fff9ec",
      100: "#fff0d2",
      200: "#ffe1a3",
      300: "#ffd16f",
      400: "#ffc142",
      500: "#f2ab1f",
      600: "#c88716",
      700: "#9b6712",
      800: "#6f480d",
      900: "#462c08",
      950: "#241604"
    },
    pink: {
      50: "#fef2f7",
      100: "#fde3ef",
      200: "#fbc5df",
      300: "#f7a0ca",
      400: "#f076b3",
      500: "#e74f9b",
      600: "#c3387e",
      700: "#97295f",
      800: "#6d1c44",
      900: "#44102b",
      950: "#230614"
    },
    red: {
      50: "#fff1ef",
      100: "#ffe1dc",
      200: "#ffc3b8",
      300: "#ff9f8a",
      400: "#f8775c",
      500: "#ea5338",
      600: "#c53b28",
      700: "#9a2d1f",
      800: "#6f2016",
      900: "#45120d",
      950: "#240806"
    },
    green: {
      50: "#f2faef",
      100: "#e1f4d8",
      200: "#c3eab1",
      300: "#9fdc84",
      400: "#77cc5d",
      500: "#52b33d",
      600: "#3f9130",
      700: "#306f25",
      800: "#224e1a",
      900: "#14300f",
      950: "#0a1908"
    },
    orange: {
      50: "#fff5ef",
      100: "#ffe7d8",
      200: "#ffd0b0",
      300: "#ffb384",
      400: "#ff9358",
      500: "#f87433",
      600: "#cf5826",
      700: "#a13f1d",
      800: "#742b15",
      900: "#49180c",
      950: "#260b05"
    },
    blue: {
      50: "#eef4ff",
      100: "#dde9ff",
      200: "#bfd2ff",
      300: "#97b4ff",
      400: "#6f93ff",
      500: "#4f74f0",
      600: "#3d5cd0",
      700: "#2f46a8",
      800: "#22327a",
      900: "#151f4d",
      950: "#0a1028"
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
      title: "Grueber, Lato, Arial, sans-serif",
      heading: "Lato, Arial, sans-serif",
      body: "Lato, Arial, sans-serif"
    },
    weight: {
      regular: "400",
      bold: "700"
    }
  },
  semantic: {
    color: {
      accent: {
        primary: "{global.colors.blue.600}",
        secondary: "{global.colors.pink.600}"
      },
      text: {
        default: "{global.colors.charcoal.800}",
        subtle: "{global.colors.charcoal.500}",
        link: "{global.colors.blue.700}",
        linkHover: "{global.colors.cyan.800}",
        warning: "{global.colors.orange.800}",
        error: "{global.colors.red.700}",
        success: "{global.colors.green.700}",
        info: "{global.colors.blue.600}"
      },
      icon: {
        primary: "{global.colors.charcoal.600}",
        warning: "{global.colors.orange.800}",
        error: "{global.colors.red.700}",
        success: "{global.colors.green.700}",
        info: "{global.colors.blue.600}"
      }
    }
  }
};

export const alias = {
  color: {
    black: "{global.colors.black}",
    white: "{global.colors.white}",
    brand: {
      charcoal: "{global.colors.charcoal.700}",
      blue: "{global.colors.cyan.500}",
      purple: "{global.colors.purple.500}",
      green: "{global.colors.teal.500}",
      yellow: "{global.colors.yellow.500}",
      pink: "{global.colors.pink.500}",
      neutral: "{global.colors.neutral.500}"
    },
    accent: {
      primary: "{global.semantic.color.accent.primary}",
      secondary: "{global.semantic.color.accent.secondary}"
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
      default: "{global.semantic.color.text.default}",
      link: "{global.semantic.color.text.link}",
      linkhover: "{alias.color.text.linkHover}",
      warning: "{global.semantic.color.text.warning}",
      error: "{global.semantic.color.text.error}",
      success: "{global.semantic.color.text.success}",
      info: "{global.semantic.color.text.info}",
      linkHover: "{global.semantic.color.text.linkHover}"
    },
    icon: {
      primary: "{global.semantic.color.icon.primary}",
      success: "{global.semantic.color.icon.success}",
      warning: "{global.semantic.color.icon.warning}",
      error: "{global.semantic.color.icon.error}",
      info: "{global.semantic.color.icon.info}"
    },
    surface: {
      background: "{global.colors.neutral.50}",
      header: "{global.colors.charcoal.500}"
    }
  },
  font: {
    title: {
      xlarge: {
        fontSize: "32px",
        fontWeight: "400",
        lineHeight: "32px",
        fontFamily: "Grueber, Lato, Arial, sans-serif"
      },
      large: {
        fontSize: "28px",
        fontWeight: "400",
        lineHeight: "28px",
        fontFamily: "Grueber, Lato, Arial, sans-serif"
      },
      medium: {
        fontSize: "24px",
        fontWeight: "400",
        lineHeight: "24px",
        fontFamily: "Grueber, Lato, Arial, sans-serif"
      },
      small: {
        fontSize: "20px",
        fontWeight: "400",
        lineHeight: "20px",
        fontFamily: "Grueber, Lato, Arial, sans-serif"
      },
      xsmall: {
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "16px",
        fontFamily: "Grueber, Lato, Arial, sans-serif"
      }
    },
    heading: {
      xlarge: {
        fontSize: "32px",
        fontWeight: "400",
        lineHeight: "32px",
        fontFamily: "Lato, Arial, sans-serif"
      },
      large: {
        fontSize: "28px",
        fontWeight: "400",
        lineHeight: "28px",
        fontFamily: "Lato, Arial, sans-serif"
      },
      medium: {
        fontSize: "24px",
        fontWeight: "400",
        lineHeight: "24px",
        fontFamily: "Lato, Arial, sans-serif"
      },
      small: {
        fontSize: "20px",
        fontWeight: "400",
        lineHeight: "20px",
        fontFamily: "Lato, Arial, sans-serif"
      },
      xsmall: {
        fontSize: "16px",
        fontWeight: "400",
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