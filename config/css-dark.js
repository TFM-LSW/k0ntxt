const config = {
  source: [
    './tokens/global.dark.json',
    './tokens/alias.json'
  ],
  platforms: {
    css_dark: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'k0-variables.dark.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: '[data-theme="dark"]'
          },
        }
      ]
    }
  }
};

export default config;
