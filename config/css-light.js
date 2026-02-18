const config = {
  source: [
    './tokens/global.light.json',
    './tokens/alias.json'
  ],
  platforms: {
    css_light: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'k0-variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: ':root'
          },
        },
        {
          destination: 'k0-variables.light.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: ':root'
          },
        }
      ]
    }
  }
};

export default config;
