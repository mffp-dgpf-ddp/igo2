/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';
export class LayerListToolComponent {
    constructor() {
        this.onlyVisible$ = new BehaviorSubject(false);
        this.sortAlpha$ = new BehaviorSubject(false);
        this.term$ = new BehaviorSubject(undefined);
        this.layersAreAllVisible = true;
        this.floatLabel = 'auto';
        this.selectionMode = false;
        this.appliedFilterAndSort = new EventEmitter();
        this.selection = new EventEmitter();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set onlyVisible(value) {
        this.onlyVisible$.next(value);
    }
    /**
     * @return {?}
     */
    get onlyVisible() {
        return this.onlyVisible$.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortAlpha(value) {
        this.sortAlpha$.next(value);
    }
    /**
     * @return {?}
     */
    get sortAlpha() {
        return this.sortAlpha$.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set term(value) {
        this.term$.next(value);
    }
    /**
     * @return {?}
     */
    get term() {
        return this.term$.value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.term$$ = this.term$.subscribe((/**
         * @param {?} keyword
         * @return {?}
         */
        keyword => {
            this.appliedFilterAndSort.emit({
                keyword,
                onlyVisible: this.onlyVisible,
                sortAlpha: this.sortAlpha
            });
        }));
        this.onlyVisible$$ = this.onlyVisible$.subscribe((/**
         * @param {?} onlyVisible
         * @return {?}
         */
        onlyVisible => {
            this.appliedFilterAndSort.emit({
                keyword: this.term,
                onlyVisible,
                sortAlpha: this.sortAlpha
            });
        }));
        this.sortAlpha$$ = this.sortAlpha$.subscribe((/**
         * @param {?} sortAlpha
         * @return {?}
         */
        sortAlpha => {
            this.appliedFilterAndSort.emit({
                keyword: this.term,
                onlyVisible: this.onlyVisible,
                sortAlpha
            });
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.onlyVisible$$.unsubscribe();
        this.sortAlpha$$.unsubscribe();
        this.term$$.unsubscribe();
    }
    /**
     * @return {?}
     */
    clearTerm() {
        this.term = undefined;
    }
    /**
     * @return {?}
     */
    toggleSortAlpha() {
        this.sortAlpha = !this.sortAlpha;
    }
    /**
     * @return {?}
     */
    toggleOnlyVisible() {
        this.onlyVisible = !this.onlyVisible;
    }
    /**
     * @return {?}
     */
    toggleSelectionMode() {
        this.selectionMode = !this.selectionMode;
        this.selection.emit(this.selectionMode);
    }
}
LayerListToolComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-layer-list-tool',
                template: "\r\n\r\n  <mat-list-item>\r\n      <mat-form-field class=\"inputFilter\" [floatLabel]=\"floatLabel\">\r\n        <input\r\n          matInput\r\n          [placeholder]=\"'igo.geo.layer.filterPlaceholder' | translate\"\r\n          [matTooltip]=\"'igo.geo.layer.subsetLayersListKeyword' | translate\"\r\n          matTooltipShowDelay=\"500\"\r\n          type=\"text\" [(ngModel)]=\"term\">\r\n        <button\r\n          mat-button\r\n          *ngIf=\"term\"\r\n          matSuffix\r\n          mat-icon-button\r\n          aria-label=\"Clear\"\r\n          color=\"warn\"\r\n          (click)=\"clearTerm()\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n      <div [matTooltip]=\"sortAlpha ?\r\n      ('igo.geo.layer.sortAlphabetically' | translate) :\r\n      ('igo.geo.layer.sortMapOrder' | translate)\" matTooltipShowDelay=\"500\">\r\n        <button [color]=\"sortAlpha ? 'warn' : 'primary'\" mat-icon-button (click)=\"toggleSortAlpha()\">\r\n          <mat-icon [svgIcon]=\"sortAlpha ? 'sort-variant-remove' : 'sort-alphabetical'\"></mat-icon>\r\n        </button>\r\n      </div>\r\n\r\n\r\n       <div [matTooltip]=\"onlyVisible ?\r\n        ('igo.geo.layer.resetLayersList' | translate) :\r\n        ('igo.geo.layer.subsetLayersListOnlyVisible' | translate)\" matTooltipShowDelay=\"500\">\r\n         <button mat-icon-button [disabled]=\"layersAreAllVisible && !onlyVisible\"\r\n           [color]=\"onlyVisible ? 'warn' : 'primary'\" (click)=\"toggleOnlyVisible()\">\r\n           <mat-icon [svgIcon]=\"onlyVisible ? 'sort-variant-remove' : 'eye'\"></mat-icon>\r\n         </button>\r\n       </div>\r\n\r\n       <div [matTooltip]=\"selectionMode ?\r\n        ('igo.geo.layer.deactivateSelectionMode' | translate) :\r\n        ('igo.geo.layer.activateSelectionMode' | translate)\" matTooltipShowDelay=\"500\">\r\n         <button mat-icon-button\r\n           color=\"primary\" (click)=\"toggleSelectionMode()\">\r\n           <mat-icon [svgIcon]=\"selectionMode ? 'checkbox-multiple-marked-outline' : 'checkbox-multiple-blank-outline'\"></mat-icon>\r\n         </button>\r\n       </div>\r\n\r\n</mat-list-item>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["mat-form-field.inputFilter{width:calc(100% - 100px);max-width:200px}"]
            }] }
];
LayerListToolComponent.propDecorators = {
    layersAreAllVisible: [{ type: Input }],
    floatLabel: [{ type: Input }],
    onlyVisible: [{ type: Input }],
    sortAlpha: [{ type: Input }],
    term: [{ type: Input }],
    appliedFilterAndSort: [{ type: Output }],
    selection: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    LayerListToolComponent.prototype.onlyVisible$;
    /** @type {?} */
    LayerListToolComponent.prototype.sortAlpha$;
    /** @type {?} */
    LayerListToolComponent.prototype.term$;
    /** @type {?} */
    LayerListToolComponent.prototype.onlyVisible$$;
    /** @type {?} */
    LayerListToolComponent.prototype.sortAlpha$$;
    /** @type {?} */
    LayerListToolComponent.prototype.term$$;
    /** @type {?} */
    LayerListToolComponent.prototype.layersAreAllVisible;
    /** @type {?} */
    LayerListToolComponent.prototype.floatLabel;
    /** @type {?} */
    LayerListToolComponent.prototype.selectionMode;
    /** @type {?} */
    LayerListToolComponent.prototype.appliedFilterAndSort;
    /** @type {?} */
    LayerListToolComponent.prototype.selection;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGlzdC10b29sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9sYXllci1saXN0LXRvb2wvbGF5ZXItbGlzdC10b29sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBRXZCLFlBQVksRUFDWixNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUNMLGVBQWUsR0FFaEIsTUFBTSxNQUFNLENBQUM7QUFTZCxNQUFNLE9BQU8sc0JBQXNCO0lBTm5DO1FBUVMsaUJBQVksR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsZUFBVSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRSxVQUFLLEdBQTRCLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBSzlELHdCQUFtQixHQUFZLElBQUksQ0FBQztRQUVwQyxlQUFVLEdBQW1CLE1BQU0sQ0FBQztRQTBCdEMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFbkIseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQTRCLENBQUM7UUFDcEUsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUE2Q3BELENBQUM7Ozs7O0lBeEVDLElBQ0ksV0FBVyxDQUFDLEtBQWM7UUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7OztJQUNELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFRCxJQUNJLFNBQVMsQ0FBQyxLQUFjO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7SUFDRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsSUFDSSxJQUFJLENBQUMsS0FBYTtRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDOzs7O0lBQ0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUMxQixDQUFDOzs7O0lBT0QsUUFBUTtRQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDM0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQztnQkFDN0IsT0FBTztnQkFDUCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUzthQUFDLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTOzs7O1FBQUMsV0FBVyxDQUFDLEVBQUU7WUFDN0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQztnQkFDN0IsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNsQixXQUFXO2dCQUNYLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUzthQUFDLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTOzs7O1FBQUMsU0FBUyxDQUFDLEVBQUU7WUFDdkQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQztnQkFDN0IsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNsQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLFNBQVM7YUFBQyxDQUFDLENBQUM7UUFDaEIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7OztJQUNELGVBQWU7UUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNuQyxDQUFDOzs7O0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVELG1CQUFtQjtRQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7O1lBMUZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQiwwcEVBQStDO2dCQUUvQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7OztrQ0FVRSxLQUFLO3lCQUVMLEtBQUs7MEJBRUwsS0FBSzt3QkFRTCxLQUFLO21CQVFMLEtBQUs7bUNBVUwsTUFBTTt3QkFDTixNQUFNOzs7O0lBdENQLDhDQUEyRTs7SUFDM0UsNENBQXlFOztJQUN6RSx1Q0FBdUU7O0lBQ3ZFLCtDQUE0Qjs7SUFDNUIsNkNBQTBCOztJQUMxQix3Q0FBcUI7O0lBRXJCLHFEQUE2Qzs7SUFFN0MsNENBQTZDOztJQTBCN0MsK0NBQTZCOztJQUU3QixzREFBOEU7O0lBQzlFLDJDQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE9uSW5pdCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0LFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGbG9hdExhYmVsVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQmVoYXZpb3JTdWJqZWN0LFxyXG4gIFN1YnNjcmlwdGlvbixcclxufSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0Q29udHJvbHNPcHRpb25zIH0gZnJvbSAnLi9sYXllci1saXN0LXRvb2wuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWxheWVyLWxpc3QtdG9vbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xheWVyLWxpc3QtdG9vbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbGF5ZXItbGlzdC10b29sLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIExheWVyTGlzdFRvb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIHB1YmxpYyBvbmx5VmlzaWJsZSQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG4gIHB1YmxpYyBzb3J0QWxwaGEkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuICBwdWJsaWMgdGVybSQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG4gIG9ubHlWaXNpYmxlJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBzb3J0QWxwaGEkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHRlcm0kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBASW5wdXQoKSBsYXllcnNBcmVBbGxWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KCkgZmxvYXRMYWJlbDogRmxvYXRMYWJlbFR5cGUgPSAnYXV0byc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG9ubHlWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLm9ubHlWaXNpYmxlJC5uZXh0KHZhbHVlKTtcclxuICB9XHJcbiAgZ2V0IG9ubHlWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub25seVZpc2libGUkLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgc29ydEFscGhhKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnNvcnRBbHBoYSQubmV4dCh2YWx1ZSk7XHJcbiAgfVxyXG4gIGdldCBzb3J0QWxwaGEoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zb3J0QWxwaGEkLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgdGVybSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnRlcm0kLm5leHQodmFsdWUpO1xyXG4gIH1cclxuICBnZXQgdGVybSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudGVybSQudmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VsZWN0aW9uTW9kZSA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KCkgYXBwbGllZEZpbHRlckFuZFNvcnQgPSBuZXcgRXZlbnRFbWl0dGVyPExheWVyTGlzdENvbnRyb2xzT3B0aW9ucz4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMudGVybSQkID0gdGhpcy50ZXJtJC5zdWJzY3JpYmUoa2V5d29yZCA9PiB7XHJcbiAgICAgIHRoaXMuYXBwbGllZEZpbHRlckFuZFNvcnQuZW1pdCh7XHJcbiAgICAgICAga2V5d29yZCxcclxuICAgICAgICBvbmx5VmlzaWJsZTogdGhpcy5vbmx5VmlzaWJsZSxcclxuICAgICAgICBzb3J0QWxwaGE6IHRoaXMuc29ydEFscGhhfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9ubHlWaXNpYmxlJCQgPSB0aGlzLm9ubHlWaXNpYmxlJC5zdWJzY3JpYmUob25seVZpc2libGUgPT4ge1xyXG4gICAgICB0aGlzLmFwcGxpZWRGaWx0ZXJBbmRTb3J0LmVtaXQoe1xyXG4gICAgICAgIGtleXdvcmQ6IHRoaXMudGVybSxcclxuICAgICAgICBvbmx5VmlzaWJsZSxcclxuICAgICAgICBzb3J0QWxwaGE6IHRoaXMuc29ydEFscGhhfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc29ydEFscGhhJCQgPSB0aGlzLnNvcnRBbHBoYSQuc3Vic2NyaWJlKHNvcnRBbHBoYSA9PiB7XHJcbiAgICAgIHRoaXMuYXBwbGllZEZpbHRlckFuZFNvcnQuZW1pdCh7XHJcbiAgICAgICAga2V5d29yZDogdGhpcy50ZXJtLFxyXG4gICAgICAgIG9ubHlWaXNpYmxlOiB0aGlzLm9ubHlWaXNpYmxlLFxyXG4gICAgICAgIHNvcnRBbHBoYX0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMub25seVZpc2libGUkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zb3J0QWxwaGEkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy50ZXJtJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIGNsZWFyVGVybSgpIHtcclxuICAgIHRoaXMudGVybSA9IHVuZGVmaW5lZDtcclxuICB9XHJcbiAgdG9nZ2xlU29ydEFscGhhKCkge1xyXG4gICAgdGhpcy5zb3J0QWxwaGEgPSAhdGhpcy5zb3J0QWxwaGE7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVPbmx5VmlzaWJsZSgpIHtcclxuICAgIHRoaXMub25seVZpc2libGUgPSAhdGhpcy5vbmx5VmlzaWJsZTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVNlbGVjdGlvbk1vZGUoKSB7XHJcbiAgICB0aGlzLnNlbGVjdGlvbk1vZGUgPSAhdGhpcy5zZWxlY3Rpb25Nb2RlO1xyXG4gICAgdGhpcy5zZWxlY3Rpb24uZW1pdCh0aGlzLnNlbGVjdGlvbk1vZGUpO1xyXG4gIH1cclxufVxyXG4iXX0=