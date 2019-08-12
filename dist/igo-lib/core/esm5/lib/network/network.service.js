/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, EventEmitter, Injector } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { MessageService } from '../message';
import { LanguageService } from '../language/shared/language.service';
import * as i0 from "@angular/core";
import * as i1 from "../message/shared/message.service";
/**
 * @record
 */
export function ConnectionState() { }
if (false) {
    /** @type {?} */
    ConnectionState.prototype.connection;
}
var NetworkService = /** @class */ (function () {
    function NetworkService(messageService, injector) {
        this.messageService = messageService;
        this.injector = injector;
        this.stateChangeEventEmitter = new EventEmitter();
        this.state = {
            connection: window.navigator.onLine
        };
        this.checkNetworkState();
    }
    /**
     * @private
     * @return {?}
     */
    NetworkService.prototype.checkNetworkState = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.onlineSubscription = fromEvent(window, 'online').subscribe((/**
         * @return {?}
         */
        function () {
            console.log('allo');
            /** @type {?} */
            var translate = _this.injector.get(LanguageService).translate;
            /** @type {?} */
            var message = translate.instant('igo.core.network.online.message');
            /** @type {?} */
            var title = translate.instant('igo.core.network.online.title');
            _this.messageService.info(message, title);
            _this.state.connection = true;
            _this.emitEvent();
        }));
        this.offlineSubscription = fromEvent(window, 'offline').subscribe((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var translate = _this.injector.get(LanguageService).translate;
            /** @type {?} */
            var message = translate.instant('igo.core.network.offline.message');
            /** @type {?} */
            var title = translate.instant('igo.core.network.offline.title');
            _this.messageService.info(message, title);
            _this.state.connection = false;
            _this.emitEvent();
        }));
    };
    /**
     * @private
     * @return {?}
     */
    NetworkService.prototype.emitEvent = /**
     * @private
     * @return {?}
     */
    function () {
        this.stateChangeEventEmitter.emit(this.state);
    };
    /**
     * @return {?}
     */
    NetworkService.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.state.connection === false) {
            console.log('yo');
            /** @type {?} */
            var translate = this.injector.get(LanguageService).translate;
            /** @type {?} */
            var message = translate.instant('igo.core.network.offline.message');
            /** @type {?} */
            var title = translate.instant('igo.core.network.offline.title');
            this.messageService.info(message, title);
        }
    };
    /**
     * @return {?}
     */
    NetworkService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        try {
            this.offlineSubscription.unsubscribe();
            this.onlineSubscription.unsubscribe();
        }
        catch (e) {
        }
    };
    /**
     * @param {?=} reportState
     * @return {?}
     */
    NetworkService.prototype.currentState = /**
     * @param {?=} reportState
     * @return {?}
     */
    function (reportState) {
        if (reportState === void 0) { reportState = true; }
        return reportState ?
            this.stateChangeEventEmitter.pipe(debounceTime(300), startWith(this.state))
            :
                this.stateChangeEventEmitter.pipe(debounceTime(300));
    };
    NetworkService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NetworkService.ctorParameters = function () { return [
        { type: MessageService },
        { type: Injector }
    ]; };
    /** @nocollapse */ NetworkService.ngInjectableDef = i0.defineInjectable({ factory: function NetworkService_Factory() { return new NetworkService(i0.inject(i1.MessageService), i0.inject(i0.INJECTOR)); }, token: NetworkService, providedIn: "root" });
    return NetworkService;
}());
export { NetworkService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NetworkService.prototype.stateChangeEventEmitter;
    /**
     * @type {?}
     * @private
     */
    NetworkService.prototype.onlineSubscription;
    /**
     * @type {?}
     * @private
     */
    NetworkService.prototype.offlineSubscription;
    /**
     * @type {?}
     * @private
     */
    NetworkService.prototype.state;
    /**
     * @type {?}
     * @private
     */
    NetworkService.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    NetworkService.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9uZXR3b3JrL25ldHdvcmsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQW9DLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRyxPQUFPLEVBQTRCLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDNUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7Ozs7QUFFdEUscUNBRUM7OztJQURDLHFDQUFvQjs7QUFHdEI7SUFhRSx3QkFDVSxjQUE4QixFQUM5QixRQUFrQjtRQURsQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVZwQiw0QkFBdUIsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUk5RCxVQUFLLEdBQW9CO1lBQy9CLFVBQVUsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU07U0FDcEMsQ0FBQztRQU1BLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRU8sMENBQWlCOzs7O0lBQXpCO1FBQUEsaUJBbUJDO1FBbEJDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFNBQVM7OztRQUFDO1lBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7O2dCQUNkLFNBQVMsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxTQUFTOztnQkFDeEQsT0FBTyxHQUFHLFNBQVMs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RGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vbWVzc2FnZSc7XHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJy4uL2xhbmd1YWdlL3NoYXJlZC9sYW5ndWFnZS5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdGlvblN0YXRlIHtcclxuICBjb25uZWN0aW9uOiBib29sZWFuO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZXR3b3JrU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIHByaXZhdGUgc3RhdGVDaGFuZ2VFdmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPENvbm5lY3Rpb25TdGF0ZT4oKTtcclxuICBwcml2YXRlIG9ubGluZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgb2ZmbGluZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIHN0YXRlOiBDb25uZWN0aW9uU3RhdGUgPSB7XHJcbiAgICBjb25uZWN0aW9uOiB3aW5kb3cubmF2aWdhdG9yLm9uTGluZVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxyXG4gICAgKSB7XHJcbiAgICB0aGlzLmNoZWNrTmV0d29ya1N0YXRlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoZWNrTmV0d29ya1N0YXRlKCkge1xyXG4gICAgdGhpcy5vbmxpbmVTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQod2luZG93LCAnb25saW5lJykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ2FsbG8nKTtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5pbmplY3Rvci5nZXQoTGFuZ3VhZ2VTZXJ2aWNlKS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vbmxpbmUubWVzc2FnZScpO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9ubGluZS50aXRsZScpO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmluZm8obWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPSB0cnVlO1xyXG4gICAgICB0aGlzLmVtaXRFdmVudCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vZmZsaW5lU3Vic2NyaXB0aW9uID0gZnJvbUV2ZW50KHdpbmRvdywgJ29mZmxpbmUnKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmluamVjdG9yLmdldChMYW5ndWFnZVNlcnZpY2UpLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9mZmxpbmUubWVzc2FnZScpO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9mZmxpbmUudGl0bGUnKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5pbmZvKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZW1pdEV2ZW50KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZW1pdEV2ZW50KCkge1xyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUV2ZW50RW1pdHRlci5lbWl0KHRoaXMuc3RhdGUpO1xyXG4gIH1cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygneW8nKTtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5pbmplY3Rvci5nZXQoTGFuZ3VhZ2VTZXJ2aWNlKS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vZmZsaW5lLm1lc3NhZ2UnKTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vZmZsaW5lLnRpdGxlJyk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMub2ZmbGluZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLm9ubGluZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3VycmVudFN0YXRlKHJlcG9ydFN0YXRlID0gdHJ1ZSk6IE9ic2VydmFibGU8Q29ubmVjdGlvblN0YXRlPiB7XHJcbiAgICByZXR1cm4gcmVwb3J0U3RhdGUgP1xyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUV2ZW50RW1pdHRlci5waXBlKFxyXG4gICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcclxuICAgICAgc3RhcnRXaXRoKHRoaXMuc3RhdGUpLFxyXG4gICAgKVxyXG4gICAgOlxyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUV2ZW50RW1pdHRlci5waXBlKFxyXG4gICAgICBkZWJvdW5jZVRpbWUoMzAwKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19