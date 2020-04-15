/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NetworkService } from '@igo2/core';
import { getEntityTitle, getEntityIcon } from '@igo2/common';
import { SearchSource } from '../../search/shared/sources/source';
import { IgoMap } from '../../map/shared/map';
var FeatureDetailsComponent = /** @class */ (function () {
    function FeatureDetailsComponent(cdRef, sanitizer, networkService) {
        var _this = this;
        this.cdRef = cdRef;
        this.sanitizer = sanitizer;
        this.networkService = networkService;
        this.networkService.currentState().subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            _this.state = state;
        }));
    }
    Object.defineProperty(FeatureDetailsComponent.prototype, "source", {
        get: /**
         * @return {?}
         */
        function () {
            return this._source;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._source = value;
            this.cdRef.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FeatureDetailsComponent.prototype, "feature", {
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
            this.cdRef.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FeatureDetailsComponent.prototype, "title", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () {
            return getEntityTitle(this.feature);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FeatureDetailsComponent.prototype, "icon", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () {
            return getEntityIcon(this.feature) || 'link';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    FeatureDetailsComponent.prototype.htmlSanitizer = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FeatureDetailsComponent.prototype.isObject = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'object';
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FeatureDetailsComponent.prototype.isUrl = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value === 'string') {
            return (value.slice(0, 8) === 'https://' || value.slice(0, 7) === 'http://');
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} feature
     * @return {?}
     */
    FeatureDetailsComponent.prototype.filterFeatureProperties = /**
     * @param {?} feature
     * @return {?}
     */
    function (feature) {
        /** @type {?} */
        var allowedFieldsAndAlias = feature.meta ? feature.meta.alias : undefined;
        /** @type {?} */
        var properties = {};
        /** @type {?} */
        var offlineButtonState = this.map.offlineButtonState;
        if (allowedFieldsAndAlias) {
            Object.keys(allowedFieldsAndAlias).forEach((/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                properties[allowedFieldsAndAlias[field]] = feature.properties[field];
            }));
            return properties;
        }
        else {
            if (!offlineButtonState) {
                if (this.state.connection && feature.meta && feature.meta.excludeAttribute) {
                    /** @type {?} */
                    var excludeAttribute = feature.meta.excludeAttribute;
                    excludeAttribute.forEach((/**
                     * @param {?} attribute
                     * @return {?}
                     */
                    function (attribute) {
                        delete feature.properties[attribute];
                    }));
                }
                else if (!this.state.connection && feature.meta && feature.meta.excludeAttributeOffline) {
                    /** @type {?} */
                    var excludeAttributeOffline = feature.meta.excludeAttributeOffline;
                    excludeAttributeOffline.forEach((/**
                     * @param {?} attribute
                     * @return {?}
                     */
                    function (attribute) {
                        delete feature.properties[attribute];
                    }));
                }
                return feature.properties;
            }
            else {
                if (feature.meta && feature.meta.excludeAttributeOffline) {
                    /** @type {?} */
                    var excludeAttributeOffline = feature.meta.excludeAttributeOffline;
                    excludeAttributeOffline.forEach((/**
                     * @param {?} attribute
                     * @return {?}
                     */
                    function (attribute) {
                        delete feature.properties[attribute];
                    }));
                }
            }
            return feature.properties;
        }
    };
    FeatureDetailsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-feature-details',
                    template: "<table class=\"igo-striped mat-typography\" *ngIf=\"feature && isObject(feature.properties) && feature.properties.target !== 'iframe'\">\r\n  <tbody>\r\n    <tr *ngFor=\"let property of filterFeatureProperties(feature) | keyvalue\">\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <mat-icon mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <a href=\"{{property.value}}\" target='_blank'> {{ 'igo.geo.targetHtmlUrl' | translate }} {{title}}</a>\r\n      </td>\r\n\r\n      <td id=\"keyValue\" *ngIf=\"feature.properties.target === undefined\">\r\n        {{property.key }}\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && !isUrl(property.value)\" [innerHTML]=property.value>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && isUrl(property.value)\">\r\n        <a href=\"{{property.value}}\" target='_blank'>{{ 'igo.geo.targetHtmlUrl' | translate }} </a>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && isObject(property.value)\" [innerHTML]=\"property.value | json\">\r\n      </td>\r\n\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n\r\n<iframe *ngIf=\"feature && isObject(feature.properties) && feature.properties.target === 'iframe'\" [src]='htmlSanitizer(feature.properties.url)'></iframe>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["table{width:100%}table td{padding:5px}#keyValue{width:30%}iframe{height:calc(100% - 4px);width:100%;border:0}"]
                }] }
    ];
    /** @nocollapse */
    FeatureDetailsComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DomSanitizer },
        { type: NetworkService }
    ]; };
    FeatureDetailsComponent.propDecorators = {
        source: [{ type: Input }],
        map: [{ type: Input }],
        feature: [{ type: Input }]
    };
    return FeatureDetailsComponent;
}());
export { FeatureDetailsComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FeatureDetailsComponent.prototype.state;
    /**
     * @type {?}
     * @private
     */
    FeatureDetailsComponent.prototype.offlineButtonState;
    /** @type {?} */
    FeatureDetailsComponent.prototype.map;
    /**
     * @type {?}
     * @private
     */
    FeatureDetailsComponent.prototype._feature;
    /**
     * @type {?}
     * @private
     */
    FeatureDetailsComponent.prototype._source;
    /**
     * @type {?}
     * @private
     */
    FeatureDetailsComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    FeatureDetailsComponent.prototype.sanitizer;
    /**
     * @type {?}
     * @private
     */
    FeatureDetailsComponent.prototype.networkService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL2ZlYXR1cmUtZGV0YWlscy9mZWF0dXJlLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFFN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QztJQStDRSxpQ0FDVSxLQUF3QixFQUN4QixTQUF1QixFQUN2QixjQUE4QjtRQUh4QyxpQkFRQztRQVBTLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRXRDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsS0FBc0I7WUFDbEUsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBN0NELHNCQUNJLDJDQUFNOzs7O1FBRFY7WUFFRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQzs7Ozs7UUFDRCxVQUFXLEtBQW1CO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0IsQ0FBQzs7O09BSkE7SUFRRCxzQkFDSSw0Q0FBTzs7OztRQURYO1lBRUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7Ozs7O1FBQ0QsVUFBWSxLQUFjO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0IsQ0FBQzs7O09BSkE7SUFZRCxzQkFBSSwwQ0FBSztRQUhUOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBS0Qsc0JBQUkseUNBQUk7UUFIUjs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUM7UUFDL0MsQ0FBQzs7O09BQUE7Ozs7O0lBWUQsK0NBQWE7Ozs7SUFBYixVQUFjLEtBQUs7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7O0lBRUQsMENBQVE7Ozs7SUFBUixVQUFTLEtBQUs7UUFDWixPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVELHVDQUFLOzs7O0lBQUwsVUFBTSxLQUFLO1FBQ1QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxDQUNMLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFVBQVUsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxTQUFTLENBQ3BFLENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7Ozs7O0lBRUQseURBQXVCOzs7O0lBQXZCLFVBQXdCLE9BQU87O1lBQ3ZCLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTOztZQUNyRSxVQUFVLEdBQUcsRUFBRTs7WUFDZixrQkFBa0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQjtRQUV0RCxJQUFJLHFCQUFxQixFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxLQUFLO2dCQUM5QyxVQUFVLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZFLENBQUMsRUFBQyxDQUFDO1lBQ0gsT0FBTyxVQUFVLENBQUM7U0FDbkI7YUFBTTtZQUNMLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDdkIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7O3dCQUNwRSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQjtvQkFDdEQsZ0JBQWdCLENBQUMsT0FBTzs7OztvQkFBQyxVQUFBLFNBQVM7d0JBQ2hDLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7cUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRTs7d0JBQ25GLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCO29CQUNwRSx1QkFBdUIsQ0FBQyxPQUFPOzs7O29CQUFDLFVBQUEsU0FBUzt3QkFDdkMsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN2QyxDQUFDLEVBQUMsQ0FBQztpQkFDSjtnQkFDRCxPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0wsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7O3dCQUNsRCx1QkFBdUIsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QjtvQkFDcEUsdUJBQXVCLENBQUMsT0FBTzs7OztvQkFBQyxVQUFBLFNBQVM7d0JBQ3ZDLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7YUFDRjtZQUNELE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQztTQUMzQjtJQUNILENBQUM7O2dCQTdHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsbWdEQUErQztvQkFFL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFoQkMsaUJBQWlCO2dCQUVWLFlBQVk7Z0JBQ1osY0FBYzs7O3lCQWtCcEIsS0FBSztzQkFTTCxLQUFLOzBCQUVMLEtBQUs7O0lBeUZSLDhCQUFDO0NBQUEsQUE5R0QsSUE4R0M7U0F4R1ksdUJBQXVCOzs7Ozs7SUFDbEMsd0NBQStCOzs7OztJQUMvQixxREFBb0M7O0lBV3BDLHNDQUFxQjs7Ozs7SUFXckIsMkNBQTBCOzs7OztJQUMxQiwwQ0FBOEI7Ozs7O0lBaUI1Qix3Q0FBZ0M7Ozs7O0lBQ2hDLDRDQUErQjs7Ozs7SUFDL0IsaURBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgTmV0d29ya1NlcnZpY2UsIENvbm5lY3Rpb25TdGF0ZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZ2V0RW50aXR5VGl0bGUsIGdldEVudGl0eUljb24gfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uL3NoYXJlZCc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSB9IGZyb20gJy4uLy4uL3NlYXJjaC9zaGFyZWQvc291cmNlcy9zb3VyY2UnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1mZWF0dXJlLWRldGFpbHMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9mZWF0dXJlLWRldGFpbHMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2ZlYXR1cmUtZGV0YWlscy5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGZWF0dXJlRGV0YWlsc0NvbXBvbmVudCB7XHJcbiAgcHJpdmF0ZSBzdGF0ZTogQ29ubmVjdGlvblN0YXRlO1xyXG4gIHByaXZhdGUgb2ZmbGluZUJ1dHRvblN0YXRlOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBzb3VyY2UoKTogU2VhcmNoU291cmNlIHtcclxuICAgIHJldHVybiB0aGlzLl9zb3VyY2U7XHJcbiAgfVxyXG4gIHNldCBzb3VyY2UodmFsdWU6IFNlYXJjaFNvdXJjZSApIHtcclxuICAgIHRoaXMuX3NvdXJjZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZmVhdHVyZSgpOiBGZWF0dXJlIHtcclxuICAgIHJldHVybiB0aGlzLl9mZWF0dXJlO1xyXG4gIH1cclxuICBzZXQgZmVhdHVyZSh2YWx1ZTogRmVhdHVyZSkge1xyXG4gICAgdGhpcy5fZmVhdHVyZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9mZWF0dXJlOiBGZWF0dXJlO1xyXG4gIHByaXZhdGUgX3NvdXJjZTogU2VhcmNoU291cmNlO1xyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRFbnRpdHlUaXRsZSh0aGlzLmZlYXR1cmUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IGljb24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRFbnRpdHlJY29uKHRoaXMuZmVhdHVyZSkgfHwgJ2xpbmsnO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXHJcbiAgICBwcml2YXRlIG5ldHdvcmtTZXJ2aWNlOiBOZXR3b3JrU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5uZXR3b3JrU2VydmljZS5jdXJyZW50U3RhdGUoKS5zdWJzY3JpYmUoKHN0YXRlOiBDb25uZWN0aW9uU3RhdGUpID0+IHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBodG1sU2FuaXRpemVyKHZhbHVlKTogU2FmZVJlc291cmNlVXJsIHtcclxuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgaXNPYmplY3QodmFsdWUpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xyXG4gIH1cclxuXHJcbiAgaXNVcmwodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgdmFsdWUuc2xpY2UoMCwgOCkgPT09ICdodHRwczovLycgfHwgdmFsdWUuc2xpY2UoMCwgNykgPT09ICdodHRwOi8vJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmlsdGVyRmVhdHVyZVByb3BlcnRpZXMoZmVhdHVyZSkge1xyXG4gICAgY29uc3QgYWxsb3dlZEZpZWxkc0FuZEFsaWFzID0gZmVhdHVyZS5tZXRhID8gZmVhdHVyZS5tZXRhLmFsaWFzIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHt9O1xyXG4gICAgY29uc3Qgb2ZmbGluZUJ1dHRvblN0YXRlID0gdGhpcy5tYXAub2ZmbGluZUJ1dHRvblN0YXRlO1xyXG5cclxuICAgIGlmIChhbGxvd2VkRmllbGRzQW5kQWxpYXMpIHtcclxuICAgICAgT2JqZWN0LmtleXMoYWxsb3dlZEZpZWxkc0FuZEFsaWFzKS5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgICAgICBwcm9wZXJ0aWVzW2FsbG93ZWRGaWVsZHNBbmRBbGlhc1tmaWVsZF1dID0gZmVhdHVyZS5wcm9wZXJ0aWVzW2ZpZWxkXTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCFvZmZsaW5lQnV0dG9uU3RhdGUpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0aW9uICYmIGZlYXR1cmUubWV0YSAmJiBmZWF0dXJlLm1ldGEuZXhjbHVkZUF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgY29uc3QgZXhjbHVkZUF0dHJpYnV0ZSA9IGZlYXR1cmUubWV0YS5leGNsdWRlQXR0cmlidXRlO1xyXG4gICAgICAgICAgZXhjbHVkZUF0dHJpYnV0ZS5mb3JFYWNoKGF0dHJpYnV0ZSA9PiB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBmZWF0dXJlLnByb3BlcnRpZXNbYXR0cmlidXRlXTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuc3RhdGUuY29ubmVjdGlvbiAmJiBmZWF0dXJlLm1ldGEgJiYgZmVhdHVyZS5tZXRhLmV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lKSB7XHJcbiAgICAgICAgICBjb25zdCBleGNsdWRlQXR0cmlidXRlT2ZmbGluZSA9IGZlYXR1cmUubWV0YS5leGNsdWRlQXR0cmlidXRlT2ZmbGluZTtcclxuICAgICAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lLmZvckVhY2goYXR0cmlidXRlID0+IHtcclxuICAgICAgICAgICAgZGVsZXRlIGZlYXR1cmUucHJvcGVydGllc1thdHRyaWJ1dGVdO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmZWF0dXJlLnByb3BlcnRpZXM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGZlYXR1cmUubWV0YSAmJiBmZWF0dXJlLm1ldGEuZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmUpIHtcclxuICAgICAgICAgIGNvbnN0IGV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lID0gZmVhdHVyZS5tZXRhLmV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lO1xyXG4gICAgICAgICAgZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmUuZm9yRWFjaChhdHRyaWJ1dGUgPT4ge1xyXG4gICAgICAgICAgICBkZWxldGUgZmVhdHVyZS5wcm9wZXJ0aWVzW2F0dHJpYnV0ZV07XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZlYXR1cmUucHJvcGVydGllcztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19