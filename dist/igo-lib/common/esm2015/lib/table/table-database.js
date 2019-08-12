/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject } from 'rxjs';
export class TableDatabase {
    /**
     * @param {?=} data
     */
    constructor(data) {
        /**
         * Stream that emits whenever the data has been modified.
         */
        this.dataChange = new BehaviorSubject([]);
        if (data) {
            this.dataChange.next(data);
        }
    }
    /**
     * @return {?}
     */
    get data() {
        return this.dataChange.value;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    set(data) {
        this.dataChange.next(data);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    add(item) {
        /** @type {?} */
        const copiedData = this.data.slice();
        copiedData.push(item);
        this.set(copiedData);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        /** @type {?} */
        const copiedData = this.data.slice();
        /** @type {?} */
        const index = copiedData.indexOf(item);
        copiedData.splice(index, 1);
        this.set(copiedData);
    }
}
if (false) {
    /**
     * Stream that emits whenever the data has been modified.
     * @type {?}
     */
    TableDatabase.prototype.dataChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGF0YWJhc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvdGFibGUvdGFibGUtZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFdkMsTUFBTSxPQUFPLGFBQWE7Ozs7SUFPeEIsWUFBWSxJQUFLOzs7O1FBTGpCLGVBQVUsR0FBMkIsSUFBSSxlQUFlLENBQVEsRUFBRSxDQUFDLENBQUM7UUFNbEUsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7Ozs7SUFSRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBUUQsR0FBRyxDQUFDLElBQUk7UUFDTixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELEdBQUcsQ0FBQyxJQUFJOztjQUNBLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNwQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBSTs7Y0FDSCxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7O2NBQzlCLEtBQUssR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN0QyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjs7Ozs7O0lBM0JDLG1DQUFvRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxlRGF0YWJhc2Uge1xyXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgZGF0YSBoYXMgYmVlbiBtb2RpZmllZC4gKi9cclxuICBkYXRhQ2hhbmdlOiBCZWhhdmlvclN1YmplY3Q8YW55W10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnlbXT4oW10pO1xyXG4gIGdldCBkYXRhKCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFDaGFuZ2UudmFsdWU7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhPykge1xyXG4gICAgaWYgKGRhdGEpIHtcclxuICAgICAgdGhpcy5kYXRhQ2hhbmdlLm5leHQoZGF0YSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXQoZGF0YSkge1xyXG4gICAgdGhpcy5kYXRhQ2hhbmdlLm5leHQoZGF0YSk7XHJcbiAgfVxyXG5cclxuICBhZGQoaXRlbSkge1xyXG4gICAgY29uc3QgY29waWVkRGF0YSA9IHRoaXMuZGF0YS5zbGljZSgpO1xyXG4gICAgY29waWVkRGF0YS5wdXNoKGl0ZW0pO1xyXG4gICAgdGhpcy5zZXQoY29waWVkRGF0YSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmUoaXRlbSkge1xyXG4gICAgY29uc3QgY29waWVkRGF0YSA9IHRoaXMuZGF0YS5zbGljZSgpO1xyXG4gICAgY29uc3QgaW5kZXggPSBjb3BpZWREYXRhLmluZGV4T2YoaXRlbSk7XHJcbiAgICBjb3BpZWREYXRhLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB0aGlzLnNldChjb3BpZWREYXRhKTtcclxuICB9XHJcbn1cclxuIl19