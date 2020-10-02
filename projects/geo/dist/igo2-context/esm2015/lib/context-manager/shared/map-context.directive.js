/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive } from '@angular/core';
import { filter } from 'rxjs/operators';
import { MapBrowserComponent } from '@igo2/geo';
import { ContextService } from './context.service';
export class MapContextDirective {
    /**
     * @param {?} component
     * @param {?} contextService
     */
    constructor(component, contextService) {
        this.contextService = contextService;
        this.component = component;
    }
    /**
     * @return {?}
     */
    get map() {
        return this.component.map;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.context$$ = this.contextService.context$
            .pipe(filter((/**
         * @param {?} context
         * @return {?}
         */
        context => context !== undefined)))
            .subscribe((/**
         * @param {?} context
         * @return {?}
         */
        context => this.handleContextChange(context)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.context$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    handleContextChange(context) {
        if (context.map === undefined) {
            return;
        }
        // This creates a new ol.Map when the context changes. Doing that
        // allows the print tool to work properly even when the map's canvas
        // has been tainted (CORS) with the layers of another context. This could
        // have some side effects such as unbinding all listeners on the first map.
        // A better solution would be to create a new map (preview) before
        // printing and avoid the tainted canvas issue. This will come later so
        // this snippet of code is kept here in case it takes too long becomes
        // an issue
        // const target = this.component.map.ol.getTarget();
        // this.component.map.ol.setTarget(undefined);
        // this.component.map.init();
        // this.component.map.ol.setTarget(target);
        /** @type {?} */
        const viewContext = context.map.view;
        if (!this.component.view || viewContext.keepCurrentView !== true) {
            this.component.view = (/** @type {?} */ (viewContext));
        }
    }
}
MapContextDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoMapContext]'
            },] }
];
/** @nocollapse */
MapContextDirective.ctorParameters = () => [
    { type: MapBrowserComponent },
    { type: ContextService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    MapContextDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    MapContextDirective.prototype.context$$;
    /**
     * @type {?}
     * @private
     */
    MapContextDirective.prototype.contextService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWNvbnRleHQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL21hcC1jb250ZXh0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFHN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBMEIsbUJBQW1CLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBTW5ELE1BQU0sT0FBTyxtQkFBbUI7Ozs7O0lBUTlCLFlBQ0UsU0FBOEIsRUFDdEIsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRXRDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFURCxJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFTRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVE7YUFDMUMsSUFBSSxDQUFDLE1BQU07Ozs7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUMsQ0FBQzthQUM5QyxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQztJQUM3RCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7Ozs7O0lBRU8sbUJBQW1CLENBQUMsT0FBd0I7UUFDbEQsSUFBSSxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUM3QixPQUFPO1NBQ1I7Ozs7Ozs7Ozs7Ozs7O2NBZ0JLLFdBQVcsR0FBbUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJO1FBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsZUFBZSxLQUFLLElBQUksRUFBRTtZQUNoRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxtQkFBQSxXQUFXLEVBQWtCLENBQUM7U0FDckQ7SUFDSCxDQUFDOzs7WUFuREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7YUFDNUI7Ozs7WUFQZ0MsbUJBQW1CO1lBRTNDLGNBQWM7Ozs7Ozs7SUFPckIsd0NBQXVDOzs7OztJQUN2Qyx3Q0FBZ0M7Ozs7O0lBUTlCLDZDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAsIE1hcFZpZXdPcHRpb25zLCBNYXBCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IENvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi9jb250ZXh0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEZXRhaWxlZENvbnRleHQsIENvbnRleHRNYXBWaWV3IH0gZnJvbSAnLi9jb250ZXh0LmludGVyZmFjZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29NYXBDb250ZXh0XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hcENvbnRleHREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBjb250ZXh0JCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Lm1hcDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBjb250ZXh0U2VydmljZTogQ29udGV4dFNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQkJCA9IHRoaXMuY29udGV4dFNlcnZpY2UuY29udGV4dCRcclxuICAgICAgLnBpcGUoZmlsdGVyKGNvbnRleHQgPT4gY29udGV4dCAhPT0gdW5kZWZpbmVkKSlcclxuICAgICAgLnN1YnNjcmliZShjb250ZXh0ID0+IHRoaXMuaGFuZGxlQ29udGV4dENoYW5nZShjb250ZXh0KSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY29udGV4dCQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUNvbnRleHRDaGFuZ2UoY29udGV4dDogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICBpZiAoY29udGV4dC5tYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhpcyBjcmVhdGVzIGEgbmV3IG9sLk1hcCB3aGVuIHRoZSBjb250ZXh0IGNoYW5nZXMuIERvaW5nIHRoYXRcclxuICAgIC8vIGFsbG93cyB0aGUgcHJpbnQgdG9vbCB0byB3b3JrIHByb3Blcmx5IGV2ZW4gd2hlbiB0aGUgbWFwJ3MgY2FudmFzXHJcbiAgICAvLyBoYXMgYmVlbiB0YWludGVkIChDT1JTKSB3aXRoIHRoZSBsYXllcnMgb2YgYW5vdGhlciBjb250ZXh0LiBUaGlzIGNvdWxkXHJcbiAgICAvLyBoYXZlIHNvbWUgc2lkZSBlZmZlY3RzIHN1Y2ggYXMgdW5iaW5kaW5nIGFsbCBsaXN0ZW5lcnMgb24gdGhlIGZpcnN0IG1hcC5cclxuICAgIC8vIEEgYmV0dGVyIHNvbHV0aW9uIHdvdWxkIGJlIHRvIGNyZWF0ZSBhIG5ldyBtYXAgKHByZXZpZXcpIGJlZm9yZVxyXG4gICAgLy8gcHJpbnRpbmcgYW5kIGF2b2lkIHRoZSB0YWludGVkIGNhbnZhcyBpc3N1ZS4gVGhpcyB3aWxsIGNvbWUgbGF0ZXIgc29cclxuICAgIC8vIHRoaXMgc25pcHBldCBvZiBjb2RlIGlzIGtlcHQgaGVyZSBpbiBjYXNlIGl0IHRha2VzIHRvbyBsb25nIGJlY29tZXNcclxuICAgIC8vIGFuIGlzc3VlXHJcblxyXG4gICAgLy8gY29uc3QgdGFyZ2V0ID0gdGhpcy5jb21wb25lbnQubWFwLm9sLmdldFRhcmdldCgpO1xyXG4gICAgLy8gdGhpcy5jb21wb25lbnQubWFwLm9sLnNldFRhcmdldCh1bmRlZmluZWQpO1xyXG4gICAgLy8gdGhpcy5jb21wb25lbnQubWFwLmluaXQoKTtcclxuICAgIC8vIHRoaXMuY29tcG9uZW50Lm1hcC5vbC5zZXRUYXJnZXQodGFyZ2V0KTtcclxuXHJcbiAgICBjb25zdCB2aWV3Q29udGV4dDogQ29udGV4dE1hcFZpZXcgPSBjb250ZXh0Lm1hcC52aWV3O1xyXG4gICAgaWYgKCF0aGlzLmNvbXBvbmVudC52aWV3IHx8IHZpZXdDb250ZXh0LmtlZXBDdXJyZW50VmlldyAhPT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmNvbXBvbmVudC52aWV3ID0gdmlld0NvbnRleHQgYXMgTWFwVmlld09wdGlvbnM7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==