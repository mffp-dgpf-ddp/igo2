/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as olproj from 'ol/proj';
import olWKT from 'ol/format/WKT';
import * as i0 from "@angular/core";
var WktService = /** @class */ (function () {
    function WktService() {
    }
    /**
     * @param {?} wkt
     * @param {?} wktProj
     * @param {?=} featureProj
     * @return {?}
     */
    WktService.prototype.wktToFeature = /**
     * @param {?} wkt
     * @param {?} wktProj
     * @param {?=} featureProj
     * @return {?}
     */
    function (wkt, wktProj, featureProj) {
        if (featureProj === void 0) { featureProj = 'EPSG:3857'; }
        return new olWKT().readFeature(wkt, {
            dataProjection: wktProj,
            featureProjection: featureProj
        });
    };
    /**
     * @param {?} epsgTO
     * @param {?} extent
     * @param {?} extentProj
     * @return {?}
     */
    WktService.prototype.extentToWkt = /**
     * @param {?} epsgTO
     * @param {?} extent
     * @param {?} extentProj
     * @return {?}
     */
    function (epsgTO, extent, extentProj) {
        /** @type {?} */
        var currentExtent = olproj.transformExtent(extent, extentProj, epsgTO);
        currentExtent = this.roundCoordinateArray(currentExtent, epsgTO, 0);
        /** @type {?} */
        var wktPoly = "POLYGON((\n      " + extent[0] + " " + extent[1] + ",\n      " + extent[0] + " " + extent[3] + ",\n      " + extent[2] + " " + extent[3] + ",\n      " + extent[2] + " " + extent[1] + ",\n      " + extent[0] + " " + extent[1] + "))";
        /** @type {?} */
        var wktLine = "LINESTRING(\n      " + extent[0] + " " + extent[1] + ",\n      " + extent[0] + " " + extent[3] + ",\n      " + extent[2] + " " + extent[3] + ",\n      " + extent[2] + " " + extent[1] + ",\n      " + extent[0] + " " + extent[1] + ")";
        /** @type {?} */
        var wktMultiPoints = "MULTIPOINT(\n        " + extent[0] + " " + extent[1] + ",\n        " + extent[0] + " " + extent[3] + ",\n        " + extent[2] + " " + extent[3] + ",\n        " + extent[2] + " " + extent[1] + ")";
        return {
            wktPoly: wktPoly,
            wktLine: wktLine,
            wktMultiPoints: wktMultiPoints
        };
    };
    /**
     * @private
     * @param {?} coordinateArray
     * @param {?} projection
     * @param {?=} decimal
     * @return {?}
     */
    WktService.prototype.roundCoordinateArray = /**
     * @private
     * @param {?} coordinateArray
     * @param {?} projection
     * @param {?=} decimal
     * @return {?}
     */
    function (coordinateArray, projection, decimal) {
        if (decimal === void 0) { decimal = 0; }
        /** @type {?} */
        var lproj = olproj.get(projection);
        /** @type {?} */
        var units = lproj.getUnits();
        /** @type {?} */
        var olUnits = ['ft', 'm', 'us-ft'];
        if (olUnits.indexOf(units) !== -1) {
            coordinateArray = this.roundArray(coordinateArray, decimal);
        }
        return coordinateArray;
    };
    /**
     * @private
     * @param {?} array
     * @param {?=} decimal
     * @return {?}
     */
    WktService.prototype.roundArray = /**
     * @private
     * @param {?} array
     * @param {?=} decimal
     * @return {?}
     */
    function (array, decimal) {
        if (decimal === void 0) { decimal = 0; }
        /** @type {?} */
        var x = 0;
        while (x < array.length) {
            array[x] = array[x].toFixed(decimal);
            x++;
        }
        return array;
    };
    /**
     * @param {?} snrc
     * @param {?=} epsgTO
     * @return {?}
     */
    WktService.prototype.snrcToWkt = /**
     * @param {?} snrc
     * @param {?=} epsgTO
     * @return {?}
     */
    function (snrc, epsgTO) {
        if (epsgTO === void 0) { epsgTO = 'EPSG:3857'; }
        snrc = snrc.toLowerCase();
        /** @type {?} */
        var wktPoly;
        /** @type {?} */
        var ew = {
            1: { from: -56, to: -64 },
            2: { from: -64, to: -72 },
            3: { from: -72, to: -80 },
            4: { from: -80, to: -88 },
            5: { from: -88, to: -96 },
            6: { from: -96, to: -104 },
            7: { from: -104, to: -112 },
            8: { from: -112, to: -120 },
            9: { from: -120, to: -128 },
            10: { from: -128, to: -136 }
        };
        /** @type {?} */
        var sn = {
            1: { from: 44, to: 48 },
            2: { from: 48, to: 52 },
            3: { from: 52, to: 56 },
            4: { from: 56, to: 60 },
            5: { from: 60, to: 64 },
            6: { from: 64, to: 68 },
            7: { from: 68, to: 72 },
            8: { from: 72, to: 76 },
            9: { from: 76, to: -128 }
        };
        /** @type {?} */
        var snrc250kIndex = [
            ['m', 'n', 'o', 'p'],
            ['l', 'k', 'j', 'i'],
            ['e', 'f', 'g', 'h'],
            ['d', 'c', 'b', 'a']
        ];
        /** @type {?} */
        var snrc50kIndex = [
            ['13', '14', '15', '16'],
            ['12', '11', '10', '09'],
            ['05', '06', '07', '08'],
            ['04', '03', '02', '01']
        ];
        /** @type {?} */
        var checkSNRC50k = /\d{2,3}[a-p][0,1][0-9]/gi;
        /** @type {?} */
        var checkSNRC250k = /\d{2,3}[a-p]/gi;
        /** @type {?} */
        var checkSNRC1m = /\d{2,3}/gi;
        /** @type {?} */
        var snrc1m = false;
        /** @type {?} */
        var snrc250k = false;
        /** @type {?} */
        var snrc50k = false;
        if (checkSNRC50k.test(snrc)) {
            snrc50k = true;
        }
        else {
            if (checkSNRC250k.test(snrc)) {
                snrc250k = true;
            }
            else {
                if (checkSNRC1m.test(snrc)) {
                    snrc1m = true;
                }
            }
        }
        if (snrc1m) {
            snrc += 'a01';
        }
        else if (snrc250k) {
            snrc += '01';
        }
        if (/\d{2,3}[a-p][0,1][0-9]/gi.test(snrc)) {
            /** @type {?} */
            var regex1m = /(?=[a-p])/gi;
            /** @type {?} */
            var ar1m = snrc.split(regex1m);
            /** @type {?} */
            var part1m = ar1m[0];
            /** @type {?} */
            var part250k_1 = ar1m[1][0];
            /** @type {?} */
            var part50k_1 = ar1m[1].split(part250k_1)[1];
            /** @type {?} */
            var separator = 1;
            if (part1m.length === 3) {
                separator = 2;
            }
            /** @type {?} */
            var partEW = part1m.substring(0, separator);
            /** @type {?} */
            var partSN = part1m.substring(separator);
            /** @type {?} */
            var unit1mEW = 8;
            /** @type {?} */
            var unit1mSN = 4;
            /** @type {?} */
            var unit250kEW = 2;
            /** @type {?} */
            var unit250kSN = 1;
            /** @type {?} */
            var unit50kEW = 0.5;
            /** @type {?} */
            var unit50kSN = 0.25;
            /** @type {?} */
            var index250kEW_1 = 0;
            /** @type {?} */
            var index250kSN_1 = 0;
            /** @type {?} */
            var index50kEW_1 = 0;
            /** @type {?} */
            var index50kSN_1 = 0;
            snrc250kIndex.forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                if (element.indexOf(part250k_1) !== -1) {
                    index250kSN_1 = snrc250kIndex.indexOf(element);
                    index250kEW_1 = element.indexOf(part250k_1);
                }
            }));
            snrc50kIndex.forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                if (element.indexOf(part50k_1) !== -1) {
                    index50kSN_1 = snrc50kIndex.indexOf(element);
                    index50kEW_1 = element.indexOf(part50k_1);
                }
            }));
            /** @type {?} */
            var increment250kEW = 0;
            /** @type {?} */
            var increment250kSN = 0;
            /** @type {?} */
            var increment50kEW = 0;
            /** @type {?} */
            var increment50kSN = 0;
            /** @type {?} */
            var unitPerTypeEW = unit1mEW;
            /** @type {?} */
            var unitPerTypeSN = unit1mSN;
            if (snrc250k) {
                increment250kEW = index250kEW_1 * unit250kEW;
                increment250kSN = index250kSN_1 * unit250kSN;
                increment50kEW = 0;
                increment50kSN = 0;
                unitPerTypeEW = unit250kEW;
                unitPerTypeSN = unit250kSN;
            }
            else if (snrc50k) {
                increment250kEW = index250kEW_1 * unit250kEW;
                increment250kSN = index250kSN_1 * unit250kSN;
                increment50kEW = index50kEW_1 * unit50kEW;
                increment50kSN = index50kSN_1 * unit50kSN;
                unitPerTypeEW = unit50kEW;
                unitPerTypeSN = unit50kSN;
            }
            /** @type {?} */
            var coord = {
                ul: [
                    ew[partEW].to + increment250kEW + increment50kEW,
                    sn[partSN].to - increment250kSN - increment50kSN
                ]
            };
            coord.lr = [
                coord.ul[0] + unitPerTypeEW,
                coord.ul[1] - unitPerTypeSN
            ];
            coord.ur = [coord.ul[0], coord.ul[1] - unitPerTypeSN];
            coord.ll = [coord.ul[0] + unitPerTypeEW, coord.ul[1]];
            coord.ul = olproj.transform([coord.ul[0], coord.ul[1]], 'EPSG:4326', epsgTO);
            coord.lr = olproj.transform([coord.lr[0], coord.lr[1]], 'EPSG:4326', epsgTO);
            coord.ur = olproj.transform([coord.ur[0], coord.ur[1]], 'EPSG:4326', epsgTO);
            coord.ll = olproj.transform([coord.ll[0], coord.ll[1]], 'EPSG:4326', epsgTO);
            // Rounded coordinate to shorten url in get
            coord.ul = this.roundCoordinateArray(coord.ul, epsgTO, 0);
            coord.lr = this.roundCoordinateArray(coord.lr, epsgTO, 0);
            coord.ur = this.roundCoordinateArray(coord.ur, epsgTO, 0);
            coord.ll = this.roundCoordinateArray(coord.ll, epsgTO, 0);
            wktPoly =
                'POLYGON((' +
                    [
                        coord.ul.join(' '),
                        coord.ur.join(' '),
                        coord.lr.join(' '),
                        coord.ll.join(' '),
                        coord.ul.join(' ')
                    ].join(',') +
                    '))';
            /** @type {?} */
            var wktLine = 'LINESTRING(' +
                [
                    coord.ul.join(' '),
                    coord.ur.join(' '),
                    coord.lr.join(' '),
                    coord.ll.join(' '),
                    coord.ul.join(' ')
                ].join(',') +
                ')';
            /** @type {?} */
            var wktMultiPoints = 'MULTIPOINT(' +
                [
                    coord.ul.join(' '),
                    coord.ur.join(' '),
                    coord.lr.join(' '),
                    coord.ll.join(' ')
                ].join(',') +
                ')';
            return {
                wktPoly: wktPoly,
                wktLine: wktLine,
                wktMultiPoints: wktMultiPoints
            };
        }
    };
    WktService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WktService.ctorParameters = function () { return []; };
    /** @nocollapse */ WktService.ngInjectableDef = i0.defineInjectable({ factory: function WktService_Factory() { return new WktService(); }, token: WktService, providedIn: "root" });
    return WktService;
}());
export { WktService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2t0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvd2t0L3NoYXJlZC93a3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEtBQUssTUFBTSxlQUFlLENBQUM7O0FBRWxDO0lBSUU7SUFBZSxDQUFDOzs7Ozs7O0lBRVQsaUNBQVk7Ozs7OztJQUFuQixVQUFvQixHQUFHLEVBQUUsT0FBTyxFQUFFLFdBQXlCO1FBQXpCLDRCQUFBLEVBQUEseUJBQXlCO1FBQ3pELE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ2xDLGNBQWMsRUFBRSxPQUFPO1lBQ3ZCLGlCQUFpQixFQUFFLFdBQVc7U0FDL0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQUNNLGdDQUFXOzs7Ozs7SUFBbEIsVUFBbUIsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVOztZQUN2QyxhQUFhLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQztRQUN0RSxhQUFhLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1lBQzlELE9BQU8sR0FBRyxzQkFDWixNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxpQkFDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsaUJBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLGlCQUN0QixNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxpQkFD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QUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDMUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUMzQixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQzNCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDM0IsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRTtTQUM3Qjs7WUFDSyxFQUFFLEdBQUc7WUFDVCxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDdkIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ3ZCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUN2QixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDdkIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ3ZCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUN2QixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDdkIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ3ZCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENB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LENBQUMsR0FBRyxDQUFDO29CQUNYLElBQUksQ0FBQzs7Z0JBQ0QsT0FBTyxHQUNYLGFBQWE7Z0JBQ2I7b0JBQ0UsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNsQixLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ2xCLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDbEIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNsQixLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ25CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDWCxHQUFHOztnQkFFQyxjQUFjLEdBQ2xCLGFBQWE7Z0JBQ2I7b0JBQ0UsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNsQixLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ2xCLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDbEIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNuQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ1gsR0FBRztZQUNMLE9BQU87Z0JBQ0wsT0FBTyxTQUFBO2dCQUNQLE9BQU8sU0FBQTtnQkFDUCxjQUFjLGdCQUFBO2FBQ2YsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Z0JBaFFGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7O3FCQVBEO0NBc1FDLEFBalFELElBaVFDO1NBOVBZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgKiBhcyBvbHByb2ogZnJvbSAnb2wvcHJvaic7XHJcbmltcG9ydCBvbFdLVCBmcm9tICdvbC9mb3JtYXQvV0tUJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFdrdFNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgcHVibGljIHdrdFRvRmVhdHVyZSh3a3QsIHdrdFByb2osIGZlYXR1cmVQcm9qID0gJ0VQU0c6Mzg1NycpIHtcclxuICAgIHJldHVybiBuZXcgb2xXS1QoKS5yZWFkRmVhdHVyZSh3a3QsIHtcclxuICAgICAgZGF0YVByb2plY3Rpb246IHdrdFByb2osXHJcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiBmZWF0dXJlUHJvalxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHB1YmxpYyBleHRlbnRUb1drdChlcHNnVE8sIGV4dGVudCwgZXh0ZW50UHJvaikge1xyXG4gICAgbGV0IGN1cnJlbnRFeHRlbnQgPSBvbHByb2oudHJhbnNmb3JtRXh0ZW50KGV4dGVudCwgZXh0ZW50UHJvaiwgZXBzZ1RPKTtcclxuICAgIGN1cnJlbnRFeHRlbnQgPSB0aGlzLnJvdW5kQ29vcmRpbmF0ZUFycmF5KGN1cnJlbnRFeHRlbnQsIGVwc2dUTywgMCk7XHJcbiAgICBjb25zdCB3a3RQb2x5ID0gYFBPTFlHT04oKFxyXG4gICAgICAke2V4dGVudFswXX0gJHtleHRlbnRbMV19LFxyXG4gICAgICAke2V4dGVudFswXX0gJHtleHRlbnRbM119LFxyXG4gICAgICAke2V4dGVudFsyXX0gJHtleHRlbnRbM119LFxyXG4gICAgICAke2V4dGVudFsyXX0gJHtleHRlbnRbMV19LFxyXG4gICAgICAke2V4dGVudFswXX0gJHtleHRlbnRbMV19KSlgO1xyXG4gICAgY29uc3Qgd2t0TGluZSA9IGBMSU5FU1RSSU5HKFxyXG4gICAgICAke2V4dGVudFswXX0gJHtleHRlbnRbMV19LFxyXG4gICAgICAke2V4dGVudFswXX0gJHtleHRlbnRbM119LFxyXG4gICAgICAke2V4dGVudFsyXX0gJHtleHRlbnRbM119LFxyXG4gICAgICAke2V4dGVudFsyXX0gJHtleHRlbnRbMV19LFxyXG4gICAgICAke2V4dGVudFswXX0gJHtleHRlbnRbMV19KWA7XHJcbiAgICBjb25zdCB3a3RNdWx0aVBvaW50cyA9IGBNVUxUSVBPSU5UKFxyXG4gICAgICAgICR7ZXh0ZW50WzBdfSAke2V4dGVudFsxXX0sXHJcbiAgICAgICAgJHtleHRlbnRbMF19ICR7ZXh0ZW50WzNdfSxcclxuICAgICAgICAke2V4dGVudFsyXX0gJHtleHRlbnRbM119LFxyXG4gICAgICAgICR7ZXh0ZW50WzJdfSAke2V4dGVudFsxXX0pYDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHdrdFBvbHksXHJcbiAgICAgIHdrdExpbmUsXHJcbiAgICAgIHdrdE11bHRpUG9pbnRzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByb3VuZENvb3JkaW5hdGVBcnJheShjb29yZGluYXRlQXJyYXksIHByb2plY3Rpb24sIGRlY2ltYWwgPSAwKSB7XHJcbiAgICBjb25zdCBscHJvaiA9IG9scHJvai5nZXQocHJvamVjdGlvbik7XHJcbiAgICBjb25zdCB1bml0cyA9IGxwcm9qLmdldFVuaXRzKCk7XHJcbiAgICBjb25zdCBvbFVuaXRzID0gWydmdCcsICdtJywgJ3VzLWZ0J107XHJcbiAgICBpZiAob2xVbml0cy5pbmRleE9mKHVuaXRzKSAhPT0gLTEpIHtcclxuICAgICAgY29vcmRpbmF0ZUFycmF5ID0gdGhpcy5yb3VuZEFycmF5KGNvb3JkaW5hdGVBcnJheSwgZGVjaW1hbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29vcmRpbmF0ZUFycmF5O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByb3VuZEFycmF5KGFycmF5LCBkZWNpbWFsID0gMCkge1xyXG4gICAgbGV0IHggPSAwO1xyXG4gICAgd2hpbGUgKHggPCBhcnJheS5sZW5ndGgpIHtcclxuICAgICAgYXJyYXlbeF0gPSBhcnJheVt4XS50b0ZpeGVkKGRlY2ltYWwpO1xyXG4gICAgICB4Kys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc25yY1RvV2t0KHNucmMsIGVwc2dUTyA9ICdFUFNHOjM4NTcnKSB7XHJcbiAgICBzbnJjID0gc25yYy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgbGV0IHdrdFBvbHk7XHJcbiAgICBjb25zdCBldyA9IHtcclxuICAgICAgMTogeyBmcm9tOiAtNTYsIHRvOiAtNjQgfSxcclxuICAgICAgMjogeyBmcm9tOiAtNjQsIHRvOiAtNzIgfSxcclxuICAgICAgMzogeyBmcm9tOiAtNzIsIHRvOiAtODAgfSxcclxuICAgICAgNDogeyBmcm9tOiAtODAsIHRvOiAtODggfSxcclxuICAgICAgNTogeyBmcm9tOiAtODgsIHRvOiAtOTYgfSxcclxuICAgICAgNjogeyBmcm9tOiAtOTYsIHRvOiAtMTA0IH0sXHJcbiAgICAgIDc6IHsgZnJvbTogLTEwNCwgdG86IC0xMTIgfSxcclxuICAgICAgODogeyBmcm9tOiAtMTEyLCB0bzogLTEyMCB9LFxyXG4gICAgICA5OiB7IGZyb206IC0xMjAsIHRvOiAtMTI4IH0sXHJcbiAgICAgIDEwOiB7IGZyb206IC0xMjgsIHRvOiAtMTM2IH1cclxuICAgIH07XHJcbiAgICBjb25zdCBzbiA9IHtcclxuICAgICAgMTogeyBmcm9tOiA0NCwgdG86IDQ4IH0sXHJcbiAgICAgIDI6IHsgZnJvbTogNDgsIHRvOiA1MiB9LFxyXG4gICAgICAzOiB7IGZyb206IDUyLCB0bzogNTYgfSxcclxuICAgICAgNDogeyBmcm9tOiA1NiwgdG86IDYwIH0sXHJcbiAgICAgIDU6IHsgZnJvbTogNjAsIHRvOiA2NCB9LFxyXG4gICAgICA2OiB7IGZyb206IDY0LCB0bzogNjggfSxcclxuICAgICAgNzogeyBmcm9tOiA2OCwgdG86IDcyIH0sXHJcbiAgICAgIDg6IHsgZnJvbTogNzIsIHRvOiA3NiB9LFxyXG4gICAgICA5OiB7IGZyb206IDc2LCB0bzogLTEyOCB9XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgc25yYzI1MGtJbmRleCA9IFtcclxuICAgICAgWydtJywgJ24nLCAnbycsICdwJ10sXHJcbiAgICAgIFsnbCcsICdrJywgJ2onLCAnaSddLFxyXG4gICAgICBbJ2UnLCAnZicsICdnJywgJ2gnXSxcclxuICAgICAgWydkJywgJ2MnLCAnYicsICdhJ11cclxuICAgIF07XHJcblxyXG4gICAgY29uc3Qgc25yYzUwa0luZGV4ID0gW1xyXG4gICAgICBbJzEzJywgJzE0JywgJzE1JywgJzE2J10sXHJcbiAgICAgIFsnMTInLCAnMTEnLCAnMTAnLCAnMDknXSxcclxuICAgICAgWycwNScsICcwNicsICcwNycsICcwOCddLFxyXG4gICAgICBbJzA0JywgJzAzJywgJzAyJywgJzAxJ11cclxuICAgIF07XHJcbiAgICBjb25zdCBjaGVja1NOUkM1MGsgPSAvXFxkezIsM31bYS1wXVswLDFdWzAtOV0vZ2k7XHJcbiAgICBjb25zdCBjaGVja1NOUkMyNTBrID0gL1xcZHsyLDN9W2EtcF0vZ2k7XHJcbiAgICBjb25zdCBjaGVja1NOUkMxbSA9IC9cXGR7MiwzfS9naTtcclxuXHJcbiAgICBsZXQgc25yYzFtID0gZmFsc2U7XHJcbiAgICBsZXQgc25yYzI1MGsgPSBmYWxzZTtcclxuICAgIGxldCBzbnJjNTBrID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKGNoZWNrU05SQzUway50ZXN0KHNucmMpKSB7XHJcbiAgICAgIHNucmM1MGsgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNoZWNrU05SQzI1MGsudGVzdChzbnJjKSkge1xyXG4gICAgICAgIHNucmMyNTBrID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoY2hlY2tTTlJDMW0udGVzdChzbnJjKSkge1xyXG4gICAgICAgICAgc25yYzFtID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoc25yYzFtKSB7XHJcbiAgICAgIHNucmMgKz0gJ2EwMSc7XHJcbiAgICB9IGVsc2UgaWYgKHNucmMyNTBrKSB7XHJcbiAgICAgIHNucmMgKz0gJzAxJztcclxuICAgIH1cclxuICAgIGlmICgvXFxkezIsM31bYS1wXVswLDFdWzAtOV0vZ2kudGVzdChzbnJjKSkge1xyXG4gICAgICBjb25zdCByZWdleDFtID0gLyg/PVthLXBdKS9naTtcclxuICAgICAgY29uc3QgYXIxbSA9IHNucmMuc3BsaXQocmVnZXgxbSk7XHJcbiAgICAgIGNvbnN0IHBhcnQxbSA9IGFyMW1bMF07XHJcbiAgICAgIGNvbnN0IHBhcnQyNTBrID0gYXIxbVsxXVswXTtcclxuICAgICAgY29uc3QgcGFydDUwayA9IGFyMW1bMV0uc3BsaXQocGFydDI1MGspWzFdO1xyXG4gICAgICBsZXQgc2VwYXJhdG9yID0gMTtcclxuICAgICAgaWYgKHBhcnQxbS5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICBzZXBhcmF0b3IgPSAyO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHBhcnRFVyA9IHBhcnQxbS5zdWJzdHJpbmcoMCwgc2VwYXJhdG9yKTtcclxuICAgICAgY29uc3QgcGFydFNOID0gcGFydDFtLnN1YnN0cmluZyhzZXBhcmF0b3IpO1xyXG4gICAgICBjb25zdCB1bml0MW1FVyA9IDg7XHJcbiAgICAgIGNvbnN0IHVuaXQxbVNOID0gNDtcclxuICAgICAgY29uc3QgdW5pdDI1MGtFVyA9IDI7XHJcbiAgICAgIGNvbnN0IHVuaXQyNTBrU04gPSAxO1xyXG4gICAgICBjb25zdCB1bml0NTBrRVcgPSAwLjU7XHJcbiAgICAgIGNvbnN0IHVuaXQ1MGtTTiA9IDAuMjU7XHJcbiAgICAgIGxldCBpbmRleDI1MGtFVyA9IDA7XHJcbiAgICAgIGxldCBpbmRleDI1MGtTTiA9IDA7XHJcbiAgICAgIGxldCBpbmRleDUwa0VXID0gMDtcclxuICAgICAgbGV0IGluZGV4NTBrU04gPSAwO1xyXG4gICAgICBzbnJjMjUwa0luZGV4LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQuaW5kZXhPZihwYXJ0MjUwaykgIT09IC0xKSB7XHJcbiAgICAgICAgICBpbmRleDI1MGtTTiA9IHNucmMyNTBrSW5kZXguaW5kZXhPZihlbGVtZW50KTtcclxuICAgICAgICAgIGluZGV4MjUwa0VXID0gZWxlbWVudC5pbmRleE9mKHBhcnQyNTBrKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBzbnJjNTBrSW5kZXguZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudC5pbmRleE9mKHBhcnQ1MGspICE9PSAtMSkge1xyXG4gICAgICAgICAgaW5kZXg1MGtTTiA9IHNucmM1MGtJbmRleC5pbmRleE9mKGVsZW1lbnQpO1xyXG4gICAgICAgICAgaW5kZXg1MGtFVyA9IGVsZW1lbnQuaW5kZXhPZihwYXJ0NTBrKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbGV0IGluY3JlbWVudDI1MGtFVyA9IDA7XHJcbiAgICAgIGxldCBpbmNyZW1lbnQyNTBrU04gPSAwO1xyXG4gICAgICBsZXQgaW5jcmVtZW50NTBrRVcgPSAwO1xyXG4gICAgICBsZXQgaW5jcmVtZW50NTBrU04gPSAwO1xyXG4gICAgICBsZXQgdW5pdFBlclR5cGVFVyA9IHVuaXQxbUVXO1xyXG4gICAgICBsZXQgdW5pdFBlclR5cGVTTiA9IHVuaXQxbVNOO1xyXG4gICAgICBpZiAoc25yYzI1MGspIHtcclxuICAgICAgICBpbmNyZW1lbnQyNTBrRVcgPSBpbmRleDI1MGtFVyAqIHVuaXQyNTBrRVc7XHJcbiAgICAgICAgaW5jcmVtZW50MjUwa1NOID0gaW5kZXgyNTBrU04gKiB1bml0MjUwa1NOO1xyXG4gICAgICAgIGluY3JlbWVudDUwa0VXID0gMDtcclxuICAgICAgICBpbmNyZW1lbnQ1MGtTTiA9IDA7XHJcbiAgICAgICAgdW5pdFBlclR5cGVFVyA9IHVuaXQyNTBrRVc7XHJcbiAgICAgICAgdW5pdFBlclR5cGVTTiA9IHVuaXQyNTBrU047XHJcbiAgICAgIH0gZWxzZSBpZiAoc25yYzUwaykge1xyXG4gICAgICAgIGluY3JlbWVudDI1MGtFVyA9IGluZGV4MjUwa0VXICogdW5pdDI1MGtFVztcclxuICAgICAgICBpbmNyZW1lbnQyNTBrU04gPSBpbmRleDI1MGtTTiAqIHVuaXQyNTBrU047XHJcbiAgICAgICAgaW5jcmVtZW50NTBrRVcgPSBpbmRleDUwa0VXICogdW5pdDUwa0VXO1xyXG4gICAgICAgIGluY3JlbWVudDUwa1NOID0gaW5kZXg1MGtTTiAqIHVuaXQ1MGtTTjtcclxuICAgICAgICB1bml0UGVyVHlwZUVXID0gdW5pdDUwa0VXO1xyXG4gICAgICAgIHVuaXRQZXJUeXBlU04gPSB1bml0NTBrU047XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvb3JkOiB7dWw/OiBhbnksIGxyPzogYW55LCB1cj86IGFueSwgbGw/OiBhbnl9ID0ge1xyXG4gICAgICAgIHVsOiBbXHJcbiAgICAgICAgICBld1twYXJ0RVddLnRvICsgaW5jcmVtZW50MjUwa0VXICsgaW5jcmVtZW50NTBrRVcsXHJcbiAgICAgICAgICBzbltwYXJ0U05dLnRvIC0gaW5jcmVtZW50MjUwa1NOIC0gaW5jcmVtZW50NTBrU05cclxuICAgICAgICBdXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb29yZC5sciA9IFtcclxuICAgICAgICBjb29yZC51bFswXSArIHVuaXRQZXJUeXBlRVcsXHJcbiAgICAgICAgY29vcmQudWxbMV0gLSB1bml0UGVyVHlwZVNOXHJcbiAgICAgIF07XHJcbiAgICAgIGNvb3JkLnVyID0gW2Nvb3JkLnVsWzBdLCBjb29yZC51bFsxXSAtIHVuaXRQZXJUeXBlU05dO1xyXG4gICAgICBjb29yZC5sbCA9IFtjb29yZC51bFswXSArIHVuaXRQZXJUeXBlRVcsIGNvb3JkLnVsWzFdXTtcclxuXHJcbiAgICAgIGNvb3JkLnVsID0gb2xwcm9qLnRyYW5zZm9ybShcclxuICAgICAgICBbY29vcmQudWxbMF0sIGNvb3JkLnVsWzFdXSxcclxuICAgICAgICAnRVBTRzo0MzI2JyxcclxuICAgICAgICBlcHNnVE9cclxuICAgICAgKTtcclxuICAgICAgY29vcmQubHIgPSBvbHByb2oudHJhbnNmb3JtKFxyXG4gICAgICAgIFtjb29yZC5sclswXSwgY29vcmQubHJbMV1dLFxyXG4gICAgICAgICdFUFNHOjQzMjYnLFxyXG4gICAgICAgIGVwc2dUT1xyXG4gICAgICApO1xyXG4gICAgICBjb29yZC51ciA9IG9scHJvai50cmFuc2Zvcm0oXHJcbiAgICAgICAgW2Nvb3JkLnVyWzBdLCBjb29yZC51clsxXV0sXHJcbiAgICAgICAgJ0VQU0c6NDMyNicsXHJcbiAgICAgICAgZXBzZ1RPXHJcbiAgICAgICk7XHJcbiAgICAgIGNvb3JkLmxsID0gb2xwcm9qLnRyYW5zZm9ybShcclxuICAgICAgICBbY29vcmQubGxbMF0sIGNvb3JkLmxsWzFdXSxcclxuICAgICAgICAnRVBTRzo0MzI2JyxcclxuICAgICAgICBlcHNnVE9cclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIFJvdW5kZWQgY29vcmRpbmF0ZSB0byBzaG9ydGVuIHVybCBpbiBnZXRcclxuICAgICAgY29vcmQudWwgPSB0aGlzLnJvdW5kQ29vcmRpbmF0ZUFycmF5KGNvb3JkLnVsLCBlcHNnVE8sIDApO1xyXG4gICAgICBjb29yZC5sciA9IHRoaXMucm91bmRDb29yZGluYXRlQXJyYXkoY29vcmQubHIsIGVwc2dUTywgMCk7XHJcbiAgICAgIGNvb3JkLnVyID0gdGhpcy5yb3VuZENvb3JkaW5hdGVBcnJheShjb29yZC51ciwgZXBzZ1RPLCAwKTtcclxuICAgICAgY29vcmQubGwgPSB0aGlzLnJvdW5kQ29vcmRpbmF0ZUFycmF5KGNvb3JkLmxsLCBlcHNnVE8sIDApO1xyXG5cclxuICAgICAgd2t0UG9seSA9XHJcbiAgICAgICAgJ1BPTFlHT04oKCcgK1xyXG4gICAgICAgIFtcclxuICAgICAgICAgIGNvb3JkLnVsLmpvaW4oJyAnKSxcclxuICAgICAgICAgIGNvb3JkLnVyLmpvaW4oJyAnKSxcclxuICAgICAgICAgIGNvb3JkLmxyLmpvaW4oJyAnKSxcclxuICAgICAgICAgIGNvb3JkLmxsLmpvaW4oJyAnKSxcclxuICAgICAgICAgIGNvb3JkLnVsLmpvaW4oJyAnKVxyXG4gICAgICAgIF0uam9pbignLCcpICtcclxuICAgICAgICAnKSknO1xyXG4gICAgICBjb25zdCB3a3RMaW5lID1cclxuICAgICAgICAnTElORVNUUklORygnICtcclxuICAgICAgICBbXHJcbiAgICAgICAgICBjb29yZC51bC5qb2luKCcgJyksXHJcbiAgICAgICAgICBjb29yZC51ci5qb2luKCcgJyksXHJcbiAgICAgICAgICBjb29yZC5sci5qb2luKCcgJyksXHJcbiAgICAgICAgICBjb29yZC5sbC5qb2luKCcgJyksXHJcbiAgICAgICAgICBjb29yZC51bC5qb2luKCcgJylcclxuICAgICAgICBdLmpvaW4oJywnKSArXHJcbiAgICAgICAgJyknO1xyXG5cclxuICAgICAgY29uc3Qgd2t0TXVsdGlQb2ludHMgPVxyXG4gICAgICAgICdNVUxUSVBPSU5UKCcgK1xyXG4gICAgICAgIFtcclxuICAgICAgICAgIGNvb3JkLnVsLmpvaW4oJyAnKSxcclxuICAgICAgICAgIGNvb3JkLnVyLmpvaW4oJyAnKSxcclxuICAgICAgICAgIGNvb3JkLmxyLmpvaW4oJyAnKSxcclxuICAgICAgICAgIGNvb3JkLmxsLmpvaW4oJyAnKVxyXG4gICAgICAgIF0uam9pbignLCcpICtcclxuICAgICAgICAnKSc7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgd2t0UG9seSxcclxuICAgICAgICB3a3RMaW5lLFxyXG4gICAgICAgIHdrdE11bHRpUG9pbnRzXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==