require('jsfwk')(window, '$');

const widgetExample = require('./widgetExample');

var testApp = $('div',
  $('h3', 'JS FWK application example'),
  $(widgetExample, {showContent: true},
    {
      '@title': 'Widget title'
    },
    $('div', 'This is automatically added to @content of widget')    
  ),
  $(widgetExample, {showContent: false},
    {
      '@title': ['Second instance ', $('span', 'of widgetExample')]
    },
    $('div', 'That content will be hidden')
  )
);

$('body', testApp)
