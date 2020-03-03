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
    /**
     * @return {?}
     */
    isTouchScreen() {
        return 'ontouchstart' in document.documentElement ? true : false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvbWVkaWEvbWVkaWEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFLdkQsTUFBTSxPQUFPLFlBQVk7Ozs7SUFJdkIsWUFBWSxrQkFBc0M7UUFIM0MsV0FBTSxHQUFHLElBQUksZUFBZSxDQUFRLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQW1CLFNBQVMsQ0FBQyxDQUFDO1FBR3JFLGtCQUFrQjthQUNmLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ3ZDLFNBQVM7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUNmLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3BEO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFTCxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUU7WUFDeEUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbkQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUN4RSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNwRDtRQUNILENBQUMsRUFBQyxDQUFDO1FBRUgsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZFLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ25EO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUNwRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNuRDtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUNqQyxDQUFDOzs7O0lBRUQsYUFBYTtRQUNYLE9BQU8sY0FBYyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ25FLENBQUM7OztZQS9ERixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFScUIsa0JBQWtCOzs7OztJQVV0Qyw4QkFBc0Q7O0lBQ3RELG9DQUF1RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQnJlYWtwb2ludHMsIEJyZWFrcG9pbnRPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9sYXlvdXQnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNZWRpYSwgTWVkaWFPcmllbnRhdGlvbiB9IGZyb20gJy4vbWVkaWEuZW51bSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZWRpYVNlcnZpY2Uge1xyXG4gIHB1YmxpYyBtZWRpYSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhPih1bmRlZmluZWQpO1xyXG4gIHB1YmxpYyBvcmllbnRhdGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhT3JpZW50YXRpb24+KHVuZGVmaW5lZCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGJyZWFrcG9pbnRPYnNlcnZlcjogQnJlYWtwb2ludE9ic2VydmVyKSB7XHJcbiAgICBicmVha3BvaW50T2JzZXJ2ZXJcclxuICAgICAgLm9ic2VydmUoW0JyZWFrcG9pbnRzLkhhbmRzZXRMYW5kc2NhcGVdKVxyXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5tYXRjaGVzKSB7XHJcbiAgICAgICAgICB0aGlzLm1lZGlhJC5uZXh0KE1lZGlhLk1vYmlsZSk7XHJcbiAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uJC5uZXh0KE1lZGlhT3JpZW50YXRpb24uTGFuZHNjYXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGJyZWFrcG9pbnRPYnNlcnZlci5vYnNlcnZlKFtCcmVha3BvaW50cy5IYW5kc2V0UG9ydHJhaXRdKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5tYXRjaGVzKSB7XHJcbiAgICAgICAgdGhpcy5tZWRpYSQubmV4dChNZWRpYS5Nb2JpbGUpO1xyXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24kLm5leHQoTWVkaWFPcmllbnRhdGlvbi5Qb3J0cmFpdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGJyZWFrcG9pbnRPYnNlcnZlci5vYnNlcnZlKFtCcmVha3BvaW50cy5UYWJsZXRMYW5kc2NhcGVdKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5tYXRjaGVzKSB7XHJcbiAgICAgICAgdGhpcy5tZWRpYSQubmV4dChNZWRpYS5UYWJsZXQpO1xyXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24kLm5leHQoTWVkaWFPcmllbnRhdGlvbi5MYW5kc2NhcGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBicmVha3BvaW50T2JzZXJ2ZXIub2JzZXJ2ZShbQnJlYWtwb2ludHMuVGFibGV0UG9ydHJhaXRdKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5tYXRjaGVzKSB7XHJcbiAgICAgICAgdGhpcy5tZWRpYSQubmV4dChNZWRpYS5UYWJsZXQpO1xyXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24kLm5leHQoTWVkaWFPcmllbnRhdGlvbi5Qb3J0cmFpdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGJyZWFrcG9pbnRPYnNlcnZlci5vYnNlcnZlKFtCcmVha3BvaW50cy5XZWJMYW5kc2NhcGVdKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5tYXRjaGVzKSB7XHJcbiAgICAgICAgdGhpcy5tZWRpYSQubmV4dChNZWRpYS5EZXNrdG9wKTtcclxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uJC5uZXh0KE1lZGlhT3JpZW50YXRpb24uTGFuZHNjYXBlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYnJlYWtwb2ludE9ic2VydmVyLm9ic2VydmUoW0JyZWFrcG9pbnRzLldlYlBvcnRyYWl0XSkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMubWF0Y2hlcykge1xyXG4gICAgICAgIHRoaXMubWVkaWEkLm5leHQoTWVkaWEuRGVza3RvcCk7XHJcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiQubmV4dChNZWRpYU9yaWVudGF0aW9uLlBvcnRyYWl0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRNZWRpYSgpOiBNZWRpYSB7XHJcbiAgICByZXR1cm4gdGhpcy5tZWRpYSQudmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXRPcmllbnRhdGlvbigpOiBNZWRpYU9yaWVudGF0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLm9yaWVudGF0aW9uJC52YWx1ZTtcclxuICB9XHJcblxyXG4gIGlzVG91Y2hTY3JlZW4oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=