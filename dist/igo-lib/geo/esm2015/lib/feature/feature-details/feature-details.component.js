/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { getEntityTitle, getEntityIcon } from '@igo2/common';
export class FeatureDetailsComponent {
    /**
     * @param {?} cdRef
     * @param {?} sanitizer
     */
    constructor(cdRef, sanitizer) {
        this.cdRef = cdRef;
        this.sanitizer = sanitizer;
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
    { type: DomSanitizer }
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL2ZlYXR1cmUtZGV0YWlscy9mZWF0dXJlLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFFMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFVN0QsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7SUF5QmxDLFlBQ1UsS0FBd0IsRUFDeEIsU0FBdUI7UUFEdkIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUM5QixDQUFDOzs7O0lBM0JKLElBQ0ksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7OztJQUNELElBQUksT0FBTyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7OztJQU1ELElBQUksS0FBSztRQUNQLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7OztJQUtELElBQUksSUFBSTtRQUNOLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUM7SUFDL0MsQ0FBQzs7Ozs7SUFPRCxhQUFhLENBQUMsS0FBSztRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsS0FBSztRQUNaLE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBRUQsS0FBSyxDQUFDLEtBQUs7UUFDVCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixPQUFPLENBQ0wsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssVUFBVSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FDcEUsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7Ozs7SUFFRCx1QkFBdUIsQ0FBQyxPQUFPOztjQUN2QixxQkFBcUIsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUzs7Y0FDckUsVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFFeEQsSUFBSSxxQkFBcUIsRUFBRTtZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU87Ozs7WUFBQyxRQUFRLENBQUMsRUFBRTtnQkFDekMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUMvRCxPQUFPLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDN0I7cUJBQU07b0JBQ0wsVUFBVSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNuRSxJQUFJLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxLQUFLLFFBQVEsRUFBRTt3QkFDaEQsT0FBTyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQzdCO2lCQUNGO1lBQ0gsQ0FBQyxFQUFDLENBQUM7WUFDSCxPQUFPLFVBQVUsQ0FBQztTQUNuQjthQUFNO1lBQ0wsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7O1lBekVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixnK0NBQStDO2dCQUUvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFiQyxpQkFBaUI7WUFFVixZQUFZOzs7c0JBYWxCLEtBQUs7Ozs7Ozs7SUFRTiwyQ0FBMEI7Ozs7O0lBaUJ4Qix3Q0FBZ0M7Ozs7O0lBQ2hDLDRDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5pbXBvcnQgeyBnZXRFbnRpdHlUaXRsZSwgZ2V0RW50aXR5SWNvbiB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vc2hhcmVkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWZlYXR1cmUtZGV0YWlscycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ZlYXR1cmUtZGV0YWlscy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVEZXRhaWxzQ29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBmZWF0dXJlKCk6IEZlYXR1cmUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZlYXR1cmU7XHJcbiAgfVxyXG4gIHNldCBmZWF0dXJlKHZhbHVlOiBGZWF0dXJlKSB7XHJcbiAgICB0aGlzLl9mZWF0dXJlID0gdmFsdWU7XHJcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZmVhdHVyZTogRmVhdHVyZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5VGl0bGUodGhpcy5mZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBpY29uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5SWNvbih0aGlzLmZlYXR1cmUpIHx8ICdsaW5rJztcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyXHJcbiAgKSB7fVxyXG5cclxuICBodG1sU2FuaXRpemVyKHZhbHVlKTogU2FmZVJlc291cmNlVXJsIHtcclxuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgaXNPYmplY3QodmFsdWUpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xyXG4gIH1cclxuXHJcbiAgaXNVcmwodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgdmFsdWUuc2xpY2UoMCwgOCkgPT09ICdodHRwczovLycgfHwgdmFsdWUuc2xpY2UoMCwgNykgPT09ICdodHRwOi8vJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmlsdGVyRmVhdHVyZVByb3BlcnRpZXMoZmVhdHVyZSkge1xyXG4gICAgY29uc3QgYWxsb3dlZEZpZWxkc0FuZEFsaWFzID0gZmVhdHVyZS5tZXRhID8gZmVhdHVyZS5tZXRhLmFsaWFzIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oe30sIGZlYXR1cmUucHJvcGVydGllcyk7XHJcblxyXG4gICAgaWYgKGFsbG93ZWRGaWVsZHNBbmRBbGlhcykge1xyXG4gICAgICBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKS5mb3JFYWNoKHByb3BlcnR5ID0+IHtcclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoYWxsb3dlZEZpZWxkc0FuZEFsaWFzKS5pbmRleE9mKHByb3BlcnR5KSA9PT0gLTEpIHtcclxuICAgICAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzW3Byb3BlcnR5XTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcHJvcGVydGllc1thbGxvd2VkRmllbGRzQW5kQWxpYXNbcHJvcGVydHldXSA9IHByb3BlcnRpZXNbcHJvcGVydHldO1xyXG4gICAgICAgICAgaWYgKGFsbG93ZWRGaWVsZHNBbmRBbGlhc1twcm9wZXJ0eV0gIT09IHByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzW3Byb3BlcnR5XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcHJvcGVydGllcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmZWF0dXJlLnByb3BlcnRpZXM7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==