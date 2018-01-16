const widgetStyle = $.style(`
  margin: 5px;
  padding: 5px;
  width: 20%;
  border: 1px solid darkblue;
`);

const blueStyle = $.style(`
  color: blue;
`);

const greenStyle = $.style(`
  color: green;
`);

module.exports = (parent, parentNode) => {
  let content, title, btnPlusOne;
  let counterElement, counter = 0;

  //Widget HTML/DOM code
  let main = $('div', {$class: widgetStyle}, 
    title = $('div', {$class: blueStyle}),
    content = $('div', {$class: greenStyle}),
    $('text', 'Counter value:'), ' ', counterElement = $('text', counter), $('br'),
    btnPlusOne = $('button', '+1')
  );

  //internal widget methods
  const plusOne = (evt) => {
    counterElement.data = ++counter;
  }

  //bind content elements
  $(main, {
      '+title': title,
      '+content': content
  });

  //bind custom attributes
  $(main, {
    '=showContent': {
      set: value => {
        content.style.display = value ? '' : 'none';
      },
      get: () => {
        return content.style.display;
      },
      visible: true
    }
  });

  //bind events
  $(btnPlusOne, {
    '&click': plusOne
  });

  return main;
}
