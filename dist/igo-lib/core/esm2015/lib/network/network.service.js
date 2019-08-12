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
export class NetworkService {
    /**
     * @param {?} messageService
     * @param {?} injector
     */
    constructor(messageService, injector) {
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
    checkNetworkState() {
        this.onlineSubscription = fromEvent(window, 'online').subscribe((/**
         * @return {?}
         */
        () => {
            console.log('allo');
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
    emitEvent() {
        this.stateChangeEventEmitter.emit(this.state);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.state.connection === false) {
            console.log('yo');
            /** @type {?} */
            const translate = this.injector.get(LanguageService).translate;
            /** @type {?} */
            const message = translate.instant('igo.core.network.offline.message');
            /** @type {?} */
            const title = translate.instant('igo.core.network.offline.title');
            this.messageService.info(message, title);
        }
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
    { type: Injector }
];
/** @nocollapse */ NetworkService.ngInjectableDef = i0.defineInjectable({ factory: function NetworkService_Factory() { return new NetworkService(i0.inject(i1.MessageService), i0.inject(i0.INJECTOR)); }, token: NetworkService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9uZXR3b3JrL25ldHdvcmsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQW9DLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRyxPQUFPLEVBQTRCLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDNUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7Ozs7QUFFdEUscUNBRUM7OztJQURDLHFDQUFvQjs7QUFNdEIsTUFBTSxPQUFPLGNBQWM7Ozs7O0lBVXpCLFlBQ1UsY0FBOEIsRUFDOUIsUUFBa0I7UUFEbEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFWcEIsNEJBQXVCLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFJOUQsVUFBSyxHQUFvQjtZQUMvQixVQUFVLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNO1NBQ3BDLENBQUM7UUFNQSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7OztJQUVPLGlCQUFpQjtRQUN2QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDbkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7a0JBQ2QsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVM7O2tCQUN4RCxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQzs7a0JBQzlELEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLCtCQUErQixDQUFDO1lBQ2hFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25CLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFOztrQkFDL0QsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVM7O2tCQUN4RCxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQzs7a0JBQy9ELEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDOUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25CLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxTQUFTO1FBQ2YsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7OztJQUNELGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDOztrQkFDWixTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUzs7a0JBQ3hELE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxDQUFDOztrQkFDL0QsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUM7WUFDakUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJO1lBQ0YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2QztRQUFDLE9BQU8sQ0FBQyxFQUFFO1NBQ1g7SUFDSCxDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxXQUFXLEdBQUcsSUFBSTtRQUM3QixPQUFPLFdBQVcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQy9CLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDdEI7WUFDRCxDQUFDO2dCQUNELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQy9CLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FDbEIsQ0FBQztJQUNKLENBQUM7OztZQXhFRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFUUSxjQUFjO1lBSjhDLFFBQVE7Ozs7Ozs7O0lBZ0IzRSxpREFBc0U7Ozs7O0lBQ3RFLDRDQUF5Qzs7Ozs7SUFDekMsNkNBQTBDOzs7OztJQUUxQywrQkFFRTs7Ozs7SUFHQSx3Q0FBc0M7Ozs7O0lBQ3RDLGtDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBPbkluaXQsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuLi9tZXNzYWdlJztcclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vbGFuZ3VhZ2Uvc2hhcmVkL2xhbmd1YWdlLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb25uZWN0aW9uU3RhdGUge1xyXG4gIGNvbm5lY3Rpb246IGJvb2xlYW47XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5ldHdvcmtTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0ZUNoYW5nZUV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXI8Q29ubmVjdGlvblN0YXRlPigpO1xyXG4gIHByaXZhdGUgb25saW5lU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBvZmZsaW5lU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHByaXZhdGUgc3RhdGU6IENvbm5lY3Rpb25TdGF0ZSA9IHtcclxuICAgIGNvbm5lY3Rpb246IHdpbmRvdy5uYXZpZ2F0b3Iub25MaW5lXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXHJcbiAgICApIHtcclxuICAgIHRoaXMuY2hlY2tOZXR3b3JrU3RhdGUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2hlY2tOZXR3b3JrU3RhdGUoKSB7XHJcbiAgICB0aGlzLm9ubGluZVN1YnNjcmlwdGlvbiA9IGZyb21FdmVudCh3aW5kb3csICdvbmxpbmUnKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnYWxsbycpO1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmluamVjdG9yLmdldChMYW5ndWFnZVNlcnZpY2UpLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9ubGluZS5tZXNzYWdlJyk7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLm5ldHdvcmsub25saW5lLnRpdGxlJyk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9IHRydWU7XHJcbiAgICAgIHRoaXMuZW1pdEV2ZW50KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9mZmxpbmVTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQod2luZG93LCAnb2ZmbGluZScpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KExhbmd1YWdlU2VydmljZSkudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLm5ldHdvcmsub2ZmbGluZS5tZXNzYWdlJyk7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb3JlLm5ldHdvcmsub2ZmbGluZS50aXRsZScpO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmluZm8obWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPSBmYWxzZTtcclxuICAgICAgdGhpcy5lbWl0RXZlbnQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBlbWl0RXZlbnQoKSB7XHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlRXZlbnRFbWl0dGVyLmVtaXQodGhpcy5zdGF0ZSk7XHJcbiAgfVxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd5bycpO1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmluamVjdG9yLmdldChMYW5ndWFnZVNlcnZpY2UpLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9mZmxpbmUubWVzc2FnZScpO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uY29yZS5uZXR3b3JrLm9mZmxpbmUudGl0bGUnKTtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5pbmZvKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5vZmZsaW5lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMub25saW5lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjdXJyZW50U3RhdGUocmVwb3J0U3RhdGUgPSB0cnVlKTogT2JzZXJ2YWJsZTxDb25uZWN0aW9uU3RhdGU+IHtcclxuICAgIHJldHVybiByZXBvcnRTdGF0ZSA/XHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlRXZlbnRFbWl0dGVyLnBpcGUoXHJcbiAgICAgIGRlYm91bmNlVGltZSgzMDApLFxyXG4gICAgICBzdGFydFdpdGgodGhpcy5zdGF0ZSksXHJcbiAgICApXHJcbiAgICA6XHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlRXZlbnRFbWl0dGVyLnBpcGUoXHJcbiAgICAgIGRlYm91bmNlVGltZSgzMDApXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=