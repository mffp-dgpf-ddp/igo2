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
var PoiButtonComponent = /** @class */ (function () {
    function PoiButtonComponent(dialog, authService, poiService, messageService, languageService, confirmDialogService) {
        this.dialog = dialog;
        this.authService = authService;
        this.poiService = poiService;
        this.messageService = messageService;
        this.languageService = languageService;
        this.confirmDialogService = confirmDialogService;
    }
    Object.defineProperty(PoiButtonComponent.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this._map;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._map = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PoiButtonComponent.prototype, "color", {
        get: /**
         * @return {?}
         */
        function () {
            return this._color;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PoiButtonComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.authenticate$$ = this.authService.authenticate$.subscribe((/**
         * @param {?} auth
         * @return {?}
         */
        function (auth) {
            if (auth) {
                _this.getPois();
            }
        }));
    };
    /**
     * @return {?}
     */
    PoiButtonComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.authenticate$$.unsubscribe();
    };
    /**
     * @param {?} poi
     * @return {?}
     */
    PoiButtonComponent.prototype.deletePoi = /**
     * @param {?} poi
     * @return {?}
     */
    function (poi) {
        var _this = this;
        if (poi && poi.id) {
            /** @type {?} */
            var translate_1 = this.languageService.translate;
            this.confirmDialogService
                .open(translate_1.instant('igo.context.poiButton.dialog.confirmDelete'))
                .subscribe((/**
             * @param {?} confirm
             * @return {?}
             */
            function (confirm) {
                if (confirm) {
                    _this.poiService.delete(poi.id).subscribe((/**
                     * @return {?}
                     */
                    function () {
                        /** @type {?} */
                        var title = translate_1.instant('igo.context.poiButton.dialog.deleteTitle');
                        /** @type {?} */
                        var message = translate_1.instant('igo.context.poiButton.dialog.deleteMsg', {
                            value: poi.title
                        });
                        _this.messageService.info(message, title);
                        _this.pois = _this.pois.filter((/**
                         * @param {?} p
                         * @return {?}
                         */
                        function (p) { return p.id !== poi.id; }));
                    }), (/**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) {
                        err.error.title = 'DELETE Pois';
                        _this.messageService.showError(err);
                    }));
                }
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    PoiButtonComponent.prototype.getPois = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.poiService.get().subscribe((/**
         * @param {?} rep
         * @return {?}
         */
        function (rep) {
            _this.pois = rep;
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            err.error.title = 'GET Pois';
            _this.messageService.showError(err);
        }));
    };
    /**
     * @return {?}
     */
    PoiButtonComponent.prototype.createPoi = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var view = this.map.ol.getView();
        /** @type {?} */
        var proj = view.getProjection().getCode();
        /** @type {?} */
        var center = new olPoint(view.getCenter()).transform(proj, 'EPSG:4326');
        /** @type {?} */
        var poi = {
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
        function (title) {
            if (title) {
                poi.title = title;
                _this.poiService.create(poi).subscribe((/**
                 * @param {?} newPoi
                 * @return {?}
                 */
                function (newPoi) {
                    /** @type {?} */
                    var translate = _this.languageService.translate;
                    /** @type {?} */
                    var titleD = translate.instant('igo.context.poiButton.dialog.createTitle');
                    /** @type {?} */
                    var message = translate.instant('igo.context.poiButton.dialog.createMsg', {
                        value: poi.title
                    });
                    _this.messageService.success(message, titleD);
                    poi.id = newPoi.id;
                    _this.pois.push(poi);
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    err.error.title = 'POST Pois';
                    _this.messageService.showError(err);
                }));
            }
        }));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    PoiButtonComponent.prototype.zoomOnPoi = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var poi = this.pois.find((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return p.id === id; }));
        /** @type {?} */
        var center = olproj.fromLonLat([Number(poi.x), Number(poi.y)], this.map.projection);
        this.map.ol.getView().animate({
            center: center,
            zoom: poi.zoom,
            duration: 500,
            easing: oleasing.easeOut
        });
    };
    PoiButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-poi-button',
                    template: "<mat-select [placeholder]=\"'igo.context.poiButton.placeholder' |\u00A0translate\"\r\n           floatPlaceholder=\"never\">\r\n\r\n  <mat-option (click)=\"createPoi()\">\r\n    <div class=\"titlePoi\">{{ 'igo.context.poiButton.create' |\u00A0translate }}</div>\r\n    <button igoStopPropagation class=\"addPoi buttonPoi\"\r\n      mat-icon-button\r\n      color=\"primary\"\r\n      (click)=\"createPoi()\">\r\n      <mat-icon svgIcon=\"plus-circle\"></mat-icon>\r\n    </button>\r\n  </mat-option>\r\n  <mat-option *ngFor=\"let poi of pois\" [value]=\"poi.id\" (click)=\"zoomOnPoi(poi.id)\">\r\n    <div class=\"titlePoi\">{{ poi.title }}</div>\r\n    <button igoStopPropagation class=\"deletePoi buttonPoi\"\r\n      mat-icon-button\r\n      color=\"warn\"\r\n      (click)=\"deletePoi(poi)\">\r\n      <mat-icon svgIcon=\"delete\"></mat-icon>\r\n    </button>\r\n  </mat-option>\r\n</mat-select>\r\n",
                    styles: ["mat-select{width:150px;background-color:#fff;height:40px;padding-top:0}mat-select>>>.mat-select-trigger{height:40px}mat-select>>>.mat-select-placeholder,mat-select>>>.mat-select-value-text{padding:5px;top:12px;position:relative}.mat-option{text-overflow:inherit}.titlePoi{max-width:135px;overflow:hidden;text-overflow:ellipsis;float:left}.buttonPoi{float:right;margin:4px -10px 4px 0}.buttonPoi>>>.mat-icon{margin:0 8px}"]
                }] }
    ];
    /** @nocollapse */
    PoiButtonComponent.ctorParameters = function () { return [
        { type: MatDialog },
        { type: AuthService },
        { type: PoiService },
        { type: MessageService },
        { type: LanguageService },
        { type: ConfirmDialogService }
    ]; };
    PoiButtonComponent.propDecorators = {
        map: [{ type: Input }],
        color: [{ type: Input }]
    };
    return PoiButtonComponent;
}());
export { PoiButtonComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb250ZXh0LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWFwLWJ1dHRvbi9wb2ktYnV0dG9uL3BvaS1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRzlDLE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sT0FBTyxNQUFNLGVBQWUsQ0FBQztBQUVwQyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDcEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RDtJQTJCRSw0QkFDVSxNQUFpQixFQUNqQixXQUF3QixFQUN4QixVQUFzQixFQUN0QixjQUE4QixFQUM5QixlQUFnQyxFQUNoQyxvQkFBMEM7UUFMMUMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtJQUNqRCxD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QixrQ0FBcUI7Ozs7O0lBU3JCLG9DQUF1Qjs7SUFFdkIsa0NBQW1COzs7OztJQUNuQiw0Q0FBcUM7Ozs7O0lBR25DLG9DQUF5Qjs7Ozs7SUFDekIseUNBQWdDOzs7OztJQUNoQyx3Q0FBOEI7Ozs7O0lBQzlCLDRDQUFzQzs7Ozs7SUFDdEMsNkNBQXdDOzs7OztJQUN4QyxrREFBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgKiBhcyBvbGVhc2luZyBmcm9tICdvbC9lYXNpbmcnO1xyXG5pbXBvcnQgb2xQb2ludCBmcm9tICdvbC9nZW9tL1BvaW50JztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgQ29uZmlybURpYWxvZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgUG9pU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3BvaS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUG9pIH0gZnJvbSAnLi9zaGFyZWQvcG9pLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFBvaURpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vcG9pLWRpYWxvZy5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tcG9pLWJ1dHRvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3BvaS1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3BvaS1idXR0b24uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUG9pQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hcDtcclxuICB9XHJcbiAgc2V0IG1hcCh2YWx1ZTogSWdvTWFwKSB7XHJcbiAgICB0aGlzLl9tYXAgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbG9yKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgfVxyXG4gIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xvcjogc3RyaW5nO1xyXG5cclxuICBwdWJsaWMgcG9pczogUG9pW107XHJcbiAgcHJpdmF0ZSBhdXRoZW50aWNhdGUkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgcG9pU2VydmljZTogUG9pU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgY29uZmlybURpYWxvZ1NlcnZpY2U6IENvbmZpcm1EaWFsb2dTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYXV0aGVudGljYXRlJCQgPSB0aGlzLmF1dGhTZXJ2aWNlLmF1dGhlbnRpY2F0ZSQuc3Vic2NyaWJlKGF1dGggPT4ge1xyXG4gICAgICBpZiAoYXV0aCkge1xyXG4gICAgICAgIHRoaXMuZ2V0UG9pcygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5hdXRoZW50aWNhdGUkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlUG9pKHBvaTogUG9pKSB7XHJcbiAgICBpZiAocG9pICYmIHBvaS5pZCkge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICAgIHRoaXMuY29uZmlybURpYWxvZ1NlcnZpY2VcclxuICAgICAgICAub3Blbih0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmNvbnRleHQucG9pQnV0dG9uLmRpYWxvZy5jb25maXJtRGVsZXRlJykpXHJcbiAgICAgICAgLnN1YnNjcmliZShjb25maXJtID0+IHtcclxuICAgICAgICAgIGlmIChjb25maXJtKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9pU2VydmljZS5kZWxldGUocG9pLmlkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAgICAgJ2lnby5jb250ZXh0LnBvaUJ1dHRvbi5kaWFsb2cuZGVsZXRlVGl0bGUnXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICAgICAnaWdvLmNvbnRleHQucG9pQnV0dG9uLmRpYWxvZy5kZWxldGVNc2cnLFxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHBvaS50aXRsZVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5pbmZvKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9pcyA9IHRoaXMucG9pcy5maWx0ZXIocCA9PiBwLmlkICE9PSBwb2kuaWQpO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGVyci5lcnJvci50aXRsZSA9ICdERUxFVEUgUG9pcyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNob3dFcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UG9pcygpIHtcclxuICAgIHRoaXMucG9pU2VydmljZS5nZXQoKS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlcCA9PiB7XHJcbiAgICAgICAgdGhpcy5wb2lzID0gcmVwO1xyXG4gICAgICB9LFxyXG4gICAgICBlcnIgPT4ge1xyXG4gICAgICAgIGVyci5lcnJvci50aXRsZSA9ICdHRVQgUG9pcyc7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zaG93RXJyb3IoZXJyKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVBvaSgpIHtcclxuICAgIGNvbnN0IHZpZXcgPSB0aGlzLm1hcC5vbC5nZXRWaWV3KCk7XHJcbiAgICBjb25zdCBwcm9qID0gdmlldy5nZXRQcm9qZWN0aW9uKCkuZ2V0Q29kZSgpO1xyXG4gICAgY29uc3QgY2VudGVyOiBhbnkgPSBuZXcgb2xQb2ludCh2aWV3LmdldENlbnRlcigpKS50cmFuc2Zvcm0oXHJcbiAgICAgIHByb2osXHJcbiAgICAgICdFUFNHOjQzMjYnXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHBvaTogUG9pID0ge1xyXG4gICAgICB0aXRsZTogJycsXHJcbiAgICAgIHg6IGNlbnRlci5nZXRDb29yZGluYXRlcygpWzBdLFxyXG4gICAgICB5OiBjZW50ZXIuZ2V0Q29vcmRpbmF0ZXMoKVsxXSxcclxuICAgICAgem9vbTogdmlldy5nZXRab29tKClcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5kaWFsb2dcclxuICAgICAgLm9wZW4oUG9pRGlhbG9nQ29tcG9uZW50LCB7IGRpc2FibGVDbG9zZTogZmFsc2UgfSlcclxuICAgICAgLmFmdGVyQ2xvc2VkKClcclxuICAgICAgLnN1YnNjcmliZSh0aXRsZSA9PiB7XHJcbiAgICAgICAgaWYgKHRpdGxlKSB7XHJcbiAgICAgICAgICBwb2kudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICAgIHRoaXMucG9pU2VydmljZS5jcmVhdGUocG9pKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIG5ld1BvaSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHRpdGxlRCA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICAgJ2lnby5jb250ZXh0LnBvaUJ1dHRvbi5kaWFsb2cuY3JlYXRlVGl0bGUnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgICAnaWdvLmNvbnRleHQucG9pQnV0dG9uLmRpYWxvZy5jcmVhdGVNc2cnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogcG9pLnRpdGxlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobWVzc2FnZSwgdGl0bGVEKTtcclxuICAgICAgICAgICAgICBwb2kuaWQgPSBuZXdQb2kuaWQ7XHJcbiAgICAgICAgICAgICAgdGhpcy5wb2lzLnB1c2gocG9pKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICBlcnIuZXJyb3IudGl0bGUgPSAnUE9TVCBQb2lzJztcclxuICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNob3dFcnJvcihlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICB6b29tT25Qb2koaWQpIHtcclxuICAgIGNvbnN0IHBvaSA9IHRoaXMucG9pcy5maW5kKHAgPT4gcC5pZCA9PT0gaWQpO1xyXG5cclxuICAgIGNvbnN0IGNlbnRlciA9IG9scHJvai5mcm9tTG9uTGF0KFxyXG4gICAgICBbTnVtYmVyKHBvaS54KSwgTnVtYmVyKHBvaS55KV0sXHJcbiAgICAgIHRoaXMubWFwLnByb2plY3Rpb25cclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5tYXAub2wuZ2V0VmlldygpLmFuaW1hdGUoe1xyXG4gICAgICBjZW50ZXIsXHJcbiAgICAgIHpvb206IHBvaS56b29tLFxyXG4gICAgICBkdXJhdGlvbjogNTAwLFxyXG4gICAgICBlYXNpbmc6IG9sZWFzaW5nLmVhc2VPdXRcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=