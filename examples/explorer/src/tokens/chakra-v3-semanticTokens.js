export const semanticTokens = {
  colors: {
    bg: {
      DEFAULT: {
        value: {
          _light: "{colors.charcoal.50}",
          _dark: "{colors.charcoal.950}"
        }
      },
      subtle: {
        value: {
          _light: "{colors.charcoal.100}",
          _dark: "{colors.charcoal.900}"
        }
      },
      muted: {
        value: {
          _light: "{colors.charcoal.200}",
          _dark: "{colors.charcoal.800}"
        }
      },
      emphasized: {
        value: {
          _light: "{colors.charcoal.300}",
          _dark: "{colors.charcoal.700}"
        }
      },
      panel: {
        value: {
          _light: "{colors.charcoal.0}",
          _dark: "{colors.charcoal.950}"
        }
      }
    },
    fg: {
      DEFAULT: {
        value: {
          _light: "{colors.charcoal.950}",
          _dark: "{colors.charcoal.50}"
        }
      },
      muted: {
        value: {
          _light: "{colors.charcoal.600}",
          _dark: "{colors.charcoal.400}"
        }
      },
      subtle: {
        value: {
          _light: "{colors.charcoal.400}",
          _dark: "{colors.charcoal.500}"
        }
      }
    },
    border: {
      DEFAULT: {
        value: {
          _light: "{colors.charcoal.200}",
          _dark: "{colors.charcoal.800}"
        }
      },
      muted: {
        value: {
          _light: "{colors.charcoal.100}",
          _dark: "{colors.charcoal.900}"
        }
      },
      subtle: {
        value: {
          _light: "{colors.charcoal.50}",
          _dark: "{colors.charcoal.950}"
        }
      },
      emphasized: {
        value: {
          _light: "{colors.charcoal.300}",
          _dark: "{colors.charcoal.700}"
        }
      }
    },
    accent: {
      primary: {
        solid: {
          value: "{colors.accent.primary}"
        },
        contrast: {
          value: {
            _light: "{global.{colors.accent.primary}.900}",
            _dark: "{global.{colors.accent.primary}.100}"
          }
        },
        fg: {
          value: {
            _light: "{global.{colors.accent.primary}.700}",
            _dark: "{global.{colors.accent.primary}.300}"
          }
        },
        muted: {
          value: {
            _light: "{global.{colors.accent.primary}.100}",
            _dark: "{global.{colors.accent.primary}.900}"
          }
        },
        subtle: {
          value: {
            _light: "{global.{colors.accent.primary}.200}",
            _dark: "{global.{colors.accent.primary}.800}"
          }
        },
        emphasized: {
          value: {
            _light: "{global.{colors.accent.primary}.300}",
            _dark: "{global.{colors.accent.primary}.700}"
          }
        },
        focusRing: {
          value: {
            _light: "{global.{colors.accent.primary}.600}",
            _dark: "{global.{colors.accent.primary}.600}"
          }
        }
      },
      secondary: {
        solid: {
          value: "{colors.accent.secondary}"
        },
        contrast: {
          value: {
            _light: "{global.{colors.accent.secondary}.900}",
            _dark: "{global.{colors.accent.secondary}.100}"
          }
        },
        fg: {
          value: {
            _light: "{global.{colors.accent.secondary}.700}",
            _dark: "{global.{colors.accent.secondary}.300}"
          }
        },
        muted: {
          value: {
            _light: "{global.{colors.accent.secondary}.100}",
            _dark: "{global.{colors.accent.secondary}.900}"
          }
        },
        subtle: {
          value: {
            _light: "{global.{colors.accent.secondary}.200}",
            _dark: "{global.{colors.accent.secondary}.800}"
          }
        },
        emphasized: {
          value: {
            _light: "{global.{colors.accent.secondary}.300}",
            _dark: "{global.{colors.accent.secondary}.700}"
          }
        },
        focusRing: {
          value: {
            _light: "{global.{colors.accent.secondary}.600}",
            _dark: "{global.{colors.accent.secondary}.600}"
          }
        }
      }
    },
    brand: {
      charcoal: {
        value: "{colors.charcoal.500}"
      },
      white: {
        value: "{colors.neutral.0}"
      },
      blue: {
        value: "{colors.cyan.500}"
      },
      purple: {
        value: "{colors.purple.500}"
      },
      green: {
        value: "{colors.teal.500}"
      },
      yellow: {
        value: "{colors.yellow.500}"
      },
      pink: {
        value: "{colors.pink.500}"
      }
    },
    status: {
      negative: {
        solid: {
          value: "{colors.red.500}"
        },
        contrast: {
          value: {
            _light: "{global.{colors.red.500}.900}",
            _dark: "{global.{colors.red.500}.100}"
          }
        },
        fg: {
          value: {
            _light: "{global.{colors.red.500}.700}",
            _dark: "{global.{colors.red.500}.300}"
          }
        },
        muted: {
          value: {
            _light: "{global.{colors.red.500}.100}",
            _dark: "{global.{colors.red.500}.900}"
          }
        },
        subtle: {
          value: {
            _light: "{global.{colors.red.500}.200}",
            _dark: "{global.{colors.red.500}.800}"
          }
        },
        emphasized: {
          value: {
            _light: "{global.{colors.red.500}.300}",
            _dark: "{global.{colors.red.500}.700}"
          }
        },
        focusRing: {
          value: {
            _light: "{global.{colors.red.500}.600}",
            _dark: "{global.{colors.red.500}.600}"
          }
        }
      },
      positive: {
        solid: {
          value: "{colors.green.500}"
        },
        contrast: {
          value: {
            _light: "{global.{colors.green.500}.900}",
            _dark: "{global.{colors.green.500}.100}"
          }
        },
        fg: {
          value: {
            _light: "{global.{colors.green.500}.700}",
            _dark: "{global.{colors.green.500}.300}"
          }
        },
        muted: {
          value: {
            _light: "{global.{colors.green.500}.100}",
            _dark: "{global.{colors.green.500}.900}"
          }
        },
        subtle: {
          value: {
            _light: "{global.{colors.green.500}.200}",
            _dark: "{global.{colors.green.500}.800}"
          }
        },
        emphasized: {
          value: {
            _light: "{global.{colors.green.500}.300}",
            _dark: "{global.{colors.green.500}.700}"
          }
        },
        focusRing: {
          value: {
            _light: "{global.{colors.green.500}.600}",
            _dark: "{global.{colors.green.500}.600}"
          }
        }
      },
      caution: {
        solid: {
          value: "{colors.orange.500}"
        },
        contrast: {
          value: {
            _light: "{global.{colors.orange.500}.900}",
            _dark: "{global.{colors.orange.500}.100}"
          }
        },
        fg: {
          value: {
            _light: "{global.{colors.orange.500}.700}",
            _dark: "{global.{colors.orange.500}.300}"
          }
        },
        muted: {
          value: {
            _light: "{global.{colors.orange.500}.100}",
            _dark: "{global.{colors.orange.500}.900}"
          }
        },
        subtle: {
          value: {
            _light: "{global.{colors.orange.500}.200}",
            _dark: "{global.{colors.orange.500}.800}"
          }
        },
        emphasized: {
          value: {
            _light: "{global.{colors.orange.500}.300}",
            _dark: "{global.{colors.orange.500}.700}"
          }
        },
        focusRing: {
          value: {
            _light: "{global.{colors.orange.500}.600}",
            _dark: "{global.{colors.orange.500}.600}"
          }
        }
      },
      info: {
        solid: {
          value: "{colors.blue.500}"
        },
        contrast: {
          value: {
            _light: "{global.{colors.blue.500}.900}",
            _dark: "{global.{colors.blue.500}.100}"
          }
        },
        fg: {
          value: {
            _light: "{global.{colors.blue.500}.700}",
            _dark: "{global.{colors.blue.500}.300}"
          }
        },
        muted: {
          value: {
            _light: "{global.{colors.blue.500}.100}",
            _dark: "{global.{colors.blue.500}.900}"
          }
        },
        subtle: {
          value: {
            _light: "{global.{colors.blue.500}.200}",
            _dark: "{global.{colors.blue.500}.800}"
          }
        },
        emphasized: {
          value: {
            _light: "{global.{colors.blue.500}.300}",
            _dark: "{global.{colors.blue.500}.700}"
          }
        },
        focusRing: {
          value: {
            _light: "{global.{colors.blue.500}.600}",
            _dark: "{global.{colors.blue.500}.600}"
          }
        }
      }
    },
    chart: {
      categorical: {
        1: {
          lighter: {
            value: "{colors.yellow.100}"
          },
          light: {
            value: "{colors.yellow.300}"
          },
          base: {
            value: "{colors.yellow.500}"
          },
          dark: {
            value: "{colors.yellow.700}"
          },
          darker: {
            value: "{colors.yellow.900}"
          },
          hover: {
            value: "{colors.yellow.700}"
          }
        },
        2: {
          lighter: {
            value: "{colors.teal.100}"
          },
          light: {
            value: "{colors.teal.300}"
          },
          base: {
            value: "{colors.teal.500}"
          },
          dark: {
            value: "{colors.teal.700}"
          },
          darker: {
            value: "{colors.teal.900}"
          },
          hover: {
            value: "{colors.teal.700}"
          }
        },
        3: {
          lighter: {
            value: "{colors.cyan.100}"
          },
          light: {
            value: "{colors.cyan.300}"
          },
          base: {
            value: "{colors.cyan.500}"
          },
          dark: {
            value: "{colors.cyan.700}"
          },
          darker: {
            value: "{colors.cyan.900}"
          },
          hover: {
            value: "{colors.cyan.700}"
          }
        },
        4: {
          lighter: {
            value: "{colors.purple.100}"
          },
          light: {
            value: "{colors.purple.300}"
          },
          base: {
            value: "{colors.purple.500}"
          },
          dark: {
            value: "{colors.purple.700}"
          },
          darker: {
            value: "{colors.purple.900}"
          },
          hover: {
            value: "{colors.purple.700}"
          }
        },
        5: {
          lighter: {
            value: "{colors.charcoal.100}"
          },
          light: {
            value: "{colors.charcoal.300}"
          },
          base: {
            value: "{colors.charcoal.500}"
          },
          dark: {
            value: "{colors.charcoal.700}"
          },
          darker: {
            value: "{colors.charcoal.900}"
          },
          hover: {
            value: "{colors.charcoal.700}"
          }
        },
        6: {
          lighter: {
            value: "{colors.blue.100}"
          },
          light: {
            value: "{colors.blue.300}"
          },
          base: {
            value: "{colors.blue.500}"
          },
          dark: {
            value: "{colors.blue.700}"
          },
          darker: {
            value: "{colors.blue.900}"
          },
          hover: {
            value: "{colors.blue.700}"
          }
        }
      }
    },
    text: {
      default: {
        value: "{colors.text.default}"
      },
      link: {
        default: {
          value: "{colors.blue.500}"
        },
        hover: {
          value: "{colors.cyan.700}"
        }
      },
      warning: {
        value: "{colors.text.warning}"
      },
      error: {
        value: "{colors.text.error}"
      },
      success: {
        value: "{colors.text.success}"
      },
      info: {
        value: "{colors.text.info}"
      }
    },
    icon: {
      primary: {
        value: "{colors.icon.primary}"
      },
      success: {
        value: "{colors.icon.success}"
      },
      warning: {
        value: "{colors.icon.warning}"
      },
      error: {
        value: "{colors.icon.error}"
      },
      info: {
        value: "{colors.icon.info}"
      }
    },
    surface: {
      background: {
        value: "{colors.neutral.100}"
      },
      header: {
        value: "{colors.charcoal.500}"
      }
    }
  }
};