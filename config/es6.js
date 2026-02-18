import StyleDictionary from 'style-dictionary';

StyleDictionary.registerFormat({
  name: 'es6/module-flat',
  format: function ({ dictionary }) {
    const toJS = (obj, indent = 2) =>
      JSON.stringify(obj, null, indent)
        .replace(/"(\d+)":/g, '$1:') // Preserve numeric keys
        .replace(/"([a-zA-Z0-9_$]+)":/g, '$1:'); // Preserve valid JS identifiers

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

    const grouped = {};

    dictionary.allTokens.forEach(token => {
      const [group, ...rest] = token.path;
      if (!grouped[group]) grouped[group] = {};

      // Check if the token references another token
      const value = token.original?.$value || token.value;
      if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
        // Preserve the reference as dot notation
        const referencePath = value.slice(1, -1); // Remove curly braces
        deepAssign(grouped[group], rest, value);
      } else {
        // Assign the actual value for non-references
        deepAssign(grouped[group], rest, token.value ?? token.$value);
      }
    });

    return Object.entries(grouped).map(
      ([groupName, groupValue]) => `export const ${groupName} = ${toJS(groupValue)};`
    ).join('\n\n');
  }
});

const config = {
  source: ["./tokens/global.light.json", "./tokens/alias.json"],
  platforms: {
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      files: [
        {
          destination: 'k0-tokens.js',
          format: 'es6/module-flat'
        }
      ]
    }
  }
};

export default config;
