const { inputRequired } = require('./utils');

module.exports = plop => {
  plop.setGenerator('screen', {
    description: 'Create a new screen component',
    prompts: [
      {
        type: 'input',
        name: 'screenName',
        message: 'What is screen name?',
        validate: inputRequired('Screen name')
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
          path: 'src/app/screens/{{ dashCase screenName }}/_{{ dashCase screenName }}.pug',
          templateFile: '../templates/screen/_screen.pug',
          skipIfExists: true
        },
        {
          type: 'add',
          path: 'src/app/screens/{{ dashCase screenName }}/_{{ dashCase screenName }}.scss',
          templateFile: '../templates/screen/_screen.scss',
          skipIfExists: true
        },
        {
          type: 'modify',
          path: 'src/app/index.pug',
          pattern: /(\/\/ Screens)/g,
          template: "$1\r\n    include ./screens/{{ dashCase screenName }}/_{{ dashCase screenName }}"
        },
        {
          type: 'modify',
          path: 'src/app/_app.scss',
          pattern: /(\/\/ App screens)/g,
          template: "$1\n@import \"./screens/{{ dashCase screenName }}/{{ dashCase screenName }}\";"
        }
      ];

      if (data.needJs) {
        actions.push(
          {
            type: 'add',
            path: 'src/app/screens/{{ dashCase screenName }}/_{{ dashCase screenName }}.js',
            templateFile: '../templates/screen/_screen.js',
            skipIfExists: true
          },
          {
            type: 'modify',
            path: 'src/app/app.js',
            pattern: /(\/\/ Screens)/g,
            template: "$1\n//=include ./screens/{{ dashCase screenName }}/_{{ dashCase screenName }}.js"
          }
        );
      }

      return actions
    }
  });
};
