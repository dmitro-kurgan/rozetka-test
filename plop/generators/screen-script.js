const { inputRequired } = require('./utils');

module.exports = plop => {
  plop.setGenerator('screen:js', {
    description: 'Create a JavaScript file for a screen',
    prompts: [
      {
        type: 'input',
        name: 'screenName',
        message: 'For what screen?',
        validate: inputRequired('Screen name for that you are creating a JavaScript file')
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/screens/{{ dashCase screenName }}/_{{ dashCase screenName }}.js',
        templateFile: '../templates/screen/_screen.js',
        skipIfExists: true
      }
    ]
  });
};
