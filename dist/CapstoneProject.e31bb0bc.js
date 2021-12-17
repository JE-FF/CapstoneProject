// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/flatted/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringify = exports.parse = exports.default = void 0;

var Flatted = function (Primitive, primitive) {
  /*!
   * ISC License
   *
   * Copyright (c) 2018, Andrea Giammarchi, @WebReflection
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
   * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
   * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
   * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
   * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
   * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
   * PERFORMANCE OF THIS SOFTWARE.
   */
  var Flatted = {
    parse: function parse(text, reviver) {
      var input = JSON.parse(text, Primitives).map(primitives);
      var value = input[0];
      var $ = reviver || noop;
      var tmp = typeof value === 'object' && value ? revive(input, new Set(), value, $) : value;
      return $.call({
        '': tmp
      }, '', tmp);
    },
    stringify: function stringify(value, replacer, space) {
      for (var firstRun, known = new Map(), input = [], output = [], $ = replacer && typeof replacer === typeof input ? function (k, v) {
        if (k === '' || -1 < replacer.indexOf(k)) return v;
      } : replacer || noop, i = +set(known, input, $.call({
        '': value
      }, '', value)), replace = function (key, value) {
        if (firstRun) {
          firstRun = !firstRun;
          return value;
        }

        var after = $.call(this, key, value);

        switch (typeof after) {
          case 'object':
            if (after === null) return after;

          case primitive:
            return known.get(after) || set(known, input, after);
        }

        return after;
      }; i < input.length; i++) {
        firstRun = true;
        output[i] = JSON.stringify(input[i], replace, space);
      }

      return '[' + output.join(',') + ']';
    }
  };
  return Flatted;

  function noop(key, value) {
    return value;
  }

  function revive(input, parsed, output, $) {
    return Object.keys(output).reduce(function (output, key) {
      var value = output[key];

      if (value instanceof Primitive) {
        var tmp = input[value];

        if (typeof tmp === 'object' && !parsed.has(tmp)) {
          parsed.add(tmp);
          output[key] = $.call(output, key, revive(input, parsed, tmp, $));
        } else {
          output[key] = $.call(output, key, tmp);
        }
      } else output[key] = $.call(output, key, value);

      return output;
    }, output);
  }

  function set(known, input, value) {
    var index = Primitive(input.push(value) - 1);
    known.set(value, index);
    return index;
  } // the two kinds of primitives
  //  1. the real one
  //  2. the wrapped one


  function primitives(value) {
    return value instanceof Primitive ? Primitive(value) : value;
  }

  function Primitives(key, value) {
    return typeof value === primitive ? new Primitive(value) : value;
  }
}(String, 'string');

var _default = Flatted;
exports.default = _default;
var parse = Flatted.parse;
exports.parse = parse;
var stringify = Flatted.stringify;
exports.stringify = stringify;
},{}],"node_modules/strip-indent/index.js":[function(require,module,exports) {
'use strict';

module.exports = str => {
  const match = str.match(/^[ \t]*(?=\S)/gm);

  if (!match) {
    return str;
  } // TODO: use spread operator when targeting Node.js 6


  const indent = Math.min.apply(Math, match.map(x => x.length)); // eslint-disable-line

  const re = new RegExp("^[ \\t]{".concat(indent, "}"), 'gm');
  return indent > 0 ? str.replace(re, '') : str;
};
},{}],"node_modules/html-literal/build/src/index.js":[function(require,module,exports) {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var flatted_1 = require("flatted");
var strip_indent_1 = __importDefault(require("strip-indent"));
// html tag function, accepts simple values, arrays, promises
function html(template) {
    var expressions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        expressions[_i - 1] = arguments[_i];
    }
    var result = "";
    var i = 0;
    // resolve each expression and build the result string
    for (var _a = 0, template_1 = template; _a < template_1.length; _a++) {
        var part = template_1[_a];
        var expression = expressions[i++ - 1]; // this might be an array
        var resolvedExpression = resolveExpression(expression);
        result += "" + resolvedExpression + part;
    }
    // strip indentation and trim the result
    return strip_indent_1.default(result).trim();
}
exports.default = html;
// returns whether given value is likely a promise
// tslint:disable-next-line:no-any
function isPromise(p) {
    return p !== undefined && p !== null && typeof p === "object" && typeof p.then === "function";
}
// resolves a concatenatable expression to a string (async)
function resolveExpression(expression) {
    // return empty string for undefined
    if (expression === undefined) {
        return "";
    }
    // return placeholder for promise
    if (isPromise(expression)) {
        // recursively resolve
        return "[promise]";
    }
    // return placeholder for function
    if (typeof expression === "function") {
        return "[function]";
    }
    // handle arrays
    if (Array.isArray(expression)) {
        var items = [];
        // resolve each item (might be promises as well)
        for (var _i = 0, expression_1 = expression; _i < expression_1.length; _i++) {
            var expressionItem = expression_1[_i];
            items.push(resolveExpression(expressionItem));
        }
        // join with newline
        return items.join("\n");
    }
    // return unmodified if got a string
    if (typeof expression === "string") {
        return expression;
    }
    // convert to string if got a number
    if (typeof expression === "number") {
        return expression.toString();
    }
    // return stringified value, handles circular references
    return flatted_1.stringify(expression, undefined, 2);
}

},{"flatted":"node_modules/flatted/esm/index.js","strip-indent":"node_modules/strip-indent/index.js"}],"store/Links.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  title: "Home",
  text: "Home"
}, {
  title: "About",
  text: "About"
}, {
  title: "Contacts",
  text: "Contacts"
}, {
  title: "Events",
  text: "Events"
}];
exports.default = _default;
},{}],"components/Nav.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _htmlLiteral = _interopRequireDefault(require("html-literal"));

