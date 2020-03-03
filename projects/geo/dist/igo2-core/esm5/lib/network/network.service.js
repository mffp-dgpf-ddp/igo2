/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, EventEmitter, Injector } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { MessageService } from '../message/shared/message.service';
import { LanguageService } from '../language/shared/language.service';
import * as i0 from "@angular/core";
import * as i1 from "../message/shared/message.service";
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
    NetworkService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        try {
            this.offlineSubscription.unsubscribe();
            this.onlineSubscription.unsubscribe();
        }
        catch (e) { }
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
        return reportState
            ? this.stateChangeEventEmitter.pipe(debounceTime(300), startWith(this.state))
            : this.stateChangeEventEmitter.pipe(debounceTime(300));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9uZXR3b3JrL25ldHdvcmsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQWEsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBNEIsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7O0FBR3RFO0lBWUUsd0JBQ1UsY0FBOEIsRUFDOUIsUUFBa0I7UUFEbEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFWcEIsNEJBQXVCLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFJOUQsVUFBSyxHQUFvQjtZQUMvQixVQUFVLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNO1NBQ3BDLENBQUM7UUFNRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7OztJQUVPLDBDQUFpQjs7OztJQUF6QjtRQUFBLGlCQWtCQztRQWpCQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxTQUFTOzs7UUFBQzs7Z0JBQ3hELFNBQVMsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxTQUFTOztnQkFDeEQsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQWlDLENBQUM7O2dCQUM5RCxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQztZQUNoRSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDekMsS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQzdCLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQixDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLFNBQVM7OztRQUFDOztnQkFDMUQsU0FBUyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVM7O2dCQUN4RCxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQzs7Z0JBQy9ELEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxDQUFDO1lBQ2pFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN6QyxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDOUIsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25CLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxrQ0FBUzs7OztJQUFqQjtRQUNFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7SUFFRCxvQ0FBVzs7O0lBQVg7UUFDRSxJQUFJO1lBQ0YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2QztRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7SUFDaEIsQ0FBQzs7Ozs7SUFFRCxxQ0FBWTs7OztJQUFaLFVBQWEsV0FBa0I7UUFBbEIsNEJBQUEsRUFBQSxrQkFBa0I7UUFDN0IsT0FBTyxXQUFXO1lBQ2hCLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUMvQixZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ3RCO1lBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Z0JBekRGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBTlEsY0FBYztnQkFKdUIsUUFBUTs7O3lCQUF0RDtDQWtFQyxBQTFERCxJQTBEQztTQXZEWSxjQUFjOzs7Ozs7SUFDekIsaURBQXNFOzs7OztJQUN0RSw0Q0FBeUM7Ozs7O0lBQ3pDLDZDQUEwQzs7Ozs7SUFFMUMsK0JBRUU7Ozs7O0lBR0Esd0NBQXNDOzs7OztJQUN0QyxrQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSB9IGZyb20gJy4uL21lc3NhZ2Uvc2hhcmVkL21lc3NhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJy4uL2xhbmd1YWdlL3NoYXJlZC9sYW5ndWFnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29ubmVjdGlvblN0YXRlIH0gZnJvbSAnLi9uZXR3b3JrLmludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmV0d29ya1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgc3RhdGVDaGFuZ2VFdmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPENvbm5lY3Rpb25TdGF0ZT4oKTtcclxuICBwcml2YXRlIG9ubGluZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgb2ZmbGluZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIHN0YXRlOiBDb25uZWN0aW9uU3RhdGUgPSB7XHJcbiAgICBjb25uZWN0aW9uOiB3aW5kb3cubmF2aWdhdG9yLm9uTGluZVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxyXG4gICkge1xyXG4gICAgICB0aGlzLmNoZWNrTmV0d29ya1N0YXRlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoZWNrTmV0d29ya1N0YXRlKCkge1xyXG4gICAgdGhpcy5vbmxpbmVTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQod2luZG93LCAnb25saW5lJykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5pbmplY3Rvci5nZXQoTGFuZ3VhZ2VTZXJ2aWNlKS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vbmxpbmUubWVzc2FnZScpO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9ubGluZS50aXRsZScpO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmluZm8obWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPSB0cnVlO1xyXG4gICAgICB0aGlzLmVtaXRFdmVudCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vZmZsaW5lU3Vic2NyaXB0aW9uID0gZnJvbUV2ZW50KHdpbmRvdywgJ29mZmxpbmUnKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmluamVjdG9yLmdldChMYW5ndWFnZVNlcnZpY2UpLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9mZmxpbmUubWVzc2FnZScpO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9mZmxpbmUudGl0bGUnKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5pbmZvKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZW1pdEV2ZW50KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZW1pdEV2ZW50KCkge1xyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUV2ZW50RW1pdHRlci5lbWl0KHRoaXMuc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLm9mZmxpbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5vbmxpbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgfVxyXG5cclxuICBjdXJyZW50U3RhdGUocmVwb3J0U3RhdGUgPSB0cnVlKTogT2JzZXJ2YWJsZTxDb25uZWN0aW9uU3RhdGU+IHtcclxuICAgIHJldHVybiByZXBvcnRTdGF0ZVxyXG4gICAgICA/IHRoaXMuc3RhdGVDaGFuZ2VFdmVudEVtaXR0ZXIucGlwZShcclxuICAgICAgICAgIGRlYm91bmNlVGltZSgzMDApLFxyXG4gICAgICAgICAgc3RhcnRXaXRoKHRoaXMuc3RhdGUpXHJcbiAgICAgICAgKVxyXG4gICAgICA6IHRoaXMuc3RhdGVDaGFuZ2VFdmVudEVtaXR0ZXIucGlwZShkZWJvdW5jZVRpbWUoMzAwKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==