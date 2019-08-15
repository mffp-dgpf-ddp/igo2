/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { getEntityTitle, getEntityIcon } from '@igo2/common';
import { NetworkService } from '@igo2/core';
import { MapService } from '../../map/shared/map.service';
var FeatureDetailsComponent = /** @class */ (function () {
    function FeatureDetailsComponent(cdRef, sanitizer, networkService, mapService) {
        var _this = this;
        this.cdRef = cdRef;
        this.sanitizer = sanitizer;
        this.networkService = networkService;
        this.mapService = mapService;
        this.networkService.currentState().subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            _this.state = state;
        }));
    }
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
        var _this = this;
        /** @type {?} */
        var sourceOptions;
        /** @type {?} */
        var allowedFieldsAndAlias = feature.meta ? feature.meta.alias : undefined;
        /** @type {?} */
        var properties = Object.assign({}, feature.properties);
        /** @type {?} */
        var layerName = feature.meta.title;
        /** @type {?} */
        var layers = this.mapService.getMap().layers$.value;
        if (allowedFieldsAndAlias) {
            Object.keys(properties).forEach((/**
             * @param {?} property
             * @return {?}
             */
            function (property) {
                if (Object.keys(allowedFieldsAndAlias).indexOf(property) === -1) {
                    delete properties[property];
                }
                else {
                    properties[allowedFieldsAndAlias[property]] = properties[property];
                    if (allowedFieldsAndAlias[property] !== property) {
                        delete properties[property];
                    }
                }
            }));
            return properties;
        }
        else {
            layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) {
                if (layer.dataSource.options.type === 'mvt') {
                    sourceOptions = ((/** @type {?} */ (layer.dataSource.options)));
                }
                else if (layer.dataSource.options.type === 'xyz') {
                    sourceOptions = ((/** @type {?} */ (layer.dataSource.options)));
                }
                else if (layer.dataSource.options.type === 'vector') {
                    sourceOptions = ((/** @type {?} */ (layer.dataSource.options)));
                }
                else {
                    return;
                }
                if (_this.state.connection && sourceOptions.excludeAttribute) {
                    /** @type {?} */
                    var exclude = sourceOptions.excludeAttribute;
                    exclude.forEach((/**
                     * @param {?} attribute
                     * @return {?}
                     */
                    function (attribute) {
                        if (layerName === layer.title) {
                            delete feature.properties[attribute];
                        }
                    }));
                }
                else if (!_this.state.connection && sourceOptions.excludeAttributeOffline) {
                    /** @type {?} */
                    var excludeAttributeOffline = sourceOptions.excludeAttributeOffline;
                    excludeAttributeOffline.forEach((/**
                     * @param {?} attribute
                     * @return {?}
                     */
                    function (attribute) {
                        if (layerName === layer.title) {
                            delete feature.properties[attribute];
                        }
                    }));
                }
            }));
            return feature.properties;
        }
    };
    FeatureDetailsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-feature-details',
                    template: "<table class=\"igo-striped\" *ngIf=\"feature && isObject(feature.properties) && feature.properties.target !== 'iframe'\">\r\n  <tbody>\r\n    <tr *ngFor=\"let property of filterFeatureProperties(feature) | keyvalue\">\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <mat-icon mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <a href=\"{{property.value}}\" target='_blank'> {{ 'igo.geo.targetHtmlUrl' | translate }} {{title}}</a>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined\">\r\n        {{property.key }}\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && !isUrl(property.value)\" [innerHTML]=property.value>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && isUrl(property.value)\">\r\n        <a href=\"{{property.value}}\" target='_blank'>{{ 'igo.geo.targetHtmlUrl' | translate }} </a>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && isObject(property.value)\" [innerHTML]=\"property.value | json\">\r\n      </td>\r\n\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n\r\n<iframe *ngIf=\"feature && isObject(feature.properties) && feature.properties.target === 'iframe'\" [src]='htmlSanitizer(feature.properties.url)'></iframe>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["table{width:100%;white-space:nowrap}table td{padding:5px}iframe{height:calc(100% - 4px);width:100%;border:0}"]
                }] }
    ];
    /** @nocollapse */
    FeatureDetailsComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DomSanitizer },
        { type: NetworkService },
        { type: MapService }
    ]; };
    FeatureDetailsComponent.propDecorators = {
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
    FeatureDetailsComponent.prototype._feature;
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
    /**
     * @type {?}
     * @private
     */
    FeatureDetailsComponent.prototype.mapService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL2ZlYXR1cmUtZGV0YWlscy9mZWF0dXJlLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFFMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHN0QsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFFN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTFEO0lBa0NFLGlDQUNVLEtBQXdCLEVBQ3hCLFNBQXVCLEVBQ3ZCLGNBQThCLEVBQzlCLFVBQXNCO1FBSmhDLGlCQVNDO1FBUlMsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUU5QixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLEtBQXNCO1lBQ2xFLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQWpDRCxzQkFDSSw0Q0FBTzs7OztRQURYO1lBRUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7Ozs7O1FBQ0QsVUFBWSxLQUFjO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxF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SUFnSEM7U0ExR1ksdUJBQXVCOzs7Ozs7SUFFbEMsd0NBQStCOzs7OztJQVUvQiwyQ0FBMEI7Ozs7O0lBaUJ4Qix3Q0FBZ0M7Ozs7O0lBQ2hDLDRDQUErQjs7Ozs7SUFDL0IsaURBQXNDOzs7OztJQUN0Qyw2Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5cclxuaW1wb3J0IHsgZ2V0RW50aXR5VGl0bGUsIGdldEVudGl0eUljb24gfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uL3NoYXJlZCc7XHJcbmltcG9ydCB7IE5ldHdvcmtTZXJ2aWNlLCBDb25uZWN0aW9uU3RhdGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgTVZURGF0YVNvdXJjZU9wdGlvbnMsIFhZWkRhdGFTb3VyY2VPcHRpb25zLCBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tZmVhdHVyZS1kZXRhaWxzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9mZWF0dXJlLWRldGFpbHMuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmVhdHVyZURldGFpbHNDb21wb25lbnQge1xyXG5cclxuICBwcml2YXRlIHN0YXRlOiBDb25uZWN0aW9uU3RhdGU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGZlYXR1cmUoKTogRmVhdHVyZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmVhdHVyZTtcclxuICB9XHJcbiAgc2V0IGZlYXR1cmUodmFsdWU6IEZlYXR1cmUpIHtcclxuICAgIHRoaXMuX2ZlYXR1cmUgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuICBwcml2YXRlIF9mZWF0dXJlOiBGZWF0dXJlO1xyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRFbnRpdHlUaXRsZSh0aGlzLmZlYXR1cmUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IGljb24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRFbnRpdHlJY29uKHRoaXMuZmVhdHVyZSkgfHwgJ2xpbmsnO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXHJcbiAgICBwcml2YXRlIG5ldHdvcmtTZXJ2aWNlOiBOZXR3b3JrU2VydmljZSxcclxuICAgIHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5uZXR3b3JrU2VydmljZS5jdXJyZW50U3RhdGUoKS5zdWJzY3JpYmUoKHN0YXRlOiBDb25uZWN0aW9uU3RhdGUpID0+IHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBodG1sU2FuaXRpemVyKHZhbHVlKTogU2FmZVJlc291cmNlVXJsIHtcclxuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgaXNPYmplY3QodmFsdWUpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xyXG4gIH1cclxuXHJcbiAgaXNVcmwodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgdmFsdWUuc2xpY2UoMCwgOCkgPT09ICdodHRwczovLycgfHwgdmFsdWUuc2xpY2UoMCwgNykgPT09ICdodHRwOi8vJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmlsdGVyRmVhdHVyZVByb3BlcnRpZXMoZmVhdHVyZSkge1xyXG4gICAgbGV0IHNvdXJjZU9wdGlvbnM7XHJcbiAgICBjb25zdCBhbGxvd2VkRmllbGRzQW5kQWxpYXMgPSBmZWF0dXJlLm1ldGEgPyBmZWF0dXJlLm1ldGEuYWxpYXMgOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbih7fSwgZmVhdHVyZS5wcm9wZXJ0aWVzKTtcclxuICAgIGNvbnN0IGxheWVyTmFtZSA9IGZlYXR1cmUubWV0YS50aXRsZTtcclxuICAgIGNvbnN0IGxheWVycyA9IHRoaXMubWFwU2VydmljZS5nZXRNYXAoKS5sYXllcnMkLnZhbHVlO1xyXG5cclxuICAgIGlmIChhbGxvd2VkRmllbGRzQW5kQWxpYXMpIHtcclxuICAgICAgT2JqZWN0LmtleXMocHJvcGVydGllcykuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGFsbG93ZWRGaWVsZHNBbmRBbGlhcykuaW5kZXhPZihwcm9wZXJ0eSkgPT09IC0xKSB7XHJcbiAgICAgICAgICBkZWxldGUgcHJvcGVydGllc1twcm9wZXJ0eV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHByb3BlcnRpZXNbYWxsb3dlZEZpZWxkc0FuZEFsaWFzW3Byb3BlcnR5XV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5XTtcclxuICAgICAgICAgIGlmIChhbGxvd2VkRmllbGRzQW5kQWxpYXNbcHJvcGVydHldICE9PSBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICBkZWxldGUgcHJvcGVydGllc1twcm9wZXJ0eV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsYXllcnMuZm9yRWFjaChsYXllciA9PiB7XHJcbiAgICAgICAgaWYgKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSAnbXZ0Jykge1xyXG4gICAgICAgICAgc291cmNlT3B0aW9ucyA9IChsYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgTVZURGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLnR5cGUgPT09ICd4eXonKSB7XHJcbiAgICAgICAgICBzb3VyY2VPcHRpb25zID0gKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBYWVpEYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsYXllci5kYXRhU291cmNlLm9wdGlvbnMudHlwZSA9PT0gJ3ZlY3RvcicpIHtcclxuICAgICAgICAgIHNvdXJjZU9wdGlvbnMgPSAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGlvbiAmJiBzb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGUpIHtcclxuICAgICAgICAgIGNvbnN0IGV4Y2x1ZGUgPSBzb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGU7XHJcbiAgICAgICAgICBleGNsdWRlLmZvckVhY2goYXR0cmlidXRlID0+IHtcclxuICAgICAgICAgICAgaWYgKGxheWVyTmFtZSA9PT0gbGF5ZXIudGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBmZWF0dXJlLnByb3BlcnRpZXNbYXR0cmlidXRlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5zdGF0ZS5jb25uZWN0aW9uICYmIHNvdXJjZU9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmUpIHtcclxuICAgICAgICAgIGNvbnN0IGV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lID0gc291cmNlT3B0aW9ucy5leGNsdWRlQXR0cmlidXRlT2ZmbGluZTtcclxuICAgICAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lLmZvckVhY2goYXR0cmlidXRlID0+IHtcclxuICAgICAgICAgICAgaWYgKGxheWVyTmFtZSA9PT0gbGF5ZXIudGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBmZWF0dXJlLnByb3BlcnRpZXNbYXR0cmlidXRlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGZlYXR1cmUucHJvcGVydGllcztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19