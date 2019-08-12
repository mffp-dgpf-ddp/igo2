/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ToolComponent } from '@igo2/common';
var AboutToolComponent = /** @class */ (function () {
    function AboutToolComponent() {
        this.html = "\n    <h1>About IGO</h1>\n    <p>IGO (for Open GIS Infrastructure) is a Free Open Source Software\n    for Geospatial (FOSS4G) developed by organisations in the government\n    of Quebec in Canada. The objective is to make it open, common,\n    modular, based on open governance model supported by multiple\n    organisations. IGO is a Web GIS software with a client & server\n    component to manage and publish massive amount of Geospatial data.\n    </p>\n    </hr>\n    <a href='mailto:info@igouverte.org' target='_top'>info[@]igouverte.org</a>\n    </br>\n    <a href='http://www.igouverte.org' target='_blank'>www.igouverte.org</A>";
    }
    AboutToolComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-about-tool',
                    template: "<igo-custom-html\r\n[html]=\"html\">\r\n</igo-custom-html>\r\n"
                }] }
    ];
    /** @nocollapse */
    AboutToolComponent.ctorParameters = function () { return []; };
    AboutToolComponent.propDecorators = {
        html: [{ type: Input }]
    };
    AboutToolComponent = tslib_1.__decorate([
        ToolComponent({
            name: 'about',
            title: 'igo.integration.tools.about',
            icon: 'help-circle'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], AboutToolComponent);
    return AboutToolComponent;
}());
export { AboutToolComponent };
if (false) {
    /** @type {?} */
    AboutToolComponent.prototype.html;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXQtdG9vbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9pbnRlZ3JhdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9hYm91dC9hYm91dC10b29sL2Fib3V0LXRvb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7SUEwQjNDO1FBZFMsU0FBSSxHQUFXLCtuQkFZbUQsQ0FBQztJQUU3RCxDQUFDOztnQkFuQmpCLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQiwwRUFBMEM7aUJBQzNDOzs7Ozt1QkFFRSxLQUFLOztJQURLLGtCQUFrQjtRQVQ5QixhQUFhLENBQUM7WUFDYixJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSw2QkFBNkI7WUFDcEMsSUFBSSxFQUFFLGFBQWE7U0FDcEIsQ0FBQzs7T0FLVyxrQkFBa0IsQ0FnQjlCO0lBQUQseUJBQUM7Q0FBQSxJQUFBO1NBaEJZLGtCQUFrQjs7O0lBQzdCLGtDQVk0RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFRvb2xDb21wb25lbnQgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuQFRvb2xDb21wb25lbnQoe1xyXG4gIG5hbWU6ICdhYm91dCcsXHJcbiAgdGl0bGU6ICdpZ28uaW50ZWdyYXRpb24udG9vbHMuYWJvdXQnLFxyXG4gIGljb246ICdoZWxwLWNpcmNsZSdcclxufSlcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tYWJvdXQtdG9vbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Fib3V0LXRvb2wuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBYm91dFRvb2xDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGh0bWw6IHN0cmluZyA9IGBcclxuICAgIDxoMT5BYm91dCBJR088L2gxPlxyXG4gICAgPHA+SUdPIChmb3IgT3BlbiBHSVMgSW5mcmFzdHJ1Y3R1cmUpIGlzIGEgRnJlZSBPcGVuIFNvdXJjZSBTb2Z0d2FyZVxyXG4gICAgZm9yIEdlb3NwYXRpYWwgKEZPU1M0RykgZGV2ZWxvcGVkIGJ5IG9yZ2FuaXNhdGlvbnMgaW4gdGhlIGdvdmVybm1lbnRcclxuICAgIG9mIFF1ZWJlYyBpbiBDYW5hZGEuIFRoZSBvYmplY3RpdmUgaXMgdG8gbWFrZSBpdCBvcGVuLCBjb21tb24sXHJcbiAgICBtb2R1bGFyLCBiYXNlZCBvbiBvcGVuIGdvdmVybmFuY2UgbW9kZWwgc3VwcG9ydGVkIGJ5IG11bHRpcGxlXHJcbiAgICBvcmdhbmlzYXRpb25zLiBJR08gaXMgYSBXZWIgR0lTIHNvZnR3YXJlIHdpdGggYSBjbGllbnQgJiBzZXJ2ZXJcclxuICAgIGNvbXBvbmVudCB0byBtYW5hZ2UgYW5kIHB1Ymxpc2ggbWFzc2l2ZSBhbW91bnQgb2YgR2Vvc3BhdGlhbCBkYXRhLlxyXG4gICAgPC9wPlxyXG4gICAgPC9ocj5cclxuICAgIDxhIGhyZWY9J21haWx0bzppbmZvQGlnb3V2ZXJ0ZS5vcmcnIHRhcmdldD0nX3RvcCc+aW5mb1tAXWlnb3V2ZXJ0ZS5vcmc8L2E+XHJcbiAgICA8L2JyPlxyXG4gICAgPGEgaHJlZj0naHR0cDovL3d3dy5pZ291dmVydGUub3JnJyB0YXJnZXQ9J19ibGFuayc+d3d3Lmlnb3V2ZXJ0ZS5vcmc8L0E+YDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiJdfQ==