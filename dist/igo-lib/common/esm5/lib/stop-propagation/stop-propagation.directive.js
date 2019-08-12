/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener } from '@angular/core';
var StopPropagationDirective = /** @class */ (function () {
    function StopPropagationDirective() {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    StopPropagationDirective.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
    };
    StopPropagationDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoStopPropagation]'
                },] }
    ];
    StopPropagationDirective.propDecorators = {
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return StopPropagationDirective;
}());
export { StopPropagationDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcC1wcm9wYWdhdGlvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvc3RvcC1wcm9wYWdhdGlvbi9zdG9wLXByb3BhZ2F0aW9uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEQ7SUFBQTtJQVFBLENBQUM7Ozs7O0lBSFEsMENBQU87Ozs7SUFEZCxVQUNlLEtBQVU7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzFCLENBQUM7O2dCQVBGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2lCQUNqQzs7OzBCQUVFLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBSW5DLCtCQUFDO0NBQUEsQUFSRCxJQVFDO1NBTFksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb1N0b3BQcm9wYWdhdGlvbl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdG9wUHJvcGFnYXRpb25EaXJlY3RpdmUge1xyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25DbGljayhldmVudDogYW55KTogdm9pZCB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9XHJcbn1cclxuIl19