var _Links = _interopRequireDefault(require("/store/Links"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = function _default() {
  return (0, _htmlLiteral.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    <nav>\n        <!-- <a href=\"./index.html\">Home</a>\n        <a href=\"./about.html\">About</a>\n        <a href=\"./contact.html\">Contact</a>\n        <a href=\"./events.html\">Events</a> -->\n        ", "\n    </nav>\n"])), _Links.default.map(function (i) {
    return "<a href=\"/".concat(i.title, "\"><li>").concat(i.text, "</li></a>");
  }));
};

exports.default = _default;
},{"html-literal":"node_modules/html-literal/build/src/index.js","/store/Links":"store/Links.js"}],"assets/img/soildarityLogo.png":[function(require,module,exports) {
module.exports = "/soildarityLogo.cc00e296.png";
},{}],"assets/img/spade.svg":[function(require,module,exports) {
module.exports = "/spade.624e54e4.svg";
},{}],"assets/img/hoe.svg":[function(require,module,exports) {
module.exports = "/hoe.76dead83.svg";
},{}],"components/Header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _htmlLiteral = _interopRequireDefault(require("html-literal"));

var _Nav = _interopRequireDefault(require("./Nav"));

var _soildarityLogo = _interopRequireDefault(require("/assets/img/soildarityLogo.png"));

var _spade = _interopRequireDefault(require("/assets/img/spade.svg"));

var _hoe = _interopRequireDefault(require("/assets/img/hoe.svg"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = function _default(st) {
  return (0, _htmlLiteral.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  <header>\n        <img id=\"logo\" width=\"100px\" height=\"auto\" src=\"", "\" />\n        \n        <!-- header title with inline spade and shovel images -->\n        <h1 class=\"headerTitle\">\n            <img style=\"transform: rotate(45deg);\" width=\"auto\" height=\"50px\" src=\"", "\"/>\n            Soildarity", "\n            <img style=\"transform: rotate(-45deg);\" width=\"auto\" height=\"50px\" src=\"", "\"/>\n        </h1>\n\n        ", "\n\n    </header>\n"])), _soildarityLogo.default, _spade.default, st.header, _hoe.default, (0, _Nav.default)());
};

exports.default = _default;
},{"html-literal":"node_modules/html-literal/build/src/index.js","./Nav":"components/Nav.js","/assets/img/soildarityLogo.png":"assets/img/soildarityLogo.png","/assets/img/spade.svg":"assets/img/spade.svg","/assets/img/hoe.svg":"assets/img/hoe.svg"}],"assets/img/wsnaccad-Shark.svg":[function(require,module,exports) {
module.exports = "/wsnaccad-Shark.6df34d23.svg";
},{}],"components/views/Home.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _htmlLiteral = _interopRequireDefault(require("html-literal"));

var _wsnaccadShark = _interopRequireDefault(require("/assets/img/wsnaccad-Shark.svg"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = function _default() {
  return (0, _htmlLiteral.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  <div id=\"shark\">\n    <img src=\"", "\" />\n  </div>\n"])), _wsnaccadShark.default);
};

exports.default = _default;
},{"html-literal":"node_modules/html-literal/build/src/index.js","/assets/img/wsnaccad-Shark.svg":"assets/img/wsnaccad-Shark.svg"}],"components/views/Events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _htmlLiteral = _interopRequireDefault(require("html-literal"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = function _default() {
  return (0, _htmlLiteral.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  <section id=\"events\">\n    <p>EVENTS INFORMATION</p>\n  </section>\n"])));
};

exports.default = _default;
},{"html-literal":"node_modules/html-literal/build/src/index.js"}],"components/views/Contact.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _htmlLiteral = _interopRequireDefault(require("html-literal"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = function _default() {
  return (0, _htmlLiteral.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  <form action=\"\" method=\"POST\">\n    <label for=\"name\">Name:</label>\n    <input type=\"text\" name=\"name\" id=\"name\" placeholder=\"Full Name\" /><br />\n\n    <label for=\"email\">Email:</label>\n    <input\n      type=\"email\"\n      name=\"email\"\n      id=\"email\"\n      placeholder=\"example@gmail.com\"\n    /><br />\n    <div>\n      <label for=\"msg\"></label>\n      <textarea\n        name=\"msg\"\n        id=\"msg\"\n        placeholder=\"Please, enter your message here.\"\n        cols=\"50\"\n        rows=\"10\"\n      ></textarea>\n    </div>\n\n    <input type=\"submit\" value=\"Submit\" />\n  </form>\n"])));
};

exports.default = _default;
},{"html-literal":"node_modules/html-literal/build/src/index.js"}],"components/views/About.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _htmlLiteral = _interopRequireDefault(require("html-literal"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = function _default() {
  return (0, _htmlLiteral.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  <section id=\"bio\">\n    <p>ABOUT US INFORMATION</p>\n  </section>\n"])));
};

exports.default = _default;
},{"html-literal":"node_modules/html-literal/build/src/index.js"}],"components/views/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "About", {
  enumerable: true,
  get: function () {
    return _About.default;
  }
});
Object.defineProperty(exports, "Contact", {
  enumerable: true,
  get: function () {
    return _Contact.default;
  }
});
Object.defineProperty(exports, "Events", {
  enumerable: true,
  get: function () {
    return _Events.default;
  }
});
Object.defineProperty(exports, "Home", {
  enumerable: true,
  get: function () {
    return _Home.default;
  }
});

var _Home = _interopRequireDefault(require("./Home"));

var _Events = _interopRequireDefault(require("./Events"));

var _Contact = _interopRequireDefault(require("./Contact"));

var _About = _interopRequireDefault(require("./About"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Home":"components/views/Home.js","./Events":"components/views/Events.js","./Contact":"components/views/Contact.js","./About":"components/views/About.js"}],"components/Main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _htmlLiteral = _interopRequireDefault(require("html-literal"));

var views = _interopRequireWildcard(require("./views"));

var _templateObject;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = function _default() {
  return (0, _htmlLiteral.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  <main>\n    <div class=\"gardenList\">\n      <p>LIST OF GARDENS GOES HERE.</p>\n    </div>\n\n    <!-- THIS PROBABLY WONT WORK, FIX IT. -->\n    <div class=\"centerContainer\">\n      ", "\n    </div>\n\n    <div class=\"events\">\n      <p>LIST OF UPCOMING EVENTS</p>\n    </div>\n  </main>\n"])), views.Home());
};

exports.default = _default;
},{"html-literal":"node_modules/html-literal/build/src/index.js","./views":"components/views/index.js"}],"components/Footer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _htmlLiteral = _interopRequireDefault(require("html-literal"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = function _default() {
  return (0, _htmlLiteral.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  <footer>\n    &copy; 2021 <a href=\"https://savvycoders.com/\">Savvy Coders</a>\n  </footer>\n"])));
};

