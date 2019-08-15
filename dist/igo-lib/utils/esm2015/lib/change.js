/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { StringUtils } from './string-utils';
import { ChangeType } from './change.interface';
export class ChangeUtils {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvdXRpbHMvIiwic291cmNlcyI6WyJsaWIvY2hhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFtQixVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVqRSxNQUFNLE9BQU8sV0FBVzs7Ozs7OztJQUN0QixNQUFNLENBQUMsV0FBVyxDQUNoQixJQUFXLEVBQ1gsSUFBVyxFQUNYLGFBQXVCLEVBQUU7O2NBRW5CLEtBQUssR0FBb0I7WUFDN0IsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUUsRUFBRTtZQUNYLFFBQVEsRUFBRSxFQUFFO1NBQ2I7UUFFRCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2xCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7O2NBRUssU0FBUyxHQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7O2NBQzFCLFNBQVMsR0FBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRWhDLEtBQUssTUFBTSxRQUFRLElBQUksU0FBUyxFQUFFOztrQkFDMUIsS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLFFBQVEsQ0FBQyxFQUFFLEVBQUM7WUFFNUQsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ2hCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNqQixNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLE9BQU8sRUFBRTtvQkFDcEMsS0FBSyxFQUFFLFFBQVE7aUJBQ2hCLENBQUMsQ0FBQztnQkFDSCxTQUFTO2FBQ1Y7O2tCQUVLLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENB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QUUsU0FBUyxDQUFDLENBQzFELENBQUM7YUFDSDtpQkFBTTtnQkFDTCxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ2pDLFdBQVcsQ0FBQyxJQUFJLENBQUM7d0JBQ2YsR0FBRyxFQUFFLFNBQVM7d0JBQ2QsUUFBUSxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUM7d0JBQzVCLFFBQVEsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDO3FCQUMzQixDQUFDLENBQUM7b0JBQ0gsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUM5RDthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdHJpbmdVdGlscyB9IGZyb20gJy4vc3RyaW5nLXV0aWxzJztcclxuaW1wb3J0IHsgR3JvdXBpbmdDaGFuZ2VzLCBDaGFuZ2VUeXBlIH0gZnJvbSAnLi9jaGFuZ2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFuZ2VVdGlscyB7XHJcbiAgc3RhdGljIGZpbmRDaGFuZ2VzKFxyXG4gICAgb2JqMTogYW55W10sXHJcbiAgICBvYmoyOiBhbnlbXSxcclxuICAgIGlnbm9yZUtleXM6IHN0cmluZ1tdID0gW11cclxuICApOiBHcm91cGluZ0NoYW5nZXMge1xyXG4gICAgY29uc3QgaXRlbXM6IEdyb3VwaW5nQ2hhbmdlcyA9IHtcclxuICAgICAgYWRkZWQ6IFtdLFxyXG4gICAgICBkZWxldGVkOiBbXSxcclxuICAgICAgbW9kaWZpZWQ6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghb2JqMSB8fCAhb2JqMikge1xyXG4gICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb2JqMUNsb25lOiBhbnkgPSBbLi4ub2JqMV07XHJcbiAgICBjb25zdCBvYmoyQ2xvbmU6IGFueSA9IFsuLi5vYmoyXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGZyb21JdGVtIG9mIG9iajFDbG9uZSkge1xyXG4gICAgICBjb25zdCBpbmRleCA9IG9iajJDbG9uZS5maW5kSW5kZXgocyA9PiBzLmlkID09PSBmcm9tSXRlbS5pZCk7XHJcblxyXG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgaXRlbXMuZGVsZXRlZC5wdXNoKHtcclxuICAgICAgICAgIGNoYW5nZTogeyB0eXBlOiBDaGFuZ2VUeXBlLkRFTEVURUQgfSxcclxuICAgICAgICAgIHZhbHVlOiBmcm9tSXRlbVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB0b0l0ZW0gPSBvYmoyQ2xvbmUuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuICAgICAgY29uc3QgZnJvbUl0ZW1DbG9uZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZnJvbUl0ZW0pKTtcclxuICAgICAgY29uc3QgdG9JdGVtQ2xvbmUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRvSXRlbSkpO1xyXG5cclxuICAgICAgY29uc3Qga2V5c0NoYW5nZWQgPSBDaGFuZ2VVdGlscy5jb21wYXJlT2JqZWN0KFxyXG4gICAgICAgIGZyb21JdGVtQ2xvbmUsXHJcbiAgICAgICAgdG9JdGVtQ2xvbmUsXHJcbiAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgIGlnbm9yZUtleXNcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChrZXlzQ2hhbmdlZC5sZW5ndGgpIHtcclxuICAgICAgICBpdGVtcy5tb2RpZmllZC5wdXNoKHtcclxuICAgICAgICAgIGNoYW5nZToge1xyXG4gICAgICAgICAgICB0eXBlOiBDaGFuZ2VUeXBlLk1PRElGSUVELFxyXG4gICAgICAgICAgICBrZXlzQ2hhbmdlZFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZhbHVlOiBmcm9tSXRlbUNsb25lLFxyXG4gICAgICAgICAgb2xkVmFsdWU6IGZyb21JdGVtLFxyXG4gICAgICAgICAgbmV3VmFsdWU6IHRvSXRlbVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXRlbXMuYWRkZWQgPSBvYmoyQ2xvbmUubWFwKGl0ZW1BZGRlZCA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY2hhbmdlOiB7IHR5cGU6IENoYW5nZVR5cGUuQURERUQgfSxcclxuICAgICAgICB2YWx1ZTogaXRlbUFkZGVkXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaXRlbXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBjb21wYXJlT2JqZWN0KGZyb21JdGVtLCB0b0l0ZW0sIGJhc2VLZXk/LCBpZ25vcmVLZXlzID0gW10pIHtcclxuICAgIGNvbnN0IGZyb21JdGVtQ2xvbmUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZyb21JdGVtKSk7XHJcbiAgICBjb25zdCB0b0l0ZW1DbG9uZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodG9JdGVtKSk7XHJcblxyXG4gICAgY29uc3Qga2V5czogYW55ID0gbmV3IFNldChbXHJcbiAgICAgIC4uLk9iamVjdC5rZXlzKGZyb21JdGVtKSxcclxuICAgICAgLi4uT2JqZWN0LmtleXModG9JdGVtKVxyXG4gICAgXSk7XHJcbiAgICBsZXQga2V5c0NoYW5nZWQgPSBbXTtcclxuICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBjb25zdCBrZXlTdHJpbmcgPSBiYXNlS2V5ID8gYCR7YmFzZUtleX0uJHtrZXl9YCA6IGtleTtcclxuICAgICAgaWYgKGlnbm9yZUtleXMuaW5kZXhPZihrZXlTdHJpbmcpICE9PSAtMSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZnJvbUl0ZW1ba2V5XSkpIHtcclxuICAgICAgICBmcm9tSXRlbVtrZXldID0gZnJvbUl0ZW1ba2V5XS5qb2luKCcsPGJyPicpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRvSXRlbVtrZXldKSkge1xyXG4gICAgICAgIHRvSXRlbVtrZXldID0gdG9JdGVtW2tleV0uam9pbignLDxicj4nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHR5cGVvZiBmcm9tSXRlbVtrZXldID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgIHR5cGVvZiB0b0l0ZW1ba2V5XSA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICBmcm9tSXRlbVtrZXldICE9PSBudWxsICYmXHJcbiAgICAgICAgdG9JdGVtW2tleV0gIT09IG51bGxcclxuICAgICAgKSB7XHJcbiAgICAgICAga2V5c0NoYW5nZWQgPSBrZXlzQ2hhbmdlZC5jb25jYXQoXHJcbiAgICAgICAgICB0aGlzLmNvbXBhcmVPYmplY3QoZnJvbUl0ZW1ba2V5XSwgdG9JdGVtW2tleV0sIGtleVN0cmluZylcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChmcm9tSXRlbVtrZXldICE9PSB0b0l0ZW1ba2V5XSkge1xyXG4gICAgICAgICAga2V5c0NoYW5nZWQucHVzaCh7XHJcbiAgICAgICAgICAgIGtleToga2V5U3RyaW5nLFxyXG4gICAgICAgICAgICBvbGRWYWx1ZTogZnJvbUl0ZW1DbG9uZVtrZXldLFxyXG4gICAgICAgICAgICBuZXdWYWx1ZTogdG9JdGVtQ2xvbmVba2V5XVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBmcm9tSXRlbVtrZXldID0gU3RyaW5nVXRpbHMuZGlmZihmcm9tSXRlbVtrZXldLCB0b0l0ZW1ba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ga2V5c0NoYW5nZWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==