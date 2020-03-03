/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NetworkService } from '@igo2/core';
import { getEntityTitle, getEntityIcon } from '@igo2/common';
import { SearchSource } from '../../search/shared/sources/source';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9mZWF0dXJlL2ZlYXR1cmUtZGV0YWlscy9mZWF0dXJlLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFFN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRWxFO0lBNENFLGlDQUNVLEtBQXdCLEVBQ3hCLFNBQXVCLEVBQ3ZCLGNBQThCO1FBSHhDLGlCQVFDO1FBUFMsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxLQUFzQjtZQUNsRSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUEzQ0Qsc0JBQ0ksMkNBQU07Ozs7UUFEVjtZQUVFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDOzs7OztRQUNELFVBQVcsS0FBbUI7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM3QixDQUFDOzs7T0FKQTtJQU1ELHNCQUNJ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K0M7b0JBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBZkMsaUJBQWlCO2dCQUVWLFlBQVk7Z0JBQ1osY0FBYzs7O3lCQWdCcEIsS0FBSzswQkFTTCxLQUFLOztJQThFUiw4QkFBQztDQUFBLEFBaEdELElBZ0dDO1NBMUZZLHVCQUF1Qjs7Ozs7O0lBQ2xDLHdDQUErQjs7Ozs7SUFvQi9CLDJDQUEwQjs7Ozs7SUFDMUIsMENBQThCOzs7OztJQWlCNUIsd0NBQWdDOzs7OztJQUNoQyw0Q0FBK0I7Ozs7O0lBQy9CLGlEQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IE5ldHdvcmtTZXJ2aWNlLCBDb25uZWN0aW9uU3RhdGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IGdldEVudGl0eVRpdGxlLCBnZXRFbnRpdHlJY29uIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi9zaGFyZWQnO1xyXG5pbXBvcnQgeyBTZWFyY2hTb3VyY2UgfSBmcm9tICcuLi8uLi9zZWFyY2gvc2hhcmVkL3NvdXJjZXMvc291cmNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWZlYXR1cmUtZGV0YWlscycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ZlYXR1cmUtZGV0YWlscy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZmVhdHVyZS1kZXRhaWxzLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVEZXRhaWxzQ29tcG9uZW50IHtcclxuICBwcml2YXRlIHN0YXRlOiBDb25uZWN0aW9uU3RhdGU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNvdXJjZSgpOiBTZWFyY2hTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NvdXJjZTtcclxuICB9XHJcbiAgc2V0IHNvdXJjZSh2YWx1ZTogU2VhcmNoU291cmNlICkge1xyXG4gICAgdGhpcy5fc291cmNlID0gdmFsdWU7XHJcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGZlYXR1cmUoKTogRmVhdHVyZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmVhdHVyZTtcclxuICB9XHJcbiAgc2V0IGZlYXR1cmUodmFsdWU6IEZlYXR1cmUpIHtcclxuICAgIHRoaXMuX2ZlYXR1cmUgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZmVhdHVyZTogRmVhdHVyZTtcclxuICBwcml2YXRlIF9zb3VyY2U6IFNlYXJjaFNvdXJjZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5VGl0bGUodGhpcy5mZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBpY29uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5SWNvbih0aGlzLmZlYXR1cmUpIHx8ICdsaW5rJztcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxyXG4gICAgcHJpdmF0ZSBuZXR3b3JrU2VydmljZTogTmV0d29ya1NlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMubmV0d29ya1NlcnZpY2UuY3VycmVudFN0YXRlKCkuc3Vic2NyaWJlKChzdGF0ZTogQ29ubmVjdGlvblN0YXRlKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaHRtbFNhbml0aXplcih2YWx1ZSk6IFNhZmVSZXNvdXJjZVVybCB7XHJcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGlzT2JqZWN0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JztcclxuICB9XHJcblxyXG4gIGlzVXJsKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIHZhbHVlLnNsaWNlKDAsIDgpID09PSAnaHR0cHM6Ly8nIHx8IHZhbHVlLnNsaWNlKDAsIDcpID09PSAnaHR0cDovLydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbHRlckZlYXR1cmVQcm9wZXJ0aWVzKGZlYXR1cmUpIHtcclxuICAgIGNvbnN0IGFsbG93ZWRGaWVsZHNBbmRBbGlhcyA9IGZlYXR1cmUubWV0YSA/IGZlYXR1cmUubWV0YS5hbGlhcyA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7fTtcclxuXHJcbiAgICBpZiAoYWxsb3dlZEZpZWxkc0FuZEFsaWFzKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKGFsbG93ZWRGaWVsZHNBbmRBbGlhcykuZm9yRWFjaChmaWVsZCA9PiB7XHJcbiAgICAgICAgcHJvcGVydGllc1thbGxvd2VkRmllbGRzQW5kQWxpYXNbZmllbGRdXSA9IGZlYXR1cmUucHJvcGVydGllc1tmaWVsZF07XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcHJvcGVydGllcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGlvbiAmJiBmZWF0dXJlLm1ldGEgJiYgZmVhdHVyZS5tZXRhLmV4Y2x1ZGVBdHRyaWJ1dGUpIHtcclxuICAgICAgICAgIGNvbnN0IGV4Y2x1ZGVBdHRyaWJ1dGUgPSBmZWF0dXJlLm1ldGEuZXhjbHVkZUF0dHJpYnV0ZTtcclxuICAgICAgICAgIGV4Y2x1ZGVBdHRyaWJ1dGUuZm9yRWFjaChhdHRyaWJ1dGUgPT4ge1xyXG4gICAgICAgICAgICBkZWxldGUgZmVhdHVyZS5wcm9wZXJ0aWVzW2F0dHJpYnV0ZV07XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLmNvbm5lY3Rpb24gJiYgZmVhdHVyZS5tZXRhICYmIGZlYXR1cmUubWV0YS5leGNsdWRlQXR0cmlidXRlT2ZmbGluZSkge1xyXG4gICAgICAgICAgY29uc3QgZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmUgPSBmZWF0dXJlLm1ldGEuZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmU7XHJcbiAgICAgICAgICBleGNsdWRlQXR0cmlidXRlT2ZmbGluZS5mb3JFYWNoKGF0dHJpYnV0ZSA9PiB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBmZWF0dXJlLnByb3BlcnRpZXNbYXR0cmlidXRlXTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmVhdHVyZS5wcm9wZXJ0aWVzO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=