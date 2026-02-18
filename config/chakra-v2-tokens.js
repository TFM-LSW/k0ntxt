import StyleDictionary from "style-dictionary";

StyleDictionary.registerFormat({
  name: 'chakra/v2-theme-js',
  format: function ({ dictionary }) {
    const theme = {
      colors: {},
      fonts: {},
      fontSizes: {},
      fontWeights: {},
      lineHeights: {},
      textStyles: {},
    };

    const deepAssign = (obj, path, value) => {
      let ref = obj;
      for (let i = 0; i < path.length - 1; i++) {
        const part = path[i];
        if (!ref[part]) ref[part] = {};
        ref = ref[part];
      }
      ref[path[path.length - 1]] = value;
    };

    const resolveValue = (val) => {
      if (typeof val === 'string' && val.startsWith('{')) {
        const refPath = val.replace(/[{}]/g, '').split('.');
        const refToken = dictionary.getToken(refPath);
        return refToken?.value || val;
      }
      return val;
    };

    dictionary.allTokens.forEach(token => {
      const { path } = token;
      const rawValue = token.$value || token.value;
      const resolved = resolveValue(rawValue);

      // COLORS
      if (path[0] === 'global' && path[1] === 'colors') {
        deepAssign(theme.colors, path.slice(2), resolved);
      }

      // FONT FAMILY
      if (path[0] === 'global' && path[1] === 'font' && path[2] === 'family') {
        theme.fonts[path[3]] = resolved;
      }

      // FONT SIZE
      if (path[0] === 'global' && path[1] === 'font' && path[2] === 'size') {
        theme.fontSizes[path[3]] = resolved;
      }

      // FONT WEIGHT
      if (path[0] === 'global' && path[1] === 'font' && path[2] === 'weight') {
        theme.fontWeights[path[3]] = resolved;
      }

      // LINE HEIGHT
      if (path[0] === 'global' && path[1] === 'font' && path[2] === 'lineHeight') {
        theme.lineHeights[path[3]] = resolved;
      }

      // TEXT STYLES from alias.font.*
      if (path[0] === 'alias' && path[1] === 'font') {
        const key = path.slice(2).join('.');
        const styleObj = token.$value || token.value;
        if (styleObj && typeof styleObj === 'object' && !Array.isArray(styleObj)) {
          const resolvedStyle = {};
          Object.entries(styleObj).forEach(([k, v]) => {
            resolvedStyle[k] = resolveValue(v);
          });
          theme.textStyles[key] = resolvedStyle;
        }
      }
    });

    return `export const theme = ${JSON.stringify(theme, null, 2)};`;
  }
});



const config = {
  source: ["./tokens/global.light.json", "./tokens/alias.json"],
  platforms: {
    chakra_v2_light: {
      transformGroup: "js",
      buildPath: "build/chakra-v2/",
      files: [
        {
          destination: "chakra-v2-theme.js",
          format: "chakra/v2-theme-js",
        },
      ],
    },
  },
};

export default config;
