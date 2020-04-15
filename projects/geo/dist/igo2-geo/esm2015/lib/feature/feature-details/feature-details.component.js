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
        /** @type {?} */
        const offlineButtonState = this.map.offlineButtonState;
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
            if (!offlineButtonState) {
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
            else {
                if (feature.meta && feature.meta.excludeAttributeOffline) {
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
    map: [{ type: Input }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL2ZlYXR1cmUtZGV0YWlscy9mZWF0dXJlLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFFN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQVE5QyxNQUFNLE9BQU8sdUJBQXVCOzs7Ozs7SUF5Q2xDLFlBQ1UsS0FBd0IsRUFDeEIsU0FBdUIsRUFDdkIsY0FBOEI7UUFGOUIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxLQUFzQixFQUFFLEVBQUU7WUFDdEUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBN0NELElBQ0ksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7OztJQUNELElBQUksTUFBTSxDQUFDLEtBQW1CO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FB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QUFNO2dCQUNMLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFOzswQkFDbEQsdUJBQXVCLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUI7b0JBQ3BFLHVCQUF1QixDQUFDLE9BQU87Ozs7b0JBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQzFDLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7YUFDRjtZQUNELE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQztTQUMzQjtJQUNILENBQUM7OztZQTdHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsbWdEQUErQztnQkFFL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBaEJDLGlCQUFpQjtZQUVWLFlBQVk7WUFDWixjQUFjOzs7cUJBa0JwQixLQUFLO2tCQVNMLEtBQUs7c0JBRUwsS0FBSzs7Ozs7OztJQWROLHdDQUErQjs7Ozs7SUFDL0IscURBQW9DOztJQVdwQyxzQ0FBcUI7Ozs7O0lBV3JCLDJDQUEwQjs7Ozs7SUFDMUIsMENBQThCOzs7OztJQWlCNUIsd0NBQWdDOzs7OztJQUNoQyw0Q0FBK0I7Ozs7O0lBQy9CLGlEQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IE5ldHdvcmtTZXJ2aWNlLCBDb25uZWN0aW9uU3RhdGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IGdldEVudGl0eVRpdGxlLCBnZXRFbnRpdHlJY29uIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi9zaGFyZWQnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UgfSBmcm9tICcuLi8uLi9zZWFyY2gvc2hhcmVkL3NvdXJjZXMvc291cmNlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tZmVhdHVyZS1kZXRhaWxzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9mZWF0dXJlLWRldGFpbHMuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmVhdHVyZURldGFpbHNDb21wb25lbnQge1xyXG4gIHByaXZhdGUgc3RhdGU6IENvbm5lY3Rpb25TdGF0ZTtcclxuICBwcml2YXRlIG9mZmxpbmVCdXR0b25TdGF0ZTogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgc291cmNlKCk6IFNlYXJjaFNvdXJjZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc291cmNlO1xyXG4gIH1cclxuICBzZXQgc291cmNlKHZhbHVlOiBTZWFyY2hTb3VyY2UgKSB7XHJcbiAgICB0aGlzLl9zb3VyY2UgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGZlYXR1cmUoKTogRmVhdHVyZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmVhdHVyZTtcclxuICB9XHJcbiAgc2V0IGZlYXR1cmUodmFsdWU6IEZlYXR1cmUpIHtcclxuICAgIHRoaXMuX2ZlYXR1cmUgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZmVhdHVyZTogRmVhdHVyZTtcclxuICBwcml2YXRlIF9zb3VyY2U6IFNlYXJjaFNvdXJjZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5VGl0bGUodGhpcy5mZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBpY29uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5SWNvbih0aGlzLmZlYXR1cmUpIHx8ICdsaW5rJztcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxyXG4gICAgcHJpdmF0ZSBuZXR3b3JrU2VydmljZTogTmV0d29ya1NlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMubmV0d29ya1NlcnZpY2UuY3VycmVudFN0YXRlKCkuc3Vic2NyaWJlKChzdGF0ZTogQ29ubmVjdGlvblN0YXRlKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaHRtbFNhbml0aXplcih2YWx1ZSk6IFNhZmVSZXNvdXJjZVVybCB7XHJcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGlzT2JqZWN0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JztcclxuICB9XHJcblxyXG4gIGlzVXJsKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIHZhbHVlLnNsaWNlKDAsIDgpID09PSAnaHR0cHM6Ly8nIHx8IHZhbHVlLnNsaWNlKDAsIDcpID09PSAnaHR0cDovLydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbHRlckZlYXR1cmVQcm9wZXJ0aWVzKGZlYXR1cmUpIHtcclxuICAgIGNvbnN0IGFsbG93ZWRGaWVsZHNBbmRBbGlhcyA9IGZlYXR1cmUubWV0YSA/IGZlYXR1cmUubWV0YS5hbGlhcyA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7fTtcclxuICAgIGNvbnN0IG9mZmxpbmVCdXR0b25TdGF0ZSA9IHRoaXMubWFwLm9mZmxpbmVCdXR0b25TdGF0ZTtcclxuXHJcbiAgICBpZiAoYWxsb3dlZEZpZWxkc0FuZEFsaWFzKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKGFsbG93ZWRGaWVsZHNBbmRBbGlhcykuZm9yRWFjaChmaWVsZCA9PiB7XHJcbiAgICAgICAgcHJvcGVydGllc1thbGxvd2VkRmllbGRzQW5kQWxpYXNbZmllbGRdXSA9IGZlYXR1cmUucHJvcGVydGllc1tmaWVsZF07XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcHJvcGVydGllcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghb2ZmbGluZUJ1dHRvblN0YXRlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGlvbiAmJiBmZWF0dXJlLm1ldGEgJiYgZmVhdHVyZS5tZXRhLmV4Y2x1ZGVBdHRyaWJ1dGUpIHtcclxuICAgICAgICAgIGNvbnN0IGV4Y2x1ZGVBdHRyaWJ1dGUgPSBmZWF0dXJlLm1ldGEuZXhjbHVkZUF0dHJpYnV0ZTtcclxuICAgICAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGUuZm9yRWFjaChhdHRyaWJ1dGUgPT4ge1xyXG4gICAgICAgICAgICBkZWxldGUgZmVhdHVyZS5wcm9wZXJ0aWVzW2F0dHJpYnV0ZV07XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLmNvbm5lY3Rpb24gJiYgZmVhdHVyZS5tZXRhICYmIGZlYXR1cmUubWV0YS5leGNsdWRlQXR0cmlidXRlT2ZmbGluZSkge1xyXG4gICAgICAgICAgY29uc3QgZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmUgPSBmZWF0dXJlLm1ldGEuZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmU7XHJcbiAgICAgICAgICBleGNsdWRlQXR0cmlidXRlT2ZmbGluZS5mb3JFYWNoKGF0dHJpYnV0ZSA9PiB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBmZWF0dXJlLnByb3BlcnRpZXNbYXR0cmlidXRlXTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmVhdHVyZS5wcm9wZXJ0aWVzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChmZWF0dXJlLm1ldGEgJiYgZmVhdHVyZS5tZXRhLmV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lKSB7XHJcbiAgICAgICAgICBjb25zdCBleGNsdWRlQXR0cmlidXRlT2ZmbGluZSA9IGZlYXR1cmUubWV0YS5leGNsdWRlQXR0cmlidXRlT2ZmbGluZTtcclxuICAgICAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lLmZvckVhY2goYXR0cmlidXRlID0+IHtcclxuICAgICAgICAgICAgZGVsZXRlIGZlYXR1cmUucHJvcGVydGllc1thdHRyaWJ1dGVdO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmZWF0dXJlLnByb3BlcnRpZXM7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==