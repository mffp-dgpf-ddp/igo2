/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { StringUtils } from './string-utils';
import { ChangeType } from './change.interface';
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
        if (ignoreKeys === void 0) { ignoreKeys = []; }
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
        var obj1Clone = tslib_1.__spread(obj1);
        /** @type {?} */
        var obj2Clone = tslib_1.__spread(obj2);
        var _loop_1 = function (fromItem) {
            /** @type {?} */
            var index = obj2Clone.findIndex((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return s.id === fromItem.id; }));
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
            for (var obj1Clone_1 = tslib_1.__values(obj1Clone), obj1Clone_1_1 = obj1Clone_1.next(); !obj1Clone_1_1.done; obj1Clone_1_1 = obj1Clone_1.next()) {
                var fromItem = obj1Clone_1_1.value;
                _loop_1(fromItem);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (obj1Clone_1_1 && !obj1Clone_1_1.done && (_a = obj1Clone_1.return)) _a.call(obj1Clone_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        items.added = obj2Clone.map((/**
         * @param {?} itemAdded
         * @return {?}
         */
        function (itemAdded) {
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
        if (ignoreKeys === void 0) { ignoreKeys = []; }
        /** @type {?} */
        var fromItemClone = JSON.parse(JSON.stringify(fromItem));
        /** @type {?} */
        var toItemClone = JSON.parse(JSON.stringify(toItem));
        /** @type {?} */
        var keys = new Set(tslib_1.__spread(Object.keys(fromItem), Object.keys(toItem)));
        /** @type {?} */
        var keysChanged = [];
        keys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
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
export { ChangeUtils };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvdXRpbHMvIiwic291cmNlcyI6WyJsaWIvY2hhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBbUIsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFakU7SUFBQTtJQTZHQSxDQUFDOzs7Ozs7O0lBNUdRLHVCQUFXOzs7Ozs7SUFBbEIsVUFDRSxJQUFXLEVBQ1gsSUFBVyxFQUNYLFVBQXlCO1FBQXpCLDJCQUFBLEVBQUEsZUFBeUI7OztZQUVuQixLQUFLLEdBQW9CO1lBQzdCLEtBQUssRUFBRSxFQUFFO1lBQ1QsT0FBTyxFQUFFLEVBQUU7WUFDWCxRQUFRLEVBQUUsRUFBRTtTQUNiO1FBRUQsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNsQixPQUFPLEtBQUssQ0FBQztTQUNkOztZQUVLLFNBQVMsb0JBQVksSUFBSSxDQUFDOztZQUMxQixTQUFTLG9CQUFZLElBQUksQ0FBQztnQ0FFckIsUUFBUTs7Z0JBQ1gsS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLFFBQVEsQ0FBQyxFQUFFLEVBQXBCLENBQW9CLEVBQUM7WUFFNUQsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ2hCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNqQixNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLE9BQU8sRUFBRTtvQkFDcEMsS0FBSyxFQUFFLFFBQVE7aUJBQ2hCLENBQUMsQ0FBQzs7YUFFSjs7Z0JBRUssTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ3RDLGFBQWEsR0FB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LEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FDMUQsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDakMsV0FBVyxDQUFDLElBQUksQ0FBQzt3QkFDZixHQUFHLEVBQUUsU0FBUzt3QkFDZCxRQUFRLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQzt3QkFDNUIsUUFBUSxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUM7cUJBQzNCLENBQUMsQ0FBQztvQkFDSCxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQzlEO2FBQ0Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUE3R0QsSUE2R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdHJpbmdVdGlscyB9IGZyb20gJy4vc3RyaW5nLXV0aWxzJztcclxuaW1wb3J0IHsgR3JvdXBpbmdDaGFuZ2VzLCBDaGFuZ2VUeXBlIH0gZnJvbSAnLi9jaGFuZ2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFuZ2VVdGlscyB7XHJcbiAgc3RhdGljIGZpbmRDaGFuZ2VzKFxyXG4gICAgb2JqMTogYW55W10sXHJcbiAgICBvYmoyOiBhbnlbXSxcclxuICAgIGlnbm9yZUtleXM6IHN0cmluZ1tdID0gW11cclxuICApOiBHcm91cGluZ0NoYW5nZXMge1xyXG4gICAgY29uc3QgaXRlbXM6IEdyb3VwaW5nQ2hhbmdlcyA9IHtcclxuICAgICAgYWRkZWQ6IFtdLFxyXG4gICAgICBkZWxldGVkOiBbXSxcclxuICAgICAgbW9kaWZpZWQ6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghb2JqMSB8fCAhb2JqMikge1xyXG4gICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb2JqMUNsb25lOiBhbnkgPSBbLi4ub2JqMV07XHJcbiAgICBjb25zdCBvYmoyQ2xvbmU6IGFueSA9IFsuLi5vYmoyXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGZyb21JdGVtIG9mIG9iajFDbG9uZSkge1xyXG4gICAgICBjb25zdCBpbmRleCA9IG9iajJDbG9uZS5maW5kSW5kZXgocyA9PiBzLmlkID09PSBmcm9tSXRlbS5pZCk7XHJcblxyXG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgaXRlbXMuZGVsZXRlZC5wdXNoKHtcclxuICAgICAgICAgIGNoYW5nZTogeyB0eXBlOiBDaGFuZ2VUeXBlLkRFTEVURUQgfSxcclxuICAgICAgICAgIHZhbHVlOiBmcm9tSXRlbVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB0b0l0ZW0gPSBvYmoyQ2xvbmUuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuICAgICAgY29uc3QgZnJvbUl0ZW1DbG9uZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZnJvbUl0ZW0pKTtcclxuICAgICAgY29uc3QgdG9JdGVtQ2xvbmUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRvSXRlbSkpO1xyXG5cclxuICAgICAgY29uc3Qga2V5c0NoYW5nZWQgPSBDaGFuZ2VVdGlscy5jb21wYXJlT2JqZWN0KFxyXG4gICAgICAgIGZyb21JdGVtQ2xvbmUsXHJcbiAgICAgICAgdG9JdGVtQ2xvbmUsXHJcbiAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgIGlnbm9yZUtleXNcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChrZXlzQ2hhbmdlZC5sZW5ndGgpIHtcclxuICAgICAgICBpdGVtcy5tb2RpZmllZC5wdXNoKHtcclxuICAgICAgICAgIGNoYW5nZToge1xyXG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLk1PRElGSUVELFxyXG4gICAgICAgICAgICBrZXlzQ2hhbmdlZFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZhbHVlOiBmcm9tSXRlbUNsb25lLFxyXG4gICAgICAgICAgb2xkVmFsdWU6IGZyb21JdGVtLFxyXG4gICAgICAgICAgbmV3VmFsdWU6IHRvSXRlbVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXRlbXMuYWRkZWQgPSBvYmoyQ2xvbmUubWFwKGl0ZW1BZGRlZCA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY2hhbmdlOiB7IHR5cGU6IENoYW5nZVR5cGUuQURERUQgfSxcclxuICAgICAgICB2YWx1ZTogaXRlbUFkZGVkXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaXRlbXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBjb21wYXJlT2JqZWN0KGZyb21JdGVtLCB0b0l0ZW0sIGJhc2VLZXk/LCBpZ25vcmVLZXlzID0gW10pIHtcclxuICAgIGNvbnN0IGZyb21JdGVtQ2xvbmUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZyb21JdGVtKSk7XHJcbiAgICBjb25zdCB0b0l0ZW1DbG9uZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodG9JdGVtKSk7XHJcblxyXG4gICAgY29uc3Qga2V5czogYW55ID0gbmV3IFNldChbXHJcbiAgICAgIC4uLk9iamVjdC5rZXlzKGZyb21JdGVtKSxcclxuICAgICAgLi4uT2JqZWN0LmtleXModG9JdGVtKVxyXG4gICAgXSk7XHJcbiAgICBsZXQga2V5c0NoYW5nZWQgPSBbXTtcclxuICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBjb25zdCBrZXlTdHJpbmcgPSBiYXNlS2V5ID8gYCR7YmFzZUtleX0uJHtrZXl9YCA6IGtleTtcclxuICAgICAgaWYgKGlnbm9yZUtleXMuaW5kZXhPZihrZXlTdHJpbmcpICE9PSAtMSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZnJvbUl0ZW1ba2V5XSkpIHtcclxuICAgICAgICBmcm9tSXRlbVtrZXldID0gZnJvbUl0ZW1ba2V5XS5qb2luKCcsPGJyPicpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRvSXRlbVtrZXldKSkge1xyXG4gICAgICAgIHRvSXRlbVtrZXldID0gdG9JdGVtW2tleV0uam9pbignLDxicj4nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHR5cGVvZiBmcm9tSXRlbVtrZXldID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgIHR5cGVvZiB0b0l0ZW1ba2V5XSA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICBmcm9tSXRlbVtrZXldICE9PSBudWxsICYmXHJcbiAgICAgICAgdG9JdGVtW2tleV0gIT09IG51bGxcclxuICAgICAgKSB7XHJcbiAgICAgICAga2V5c0NoYW5nZWQgPSBrZXlzQ2hhbmdlZC5jb25jYXQoXHJcbiAgICAgICAgICB0aGlzLmNvbXBhcmVPYmplY3QoZnJvbUl0ZW1ba2V5XSwgdG9JdGVtW2tleV0sIGtleVN0cmluZylcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChmcm9tSXRlbVtrZXldICE9PSB0b0l0ZW1ba2V5XSkge1xyXG4gICAgICAgICAga2V5c0NoYW5nZWQucHVzaCh7XHJcbiAgICAgICAgICAgIGtleToga2V5U3RyaW5nLFxyXG4gICAgICAgICAgICBvbGRWYWx1ZTogZnJvbUl0ZW1DbG9uZVtrZXldLFxyXG4gICAgICAgICAgICBuZXdWYWx1ZTogdG9JdGVtQ2xvbmVba2V5XVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBmcm9tSXRlbVtrZXldID0gU3RyaW5nVXRpbHMuZGlmZihmcm9tSXRlbVtrZXldLCB0b0l0ZW1ba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ga2V5c0NoYW5nZWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==