/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ActionStore } from '@igo2/common';
import { WmsWorkspace } from './wms-workspace';
import * as i0 from "@angular/core";
var WmsWorkspaceService = /** @class */ (function () {
    function WmsWorkspaceService() {
    }
    /**
     * @param {?} layer
     * @param {?} map
     * @return {?}
     */
    WmsWorkspaceService.prototype.createWorkspace = /**
     * @param {?} layer
     * @param {?} map
     * @return {?}
     */
    function (layer, map) {
        return new WmsWorkspace({
            id: layer.id,
            title: layer.title,
            layer: layer,
            map: map,
            actionStore: new ActionStore([])
        });
    };
    WmsWorkspaceService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WmsWorkspaceService.ctorParameters = function () { return []; };
    /** @nocollapse */ WmsWorkspaceService.ngInjectableDef = i0.defineInjectable({ factory: function WmsWorkspaceService_Factory() { return new WmsWorkspaceService(); }, token: WmsWorkspaceService, providedIn: "root" });
    return WmsWorkspaceService;
}());
export { WmsWorkspaceService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLXdvcmtzcGFjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3dvcmtzcGFjZS9zaGFyZWQvd21zLXdvcmtzcGFjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFVM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUUvQztJQUtFO0lBQWUsQ0FBQzs7Ozs7O0lBRWhCLDZDQUFlOzs7OztJQUFmLFVBQWdCLEtBQWlCLEVBQUUsR0FBVztRQUM1QyxPQUFPLElBQUksWUFBWSxDQUFDO1lBQ3RCLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUNaLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztZQUNsQixLQUFLLE9BQUE7WUFDTCxHQUFHLEtBQUE7WUFDSCxXQUFXLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO1NBQ2pDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQWZGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7OzhCQWhCRDtDQStCQyxBQWpCRCxJQWlCQztTQWRZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEFjdGlvblN0b3JlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgRmVhdHVyZVN0b3JlLFxyXG4gIEZlYXR1cmVTdG9yZUxvYWRpbmdMYXllclN0cmF0ZWd5LFxyXG4gIEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnLi4vLi4vZmVhdHVyZSc7XHJcbmltcG9ydCB7IEltYWdlTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcCc7XHJcblxyXG5pbXBvcnQgeyBXbXNXb3Jrc3BhY2UgfSBmcm9tICcuL3dtcy13b3Jrc3BhY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgV21zV29ya3NwYWNlU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgY3JlYXRlV29ya3NwYWNlKGxheWVyOiBJbWFnZUxheWVyLCBtYXA6IElnb01hcCk6IFdtc1dvcmtzcGFjZSB7XHJcbiAgICByZXR1cm4gbmV3IFdtc1dvcmtzcGFjZSh7XHJcbiAgICAgIGlkOiBsYXllci5pZCxcclxuICAgICAgdGl0bGU6IGxheWVyLnRpdGxlLFxyXG4gICAgICBsYXllcixcclxuICAgICAgbWFwLFxyXG4gICAgICBhY3Rpb25TdG9yZTogbmV3IEFjdGlvblN0b3JlKFtdKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=