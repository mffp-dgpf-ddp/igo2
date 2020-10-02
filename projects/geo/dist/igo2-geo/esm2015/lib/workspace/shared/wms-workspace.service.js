/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ActionStore } from '@igo2/common';
import { WmsWorkspace } from './wms-workspace';
import * as i0 from "@angular/core";
export class WmsWorkspaceService {
    constructor() { }
    /**
     * @param {?} layer
     * @param {?} map
     * @return {?}
     */
    createWorkspace(layer, map) {
        return new WmsWorkspace({
            id: layer.id,
            title: layer.title,
            layer,
            map,
            actionStore: new ActionStore([])
        });
    }
}
WmsWorkspaceService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WmsWorkspaceService.ctorParameters = () => [];
/** @nocollapse */ WmsWorkspaceService.ngInjectableDef = i0.defineInjectable({ factory: function WmsWorkspaceService_Factory() { return new WmsWorkspaceService(); }, token: WmsWorkspaceService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLXdvcmtzcGFjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3dvcmtzcGFjZS9zaGFyZWQvd21zLXdvcmtzcGFjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFVM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUsvQyxNQUFNLE9BQU8sbUJBQW1CO0lBRTlCLGdCQUFlLENBQUM7Ozs7OztJQUVoQixlQUFlLENBQUMsS0FBaUIsRUFBRSxHQUFXO1FBQzVDLE9BQU8sSUFBSSxZQUFZLENBQUM7WUFDdEIsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ1osS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1lBQ2xCLEtBQUs7WUFDTCxHQUFHO1lBQ0gsV0FBVyxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQztTQUNqQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFmRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBBY3Rpb25TdG9yZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge1xyXG4gIEZlYXR1cmVTdG9yZSxcclxuICBGZWF0dXJlU3RvcmVMb2FkaW5nTGF5ZXJTdHJhdGVneSxcclxuICBGZWF0dXJlU3RvcmVTZWxlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJy4uLy4uL2ZlYXR1cmUnO1xyXG5pbXBvcnQgeyBJbWFnZUxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5cclxuaW1wb3J0IHsgV21zV29ya3NwYWNlIH0gZnJvbSAnLi93bXMtd29ya3NwYWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFdtc1dvcmtzcGFjZVNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIGNyZWF0ZVdvcmtzcGFjZShsYXllcjogSW1hZ2VMYXllciwgbWFwOiBJZ29NYXApOiBXbXNXb3Jrc3BhY2Uge1xyXG4gICAgcmV0dXJuIG5ldyBXbXNXb3Jrc3BhY2Uoe1xyXG4gICAgICBpZDogbGF5ZXIuaWQsXHJcbiAgICAgIHRpdGxlOiBsYXllci50aXRsZSxcclxuICAgICAgbGF5ZXIsXHJcbiAgICAgIG1hcCxcclxuICAgICAgYWN0aW9uU3RvcmU6IG5ldyBBY3Rpb25TdG9yZShbXSlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19