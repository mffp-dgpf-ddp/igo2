/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { FEATURE } from '../../feature/shared/feature.enums';
import { SearchSource } from '../../search/shared/sources/source';
/**
 * Map search source. For now it has no search capability. All it does
 * is act as a placeholder for the map query results' "search source".
 */
var QuerySearchSource = /** @class */ (function (_super) {
    tslib_1.__extends(QuerySearchSource, _super);
    function QuerySearchSource(options) {
        return _super.call(this, options) || this;
    }
    /**
     * @return {?}
     */
    QuerySearchSource.prototype.getId = /**
     * @return {?}
     */
    function () {
        return QuerySearchSource.id;
    };
    /**
     * @return {?}
     */
    QuerySearchSource.prototype.getType = /**
     * @return {?}
     */
    function () {
        return QuerySearchSource.type;
    };
    /**
     * @protected
     * @return {?}
     */
    QuerySearchSource.prototype.getDefaultOptions = /**
     * @protected
     * @return {?}
     */
    function () {
        return {
            title: 'Carte'
        };
    };
    QuerySearchSource.id = 'map';
    QuerySearchSource.type = FEATURE;
    QuerySearchSource.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    QuerySearchSource.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
    ]; };
    return QuerySearchSource;
}(SearchSource));
export { QuerySearchSource };
if (false) {
    /** @type {?} */
    QuerySearchSource.id;
    /** @type {?} */
    QuerySearchSource.type;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktc2VhcmNoLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9xdWVyeS9zaGFyZWQvcXVlcnktc2VhcmNoLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7Ozs7O0FBTWxFO0lBQ3VDLDZDQUFZO0lBSWpELDJCQUErQixPQUE0QjtlQUN6RCxrQkFBTSxPQUFPLENBQUM7SUFDaEIsQ0FBQzs7OztJQUVELGlDQUFLOzs7SUFBTDtRQUNFLE9BQU8saUJBQWlCLENBQUMsRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7SUFFRCxtQ0FBTzs7O0lBQVA7UUFDRSxPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVTLDZDQUFpQjs7OztJQUEzQjtRQUNFLE9BQU87WUFDTCxLQUFLLEVBQUUsT0FBTztTQUNmLENBQUM7SUFDSixDQUFDO0lBbkJNLG9CQUFFLEdBQUcsS0FBSyxDQUFDO0lBQ1gsc0JBQUksR0FBRyxPQUFPLENBQUM7O2dCQUh2QixVQUFVOzs7O2dEQUtJLE1BQU0sU0FBQyxTQUFTOztJQWlCL0Isd0JBQUM7Q0FBQSxBQXRCRCxDQUN1QyxZQUFZLEdBcUJsRDtTQXJCWSxpQkFBaUI7OztJQUM1QixxQkFBa0I7O0lBQ2xCLHVCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRkVBVFVSRSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UgfSBmcm9tICcuLi8uLi9zZWFyY2gvc2hhcmVkL3NvdXJjZXMvc291cmNlJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL3NlYXJjaC9zaGFyZWQvc291cmNlcy9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcbi8qKlxyXG4gKiBNYXAgc2VhcmNoIHNvdXJjZS4gRm9yIG5vdyBpdCBoYXMgbm8gc2VhcmNoIGNhcGFiaWxpdHkuIEFsbCBpdCBkb2VzXHJcbiAqIGlzIGFjdCBhcyBhIHBsYWNlaG9sZGVyIGZvciB0aGUgbWFwIHF1ZXJ5IHJlc3VsdHMnIFwic2VhcmNoIHNvdXJjZVwiLlxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUXVlcnlTZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2Uge1xyXG4gIHN0YXRpYyBpZCA9ICdtYXAnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdCgnb3B0aW9ucycpIG9wdGlvbnM6IFNlYXJjaFNvdXJjZU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBRdWVyeVNlYXJjaFNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBRdWVyeVNlYXJjaFNvdXJjZS50eXBlO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdDYXJ0ZSdcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==