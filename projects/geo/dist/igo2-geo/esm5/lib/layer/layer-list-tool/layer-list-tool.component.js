/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';
var LayerListToolComponent = /** @class */ (function () {
    function LayerListToolComponent() {
        this.onlyVisible$ = new BehaviorSubject(false);
        this.sortAlpha$ = new BehaviorSubject(false);
        this.term$ = new BehaviorSubject(undefined);
        this.layersAreAllVisible = true;
        this.floatLabel = 'auto';
        this.selectionMode = false;
        this.appliedFilterAndSort = new EventEmitter();
        this.selection = new EventEmitter();
    }
    Object.defineProperty(LayerListToolComponent.prototype, "onlyVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return this.onlyVisible$.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.onlyVisible$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListToolComponent.prototype, "sortAlpha", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sortAlpha$.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.sortAlpha$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListToolComponent.prototype, "term", {
        get: /**
         * @return {?}
         */
        function () {
            return this.term$.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.term$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    LayerListToolComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.term$$ = this.term$.subscribe((/**
         * @param {?} keyword
         * @return {?}
         */
        function (keyword) {
            _this.appliedFilterAndSort.emit({
                keyword: keyword,
                onlyVisible: _this.onlyVisible,
                sortAlpha: _this.sortAlpha
            });
        }));
        this.onlyVisible$$ = this.onlyVisible$.subscribe((/**
         * @param {?} onlyVisible
         * @return {?}
         */
        function (onlyVisible) {
            _this.appliedFilterAndSort.emit({
                keyword: _this.term,
                onlyVisible: onlyVisible,
                sortAlpha: _this.sortAlpha
            });
        }));
        this.sortAlpha$$ = this.sortAlpha$.subscribe((/**
         * @param {?} sortAlpha
         * @return {?}
         */
        function (sortAlpha) {
            _this.appliedFilterAndSort.emit({
                keyword: _this.term,
                onlyVisible: _this.onlyVisible,
                sortAlpha: sortAlpha
            });
        }));
    };
    /**
     * @return {?}
     */
    LayerListToolComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.onlyVisible$$.unsubscribe();
        this.sortAlpha$$.unsubscribe();
        this.term$$.unsubscribe();
    };
    /**
     * @return {?}
     */
    LayerListToolComponent.prototype.clearTerm = /**
     * @return {?}
     */
    function () {
        this.term = undefined;
    };
    /**
     * @return {?}
     */
    LayerListToolComponent.prototype.toggleSortAlpha = /**
     * @return {?}
     */
    function () {
        this.sortAlpha = !this.sortAlpha;
    };
    /**
     * @return {?}
     */
    LayerListToolComponent.prototype.toggleOnlyVisible = /**
     * @return {?}
     */
    function () {
        this.onlyVisible = !this.onlyVisible;
    };
    /**
     * @return {?}
     */
    LayerListToolComponent.prototype.toggleSelectionMode = /**
     * @return {?}
     */
    function () {
        this.selectionMode = !this.selectionMode;
        this.selection.emit(this.selectionMode);
    };
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
    return LayerListToolComponent;
}());
export { LayerListToolComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGlzdC10b29sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9sYXllci1saXN0LXRvb2wvbGF5ZXItbGlzdC10b29sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBRXZCLFlBQVksRUFDWixNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUNMLGVBQWUsR0FFaEIsTUFBTSxNQUFNLENBQUM7QUFHZDtJQUFBO1FBUVMsaUJBQVksR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsZUFBVSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRSxVQUFLLEdBQTRCLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBSzlELHdCQUFtQixHQUFZLElBQUksQ0FBQztRQUVwQyxlQUFVLEdBQW1CLE1BQU0sQ0FBQztRQTBCdEMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFbkIseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQTRCLENBQUM7UUFDcEUsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUE2Q3BELENBQUM7SUF4RUMsc0JBQ0ksK0NBQVc7Ozs7UUFHZjtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDakMsQ0FBQzs7Ozs7UUFORCxVQUNnQixLQUFjO1lBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBS0Qsc0JBQ0ksNkNBQVM7Ozs7UUFHYjtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDL0IsQ0FBQzs7Ozs7UUFORCxVQUNjLEtBQWM7WUFDMUIsSUFBSSxDQUFD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QywrQ0FBNkI7O0lBRTdCLHNEQUE4RTs7SUFDOUUsMkNBQWtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT25Jbml0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXQsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZsb2F0TGFiZWxUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHtcclxuICBCZWhhdmlvclN1YmplY3QsXHJcbiAgU3Vic2NyaXB0aW9uLFxyXG59IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMYXllckxpc3RDb250cm9sc09wdGlvbnMgfSBmcm9tICcuL2xheWVyLWxpc3QtdG9vbC5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbGF5ZXItbGlzdC10b29sJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbGF5ZXItbGlzdC10b29sLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sYXllci1saXN0LXRvb2wuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5ZXJMaXN0VG9vbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcHVibGljIG9ubHlWaXNpYmxlJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcbiAgcHVibGljIHNvcnRBbHBoYSQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG4gIHB1YmxpYyB0ZXJtJDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XHJcbiAgb25seVZpc2libGUkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHNvcnRBbHBoYSQkOiBTdWJzY3JpcHRpb247XHJcbiAgdGVybSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyc0FyZUFsbFZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKSBmbG9hdExhYmVsOiBGbG9hdExhYmVsVHlwZSA9ICdhdXRvJztcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgb25seVZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMub25seVZpc2libGUkLm5leHQodmFsdWUpO1xyXG4gIH1cclxuICBnZXQgb25seVZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vbmx5VmlzaWJsZSQudmFsdWU7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBzb3J0QWxwaGEodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuc29ydEFscGhhJC5uZXh0KHZhbHVlKTtcclxuICB9XHJcbiAgZ2V0IHNvcnRBbHBoYSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNvcnRBbHBoYSQudmFsdWU7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCB0ZXJtKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMudGVybSQubmV4dCh2YWx1ZSk7XHJcbiAgfVxyXG4gIGdldCB0ZXJtKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy50ZXJtJC52YWx1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3Rpb25Nb2RlID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoKSBhcHBsaWVkRmlsdGVyQW5kU29ydCA9IG5ldyBFdmVudEVtaXR0ZXI8TGF5ZXJMaXN0Q29udHJvbHNPcHRpb25zPigpO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy50ZXJtJCQgPSB0aGlzLnRlcm0kLnN1YnNjcmliZShrZXl3b3JkID0+IHtcclxuICAgICAgdGhpcy5hcHBsaWVkRmlsdGVyQW5kU29ydC5lbWl0KHtcclxuICAgICAgICBrZXl3b3JkLFxyXG4gICAgICAgIG9ubHlWaXNpYmxlOiB0aGlzLm9ubHlWaXNpYmxlLFxyXG4gICAgICAgIHNvcnRBbHBoYTogdGhpcy5zb3J0QWxwaGF9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub25seVZpc2libGUkJCA9IHRoaXMub25seVZpc2libGUkLnN1YnNjcmliZShvbmx5VmlzaWJsZSA9PiB7XHJcbiAgICAgIHRoaXMuYXBwbGllZEZpbHRlckFuZFNvcnQuZW1pdCh7XHJcbiAgICAgICAga2V5d29yZDogdGhpcy50ZXJtLFxyXG4gICAgICAgIG9ubHlWaXNpYmxlLFxyXG4gICAgICAgIHNvcnRBbHBoYTogdGhpcy5zb3J0QWxwaGF9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zb3J0QWxwaGEkJCA9IHRoaXMuc29ydEFscGhhJC5zdWJzY3JpYmUoc29ydEFscGhhID0+IHtcclxuICAgICAgdGhpcy5hcHBsaWVkRmlsdGVyQW5kU29ydC5lbWl0KHtcclxuICAgICAgICBrZXl3b3JkOiB0aGlzLnRlcm0sXHJcbiAgICAgICAgb25seVZpc2libGU6IHRoaXMub25seVZpc2libGUsXHJcbiAgICAgICAgc29ydEFscGhhfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5vbmx5VmlzaWJsZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLnNvcnRBbHBoYSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLnRlcm0kJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJUZXJtKCkge1xyXG4gICAgdGhpcy50ZXJtID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuICB0b2dnbGVTb3J0QWxwaGEoKSB7XHJcbiAgICB0aGlzLnNvcnRBbHBoYSA9ICF0aGlzLnNvcnRBbHBoYTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZU9ubHlWaXNpYmxlKCkge1xyXG4gICAgdGhpcy5vbmx5VmlzaWJsZSA9ICF0aGlzLm9ubHlWaXNpYmxlO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlU2VsZWN0aW9uTW9kZSgpIHtcclxuICAgIHRoaXMuc2VsZWN0aW9uTW9kZSA9ICF0aGlzLnNlbGVjdGlvbk1vZGU7XHJcbiAgICB0aGlzLnNlbGVjdGlvbi5lbWl0KHRoaXMuc2VsZWN0aW9uTW9kZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==