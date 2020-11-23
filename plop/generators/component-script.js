const { inputRequired } = require('./utils');

module.exports = plop => {
  plop.setGenerator('component:js', {
    description: 'Create a JavaScript file for a component',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'For what component?',
        validate: inputRequired('Component name for that you are creating a JavaScript file')
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/components/{{ dashCase componentName }}/_{{ dashCase componentName }}.js',
        templateFile: '../templates/component/_component.js',
        skipIfExists: true
      }
    ]
  });
};
