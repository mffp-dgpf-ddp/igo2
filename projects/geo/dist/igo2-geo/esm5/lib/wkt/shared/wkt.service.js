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
     * @param {?} featureProj
     * @return {?}
     */
    WktService.prototype.wktToFeature = /**
     * @param {?} wkt
     * @param {?} wktProj
     * @param {?} featureProj
     * @return {?}
     */
    function (wkt, wktProj, featureProj) {
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
     * @param {?} epsgTO
     * @return {?}
     */
    WktService.prototype.snrcToWkt = /**
     * @param {?} snrc
     * @param {?} epsgTO
     * @return {?}
     */
    function (snrc, epsgTO) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2t0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvd2t0L3NoYXJlZC93a3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEtBQUssTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEtBQUssTUFBTSxlQUFlLENBQUM7O0FBRWxDO0lBSUU7SUFBZSxDQUFDOzs7Ozs7O0lBRVQsaUNBQVk7Ozs7OztJQUFuQixVQUFvQixHQUFHLEVBQUUsT0FBTyxFQUFFLFdBQVc7UUFDM0MsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDbEMsY0FBYyxFQUFFLE9BQU87WUFDdkIsaUJBQWlCLEVBQUUsV0FBVztTQUMvQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBQ00sZ0NBQVc7Ozs7OztJQUFsQixVQUFtQixNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVU7O1lBQ3ZDLGFBQWEsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDO1FBQ3RFLGFBQWEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQzs7WUFDOUQsT0FBTyxHQUFHLHNCQUNaLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLGlCQUN0QixNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxpQkFDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsaUJBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLGlCQUN0QixNQUFNLENBQUMsQ0FBQyxDQUFDLFNB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QUFFO1lBQzFCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDM0IsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUMzQixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQzNCLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUU7U0FDN0I7O1lBQ0ssRUFBRSxHQUFHO1lBQ1QsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ3ZCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUN2QixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDdkIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ3ZCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUN2QixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDdkIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ3ZCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUN2QixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRTtTQUMxQjs7WUFDSyxhQUFhLEdBQUc7WUFDcEIsQ0FBQyxHQUFH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QUFhO2dCQUNiO29CQUNFLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDbEIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNsQixLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ2xCLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDbEIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNuQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ1gsR0FBRzs7Z0JBRUMsY0FBYyxHQUNsQixhQUFhO2dCQUNiO29CQUNFLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDbEIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNsQixLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ2xCLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDbkIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNYLEdBQUc7WUFDTCxPQUFPO2dCQUNMLE9BQU8sU0FBQTtnQkFDUCxPQUFPLFNBQUE7Z0JBQ1AsY0FBYyxnQkFBQTthQUNmLENBQUM7U0FDSDtJQUNILENBQUM7O2dCQWhRRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OztxQkFQRDtDQXNRQyxBQWpRRCxJQWlRQztTQTlQWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgb2xXS1QgZnJvbSAnb2wvZm9ybWF0L1dLVCc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXa3RTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHB1YmxpYyB3a3RUb0ZlYXR1cmUod2t0LCB3a3RQcm9qLCBmZWF0dXJlUHJvaikge1xyXG4gICAgcmV0dXJuIG5ldyBvbFdLVCgpLnJlYWRGZWF0dXJlKHdrdCwge1xyXG4gICAgICBkYXRhUHJvamVjdGlvbjogd2t0UHJvaixcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IGZlYXR1cmVQcm9qXHJcbiAgICB9KTtcclxuICB9XHJcbiAgcHVibGljIGV4dGVudFRvV2t0KGVwc2dUTywgZXh0ZW50LCBleHRlbnRQcm9qKSB7XHJcbiAgICBsZXQgY3VycmVudEV4dGVudCA9IG9scHJvai50cmFuc2Zvcm1FeHRlbnQoZXh0ZW50LCBleHRlbnRQcm9qLCBlcHNnVE8pO1xyXG4gICAgY3VycmVudEV4dGVudCA9IHRoaXMucm91bmRDb29yZGluYXRlQXJyYXkoY3VycmVudEV4dGVudCwgZXBzZ1RPLCAwKTtcclxuICAgIGNvbnN0IHdrdFBvbHkgPSBgUE9MWUdPTigoXHJcbiAgICAgICR7ZXh0ZW50WzBdfSAke2V4dGVudFsxXX0sXHJcbiAgICAgICR7ZXh0ZW50WzBdfSAke2V4dGVudFszXX0sXHJcbiAgICAgICR7ZXh0ZW50WzJdfSAke2V4dGVudFszXX0sXHJcbiAgICAgICR7ZXh0ZW50WzJdfSAke2V4dGVudFsxXX0sXHJcbiAgICAgICR7ZXh0ZW50WzBdfSAke2V4dGVudFsxXX0pKWA7XHJcbiAgICBjb25zdCB3a3RMaW5lID0gYExJTkVTVFJJTkcoXHJcbiAgICAgICR7ZXh0ZW50WzBdfSAke2V4dGVudFsxXX0sXHJcbiAgICAgICR7ZXh0ZW50WzBdfSAke2V4dGVudFszXX0sXHJcbiAgICAgICR7ZXh0ZW50WzJdfSAke2V4dGVudFszXX0sXHJcbiAgICAgICR7ZXh0ZW50WzJdfSAke2V4dGVudFsxXX0sXHJcbiAgICAgICR7ZXh0ZW50WzBdfSAke2V4dGVudFsxXX0pYDtcclxuICAgIGNvbnN0IHdrdE11bHRpUG9pbnRzID0gYE1VTFRJUE9JTlQoXHJcbiAgICAgICAgJHtleHRlbnRbMF19ICR7ZXh0ZW50WzFdfSxcclxuICAgICAgICAke2V4dGVudFswXX0gJHtleHRlbnRbM119LFxyXG4gICAgICAgICR7ZXh0ZW50WzJdfSAke2V4dGVudFszXX0sXHJcbiAgICAgICAgJHtleHRlbnRbMl19ICR7ZXh0ZW50WzFdfSlgO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgd2t0UG9seSxcclxuICAgICAgd2t0TGluZSxcclxuICAgICAgd2t0TXVsdGlQb2ludHNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJvdW5kQ29vcmRpbmF0ZUFycmF5KGNvb3JkaW5hdGVBcnJheSwgcHJvamVjdGlvbiwgZGVjaW1hbCA9IDApIHtcclxuICAgIGNvbnN0IGxwcm9qID0gb2xwcm9qLmdldChwcm9qZWN0aW9uKTtcclxuICAgIGNvbnN0IHVuaXRzID0gbHByb2ouZ2V0VW5pdHMoKTtcclxuICAgIGNvbnN0IG9sVW5pdHMgPSBbJ2Z0JywgJ20nLCAndXMtZnQnXTtcclxuICAgIGlmIChvbFVuaXRzLmluZGV4T2YodW5pdHMpICE9PSAtMSkge1xyXG4gICAgICBjb29yZGluYXRlQXJyYXkgPSB0aGlzLnJvdW5kQXJyYXkoY29vcmRpbmF0ZUFycmF5LCBkZWNpbWFsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb29yZGluYXRlQXJyYXk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJvdW5kQXJyYXkoYXJyYXksIGRlY2ltYWwgPSAwKSB7XHJcbiAgICBsZXQgeCA9IDA7XHJcbiAgICB3aGlsZSAoeCA8IGFycmF5Lmxlbmd0aCkge1xyXG4gICAgICBhcnJheVt4XSA9IGFycmF5W3hdLnRvRml4ZWQoZGVjaW1hbCk7XHJcbiAgICAgIHgrKztcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJheTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzbnJjVG9Xa3Qoc25yYywgZXBzZ1RPKSB7XHJcbiAgICBzbnJjID0gc25yYy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgbGV0IHdrdFBvbHk7XHJcbiAgICBjb25zdCBldyA9IHtcclxuICAgICAgMTogeyBmcm9tOiAtNTYsIHRvOiAtNjQgfSxcclxuICAgICAgMjogeyBmcm9tOiAtNjQsIHRvOiAtNzIgfSxcclxuICAgICAgMzogeyBmcm9tOiAtNzIsIHRvOiAtODAgfSxcclxuICAgICAgNDogeyBmcm9tOiAtODAsIHRvOiAtODggfSxcclxuICAgICAgNTogeyBmcm9tOiAtODgsIHRvOiAtOTYgfSxcclxuICAgICAgNjogeyBmcm9tOiAtOTYsIHRvOiAtMTA0IH0sXHJcbiAgICAgIDc6IHsgZnJvbTogLTEwNCwgdG86IC0xMTIgfSxcclxuICAgICAgODogeyBmcm9tOiAtMTEyLCB0bzogLTEyMCB9LFxyXG4gICAgICA5OiB7IGZyb206IC0xMjAsIHRvOiAtMTI4IH0sXHJcbiAgICAgIDEwOiB7IGZyb206IC0xMjgsIHRvOiAtMTM2IH1cclxuICAgIH07XHJcbiAgICBjb25zdCBzbiA9IHtcclxuICAgICAgMTogeyBmcm9tOiA0NCwgdG86IDQ4IH0sXHJcbiAgICAgIDI6IHsgZnJvbTogNDgsIHRvOiA1MiB9LFxyXG4gICAgICAzOiB7IGZyb206IDUyLCB0bzogNTYgfSxcclxuICAgICAgNDogeyBmcm9tOiA1NiwgdG86IDYwIH0sXHJcbiAgICAgIDU6IHsgZnJvbTogNjAsIHRvOiA2NCB9LFxyXG4gICAgICA2OiB7IGZyb206IDY0LCB0bzogNjggfSxcclxuICAgICAgNzogeyBmcm9tOiA2OCwgdG86IDcyIH0sXHJcbiAgICAgIDg6IHsgZnJvbTogNzIsIHRvOiA3NiB9LFxyXG4gICAgICA5OiB7IGZyb206IDc2LCB0bzogLTEyOCB9XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgc25yYzI1MGtJbmRleCA9IFtcclxuICAgICAgWydtJywgJ24nLCAnbycsICdwJ10sXHJcbiAgICAgIFsnbCcsICdrJywgJ2onLCAnaSddLFxyXG4gICAgICBbJ2UnLCAnZicsICdnJywgJ2gnXSxcclxuICAgICAgWydkJywgJ2MnLCAnYicsICdhJ11cclxuICAgIF07XHJcblxyXG4gICAgY29uc3Qgc25yYzUwa0luZGV4ID0gW1xyXG4gICAgICBbJzEzJywgJzE0JywgJzE1JywgJzE2J10sXHJcbiAgICAgIFsnMTInLCAnMTEnLCAnMTAnLCAnMDknXSxcclxuICAgICAgWycwNScsICcwNicsICcwNycsICcwOCddLFxyXG4gICAgICBbJzA0JywgJzAzJywgJzAyJywgJzAxJ11cclxuICAgIF07XHJcbiAgICBjb25zdCBjaGVja1NOUkM1MGsgPSAvXFxkezIsM31bYS1wXVswLDFdWzAtOV0vZ2k7XHJcbiAgICBjb25zdCBjaGVja1NOUkMyNTBrID0gL1xcZHsyLDN9W2EtcF0vZ2k7XHJcbiAgICBjb25zdCBjaGVja1NOUkMxbSA9IC9cXGR7MiwzfS9naTtcclxuXHJcbiAgICBsZXQgc25yYzFtID0gZmFsc2U7XHJcbiAgICBsZXQgc25yYzI1MGsgPSBmYWxzZTtcclxuICAgIGxldCBzbnJjNTBrID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKGNoZWNrU05SQzUway50ZXN0KHNucmMpKSB7XHJcbiAgICAgIHNucmM1MGsgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNoZWNrU05SQzI1MGsudGVzdChzbnJjKSkge1xyXG4gICAgICAgIHNucmMyNTBrID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoY2hlY2tTTlJDMW0udGVzdChzbnJjKSkge1xyXG4gICAgICAgICAgc25yYzFtID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoc25yYzFtKSB7XHJcbiAgICAgIHNucmMgKz0gJ2EwMSc7XHJcbiAgICB9IGVsc2UgaWYgKHNucmMyNTBrKSB7XHJcbiAgICAgIHNucmMgKz0gJzAxJztcclxuICAgIH1cclxuICAgIGlmICgvXFxkezIsM31bYS1wXVswLDFdWzAtOV0vZ2kudGVzdChzbnJjKSkge1xyXG4gICAgICBjb25zdCByZWdleDFtID0gLyg/PVthLXBdKS9naTtcclxuICAgICAgY29uc3QgYXIxbSA9IHNucmMuc3BsaXQocmVnZXgxbSk7XHJcbiAgICAgIGNvbnN0IHBhcnQxbSA9IGFyMW1bMF07XHJcbiAgICAgIGNvbnN0IHBhcnQyNTBrID0gYXIxbVsxXVswXTtcclxuICAgICAgY29uc3QgcGFydDUwayA9IGFyMW1bMV0uc3BsaXQocGFydDI1MGspWzFdO1xyXG4gICAgICBsZXQgc2VwYXJhdG9yID0gMTtcclxuICAgICAgaWYgKHBhcnQxbS5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICBzZXBhcmF0b3IgPSAyO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHBhcnRFVyA9IHBhcnQxbS5zdWJzdHJpbmcoMCwgc2VwYXJhdG9yKTtcclxuICAgICAgY29uc3QgcGFydFNOID0gcGFydDFtLnN1YnN0cmluZyhzZXBhcmF0b3IpO1xyXG4gICAgICBjb25zdCB1bml0MW1FVyA9IDg7XHJcbiAgICAgIGNvbnN0IHVuaXQxbVNOID0gNDtcclxuICAgICAgY29uc3QgdW5pdDI1MGtFVyA9IDI7XHJcbiAgICAgIGNvbnN0IHVuaXQyNTBrU04gPSAxO1xyXG4gICAgICBjb25zdCB1bml0NTBrRVcgPSAwLjU7XHJcbiAgICAgIGNvbnN0IHVuaXQ1MGtTTiA9IDAuMjU7XHJcbiAgICAgIGxldCBpbmRleDI1MGtFVyA9IDA7XHJcbiAgICAgIGxldCBpbmRleDI1MGtTTiA9IDA7XHJcbiAgICAgIGxldCBpbmRleDUwa0VXID0gMDtcclxuICAgICAgbGV0IGluZGV4NTBrU04gPSAwO1xyXG4gICAgICBzbnJjMjUwa0luZGV4LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQuaW5kZXhPZihwYXJ0MjUwaykgIT09IC0xKSB7XHJcbiAgICAgICAgICBpbmRleDI1MGtTTiA9IHNucmMyNTBrSW5kZXguaW5kZXhPZihlbGVtZW50KTtcclxuICAgICAgICAgIGluZGV4MjUwa0VXID0gZWxlbWVudC5pbmRleE9mKHBhcnQyNTBrKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBzbnJjNTBrSW5kZXguZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudC5pbmRleE9mKHBhcnQ1MGspICE9PSAtMSkge1xyXG4gICAgICAgICAgaW5kZXg1MGtTTiA9IHNucmM1MGtJbmRleC5pbmRleE9mKGVsZW1lbnQpO1xyXG4gICAgICAgICAgaW5kZXg1MGtFVyA9IGVsZW1lbnQuaW5kZXhPZihwYXJ0NTBrKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbGV0IGluY3JlbWVudDI1MGtFVyA9IDA7XHJcbiAgICAgIGxldCBpbmNyZW1lbnQyNTBrU04gPSAwO1xyXG4gICAgICBsZXQgaW5jcmVtZW50NTBrRVcgPSAwO1xyXG4gICAgICBsZXQgaW5jcmVtZW50NTBrU04gPSAwO1xyXG4gICAgICBsZXQgdW5pdFBlclR5cGVFVyA9IHVuaXQxbUVXO1xyXG4gICAgICBsZXQgdW5pdFBlclR5cGVTTiA9IHVuaXQxbVNOO1xyXG4gICAgICBpZiAoc25yYzI1MGspIHtcclxuICAgICAgICBpbmNyZW1lbnQyNTBrRVcgPSBpbmRleDI1MGtFVyAqIHVuaXQyNTBrRVc7XHJcbiAgICAgICAgaW5jcmVtZW50MjUwa1NOID0gaW5kZXgyNTBrU04gKiB1bml0MjUwa1NOO1xyXG4gICAgICAgIGluY3JlbWVudDUwa0VXID0gMDtcclxuICAgICAgICBpbmNyZW1lbnQ1MGtTTiA9IDA7XHJcbiAgICAgICAgdW5pdFBlclR5cGVFVyA9IHVuaXQyNTBrRVc7XHJcbiAgICAgICAgdW5pdFBlclR5cGVTTiA9IHVuaXQyNTBrU047XHJcbiAgICAgIH0gZWxzZSBpZiAoc25yYzUwaykge1xyXG4gICAgICAgIGluY3JlbWVudDI1MGtFVyA9IGluZGV4MjUwa0VXICogdW5pdDI1MGtFVztcclxuICAgICAgICBpbmNyZW1lbnQyNTBrU04gPSBpbmRleDI1MGtTTiAqIHVuaXQyNTBrU047XHJcbiAgICAgICAgaW5jcmVtZW50NTBrRVcgPSBpbmRleDUwa0VXICogdW5pdDUwa0VXO1xyXG4gICAgICAgIGluY3JlbWVudDUwa1NOID0gaW5kZXg1MGtTTiAqIHVuaXQ1MGtTTjtcclxuICAgICAgICB1bml0UGVyVHlwZUVXID0gdW5pdDUwa0VXO1xyXG4gICAgICAgIHVuaXRQZXJUeXBlU04gPSB1bml0NTBrU047XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvb3JkOiB7dWw/OiBhbnksIGxyPzogYW55LCB1cj86IGFueSwgbGw/OiBhbnl9ID0ge1xyXG4gICAgICAgIHVsOiBbXHJcbiAgICAgICAgICBld1twYXJ0RVddLnRvICsgaW5jcmVtZW50MjUwa0VXICsgaW5jcmVtZW50NTBrRVcsXHJcbiAgICAgICAgICBzbltwYXJ0U05dLnRvIC0gaW5jcmVtZW50MjUwa1NOIC0gaW5jcmVtZW50NTBrU05cclxuICAgICAgICBdXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb29yZC5sciA9IFtcclxuICAgICAgICBjb29yZC51bFswXSArIHVuaXRQZXJUeXBlRVcsXHJcbiAgICAgICAgY29vcmQudWxbMV0gLSB1bml0UGVyVHlwZVNOXHJcbiAgICAgIF07XHJcbiAgICAgIGNvb3JkLnVyID0gW2Nvb3JkLnVsWzBdLCBjb29yZC51bFsxXSAtIHVuaXRQZXJUeXBlU05dO1xyXG4gICAgICBjb29yZC5sbCA9IFtjb29yZC51bFswXSArIHVuaXRQZXJUeXBlRVcsIGNvb3JkLnVsWzFdXTtcclxuXHJcbiAgICAgIGNvb3JkLnVsID0gb2xwcm9qLnRyYW5zZm9ybShcclxuICAgICAgICBbY29vcmQudWxbMF0sIGNvb3JkLnVsWzFdXSxcclxuICAgICAgICAnRVBTRzo0MzI2JyxcclxuICAgICAgICBlcHNnVE9cclxuICAgICAgKTtcclxuICAgICAgY29vcmQubHIgPSBvbHByb2oudHJhbnNmb3JtKFxyXG4gICAgICAgIFtjb29yZC5sclswXSwgY29vcmQubHJbMV1dLFxyXG4gICAgICAgICdFUFNHOjQzMjYnLFxyXG4gICAgICAgIGVwc2dUT1xyXG4gICAgICApO1xyXG4gICAgICBjb29yZC51ciA9IG9scHJvai50cmFuc2Zvcm0oXHJcbiAgICAgICAgW2Nvb3JkLnVyWzBdLCBjb29yZC51clsxXV0sXHJcbiAgICAgICAgJ0VQU0c6NDMyNicsXHJcbiAgICAgICAgZXBzZ1RPXHJcbiAgICAgICk7XHJcbiAgICAgIGNvb3JkLmxsID0gb2xwcm9qLnRyYW5zZm9ybShcclxuICAgICAgICBbY29vcmQubGxbMF0sIGNvb3JkLmxsWzFdXSxcclxuICAgICAgICAnRVBTRzo0MzI2JyxcclxuICAgICAgICBlcHNnVE9cclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIFJvdW5kZWQgY29vcmRpbmF0ZSB0byBzaG9ydGVuIHVybCBpbiBnZXRcclxuICAgICAgY29vcmQudWwgPSB0aGlzLnJvdW5kQ29vcmRpbmF0ZUFycmF5KGNvb3JkLnVsLCBlcHNnVE8sIDApO1xyXG4gICAgICBjb29yZC5sciA9IHRoaXMucm91bmRDb29yZGluYXRlQXJyYXkoY29vcmQubHIsIGVwc2dUTywgMCk7XHJcbiAgICAgIGNvb3JkLnVyID0gdGhpcy5yb3VuZENvb3JkaW5hdGVBcnJheShjb29yZC51ciwgZXBzZ1RPLCAwKTtcclxuICAgICAgY29vcmQubGwgPSB0aGlzLnJvdW5kQ29vcmRpbmF0ZUFycmF5KGNvb3JkLmxsLCBlcHNnVE8sIDApO1xyXG5cclxuICAgICAgd2t0UG9seSA9XHJcbiAgICAgICAgJ1BPTFlHT04oKCcgK1xyXG4gICAgICAgIFtcclxuICAgICAgICAgIGNvb3JkLnVsLmpvaW4oJyAnKSxcclxuICAgICAgICAgIGNvb3JkLnVyLmpvaW4oJyAnKSxcclxuICAgICAgICAgIGNvb3JkLmxyLmpvaW4oJyAnKSxcclxuICAgICAgICAgIGNvb3JkLmxsLmpvaW4oJyAnKSxcclxuICAgICAgICAgIGNvb3JkLnVsLmpvaW4oJyAnKVxyXG4gICAgICAgIF0uam9pbignLCcpICtcclxuICAgICAgICAnKSknO1xyXG4gICAgICBjb25zdCB3a3RMaW5lID1cclxuICAgICAgICAnTElORVNUUklORygnICtcclxuICAgICAgICBbXHJcbiAgICAgICAgICBjb29yZC51bC5qb2luKCcgJyksXHJcbiAgICAgICAgICBjb29yZC51ci5qb2luKCcgJyksXHJcbiAgICAgICAgICBjb29yZC5sci5qb2luKCcgJyksXHJcbiAgICAgICAgICBjb29yZC5sbC5qb2luKCcgJyksXHJcbiAgICAgICAgICBjb29yZC51bC5qb2luKCcgJylcclxuICAgICAgICBdLmpvaW4oJywnKSArXHJcbiAgICAgICAgJyknO1xyXG5cclxuICAgICAgY29uc3Qgd2t0TXVsdGlQb2ludHMgPVxyXG4gICAgICAgICdNVUxUSVBPSU5UKCcgK1xyXG4gICAgICAgIFtcclxuICAgICAgICAgIGNvb3JkLnVsLmpvaW4oJyAnKSxcclxuICAgICAgICAgIGNvb3JkLnVyLmpvaW4oJyAnKSxcclxuICAgICAgICAgIGNvb3JkLmxyLmpvaW4oJyAnKSxcclxuICAgICAgICAgIGNvb3JkLmxsLmpvaW4oJyAnKVxyXG4gICAgICAgIF0uam9pbignLCcpICtcclxuICAgICAgICAnKSc7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgd2t0UG9seSxcclxuICAgICAgICB3a3RMaW5lLFxyXG4gICAgICAgIHdrdE11bHRpUG9pbnRzXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==