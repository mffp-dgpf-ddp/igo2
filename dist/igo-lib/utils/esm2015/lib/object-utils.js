/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class ObjectUtils {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LXV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvdXRpbHMvIiwic291cmNlcyI6WyJsaWIvb2JqZWN0LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLE9BQU8sV0FBVzs7Ozs7O0lBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBVyxFQUFFLEdBQVc7O2NBQy9CLFNBQVMsR0FBRyxHQUFHO2FBQ2xCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO2FBQ2xCLEtBQUssQ0FBQyxHQUFHLENBQUM7O1lBQ1QsT0FBTyxHQUFHLEdBQUc7UUFDakIsT0FBTyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUMvQixPQUFPLFNBQVMsQ0FBQzthQUNsQjtZQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDdEM7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBWTtRQUMxQixPQUFPLENBQ0wsSUFBSTtZQUNKLE9BQU8sSUFBSSxLQUFLLFFBQVE7WUFDeEIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFJLEtBQUssSUFBSTtZQUNiLENBQUMsQ0FBQyxJQUFJLFlBQVksSUFBSSxDQUFDLENBQ3hCLENBQUM7SUFDSixDQUFDOzs7Ozs7O0lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FDZCxNQUFjLEVBQ2QsTUFBYyxFQUNkLGVBQWUsR0FBRyxLQUFLOztjQUVqQixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO1FBQ3hDLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFXLENB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Q2hCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBPYmplY3RVdGlscyB7XHJcbiAgc3RhdGljIHJlc29sdmUob2JqOiBvYmplY3QsIGtleTogc3RyaW5nKTogYW55IHtcclxuICAgIGNvbnN0IGtleXNBcnJheSA9IGtleVxyXG4gICAgICAucmVwbGFjZSgvXFxbL2csICcuJylcclxuICAgICAgLnJlcGxhY2UoL1xcXS9nLCAnJylcclxuICAgICAgLnNwbGl0KCcuJyk7XHJcbiAgICBsZXQgY3VycmVudCA9IG9iajtcclxuICAgIHdoaWxlIChrZXlzQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY3VycmVudCAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50W2tleXNBcnJheS5zaGlmdCgpXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycmVudDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc09iamVjdChpdGVtOiBvYmplY3QpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIGl0ZW0gJiZcclxuICAgICAgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmXHJcbiAgICAgICFBcnJheS5pc0FycmF5KGl0ZW0pICYmXHJcbiAgICAgIGl0ZW0gIT09IG51bGwgJiZcclxuICAgICAgIShpdGVtIGluc3RhbmNlb2YgRGF0ZSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbWVyZ2VEZWVwKFxyXG4gICAgdGFyZ2V0OiBvYmplY3QsXHJcbiAgICBzb3VyY2U6IG9iamVjdCxcclxuICAgIGlnbm9yZVVuZGVmaW5lZCA9IGZhbHNlXHJcbiAgKTogYW55IHtcclxuICAgIGNvbnN0IG91dHB1dCA9IE9iamVjdC5hc3NpZ24oe30sIHRhcmdldCk7XHJcbiAgICBpZiAoT2JqZWN0VXRpbHMuaXNPYmplY3QodGFyZ2V0KSAmJiBPYmplY3RVdGlscy5pc09iamVjdChzb3VyY2UpKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSlcclxuICAgICAgICAuZmlsdGVyKGtleSA9PiAhaWdub3JlVW5kZWZpbmVkIHx8IHNvdXJjZVtrZXldICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgIGlmIChPYmplY3RVdGlscy5pc09iamVjdChzb3VyY2Vba2V5XSkpIHtcclxuICAgICAgICAgICAgaWYgKCEoa2V5IGluIHRhcmdldCkpIHtcclxuICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgeyBba2V5XTogc291cmNlW2tleV0gfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBPYmplY3RVdGlscy5tZXJnZURlZXAoXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSxcclxuICAgICAgICAgICAgICAgIHNvdXJjZVtrZXldLFxyXG4gICAgICAgICAgICAgICAgaWdub3JlVW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIHsgW2tleV06IHNvdXJjZVtrZXldIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dHB1dDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyByZW1vdmVVbmRlZmluZWQob2JqOiBvYmplY3QpOiBhbnkge1xyXG4gICAgY29uc3Qgb3V0cHV0ID0ge307XHJcbiAgICBpZiAoT2JqZWN0VXRpbHMuaXNPYmplY3Qob2JqKSkge1xyXG4gICAgICBPYmplY3Qua2V5cyhvYmopXHJcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gb2JqW2tleV0gIT09IHVuZGVmaW5lZClcclxuICAgICAgICAuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzT2JqZWN0KG9ialtrZXldKSB8fCBBcnJheS5pc0FycmF5KG9ialtrZXldKSkge1xyXG4gICAgICAgICAgICBvdXRwdXRba2V5XSA9IE9iamVjdFV0aWxzLnJlbW92ZVVuZGVmaW5lZChvYmpba2V5XSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvdXRwdXRba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgIHJldHVybiBvYmoubWFwKG8gPT4gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKG8pKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJlbW92ZU51bGwob2JqOiBvYmplY3QpOiBhbnkge1xyXG4gICAgY29uc3Qgb3V0cHV0ID0ge307XHJcbiAgICBpZiAoT2JqZWN0VXRpbHMuaXNPYmplY3Qob2JqKSkge1xyXG4gICAgICBPYmplY3Qua2V5cyhvYmopXHJcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gb2JqW2tleV0gIT09IG51bGwpXHJcbiAgICAgICAgLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgIGlmIChPYmplY3RVdGlscy5pc09iamVjdChvYmpba2V5XSkgfHwgQXJyYXkuaXNBcnJheShvYmpba2V5XSkpIHtcclxuICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBPYmplY3RVdGlscy5yZW1vdmVOdWxsKG9ialtrZXldKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dHB1dFtrZXldID0gb2JqW2tleV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgICAgcmV0dXJuIG9iai5tYXAobyA9PiBPYmplY3RVdGlscy5yZW1vdmVOdWxsKG8pKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIG5hdHVyYWxDb21wYXJlKGEsIGIsIGRpcmVjdGlvbiA9ICdhc2MnLCBudWxsRmlyc3QgPSBmYWxzZSkge1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rlc2MnKSB7XHJcbiAgICAgIGIgPSBbYSwgKGEgPSBiKV1bMF07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCB8fCBhID09PSBudWxsIHx8IGEgPT09ICcnKSB7XHJcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdkZXNjJykge1xyXG4gICAgICAgIHJldHVybiBudWxsRmlyc3QgPyAtMSA6IDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG51bGxGaXJzdCA/IDEgOiAtMTtcclxuICAgIH1cclxuICAgIGlmIChiID09PSB1bmRlZmluZWQgfHwgYiA9PT0gbnVsbCB8fCBiID09PSAnJykge1xyXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnZGVzYycpIHtcclxuICAgICAgICByZXR1cm4gbnVsbEZpcnN0ID8gMSA6IC0xO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsRmlyc3QgPyAtMSA6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXggPSBbXTtcclxuICAgIGNvbnN0IGJ4ID0gW107XHJcbiAgICBhID0gJycgKyBhO1xyXG4gICAgYiA9ICcnICsgYjtcclxuXHJcbiAgICBhLnJlcGxhY2UoLyhcXGQrKXwoXFxEKykvZywgKF8sICQxLCAkMikgPT4ge1xyXG4gICAgICBheC5wdXNoKFskMSB8fCBJbmZpbml0eSwgJDIgfHwgJyddKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGIucmVwbGFjZSgvKFxcZCspfChcXEQrKS9nLCAoXywgJDEsICQyKSA9PiB7XHJcbiAgICAgIGJ4LnB1c2goWyQxIHx8IEluZmluaXR5LCAkMiB8fCAnJ10pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2hpbGUgKGF4Lmxlbmd0aCAmJiBieC5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgYW4gPSBheC5zaGlmdCgpO1xyXG4gICAgICBjb25zdCBibiA9IGJ4LnNoaWZ0KCk7XHJcbiAgICAgIGNvbnN0IG5uID0gYW5bMF0gLSBiblswXSB8fCBhblsxXS5sb2NhbGVDb21wYXJlKGJuWzFdKTtcclxuICAgICAgaWYgKG5uKSB7XHJcbiAgICAgICAgcmV0dXJuIG5uO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGF4Lmxlbmd0aCAtIGJ4Lmxlbmd0aDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHR3byBvYmplY3QgYXJlIGVxdWl2YWxlbnQuXHJcbiAgICogT2JqZWN0cyBhcmUgY29uc2lkZXJlZCBlcXVpdmFsZW50IGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBwcm9wZXJ0aWVzIGFuZFxyXG4gICAqIGlmIGFsbCBvZiB0aGVpciBwcm9wZXJ0aWVzIChmaXJzdC1sZXZlbCBvbmx5KSBzaGFyZSB0aGUgc2FtZSB2YWx1ZS5cclxuICAgKiBAcGFyYW0gb2JqMSBGaXJzdCBvYmplY3RcclxuICAgKiBAcGFyYW0gb2JqMiBTZWNvbmQgb2JqZWN0XHJcbiAgICogQHJldHVybnMgV2hldGhlciB0d28gb2JqZWN0cyBhcmVyIGVxdWl2YWxlbnRcclxuICAgKi9cclxuICBzdGF0aWMgb2JqZWN0c0FyZUVxdWl2YWxlbnQob2JqMTogb2JqZWN0LCBvYmoyOiBvYmplY3QpOiBib29sZWFuIHtcclxuICAgIGlmIChvYmoxID09PSBvYmoyKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9iajFQcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iajEpO1xyXG4gICAgY29uc3Qgb2JqMlByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqMik7XHJcbiAgICBpZiAob2JqMVByb3BzLmxlbmd0aCAhPT0gb2JqMlByb3BzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIG9iajFQcm9wcykge1xyXG4gICAgICBpZiAob2JqMVtwcm9wXSAhPT0gb2JqMltwcm9wXSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGEgbmV3IG9iamVjdCB3aXRoIGFuIGFycmF5IG9mIGtleXMgcmVtb3ZlZFxyXG4gICAqIEBwYXJhbSBvYmogU291cmNlIG9iamVjdFxyXG4gICAqIEBwYXJhbSBrZXlzIEtleXMgdG8gcmVtb3ZlXHJcbiAgICogQHJldHVybnMgQSBuZXcgb2JqZWN0XHJcbiAgICovXHJcbiAgc3RhdGljIHJlbW92ZUtleXMob2JqOiBvYmplY3QsIGtleXM6IHN0cmluZ1tdKTogb2JqZWN0IHtcclxuICAgIGNvbnN0IG5ld09iaiA9IE9iamVjdC5rZXlzKG9iailcclxuICAgICAgLmZpbHRlcihrZXkgPT4ga2V5cy5pbmRleE9mKGtleSkgPCAwKVxyXG4gICAgICAucmVkdWNlKChfb2JqLCBrZXkpID0+IHtcclxuICAgICAgICBfb2JqW2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICByZXR1cm4gX29iajtcclxuICAgICAgfSwge30pO1xyXG5cclxuICAgIHJldHVybiBuZXdPYmo7XHJcbiAgfVxyXG59XHJcbiJdfQ==