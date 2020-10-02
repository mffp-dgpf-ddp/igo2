/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, ReplaySubject, EMPTY, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
export class LayerLegendListComponent {
    constructor() {
        this.orderable = true;
        this.hasVisibleOrInRangeLayers$ = new BehaviorSubject(true);
        this.hasVisibleAndNotInRangeLayers$ = new BehaviorSubject(true);
        this.layersInUi$ = new BehaviorSubject([]);
        this.layers$ = new BehaviorSubject([]);
        this.showAllLegend = false;
        this.change$ = new ReplaySubject(1);
        this.excludeBaseLayers = false;
        this.updateLegendOnResolutionChange = false;
        this.allowShowAllLegends = false;
        this.showAllLegendsValue = false;
        this.allLegendsShown = new EventEmitter(false);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set layers(value) {
        this._layers = value;
        this.next();
    }
    /**
     * @return {?}
     */
    get layers() {
        return this._layers;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.change$$ = this.change$
            .pipe(debounce((/**
         * @return {?}
         */
        () => {
            return this.layers.length === 0 ? EMPTY : timer(50);
        })))
            .subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const layers = this.computeShownLayers(this.layers.slice(0));
            this.layers$.next(layers);
            this.hasVisibleOrInRangeLayers$.next(this.layers.slice(0)
                .filter((/**
             * @param {?} layer
             * @return {?}
             */
            layer => layer.baseLayer !== true))
                .filter((/**
             * @param {?} layer
             * @return {?}
             */
            layer => layer.visible$.value && layer.isInResolutionsRange$.value)).length > 0);
            this.hasVisibleAndNotInRangeLayers$.next(this.layers.slice(0)
                .filter((/**
             * @param {?} layer
             * @return {?}
             */
            layer => layer.baseLayer !== true))
                .filter((/**
             * @param {?} layer
             * @return {?}
             */
            layer => layer.visible$.value && !layer.isInResolutionsRange$.value)).length > 0);
            this.layersInUi$.next(this.layers.slice(0).filter((/**
             * @param {?} layer
             * @return {?}
             */
            layer => layer.showInLayerList !== false && (!this.excludeBaseLayers || !layer.baseLayer))));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.change$$.unsubscribe();
    }
    /**
     * @private
     * @return {?}
     */
    next() {
        this.change$.next();
    }
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    computeShownLayers(layers) {
        /** @type {?} */
        let shownLayers = layers.filter((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer.visible && layer.isInResolutionsRange));
        if (this.showAllLegendsValue) {
            shownLayers = layers;
        }
        return this.sortLayersByZindex(shownLayers);
    }
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    sortLayersByZindex(layers) {
        return layers.sort((/**
         * @param {?} layer1
         * @param {?} layer2
         * @return {?}
         */
        (layer1, layer2) => layer2.zIndex - layer1.zIndex));
    }
    /**
     * @param {?} toggle
     * @return {?}
     */
    toggleShowAllLegends(toggle) {
        this.showAllLegendsValue = toggle;
        this.next();
        this.allLegendsShown.emit(toggle);
    }
}
LayerLegendListComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-layer-legend-list',
                template: "\r\n<mat-slide-toggle \r\ntooltip-position=\"above\"\r\nmatTooltipShowDelay=\"500\"\r\n[matTooltip]=\"'igo.geo.layer.legend.showAll' | translate\"\r\n[checked]=\"showAllLegendsValue\" class=\"mat-typography\" \r\n*ngIf=\"(layersInUi$ | async).length && allowShowAllLegends\" [labelPosition]=\"'before'\" (change)=\"toggleShowAllLegends($event.checked)\">\r\n  {{'igo.geo.layer.legend.showAll' | translate}}\r\n</mat-slide-toggle>\r\n<mat-divider *ngIf=\"(layersInUi$ | async).length && allowShowAllLegends\"></mat-divider>\r\n<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <ng-template ngFor let-layer let-i=\"index\" [ngForOf]=\"layers$ | async\">\r\n    <igo-layer-legend-item *ngIf=\"!(excludeBaseLayers && layer.baseLayer)\"\r\n        igoListItem [layer]=\"layer\"\r\n        [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\">\r\n    </igo-layer-legend-item>\r\n  </ng-template>\r\n</igo-list>\r\n\r\n<p class=\"layers-empty mat-typography\" \r\n  *ngIf=\"(layersInUi$ | async).length && !(hasVisibleOrInRangeLayers$ | async) && !(hasVisibleAndNotInRangeLayers$ | async) && allowShowAllLegends\">\r\n  {{'igo.geo.layer.legend.noLayersVisibleWithShowAllButton' | translate}} \r\n</p>\r\n<p class=\"layers-empty mat-typography\" \r\n  *ngIf=\"(layersInUi$ | async).length && !(hasVisibleOrInRangeLayers$ | async) && (hasVisibleAndNotInRangeLayers$ | async) && allowShowAllLegends\">\r\n  {{'igo.geo.layer.legend.noLayersVisibleWithShowAllButtonButZoom' | translate}} \r\n</p>\r\n<p class=\"layers-empty mat-typography\"\r\n  *ngIf=\"(layersInUi$ | async).length && !(hasVisibleOrInRangeLayers$ | async) && !(hasVisibleAndNotInRangeLayers$ | async) && !allowShowAllLegends\">\r\n  {{'igo.geo.layer.legend.noLayersVisible' | translate}} \r\n</p>\r\n<p class=\"layers-empty mat-typography\"\r\n  *ngIf=\"(layersInUi$ | async).length && !(hasVisibleOrInRangeLayers$ | async) && (hasVisibleAndNotInRangeLayers$ | async) && !allowShowAllLegends\">\r\n  {{'igo.geo.layer.legend.noLayersVisibleButZoom' | translate}} \r\n</p>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["mat-slide-toggle{width:100%;margin:10px}mat-slide-toggle ::ng-deep .mat-slide-toggle-content{width:calc(100% - 60px)}igo-list{display:contents}.layers-empty{text-align:justify;margin:10px}"]
            }] }
];
/** @nocollapse */
LayerLegendListComponent.ctorParameters = () => [];
LayerLegendListComponent.propDecorators = {
    layers: [{ type: Input }],
    excludeBaseLayers: [{ type: Input }],
    updateLegendOnResolutionChange: [{ type: Input }],
    allowShowAllLegends: [{ type: Input }],
    showAllLegendsValue: [{ type: Input }],
    allLegendsShown: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    LayerLegendListComponent.prototype.orderable;
    /** @type {?} */
    LayerLegendListComponent.prototype.hasVisibleOrInRangeLayers$;
    /** @type {?} */
    LayerLegendListComponent.prototype.hasVisibleAndNotInRangeLayers$;
    /** @type {?} */
    LayerLegendListComponent.prototype.layersInUi$;
    /** @type {?} */
    LayerLegendListComponent.prototype.layers$;
    /** @type {?} */
    LayerLegendListComponent.prototype.showAllLegend;
    /** @type {?} */
    LayerLegendListComponent.prototype.change$;
    /**
     * @type {?}
     * @private
     */
    LayerLegendListComponent.prototype.change$$;
    /**
     * @type {?}
     * @private
     */
    LayerLegendListComponent.prototype._layers;
    /** @type {?} */
    LayerLegendListComponent.prototype.excludeBaseLayers;
    /** @type {?} */
    LayerLegendListComponent.prototype.updateLegendOnResolutionChange;
    /** @type {?} */
    LayerLegendListComponent.prototype.allowShowAllLegends;
    /** @type {?} */
    LayerLegendListComponent.prototype.showAllLegendsValue;
    /** @type {?} */
    LayerLegendListComponent.prototype.allLegendsShown;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGVnZW5kLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL2xheWVyLWxlZ2VuZC1saXN0L2xheWVyLWxlZ2VuZC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQXFCLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkgsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQWdCLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUTFDLE1BQU0sT0FBTyx3QkFBd0I7SUE2Qm5DO1FBNUJBLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFakIsK0JBQTBCLEdBQTZCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pGLG1DQUE4QixHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRixnQkFBVyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRSxZQUFPLEdBQTZCLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVELGtCQUFhLEdBQWEsS0FBSyxDQUFDO1FBQ3pCLFlBQU8sR0FBRyxJQUFJLGFBQWEsQ0FBTyxDQUFDLENBQUMsQ0FBQztRQVduQyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFFbkMsbUNBQThCLEdBQVksS0FBSyxDQUFDO1FBRWhELHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUVyQyx3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFFcEMsb0JBQWUsR0FBRyxJQUFJLFlBQVksQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUU3QyxDQUFDOzs7OztJQW5CakIsSUFDSSxNQUFNLENBQUMs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QUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDO0lBQ3hFLENBQUM7Ozs7O0lBRUQsb0JBQW9CLENBQUMsTUFBZTtRQUNoQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7OztZQWxGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsb2hFQUFpRDtnQkFFakQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7OztxQkFXRSxLQUFLO2dDQVNMLEtBQUs7NkNBRUwsS0FBSztrQ0FFTCxLQUFLO2tDQUVMLEtBQUs7OEJBRUwsTUFBTTs7OztJQTFCUCw2Q0FBaUI7O0lBRWpCLDhEQUFpRjs7SUFDakYsa0VBQXFGOztJQUNyRiwrQ0FBZ0U7O0lBQ2hFLDJDQUE0RDs7SUFDNUQsaURBQWdDOztJQUNoQywyQ0FBNEM7Ozs7O0lBQzVDLDRDQUErQjs7Ozs7SUFTL0IsMkNBQXlCOztJQUN6QixxREFBNEM7O0lBRTVDLGtFQUF5RDs7SUFFekQsdURBQThDOztJQUU5Qyx1REFBOEM7O0lBRTlDLG1EQUE2RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkluaXQsIE9uRGVzdHJveSwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9zaGFyZWQnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFJlcGxheVN1YmplY3QsIFN1YnNjcmlwdGlvbiwgRU1QVFksIHRpbWVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbGF5ZXItbGVnZW5kLWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sYXllci1sZWdlbmQtbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbGF5ZXItbGVnZW5kLWxpc3QuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5ZXJMZWdlbmRMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIG9yZGVyYWJsZSA9IHRydWU7XHJcblxyXG4gIGhhc1Zpc2libGVPckluUmFuZ2VMYXllcnMkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRydWUpO1xyXG4gIGhhc1Zpc2libGVBbmROb3RJblJhbmdlTGF5ZXJzJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0cnVlKTtcclxuICBsYXllcnNJblVpJDogQmVoYXZpb3JTdWJqZWN0PExheWVyW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcbiAgbGF5ZXJzJDogQmVoYXZpb3JTdWJqZWN0PExheWVyW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcbiAgc2hvd0FsbExlZ2VuZDogYm9vbGVhbiA9ICBmYWxzZTtcclxuICBwdWJsaWMgY2hhbmdlJCA9IG5ldyBSZXBsYXlTdWJqZWN0PHZvaWQ+KDEpO1xyXG4gIHByaXZhdGUgY2hhbmdlJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBASW5wdXQoKVxyXG4gIHNldCBsYXllcnModmFsdWU6IExheWVyW10pIHtcclxuICAgIHRoaXMuX2xheWVycyA9IHZhbHVlO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG4gIGdldCBsYXllcnMoKTogTGF5ZXJbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGF5ZXJzO1xyXG4gIH1cclxuICBwcml2YXRlIF9sYXllcnM6IExheWVyW107XHJcbiAgQElucHV0KCkgZXhjbHVkZUJhc2VMYXllcnM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgdXBkYXRlTGVnZW5kT25SZXNvbHV0aW9uQ2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGFsbG93U2hvd0FsbExlZ2VuZHM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgc2hvd0FsbExlZ2VuZHNWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KCkgYWxsTGVnZW5kc1Nob3duID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNoYW5nZSQkID0gdGhpcy5jaGFuZ2UkXHJcbiAgICAgIC5waXBlKGRlYm91bmNlKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllcnMubGVuZ3RoID09PSAwID8gRU1QVFkgOiB0aW1lcig1MCk7XHJcbiAgICAgIH0pKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBjb25zdCBsYXllcnMgPSB0aGlzLmNvbXB1dGVTaG93bkxheWVycyh0aGlzLmxheWVycy5zbGljZSgwKSk7XHJcbiAgICAgICAgdGhpcy5sYXllcnMkLm5leHQobGF5ZXJzKTtcclxuICAgICAgICB0aGlzLmhhc1Zpc2libGVPckluUmFuZ2VMYXllcnMkLm5leHQoXHJcbiAgICAgICAgICB0aGlzLmxheWVycy5zbGljZSgwKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGxheWVyID0+IGxheWVyLmJhc2VMYXllciAhPT0gdHJ1ZSlcclxuICAgICAgICAgICAgLmZpbHRlcihsYXllciA9PiBsYXllci52aXNpYmxlJC52YWx1ZSAmJiBsYXllci5pc0luUmVzb2x1dGlvbnNSYW5nZSQudmFsdWUpLmxlbmd0aCA+IDBcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuaGFzVmlzaWJsZUFuZE5vdEluUmFuZ2VMYXllcnMkLm5leHQoXHJcbiAgICAgICAgICB0aGlzLmxheWVycy5zbGljZSgwKVxyXG4gICAgICAgICAgICAuZmlsdGVyKGxheWVyID0+IGxheWVyLmJhc2VMYXllciAhPT0gdHJ1ZSlcclxuICAgICAgICAgICAgLmZpbHRlcihsYXllciA9PiBsYXllci52aXNpYmxlJC52YWx1ZSAmJiAhbGF5ZXIuaXNJblJlc29sdXRpb25zUmFuZ2UkLnZhbHVlKS5sZW5ndGggPiAwXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXllcnNJblVpJC5uZXh0KFxyXG4gICAgICAgICAgdGhpcy5sYXllcnMuc2xpY2UoMCkuZmlsdGVyKGxheWVyID0+IGxheWVyLnNob3dJbkxheWVyTGlzdCAhPT0gZmFsc2UgJiYgKCF0aGlzLmV4Y2x1ZGVCYXNlTGF5ZXJzIHx8ICFsYXllci5iYXNlTGF5ZXIpKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNoYW5nZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgbmV4dCgpIHtcclxuICAgIHRoaXMuY2hhbmdlJC5uZXh0KCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgY29tcHV0ZVNob3duTGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgbGV0IHNob3duTGF5ZXJzID0gbGF5ZXJzLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiBsYXllci52aXNpYmxlICYmIGxheWVyLmlzSW5SZXNvbHV0aW9uc1JhbmdlKTtcclxuICAgIGlmICh0aGlzLnNob3dBbGxMZWdlbmRzVmFsdWUpIHtcclxuICAgICAgc2hvd25MYXllcnMgPSBsYXllcnM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5zb3J0TGF5ZXJzQnlaaW5kZXgoc2hvd25MYXllcnMpO1xyXG4gIH1cclxuICBwcml2YXRlIHNvcnRMYXllcnNCeVppbmRleChsYXllcnM6IExheWVyW10pIHtcclxuICAgIHJldHVybiBsYXllcnMuc29ydCgobGF5ZXIxLCBsYXllcjIpID0+IGxheWVyMi56SW5kZXggLSBsYXllcjEuekluZGV4KTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVNob3dBbGxMZWdlbmRzKHRvZ2dsZTogYm9vbGVhbikge1xyXG4gICAgICB0aGlzLnNob3dBbGxMZWdlbmRzVmFsdWUgPSB0b2dnbGU7XHJcbiAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICB0aGlzLmFsbExlZ2VuZHNTaG93bi5lbWl0KHRvZ2dsZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==