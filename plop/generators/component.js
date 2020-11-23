const { inputRequired } = require('./utils');

module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is component name?',
        validate: inputRequired('Component name')
      },
      {
        type: 'confirm',
        name: 'needJs',
        message: 'Should I create a JavaScript file?',
        default: false
      }
    ],
    actions: function (data) {
      const actions = [
        {
          type: 'add',
          path: 'src/app/components/{{ dashCase componentName }}/_{{ dashCase componentName }}.pug',
          templateFile: '../templates/component/_component.pug',
          skipIfExists: true
        },
        {
          type: 'add',
          path: 'src/app/components/{{ dashCase componentName }}/_{{ dashCase componentName }}.scss',
          templateFile: '../templates/component/_component.scss',
          skipIfExists: true
        },
        {
          type: 'modify',
          path: 'src/app/_app.scss',
          pattern: /(\/\/ App components)/g,
          template: "$1\n@import \"./components/{{ dashCase componentName }}/{{ dashCase componentName }}\";"
        }
      ];

      if(data.needJs) {
        actions.push(
            {
              type: 'add',
              path: 'src/app/components/{{ dashCase componentName }}/_{{ dashCase componentName }}.js',
              templateFile: '../templates/component/_component.js',
              skipIfExists: true
            },
            {
              type: 'modify',
              path: 'src/app/app.js',
              pattern: /(\/\/ Components)/g,
              template: "$1\n//=include ./components/{{ dashCase componentName }}/_{{ dashCase componentName }}.js"
            }
        );
      }

      return actions
    }
  });
};
