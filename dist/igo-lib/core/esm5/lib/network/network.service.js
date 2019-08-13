/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, EventEmitter, Injector } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { MessageService } from '../message';
import { LanguageService } from '../language/shared/language.service';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import * as i0 from "@angular/core";
import * as i1 from "../message/shared/message.service";
import * as i2 from "@ionic-native/network/ngx/index";
import * as i3 from "@ionic/angular";
/**
 * @record
 */
export function ConnectionState() { }
if (false) {
    /** @type {?} */
    ConnectionState.prototype.connection;
}
var NetworkService = /** @class */ (function () {
    function NetworkService(messageService, injector, network, platform) {
        var _this = this;
        this.messageService = messageService;
        this.injector = injector;
        this.network = network;
        this.platform = platform;
        this.stateChangeEventEmitter = new EventEmitter();
        this.state = {
            connection: window.navigator.onLine
        };
        console.log(this.platform + 'premier');
        this.platform.ready().then((/**
         * @return {?}
         */
        function () {
            console.log(_this.platform);
            if (_this.platform.is('cordova')) {
                console.log('cordova');
                if (_this.platform.is('android')) {
                    console.log('android');
                    _this.initializeService();
                }
            }
            else {
                console.log('browser');
                _this.checkNetworkState();
            }
        }));
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
     * @return {?}
     */
    NetworkService.prototype.initializeService = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.network.type !== this.network.Connection.NONE) {
            this.connectionType = this.network.type;
            this.state.connection = true;
        }
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
                if (!_this.state.connection) {
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
        { type: Injector },
        { type: Network },
        { type: Platform }
    ]; };
    /** @nocollapse */ NetworkService.ngInjectableDef = i0.defineInjectable({ factory: function NetworkService_Factory() { return new NetworkService(i0.inject(i1.MessageService), i0.inject(i0.INJECTOR), i0.inject(i2.Network), i0.inject(i3.Platform)); }, token: NetworkService, providedIn: "root" });
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
    NetworkService.prototype.connectionType;
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
    /**
     * @type {?}
     * @private
     */
    NetworkService.prototype.network;
    /**
     * @type {?}
     * @private
     */
    NetworkService.prototype.platform;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9uZXR3b3JrL25ldHdvcmsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQW9DLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRyxPQUFPLEVBQTRCLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDNUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRXRFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7O0FBRTFDLHFDQUVDOzs7SUFEQyxxQ0FBb0I7O0FBR3RCO0lBY0Usd0JBQ1UsY0FBOEIsRUFDOUIsUUFBa0IsRUFDbEIsT0FBZ0IsRUFDaEIsUUFBa0I7UUFKNUIsaUJBcUJDO1FBcEJTLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQWJwQiw0QkFBdUIsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUs5RCxVQUFLLEdBQW9CO1lBQy9CLFVBQVUsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU07U0FDcEMsQ0FBQztRQVNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUk7OztR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QUVELG9DQUFXOzs7SUFBWDtRQUNFLElBQUk7WUFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3ZDO1FBQUMsT0FBTyxDQUFDLEVBQUU7U0FDWDtJQUNILENBQUM7Ozs7O0lBRUQscUNBQVk7Ozs7SUFBWixVQUFhLFdBQWtCO1FBQWxCLDRCQUFBLEVBQUEsa0JBQWtCO1FBQzdCLE9BQU8sV0FBVyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FDL0IsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUN0QjtZQUNELENBQUM7Z0JBQ0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FDL0IsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUNsQixDQUFDO0lBQ0osQ0FBQzs7Z0JBbkhGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBWlEsY0FBYztnQkFKOEMsUUFBUTtnQkFPcEUsT0FBTztnQkFDUCxRQUFROzs7eUJBUmpCO0NBa0lDLEFBcEhELElBb0hDO1NBakhZLGNBQWM7Ozs7OztJQUV6QixpREFBc0U7Ozs7O0lBQ3RFLDRDQUF5Qzs7Ozs7SUFDekMsNkNBQTBDOzs7OztJQUMxQyx3Q0FBK0I7Ozs7O0lBRS9CLCtCQUVFOzs7OztJQUdBLHdDQUFzQzs7Ozs7SUFDdEMsa0NBQTBCOzs7OztJQUMxQixpQ0FBd0I7Ozs7O0lBQ3hCLGtDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBPbkluaXQsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuLi9tZXNzYWdlJztcclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vbGFuZ3VhZ2Uvc2hhcmVkL2xhbmd1YWdlLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgTmV0d29yayB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvbmV0d29yay9uZ3gnO1xyXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdGlvblN0YXRlIHtcclxuICBjb25uZWN0aW9uOiBib29sZWFuO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZXR3b3JrU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcblxyXG4gIHByaXZhdGUgc3RhdGVDaGFuZ2VFdmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPENvbm5lY3Rpb25TdGF0ZT4oKTtcclxuICBwcml2YXRlIG9ubGluZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgb2ZmbGluZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgY29ubmVjdGlvblR5cGU6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBzdGF0ZTogQ29ubmVjdGlvblN0YXRlID0ge1xyXG4gICAgY29ubmVjdGlvbjogd2luZG93Lm5hdmlnYXRvci5vbkxpbmVcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXHJcbiAgICBwcml2YXRlIG5ldHdvcms6IE5ldHdvcmssXHJcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybVxyXG5cclxuICAgICkge1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnBsYXRmb3JtICsgJ3ByZW1pZXInKTtcclxuICAgICAgdGhpcy5wbGF0Zm9ybS5yZWFkeSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGxhdGZvcm0pO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzKCdjb3Jkb3ZhJykpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3Jkb3ZhJyk7XHJcbiAgICAgICAgICBpZiAodGhpcy5wbGF0Zm9ybS5pcygnYW5kcm9pZCcpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhbmRyb2lkJyk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVNlcnZpY2UoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2Jyb3dzZXInKTtcclxuICAgICAgICAgIHRoaXMuY2hlY2tOZXR3b3JrU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGVja05ldHdvcmtTdGF0ZSgpIHtcclxuICAgIHRoaXMub25saW5lU3Vic2NyaXB0aW9uID0gZnJvbUV2ZW50KHdpbmRvdywgJ29ubGluZScpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KExhbmd1YWdlU2VydmljZSkudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLm5ldHdvcmsub25saW5lLm1lc3NhZ2UnKTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vbmxpbmUudGl0bGUnKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5pbmZvKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID0gdHJ1ZTtcclxuICAgICAgdGhpcy5lbWl0RXZlbnQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub2ZmbGluZVN1YnNjcmlwdGlvbiA9IGZyb21FdmVudCh3aW5kb3csICdvZmZsaW5lJykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5pbmplY3Rvci5nZXQoTGFuZ3VhZ2VTZXJ2aWNlKS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vZmZsaW5lLm1lc3NhZ2UnKTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vZmZsaW5lLnRpdGxlJyk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmVtaXRFdmVudCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplU2VydmljZSgpIHtcclxuXHJcbiAgICBpZiAodGhpcy5uZXR3b3JrLnR5cGUgIT09IHRoaXMubmV0d29yay5Db25uZWN0aW9uLk5PTkUpIHtcclxuICAgICAgdGhpcy5jb25uZWN0aW9uVHlwZSA9IHRoaXMubmV0d29yay50eXBlO1xyXG4gICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub2ZmbGluZVN1YnNjcmlwdGlvbiA9IHRoaXMubmV0d29yay5vbkRpc2Nvbm5lY3QoKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPSBmYWxzZTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KExhbmd1YWdlU2VydmljZSkudHJhbnNsYXRlO1xyXG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9mZmxpbmUubWVzc2FnZScpO1xyXG4gICAgICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vZmZsaW5lLnRpdGxlJyk7XHJcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmluZm8obWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmVtaXRFdmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMTAwMDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vbmxpbmVTdWJzY3JpcHRpb24gPSB0aGlzLm5ldHdvcmsub25Db25uZWN0KCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID0gdHJ1ZTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KExhbmd1YWdlU2VydmljZSkudHJhbnNsYXRlO1xyXG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9ubGluZS5tZXNzYWdlJyk7XHJcbiAgICAgICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9ubGluZS50aXRsZScpO1xyXG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5pbmZvKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLmVtaXRFdmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMTAwMDApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVtaXRFdmVudCgpIHtcclxuICAgIHRoaXMuc3RhdGVDaGFuZ2VFdmVudEVtaXR0ZXIuZW1pdCh0aGlzLnN0YXRlKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5vZmZsaW5lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMub25saW5lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjdXJyZW50U3RhdGUocmVwb3J0U3RhdGUgPSB0cnVlKTogT2JzZXJ2YWJsZTxDb25uZWN0aW9uU3RhdGU+IHtcclxuICAgIHJldHVybiByZXBvcnRTdGF0ZSA/XHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlRXZlbnRFbWl0dGVyLnBpcGUoXHJcbiAgICAgIGRlYm91bmNlVGltZSgzMDApLFxyXG4gICAgICBzdGFydFdpdGgodGhpcy5zdGF0ZSksXHJcbiAgICApXHJcbiAgICA6XHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlRXZlbnRFbWl0dGVyLnBpcGUoXHJcbiAgICAgIGRlYm91bmNlVGltZSgzMDApXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=