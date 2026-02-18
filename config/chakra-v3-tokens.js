import StyleDictionary from 'style-dictionary';

/**
 * Generate chakra specific light theme tokens
 * https://next.chakra-ui.com/guides/theming-customize-dark-mode-colors
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/react/src/theme/semantic-tokens/colors.ts
 */

StyleDictionary.registerFormat({
  name: 'chakra/v3-theme-js',
  format: function ({ dictionary }) {
    const tokens = { colors: {}, fonts: {} };

    const deepAssign = (obj, path, value) => {
      let ref = obj;
      for (let i = 0; i < path.length - 1; i++) {
        const key = isNaN(path[i]) ? path[i] : Number(path[i]);
        if (!ref[key]) ref[key] = {};
        ref = ref[key];
      }
      const lastKey = isNaN(path[path.length - 1]) ? path[path.length - 1] : Number(path[path.length - 1]);
      ref[lastKey] = value;
    };

    const resolveReference = (value) => {
      if (typeof value === 'string' && value.startsWith('{')) {
        const refPath = value.replace(/[{}]/g, '').split('.');
        const refToken = dictionary.getToken(refPath);
        return refToken?.value || value;
      }
      return { value };
    };

    const toJS = (obj, indent = 2) => {
      return JSON.stringify(obj, (key, value) => value, indent)
        .replace(/"(\d+)":/g, '$1:')
        .replace(/"([^\"]+)":/g, (_, k) => /^[a-zA-Z_$][\w$]*$/.test(k) ? `${k}:` : `'${k}':`);
    };

    dictionary.allTokens.forEach(token => {
      const { path, $value, $type, original } = token;
      const rawValue = token.value || $value;
      const resolvedValue = resolveReference(rawValue);

      if (path[0] === 'global') {
        if (path[1] === 'colors') {
          deepAssign(tokens.colors, path.slice(2), resolvedValue);
        }
        if (path[1] === 'font') {
          if (path[2] === 'family') deepAssign(tokens.fonts, [path[3]], resolvedValue);
        }        
      } 
    });

    return [
      `export const tokens = ${toJS(tokens)};`
    ].join('\n\n');
  }
});

const config = {
  source: [
    './tokens/global.light.json'
  ],
  platforms: {
    chakra_v3_light: {
      transformGroup: 'js',
      buildPath: 'build/chakra-v3/',
      files: [
        {
          destination: 'chakra-v3-tokens.js',
          format: 'chakra/v3-theme-js'
        }
      ]
    }
  }
};

export default config;
