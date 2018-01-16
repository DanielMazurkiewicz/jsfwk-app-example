/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1)(window, '$');

const widgetExample = __webpack_require__(2);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//global <-> window

let styleId = 0;
const frameworkFactory = (global, globalName) => {
  const document = global.document;
  const head = document.head;
  const body = document.body;

  const attributeOperations = {
    $class: (element, value) => {
      if (value instanceof Array) {
        value.forEach(className => element.classList.add(className));
      } else {
        element.classList.add(value);
      }
    }
  }
  
  function setPredefinedAttribute(name, operation) {
    attributeOperations[name] = operation;
  }

  function appendChild(child, content) {
    if (!content) content = '@content';
    this.$.c[content].appendChild(child);
  }

  function removeChild(child, content) {
    if (!content) content = '@content';
    this.$.c[content].appendChild(child);
  }

  function setAttribute(name, value) {
    const element = this.$
    const attributesVisible = element.av;
    if (attributesVisible[name]!==undefined){
      element.a[name] = value;
      if (attributesVisible[name]) {
        this.$_sa(name, value);
      }
    } else {
      this.$_sa(name, value);
    }
  }

  function getAttribute(name) {
    const element = this.$
    const attributesVisible = element.av;
    if (attributesVisible[name]!==undefined){
      return element.a[name];
    } else {
      return this.$_ga(name);
    }
  }

  function removeAttribute(name) {
    const element = this.$
    const attributesVisible = element.av;
    if (attributesVisible[name]!==undefined){
      element.a[name] = undefined;
      if (attributesVisible[name]) {
        this.$_ra(name);
      }
    } else {
      this.$_ra(name);
    }
  }


  /*===============================================================*/

  function createElement(tag) {
    let element;
    if (typeof tag === 'function') {
      tag = tag();
    }

    if (tag instanceof HTMLElement || tag instanceof Text) {
      element = tag;
    } else {
      switch (tag) {
        case 'text':
          return document.createTextNode(arguments[1]);
        case 'body':
          element = body;
          break;
        default:
          element = document.createElement(tag);
      }
    }

    const argumentsLength = arguments.length;
    for (let argumentPosition = 1; argumentPosition < argumentsLength; argumentPosition++) {
      let argument = arguments[argumentPosition];

      if (typeof argument === 'function') {
        argument = argument();
      }

      if (typeof argument === 'string') {
        element.appendChild(document.createTextNode(argument));
      } else if (argument instanceof HTMLElement || argument instanceof Text){
        element.appendChild(argument)
      } else if (argument instanceof Array){
        argument.forEach(e => createElement(element, e))
      } else { // assume object?
        for (let attribute in argument) {
          const value = argument[attribute];

          const operation = attributeOperations[attribute];
          if (operation) {
            operation(element, value);
          } else {
            let parentFwk;
            switch (attribute[0]) {
              case '@': //put element/elements to widget placeholder
                if (typeof value === 'function') {
                  value = value(element);
                }
    
                if (value instanceof Array) {
                  value.forEach(contentElement => {
                    if (typeof contentElement === 'function') {
                      contentElement = contentElement(element);
                    }
    
                    if (contentElement instanceof HTMLElement || contentElement instanceof Text) {
                      element.appendChild(contentElement, attribute);
                    } else if (contentElement !== undefined) {
                      element.appendChild(document.createTextNode(contentElement), attribute);
                    }
                  });
                } else if (value instanceof HTMLElement || value instanceof Text) {
                  element.appendChild(value, attribute);
                } else if (value !== undefined) {
                  element.appendChild(document.createTextNode(value), attribute);
                }
                break;

              case '+': //assign placeholder for content
                attribute = '@' + attribute.substr(1); //replace first character

                if (element.$) {
                  parentFwk = element.$;
                } else {
                  element.$ = parentFwk = {};
                }

                if (!parentFwk.content) {
                  parentFwk.content = parentFwk.c = {};
                  element.$_ac = element.appendChild;
                  element.$_rc = element.removeChild;
                  element.appendChild = appendChild;
                  element.removeChild = removeChild;
                }
                parentFwk.content[attribute] = value;
                break;

              case '=': //add new attribute to element
                attribute = attribute.substr(1); //attribute name

                if (element.$) {
                  parentFwk = element.$;
                } else {
                  element.$ = parentFwk = {};
                }

                if (!parentFwk.a) {
                  parentFwk.attributes = parentFwk.a = {};
                  parentFwk.attributesVisible = parentFwk.av = {};                    
                  element.$_sa = element.setAttribute;
                  element.$_ga = element.getAttribute;
                  element.$_ra = element.removeAttribute;
                  element.setAttribute = setAttribute;
                  element.getAttribute = getAttribute;
                  element.removeAttribute = removeAttribute;
                }

                let propertyConstructor;
                if (typeof value === 'function') {
                  propertyConstructor = {set: value}
                } else {
                  propertyConstructor = value;
                }

                if (propertyConstructor.visible) {
                  parentFwk.av[attribute] = true;
                } else {
                  parentFwk.av[attribute] = false;                  
                }

                Object.defineProperty(parentFwk.a, attribute, propertyConstructor);
                break;

              case '&': //set event
                attribute = attribute.substr(1); //event name
                element.addEventListener(attribute, value);

              default:
                element.setAttribute(attribute, value);
            }
          }
        }
      }
    }
    return element;
  }

  const createStyle = (style, selector, media) => {
    let id;
    if (!styleId) {
      id = String.fromCharCode(65);
    } else {
      id = '';
      let idNumeric = styleId;
      while (idNumeric) {
        let rest = idNumeric % 28;
        id += String.fromCharCode(rest + 65);
        idNumeric = (idNumeric / 28) | 0;
      }
    }

    //add style to DOM;
    const css = document.createElement('style');

    if (media) {
      if (selector) {
        css.innerHTML = '@media ' + media + '{.' + id + ' ' + selector + '{' + style + '}}';
      } else {
        css.innerHTML = '@media ' + media + '{.' + id + '{' + style + '}}';
      }
    } else if (selector) {
      css.innerHTML = '.' + id + ' ' + selector + '{' + style + '}';
    } else {
      css.innerHTML = '.' + id + '{' + style + '}';      
    }
    head.appendChild(css);

    styleId++;
    return id;
  }

  createElement.style = createStyle;
  createElement.attribute = setPredefinedAttribute;
  
  if (global && globalName) global[globalName] = createElement;
  return createElement;
}

module.exports = frameworkFactory;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);