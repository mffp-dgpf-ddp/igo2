/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        if (ignoreUndefined === void 0) { ignoreUndefined = false; }
        /** @type {?} */
        var output = Object.assign({}, target);
        if (ObjectUtils.isObject(target) && ObjectUtils.isObject(source)) {
            Object.keys(source)
                .filter((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return !ignoreUndefined || source[key] !== undefined; }))
                .forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
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
                .filter((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return obj[key] !== undefined; }))
                .forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
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
            function (o) { return ObjectUtils.removeUndefined(o); }));
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
                .filter((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return obj[key] !== null; }))
                .forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
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
            function (o) { return ObjectUtils.removeNull(o); }));
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
        if (direction === void 0) { direction = 'asc'; }
        if (nullFirst === void 0) { nullFirst = false; }
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
        a.replace(/(\d+)|(\D+)/g, (/**
         * @param {?} _
         * @param {?} $1
         * @param {?} $2
         * @return {?}
         */
        function (_, $1, $2) {
            ax.push([$1 || Infinity, $2 || '']);
        }));
        b.replace(/(\d+)|(\D+)/g, (/**
         * @param {?} _
         * @param {?} $1
         * @param {?} $2
         * @return {?}
         */
        function (_, $1, $2) {
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
            for (var obj1Props_1 = tslib_1.__values(obj1Props), obj1Props_1_1 = obj1Props_1.next(); !obj1Props_1_1.done; obj1Props_1_1 = obj1Props_1.next()) {
                var prop = obj1Props_1_1.value;
                if (obj1[prop] !== obj2[prop]) {
                    return false;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (obj1Props_1_1 && !obj1Props_1_1.done && (_a = obj1Props_1.return)) _a.call(obj1Props_1);
            }
            finally { if (e_1) throw e_1.error; }
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
            .filter((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return keys.indexOf(key) < 0; }))
            .reduce((/**
         * @param {?} _obj
         * @param {?} key
         * @return {?}
         */
        function (_obj, key) {
            _obj[key] = obj[key];
            return _obj;
        }), {});
        return newObj;
    };
    return ObjectUtils;
}());
export { ObjectUtils };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LXV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvdXRpbHMvIiwic291cmNlcyI6WyJsaWIvb2JqZWN0LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7SUFBQTtJQTRMQSxDQUFDOzs7Ozs7SUEzTFEsbUJBQU87Ozs7O0lBQWQsVUFBZSxHQUFXLEVBQUUsR0FBVzs7WUFDL0IsU0FBUyxHQUFHLEdBQUc7YUFDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7YUFDbkIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7YUFDbEIsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7WUFDVCxPQUFPLEdBQUcsR0FBRztRQUNqQixPQUFPLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQy9CLE9BQU8sU0FBUyxDQUFDO2FBQ2xCO1lBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN0QztRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRU0sb0JBQVE7Ozs7SUFBZixVQUFnQixJQUFZO1FBQzFCLE9BQU8sQ0FDTCxJQUFJO1lBQ0osT0FBTyxJQUFJLEtBQUssUUFBUTtZQUN4QixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3BCLElBQUksS0FBSyxJQUFJO1lBQ2IsQ0FBQyxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsQ0FDeEIsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7SUFFTSxxQkFBUzs7Ozs7O0lBQWhCLFVBQ0UsTUFBYyxFQUNkLE1BQWMsRUFDZCxlQUF1QjtRQUF2QixnQ0FBQSxFQUFBLHVCQUF1Qjs7WUFFakIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQztRQUN4QyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztpQkFDaEIsTUFBTTs7OztZQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQyxlQUFlLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBN0MsQ0FBNkMsRUFBQztpQkFDNUQsT0FBTzs7OztZQUFDLFVBQUEsR0FBRzs7Z0JBQ1YsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUNyQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLEVBQUU7d0JBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxZQUFJLEdBQUMsR0FBRyxJQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBRyxDQUFDO3FCQUMvQzt5QkFBTTt3QkFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FDakMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFDWCxlQUFlLENBQ2hCLENBQUM7cUJBQ0g7aUJBQ0Y7cUJBQU07b0JBQ0wsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLFlBQUksR0FBQyxHQUFHLElBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFHLENBQUM7aUJBQy9DO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRU0sMkJBQWU7Ozs7SUFBdEIsVUFBdUIsR0FBVzs7WUFDMUIsTUFBTSxHQUFHLEVBQUU7UUFDakIsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNiLE1BQU07Ozs7WUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLEVBQXRCLENBQXNCLEVBQUM7aUJBQ3JDLE9BQU87Ozs7WUFBQyxVQUFBLEdBQUc7Z0JBQ1YsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQzdELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNyRDtxQkFBTTtvQkFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN4QjtZQUNILENBQUMsRUFBQyxDQUFDO1lBRUwsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUVELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QixPQUFPLEdBQUcsQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUE5QixDQUE4QixFQUFDLENBQUM7U0FDckQ7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Ozs7O0lBRU0sc0JBQVU7Ozs7SUFBakIsVUFBa0IsR0FBVzs7WUFDckIsTUFBTSxHQUFHLEVBQUU7UUFDakIsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNiLE1BQU07Ozs7WUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQWpCLENBQWlCLEVBQUM7aUJBQ2hDLE9BQU87Ozs7WUFBQyxVQUFBLEdBQUc7Z0JBQ1YsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQzdELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNoRDtxQkFBTTtvQkFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN4QjtZQUNILENBQUMsRUFBQyxDQUFDO1lBRUwsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUVELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QixPQUFPLEdBQUcsQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUF6QixDQUF5QixFQUFDLENBQUM7U0FDaEQ7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Ozs7Ozs7O0lBRU0sMEJBQWM7Ozs7Ozs7SUFBckIsVUFBc0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFpQixFQUFFLFNBQWlCO1FBQXBDLDBCQUFBLEVBQUEsaUJBQWlCO1FBQUUsMEJBQUEsRUFBQSxpQkFBaUI7UUFDOUQsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO1lBQ3hCLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxDQUFDLEtBQUssU0FBUyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM3QyxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7Z0JBQ3hCLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNCO1lBQ0QsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsS0FBSyxTQUFTLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzdDLElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRTtnQkFDeEIsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0I7WUFDRCxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzQjs7WUFFSyxFQUFFLEdBQUcsRUFBRTs7WUFDUCxFQUFFLEdBQUcsRUFBRTtRQUNiLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFWCxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWM7Ozs7OztRQUFFLFVBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ2xDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsRUFBQyxDQUFDO1FBRUgsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjOzs7Ozs7UUFBRSxVQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUNsQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QyxDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sRUFBRSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFOztnQkFDdkIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUU7O2dCQUNmLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFOztnQkFDZixFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLEVBQUUsRUFBRTtnQkFDTixPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0Y7UUFFRCxPQUFPLEVBQUUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRzs7Ozs7Ozs7O0lBQ0ksZ0NBQW9COzs7Ozs7OztJQUEzQixVQUE0QixJQUFZLEVBQUUsSUFBWTs7UUFDcEQsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7O1lBRUssU0FBUyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7O1lBQzVDLFNBQVMsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1FBQ2xELElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3pDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7O1lBRUQsS0FBbUIsSUFBQSxjQUFBLGlCQUFBLFNBQVMsQ0FBQSxvQ0FBQSwyREFBRTtnQkFBekIsSUFBTSxJQUFJLHNCQUFBO2dCQUNiLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDN0IsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7YUFDRjs7Ozs7Ozs7O1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7SUFDSSxzQkFBVTs7Ozs7O0lBQWpCLFVBQWtCLEdBQVcsRUFBRSxJQUFjOztZQUNyQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDNUIsTUFBTTs7OztRQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQXJCLENBQXFCLEVBQUM7YUFDcEMsTUFBTTs7Ozs7UUFBQyxVQUFDLElBQUksRUFBRSxHQUFHO1lBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLEdBQUUsRUFBRSxDQUFDO1FBRVIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQTVMRCxJQTRMQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBPYmplY3RVdGlscyB7XHJcbiAgc3RhdGljIHJlc29sdmUob2JqOiBvYmplY3QsIGtleTogc3RyaW5nKTogYW55IHtcclxuICAgIGNvbnN0IGtleXNBcnJheSA9IGtleVxyXG4gICAgICAucmVwbGFjZSgvXFxbL2csICcuJylcclxuICAgICAgLnJlcGxhY2UoL1xcXS9nLCAnJylcclxuICAgICAgLnNwbGl0KCcuJyk7XHJcbiAgICBsZXQgY3VycmVudCA9IG9iajtcclxuICAgIHdoaWxlIChrZXlzQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY3VycmVudCAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50W2tleXNBcnJheS5zaGlmdCgpXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycmVudDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpc09iamVjdChpdGVtOiBvYmplY3QpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIGl0ZW0gJiZcclxuICAgICAgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmXHJcbiAgICAgICFBcnJheS5pc0FycmF5KGl0ZW0pICYmXHJcbiAgICAgIGl0ZW0gIT09IG51bGwgJiZcclxuICAgICAgIShpdGVtIGluc3RhbmNlb2YgRGF0ZSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbWVyZ2VEZWVwKFxyXG4gICAgdGFyZ2V0OiBvYmplY3QsXHJcbiAgICBzb3VyY2U6IG9iamVjdCxcclxuICAgIGlnbm9yZVVuZGVmaW5lZCA9IGZhbHNlXHJcbiAgKTogYW55IHtcclxuICAgIGNvbnN0IG91dHB1dCA9IE9iamVjdC5hc3NpZ24oe30sIHRhcmdldCk7XHJcbiAgICBpZiAoT2JqZWN0VXRpbHMuaXNPYmplY3QodGFyZ2V0KSAmJiBPYmplY3RVdGlscy5pc09iamVjdChzb3VyY2UpKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSlcclxuICAgICAgICAuZmlsdGVyKGtleSA9PiAhaWdub3JlVW5kZWZpbmVkIHx8IHNvdXJjZVtrZXldICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgIGlmIChPYmplY3RVdGlscy5pc09iamVjdChzb3VyY2Vba2V5XSkpIHtcclxuICAgICAgICAgICAgaWYgKCEoa2V5IGluIHRhcmdldCkpIHtcclxuICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG91dHB1dCwgeyBba2V5XTogc291cmNlW2tleV0gfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBPYmplY3RVdGlscy5tZXJnZURlZXAoXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSxcclxuICAgICAgICAgICAgICAgIHNvdXJjZVtrZXldLFxyXG4gICAgICAgICAgICAgICAgaWdub3JlVW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIHsgW2tleV06IHNvdXJjZVtrZXldIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dHB1dDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyByZW1vdmVVbmRlZmluZWQob2JqOiBvYmplY3QpOiBhbnkge1xyXG4gICAgY29uc3Qgb3V0cHV0ID0ge307XHJcbiAgICBpZiAoT2JqZWN0VXRpbHMuaXNPYmplY3Qob2JqKSkge1xyXG4gICAgICBPYmplY3Qua2V5cyhvYmopXHJcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gb2JqW2tleV0gIT09IHVuZGVmaW5lZClcclxuICAgICAgICAuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzT2JqZWN0KG9ialtrZXldKSB8fCBBcnJheS5pc0FycmF5KG9ialtrZXldKSkge1xyXG4gICAgICAgICAgICBvdXRwdXRba2V5XSA9IE9iamVjdFV0aWxzLnJlbW92ZVVuZGVmaW5lZChvYmpba2V5XSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvdXRwdXRba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgIHJldHVybiBvYmoubWFwKG8gPT4gT2JqZWN0VXRpbHMucmVtb3ZlVW5kZWZpbmVkKG8pKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJlbW92ZU51bGwob2JqOiBvYmplY3QpOiBhbnkge1xyXG4gICAgY29uc3Qgb3V0cHV0ID0ge307XHJcbiAgICBpZiAoT2JqZWN0VXRpbHMuaXNPYmplY3Qob2JqKSkge1xyXG4gICAgICBPYmplY3Qua2V5cyhvYmopXHJcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gb2JqW2tleV0gIT09IG51bGwpXHJcbiAgICAgICAgLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgIGlmIChPYmplY3RVdGlscy5pc09iamVjdChvYmpba2V5XSkgfHwgQXJyYXkuaXNBcnJheShvYmpba2V5XSkpIHtcclxuICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBPYmplY3RVdGlscy5yZW1vdmVOdWxsKG9ialtrZXldKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dHB1dFtrZXldID0gb2JqW2tleV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgICAgcmV0dXJuIG9iai5tYXAobyA9PiBPYmplY3RVdGlscy5yZW1vdmVOdWxsKG8pKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIG5hdHVyYWxDb21wYXJlKGEsIGIsIGRpcmVjdGlvbiA9ICdhc2MnLCBudWxsRmlyc3QgPSBmYWxzZSkge1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rlc2MnKSB7XHJcbiAgICAgIGIgPSBbYSwgKGEgPSBiKV1bMF07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCB8fCBhID09PSBudWxsIHx8IGEgPT09ICcnKSB7XHJcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdkZXNjJykge1xyXG4gICAgICAgIHJldHVybiBudWxsRmlyc3QgPyAtMSA6IDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG51bGxGaXJzdCA/IDEgOiAtMTtcclxuICAgIH1cclxuICAgIGlmIChiID09PSB1bmRlZmluZWQgfHwgYiA9PT0gbnVsbCB8fCBiID09PSAnJykge1xyXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnZGVzYycpIHtcclxuICAgICAgICByZXR1cm4gbnVsbEZpcnN0ID8gMSA6IC0xO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsRmlyc3QgPyAtMSA6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXggPSBbXTtcclxuICAgIGNvbnN0IGJ4ID0gW107XHJcbiAgICBhID0gJycgKyBhO1xyXG4gICAgYiA9ICcnICsgYjtcclxuXHJcbiAgICBhLnJlcGxhY2UoLyhcXGQrKXwoXFxEKykvZywgKF8sICQxLCAkMikgPT4ge1xyXG4gICAgICBheC5wdXNoKFskMSB8fCBJbmZpbml0eSwgJDIgfHwgJyddKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGIucmVwbGFjZSgvKFxcZCspfChcXEQrKS9nLCAoXywgJDEsICQyKSA9PiB7XHJcbiAgICAgIGJ4LnB1c2goWyQxIHx8IEluZmluaXR5LCAkMiB8fCAnJ10pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2hpbGUgKGF4Lmxlbmd0aCAmJiBieC5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgYW4gPSBheC5zaGlmdCgpO1xyXG4gICAgICBjb25zdCBibiA9IGJ4LnNoaWZ0KCk7XHJcbiAgICAgIGNvbnN0IG5uID0gYW5bMF0gLSBiblswXSB8fCBhblsxXS5sb2NhbGVDb21wYXJlKGJuWzFdKTtcclxuICAgICAgaWYgKG5uKSB7XHJcbiAgICAgICAgcmV0dXJuIG5uO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGF4Lmxlbmd0aCAtIGJ4Lmxlbmd0aDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHR3byBvYmplY3QgYXJlIGVxdWl2YWxlbnQuXHJcbiAgICogT2JqZWN0cyBhcmUgY29uc2lkZXJlZCBlcXVpdmFsZW50IGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBwcm9wZXJ0aWVzIGFuZFxyXG4gICAqIGlmIGFsbCBvZiB0aGVpciBwcm9wZXJ0aWVzIChmaXJzdC1sZXZlbCBvbmx5KSBzaGFyZSB0aGUgc2FtZSB2YWx1ZS5cclxuICAgKiBAcGFyYW0gb2JqMSBGaXJzdCBvYmplY3RcclxuICAgKiBAcGFyYW0gb2JqMiBTZWNvbmQgb2JqZWN0XHJcbiAgICogQHJldHVybnMgV2hldGhlciB0d28gb2JqZWN0cyBhcmVyIGVxdWl2YWxlbnRcclxuICAgKi9cclxuICBzdGF0aWMgb2JqZWN0c0FyZUVxdWl2YWxlbnQob2JqMTogb2JqZWN0LCBvYmoyOiBvYmplY3QpOiBib29sZWFuIHtcclxuICAgIGlmIChvYmoxID09PSBvYmoyKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9iajFQcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iajEpO1xyXG4gICAgY29uc3Qgb2JqMlByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqMik7XHJcbiAgICBpZiAob2JqMVByb3BzLmxlbmd0aCAhPT0gb2JqMlByb3BzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIG9iajFQcm9wcykge1xyXG4gICAgICBpZiAob2JqMVtwcm9wXSAhPT0gb2JqMltwcm9wXSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGEgbmV3IG9iamVjdCB3aXRoIGFuIGFycmF5IG9mIGtleXMgcmVtb3ZlZFxyXG4gICAqIEBwYXJhbSBvYmogU291cmNlIG9iamVjdFxyXG4gICAqIEBwYXJhbSBrZXlzIEtleXMgdG8gcmVtb3ZlXHJcbiAgICogQHJldHVybnMgQSBuZXcgb2JqZWN0XHJcbiAgICovXHJcbiAgc3RhdGljIHJlbW92ZUtleXMob2JqOiBvYmplY3QsIGtleXM6IHN0cmluZ1tdKTogb2JqZWN0IHtcclxuICAgIGNvbnN0IG5ld09iaiA9IE9iamVjdC5rZXlzKG9iailcclxuICAgICAgLmZpbHRlcihrZXkgPT4ga2V5cy5pbmRleE9mKGtleSkgPCAwKVxyXG4gICAgICAucmVkdWNlKChfb2JqLCBrZXkpID0+IHtcclxuICAgICAgICBfb2JqW2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICByZXR1cm4gX29iajtcclxuICAgICAgfSwge30pO1xyXG5cclxuICAgIHJldHVybiBuZXdPYmo7XHJcbiAgfVxyXG59XHJcbiJdfQ==