/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { downloadContent } from '@igo2/utils';
import { ExportNothingToExportError } from './context-export.errors';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export class ContextExportService {
    /**
     * @param {?} res
     * @return {?}
     */
    export(res) {
        return this.exportAsync(res);
    }
    /**
     * @protected
     * @param {?} res
     * @return {?}
     */
    exportAsync(res) {
        /** @type {?} */
        const doExport = (/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            /** @type {?} */
            const nothingToExport = this.nothingToExport(res);
            if (nothingToExport === true) {
                observer.error(new ExportNothingToExportError());
                return;
            }
            /** @type {?} */
            const contextJSON = JSON.stringify(res);
            downloadContent(contextJSON, 'text/json;charset=utf-8', `${res.uri}.json`);
            observer.complete();
        });
        return new Observable(doExport);
    }
    /**
     * @protected
     * @param {?} res
     * @return {?}
     */
    nothingToExport(res) {
        if (res.map === undefined) {
            return true;
        }
        return false;
    }
}
ContextExportService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ ContextExportService.ngInjectableDef = i0.defineInjectable({ factory: function ContextExportService_Factory() { return new ContextExportService(); }, token: ContextExportService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1leHBvcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1pbXBvcnQtZXhwb3J0L3NoYXJlZC9jb250ZXh0LWV4cG9ydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHOUMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckUsT0FBTyxFQUFZLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFLNUMsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7SUFFL0IsTUFBTSxDQUFDLEdBQW9CO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7Ozs7SUFFUyxXQUFXLENBQUMsR0FBb0I7O2NBQ2xDLFFBQVE7Ozs7UUFBRyxDQUFDLFFBQXdCLEVBQUUsRUFBRTs7a0JBQ3BDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQztZQUNqRCxJQUFJLGVBQWUsS0FBSyxJQUFJLEVBQUU7Z0JBQzFCLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSwwQkFBMEIsRUFBRSxDQUFDLENBQUM7Z0JBQ2pELE9BQU87YUFDVjs7a0JBQ0ssV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1lBQ3ZDLGVBQWUsQ0FBQyxXQUFXLEVBQUUseUJBQXlCLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztZQUMzRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFBO1FBQ0QsT0FBTyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7Ozs7SUFFUyxlQUFlLENBQUMsR0FBb0I7UUFDNUMsSUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7WUE1QkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZG93bmxvYWRDb250ZW50IH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRGV0YWlsZWRDb250ZXh0IH0gZnJvbSAnLi4vLi4vY29udGV4dC1tYW5hZ2VyL3NoYXJlZC9jb250ZXh0LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEV4cG9ydE5vdGhpbmdUb0V4cG9ydEVycm9yIH0gZnJvbSAnLi9jb250ZXh0LWV4cG9ydC5lcnJvcnMnO1xyXG5pbXBvcnQgeyBPYnNlcnZlciwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGV4dEV4cG9ydFNlcnZpY2Uge1xyXG5cclxuICBleHBvcnQocmVzOiBEZXRhaWxlZENvbnRleHQpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLmV4cG9ydEFzeW5jKHJlcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZXhwb3J0QXN5bmMocmVzOiBEZXRhaWxlZENvbnRleHQpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIGNvbnN0IGRvRXhwb3J0ID0gKG9ic2VydmVyOiBPYnNlcnZlcjx2b2lkPikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5vdGhpbmdUb0V4cG9ydCA9IHRoaXMubm90aGluZ1RvRXhwb3J0KHJlcyk7XHJcbiAgICAgICAgaWYgKG5vdGhpbmdUb0V4cG9ydCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgRXhwb3J0Tm90aGluZ1RvRXhwb3J0RXJyb3IoKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29udGV4dEpTT04gPSBKU09OLnN0cmluZ2lmeShyZXMpO1xyXG4gICAgICAgIGRvd25sb2FkQ29udGVudChjb250ZXh0SlNPTiwgJ3RleHQvanNvbjtjaGFyc2V0PXV0Zi04JywgYCR7cmVzLnVyaX0uanNvbmApO1xyXG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGRvRXhwb3J0KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBub3RoaW5nVG9FeHBvcnQocmVzOiBEZXRhaWxlZENvbnRleHQpOiBib29sZWFuIHtcclxuICAgIGlmIChyZXMubWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==