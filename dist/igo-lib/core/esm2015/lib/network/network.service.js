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
export class NetworkService {
    /**
     * @param {?} messageService
     * @param {?} injector
     * @param {?} network
     * @param {?} platform
     */
    constructor(messageService, injector, network, platform) {
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
        () => {
            if (this.platform.is('cordova')) {
                if (this.platform.is('android')) {
                    this.checkNetworkStateMobile();
                }
            }
            else {
                console.log('browser');
                this.checkNetworkState();
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    checkNetworkState() {
        this.onlineSubscription = fromEvent(window, 'online').subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const translate = this.injector.get(LanguageService).translate;
            /** @type {?} */
            const message = translate.instant('igo.core.network.online.message');
            /** @type {?} */
            const title = translate.instant('igo.core.network.online.title');
            this.messageService.info(message, title);
            this.state.connection = true;
            this.emitEvent();
        }));
        this.offlineSubscription = fromEvent(window, 'offline').subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const translate = this.injector.get(LanguageService).translate;
            /** @type {?} */
            const message = translate.instant('igo.core.network.offline.message');
            /** @type {?} */
            const title = translate.instant('igo.core.network.offline.title');
            this.messageService.info(message, title);
            this.state.connection = false;
            this.emitEvent();
        }));
    }
    /**
     * @private
     * @return {?}
     */
    checkNetworkStateMobile() {
        if (this.network.type !== this.network.Connection.NONE) {
            this.connectionType = this.network.type;
            this.state.connection = true;
        }
        this.offlineSubscription = this.network.onDisconnect().subscribe((/**
         * @return {?}
         */
        () => {
            this.state.connection = false;
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (!this.state.connection) {
                    /** @type {?} */
                    const translate = this.injector.get(LanguageService).translate;
                    /** @type {?} */
                    const message = translate.instant('igo.core.network.offline.message');
                    /** @type {?} */
                    const title = translate.instant('igo.core.network.offline.title');
                    this.messageService.info(message, title);
                    this.state.connection = false;
                    this.emitEvent();
                }
            }), 10000);
        }));
        this.onlineSubscription = this.network.onConnect().subscribe((/**
         * @return {?}
         */
        () => {
            this.state.connection = true;
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (!this.state.connection) {
                    /** @type {?} */
                    const translate = this.injector.get(LanguageService).translate;
                    /** @type {?} */
                    const message = translate.instant('igo.core.network.online.message');
                    /** @type {?} */
                    const title = translate.instant('igo.core.network.online.title');
                    this.messageService.info(message, title);
                    this.state.connection = true;
                    this.emitEvent();
                }
            }), 10000);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    emitEvent() {
        this.stateChangeEventEmitter.emit(this.state);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        try {
            this.offlineSubscription.unsubscribe();
            this.onlineSubscription.unsubscribe();
        }
        catch (e) {
        }
    }
    /**
     * @param {?=} reportState
     * @return {?}
     */
    currentState(reportState = true) {
        return reportState ?
            this.stateChangeEventEmitter.pipe(debounceTime(300), startWith(this.state))
            :
                this.stateChangeEventEmitter.pipe(debounceTime(300));
    }
}
NetworkService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NetworkService.ctorParameters = () => [
    { type: MessageService },
    { type: Injector },
    { type: Network },
    { type: Platform }
];
/** @nocollapse */ NetworkService.ngInjectableDef = i0.defineInjectable({ factory: function NetworkService_Factory() { return new NetworkService(i0.inject(i1.MessageService), i0.inject(i0.INJECTOR), i0.inject(i2.Network), i0.inject(i3.Platform)); }, token: NetworkService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9uZXR3b3JrL25ldHdvcmsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQWEsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBNEIsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFdEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFFMUMscUNBRUM7OztJQURDLHFDQUFvQjs7QUFNdEIsTUFBTSxPQUFPLGNBQWM7Ozs7Ozs7SUFXekIsWUFDVSxjQUE4QixFQUM5QixRQUFrQixFQUNsQixPQUFnQixFQUNoQixRQUFrQjtRQUhsQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFicEIsNEJBQXVCLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFLOUQsVUFBSyxHQUFvQjtZQUMvQixVQUFVLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNO1NBQ3BDLENBQUM7UUFRRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUk7OztRQUFDLEdBQUcsRUFBRTtZQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFD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R0FBRyxJQUFJO1FBQzdCLE9BQU8sV0FBVyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FDL0IsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUN0QjtZQUNELENBQUM7Z0JBQ0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FDL0IsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUNsQixDQUFDO0lBQ0osQ0FBQzs7O1lBN0dGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVpRLGNBQWM7WUFKdUIsUUFBUTtZQU83QyxPQUFPO1lBQ1AsUUFBUTs7Ozs7Ozs7SUFXZixpREFBc0U7Ozs7O0lBQ3RFLDRDQUF5Qzs7Ozs7SUFDekMsNkNBQTBDOzs7OztJQUMxQyx3Q0FBK0I7Ozs7O0lBRS9CLCtCQUVFOzs7OztJQUdBLHdDQUFzQzs7Ozs7SUFDdEMsa0NBQTBCOzs7OztJQUMxQixpQ0FBd0I7Ozs7O0lBQ3hCLGtDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vbWVzc2FnZSc7XHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJy4uL2xhbmd1YWdlL3NoYXJlZC9sYW5ndWFnZS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IE5ldHdvcmsgfSBmcm9tICdAaW9uaWMtbmF0aXZlL25ldHdvcmsvbmd4JztcclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbm5lY3Rpb25TdGF0ZSB7XHJcbiAgY29ubmVjdGlvbjogYm9vbGVhbjtcclxufVxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmV0d29ya1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG5cclxuICBwcml2YXRlIHN0YXRlQ2hhbmdlRXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcjxDb25uZWN0aW9uU3RhdGU+KCk7XHJcbiAgcHJpdmF0ZSBvbmxpbmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIG9mZmxpbmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIGNvbm5lY3Rpb25UeXBlOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgc3RhdGU6IENvbm5lY3Rpb25TdGF0ZSA9IHtcclxuICAgIGNvbm5lY3Rpb246IHdpbmRvdy5uYXZpZ2F0b3Iub25MaW5lXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxyXG4gICAgcHJpdmF0ZSBuZXR3b3JrOiBOZXR3b3JrLFxyXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm1cclxuICAgICkge1xyXG4gICAgICB0aGlzLnBsYXRmb3JtLnJlYWR5KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucGxhdGZvcm0uaXMoJ2NvcmRvdmEnKSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMucGxhdGZvcm0uaXMoJ2FuZHJvaWQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrTmV0d29ya1N0YXRlTW9iaWxlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdicm93c2VyJyk7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrTmV0d29ya1N0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2hlY2tOZXR3b3JrU3RhdGUoKSB7XHJcbiAgICB0aGlzLm9ubGluZVN1YnNjcmlwdGlvbiA9IGZyb21FdmVudCh3aW5kb3csICdvbmxpbmUnKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmluamVjdG9yLmdldChMYW5ndWFnZVNlcnZpY2UpLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9ubGluZS5tZXNzYWdlJyk7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLm5ldHdvcmsub25saW5lLnRpdGxlJyk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9IHRydWU7XHJcbiAgICAgIHRoaXMuZW1pdEV2ZW50KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9mZmxpbmVTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQod2luZG93LCAnb2ZmbGluZScpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KExhbmd1YWdlU2VydmljZSkudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLm5ldHdvcmsub2ZmbGluZS5tZXNzYWdlJyk7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLm5ldHdvcmsub2ZmbGluZS50aXRsZScpO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmluZm8obWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPSBmYWxzZTtcclxuICAgICAgdGhpcy5lbWl0RXZlbnQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGVja05ldHdvcmtTdGF0ZU1vYmlsZSgpIHtcclxuICAgIGlmICh0aGlzLm5ldHdvcmsudHlwZSAhPT0gdGhpcy5uZXR3b3JrLkNvbm5lY3Rpb24uTk9ORSkge1xyXG4gICAgICB0aGlzLmNvbm5lY3Rpb25UeXBlID0gdGhpcy5uZXR3b3JrLnR5cGU7XHJcbiAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vZmZsaW5lU3Vic2NyaXB0aW9uID0gdGhpcy5uZXR3b3JrLm9uRGlzY29ubmVjdCgpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5pbmplY3Rvci5nZXQoTGFuZ3VhZ2VTZXJ2aWNlKS50cmFuc2xhdGU7XHJcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLm5ldHdvcmsub2ZmbGluZS5tZXNzYWdlJyk7XHJcbiAgICAgICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9mZmxpbmUudGl0bGUnKTtcclxuICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuZW1pdEV2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAxMDAwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9ubGluZVN1YnNjcmlwdGlvbiA9IHRoaXMubmV0d29yay5vbkNvbm5lY3QoKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5pbmplY3Rvci5nZXQoTGFuZ3VhZ2VTZXJ2aWNlKS50cmFuc2xhdGU7XHJcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLm5ldHdvcmsub25saW5lLm1lc3NhZ2UnKTtcclxuICAgICAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLm5ldHdvcmsub25saW5lLnRpdGxlJyk7XHJcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmluZm8obWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuZW1pdEV2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAxMDAwMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZW1pdEV2ZW50KCkge1xyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUV2ZW50RW1pdHRlci5lbWl0KHRoaXMuc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLm9mZmxpbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5vbmxpbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGN1cnJlbnRTdGF0ZShyZXBvcnRTdGF0ZSA9IHRydWUpOiBPYnNlcnZhYmxlPENvbm5lY3Rpb25TdGF0ZT4ge1xyXG4gICAgcmV0dXJuIHJlcG9ydFN0YXRlID9cclxuICAgIHRoaXMuc3RhdGVDaGFuZ2VFdmVudEVtaXR0ZXIucGlwZShcclxuICAgICAgZGVib3VuY2VUaW1lKDMwMCksXHJcbiAgICAgIHN0YXJ0V2l0aCh0aGlzLnN0YXRlKSxcclxuICAgIClcclxuICAgIDpcclxuICAgIHRoaXMuc3RhdGVDaGFuZ2VFdmVudEVtaXR0ZXIucGlwZShcclxuICAgICAgZGVib3VuY2VUaW1lKDMwMClcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==