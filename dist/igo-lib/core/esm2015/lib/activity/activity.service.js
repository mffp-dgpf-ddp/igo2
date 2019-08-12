/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { uuid } from '@igo2/utils';
import * as i0 from "@angular/core";
export class ActivityService {
    constructor() {
        this.counter$ = new BehaviorSubject(0);
        this.ids = [];
    }
    /**
     * @return {?}
     */
    register() {
        /** @type {?} */
        const id = uuid();
        this.ids.push(id);
        this.counter$.next(this.ids.length);
        return id;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    unregister(id) {
        /** @type {?} */
        const index = this.ids.indexOf(id);
        if (index === -1) {
            return;
        }
        this.ids.splice(index, 1);
        this.counter$.next(this.ids.length);
    }
}
ActivityService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ActivityService.ctorParameters = () => [];
/** @nocollapse */ ActivityService.ngInjectableDef = i0.defineInjectable({ factory: function ActivityService_Factory() { return new ActivityService(); }, token: ActivityService, providedIn: "root" });
if (false) {
    /** @type {?} */
    ActivityService.prototype.counter$;
    /**
     * @type {?}
     * @private
     */
    ActivityService.prototype.ids;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvYWN0aXZpdHkvYWN0aXZpdHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBS25DLE1BQU0sT0FBTyxlQUFlO0lBSzFCO1FBSk8sYUFBUSxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO1FBRXpDLFFBQUcsR0FBYSxFQUFFLENBQUM7SUFFWixDQUFDOzs7O0lBRWhCLFFBQVE7O2NBQ0EsRUFBRSxHQUFHLElBQUksRUFBRTtRQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBDLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsRUFBVTs7Y0FDYixLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ2xDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7OztZQTFCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7SUFFQyxtQ0FBaUQ7Ozs7O0lBRWpELDhCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEFjdGl2aXR5U2VydmljZSB7XHJcbiAgcHVibGljIGNvdW50ZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xyXG5cclxuICBwcml2YXRlIGlkczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICByZWdpc3RlcigpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgaWQgPSB1dWlkKCk7XHJcbiAgICB0aGlzLmlkcy5wdXNoKGlkKTtcclxuICAgIHRoaXMuY291bnRlciQubmV4dCh0aGlzLmlkcy5sZW5ndGgpO1xyXG5cclxuICAgIHJldHVybiBpZDtcclxuICB9XHJcblxyXG4gIHVucmVnaXN0ZXIoaWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmlkcy5pbmRleE9mKGlkKTtcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICB0aGlzLmNvdW50ZXIkLm5leHQodGhpcy5pZHMubGVuZ3RoKTtcclxuICB9XHJcbn1cclxuIl19