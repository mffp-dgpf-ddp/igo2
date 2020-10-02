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
        var offlineButtonState;
        if (this.map) {
            this.map.offlineButtonToggle$.subscribe((/**
             * @param {?} state
             * @return {?}
             */
            function (state) {
                offlineButtonState = state;
            }));
        }
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
        else if (offlineButtonState !== undefined) {
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
        }
        else {
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
        }
        return feature.properties;
    };
    FeatureDetailsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-feature-details',
                    template: "<table class=\"igo-striped mat-typography\" *ngIf=\"feature && isObject(feature.properties) && feature.properties.target !== 'iframe'\">\r\n  <tbody>\r\n    <tr *ngFor=\"let property of filterFeatureProperties(feature) | keyvalue\">\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <mat-icon mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <a href=\"{{property.value}}\" target='_blank'> {{ 'igo.geo.targetHtmlUrl' | translate }} {{title}}</a>\r\n      </td>\r\n\r\n      <td id=\"keyValue\" *ngIf=\"feature.properties.target === undefined\">\r\n        {{property.key }}\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && !isUrl(property.value)\" [innerHTML]=property.value>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && isUrl(property.value)\">\r\n        <a href=\"{{property.value}}\" target='_blank'>{{ 'igo.geo.targetHtmlUrl' | translate }} </a>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && isObject(property.value)\" [innerHTML]=\"property.value | json\">\r\n      </td>\r\n\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n\r\n<iframe *ngIf=\"feature && isObject(feature.properties) && feature.properties.target === 'iframe'\" [src]=\"htmlSanitizer(feature.properties.url)\"></iframe>\r\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL2ZlYXR1cmUtZGV0YWlscy9mZWF0dXJlLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFFN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QztJQStDRSxpQ0FDVSxLQUF3QixFQUN4QixTQUF1QixFQUN2QixjQUE4QjtRQUh4QyxpQkFRQztRQVBTLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRXRDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsS0FBc0I7WUFDbEUsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBN0NELHNCQUNJLDJDQUFNOzs7O1FBRFY7WUFFRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQzs7Ozs7UUFDRCxVQUFXLEtBQW1CO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMs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QyxDQUFDO2dCQUN2QyxDQUFDLEVBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFFRCxPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDNUIsQ0FBQzs7Z0JBL0hGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixxZ0RBQStDO29CQUUvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQWhCQyxpQkFBaUI7Z0JBRVYsWUFBWTtnQkFDWixjQUFjOzs7eUJBa0JwQixLQUFLO3NCQVNMLEtBQUs7MEJBRUwsS0FBSzs7SUEyR1IsOEJBQUM7Q0FBQSxBQWhJRCxJQWdJQztTQXpIWSx1QkFBdUI7Ozs7OztJQUNsQyx3Q0FBK0I7O0lBVy9CLHNDQUFxQjs7Ozs7SUFXckIsMkNBQTBCOzs7OztJQUMxQiwwQ0FBOEI7Ozs7O0lBaUI1Qix3Q0FBZ0M7Ozs7O0lBQ2hDLDRDQUErQjs7Ozs7SUFDL0IsaURBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgTmV0d29ya1NlcnZpY2UsIENvbm5lY3Rpb25TdGF0ZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZ2V0RW50aXR5VGl0bGUsIGdldEVudGl0eUljb24gfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uL3NoYXJlZCc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSB9IGZyb20gJy4uLy4uL3NlYXJjaC9zaGFyZWQvc291cmNlcy9zb3VyY2UnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1mZWF0dXJlLWRldGFpbHMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9mZWF0dXJlLWRldGFpbHMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2ZlYXR1cmUtZGV0YWlscy5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRmVhdHVyZURldGFpbHNDb21wb25lbnQge1xyXG4gIHByaXZhdGUgc3RhdGU6IENvbm5lY3Rpb25TdGF0ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgc291cmNlKCk6IFNlYXJjaFNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc291cmNlO1xyXG4gIH1cclxuICBzZXQgc291cmNlKHZhbHVlOiBTZWFyY2hTb3VyY2UgKSB7XHJcbiAgICB0aGlzLl9zb3VyY2UgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGZlYXR1cmUoKTogRmVhdHVyZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmVhdHVyZTtcclxuICB9XHJcbiAgc2V0IGZlYXR1cmUodmFsdWU6IEZlYXR1cmUpIHtcclxuICAgIHRoaXMuX2ZlYXR1cmUgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZmVhdHVyZTogRmVhdHVyZTtcclxuICBwcml2YXRlIF9zb3VyY2U6IFNlYXJjaFNvdXJjZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5VGl0bGUodGhpcy5mZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBpY29uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5SWNvbih0aGlzLmZlYXR1cmUpIHx8ICdsaW5rJztcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxyXG4gICAgcHJpdmF0ZSBuZXR3b3JrU2VydmljZTogTmV0d29ya1NlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMubmV0d29ya1NlcnZpY2UuY3VycmVudFN0YXRlKCkuc3Vic2NyaWJlKChzdGF0ZTogQ29ubmVjdGlvblN0YXRlKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaHRtbFNhbml0aXplcih2YWx1ZSk6IFNhZmVSZXNvdXJjZVVybCB7XHJcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGlzT2JqZWN0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JztcclxuICB9XHJcblxyXG4gIGlzVXJsKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIHZhbHVlLnNsaWNlKDAsIDgpID09PSAnaHR0cHM6Ly8nIHx8IHZhbHVlLnNsaWNlKDAsIDcpID09PSAnaHR0cDovLydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbHRlckZlYXR1cmVQcm9wZXJ0aWVzKGZlYXR1cmUpIHtcclxuICAgIGNvbnN0IGFsbG93ZWRGaWVsZHNBbmRBbGlhcyA9IGZlYXR1cmUubWV0YSA/IGZlYXR1cmUubWV0YS5hbGlhcyA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7fTtcclxuICAgIGxldCBvZmZsaW5lQnV0dG9uU3RhdGU7XHJcblxyXG4gICAgaWYgKHRoaXMubWFwKSB7XHJcbiAgICAgIHRoaXMubWFwLm9mZmxpbmVCdXR0b25Ub2dnbGUkLnN1YnNjcmliZShzdGF0ZSA9PiB7XHJcbiAgICAgICAgb2ZmbGluZUJ1dHRvblN0YXRlID0gc3RhdGU7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhbGxvd2VkRmllbGRzQW5kQWxpYXMpIHtcclxuICAgICAgT2JqZWN0LmtleXMoYWxsb3dlZEZpZWxkc0FuZEFsaWFzKS5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgICAgICBwcm9wZXJ0aWVzW2FsbG93ZWRGaWVsZHNBbmRBbGlhc1tmaWVsZF1dID0gZmVhdHVyZS5wcm9wZXJ0aWVzW2ZpZWxkXTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gICAgfSBlbHNlIGlmIChvZmZsaW5lQnV0dG9uU3RhdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAoIW9mZmxpbmVCdXR0b25TdGF0ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbm5lY3Rpb24gJiYgZmVhdHVyZS5tZXRhICYmIGZlYXR1cmUubWV0YS5leGNsdWRlQXR0cmlidXRlKSB7XHJcbiAgICAgICAgICBjb25zdCBleGNsdWRlQXR0cmlidXRlID0gZmVhdHVyZS5tZXRhLmV4Y2x1ZGVBdHRyaWJ1dGU7XHJcbiAgICAgICAgICBleGNsdWRlQXR0cmlidXRlLmZvckVhY2goYXR0cmlidXRlID0+IHtcclxuICAgICAgICAgICAgZGVsZXRlIGZlYXR1cmUucHJvcGVydGllc1thdHRyaWJ1dGVdO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5zdGF0ZS5jb25uZWN0aW9uICYmIGZlYXR1cmUubWV0YSAmJiBmZWF0dXJlLm1ldGEuZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmUpIHtcclxuICAgICAgICAgIGNvbnN0IGV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lID0gZmVhdHVyZS5tZXRhLmV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lO1xyXG4gICAgICAgICAgZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmUuZm9yRWFjaChhdHRyaWJ1dGUgPT4ge1xyXG4gICAgICAgICAgICBkZWxldGUgZmVhdHVyZS5wcm9wZXJ0aWVzW2F0dHJpYnV0ZV07XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGZlYXR1cmUubWV0YSAmJiBmZWF0dXJlLm1ldGEuZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmUpIHtcclxuICAgICAgICAgIGNvbnN0IGV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lID0gZmVhdHVyZS5tZXRhLmV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lO1xyXG4gICAgICAgICAgZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmUuZm9yRWFjaChhdHRyaWJ1dGUgPT4ge1xyXG4gICAgICAgICAgICBkZWxldGUgZmVhdHVyZS5wcm9wZXJ0aWVzW2F0dHJpYnV0ZV07XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLnN0YXRlLmNvbm5lY3Rpb24gJiYgZmVhdHVyZS5tZXRhICYmIGZlYXR1cmUubWV0YS5leGNsdWRlQXR0cmlidXRlKSB7XHJcbiAgICAgICAgY29uc3QgZXhjbHVkZUF0dHJpYnV0ZSA9IGZlYXR1cmUubWV0YS5leGNsdWRlQXR0cmlidXRlO1xyXG4gICAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGUuZm9yRWFjaChhdHRyaWJ1dGUgPT4ge1xyXG4gICAgICAgICAgZGVsZXRlIGZlYXR1cmUucHJvcGVydGllc1thdHRyaWJ1dGVdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLmNvbm5lY3Rpb24gJiYgZmVhdHVyZS5tZXRhICYmIGZlYXR1cmUubWV0YS5leGNsdWRlQXR0cmlidXRlT2ZmbGluZSkge1xyXG4gICAgICAgIGNvbnN0IGV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lID0gZmVhdHVyZS5tZXRhLmV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lO1xyXG4gICAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lLmZvckVhY2goYXR0cmlidXRlID0+IHtcclxuICAgICAgICAgIGRlbGV0ZSBmZWF0dXJlLnByb3BlcnRpZXNbYXR0cmlidXRlXTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmZWF0dXJlLnByb3BlcnRpZXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==