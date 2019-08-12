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
export class SidenavComponent {
    /**
     * @param {?} titleService
     */
    constructor(titleService) {
        this.titleService = titleService;
        this.format = new olFormatGeoJSON();
        this._title = this.titleService.getTitle();
        this.topPanelState = 'initial';
    }
    /**
     * @return {?}
     */
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
    }
    /**
     * @return {?}
     */
    get opened() {
        return this._opened;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set opened(value) {
        this._opened = value;
    }
    /**
     * @return {?}
     */
    get feature() {
        return this._feature;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set feature(value) {
        this._feature = value;
    }
    /**
     * @return {?}
     */
    get tool() {
        return this._tool;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set tool(value) {
        this._tool = value;
    }
    /**
     * @return {?}
     */
    get media() {
        return this._media;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set media(value) {
        this._media = value;
    }
    /**
     * @return {?}
     */
    get title() {
        return this._title;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set title(value) {
        if (value) {
            this._title = value;
        }
    }
    /**
     * @return {?}
     */
    get featureTitle() {
        return this.feature ? getEntityTitle(this.feature) : undefined;
    }
    /**
     * @return {?}
     */
    zoomToFeatureExtent() {
        if (this.feature.geometry) {
            /** @type {?} */
            const olFeature = this.format.readFeature(this.feature, {
                dataProjection: this.feature.projection,
                featureProjection: this.map.projection
            });
            moveToOlFeatures(this.map, [olFeature], FeatureMotion.Zoom);
        }
    }
    /**
     * @return {?}
     */
    toggleTopPanel() {
        if (this.topPanelState === 'initial') {
            this.topPanelState = 'expanded';
        }
        else {
            this.topPanelState = 'initial';
        }
    }
}
SidenavComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-sidenav',
                template: "<mat-sidenav\r\n  #sidenav\r\n  igoSidenavShim\r\n  mode=\"side\"\r\n  [opened]=\"opened\">\r\n\r\n  <div class=\"igo-sidenav-content\">\r\n\r\n    <igo-flexible\r\n      #topPanel\r\n      initial=\"50%\" initialMobile=\"100%\"\r\n      expanded=\"calc(100% - 58px)\"\r\n      [state]=\"topPanelState\">\r\n\r\n      <div class=\"igo-content\">\r\n        <igo-panel [title]=\"tool ? (tool.title | translate) : title\">\r\n          <button\r\n            mat-icon-button\r\n            panelLeftButton\r\n            tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\"\r\n            [matTooltip]=\"'igo.context.sidenav.goBack' | translate\"\r\n            *ngIf=\"tool\">\r\n            <mat-icon svgIcon=\"arrow-back\"></mat-icon>\r\n          </button>\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelRightButton\r\n            tooltip-position=\"below\"\r\n            matTooltipShowDelay=\"500\"\r\n            [matTooltip]=\"'igo.context.sidenav.mainMenu' | translate\"\r\n            *ngIf=\"tool\">\r\n            <mat-icon svgIcon=\"menu\"></mat-icon>\r\n          </button>\r\n\r\n          <!--igo-toolbar\r\n            igoToolContext igoToolbarBinding\r\n            [withTitle]=\"tool ? false : true\">\r\n          </igo-toolbar>\r\n\r\n          <div class=\"igo-toolbox-container\" [ngClass]=\"{'shown': tool ? true : false}\">\r\n            <igo-toolbox [animate]=\"true\"></igo-toolbox>\r\n          </div-->\r\n        </igo-panel>\r\n      </div>\r\n\r\n      <div igoFlexibleFill class=\"igo-content\">\r\n        <igo-panel\r\n          [title]=\"featureTitle\"\r\n          *ngIf=\"feature && media !== 'mobile'\">\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelLeftButton\r\n            class=\"igo-icon-button\"\r\n            (click)=\"toggleTopPanel()\">\r\n            <mat-icon [svgIcon]=\"['collapsed', 'initial'].indexOf(topPanel.state) >= 0 ? 'arrow_downward' : 'arrow_upward'\"></mat-icon>\r\n          </button>\r\n\r\n          <button\r\n            mat-icon-button\r\n            panelRightButton\r\n            class=\"igo-icon-button\"\r\n            (click)=\"zoomToFeatureExtent()\"\r\n            *ngIf=\"feature.geometry\">\r\n            <mat-icon svgIcon=\"zoom-in\"></mat-icon>\r\n          </button>\r\n\r\n          <igo-feature-details\r\n            [feature]=\"feature\"\r\n            *ngIf=\"['collapsed', 'initial'].indexOf(topPanel.state) >= 0\">\r\n          </igo-feature-details>\r\n        </igo-panel>\r\n      </div>\r\n\r\n    </igo-flexible>\r\n\r\n  </div>\r\n</mat-sidenav>\r\n",
                styles: [".igo-sidenav-content .igo-flexible-fill .igo-container,:host ::ng-deep .igo-flexible-fill .igo-container{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;border-top:1px solid rgba(0,0,0,.2)}igo-toolbar:not(.with-title),mat-sidenav{-o-box-shadow:2px 0 2px 0 #ddd;box-shadow:2px 0 2px 0 #ddd}:host{background-color:#fff}:host ::ng-deep mat-sidenav{z-index:3!important}mat-sidenav{width:400px}@media only screen and (max-width:450px),only screen and (max-height:450px){mat-sidenav{width:calc(100% - 40px - 5px)}}.igo-sidenav-content{margin-top:50px;height:calc(100% - 50px)}igo-toolbar{position:absolute;top:51px;left:0;bottom:0}igo-toolbar.with-title{right:0;overflow:auto}igo-toolbar:not(.with-title){overflow:hidden}igo-toolbar ::ng-deep igo-list{overflow:inherit}.igo-toolbox-container{position:absolute;top:51px;bottom:0;right:0;overflow:auto}.igo-toolbox-container.shown{left:48px}igo-feature-details ::ng-deep table{width:100%}"]
            }] }
];
/** @nocollapse */
SidenavComponent.ctorParameters = () => [
    { type: Title }
];
SidenavComponent.propDecorators = {
    map: [{ type: Input }],
    opened: [{ type: Input }],
    feature: [{ type: Input }],
    tool: [{ type: Input }],
    media: [{ type: Input }],
    title: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL3NpZGVuYXYvc2lkZW5hdi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBdUIsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ25FLE9BQU8sRUFBVyxhQUFhLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTdFLE9BQU8sZUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBT2hELE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUErRDNCLFlBQW1CLFlBQW1CO1FBQW5CLGlCQUFZLEdBQVosWUFBWSxDQUFPO1FBOUQ5QixXQUFNLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQXNEL0IsV0FBTSxHQUFXLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFL0Msa0JBQWEsR0FBa0IsU0FBUyxDQUFDO0lBTVAsQ0FBQzs7OztJQTdEMUMsSUFDSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBQ0QsSUFBSSxHQUFHLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsSUFDSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBQ0QsSUFBSSxNQUFNLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDOzs7O0lBR0QsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBYztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDOzs7O0lBR0QsSUFDSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBQ0QsSUFBSSxJQUFJLENBQUMsS0FBVztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDOzs7O0lBR0QsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBWTtRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7O0lBR0QsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7OztJQUtELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2pFLENBQUM7Ozs7SUFJRCxtQkFBbUI7UUFDakIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTs7a0JBQ25CLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUN0RCxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVO2dCQUN2QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVU7YUFDdkMsQ0FBQztZQUNGLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDOzs7O0lBRUQsY0FBYztRQUNaLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7U0FDakM7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7O1lBdEZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIseWtGQUF1Qzs7YUFFeEM7Ozs7WUFaUSxLQUFLOzs7a0JBZVgsS0FBSztxQkFRTCxLQUFLO3NCQVNMLEtBQUs7bUJBU0wsS0FBSztvQkFTTCxLQUFLO29CQVNMLEtBQUs7Ozs7Ozs7SUE3Q04sa0NBQXVDOzs7OztJQVF2QyxnQ0FBcUI7Ozs7O0lBUXJCLG1DQUF5Qjs7Ozs7SUFTekIsb0NBQTBCOzs7OztJQVMxQixpQ0FBb0I7Ozs7O0lBU3BCLGtDQUFzQjs7Ozs7SUFXdEIsa0NBQXNEOztJQUV0RCx5Q0FBZ0Q7O0lBTXBDLHdDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGl0bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuXHJcbmltcG9ydCB7IE1lZGlhIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IEZsZXhpYmxlU3RhdGUsIFRvb2wsIGdldEVudGl0eVRpdGxlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgRmVhdHVyZSwgRmVhdHVyZU1vdGlvbiwgSWdvTWFwLCBtb3ZlVG9PbEZlYXR1cmVzIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCBvbEZvcm1hdEdlb0pTT04gZnJvbSAnb2wvZm9ybWF0L0dlb0pTT04nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc2lkZW5hdicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NpZGVuYXYuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NpZGVuYXYuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2lkZW5hdkNvbXBvbmVudCB7XHJcbiAgcHJpdmF0ZSBmb3JtYXQgPSBuZXcgb2xGb3JtYXRHZW9KU09OKCk7XHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuICBASW5wdXQoKVxyXG4gIGdldCBvcGVuZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3BlbmVkO1xyXG4gIH1cclxuICBzZXQgb3BlbmVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9vcGVuZWQgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfb3BlbmVkOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBmZWF0dXJlKCk6IEZlYXR1cmUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZlYXR1cmU7XHJcbiAgfVxyXG4gIHNldCBmZWF0dXJlKHZhbHVlOiBGZWF0dXJlKSB7XHJcbiAgICB0aGlzLl9mZWF0dXJlID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2ZlYXR1cmU6IEZlYXR1cmU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHRvb2woKTogVG9vbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fdG9vbDtcclxuICB9XHJcbiAgc2V0IHRvb2wodmFsdWU6IFRvb2wpIHtcclxuICAgIHRoaXMuX3Rvb2wgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfdG9vbDogVG9vbDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgbWVkaWEoKTogTWVkaWEge1xyXG4gICAgcmV0dXJuIHRoaXMuX21lZGlhO1xyXG4gIH1cclxuICBzZXQgbWVkaWEodmFsdWU6IE1lZGlhKSB7XHJcbiAgICB0aGlzLl9tZWRpYSA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9tZWRpYTogTWVkaWE7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fdGl0bGU7XHJcbiAgfVxyXG4gIHNldCB0aXRsZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5fdGl0bGUgPSB2YWx1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBfdGl0bGU6IHN0cmluZyA9IHRoaXMudGl0bGVTZXJ2aWNlLmdldFRpdGxlKCk7XHJcblxyXG4gIHB1YmxpYyB0b3BQYW5lbFN0YXRlOiBGbGV4aWJsZVN0YXRlID0gJ2luaXRpYWwnO1xyXG5cclxuICBnZXQgZmVhdHVyZVRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5mZWF0dXJlID8gZ2V0RW50aXR5VGl0bGUodGhpcy5mZWF0dXJlKSA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0aXRsZVNlcnZpY2U6IFRpdGxlKSB7fVxyXG5cclxuICB6b29tVG9GZWF0dXJlRXh0ZW50KCkge1xyXG4gICAgaWYgKHRoaXMuZmVhdHVyZS5nZW9tZXRyeSkge1xyXG4gICAgICBjb25zdCBvbEZlYXR1cmUgPSB0aGlzLmZvcm1hdC5yZWFkRmVhdHVyZSh0aGlzLmZlYXR1cmUsIHtcclxuICAgICAgICBkYXRhUHJvamVjdGlvbjogdGhpcy5mZWF0dXJlLnByb2plY3Rpb24sXHJcbiAgICAgICAgZmVhdHVyZVByb2plY3Rpb246IHRoaXMubWFwLnByb2plY3Rpb25cclxuICAgICAgfSk7XHJcbiAgICAgIG1vdmVUb09sRmVhdHVyZXModGhpcy5tYXAsIFtvbEZlYXR1cmVdLCBGZWF0dXJlTW90aW9uLlpvb20pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlVG9wUGFuZWwoKSB7XHJcbiAgICBpZiAodGhpcy50b3BQYW5lbFN0YXRlID09PSAnaW5pdGlhbCcpIHtcclxuICAgICAgdGhpcy50b3BQYW5lbFN0YXRlID0gJ2V4cGFuZGVkJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudG9wUGFuZWxTdGF0ZSA9ICdpbml0aWFsJztcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiJdfQ==