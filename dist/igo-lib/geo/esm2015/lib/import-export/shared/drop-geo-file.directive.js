/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, EventEmitter } from '@angular/core';
import { MessageService, LanguageService } from '@igo2/core';
import { DragAndDropDirective } from '@igo2/common';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { ImportService } from './import.service';
import { handleFileImportSuccess, handleFileImportError } from '../shared/import.utils';
export class DropGeoFileDirective extends DragAndDropDirective {
    /**
     * @param {?} component
     * @param {?} importService
     * @param {?} languageService
     * @param {?} messageService
     */
    constructor(component, importService, languageService, messageService) {
        super();
        this.component = component;
        this.importService = importService;
        this.languageService = languageService;
        this.messageService = messageService;
        this.filesDropped = new EventEmitter();
        this.filesInvalid = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get map() {
        return this.component.map;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.filesDropped$$ = this.filesDropped.subscribe((/**
         * @param {?} files
         * @return {?}
         */
        (files) => {
            this.onFilesDropped(files);
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.filesDropped$$.unsubscribe();
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragOver(evt) {
        super.onDragOver(evt);
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragLeave(evt) {
        super.onDragLeave(evt);
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDrop(evt) {
        super.onDrop(evt);
    }
    /**
     * @private
     * @param {?} files
     * @return {?}
     */
    onFilesDropped(files) {
        for (const file of files) {
            this.importService
                .import(file)
                .subscribe((/**
             * @param {?} features
             * @return {?}
             */
            (features) => this.onFileImportSuccess(file, features)), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => this.onFileImportError(file, error)));
        }
    }
    /**
     * @private
     * @param {?} file
     * @param {?} features
     * @return {?}
     */
    onFileImportSuccess(file, features) {
        handleFileImportSuccess(file, features, this.map, this.messageService, this.languageService);
    }
    /**
     * @private
     * @param {?} file
     * @param {?} error
     * @return {?}
     */
    onFileImportError(file, error) {
        handleFileImportError(file, error, this.messageService, this.languageService);
    }
}
DropGeoFileDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoDropGeoFile]'
            },] }
];
/** @nocollapse */
DropGeoFileDirective.ctorParameters = () => [
    { type: MapBrowserComponent },
    { type: ImportService },
    { type: LanguageService },
    { type: MessageService }
];
DropGeoFileDirective.propDecorators = {
    onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
    onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcC1nZW8tZmlsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvZHJvcC1nZW8tZmlsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFJekYsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBSXBELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUt4RixNQUFNLE9BQU8sb0JBQXFCLFNBQVEsb0JBQW9COzs7Ozs7O0lBVzVELFlBQ1UsU0FBOEIsRUFDOUIsYUFBNEIsRUFDNUIsZUFBZ0MsRUFDaEMsY0FBOEI7UUFFdEMsS0FBSyxFQUFFLENBQUM7UUFMQSxjQUFTLEdBQVQsU0FBUyxDQUFxQjtRQUM5QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBYjlCLGlCQUFZLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEQsaUJBQVksR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWVsRSxDQUFDOzs7O0lBWEQsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztJQUM1QixDQUFDOzs7O0lBV0QsUUFBUTtRQUNOLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRTtZQUNsRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBR00sVUFBVSxDQUFDLEdBQUc7UUFDbkIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUdNLFdBQVcsQ0FBQyxHQUFHO1FBQ3BCLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFHTSxNQUFNLENBQUMsR0FBRztRQUNmLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQzs7Ozs7O0lBRU8sY0FBYyxDQUFDLEtBQWE7UUFDbEMsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWE7aUJBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQztpQkFDWixTQUFTOzs7O1lBQ1IsQ0FBQyxRQUFtQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQzs7OztZQUNqRSxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFDdEQsQ0FBQztTQUNMO0lBQ0gsQ0FBQzs7Ozs7OztJQUVPLG1CQUFtQixDQUFDLElBQVUsRUFBRSxRQUFtQjtRQUN6RCx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDL0YsQ0FBQzs7Ozs7OztJQUVPLGlCQUFpQixDQUFDLElBQVUsRUFBRSxLQUFZO1FBQ2hELHFCQUFxQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDaEYsQ0FBQzs7O1lBakVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2FBQzdCOzs7O1lBTlEsbUJBQW1CO1lBQ25CLGFBQWE7WUFORyxlQUFlO1lBQS9CLGNBQWM7Ozt5QkEwQ3BCLFlBQVksU0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBS25DLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7cUJBS3BDLFlBQVksU0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7SUF0Q2hDLDRDQUFrRTs7Ozs7SUFDbEUsNENBQWtFOzs7OztJQUVsRSw4Q0FBcUM7Ozs7O0lBT25DLHlDQUFzQzs7Ozs7SUFDdEMsNkNBQW9DOzs7OztJQUNwQywrQ0FBd0M7Ozs7O0lBQ3hDLDhDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgRHJhZ0FuZERyb3BEaXJlY3RpdmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgTWFwQnJvd3NlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL21hcC9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJbXBvcnRTZXJ2aWNlIH0gZnJvbSAnLi9pbXBvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzLCBoYW5kbGVGaWxlSW1wb3J0RXJyb3IgfSBmcm9tICcuLi9zaGFyZWQvaW1wb3J0LnV0aWxzJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb0Ryb3BHZW9GaWxlXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERyb3BHZW9GaWxlRGlyZWN0aXZlIGV4dGVuZHMgRHJhZ0FuZERyb3BEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIHByb3RlY3RlZCBmaWxlc0Ryb3BwZWQ6IEV2ZW50RW1pdHRlcjxGaWxlW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHByb3RlY3RlZCBmaWxlc0ludmFsaWQ6IEV2ZW50RW1pdHRlcjxGaWxlW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBwcml2YXRlIGZpbGVzRHJvcHBlZCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBpbXBvcnRTZXJ2aWNlOiBJbXBvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmZpbGVzRHJvcHBlZCQkID0gdGhpcy5maWxlc0Ryb3BwZWQuc3Vic2NyaWJlKChmaWxlczogRmlsZVtdKSA9PiB7XHJcbiAgICAgIHRoaXMub25GaWxlc0Ryb3BwZWQoZmlsZXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZmlsZXNEcm9wcGVkJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25EcmFnT3ZlcihldnQpIHtcclxuICAgIHN1cGVyLm9uRHJhZ092ZXIoZXZ0KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uRHJhZ0xlYXZlKGV2dCkge1xyXG4gICAgc3VwZXIub25EcmFnTGVhdmUoZXZ0KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxyXG4gIHB1YmxpYyBvbkRyb3AoZXZ0KSB7XHJcbiAgICBzdXBlci5vbkRyb3AoZXZ0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25GaWxlc0Ryb3BwZWQoZmlsZXM6IEZpbGVbXSkge1xyXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XHJcbiAgICAgIHRoaXMuaW1wb3J0U2VydmljZVxyXG4gICAgICAgIC5pbXBvcnQoZmlsZSlcclxuICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHRoaXMub25GaWxlSW1wb3J0U3VjY2VzcyhmaWxlLCBmZWF0dXJlcyksXHJcbiAgICAgICAgICAoZXJyb3I6IEVycm9yKSA9PiB0aGlzLm9uRmlsZUltcG9ydEVycm9yKGZpbGUsIGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZTogRmlsZSwgZmVhdHVyZXM6IEZlYXR1cmVbXSkge1xyXG4gICAgaGFuZGxlRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZSwgZmVhdHVyZXMsIHRoaXMubWFwLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUltcG9ydEVycm9yKGZpbGU6IEZpbGUsIGVycm9yOiBFcnJvcikge1xyXG4gICAgaGFuZGxlRmlsZUltcG9ydEVycm9yKGZpbGUsIGVycm9yLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==