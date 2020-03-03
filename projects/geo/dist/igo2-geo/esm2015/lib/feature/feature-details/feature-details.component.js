/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NetworkService } from '@igo2/core';
import { getEntityTitle, getEntityIcon } from '@igo2/common';
import { SearchSource } from '../../search/shared/sources/source';
export class FeatureDetailsComponent {
    /**
     * @param {?} cdRef
     * @param {?} sanitizer
     * @param {?} networkService
     */
    constructor(cdRef, sanitizer, networkService) {
        this.cdRef = cdRef;
        this.sanitizer = sanitizer;
        this.networkService = networkService;
        this.networkService.currentState().subscribe((/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
            this.state = state;
        }));
    }
    /**
     * @return {?}
     */
    get source() {
        return this._source;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set source(value) {
        this._source = value;
        this.cdRef.detectChanges();
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
        const properties = {};
        if (allowedFieldsAndAlias) {
            Object.keys(allowedFieldsAndAlias).forEach((/**
             * @param {?} field
             * @return {?}
             */
            field => {
                properties[allowedFieldsAndAlias[field]] = feature.properties[field];
            }));
            return properties;
        }
        else {
            if (this.state.connection && feature.meta && feature.meta.excludeAttribute) {
                /** @type {?} */
                const excludeAttribute = feature.meta.excludeAttribute;
                excludeAttribute.forEach((/**
                 * @param {?} attribute
                 * @return {?}
                 */
                attribute => {
                    delete feature.properties[attribute];
                }));
            }
            else if (!this.state.connection && feature.meta && feature.meta.excludeAttributeOffline) {
                /** @type {?} */
                const excludeAttributeOffline = feature.meta.excludeAttributeOffline;
                excludeAttributeOffline.forEach((/**
                 * @param {?} attribute
                 * @return {?}
                 */
                attribute => {
                    delete feature.properties[attribute];
                }));
            }
            return feature.properties;
        }
    }
}
FeatureDetailsComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-feature-details',
                template: "<table class=\"igo-striped mat-typography\" *ngIf=\"feature && isObject(feature.properties) && feature.properties.target !== 'iframe'\">\r\n  <tbody>\r\n    <tr *ngFor=\"let property of filterFeatureProperties(feature) | keyvalue\">\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <mat-icon mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <a href=\"{{property.value}}\" target='_blank'> {{ 'igo.geo.targetHtmlUrl' | translate }} {{title}}</a>\r\n      </td>\r\n\r\n      <td id=\"keyValue\" *ngIf=\"feature.properties.target === undefined\">\r\n        {{property.key }}\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && !isUrl(property.value)\" [innerHTML]=property.value>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && isUrl(property.value)\">\r\n        <a href=\"{{property.value}}\" target='_blank'>{{ 'igo.geo.targetHtmlUrl' | translate }} </a>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && isObject(property.value)\" [innerHTML]=\"property.value | json\">\r\n      </td>\r\n\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n\r\n<iframe *ngIf=\"feature && isObject(feature.properties) && feature.properties.target === 'iframe'\" [src]='htmlSanitizer(feature.properties.url)'></iframe>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["table{width:100%}table td{padding:5px}#keyValue{width:30%}iframe{height:calc(100% - 4px);width:100%;border:0}"]
            }] }
];
/** @nocollapse */
FeatureDetailsComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DomSanitizer },
    { type: NetworkService }
];
FeatureDetailsComponent.propDecorators = {
    source: [{ type: Input }],
    feature: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL2ZlYXR1cmUtZGV0YWlscy9mZWF0dXJlLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFFN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBUWxFLE1BQU0sT0FBTyx1QkFBdUI7Ozs7OztJQXNDbEMsWUFDVSxLQUF3QixFQUN4QixTQUF1QixFQUN2QixjQUE4QjtRQUY5QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQ3ZCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUV0QyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQXNCLEVBQUUsRUFBRTtZQUN0RSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUEzQ0QsSUFDSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBQ0QsSUFBSSxNQUFNLENBQUMsS0FBbUI7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3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WUFFVixZQUFZO1lBQ1osY0FBYzs7O3FCQWdCcEIsS0FBSztzQkFTTCxLQUFLOzs7Ozs7O0lBWE4sd0NBQStCOzs7OztJQW9CL0IsMkNBQTBCOzs7OztJQUMxQiwwQ0FBOEI7Ozs7O0lBaUI1Qix3Q0FBZ0M7Ozs7O0lBQ2hDLDRDQUErQjs7Ozs7SUFDL0IsaURBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgTmV0d29ya1NlcnZpY2UsIENvbm5lY3Rpb25TdGF0ZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZ2V0RW50aXR5VGl0bGUsIGdldEVudGl0eUljb24gfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uL3NoYXJlZCc7XHJcbmltcG9ydCB7IFNlYXJjaFNvdXJjZSB9IGZyb20gJy4uLy4uL3NlYXJjaC9zaGFyZWQvc291cmNlcy9zb3VyY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tZmVhdHVyZS1kZXRhaWxzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9mZWF0dXJlLWRldGFpbHMuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmVhdHVyZURldGFpbHNDb21wb25lbnQge1xyXG4gIHByaXZhdGUgc3RhdGU6IENvbm5lY3Rpb25TdGF0ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgc291cmNlKCk6IFNlYXJjaFNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc291cmNlO1xyXG4gIH1cclxuICBzZXQgc291cmNlKHZhbHVlOiBTZWFyY2hTb3VyY2UgKSB7XHJcbiAgICB0aGlzLl9zb3VyY2UgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZmVhdHVyZSgpOiBGZWF0dXJlIHtcclxuICAgIHJldHVybiB0aGlzLl9mZWF0dXJlO1xyXG4gIH1cclxuICBzZXQgZmVhdHVyZSh2YWx1ZTogRmVhdHVyZSkge1xyXG4gICAgdGhpcy5fZmVhdHVyZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9mZWF0dXJlOiBGZWF0dXJlO1xyXG4gIHByaXZhdGUgX3NvdXJjZTogU2VhcmNoU291cmNlO1xyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRFbnRpdHlUaXRsZSh0aGlzLmZlYXR1cmUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IGljb24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRFbnRpdHlJY29uKHRoaXMuZmVhdHVyZSkgfHwgJ2xpbmsnO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXHJcbiAgICBwcml2YXRlIG5ldHdvcmtTZXJ2aWNlOiBOZXR3b3JrU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5uZXR3b3JrU2VydmljZS5jdXJyZW50U3RhdGUoKS5zdWJzY3JpYmUoKHN0YXRlOiBDb25uZWN0aW9uU3RhdGUpID0+IHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBodG1sU2FuaXRpemVyKHZhbHVlKTogU2FmZVJlc291cmNlVXJsIHtcclxuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgaXNPYmplY3QodmFsdWUpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xyXG4gIH1cclxuXHJcbiAgaXNVcmwodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgdmFsdWUuc2xpY2UoMCwgOCkgPT09ICdodHRwczovLycgfHwgdmFsdWUuc2xpY2UoMCwgNykgPT09ICdodHRwOi8vJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmlsdGVyRmVhdHVyZVByb3BlcnRpZXMoZmVhdHVyZSkge1xyXG4gICAgY29uc3QgYWxsb3dlZEZpZWxkc0FuZEFsaWFzID0gZmVhdHVyZS5tZXRhID8gZmVhdHVyZS5tZXRhLmFsaWFzIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHt9O1xyXG5cclxuICAgIGlmIChhbGxvd2VkRmllbGRzQW5kQWxpYXMpIHtcclxuICAgICAgT2JqZWN0LmtleXMoYWxsb3dlZEZpZWxkc0FuZEFsaWFzKS5mb3JFYWNoKGZpZWxkID0+IHtcclxuICAgICAgICBwcm9wZXJ0aWVzW2FsbG93ZWRGaWVsZHNBbmRBbGlhc1tmaWVsZF1dID0gZmVhdHVyZS5wcm9wZXJ0aWVzW2ZpZWxkXTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0aW9uICYmIGZlYXR1cmUubWV0YSAmJiBmZWF0dXJlLm1ldGEuZXhjbHVkZUF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgY29uc3QgZXhjbHVkZUF0dHJpYnV0ZSA9IGZlYXR1cmUubWV0YS5leGNsdWRlQXR0cmlidXRlO1xyXG4gICAgICAgICAgZXhjbHVkZUF0dHJpYnV0ZS5mb3JFYWNoKGF0dHJpYnV0ZSA9PiB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBmZWF0dXJlLnByb3BlcnRpZXNbYXR0cmlidXRlXTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuc3RhdGUuY29ubmVjdGlvbiAmJiBmZWF0dXJlLm1ldGEgJiYgZmVhdHVyZS5tZXRhLmV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lKSB7XHJcbiAgICAgICAgICBjb25zdCBleGNsdWRlQXR0cmlidXRlT2ZmbGluZSA9IGZlYXR1cmUubWV0YS5leGNsdWRlQXR0cmlidXRlT2ZmbGluZTtcclxuICAgICAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lLmZvckVhY2goYXR0cmlidXRlID0+IHtcclxuICAgICAgICAgICAgZGVsZXRlIGZlYXR1cmUucHJvcGVydGllc1thdHRyaWJ1dGVdO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmZWF0dXJlLnByb3BlcnRpZXM7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==