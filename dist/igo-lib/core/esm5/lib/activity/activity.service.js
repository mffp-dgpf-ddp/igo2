/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { uuid } from '@igo2/utils';
import * as i0 from "@angular/core";
var ActivityService = /** @class */ (function () {
    function ActivityService() {
        this.counter$ = new BehaviorSubject(0);
        this.ids = [];
    }
    /**
     * @return {?}
     */
    ActivityService.prototype.register = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var id = uuid();
        this.ids.push(id);
        this.counter$.next(this.ids.length);
        return id;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    ActivityService.prototype.unregister = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var index = this.ids.indexOf(id);
        if (index === -1) {
            return;
        }
        this.ids.splice(index, 1);
        this.counter$.next(this.ids.length);
    };
    ActivityService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ActivityService.ctorParameters = function () { return []; };
    /** @nocollapse */ ActivityService.ngInjectableDef = i0.defineInjectable({ factory: function ActivityService_Factory() { return new ActivityService(); }, token: ActivityService, providedIn: "root" });
    return ActivityService;
}());
export { ActivityService };
if (false) {
    /** @type {?} */
    ActivityService.prototype.counter$;
    /**
     * @type {?}
     * @private
     */
    ActivityService.prototype.ids;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJsaWIvYWN0aXZpdHkvYWN0aXZpdHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBRW5DO0lBUUU7UUFKTyxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7UUFFekMsUUFBRyxHQUFhLEVBQUUsQ0FBQztJQUVaLENBQUM7Ozs7SUFFaEIsa0NBQVE7OztJQUFSOztZQUNRLEVBQUUsR0FBRyxJQUFJLEVBQUU7UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVwQyxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Ozs7O0lBRUQsb0NBQVU7Ozs7SUFBVixVQUFXLEVBQVU7O1lBQ2IsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNsQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNoQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDOztnQkExQkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7MEJBUkQ7Q0FpQ0MsQUEzQkQsSUEyQkM7U0F4QlksZUFBZTs7O0lBQzFCLG1DQUFpRDs7Ozs7SUFFakQsOEJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyB1dWlkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQWN0aXZpdHlTZXJ2aWNlIHtcclxuICBwdWJsaWMgY291bnRlciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XHJcblxyXG4gIHByaXZhdGUgaWRzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHJlZ2lzdGVyKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBpZCA9IHV1aWQoKTtcclxuICAgIHRoaXMuaWRzLnB1c2goaWQpO1xyXG4gICAgdGhpcy5jb3VudGVyJC5uZXh0KHRoaXMuaWRzLmxlbmd0aCk7XHJcblxyXG4gICAgcmV0dXJuIGlkO1xyXG4gIH1cclxuXHJcbiAgdW5yZWdpc3RlcihpZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaWRzLmluZGV4T2YoaWQpO1xyXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmlkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgIHRoaXMuY291bnRlciQubmV4dCh0aGlzLmlkcy5sZW5ndGgpO1xyXG4gIH1cclxufVxyXG4iXX0=