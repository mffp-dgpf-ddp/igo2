/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, HostListener, EventEmitter } from '@angular/core';
import { MessageService, LanguageService } from '@igo2/core';
import { DragAndDropDirective } from '@igo2/common';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { ImportService } from './import.service';
import { handleFileImportSuccess, handleFileImportError } from '../shared/import.utils';
var DropGeoFileDirective = /** @class */ (function (_super) {
    tslib_1.__extends(DropGeoFileDirective, _super);
    function DropGeoFileDirective(component, importService, languageService, messageService) {
        var _this = _super.call(this) || this;
        _this.component = component;
        _this.importService = importService;
        _this.languageService = languageService;
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
        handleFileImportSuccess(file, features, this.map, this.messageService, this.languageService);
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
    DropGeoFileDirective.prototype.messageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcC1nZW8tZmlsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvZHJvcC1nZW8tZmlsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBSXpGLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzdELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUlwRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFeEY7SUFHMEMsZ0RBQW9CO0lBVzVELDhCQUNVLFNBQThCLEVBQzlCLGFBQTRCLEVBQzVCLGVBQWdDLEVBQ2hDLGNBQThCO1FBSnhDLFlBTUUsaUJBQU8sU0FDUjtRQU5TLGVBQVMsR0FBVCxTQUFTLENBQXFCO1FBQzlCLG1CQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHFCQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxvQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFiOUIsa0JBQVksR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4RCxrQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDOztJQWVsRSxDQUFDO0lBWEQsc0JBQUkscUNBQUc7Ozs7UUFBUDtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7Ozs7SUFXRCx1Q0FBUTs7O0lBQVI7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxLQUFhO1lBQzlELEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsMENBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUdNLHlDQUFVOzs7O0lBRGpCLFVBQ2tCLEdBQUc7UUFDbkIsaUJBQU0sVUFBVSxZQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBR00sMENBQVc7Ozs7SUFEbEIsVUFDbUIsR0FBRztRQUNwQixpQkFBTSxXQUFXLFlBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFHTSxxQ0FBTTs7OztJQURiLFVBQ2MsR0FBRztRQUNmLGlCQUFNLE1BQU0sWUFBQyxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDOzs7Ozs7SUFFTyw2Q0FBYzs7Ozs7SUFBdEIsVUFBdUIsS0FBYTtRQUFwQyxpQkFTQzs7Z0NBUlksSUFBSTtZQUNiLE9BQUssYUFBYTtpQkFDZixNQUFNLENBQUMsSUFBSSxDQUFDO2lCQUNaLFNBQVM7Ozs7WUFDUixVQUFDLFFBQW1CLElBQUssT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUF4QyxDQUF3Qzs7OztZQUNqRSxVQUFDLEtBQVksSUFBSyxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQW5DLENBQW1DLEVBQ3RELENBQUM7Ozs7WUFOTixLQUFtQixJQUFBLFVBQUEsaUJBQUEsS0FBSyxDQUFBLDRCQUFBO2dCQUFuQixJQUFNLElBQUksa0JBQUE7d0JBQUosSUFBSTthQU9kOzs7Ozs7Ozs7SUFDSCxDQUFDOzs7Ozs7O0lBRU8sa0RBQW1COzs7Ozs7SUFBM0IsVUFBNEIsSUFBVSxFQUFFLFFBQW1CO1FBQ3pELHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvRixDQUFDOzs7Ozs7O0lBRU8sZ0RBQWlCOzs7Ozs7SUFBekIsVUFBMEIsSUFBVSxFQUFFLEtBQVk7UUFDaEQscUJBQXFCLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNoRixDQUFDOztnQkFqRUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7aUJBQzdCOzs7O2dCQU5RLG1CQUFtQjtnQkFDbkIsYUFBYTtnQkFORyxlQUFlO2dCQUEvQixjQUFjOzs7NkJBMENwQixZQUFZLFNBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDOzhCQUtuQyxZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO3lCQUtwQyxZQUFZLFNBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDOztJQXVCbEMsMkJBQUM7Q0FBQSxBQWxFRCxDQUcwQyxvQkFBb0IsR0ErRDdEO1NBL0RZLG9CQUFvQjs7Ozs7O0lBRS9CLDRDQUFrRTs7Ozs7SUFDbEUsNENBQWtFOzs7OztJQUVsRSw4Q0FBcUM7Ozs7O0lBT25DLHlDQUFzQzs7Ozs7SUFDdEMsNkNBQW9DOzs7OztJQUNwQywrQ0FBd0M7Ozs7O0lBQ3hDLDhDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgRHJhZ0FuZERyb3BEaXJlY3RpdmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgTWFwQnJvd3NlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL21hcC9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJbXBvcnRTZXJ2aWNlIH0gZnJvbSAnLi9pbXBvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzLCBoYW5kbGVGaWxlSW1wb3J0RXJyb3IgfSBmcm9tICcuLi9zaGFyZWQvaW1wb3J0LnV0aWxzJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb0Ryb3BHZW9GaWxlXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERyb3BHZW9GaWxlRGlyZWN0aXZlIGV4dGVuZHMgRHJhZ0FuZERyb3BEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIHByb3RlY3RlZCBmaWxlc0Ryb3BwZWQ6IEV2ZW50RW1pdHRlcjxGaWxlW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHByb3RlY3RlZCBmaWxlc0ludmFsaWQ6IEV2ZW50RW1pdHRlcjxGaWxlW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBwcml2YXRlIGZpbGVzRHJvcHBlZCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBpbXBvcnRTZXJ2aWNlOiBJbXBvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmZpbGVzRHJvcHBlZCQkID0gdGhpcy5maWxlc0Ryb3BwZWQuc3Vic2NyaWJlKChmaWxlczogRmlsZVtdKSA9PiB7XHJcbiAgICAgIHRoaXMub25GaWxlc0Ryb3BwZWQoZmlsZXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZmlsZXNEcm9wcGVkJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25EcmFnT3ZlcihldnQpIHtcclxuICAgIHN1cGVyLm9uRHJhZ092ZXIoZXZ0KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uRHJhZ0xlYXZlKGV2dCkge1xyXG4gICAgc3VwZXIub25EcmFnTGVhdmUoZXZ0KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxyXG4gIHB1YmxpYyBvbkRyb3AoZXZ0KSB7XHJcbiAgICBzdXBlci5vbkRyb3AoZXZ0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25GaWxlc0Ryb3BwZWQoZmlsZXM6IEZpbGVbXSkge1xyXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XHJcbiAgICAgIHRoaXMuaW1wb3J0U2VydmljZVxyXG4gICAgICAgIC5pbXBvcnQoZmlsZSlcclxuICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHRoaXMub25GaWxlSW1wb3J0U3VjY2VzcyhmaWxlLCBmZWF0dXJlcyksXHJcbiAgICAgICAgICAoZXJyb3I6IEVycm9yKSA9PiB0aGlzLm9uRmlsZUltcG9ydEVycm9yKGZpbGUsIGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZTogRmlsZSwgZmVhdHVyZXM6IEZlYXR1cmVbXSkge1xyXG4gICAgaGFuZGxlRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZSwgZmVhdHVyZXMsIHRoaXMubWFwLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUltcG9ydEVycm9yKGZpbGU6IEZpbGUsIGVycm9yOiBFcnJvcikge1xyXG4gICAgaGFuZGxlRmlsZUltcG9ydEVycm9yKGZpbGUsIGVycm9yLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==