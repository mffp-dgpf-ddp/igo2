(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('bowser'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@igo2/utils', ['exports', 'bowser', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global.igo2 = global.igo2 || {}, global.igo2.utils = {}),global.bowser,global.rxjs,global.rxjs.operators));
}(this, (function (exports,bowser,rxjs,operators) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /* tslint:disable */
    /** @type {?} */
    var ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var Base64 = /** @class */ (function () {
        function Base64() {
        }
        /**
         * @private
         * @param {?} s
         * @param {?} i
         * @return {?}
         */
        Base64.getByte = /**
         * @private
         * @param {?} s
         * @param {?} i
         * @return {?}
         */
            function (s, i) {
                /** @type {?} */
                var x = s.charCodeAt(i);
                return x;
            };
        /**
         * @private
         * @param {?} s
         * @param {?} i
         * @return {?}
         */
        Base64.getByte64 = /**
         * @private
         * @param {?} s
         * @param {?} i
         * @return {?}
         */
            function (s, i) {
                /** @type {?} */
                var idx = this.ALPHA.indexOf(s.charAt(i));
                return idx;
            };
        /**
         * @param {?} s
         * @return {?}
         */
        Base64.decode = /**
         * @param {?} s
         * @return {?}
         */
            function (s) {
                /** @type {?} */
                var pads = 0;
                /** @type {?} */
                var i;
                /** @type {?} */
                var b10;
                /** @type {?} */
                var imax = s.length;
                /** @type {?} */
                var x = [];
                s = String(s);
                if (imax === 0) {
                    return s;
                }
                if (s.charAt(imax - 1) === this.PADCHAR) {
                    pads = 1;
                    if (s.charAt(imax - 2) === this.PADCHAR) {
                        pads = 2;
                    }
                    imax -= 4;
                }
                for (i = 0; i < imax; i += 4) {
                    b10 =
                        (this.getByte64(s, i) << 18) |
                            (this.getByte64(s, i + 1) << 12) |
                            (this.getByte64(s, i + 2) << 6) |
                            this.getByte64(s, i + 3);
                    x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255, b10 & 255));
                }
                switch (pads) {
                    case 1:
                        b10 =
                            (this.getByte64(s, i) << 18) |
                                (this.getByte64(s, i + 1) << 12) |
                                (this.getByte64(s, i + 2) << 6);
                        x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255));
                        break;
                    case 2:
                        b10 = (this.getByte64(s, i) << 18) | (this.getByte64(s, i + 1) << 12);
                        x.push(String.fromCharCode(b10 >> 16));
                        break;
                }
                return x.join('');
            };
        /**
         * @param {?} s
         * @return {?}
         */
        Base64.encode = /**
         * @param {?} s
         * @return {?}
         */
            function (s) {
                s = String(s);
                /** @type {?} */
                var i;
                /** @type {?} */
                var b10;
                /** @type {?} */
                var x = [];
                /** @type {?} */
                var imax = s.length - s.length % 3;
                if (s.length === 0) {
                    return s;
                }
                for (i = 0; i < imax; i += 3) {
                    b10 =
                        (this.getByte(s, i) << 16) |
                            (this.getByte(s, i + 1) << 8) |
                            this.getByte(s, i + 2);
                    x.push(this.ALPHA.charAt(b10 >> 18));
                    x.push(this.ALPHA.charAt((b10 >> 12) & 63));
                    x.push(this.ALPHA.charAt((b10 >> 6) & 63));
                    x.push(this.ALPHA.charAt(b10 & 63));
                }
                switch (s.length - imax) {
                    case 1:
                        b10 = this.getByte(s, i) << 16;
                        x.push(this.ALPHA.charAt(b10 >> 18) +
                            this.ALPHA.charAt((b10 >> 12) & 63) +
                            this.PADCHAR +
                            this.PADCHAR);
                        break;
                    case 2:
                        b10 = (this.getByte(s, i) << 16) | (this.getByte(s, i + 1) << 8);
                        x.push(this.ALPHA.charAt(b10 >> 18) +
                            this.ALPHA.charAt((b10 >> 12) & 63) +
                            this.ALPHA.charAt((b10 >> 6) & 63) +
                            this.PADCHAR);
                        break;
                }
                return x.join('');
            };
        Base64.PADCHAR = '=';
        Base64.ALPHA = ALPHA;
        return Base64;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Clipboard = /** @class */ (function () {
        function Clipboard() {
        }
        /**
         * @param {?} element
         * @return {?}
         */
        Clipboard.copy = /**
         * @param {?} element
         * @return {?}
         */
            function (element) {
                /** @type {?} */
                var successful = false;
                if (typeof element === 'string') {
                    /** @type {?} */
                    var textArea = Clipboard.createTextArea(element);
                    Clipboard.selectText(textArea);
                    successful = Clipboard.copyTextToClipboard();
                    Clipboard.destroyTextArea(textArea);
                }
                else {
                    Clipboard.selectText(element);
                    successful = Clipboard.copyTextToClipboard();
                }
                return successful;
            };
        /**
         * @private
         * @param {?} text
         * @return {?}
         */
        Clipboard.createTextArea = /**
         * @private
         * @param {?} text
         * @return {?}
         */
            function (text) {
                /** @type {?} */
                var textArea = ( /** @type {?} */(document.createElement('textArea')));
                textArea.value = text;
                document.body.appendChild(textArea);
                return textArea;
            };
        /**
         * @private
         * @param {?} textArea
         * @return {?}
         */
        Clipboard.destroyTextArea = /**
         * @private
         * @param {?} textArea
         * @return {?}
         */
            function (textArea) {
                document.body.removeChild(textArea);
            };
        /**
         * @private
         * @param {?} textArea
         * @return {?}
         */
        Clipboard.selectText = /**
         * @private
         * @param {?} textArea
         * @return {?}
         */
            function (textArea) {
                if (bowser.ios) {
                    /** @type {?} */
                    var oldContentEditable = textArea.contentEditable;
                    /** @type {?} */
                    var oldReadOnly = textArea.readOnly;
                    /** @type {?} */
                    var range = document.createRange();
                    /** @type {?} */
                    var selection = window.getSelection();
                    textArea.contenteditable = true;
                    textArea.readonly = false;
                    range.selectNodeContents(textArea);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    textArea.setSelectionRange(0, 999999);
                    textArea.contentEditable = oldContentEditable;
                    textArea.readOnly = oldReadOnly;
                }
                else {
                    textArea.select();
                }
            };
        /**
         * @private
         * @return {?}
         */
        Clipboard.copyTextToClipboard = /**
         * @private
         * @return {?}
         */
            function () {
                if (!(bowser.ios && bowser.version < 10)) {
                    return document.execCommand('copy');
                }
                return false;
            };
        return Clipboard;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var StringUtils = /** @class */ (function () {
        function StringUtils() {
        }
        /**
         * @param {?} s1
         * @param {?} s2
         * @param {?=} p
         * @return {?}
         */
        StringUtils.diff = /**
         * @param {?} s1
         * @param {?} s2
         * @param {?=} p
         * @return {?}
         */
            function (s1, s2, p) {
                if (p === void 0) {
                    p = 4;
                }
                if (!s1 && !s2) {
                    return '';
                }
                if (!s1) {
                    return '<span class="inserted">' + s2 + '</span>';
                }
                if (!s2) {
                    return '<span class="deleted">' + s1 + '</span>';
                }
                s1 = s1.toString();
                s2 = s2.toString();
                /** @type {?} */
                var changeData = StringUtils.getChanges(s1, s2, '', p);
                /** @type {?} */
                var nextS = s2.slice(changeData.mtc.length + changeData.ins.length + changeData.sbs.length);
                // remaining part of "s"
                /** @type {?} */
                var nextThis = s1.slice(changeData.mtc.length + changeData.del.length + changeData.sbs.length);
                // remaining part of "this"
                /** @type {?} */
                var result = '';
                if (changeData.del.length > 0) {
                    changeData.del = '<span class="deleted">' + changeData.del + '</span>';
                }
                if (changeData.ins.length > 0) {
                    changeData.ins = '<span class="inserted">' + changeData.ins + '</span>';
                }
                result = changeData.mtc + changeData.del + changeData.ins + changeData.sbs;
                result +=
                    nextThis !== '' || nextS !== ''
                        ? StringUtils.diff(nextThis, nextS, p)
                        : '';
                return result;
            };
        /**
         * @private
         * @param {?} s
         * @param {?} l
         * @param {?} m
         * @return {?}
         */
        StringUtils.getMatchingSubstring = /**
         * @private
         * @param {?} s
         * @param {?} l
         * @param {?} m
         * @return {?}
         */
            function (s, l, m) {
                // returns the first matching substring in-between the two strings
                /** @type {?} */
                var i = 0;
                /** @type {?} */
                var match = false;
                /** @type {?} */
                var slen = s.length;
                /** @type {?} */
                var o = { fis: slen, mtc: m, sbs: '' };
                while (i < slen) {
                    l[i] === s[i]
                        ? match
                            ? (o.sbs += s[i]) // o.sbs holds the matching substring itsef
                            : ((match = true), (o.fis = i), (o.sbs = s[i]))
                        : match
                            ? (i = slen) // stop after the first found substring
                            : (i = i);
                    ++i;
                }
                return o;
            };
        /**
         * @private
         * @param {?} s1
         * @param {?} s2
         * @param {?} m
         * @param {?} p
         * @return {?}
         */
        StringUtils.getChanges = /**
         * @private
         * @param {?} s1
         * @param {?} s2
         * @param {?} m
         * @param {?} p
         * @return {?}
         */
            function (s1, s2, m, p) {
                var _a;
                /** @type {?} */
                var isThisLonger = s1.length >= s1.length ? true : false;
                var _b = __read(isThisLonger ? [s1, s2] : [s2, s1], 2), longer = _b[0], shorter = _b[1];
                // assignment of longer and shorter by es6 destructuring
                /** @type {?} */
                var bi = 0;
                while (shorter[bi] === longer[bi] && bi < shorter.length) {
                    ++bi;
                } // make bi the index of first mismatching character
                longer = longer.split('').slice(bi); // as the longer string will be rotated it is converted into array
                shorter = shorter.slice(bi); // shorter and longer now starts from the first mismatching character
                // shorter and longer now starts from the first mismatching character
                /** @type {?} */
                var len = longer.length;
                // length of the longer string
                /** @type {?} */
                var cd = {
                    fis: shorter.length,
                    // the index of matching string in the shorter string
                    fil: len,
                    // the index of matching string in the longer string
                    sbs: '',
                    // the matching substring itself
                    mtc: m + s2.slice(0, bi)
                };
                // if exists mtc holds the matching string at the front
                /** @type {?} */
                var sub = { sbs: '' };
                if (shorter !== '') {
                    for (var rc = 0; rc < len && sub.sbs.length < p; rc++) {
                        // rc -> rotate count, p -> precision factor
                        sub = StringUtils.getMatchingSubstring(shorter, StringUtils.rotateArray(longer, rc), cd.mtc); // rotate longer string 1 char and get substring
                        sub.fil =
                            rc < len - sub.fis
                                ? sub.fis + rc // mismatch is longer than the mismatch in short
                                : sub.fis - len + rc; // mismatch is shorter than the mismatch in short
                        if (sub.sbs.length > cd.sbs.length) {
                            cd = sub; // only keep the one with the longest substring.
                        }
                    }
                }
                // insert the mismatching delete subsrt and insert substr to the cd object and attach the previous substring
                _a = __read(isThisLonger
                    ? [longer.slice(0, cd.fil).join(''), shorter.slice(0, cd.fis)]
                    : [shorter.slice(0, cd.fis), longer.slice(0, cd.fil).join('')], 2), cd.del = _a[0], cd.ins = _a[1];
                return cd.del.indexOf(' ') === -1 ||
                    cd.ins.indexOf(' ') === -1 ||
                    cd.del === '' ||
                    cd.ins === '' ||
                    cd.sbs === ''
                    ? cd
                    : StringUtils.getChanges(cd.del, cd.ins, cd.mtc, p);
            };
        /**
         * @private
         * @param {?} array
         * @param {?} n
         * @return {?}
         */
        StringUtils.rotateArray = /**
         * @private
         * @param {?} array
         * @param {?} n
         * @return {?}
         */
            function (array, n) {
                /** @type {?} */
                var len = array.length;
                /** @type {?} */
                var res = new Array(array.length);
                if (n % len === 0) {
                    return array.slice();
                }
                else {
                    for (var i = 0; i < len; i++) {
                        res[i] = array[(i + (len + (n % len))) % len];
                    }
                }
                return res;
            };
        return StringUtils;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var ChangeType = {
        ADDED: 'added',
        DELETED: 'deleted',
        MODIFIED: 'modified',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ChangeUtils = /** @class */ (function () {
        function ChangeUtils() {
        }
        /**
         * @param {?} obj1
         * @param {?} obj2
         * @param {?=} ignoreKeys
         * @return {?}
         */
        ChangeUtils.findChanges = /**
         * @param {?} obj1
         * @param {?} obj2
         * @param {?=} ignoreKeys
         * @return {?}
         */
            function (obj1, obj2, ignoreKeys) {
                if (ignoreKeys === void 0) {
                    ignoreKeys = [];
                }
                var e_1, _a;
                /** @type {?} */
                var items = {
                    added: [],
                    deleted: [],
                    modified: []
                };
                if (!obj1 || !obj2) {
                    return items;
                }
                /** @type {?} */
                var obj1Clone = __spread(obj1);
                /** @type {?} */
                var obj2Clone = __spread(obj2);
                var _loop_1 = function (fromItem) {
                    /** @type {?} */
                    var index = obj2Clone.findIndex(( /**
                     * @param {?} s
                     * @return {?}
                     */function (s) { return s.id === fromItem.id; }));
                    if (index === -1) {
                        items.deleted.push({
                            change: { type: ChangeType.DELETED },
                            value: fromItem
                        });
                        return "continue";
                    }
                    /** @type {?} */
                    var toItem = obj2Clone.splice(index, 1)[0];
                    /** @type {?} */
                    var fromItemClone = JSON.parse(JSON.stringify(fromItem));
                    /** @type {?} */
                    var toItemClone = JSON.parse(JSON.stringify(toItem));
                    /** @type {?} */
                    var keysChanged = ChangeUtils.compareObject(fromItemClone, toItemClone, undefined, ignoreKeys);
                    if (keysChanged.length) {
                        items.modified.push({
                            change: {
                                type: ChangeType.MODIFIED,
                                keysChanged: keysChanged
                            },
                            value: fromItemClone,
                            oldValue: fromItem,
                            newValue: toItem
                        });
                    }
                };
                try {
                    for (var obj1Clone_1 = __values(obj1Clone), obj1Clone_1_1 = obj1Clone_1.next(); !obj1Clone_1_1.done; obj1Clone_1_1 = obj1Clone_1.next()) {
                        var fromItem = obj1Clone_1_1.value;
                        _loop_1(fromItem);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (obj1Clone_1_1 && !obj1Clone_1_1.done && (_a = obj1Clone_1.return))
                            _a.call(obj1Clone_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                items.added = obj2Clone.map(( /**
                 * @param {?} itemAdded
                 * @return {?}
                 */function (itemAdded) {
                    return {
                        change: { type: ChangeType.ADDED },
                        value: itemAdded
                    };
                }));
                return items;
            };
        /**
         * @private
         * @param {?} fromItem
         * @param {?} toItem
         * @param {?=} baseKey
         * @param {?=} ignoreKeys
         * @return {?}
         */
        ChangeUtils.compareObject = /**
         * @private
         * @param {?} fromItem
         * @param {?} toItem
         * @param {?=} baseKey
         * @param {?=} ignoreKeys
         * @return {?}
         */
            function (fromItem, toItem, baseKey, ignoreKeys) {
                var _this = this;
                if (ignoreKeys === void 0) {
                    ignoreKeys = [];
                }
                /** @type {?} */
                var fromItemClone = JSON.parse(JSON.stringify(fromItem));
                /** @type {?} */
                var toItemClone = JSON.parse(JSON.stringify(toItem));
                /** @type {?} */
                var keys = new Set(__spread(Object.keys(fromItem), Object.keys(toItem)));
                /** @type {?} */
                var keysChanged = [];
                keys.forEach(( /**
                 * @param {?} key
                 * @return {?}
                 */function (key) {
                    /** @type {?} */
                    var keyString = baseKey ? baseKey + "." + key : key;
                    if (ignoreKeys.indexOf(keyString) !== -1) {
                        return;
                    }
                    if (Array.isArray(fromItem[key])) {
                        fromItem[key] = fromItem[key].join(',<br>');
                    }
                    if (Array.isArray(toItem[key])) {
                        toItem[key] = toItem[key].join(',<br>');
                    }
                    if (typeof fromItem[key] === 'object' &&
                        typeof toItem[key] === 'object' &&
                        fromItem[key] !== null &&
                        toItem[key] !== null) {
                        keysChanged = keysChanged.concat(_this.compareObject(fromItem[key], toItem[key], keyString));
                    }
                    else {
                        if (fromItem[key] !== toItem[key]) {
                            keysChanged.push({
                                key: keyString,
                                oldValue: fromItemClone[key],
                                newValue: toItemClone[key]
                            });
                            fromItem[key] = StringUtils.diff(fromItem[key], toItem[key]);
                        }
                    }
                }));
                return keysChanged;
            };
        return ChangeUtils;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ObjectUtils = /** @class */ (function () {
        function ObjectUtils() {
        }
        /**
         * @param {?} obj
         * @param {?} key
         * @return {?}
         */
        ObjectUtils.resolve = /**
         * @param {?} obj
         * @param {?} key
         * @return {?}
         */
            function (obj, key) {
                /** @type {?} */
                var keysArray = key
                    .replace(/\[/g, '.')
                    .replace(/\]/g, '')
                    .split('.');
                /** @type {?} */
                var current = obj;
                while (keysArray.length) {
                    if (typeof current !== 'object') {
                        return undefined;
                    }
                    current = current[keysArray.shift()];
                }
                return current;
            };
        /**
         * @param {?} item
         * @return {?}
         */
        ObjectUtils.isObject = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return (item &&
                    typeof item === 'object' &&
                    !Array.isArray(item) &&
                    item !== null &&
                    !(item instanceof Date));
            };
        /**
         * @param {?} target
         * @param {?} source
         * @param {?=} ignoreUndefined
         * @return {?}
         */
        ObjectUtils.mergeDeep = /**
         * @param {?} target
         * @param {?} source
         * @param {?=} ignoreUndefined
         * @return {?}
         */
            function (target, source, ignoreUndefined) {
                if (ignoreUndefined === void 0) {
                    ignoreUndefined = false;
                }
                /** @type {?} */
                var output = Object.assign({}, target);
                if (ObjectUtils.isObject(target) && ObjectUtils.isObject(source)) {
                    Object.keys(source)
                        .filter(( /**
                 * @param {?} key
                 * @return {?}
                 */function (key) { return !ignoreUndefined || source[key] !== undefined; }))
                        .forEach(( /**
                 * @param {?} key
                 * @return {?}
                 */function (key) {
                        var _a, _b;
                        if (ObjectUtils.isObject(source[key])) {
                            if (!(key in target)) {
                                Object.assign(output, (_a = {}, _a[key] = source[key], _a));
                            }
                            else {
                                output[key] = ObjectUtils.mergeDeep(target[key], source[key], ignoreUndefined);
                            }
                        }
                        else {
                            Object.assign(output, (_b = {}, _b[key] = source[key], _b));
                        }
                    }));
                }
                return output;
            };
        /**
         * @param {?} obj
         * @return {?}
         */
        ObjectUtils.removeUndefined = /**
         * @param {?} obj
         * @return {?}
         */
            function (obj) {
                /** @type {?} */
                var output = {};
                if (ObjectUtils.isObject(obj)) {
                    Object.keys(obj)
                        .filter(( /**
                 * @param {?} key
                 * @return {?}
                 */function (key) { return obj[key] !== undefined; }))
                        .forEach(( /**
                 * @param {?} key
                 * @return {?}
                 */function (key) {
                        if (ObjectUtils.isObject(obj[key]) || Array.isArray(obj[key])) {
                            output[key] = ObjectUtils.removeUndefined(obj[key]);
                        }
                        else {
                            output[key] = obj[key];
                        }
                    }));
                    return output;
                }
                if (Array.isArray(obj)) {
                    return obj.map(( /**
                     * @param {?} o
                     * @return {?}
                     */function (o) { return ObjectUtils.removeUndefined(o); }));
                }
                return obj;
            };
        /**
         * @param {?} obj
         * @return {?}
         */
        ObjectUtils.removeNull = /**
         * @param {?} obj
         * @return {?}
         */
            function (obj) {
                /** @type {?} */
                var output = {};
                if (ObjectUtils.isObject(obj)) {
                    Object.keys(obj)
                        .filter(( /**
                 * @param {?} key
                 * @return {?}
                 */function (key) { return obj[key] !== null; }))
                        .forEach(( /**
                 * @param {?} key
                 * @return {?}
                 */function (key) {
                        if (ObjectUtils.isObject(obj[key]) || Array.isArray(obj[key])) {
                            output[key] = ObjectUtils.removeNull(obj[key]);
                        }
                        else {
                            output[key] = obj[key];
                        }
                    }));
                    return output;
                }
                if (Array.isArray(obj)) {
                    return obj.map(( /**
                     * @param {?} o
                     * @return {?}
                     */function (o) { return ObjectUtils.removeNull(o); }));
                }
                return obj;
            };
        /**
         * @param {?} a
         * @param {?} b
         * @param {?=} direction
         * @param {?=} nullFirst
         * @return {?}
         */
        ObjectUtils.naturalCompare = /**
         * @param {?} a
         * @param {?} b
         * @param {?=} direction
         * @param {?=} nullFirst
         * @return {?}
         */
            function (a, b, direction, nullFirst) {
                if (direction === void 0) {
                    direction = 'asc';
                }
                if (nullFirst === void 0) {
                    nullFirst = false;
                }
                if (direction === 'desc') {
                    b = [a, (a = b)][0];
                }
                if (a === undefined || a === null || a === '') {
                    if (direction === 'desc') {
                        return nullFirst ? -1 : 1;
                    }
                    return nullFirst ? 1 : -1;
                }
                if (b === undefined || b === null || b === '') {
                    if (direction === 'desc') {
                        return nullFirst ? 1 : -1;
                    }
                    return nullFirst ? -1 : 1;
                }
                /** @type {?} */
                var ax = [];
                /** @type {?} */
                var bx = [];
                a = '' + a;
                b = '' + b;
                a.replace(/(\d+)|(\D+)/g, ( /**
                 * @param {?} _
                 * @param {?} $1
                 * @param {?} $2
                 * @return {?}
                 */function (_, $1, $2) {
                    ax.push([$1 || Infinity, $2 || '']);
                }));
                b.replace(/(\d+)|(\D+)/g, ( /**
                 * @param {?} _
                 * @param {?} $1
                 * @param {?} $2
                 * @return {?}
                 */function (_, $1, $2) {
                    bx.push([$1 || Infinity, $2 || '']);
                }));
                while (ax.length && bx.length) {
                    /** @type {?} */
                    var an = ax.shift();
                    /** @type {?} */
                    var bn = bx.shift();
                    /** @type {?} */
                    var nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
                    if (nn) {
                        return nn;
                    }
                }
                return ax.length - bx.length;
            };
        /**
         * Return true if two object are equivalent.
         * Objects are considered equivalent if they have the same properties and
         * if all of their properties (first-level only) share the same value.
         * @param obj1 First object
         * @param obj2 Second object
         * @returns Whether two objects arer equivalent
         */
        /**
         * Return true if two object are equivalent.
         * Objects are considered equivalent if they have the same properties and
         * if all of their properties (first-level only) share the same value.
         * @param {?} obj1 First object
         * @param {?} obj2 Second object
         * @return {?} Whether two objects arer equivalent
         */
        ObjectUtils.objectsAreEquivalent = /**
         * Return true if two object are equivalent.
         * Objects are considered equivalent if they have the same properties and
         * if all of their properties (first-level only) share the same value.
         * @param {?} obj1 First object
         * @param {?} obj2 Second object
         * @return {?} Whether two objects arer equivalent
         */
            function (obj1, obj2) {
                var e_1, _a;
                if (obj1 === obj2) {
                    return true;
                }
                /** @type {?} */
                var obj1Props = Object.getOwnPropertyNames(obj1);
                /** @type {?} */
                var obj2Props = Object.getOwnPropertyNames(obj2);
                if (obj1Props.length !== obj2Props.length) {
                    return false;
                }
                try {
                    for (var obj1Props_1 = __values(obj1Props), obj1Props_1_1 = obj1Props_1.next(); !obj1Props_1_1.done; obj1Props_1_1 = obj1Props_1.next()) {
                        var prop = obj1Props_1_1.value;
                        if (obj1[prop] !== obj2[prop]) {
                            return false;
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (obj1Props_1_1 && !obj1Props_1_1.done && (_a = obj1Props_1.return))
                            _a.call(obj1Props_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                return true;
            };
        /**
         * Return a new object with an array of keys removed
         * @param obj Source object
         * @param keys Keys to remove
         * @returns A new object
         */
        /**
         * Return a new object with an array of keys removed
         * @param {?} obj Source object
         * @param {?} keys Keys to remove
         * @return {?} A new object
         */
        ObjectUtils.removeKeys = /**
         * Return a new object with an array of keys removed
         * @param {?} obj Source object
         * @param {?} keys Keys to remove
         * @return {?} A new object
         */
            function (obj, keys) {
                /** @type {?} */
                var newObj = Object.keys(obj)
                    .filter(( /**
             * @param {?} key
             * @return {?}
             */function (key) { return keys.indexOf(key) < 0; }))
                    .reduce(( /**
             * @param {?} _obj
             * @param {?} key
             * @return {?}
             */function (_obj, key) {
                    _obj[key] = obj[key];
                    return _obj;
                }), {});
                return newObj;
            };
        return ObjectUtils;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Utility function to create a K:V from a list of strings
     * @template T
     * @param {?} o
     * @return {?}
     */
    function strEnum(o) {
        return o.reduce(( /**
         * @param {?} res
         * @param {?} key
         * @return {?}
         */function (res, key) {
            res[key] = key;
            return res;
        }), Object.create(null));
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @return {?}
     */
    function S4() {
        // tslint:disable-next-line: no-bitwise
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    /**
     * @return {?}
     */
    function uuid() {
        /** @type {?} */
        var id = "" + S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
        return id.toLowerCase();
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var SubjectStatus = {
        Error: 0,
        Done: 1,
        Working: 2,
        Waiting: 3,
    };
    SubjectStatus[SubjectStatus.Error] = 'Error';
    SubjectStatus[SubjectStatus.Done] = 'Done';
    SubjectStatus[SubjectStatus.Working] = 'Working';
    SubjectStatus[SubjectStatus.Waiting] = 'Waiting';
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ Watcher = /** @class */ (function () {
        function Watcher() {
            this.status$ = new rxjs.Subject();
        }
        Object.defineProperty(Watcher.prototype, "status", {
            get: /**
             * @return {?}
             */ function () {
                return this._status;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._status = value;
                this.status$.next(value);
            },
            enumerable: true,
            configurable: true
        });
        // tslint:disable-next-line:ban-types
        // tslint:disable-next-line:ban-types
        /**
         * @param {?} callback
         * @param {?=} scope
         * @return {?}
         */
        Watcher.prototype.subscribe =
            // tslint:disable-next-line:ban-types
            /**
             * @param {?} callback
             * @param {?=} scope
             * @return {?}
             */
            function (callback, scope) {
                var _this = this;
                this.watch();
                this.status$$ = this.status$
                    .pipe(operators.distinctUntilChanged())
                    .subscribe(( /**
             * @param {?} status
             * @return {?}
             */function (status) {
                    _this.handleStatusChange(status);
                    callback.call(scope, _this);
                }));
            };
        /**
         * @return {?}
         */
        Watcher.prototype.unsubscribe = /**
         * @return {?}
         */
            function () {
                this.unwatch();
                if (this.status$$ !== undefined) {
                    this.status$$.unsubscribe();
                    this.status$$ = undefined;
                }
                this.status = SubjectStatus.Waiting;
            };
        /**
         * @protected
         * @param {?} status
         * @return {?}
         */
        Watcher.prototype.handleStatusChange = /**
         * @protected
         * @param {?} status
         * @return {?}
         */
            function (status) { };
        return Watcher;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.Base64 = Base64;
    exports.Clipboard = Clipboard;
    exports.ChangeUtils = ChangeUtils;
    exports.ChangeType = ChangeType;
    exports.ObjectUtils = ObjectUtils;
    exports.strEnum = strEnum;
    exports.StringUtils = StringUtils;
    exports.S4 = S4;
    exports.uuid = uuid;
    exports.SubjectStatus = SubjectStatus;
    exports.Watcher = Watcher;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=igo2-utils.umd.js.map