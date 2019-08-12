/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { getEntityTitle, getEntityIcon } from '@igo2/common';
import { MapService } from '../../map/shared/map.service';
export class FeatureDetailsComponent {
    /**
     * @param {?} cdRef
     * @param {?} sanitizer
     * @param {?} mapService
     */
    constructor(cdRef, sanitizer, mapService) {
        this.cdRef = cdRef;
        this.sanitizer = sanitizer;
        this.mapService = mapService;
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
        this.cdRef.detectChanges();
    }
    /**
     * \@internal
     * @return {?}
     */
    get title() {
        return getEntityTitle(this.feature);
    }
    /**
     * \@internal
     * @return {?}
     */
    get icon() {
        return getEntityIcon(this.feature) || 'link';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    htmlSanitizer(value) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isObject(value) {
        return typeof value === 'object';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isUrl(value) {
        if (typeof value === 'string') {
            return (value.slice(0, 8) === 'https://' || value.slice(0, 7) === 'http://');
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} feature
     * @return {?}
     */
    filterFeatureProperties(feature) {
        /** @type {?} */
        const allowedFieldsAndAlias = feature.meta ? feature.meta.alias : undefined;
        /** @type {?} */
        const properties = Object.assign({}, feature.properties);
        /** @type {?} */
        const layerName = feature.meta.title;
        /** @type {?} */
        const layers = this.mapService.getMap().layers$.value;
        if (allowedFieldsAndAlias) {
            Object.keys(properties).forEach((/**
             * @param {?} property
             * @return {?}
             */
            property => {
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
            layer => {
                if (layer.dataSource.options.excludeAttribute) {
                    /** @type {?} */
                    const exclude = layer.dataSource.options.excludeAttribute;
                    exclude.forEach((/**
                     * @param {?} attribute
                     * @return {?}
                     */
                    attribute => {
                        if (layerName === layer.title) {
                            delete feature.properties[attribute];
                        }
                    }));
                }
                else if (layer.dataSource.options.excludeAttributeOffline) {
                    /** @type {?} */
                    const excludeAttributeOffline = layer.dataSource.options.excludeAttributeOffline;
                    excludeAttributeOffline.forEach((/**
                     * @param {?} attribute
                     * @return {?}
                     */
                    attribute => {
                        if (layerName === layer.title) {
                            delete feature.properties[attribute];
                        }
                    }));
                }
            }));
            return feature.properties;
        }
    }
}
FeatureDetailsComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-feature-details',
                template: "<table class=\"igo-striped\" *ngIf=\"feature && isObject(feature.properties) && feature.properties.target !== 'iframe'\">\r\n  <tbody>\r\n    <tr *ngFor=\"let property of filterFeatureProperties(feature) | keyvalue\">\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <mat-icon mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <a href=\"{{property.value}}\" target='_blank'> {{ 'igo.geo.targetHtmlUrl' | translate }} {{title}}</a>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined\">\r\n        {{property.key }}\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && !isUrl(property.value)\" [innerHTML]=property.value>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && isUrl(property.value)\">\r\n        <a href=\"{{property.value}}\" target='_blank'>{{ 'igo.geo.targetHtmlUrl' | translate }} </a>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && isObject(property.value)\" [innerHTML]=\"property.value | json\">\r\n      </td>\r\n\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n<iframe *ngIf=\"feature && isObject(feature.properties) && feature.properties.target === 'iframe'\" [src]='htmlSanitizer(feature.properties.url)'></iframe>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["table{width:100%;white-space:nowrap}table td{padding:5px}iframe{height:calc(100% - 4px);width:100%;border:0}"]
            }] }
];
/** @nocollapse */
FeatureDetailsComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DomSanitizer },
    { type: MapService }
];
FeatureDetailsComponent.propDecorators = {
    feature: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL2ZlYXR1cmUtZGV0YWlscy9mZWF0dXJlLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFFMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBUTFELE1BQU0sT0FBTyx1QkFBdUI7Ozs7OztJQXlCbEMsWUFDVSxLQUF3QixFQUN4QixTQUF1QixFQUN2QixVQUFzQjtRQUZ0QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQ3ZCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFDN0IsQ0FBQzs7OztJQTVCSixJQUNJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFjO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFNRCxJQUFJLEtBQUs7UUFDUCxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFLRCxJQUFJLElBQUk7UUFDTixPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDO0lBQy9DLENBQUM7Ozs7O0lBUUQs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Q0gsQ0FBQzs7O1lBN0ZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixnK0NBQStDO2dCQUUvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFmQyxpQkFBaUI7WUFFVixZQUFZO1lBTVosVUFBVTs7O3NCQVNoQixLQUFLOzs7Ozs7O0lBUU4sMkNBQTBCOzs7OztJQWlCeEIsd0NBQWdDOzs7OztJQUNoQyw0Q0FBK0I7Ozs7O0lBQy9CLDZDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5pbXBvcnQgeyBnZXRFbnRpdHlUaXRsZSwgZ2V0RW50aXR5SWNvbiB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vc2hhcmVkJztcclxuXHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWZlYXR1cmUtZGV0YWlscycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ZlYXR1cmUtZGV0YWlscy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVEZXRhaWxzQ29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBmZWF0dXJlKCk6IEZlYXR1cmUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZlYXR1cmU7XHJcbiAgfVxyXG4gIHNldCBmZWF0dXJlKHZhbHVlOiBGZWF0dXJlKSB7XHJcbiAgICB0aGlzLl9mZWF0dXJlID0gdmFsdWU7XHJcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZmVhdHVyZTogRmVhdHVyZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5VGl0bGUodGhpcy5mZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBpY29uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5SWNvbih0aGlzLmZlYXR1cmUpIHx8ICdsaW5rJztcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxyXG4gICAgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBodG1sU2FuaXRpemVyKHZhbHVlKTogU2FmZVJlc291cmNlVXJsIHtcclxuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgaXNPYmplY3QodmFsdWUpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xyXG4gIH1cclxuXHJcbiAgaXNVcmwodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgdmFsdWUuc2xpY2UoMCwgOCkgPT09ICdodHRwczovLycgfHwgdmFsdWUuc2xpY2UoMCwgNykgPT09ICdodHRwOi8vJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmlsdGVyRmVhdHVyZVByb3BlcnRpZXMoZmVhdHVyZSkge1xyXG4gICAgY29uc3QgYWxsb3dlZEZpZWxkc0FuZEFsaWFzID0gZmVhdHVyZS5tZXRhID8gZmVhdHVyZS5tZXRhLmFsaWFzIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oe30sIGZlYXR1cmUucHJvcGVydGllcyk7XHJcbiAgICBjb25zdCBsYXllck5hbWUgPSBmZWF0dXJlLm1ldGEudGl0bGU7XHJcbiAgICBjb25zdCBsYXllcnMgPSB0aGlzLm1hcFNlcnZpY2UuZ2V0TWFwKCkubGF5ZXJzJC52YWx1ZTtcclxuXHJcbiAgICBpZiAoYWxsb3dlZEZpZWxkc0FuZEFsaWFzKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLmZvckVhY2gocHJvcGVydHkgPT4ge1xyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhhbGxvd2VkRmllbGRzQW5kQWxpYXMpLmluZGV4T2YocHJvcGVydHkpID09PSAtMSkge1xyXG4gICAgICAgICAgZGVsZXRlIHByb3BlcnRpZXNbcHJvcGVydHldO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBwcm9wZXJ0aWVzW2FsbG93ZWRGaWVsZHNBbmRBbGlhc1twcm9wZXJ0eV1dID0gcHJvcGVydGllc1twcm9wZXJ0eV07XHJcbiAgICAgICAgICBpZiAoYWxsb3dlZEZpZWxkc0FuZEFsaWFzW3Byb3BlcnR5XSAhPT0gcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHByb3BlcnRpZXNbcHJvcGVydHldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xyXG4gICAgICAgIGlmIChsYXllci5kYXRhU291cmNlLm9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgY29uc3QgZXhjbHVkZSA9IGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy5leGNsdWRlQXR0cmlidXRlO1xyXG4gICAgICAgICAgZXhjbHVkZS5mb3JFYWNoKGF0dHJpYnV0ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChsYXllck5hbWUgPT09IGxheWVyLnRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgZmVhdHVyZS5wcm9wZXJ0aWVzW2F0dHJpYnV0ZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lKSB7XHJcbiAgICAgICAgICBjb25zdCBleGNsdWRlQXR0cmlidXRlT2ZmbGluZSA9IGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy5leGNsdWRlQXR0cmlidXRlT2ZmbGluZTtcclxuICAgICAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lLmZvckVhY2goYXR0cmlidXRlID0+IHtcclxuICAgICAgICAgICAgaWYgKGxheWVyTmFtZSA9PT0gbGF5ZXIudGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBmZWF0dXJlLnByb3BlcnRpZXNbYXR0cmlidXRlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGZlYXR1cmUucHJvcGVydGllcztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19