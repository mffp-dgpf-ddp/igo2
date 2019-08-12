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
        if (viewContext.keepCurrentView !== true) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWNvbnRleHQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL21hcC1jb250ZXh0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFHN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBMEIsbUJBQW1CLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBTW5ELE1BQU0sT0FBTyxtQkFBbUI7Ozs7O0lBUTlCLFlBQ0UsU0FBOEIsRUFDdEIsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRXRDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFURCxJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFTRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVE7YUFDMUMsSUFBSSxDQUFDLE1BQU07Ozs7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUMsQ0FBQzthQUM5QyxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQztJQUM3RCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7Ozs7O0lBRU8sbUJBQW1CLENBQUMsT0FBd0I7UUFDbEQsSUFBSSxPQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUM3QixPQUFPO1NBQ1I7Ozs7Ozs7Ozs7Ozs7O2NBZ0JLLFdBQVcsR0FBbUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJO1FBQ3BELElBQUksV0FBVyxDQUFDLGVBQWUsS0FBSyxJQUFJLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsbUJBQUEsV0FBVyxFQUFrQixDQUFDO1NBQ3JEO0lBQ0gsQ0FBQzs7O1lBbkRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2FBQzVCOzs7O1lBUGdDLG1CQUFtQjtZQUUzQyxjQUFjOzs7Ozs7O0lBT3JCLHdDQUF1Qzs7Ozs7SUFDdkMsd0NBQWdDOzs7OztJQVE5Qiw2Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwLCBNYXBWaWV3T3B0aW9ucywgTWFwQnJvd3NlckNvbXBvbmVudCB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgeyBDb250ZXh0U2VydmljZSB9IGZyb20gJy4vY29udGV4dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGV0YWlsZWRDb250ZXh0LCBDb250ZXh0TWFwVmlldyB9IGZyb20gJy4vY29udGV4dC5pbnRlcmZhY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvTWFwQ29udGV4dF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBDb250ZXh0RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50O1xyXG4gIHByaXZhdGUgY29udGV4dCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgY29udGV4dFNlcnZpY2U6IENvbnRleHRTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5jb250ZXh0JCQgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmNvbnRleHQkXHJcbiAgICAgIC5waXBlKGZpbHRlcihjb250ZXh0ID0+IGNvbnRleHQgIT09IHVuZGVmaW5lZCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoY29udGV4dCA9PiB0aGlzLmhhbmRsZUNvbnRleHRDaGFuZ2UoY29udGV4dCkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNvbnRleHQkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVDb250ZXh0Q2hhbmdlKGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCkge1xyXG4gICAgaWYgKGNvbnRleHQubWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgY3JlYXRlcyBhIG5ldyBvbC5NYXAgd2hlbiB0aGUgY29udGV4dCBjaGFuZ2VzLiBEb2luZyB0aGF0XHJcbiAgICAvLyBhbGxvd3MgdGhlIHByaW50IHRvb2wgdG8gd29yayBwcm9wZXJseSBldmVuIHdoZW4gdGhlIG1hcCdzIGNhbnZhc1xyXG4gICAgLy8gaGFzIGJlZW4gdGFpbnRlZCAoQ09SUykgd2l0aCB0aGUgbGF5ZXJzIG9mIGFub3RoZXIgY29udGV4dC4gVGhpcyBjb3VsZFxyXG4gICAgLy8gaGF2ZSBzb21lIHNpZGUgZWZmZWN0cyBzdWNoIGFzIHVuYmluZGluZyBhbGwgbGlzdGVuZXJzIG9uIHRoZSBmaXJzdCBtYXAuXHJcbiAgICAvLyBBIGJldHRlciBzb2x1dGlvbiB3b3VsZCBiZSB0byBjcmVhdGUgYSBuZXcgbWFwIChwcmV2aWV3KSBiZWZvcmVcclxuICAgIC8vIHByaW50aW5nIGFuZCBhdm9pZCB0aGUgdGFpbnRlZCBjYW52YXMgaXNzdWUuIFRoaXMgd2lsbCBjb21lIGxhdGVyIHNvXHJcbiAgICAvLyB0aGlzIHNuaXBwZXQgb2YgY29kZSBpcyBrZXB0IGhlcmUgaW4gY2FzZSBpdCB0YWtlcyB0b28gbG9uZyBiZWNvbWVzXHJcbiAgICAvLyBhbiBpc3N1ZVxyXG5cclxuICAgIC8vIGNvbnN0IHRhcmdldCA9IHRoaXMuY29tcG9uZW50Lm1hcC5vbC5nZXRUYXJnZXQoKTtcclxuICAgIC8vIHRoaXMuY29tcG9uZW50Lm1hcC5vbC5zZXRUYXJnZXQodW5kZWZpbmVkKTtcclxuICAgIC8vIHRoaXMuY29tcG9uZW50Lm1hcC5pbml0KCk7XHJcbiAgICAvLyB0aGlzLmNvbXBvbmVudC5tYXAub2wuc2V0VGFyZ2V0KHRhcmdldCk7XHJcblxyXG4gICAgY29uc3Qgdmlld0NvbnRleHQ6IENvbnRleHRNYXBWaWV3ID0gY29udGV4dC5tYXAudmlldztcclxuICAgIGlmICh2aWV3Q29udGV4dC5rZWVwQ3VycmVudFZpZXcgIT09IHRydWUpIHtcclxuICAgICAgdGhpcy5jb21wb25lbnQudmlldyA9IHZpZXdDb250ZXh0IGFzIE1hcFZpZXdPcHRpb25zO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=