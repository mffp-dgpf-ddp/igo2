import { ios, version } from 'bowser';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable */
/** @type {?} */
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
class Base64 {
    /**
     * @private
     * @param {?} s
     * @param {?} i
     * @return {?}
     */
    static getByte(s, i) {
        /** @type {?} */
        const x = s.charCodeAt(i);
        return x;
    }
    /**
     * @private
     * @param {?} s
     * @param {?} i
     * @return {?}
     */
    static getByte64(s, i) {
        /** @type {?} */
        const idx = this.ALPHA.indexOf(s.charAt(i));
        return idx;
    }
    /**
     * @param {?} s
     * @return {?}
     */
    static decode(s) {
        /** @type {?} */
        let pads = 0;
        /** @type {?} */
        let i;
        /** @type {?} */
        let b10;
        /** @type {?} */
        let imax = s.length;
        /** @type {?} */
        let x = [];
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
    }
    /**
     * @param {?} s
     * @return {?}
     */
    static encode(s) {
        s = String(s);
        /** @type {?} */
        let i;
        /** @type {?} */
        let b10;
        /** @type {?} */
        let x = [];
        /** @type {?} */
        let imax = s.length - s.length % 3;
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
    }
}
Base64.PADCHAR = '=';
Base64.ALPHA = ALPHA;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Clipboard {
    /**
     * @param {?} element
     * @return {?}
     */
    static copy(element) {
        /** @type {?} */
        let successful = false;
        if (typeof element === 'string') {
            /** @type {?} */
            const textArea = Clipboard.createTextArea(element);
            Clipboard.selectText(textArea);
            successful = Clipboard.copyTextToClipboard();
            Clipboard.destroyTextArea(textArea);
        }
        else {
            Clipboard.selectText(element);
            successful = Clipboard.copyTextToClipboard();
        }
        return successful;
    }
    /**
     * @private
     * @param {?} text
     * @return {?}
     */
    static createTextArea(text) {
        /** @type {?} */
        const textArea = (/** @type {?} */ (document.createElement('textArea')));
        textArea.value = text;
        document.body.appendChild(textArea);
        return textArea;
    }
    /**
     * @private
     * @param {?} textArea
     * @return {?}
     */
    static destroyTextArea(textArea) {
        document.body.removeChild(textArea);
    }
    /**
     * @private
     * @param {?} textArea
     * @return {?}
     */
    static selectText(textArea) {
        if (ios) {
            /** @type {?} */
            const oldContentEditable = textArea.contentEditable;
            /** @type {?} */
            const oldReadOnly = textArea.readOnly;
            /** @type {?} */
            const range = document.createRange();
            /** @type {?} */
            const selection = window.getSelection();
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
    }
    /**
     * @private
     * @return {?}
     */
    static copyTextToClipboard() {
        if (!(ios && version < 10)) {
            return document.execCommand('copy');
        }
        return false;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StringUtils {
    /**
     * @param {?} s1
     * @param {?} s2
     * @param {?=} p
     * @return {?}
     */
    static diff(s1, s2, p = 4) {
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
        const changeData = StringUtils.getChanges(s1, s2, '', p);
        /** @type {?} */
        const nextS = s2.slice(changeData.mtc.length + changeData.ins.length + changeData.sbs.length);
        // remaining part of "s"
        /** @type {?} */
        const nextThis = s1.slice(changeData.mtc.length + changeData.del.length + changeData.sbs.length);
        // remaining part of "this"
        /** @type {?} */
        let result = '';
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
    }
    /**
     * @private
     * @param {?} s
     * @param {?} l
     * @param {?} m
     * @return {?}
     */
    static getMatchingSubstring(s, l, m) {
        // returns the first matching substring in-between the two strings
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        let match = false;
        /** @type {?} */
        const slen = s.length;
        /** @type {?} */
        const o = { fis: slen, mtc: m, sbs: '' };
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
    }
    /**
     * @private
     * @param {?} s1
     * @param {?} s2
     * @param {?} m
     * @param {?} p
     * @return {?}
     */
    static getChanges(s1, s2, m, p) {
        /** @type {?} */
        const isThisLonger = s1.length >= s1.length ? true : false;
        let [longer, shorter] = isThisLonger ? [s1, s2] : [s2, s1];
        // assignment of longer and shorter by es6 destructuring
        /** @type {?} */
        let bi = 0;
        while (shorter[bi] === longer[bi] && bi < shorter.length) {
            ++bi;
        } // make bi the index of first mismatching character
        longer = longer.split('').slice(bi); // as the longer string will be rotated it is converted into array
        shorter = shorter.slice(bi); // shorter and longer now starts from the first mismatching character
        // shorter and longer now starts from the first mismatching character
        /** @type {?} */
        const len = longer.length;
        // length of the longer string
        /** @type {?} */
        let cd = {
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
        let sub = { sbs: '' };
        if (shorter !== '') {
            for (let rc = 0; rc < len && sub.sbs.length < p; rc++) {
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
        [cd.del, cd.ins] = isThisLonger
            ? [longer.slice(0, cd.fil).join(''), shorter.slice(0, cd.fis)]
            : [shorter.slice(0, cd.fis), longer.slice(0, cd.fil).join('')];
        return cd.del.indexOf(' ') === -1 ||
            cd.ins.indexOf(' ') === -1 ||
            cd.del === '' ||
            cd.ins === '' ||
            cd.sbs === ''
            ? cd
            : StringUtils.getChanges(cd.del, cd.ins, cd.mtc, p);
    }
    /**
     * @private
     * @param {?} array
     * @param {?} n
     * @return {?}
     */
    static rotateArray(array, n) {
        /** @type {?} */
        const len = array.length;
        /** @type {?} */
        const res = new Array(array.length);
        if (n % len === 0) {
            return array.slice();
        }
        else {
            for (let i = 0; i < len; i++) {
                res[i] = array[(i + (len + (n % len))) % len];
            }
        }
        return res;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const ChangeType = {
    ADDED: 'added',
    DELETED: 'deleted',
    MODIFIED: 'modified',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ChangeUtils {
    /**
     * @param {?} obj1
     * @param {?} obj2
     * @param {?=} ignoreKeys
     * @return {?}
     */
    static findChanges(obj1, obj2, ignoreKeys = []) {
        /** @type {?} */
        const items = {
            added: [],
            deleted: [],
            modified: []
        };
        if (!obj1 || !obj2) {
            return items;
        }
        /** @type {?} */
        const obj1Clone = [...obj1];
        /** @type {?} */
        const obj2Clone = [...obj2];
        for (const fromItem of obj1Clone) {
            /** @type {?} */
            const index = obj2Clone.findIndex((/**
             * @param {?} s
             * @return {?}
             */
            s => s.id === fromItem.id));
            if (index === -1) {
                items.deleted.push({
                    change: { type: ChangeType.DELETED },
                    value: fromItem
                });
                continue;
            }
            /** @type {?} */
            const toItem = obj2Clone.splice(index, 1)[0];
            /** @type {?} */
            const fromItemClone = JSON.parse(JSON.stringify(fromItem));
            /** @type {?} */
            const toItemClone = JSON.parse(JSON.stringify(toItem));
            /** @type {?} */
            const keysChanged = ChangeUtils.compareObject(fromItemClone, toItemClone, undefined, ignoreKeys);
            if (keysChanged.length) {
                items.modified.push({
                    change: {
                        type: ChangeType.MODIFIED,
                        keysChanged
                    },
                    value: fromItemClone,
                    oldValue: fromItem,
                    newValue: toItem
                });
            }
        }
        items.added = obj2Clone.map((/**
         * @param {?} itemAdded
         * @return {?}
         */
        itemAdded => {
            return {
                change: { type: ChangeType.ADDED },
                value: itemAdded
            };
        }));
        return items;
    }
    /**
     * @private
     * @param {?} fromItem
     * @param {?} toItem
     * @param {?=} baseKey
     * @param {?=} ignoreKeys
     * @return {?}
     */
    static compareObject(fromItem, toItem, baseKey, ignoreKeys = []) {
        /** @type {?} */
        const fromItemClone = JSON.parse(JSON.stringify(fromItem));
        /** @type {?} */
        const toItemClone = JSON.parse(JSON.stringify(toItem));
        /** @type {?} */
        const keys = new Set([
            ...Object.keys(fromItem),
            ...Object.keys(toItem)
        ]);
        /** @type {?} */
        let keysChanged = [];
        keys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            /** @type {?} */
            const keyString = baseKey ? `${baseKey}.${key}` : key;
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
                keysChanged = keysChanged.concat(this.compareObject(fromItem[key], toItem[key], keyString));
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
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ObjectUtils {
    /**
     * @param {?} obj
     * @param {?} key
     * @return {?}
     */
    static resolve(obj, key) {
        /** @type {?} */
        const keysArray = key
            .replace(/\[/g, '.')
            .replace(/\]/g, '')
            .split('.');
        /** @type {?} */
        let current = obj;
        while (keysArray.length) {
            if (typeof current !== 'object') {
                return undefined;
            }
            current = current[keysArray.shift()];
        }
        return current;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    static isObject(item) {
        return (item &&
            typeof item === 'object' &&
            !Array.isArray(item) &&
            item !== null &&
            !(item instanceof Date));
    }
    /**
     * @param {?} target
     * @param {?} source
     * @param {?=} ignoreUndefined
     * @return {?}
     */
    static mergeDeep(target, source, ignoreUndefined = false) {
        /** @type {?} */
        const output = Object.assign({}, target);
        if (ObjectUtils.isObject(target) && ObjectUtils.isObject(source)) {
            Object.keys(source)
                .filter((/**
             * @param {?} key
             * @return {?}
             */
            key => !ignoreUndefined || source[key] !== undefined))
                .forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => {
                if (ObjectUtils.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    }
                    else {
                        output[key] = ObjectUtils.mergeDeep(target[key], source[key], ignoreUndefined);
                    }
                }
                else {
                    Object.assign(output, { [key]: source[key] });
                }
            }));
        }
        return output;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    static removeUndefined(obj) {
        /** @type {?} */
        const output = {};
        if (ObjectUtils.isObject(obj)) {
            Object.keys(obj)
                .filter((/**
             * @param {?} key
             * @return {?}
             */
            key => obj[key] !== undefined))
                .forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => {
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
            return obj.map((/**
             * @param {?} o
             * @return {?}
             */
            o => ObjectUtils.removeUndefined(o)));
        }
        return obj;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    static removeNull(obj) {
        /** @type {?} */
        const output = {};
        if (ObjectUtils.isObject(obj)) {
            Object.keys(obj)
                .filter((/**
             * @param {?} key
             * @return {?}
             */
            key => obj[key] !== null))
                .forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => {
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
            return obj.map((/**
             * @param {?} o
             * @return {?}
             */
            o => ObjectUtils.removeNull(o)));
        }
        return obj;
    }
    /**
     * @param {?} a
     * @param {?} b
     * @param {?=} direction
     * @param {?=} nullFirst
     * @return {?}
     */
    static naturalCompare(a, b, direction = 'asc', nullFirst = false) {
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
        const ax = [];
        /** @type {?} */
        const bx = [];
        a = '' + a;
        b = '' + b;
        a.replace(/(\d+)|(\D+)/g, (/**
         * @param {?} _
         * @param {?} $1
         * @param {?} $2
         * @return {?}
         */
        (_, $1, $2) => {
            ax.push([$1 || Infinity, $2 || '']);
        }));
        b.replace(/(\d+)|(\D+)/g, (/**
         * @param {?} _
         * @param {?} $1
         * @param {?} $2
         * @return {?}
         */
        (_, $1, $2) => {
            bx.push([$1 || Infinity, $2 || '']);
        }));
        while (ax.length && bx.length) {
            /** @type {?} */
            const an = ax.shift();
            /** @type {?} */
            const bn = bx.shift();
            /** @type {?} */
            const nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
            if (nn) {
                return nn;
            }
        }
        return ax.length - bx.length;
    }
    /**
     * Return true if two object are equivalent.
     * Objects are considered equivalent if they have the same properties and
     * if all of their properties (first-level only) share the same value.
     * @param {?} obj1 First object
     * @param {?} obj2 Second object
     * @return {?} Whether two objects arer equivalent
     */
    static objectsAreEquivalent(obj1, obj2) {
        if (obj1 === obj2) {
            return true;
        }
        /** @type {?} */
        const obj1Props = Object.getOwnPropertyNames(obj1);
        /** @type {?} */
        const obj2Props = Object.getOwnPropertyNames(obj2);
        if (obj1Props.length !== obj2Props.length) {
            return false;
        }
        for (const prop of obj1Props) {
            if (obj1[prop] !== obj2[prop]) {
                return false;
            }
        }
        return true;
    }
    /**
     * Return a new object with an array of keys removed
     * @param {?} obj Source object
     * @param {?} keys Keys to remove
     * @return {?} A new object
     */
    static removeKeys(obj, keys) {
        /** @type {?} */
        const newObj = Object.keys(obj)
            .filter((/**
         * @param {?} key
         * @return {?}
         */
        key => keys.indexOf(key) < 0))
            .reduce((/**
         * @param {?} _obj
         * @param {?} key
         * @return {?}
         */
        (_obj, key) => {
            _obj[key] = obj[key];
            return _obj;
        }), {});
        return newObj;
    }
}

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
    return o.reduce((/**
     * @param {?} res
     * @param {?} key
     * @return {?}
     */
    (res, key) => {
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
    const id = `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
    return id.toLowerCase();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const SubjectStatus = {
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
class Watcher {
    constructor() {
        this.status$ = new Subject();
    }
    /**
     * @return {?}
     */
    get status() {
        return this._status;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set status(value) {
        this._status = value;
        this.status$.next(value);
    }
    // tslint:disable-next-line:ban-types
    /**
     * @param {?} callback
     * @param {?=} scope
     * @return {?}
     */
    subscribe(callback, scope) {
        this.watch();
        this.status$$ = this.status$
            .pipe(distinctUntilChanged())
            .subscribe((/**
         * @param {?} status
         * @return {?}
         */
        (status) => {
            this.handleStatusChange(status);
            callback.call(scope, this);
        }));
    }
    /**
     * @return {?}
     */
    unsubscribe() {
        this.unwatch();
        if (this.status$$ !== undefined) {
            this.status$$.unsubscribe();
            this.status$$ = undefined;
        }
        this.status = SubjectStatus.Waiting;
    }
    /**
     * @protected
     * @param {?} status
     * @return {?}
     */
    handleStatusChange(status) { }
}

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

export { Base64, Clipboard, ChangeUtils, ChangeType, ObjectUtils, strEnum, StringUtils, S4, uuid, SubjectStatus, Watcher };

//# sourceMappingURL=igo2-utils.js.map