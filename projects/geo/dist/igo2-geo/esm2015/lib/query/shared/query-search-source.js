/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { FEATURE } from '../../feature/shared/feature.enums';
import { SearchSource } from '../../search/shared/sources/source';
/**
 * Map search source. For now it has no search capability. All it does
 * is act as a placeholder for the map query results' "search source".
 */
export class QuerySearchSource extends SearchSource {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
    }
    /**
     * @return {?}
     */
    getId() {
        return QuerySearchSource.id;
    }
    /**
     * @return {?}
     */
    getType() {
        return QuerySearchSource.type;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'Carte'
        };
    }
}
QuerySearchSource.id = 'map';
QuerySearchSource.type = FEATURE;
QuerySearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
QuerySearchSource.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
];
if (false) {
    /** @type {?} */
    QuerySearchSource.id;
    /** @type {?} */
    QuerySearchSource.type;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktc2VhcmNoLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9xdWVyeS9zaGFyZWQvcXVlcnktc2VhcmNoLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7QUFPbEUsTUFBTSxPQUFPLGlCQUFrQixTQUFRLFlBQVk7Ozs7SUFJakQsWUFBK0IsT0FBNEI7UUFDekQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0gsT0FBTyxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVTLGlCQUFpQjtRQUN6QixPQUFPO1lBQ0wsS0FBSyxFQUFFLE9BQU87U0FDZixDQUFDO0lBQ0osQ0FBQzs7QUFuQk0sb0JBQUUsR0FBRyxLQUFLLENBQUM7QUFDWCxzQkFBSSxHQUFHLE9BQU8sQ0FBQzs7WUFIdkIsVUFBVTs7Ozs0Q0FLSSxNQUFNLFNBQUMsU0FBUzs7OztJQUg3QixxQkFBa0I7O0lBQ2xCLHVCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRkVBVFVSRSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UgfSBmcm9tICcuLi8uLi9zZWFyY2gvc2hhcmVkL3NvdXJjZXMvc291cmNlJztcclxuaW1wb3J0IHsgU2VhcmNoU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL3NlYXJjaC9zaGFyZWQvc291cmNlcy9zb3VyY2UuaW50ZXJmYWNlcyc7XHJcbi8qKlxyXG4gKiBNYXAgc2VhcmNoIHNvdXJjZS4gRm9yIG5vdyBpdCBoYXMgbm8gc2VhcmNoIGNhcGFiaWxpdHkuIEFsbCBpdCBkb2VzXHJcbiAqIGlzIGFjdCBhcyBhIHBsYWNlaG9sZGVyIGZvciB0aGUgbWFwIHF1ZXJ5IHJlc3VsdHMnIFwic2VhcmNoIHNvdXJjZVwiLlxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUXVlcnlTZWFyY2hTb3VyY2UgZXh0ZW5kcyBTZWFyY2hTb3VyY2Uge1xyXG4gIHN0YXRpYyBpZCA9ICdtYXAnO1xyXG4gIHN0YXRpYyB0eXBlID0gRkVBVFVSRTtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdCgnb3B0aW9ucycpIG9wdGlvbnM6IFNlYXJjaFNvdXJjZU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBRdWVyeVNlYXJjaFNvdXJjZS5pZDtcclxuICB9XHJcblxyXG4gIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBRdWVyeVNlYXJjaFNvdXJjZS50eXBlO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdDYXJ0ZSdcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==