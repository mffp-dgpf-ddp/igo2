/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, EventEmitter, Injector } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { MessageService } from '../message/shared/message.service';
import { LanguageService } from '../language/shared/language.service';
import * as i0 from "@angular/core";
import * as i1 from "../message/shared/message.service";
import * as i2 from "@ionic-native/network/ngx/index";
import * as i3 from "@ionic/angular";
var NetworkIonicService = /** @class */ (function () {
    function NetworkIonicService(messageService, injector, network, platform) {
        var _this = this;
        this.messageService = messageService;
        this.injector = injector;
        this.network = network;
        this.platform = platform;
        this.stateChangeEventEmitter = new EventEmitter();
        this.state = {
            connection: window.navigator.onLine
        };
        this.platform.ready().then((/**
         * @return {?}
         */
        function () {
            if (_this.platform.is('cordova')) {
                if (_this.platform.is('android')) {
                    _this.checkNetworkStateMobile();
                }
            }
            else {
                _this.checkNetworkState();
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    NetworkIonicService.prototype.checkNetworkState = /**
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
    NetworkIonicService.prototype.checkNetworkStateMobile = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.offlineSubscription = this.network.onDisconnect().subscribe((/**
         * @return {?}
         */
        function () {
            _this.state.connection = false;
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (!_this.state.connection) {
                    /** @type {?} */
                    var translate = _this.injector.get(LanguageService).translate;
                    /** @type {?} */
                    var message = translate.instant('igo.core.network.offline.message');
                    /** @type {?} */
                    var title = translate.instant('igo.core.network.offline.title');
                    _this.messageService.info(message, title);
                    _this.state.connection = false;
                    _this.emitEvent();
                }
            }), 10000);
        }));
        this.onlineSubscription = this.network.onConnect().subscribe((/**
         * @return {?}
         */
        function () {
            _this.state.connection = true;
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (_this.state.connection) {
                    /** @type {?} */
                    var translate = _this.injector.get(LanguageService).translate;
                    /** @type {?} */
                    var message = translate.instant('igo.core.network.online.message');
                    /** @type {?} */
                    var title = translate.instant('igo.core.network.online.title');
                    _this.messageService.info(message, title);
                    _this.state.connection = true;
                    _this.emitEvent();
                }
            }), 10000);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    NetworkIonicService.prototype.emitEvent = /**
     * @private
     * @return {?}
     */
    function () {
        this.stateChangeEventEmitter.emit(this.state);
    };
    /**
     * @return {?}
     */
    NetworkIonicService.prototype.ngOnDestroy = /**
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
    NetworkIonicService.prototype.currentState = /**
     * @param {?=} reportState
     * @return {?}
     */
    function (reportState) {
        if (reportState === void 0) { reportState = true; }
        return reportState
            ? this.stateChangeEventEmitter.pipe(debounceTime(300), startWith(this.state))
            : this.stateChangeEventEmitter.pipe(debounceTime(300));
    };
    NetworkIonicService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NetworkIonicService.ctorParameters = function () { return [
        { type: MessageService },
        { type: Injector },
        { type: Network },
        { type: Platform }
    ]; };
    /** @nocollapse */ NetworkIonicService.ngInjectableDef = i0.defineInjectable({ factory: function NetworkIonicService_Factory() { return new NetworkIonicService(i0.inject(i1.MessageService), i0.inject(i0.INJECTOR), i0.inject(i2.Network), i0.inject(i3.Platform)); }, token: NetworkIonicService, providedIn: "root" });
    return NetworkIonicService;
}());
export { NetworkIonicService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NetworkIonicService.prototype.stateChangeEventEmitter;
    /**
     * @type {?}
     * @private
     */
    NetworkIonicService.prototype.onlineSubscription;
    /**
     * @type {?}
     * @private
     */
    NetworkIonicService.prototype.offlineSubscription;
    /**
     * @type {?}
     * @private
     */
    NetworkIonicService.prototype.state;
    /**
     * @type {?}
     * @private
     */
    NetworkIonicService.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    NetworkIonicService.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    NetworkIonicService.prototype.network;
    /**
     * @type {?}
     * @private
     */
    NetworkIonicService.prototype.platform;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay1pb25pYy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9uZXR3b3JrL25ldHdvcmstaW9uaWMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQWEsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBNEIsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7OztBQUd0RTtJQVlFLDZCQUNVLGNBQThCLEVBQzlCLFFBQWtCLEVBQ2xCLE9BQWdCLEVBQ2hCLFFBQWtCO1FBSjVCLGlCQWVDO1FBZFMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBWnBCLDRCQUF1QixHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBSTlELFVBQUssR0FBb0I7WUFDL0IsVUFBVSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTTtTQUNwQyxDQUFDO1FBUUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJOzs7UUFBQztZQUN6QixJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMvQixJQUFJLEtBQUksQ0FB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Q1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQU5RLGNBQWM7Z0JBUHVCLFFBQVE7Z0JBSTdDLE9BQU87Z0JBQ1AsUUFBUTs7OzhCQUxqQjtDQTZHQyxBQWxHRCxJQWtHQztTQS9GWSxtQkFBbUI7Ozs7OztJQUM5QixzREFBc0U7Ozs7O0lBQ3RFLGlEQUF5Qzs7Ozs7SUFDekMsa0RBQTBDOzs7OztJQUUxQyxvQ0FFRTs7Ozs7SUFHQSw2Q0FBc0M7Ozs7O0lBQ3RDLHVDQUEwQjs7Ozs7SUFDMUIsc0NBQXdCOzs7OztJQUN4Qix1Q0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBOZXR3b3JrIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9uZXR3b3JrL25neCc7XHJcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuLi9tZXNzYWdlL3NoYXJlZC9tZXNzYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICcuLi9sYW5ndWFnZS9zaGFyZWQvbGFuZ3VhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbm5lY3Rpb25TdGF0ZSB9IGZyb20gJy4vbmV0d29yay5pbnRlcmZhY2VzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5ldHdvcmtJb25pY1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgc3RhdGVDaGFuZ2VFdmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPENvbm5lY3Rpb25TdGF0ZT4oKTtcclxuICBwcml2YXRlIG9ubGluZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgb2ZmbGluZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBwcml2YXRlIHN0YXRlOiBDb25uZWN0aW9uU3RhdGUgPSB7XHJcbiAgICBjb25uZWN0aW9uOiB3aW5kb3cubmF2aWdhdG9yLm9uTGluZVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcclxuICAgIHByaXZhdGUgbmV0d29yazogTmV0d29yayxcclxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtXHJcbiAgKSB7XHJcbiAgICB0aGlzLnBsYXRmb3JtLnJlYWR5KCkudGhlbigoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzKCdjb3Jkb3ZhJykpIHtcclxuICAgICAgICBpZiAodGhpcy5wbGF0Zm9ybS5pcygnYW5kcm9pZCcpKSB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrTmV0d29ya1N0YXRlTW9iaWxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY2hlY2tOZXR3b3JrU3RhdGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoZWNrTmV0d29ya1N0YXRlKCkge1xyXG4gICAgdGhpcy5vbmxpbmVTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQod2luZG93LCAnb25saW5lJykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5pbmplY3Rvci5nZXQoTGFuZ3VhZ2VTZXJ2aWNlKS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vbmxpbmUubWVzc2FnZScpO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9ubGluZS50aXRsZScpO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmluZm8obWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPSB0cnVlO1xyXG4gICAgICB0aGlzLmVtaXRFdmVudCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vZmZsaW5lU3Vic2NyaXB0aW9uID0gZnJvbUV2ZW50KHdpbmRvdywgJ29mZmxpbmUnKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmluamVjdG9yLmdldChMYW5ndWFnZVNlcnZpY2UpLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9mZmxpbmUubWVzc2FnZScpO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9mZmxpbmUudGl0bGUnKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5pbmZvKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZW1pdEV2ZW50KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2hlY2tOZXR3b3JrU3RhdGVNb2JpbGUoKSB7XHJcbiAgICB0aGlzLm9mZmxpbmVTdWJzY3JpcHRpb24gPSB0aGlzLm5ldHdvcmsub25EaXNjb25uZWN0KCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5jb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmluamVjdG9yLmdldChMYW5ndWFnZVNlcnZpY2UpLnRyYW5zbGF0ZTtcclxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vZmZsaW5lLm1lc3NhZ2UnKTtcclxuICAgICAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLm5ldHdvcmsub2ZmbGluZS50aXRsZScpO1xyXG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5pbmZvKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5lbWl0RXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEwMDAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub25saW5lU3Vic2NyaXB0aW9uID0gdGhpcy5uZXR3b3JrLm9uQ29ubmVjdCgpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9IHRydWU7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KExhbmd1YWdlU2VydmljZSkudHJhbnNsYXRlO1xyXG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9ubGluZS5tZXNzYWdlJyk7XHJcbiAgICAgICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9ubGluZS50aXRsZScpO1xyXG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5pbmZvKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLmVtaXRFdmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMTAwMDApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVtaXRFdmVudCgpIHtcclxuICAgIHRoaXMuc3RhdGVDaGFuZ2VFdmVudEVtaXR0ZXIuZW1pdCh0aGlzLnN0YXRlKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5vZmZsaW5lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMub25saW5lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9IGNhdGNoIChlKSB7fVxyXG4gIH1cclxuXHJcbiAgY3VycmVudFN0YXRlKHJlcG9ydFN0YXRlID0gdHJ1ZSk6IE9ic2VydmFibGU8Q29ubmVjdGlvblN0YXRlPiB7XHJcbiAgICByZXR1cm4gcmVwb3J0U3RhdGVcclxuICAgICAgPyB0aGlzLnN0YXRlQ2hhbmdlRXZlbnRFbWl0dGVyLnBpcGUoXHJcbiAgICAgICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcclxuICAgICAgICAgIHN0YXJ0V2l0aCh0aGlzLnN0YXRlKVxyXG4gICAgICAgIClcclxuICAgICAgOiB0aGlzLnN0YXRlQ2hhbmdlRXZlbnRFbWl0dGVyLnBpcGUoZGVib3VuY2VUaW1lKDMwMCkpO1xyXG4gIH1cclxufVxyXG4iXX0=