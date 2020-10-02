/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as olproj from 'ol/proj';
import * as oleasing from 'ol/easing';
import olPoint from 'ol/geom/Point';
import { MessageService, LanguageService } from '@igo2/core';
import { ConfirmDialogService } from '@igo2/common';
import { AuthService } from '@igo2/auth';
import { IgoMap } from '@igo2/geo';
import { PoiService } from './shared/poi.service';
import { PoiDialogComponent } from './poi-dialog.component';
export class PoiButtonComponent {
    /**
     * @param {?} dialog
     * @param {?} authService
     * @param {?} poiService
     * @param {?} messageService
     * @param {?} languageService
     * @param {?} confirmDialogService
     */
    constructor(dialog, authService, poiService, messageService, languageService, confirmDialogService) {
        this.dialog = dialog;
        this.authService = authService;
        this.poiService = poiService;
        this.messageService = messageService;
        this.languageService = languageService;
        this.confirmDialogService = confirmDialogService;
    }
    /**
     * @return {?}
     */
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
    }
    /**
     * @return {?}
     */
    get color() {
        return this._color;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._color = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.authenticate$$ = this.authService.authenticate$.subscribe((/**
         * @param {?} auth
         * @return {?}
         */
        auth => {
            if (auth) {
                this.getPois();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.authenticate$$.unsubscribe();
    }
    /**
     * @param {?} poi
     * @return {?}
     */
    deletePoi(poi) {
        if (poi && poi.id) {
            /** @type {?} */
            const translate = this.languageService.translate;
            this.confirmDialogService
                .open(translate.instant('igo.context.poiButton.dialog.confirmDelete'))
                .subscribe((/**
             * @param {?} confirm
             * @return {?}
             */
            confirm => {
                if (confirm) {
                    this.poiService.delete(poi.id).subscribe((/**
                     * @return {?}
                     */
                    () => {
                        /** @type {?} */
                        const title = translate.instant('igo.context.poiButton.dialog.deleteTitle');
                        /** @type {?} */
                        const message = translate.instant('igo.context.poiButton.dialog.deleteMsg', {
                            value: poi.title
                        });
                        this.messageService.info(message, title);
                        this.pois = this.pois.filter((/**
                         * @param {?} p
                         * @return {?}
                         */
                        p => p.id !== poi.id));
                    }), (/**
                     * @param {?} err
                     * @return {?}
                     */
                    err => {
                        err.error.title = 'DELETE Pois';
                        this.messageService.showError(err);
                    }));
                }
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    getPois() {
        this.poiService.get().subscribe((/**
         * @param {?} rep
         * @return {?}
         */
        rep => {
            this.pois = rep;
        }), (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            err.error.title = 'GET Pois';
            this.messageService.showError(err);
        }));
    }
    /**
     * @return {?}
     */
    createPoi() {
        /** @type {?} */
        const view = this.map.ol.getView();
        /** @type {?} */
        const proj = view.getProjection().getCode();
        /** @type {?} */
        const center = new olPoint(view.getCenter()).transform(proj, 'EPSG:4326');
        /** @type {?} */
        const poi = {
            title: '',
            x: center.getCoordinates()[0],
            y: center.getCoordinates()[1],
            zoom: view.getZoom()
        };
        this.dialog
            .open(PoiDialogComponent, { disableClose: false })
            .afterClosed()
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        title => {
            if (title) {
                poi.title = title;
                this.poiService.create(poi).subscribe((/**
                 * @param {?} newPoi
                 * @return {?}
                 */
                newPoi => {
                    /** @type {?} */
                    const translate = this.languageService.translate;
                    /** @type {?} */
                    const titleD = translate.instant('igo.context.poiButton.dialog.createTitle');
                    /** @type {?} */
                    const message = translate.instant('igo.context.poiButton.dialog.createMsg', {
                        value: poi.title
                    });
                    this.messageService.success(message, titleD);
                    poi.id = newPoi.id;
                    this.pois.push(poi);
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                err => {
                    err.error.title = 'POST Pois';
                    this.messageService.showError(err);
                }));
            }
        }));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    zoomOnPoi(id) {
        /** @type {?} */
        const poi = this.pois.find((/**
         * @param {?} p
         * @return {?}
         */
        p => p.id === id));
        /** @type {?} */
        const center = olproj.fromLonLat([Number(poi.x), Number(poi.y)], this.map.projection);
        this.map.ol.getView().animate({
            center,
            zoom: poi.zoom,
            duration: 500,
            easing: oleasing.easeOut
        });
    }
}
PoiButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-poi-button',
                template: "<mat-select [placeholder]=\"'igo.context.poiButton.placeholder' |\u00A0translate\"\r\n           floatPlaceholder=\"never\">\r\n\r\n  <mat-option (click)=\"createPoi()\">\r\n    <div class=\"titlePoi\">{{ 'igo.context.poiButton.create' |\u00A0translate }}</div>\r\n    <button igoStopPropagation class=\"addPoi buttonPoi\"\r\n      mat-icon-button\r\n      color=\"primary\"\r\n      (click)=\"createPoi()\">\r\n      <mat-icon svgIcon=\"plus-circle\"></mat-icon>\r\n    </button>\r\n  </mat-option>\r\n  <mat-option *ngFor=\"let poi of pois\" [value]=\"poi.id\" (click)=\"zoomOnPoi(poi.id)\">\r\n    <div class=\"titlePoi\">{{ poi.title }}</div>\r\n    <button igoStopPropagation class=\"deletePoi buttonPoi\"\r\n      mat-icon-button\r\n      color=\"warn\"\r\n      (click)=\"deletePoi(poi)\">\r\n      <mat-icon svgIcon=\"delete\"></mat-icon>\r\n    </button>\r\n  </mat-option>\r\n</mat-select>\r\n",
                styles: ["mat-select{width:150px;background-color:#fff;height:40px;padding-top:0}mat-select>>>.mat-select-trigger{height:40px}mat-select>>>.mat-select-placeholder,mat-select>>>.mat-select-value-text{padding:5px;top:12px;position:relative}.mat-option{text-overflow:inherit}.titlePoi{max-width:135px;overflow:hidden;text-overflow:ellipsis;float:left}.buttonPoi{float:right;margin:4px -10px 4px 0}.buttonPoi>>>.mat-icon{margin:0 8px}"]
            }] }
];
/** @nocollapse */
PoiButtonComponent.ctorParameters = () => [
    { type: MatDialog },
    { type: AuthService },
    { type: PoiService },
    { type: MessageService },
    { type: LanguageService },
    { type: ConfirmDialogService }
];
PoiButtonComponent.propDecorators = {
    map: [{ type: Input }],
    color: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    PoiButtonComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    PoiButtonComponent.prototype._color;
    /** @type {?} */
    PoiButtonComponent.prototype.pois;
    /**
     * @type {?}
     * @private
     */
    PoiButtonComponent.prototype.authenticate$$;
    /**
     * @type {?}
     * @private
     */
    PoiButtonComponent.prototype.dialog;
    /**
     * @type {?}
     * @private
     */
    PoiButtonComponent.prototype.authService;
    /**
     * @type {?}
     * @private
     */
    PoiButtonComponent.prototype.poiService;
    /**
     * @type {?}
     * @private
     */
    PoiButtonComponent.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    PoiButtonComponent.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    PoiButtonComponent.prototype.confirmDialogService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWFwLWJ1dHRvbi9wb2ktYnV0dG9uL3BvaS1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRzlDLE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sT0FBTyxNQUFNLGVBQWUsQ0FBQztBQUVwQyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDcEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQU81RCxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7Ozs7SUFzQjdCLFlBQ1UsTUFBaUIsRUFDakIsV0FBd0IsRUFDeEIsVUFBc0IsRUFDdEIsY0FBOEIsRUFDOUIsZUFBZ0MsRUFDaEMsb0JBQTBDO1FBTDFDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHlCQUFvQixH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Ozs7OztJQUM5Qiw0Q0FBc0M7Ozs7O0lBQ3RDLDZDQUF3Qzs7Ozs7SUFDeEMsa0RBQWtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0ICogYXMgb2xlYXNpbmcgZnJvbSAnb2wvZWFzaW5nJztcclxuaW1wb3J0IG9sUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IENvbmZpcm1EaWFsb2dTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICdAaWdvMi9hdXRoJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IFBvaVNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC9wb2kuc2VydmljZSc7XHJcbmltcG9ydCB7IFBvaSB9IGZyb20gJy4vc2hhcmVkL3BvaS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBQb2lEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3BvaS1kaWFsb2cuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXBvaS1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wb2ktYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9wb2ktYnV0dG9uLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFBvaUJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXA7XHJcbiAgfVxyXG4gIHNldCBtYXAodmFsdWU6IElnb01hcCkge1xyXG4gICAgdGhpcy5fbWFwID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBjb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gIH1cclxuICBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29sb3I6IHN0cmluZztcclxuXHJcbiAgcHVibGljIHBvaXM6IFBvaVtdO1xyXG4gIHByaXZhdGUgYXV0aGVudGljYXRlJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLFxyXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHBvaVNlcnZpY2U6IFBvaVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbmZpcm1EaWFsb2dTZXJ2aWNlOiBDb25maXJtRGlhbG9nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmF1dGhlbnRpY2F0ZSQkID0gdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGUkLnN1YnNjcmliZShhdXRoID0+IHtcclxuICAgICAgaWYgKGF1dGgpIHtcclxuICAgICAgICB0aGlzLmdldFBvaXMoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuYXV0aGVudGljYXRlJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZVBvaShwb2k6IFBvaSkge1xyXG4gICAgaWYgKHBvaSAmJiBwb2kuaWQpIHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICB0aGlzLmNvbmZpcm1EaWFsb2dTZXJ2aWNlXHJcbiAgICAgICAgLm9wZW4odHJhbnNsYXRlLmluc3RhbnQoJ2lnby5jb250ZXh0LnBvaUJ1dHRvbi5kaWFsb2cuY29uZmlybURlbGV0ZScpKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoY29uZmlybSA9PiB7XHJcbiAgICAgICAgICBpZiAoY29uZmlybSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvaVNlcnZpY2UuZGVsZXRlKHBvaS5pZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgICAgICdpZ28uY29udGV4dC5wb2lCdXR0b24uZGlhbG9nLmRlbGV0ZVRpdGxlJ1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAgICAgJ2lnby5jb250ZXh0LnBvaUJ1dHRvbi5kaWFsb2cuZGVsZXRlTXNnJyxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwb2kudGl0bGVcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaXMgPSB0aGlzLnBvaXMuZmlsdGVyKHAgPT4gcC5pZCAhPT0gcG9pLmlkKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBlcnIuZXJyb3IudGl0bGUgPSAnREVMRVRFIFBvaXMnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zaG93RXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFBvaXMoKSB7XHJcbiAgICB0aGlzLnBvaVNlcnZpY2UuZ2V0KCkuc3Vic2NyaWJlKFxyXG4gICAgICByZXAgPT4ge1xyXG4gICAgICAgIHRoaXMucG9pcyA9IHJlcDtcclxuICAgICAgfSxcclxuICAgICAgZXJyID0+IHtcclxuICAgICAgICBlcnIuZXJyb3IudGl0bGUgPSAnR0VUIFBvaXMnO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc2hvd0Vycm9yKGVycik7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVQb2koKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5tYXAub2wuZ2V0VmlldygpO1xyXG4gICAgY29uc3QgcHJvaiA9IHZpZXcuZ2V0UHJvamVjdGlvbigpLmdldENvZGUoKTtcclxuICAgIGNvbnN0IGNlbnRlcjogYW55ID0gbmV3IG9sUG9pbnQodmlldy5nZXRDZW50ZXIoKSkudHJhbnNmb3JtKFxyXG4gICAgICBwcm9qLFxyXG4gICAgICAnRVBTRzo0MzI2J1xyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBwb2k6IFBvaSA9IHtcclxuICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICB4OiBjZW50ZXIuZ2V0Q29vcmRpbmF0ZXMoKVswXSxcclxuICAgICAgeTogY2VudGVyLmdldENvb3JkaW5hdGVzKClbMV0sXHJcbiAgICAgIHpvb206IHZpZXcuZ2V0Wm9vbSgpXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZGlhbG9nXHJcbiAgICAgIC5vcGVuKFBvaURpYWxvZ0NvbXBvbmVudCwgeyBkaXNhYmxlQ2xvc2U6IGZhbHNlIH0pXHJcbiAgICAgIC5hZnRlckNsb3NlZCgpXHJcbiAgICAgIC5zdWJzY3JpYmUodGl0bGUgPT4ge1xyXG4gICAgICAgIGlmICh0aXRsZSkge1xyXG4gICAgICAgICAgcG9pLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgICB0aGlzLnBvaVNlcnZpY2UuY3JlYXRlKHBvaSkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBuZXdQb2kgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgICAgICAgICBjb25zdCB0aXRsZUQgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAgICdpZ28uY29udGV4dC5wb2lCdXR0b24uZGlhbG9nLmNyZWF0ZVRpdGxlJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICAgJ2lnby5jb250ZXh0LnBvaUJ1dHRvbi5kaWFsb2cuY3JlYXRlTXNnJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgdmFsdWU6IHBvaS50aXRsZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlRCk7XHJcbiAgICAgICAgICAgICAgcG9pLmlkID0gbmV3UG9pLmlkO1xyXG4gICAgICAgICAgICAgIHRoaXMucG9pcy5wdXNoKHBvaSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgZXJyLmVycm9yLnRpdGxlID0gJ1BPU1QgUG9pcyc7XHJcbiAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zaG93RXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgem9vbU9uUG9pKGlkKSB7XHJcbiAgICBjb25zdCBwb2kgPSB0aGlzLnBvaXMuZmluZChwID0+IHAuaWQgPT09IGlkKTtcclxuXHJcbiAgICBjb25zdCBjZW50ZXIgPSBvbHByb2ouZnJvbUxvbkxhdChcclxuICAgICAgW051bWJlcihwb2kueCksIE51bWJlcihwb2kueSldLFxyXG4gICAgICB0aGlzLm1hcC5wcm9qZWN0aW9uXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMubWFwLm9sLmdldFZpZXcoKS5hbmltYXRlKHtcclxuICAgICAgY2VudGVyLFxyXG4gICAgICB6b29tOiBwb2kuem9vbSxcclxuICAgICAgZHVyYXRpb246IDUwMCxcclxuICAgICAgZWFzaW5nOiBvbGVhc2luZy5lYXNlT3V0XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19