/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { getEntityTitle, getEntityIcon } from '@igo2/common';
import { MapService } from '../../map/shared/map.service';
var FeatureDetailsComponent = /** @class */ (function () {
    function FeatureDetailsComponent(cdRef, sanitizer, mapService) {
        this.cdRef = cdRef;
        this.sanitizer = sanitizer;
        this.mapService = mapService;
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
                if (layer.dataSource.options.excludeAttribute) {
                    /** @type {?} */
                    var exclude = layer.dataSource.options.excludeAttribute;
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
                else if (layer.dataSource.options.excludeAttributeOffline) {
                    /** @type {?} */
                    var excludeAttributeOffline = layer.dataSource.options.excludeAttributeOffline;
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
                    template: "<table class=\"igo-striped\" *ngIf=\"feature && isObject(feature.properties) && feature.properties.target !== 'iframe'\">\r\n  <tbody>\r\n    <tr *ngFor=\"let property of filterFeatureProperties(feature) | keyvalue\">\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <mat-icon mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <a href=\"{{property.value}}\" target='_blank'> {{ 'igo.geo.targetHtmlUrl' | translate }} {{title}}</a>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined\">\r\n        {{property.key }}\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && !isUrl(property.value)\" [innerHTML]=property.value>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && isUrl(property.value)\">\r\n        <a href=\"{{property.value}}\" target='_blank'>{{ 'igo.geo.targetHtmlUrl' | translate }} </a>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && isObject(property.value)\" [innerHTML]=\"property.value | json\">\r\n      </td>\r\n\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n<iframe *ngIf=\"feature && isObject(feature.properties) && feature.properties.target === 'iframe'\" [src]='htmlSanitizer(feature.properties.url)'></iframe>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["table{width:100%;white-space:nowrap}table td{padding:5px}iframe{height:calc(100% - 4px);width:100%;border:0}"]
                }] }
    ];
    /** @nocollapse */
    FeatureDetailsComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DomSanitizer },
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
    FeatureDetailsComponent.prototype.mapService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL2ZlYXR1cmUtZGV0YWlscy9mZWF0dXJlLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFFMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTFEO0lBK0JFLGlDQUNVLEtBQXdCLEVBQ3hCLFNBQXVCLEVBQ3ZCLFVBQXNCO1FBRnRCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUM3QixDQUFDO0lBNUJKLHNCQUNJLDRDQUFPOzs7O1FBRFg7WUFFRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzs7Ozs7UUFDRCxVQUFZLEtBQWM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM3QixDQUFDOzs7T0FKQTtJQVVELHNCQUFJLDBDQUFLO1FBSFQ7O1dBRUc7Ozs7O1FBQ0g7WUFDRSxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFLRCxzQkFBSSx5Q0FBSTtRQUhSOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0s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LEVBQUMsQ0FBQztZQUNILE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQztTQUMzQjtJQUNILENBQUM7O2dCQTdGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsZytDQUErQztvQkFFL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFmQyxpQkFBaUI7Z0JBRVYsWUFBWTtnQkFNWixVQUFVOzs7MEJBU2hCLEtBQUs7O0lBdUZSLDhCQUFDO0NBQUEsQUE5RkQsSUE4RkM7U0F4RlksdUJBQXVCOzs7Ozs7SUFTbEMsMkNBQTBCOzs7OztJQWlCeEIsd0NBQWdDOzs7OztJQUNoQyw0Q0FBK0I7Ozs7O0lBQy9CLDZDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5pbXBvcnQgeyBnZXRFbnRpdHlUaXRsZSwgZ2V0RW50aXR5SWNvbiB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vc2hhcmVkJztcclxuXHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWZlYXR1cmUtZGV0YWlscycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ZlYXR1cmUtZGV0YWlscy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVEZXRhaWxzQ29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBmZWF0dXJlKCk6IEZlYXR1cmUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZlYXR1cmU7XHJcbiAgfVxyXG4gIHNldCBmZWF0dXJlKHZhbHVlOiBGZWF0dXJlKSB7XHJcbiAgICB0aGlzLl9mZWF0dXJlID0gdmFsdWU7XHJcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZmVhdHVyZTogRmVhdHVyZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5VGl0bGUodGhpcy5mZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBpY29uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5SWNvbih0aGlzLmZlYXR1cmUpIHx8ICdsaW5rJztcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxyXG4gICAgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBodG1sU2FuaXRpemVyKHZhbHVlKTogU2FmZVJlc291cmNlVXJsIHtcclxuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgaXNPYmplY3QodmFsdWUpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xyXG4gIH1cclxuXHJcbiAgaXNVcmwodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgdmFsdWUuc2xpY2UoMCwgOCkgPT09ICdodHRwczovLycgfHwgdmFsdWUuc2xpY2UoMCwgNykgPT09ICdodHRwOi8vJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmlsdGVyRmVhdHVyZVByb3BlcnRpZXMoZmVhdHVyZSkge1xyXG4gICAgY29uc3QgYWxsb3dlZEZpZWxkc0FuZEFsaWFzID0gZmVhdHVyZS5tZXRhID8gZmVhdHVyZS5tZXRhLmFsaWFzIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oe30sIGZlYXR1cmUucHJvcGVydGllcyk7XHJcbiAgICBjb25zdCBsYXllck5hbWUgPSBmZWF0dXJlLm1ldGEudGl0bGU7XHJcbiAgICBjb25zdCBsYXllcnMgPSB0aGlzLm1hcFNlcnZpY2UuZ2V0TWFwKCkubGF5ZXJzJC52YWx1ZTtcclxuXHJcbiAgICBpZiAoYWxsb3dlZEZpZWxkc0FuZEFsaWFzKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLmZvckVhY2gocHJvcGVydHkgPT4ge1xyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhhbGxvd2VkRmllbGRzQW5kQWxpYXMpLmluZGV4T2YocHJvcGVydHkpID09PSAtMSkge1xyXG4gICAgICAgICAgZGVsZXRlIHByb3BlcnRpZXNbcHJvcGVydHldO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBwcm9wZXJ0aWVzW2FsbG93ZWRGaWVsZHNBbmRBbGlhc1twcm9wZXJ0eV1dID0gcHJvcGVydGllc1twcm9wZXJ0eV07XHJcbiAgICAgICAgICBpZiAoYWxsb3dlZEZpZWxkc0FuZEFsaWFzW3Byb3BlcnR5XSAhPT0gcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHByb3BlcnRpZXNbcHJvcGVydHldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xyXG4gICAgICAgIGlmIChsYXllci5kYXRhU291cmNlLm9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgY29uc3QgZXhjbHVkZSA9IGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy5leGNsdWRlQXR0cmlidXRlO1xyXG4gICAgICAgICAgZXhjbHVkZS5mb3JFYWNoKGF0dHJpYnV0ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChsYXllck5hbWUgPT09IGxheWVyLnRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgZmVhdHVyZS5wcm9wZXJ0aWVzW2F0dHJpYnV0ZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lKSB7XHJcbiAgICAgICAgICBjb25zdCBleGNsdWRlQXR0cmlidXRlT2ZmbGluZSA9IGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy5leGNsdWRlQXR0cmlidXRlT2ZmbGluZTtcclxuICAgICAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lLmZvckVhY2goYXR0cmlidXRlID0+IHtcclxuICAgICAgICAgICAgaWYgKGxheWVyTmFtZSA9PT0gbGF5ZXIudGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBmZWF0dXJlLnByb3BlcnRpZXNbYXR0cmlidXRlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGZlYXR1cmUucHJvcGVydGllcztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19