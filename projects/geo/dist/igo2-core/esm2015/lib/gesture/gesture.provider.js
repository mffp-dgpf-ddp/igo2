/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { GestureConfig } from '@angular/material';
export class IgoGestureConfig extends GestureConfig {
    /**
     * @param {?} element
     * @return {?}
     */
    buildHammer(element) {
        /** @type {?} */
        const mc = (/** @type {?} */ (super.buildHammer(element)));
        mc.set({ touchAction: 'pan-y' });
        return mc;
    }
}
IgoGestureConfig.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VzdHVyZS5wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZ2VzdHVyZS9nZXN0dXJlLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQWlCLE1BQU0sbUJBQW1CLENBQUM7QUFHakUsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGFBQWE7Ozs7O0lBQ2pELFdBQVcsQ0FBQyxPQUFvQjs7Y0FDeEIsRUFBRSxHQUFHLG1CQUFBLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQWlCO1FBQ3RELEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNqQyxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7OztZQU5GLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdlc3R1cmVDb25maWcsIEhhbW1lck1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJZ29HZXN0dXJlQ29uZmlnIGV4dGVuZHMgR2VzdHVyZUNvbmZpZyB7XHJcbiAgYnVpbGRIYW1tZXIoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IG1jID0gc3VwZXIuYnVpbGRIYW1tZXIoZWxlbWVudCkgYXMgSGFtbWVyTWFuYWdlcjtcclxuICAgIG1jLnNldCh7IHRvdWNoQWN0aW9uOiAncGFuLXknIH0pO1xyXG4gICAgcmV0dXJuIG1jO1xyXG4gIH1cclxufVxyXG4iXX0=