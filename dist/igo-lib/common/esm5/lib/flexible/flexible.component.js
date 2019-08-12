/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MediaService } from '@igo2/core';
var FlexibleComponent = /** @class */ (function () {
    function FlexibleComponent(el, mediaService) {
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
    Object.defineProperty(FlexibleComponent.prototype, "initial", {
        get: /**
         * @return {?}
         */
        function () {
            return this._initial;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._initial = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexibleComponent.prototype, "collapsed", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsed;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._collapsed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexibleComponent.prototype, "expanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expanded;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._expanded = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexibleComponent.prototype, "initialMobile", {
        get: /**
         * @return {?}
         */
        function () {
            return this._initialMobile;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._initialMobile = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexibleComponent.prototype, "collapsedMobile", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsedMobile;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._collapsedMobile = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexibleComponent.prototype, "expandedMobile", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expandedMobile;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._expandedMobile = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexibleComponent.prototype, "direction", {
        get: /**
         * @return {?}
         */
        function () {
            return this._direction;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._direction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlexibleComponent.prototype, "state", {
        get: /**
         * @return {?}
         */
        function () {
            return this._state;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            /** @type {?} */
            var sizes = {
                initial: this.initial,
                collapsed: this.collapsed,
                expanded: this.expanded
            };
            /** @type {?} */
            var media = this.mediaService.media$.value;
            if (media === 'mobile') {
                Object.assign(sizes, {
                    initial: this.initialMobile,
                    collapsed: this.collapsedMobile,
                    expanded: this.expandedMobile
                });
            }
            /** @type {?} */
            var size = sizes[value];
            if (size !== undefined) {
                this.setSize(size);
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this._state = value;
                }), FlexibleComponent.transitionTime);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FlexibleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.el.nativeElement.className += this.direction;
        // Since this component supports different sizes
        // on mobile, force a redraw when the media changes
        this.mediaService.media$.subscribe((/**
         * @param {?} media
         * @return {?}
         */
        function (media) { return (_this.state = _this.state); }));
    };
    /**
     * @private
     * @param {?} size
     * @return {?}
     */
    FlexibleComponent.prototype.setSize = /**
     * @private
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this._state = 'transition';
        if (this.direction === 'column') {
            this.main.nativeElement.style.height = size;
        }
        else if (this.direction === 'row') {
            this.main.nativeElement.style.width = size;
        }
    };
    FlexibleComponent.transitionTime = 250;
    FlexibleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-flexible',
                    template: "<div #flexibleMain class=\"igo-flexible-main {{state}} {{direction}}\">\r\n  <div class=\"igo-container\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n</div>\r\n<div class=\"igo-flexible-fill\">\r\n  <div>\r\n  \t<div class=\"igo-container\">\r\n      <ng-content select=\"[igoFlexibleFill]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                    styles: [":host{display:flex;height:100%;width:100%}:host.column{flex-direction:column}:host.row{flex-direction:row}.igo-flexible-main{flex:0 0 auto;overflow:hidden}.igo-flexible-main.column{transition:height .25s ease-in}.igo-flexible-main.row{transition:width .25s ease-in}.igo-flexible-fill>div{position:absolute;top:0;bottom:0;left:0;right:0}.igo-container{width:calc(100% - 2 * 5px);height:100%;padding:5px 0;margin:0 5px;overflow:hidden;position:relative}::ng-deep .igo-flexible-fill{flex:1 1 auto;overflow:hidden;position:relative}::ng-deep .igo-content{height:100%;width:100%;overflow:auto}::ng-deep igo-panel{height:100%}"]
                }] }
    ];
    /** @nocollapse */
    FlexibleComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: MediaService }
    ]; };
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
    return FlexibleComponent;
}());
export { FlexibleComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2ZsZXhpYmxlL2ZsZXhpYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRixPQUFPLEVBQVMsWUFBWSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBSWpEO0lBdUdFLDJCQUFvQixFQUFjLEVBQVUsWUFBMEI7UUFBbEQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBdEY5RCxhQUFRLEdBQUcsR0FBRyxDQUFDO1FBU2YsZUFBVSxHQUFHLEdBQUcsQ0FBQztRQVNqQixjQUFTLEdBQUcsTUFBTSxDQUFDO1FBU25CLG1CQUFjLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQVN2QyxxQkFBZ0IsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBUzFDLG9CQUFlLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQVN4QyxlQUFVLEdBQXNCLFFBQVEsQ0FBQztRQThCekMsV0FBTSxHQUFrQixTQUFTLENBQUM7SUFFK0IsQ0FBQztJQTdGMUUsc0JBQ0ksc0NBQU87Ozs7UUFEWDtZQUVFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7OztRQUNELFVBQVksS0FBYTtZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDOzs7T0FIQTtJQU1ELHNCQUNJLHdDQUFTOzs7O1FBRGI7WUFFRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzs7Ozs7UUFDRCxVQUFjLEtBQWE7WUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSx1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Q0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUM3QzthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLEVBQUU7WUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBckhNLGdDQUFjLEdBQUcsR0FBRyxDQUFDOztnQkFON0IsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QiwwV0FBd0M7O2lCQUV6Qzs7OztnQkFWNkMsVUFBVTtnQkFFeEMsWUFBWTs7O3VCQVl6QixTQUFTLFNBQUMsY0FBYzswQkFFeEIsS0FBSzs0QkFTTCxLQUFLOzJCQVNMLEtBQUs7Z0NBU0wsS0FBSztrQ0FTTCxLQUFLO2lDQVNMLEtBQUs7NEJBU0wsS0FBSzt3QkFTTCxLQUFLOztJQW1EUix3QkFBQztDQUFBLEFBNUhELElBNEhDO1NBdkhZLGlCQUFpQjs7O0lBQzVCLGlDQUE0Qjs7SUFFNUIsaUNBQWdDOzs7OztJQVNoQyxxQ0FBdUI7Ozs7O0lBU3ZCLHVDQUF5Qjs7Ozs7SUFTekIsc0NBQTJCOzs7OztJQVMzQiwyQ0FBK0M7Ozs7O0lBUy9DLDZDQUFrRDs7Ozs7SUFTbEQsNENBQWdEOzs7OztJQVNoRCx1Q0FBaUQ7Ozs7O0lBOEJqRCxtQ0FBMEM7Ozs7O0lBRTlCLCtCQUFzQjs7Ozs7SUFBRSx5Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTWVkaWEsIE1lZGlhU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRmxleGlibGVTdGF0ZSwgRmxleGlibGVEaXJlY3Rpb24gfSBmcm9tICcuL2ZsZXhpYmxlLnR5cGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tZmxleGlibGUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9mbGV4aWJsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZmxleGlibGUuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHN0YXRpYyB0cmFuc2l0aW9uVGltZSA9IDI1MDtcclxuXHJcbiAgQFZpZXdDaGlsZCgnZmxleGlibGVNYWluJykgbWFpbjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgaW5pdGlhbCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWw7XHJcbiAgfVxyXG4gIHNldCBpbml0aWFsKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2luaXRpYWwgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaW5pdGlhbCA9ICcwJztcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sbGFwc2VkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2VkO1xyXG4gIH1cclxuICBzZXQgY29sbGFwc2VkKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2NvbGxhcHNlZCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xsYXBzZWQgPSAnMCc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGV4cGFuZGVkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XHJcbiAgfVxyXG4gIHNldCBleHBhbmRlZCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9leHBhbmRlZCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9leHBhbmRlZCA9ICcxMDAlJztcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgaW5pdGlhbE1vYmlsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxNb2JpbGU7XHJcbiAgfVxyXG4gIHNldCBpbml0aWFsTW9iaWxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2luaXRpYWxNb2JpbGUgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaW5pdGlhbE1vYmlsZTogc3RyaW5nID0gdGhpcy5leHBhbmRlZDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sbGFwc2VkTW9iaWxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2VkTW9iaWxlO1xyXG4gIH1cclxuICBzZXQgY29sbGFwc2VkTW9iaWxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2NvbGxhcHNlZE1vYmlsZSA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xsYXBzZWRNb2JpbGU6IHN0cmluZyA9IHRoaXMuY29sbGFwc2VkO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBleHBhbmRlZE1vYmlsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2V4cGFuZGVkTW9iaWxlO1xyXG4gIH1cclxuICBzZXQgZXhwYW5kZWRNb2JpbGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fZXhwYW5kZWRNb2JpbGUgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZXhwYW5kZWRNb2JpbGU6IHN0cmluZyA9IHRoaXMuZXhwYW5kZWQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpcmVjdGlvbigpOiBGbGV4aWJsZURpcmVjdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xyXG4gIH1cclxuICBzZXQgZGlyZWN0aW9uKHZhbHVlOiBGbGV4aWJsZURpcmVjdGlvbikge1xyXG4gICAgdGhpcy5fZGlyZWN0aW9uID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2RpcmVjdGlvbjogRmxleGlibGVEaXJlY3Rpb24gPSAnY29sdW1uJztcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgc3RhdGUoKTogRmxleGlibGVTdGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhdGU7XHJcbiAgfVxyXG4gIHNldCBzdGF0ZSh2YWx1ZTogRmxleGlibGVTdGF0ZSkge1xyXG4gICAgY29uc3Qgc2l6ZXMgPSB7XHJcbiAgICAgIGluaXRpYWw6IHRoaXMuaW5pdGlhbCxcclxuICAgICAgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlZCxcclxuICAgICAgZXhwYW5kZWQ6IHRoaXMuZXhwYW5kZWRcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbWVkaWEgPSB0aGlzLm1lZGlhU2VydmljZS5tZWRpYSQudmFsdWU7XHJcbiAgICBpZiAobWVkaWEgPT09ICdtb2JpbGUnKSB7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24oc2l6ZXMsIHtcclxuICAgICAgICBpbml0aWFsOiB0aGlzLmluaXRpYWxNb2JpbGUsXHJcbiAgICAgICAgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlZE1vYmlsZSxcclxuICAgICAgICBleHBhbmRlZDogdGhpcy5leHBhbmRlZE1vYmlsZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaXplID0gc2l6ZXNbdmFsdWVdO1xyXG4gICAgaWYgKHNpemUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnNldFNpemUoc2l6ZSk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gdmFsdWU7XHJcbiAgICAgIH0sIEZsZXhpYmxlQ29tcG9uZW50LnRyYW5zaXRpb25UaW1lKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBfc3RhdGU6IEZsZXhpYmxlU3RhdGUgPSAnaW5pdGlhbCc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgbWVkaWFTZXJ2aWNlOiBNZWRpYVNlcnZpY2UpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZSArPSB0aGlzLmRpcmVjdGlvbjtcclxuXHJcbiAgICAvLyBTaW5jZSB0aGlzIGNvbXBvbmVudCBzdXBwb3J0cyBkaWZmZXJlbnQgc2l6ZXNcclxuICAgIC8vIG9uIG1vYmlsZSwgZm9yY2UgYSByZWRyYXcgd2hlbiB0aGUgbWVkaWEgY2hhbmdlc1xyXG4gICAgdGhpcy5tZWRpYVNlcnZpY2UubWVkaWEkLnN1YnNjcmliZShcclxuICAgICAgKG1lZGlhOiBNZWRpYSkgPT4gKHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0U2l6ZShzaXplOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3N0YXRlID0gJ3RyYW5zaXRpb24nO1xyXG5cclxuICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2NvbHVtbicpIHtcclxuICAgICAgdGhpcy5tYWluLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gc2l6ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICdyb3cnKSB7XHJcbiAgICAgIHRoaXMubWFpbi5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gc2l6ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19