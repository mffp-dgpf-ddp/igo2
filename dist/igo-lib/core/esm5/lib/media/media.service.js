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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvbWVkaWEvbWVkaWEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFFdkQ7SUFPRSxzQkFBWSxrQkFBc0M7UUFBbEQsaUJBNENDO1FBL0NNLFdBQU0sR0FBRyxJQUFJLGVBQWUsQ0FBUSxTQUFTLENBQUMsQ0FBQztRQUMvQyxpQkFBWSxHQUFHLElBQUksZUFBZSxDQUFtQixTQUFTLENBQUMsQ0FBQztRQUdyRSxrQkFBa0I7YUFDZixPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUN2QyxTQUFTOzs7O1FBQUMsVUFBQSxHQUFHO1lBQ1osSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVMLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDckUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbkQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDckUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDcEUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbkQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDbEUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDakUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbkQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCwrQkFBUTs7O0lBQVI7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCxxQ0FBYzs7O0lBQWQ7UUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7O2dCQTNERixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVJxQixrQkFBa0I7Ozt1QkFEeEM7Q0FtRUMsQUE1REQsSUE0REM7U0F6RFksWUFBWTs7O0lBQ3ZCLDhCQUFzRDs7SUFDdEQsb0NBQXVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCcmVha3BvaW50cywgQnJlYWtwb2ludE9ic2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1lZGlhLCBNZWRpYU9yaWVudGF0aW9uIH0gZnJvbSAnLi9tZWRpYS5lbnVtJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE1lZGlhU2VydmljZSB7XHJcbiAgcHVibGljIG1lZGlhJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWE+KHVuZGVmaW5lZCk7XHJcbiAgcHVibGljIG9yaWVudGF0aW9uJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVkaWFPcmllbnRhdGlvbj4odW5kZWZpbmVkKTtcclxuXHJcbiAgY29uc3RydWN0b3IoYnJlYWtwb2ludE9ic2VydmVyOiBCcmVha3BvaW50T2JzZXJ2ZXIpIHtcclxuICAgIGJyZWFrcG9pbnRPYnNlcnZlclxyXG4gICAgICAub2JzZXJ2ZShbQnJlYWtwb2ludHMuSGFuZHNldExhbmRzY2FwZV0pXHJcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLm1hdGNoZXMpIHtcclxuICAgICAgICAgIHRoaXMubWVkaWEkLm5leHQoTWVkaWEuTW9iaWxlKTtcclxuICAgICAgICAgIHRoaXMub3JpZW50YXRpb24kLm5leHQoTWVkaWFPcmllbnRhdGlvbi5MYW5kc2NhcGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgYnJlYWtwb2ludE9ic2VydmVyLm9ic2VydmUoW0JyZWFrcG9pbnRzLkhhbmRzZXRQb3J0cmFpdF0pLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLm1hdGNoZXMpIHtcclxuICAgICAgICB0aGlzLm1lZGlhJC5uZXh0KE1lZGlhLk1vYmlsZSk7XHJcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiQubmV4dChNZWRpYU9yaWVudGF0aW9uLlBvcnRyYWl0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYnJlYWtwb2ludE9ic2VydmVyLm9ic2VydmUoW0JyZWFrcG9pbnRzLlRhYmxldExhbmRzY2FwZV0pLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLm1hdGNoZXMpIHtcclxuICAgICAgICB0aGlzLm1lZGlhJC5uZXh0KE1lZGlhLlRhYmxldCk7XHJcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiQubmV4dChNZWRpYU9yaWVudGF0aW9uLkxhbmRzY2FwZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGJyZWFrcG9pbnRPYnNlcnZlci5vYnNlcnZlKFtCcmVha3BvaW50cy5UYWJsZXRQb3J0cmFpdF0pLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLm1hdGNoZXMpIHtcclxuICAgICAgICB0aGlzLm1lZGlhJC5uZXh0KE1lZGlhLlRhYmxldCk7XHJcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiQubmV4dChNZWRpYU9yaWVudGF0aW9uLlBvcnRyYWl0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYnJlYWtwb2ludE9ic2VydmVyLm9ic2VydmUoW0JyZWFrcG9pbnRzLldlYkxhbmRzY2FwZV0pLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICBpZiAocmVzLm1hdGNoZXMpIHtcclxuICAgICAgICB0aGlzLm1lZGlhJC5uZXh0KE1lZGlhLkRlc2t0b3ApO1xyXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24kLm5leHQoTWVkaWFPcmllbnRhdGlvbi5MYW5kc2NhcGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBicmVha3BvaW50T2JzZXJ2ZXIub2JzZXJ2ZShbQnJlYWtwb2ludHMuV2ViUG9ydHJhaXRdKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5tYXRjaGVzKSB7XHJcbiAgICAgICAgdGhpcy5tZWRpYSQubmV4dChNZWRpYS5EZXNrdG9wKTtcclxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uJC5uZXh0KE1lZGlhT3JpZW50YXRpb24uUG9ydHJhaXQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldE1lZGlhKCk6IE1lZGlhIHtcclxuICAgIHJldHVybiB0aGlzLm1lZGlhJC52YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldE9yaWVudGF0aW9uKCk6IE1lZGlhT3JpZW50YXRpb24ge1xyXG4gICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb24kLnZhbHVlO1xyXG4gIH1cclxufVxyXG4iXX0=