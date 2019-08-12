/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Media } from '@igo2/core';
import { getEntityTitle } from '@igo2/common';
import { FeatureMotion, IgoMap, moveToOlFeatures } from '@igo2/geo';
import olFormatGeoJSON from 'ol/format/GeoJSON';
var SidenavComponent = /** @class */ (function () {
    function SidenavComponent(titleService) {
        this.titleService = titleService;
        this.format = new olFormatGeoJSON();
        this._title = this.titleService.getTitle();
        this.topPanelState = 'initial';
    }
    Object.defineProperty(SidenavComponent.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this._map;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._map = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidenavComponent.prototype, "opened", {
        get: /**
         * @return {?}
         */
        function () {
            return this._opened;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._opened = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidenavComponent.prototype, "feature", {
        get: /**
         * @return {?}
         */
        function () {
            return this._feature;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._feature = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidenavComponent.prototype, "tool", {
        get: /**
         * @return {?}
         */
        function () {
            return this._tool;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._tool = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidenavComponent.prototype, "media", {
        get: /**
         * @return {?}
         */
        function () {
            return this._media;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._media = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidenavComponent.prototype, "title", {
        get: /**
         * @return {?}
         */
        function () {
            return this._title;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._title = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidenavComponent.prototype, "featureTitle", {
        get: /**
         * @return {?}
         */
        function () {
            return this.feature ? getEntityTitle(this.feature) : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SidenavComponent.prototype.zoomToFeatureExtent = /**
     * @return {?}
     */
    function () {
        if (this.feature.geometry) {
            /** @type {?} */
            var olFeature = this.format.readFeature(this.feature, {
                dataProjection: this.feature.projection,
                featureProjection: this.map.projection
            });
            moveToOlFeatures(this.map, [olFeature], FeatureMotion.Zoom);
        }
    };
    /**
     * @return {?}
     */
    SidenavComponent.prototype.toggleTopPanel = /**
     * @return {?}
     */
    function () {
        if (this.topPanelState === 'initial') {
            this.topPanelState = 'expanded';
        }
        else {
            this.topPanelState = 'initial';
        }
    };
    SidenavComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-sidenav',
                    template: "<mat-sidenav\r\n  #sidenav\r\n  igoSidenavShim\r\n  mode=\"side\"\r\n  [opened]=\"opened\">\r\n\r\n  <div class=\"igo-sidenav-content\">\r\n\r\n    <igo-flexible\r\n      #topPanel\r\n      initial=\"50%\" initialMobile=\"100%\"\r\n      expanded=\"calc(100% - 58px)\"\r\n      [state]=\"topPanelState\">\r\n\r\n      <div class=\"igo-content\">\r\n        <igo-panel [title]=\"tool ? (tool.title | translate) : title\">\r\n          <button\r\n            mat-icon-button\r\n            panelLeftButton\r\n            tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\"\r\n            [matTooltip]=\"'igo.context.sidenav.goBack' | translate\"\r\n            *ngIf=\"tool\">\r\n            <mat-icon svgIcon=\"arrow-back\"></mat-icon>\r\n          </button>\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelRightButton\r\n            tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\"\r\n            [matTooltip]=\"'igo.context.sidenav.mainMenu' | translate\"\r\n            *ngIf=\"tool\">\r\n            <mat-icon svgIcon=\"menu\"></mat-icon>\r\n          </button>\r\n\r\n          <!--igo-toolbar\r\n            igoToolContext igoToolbarBinding\r\n            [withTitle]=\"tool ? false : true\">\r\n          </igo-toolbar>\r\n\r\n          <div class=\"igo-toolbox-container\" [ngClass]=\"{'shown': tool ? true : false}\">\r\n            <igo-toolbox [animate]=\"true\"></igo-toolbox>\r\n          </div-->\r\n        </igo-panel>\r\n      </div>\r\n\r\n      <div igoFlexibleFill class=\"igo-content\">\r\n        <igo-panel\r\n          [title]=\"featureTitle\"\r\n          *ngIf=\"feature && media !== 'mobile'\">\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelLeftButton\r\n            class=\"igo-icon-button\"\r\n            (click)=\"toggleTopPanel()\">\r\n            <mat-icon [svgIcon]=\"['collapsed', 'initial'].indexOf(topPanel.state) >= 0 ? 'arrow_downward' : 'arrow_upward'\"></mat-icon>\r\n          </button>\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelRightButton\r\n            class=\"igo-icon-button\"\r\n            (click)=\"zoomToFeatureExtent()\"\r\n            *ngIf=\"feature.geometry\">\r\n            <mat-icon svgIcon=\"zoom-in\"></mat-icon>\r\n          </button>\r\n\r\n          <igo-feature-details\r\n            [feature]=\"feature\"\r\n            *ngIf=\"['collapsed', 'initial'].indexOf(topPanel.state) >= 0\">\r\n          </igo-feature-details>\r\n        </igo-panel>\r\n      </div>\r\n\r\n    </igo-flexible>\r\n\r\n  </div>\r\n</mat-sidenav>\r\n",
                    styles: [".igo-sidenav-content .igo-flexible-fill .igo-container,:host ::ng-deep .igo-flexible-fill .igo-container{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;border-top:1px solid rgba(0,0,0,.2)}igo-toolbar:not(.with-title),mat-sidenav{-o-box-shadow:2px 0 2px 0 #ddd;box-shadow:2px 0 2px 0 #ddd}:host{background-color:#fff}:host ::ng-deep mat-sidenav{z-index:3!important}mat-sidenav{width:400px}@media only screen and (max-width:450px),only screen and (max-height:450px){mat-sidenav{width:calc(100% - 40px - 5px)}}.igo-sidenav-content{margin-top:50px;height:calc(100% - 50px)}igo-toolbar{position:absolute;top:51px;left:0;bottom:0}igo-toolbar.with-title{right:0;overflow:auto}igo-toolbar:not(.with-title){overflow:hidden}igo-toolbar ::ng-deep igo-list{overflow:inherit}.igo-toolbox-container{position:absolute;top:51px;bottom:0;right:0;overflow:auto}.igo-toolbox-container.shown{left:48px}igo-feature-details ::ng-deep table{width:100%}"]
                }] }
    ];
    /** @nocollapse */
    SidenavComponent.ctorParameters = function () { return [
        { type: Title }
    ]; };
    SidenavComponent.propDecorators = {
        map: [{ type: Input }],
        opened: [{ type: Input }],
        feature: [{ type: Input }],
        tool: [{ type: Input }],
        media: [{ type: Input }],
        title: [{ type: Input }]
    };
    return SidenavComponent;
}());
export { SidenavComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SidenavComponent.prototype.format;
    /**
     * @type {?}
     * @private
     */
    SidenavComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    SidenavComponent.prototype._opened;
    /**
     * @type {?}
     * @private
     */
    SidenavComponent.prototype._feature;
    /**
     * @type {?}
     * @private
     */
    SidenavComponent.prototype._tool;
    /**
     * @type {?}
     * @private
     */
    SidenavComponent.prototype._media;
    /**
     * @type {?}
     * @private
     */
    SidenavComponent.prototype._title;
    /** @type {?} */
    SidenavComponent.prototype.topPanelState;
    /** @type {?} */
    SidenavComponent.prototype.titleService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL3NpZGVuYXYvc2lkZW5hdi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBdUIsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ25FLE9BQU8sRUFBVyxhQUFhLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTdFLE9BQU8sZUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBRWhEO0lBb0VFLDBCQUFtQixZQUFtQjtRQUFuQixpQkFBWSxHQUFaLFlBQVksQ0FBTztRQTlEOUIsV0FBTSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFzRC9CLFdBQU0sR0FBVyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRS9DLGtCQUFhLEdBQWtCLFNBQVMsQ0FBQztJQU1QLENBQUM7SUE3RDFDLHNCQUNJLGlDQUFHOzs7O1FBRFA7WUFFRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkIsQ0FBQzs7Ozs7UUFDRCxVQUFRLEtBQWE7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7O09BSEE7SUFLRCxzQkFDSSxvQ0FBTTs7OztRQURWO1lBRUUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7Ozs7O1FBQ0QsVUFBVyxLQUFjO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7OztPQUhBO0lBTUQsc0JBQ0kscUNBQU87Ozs7UUFEWDtZQUVFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7OztRQUNELFVBQVksS0FBYztZQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDOzs7T0FIQTtJQU1ELHNCQUNJLGtDQUFJOzs7O1FBRFI7WUFFRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7Ozs7UUFDRCxVQUFTLEtBQVc7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSxtQ0FBSzs7OztRQURUO1lBRUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7Ozs7O1FBQ0QsVUFBVSxLQUFZO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUhBO0lBTUQsc0JBQ0ksbUNBQUs7Ozs7UUFEVDtZQUVFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQUNELFVBQVUsS0FBYTtZQUNyQixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUNyQjtRQUNILENBQUM7OztPQUxBO0lBVUQsc0JBQUksMENBQVk7Ozs7UUFBaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTs7OztJQUlELDhDQUFtQjs7O0lBQW5CO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTs7Z0JBQ25CLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUN0RCxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVO2dCQUN2QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVU7YUFDdkMsQ0FBQztZQUNGLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDOzs7O0lBRUQseUNBQWM7OztJQUFkO1FBQ0UsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtZQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztTQUNqQzthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7U0FDaEM7SUFDSCxDQUFDOztnQkF0RkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2Qix5a0ZBQXVDOztpQkFFeEM7Ozs7Z0JBWlEsS0FBSzs7O3NCQWVYLEtBQUs7eUJBUUwsS0FBSzswQkFTTCxLQUFLO3VCQVNMLEtBQUs7d0JBU0wsS0FBSzt3QkFTTCxLQUFLOztJQXFDUix1QkFBQztDQUFBLEFBeEZELElBd0ZDO1NBbkZZLGdCQUFnQjs7Ozs7O0lBQzNCLGtDQUF1Qzs7Ozs7SUFRdkMsZ0NBQXFCOzs7OztJQVFyQixtQ0FBeUI7Ozs7O0lBU3pCLG9DQUEwQjs7Ozs7SUFTMUIsaUNBQW9COzs7OztJQVNwQixrQ0FBc0I7Ozs7O0lBV3RCLGtDQUFzRDs7SUFFdEQseUNBQWdEOztJQU1wQyx3Q0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRpdGxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5pbXBvcnQgeyBNZWRpYSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBGbGV4aWJsZVN0YXRlLCBUb29sLCBnZXRFbnRpdHlUaXRsZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IEZlYXR1cmUsIEZlYXR1cmVNb3Rpb24sIElnb01hcCwgbW92ZVRvT2xGZWF0dXJlcyB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgb2xGb3JtYXRHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNpZGVuYXYnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zaWRlbmF2LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zaWRlbmF2LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpZGVuYXZDb21wb25lbnQge1xyXG4gIHByaXZhdGUgZm9ybWF0ID0gbmV3IG9sRm9ybWF0R2VvSlNPTigpO1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hcDtcclxuICB9XHJcbiAgc2V0IG1hcCh2YWx1ZTogSWdvTWFwKSB7XHJcbiAgICB0aGlzLl9tYXAgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWFwOiBJZ29NYXA7XHJcbiAgQElucHV0KClcclxuICBnZXQgb3BlbmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX29wZW5lZDtcclxuICB9XHJcbiAgc2V0IG9wZW5lZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fb3BlbmVkID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX29wZW5lZDogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZmVhdHVyZSgpOiBGZWF0dXJlIHtcclxuICAgIHJldHVybiB0aGlzLl9mZWF0dXJlO1xyXG4gIH1cclxuICBzZXQgZmVhdHVyZSh2YWx1ZTogRmVhdHVyZSkge1xyXG4gICAgdGhpcy5fZmVhdHVyZSA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9mZWF0dXJlOiBGZWF0dXJlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCB0b29sKCk6IFRvb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Rvb2w7XHJcbiAgfVxyXG4gIHNldCB0b29sKHZhbHVlOiBUb29sKSB7XHJcbiAgICB0aGlzLl90b29sID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3Rvb2w6IFRvb2w7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1lZGlhKCk6IE1lZGlhIHtcclxuICAgIHJldHVybiB0aGlzLl9tZWRpYTtcclxuICB9XHJcbiAgc2V0IG1lZGlhKHZhbHVlOiBNZWRpYSkge1xyXG4gICAgdGhpcy5fbWVkaWEgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWVkaWE6IE1lZGlhO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3RpdGxlO1xyXG4gIH1cclxuICBzZXQgdGl0bGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX3RpdGxlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX3RpdGxlOiBzdHJpbmcgPSB0aGlzLnRpdGxlU2VydmljZS5nZXRUaXRsZSgpO1xyXG5cclxuICBwdWJsaWMgdG9wUGFuZWxTdGF0ZTogRmxleGlibGVTdGF0ZSA9ICdpbml0aWFsJztcclxuXHJcbiAgZ2V0IGZlYXR1cmVUaXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZmVhdHVyZSA/IGdldEVudGl0eVRpdGxlKHRoaXMuZmVhdHVyZSkgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGl0bGVTZXJ2aWNlOiBUaXRsZSkge31cclxuXHJcbiAgem9vbVRvRmVhdHVyZUV4dGVudCgpIHtcclxuICAgIGlmICh0aGlzLmZlYXR1cmUuZ2VvbWV0cnkpIHtcclxuICAgICAgY29uc3Qgb2xGZWF0dXJlID0gdGhpcy5mb3JtYXQucmVhZEZlYXR1cmUodGhpcy5mZWF0dXJlLCB7XHJcbiAgICAgICAgZGF0YVByb2plY3Rpb246IHRoaXMuZmVhdHVyZS5wcm9qZWN0aW9uLFxyXG4gICAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uXHJcbiAgICAgIH0pO1xyXG4gICAgICBtb3ZlVG9PbEZlYXR1cmVzKHRoaXMubWFwLCBbb2xGZWF0dXJlXSwgRmVhdHVyZU1vdGlvbi5ab29tKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRvZ2dsZVRvcFBhbmVsKCkge1xyXG4gICAgaWYgKHRoaXMudG9wUGFuZWxTdGF0ZSA9PT0gJ2luaXRpYWwnKSB7XHJcbiAgICAgIHRoaXMudG9wUGFuZWxTdGF0ZSA9ICdleHBhbmRlZCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRvcFBhbmVsU3RhdGUgPSAnaW5pdGlhbCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=