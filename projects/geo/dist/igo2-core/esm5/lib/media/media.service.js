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
var MediaService = /** @class */ (function () {
    function MediaService(breakpointObserver) {
        var _this = this;
        this.media$ = new BehaviorSubject(undefined);
        this.orientation$ = new BehaviorSubject(undefined);
        breakpointObserver
            .observe([Breakpoints.HandsetLandscape])
            .subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.matches) {
                _this.media$.next(Media.Mobile);
                _this.orientation$.next(MediaOrientation.Landscape);
            }
        }));
        breakpointObserver.observe([Breakpoints.HandsetPortrait]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.matches) {
                _this.media$.next(Media.Mobile);
                _this.orientation$.next(MediaOrientation.Portrait);
            }
        }));
        breakpointObserver.observe([Breakpoints.TabletLandscape]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.matches) {
                _this.media$.next(Media.Tablet);
                _this.orientation$.next(MediaOrientation.Landscape);
            }
        }));
        breakpointObserver.observe([Breakpoints.TabletPortrait]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.matches) {
                _this.media$.next(Media.Tablet);
                _this.orientation$.next(MediaOrientation.Portrait);
            }
        }));
        breakpointObserver.observe([Breakpoints.WebLandscape]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.matches) {
                _this.media$.next(Media.Desktop);
                _this.orientation$.next(MediaOrientation.Landscape);
            }
        }));
        breakpointObserver.observe([Breakpoints.WebPortrait]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.matches) {
                _this.media$.next(Media.Desktop);
                _this.orientation$.next(MediaOrientation.Portrait);
            }
        }));
    }
    /**
     * @return {?}
     */
    MediaService.prototype.getMedia = /**
     * @return {?}
     */
    function () {
        return this.media$.value;
    };
    /**
     * @return {?}
     */
    MediaService.prototype.getOrientation = /**
     * @return {?}
     */
    function () {
        return this.orientation$.value;
    };
    /**
     * @return {?}
     */
    MediaService.prototype.isTouchScreen = /**
     * @return {?}
     */
    function () {
        return 'ontouchstart' in document.documentElement ? true : false;
    };
    MediaService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    MediaService.ctorParameters = function () { return [
        { type: BreakpointObserver }
    ]; };
    /** @nocollapse */ MediaService.ngInjectableDef = i0.defineInjectable({ factory: function MediaService_Factory() { return new MediaService(i0.inject(i1.BreakpointObserver)); }, token: MediaService, providedIn: "root" });
    return MediaService;
}());
export { MediaService };
if (false) {
    /** @type {?} */
    MediaService.prototype.media$;
    /** @type {?} */
    MediaService.prototype.orientation$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvbWVkaWEvbWVkaWEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFFdkQ7SUFPRSxzQkFBWSxrQkFBc0M7UUFBbEQsaUJBNENDO1FBL0NNLFdBQU0sR0FBRyxJQUFJLGVBQWUsQ0FBUSxTQUFTLENBQUMsQ0FBQztRQUMvQyxpQkFBWSxHQUFHLElBQUksZUFBZSxDQUFtQixTQUFTLENBQUMsQ0FBQztRQUdyRSxrQkFBa0I7YUFDZixPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUN2QyxTQUFTOzs7O1FBQUMsVUFBQSxHQUFHO1lBQ1osSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVMLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDckUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbkQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDckUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDcEUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbkQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDbEUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDakUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbkQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCwrQkFBUTs7O0lBQVI7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCxxQ0FBYzs7O0lBQWQ7UUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7Ozs7SUFFRCxvQ0FBYTs7O0lBQWI7UUFDRSxPQUFPLGNBQWMsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNuRSxDQUFDOztnQkEvREYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFScUIsa0JBQWtCOzs7dUJBRHhDO0NBdUVDLEFBaEVELElBZ0VDO1NBN0RZLFlBQVk7OztJQUN2Qiw4QkFBc0Q7O0lBQ3RELG9DQUF1RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQnJlYWtwb2ludHMsIEJyZWFrcG9pbnRPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9sYXlvdXQnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNZWRpYSwgTWVkaWFPcmllbnRhdGlvbiB9IGZyb20gJy4vbWVkaWEuZW51bSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZWRpYVNlcnZpY2Uge1xyXG4gIHB1YmxpYyBtZWRpYSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhPih1bmRlZmluZWQpO1xyXG4gIHB1YmxpYyBvcmllbnRhdGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhT3JpZW50YXRpb24+KHVuZGVmaW5lZCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGJyZWFrcG9pbnRPYnNlcnZlcjogQnJlYWtwb2ludE9ic2VydmVyKSB7XHJcbiAgICBicmVha3BvaW50T2JzZXJ2ZXJcclxuICAgICAgLm9ic2VydmUoW0JyZWFrcG9pbnRzLkhhbmRzZXRMYW5kc2NhcGVdKVxyXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5tYXRjaGVzKSB7XHJcbiAgICAgICAgICB0aGlzLm1lZGlhJC5uZXh0KE1lZGlhLk1vYmlsZSk7XHJcbiAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uJC5uZXh0KE1lZGlhT3JpZW50YXRpb24uTGFuZHNjYXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGJyZWFrcG9pbnRPYnNlcnZlci5vYnNlcnZlKFtCcmVha3BvaW50cy5IYW5kc2V0UG9ydHJhaXRdKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5tYXRjaGVzKSB7XHJcbiAgICAgICAgdGhpcy5tZWRpYSQubmV4dChNZWRpYS5Nb2JpbGUpO1xyXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24kLm5leHQoTWVkaWFPcmllbnRhdGlvbi5Qb3J0cmFpdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGJyZWFrcG9pbnRPYnNlcnZlci5vYnNlcnZlKFtCcmVha3BvaW50cy5UYWJsZXRMYW5kc2NhcGVdKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5tYXRjaGVzKSB7XHJcbiAgICAgICAgdGhpcy5tZWRpYSQubmV4dChNZWRpYS5UYWJsZXQpO1xyXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24kLm5leHQoTWVkaWFPcmllbnRhdGlvbi5MYW5kc2NhcGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBicmVha3BvaW50T2JzZXJ2ZXIub2JzZXJ2ZShbQnJlYWtwb2ludHMuVGFibGV0UG9ydHJhaXRdKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5tYXRjaGVzKSB7XHJcbiAgICAgICAgdGhpcy5tZWRpYSQubmV4dChNZWRpYS5UYWJsZXQpO1xyXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24kLm5leHQoTWVkaWFPcmllbnRhdGlvbi5Qb3J0cmFpdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGJyZWFrcG9pbnRPYnNlcnZlci5vYnNlcnZlKFtCcmVha3BvaW50cy5XZWJMYW5kc2NhcGVdKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5tYXRjaGVzKSB7XHJcbiAgICAgICAgdGhpcy5tZWRpYSQubmV4dChNZWRpYS5EZXNrdG9wKTtcclxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uJC5uZXh0KE1lZGlhT3JpZW50YXRpb24uTGFuZHNjYXBlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYnJlYWtwb2ludE9ic2VydmVyLm9ic2VydmUoW0JyZWFrcG9pbnRzLldlYlBvcnRyYWl0XSkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgIGlmIChyZXMubWF0Y2hlcykge1xyXG4gICAgICAgIHRoaXMubWVkaWEkLm5leHQoTWVkaWEuRGVza3RvcCk7XHJcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiQubmV4dChNZWRpYU9yaWVudGF0aW9uLlBvcnRyYWl0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRNZWRpYSgpOiBNZWRpYSB7XHJcbiAgICByZXR1cm4gdGhpcy5tZWRpYSQudmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXRPcmllbnRhdGlvbigpOiBNZWRpYU9yaWVudGF0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLm9yaWVudGF0aW9uJC52YWx1ZTtcclxuICB9XHJcblxyXG4gIGlzVG91Y2hTY3JlZW4oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=