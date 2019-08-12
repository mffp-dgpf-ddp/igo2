/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Base search source class
 */
export class SearchSource {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = Object.assign({}, this.getDefaultOptions(), options);
    }
    /**
     * Get search source's id
     * @return {?} Search source's id
     */
    getId() {
        throw new Error('You have to implement the method "getId".');
    }
    /**
     * Get search source's default options
     * @protected
     * @return {?} Search source default options
     */
    getDefaultOptions() {
        throw new Error('You have to implement the method "getDefaultOptions".');
    }
    /**
     * Search source's title
     * @return {?}
     */
    get title() {
        return this.options.title;
    }
    /**
     * Whether the search source is available
     * @return {?}
     */
    get available() {
        return this.options.available !== false;
    }
    /**
     * Whether the search source is enabled
     * @param {?} value
     * @return {?}
     */
    set enabled(value) {
        this.options.enabled = value;
    }
    /**
     * @return {?}
     */
    get enabled() {
        return this.available && this.options.enabled !== false;
    }
    /**
     * Search url
     * @return {?}
     */
    get searchUrl() {
        return this.options.searchUrl;
    }
    /**
     * Search query params
     * @return {?}
     */
    get params() {
        return this.options.params === undefined ? {} : this.options.params;
    }
    /**
     * Search results display order
     * @return {?}
     */
    get displayOrder() {
        return this.options.order === undefined ? 99 : this.options.order;
    }
}
/**
 * Search source ID
 * \@internal
 */
SearchSource.id = '';
/**
 * Search source type
 * \@internal
 */
SearchSource.type = '';
if (false) {
    /**
     * Search source ID
     * \@internal
     * @type {?}
     */
    SearchSource.id;
    /**
     * Search source type
     * \@internal
     * @type {?}
     */
    SearchSource.type;
    /**
     * Search source options
     * \@internal
     * @type {?}
     * @protected
     */
    SearchSource.prototype.options;
}
/**
 * Search sources that allow searching by text implement this class
 * @record
 */
export function TextSearch() { }
if (false) {
    /**
     * Search by text
     * @param {?} term Text
     * @param {?=} options
     * @return {?} Observable or search results
     */
    TextSearch.prototype.search = function (term, options) { };
}
/**
 * Search sources that allow searching by coordinates implement this class
 * @record
 */
