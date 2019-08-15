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
     * @private
     * @return {?}
     */
    NetworkService.prototype.checkNetworkStateMobile = /**
     * @private
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9uZXR3b3JrL25ldHdvcmsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQWEsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBNEIsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFdEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFFMUMscUNBRUM7OztJQURDLHFDQUFvQjs7QUFHdEI7SUFjRSx3QkFDVSxjQUE4QixFQUM5QixRQUFrQixFQUNsQixPQUFnQixFQUNoQixRQUFrQjtRQUo1QixpQkFnQkM7UUFmUyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFicEIsNEJBQXVCLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFLOUQsVUFBSyxHQUFvQjtZQUMvQixVQUFVLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNO1NBQ3BDLENBQUM7UUFRRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUk7OztRQUFDO1lBQ3pCLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JB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QUEsRUFBQSxrQkFBa0I7UUFDN0IsT0FBTyxXQUFXLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUMvQixZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ3RCO1lBQ0QsQ0FBQztnQkFDRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUMvQixZQUFZLENBQUMsR0FBRyxDQUFDLENBQ2xCLENBQUM7SUFDSixDQUFDOztnQkE3R0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFaUSxjQUFjO2dCQUp1QixRQUFRO2dCQU83QyxPQUFPO2dCQUNQLFFBQVE7Ozt5QkFSakI7Q0E0SEMsQUE5R0QsSUE4R0M7U0EzR1ksY0FBYzs7Ozs7O0lBRXpCLGlEQUFzRTs7Ozs7SUFDdEUsNENBQXlDOzs7OztJQUN6Qyw2Q0FBMEM7Ozs7O0lBQzFDLHdDQUErQjs7Ozs7SUFFL0IsK0JBRUU7Ozs7O0lBR0Esd0NBQXNDOzs7OztJQUN0QyxrQ0FBMEI7Ozs7O0lBQzFCLGlDQUF3Qjs7Ozs7SUFDeEIsa0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuLi9tZXNzYWdlJztcclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vbGFuZ3VhZ2Uvc2hhcmVkL2xhbmd1YWdlLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgTmV0d29yayB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvbmV0d29yay9uZ3gnO1xyXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdGlvblN0YXRlIHtcclxuICBjb25uZWN0aW9uOiBib29sZWFuO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZXR3b3JrU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcblxyXG4gIHByaXZhdGUgc3RhdGVDaGFuZ2VFdmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPENvbm5lY3Rpb25TdGF0ZT4oKTtcclxuICBwcml2YXRlIG9ubGluZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgb2ZmbGluZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgY29ubmVjdGlvblR5cGU6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBzdGF0ZTogQ29ubmVjdGlvblN0YXRlID0ge1xyXG4gICAgY29ubmVjdGlvbjogd2luZG93Lm5hdmlnYXRvci5vbkxpbmVcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXHJcbiAgICBwcml2YXRlIG5ldHdvcms6IE5ldHdvcmssXHJcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucGxhdGZvcm0ucmVhZHkoKS50aGVuKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5wbGF0Zm9ybS5pcygnY29yZG92YScpKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5wbGF0Zm9ybS5pcygnYW5kcm9pZCcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tOZXR3b3JrU3RhdGVNb2JpbGUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2Jyb3dzZXInKTtcclxuICAgICAgICAgIHRoaXMuY2hlY2tOZXR3b3JrU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGVja05ldHdvcmtTdGF0ZSgpIHtcclxuICAgIHRoaXMub25saW5lU3Vic2NyaXB0aW9uID0gZnJvbUV2ZW50KHdpbmRvdywgJ29ubGluZScpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KExhbmd1YWdlU2VydmljZSkudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLm5ldHdvcmsub25saW5lLm1lc3NhZ2UnKTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vbmxpbmUudGl0bGUnKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5pbmZvKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID0gdHJ1ZTtcclxuICAgICAgdGhpcy5lbWl0RXZlbnQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub2ZmbGluZVN1YnNjcmlwdGlvbiA9IGZyb21FdmVudCh3aW5kb3csICdvZmZsaW5lJykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5pbmplY3Rvci5nZXQoTGFuZ3VhZ2VTZXJ2aWNlKS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vZmZsaW5lLm1lc3NhZ2UnKTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vZmZsaW5lLnRpdGxlJyk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmVtaXRFdmVudCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoZWNrTmV0d29ya1N0YXRlTW9iaWxlKCkge1xyXG4gICAgaWYgKHRoaXMubmV0d29yay50eXBlICE9PSB0aGlzLm5ldHdvcmsuQ29ubmVjdGlvbi5OT05FKSB7XHJcbiAgICAgIHRoaXMuY29ubmVjdGlvblR5cGUgPSB0aGlzLm5ldHdvcmsudHlwZTtcclxuICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9mZmxpbmVTdWJzY3JpcHRpb24gPSB0aGlzLm5ldHdvcmsub25EaXNjb25uZWN0KCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5jb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmluamVjdG9yLmdldChMYW5ndWFnZVNlcnZpY2UpLnRyYW5zbGF0ZTtcclxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vZmZsaW5lLm1lc3NhZ2UnKTtcclxuICAgICAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLm5ldHdvcmsub2ZmbGluZS50aXRsZScpO1xyXG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5pbmZvKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5lbWl0RXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEwMDAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub25saW5lU3Vic2NyaXB0aW9uID0gdGhpcy5uZXR3b3JrLm9uQ29ubmVjdCgpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9IHRydWU7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5jb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmluamVjdG9yLmdldChMYW5ndWFnZVNlcnZpY2UpLnRyYW5zbGF0ZTtcclxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vbmxpbmUubWVzc2FnZScpO1xyXG4gICAgICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvcmUubmV0d29yay5vbmxpbmUudGl0bGUnKTtcclxuICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5lbWl0RXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEwMDAwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBlbWl0RXZlbnQoKSB7XHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlRXZlbnRFbWl0dGVyLmVtaXQodGhpcy5zdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMub2ZmbGluZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLm9ubGluZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3VycmVudFN0YXRlKHJlcG9ydFN0YXRlID0gdHJ1ZSk6IE9ic2VydmFibGU8Q29ubmVjdGlvblN0YXRlPiB7XHJcbiAgICByZXR1cm4gcmVwb3J0U3RhdGUgP1xyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUV2ZW50RW1pdHRlci5waXBlKFxyXG4gICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcclxuICAgICAgc3RhcnRXaXRoKHRoaXMuc3RhdGUpLFxyXG4gICAgKVxyXG4gICAgOlxyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUV2ZW50RW1pdHRlci5waXBlKFxyXG4gICAgICBkZWJvdW5jZVRpbWUoMzAwKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19