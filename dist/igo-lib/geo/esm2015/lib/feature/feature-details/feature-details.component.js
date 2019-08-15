/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { getEntityTitle, getEntityIcon } from '@igo2/common';
import { NetworkService } from '@igo2/core';
import { MapService } from '../../map/shared/map.service';
export class FeatureDetailsComponent {
    /**
     * @param {?} cdRef
     * @param {?} sanitizer
     * @param {?} networkService
     * @param {?} mapService
     */
    constructor(cdRef, sanitizer, networkService, mapService) {
        this.cdRef = cdRef;
        this.sanitizer = sanitizer;
        this.networkService = networkService;
        this.mapService = mapService;
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
        let sourceOptions;
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
                if (this.state.connection && sourceOptions.excludeAttribute) {
                    /** @type {?} */
                    const exclude = sourceOptions.excludeAttribute;
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
                else if (!this.state.connection && sourceOptions.excludeAttributeOffline) {
                    /** @type {?} */
                    const excludeAttributeOffline = sourceOptions.excludeAttributeOffline;
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
                template: "<table class=\"igo-striped\" *ngIf=\"feature && isObject(feature.properties) && feature.properties.target !== 'iframe'\">\r\n  <tbody>\r\n    <tr *ngFor=\"let property of filterFeatureProperties(feature) | keyvalue\">\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <mat-icon mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <a href=\"{{property.value}}\" target='_blank'> {{ 'igo.geo.targetHtmlUrl' | translate }} {{title}}</a>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined\">\r\n        {{property.key }}\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && !isUrl(property.value)\" [innerHTML]=property.value>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && isUrl(property.value)\">\r\n        <a href=\"{{property.value}}\" target='_blank'>{{ 'igo.geo.targetHtmlUrl' | translate }} </a>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && isObject(property.value)\" [innerHTML]=\"property.value | json\">\r\n      </td>\r\n\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n\r\n<iframe *ngIf=\"feature && isObject(feature.properties) && feature.properties.target === 'iframe'\" [src]='htmlSanitizer(feature.properties.url)'></iframe>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["table{width:100%;white-space:nowrap}table td{padding:5px}iframe{height:calc(100% - 4px);width:100%;border:0}"]
            }] }
];
/** @nocollapse */
FeatureDetailsComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DomSanitizer },
    { type: NetworkService },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL2ZlYXR1cmUtZGV0YWlscy9mZWF0dXJlLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFFMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHN0QsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFFN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBUTFELE1BQU0sT0FBTyx1QkFBdUI7Ozs7Ozs7SUE0QmxDLFlBQ1UsS0FBd0IsRUFDeEIsU0FBdUIsRUFDdkIsY0FBOEIsRUFDOUIsVUFBc0I7UUFIdEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUU5QixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQXNCLEVBQUUsRUFBRTtZQUN0RSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFqQ0QsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBYztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJ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SUFDdEMsNkNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuXHJcbmltcG9ydCB7IGdldEVudGl0eVRpdGxlLCBnZXRFbnRpdHlJY29uIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi9zaGFyZWQnO1xyXG5pbXBvcnQgeyBOZXR3b3JrU2VydmljZSwgQ29ubmVjdGlvblN0YXRlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IE1WVERhdGFTb3VyY2VPcHRpb25zLCBYWVpEYXRhU291cmNlT3B0aW9ucywgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWZlYXR1cmUtZGV0YWlscycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ZlYXR1cmUtZGV0YWlscy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVEZXRhaWxzQ29tcG9uZW50IHtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0ZTogQ29ubmVjdGlvblN0YXRlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBmZWF0dXJlKCk6IEZlYXR1cmUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZlYXR1cmU7XHJcbiAgfVxyXG4gIHNldCBmZWF0dXJlKHZhbHVlOiBGZWF0dXJlKSB7XHJcbiAgICB0aGlzLl9mZWF0dXJlID0gdmFsdWU7XHJcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZmVhdHVyZTogRmVhdHVyZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5VGl0bGUodGhpcy5mZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBpY29uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5SWNvbih0aGlzLmZlYXR1cmUpIHx8ICdsaW5rJztcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxyXG4gICAgcHJpdmF0ZSBuZXR3b3JrU2VydmljZTogTmV0d29ya1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMubmV0d29ya1NlcnZpY2UuY3VycmVudFN0YXRlKCkuc3Vic2NyaWJlKChzdGF0ZTogQ29ubmVjdGlvblN0YXRlKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaHRtbFNhbml0aXplcih2YWx1ZSk6IFNhZmVSZXNvdXJjZVVybCB7XHJcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGlzT2JqZWN0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JztcclxuICB9XHJcblxyXG4gIGlzVXJsKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIHZhbHVlLnNsaWNlKDAsIDgpID09PSAnaHR0cHM6Ly8nIHx8IHZhbHVlLnNsaWNlKDAsIDcpID09PSAnaHR0cDovLydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbHRlckZlYXR1cmVQcm9wZXJ0aWVzKGZlYXR1cmUpIHtcclxuICAgIGxldCBzb3VyY2VPcHRpb25zO1xyXG4gICAgY29uc3QgYWxsb3dlZEZpZWxkc0FuZEFsaWFzID0gZmVhdHVyZS5tZXRhID8gZmVhdHVyZS5tZXRhLmFsaWFzIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oe30sIGZlYXR1cmUucHJvcGVydGllcyk7XHJcbiAgICBjb25zdCBsYXllck5hbWUgPSBmZWF0dXJlLm1ldGEudGl0bGU7XHJcbiAgICBjb25zdCBsYXllcnMgPSB0aGlzLm1hcFNlcnZpY2UuZ2V0TWFwKCkubGF5ZXJzJC52YWx1ZTtcclxuXHJcbiAgICBpZiAoYWxsb3dlZEZpZWxkc0FuZEFsaWFzKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLmZvckVhY2gocHJvcGVydHkgPT4ge1xyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhhbGxvd2VkRmllbGRzQW5kQWxpYXMpLmluZGV4T2YocHJvcGVydHkpID09PSAtMSkge1xyXG4gICAgICAgICAgZGVsZXRlIHByb3BlcnRpZXNbcHJvcGVydHldO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBwcm9wZXJ0aWVzW2FsbG93ZWRGaWVsZHNBbmRBbGlhc1twcm9wZXJ0eV1dID0gcHJvcGVydGllc1twcm9wZXJ0eV07XHJcbiAgICAgICAgICBpZiAoYWxsb3dlZEZpZWxkc0FuZEFsaWFzW3Byb3BlcnR5XSAhPT0gcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHByb3BlcnRpZXNbcHJvcGVydHldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xyXG4gICAgICAgIGlmIChsYXllci5kYXRhU291cmNlLm9wdGlvbnMudHlwZSA9PT0gJ212dCcpIHtcclxuICAgICAgICAgIHNvdXJjZU9wdGlvbnMgPSAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIE1WVERhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy50eXBlID09PSAneHl6Jykge1xyXG4gICAgICAgICAgc291cmNlT3B0aW9ucyA9IChsYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgWFlaRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLnR5cGUgPT09ICd2ZWN0b3InKSB7XHJcbiAgICAgICAgICBzb3VyY2VPcHRpb25zID0gKGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyBhcyBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbm5lY3Rpb24gJiYgc291cmNlT3B0aW9ucy5leGNsdWRlQXR0cmlidXRlKSB7XHJcbiAgICAgICAgICBjb25zdCBleGNsdWRlID0gc291cmNlT3B0aW9ucy5leGNsdWRlQXR0cmlidXRlO1xyXG4gICAgICAgICAgZXhjbHVkZS5mb3JFYWNoKGF0dHJpYnV0ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChsYXllck5hbWUgPT09IGxheWVyLnRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgZmVhdHVyZS5wcm9wZXJ0aWVzW2F0dHJpYnV0ZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuc3RhdGUuY29ubmVjdGlvbiAmJiBzb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lKSB7XHJcbiAgICAgICAgICBjb25zdCBleGNsdWRlQXR0cmlidXRlT2ZmbGluZSA9IHNvdXJjZU9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmU7XHJcbiAgICAgICAgICBleGNsdWRlQXR0cmlidXRlT2ZmbGluZS5mb3JFYWNoKGF0dHJpYnV0ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChsYXllck5hbWUgPT09IGxheWVyLnRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgZmVhdHVyZS5wcm9wZXJ0aWVzW2F0dHJpYnV0ZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmZWF0dXJlLnByb3BlcnRpZXM7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==