/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MediaService } from '@igo2/core';
export class FlexibleComponent {
    /**
     * @param {?} el
     * @param {?} mediaService
     */
    constructor(el, mediaService) {
        this.el = el;
        this.mediaService = mediaService;
        this._initial = '0';
        this._collapsed = '0';
        this._expanded = '100%';
        this._initialMobile = this.expanded;
        this._collapsedMobile = this.collapsed;
        this._expandedMobile = this.expanded;
        this._direction = 'column';
        this._state = 'initial';
    }
    /**
     * @return {?}
     */
    get initial() {
        return this._initial;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set initial(value) {
        this._initial = value;
    }
    /**
     * @return {?}
     */
    get collapsed() {
        return this._collapsed;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsed(value) {
        this._collapsed = value;
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        this._expanded = value;
    }
    /**
     * @return {?}
     */
    get initialMobile() {
        return this._initialMobile;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set initialMobile(value) {
        this._initialMobile = value;
    }
    /**
     * @return {?}
     */
    get collapsedMobile() {
        return this._collapsedMobile;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsedMobile(value) {
        this._collapsedMobile = value;
    }
    /**
     * @return {?}
     */
    get expandedMobile() {
        return this._expandedMobile;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expandedMobile(value) {
        this._expandedMobile = value;
    }
    /**
     * @return {?}
     */
    get direction() {
        return this._direction;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set direction(value) {
        this._direction = value;
    }
    /**
     * @return {?}
     */
    get state() {
        return this._state;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set state(value) {
        /** @type {?} */
        const sizes = {
            initial: this.initial,
            collapsed: this.collapsed,
            expanded: this.expanded
        };
        /** @type {?} */
        const media = this.mediaService.media$.value;
        if (media === 'mobile') {
            Object.assign(sizes, {
                initial: this.initialMobile,
                collapsed: this.collapsedMobile,
                expanded: this.expandedMobile
            });
        }
        /** @type {?} */
        const size = sizes[value];
        if (size !== undefined) {
            this.setSize(size);
            setTimeout((/**
             * @return {?}
             */
            () => {
                this._state = value;
            }), FlexibleComponent.transitionTime);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.el.nativeElement.className += this.direction;
        // Since this component supports different sizes
        // on mobile, force a redraw when the media changes
        this.mediaService.media$.subscribe((/**
         * @param {?} media
         * @return {?}
         */
        (media) => (this.state = this.state)));
    }
    /**
     * @private
     * @param {?} size
     * @return {?}
     */
    setSize(size) {
        this._state = 'transition';
        if (this.direction === 'column') {
            this.main.nativeElement.style.height = size;
        }
        else if (this.direction === 'row') {
            this.main.nativeElement.style.width = size;
        }
    }
}
FlexibleComponent.transitionTime = 250;
FlexibleComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-flexible',
                template: "<div #flexibleMain class=\"igo-flexible-main {{state}} {{direction}}\">\r\n  <div class=\"igo-container\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n</div>\r\n<div class=\"igo-flexible-fill\">\r\n  <div>\r\n  \t<div class=\"igo-container\">\r\n      <ng-content select=\"[igoFlexibleFill]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                styles: [":host{display:flex;height:100%;width:100%}:host.column{flex-direction:column}:host.row{flex-direction:row}.igo-flexible-main{flex:0 0 auto;overflow:hidden}.igo-flexible-main.column{transition:height .25s ease-in}.igo-flexible-main.row{transition:width .25s ease-in}.igo-flexible-fill>div{position:absolute;top:0;bottom:0;left:0;right:0}.igo-container{width:calc(100% - 2 * 5px);height:100%;padding:5px 0;margin:0 5px;overflow:hidden;position:relative}::ng-deep .igo-flexible-fill{flex:1 1 auto;overflow:hidden;position:relative}::ng-deep .igo-content{height:100%;width:100%;overflow:auto}::ng-deep igo-panel{height:100%}"]
            }] }
];
/** @nocollapse */
FlexibleComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: MediaService }
];
FlexibleComponent.propDecorators = {
    main: [{ type: ViewChild, args: ['flexibleMain',] }],
    initial: [{ type: Input }],
    collapsed: [{ type: Input }],
    expanded: [{ type: Input }],
    initialMobile: [{ type: Input }],
    collapsedMobile: [{ type: Input }],
    expandedMobile: [{ type: Input }],
    direction: [{ type: Input }],
    state: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    FlexibleComponent.transitionTime;
    /** @type {?} */
    FlexibleComponent.prototype.main;
    /**
     * @type {?}
     * @private
     */
    FlexibleComponent.prototype._initial;
    /**
     * @type {?}
     * @private
     */
    FlexibleComponent.prototype._collapsed;
    /**
     * @type {?}
     * @private
     */
    FlexibleComponent.prototype._expanded;
    /**
     * @type {?}
     * @private
     */
    FlexibleComponent.prototype._initialMobile;
    /**
     * @type {?}
     * @private
     */
    FlexibleComponent.prototype._collapsedMobile;
    /**
     * @type {?}
     * @private
     */
    FlexibleComponent.prototype._expandedMobile;
    /**
     * @type {?}
     * @private
     */
    FlexibleComponent.prototype._direction;
    /**
     * @type {?}
     * @private
     */
    FlexibleComponent.prototype._state;
    /**
     * @type {?}
     * @private
     */
    FlexibleComponent.prototype.el;
    /**
     * @type {?}
     * @private
     */
    FlexibleComponent.prototype.mediaService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2ZsZXhpYmxlL2ZsZXhpYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRixPQUFPLEVBQVMsWUFBWSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBU2pELE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBa0c1QixZQUFvQixFQUFjLEVBQVUsWUFBMEI7UUFBbEQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBdEY5RCxhQUFRLEdBQUcsR0FBRyxDQUFDO1FBU2YsZUFBVSxHQUFHLEdBQUcsQ0FBQztRQVNqQixjQUFTLEdBQUcsTUFBTSxDQUFDO1FBU25CLG1CQUFjLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQVN2QyxxQkFBZ0IsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBUzFDLG9CQUFlLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQVN4QyxlQUFVLEdBQXNCLFFBQVEsQ0FBQztRQThCekMsV0FBTSxHQUFrQixTQUFTLENBQUM7SUFFK0IsQ0FBQzs7OztJQTdGMUUsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBYTtRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDOzs7O0lBR0QsSUFDSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBQ0QsSUFBSSxTQUFTLENBQUMsS0FBYTtRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFD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SyxLQUFLLEVBQUU7WUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDNUM7SUFDSCxDQUFDOztBQXJITSxnQ0FBYyxHQUFHLEdBQUcsQ0FBQzs7WUFON0IsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QiwwV0FBd0M7O2FBRXpDOzs7O1lBVjZDLFVBQVU7WUFFeEMsWUFBWTs7O21CQVl6QixTQUFTLFNBQUMsY0FBYztzQkFFeEIsS0FBSzt3QkFTTCxLQUFLO3VCQVNMLEtBQUs7NEJBU0wsS0FBSzs4QkFTTCxLQUFLOzZCQVNMLEtBQUs7d0JBU0wsS0FBSztvQkFTTCxLQUFLOzs7O0lBbkVOLGlDQUE0Qjs7SUFFNUIsaUNBQWdDOzs7OztJQVNoQyxxQ0FBdUI7Ozs7O0lBU3ZCLHVDQUF5Qjs7Ozs7SUFTekIsc0NBQTJCOzs7OztJQVMzQiwyQ0FBK0M7Ozs7O0lBUy9DLDZDQUFrRDs7Ozs7SUFTbEQsNENBQWdEOzs7OztJQVNoRCx1Q0FBaUQ7Ozs7O0lBOEJqRCxtQ0FBMEM7Ozs7O0lBRTlCLCtCQUFzQjs7Ozs7SUFBRSx5Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTWVkaWEsIE1lZGlhU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRmxleGlibGVTdGF0ZSwgRmxleGlibGVEaXJlY3Rpb24gfSBmcm9tICcuL2ZsZXhpYmxlLnR5cGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tZmxleGlibGUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9mbGV4aWJsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZmxleGlibGUuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHN0YXRpYyB0cmFuc2l0aW9uVGltZSA9IDI1MDtcclxuXHJcbiAgQFZpZXdDaGlsZCgnZmxleGlibGVNYWluJykgbWFpbjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgaW5pdGlhbCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWw7XHJcbiAgfVxyXG4gIHNldCBpbml0aWFsKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2luaXRpYWwgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaW5pdGlhbCA9ICcwJztcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sbGFwc2VkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2VkO1xyXG4gIH1cclxuICBzZXQgY29sbGFwc2VkKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2NvbGxhcHNlZCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xsYXBzZWQgPSAnMCc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGV4cGFuZGVkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XHJcbiAgfVxyXG4gIHNldCBleHBhbmRlZCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9leHBhbmRlZCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9leHBhbmRlZCA9ICcxMDAlJztcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgaW5pdGlhbE1vYmlsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxNb2JpbGU7XHJcbiAgfVxyXG4gIHNldCBpbml0aWFsTW9iaWxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2luaXRpYWxNb2JpbGUgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaW5pdGlhbE1vYmlsZTogc3RyaW5nID0gdGhpcy5leHBhbmRlZDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sbGFwc2VkTW9iaWxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2VkTW9iaWxlO1xyXG4gIH1cclxuICBzZXQgY29sbGFwc2VkTW9iaWxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2NvbGxhcHNlZE1vYmlsZSA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xsYXBzZWRNb2JpbGU6IHN0cmluZyA9IHRoaXMuY29sbGFwc2VkO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBleHBhbmRlZE1vYmlsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2V4cGFuZGVkTW9iaWxlO1xyXG4gIH1cclxuICBzZXQgZXhwYW5kZWRNb2JpbGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fZXhwYW5kZWRNb2JpbGUgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZXhwYW5kZWRNb2JpbGU6IHN0cmluZyA9IHRoaXMuZXhwYW5kZWQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpcmVjdGlvbigpOiBGbGV4aWJsZURpcmVjdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xyXG4gIH1cclxuICBzZXQgZGlyZWN0aW9uKHZhbHVlOiBGbGV4aWJsZURpcmVjdGlvbikge1xyXG4gICAgdGhpcy5fZGlyZWN0aW9uID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2RpcmVjdGlvbjogRmxleGlibGVEaXJlY3Rpb24gPSAnY29sdW1uJztcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgc3RhdGUoKTogRmxleGlibGVTdGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhdGU7XHJcbiAgfVxyXG4gIHNldCBzdGF0ZSh2YWx1ZTogRmxleGlibGVTdGF0ZSkge1xyXG4gICAgY29uc3Qgc2l6ZXMgPSB7XHJcbiAgICAgIGluaXRpYWw6IHRoaXMuaW5pdGlhbCxcclxuICAgICAgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlZCxcclxuICAgICAgZXhwYW5kZWQ6IHRoaXMuZXhwYW5kZWRcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbWVkaWEgPSB0aGlzLm1lZGlhU2VydmljZS5tZWRpYSQudmFsdWU7XHJcbiAgICBpZiAobWVkaWEgPT09ICdtb2JpbGUnKSB7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24oc2l6ZXMsIHtcclxuICAgICAgICBpbml0aWFsOiB0aGlzLmluaXRpYWxNb2JpbGUsXHJcbiAgICAgICAgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlZE1vYmlsZSxcclxuICAgICAgICBleHBhbmRlZDogdGhpcy5leHBhbmRlZE1vYmlsZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaXplID0gc2l6ZXNbdmFsdWVdO1xyXG4gICAgaWYgKHNpemUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnNldFNpemUoc2l6ZSk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gdmFsdWU7XHJcbiAgICAgIH0sIEZsZXhpYmxlQ29tcG9uZW50LnRyYW5zaXRpb25UaW1lKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBfc3RhdGU6IEZsZXhpYmxlU3RhdGUgPSAnaW5pdGlhbCc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgbWVkaWFTZXJ2aWNlOiBNZWRpYVNlcnZpY2UpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZSArPSB0aGlzLmRpcmVjdGlvbjtcclxuXHJcbiAgICAvLyBTaW5jZSB0aGlzIGNvbXBvbmVudCBzdXBwb3J0cyBkaWZmZXJlbnQgc2l6ZXNcclxuICAgIC8vIG9uIG1vYmlsZSwgZm9yY2UgYSByZWRyYXcgd2hlbiB0aGUgbWVkaWEgY2hhbmdlc1xyXG4gICAgdGhpcy5tZWRpYVNlcnZpY2UubWVkaWEkLnN1YnNjcmliZShcclxuICAgICAgKG1lZGlhOiBNZWRpYSkgPT4gKHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0U2l6ZShzaXplOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3N0YXRlID0gJ3RyYW5zaXRpb24nO1xyXG5cclxuICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2NvbHVtbicpIHtcclxuICAgICAgdGhpcy5tYWluLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gc2l6ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICdyb3cnKSB7XHJcbiAgICAgIHRoaXMubWFpbi5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gc2l6ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19