exports.default = _default;
},{"html-literal":"node_modules/html-literal/build/src/index.js"}],"components/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Footer", {
  enumerable: true,
  get: function () {
    return _Footer.default;
  }
});
Object.defineProperty(exports, "Header", {
  enumerable: true,
  get: function () {
    return _Header.default;
  }
});
Object.defineProperty(exports, "Main", {
  enumerable: true,
  get: function () {
    return _Main.default;
  }
});
Object.defineProperty(exports, "Nav", {
  enumerable: true,
  get: function () {
    return _Nav.default;
  }
});

var _Header = _interopRequireDefault(require("./Header"));

var _Main = _interopRequireDefault(require("./Main"));

var _Footer = _interopRequireDefault(require("./Footer"));

var _Nav = _interopRequireDefault(require("./Nav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Header":"components/Header.js","./Main":"components/Main.js","./Footer":"components/Footer.js","./Nav":"components/Nav.js"}],"store/Home.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  header: "",
  view: "Home"
};
exports.default = _default;
},{}],"store/Events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  header: " -  Upcoming Events",
  view: "Events"
};
exports.default = _default;
},{}],"store/Contact.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  header: " - Contact Us",
  view: "Contact"
};
exports.default = _default;
},{}],"store/About.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  header: " - About Us",
  view: "About"
};
exports.default = _default;
},{}],"store/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "About", {
  enumerable: true,
  get: function () {
    return _About.default;
  }
});
Object.defineProperty(exports, "Contact", {
  enumerable: true,
  get: function () {
    return _Contact.default;
  }
});
Object.defineProperty(exports, "Events", {
  enumerable: true,
  get: function () {
    return _Events.default;
  }
});
Object.defineProperty(exports, "Home", {
  enumerable: true,
  get: function () {
    return _Home.default;
  }
});
Object.defineProperty(exports, "Links", {
  enumerable: true,
  get: function () {
    return _Links.default;
  }
});

var state = _interopRequireWildcard(require("/store"));

var _Home = _interopRequireDefault(require("./Home"));

var _Events = _interopRequireDefault(require("./Events"));

var _Contact = _interopRequireDefault(require("./Contact"));

var _About = _interopRequireDefault(require("./About"));

var _Links = _interopRequireDefault(require("./Links"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"/store":"store/index.js","./Home":"store/Home.js","./Events":"store/Events.js","./Contact":"store/Contact.js","./About":"store/About.js","./Links":"store/Links.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _components = require("./components");

var state = _interopRequireWildcard(require("./store"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import Navigo from "navigo";
// import { capitalize } from "lodash";
// const router = new Navigo(window.location.origin);
// router
//   .on({
//     "/": () => render(state.Home),
//     ":page": params => {
//       let page = capitalize(params.page);
//       render(state[page]);
//     }
//   })
//   .resolve();
function render(st) {
  document.querySelector("#root").innerHTML = "\n    ".concat((0, _components.Header)(st), "\n    ").concat((0, _components.Main)(st), "\n    ").concat((0, _components.Footer)(), "\n  ");
}

render(state.Home); // function render(st) {
//   document.querySelector("#root").innerHTML = `
//     ${Header(st)}
//     ${Nav(state.Links)}
//     ${Main(st)}
//     ${Footer()}
//   `;
//   router.updatePageLinks();
//   addEventListeners(st);
// }
// function addEventListeners(st) {
//   document.querySelectorAll("nav a").forEach(navLink =>
//     navLink.addEventListener("click", event => {
//       event.preventDefault();
//       render(state[event.target.title]);
//     })
//   );
// add menu toggle to bars icon in nav bar
//   document
//     .querySelector(".fa-bars")
//     .addEventListener("click", () =>
//       document.querySelector("nav > ul").classList.toggle("hidden--mobile")
//     );
// event listener for the the photo form
//   if (st.view === "Register") {
//     document.querySelector("form").addEventListener("submit", event => {
//       event.preventDefault();
//       // convert HTML elements to Array
//       let inputList = Array.from(event.target.elements);
//       // remove submit button from list
//       inputList.pop();
//       // construct new picture object
//       let newPic = inputList.reduce((pictureObject, input) => {
//         pictureObject[input.name] = input.value;
//         return pictureObject;
//       }, {});
//       // add new picture to state.Gallery.pictures
//       state.Gallery.pictures.push(newPic);
//       render(state.Gallery);
//     });
//   }
},{"./components":"components/index.js","./store":"store/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54960" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/CapstoneProject.e31bb0bc.js.map