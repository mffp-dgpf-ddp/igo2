/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { Media, MediaOrientation } from './media.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/layout";
export class MediaService {
    /**
     * @param {?} breakpointObserver
     */
    constructor(breakpointObserver) {
        this.media$ = new BehaviorSubject(undefined);
        this.orientation$ = new BehaviorSubject(undefined);
        breakpointObserver
            .observe([Breakpoints.HandsetLandscape])
            .subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res.matches) {
                this.media$.next(Media.Mobile);
                this.orientation$.next(MediaOrientation.Landscape);
            }
        }));
        breakpointObserver.observe([Breakpoints.HandsetPortrait]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res.matches) {
                this.media$.next(Media.Mobile);
                this.orientation$.next(MediaOrientation.Portrait);
            }
        }));
        breakpointObserver.observe([Breakpoints.TabletLandscape]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res.matches) {
                this.media$.next(Media.Tablet);
                this.orientation$.next(MediaOrientation.Landscape);
            }
        }));
        breakpointObserver.observe([Breakpoints.TabletPortrait]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res.matches) {
                this.media$.next(Media.Tablet);
                this.orientation$.next(MediaOrientation.Portrait);
            }
        }));
        breakpointObserver.observe([Breakpoints.WebLandscape]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res.matches) {
                this.media$.next(Media.Desktop);
                this.orientation$.next(MediaOrientation.Landscape);
            }
        }));
        breakpointObserver.observe([Breakpoints.WebPortrait]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res.matches) {
                this.media$.next(Media.Desktop);
                this.orientation$.next(MediaOrientation.Portrait);
            }
        }));
    }
    /**
     * @return {?}
     */
    getMedia() {
        return this.media$.value;
    }
    /**
     * @return {?}
     */
    getOrientation() {
        return this.orientation$.value;
    }
}
MediaService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
MediaService.ctorParameters = () => [
    { type: BreakpointObserver }
];
/** @nocollapse */ MediaService.ngInjectableDef = i0.defineInjectable({ factory: function MediaService_Factory() { return new MediaService(i0.inject(i1.BreakpointObserver)); }, token: MediaService, providedIn: "root" });
if (false) {
    /** @type {?} */
    MediaService.prototype.media$;
    /** @type {?} */
    MediaService.prototype.orientation$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvbWVkaWEvbWVkaWEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFLdkQsTUFBTSxPQUFPLFlBQVk7Ozs7SUFJdkIsWUFBWSxrQkFBc0M7UUFIM0MsV0FBTSxHQUFHLElBQUksZUFBZSxDQUFRLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQW1CLFNBQVMsQ0FBQyxDQUFDO1FBR3JFLGtCQUFrQjthQUNmLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ3ZDLFNBQVM7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUNmLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3BEO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFTCxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUU7WUFDeEUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbkQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUN4RSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNwRDtRQUNILENBQUMsRUFBQyxDQUFDO1FBRUgsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZFLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ25EO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUNwRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNuRDtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUNqQyxDQUFDOzs7WUEzREYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBUnFCLGtCQUFrQjs7Ozs7SUFVdEMsOEJBQXNEOztJQUN0RCxvQ0FBdUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJyZWFrcG9pbnRzLCBCcmVha3BvaW50T2JzZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTWVkaWEsIE1lZGlhT3JpZW50YXRpb24gfSBmcm9tICcuL21lZGlhLmVudW0nO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWVkaWFTZXJ2aWNlIHtcclxuICBwdWJsaWMgbWVkaWEkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYT4odW5kZWZpbmVkKTtcclxuICBwdWJsaWMgb3JpZW50YXRpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZWRpYU9yaWVudGF0aW9uPih1bmRlZmluZWQpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihicmVha3BvaW50T2JzZXJ2ZXI6IEJyZWFrcG9pbnRPYnNlcnZlcikge1xyXG4gICAgYnJlYWtwb2ludE9ic2VydmVyXHJcbiAgICAgIC5vYnNlcnZlKFtCcmVha3BvaW50cy5IYW5kc2V0TGFuZHNjYXBlXSlcclxuICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMubWF0Y2hlcykge1xyXG4gICAgICAgICAgdGhpcy5tZWRpYSQubmV4dChNZWRpYS5Nb2JpbGUpO1xyXG4gICAgICAgICAgdGhpcy5vcmllbnRhdGlvbiQubmV4dChNZWRpYU9yaWVudGF0aW9uLkxhbmRzY2FwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICBicmVha3BvaW50T2JzZXJ2ZXIub2JzZXJ2ZShbQnJlYWtwb2ludHMuSGFuZHNldFBvcnRyYWl0XSkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMubWF0Y2hlcykge1xyXG4gICAgICAgIHRoaXMubWVkaWEkLm5leHQoTWVkaWEuTW9iaWxlKTtcclxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uJC5uZXh0KE1lZGlhT3JpZW50YXRpb24uUG9ydHJhaXQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBicmVha3BvaW50T2JzZXJ2ZXIub2JzZXJ2ZShbQnJlYWtwb2ludHMuVGFibGV0TGFuZHNjYXBlXSkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMubWF0Y2hlcykge1xyXG4gICAgICAgIHRoaXMubWVkaWEkLm5leHQoTWVkaWEuVGFibGV0KTtcclxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uJC5uZXh0KE1lZGlhT3JpZW50YXRpb24uTGFuZHNjYXBlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYnJlYWtwb2ludE9ic2VydmVyLm9ic2VydmUoW0JyZWFrcG9pbnRzLlRhYmxldFBvcnRyYWl0XSkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMubWF0Y2hlcykge1xyXG4gICAgICAgIHRoaXMubWVkaWEkLm5leHQoTWVkaWEuVGFibGV0KTtcclxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uJC5uZXh0KE1lZGlhT3JpZW50YXRpb24uUG9ydHJhaXQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBicmVha3BvaW50T2JzZXJ2ZXIub2JzZXJ2ZShbQnJlYWtwb2ludHMuV2ViTGFuZHNjYXBlXSkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMubWF0Y2hlcykge1xyXG4gICAgICAgIHRoaXMubWVkaWEkLm5leHQoTWVkaWEuRGVza3RvcCk7XHJcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiQubmV4dChNZWRpYU9yaWVudGF0aW9uLkxhbmRzY2FwZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGJyZWFrcG9pbnRPYnNlcnZlci5vYnNlcnZlKFtCcmVha3BvaW50cy5XZWJQb3J0cmFpdF0pLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLm1hdGNoZXMpIHtcclxuICAgICAgICB0aGlzLm1lZGlhJC5uZXh0KE1lZGlhLkRlc2t0b3ApO1xyXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24kLm5leHQoTWVkaWFPcmllbnRhdGlvbi5Qb3J0cmFpdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWVkaWEoKTogTWVkaWEge1xyXG4gICAgcmV0dXJuIHRoaXMubWVkaWEkLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0T3JpZW50YXRpb24oKTogTWVkaWFPcmllbnRhdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcmllbnRhdGlvbiQudmFsdWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==