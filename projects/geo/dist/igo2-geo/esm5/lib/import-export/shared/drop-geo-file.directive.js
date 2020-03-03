/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, HostListener, EventEmitter } from '@angular/core';
import { MessageService, LanguageService, ConfigService } from '@igo2/core';
import { DragAndDropDirective } from '@igo2/common';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { ImportService } from './import.service';
import { handleFileImportSuccess, handleFileImportError } from '../shared/import.utils';
import { StyleService } from '../../layer/shared/style.service';
import { StyleListService } from '../style-list/style-list.service';
var DropGeoFileDirective = /** @class */ (function (_super) {
    tslib_1.__extends(DropGeoFileDirective, _super);
    function DropGeoFileDirective(component, importService, languageService, styleListService, styleService, config, messageService) {
        var _this = _super.call(this) || this;
        _this.component = component;
        _this.importService = importService;
        _this.languageService = languageService;
        _this.styleListService = styleListService;
        _this.styleService = styleService;
        _this.config = config;
        _this.messageService = messageService;
        _this.filesDropped = new EventEmitter();
        _this.filesInvalid = new EventEmitter();
        return _this;
    }
    Object.defineProperty(DropGeoFileDirective.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this.component.map;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DropGeoFileDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.filesDropped$$ = this.filesDropped.subscribe((/**
         * @param {?} files
         * @return {?}
         */
        function (files) {
            _this.onFilesDropped(files);
        }));
    };
    /**
     * @return {?}
     */
    DropGeoFileDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.filesDropped$$.unsubscribe();
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    DropGeoFileDirective.prototype.onDragOver = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        _super.prototype.onDragOver.call(this, evt);
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    DropGeoFileDirective.prototype.onDragLeave = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        _super.prototype.onDragLeave.call(this, evt);
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    DropGeoFileDirective.prototype.onDrop = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        _super.prototype.onDrop.call(this, evt);
    };
    /**
     * @private
     * @param {?} files
     * @return {?}
     */
    DropGeoFileDirective.prototype.onFilesDropped = /**
     * @private
     * @param {?} files
     * @return {?}
     */
    function (files) {
        var _this = this;
        var e_1, _a;
        var _loop_1 = function (file) {
            this_1.importService
                .import(file)
                .subscribe((/**
             * @param {?} features
             * @return {?}
             */
            function (features) { return _this.onFileImportSuccess(file, features); }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return _this.onFileImportError(file, error); }));
        };
        var this_1 = this;
        try {
            for (var files_1 = tslib_1.__values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                var file = files_1_1.value;
                _loop_1(file);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * @private
     * @param {?} file
     * @param {?} features
     * @return {?}
     */
    DropGeoFileDirective.prototype.onFileImportSuccess = /**
     * @private
     * @param {?} file
     * @param {?} features
     * @return {?}
     */
    function (file, features) {
        if (!this.config.getConfig('importWithStyle')) {
            handleFileImportSuccess(file, features, this.map, this.messageService, this.languageService);
        }
        else {
            handleFileImportSuccess(file, features, this.map, this.messageService, this.languageService, this.styleListService, this.styleService);
        }
    };
    /**
     * @private
     * @param {?} file
     * @param {?} error
     * @return {?}
     */
    DropGeoFileDirective.prototype.onFileImportError = /**
     * @private
     * @param {?} file
     * @param {?} error
     * @return {?}
     */
    function (file, error) {
        handleFileImportError(file, error, this.messageService, this.languageService);
    };
    DropGeoFileDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoDropGeoFile]'
                },] }
    ];
    /** @nocollapse */
    DropGeoFileDirective.ctorParameters = function () { return [
        { type: MapBrowserComponent },
        { type: ImportService },
        { type: LanguageService },
        { type: StyleListService },
        { type: StyleService },
        { type: ConfigService },
        { type: MessageService }
    ]; };
    DropGeoFileDirective.propDecorators = {
        onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
        onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
        onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
    };
    return DropGeoFileDirective;
}(DragAndDropDirective));
export { DropGeoFileDirective };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    DropGeoFileDirective.prototype.filesDropped;
    /**
     * @type {?}
     * @protected
     */
    DropGeoFileDirective.prototype.filesInvalid;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.filesDropped$$;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.importService;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.styleListService;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.styleService;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.config;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.messageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcC1nZW8tZmlsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvZHJvcC1nZW8tZmlsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBSXpGLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJcEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVwRTtJQUcwQyxnREFBb0I7SUFXNUQsOEJBQ1UsU0FBOEIsRUFDOUIsYUFBNEIsRUFDNUIsZUFBZ0MsRUFDaEMsZ0JBQWtDLEVBQ2xDLFlBQTBCLEVBQzFCLE1BQXFCLEVBQ3JCLGNBQThCO1FBUHhDLFlBU0UsaUJBQU8sU0FDUjtRQVRTLGVBQVMsR0FBVCxTQUFTLENBQXFCO1FBQzlCLG1CQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHFCQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGtCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFlBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsb0JBQWMsR0FBZCxjQUFjLENBQWdCO1FB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LFFBQVEsQ0FBQzt5QkFLcEMsWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUE0QmxDLDJCQUFDO0NBQUEsQUExRUQsQ0FHMEMsb0JBQW9CLEdBdUU3RDtTQXZFWSxvQkFBb0I7Ozs7OztJQUUvQiw0Q0FBa0U7Ozs7O0lBQ2xFLDRDQUFrRTs7Ozs7SUFFbEUsOENBQXFDOzs7OztJQU9uQyx5Q0FBc0M7Ozs7O0lBQ3RDLDZDQUFvQzs7Ozs7SUFDcEMsK0NBQXdDOzs7OztJQUN4QyxnREFBMEM7Ozs7O0lBQzFDLDRDQUFrQzs7Ozs7SUFDbEMsc0NBQTZCOzs7OztJQUM3Qiw4Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IERyYWdBbmREcm9wRGlyZWN0aXZlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9tYXAvbWFwLWJyb3dzZXIvbWFwLWJyb3dzZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSW1wb3J0U2VydmljZSB9IGZyb20gJy4vaW1wb3J0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBoYW5kbGVGaWxlSW1wb3J0U3VjY2VzcywgaGFuZGxlRmlsZUltcG9ydEVycm9yIH0gZnJvbSAnLi4vc2hhcmVkL2ltcG9ydC51dGlscyc7XHJcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9zdHlsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3R5bGVMaXN0U2VydmljZSB9IGZyb20gJy4uL3N0eWxlLWxpc3Qvc3R5bGUtbGlzdC5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb0Ryb3BHZW9GaWxlXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERyb3BHZW9GaWxlRGlyZWN0aXZlIGV4dGVuZHMgRHJhZ0FuZERyb3BEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIHByb3RlY3RlZCBmaWxlc0Ryb3BwZWQ6IEV2ZW50RW1pdHRlcjxGaWxlW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHByb3RlY3RlZCBmaWxlc0ludmFsaWQ6IEV2ZW50RW1pdHRlcjxGaWxlW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBwcml2YXRlIGZpbGVzRHJvcHBlZCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBpbXBvcnRTZXJ2aWNlOiBJbXBvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgc3R5bGVMaXN0U2VydmljZTogU3R5bGVMaXN0U2VydmljZSxcclxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmZpbGVzRHJvcHBlZCQkID0gdGhpcy5maWxlc0Ryb3BwZWQuc3Vic2NyaWJlKChmaWxlczogRmlsZVtdKSA9PiB7XHJcbiAgICAgIHRoaXMub25GaWxlc0Ryb3BwZWQoZmlsZXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZmlsZXNEcm9wcGVkJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25EcmFnT3ZlcihldnQpIHtcclxuICAgIHN1cGVyLm9uRHJhZ092ZXIoZXZ0KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uRHJhZ0xlYXZlKGV2dCkge1xyXG4gICAgc3VwZXIub25EcmFnTGVhdmUoZXZ0KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxyXG4gIHB1YmxpYyBvbkRyb3AoZXZ0KSB7XHJcbiAgICBzdXBlci5vbkRyb3AoZXZ0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25GaWxlc0Ryb3BwZWQoZmlsZXM6IEZpbGVbXSkge1xyXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XHJcbiAgICAgIHRoaXMuaW1wb3J0U2VydmljZVxyXG4gICAgICAgIC5pbXBvcnQoZmlsZSlcclxuICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHRoaXMub25GaWxlSW1wb3J0U3VjY2VzcyhmaWxlLCBmZWF0dXJlcyksXHJcbiAgICAgICAgICAoZXJyb3I6IEVycm9yKSA9PiB0aGlzLm9uRmlsZUltcG9ydEVycm9yKGZpbGUsIGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZTogRmlsZSwgZmVhdHVyZXM6IEZlYXR1cmVbXSkge1xyXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2ltcG9ydFdpdGhTdHlsZScpKSB7XHJcbiAgICAgIGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzKGZpbGUsIGZlYXR1cmVzLCB0aGlzLm1hcCwgdGhpcy5tZXNzYWdlU2VydmljZSwgdGhpcy5sYW5ndWFnZVNlcnZpY2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaGFuZGxlRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZSwgZmVhdHVyZXMsIHRoaXMubWFwLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVMaXN0U2VydmljZSwgdGhpcy5zdHlsZVNlcnZpY2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbGVJbXBvcnRFcnJvcihmaWxlOiBGaWxlLCBlcnJvcjogRXJyb3IpIHtcclxuICAgIGhhbmRsZUZpbGVJbXBvcnRFcnJvcihmaWxlLCBlcnJvciwgdGhpcy5tZXNzYWdlU2VydmljZSwgdGhpcy5sYW5ndWFnZVNlcnZpY2UpO1xyXG4gIH1cclxufVxyXG4iXX0=