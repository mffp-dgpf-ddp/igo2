/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject } from 'rxjs';
var TableDatabase = /** @class */ (function () {
    function TableDatabase(data) {
        /**
         * Stream that emits whenever the data has been modified.
         */
        this.dataChange = new BehaviorSubject([]);
        if (data) {
            this.dataChange.next(data);
        }
    }
    Object.defineProperty(TableDatabase.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dataChange.value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} data
     * @return {?}
     */
    TableDatabase.prototype.set = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.dataChange.next(data);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TableDatabase.prototype.add = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var copiedData = this.data.slice();
        copiedData.push(item);
        this.set(copiedData);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TableDatabase.prototype.remove = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var copiedData = this.data.slice();
        /** @type {?} */
        var index = copiedData.indexOf(item);
        copiedData.splice(index, 1);
        this.set(copiedData);
    };
    return TableDatabase;
}());
export { TableDatabase };
if (false) {
    /**
     * Stream that emits whenever the data has been modified.
     * @type {?}
     */
    TableDatabase.prototype.dataChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGF0YWJhc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvdGFibGUvdGFibGUtZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFdkM7SUFPRSx1QkFBWSxJQUFLOzs7O1FBTGpCLGVBQVUsR0FBMkIsSUFBSSxlQUFlLENBQVEsRUFBRSxDQUFDLENBQUM7UUFNbEUsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFSRCxzQkFBSSwrQkFBSTs7OztRQUFSO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUMvQixDQUFDOzs7T0FBQTs7Ozs7SUFRRCwyQkFBRzs7OztJQUFILFVBQUksSUFBSTtRQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsMkJBQUc7Ozs7SUFBSCxVQUFJLElBQUk7O1lBQ0EsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ3BDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELDhCQUFNOzs7O0lBQU4sVUFBTyxJQUFJOztZQUNILFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTs7WUFDOUIsS0FBSyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3RDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQTdCRCxJQTZCQzs7Ozs7OztJQTNCQyxtQ0FBb0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZURhdGFiYXNlIHtcclxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIGRhdGEgaGFzIGJlZW4gbW9kaWZpZWQuICovXHJcbiAgZGF0YUNoYW5nZTogQmVoYXZpb3JTdWJqZWN0PGFueVtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55W10+KFtdKTtcclxuICBnZXQgZGF0YSgpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhQ2hhbmdlLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YT8pIHtcclxuICAgIGlmIChkYXRhKSB7XHJcbiAgICAgIHRoaXMuZGF0YUNoYW5nZS5uZXh0KGRhdGEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0KGRhdGEpIHtcclxuICAgIHRoaXMuZGF0YUNoYW5nZS5uZXh0KGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgYWRkKGl0ZW0pIHtcclxuICAgIGNvbnN0IGNvcGllZERhdGEgPSB0aGlzLmRhdGEuc2xpY2UoKTtcclxuICAgIGNvcGllZERhdGEucHVzaChpdGVtKTtcclxuICAgIHRoaXMuc2V0KGNvcGllZERhdGEpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKGl0ZW0pIHtcclxuICAgIGNvbnN0IGNvcGllZERhdGEgPSB0aGlzLmRhdGEuc2xpY2UoKTtcclxuICAgIGNvbnN0IGluZGV4ID0gY29waWVkRGF0YS5pbmRleE9mKGl0ZW0pO1xyXG4gICAgY29waWVkRGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5zZXQoY29waWVkRGF0YSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==