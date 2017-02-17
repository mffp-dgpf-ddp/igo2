webpackJsonp([2,5],{

/***/ 285:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ 298:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 521:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(881);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(298)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../css-loader/index.js?{\"sourceMap\":false}!./../../postcss-loader/index.js!./ol.css", function() {
			var newContent = require("!!./../../css-loader/index.js?{\"sourceMap\":false}!./../../postcss-loader/index.js!./ol.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 522:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(882);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(298)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?{\"sourceMap\":false}!./../../node_modules/postcss-loader/index.js!./../../node_modules/stylus-loader/index.js?{\"sourceMap\":false,\"paths\":[]}!./material-icons.styl", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?{\"sourceMap\":false}!./../../node_modules/postcss-loader/index.js!./../../node_modules/stylus-loader/index.js?{\"sourceMap\":false,\"paths\":[]}!./material-icons.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 523:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(883);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(298)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?{\"sourceMap\":false}!./../../node_modules/postcss-loader/index.js!./../../node_modules/stylus-loader/index.js?{\"sourceMap\":false,\"paths\":[]}!./styles.styl", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?{\"sourceMap\":false}!./../../node_modules/postcss-loader/index.js!./../../node_modules/stylus-loader/index.js?{\"sourceMap\":false,\"paths\":[]}!./styles.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 881:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(285)();
// imports


// module
exports.push([module.i, ".ol-control,.ol-scale-line{position:absolute;padding:2px}.ol-box{box-sizing:border-box;border-radius:2px;border:2px solid #00f}.ol-mouse-position{top:8px;right:8px;position:absolute}.ol-scale-line{background:rgba(0,60,136,.3);border-radius:4px;bottom:8px;left:8px}.ol-scale-line-inner{border:1px solid #eee;border-top:none;color:#eee;font-size:10px;text-align:center;margin:1px;will-change:contents,width}.ol-overlay-container{will-change:left,right,top,bottom}.ol-unsupported{display:none}.ol-viewport .ol-unselectable{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.ol-control{background-color:rgba(255,255,255,.4);border-radius:4px}.ol-control:hover{background-color:rgba(255,255,255,.6)}.ol-zoom{top:.5em;left:.5em}.ol-rotate{top:.5em;right:.5em;-webkit-transition:opacity .25s linear,visibility 0s linear;transition:opacity .25s linear,visibility 0s linear}.ol-rotate.ol-hidden{opacity:0;visibility:hidden;-webkit-transition:opacity .25s linear,visibility 0s linear .25s;transition:opacity .25s linear,visibility 0s linear .25s}.ol-zoom-extent{top:4.643em;left:.5em}.ol-full-screen{right:.5em;top:.5em}@media print{.ol-control{display:none}}.ol-control button{display:block;margin:1px;padding:0;color:#fff;font-size:1.14em;font-weight:700;text-decoration:none;text-align:center;height:1.375em;width:1.375em;line-height:.4em;background-color:rgba(0,60,136,.5);border:none;border-radius:2px}.ol-control button::-moz-focus-inner{border:none;padding:0}.ol-zoom-extent button{line-height:1.4em}.ol-compass{display:block;font-weight:400;font-size:1.2em;will-change:transform}.ol-touch .ol-control button{font-size:1.5em}.ol-touch .ol-zoom-extent{top:5.5em}.ol-control button:focus,.ol-control button:hover{text-decoration:none;background-color:rgba(0,60,136,.7)}.ol-zoom .ol-zoom-in{border-radius:2px 2px 0 0}.ol-zoom .ol-zoom-out{border-radius:0 0 2px 2px}.ol-attribution{text-align:right;bottom:.5em;right:.5em;max-width:calc(100% - 1.3em)}.ol-attribution ul{margin:0;padding:0 .5em;font-size:.7rem;line-height:1.375em;color:#000;text-shadow:0 0 2px #fff}.ol-attribution li{display:inline;list-style:none;line-height:inherit}.ol-attribution li:not(:last-child):after{content:\" \"}.ol-attribution img{max-height:2em;max-width:inherit;vertical-align:middle}.ol-attribution button,.ol-attribution ul{display:inline-block}.ol-attribution.ol-collapsed ul{display:none}.ol-attribution.ol-logo-only ul{display:block}.ol-attribution:not(.ol-collapsed){background:rgba(255,255,255,.8)}.ol-attribution.ol-uncollapsible{bottom:0;right:0;border-radius:4px 0 0;height:1.1em;line-height:1em}.ol-attribution.ol-logo-only{background:0 0;bottom:.4em;height:1.1em;line-height:1em}.ol-attribution.ol-uncollapsible img{margin-top:-.2em;max-height:1.6em}.ol-attribution.ol-logo-only button,.ol-attribution.ol-uncollapsible button{display:none}.ol-zoomslider{top:4.5em;left:.5em;height:200px}.ol-zoomslider button{position:relative;height:10px}.ol-touch .ol-zoomslider{top:5.5em}.ol-overviewmap{left:.5em;bottom:.5em}.ol-overviewmap.ol-uncollapsible{bottom:0;left:0;border-radius:0 4px 0 0}.ol-overviewmap .ol-overviewmap-map,.ol-overviewmap button{display:inline-block}.ol-overviewmap .ol-overviewmap-map{border:1px solid #7b98bc;height:150px;margin:2px;width:150px}.ol-overviewmap:not(.ol-collapsed) button{bottom:1px;left:2px;position:absolute}.ol-overviewmap.ol-collapsed .ol-overviewmap-map,.ol-overviewmap.ol-uncollapsible button{display:none}.ol-overviewmap:not(.ol-collapsed){background:rgba(255,255,255,.8)}.ol-overviewmap-box{border:2px dotted rgba(0,60,136,.7)}", ""]);

// exports


/***/ }),

/***/ 882:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(285)();
// imports


// module
exports.push([module.i, "/* fallback */\n@font-face {\n  font-family: 'Material Icons';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Material Icons'), local('MaterialIcons-Regular'), url(" + __webpack_require__(968) + ") format('woff2');\n}\n.material-icons {\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-feature-settings: 'liga';\n  -webkit-font-smoothing: antialiased;\n}\n", ""]);

// exports


/***/ }),

/***/ 883:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(285)();
// imports


// module
exports.push([module.i, "/* Reset */\nhtml,\nbody,\ndiv {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\nhtml,\nbody {\n  width: 100%;\n  height: 100%;\n}\n* {\n  box-sizing: border-box;\n}\n/*\n@import '~@angular/material/core/theming/prebuilt/deeppurple-amber.css';\n*/\nmd-sidenav.md-sidenav-side {\n  z-index: 3 !important;\n}\ninput {\n  height: 40px;\n}\n.md-input-element {\n  padding: 0 5px !important;\n}\n.md-input-placeholder {\n  font-style: italic;\n  top: 10px !important;\n  left: 5px !important;\n  right: 5px !important;\n  color: rgba(0,0,0,0.2);\n}\n.md-input-underline {\n  border-color: rgba(0,0,0,0.2);\n}\n.md-ripple-foreground {\n  display: none;\n}\n[md-button]:hover.igo-primary .md-button-focus-overlay,\n[md-icon-button]:hover.igo-primary .md-button-focus-overlay {\n  background-color: rgba(51,102,153,0.2);\n}\n[md-button]:hover.igo-secondary .md-button-focus-overlay,\n[md-icon-button]:hover.igo-secondary .md-button-focus-overlay {\n  background-color: rgba(153,153,153,0.1);\n}\nbutton[md-icon-button] {\n  border-radius: 0;\n  width: 40px;\n  min-width: 40px;\n  margin: 0;\n  padding: 0;\n}\nbutton[md-icon-button].igo-icon-button {\n  background-color: transparent;\n}\nbutton[md-icon-button].igo-primary {\n  color: #369;\n  background-color: #fff;\n}\nbutton[md-icon-button].igo-secondary {\n  color: #999;\n  background-color: #fff;\n}\nbutton[md-icon-button].igo-icon-button {\n  background-color: transparent;\n}\nbutton[md-icon-button].igo-primary {\n  color: #369;\n  background-color: #fff;\n}\nbutton[md-icon-button].igo-secondary {\n  color: #999;\n  background-color: #fff;\n}\nbutton {\n  background-color: #fff;\n}\ntable td {\n  padding: 5px;\n}\ntable.igo-striped tbody tr:nth-child(odd) {\n  background-color: rgba(153,153,153,0.1);\n}\n.md-input-placeholder {\n  font-style: italic;\n  top: 10px !important;\n}\n.igo-container {\n  width: calc(100% - 2 * 5px);\n  height: 100%;\n  padding: 5px 0;\n  margin: 0 5px;\n  overflow: hidden;\n  position: relative;\n}\n.igo-content {\n  height: 100%;\n  width: 100%;\n  overflow: auto;\n}\n", ""]);

// exports


/***/ }),

/***/ 968:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "material-icon.woff2";

/***/ }),

/***/ 970:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(521);
__webpack_require__(523);
module.exports = __webpack_require__(522);


/***/ })

},[970]);
//# sourceMappingURL=styles.bundle.map