export function ReverseSearch() { }
if (false) {
    /**
     * Search by text
     * @param {?} lonLat Coordinates
     * @param {?=} options
     * @return {?} Observable or search results
     */
    ReverseSearch.prototype.reverseSearch = function (lonLat, options) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC9zaGFyZWQvc291cmNlcy9zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVlBLE1BQU0sT0FBTyxZQUFZOzs7O0lBZ0Z2QixZQUFZLE9BQTRCO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7Ozs7SUEzREQsS0FBSztRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7Ozs7SUFNUyxpQkFBaUI7UUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO0lBQzNFLENBQUM7Ozs7O0lBS0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUM1QixDQUFDOzs7OztJQUtELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDO0lBQzFDLENBQUM7Ozs7OztJQUtELElBQUksT0FBTyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7Ozs7SUFDRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDO0lBQzFELENBQUM7Ozs7O0lBS0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUtELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ3RFLENBQUM7Ozs7O0lBS0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDcEUsQ0FBQzs7Ozs7O0FBekVNLGVBQUUsR0FBRyxFQUFFLENBQUM7Ozs7O0FBTVIsaUJBQUksR0FBRyxFQUFFLENBQUM7Ozs7Ozs7SUFOakIsZ0JBQWU7Ozs7OztJQU1mLGtCQUFpQjs7Ozs7OztJQU1qQiwrQkFBdUM7Ozs7OztBQXVFekMsZ0NBVUM7Ozs7Ozs7O0lBSkMsMkRBRzhCOzs7Ozs7QUFNaEMsbUNBV0M7Ozs7Ozs7O0lBSkMsdUVBRzhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQge1xyXG4gIFNlYXJjaFNvdXJjZU9wdGlvbnMsXHJcbiAgVGV4dFNlYXJjaE9wdGlvbnMsXHJcbiAgUmV2ZXJzZVNlYXJjaE9wdGlvbnNcclxufSBmcm9tICcuL3NvdXJjZS5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBCYXNlIHNlYXJjaCBzb3VyY2UgY2xhc3NcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hTb3VyY2Uge1xyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBzb3VyY2UgSURcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzdGF0aWMgaWQgPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHNvdXJjZSB0eXBlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgc3RhdGljIHR5cGUgPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHNvdXJjZSBvcHRpb25zXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIG9wdGlvbnM6IFNlYXJjaFNvdXJjZU9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBzZWFyY2ggc291cmNlJ3MgaWRcclxuICAgKiBAcmV0dXJucyBTZWFyY2ggc291cmNlJ3MgaWRcclxuICAgKi9cclxuICBnZXRJZCgpOiBzdHJpbmcge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgaGF2ZSB0byBpbXBsZW1lbnQgdGhlIG1ldGhvZCBcImdldElkXCIuJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgc2VhcmNoIHNvdXJjZSdzIGRlZmF1bHQgb3B0aW9uc1xyXG4gICAqIEByZXR1cm5zIFNlYXJjaCBzb3VyY2UgZGVmYXVsdCBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGdldERlZmF1bHRPcHRpb25zKCk6IFNlYXJjaFNvdXJjZU9wdGlvbnMge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgaGF2ZSB0byBpbXBsZW1lbnQgdGhlIG1ldGhvZCBcImdldERlZmF1bHRPcHRpb25zXCIuJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggc291cmNlJ3MgdGl0bGVcclxuICAgKi9cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudGl0bGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBzZWFyY2ggc291cmNlIGlzIGF2YWlsYWJsZVxyXG4gICAqL1xyXG4gIGdldCBhdmFpbGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmF2YWlsYWJsZSAhPT0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBzZWFyY2ggc291cmNlIGlzIGVuYWJsZWRcclxuICAgKi9cclxuICBzZXQgZW5hYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5vcHRpb25zLmVuYWJsZWQgPSB2YWx1ZTtcclxuICB9XHJcbiAgZ2V0IGVuYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5hdmFpbGFibGUgJiYgdGhpcy5vcHRpb25zLmVuYWJsZWQgIT09IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHVybFxyXG4gICAqL1xyXG4gIGdldCBzZWFyY2hVcmwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2VhcmNoVXJsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHF1ZXJ5IHBhcmFtc1xyXG4gICAqL1xyXG4gIGdldCBwYXJhbXMoKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnBhcmFtcyA9PT0gdW5kZWZpbmVkID8ge30gOiB0aGlzLm9wdGlvbnMucGFyYW1zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIHJlc3VsdHMgZGlzcGxheSBvcmRlclxyXG4gICAqL1xyXG4gIGdldCBkaXNwbGF5T3JkZXIoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMub3JkZXIgPT09IHVuZGVmaW5lZCA/IDk5IDogdGhpcy5vcHRpb25zLm9yZGVyO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogU2VhcmNoU291cmNlT3B0aW9ucykge1xyXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5nZXREZWZhdWx0T3B0aW9ucygpLCBvcHRpb25zKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZWFyY2ggc291cmNlcyB0aGF0IGFsbG93IHNlYXJjaGluZyBieSB0ZXh0IGltcGxlbWVudCB0aGlzIGNsYXNzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRleHRTZWFyY2gge1xyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBieSB0ZXh0XHJcbiAgICogQHBhcmFtIHRlcm0gVGV4dFxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb3Igc2VhcmNoIHJlc3VsdHNcclxuICAgKi9cclxuICBzZWFyY2goXHJcbiAgICB0ZXJtOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICBvcHRpb25zPzogVGV4dFNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdFtdPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNlYXJjaCBzb3VyY2VzIHRoYXQgYWxsb3cgc2VhcmNoaW5nIGJ5IGNvb3JkaW5hdGVzIGltcGxlbWVudCB0aGlzIGNsYXNzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFJldmVyc2VTZWFyY2gge1xyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBieSB0ZXh0XHJcbiAgICogQHBhcmFtIGxvbkxhdCBDb29yZGluYXRlc1xyXG4gICAqIEBwYXJhbSBkaXN0YW5jZSBPcHRpb25hbDogU2VhcmNoIHJhZGl1cyBhcm91bmYgbG9uTGF0XHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvciBzZWFyY2ggcmVzdWx0c1xyXG4gICAqL1xyXG4gIHJldmVyc2VTZWFyY2goXHJcbiAgICBsb25MYXQ6IFtudW1iZXIsIG51bWJlcl0sXHJcbiAgICBvcHRpb25zPzogUmV2ZXJzZVNlYXJjaE9wdGlvbnNcclxuICApOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdFtdPjtcclxufVxyXG4iXX0=