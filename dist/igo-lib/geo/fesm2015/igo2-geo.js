import olSourceOSM from 'ol/source/OSM';
import olSourceXYZ from 'ol/source/XYZ';
import { bbox, and, between, contains, during, equalTo, greaterThan, greaterThanOrEqualTo, intersects, isNull, lessThan, lessThanOrEqualTo, like, notEqualTo, within, or, not } from 'ol/format/filter';
import olFormatWFS from 'ol/format/WFS';
import olSourceImageWMS from 'ol/source/ImageWMS';
import olSourceWMTS from 'ol/source/WMTS';
import olTileGridWMTS from 'ol/tilegrid/WMTS';
import { getTopLeft, getWidth } from 'ol/extent.js';
import olSourceCarto from 'ol/source/CartoDB';
import { bbox as bbox$1 } from 'ol/loadingstrategy';
import olSourceTileArcGISRest from 'ol/source/TileArcGISRest';
import { Md5 } from 'ts-md5';
import olSourceVectorTile from 'ol/source/VectorTile';
import olFormatMVT from 'ol/format/MVT';
import olSourceCluster from 'ol/source/Cluster';
import { Cacheable } from 'ngx-cacheable';
import { optionsFromCapabilities } from 'ol/source/WMTS.js';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olGeolocation from 'ol/Geolocation';
import olAttribution from 'ol/control/Attribution';
import olControlScaleLine from 'ol/control/ScaleLine';
import olCircle from 'ol/geom/Circle';
import olLayerImage from 'ol/layer/Image';
import olLayerTile from 'ol/layer/Tile';
import { asArray } from 'ol/color';
import olLayerVectorTile from 'ol/layer/VectorTile';
import { easeOut } from 'ol/easing';
import { MAC } from 'ol/has';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { trigger, state, style, transition, animate } from '@angular/animations';
import olFormatGML2 from 'ol/format/GML2';
import olFormatGML3 from 'ol/format/GML3';
import olFormatEsriJSON from 'ol/format/EsriJSON';
import olProjection from 'ol/proj/Projection';
import { DomSanitizer } from '@angular/platform-browser';
import { duration } from 'moment';
import olWKT from 'ol/format/WKT';
import { __decorate, __metadata } from 'tslib';
import 'ol/geom/GeometryType';
import OlPoint from 'ol/geom/Point';
import OlOverlay from 'ol/Overlay';
import { getLength, getArea as getArea$1 } from 'ol/sphere';
import OlStyle from 'ol/style/Style';
import OlLineString from 'ol/geom/LineString';
import lineIntersect from '@turf/line-intersect';
import { lineString } from '@turf/helpers';
import OlModify from 'ol/interaction/Modify';
import OlTranslate from 'ol/interaction/Translate';
import OlDraw from 'ol/interaction/Draw';
import OlPolygon from 'ol/geom/Polygon';
import OlLinearRing from 'ol/geom/LinearRing';
import OlDragBoxInteraction from 'ol/interaction/DragBox';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf';
import * as _html2canvas from 'html2canvas';
import * as JSZip from 'jszip';
import olFeature from 'ol/Feature';
import { MultiLineString, MultiPolygon, Point, LineString, Polygon } from 'ol/geom';
import { transformExtent, get, transform, fromLonLat, METERS_PER_UNIT } from 'ol/proj';
import * as olstyle from 'ol/style';
import { RegularShape, Style, Icon, Circle, Stroke, Fill, Text } from 'ol/style';
import { pointerMove } from 'ol/events/condition';
import { defaults, Select, Translate } from 'ol/interaction';
import { createEmpty, extend, boundingExtent, buffer, getSize, containsExtent, getArea, getCenter, intersects as intersects$1 } from 'ol/extent';
import { unByKey } from 'ol/Observable';
import * as olformat from 'ol/format';
import { WFS, GeoJSON, KML, GML, GPX, WMSCapabilities, WMTSCapabilities, WMSGetFeatureInfo, WKT } from 'ol/format';
import { FormsModule, ReactiveFormsModule, NgControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, BehaviorSubject, of, ReplaySubject, EMPTY, timer, combineLatest, Subject, forkJoin, zip, concat, fromEvent } from 'rxjs';
import OlGeoJSON from 'ol/format/GeoJSON';
import { MatIconModule, MatButtonModule, MatTooltipModule, MatListModule, MatSlider, MatAutocompleteModule, MatButtonToggleModule, MatSliderModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatCheckboxModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTabsModule, MatBadgeModule, MatDividerModule, MatMenuModule, MatRadioModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { getEntityId, EntityStore, getEntityTitle, getEntityRevision, getEntityProperty, EntityStoreWatcher, getEntityIcon, IgoCollapsibleModule, IgoListModule, IgoKeyValueModule, IgoFormModule, FormFieldComponent, EntityTableColumnRenderer, DragAndDropDirective, IgoDrapDropModule, IgoImageModule, IgoConfirmDialogModule, IgoEntityTableModule, getEntityTitleHtml, IgoPanelModule, IgoFlexibleModule, WidgetService, Workspace, ActionStore, WorkspaceSelectorComponent, IgoWidgetModule } from '@igo2/common';
import { Injectable, Directive, Self, Optional, ChangeDetectorRef, Component, Input, ChangeDetectionStrategy, NgModule, Output, EventEmitter, Pipe, Inject, InjectionToken, ApplicationRef, HostListener, ContentChild, ViewChild, HostBinding, defineInjectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, debounce, debounceTime, skip, distinctUntilChanged, catchError, mergeMap } from 'rxjs/operators';
import { uuid, ObjectUtils, Watcher, SubjectStatus, strEnum, Clipboard } from '@igo2/utils';
import { IgoLanguageModule, RouteService, ActivityService, NetworkService, ConfigService, LanguageService, MessageService, Media, MediaService } from '@igo2/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class Layer {
    /**
     * @return {?}
     */
    get id() {
        return this.options.id || this.dataSource.id;
    }
    /**
     * @return {?}
     */
    get alias() {
        return this.options.alias;
    }
    /**
     * @return {?}
     */
    get title() {
        return this.options.title;
    }
    /**
     * @param {?} title
     * @return {?}
     */
    set title(title) {
        this.options.title = title;
    }
    /**
     * @return {?}
     */
    get zIndex() {
        return this.ol.getZIndex();
    }
    /**
     * @param {?} zIndex
     * @return {?}
     */
    set zIndex(zIndex) {
        this.ol.setZIndex(zIndex);
    }
    /**
     * @return {?}
     */
    get baseLayer() {
        return this.options.baseLayer;
    }
    /**
     * @param {?} baseLayer
     * @return {?}
     */
    set baseLayer(baseLayer) {
        this.options.baseLayer = baseLayer;
    }
    /**
     * @return {?}
     */
    get visible() {
        return this.ol.get('visible');
    }
    /**
     * @param {?} visibility
     * @return {?}
     */
    set visible(visibility) {
        this.ol.setVisible(visibility);
    }
    /**
     * @return {?}
     */
    get opacity() {
        return this.ol.get('opacity');
    }
    /**
     * @param {?} opacity
     * @return {?}
     */
    set opacity(opacity) {
        this.ol.setOpacity(opacity);
    }
    /**
     * @return {?}
     */
    get isInResolutionsRange() {
        if (!this.map) {
            return false;
        }
        /** @type {?} */
        const resolution = this.map.viewController.getResolution();
        /** @type {?} */
        const minResolution = this.ol.getMinResolution();
        /** @type {?} */
        const maxResolution = this.ol.getMaxResolution();
        return resolution >= minResolution && resolution <= maxResolution;
    }
    /**
     * @return {?}
     */
    get showInLayerList() { return this.options.showInLayerList !== false; }
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = options;
        this.dataSource = this.options.source;
        this.ol = this.createOlLayer();
        if (this.options.zIndex !== undefined) {
            this.zIndex = this.options.zIndex;
        }
        if (this.options.baseLayer && this.options.visible === undefined) {
            this.options.visible = false;
        }
        this.visible =
            this.options.visible === undefined ? true : this.options.visible;
        this.opacity =
            this.options.opacity === undefined ? 1 : this.options.opacity;
        this.ol.set('_layer', this, true);
    }
    /**
     * @param {?} map
     * @return {?}
     */
    setMap(map$$1) {
        this.map = map$$1;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MetadataService {
    constructor() { }
    /**
     * @param {?} metadata
     * @return {?}
     */
    open(metadata) {
        if (metadata.extern) {
            window.open(metadata.url, '_blank');
        }
    }
}
MetadataService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
MetadataService.ctorParameters = () => [];
/** @nocollapse */ MetadataService.ngInjectableDef = defineInjectable({ factory: function MetadataService_Factory() { return new MetadataService(); }, token: MetadataService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MetadataButtonComponent {
    /**
     * @param {?} metadataService
     */
    constructor(metadataService) {
        this.metadataService = metadataService;
        this._color = 'primary';
    }
    /**
     * @return {?}
     */
    get layer() {
        return this._layer;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set layer(value) {
        this._layer = value;
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
     * @param {?} metadata
     * @return {?}
     */
    openMetadata(metadata) {
        this.metadataService.open(metadata);
    }
    /**
     * @return {?}
     */
    get options() {
        if (!this.layer) {
            return;
        }
        return this.layer.options;
    }
}
MetadataButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-metadata-button',
                template: "<button\r\n  *ngIf=\"options && options.metadata && options.metadata.url\"\r\n  mat-icon-button\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.metadata.show' | translate\"\r\n  [color]=\"color\"\r\n  (click)=\"openMetadata(options.metadata)\">\r\n  <mat-icon svgIcon=\"information-outline\"></mat-icon>\r\n</button>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
MetadataButtonComponent.ctorParameters = () => [
    { type: MetadataService }
];
MetadataButtonComponent.propDecorators = {
    layer: [{ type: Input }],
    color: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoMetadataModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoMetadataModule,
            providers: []
        };
    }
}
IgoMetadataModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatIconModule,
                    MatButtonModule,
                    MatTooltipModule,
                    IgoLanguageModule
                ],
                exports: [MetadataButtonComponent],
                declarations: [MetadataButtonComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class DataService {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Generate a id from it's datasource options.
 * @param {?} options Data source options
 * @return {?} A id
 */
function generateIdFromSourceOptions(options) {
    /** @type {?} */
    const generators = {
        wms: generateWMSIdFromSourceOptions,
        wmts: generateWMTSIdFromSourceOptions,
        xyz: generateXYZIdFromSourceOptions,
        feature: generateFeatureIdFromSourceOptions,
        osm: (/**
         * @param {?} _options
         * @return {?}
         */
        (_options) => 'OSM')
    };
    /** @type {?} */
    const generator = generators[options.type] || generateId;
    return generator(options);
}
/**
 * Generate a id from WMS data source options
 * @param {?} options WMS data source options
 * @return {?} A md5 hash of the the url and layers
 */
function generateWMSIdFromSourceOptions(options) {
    /** @type {?} */
    const layers = options.params.layers;
    /** @type {?} */
    const chain = 'wms' + options.url + layers;
    return (/** @type {?} */ (Md5.hashStr(chain)));
}
/**
 * Generate a id from WMTS data source options
 * @param {?} options WMTS data source options
 * @return {?} A md5 hash of the the url and layer
 */
function generateWMTSIdFromSourceOptions(options) {
    /** @type {?} */
    const layer = options.layer;
    /** @type {?} */
    const chain = 'wmts' + options.url + layer;
    return (/** @type {?} */ (Md5.hashStr(chain)));
}
/**
 * Generate a id from XYZ data source options
 * @param {?} options XYZ data source options
 * @return {?} A md5 hash of the the url and layer
 */
function generateXYZIdFromSourceOptions(options) {
    /** @type {?} */
    const chain = 'xyz' + options.url;
    return (/** @type {?} */ (Md5.hashStr(chain)));
}
/**
 * Generate a id from feature data source options
 * @param {?} options XYZ data source options
 * @return {?} A md5 hash of the the url and layer
 */
function generateFeatureIdFromSourceOptions(options) {
    if (!options.url) {
        return generateId(options);
    }
    /** @type {?} */
    const chain = 'feature' + options.url;
    return (/** @type {?} */ (Md5.hashStr(chain)));
}
/**
 * Generate a unique id
 * @param {?} options
 * @return {?} A uuid
 */
function generateId(options) {
    return uuid();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class DataSource {
    /**
     * @param {?=} options
     * @param {?=} dataService
     */
    constructor(options = {}, dataService) {
        this.options = options;
        this.dataService = dataService;
        this.options = options;
        this.id = this.options.id || this.generateId();
        this.ol = this.createOlSource();
    }
    /**
     * @protected
     * @return {?}
     */
    generateId() {
        return generateIdFromSourceOptions(this.options);
    }
    /**
     * @param {?=} scale
     * @return {?}
     */
    getLegend(scale) {
        return this.options.legend ? [this.options.legend] : [];
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FeatureDataSource extends DataSource {
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        /** @type {?} */
        const sourceOptions = {
            format: this.getSourceFormatFromOptions(this.options)
        };
        return new OlVectorSource(Object.assign(sourceOptions, this.options));
    }
    /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    getSourceFormatFromOptions(options) {
        if (options.format) {
            return options.format;
        }
        /** @type {?} */
        let olFormatCls;
        /** @type {?} */
        const formatType = options.formatType;
        if (!formatType) {
            olFormatCls = GeoJSON;
        }
        else {
            olFormatCls = olformat[formatType];
            if (olFormatCls === undefined) {
                throw new Error('Invalid vector source format ${formatType}.');
            }
        }
        /** @type {?} */
        const formatOptions = options.formatOptions;
        /** @type {?} */
        let format;
        if (formatOptions) {
            format = new olFormatCls(formatOptions);
        }
        else {
            format = new olFormatCls();
        }
        return format;
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OSMDataSource extends DataSource {
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        this.options.url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
        return new olSourceOSM(this.options);
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class XYZDataSource extends DataSource {
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        return new olSourceXYZ(this.options);
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OgcFilterWriter {
    constructor() {
        this.filterSequence = [];
        this.operators = {
            PropertyIsEqualTo: { spatial: false, fieldRestrict: [] },
            PropertyIsNotEqualTo: { spatial: false, fieldRestrict: [] },
            PropertyIsLike: { spatial: false, fieldRestrict: ['string'] },
            PropertyIsGreaterThan: { spatial: false, fieldRestrict: ['number'] },
            PropertyIsGreaterThanOrEqualTo: { spatial: false, fieldRestrict: ['number'] },
            PropertyIsLessThan: { spatial: false, fieldRestrict: ['number'] },
            PropertyIsLessThanOrEqualTo: { spatial: false, fieldRestrict: ['number'] },
            PropertyIsBetween: { spatial: false, fieldRestrict: ['number'] },
            During: { spatial: false, fieldRestrict: [] },
            PropertyIsNull: { spatial: false, fieldRestrict: [] },
            Intersects: { spatial: true, fieldRestrict: [] },
            Within: { spatial: true, fieldRestrict: [] },
            Contains: { spatial: true, fieldRestrict: [] }
        };
    }
    /**
     * @param {?} ogcFiltersOptions
     * @param {?} fieldNameGeometry
     * @param {?=} srcType
     * @return {?}
     */
    defineOgcFiltersDefaultOptions(ogcFiltersOptions, fieldNameGeometry, srcType) {
        /** @type {?} */
        let ogcFiltersDefaultValue = true;
        if (srcType && srcType === 'wms') {
            ogcFiltersDefaultValue = false;
        }
        ogcFiltersOptions = ogcFiltersOptions || {};
        ogcFiltersOptions.enabled = ogcFiltersOptions.enabled === undefined ? ogcFiltersDefaultValue : ogcFiltersOptions.enabled;
        ogcFiltersOptions.editable = ogcFiltersOptions.editable === undefined ? ogcFiltersDefaultValue : ogcFiltersOptions.editable;
        ogcFiltersOptions.geometryName = fieldNameGeometry;
        ogcFiltersOptions.advancedOgcFilters = true;
        if (ogcFiltersOptions.enabled && ogcFiltersOptions.pushButtons) {
            ogcFiltersOptions.advancedOgcFilters = false;
        }
        return ogcFiltersOptions;
    }
    /**
     * @param {?=} filters
     * @param {?=} extent
     * @param {?=} proj
     * @param {?=} fieldNameGeometry
     * @return {?}
     */
    buildFilter(filters, extent, proj, fieldNameGeometry) {
        /** @type {?} */
        let ourBboxFilter;
        /** @type {?} */
        let enableBbox;
        if (/intersects|contains|within/gi.test(JSON.stringify(filters))) {
            enableBbox = false;
        }
        else {
            enableBbox = true;
        }
        if (filters) {
            fieldNameGeometry =
                ((/** @type {?} */ (filters))).geometryName !== undefined
                    ? ((/** @type {?} */ (filters))).geometryName
                    : fieldNameGeometry;
        }
        if (extent && filters) {
            ourBboxFilter = bbox(fieldNameGeometry, extent, proj.getCode());
        }
        /** @type {?} */
        let filterAssembly;
        if (filters) {
            filters = this.checkIgoFiltersProperties(filters, fieldNameGeometry);
            if (extent && enableBbox) {
                filterAssembly = and(ourBboxFilter, this.bundleFilter(filters));
            }
            else {
                filterAssembly = this.bundleFilter(filters);
            }
        }
        else {
            return 'bbox=' + extent.join(',') + ',' + proj.getCode();
        }
        /** @type {?} */
        const wfsOptions = {
            srsName: '',
            featureNS: '',
            featurePrefix: '',
            featureTypes: ['featureTypes'],
            filter: filterAssembly,
            outputFormat: '',
            geometryName: fieldNameGeometry
        };
        /** @type {?} */
        const query = new olFormatWFS().writeGetFeature(wfsOptions);
        /** @type {?} */
        const str = new XMLSerializer().serializeToString(query);
        /** @type {?} */
        const regexp1 = /typenames *=|typename *=\"featureTypes\" *>/gi;
        /** @type {?} */
        const regexp2 = /<\/Query><\/GetFeature>/gi;
        return 'filter=' + str.split(regexp1)[1].split(regexp2)[0];
    }
    /**
     * @private
     * @param {?} filterObject
     * @return {?}
     */
    bundleFilter(filterObject) {
        if (filterObject instanceof Array) {
            /** @type {?} */
            const logicalArray = [];
            filterObject.forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
                logicalArray.push(this.bundleFilter(element));
            }));
            return logicalArray;
        }
        else {
            if (filterObject.hasOwnProperty('logical')) {
                return this.createFilter({
                    operator: filterObject.logical,
                    logicalArray: this.bundleFilter(filterObject.filters)
                });
            }
            else if (filterObject.hasOwnProperty('operator')) {
                return this.createFilter((/** @type {?} */ (filterObject)));
            }
        }
    }
    /**
     * @private
     * @param {?} filterOptions
     * @return {?}
     */
    createFilter(filterOptions) {
        /** @type {?} */
        const operator = filterOptions.operator;
        /** @type {?} */
        const logicalArray = filterOptions.logicalArray;
        /** @type {?} */
        const wfsPropertyName = filterOptions.propertyName;
        /** @type {?} */
        const wfsPattern = filterOptions.pattern;
        /** @type {?} */
        const wfsMatchCase = filterOptions.matchCase
            ? filterOptions.matchCase
            : true;
        /** @type {?} */
        const wfsWildCard = filterOptions.wildCard ? filterOptions.wildCard : '*';
        /** @type {?} */
        const wfsSingleChar = filterOptions.singleChar
            ? filterOptions.singleChar
            : '.';
        /** @type {?} */
        const wfsEscapeChar = filterOptions.escapeChar
            ? filterOptions.escapeChar
            : '!';
        /** @type {?} */
        const wfsLowerBoundary = filterOptions.lowerBoundary;
        /** @type {?} */
        const wfsUpperBoundary = filterOptions.upperBoundary;
        /** @type {?} */
        const wfsGeometryName = filterOptions.geometryName;
        /** @type {?} */
        const wfsExtent = filterOptions.extent;
        /** @type {?} */
        const wfsWktGeometry = filterOptions.wkt_geometry;
        /** @type {?} */
        const wfsSrsName = filterOptions.srsName
            ? filterOptions.srsName
            : 'EPSG:3857';
        /** @type {?} */
        const wfsBegin = filterOptions.begin;
        /** @type {?} */
        const wfsEnd = filterOptions.end;
        /** @type {?} */
        const wfsExpression = filterOptions.expression;
        /** @type {?} */
        let geometry;
        if (wfsWktGeometry) {
            /** @type {?} */
            const wkt = new olWKT();
            geometry = wkt.readGeometry(wfsWktGeometry, {
                dataProjection: wfsSrsName,
                featureProjection: 'EPSG:3857'
            });
        }
        switch (operator) {
            case 'BBOX':
                return bbox(wfsGeometryName, wfsExtent, wfsSrsName);
            case 'PropertyIsBetween':
                return between(wfsPropertyName, wfsLowerBoundary, wfsUpperBoundary);
            case 'Contains':
                return contains(wfsGeometryName, geometry, wfsSrsName);
            case 'During':
                return during(wfsPropertyName, wfsBegin, wfsEnd);
            case 'PropertyIsEqualTo':
                return equalTo(wfsPropertyName, wfsExpression, wfsMatchCase);
            case 'PropertyIsGreaterThan':
                return greaterThan(wfsPropertyName, wfsExpression);
            case 'PropertyIsGreaterThanOrEqualTo':
                return greaterThanOrEqualTo(wfsPropertyName, wfsExpression);
            case 'Intersects':
                return intersects(wfsGeometryName, geometry, wfsSrsName);
            case 'PropertyIsNull':
                return isNull(wfsPropertyName);
            case 'PropertyIsLessThan':
                return lessThan(wfsPropertyName, wfsExpression);
            case 'PropertyIsLessThanOrEqualTo':
                return lessThanOrEqualTo(wfsPropertyName, wfsExpression);
            case 'PropertyIsLike':
                return like(wfsPropertyName, wfsPattern.replace(/[()_]/gi, wfsSingleChar), wfsWildCard, wfsSingleChar, wfsEscapeChar, wfsMatchCase);
            case 'PropertyIsNotEqualTo':
                return notEqualTo(wfsPropertyName, wfsExpression, wfsMatchCase);
            case 'Within':
                return within(wfsGeometryName, geometry, wfsSrsName);
            // LOGICAL
            case 'And':
                return and.apply(null, logicalArray);
            case 'Or':
                return or.apply(null, logicalArray);
            case 'Not':
                return not.apply(null, logicalArray);
            default:
                return undefined;
        }
    }
    /**
     * @param {?} filterObject
     * @param {?} geometryName
     * @param {?=} logical
     * @param {?=} level
     * @return {?}
     */
    defineInterfaceFilterSequence(filterObject, geometryName, logical = '', level = -1) {
        if (filterObject instanceof Array) {
            filterObject.forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
                this.filterSequence.concat(this.defineInterfaceFilterSequence(element, geometryName, logical, level));
            }));
        }
        else {
            if (filterObject.hasOwnProperty('logical')) {
                level = level + 1;
                this.filterSequence.concat(this.defineInterfaceFilterSequence(filterObject.filters, geometryName, filterObject.logical, level));
            }
            else if (filterObject.hasOwnProperty('operator')) {
                this.filterSequence.push(this.addInterfaceFilter(filterObject, geometryName, level, logical));
            }
        }
        return this.filterSequence;
    }
    /**
     * @param {?=} igoOgcFilterObject
     * @param {?=} geometryName
     * @param {?=} level
     * @param {?=} parentLogical
     * @return {?}
     */
    addInterfaceFilter(igoOgcFilterObject, geometryName, level = 0, parentLogical = 'Or') {
        if (!igoOgcFilterObject) {
            igoOgcFilterObject = { operator: 'PropertyIsEqualTo' };
        }
        /** @type {?} */
        const f = {
            propertyName: '',
            operator: '',
            active: '',
            filterid: uuid(),
            begin: '',
            end: '',
            lowerBoundary: '',
            upperBoundary: '',
            expression: '',
            pattern: '',
            wildCard: '*',
            singleChar: '.',
            escapeChar: '!',
            matchCase: true,
            igoSpatialSelector: '',
            geometryName: '',
            geometry: '',
            wkt_geometry: '',
            extent: '',
            srsName: '',
            parentLogical: '',
            level: 0
        };
        return Object.assign(f, {
            parentLogical,
            level,
            geometryName
        }, igoOgcFilterObject);
    }
    /**
     * @param {?} filterObject
     * @param {?} fieldNameGeometry
     * @param {?=} active
     * @return {?}
     */
    checkIgoFiltersProperties(filterObject, fieldNameGeometry, active = false) {
        /** @type {?} */
        const filterArray = [];
        if (filterObject instanceof Array) {
            filterObject.forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
                filterArray.push(this.checkIgoFiltersProperties(element, fieldNameGeometry, active));
            }));
            return filterArray;
        }
        else {
            if (filterObject.hasOwnProperty('logical')) {
                return Object.assign({}, {
                    logical: filterObject.logical,
                    filters: this.checkIgoFiltersProperties(filterObject.filters, fieldNameGeometry, active)
                });
            }
            else if (filterObject.hasOwnProperty('operator')) {
                return this.addFilterProperties((/** @type {?} */ (filterObject)), fieldNameGeometry, active);
            }
        }
    }
    /**
     * @private
     * @param {?} igoOgcFilterObject
     * @param {?} fieldNameGeometry
     * @param {?=} active
     * @return {?}
     */
    addFilterProperties(igoOgcFilterObject, fieldNameGeometry, active = false) {
        /** @type {?} */
        const filterid = igoOgcFilterObject.hasOwnProperty('filterid')
            ? igoOgcFilterObject.filterid
            : uuid();
        /** @type {?} */
        const status = igoOgcFilterObject.hasOwnProperty('active')
            ? igoOgcFilterObject.active
            : active;
        return Object.assign({}, {
            filterid,
            active: status,
            igoSpatialSelector: 'fixedExtent'
        }, igoOgcFilterObject, { geometryName: fieldNameGeometry });
    }
    /**
     * @param {?} sequence
     * @return {?}
     */
    rebuiltIgoOgcFilterObjectFromSequence(sequence) {
        if (sequence instanceof Array) {
            if (sequence.length >= 1) {
                /** @type {?} */
                let lastParentLogical = sequence[0].parentLogical;
                /** @type {?} */
                let nextElement;
                /** @type {?} */
                let logicalArray = [];
                /** @type {?} */
                let lastProcessedFilter;
                sequence.forEach((/**
                 * @param {?} uiFilter
                 * @return {?}
                 */
                uiFilter => {
                    /** @type {?} */
                    const element = Object.assign({}, uiFilter);
                    /** @type {?} */
                    const index = sequence.indexOf(uiFilter);
                    if (index >= 0 && index < sequence.length - 1) {
                        nextElement = sequence[index + 1];
                    }
                    else {
                        nextElement = element;
                    }
                    delete element.active;
                    delete element.filterid;
                    delete element.parentLogical;
                    logicalArray.push(element);
                    if (sequence.length === 1) {
                        lastProcessedFilter = element;
                    }
                    else if (lastParentLogical !== nextElement.parentLogical) {
                        if (logicalArray.length === 1) {
                            console.log('You must set at ' +
                                'least two operator in a logical (' +
                                lastParentLogical +
                                ')');
                        }
                        else {
                            lastProcessedFilter = Object.assign({}, { logical: lastParentLogical, filters: logicalArray });
                            logicalArray = [lastProcessedFilter];
                            lastParentLogical = nextElement.parentLogical;
                        }
                    }
                }));
                return lastProcessedFilter;
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }
    /**
     * @param {?} options
     * @param {?} fieldNameGeometry
     * @return {?}
     */
    handleOgcFiltersAppliedValue(options, fieldNameGeometry) {
        /** @type {?} */
        const ogcFilters = options.ogcFilters;
        if (!ogcFilters) {
            return;
        }
        /** @type {?} */
        let filterQueryStringPushButton = '';
        /** @type {?} */
        let filterQueryStringAdvancedFilters = '';
        if (ogcFilters.enabled && ogcFilters.pushButtons) {
            /** @type {?} */
            const pushButtonBundle = ogcFilters.pushButtons;
            /** @type {?} */
            const conditions = [];
            pushButtonBundle.map((/**
             * @param {?} buttonBundle
             * @return {?}
             */
            buttonBundle => {
                /** @type {?} */
                const bundleCondition = [];
                buttonBundle.ogcPushButtons
                    .filter((/**
                 * @param {?} ogcpb
                 * @return {?}
                 */
                ogcpb => ogcpb.enabled === true))
                    .forEach((/**
                 * @param {?} enabledPb
                 * @return {?}
                 */
                enabledPb => bundleCondition.push(enabledPb.filters)));
                if (bundleCondition.length === 1) {
                    conditions.push(bundleCondition[0]);
                }
                else if (bundleCondition.length > 1) {
                    conditions.push({ logical: buttonBundle.logical, filters: bundleCondition });
                }
            }));
            if (conditions.length >= 1) {
                filterQueryStringPushButton = this.buildFilter(conditions.length === 1 ? conditions[0] : { logical: 'And', filters: conditions });
            }
        }
        if (ogcFilters.enabled && ogcFilters.filters) {
            ogcFilters.geometryName = ogcFilters.geometryName || fieldNameGeometry;
            /** @type {?} */
            const igoFilters = ogcFilters.filters;
            filterQueryStringAdvancedFilters = this.buildFilter(igoFilters);
        }
        /** @type {?} */
        let filterQueryString = ogcFilters.advancedOgcFilters ? filterQueryStringAdvancedFilters : filterQueryStringPushButton;
        if (options.type === 'wms') {
            filterQueryString = this.formatProcessedOgcFilter(filterQueryString, ((/** @type {?} */ (options))).params.layers);
        }
        if (options.type === 'wfs') {
            filterQueryString = this.formatProcessedOgcFilter(filterQueryString, ((/** @type {?} */ (options))).params.featureTypes);
        }
        return filterQueryString;
    }
    /**
     * @param {?} processedFilter
     * @param {?} layersOrTypenames
     * @return {?}
     */
    formatProcessedOgcFilter(processedFilter, layersOrTypenames) {
        /** @type {?} */
        let appliedFilter = '';
        if (processedFilter.length === 0 && layersOrTypenames.indexOf(',') === -1) {
            appliedFilter = processedFilter;
        }
        else {
            layersOrTypenames.split(',').forEach((/**
             * @param {?} layerOrTypenames
             * @return {?}
             */
            layerOrTypenames => {
                appliedFilter = `${appliedFilter}(${processedFilter.replace('filter=', '')})`;
            }));
        }
        /** @type {?} */
        const filterValue = appliedFilter.length > 0 ? appliedFilter.replace('filter=', '') : undefined;
        return filterValue;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const defaultEpsg = 'EPSG:3857';
/** @type {?} */
const defaultMaxFeatures = 5000;
/** @type {?} */
const defaultWfsVersion = '2.0.0';
/** @type {?} */
const defaultFieldNameGeometry = 'geometry';
/** @type {?} */
const gmlRegex = new RegExp(/.*?gml.*?/gi);
/** @type {?} */
const jsonRegex = new RegExp(/.*?json.*?/gi);
/**
 * This method build/standardize WFS call query params based on the layer property.
 * @param {?} wfsDataSourceOptions  WFSDataSourceOptions The common wfs datasource options interface
 * @param {?=} count  Number: Used to control the number of feature. Used to bypass whe wfs datasource options interface (maxFeatures)
 * @param {?=} epsg  String: Used to control the EPSG code (es: 'EPSG3857'). Used to bypass whe wfs datasource options interface (srsName)
 * @param {?=} properties  String: Used to control the queried fields  (WFS service).
 * @return {?} An array array of {name: '', value: ''} of predefined query params.
 */
function formatWFSQueryString(wfsDataSourceOptions, count, epsg, properties) {
    /** @type {?} */
    const versionWfs200 = '2.0.0';
    // not the same usage as defaultWfsVersion.
    /** @type {?} */
    const url = wfsDataSourceOptions.urlWfs;
    /** @type {?} */
    const paramsWFS = wfsDataSourceOptions.paramsWFS;
    /** @type {?} */
    const effectiveCount = count || defaultMaxFeatures;
    /** @type {?} */
    const epsgCode = epsg || defaultEpsg;
    /** @type {?} */
    const outputFormat = paramsWFS.outputFormat ? `outputFormat=${paramsWFS.outputFormat}` : '';
    /** @type {?} */
    const version = paramsWFS.version ? `version=${paramsWFS.version}` : `version=${defaultWfsVersion}`;
    /** @type {?} */
    const paramTypename = paramsWFS.version === versionWfs200 ? 'typenames' : 'typename';
    /** @type {?} */
    const featureTypes = `${paramTypename}=${paramsWFS.featureTypes}`;
    /** @type {?} */
    const paramMaxFeatures = paramsWFS.version === versionWfs200 ? 'count' : 'maxFeatures';
    /** @type {?} */
    const cnt = count ? `${paramMaxFeatures}=${effectiveCount}` :
        paramsWFS.maxFeatures ? `${paramMaxFeatures}=${paramsWFS.maxFeatures}` : `${paramMaxFeatures}=${effectiveCount}`;
    /** @type {?} */
    const srs = epsg ? `srsname=${epsgCode}` : paramsWFS.srsName ? 'srsname=' + paramsWFS.srsName : `srsname=${epsgCode}`;
    /** @type {?} */
    let propertyName = '';
    /** @type {?} */
    let valueReference = '';
    if (properties) {
        propertyName = `propertyName=${properties}`;
        valueReference = `valueReference=${properties}`;
    }
    /** @type {?} */
    const sourceFields = wfsDataSourceOptions.sourceFields;
    if (!propertyName && sourceFields && sourceFields.length > 0) {
        /** @type {?} */
        const fieldsNames = [];
        wfsDataSourceOptions.sourceFields.forEach((/**
         * @param {?} sourcefield
         * @return {?}
         */
        sourcefield => {
            fieldsNames.push(sourcefield.name);
        }));
        propertyName = `propertyName=${fieldsNames.join(',')},${paramsWFS.fieldNameGeometry}`;
    }
    /** @type {?} */
    const getCapabilities = `${url}?service=wfs&request=GetCapabilities&${version}`;
    /** @type {?} */
    let getFeature = `${url}?service=wfs&request=GetFeature&${version}&${featureTypes}&`;
    getFeature += `${outputFormat}&${srs}&${cnt}&${propertyName}`;
    /** @type {?} */
    let getpropertyvalue = `${url}?service=wfs&request=GetPropertyValue&version=${versionWfs200}&${featureTypes}&`;
    getpropertyvalue += `&${cnt}&${valueReference}`;
    return [
        { name: 'outputformat', value: outputFormat },
        { name: 'version', value: version },
        { name: 'typename', value: featureTypes },
        { name: 'count', value: cnt },
        { name: 'srsname', value: srs },
        { name: 'propertyname', value: propertyName },
        { name: 'valuereference', value: valueReference },
        { name: 'getcapabilities', value: getCapabilities.replace(/&&/g, '&') },
        { name: 'getfeature', value: getFeature.replace(/&&/g, '&') },
        { name: 'getpropertyvalue', value: getpropertyvalue.replace(/&&/g, '&') }
    ];
}
/**
 * Validate/Modify layer's wfs options based on :
 * 1- an Openlayers's issue with GML provided from WFS. Refer to
 * https://github.com/openlayers/openlayers/pull/6400
 * 2- Set default values for optionals parameters.
 * @param {?} wfsDataSourceOptions  WFSDataSourceOptions The common wfs datasource options interface
 * @param {?=} srcType
 * @return {?} An array array of {name: '', value: ''} of predefined query params.
 */
function checkWfsParams(wfsDataSourceOptions, srcType) {
    if (srcType && srcType === 'wfs') {
        // reassignation of params to paramsWFS and url to urlWFS to have a common interface with wms-wfs datasources
        wfsDataSourceOptions.paramsWFS = wfsDataSourceOptions.params;
    }
    /** @type {?} */
    const paramsWFS = wfsDataSourceOptions.paramsWFS;
    wfsDataSourceOptions.urlWfs = wfsDataSourceOptions.urlWfs || wfsDataSourceOptions.url;
    paramsWFS.version = paramsWFS.version || defaultWfsVersion;
    paramsWFS.fieldNameGeometry = paramsWFS.fieldNameGeometry || defaultFieldNameGeometry;
    paramsWFS.maxFeatures = paramsWFS.maxFeatures || defaultMaxFeatures;
    /** @type {?} */
    let outputFormat;
    if (paramsWFS.outputFormat) {
        outputFormat = paramsWFS.outputFormat;
    }
    if (gmlRegex.test(outputFormat) || !outputFormat) {
        paramsWFS.version = '1.1.0';
    }
    return Object.assign({}, wfsDataSourceOptions);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WFSDataSource extends DataSource {
    /**
     * @param {?} options
     * @param {?} wfsService
     */
    constructor(options, wfsService) {
        super(checkWfsParams(options, 'wfs'));
        this.options = options;
        this.wfsService = wfsService;
        /** @type {?} */
        const ogcFilters = ((/** @type {?} */ (this.options))).ogcFilters;
        /** @type {?} */
        const fieldNameGeometry = this.options.paramsWFS.fieldNameGeometry || defaultFieldNameGeometry;
        /** @type {?} */
        const ogcFilterWriter = new OgcFilterWriter();
        ((/** @type {?} */ (this.options))).ogcFilters =
            ogcFilterWriter.defineOgcFiltersDefaultOptions(ogcFilters, fieldNameGeometry);
        if (((/** @type {?} */ (this.options))).ogcFilters.enabled) {
            this.wfsService.getSourceFieldsFromWFS(this.options);
        }
    }
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        return new OlVectorSource({
            format: this.getFormatFromOptions(),
            overlaps: false,
            url: (/**
             * @param {?} extent
             * @param {?} resolution
             * @param {?} proj
             * @return {?}
             */
            (extent, resolution, proj) => {
                return this.buildUrl(extent, proj, ((/** @type {?} */ (this.options))).ogcFilters);
            }),
            strategy: bbox$1
        });
    }
    /**
     * @private
     * @param {?} extent
     * @param {?} proj
     * @param {?} ogcFilters
     * @return {?}
     */
    buildUrl(extent, proj, ogcFilters) {
        /** @type {?} */
        const paramsWFS = this.options.paramsWFS;
        /** @type {?} */
        const queryStringValues = formatWFSQueryString(this.options, undefined, proj.getCode());
        /** @type {?} */
        let igoFilters;
        if (ogcFilters && ogcFilters.enabled) {
            igoFilters = ogcFilters.filters;
        }
        /** @type {?} */
        const ogcFilterWriter = new OgcFilterWriter();
        /** @type {?} */
        const filterOrBox = ogcFilterWriter.buildFilter(igoFilters, extent, proj, ogcFilters.geometryName);
        /** @type {?} */
        let filterOrPush = ogcFilterWriter.handleOgcFiltersAppliedValue(this.options, ogcFilters.geometryName);
        /** @type {?} */
        let prefix = 'filter';
        if (!filterOrPush) {
            prefix = 'bbox';
            filterOrPush = extent.join(',') + ',' + proj.getCode();
        }
        paramsWFS.xmlFilter = ogcFilters.advancedOgcFilters ? filterOrBox : `${prefix}=${filterOrPush}`;
        /** @type {?} */
        let baseUrl = queryStringValues.find((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name === 'getfeature')).value;
        /** @type {?} */
        const patternFilter = /(filter|bbox)=.*/gi;
        baseUrl = patternFilter.test(paramsWFS.xmlFilter) ? `${baseUrl}&${paramsWFS.xmlFilter}` : baseUrl;
        this.options.download = Object.assign({}, this.options.download, { dynamicUrl: baseUrl });
        return baseUrl.replace(/&&/g, '&');
    }
    /**
     * @private
     * @return {?}
     */
    getFormatFromOptions() {
        /** @type {?} */
        let olFormatCls;
        /** @type {?} */
        let outputFormat;
        if (this.options.paramsWFS.outputFormat) {
            outputFormat = this.options.paramsWFS.outputFormat.toLowerCase();
        }
        if (jsonRegex.test(outputFormat)) {
            olFormatCls = GeoJSON;
        }
        if (gmlRegex.test(outputFormat) || !outputFormat) {
            olFormatCls = WFS;
        }
        return new olFormatCls();
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WFSService extends DataService {
    /**
     * @param {?} http
     */
    constructor(http) {
        super();
        this.http = http;
    }
    /**
     * @return {?}
     */
    getData() {
        console.log('This is defining a data service.');
        return 'This is defining a data service.';
    }
    /**
     * @param {?} datasource
     * @return {?}
     */
    getSourceFieldsFromWFS(datasource) {
        if (!datasource.sourceFields || datasource.sourceFields.length === 0) {
            datasource.sourceFields = [];
            this.defineFieldAndValuefromWFS(datasource).subscribe((/**
             * @param {?} getfeatureSourceField
             * @return {?}
             */
            getfeatureSourceField => {
                datasource.sourceFields = getfeatureSourceField;
            }));
        }
        else {
            this.defineFieldAndValuefromWFS(datasource).subscribe((/**
             * @param {?} getfeatureSourceField
             * @return {?}
             */
            getfeatureSourceField => {
                datasource.sourceFields.forEach((/**
                 * @param {?} sourcefield
                 * @return {?}
                 */
                sourcefield => {
                    if (sourcefield.alias === undefined) {
                        sourcefield.alias = sourcefield.name; // to allow only a list of sourcefield with names
                    }
                    if (sourcefield.values === undefined || sourcefield.values.length === 0) {
                        sourcefield.values = getfeatureSourceField.find((/**
                         * @param {?} sf
                         * @return {?}
                         */
                        sf => sf.name === sourcefield.name)).values;
                    }
                }));
            }));
        }
    }
    /**
     * @private
     * @param {?} wfsDataSourceOptions
     * @param {?=} nb
     * @param {?=} epsgCode
     * @param {?=} propertyName
     * @return {?}
     */
    wfsGetFeature(wfsDataSourceOptions, nb = defaultMaxFeatures, epsgCode = defaultEpsg, propertyName) {
        /** @type {?} */
        const queryStringValues = formatWFSQueryString(wfsDataSourceOptions, nb, epsgCode, propertyName);
        /** @type {?} */
        const baseUrl = queryStringValues.find((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name === 'getfeature')).value;
        /** @type {?} */
        const outputFormat = wfsDataSourceOptions.paramsWFS.outputFormat;
        if (gmlRegex.test(outputFormat) || !outputFormat) {
            return this.http.get(baseUrl, { responseType: 'text' });
        }
        else {
            return this.http.get(baseUrl);
        }
    }
    /**
     * @param {?} wfsDataSourceOptions
     * @return {?}
     */
    defineFieldAndValuefromWFS(wfsDataSourceOptions) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => {
            /** @type {?} */
            const sourceFields = [];
            /** @type {?} */
            let fieldList;
            /** @type {?} */
            let fieldListWoGeom;
            /** @type {?} */
            let fieldListWoGeomStr;
            /** @type {?} */
            let olFormats;
            /** @type {?} */
            const outputFormat = wfsDataSourceOptions.paramsWFS.outputFormat;
            if (gmlRegex.test(outputFormat) || !outputFormat) {
                olFormats = WFS;
            }
            else {
                olFormats = GeoJSON;
            }
            this.wfsGetFeature(wfsDataSourceOptions, 1).subscribe((/**
             * @param {?} oneFeature
             * @return {?}
             */
            oneFeature => {
                /** @type {?} */
                const features = new olFormats().readFeatures(oneFeature);
                fieldList = features[0].getKeys();
                fieldListWoGeom = fieldList.filter((/**
                 * @param {?} field
                 * @return {?}
                 */
                field => field !== features[0].getGeometryName() &&
                    !field.match(/boundedby/gi)));
                fieldListWoGeomStr = fieldListWoGeom.join(',');
                this.wfsGetFeature(wfsDataSourceOptions, wfsDataSourceOptions.paramsWFS.maxFeatures || defaultMaxFeatures, undefined, fieldListWoGeomStr).subscribe((/**
                 * @param {?} manyFeatures
                 * @return {?}
                 */
                manyFeatures => {
                    /** @type {?} */
                    const mfeatures = new olFormats().readFeatures(manyFeatures);
                    this.built_properties_value(mfeatures).forEach((/**
                     * @param {?} element
                     * @return {?}
                     */
                    element => {
                        sourceFields.push(element);
                    }));
                    d.next(sourceFields);
                    d.complete();
                }));
            }));
        }));
    }
    /**
     * @private
     * @param {?} features
     * @return {?}
     */
    built_properties_value(features) {
        /** @type {?} */
        const kv = Object.assign({}, features[0].getProperties());
        delete kv[features[0].getGeometryName()];
        delete kv.boundedBy;
        /** @type {?} */
        const sourceFields = [];
        for (const property in kv) {
            if (kv.hasOwnProperty(property)) {
                /** @type {?} */
                const fieldType = typeof features[0].get(property) === 'object'
                    ? undefined
                    : typeof features[0].get(property);
                sourceFields.push({
                    name: property,
                    alias: property,
                    type: fieldType,
                    values: [kv[property]]
                });
            }
        }
        features.every((/**
         * @param {?} element
         * @return {?}
         */
        (element) => {
            /** @type {?} */
            const featureProperties = element.getProperties();
            for (const key in featureProperties) {
                if (featureProperties.hasOwnProperty(key) && key in kv) {
                    sourceFields.filter((/**
                     * @param {?} f
                     * @return {?}
                     */
                    f => f.name === key)).forEach((/**
                     * @param {?} v
                     * @return {?}
                     */
                    v => {
                        if (v.values.indexOf(featureProperties[key]) === -1) {
                            v.values.push(featureProperties[key]);
                        }
                    }));
                }
            }
            return true;
        }));
        return sourceFields;
    }
}
WFSService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WFSService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ WFSService.ngInjectableDef = defineInjectable({ factory: function WFSService_Factory() { return new WFSService(inject(HttpClient)); }, token: WFSService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const QueryFormat = {
    GML2: 'gml2',
    GML3: 'gml3',
    JSON: 'json',
    GEOJSON: 'geojson',
    ESRIJSON: 'esrijson',
    TEXT: 'text',
    HTML: 'html',
    HTMLGML2: 'htmlgml2',
};
/** @enum {string} */
const QueryHtmlTarget = {
    IFRAME: 'iframe',
    BLANK: '_blank',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WMSDataSource extends DataSource {
    /**
     * @param {?} options
     * @param {?} wfsService
     */
    constructor(options, wfsService) {
        super(options);
        this.options = options;
        this.wfsService = wfsService;
        // Important: To use wms versions smaller than 1.3.0, SRS
        // needs to be supplied in the source "params"
        // We need to do this to override the default version
        // of openlayers which is uppercase
        /** @type {?} */
        const sourceParams = options.params;
        if (sourceParams && sourceParams.version) {
            sourceParams.VERSION = sourceParams.version;
        }
        if (sourceParams && sourceParams.VERSION) {
            if (sourceParams.version !== '1.3.0') {
                if (!sourceParams.SRS && !sourceParams.srs) {
                    throw new Error(`You must set a SRS (or srs) param for your WMS
           (layer =  ` + sourceParams.layers + `) because your want to use a WMS version under 1.3.0
        Ex: "srs": "EPSG:3857" `);
                }
            }
        }
        if (sourceParams && sourceParams.INFO_FORMAT) {
            sourceParams.info_format = sourceParams.INFO_FORMAT;
        }
        if (options.refreshIntervalSec && options.refreshIntervalSec > 0) {
            setInterval((/**
             * @return {?}
             */
            () => {
                this.refresh();
            }), options.refreshIntervalSec * 1000); // Convert seconds to MS
        }
        /** @type {?} */
        let fieldNameGeometry = defaultFieldNameGeometry;
        // ####   START if paramsWFS
        if (options.paramsWFS) {
            /** @type {?} */
            const wfsCheckup = checkWfsParams(options, 'wms');
            ObjectUtils.mergeDeep(options.paramsWFS, wfsCheckup.paramsWFS);
            fieldNameGeometry = options.paramsWFS.fieldNameGeometry || fieldNameGeometry;
            options.download = Object.assign({}, options.download, {
                dynamicUrl: this.buildDynamicDownloadUrlFromParamsWFS(options)
            });
        } //  ####   END  if paramsWFS
        if (!options.sourceFields || options.sourceFields.length === 0) {
            options.sourceFields = [];
        }
        else {
            options.sourceFields.forEach((/**
             * @param {?} sourceField
             * @return {?}
             */
            sourceField => {
                sourceField.alias = sourceField.alias ? sourceField.alias : sourceField.name;
                // to allow only a list of sourcefield with names
            }));
        }
        /** @type {?} */
        const initOgcFilters = ((/** @type {?} */ (options))).ogcFilters;
        /** @type {?} */
        const ogcFilterWriter = new OgcFilterWriter();
        if (!initOgcFilters) {
            ((/** @type {?} */ (options))).ogcFilters =
                ogcFilterWriter.defineOgcFiltersDefaultOptions(initOgcFilters, fieldNameGeometry, 'wms');
        }
        else {
            initOgcFilters.advancedOgcFilters = initOgcFilters.pushButtons ? false : true;
        }
        if (sourceParams.layers.split(',').length > 1 && options && initOgcFilters.enabled) {
            console.log('*******************************');
            console.log('BE CAREFULL, YOUR WMS LAYERS (' + sourceParams.layers
                + ') MUST SHARE THE SAME FIELDS TO ALLOW ogcFilters TO WORK !! ');
            console.log('*******************************');
        }
        if (options.paramsWFS && initOgcFilters.enabled) {
            this.wfsService.getSourceFieldsFromWFS(options);
        }
        /** @type {?} */
        const filterQueryString = ogcFilterWriter.handleOgcFiltersAppliedValue(options, fieldNameGeometry);
        this.ol.updateParams({ filter: filterQueryString });
    }
    /**
     * @return {?}
     */
    get params() {
        return (/** @type {?} */ (this.options.params));
    }
    /**
     * @return {?}
     */
    get queryTitle() {
        return ((/** @type {?} */ (this.options))).queryTitle
            ? ((/** @type {?} */ (this.options))).queryTitle
            : 'title';
    }
    /**
     * @return {?}
     */
    get queryHtmlTarget() {
        return ((/** @type {?} */ (this.options))).queryHtmlTarget
            ? ((/** @type {?} */ (this.options))).queryHtmlTarget
            : QueryHtmlTarget.BLANK;
    }
    /**
     * @return {?}
     */
    refresh() {
        this.ol.updateParams({ igoRefresh: Math.random() });
    }
    /**
     * @private
     * @param {?} asWFSDataSourceOptions
     * @return {?}
     */
    buildDynamicDownloadUrlFromParamsWFS(asWFSDataSourceOptions) {
        /** @type {?} */
        const queryStringValues = formatWFSQueryString(asWFSDataSourceOptions);
        /** @type {?} */
        const downloadUrl = queryStringValues.find((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name === 'getfeature')).value;
        return downloadUrl;
    }
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        return new olSourceImageWMS(this.options);
    }
    /**
     * @param {?=} scale
     * @return {?}
     */
    getLegend(scale) {
        /** @type {?} */
        let legend = super.getLegend();
        if (legend.length > 0) {
            return legend;
        }
        /** @type {?} */
        const sourceParams = this.params;
        /** @type {?} */
        let layers = [];
        if (sourceParams.layers !== undefined) {
            layers = sourceParams.layers.split(',');
        }
        /** @type {?} */
        const baseUrl = this.options.url.replace(/\?$/, '');
        /** @type {?} */
        const params = [
            'REQUEST=GetLegendGraphic',
            'SERVICE=wms',
            'FORMAT=image/png',
            'SLD_VERSION=1.1.0',
            `VERSION=${sourceParams.version || '1.3.0'}`
        ];
        if (scale !== undefined) {
            params.push(`SCALE=${scale}`);
        }
        legend = layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            return {
                url: `${baseUrl}?${params.join('&')}&LAYER=${layer}`,
                title: layers.length > 1 ? layer : undefined
            };
        }));
        return legend;
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} epsg
 * @return {?}
 */
function createDefaultTileGrid(epsg) {
    /** @type {?} */
    const projection = epsg ? get(epsg) : get('EPSG:3857');
    /** @type {?} */
    const projectionExtent = projection.getExtent();
    /** @type {?} */
    const size = getWidth(projectionExtent) / 256;
    /** @type {?} */
    const resolutions = new Array(20);
    /** @type {?} */
    const matrixIds = new Array(20);
    for (let z = 0; z < 20; ++z) {
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }
    return new olTileGridWMTS({
        origin: getTopLeft(projectionExtent),
        resolutions,
        matrixIds
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WMTSDataSource extends DataSource {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
    }
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        /** @type {?} */
        const sourceOptions = Object.assign({
            tileGrid: createDefaultTileGrid((/** @type {?} */ (this.options.projection)))
        }, this.options);
        return new olSourceWMTS(sourceOptions);
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CartoDataSource extends DataSource {
    /**
     * @return {?}
     */
    get params() {
        return (/** @type {?} */ (this.options.params));
    }
    /**
     * @return {?}
     */
    get queryTitle() {
        return ((/** @type {?} */ (this.options))).queryTitle
            ? ((/** @type {?} */ (this.options))).queryTitle
            : 'title';
    }
    /**
     * @return {?}
     */
    get queryHtmlTarget() {
        return ((/** @type {?} */ (this.options))).queryHtmlTarget
            ? ((/** @type {?} */ (this.options))).queryHtmlTarget
            : QueryHtmlTarget.BLANK;
    }
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        /** @type {?} */
        const crossOrigin = this.options.crossOrigin
            ? this.options.crossOrigin
            : 'anonymous';
        /** @type {?} */
        const sourceOptions = Object.assign({
            crossOrigin
        }, this.options);
        return new olSourceCarto(sourceOptions);
    }
    /**
     * @return {?}
     */
    getLegend() {
        /** @type {?} */
        const legend = super.getLegend();
        if (legend.length > 0) {
            return legend;
        }
        /** @type {?} */
        let htmlString = '<table>';
        if (this.options.config.layers[0].legend != null) {
            this.options.config.layers[0].legend.items.forEach((/**
             * @param {?} f
             * @return {?}
             */
            f => {
                if (f.visible === true) {
                    htmlString +=
                        '<tr><td>' +
                            '<p><font size="5" color="' +
                            f.value +
                            '"> &#9679</font></p></td>' +
                            '<td>' +
                            f.name +
                            '</td></tr>';
                }
            }));
            htmlString += '</table>';
            return [{ html: htmlString }];
        }
        else {
            // Try to build the legend from the cartocss options
            /** @type {?} */
            const layerOptions = this.options.config.layers[0].options;
            // All available cartocss style options
            /** @type {?} */
            const types = [
                'polygon-fill:',
                'marker-fill:',
                'shield-fill:',
                'building-fill:',
                'line-color:'
            ];
            for (const oneType of types) {
                if (layerOptions.cartocss.includes(oneType)) {
                    /** @type {?} */
                    const type = layerOptions.cartocss.split(oneType).pop();
                    /** @type {?} */
                    const color = type.substr(0, type.indexOf(';'));
                    if (color.includes('ramp')) {
                        /** @type {?} */
                        const colors = color.split(', (')[1].split(',');
                        /** @type {?} */
                        const data = color.split(', (')[2].split(',');
                        for (let j = 0; j < colors.length; j++) {
                            colors[j] = colors[j].replace(/("|\))/g, '');
                            data[j] = data[j].replace(/("|\))/g, '');
                            if (data[j].replace(/\s+/g, '') === '=') {
                                data[j] = 'Autres';
                            }
                            htmlString +=
                                '<tr><td>' +
                                    '<p><font size="5" color="' +
                                    colors[j] +
                                    '"> &#9679</font></p></td>' +
                                    '<td>' +
                                    data[j] +
                                    '</td></tr>';
                        }
                        break;
                    }
                    else {
                        /** @type {?} */
                        const title = layerOptions.layer_name
                            ? layerOptions.layer_name
                            : '';
                        htmlString +=
                            '<tr><td>' +
                                '<p><font size="5" color="' +
                                color +
                                '"> &#9679</font></p>' +
                                '</td><td>' +
                                title +
                                '</td></tr>';
                        break;
                    }
                }
            }
            htmlString += '</table>';
            return [{ html: htmlString }];
        }
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ArcGISRestDataSource extends DataSource {
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        /** @type {?} */
        const esrijsonFormat = new olFormatEsriJSON();
        return new OlVectorSource({
            attributions: this.options.params.attributions,
            overlaps: false,
            format: esrijsonFormat,
            url: (/**
             * @param {?} extent
             * @param {?} resolution
             * @param {?} proj
             * @return {?}
             */
            function (extent, resolution, proj) {
                /** @type {?} */
                const baseUrl = this.options.url + '/' + this.options.layer + '/query/';
                /** @type {?} */
                const geometry = encodeURIComponent('{"xmin":' +
                    extent[0] +
                    ',"ymin":' +
                    extent[1] +
                    ',"xmax":' +
                    extent[2] +
                    ',"ymax":' +
                    extent[3] +
                    ',"spatialReference":{"wkid":102100}}');
                /** @type {?} */
                const params = [
                    'f=json',
                    `geometry=${geometry}`,
                    'geometryType=esriGeometryEnvelope',
                    'inSR=102100',
                    'spatialRel=esriSpatialRelIntersects',
                    'outFields=*',
                    'returnGeometry=true',
                    'outSR=102100'
                ];
                if (this.options.params.timeFilter) {
                    /** @type {?} */
                    const time = `time=${this.options.params.timeExtent}`;
                    params.push(time);
                }
                if (this.options.params.customParams) {
                    this.options.params.customParams.forEach((/**
                     * @param {?} element
                     * @return {?}
                     */
                    element => {
                        params.push(element);
                    }));
                }
                return `${baseUrl}?${params.join('&')}`;
            }).bind(this),
            strategy: bbox$1
        });
    }
    /**
     * @return {?}
     */
    getLegend() {
        /** @type {?} */
        const legendInfo = this.options.params.legendInfo;
        /** @type {?} */
        const legend = super.getLegend();
        if (legendInfo === undefined || legend.length > 0) {
            return legend;
        }
        /** @type {?} */
        const id = parseInt(this.options.layer, 10);
        /** @type {?} */
        const lyr = legendInfo.layers[id];
        /** @type {?} */
        let htmlString = '<table><tr><td>' + lyr.layerName + '</td></tr>';
        for (const lyrLegend of lyr.legend) {
            /** @type {?} */
            const modifiedUrl = this.options.url.replace('FeatureServer', 'MapServer');
            /** @type {?} */
            const src = `${modifiedUrl}/${lyr.layerId}/images/${lyrLegend.url}`;
            /** @type {?} */
            const label = lyrLegend.label.replace('<Null>', 'Null');
            htmlString +=
                `<tr><td align='left'><img src="` +
                    src +
                    `" alt ='' /></td><td>` +
                    label +
                    '</td></tr>';
        }
        htmlString += '</table>';
        return [{ html: htmlString }];
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TileArcGISRestDataSource extends DataSource {
    /**
     * @return {?}
     */
    get params() {
        return (/** @type {?} */ (this.options.params));
    }
    /**
     * @return {?}
     */
    get queryTitle() {
        return ((/** @type {?} */ (this.options))).queryTitle
            ? ((/** @type {?} */ (this.options))).queryTitle
            : 'title';
    }
    /**
     * @return {?}
     */
    get queryHtmlTarget() {
        return ((/** @type {?} */ (this.options))).queryHtmlTarget
            ? ((/** @type {?} */ (this.options))).queryHtmlTarget
            : QueryHtmlTarget.BLANK;
    }
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        return new olSourceTileArcGISRest(this.options);
    }
    /**
     * @return {?}
     */
    getLegend() {
        /** @type {?} */
        const legend = super.getLegend();
        if (this.options.legendInfo === undefined || legend.length > 0) {
            return legend;
        }
        /** @type {?} */
        const id = parseInt(this.options.layer, 10);
        /** @type {?} */
        const lyr = this.options.legendInfo.layers[id];
        /** @type {?} */
        let htmlString = '<table><tr><td>' + lyr.layerName + '</td></tr>';
        for (const lyrLegend of lyr.legend) {
            /** @type {?} */
            const src = `${this.options.url}/${lyr.layerId}/images/${lyrLegend.url}`;
            /** @type {?} */
            const label = lyrLegend.label.replace('<Null>', 'Null');
            htmlString +=
                `<tr><td align='left'><img src="` +
                    src +
                    `" alt ='' /></td><td>` +
                    label +
                    '</td></tr>';
        }
        htmlString += '</table>';
        return [{ html: htmlString }];
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebSocketDataSource extends FeatureDataSource {
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        this.createWebSocket();
        this.options.format = this.getSourceFormatFromOptions(this.options);
        return super.createOlSource();
    }
    /**
     * @private
     * @return {?}
     */
    createWebSocket() {
        this.ws = new WebSocket(this.options.url);
        this.ws.onmessage = this.onMessage.bind(this);
        if (this.options.onclose) {
            this.ws.onclose = this.onClose.bind(this);
        }
        if (this.options.onerror) {
            this.ws.onerror = this.onError.bind(this);
        }
        if (this.options.onopen) {
            this.ws.onopen = this.onOpen.bind(this);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMessage(event) {
        /** @type {?} */
        const featureAdded = this.options.format.readFeature(event.data);
        switch (this.options.onmessage) {
            case 'update':
                // ol don't add if same ID
                /** @type {?} */
                const featureToRemove = this.ol.getFeatureById(featureAdded.getId());
                if (featureToRemove) {
                    this.ol.removeFeature(featureToRemove);
                }
                this.ol.addFeature(featureAdded);
                break;
            case 'delete':
                this.ol.clear(true);
                this.ol.addFeature(featureAdded);
                break;
            case 'add':
            default:
                this.ol.addFeature(featureAdded);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClose(event) {
        // thrown message to user
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onError(event) {
        // thrown message to user
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onOpen(event) {
        // thrown message to user ?
    }
    /**
     * @return {?}
     */
    onUnwatch() {
        this.ws.close();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MVTDataSource extends DataSource {
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        /** @type {?} */
        const mvtFormat = new olFormatMVT({ featureClass: olFeature });
        this.options.format = mvtFormat;
        return new olSourceVectorTile(this.options);
    }
    /**
     * @protected
     * @return {?}
     */
    generateId() {
        if (!this.options.url) {
            return uuid();
        }
        /** @type {?} */
        const chain = 'mvt' + this.options.url;
        return (/** @type {?} */ (Md5.hashStr(chain)));
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ClusterDataSource extends FeatureDataSource {
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        this.options.format = this.getSourceFormatFromOptions(this.options);
        this.options.source = super.createOlSource();
        return new olSourceCluster(this.options);
    }
    /**
     * @protected
     * @return {?}
     */
    generateId() {
        return uuid();
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const FEATURE = 'Feature';
/** @enum {number} */
const FeatureMotion = {
    None: 0,
    Move: 1,
    Zoom: 2,
    Default: 3,
};
FeatureMotion[FeatureMotion.None] = 'None';
FeatureMotion[FeatureMotion.Move] = 'Move';
FeatureMotion[FeatureMotion.Zoom] = 'Zoom';
FeatureMotion[FeatureMotion.Default] = 'Default';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const LAYER = 'Layer';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const TooltipType = {
    TITLE: 'title',
    ABSTRACT: 'abstract',
    CUSTOM: 'custom',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImageWatcher extends Watcher {
    /**
     * @param {?} layer
     */
    constructor(layer) {
        super();
        this.loaded = 0;
        this.loading = 0;
        this.source = layer.options.source.ol;
        this.id = uuid();
    }
    /**
     * @protected
     * @return {?}
     */
    watch() {
        this.source.on(`imageloadstart`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadStart(e)));
        this.source.on(`imageloadend`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadEnd(e)));
        this.source.on(`imageloaderror`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadEnd(e)));
    }
    /**
     * @protected
     * @return {?}
     */
    unwatch() {
        this.source.un(`imageloadstart`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadStart(e)));
        this.source.un(`imageloadend`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadEnd(e)));
        this.source.un(`imageloaderror`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadEnd(e)));
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handleLoadStart(event) {
        if (!event.image.__watchers__) {
            event.image.__watchers__ = [];
        }
        event.image.__watchers__.push(this.id);
        this.loading += 1;
        this.status = SubjectStatus.Working;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handleLoadEnd(event) {
        if (!event.image.__watchers__) {
            return;
        }
        /** @type {?} */
        const watcherIndex = event.image.__watchers__.indexOf(this.id);
        if (watcherIndex < 0) {
            return;
        }
        event.image.__watchers__.splice(watcherIndex, 1);
        this.loaded += 1;
        /** @type {?} */
        const loading = this.loading;
        if (this.loaded >= loading) {
            if (loading === this.loading) {
                this.status = SubjectStatus.Done;
                this.loaded = this.loading = 0;
            }
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TileWatcher extends Watcher {
    /**
     * @param {?} layer
     */
    constructor(layer) {
        super();
        this.loaded = 0;
        this.loading = 0;
        this.source = layer.options.source.ol;
        this.id = uuid();
    }
    /**
     * @protected
     * @return {?}
     */
    watch() {
        this.source.on(`tileloadstart`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadStart(e)));
        this.source.on(`tileloadend`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadEnd(e)));
        this.source.on(`tileloaderror`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadEnd(e)));
    }
    /**
     * @protected
     * @return {?}
     */
    unwatch() {
        this.source.un(`tileloadstart`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadStart(e)));
        this.source.un(`tileloadend`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadEnd(e)));
        this.source.un(`tileloaderror`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadEnd(e)));
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handleLoadStart(event) {
        // This is to avoid increasing
        // the number of loaded tiles if a tile was loading
        // before subscribing to this watcher
        if (!event.tile.__watchers__) {
            event.tile.__watchers__ = [];
        }
        event.tile.__watchers__.push(this.id);
        this.loading += 1;
        this.status = SubjectStatus.Working;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handleLoadEnd(event) {
        if (!event.tile.__watchers__) {
            return;
        }
        /** @type {?} */
        const watcherIndex = event.tile.__watchers__.indexOf(this.id);
        if (watcherIndex < 0) {
            return;
        }
        event.tile.__watchers__.splice(watcherIndex, 1);
        this.loaded += 1;
        /** @type {?} */
        const loading = this.loading;
        if (this.loaded >= loading) {
            if (loading === this.loading) {
                this.status = SubjectStatus.Done;
                this.loaded = this.loading = 0;
            }
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VectorWatcher extends Watcher {
    /**
     * @param {?} layer
     */
    constructor(layer) {
        super();
        this.loaded = 0;
        this.loading = 0;
        this.layer = layer;
        this.id = uuid();
    }
    /**
     * @protected
     * @return {?}
     */
    watch() {
    }
    /**
     * @protected
     * @return {?}
     */
    unwatch() {
        this.layer.onUnwatch();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Get all the layers legend
 * @param {?} layers
 * @param {?=} scale
 * @return {?} Array of legend
 */
function getLayersLegends(layers, scale) {
    /** @type {?} */
    const legends = [];
    /** @type {?} */
    const newCanvas = document.createElement('canvas');
    /** @type {?} */
    const newContext = newCanvas.getContext('2d');
    newContext.font = '20px Calibri';
    /** @type {?} */
    let heightPos = 0;
    for (const layer of layers) {
        if (layer.visible === false) {
            continue;
        }
        /** @type {?} */
        const legendUrls = layer.dataSource.getLegend(scale) || [];
        for (const legendUrl of legendUrls) {
            if (legendUrl.url === undefined) {
                continue;
            }
            /** @type {?} */
            const title = layer.title;
            // Create an image for the legend
            /** @type {?} */
            const legendImage = new Image();
            legendImage.crossOrigin = 'anonymous';
            legendImage.src = legendUrl.url;
            legendImage.onload = (/**
             * @return {?}
             */
            () => {
                newContext.fillText(title, 0, heightPos);
                newContext.drawImage(legendImage, 0, heightPos + 20);
                heightPos += legendImage.height + 5;
            });
            // Add legend info to the list
            legends.push({
                title,
                url: legendUrl.url,
                image: legendImage
            });
        }
    }
    return legends;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImageLayer extends Layer {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.watcher = new ImageWatcher(this);
        this.status$ = this.watcher.status$;
    }
    /**
     * @protected
     * @return {?}
     */
    createOlLayer() {
        /** @type {?} */
        const olOptions = Object.assign({}, this.options, {
            source: (/** @type {?} */ (this.options.source.ol))
        });
        /** @type {?} */
        const image = new olLayerImage(olOptions);
        /** @type {?} */
        const token = this.options.token;
        if (token) {
            ((/** @type {?} */ (image.getSource()))).setImageLoadFunction((/**
             * @param {?} tile
             * @param {?} src
             * @return {?}
             */
            (tile, src) => {
                this.customLoader(tile, src, token);
            }));
        }
        return image;
    }
    /**
     * @param {?} map
     * @return {?}
     */
    setMap(map$$1) {
        if (map$$1 === undefined) {
            this.watcher.unsubscribe();
        }
        else {
            this.watcher.subscribe((/**
             * @return {?}
             */
            () => { }));
        }
        super.setMap(map$$1);
    }
    /**
     * @private
     * @param {?} tile
     * @param {?} src
     * @param {?=} token
     * @return {?}
     */
    customLoader(tile, src, token) {
        /** @type {?} */
        const xhr = new XMLHttpRequest();
        xhr.open('GET', src);
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.responseType = 'arraybuffer';
        xhr.onload = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const arrayBufferView = new Uint8Array(((/** @type {?} */ (this))).response);
            /** @type {?} */
            const blob = new Blob([arrayBufferView], { type: 'image/png' });
            /** @type {?} */
            const urlCreator = window.URL;
            /** @type {?} */
            const imageUrl = urlCreator.createObjectURL(blob);
            tile.getImage().src = imageUrl;
        });
        xhr.send();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TileLayer extends Layer {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.watcher = new TileWatcher(this);
        this.status$ = this.watcher.status$;
    }
    /**
     * @protected
     * @return {?}
     */
    createOlLayer() {
        /** @type {?} */
        const olOptions = Object.assign({}, this.options, {
            source: (/** @type {?} */ (this.options.source.ol))
        });
        return new olLayerTile(olOptions);
    }
    /**
     * @param {?} map
     * @return {?}
     */
    setMap(map$$1) {
        if (map$$1 === undefined) {
            this.watcher.unsubscribe();
        }
        else {
            this.watcher.subscribe((/**
             * @return {?}
             */
            () => { }));
        }
        super.setMap(map$$1);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VectorLayer extends Layer {
    /**
     * @return {?}
     */
    get browsable() {
        return this.options.browsable !== false;
    }
    /**
     * @return {?}
     */
    get exportable() {
        return this.options.exportable !== false;
    }
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.watcher = new VectorWatcher(this);
        this.status$ = this.watcher.status$;
    }
    /**
     * @protected
     * @return {?}
     */
    createOlLayer() {
        /** @type {?} */
        const olOptions = Object.assign({}, this.options, {
            source: (/** @type {?} */ (this.options.source.ol))
        });
        if (this.options.animation) {
            this.dataSource.ol.on('addfeature', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                this.flash(e.feature);
            }).bind(this));
        }
        return new OlVectorLayer(olOptions);
    }
    /**
     * @protected
     * @param {?} feature
     * @return {?}
     */
    flash(feature) {
        /** @type {?} */
        const start = new Date().getTime();
        /** @type {?} */
        const listenerKey = this.map.ol.on('postcompose', animate$$1.bind(this));
        /**
         * @param {?} event
         * @return {?}
         */
        function animate$$1(event) {
            /** @type {?} */
            const vectorContext = event.vectorContext;
            /** @type {?} */
            const frameState = event.frameState;
            /** @type {?} */
            const flashGeom = feature.getGeometry().clone();
            /** @type {?} */
            const elapsed = frameState.time - start;
            /** @type {?} */
            const elapsedRatio = elapsed / this.options.animation.duration;
            /** @type {?} */
            const opacity = easeOut(1 - elapsedRatio);
            /** @type {?} */
            const newColor = asArray(this.options.animation.color || 'red');
            newColor[3] = opacity;
            /** @type {?} */
            const style$$1 = this.ol.getStyleFunction().call(this, feature)[0];
            /** @type {?} */
            const styleClone = style$$1.clone();
            switch (feature.getGeometry().getType()) {
                case 'Point':
                    /** @type {?} */
                    const radius = easeOut(elapsedRatio) * (styleClone.getImage().getRadius() * 3);
                    styleClone.getImage().setRadius(radius);
                    styleClone.getImage().setOpacity(opacity);
                    break;
                case 'LineString':
                    // TODO
                    if (styleClone.getImage().getStroke()) {
                        styleClone
                            .getImage()
                            .getStroke()
                            .setColor(newColor);
                        styleClone
                            .getImage()
                            .getStroke()
                            .setWidth(easeOut(elapsedRatio) *
                            (styleClone
                                .getImage()
                                .getStroke()
                                .getWidth() *
                                3));
                    }
                    if (styleClone.getStroke()) {
                        styleClone.getStroke().setColor(newColor);
                        styleClone
                            .getStroke()
                            .setWidth(easeOut(elapsedRatio) * (styleClone.getStroke().getWidth() * 3));
                    }
                    break;
                case 'Polygon':
                    // TODO
                    if (styleClone.getImage().getFill()) {
                        styleClone
                            .getImage()
                            .getFill()
                            .setColor(newColor);
                    }
                    if (styleClone.getFill()) {
                        styleClone.getFill().setColor(newColor);
                    }
                    break;
            }
            vectorContext.setStyle(styleClone);
            vectorContext.drawGeometry(flashGeom);
            if (elapsed > this.options.animation.duration) {
                unByKey(listenerKey);
                // remove last geometry
                // there is a little flash before feature disappear, better solution ?
                this.map.ol.render();
                return;
            }
            // tell OpenLayers to continue postcompose animation
            this.map.ol.render();
        }
    }
    /**
     * @param {?} map
     * @return {?}
     */
    setMap(map$$1) {
        if (map$$1 === undefined) {
            this.watcher.unsubscribe();
        }
        else {
            this.watcher.subscribe((/**
             * @return {?}
             */
            () => { }));
        }
        super.setMap(map$$1);
    }
    /**
     * @return {?}
     */
    onUnwatch() {
        this.dataSource.onUnwatch();
        this.stopAnimation();
    }
    /**
     * @return {?}
     */
    stopAnimation() {
        this.dataSource.ol.un('addfeature', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.flash(e.feature);
        }).bind(this));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VectorTileLayer extends Layer {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
    }
    /**
     * @protected
     * @return {?}
     */
    createOlLayer() {
        /** @type {?} */
        const olOptions = Object.assign({}, this.options, {
            source: (/** @type {?} */ (this.options.source.ol))
        });
        return new olLayerVectorTile(olOptions);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StyleService {
    constructor() { }
    /**
     * @param {?} options
     * @return {?}
     */
    createStyle(options) {
        return this.parseStyle('style', options);
    }
    /**
     * @private
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    parseStyle(key, value) {
        /** @type {?} */
        const styleOptions = {};
        /** @type {?} */
        const olCls = this.getOlCls(key);
        if (olCls && value instanceof Object) {
            Object.keys(value).forEach((/**
             * @param {?} _key
             * @return {?}
             */
            _key => {
                /** @type {?} */
                const olKey = this.getOlKey(_key);
                styleOptions[olKey] = this.parseStyle(_key, value[_key]);
            }));
            return new olCls(styleOptions);
        }
        else {
            return value;
        }
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    getOlKey(key) {
        /** @type {?} */
        let olKey = key.toLowerCase();
        switch (olKey) {
            case 'circle':
            case 'regularshape':
            case 'icon':
                olKey = 'image';
                break;
            default:
                break;
        }
        return olKey;
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    getOlCls(key) {
        /** @type {?} */
        let olCls = olstyle[key.charAt(0).toUpperCase() + key.slice(1)];
        if (key === 'regularshape') {
            olCls = RegularShape;
        }
        return olCls;
    }
    /**
     * @param {?} feature
     * @param {?} styleByAttribute
     * @return {?}
     */
    createStyleByAttribute(feature, styleByAttribute) {
        /** @type {?} */
        let style$$1;
        /** @type {?} */
        const type = styleByAttribute.type;
        /** @type {?} */
        const attribute = styleByAttribute.attribute;
        /** @type {?} */
        const data = styleByAttribute.data;
        /** @type {?} */
        const stroke = styleByAttribute.stroke;
        /** @type {?} */
        const width = styleByAttribute.width;
        /** @type {?} */
        const fill = styleByAttribute.fill;
        /** @type {?} */
        const radius = styleByAttribute.radius;
        /** @type {?} */
        const icon = styleByAttribute.icon;
        /** @type {?} */
        const scale = styleByAttribute.scale;
        /** @type {?} */
        const size = data.length;
        /** @type {?} */
        const label = styleByAttribute.label;
        /** @type {?} */
        const baseStyle = styleByAttribute.baseStyle;
        if (type === 'circle') {
            for (let i = 0; i < size; i++) {
                if (feature.get(attribute) === data[i]) {
                    if (icon) {
                        style$$1 = [
                            new Style({
                                image: new Icon({
                                    src: icon[i],
                                    scale: scale ? scale[i] : 1
                                })
                            })
                        ];
                        return style$$1;
                    }
                    style$$1 = [
                        new Style({
                            image: new Circle({
                                radius: radius ? radius[i] : 4,
                                stroke: new Stroke({
                                    color: stroke ? stroke[i] : 'black'
                                }),
                                fill: new Fill({
                                    color: fill ? fill[i] : 'black'
                                })
                            })
                        })
                    ];
                    return style$$1;
                }
            }
            if (!feature.getStyle()) {
                style$$1 = [
                    new Style({
                        image: new Circle({
                            radius: 4,
                            stroke: new Stroke({
                                color: 'black'
                            }),
                            fill: new Fill({
                                color: '#bbbbf2'
                            })
                        })
                    })
                ];
                return style$$1;
            }
        }
        else if (type === 'regular') {
            for (let i = 0; i < size; i++) {
                if (feature.get(attribute) === data[i]) {
                    style$$1 = [
                        new Style({
                            stroke: new Stroke({
                                color: stroke ? stroke[i] : 'black',
                                width: width ? width[i] : 1
                            }),
                            fill: new Fill({
                                color: fill ? fill[i] : 'rgba(255,255,255,0.4)'
                            }),
                            text: new Text({
                                text: feature.get(label),
                                stroke: new Stroke({
                                    color: 'black'
                                })
                            })
                        })
                    ];
                    return style$$1;
                }
            }
            if (!feature.getStyle()) {
                if (baseStyle) {
                    style$$1 = this.createStyle(baseStyle);
                    return style$$1;
                }
                style$$1 = [
                    new Style({
                        stroke: new Stroke({
                            color: 'black'
                        }),
                        fill: new Fill({
                            color: '#bbbbf2'
                        })
                    })
                ];
                return style$$1;
            }
        }
    }
    /**
     * @param {?} feature
     * @param {?} clusterParam
     * @return {?}
     */
    createClusterStyle(feature, clusterParam) {
        /** @type {?} */
        let style$$1;
        /** @type {?} */
        const range = clusterParam.clusterRange;
        /** @type {?} */
        const icon = clusterParam.clusterIcon;
        /** @type {?} */
        const scale = clusterParam.clusterScale;
        /** @type {?} */
        const size = feature.get('features').length;
        /** @type {?} */
        let color;
        if (size !== 1) {
            if (range) {
                if (size >= range[1]) {
                    color = 'red';
                }
                else if (size < range[1] && size >= range[0]) {
                    color = 'orange';
                }
                else if (size < range[0]) {
                    color = 'green';
                }
            }
            style$$1 = [
                new Style({
                    image: new Circle({
                        radius: 2 * size + 3.4,
                        stroke: new Stroke({
                            color: 'black'
                        }),
                        fill: new Fill({
                            color: range ? color : 'blue'
                        })
                    }),
                    text: new Text({
                        text: size.toString(),
                        fill: new Fill({
                            color: '#fff'
                        })
                    })
                })
            ];
        }
        else {
            if (icon) {
                style$$1 = [
                    new Style({
                        image: new Icon({
                            src: icon,
                            scale
                        })
                    })
                ];
            }
            else {
                style$$1 = [
                    new Style({
                        image: new Circle({
                            radius: 2 * size + 3.4,
                            stroke: new Stroke({
                                color: 'black'
                            }),
                            fill: new Fill({
                                color: 'blue'
                            })
                        })
                    })
                ];
            }
        }
        return style$$1;
    }
}
StyleService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
StyleService.ctorParameters = () => [];
/** @nocollapse */ StyleService.ngInjectableDef = defineInjectable({ factory: function StyleService_Factory() { return new StyleService(); }, token: StyleService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Whether a layer is queryable
 * @param {?} layer Layer
 * @return {?} True if the layer s squeryable
 */
function layerIsQueryable(layer) {
    /** @type {?} */
    const dataSource = (/** @type {?} */ (layer.dataSource));
    return dataSource.options.queryable === true;
}
/**
 * Whether an OL layer is queryable
 * @param {?} olLayer
 * @return {?} True if the ol layer is queryable
 */
function olLayerIsQueryable(olLayer) {
    /** @type {?} */
    const layer = olLayer.get('_layer');
    return layer === undefined ? false : layerIsQueryable(layer);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LayerItemComponent {
    constructor() {
        this.showLegend$ = new BehaviorSubject(false);
        this.inResolutionRange$ = new BehaviorSubject(true);
        this.queryBadgeHidden$ = new BehaviorSubject(true);
        this.toggleLegendOnVisibilityChange = false;
        this.expandLegendIfVisible = false;
        this.updateLegendOnResolutionChange = false;
        this.orderable = true;
        this.lowerDisabled = false;
        this.raiseDisabled = false;
        this.queryBadge = false;
    }
    /**
     * @return {?}
     */
    get removable() { return this.layer.options.removable !== false; }
    /**
     * @return {?}
     */
    get opacity() { return this.layer.opacity * 100; }
    /**
     * @param {?} opacity
     * @return {?}
     */
    set opacity(opacity) { this.layer.opacity = opacity / 100; }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const legend = this.layer.dataSource.options.legend || {};
        /** @type {?} */
        let legendCollapsed = legend.collapsed === false ? false : true;
        if (this.layer.visible && this.expandLegendIfVisible) {
            legendCollapsed = false;
        }
        this.toggleLegend(legendCollapsed);
        this.updateQueryBadge();
        /** @type {?} */
        const resolution$ = this.layer.map.viewController.resolution$;
        this.resolution$$ = resolution$.subscribe((/**
         * @return {?}
         */
        () => {
            this.onResolutionChange();
        }));
        this.tooltipText = this.computeTooltip();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.resolution$$.unsubscribe();
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
    toggleLegend(collapsed) {
        this.showLegend$.next(!collapsed);
    }
    /**
     * @return {?}
     */
    toggleVisibility() {
        this.layer.visible = !this.layer.visible;
        if (this.toggleLegendOnVisibilityChange) {
            this.toggleLegend(!this.layer.visible);
        }
        this.updateQueryBadge();
    }
    /**
     * @return {?}
     */
    computeTooltip() {
        /** @type {?} */
        const layerOptions = this.layer.options;
        if (!layerOptions.tooltip) {
            return this.layer.title;
        }
        /** @type {?} */
        const layerTooltip = layerOptions.tooltip;
        /** @type {?} */
        const layerMetadata = ((/** @type {?} */ (layerOptions))).metadata;
        switch (layerOptions.tooltip.type) {
            case TooltipType.TITLE:
                return this.layer.title;
            case TooltipType.ABSTRACT:
                if (layerMetadata && layerMetadata.abstract) {
                    return layerMetadata.abstract;
                }
                else {
                    return this.layer.title;
                }
            case TooltipType.CUSTOM:
                if (layerTooltip && layerTooltip.text) {
                    return layerTooltip.text;
                }
                else {
                    return this.layer.title;
                }
            default:
                return this.layer.title;
        }
    }
    /**
     * @private
     * @return {?}
     */
    onResolutionChange() {
        /** @type {?} */
        const inResolutionRange = this.layer.isInResolutionsRange;
        if (inResolutionRange === false && this.updateLegendOnResolutionChange === true) {
            this.toggleLegend(true);
        }
        this.inResolutionRange$.next(inResolutionRange);
    }
    /**
     * @private
     * @return {?}
     */
    updateQueryBadge() {
        /** @type {?} */
        const hidden = this.queryBadge === false ||
            this.layer.visible === false ||
            !layerIsQueryable(this.layer);
        this.queryBadgeHidden$.next(hidden);
    }
}
LayerItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-layer-item',
                template: "<mat-list-item>\r\n  <mat-icon\r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse\r\n    [target]=\"legend\"\r\n    [collapsed]=\"!(showLegend$ | async)\"\r\n    (toggle)=\"toggleLegend($event)\"\r\n    svgIcon=\"chevron-up\" >\r\n  </mat-icon>\r\n  <h4 matLine [matTooltip]=\"tooltipText\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n\r\n  <button\r\n    mat-icon-button\r\n    [color]=\"layer.visible ? 'primary' : 'default'\"\r\n    collapsibleButton\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"layer.visible ?\r\n                  ('igo.geo.layer.hideLayer' | translate) :\r\n                  ('igo.geo.layer.showLayer' | translate)\"\r\n    (click)=\"toggleVisibility()\">\r\n    <mat-icon\r\n      matBadge=\"?\"\r\n      matBadgeColor=\"accent\"\r\n      matBadgeSize=\"small\"\r\n      matBadgePosition=\"after\"\r\n      [matBadgeHidden]=\"queryBadgeHidden$ | async\"\r\n      [ngClass]=\"{disabled: !(inResolutionRange$ | async)}\"\r\n      [svgIcon]=\"layer.visible ? 'eye' : 'eye-off'\">\r\n    </mat-icon>\r\n  </button>\r\n\r\n  <button\r\n    mat-icon-button\r\n    color=\"primary\"\r\n    igoCollapse\r\n    [target]=\"actions\"\r\n    [collapsed]=\"true\">\r\n    <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n  </button>\r\n</mat-list-item>\r\n\r\n<div #actions class=\"igo-layer-actions-container\">\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <mat-slider\r\n      id=\"opacity-slider\"\r\n      thumbLabel\r\n      tickInterval=\"5\"\r\n      step=\"5\"\r\n      [min]=\"0\"\r\n      [max]=\"100\"\r\n      [(ngModel)]=\"opacity\"\r\n      [matTooltip]=\"'igo.geo.layer.opacity' | translate\"\r\n      matTooltipShowDelay=\"500\"\r\n      tooltip-position=\"below\">\r\n    </mat-slider>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <div class=\"igo-layer-button-group\">\r\n      <button\r\n        color=\"primary\"\r\n        mat-icon-button\r\n        tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.raiseLayer' | translate\"\r\n        [disabled]=\"!orderable || raiseDisabled\"\r\n        (click)=\"layer.map.raiseLayer(layer)\">\r\n        <mat-icon svgIcon=\"arrow-up\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        color=\"primary\"\r\n        tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.lowerLayer' | translate\"\r\n        [disabled]=\"!orderable || lowerDisabled\"\r\n        (click)=\"layer.map.lowerLayer(layer)\">\r\n        <mat-icon svgIcon=\"arrow-down\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        *ngIf=\"removable === true\"\r\n        mat-icon-button\r\n        color=\"warn\"\r\n        tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.removeLayer' | translate\"\r\n        (click)=\"layer.map.removeLayer(layer)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n      <ng-content select=\"[igoLayerItemToolbar]\"></ng-content>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div #legend class=\"igo-layer-legend-container\">\r\n  <igo-layer-legend\r\n    *ngIf=\"showLegend$ | async\"\r\n    [layer]=\"layer\"\r\n    [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\">\r\n  </igo-layer-legend>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{overflow:hidden}.igo-layer-actions-container{width:100%;display:inline-block}.igo-layer-actions-container>div{text-align:center}.igo-layer-legend-container{padding-left:18px;width:calc(100% - 18px);display:inline-block}#opacity-slider{width:100%}.igo-layer-button-group{float:right;padding:0 3px}@media only screen and (max-width:450px),only screen and (max-height:450px){#opacity-slider{width:70%}.igo-layer-button-group{float:none}}mat-icon.disabled{color:rgba(0,0,0,.38)}.mat-badge-small .mat-badge-content{font-size:12px}"]
            }] }
];
/** @nocollapse */
LayerItemComponent.ctorParameters = () => [];
LayerItemComponent.propDecorators = {
    layer: [{ type: Input }],
    toggleLegendOnVisibilityChange: [{ type: Input }],
    expandLegendIfVisible: [{ type: Input }],
    updateLegendOnResolutionChange: [{ type: Input }],
    orderable: [{ type: Input }],
    lowerDisabled: [{ type: Input }],
    raiseDisabled: [{ type: Input }],
    queryBadge: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LayerLegendComponent {
    /**
     * @param {?} capabilitiesService
     */
    constructor(capabilitiesService) {
        this.capabilitiesService = capabilitiesService;
        this.updateLegendOnResolutionChange = false;
        /**
         * Observable of the legend items
         */
        this.legendItems$ = new BehaviorSubject([]);
    }
    /**
     * On init, subscribe to the map's resolution and update the legend accordingly
     * @return {?}
     */
    ngOnInit() {
        if (this.updateLegendOnResolutionChange === true) {
            /** @type {?} */
            const resolution$ = this.layer.map.viewController.resolution$;
            this.resolution$$ = resolution$.subscribe((/**
             * @param {?} resolution
             * @return {?}
             */
            (resolution) => this.onResolutionChange(resolution)));
        }
        else {
            this.updateLegend(undefined);
        }
    }
    /**
     * On destroy, unsubscribe to the map,s resolution
     * @return {?}
     */
    ngOnDestroy() {
        if (this.resolution$$ !== undefined) {
            this.resolution$$.unsubscribe();
        }
    }
    /**
     * @param {?} layerLegend
     * @return {?}
     */
    computeItemTitle(layerLegend) {
        /** @type {?} */
        const layerOptions = (/** @type {?} */ (this.layer.dataSource.options));
        if (layerOptions.type !== 'wms') {
            return of(layerLegend.title);
        }
        /** @type {?} */
        const layers = layerOptions.params.layers.split(',');
        /** @type {?} */
        const localLayerOptions = JSON.parse(JSON.stringify(layerOptions));
        localLayerOptions.params.layers = layers.find((/**
         * @param {?} layer
         * @return {?}
         */
        layer => layer === layerLegend.title));
        return this.capabilitiesService
            .getWMSOptions(localLayerOptions)
            .pipe(map((/**
         * @param {?} wmsDataSourceOptions
         * @return {?}
         */
        wmsDataSourceOptions => {
            return wmsDataSourceOptions._layerOptionsFromCapabilities.title;
        })));
    }
    /**
     * On resolution change, compute the effective scale level and update the
     * legend accordingly.
     * @private
     * @param {?} resolution
     * @return {?}
     */
    onResolutionChange(resolution) {
        /** @type {?} */
        const scale = this.layer.map.viewController.getScale();
        this.updateLegend(scale);
    }
    /**
     * Update the legend according the scale level
     * @private
     * @param {?} scale Map scale level
     * @return {?}
     */
    updateLegend(scale) {
        /** @type {?} */
        const legendItems = this.layer.dataSource.getLegend(scale);
        if (legendItems.length === 0 && this.legendItems$.value.length === 0) {
            return;
        }
        this.legendItems$.next(legendItems);
    }
}
LayerLegendComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-layer-legend',
                template: "<ng-container *ngIf=\"legendItems$ | async as items\">\r\n  <ng-container *ngIf=\"items.length; else noItems\">\r\n    <ng-container *ngFor=\"let item of items\">\r\n      <mat-list-item *ngIf=\"item.title\">\r\n        <mat-icon\r\n          id=\"legend-toggle\"\r\n          class=\"igo-chevron\"\r\n          mat-list-avatar\r\n          igoCollapse\r\n          [target]=\"legend\"\r\n          [collapsed]=\"false\"\r\n          svgIcon=\"chevron-up\">\r\n        </mat-icon>\r\n        <h4 matLine>{{computeItemTitle(item) | async}}</h4>\r\n      </mat-list-item>\r\n    \r\n      <div #legend class=\"igo-layer-legend\" [ngClass]=\"{'with-title': item.title}\">\r\n        <img\r\n          *ngIf=\"item.url\"\r\n          src=\"{{(item.url | secureImage) |\u00A0async}}\"\r\n          alt=\"{{'igo.geo.layer.loadingLegendText' | translate}}\">\r\n        <div\r\n          [ngStyle]=\"item.style\"\r\n          [innerHTML]=\"item.html\"\r\n          *ngIf=\"item.html\">\r\n        </div>\r\n      </div>\r\n    </ng-container>\r\n  </ng-container>\r\n\r\n  <ng-template #noItems>\r\n    <small>\r\n      {{'igo.geo.layer.noLegendText' | translate}}\r\n    </small>\r\n  </ng-template>\r\n\r\n</ng-container>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".igo-layer-legend.with-title{padding-left:18px}"]
            }] }
];
/** @nocollapse */
LayerLegendComponent.ctorParameters = () => [
    { type: CapabilitiesService }
];
LayerLegendComponent.propDecorators = {
    updateLegendOnResolutionChange: [{ type: Input }],
    layer: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const LayerListControlsEnum = {
    always: 'always',
    never: 'never',
    default: 'default',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LayerListService {
    constructor() {
        this.sortedAlpha = false;
        this.onlyVisible = false;
        this.onlyInRange = false;
        this.keywordInitialized = false;
        this.sortedAlphaInitialized = false;
        this.onlyVisibleInitialized = false;
        this.onlyInRangeInitialized = false;
    }
}
LayerListService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LayerListService.ctorParameters = () => [];
/** @nocollapse */ LayerListService.ngInjectableDef = defineInjectable({ factory: function LayerListService_Factory() { return new LayerListService(); }, token: LayerListService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// TODO: This class could use a clean up. Also, some methods could be moved ealsewhere
class LayerListComponent {
    /**
     * @param {?} layerListService
     */
    constructor(layerListService) {
        this.layerListService = layerListService;
        this.hasLayerNotVisible = false;
        this.hasLayerOutOfRange = false;
        this.orderable = true;
        this.thresholdToFilterAndSort = 5;
        this.layers$ = new BehaviorSubject([]);
        this.change$ = new ReplaySubject(1);
        this.showToolbar$ = new BehaviorSubject(false);
        this.placeholder = '';
        this.floatLabel = 'auto';
        this.layerFilterAndSortOptions = {};
        this.excludeBaseLayers = false;
        this.toggleLegendOnVisibilityChange = false;
        this.expandLegendOfVisibleLayers = false;
        this.updateLegendOnResolutionChange = false;
        this.queryBadge = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set layers(value) {
        this.setLayers(value);
        this.next();
    }
    /**
     * @return {?}
     */
    get layers() { return this._layers; }
    /**
     * @return {?}
     */
    get keyword() { return this.layerListService.keyword; }
    /**
     * @param {?} value
     * @return {?}
     */
    set keyword(value) {
        this.layerListService.keyword = value;
        this.next();
    }
    /**
     * @return {?}
     */
    get keywordInitialized() { return this.layerListService.keywordInitialized; }
    /**
     * @param {?} value
     * @return {?}
     */
    set keywordInitialized(value) { this.layerListService.keywordInitialized = value; }
    /**
     * @return {?}
     */
    get onlyVisible() { return this.layerListService.onlyVisible; }
    /**
     * @param {?} value
     * @return {?}
     */
    set onlyVisible(value) {
        this.layerListService.onlyVisible = value;
        this.next();
    }
    /**
     * @return {?}
     */
    get onlyVisibleInitialized() { return this.layerListService.onlyVisibleInitialized; }
    /**
     * @param {?} value
     * @return {?}
     */
    set onlyVisibleInitialized(value) { this.layerListService.onlyVisibleInitialized = value; }
    /**
     * @return {?}
     */
    get onlyInRange() { return this.layerListService.onlyInRange; }
    /**
     * @param {?} value
     * @return {?}
     */
    set onlyInRange(value) {
        this.layerListService.onlyInRange = value;
        this.next();
    }
    /**
     * @return {?}
     */
    get onlyInRangeInitialized() { return this.layerListService.onlyInRangeInitialized; }
    /**
     * @param {?} value
     * @return {?}
     */
    set onlyInRangeInitialized(value) { this.layerListService.onlyInRangeInitialized = value; }
    /**
     * @return {?}
     */
    get sortedAlpha() { return this.layerListService.sortedAlpha; }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortedAlpha(value) {
        this.layerListService.sortedAlpha = value;
        this.next();
    }
    /**
     * @return {?}
     */
    get sortedAlphaInitialized() { return this.layerListService.sortedAlphaInitialized; }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortedAlphaInitialized(value) { this.layerListService.sortedAlphaInitialized = value; }
    /**
     * Subscribe to the search term stream and trigger researches
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.change$$ = this.change$
            .pipe(debounce((/**
         * @return {?}
         */
        () => {
            return this.layers.length === 0 ? EMPTY : timer(50);
        }))).subscribe((/**
         * @return {?}
         */
        () => {
            this.showToolbar$.next(this.computeShowToolbar());
            this.layers$.next(this.computeLayers(this.layers.slice(0)));
        }));
        this.initLayerFilterAndSortOptions();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.change$$.unsubscribe();
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
    toggleOnlyInRange() {
        this.onlyInRange = !this.onlyInRange;
    }
    /**
     * @param {?} sortAlpha
     * @return {?}
     */
    toggleSort(sortAlpha) {
        this.sortedAlpha = sortAlpha;
    }
    /**
     * @return {?}
     */
    clearKeyword() {
        this.keyword = undefined;
    }
    /**
     * @return {?}
     */
    getLowerLayer() {
        return this.layers.filter((/**
         * @param {?} l
         * @return {?}
         */
        l => !l.baseLayer)).reduce((/**
         * @param {?} prev
         * @param {?} current
         * @return {?}
         */
        (prev, current) => {
            return (prev.zIndex < current.zIndex) ? prev : current;
        }));
    }
    /**
     * @return {?}
     */
    getUpperLayer() {
        return this.layers.filter((/**
         * @param {?} l
         * @return {?}
         */
        l => !l.baseLayer)).reduce((/**
         * @param {?} prev
         * @param {?} current
         * @return {?}
         */
        (prev, current) => {
            return (prev.zIndex > current.zIndex) ? prev : current;
        }));
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
    computeLayers(layers) {
        /** @type {?} */
        let layersOut = this.filterLayers(layers);
        if (this.sortedAlpha) {
            layersOut = this.sortLayersByTitle(layersOut);
        }
        else {
            layersOut = this.sortLayersByZindex(layersOut);
        }
        return layersOut;
    }
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    filterLayers(layers) {
        /** @type {?} */
        const keyword = this.keyword;
        if (this.layerFilterAndSortOptions.showToolbar === LayerListControlsEnum.never) {
            return layers;
        }
        if (!keyword && !this.onlyInRange && !this.onlyVisible) {
            return layers;
        }
        /** @type {?} */
        const keepLayerIds = layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer.id));
        layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            /** @type {?} */
            const layerOptions = (/** @type {?} */ (layer.options)) || {};
            /** @type {?} */
            const dataSourceOptions = layer.dataSource.options || {};
            /** @type {?} */
            const metadata = layerOptions.metadata || (/** @type {?} */ ({}));
            /** @type {?} */
            const keywords = metadata.keywordList || [];
            /** @type {?} */
            const layerKeywords = keywords.map((/**
             * @param {?} kw
             * @return {?}
             */
            (kw) => {
                return kw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            }));
            if (keyword) {
                /** @type {?} */
                const localKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                /** @type {?} */
                const layerTitle = layer.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                /** @type {?} */
                const dataSourceType = dataSourceOptions.type || '';
                /** @type {?} */
                const keywordRegex = new RegExp(localKeyword, 'gi');
                /** @type {?} */
                const keywordInList = layerKeywords.find((/**
                 * @param {?} kw
                 * @return {?}
                 */
                (kw) => keywordRegex.test(kw))) !== undefined;
                if (!keywordRegex.test(layerTitle) &&
                    !(keyword.toLowerCase() === dataSourceType.toLowerCase()) &&
                    !keywordInList) {
                    /** @type {?} */
                    const index = keepLayerIds.indexOf(layer.id);
                    if (index > -1) {
                        keepLayerIds.splice(index, 1);
                    }
                }
            }
            if (this.onlyVisible && layer.visible === false) {
                /** @type {?} */
                const index = keepLayerIds.indexOf(layer.id);
                if (index > -1) {
                    keepLayerIds.splice(index, 1);
                }
            }
            if (this.onlyInRange && layer.isInResolutionsRange === false) {
                /** @type {?} */
                const index = keepLayerIds.indexOf(layer.id);
                if (index > -1) {
                    keepLayerIds.splice(index, 1);
                }
            }
        }));
        return layers.filter((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => keepLayerIds.indexOf(layer.id) !== -1));
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
     * @private
     * @param {?} layers
     * @return {?}
     */
    sortLayersByTitle(layers) {
        return layers.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        }));
    }
    /**
     * @private
     * @return {?}
     */
    computeShowToolbar() {
        switch (this.layerFilterAndSortOptions.showToolbar) {
            case LayerListControlsEnum.always:
                return true;
            case LayerListControlsEnum.never:
                return false;
            default:
                if (this.layers.length >= this.thresholdToFilterAndSort ||
                    this.keyword ||
                    this.onlyInRange ||
                    this.onlyVisible) {
                    return true;
                }
                return false;
        }
    }
    /**
     * @private
     * @return {?}
     */
    initLayerFilterAndSortOptions() {
        if (this.layerFilterAndSortOptions.toolbarThreshold) {
            this.thresholdToFilterAndSort = this.layerFilterAndSortOptions.toolbarThreshold;
        }
        if (this.layerFilterAndSortOptions.keyword && !this.keywordInitialized) {
            this.keyword = this.layerFilterAndSortOptions.keyword;
            this.keywordInitialized = true;
        }
        if (this.layerFilterAndSortOptions.sortedAlpha && !this.sortedAlphaInitialized) {
            this.sortedAlpha = this.layerFilterAndSortOptions.sortedAlpha;
            this.sortedAlphaInitialized = true;
        }
        if (this.layerFilterAndSortOptions.onlyVisible && !this.onlyVisibleInitialized &&
            this.hasLayerNotVisible) {
            this.onlyVisible = this.layerFilterAndSortOptions.onlyVisible;
            this.onlyVisibleInitialized = true;
        }
        if (this.layerFilterAndSortOptions.onlyInRange && !this.onlyInRangeInitialized &&
            this.hasLayerOutOfRange) {
            this.onlyInRange = this.layerFilterAndSortOptions.onlyInRange;
            this.onlyInRangeInitialized = true;
        }
    }
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    setLayers(layers) {
        this._layers = layers;
        if (this.excludeBaseLayers) {
            this.hasLayerNotVisible = layers.find((/**
             * @param {?} l
             * @return {?}
             */
            l => l.visible === false && !l.baseLayer)) !== undefined;
            this.hasLayerOutOfRange = layers.find((/**
             * @param {?} l
             * @return {?}
             */
            l => l.isInResolutionsRange === false && !l.baseLayer)) !== undefined;
        }
        else {
            this.hasLayerNotVisible = layers.find((/**
             * @param {?} l
             * @return {?}
             */
            l => l.visible === false)) !== undefined;
            this.hasLayerOutOfRange = layers.find((/**
             * @param {?} l
             * @return {?}
             */
            l => l.isInResolutionsRange === false)) !== undefined;
        }
    }
}
LayerListComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-layer-list',
                template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <mat-list-item *ngIf=\"showToolbar$ | async\">\r\n    <ng-container>\r\n      <mat-form-field class=\"inputFilter\" [floatLabel]=\"floatLabel\">\r\n        <input\r\n          matInput\r\n          [placeholder]=\"placeholder\"\r\n          [matTooltip]=\"'igo.geo.layer.subsetLayersListKeyword' | translate\"\r\n          matTooltipShowDelay=\"500\"\r\n          type=\"text\" [(ngModel)]=\"keyword\">\r\n        <button\r\n          mat-button\r\n          *ngIf=\"keyword\"\r\n          matSuffix\r\n          mat-icon-button\r\n          aria-label=\"Clear\"\r\n          color=\"warn\"\r\n          (click)=\"clearKeyword()\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      <button\r\n        *ngIf=\"!sortedAlpha\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.geo.layer.sortAlphabetically' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"toggleSort(true)\">\r\n        <mat-icon color=\"primary\" svgIcon=\"sort-alphabetical\"></mat-icon>\r\n      </button>\r\n      <button\r\n        *ngIf=\"sortedAlpha\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.geo.layer.sortMapOrder' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"toggleSort(false)\">\r\n        <mat-icon color=\"warn\" svgIcon=\"alert\"></mat-icon>\r\n      </button>\r\n      <button\r\n        mat-icon-button\r\n        [disabled]=\"!hasLayerNotVisible\"\r\n        [matTooltip]=\"onlyVisible ?\r\n        ('igo.geo.layer.resetLayersList' | translate) :\r\n        ('igo.geo.layer.subsetLayersListOnlyVisible' | translate)\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"onlyVisible ? 'warn' : 'primary'\"\r\n        (click)=\"toggleOnlyVisible()\">\r\n        <mat-icon [svgIcon]=\"!onlyVisible ? 'eye' : 'alert'\"></mat-icon>\r\n      </button>\r\n      <button\r\n        mat-icon-button\r\n        [disabled]=\"!hasLayerOutOfRange\"\r\n        [matTooltip]=\"onlyInRange ?\r\n        ('igo.geo.layer.resetLayersList' | translate) :\r\n        ('igo.geo.layer.subsetLayersListOnlyInRange' | translate)\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"onlyInRange ? 'warn' : 'primary'\"\r\n        (click)=\"toggleOnlyInRange()\">\r\n        <mat-icon [svgIcon]=\"!onlyInRange ? 'playlist-check' : 'alert'\"></mat-icon>\r\n      </button>\r\n    </ng-container>\r\n  </mat-list-item>\r\n\r\n  <ng-template ngFor let-layer let-i=\"index\" [ngForOf]=\"layers$ | async\">\r\n    <igo-layer-item *ngIf=\"!(excludeBaseLayers && layer.baseLayer)\"\r\n        igoListItem\r\n        [layer]=\"layer\"\r\n        [orderable]=\"orderable && !layer.baseLayer\"\r\n        [lowerDisabled]=\"getLowerLayer().id === layer.id\"\r\n        [raiseDisabled]=\"getUpperLayer().id === layer.id\"\r\n        [queryBadge]=\"queryBadge\"\r\n        [expandLegendIfVisible]=\"expandLegendOfVisibleLayers\"\r\n        [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\"\r\n        [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\">\r\n\r\n        <ng-container igoLayerItemToolbar\r\n          [ngTemplateOutlet]=\"templateLayerToolbar\"\r\n          [ngTemplateOutletContext]=\"{layer: layer}\">\r\n        </ng-container>\r\n\r\n    </igo-layer-item>\r\n  </ng-template>\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["mat-form-field.inputFilter{width:calc(100% - 100px);max-width:200px}"]
            }] }
];
/** @nocollapse */
LayerListComponent.ctorParameters = () => [
    { type: LayerListService }
];
LayerListComponent.propDecorators = {
    templateLayerToolbar: [{ type: ContentChild, args: ['igoLayerItemToolbar',] }],
    layers: [{ type: Input }],
    placeholder: [{ type: Input }],
    floatLabel: [{ type: Input }],
    layerFilterAndSortOptions: [{ type: Input }],
    excludeBaseLayers: [{ type: Input }],
    toggleLegendOnVisibilityChange: [{ type: Input }],
    expandLegendOfVisibleLayers: [{ type: Input }],
    updateLegendOnResolutionChange: [{ type: Input }],
    queryBadge: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * MapService
 *
 * This service tracks the IgoMap instance, if any.
 * Currently, only one map instance is supported
 * but support for multiple maps may be added in the future.
 * This will impact other services such as the OverlayService
 * because these maps won't be sharing overlayed features.
 */
class MapService {
    constructor() { }
    /**
     * @return {?}
     */
    getMap() {
        return this.map;
    }
    /**
     * @param {?} map
     * @return {?}
     */
    setMap(map$$1) {
        this.map = map$$1;
    }
}
MapService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
MapService.ctorParameters = () => [];
/** @nocollapse */ MapService.ngInjectableDef = defineInjectable({ factory: function MapService_Factory() { return new MapService(); }, token: MapService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LayerListBindingDirective {
    /**
     * @param {?} component
     * @param {?} mapService
     * @param {?} layerListService
     * @param {?} route
     */
    constructor(component, mapService, layerListService, route) {
        this.mapService = mapService;
        this.layerListService = layerListService;
        this.route = route;
        this.component = component;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Override input layers
        this.component.layers = [];
        this.layers$$ = this.mapService
            .getMap()
            .layers$.subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        (layers) => {
            this.component.layers = layers.filter((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => {
                return layer.showInLayerList === true;
            }));
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initRoutes();
    }
    /**
     * @private
     * @return {?}
     */
    initRoutes() {
        if (this.route &&
            (this.route.options.llcKKey || this.route.options.llcAKey ||
                this.route.options.llcVKey || this.route.options.llcVKey)) {
            this.route.queryParams.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            params => {
                /** @type {?} */
                const keywordFromUrl = params[(/** @type {?} */ (this.route.options.llcKKey))];
                /** @type {?} */
                const sortedAplhaFromUrl = params[(/** @type {?} */ (this.route.options.llcAKey))];
                /** @type {?} */
                const onlyVisibleFromUrl = params[(/** @type {?} */ (this.route.options.llcVKey))];
                /** @type {?} */
                const onlyInRangeFromUrl = params[(/** @type {?} */ (this.route.options.llcRKey))];
                if (keywordFromUrl && !this.layerListService.keywordInitialized) {
                    this.layerListService.keyword = keywordFromUrl;
                    this.layerListService.keywordInitialized = true;
                }
                if (sortedAplhaFromUrl && !this.layerListService.sortedAlphaInitialized) {
                    this.layerListService.sortedAlpha = sortedAplhaFromUrl === '1' ? true : false;
                    this.layerListService.sortedAlphaInitialized = true;
                }
                if (onlyVisibleFromUrl &&
                    !this.layerListService.onlyVisibleInitialized &&
                    this.component.hasLayerNotVisible) {
                    this.layerListService.onlyVisible = onlyVisibleFromUrl === '1' ? true : false;
                    this.layerListService.onlyVisibleInitialized = true;
                }
                if (onlyInRangeFromUrl &&
                    !this.layerListService.onlyInRangeInitialized &&
                    this.component.hasLayerOutOfRange) {
                    this.layerListService.onlyInRange = onlyInRangeFromUrl === '1' ? true : false;
                    this.layerListService.onlyInRangeInitialized = true;
                }
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.layers$$.unsubscribe();
    }
}
LayerListBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoLayerListBinding]'
            },] }
];
/** @nocollapse */
LayerListBindingDirective.ctorParameters = () => [
    { type: LayerListComponent, decorators: [{ type: Self }] },
    { type: MapService },
    { type: LayerListService },
    { type: RouteService, decorators: [{ type: Optional }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Strategies or responsible of synchronizing a feature store and a layer.
 * A strategy can be shared among multiple stores. Sharing a strategy
 * is a good idea when multiple strategies would have on cancelling effect
 * on each other.
 *
 * At creation, strategy is inactive and needs to be manually activated.
 */
class FeatureStoreStrategy {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        this.options = options;
        /**
         * Feature store
         * \@internal
         */
        this.stores = [];
        /**
         * Whether this strategy is active
         * \@internal
         */
        this.active = false;
        this.options = options;
    }
    /**
     * Whether this strategy is active
     * @return {?}
     */
    isActive() { return this.active; }
    /**
     * Activate the strategy. If it's already active, it'll be deactivated
     * and activated again.
     * @return {?}
     */
    activate() {
        if (this.active === true) {
            this.doDeactivate();
        }
        this.active = true;
        this.doActivate();
    }
    /**
     * Activate the strategy. If it's already active, it'll be deactivated
     * and activated again.
     * @return {?}
     */
    deactivate() {
        this.active = false;
        this.doDeactivate();
    }
    /**
     * Bind this strategy to a store
     * @param {?} store Feature store
     * @return {?}
     */
    bindStore(store) {
        if (this.stores.indexOf(store) < 0) {
            this.stores.push(store);
        }
    }
    /**
     * Unbind this strategy from store
     * @param {?} store Feature store
     * @return {?}
     */
    unbindStore(store) {
        /** @type {?} */
        const index = this.stores.indexOf(store);
        if (index >= 0) {
            this.stores.splice(index, 1);
        }
    }
    /**
     * Do the stataegy activation
     * \@internal
     * @protected
     * @return {?}
     */
    doActivate() { }
    /**
     * Do the strategy deactivation
     * \@internal
     * @protected
     * @return {?}
     */
    doDeactivate() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This strategy loads a store's features into it's layer counterpart.
 * The store -> layer binding is a one-way binding. That means any entity
 * added to the store will be added to the layer but the opposite is false.
 *
 * Important: This strategy observes filtered entities, not raw entities. This
 * is not configurable yet.
 */
class FeatureStoreLoadingStrategy extends FeatureStoreStrategy {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.options = options;
        /**
         * Subscription to the store's features
         */
        this.stores$$ = new Map();
    }
    /**
     * Bind this strategy to a store and start watching for entities changes
     * @param {?} store Feature store
     * @return {?}
     */
    bindStore(store) {
        super.bindStore(store);
        if (this.isActive() === true) {
            this.watchStore(store);
        }
    }
    /**
     * Unbind this strategy from a store and stop watching for entities changes
     * @param {?} store Feature store
     * @return {?}
     */
    unbindStore(store) {
        super.unbindStore(store);
        if (this.isActive() === true) {
            this.unwatchStore(store);
        }
    }
    /**
     * Start watching all stores already bound to that strategy at once.
     * \@internal
     * @protected
     * @return {?}
     */
    doActivate() {
        this.stores.forEach((/**
         * @param {?} store
         * @return {?}
         */
        (store) => this.watchStore(store)));
    }
    /**
     * Stop watching all stores bound to that strategy
     * \@internal
     * @protected
     * @return {?}
     */
    doDeactivate() {
        this.unwatchAll();
    }
    /**
     * Watch for entities changes in a store.
     * Important: Never observe a store's sorted entities. It makes no sense
     * to display sorted entities (instead of unsorted) on a layer and it
     * would potentially result in a lot of useless computation.
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    watchStore(store) {
        if (this.stores$$.has(store)) {
            return;
        }
        /** @type {?} */
        const subscription = store.view.all$()
            .subscribe((/**
         * @param {?} features
         * @return {?}
         */
        (features) => this.onFeaturesChange(features, store)));
        this.stores$$.set(store, subscription);
    }
    /**
     * Stop watching for entities changes in a store.
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    unwatchStore(store) {
        /** @type {?} */
        const subscription = this.stores$$.get(store);
        if (subscription !== undefined) {
            subscription.unsubscribe();
            this.stores$$.delete(store);
        }
    }
    /**
     * Stop watching for entities changes in all stores.
     * @private
     * @return {?}
     */
    unwatchAll() {
        Array.from(this.stores$$.entries()).forEach((/**
         * @param {?} entries
         * @return {?}
         */
        (entries) => {
            entries[1].unsubscribe();
        }));
        this.stores$$.clear();
    }
    /**
     * Load features into a layer or clear the layer if the array of features is empty.
     * @private
     * @param {?} features Store filtered features
     * @param {?} store Feature store
     * @return {?}
     */
    onFeaturesChange(features, store) {
        if (features.length === 0) {
            store.clearLayer();
        }
        else {
            store.setLayerFeatures(features, this.selectMotion(store), this.options.viewScale, this.options.areaRatio, this.options.getFeatureId);
        }
    }
    /**
     * Selects the best motion
     * @private
     * @param {?} store A FeatureStore to apply the motion
     * @return {?} The motion selected
     */
    selectMotion(store) {
        if (this.options.motion !== undefined) {
            return this.options.motion;
        }
        if (store.pristine === true) {
            // If features have just been loaded into the store, move/zoom on them
            return FeatureMotion.Default;
        }
        else if (store.count > store.view.count) {
            // If features have been filtered, move/zoom on the remaining ones
            return FeatureMotion.Default;
        }
        else {
            // On insert, update or delete, do nothing
            return FeatureMotion.None;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This strategy loads a layer's features into it's store counterpart.
 * The layer -> store binding is a one-way binding. That means any OL feature
 * added to the layer will be added to the store but the opposite is false.
 *
 * Important: In it's current state, this strategy is to meant to be combined
 * with a standard Loading strategy and it would probably cause recursion issues.
 */
class FeatureStoreLoadingLayerStrategy extends FeatureStoreStrategy {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.options = options;
        /**
         * Subscription to the store's OL source changes
         */
        this.stores$$ = new Map();
    }
    /**
     * Bind this strategy to a store and start watching for Ol source changes
     * @param {?} store Feature store
     * @return {?}
     */
    bindStore(store) {
        super.bindStore(store);
        if (this.isActive() === true) {
            this.watchStore(store);
        }
    }
    /**
     * Unbind this strategy from a store and stop watching for Ol source changes
     * @param {?} store Feature store
     * @return {?}
     */
    unbindStore(store) {
        super.unbindStore(store);
        if (this.isActive() === true) {
            this.unwatchStore(store);
        }
    }
    /**
     * Start watching all stores already bound to that strategy at once.
     * \@internal
     * @protected
     * @return {?}
     */
    doActivate() {
        this.stores.forEach((/**
         * @param {?} store
         * @return {?}
         */
        (store) => this.watchStore(store)));
    }
    /**
     * Stop watching all stores bound to that strategy
     * \@internal
     * @protected
     * @return {?}
     */
    doDeactivate() {
        this.unwatchAll();
    }
    /**
     * Watch for a store's  OL source changes
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    watchStore(store) {
        if (this.stores$$.has(store)) {
            return;
        }
        this.onSourceChanges(store);
        /** @type {?} */
        const olSource = store.layer.ol.getSource();
        olSource.on('change', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.onSourceChanges(store);
        }));
    }
    /**
     * Stop watching for a store's OL source changes
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    unwatchStore(store) {
        /** @type {?} */
        const key = this.stores$$.get(store);
        if (key !== undefined) {
            unByKey(key);
            this.stores$$.delete(store);
        }
    }
    /**
     * Stop watching for OL source changes in all stores.
     * @private
     * @return {?}
     */
    unwatchAll() {
        Array.from(this.stores$$.entries()).forEach((/**
         * @param {?} entries
         * @return {?}
         */
        (entries) => {
            unByKey(entries[1]);
        }));
        this.stores$$.clear();
    }
    /**
     * Load features from an OL source into a  store or clear the store if the source is empty
     * @private
     * @param {?} store Feature store
     * @return {?}
     */
    onSourceChanges(store) {
        /** @type {?} */
        const olFeatures = store.layer.ol.getSource().getFeatures();
        if (olFeatures.length === 0) {
            store.clear();
        }
        else {
            store.setStoreOlFeatures(olFeatures);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The class is a specialized version of an EntityStore that stores
 * features and the map layer to display them on. Synchronization
 * between the store and the layer is handled by strategies.
 * @template T
 */
class FeatureStore extends EntityStore {
    /**
     * @param {?} entities
     * @param {?} options
     */
    constructor(entities, options) {
        super(entities, options);
        /**
         * Feature store strategies responsible of synchronizing the store
         * and the layer
         */
        this.strategies = [];
        this.map = options.map;
    }
    /**
     * The layer's data source
     * @return {?}
     */
    get source() {
        return this.layer ? (/** @type {?} */ (this.layer.dataSource)) : undefined;
    }
    /**
     * Bind this store to a vector layer
     * @param {?} layer Vector layer
     * @return {?} Feature store
     */
    bindLayer(layer) {
        this.layer = layer;
        return this;
    }
    /**
     * Add a strategy to this store
     * @param {?} strategy Feature store strategy
     * @param {?=} activate
     * @return {?} Feature store
     */
    addStrategy(strategy, activate = false) {
        /** @type {?} */
        const existingStrategy = this.strategies.find((/**
         * @param {?} _strategy
         * @return {?}
         */
        (_strategy) => {
            return strategy.constructor === _strategy.constructor;
        }));
        if (existingStrategy !== undefined) {
            throw new Error('A strategy of this type already exists on that FeatureStore.');
        }
        this.strategies.push(strategy);
        strategy.bindStore(this);
        if (activate === true) {
            strategy.activate();
        }
        return this;
    }
    /**
     * Remove a strategy from this store
     * @param {?} strategy Feature store strategy
     * @return {?} Feature store
     */
    removeStrategy(strategy) {
        /** @type {?} */
        const index = this.strategies.indexOf(strategy);
        if (index >= 0) {
            this.strategies.splice(index, 1);
            strategy.unbindStore(this);
        }
        return this;
    }
    /**
     * Return strategies of a given type
     * @param {?} type Feature store strategy class
     * @return {?} Strategies
     */
    getStrategyOfType(type) {
        return this.strategies.find((/**
         * @param {?} strategy
         * @return {?}
         */
        (strategy) => {
            return strategy instanceof type;
        }));
    }
    /**
     * Activate strategies of a given type
     * @param {?} type Feature store strategy class
     * @return {?}
     */
    activateStrategyOfType(type) {
        /** @type {?} */
        const strategy = this.getStrategyOfType(type);
        if (strategy !== undefined) {
            strategy.activate();
        }
    }
    /**
     * Deactivate strategies of a given type
     * @param {?} type Feature store strategy class
     * @return {?}
     */
    deactivateStrategyOfType(type) {
        /** @type {?} */
        const strategy = this.getStrategyOfType(type);
        if (strategy !== undefined) {
            strategy.deactivate();
        }
    }
    /**
     * Set the layer's features and perform a motion to make them visible. Strategies
     * make extensive use of that method.
     * @param {?} features Features
     * @param {?=} motion Optional: The type of motion to perform
     * @param {?=} viewScale
     * @param {?=} areaRatio
     * @param {?=} getId
     * @return {?}
     */
    setLayerFeatures(features, motion = FeatureMotion.Default, viewScale, areaRatio, getId) {
        getId = getId ? getId : getEntityId;
        this.checkLayer();
        /** @type {?} */
        const olFeatures = features
            .map((/**
         * @param {?} feature
         * @return {?}
         */
        (feature) => featureToOl(feature, this.map.projection, getId)));
        this.setLayerOlFeatures(olFeatures, motion, viewScale, areaRatio);
    }
    /**
     * Set the store's features from an array of OL features.
     * @param {?} olFeatures Ol features
     * @return {?}
     */
    setStoreOlFeatures(olFeatures) {
        this.checkLayer();
        /** @type {?} */
        const features = olFeatures.map((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature$$1) => {
            olFeature$$1.set('_featureStore', this, true);
            return featureFromOl(olFeature$$1, this.layer.map.projection);
        }));
        this.load((/** @type {?} */ (features)));
    }
    /**
     * Remove all features from the layer
     * @return {?}
     */
    clearLayer() {
        this.checkLayer();
        this.source.ol.clear();
    }
    /**
     * Check wether a layer is bound or not and throw an error if not.
     * @private
     * @return {?}
     */
    checkLayer() {
        if (this.layer === undefined) {
            throw new Error('This FeatureStore is not bound to a layer.');
        }
    }
    /**
     * Set the layer's features and perform a motion to make them visible.
     * @private
     * @param {?} olFeatures
     * @param {?=} motion Optional: The type of motion to perform
     * @param {?=} viewScale
     * @param {?=} areaRatio
     * @return {?}
     */
    setLayerOlFeatures(olFeatures, motion = FeatureMotion.Default, viewScale, areaRatio) {
        /** @type {?} */
        const olFeaturesMap = new Map();
        olFeatures.forEach((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature$$1) => {
            olFeaturesMap.set(olFeature$$1.getId(), olFeature$$1);
        }));
        /** @type {?} */
        const olFeaturesToRemove = [];
        this.source.ol.forEachFeature((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature$$1) => {
            /** @type {?} */
            const newOlFeature = olFeaturesMap.get(olFeature$$1.getId());
            if (newOlFeature === undefined) {
                olFeaturesToRemove.push(olFeature$$1);
            }
            else if (newOlFeature.get('_entityRevision') !== olFeature$$1.get('_entityRevision')) {
                olFeaturesToRemove.push(olFeature$$1);
            }
            else {
                olFeaturesMap.delete(newOlFeature.getId());
            }
        }));
        /** @type {?} */
        const olFeaturesToAddIds = Array.from(olFeaturesMap.keys());
        /** @type {?} */
        const olFeaturesToAdd = olFeatures.filter((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature$$1) => {
            return olFeaturesToAddIds.indexOf(olFeature$$1.getId()) >= 0;
        }));
        if (olFeaturesToRemove.length > 0) {
            this.removeOlFeaturesFromLayer(olFeaturesToRemove);
        }
        if (olFeaturesToAdd.length > 0) {
            this.addOlFeaturesToLayer(olFeaturesToAdd);
        }
        if (olFeaturesToAdd.length > 0) {
            // If features are added, do a motion toward the newly added features
            moveToOlFeatures(this.map, olFeaturesToAdd, motion, viewScale, areaRatio);
        }
        else if (olFeatures.length > 0) {
            // Else, do a motion toward all the features
            moveToOlFeatures(this.map, olFeatures, motion, viewScale, areaRatio);
        }
    }
    /**
     * Add features to the the layer
     * @private
     * @param {?} olFeatures
     * @return {?}
     */
    addOlFeaturesToLayer(olFeatures) {
        olFeatures.forEach((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature$$1) => {
            olFeature$$1.set('_featureStore', this, true);
        }));
        this.source.ol.addFeatures(olFeatures);
    }
    /**
     * Remove features from the the layer
     * @private
     * @param {?} olFeatures
     * @return {?}
     */
    removeOlFeaturesFromLayer(olFeatures) {
        olFeatures.forEach((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature$$1) => {
            this.source.ol.removeFeature(olFeature$$1);
        }));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OlDragSelectInteraction extends OlDragBoxInteraction {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
    }
}
/**
 * This strategy synchronizes a store and a layer selected entities.
 * The store <-> layer binding is a two-way binding.
 *
 * In many cases, a single strategy bound to multiple stores
 * will yield better results that multiple strategies with each their
 * own store. In the latter scenario, a click on overlapping features
 * would trigger the strategy of each layer and they would cancel
 * each other as well as move the map view around needlessly.
 */
class FeatureStoreSelectionStrategy extends FeatureStoreStrategy {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.options = options;
        this.overlayStore = this.createOverlayStore();
    }
    /**
     * The map the layers belong to
     * @return {?}
     */
    get map() { return this.options.map; }
    /**
     * Bind this strategy to a store and force this strategy's
     * reactivation to properly setup watchers.
     * @param {?} store Feature store
     * @return {?}
     */
    bindStore(store) {
        super.bindStore(store);
        if (this.isActive() === true) {
            // Force reactivation
            this.activate();
        }
    }
    /**
     * Unbind this strategy from a store and force this strategy's
     * reactivation to properly setup watchers.
     * @param {?} store Feature store
     * @return {?}
     */
    unbindStore(store) {
        super.unbindStore(store);
        if (this.isActive() === true) {
            // Force reactivation
            this.activate();
        }
    }
    /**
     * Unselect all entities, from all stores
     * @return {?}
     */
    unselectAll() {
        this.stores.forEach((/**
         * @param {?} store
         * @return {?}
         */
        (store) => {
            store.state.updateAll({ selected: false });
        }));
    }
    /**
     * @return {?}
     */
    clear() {
        this.overlayStore.source.ol.clear();
        this.overlayStore.clear();
    }
    /**
     * Add the overlay layer, setup the map click lsitener and
     * start watching for stores selection
     * \@internal
     * @protected
     * @return {?}
     */
    doActivate() {
        this.addOverlayLayer();
        this.listenToMapClick();
        if (this.options.dragBox === true) {
            this.addDragBoxInteraction();
        }
        this.watchAll();
    }
    /**
     * Remove the overlay layer, remove the map click lsitener and
     * stop watching for stores selection
     * \@internal
     * @protected
     * @return {?}
     */
    doDeactivate() {
        this.unlistenToMapClick();
        this.removeDragBoxInteraction();
        this.unwatchAll();
        this.removeOverlayLayer();
    }
    /**
     * Create a single observable of all the stores. With a single observable,
     * features can be added all at once to the overlay layer and a single
     * motion can be performed. Multiple observable would have
     * a cancelling effect on each other.
     * @private
     * @return {?}
     */
    watchAll() {
        this.unwatchAll();
        /** @type {?} */
        const stores$ = this.stores.map((/**
         * @param {?} store
         * @return {?}
         */
        (store) => {
            return store.stateView.manyBy$((/**
             * @param {?} record
             * @return {?}
             */
            (record) => {
                return record.state.selected === true;
            })).pipe(map((/**
             * @param {?} records
             * @return {?}
             */
            (records) => records.map((/**
             * @param {?} record
             * @return {?}
             */
            record => record.entity)))));
        }));
        this.stores$$ = combineLatest(...stores$)
            .pipe(debounceTime(25), skip(1), // Skip intial selection
        map((/**
         * @param {?} features
         * @return {?}
         */
        (features) => features.reduce((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a.concat(b)))))).subscribe((/**
         * @param {?} features
         * @return {?}
         */
        (features) => this.onSelectFromStore(features)));
    }
    /**
     * Stop watching for selection in all stores.
     * @private
     * @return {?}
     */
    unwatchAll() {
        if (this.stores$$ !== undefined) {
            this.stores$$.unsubscribe();
        }
    }
    /**
     * Add a 'singleclick' listener to the map that'll allow selecting
     * features by clicking on the map. The selection will be performed
     * only on the layers bound to this strategy.
     * @private
     * @return {?}
     */
    listenToMapClick() {
        this.mapClickListener = this.map.ol.on('singleclick', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.onMapClick(event);
        }));
    }
    /**
     * Remove the map click listener
     * @private
     * @return {?}
     */
    unlistenToMapClick() {
        if (this.mapClickListener !== undefined) {
            this.map.ol.un(this.mapClickListener.type, this.mapClickListener.listener);
        }
    }
    /**
     * On map click, select feature at pixel
     * @private
     * @param {?} event OL MapBrowserPointerEvent
     * @return {?}
     */
    onMapClick(event) {
        /** @type {?} */
        const exclusive = !ctrlKeyDown(event);
        /** @type {?} */
        const reverse = !exclusive;
        /** @type {?} */
        const olFeatures = event.map.getFeaturesAtPixel(event.pixel, {
            hitTolerance: this.options.hitTolerance || 0,
            layerFilter: (/**
             * @param {?} olLayer
             * @return {?}
             */
            (olLayer) => {
                /** @type {?} */
                const storeOlLayer = this.stores.find((/**
                 * @param {?} store
                 * @return {?}
                 */
                (store) => {
                    return store.layer.ol === olLayer;
                }));
                return storeOlLayer !== undefined;
            })
        });
        this.onSelectFromMap(olFeatures, exclusive, reverse);
    }
    /**
     * Add a drag box interaction and, on drag box end, select features
     * @private
     * @return {?}
     */
    addDragBoxInteraction() {
        /** @type {?} */
        let olDragSelectInteraction;
        /** @type {?} */
        const olInteractions = this.map.ol.getInteractions().getArray();
        // There can only be one dragbox interaction, so find the current one, if any
        // Don't keep a reference to the current dragbox because we don't want
        // to remove it when this startegy is deactivated
        for (const olInteraction of olInteractions) {
            if (olInteraction instanceof OlDragSelectInteraction) {
                olDragSelectInteraction = olInteraction;
                break;
            }
        }
        // If no drag box interaction is found, create a new one and add it to the map
        if (olDragSelectInteraction === undefined) {
            olDragSelectInteraction = new OlDragSelectInteraction({
                condition: ctrlKeyDown
            });
            this.map.ol.addInteraction(olDragSelectInteraction);
            this.olDragSelectInteraction = olDragSelectInteraction;
        }
        this.olDragSelectInteractionEndKey = olDragSelectInteraction.on('boxend', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onDragBoxEnd(event)));
    }
    /**
     * Remove drag box interaction
     * @private
     * @return {?}
     */
    removeDragBoxInteraction() {
        if (this.olDragSelectInteractionEndKey !== undefined) {
            unByKey(this.olDragSelectInteractionEndKey);
        }
        if (this.olDragSelectInteraction !== undefined) {
            this.map.ol.removeInteraction(this.olDragSelectInteraction);
        }
        this.olDragSelectInteraction = undefined;
    }
    /**
     * On dragbox end, select features in drag box
     * @private
     * @param {?} event OL MapBrowserPointerEvent
     * @return {?}
     */
    onDragBoxEnd(event) {
        /** @type {?} */
        const exclusive = !ctrlKeyDown(event.mapBrowserEvent);
        /** @type {?} */
        const extent = event.target.getGeometry().getExtent();
        /** @type {?} */
        const olFeatures = this.stores.reduce((/**
         * @param {?} acc
         * @param {?} store
         * @return {?}
         */
        (acc, store) => {
            /** @type {?} */
            const olSource = store.layer.ol.getSource();
            acc.push(...olSource.getFeaturesInExtent(extent));
            return acc;
        }), []);
        this.onSelectFromMap(olFeatures, exclusive, false);
    }
    /**
     * When features are selected from the store, add
     * them to this startegy's overlay layer (select on map)
     * @private
     * @param {?} features Store features
     * @return {?}
     */
    onSelectFromStore(features) {
        /** @type {?} */
        const motion = this.options ? this.options.motion : undefined;
        /** @type {?} */
        const olOverlayFeatures = this.overlayStore.layer.ol.getSource().getFeatures();
        /** @type {?} */
        const overlayFeaturesKeys = olOverlayFeatures.map((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature$$1) => olFeature$$1.getId()));
        /** @type {?} */
        const featuresKeys = features.map(this.overlayStore.getKey);
        /** @type {?} */
        const doMotion = overlayFeaturesKeys.length !== featuresKeys.length ||
            !overlayFeaturesKeys.every((/**
             * @param {?} key
             * @return {?}
             */
            (key) => featuresKeys.indexOf(key) >= 0));
        this.overlayStore.setLayerFeatures(features, doMotion ? motion : FeatureMotion.None, this.options.viewScale, this.options.areaRatio, this.options.getFeatureId);
    }
    /**
     * When features are selected from the map, also select them
     * in their store.
     * @private
     * @param {?} olFeatures OL feature objects
     * @param {?} exclusive
     * @param {?} reverse
     * @return {?}
     */
    onSelectFromMap(olFeatures, exclusive, reverse) {
        /** @type {?} */
        const groupedFeatures = this.groupFeaturesByStore(olFeatures);
        this.stores.forEach((/**
         * @param {?} store
         * @return {?}
         */
        (store) => {
            /** @type {?} */
            const features = groupedFeatures.get(store);
            if (features === undefined && exclusive === true) {
                this.unselectAllFeaturesFromStore(store);
            }
            else if (features === undefined && exclusive === false) ;
            else {
                this.selectFeaturesFromStore(store, features, exclusive, reverse);
            }
        }));
    }
    /**
     * Select features in store
     * @private
     * @param {?} store
     * @param {?} features Features
     * @param {?} exclusive
     * @param {?} reverse
     * @return {?}
     */
    selectFeaturesFromStore(store, features, exclusive, reverse) {
        if (reverse === true) {
            store.state.reverseMany(features, ['selected']);
        }
        else {
            store.state.updateMany(features, { selected: true }, exclusive);
        }
    }
    /**
     * Unselect all features from store
     * @private
     * @param {?} store
     * @return {?}
     */
    unselectAllFeaturesFromStore(store) {
        store.state.updateAll({ selected: false });
    }
    /**
     * This method returns a store -> features mapping from a list
     * of OL selected features. OL features keep a reference to the store
     * they are from.
     * @private
     * @param {?} olFeatures
     * @return {?} Store -> features mapping
     */
    groupFeaturesByStore(olFeatures) {
        /** @type {?} */
        const groupedFeatures = new Map();
        if (olFeatures === null || olFeatures === undefined) {
            return groupedFeatures;
        }
        olFeatures.forEach((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature$$1) => {
            /** @type {?} */
            const store = olFeature$$1.get('_featureStore');
            if (store === undefined) {
                return;
            }
            /** @type {?} */
            let features = groupedFeatures.get(store);
            if (features === undefined) {
                features = [];
                groupedFeatures.set(store, features);
            }
            /** @type {?} */
            const feature = store.get(olFeature$$1.getId());
            if (feature !== undefined) {
                features.push(feature);
            }
        }));
        return groupedFeatures;
    }
    /**
     * Create an overlay store that'll contain the selected features.
     * @private
     * @return {?} Overlay store
     */
    createOverlayStore() {
        /** @type {?} */
        const overlayLayer = this.options.layer
            ? this.options.layer
            : this.createOverlayLayer();
        return new FeatureStore([], { map: this.map }).bindLayer(overlayLayer);
    }
    /**
     * Create an overlay store that'll contain the selected features.
     * @private
     * @return {?} Overlay layer
     */
    createOverlayLayer() {
        return new VectorLayer({
            zIndex: 300,
            source: new FeatureDataSource(),
            style: undefined,
            showInLayerList: false,
            exportable: false,
            browsable: false
        });
    }
    /**
     * Add the overlay store's layer to the map to display the selected
     * features.
     * @private
     * @return {?}
     */
    addOverlayLayer() {
        if (this.overlayStore.layer.map === undefined) {
            this.map.addLayer(this.overlayStore.layer);
        }
    }
    /**
     * Remove the overlay layer from the map
     * @private
     * @return {?}
     */
    removeOverlayLayer() {
        this.overlayStore.source.ol.clear();
        this.map.removeLayer(this.overlayStore.layer);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Create an Openlayers feature object out of a feature definition.
 * The output object has a reference to the feature id.
 * @param {?} feature Feature definition
 * @param {?} projectionOut Feature object projection
 * @param {?=} getId
 * @return {?} OpenLayers feature object
 */
function featureToOl(feature, projectionOut, getId) {
    getId = getId ? getId : getEntityId;
    /** @type {?} */
    const olFormat = new OlGeoJSON();
    /** @type {?} */
    const olFeature$$1 = olFormat.readFeature(feature, {
        dataProjection: feature.projection,
        featureProjection: projectionOut
    });
    olFeature$$1.setId(getId(feature));
    /** @type {?} */
    const title = getEntityTitle(feature);
    if (title !== undefined) {
        olFeature$$1.set('_title', title, true);
    }
    if (feature.extent !== undefined) {
        olFeature$$1.set('_extent', feature.extent, true);
    }
    if (feature.projection !== undefined) {
        olFeature$$1.set('_projection', feature.projection, true);
    }
    if (feature.extent !== undefined) {
        olFeature$$1.set('_extent', feature.extent, true);
    }
    /** @type {?} */
    const mapTitle = getEntityProperty(feature, 'meta.mapTitle');
    if (mapTitle !== undefined) {
        olFeature$$1.set('_mapTitle', mapTitle, true);
    }
    olFeature$$1.set('_entityRevision', getEntityRevision(feature), true);
    return olFeature$$1;
}
/**
 * Create a feature object out of an OL feature
 * The output object has a reference to the feature id.
 * @param {?} olFeature OL Feature
 * @param {?} projectionIn OL feature projection
 * @param {?=} olLayer OL Layer
 * @param {?=} projectionOut Feature projection
 * @return {?} Feature
 */
function featureFromOl(olFeature$$1, projectionIn, olLayer, projectionOut = 'EPSG:4326') {
    /** @type {?} */
    let title;
    /** @type {?} */
    const olFormat = new OlGeoJSON();
    /** @type {?} */
    const keys = olFeature$$1.getKeys().filter((/**
     * @param {?} key
     * @return {?}
     */
    (key) => {
        return !key.startsWith('_') && key !== 'geometry';
    }));
    /** @type {?} */
    const properties = keys.reduce((/**
     * @param {?} acc
     * @param {?} key
     * @return {?}
     */
    (acc, key) => {
        acc[key] = olFeature$$1.get(key);
        return acc;
    }), {});
    /** @type {?} */
    const geometry = olFormat.writeGeometryObject(olFeature$$1.getGeometry(), {
        dataProjection: projectionOut,
        featureProjection: projectionIn
    });
    if (olLayer) {
        title = olLayer.get('title');
    }
    else {
        title = olFeature$$1.get('_title');
    }
    /** @type {?} */
    const mapTitle = olFeature$$1.get('_mapTitle');
    /** @type {?} */
    const id = olFeature$$1.getId();
    return {
        type: FEATURE,
        projection: projectionOut,
        extent: olFeature$$1.get('_extent'),
        meta: {
            id,
            title: title ? title : (mapTitle ? mapTitle : id),
            mapTitle,
            revision: olFeature$$1.getRevision()
        },
        properties,
        geometry
    };
}
/**
 * Compute an OL feature extent in it's map projection
 * @param {?} map Map
 * @param {?} olFeature OL feature
 * @return {?} Extent in the map projection
 */
function computeOlFeatureExtent(map$$1, olFeature$$1) {
    /** @type {?} */
    let olExtent = createEmpty();
    /** @type {?} */
    const olFeatureExtent = olFeature$$1.get('_extent');
    /** @type {?} */
    const olFeatureProjection = olFeature$$1.get('_projection');
    if (olFeatureExtent !== undefined && olFeatureProjection !== undefined) {
        olExtent = transformExtent(olFeatureExtent, olFeatureProjection, map$$1.projection);
    }
    else {
        /** @type {?} */
        const olGeometry = olFeature$$1.getGeometry();
        if (olGeometry !== null) {
            olExtent = olGeometry.getExtent();
        }
    }
    return olExtent;
}
/**
 * Compute a multiple OL features extent in their map projection
 * @param {?} map Map
 * @param {?} olFeatures OL features
 * @return {?} Extent in the map projection
 */
function computeOlFeaturesExtent(map$$1, olFeatures) {
    /** @type {?} */
    const extent = createEmpty();
    olFeatures.forEach((/**
     * @param {?} olFeature
     * @return {?}
     */
    (olFeature$$1) => {
        /** @type {?} */
        const featureExtent = computeOlFeatureExtent(map$$1, olFeature$$1);
        extend(extent, featureExtent);
    }));
    return extent;
}
/**
 * Scale an extent.
 * @param {?} extent Extent
 * @param {?} scale
 * @return {?} Scaled extent
 */
function scaleExtent(extent, scale) {
    const [width, height] = getSize(extent);
    return [
        scale[3] ? extent[0] - width * scale[3] : extent[0],
        scale[2] ? extent[1] - height * scale[2] : extent[1],
        scale[1] ? extent[2] + width * scale[1] : extent[2],
        scale[0] ? extent[3] + height * scale[0] : extent[3]
    ];
}
/**
 * Return true if features are out of view.
 * If features are too close to the edge, they are considered out of view.
 * We define the edge as 5% of the extent size.
 * @param {?} map Map
 * @param {?} featuresExtent The features's extent
 * @return {?} Return true if features are out of view
 */
function featuresAreOutOfView(map$$1, featuresExtent) {
    /** @type {?} */
    const mapExtent = map$$1.getExtent();
    /** @type {?} */
    const edgeRatio = 0.05;
    /** @type {?} */
    const scale = [-1, -1, -1, -1].map((/**
     * @param {?} x
     * @return {?}
     */
    x => x * edgeRatio));
    /** @type {?} */
    const viewExtent = scaleExtent(mapExtent, (/** @type {?} */ (scale)));
    return !containsExtent(viewExtent, featuresExtent);
}
/**
 * Return true if features are too deep into the view. This results
 * in features being too small.
 * Features are considered too small if their extent occupies less than
 * 1% of the map extent.
 * @param {?} map Map
 * @param {?} featuresExtent The features's extent
 * @param {?=} areaRatio The features extent to view extent acceptable ratio
 * @return {?} Return true if features are too deep in the view
 */
function featuresAreTooDeepInView(map$$1, featuresExtent, areaRatio) {
    // An area ratio of 0.004 means that the feature extent's width and height
    // should be about 1/16 of the map extent's width and height
    areaRatio = areaRatio ? areaRatio : 0.004;
    /** @type {?} */
    const mapExtent = map$$1.getExtent();
    /** @type {?} */
    const mapExtentArea = getArea(mapExtent);
    /** @type {?} */
    const featuresExtentArea = getArea(featuresExtent);
    return featuresExtentArea / mapExtentArea < areaRatio;
}
/**
 * Fit view to include the features extent.
 * By default, this method will let the features occupy about 50% of the viewport.
 * @param {?} map Map
 * @param {?} olFeatures OL features
 * @param {?=} motion To motion to the new map view
 * @param {?=} scale If this is defined, the original view will be scaled
 *  by that factor before any logic is applied.
 * @param {?=} areaRatio
 * @return {?}
 */
function moveToOlFeatures(map$$1, olFeatures, motion = FeatureMotion.Default, scale, areaRatio) {
    /** @type {?} */
    const featuresExtent = computeOlFeaturesExtent(map$$1, olFeatures);
    /** @type {?} */
    let viewExtent = featuresExtent;
    if (scale !== undefined) {
        viewExtent = scaleExtent(viewExtent, scale);
    }
    if (motion === FeatureMotion.Zoom) {
        map$$1.viewController.zoomToExtent(viewExtent);
    }
    else if (motion === FeatureMotion.Move) {
        map$$1.viewController.moveToExtent(viewExtent);
    }
    else if (motion === FeatureMotion.Default) {
        if (featuresAreOutOfView(map$$1, featuresExtent) ||
            featuresAreTooDeepInView(map$$1, featuresExtent, areaRatio)) {
            map$$1.viewController.zoomToExtent(viewExtent);
        }
    }
}
/**
 * Hide an OL feature
 * @param {?} olFeature OL feature
 * @return {?}
 */
function hideOlFeature(olFeature$$1) {
    olFeature$$1.setStyle(new Style({}));
}
/**
 * Try to bind a layer to a store if none is bound already.
 * The layer will also be added to the store's map.
 * If no layer is given to that function, a basic one will be created.
 * @param {?} store The store to bind the layer
 * @param {?=} layer An optional VectorLayer
 * @return {?}
 */
function tryBindStoreLayer(store, layer) {
    if (store.layer !== undefined) {
        if (store.layer.map === undefined) {
            store.map.addLayer(store.layer);
        }
        return;
    }
    layer = layer ? layer : new VectorLayer({
        source: new FeatureDataSource()
    });
    store.bindLayer(layer);
    if (store.layer.map === undefined) {
        store.map.addLayer(store.layer);
    }
}
/**
 * Try to add a loading strategy to a store and activate it.
 * If no strategy is given to that function, a basic one will be created.
 * @param {?} store The store to bind the loading strategy
 * @param {?=} strategy An optional loading strategy
 * @return {?}
 */
function tryAddLoadingStrategy(store, strategy) {
    if (store.getStrategyOfType(FeatureStoreLoadingStrategy) !== undefined) {
        store.activateStrategyOfType(FeatureStoreLoadingStrategy);
        return;
    }
    strategy = strategy ? strategy : new FeatureStoreLoadingStrategy({});
    store.addStrategy(strategy);
    strategy.activate();
}
/**
 * Try to add a selection strategy to a store and activate it.
 * If no strategy is given to that function, a basic one will be created.
 * @param {?} store The store to bind the selection strategy
 * @param {?=} strategy
 * @return {?}
 */
function tryAddSelectionStrategy(store, strategy) {
    if (store.getStrategyOfType(FeatureStoreSelectionStrategy) !== undefined) {
        store.activateStrategyOfType(FeatureStoreSelectionStrategy);
        return;
    }
    strategy = strategy ? strategy : new FeatureStoreSelectionStrategy({
        map: store.map
    });
    store.addStrategy(strategy);
    strategy.activate();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Create an overlay layer and it's source
 * @return {?} Overlay layer
 */
function createOverlayLayer() {
    /** @type {?} */
    const overlayDataSource = new FeatureDataSource();
    return new VectorLayer({
        title: 'Overlay',
        zIndex: 300,
        source: overlayDataSource,
        style: createOverlayLayerStyle()
    });
}
/**
 * Create an overlay style with markers for points and a basic stroke/fill
 * combination for lines and polygons
 * @return {?} Style function
 */
function createOverlayLayerStyle() {
    /** @type {?} */
    const defaultStyle = createOverlayDefaultStyle();
    /** @type {?} */
    const markerStyle = createOverlayMarkerStyle();
    /** @type {?} */
    let style$$1;
    return (/**
     * @param {?} olFeature
     * @return {?}
     */
    (olFeature$$1) => {
        if (olFeature$$1.getId() === 'bufferFeature') {
            style$$1 = createBufferStyle(olFeature$$1.get('bufferStroke'), 2, olFeature$$1.get('bufferFill'), olFeature$$1.get('bufferText'));
            return style$$1;
        }
        else {
            /** @type {?} */
            const geometryType = olFeature$$1.getGeometry().getType();
            style$$1 = geometryType === 'Point' ? markerStyle : defaultStyle;
            style$$1.getText().setText(olFeature$$1.get('_mapTitle'));
            return style$$1;
        }
    });
}
/**
 * Create a basic style for lines and polygons
 * @return {?} Style
 */
function createOverlayDefaultStyle() {
    /** @type {?} */
    const stroke = new Stroke({
        width: 2,
        color: [0, 161, 222, 1]
    });
    /** @type {?} */
    const fill = new Stroke({
        color: [0, 161, 222, 0.15]
    });
    return new Style({
        stroke,
        fill,
        image: new Circle({
            radius: 5,
            stroke,
            fill
        }),
        text: new Text({
            font: '12px Calibri,sans-serif',
            fill: new Fill({ color: '#000' }),
            stroke: new Stroke({ color: '#fff', width: 3 }),
            overflow: true
        })
    });
}
/**
 * Create a marker style for points
 * @param {?=} color
 * @return {?} Style
 */
function createOverlayMarkerStyle(color = 'blue') {
    /** @type {?} */
    let iconColor;
    switch (color) {
        case 'blue':
        case 'red':
        case 'yellow':
        case 'green':
            iconColor = color;
            break;
        default:
            iconColor = 'blue';
            break;
    }
    return new Style({
        image: new Icon({
            src: './assets/igo2/geo/icons/place_' + iconColor + '_36px.svg',
            imgSize: [36, 36],
            // for ie
            anchor: [0.5, 1]
        }),
        text: new Text({
            font: '12px Calibri,sans-serif',
            fill: new Fill({ color: '#000' }),
            stroke: new Stroke({ color: '#fff', width: 3 }),
            overflow: true
        })
    });
}
/**
 * @param {?=} strokeRGBA
 * @param {?=} strokeWidth
 * @param {?=} fillRGBA
 * @param {?=} bufferRadius
 * @return {?}
 */
function createBufferStyle(strokeRGBA = [0, 161, 222, 1], strokeWidth = 2, fillRGBA = [0, 161, 222, 0.15], bufferRadius) {
    /** @type {?} */
    const stroke = new Stroke({
        width: strokeWidth,
        color: strokeRGBA
    });
    /** @type {?} */
    const fill = new Stroke({
        color: fillRGBA
    });
    return new Style({
        stroke,
        fill,
        image: new Circle({
            radius: 5,
            stroke,
            fill
        }),
        text: new Text({
            font: '12px Calibri,sans-serif',
            text: bufferRadius,
            fill: new Fill({ color: '#000' }),
            stroke: new Stroke({ color: '#fff', width: 3 }),
            overflow: true
        })
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class is simply a shortcut for adding features to a map.
 * It does nothing more than a standard layer but it's shipped with
 * a defautl style based on the geometry type of the features it contains.
 * \@todo Enhance that by using a FeatureStore and strategies.
 */
class Overlay {
    /**
     * Overlay layer's data source
     * @return {?}
     */
    get dataSource() {
        return (/** @type {?} */ (this.layer.dataSource));
    }
    /**
     * @param {?=} map
     */
    constructor(map$$1) {
        this.layer = createOverlayLayer();
        this.setMap(map$$1);
    }
    /**
     * Bind this to a map and add the overlay layer to that map
     * @param {?} map Map
     * @return {?}
     */
    setMap(map$$1) {
        if (map$$1 === undefined) {
            if (this.map !== undefined) {
                this.map.ol.removeLayer(this.layer.ol);
            }
        }
        else {
            map$$1.ol.addLayer(this.layer.ol);
        }
        this.map = map$$1;
    }
    /**
     * Set the overlay features and, optionally, move to them
     * @param {?} features Features
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    setFeatures(features, motion = FeatureMotion.Default) {
        this.clear();
        this.addFeatures(features, motion);
    }
    /**
     * Add a feature to the  overlay and, optionally, move to it
     * @param {?} feature Feature
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    addFeature(feature, motion = FeatureMotion.Default) {
        this.addFeatures([feature], motion);
    }
    /**
     * Add features to the  overlay and, optionally, move to them
     * @param {?} features Features
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    addFeatures(features, motion = FeatureMotion.Default) {
        /** @type {?} */
        const olFeatures = [];
        features.forEach((/**
         * @param {?} feature
         * @return {?}
         */
        (feature) => {
            /** @type {?} */
            const olFeature$$1 = featureToOl(feature, this.map.projection);
            /** @type {?} */
            const olGeometry = olFeature$$1.getGeometry();
            if (olGeometry === null) {
                return;
            }
            olFeatures.push(olFeature$$1);
        }));
        this.addOlFeatures(olFeatures, motion);
    }
    /**
     * Add a OpenLayers feature to the  overlay and, optionally, move to it
     * @param {?} olFeature OpenLayers Feature
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    addOlFeature(olFeature$$1, motion = FeatureMotion.Default) {
        this.addOlFeatures([olFeature$$1], motion);
    }
    /**
     * Add OpenLayers features to the overlay and, optionally, move to them
     * @param {?} olFeatures OpenLayers Features
     * @param {?=} motion Optional: Apply this motion to the map view
     * @return {?}
     */
    addOlFeatures(olFeatures, motion = FeatureMotion.Default) {
        this.dataSource.ol.addFeatures(olFeatures);
        moveToOlFeatures(this.map, olFeatures, motion);
    }
    /**
     * Clear the overlay
     * @return {?}
     */
    clear() {
        this.dataSource.ol.clear();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LayerWatcher extends Watcher {
    constructor() {
        super();
        this.loaded = 0;
        this.loading = 0;
        this.layers = [];
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    watch() { }
    /**
     * @return {?}
     */
    unwatch() {
        this.layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        layer => this.unwatchLayer(layer)), this);
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    watchLayer(layer) {
        if (layer.status$ === undefined) {
            return;
        }
        this.layers.push(layer);
        /** @type {?} */
        const layer$$ = layer.status$
            .pipe(distinctUntilChanged())
            .subscribe((/**
         * @param {?} status
         * @return {?}
         */
        status => {
            if (status === SubjectStatus.Working) {
                this.loading += 1;
            }
            else if (status === SubjectStatus.Done) {
                this.loaded += 1;
            }
            if (this.loaded >= this.loading) {
                this.loading = this.loaded = 0;
                this.status = SubjectStatus.Done;
            }
            else if (this.loading > 0) {
                this.status = SubjectStatus.Working;
            }
        }));
        this.subscriptions.push(layer$$);
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    unwatchLayer(layer) {
        /** @type {?} */
        const index = this.layers.indexOf(layer);
        if (index >= 0) {
            /** @type {?} */
            const status = ((/** @type {?} */ (layer))).watcher.status;
            if ([SubjectStatus.Working, SubjectStatus.Waiting].indexOf(status) !== -1) {
                this.loaded += 1;
            }
            this.subscriptions[index].unsubscribe();
            this.subscriptions.splice(index, 1);
            this.layers.splice(index, 1);
            ((/** @type {?} */ (layer))).watcher.unwatch();
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const MapViewAction = {
    Move: 0,
    Zoom: 1,
};
MapViewAction[MapViewAction.Move] = 'Move';
MapViewAction[MapViewAction.Zoom] = 'Zoom';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This method extracts a coordinate tuple from a string.
 * @param {?} str Any string
 * @param {?} mapProjection string Map Projection
 * @return {?} object:
 *             lonLat: Coordinate,
 *             message: Message of error,
 *             radius: radius of the confience of coordinate,
 *             conf: confidence of the coordinate}
 */
function stringToLonLat(str, mapProjection) {
    /** @type {?} */
    let lonLat;
    /** @type {?} */
    let coordStr;
    /** @type {?} */
    let negativeLon;
    /** @type {?} */
    let degreesLon;
    /** @type {?} */
    let minutesLon;
    /** @type {?} */
    let secondsLon;
    /** @type {?} */
    let directionLon;
    /** @type {?} */
    let decimalLon;
    /** @type {?} */
    let negativeLat;
    /** @type {?} */
    let degreesLat;
    /** @type {?} */
    let minutesLat;
    /** @type {?} */
    let secondsLat;
    /** @type {?} */
    let directionLat;
    /** @type {?} */
    let decimalLat;
    /** @type {?} */
    let pattern;
    /** @type {?} */
    let timeZone;
    /** @type {?} */
    let radius;
    /** @type {?} */
    let conf;
    /** @type {?} */
    let lon;
    /** @type {?} */
    let lat;
    /** @type {?} */
    const projectionPattern = '(;[\\d]{4,6})';
    /** @type {?} */
    const toProjection = '4326';
    /** @type {?} */
    let projectionStr;
    /** @type {?} */
    const projectionRegex = new RegExp(projectionPattern, 'g');
    /** @type {?} */
    const lonlatCoord = '([-+])?([\\d]{1,3})([,.](\\d+))?';
    /** @type {?} */
    const lonLatPattern = `${lonlatCoord}[\\s,.]\\s*${lonlatCoord}`;
    /** @type {?} */
    const lonLatRegex = new RegExp(`^${lonLatPattern}$`, 'g');
    /** @type {?} */
    const dmsCoord = '([0-9]{1,2})[:|°]?\\s*([0-9]{1,2})?[:|\'|′|’]?\\s*([0-9]{1,2}(?:\.[0-9]+){0,1})?\\s*["|″|”]?\\s*';
    /** @type {?} */
    const dmsCoordPattern = `${dmsCoord}([N|S]),?\\s*${dmsCoord}([E|W])`;
    /** @type {?} */
    const dmsRegex = new RegExp(`^${dmsCoordPattern}`, 'gi');
    /** @type {?} */
    const patternUtmMtm = '(UTM|MTM)\-?(\\d{1,2})[\\s,.]*(\\d+[\\s.,]?\\d+)[\\s,.]+(\\d+[\\s.,]?\\d+)';
    /** @type {?} */
    const utmMtmRegex = new RegExp(`^${patternUtmMtm}`, 'gi');
    /** @type {?} */
    const ddCoord = '([-+])?(\\d{1,3})[,.](\\d+)';
    /** @type {?} */
    const patternDd = `${ddCoord}[,.]?\\s*${ddCoord}`;
    /** @type {?} */
    const ddRegex = new RegExp(`^${patternDd}`, 'g');
    /** @type {?} */
    const dmdCoord = '([-+])?(\\d{1,3})[\\s,.]{1}(\\d{1,2})[\\s,.]{1}(\\d{1,2})[.,]?(\\d{1,5})?';
    /** @type {?} */
    const patternDmd = `${dmdCoord}[,.]?\\s*${dmdCoord}`;
    /** @type {?} */
    const dmdRegex = new RegExp(`^${patternDmd}`, 'g');
    // tslint:disable:max-line-length
    /** @type {?} */
    const patternBELL = 'LAT\\s*[\\s:]*\\s*([-+])?(\\d{1,2})[\\s.,]?(\\d+)?[\\s.,]?\\s*(\\d{1,2}([.,]\\d+)?)?\\s*(N|S|E|W)?\\s*LONG\\s*[\\s:]*\\s*([-+])?(\\d{1,3})[\\s.,]?(\\d+)?[\\s.,]?\\s*(\\d{1,2}([.,]\\d+)?)?\\s*(N|S|E|W)?\\s*UNC\\s*[\\s:]?\\s*(\\d+)\\s*CONF\\s*[\\s:]?\\s*(\\d{1,3})';
    /** @type {?} */
    const bellRegex = new RegExp(`^${patternBELL}?`, 'gi');
    /** @type {?} */
    const mmCoord = '([-+]?\\d+)[,.]?(\\d+)?';
    /** @type {?} */
    const mmPattern = `${mmCoord}[\\s,.]\\s*${mmCoord}`;
    /** @type {?} */
    const mmRegex = new RegExp(`^${mmPattern}$`, 'g');
    str = str.toLocaleUpperCase();
    // Extract projection
    if (projectionRegex.test(str)) {
        [coordStr, projectionStr] = str.split(';');
    }
    else {
        coordStr = str;
    }
    if (lonLatRegex.test(coordStr)) {
        [,
            negativeLon,
            lon,
            ,
            decimalLon,
            negativeLat,
            lat,
            ,
            decimalLat] = coordStr.match(lonLatPattern);
        lon = parseFloat((negativeLon ? negativeLon : '') + lon + '.' + decimalLon);
        lat = parseFloat((negativeLat ? negativeLat : '') + lat + '.' + decimalLat);
    }
    else if (dmsRegex.test(coordStr)) {
        [,
            degreesLon,
            minutesLon,
            secondsLon,
            directionLon,
            degreesLat,
            minutesLat,
            secondsLat,
            directionLat] = coordStr.match(dmsCoordPattern);
        lon = convertDMSToDD(parseFloat(degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        lat = convertDMSToDD(parseFloat(degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
    }
    else if (utmMtmRegex.test(coordStr)) {
        [, pattern, timeZone, lon, lat] = coordStr.match(patternUtmMtm);
        /** @type {?} */
        const utm = '+proj=' + pattern + ' +zone=' + timeZone;
        /** @type {?} */
        const wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
        [lon, lat] = proj4(utm.toLocaleLowerCase(), wgs84, [parseFloat(lon), parseFloat(lat)]);
    }
    else if (dmdRegex.test(coordStr)) {
        [,
            negativeLon,
            degreesLon,
            minutesLon,
            secondsLon,
            decimalLon,
            negativeLat,
            degreesLat,
            minutesLat,
            secondsLat,
            decimalLat] = coordStr.match(patternDmd);
        lon = convertDMSToDD(parseFloat((negativeLon ? negativeLon : '') + degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        lat = convertDMSToDD(parseFloat((negativeLat ? negativeLat : '') + degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
    }
    else if (ddRegex.test(coordStr)) {
        [,
            negativeLon,
            degreesLon,
            decimalLon,
            negativeLat,
            degreesLat,
            decimalLat] = coordStr.match(patternDd);
        lon = convertDMSToDD(parseFloat((negativeLon ? negativeLon : '') + degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        lat = convertDMSToDD(parseFloat((negativeLat ? negativeLat : '') + degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
    }
    else if (bellRegex.test(coordStr)) {
        [,
            negativeLat,
            degreesLat,
            minutesLat,
            secondsLat,
            ,
            directionLat,
            negativeLon,
            degreesLon,
            minutesLon,
            secondsLon,
            ,
            directionLon,
            radius,
            conf] = coordStr.match(patternBELL);
        // Set default value for North America
        if (!directionLon) {
            directionLon = 'W';
        }
        // Check if real minutes or decimals
        if (minutesLon && minutesLon.length > 2) {
            lon = parseFloat((negativeLon ? negativeLon : '') + degreesLon + '.' + minutesLon);
        }
        else {
            lon = convertDMSToDD(parseFloat(degreesLon), parseFloat(minutesLon), parseFloat(secondsLon), directionLon);
        }
        if (minutesLat && minutesLat.length > 2) {
            lat = parseFloat((negativeLat ? negativeLat : '') + degreesLat + '.' + minutesLat);
        }
        else {
            lat = convertDMSToDD(parseFloat(degreesLat), parseFloat(minutesLat), parseFloat(secondsLat), directionLat);
        }
    }
    else if (mmRegex.test(coordStr)) {
        [, lon, decimalLon, lat, decimalLat] = coordStr.match(mmPattern);
        if (decimalLon) {
            lon = parseFloat(lon + '.' + decimalLon);
        }
        if (decimalLat) {
            lat = parseFloat(lat + '.' + decimalLat);
        }
    }
    else {
        return { lonLat: undefined, message: '', radius: undefined, conf: undefined };
    }
    // Set a negative coordinate for North America zone
    if (lon > 0 && lat > 0) {
        if (lon > lat) {
            lon = -lon;
        }
        else {
            lat = -lat;
        }
    }
    // Reverse coordinate to respect lonLat convention
    if (lon < lat) {
        lonLat = (/** @type {?} */ ([lon, lat]));
    }
    else {
        lonLat = (/** @type {?} */ ([lat, lon]));
    }
    // Reproject the coordinate if projection parameter have been set and coord is not 4326
    if ((projectionStr !== undefined && projectionStr !== toProjection) || (lonLat[0] > 180 || lonLat[0] < -180)) {
        /** @type {?} */
        const source = projectionStr ? 'EPSG:' + projectionStr : mapProjection;
        /** @type {?} */
        const dest = 'EPSG:' + toProjection;
        try {
            lonLat = transform(lonLat, source, dest);
        }
        catch (e) {
            return { lonLat: undefined, message: 'Projection ' + source + ' not supported', radius: undefined, conf: undefined };
        }
    }
    return { lonLat, message: '', radius: radius ? parseInt(radius, 10) : undefined, conf: conf ? parseInt(conf, 10) : undefined };
}
/**
 * Convert degrees minutes seconds to dd
 * @param {?} degrees Degrees
 * @param {?} minutes Minutes
 * @param {?} seconds Seconds
 * @param {?} direction Direction
 * @return {?}
 */
function convertDMSToDD(degrees, minutes, seconds, direction) {
    minutes = minutes || 0;
    seconds = seconds || 0;
    /** @type {?} */
    let dd = degrees + (minutes / 60) + (seconds / 3600);
    if (direction === 'S' || direction === 'W') {
        dd = -dd;
    } // Don't do anything for N or E
    return dd;
}
/**
 * Return true of two view states are equal.
 * @param {?} state1 View state
 * @param {?} state2 View state
 * @return {?} True if the view states are equal
 */
function viewStatesAreEqual(state1, state2) {
    if (state1 === undefined || state2 === undefined) {
        return false;
    }
    /** @type {?} */
    const tolerance = 1 / 10000;
    return state1.zoom === state2.zoom &&
        Math.trunc(state1.center[0] / tolerance) === Math.trunc(state2.center[0] / tolerance) &&
        Math.trunc(state1.center[1] / tolerance) === Math.trunc(state2.center[1] / tolerance);
}
/**
 * Format the scale to a human readable text
 * @param {?} scale
 * @return {?} Human readable scale text
 */
function formatScale(scale) {
    scale = Math.round(scale);
    if (scale < 10000) {
        return scale + '';
    }
    scale = Math.round(scale / 1000);
    if (scale < 1000) {
        return scale + 'K';
    }
    scale = Math.round(scale / 1000);
    return scale + 'M';
}
/**
 * Return the resolution from a scale denom
 * @param {?} scale Scale denom
 * @param {?=} dpi DPI
 * @return {?} Resolution
 */
function getResolutionFromScale(scale, dpi = 72) {
    return scale / (39.37 * dpi);
}
/**
 * Return the resolution from a scale denom
 * @param {?} resolution
 * @param {?=} unit
 * @param {?=} dpi
 * @return {?} Resolution
 */
function getScaleFromResolution(resolution, unit = 'm', dpi = 72) {
    return resolution * METERS_PER_UNIT[unit] * 39.37 * dpi;
}
/**
 * Returns true if the CTRL key is pushed during an Ol MapBrowserPointerEvent
 * @param {?} event OL MapBrowserPointerEvent
 * @return {?} Whether the CTRL key is pushed
 */
function ctrlKeyDown(event) {
    /** @type {?} */
    const originalEvent = event.originalEvent;
    return (!originalEvent.altKey &&
        (MAC ? originalEvent.metaKey : originalEvent.ctrlKey) &&
        !originalEvent.shiftKey);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Base map controller
 */
class MapController {
    constructor() {
        /**
         * Array of observer keys
         */
        this.observerKeys = [];
    }
    /**
     * Return the OL map this controller is bound to
     * @return {?} OL Map
     */
    getOlMap() {
        return this.olMap;
    }
    /**
     * Add or remove this controller to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    setOlMap(olMap$$1) {
        if (olMap$$1 !== undefined && this.getOlMap() !== undefined) {
            throw new Error('This controller is already bound to a map.');
        }
        if (olMap$$1 === undefined) {
            this.teardownObservers();
            this.olMap = olMap$$1;
            return;
        }
        this.olMap = olMap$$1;
    }
    /**
     * Teardown any observers
     * @return {?}
     */
    teardownObservers() {
        this.observerKeys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => unByKey(key)));
        this.observerKeys = [];
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Controller to handle map view interactions
 */
class MapViewController extends MapController {
    /**
     * @param {?=} options
     */
    constructor(options) {
        super();
        this.options = options;
        /**
         * Observable of the current resolution
         */
        this.resolution$ = new BehaviorSubject(undefined);
        /**
         * Observable of the current state
         */
        this.state$ = new BehaviorSubject(undefined);
        /**
         * Extent stream
         */
        this.extent$ = new Subject();
        /**
         * History of states
         */
        this.states = [];
        /**
         * Current state index
         */
        this.stateIndex = 0;
    }
    /**
     * Whether the view controller should keep the view's state history
     * @return {?}
     */
    get stateHistory() {
        return this.options ? this.options.stateHistory === true : false;
    }
    /**
     * OL View
     * @return {?}
     */
    get olView() { return this.olMap.getView(); }
    /**
     * Add or remove this controller to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    setOlMap(olMap$$1) {
        super.setOlMap(olMap$$1);
        this.setupObservers();
    }
    /**
     * Observe move moveend and subscribe to the extent stream
     * @return {?}
     */
    setupObservers() {
        if (this.stateHistory === true) {
            this.observerKeys.push(this.olMap.on('moveend', (/**
             * @param {?} event
             * @return {?}
             */
            (event) => this.onMoveEnd(event))));
        }
        this.extent$$ = this.extent$
            .pipe(debounceTime(25))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this.setExtent(value.extent, value.action);
        }));
    }
    /**
     * Teardown any observers
     * @return {?}
     */
    teardownObservers() {
        super.teardownObservers();
        if (this.extent$$ !== undefined) {
            this.extent$$.unsubscribe();
            this.extent$$ = undefined;
        }
    }
    /**
     * Get the view's OL projection
     * @return {?} OL projection
     */
    getOlProjection() {
        return this.olView.getProjection();
    }
    /**
     * Get the current map view center
     * @param {?=} projection Output projection
     * @return {?} Center
     */
    getCenter(projection) {
        /** @type {?} */
        let center = this.olView.getCenter();
        if (projection && center) {
            center = transform(center, this.getOlProjection(), projection);
        }
        return center;
    }
    /**
     * Get the current view extent
     * @param {?=} projection Output projection
     * @return {?} Extent
     */
    getExtent(projection) {
        /** @type {?} */
        let extent = this.olView.calculateExtent(this.olMap.getSize());
        if (projection && extent) {
            extent = transformExtent(extent, this.getOlProjection(), projection);
        }
        return extent;
    }
    /**
     * Get the current scale
     * @param {?=} dpi Dot per inches
     * @return {?} View scale
     */
    getScale(dpi = 72) {
        return getScaleFromResolution(this.getResolution(), this.getOlProjection().getUnits(), dpi);
    }
    /**
     * Get the current resolution
     * @return {?} Projection denominator
     */
    getResolution() {
        return this.olView.getResolution();
    }
    /**
     * Get the current zoom level
     * @return {?} Zoom level
     */
    getZoom() {
        return Math.round(this.olView.getZoom());
    }
    /**
     * Zoom in
     * @return {?}
     */
    zoomIn() {
        this.zoomTo(this.olView.getZoom() + 1);
    }
    /**
     * Zoom out
     * @return {?}
     */
    zoomOut() {
        this.zoomTo(this.olView.getZoom() - 1);
    }
    /**
     * Zoom to specific zoom level
     * @param {?} zoom Zoom level
     * @return {?}
     */
    zoomTo(zoom) {
        this.olView.animate({
            zoom,
            duration: 250,
            easing: easeOut
        });
    }
    /**
     * Move to extent after a short delay (100ms) unless
     * a new movement gets registered in the meantime.
     * @param {?} extent Extent to move to
     * @return {?}
     */
    moveToExtent(extent) {
        this.extent$.next({ extent, action: MapViewAction.Move });
    }
    /**
     * Zoom to extent after a short delay (100ms) unless
     * a new movement gets registered in the meantime.
     * @param {?} extent Extent to zoom to
     * @return {?}
     */
    zoomToExtent(extent) {
        this.extent$.next({ extent, action: MapViewAction.Zoom });
    }
    /**
     * Return the current view rotation
     * @return {?} Rotation angle in degrees
     */
    getRotation() {
        return this.olView.getRotation();
    }
    /**
     * Reset the view rotation to 0
     * @return {?}
     */
    resetRotation() {
        this.olView.animate({ rotation: 0 });
    }
    /**
     * Whether the view has a previous state
     * @return {?} True if the view has a previous state
     */
    hasPreviousState() {
        return this.states.length > 1 && this.stateIndex > 0;
    }
    /**
     * Whether the view has a next state
     * @return {?} True if the view has a next state
     */
    hasNextState() {
        return this.states.length > 1 && this.stateIndex < this.states.length - 1;
    }
    /**
     * Restore the previous view state
     * @return {?}
     */
    previousState() {
        if (this.hasPreviousState()) {
            this.setStateIndex(this.stateIndex - 1);
        }
    }
    /**
     * Restore the next view state
     * @return {?}
     */
    nextState() {
        if (this.hasNextState()) {
            this.setStateIndex(this.stateIndex + 1);
        }
    }
    /**
     * Clear the state history
     * @return {?}
     */
    clearStateHistory() {
        this.states = [];
        this.stateIndex = 0;
    }
    /**
     * Update the the view to it's intial state
     * @return {?}
     */
    setInitialState() {
        if (this.states.length > 0) {
            this.setStateIndex(0);
        }
    }
    /**
     * Move to the extent retrieved from the stream
     * @private
     * @param {?} extent Extent
     * @param {?} action Either zoom or move
     * @return {?}
     */
    setExtent(extent, action) {
        /** @type {?} */
        const olView$$1 = this.olView;
        if (action === MapViewAction.Zoom) {
            olView$$1.fit(extent, { maxZoom: 17 });
        }
        else if (action === MapViewAction.Move) {
            olView$$1.fit(extent, { maxZoom: olView$$1.getZoom() });
        }
    }
    /**
     * Set the view state index
     * @private
     * @param {?} index State index
     * @return {?}
     */
    setStateIndex(index) {
        this.stateIndex = index;
        this.setState(this.states[index]);
    }
    /**
     * Set the view state
     * @private
     * @param {?} state View state
     * @return {?}
     */
    setState(state$$1) {
        this.olView.animate({
            resolution: state$$1.resolution,
            center: state$$1.center,
            duration: 0
        });
    }
    /**
     * On move end, get the view state and record it.
     * @private
     * @param {?} event Map event
     * @return {?}
     */
    onMoveEnd(event) {
        /** @type {?} */
        const resolution = this.getResolution();
        if (this.resolution$.value !== resolution) {
            this.resolution$.next(resolution);
        }
        /** @type {?} */
        const state$$1 = {
            resolution,
            center: this.getCenter(),
            zoom: this.getZoom()
        };
        if (this.stateHistory === true) {
            /** @type {?} */
            const stateIndex = this.stateIndex;
            /** @type {?} */
            const stateAtIndex = this.states.length === 0 ? undefined : this.states[stateIndex];
            if (!viewStatesAreEqual(state$$1, stateAtIndex)) {
                this.states = this.states.slice(0, stateIndex + 1).concat([state$$1]);
                this.stateIndex = this.states.length - 1;
            }
        }
        this.state$.next(state$$1);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// TODO: This class is messy. Clearly define it's scope and the map browser's.
// Move some stuff into controllers.
class IgoMap {
    /**
     * @param {?=} options
     */
    constructor(options) {
        this.layers$ = new BehaviorSubject([]);
        this.geolocation$ = new BehaviorSubject(undefined);
        this.defaultOptions = {
            controls: { attribution: false }
        };
        this.options = Object.assign({}, this.defaultOptions, options);
        this.layerWatcher = new LayerWatcher();
        this.status$ = this.layerWatcher.status$;
        register(proj4);
        this.init();
    }
    /**
     * @return {?}
     */
    get layers() {
        return this.layers$.value;
    }
    /**
     * @return {?}
     */
    get projection() {
        return this.viewController.getOlProjection().getCode();
    }
    /**
     * @return {?}
     */
    init() {
        /** @type {?} */
        const controls = [];
        if (this.options.controls) {
            if (this.options.controls.attribution) {
                /** @type {?} */
                const attributionOpt = (/** @type {?} */ ((this.options.controls.attribution === true
                    ? {}
                    : this.options.controls.attribution)));
                controls.push(new olAttribution(attributionOpt));
            }
            if (this.options.controls.scaleLine) {
                /** @type {?} */
                const scaleLineOpt = (/** @type {?} */ ((this.options.controls.scaleLine === true
                    ? {}
                    : this.options.controls.scaleLine)));
                controls.push(new olControlScaleLine(scaleLineOpt));
            }
        }
        /** @type {?} */
        let interactions = {};
        if (this.options.interactions === false) {
            interactions = {
                altShiftDragRotate: false,
                doubleClickZoom: false,
                keyboard: false,
                mouseWheelZoom: false,
                shiftDragZoom: false,
                dragPan: false,
                pinchRotate: false,
                pinchZoom: false
            };
        }
        this.ol = new olMap({
            interactions: defaults(interactions),
            controls
        });
        this.setView(this.options.view || {});
        this.viewController = new MapViewController({
            stateHistory: true
        });
        this.viewController.setOlMap(this.ol);
        this.overlay = new Overlay(this);
        this.buffer = new Overlay(this);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setTarget(id) {
        this.ol.setTarget(id);
        if (id !== undefined) {
            this.layerWatcher.subscribe((/**
             * @return {?}
             */
            () => { }), null);
        }
        else {
            this.layerWatcher.unsubscribe();
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    updateView(options) {
        /** @type {?} */
        const currentView = this.ol.getView();
        /** @type {?} */
        const viewOptions = Object.assign({
            zoom: currentView.getZoom()
        }, currentView.getProperties());
        this.setView(Object.assign(viewOptions, options));
    }
    /**
     * Set the map view
     * @param {?} options Map view options
     * @return {?}
     */
    setView(options) {
        if (this.viewController !== undefined) {
            this.viewController.clearStateHistory();
        }
        /** @type {?} */
        const view = new olView(options);
        this.ol.setView(view);
        this.unsubscribeGeolocate();
        if (options) {
            if (options.center) {
                /** @type {?} */
                const projection = view.getProjection().getCode();
                /** @type {?} */
                const center = fromLonLat(options.center, projection);
                view.setCenter(center);
            }
            if (options.geolocate) {
                this.geolocate(true);
            }
        }
    }
    // TODO: Move to ViewController and update every place it's used
    /**
     * @param {?=} projection
     * @return {?}
     */
    getCenter(projection) {
        return this.viewController.getCenter();
    }
    // TODO: Move to ViewController and update every place it's used
    /**
     * @param {?=} projection
     * @return {?}
     */
    getExtent(projection) {
        return this.viewController.getExtent();
    }
    // TODO: Move to ViewController and update every place it's used
    /**
     * @return {?}
     */
    getZoom() {
        return this.viewController.getZoom();
    }
    /**
     * @param {?} baseLayer
     * @return {?}
     */
    changeBaseLayer(baseLayer) {
        if (!baseLayer) {
            return;
        }
        for (const bl of this.getBaseLayers()) {
            bl.visible = false;
        }
        baseLayer.visible = true;
    }
    /**
     * @return {?}
     */
    getBaseLayers() {
        return this.layers.filter((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer.baseLayer === true));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getLayerById(id) {
        return this.layers.find((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer.id && layer.id === id));
    }
    /**
     * @param {?} alias
     * @return {?}
     */
    getLayerByAlias(alias) {
        return this.layers.find((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer.alias && layer.alias === alias));
    }
    /**
     * Add a single layer
     * @param {?} layer Layer to add
     * @param {?=} push DEPRECATED
     * @return {?}
     */
    addLayer(layer, push = true) {
        this.addLayers([layer]);
    }
    /**
     * Add many layers
     * @param {?} layers Layers to add
     * @param {?=} push DEPRECATED
     * @return {?}
     */
    addLayers(layers, push = true) {
        /** @type {?} */
        const addedLayers = layers
            .map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => this.doAddLayer(layer)))
            .filter((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer !== undefined));
        this.setLayers([].concat(this.layers, addedLayers));
    }
    /**
     * Remove a single layer
     * @param {?} layer Layer to remove
     * @return {?}
     */
    removeLayer(layer) {
        this.removeLayers([layer]);
    }
    /**
     * Remove many layers
     * @param {?} layers Layers to remove
     * @return {?}
     */
    removeLayers(layers) {
        /** @type {?} */
        const newLayers = this.layers$.value.slice(0);
        /** @type {?} */
        const layersToRemove = [];
        layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            /** @type {?} */
            const index = this.getLayerIndex(layer);
            if (index >= 0) {
                layersToRemove.push(layer);
                newLayers.splice(index, 1);
            }
        }));
        layersToRemove.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => this.doRemoveLayer(layer)));
        this.setLayers(newLayers);
    }
    /**
     * Remove all layers
     * @return {?}
     */
    removeAllLayers() {
        this.layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => this.doRemoveLayer(layer)));
        this.layers$.next([]);
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    raiseLayer(layer) {
        /** @type {?} */
        const index = this.getLayerIndex(layer);
        if (index > 0) {
            this.moveLayer(layer, index, index - 1);
        }
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    lowerLayer(layer) {
        /** @type {?} */
        const index = this.getLayerIndex(layer);
        if (index < this.layers.length - 1) {
            this.moveLayer(layer, index, index + 1);
        }
    }
    /**
     * @param {?} layer
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    moveLayer(layer, from, to) {
        /** @type {?} */
        const layerTo = this.layers[to];
        /** @type {?} */
        const zIndexTo = layerTo.zIndex;
        /** @type {?} */
        const zIndexFrom = layer.zIndex;
        if (zIndexTo < 10) {
            return;
        }
        layer.zIndex = zIndexTo;
        layerTo.zIndex = zIndexFrom;
        this.layers[to] = layer;
        this.layers[from] = layerTo;
        this.layers$.next(this.layers.slice(0));
    }
    /**
     * Add a layer to the OL map and start watching. If the layer is already
     * added to this map, make it visible but don't add it one again.
     * @private
     * @param {?} layer Layer
     * @return {?} The layer added, if any
     */
    doAddLayer(layer) {
        if (layer.baseLayer && layer.visible) {
            this.changeBaseLayer(layer);
        }
        /** @type {?} */
        const existingLayer = this.getLayerById(layer.id);
        if (existingLayer !== undefined) {
            existingLayer.visible = true;
            return;
        }
        if (layer.zIndex === undefined || layer.zIndex === 0) {
            /** @type {?} */
            const offset = layer.baseLayer ? 1 : 10;
            layer.zIndex = this.layers.length + offset;
        }
        layer.setMap(this);
        this.layerWatcher.watchLayer(layer);
        this.ol.addLayer(layer.ol);
        return layer;
    }
    /**
     * Remove a layer from the OL map and stop watching
     * @private
     * @param {?} layer Layer
     * @return {?}
     */
    doRemoveLayer(layer) {
        this.layerWatcher.unwatchLayer(layer);
        this.ol.removeLayer(layer.ol);
        layer.setMap(undefined);
    }
    /**
     * Update the layers observable
     * @private
     * @param {?} layers Layers
     * @return {?}
     */
    setLayers(layers) {
        this.layers$.next(this.sortLayersByZIndex(layers).slice(0));
    }
    /**
     * Sort layers by descending zIndex
     * @private
     * @param {?} layers Array of layers
     * @return {?} The original array, sorted by zIndex
     */
    sortLayersByZIndex(layers) {
        // Sort by descending zIndex
        return layers.sort((/**
         * @param {?} layer1
         * @param {?} layer2
         * @return {?}
         */
        (layer1, layer2) => layer2.zIndex - layer1.zIndex));
    }
    /**
     * Get layer index in the map's inenr array of layers
     * @private
     * @param {?} layer Layer
     * @return {?} The layer index
     */
    getLayerIndex(layer) {
        return this.layers.findIndex((/**
         * @param {?} _layer
         * @return {?}
         */
        (_layer) => _layer === layer));
    }
    // TODO: Create a GeolocationController with everything below
    /**
     * @param {?=} track
     * @return {?}
     */
    geolocate(track = false) {
        /** @type {?} */
        let first = true;
        if (this.geolocation$$) {
            track = this.geolocation.getTracking();
            this.unsubscribeGeolocate();
        }
        this.startGeolocation();
        this.geolocation$$ = this.geolocation$.subscribe((/**
         * @param {?} geolocation
         * @return {?}
         */
        geolocation => {
            if (!geolocation) {
                return;
            }
            /** @type {?} */
            const accuracy = geolocation.getAccuracy();
            if (accuracy < 4140000) {
                /** @type {?} */
                const geometry = geolocation.getAccuracyGeometry();
                /** @type {?} */
                const extent = geometry.getExtent();
                if (this.geolocationFeature &&
                    this.overlay.dataSource.ol.getFeatureById(this.geolocationFeature.getId())) {
                    this.overlay.dataSource.ol.removeFeature(this.geolocationFeature);
                }
                this.geolocationFeature = new olFeature({ geometry });
                this.geolocationFeature.setId('geolocationFeature');
                this.overlay.addOlFeature(this.geolocationFeature);
                if (this.ol.getView().options_.buffer) {
                    /** @type {?} */
                    const bufferRadius = this.ol.getView().options_.buffer.bufferRadius;
                    /** @type {?} */
                    const coordinates = geolocation.getPosition();
                    this.bufferGeom = new olCircle(coordinates, bufferRadius);
                    /** @type {?} */
                    const bufferStroke = this.ol.getView().options_.buffer.bufferStroke;
                    /** @type {?} */
                    const bufferFill = this.ol.getView().options_.buffer.bufferFill;
                    /** @type {?} */
                    let bufferText;
                    if (this.ol.getView().options_.buffer.showBufferRadius) {
                        bufferText = bufferRadius.toString() + 'm';
                    }
                    else {
                        bufferText = '';
                    }
                    this.bufferFeature = new olFeature(this.bufferGeom);
                    this.bufferFeature.setId('bufferFeature');
                    this.bufferFeature.set('bufferStroke', bufferStroke);
                    this.bufferFeature.set('bufferFill', bufferFill);
                    this.bufferFeature.set('bufferText', bufferText);
                    this.buffer.addOlFeature(this.bufferFeature);
                }
                if (first) {
                    this.viewController.zoomToExtent(extent);
                }
            }
            else if (first) {
                /** @type {?} */
                const view = this.ol.getView();
                /** @type {?} */
                const coordinates = geolocation.getPosition();
                view.setCenter(coordinates);
                view.setZoom(14);
            }
            if (track) {
                this.unsubscribeGeolocate();
            }
            first = false;
        }));
    }
    /**
     * @return {?}
     */
    unsubscribeGeolocate() {
        this.stopGeolocation();
        if (this.geolocation$$) {
            this.geolocation$$.unsubscribe();
            this.geolocation$$ = undefined;
        }
    }
    /**
     * @private
     * @return {?}
     */
    startGeolocation() {
        if (!this.geolocation) {
            this.geolocation = new olGeolocation({
                projection: this.projection,
                tracking: true
            });
            this.geolocation.on('change', (/**
             * @param {?} evt
             * @return {?}
             */
            evt => {
                this.geolocation$.next(this.geolocation);
            }));
        }
        else {
            this.geolocation.setTracking(true);
        }
    }
    /**
     * @private
     * @return {?}
     */
    stopGeolocation() {
        if (this.geolocation) {
            this.geolocation.setTracking(false);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MapBrowserComponent {
    /**
     * @param {?} activityService
     */
    constructor(activityService) {
        this.activityService = activityService;
        this.id = `igo-map-target-${new Date().getTime()}`;
    }
    /**
     * @return {?}
     */
    get view() { return this._view; }
    /**
     * @param {?} value
     * @return {?}
     */
    set view(value) {
        this._view = value;
        if (this.map !== undefined) {
            this.map.updateView(value);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.status$$ = this.map.status$.subscribe((/**
         * @param {?} status
         * @return {?}
         */
        status => this.handleStatusChange(status)));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.map.setTarget(this.id);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.map.setTarget(undefined);
        this.activityService.unregister(this.activityId);
        this.status$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} status
     * @return {?}
     */
    handleStatusChange(status) {
        if (status === SubjectStatus.Working && this.activityId === undefined) {
            this.activityId = this.activityService.register();
        }
        else if (status === SubjectStatus.Done && this.activityId !== undefined) {
            this.activityService.unregister(this.activityId);
            this.activityId = undefined;
        }
    }
}
MapBrowserComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-map-browser',
                template: "<div [id]=\"id\" class=\"igo-map-browser-target\"></div>\r\n<ng-content></ng-content>\r\n",
                styles: [":host{position:relative;display:block}.igo-map-browser-target,:host{width:100%;height:100%}:host>>>igo-zoom-button{position:absolute;bottom:5px;right:5px}:host>>>igo-geolocate-button{position:absolute;bottom:95px;right:5px}:host>>>igo-rotation-button{position:absolute;top:calc(40px + 5px + 5px);right:5px}:host>>>igo-user-button{position:absolute;bottom:5px;right:calc(5px + 50px)}:host>>>igo-baselayers-switcher{position:absolute;bottom:5px;left:5px}:host.igo-attribution-offset>>>.ol-attribution{left:90px;width:calc(100% - 200px)}@media only screen and (max-width:450px),only screen and (max-height:450px){:host>>>igo-zoom-button{display:none}:host>>>igo-geolocate-button{bottom:5px}:host>>>igo-rotation-button{top:calc(40px + 5px + 5px)}:host>>>igo-user-button{right:calc(5px + 90px)}:host.igo-attribution-offset>>>.ol-attribution{left:50px}}:host>>>.ol-attribution{left:5px;bottom:5px;text-align:left;padding:0;margin-right:90px;background-color:rgba(255,255,255,0);width:calc(100% - 100px)}:host>>>.ol-attribution.ol-logo-only{height:inherit}:host>>>.ol-attribution.ol-collapsed{background:0 0}:host>>>.ol-attribution.ol-collapsed button{transform:none}:host>>>.ol-attribution button{transform:rotate(180deg);background-color:#fff;cursor:pointer}:host>>>.ol-scale-line-inner{color:#000;border-color:#000}:host>>>.ol-scale-line{background-color:rgba(255,255,255,0);bottom:4px;transform:translate(-50%);left:50%}:host>>>canvas{display:block}"]
            }] }
];
/** @nocollapse */
MapBrowserComponent.ctorParameters = () => [
    { type: ActivityService }
];
MapBrowserComponent.propDecorators = {
    map: [{ type: Input }],
    view: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MapOfflineDirective {
    /**
     * @param {?} component
     * @param {?} networkService
     */
    constructor(component, networkService) {
        this.networkService = networkService;
        this.component = component;
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
    ngAfterViewInit() {
        this.networkService.currentState().subscribe((/**
         * @param {?} state
         * @return {?}
         */
        (state$$1) => {
            this.state = state$$1;
            this.changeLayer();
        }));
        this.map.layers$.subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        (layers) => {
            this.changeLayer();
        }));
    }
    /**
     * @private
     * @return {?}
     */
    changeLayer() {
        /** @type {?} */
        let sourceOptions;
        /** @type {?} */
        const layerList = this.map.layers$.value;
        layerList.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        layer => {
            if (layer.options.sourceOptions.type === 'mvt') {
                sourceOptions = ((/** @type {?} */ (layer.options.sourceOptions)));
                layer.ol.getSource().clear();
            }
            else if (layer.options.sourceOptions.type === 'xyz') {
                sourceOptions = ((/** @type {?} */ (layer.options.sourceOptions)));
            }
            else if (layer.options.sourceOptions.type === 'vector') {
                sourceOptions = ((/** @type {?} */ (layer.options.sourceOptions)));
            }
            else if (layer.options.sourceOptions.type === 'cluster') {
                sourceOptions = ((/** @type {?} */ (layer.options.sourceOptions)));
            }
            else {
                if (this.state.connection === false) {
                    layer.ol.setMaxResolution(0);
                    return;
                }
                else if (this.state.connection === true) {
                    layer.ol.setMaxResolution(Infinity);
                    return;
                }
            }
            if (sourceOptions.pathOffline &&
                this.state.connection === false) {
                if (sourceOptions.type === 'vector') {
                    return;
                }
                else if (sourceOptions.type === 'cluster') {
                    return;
                }
                layer.ol.getSource().setUrl(sourceOptions.pathOffline);
            }
            else if (sourceOptions.pathOffline &&
                this.state.connection === true) {
                if (sourceOptions.type === 'vector') {
                    return;
                }
                else if (sourceOptions.type === 'cluster') {
                    return;
                }
                layer.ol.getSource().setUrl(sourceOptions.url);
            }
            else {
                if (this.state.connection === false) {
                    layer.ol.setMaxResolution(0);
                }
                else if (this.state.connection === true) {
                    layer.ol.setMaxResolution(Infinity);
                }
            }
        }));
    }
}
MapOfflineDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoMapOffline]'
            },] }
];
/** @nocollapse */
MapOfflineDirective.ctorParameters = () => [
    { type: MapBrowserComponent },
    { type: NetworkService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * When injected, this service automatically registers and
 * projection defined in the application config. A custom projection
 * needs to be registered to be usable by OL.
 */
class ProjectionService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        /** @type {?} */
        const projections = this.config.getConfig('projections') || [];
        projections.forEach((/**
         * @param {?} projection
         * @return {?}
         */
        (projection) => {
            this.registerProjection(projection);
        }));
    }
    /**
     * Define a proj4 projection and register it in OL
     * @param {?} projection Projection
     * @return {?}
     */
    registerProjection(projection) {
        proj4.defs(projection.code, projection.def);
        register(proj4);
        get(projection.code).setExtent(projection.extent);
    }
}
ProjectionService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ProjectionService.ctorParameters = () => [
    { type: ConfigService }
];
/** @nocollapse */ ProjectionService.ngInjectableDef = defineInjectable({ factory: function ProjectionService_Factory() { return new ProjectionService(inject(ConfigService)); }, token: ProjectionService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ZoomButtonComponent {
    constructor() { }
    /**
     * @return {?}
     */
    get zoom() { return this.map.viewController.getZoom(); }
}
ZoomButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-zoom-button',
                template: "<div class=\"igo-zoom-button-container\">\r\n  <button\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.geo.mapButtons.zoomIn' | translate: {zoom: zoom + 1}\"\r\n    matTooltipPosition=\"left\"\r\n    [color]=\"color\"\r\n    (click)=\"map.viewController.zoomIn()\">\r\n    <mat-icon svgIcon=\"plus\"></mat-icon>\r\n  </button>\r\n\r\n  <button\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.geo.mapButtons.zoomOut' | translate: {zoom: zoom - 1}\"\r\n    matTooltipPosition=\"left\"\r\n    [color]=\"color\"\r\n    (click)=\"map.viewController.zoomOut()\">\r\n    <mat-icon svgIcon=\"minus\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                styles: [".igo-zoom-button-container{width:40px}.igo-zoom-button-container button{background-color:#fff}.igo-zoom-button-container button:hover{background-color:#efefef}.igo-zoom-button-container button:first-child{margin-bottom:2px}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
            }] }
];
/** @nocollapse */
ZoomButtonComponent.ctorParameters = () => [];
ZoomButtonComponent.propDecorators = {
    map: [{ type: Input }],
    color: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GeolocateButtonComponent {
    constructor() { }
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
}
GeolocateButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-geolocate-button',
                template: "<div class=\"igo-geolocate-button-container\">\r\n  <button\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.geo.mapButtons.geolocate' | translate\"\r\n    matTooltipPosition=\"left\"\r\n    [color]=\"color\"\r\n    (click)=\"map.geolocate()\">\r\n    <mat-icon svgIcon=\"crosshairs-gps\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                styles: [".igo-geolocate-button-container{width:40px;background-color:#fff}.igo-geolocate-button-container:hover{background-color:#efefef}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
            }] }
];
/** @nocollapse */
GeolocateButtonComponent.ctorParameters = () => [];
GeolocateButtonComponent.propDecorators = {
    map: [{ type: Input }],
    color: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function baseLayersSwitcherSlideInOut() {
    return trigger('baseLayerSwitcherState', [
        state('collapseIcon', style({
            height: '40px',
            width: '40px',
            overflow: 'hidden'
        })),
        state('collapseMap', style({
            height: '85px',
            overflow: 'hidden'
        })),
        state('expand', style({
            overflow: 'hidden'
        })),
        transition('collapse => expand', animate('200ms')),
        transition('expand => collapse', animate('200ms'))
    ]);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BaseLayersSwitcherComponent {
    /**
     * @param {?} mediaService
     */
    constructor(mediaService) {
        this.mediaService = mediaService;
        this._baseLayers = [];
        this.expand = false;
        this.showButton = true;
        /** @type {?} */
        const media = this.mediaService.media$.value;
        if (media === Media.Mobile && this.useStaticIcon === undefined) {
            this.useStaticIcon = true;
        }
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
    get useStaticIcon() {
        return this._useStaticIcon;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set useStaticIcon(value) {
        this._useStaticIcon = value;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.layers$$ = this.map.layers$.subscribe((/**
         * @param {?} arrayLayers
         * @return {?}
         */
        arrayLayers => {
            this._baseLayers = arrayLayers.filter((/**
             * @param {?} l
             * @return {?}
             */
            l => l.baseLayer));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.layers$$.unsubscribe();
    }
    /**
     * @return {?}
     */
    collapseOrExpand() {
        if (this.baseLayers.length > 1 || this.useStaticIcon) {
            this.expand = !this.expand;
        }
        else {
            this.expand = false;
        }
    }
    /**
     * @return {?}
     */
    get baseLayers() {
        /** @type {?} */
        const mapResolution = this.map.viewController.getResolution();
        /** @type {?} */
        const bl = this._baseLayers.filter((/**
         * @param {?} l
         * @return {?}
         */
        l => {
            return ((!l.options.maxResolution ||
                mapResolution <= l.options.maxResolution) &&
                (!l.options.minResolution || mapResolution >= l.options.minResolution));
        }));
        /** @type {?} */
        const blHidden = bl.filter((/**
         * @param {?} l
         * @return {?}
         */
        l => !l.visible));
        return blHidden.length + 1 === bl.length ? blHidden : bl;
    }
}
BaseLayersSwitcherComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-baselayers-switcher',
                template: "<div *ngIf=\"baseLayers.length > 0\"\r\n     class=\"igo-baselayers-switcher-container\"\r\n     [ngClass]=\"{'container-expand': expand}\"\r\n     [@baseLayerSwitcherState]=\"expand ? 'expand' : useStaticIcon ? 'collapseIcon' : 'collapseMap'\"\r\n     (@baseLayerSwitcherState.start)=\"showButton=false\"\r\n     (@baseLayerSwitcherState.done)=\"showButton=true\"\r\n     (click)=\"collapseOrExpand()\">\r\n\r\n     <div *ngIf=\"useStaticIcon && !expand && showButton\" class=\"igo-baselayers-switcher-button-container\">\r\n       <button\r\n         mat-icon-button\r\n         [matTooltip]=\"'igo.geo.mapButtons.baselayerSwitcher' | translate\"\r\n         matTooltipPosition=\"right\"\r\n         color=\"primary\">\r\n         <mat-icon svgIcon=\"photo-library\"></mat-icon>\r\n       </button>\r\n     </div>\r\n\r\n     <igo-mini-basemap *ngFor=\"let baseLayer of baseLayers; let i = index\"\r\n       [map]=\"map\"\r\n       [baseLayer]=\"baseLayer\"\r\n       [display]=\"expand || (i === 0 && !useStaticIcon)\"\r\n       [disabled]=\"!expand && baseLayers.length > 1\">\r\n     </igo-mini-basemap>\r\n\r\n    <div class=\"more-baselayers\">\r\n      <mat-icon class=\"material-icons mat-icon mat-list-avatar\" color=\"primary\" svgIcon=\"menu-down\"></mat-icon>\r\n    </div>\r\n\r\n</div>\r\n",
                animations: [baseLayersSwitcherSlideInOut()],
                styles: [".igo-baselayers-switcher-container{height:auto;position:relative}.container-expand{overflow:hidden;border-width:0}.more-baselayers{width:80px;height:20px;background-color:#fff;text-align:center;cursor:pointer}.more-baselayers:hover{background-color:#efefef}.igo-baselayers-switcher-button-container{width:40px;background-color:#fff}.igo-baselayers-switcher-button-container:hover{background-color:#efefef}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
            }] }
];
/** @nocollapse */
BaseLayersSwitcherComponent.ctorParameters = () => [
    { type: MediaService }
];
BaseLayersSwitcherComponent.propDecorators = {
    map: [{ type: Input }],
    useStaticIcon: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MiniBaseMapComponent {
    /**
     * @param {?} layerService
     * @param {?} appRef
     */
    constructor(layerService, appRef) {
        this.layerService = layerService;
        this.appRef = appRef;
        this.basemap = new IgoMap({
            controls: {},
            interactions: false
        });
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
        this.handleMoveEnd();
    }
    /**
     * @return {?}
     */
    get baseLayer() {
        return this._baseLayer;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set baseLayer(value) {
        this._baseLayer = value;
        this.handleBaseLayerChanged(value);
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = value;
    }
    /**
     * @return {?}
     */
    get display() {
        return this._display;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set display(value) {
        this._display = value;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.map.ol.on('moveend', (/**
         * @return {?}
         */
        () => this.handleMoveEnd()));
        this.handleMoveEnd();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.map.ol.un('moveend', (/**
         * @return {?}
         */
        () => this.handleMoveEnd()));
    }
    /**
     * @param {?} baseLayer
     * @return {?}
     */
    changeBaseLayer(baseLayer) {
        if (this.disabled) {
            return;
        }
        this.map.changeBaseLayer(baseLayer);
        this.appRef.tick();
    }
    /**
     * @private
     * @return {?}
     */
    handleMoveEnd() {
        this.basemap.ol.setView(this.map.ol.getView());
    }
    /**
     * @private
     * @param {?} baselayer
     * @return {?}
     */
    handleBaseLayerChanged(baselayer) {
        this.basemap.removeAllLayers();
        /** @type {?} */
        const options = Object.assign(Object.create(baselayer.options), baselayer.options);
        options.visible = true;
        /** @type {?} */
        const layer = this.layerService.createLayer(options);
        this.basemap.addLayer(layer);
    }
}
MiniBaseMapComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-mini-basemap',
                template: "<div class=\"igo-mini-basemap-container\">\r\n\r\n  <div *ngIf=\"display\" (click)=\"changeBaseLayer(baseLayer)\">\r\n    <igo-map-browser [map]=\"basemap\"></igo-map-browser>\r\n    <div class='igo-mini-basemap-title'>{{baseLayer.title}}</div>\r\n  </div>\r\n\r\n</div>\r\n",
                styles: [".igo-mini-basemap-container{width:calc(40px * 2);height:calc(40px * 2);background-color:rgba(255,255,255,.01);border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3);cursor:pointer;margin-top:5px}.igo-mini-basemap-container:hover .igo-mini-basemap-title{color:#000;text-shadow:0 0 5px #fff}.igo-mini-basemap-container>div{width:100%;height:100%}.igo-mini-basemap-title{position:relative;top:-76px;height:76px;width:76px;text-align:center;vertical-align:bottom;color:#fff;text-shadow:0 0 5px #000;white-space:normal;display:flex;align-items:flex-end;justify-content:center}"]
            }] }
];
/** @nocollapse */
MiniBaseMapComponent.ctorParameters = () => [
    { type: LayerService },
    { type: ApplicationRef }
];
MiniBaseMapComponent.propDecorators = {
    map: [{ type: Input }],
    baseLayer: [{ type: Input }],
    disabled: [{ type: Input }],
    display: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RotationButtonComponent {
    constructor() { }
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
    get showIfNoRotation() {
        return this._showIfNoRotation;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showIfNoRotation(value) {
        this._showIfNoRotation = value;
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
    get rotated() {
        return this.map.viewController.getRotation() !== 0;
    }
    /**
     * @param {?} radians
     * @return {?}
     */
    rotationStyle(radians) {
        /** @type {?} */
        const rotation = 'rotate(' + radians + 'rad)';
        return {
            transform: rotation
        };
    }
}
RotationButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-rotation-button',
                template: "<div *ngIf=\"rotated && !showIfNoRotation\" class=\"igo-rotation-button-container\"\r\n  [matTooltip]=\"rotated ? ('igo.geo.mapButtons.resetRotation' | translate): ('igo.geo.mapButtons.tipRotation' | translate)\"\r\n  matTooltipPosition=\"left\">\r\n  <button mat-icon-button matTooltipPosition=\"left\" [color]=\"color\" [disabled]=\"!rotated\"\r\n    (click)=\"map.viewController.resetRotation()\">\r\n    <mat-icon [ngStyle]=\"rotationStyle(map.viewController.getRotation())\" svgIcon=\"navigation\">\r\n    </mat-icon>\r\n  </button>\r\n</div>\r\n\r\n<div *ngIf=\"showIfNoRotation\" class=\"igo-rotation-button-container\"\r\n  [matTooltip]=\"rotated ? ('igo.geo.mapButtons.resetRotation' | translate): ('igo.geo.mapButtons.tipRotation' | translate)\"\r\n  matTooltipPosition=\"left\">\r\n  <button mat-icon-button matTooltipPosition=\"left\" [color]=\"color\" [disabled]=\"!rotated\"\r\n    (click)=\"map.viewController.resetRotation()\">\r\n    <mat-icon [ngStyle]=\"rotationStyle(map.viewController.getRotation())\" svgIcon=\"navigation\">\r\n    </mat-icon>\r\n  </button>\r\n</div>",
                styles: [".igo-rotation-button-container{width:40px;background-color:#fff}.igo-rotation-button-container:hover{background-color:#efefef}:host>>>button .mat-button-ripple-round,button{border-radius:0}@media only screen and (max-width:450px),only screen and (max-height:450px){:host>>>button .mat-button-ripple-round:disabled,button:disabled{display:none}}"]
            }] }
];
/** @nocollapse */
RotationButtonComponent.ctorParameters = () => [];
RotationButtonComponent.propDecorators = {
    map: [{ type: Input }],
    showIfNoRotation: [{ type: Input }],
    color: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EsriStyleGenerator {
    constructor() {
        this._converters = {};
        this._converters.esriPMS = EsriStyleGenerator._convertEsriPMS;
        this._converters.esriSFS = EsriStyleGenerator._convertEsriSFS;
        this._converters.esriSLS = EsriStyleGenerator._convertEsriSLS;
        this._converters.esriSMS = EsriStyleGenerator._convertEsriSMS;
        this._converters.esriTS = EsriStyleGenerator._convertEsriTS;
        this._renderers = {};
        this._renderers.uniqueValue = this._renderUniqueValue;
        this._renderers.simple = this._renderSimple;
        this._renderers.classBreaks = this._renderClassBreaks;
    }
    /**
     * @param {?} point
     * @return {?}
     */
    static _convertPointToPixel(point) {
        return point / 0.75;
    }
    /**
     * @param {?} color
     * @return {?}
     */
    static _transformColor(color) {
        // alpha channel is different, runs from 0-255 but in ol3 from 0-1
        return [color[0], color[1], color[2], color[3] / 255];
    }
    /**
     * @param {?} scale
     * @param {?} units
     * @return {?}
     */
    static _getResolutionForScale(scale, units) {
        /** @type {?} */
        const dpi = 25.4 / 0.28;
        /** @type {?} */
        const mpu = METERS_PER_UNIT[units];
        /** @type {?} */
        const inchesPerMeter = 39.37;
        return parseFloat(scale) / (mpu * inchesPerMeter * dpi);
    }
    /* convert an Esri Text Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    static _convertEsriTS(symbol) {
        /** @type {?} */
        const rotation = EsriStyleGenerator._transformAngle(symbol.angle);
        /** @type {?} */
        const text = symbol.text !== undefined ? symbol.text : undefined;
        return new Style({
            text: new Text({
                fill: new Fill({
                    color: EsriStyleGenerator._transformColor(symbol.color)
                }),
                font: symbol.font.style +
                    ' ' +
                    symbol.font.weight +
                    ' ' +
                    symbol.font.size +
                    ' px ' +
                    symbol.font.family,
                textBaseline: symbol.verticalAlignment,
                textAlign: symbol.horizontalAlignment,
                offsetX: EsriStyleGenerator._convertPointToPixel(symbol.xoffset),
                offsetY: EsriStyleGenerator._convertPointToPixel(symbol.yoffset),
                rotation,
                text
            })
        });
    }
    /* convert an Esri Picture Marker Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    static _convertEsriPMS(symbol) {
        /** @type {?} */
        const src = 'data:' + symbol.contentType + ';base64, ' + symbol.imageData;
        /** @type {?} */
        const rotation = EsriStyleGenerator._transformAngle(symbol.angle);
        return new Style({
            image: new Icon({
                src,
                rotation
            })
        });
    }
    /* convert an Esri Simple Fill Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    static _convertEsriSFS(symbol) {
        // there is no support in openlayers currently for fill patterns, so style is not interpreted
        /** @type {?} */
        const fill = new Fill({
            color: EsriStyleGenerator._transformColor(symbol.color)
        });
        /** @type {?} */
        const stroke = symbol.outline
            ? EsriStyleGenerator._convertOutline(symbol.outline)
            : undefined;
        return new Style({
            fill,
            stroke
        });
    }
    /**
     * @param {?} outline
     * @return {?}
     */
    static _convertOutline(outline) {
        /** @type {?} */
        let lineDash;
        /** @type {?} */
        const color = EsriStyleGenerator._transformColor(outline.color);
        if (outline.style === 'esriSLSDash') {
            lineDash = [5];
        }
        else if (outline.style === 'esriSLSDashDot') {
            lineDash = [5, 5, 1, 2];
        }
        else if (outline.style === 'esriSLSDashDotDot') {
            lineDash = [5, 5, 1, 2, 1, 2];
        }
        else if (outline.style === 'esriSLSDot') {
            lineDash = [1, 2];
        }
        else if (outline.style === 'esriSLSNull') {
            // line not visible, make color fully transparent
            color[3] = 0;
        }
        return new Stroke({
            color,
            lineDash,
            width: EsriStyleGenerator._convertPointToPixel(outline.width)
        });
    }
    /* convert an Esri Simple Line Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    static _convertEsriSLS(symbol) {
        return new Style({
            stroke: EsriStyleGenerator._convertOutline(symbol)
        });
    }
    /**
     * @param {?} angle
     * @return {?}
     */
    static _transformAngle(angle) {
        if (angle === 0 || angle === undefined) {
            return undefined;
        }
        /** @type {?} */
        const normalRad = (angle * Math.PI) / 180;
        /** @type {?} */
        const ol3Rad = -normalRad + Math.PI / 2;
        if (ol3Rad < 0) {
            return 2 * Math.PI + ol3Rad;
        }
        else {
            return ol3Rad;
        }
    }
    /* convert an Esri Simple Marker Symbol */
    /**
     * @param {?} symbol
     * @return {?}
     */
    static _convertEsriSMS(symbol) {
        /** @type {?} */
        const fill = new Fill({
            color: EsriStyleGenerator._transformColor(symbol.color)
        });
        /** @type {?} */
        const stroke = symbol.outline
            ? EsriStyleGenerator._convertOutline(symbol.outline)
            : undefined;
        /** @type {?} */
        const radius = EsriStyleGenerator._convertPointToPixel(symbol.size) / 2;
        /** @type {?} */
        const rotation = EsriStyleGenerator._transformAngle(symbol.angle);
        if (symbol.style === 'esriSMSCircle') {
            return new Style({
                image: new Circle({
                    radius,
                    fill,
                    stroke
                })
            });
        }
        else if (symbol.style === 'esriSMSCross') {
            return new Style({
                image: new RegularShape({
                    fill,
                    stroke,
                    points: 4,
                    radius,
                    radius2: 0,
                    angle: 0,
                    rotation
                })
            });
        }
        else if (symbol.style === 'esriSMSDiamond') {
            return new Style({
                image: new RegularShape({
                    fill,
                    stroke,
                    points: 4,
                    radius,
                    rotation
                })
            });
        }
        else if (symbol.style === 'esriSMSSquare') {
            return new Style({
                image: new RegularShape({
                    fill,
                    stroke,
                    points: 4,
                    radius,
                    angle: Math.PI / 4,
                    rotation
                })
            });
        }
        else if (symbol.style === 'esriSMSX') {
            return new Style({
                image: new RegularShape({
                    fill,
                    stroke,
                    points: 4,
                    radius,
                    radius2: 0,
                    angle: Math.PI / 4,
                    rotation
                })
            });
        }
        else if (symbol.style === 'esriSMSTriangle') {
            return new Style({
                image: new RegularShape({
                    fill,
                    stroke,
                    points: 3,
                    radius,
                    angle: 0,
                    rotation
                })
            });
        }
    }
    /**
     * @param {?} labelingInfo
     * @param {?} mapUnits
     * @return {?}
     */
    _convertLabelingInfo(labelingInfo, mapUnits) {
        /** @type {?} */
        const styles = [];
        for (let i = 0, ii = labelingInfo.length; i < ii; ++i) {
            /** @type {?} */
            const labelExpression = labelingInfo[i].labelExpression;
            // only limited support for label expressions
            /** @type {?} */
            const field = labelExpression.substr(labelExpression.indexOf('[') + 1, labelExpression.indexOf(']') - 1);
            /** @type {?} */
            const symbol = labelingInfo[i].symbol;
            /** @type {?} */
            const maxScale = labelingInfo[i].maxScale;
            /** @type {?} */
            const minScale = labelingInfo[i].minScale;
            /** @type {?} */
            let minResolution = null;
            if (maxScale !== 0) {
                minResolution = EsriStyleGenerator._getResolutionForScale(maxScale, mapUnits);
            }
            /** @type {?} */
            let maxResolution = null;
            if (minScale !== 0) {
                maxResolution = EsriStyleGenerator._getResolutionForScale(minScale, mapUnits);
            }
            /** @type {?} */
            const style$$1 = this._converters[symbol.type].call(this, symbol);
            styles.push(((/**
             * @return {?}
             */
            () => {
                return (/**
                 * @param {?} feature
                 * @param {?} resolution
                 * @return {?}
                 */
                function (feature, resolution) {
                    /** @type {?} */
                    let visible = true;
                    if (this.minResolution !== null && this.maxResolution !== null) {
                        visible =
                            resolution < this.maxResolution &&
                                resolution >= this.minResolution;
                    }
                    else if (this.minResolution !== null) {
                        visible = resolution >= this.minResolution;
                    }
                    else if (this.maxResolution !== null) {
                        visible = resolution < this.maxResolution;
                    }
                    if (visible) {
                        /** @type {?} */
                        const value = feature.get(this.field);
                        this.style.getText().setText(value);
                        return [this.style];
                    }
                });
            }))().bind({
                minResolution,
                maxResolution,
                field,
                style: style$$1
            }));
        }
        return styles;
    }
    /**
     * @param {?} renderer
     * @return {?}
     */
    _renderSimple(renderer) {
        /** @type {?} */
        const style$$1 = this._converters[renderer.symbol.type].call(this, renderer.symbol);
        return ((/**
         * @return {?}
         */
        () => {
            return (/**
             * @return {?}
             */
            () => {
                return [style$$1];
            });
        }))();
    }
    /**
     * @param {?} renderer
     * @return {?}
     */
    _renderClassBreaks(renderer) {
        /** @type {?} */
        const defaultSymbol = renderer.defaultSymbol;
        /** @type {?} */
        const defaultStyle = this._converters[defaultSymbol.type].call(this, defaultSymbol);
        /** @type {?} */
        const field = renderer.field;
        /** @type {?} */
        const classes = [];
        for (let i = 0, ii = renderer.classBreakInfos.length; i < ii; ++i) {
            /** @type {?} */
            const classBreakInfo = renderer.classBreakInfos[i];
            /** @type {?} */
            let min;
            if (classBreakInfo.classMinValue === null ||
                classBreakInfo.classMinValue === undefined) {
                if (i === 0) {
                    min = renderer.minValue;
                }
                else {
                    min = renderer.classBreakInfos[i - 1].classMaxValue;
                }
            }
            else {
                min = classBreakInfo.classMinValue;
            }
            /** @type {?} */
            const max = classBreakInfo.classMaxValue;
            /** @type {?} */
            const symbol = classBreakInfo.symbol;
            /** @type {?} */
            const style$$1 = this._converters[symbol.type].call(this, symbol);
            classes.push({ min, max, style: style$$1 });
        }
        return ((/**
         * @return {?}
         */
        () => {
            return (/**
             * @param {?} feature
             * @return {?}
             */
            (feature) => {
                /** @type {?} */
                const value = feature.get(field);
                for (let i = 0, ii = classes.length; i < ii; ++i) {
                    /** @type {?} */
                    let condition;
                    if (i === 0) {
                        condition = value >= classes[i].min && value <= classes[i].max;
                    }
                    else {
                        condition = value > classes[i].min && value <= classes[i].max;
                    }
                    if (condition) {
                        return [classes[i].style];
                    }
                }
                return [defaultStyle];
            });
        }))();
    }
    /**
     * @param {?} renderer
     * @return {?}
     */
    _renderUniqueValue(renderer) {
        /** @type {?} */
        const defaultSymbol = renderer.defaultSymbol;
        /** @type {?} */
        let defaultStyle = [];
        if (defaultSymbol) {
            defaultStyle = [
                this._converters[defaultSymbol.type].call(this, defaultSymbol)
            ];
        }
        /** @type {?} */
        const field = renderer.field1;
        /** @type {?} */
        const infos = renderer.uniqueValueInfos;
        /** @type {?} */
        const me = this;
        return ((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const hash = {};
            for (let i = 0, ii = infos.length; i < ii; ++i) {
                /** @type {?} */
                const info = infos[i];
                /** @type {?} */
                const symbol = info.symbol;
                hash[info.value] = [me._converters[symbol.type].call(me, symbol)];
            }
            return (/**
             * @param {?} feature
             * @return {?}
             */
            (feature) => {
                /** @type {?} */
                const style$$1 = hash[feature.get(field)];
                return style$$1 ? style$$1 : defaultStyle;
            });
        }))();
    }
    /**
     * @param {?} layerInfo
     * @param {?} mapUnits
     * @return {?}
     */
    generateStyle(layerInfo, mapUnits) {
        /** @type {?} */
        const drawingInfo = layerInfo.drawingInfo;
        /** @type {?} */
        let styleFunctions = [];
        /** @type {?} */
        const drawingInfoStyle = this._renderers[drawingInfo.renderer.type].call(this, drawingInfo.renderer);
        if (drawingInfoStyle !== undefined) {
            styleFunctions.push(drawingInfoStyle);
        }
        if (layerInfo.labelingInfo) {
            /** @type {?} */
            const labelingInfoStyleFunctions = this._convertLabelingInfo(layerInfo.labelingInfo, mapUnits);
            styleFunctions = styleFunctions.concat(labelingInfoStyleFunctions);
        }
        if (styleFunctions.length === 1) {
            return styleFunctions[0];
        }
        else {
            return ((/**
             * @return {?}
             */
            () => {
                return (/**
                 * @param {?} feature
                 * @param {?} resolution
                 * @return {?}
                 */
                (feature, resolution) => {
                    /** @type {?} */
                    let styles = [];
                    for (let i = 0, ii = styleFunctions.length; i < ii; ++i) {
                        /** @type {?} */
                        const result = styleFunctions[i].call(null, feature, resolution);
                        if (result) {
                            styles = styles.concat(result);
                        }
                    }
                    return styles;
                });
            }))();
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CapabilitiesService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.capabilitiesStore = [];
        this.parsers = {
            wms: new WMSCapabilities(),
            wmts: new WMTSCapabilities()
        };
    }
    /**
     * @param {?} baseOptions
     * @return {?}
     */
    getWMSOptions(baseOptions) {
        /** @type {?} */
        const url = baseOptions.url;
        /** @type {?} */
        const version = ((/** @type {?} */ (baseOptions.params))).version;
        return this.getCapabilities('wms', url, version).pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        (capabilities) => this.parseWMSOptions(baseOptions, capabilities))));
    }
    /**
     * @param {?} baseOptions
     * @return {?}
     */
    getWMTSOptions(baseOptions) {
        /** @type {?} */
        const url = baseOptions.url;
        /** @type {?} */
        const version = baseOptions.version;
        /** @type {?} */
        const options = this.getCapabilities('wmts', url, version).pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        (capabilities) => this.parseWMTSOptions(baseOptions, capabilities))));
        return options;
    }
    /**
     * @param {?} baseOptions
     * @return {?}
     */
    getCartoOptions(baseOptions) {
        /** @type {?} */
        const baseUrl = 'https://' +
            baseOptions.account +
            '.carto.com/api/v2/viz/' +
            baseOptions.mapId +
            '/viz.json';
        return this.http
            .jsonp(baseUrl, 'callback')
            .pipe(map((/**
         * @param {?} cartoOptions
         * @return {?}
         */
        (cartoOptions) => this.parseCartoOptions(baseOptions, cartoOptions))));
    }
    /**
     * @param {?} baseOptions
     * @return {?}
     */
    getArcgisOptions(baseOptions) {
        /** @type {?} */
        const baseUrl = baseOptions.url + '/' + baseOptions.layer + '?f=json';
        /** @type {?} */
        const modifiedUrl = baseOptions.url.replace('FeatureServer', 'MapServer');
        /** @type {?} */
        const legendUrl = modifiedUrl + '/legend?f=json';
        /** @type {?} */
        const arcgisOptions = this.http.get(baseUrl);
        /** @type {?} */
        const legend = this.http.get(legendUrl).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => res)), catchError((/**
         * @param {?} err
         * @return {?}
         */
        err => {
            console.log('No legend associated with this Feature Service');
            return of(err);
        })));
        return forkJoin([arcgisOptions, legend]).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            return this.parseArcgisOptions(baseOptions, res[0], res[1]);
        })));
    }
    /**
     * @param {?} baseOptions
     * @return {?}
     */
    getTileArcgisOptions(baseOptions) {
        /** @type {?} */
        const baseUrl = baseOptions.url + '/' + baseOptions.layer + '?f=json';
        /** @type {?} */
        const legendUrl = baseOptions.url + '/legend?f=json';
        /** @type {?} */
        const arcgisOptions = this.http.get(baseUrl);
        /** @type {?} */
        const legendInfo = this.http.get(legendUrl);
        return forkJoin([arcgisOptions, legendInfo]).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => this.parseTileArcgisOptions(baseOptions, res[0], res[1]))));
    }
    /**
     * @param {?} service
     * @param {?} baseUrl
     * @param {?=} version
     * @return {?}
     */
    getCapabilities(service, baseUrl, version) {
        /** @type {?} */
        const params = new HttpParams({
            fromObject: {
                request: 'GetCapabilities',
                service,
                version: version || '1.3.0'
            }
        });
        /** @type {?} */
        const request = this.http.get(baseUrl, {
            params,
            responseType: 'text'
        });
        return request.pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            /** @type {?} */
            const capabilities = this.parsers[service].read(res);
            return capabilities;
        })));
    }
    /**
     * @private
     * @param {?} baseOptions
     * @param {?} capabilities
     * @return {?}
     */
    parseWMSOptions(baseOptions, capabilities) {
        /** @type {?} */
        const layers = ((/** @type {?} */ (baseOptions.params))).layers;
        /** @type {?} */
        const layer = this.findDataSourceInCapabilities(capabilities.Capability.Layer, layers);
        if (!layer) {
            return baseOptions;
        }
        /** @type {?} */
        const metadata = layer.DataURL ? layer.DataURL[0] : undefined;
        /** @type {?} */
        const abstract = layer.Abstract ? layer.Abstract : undefined;
        /** @type {?} */
        const keywordList = layer.KeywordList ? layer.KeywordList : undefined;
        /** @type {?} */
        const queryable = layer.queryable;
        /** @type {?} */
        const timeFilter = this.getTimeFilter(layer);
        /** @type {?} */
        const timeFilterable = timeFilter && Object.keys(timeFilter).length > 0;
        /** @type {?} */
        const options = ObjectUtils.removeUndefined({
            _layerOptionsFromCapabilities: {
                title: layer.Title,
                maxResolution: getResolutionFromScale(layer.MaxScaleDenominator) || Infinity,
                minResolution: getResolutionFromScale(layer.MinScaleDenominator) || 0,
                metadata: {
                    url: metadata ? metadata.OnlineResource : undefined,
                    extern: metadata ? true : undefined,
                    abstract,
                    keywordList
                }
            },
            queryable,
            timeFilter: timeFilterable ? timeFilter : undefined,
            timeFilterable: timeFilterable ? true : undefined
        });
        return ObjectUtils.mergeDeep(options, baseOptions);
    }
    /**
     * @private
     * @param {?} baseOptions
     * @param {?} capabilities
     * @return {?}
     */
    parseWMTSOptions(baseOptions, capabilities) {
        /** @type {?} */
        const options = optionsFromCapabilities(capabilities, baseOptions);
        return Object.assign(options, baseOptions);
    }
    /**
     * @private
     * @param {?} baseOptions
     * @param {?} cartoOptions
     * @return {?}
     */
    parseCartoOptions(baseOptions, cartoOptions) {
        /** @type {?} */
        const layers = [];
        /** @type {?} */
        const params = cartoOptions.layers[1].options.layer_definition;
        params.layers.forEach((/**
         * @param {?} element
         * @return {?}
         */
        element => {
            layers.push({
                type: element.type.toLowerCase(),
                options: element.options,
                legend: element.legend
            });
        }));
        /** @type {?} */
        const options = ObjectUtils.removeUndefined({
            config: {
                version: params.version,
                layers
            }
        });
        return ObjectUtils.mergeDeep(options, baseOptions);
    }
    /**
     * @private
     * @param {?} baseOptions
     * @param {?} arcgisOptions
     * @param {?=} legend
     * @return {?}
     */
    parseArcgisOptions(baseOptions, arcgisOptions, legend) {
        /** @type {?} */
        const legendInfo = legend.layers ? legend : undefined;
        /** @type {?} */
        const styleGenerator = new EsriStyleGenerator();
        /** @type {?} */
        const units = arcgisOptions.units === 'esriMeters' ? 'm' : 'degrees';
        /** @type {?} */
        const style$$1 = styleGenerator.generateStyle(arcgisOptions, units);
        /** @type {?} */
        const attributions = new olAttribution({
            html: arcgisOptions.copyrightText
        });
        /** @type {?} */
        let timeExtent;
        /** @type {?} */
        let timeFilter;
        if (arcgisOptions.timeInfo) {
            /** @type {?} */
            const time = arcgisOptions.timeInfo.timeExtent;
            timeExtent = time[0] + ',' + time[1];
            /** @type {?} */
            const min = new Date();
            min.setTime(time[0]);
            /** @type {?} */
            const max = new Date();
            max.setTime(time[1]);
            timeFilter = {
                min: min.toUTCString(),
                max: max.toUTCString(),
                range: true,
                type: 'datetime',
                style: 'calendar'
            };
        }
        /** @type {?} */
        const params = Object.assign({}, {
            legendInfo,
            style: style$$1,
            timeFilter,
            timeExtent,
            attributions
        });
        /** @type {?} */
        const options = ObjectUtils.removeUndefined({
            params
        });
        return ObjectUtils.mergeDeep(options, baseOptions);
    }
    /**
     * @private
     * @param {?} baseOptions
     * @param {?} arcgisOptions
     * @param {?} legend
     * @return {?}
     */
    parseTileArcgisOptions(baseOptions, arcgisOptions, legend) {
        /** @type {?} */
        const legendInfo = legend.layers ? legend : undefined;
        /** @type {?} */
        const attributions = new olAttribution({
            html: arcgisOptions.copyrightText
        });
        /** @type {?} */
        let timeExtent;
        /** @type {?} */
        let timeFilter;
        if (arcgisOptions.timeInfo) {
            /** @type {?} */
            const time = arcgisOptions.timeInfo.timeExtent;
            timeExtent = time[0] + ',' + time[1];
            /** @type {?} */
            const min = new Date();
            min.setTime(time[0]);
            /** @type {?} */
            const max = new Date();
            max.setTime(time[1]);
            timeFilter = {
                min: min.toUTCString(),
                max: max.toUTCString(),
                range: true,
                type: 'datetime',
                style: 'calendar'
            };
        }
        /** @type {?} */
        const params = Object.assign({}, {
            layers: 'show:' + baseOptions.layer,
            time: timeExtent
        });
        /** @type {?} */
        const options = ObjectUtils.removeUndefined({
            params,
            legendInfo,
            timeFilter,
            attributions
        });
        return ObjectUtils.mergeDeep(options, baseOptions);
    }
    /**
     * @private
     * @param {?} layerArray
     * @param {?} name
     * @return {?}
     */
    findDataSourceInCapabilities(layerArray, name) {
        if (Array.isArray(layerArray)) {
            /** @type {?} */
            let layer;
            layerArray.find((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                layer = this.findDataSourceInCapabilities(value, name);
                return layer !== undefined;
            }), this);
            return layer;
        }
        else if (layerArray.Layer) {
            return this.findDataSourceInCapabilities(layerArray.Layer, name);
        }
        else {
            if (layerArray.Name && layerArray.Name === name) {
                return layerArray;
            }
            return undefined;
        }
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    getTimeFilter(layer) {
        /** @type {?} */
        let dimension;
        if (layer.Dimension) {
            /** @type {?} */
            const timeFilter = {};
            dimension = layer.Dimension[0];
            if (dimension.values) {
                /** @type {?} */
                const minMaxDim = dimension.values.split('/');
                timeFilter.min = minMaxDim[0] !== undefined ? minMaxDim[0] : undefined;
                timeFilter.max = minMaxDim[1] !== undefined ? minMaxDim[1] : undefined;
                timeFilter.step = minMaxDim[2] !== undefined ? minMaxDim[2] : undefined;
            }
            if (dimension.default) {
                timeFilter.value = dimension.default;
            }
            return timeFilter;
        }
    }
}
CapabilitiesService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
CapabilitiesService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ CapabilitiesService.ngInjectableDef = defineInjectable({ factory: function CapabilitiesService_Factory() { return new CapabilitiesService(inject(HttpClient)); }, token: CapabilitiesService, providedIn: "root" });
__decorate([
    Cacheable(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Observable)
], CapabilitiesService.prototype, "getCapabilities", null);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DataSourceService {
    /**
     * @param {?} capabilitiesService
     * @param {?} wfsDataSourceService
     */
    constructor(capabilitiesService, wfsDataSourceService) {
        this.capabilitiesService = capabilitiesService;
        this.wfsDataSourceService = wfsDataSourceService;
        this.datasources$ = new BehaviorSubject([]);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    createAsyncDataSource(context) {
        if (!context.type) {
            console.error(context);
            throw new Error('Datasource needs a type');
        }
        /** @type {?} */
        let dataSource;
        switch (context.type.toLowerCase()) {
            case 'osm':
                dataSource = this.createOSMDataSource((/** @type {?} */ (context)));
                break;
            case 'vector':
                dataSource = this.createFeatureDataSource((/** @type {?} */ (context)));
                break;
            case 'wfs':
                dataSource = this.createWFSDataSource((/** @type {?} */ (context)));
                break;
            case 'wms':
                dataSource = this.createWMSDataSource((/** @type {?} */ (context)));
                break;
            case 'wmts':
                dataSource = this.createWMTSDataSource((/** @type {?} */ (context)));
                break;
            case 'xyz':
                dataSource = this.createXYZDataSource((/** @type {?} */ (context)));
                break;
            case 'carto':
                dataSource = this.createCartoDataSource((/** @type {?} */ (context)));
                break;
            case 'arcgisrest':
                dataSource = this.createArcGISRestDataSource((/** @type {?} */ (context)));
                break;
            case 'websocket':
                dataSource = this.createWebSocketDataSource((/** @type {?} */ (context)));
                break;
            case 'mvt':
                dataSource = this.createMVTDataSource((/** @type {?} */ (context)));
                break;
            case 'tilearcgisrest':
                dataSource = this.createTileArcGISRestDataSource((/** @type {?} */ (context)));
                break;
            case 'cluster':
                dataSource = this.createClusterDataSource((/** @type {?} */ (context)));
                break;
            default:
                console.error(context);
                throw new Error('Invalid datasource type');
        }
        this.datasources$.next(this.datasources$.value.concat([dataSource]));
        return dataSource;
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createOSMDataSource(context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new OSMDataSource(context))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createFeatureDataSource(context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new FeatureDataSource(context))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createWebSocketDataSource(context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new WebSocketDataSource(context))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createWFSDataSource(context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new WFSDataSource(context, this.wfsDataSourceService))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createWMSDataSource(context) {
        if (context.optionsFromCapabilities) {
            return this.capabilitiesService
                .getWMSOptions(context)
                .pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            (options) => new WMSDataSource(options, this.wfsDataSourceService))));
        }
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new WMSDataSource(context, this.wfsDataSourceService))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createWMTSDataSource(context) {
        if (context.optionsFromCapabilities) {
            return this.capabilitiesService
                .getWMTSOptions(context)
                .pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            (options) => new WMTSDataSource(options))));
        }
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new WMTSDataSource(context))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createXYZDataSource(context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new XYZDataSource(context))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createCartoDataSource(context) {
        if (context.mapId) {
            return this.capabilitiesService
                .getCartoOptions(context)
                .pipe(map((/**
             * @param {?} options
             * @return {?}
             */
            (options) => new CartoDataSource(options))));
        }
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new CartoDataSource(context))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createArcGISRestDataSource(context) {
        return this.capabilitiesService
            .getArcgisOptions(context)
            .pipe(map((/**
         * @param {?} options
         * @return {?}
         */
        (options) => new ArcGISRestDataSource(options))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createTileArcGISRestDataSource(context) {
        return this.capabilitiesService
            .getTileArcgisOptions(context)
            .pipe(map((/**
         * @param {?} options
         * @return {?}
         */
        (options) => new TileArcGISRestDataSource(options))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createMVTDataSource(context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new MVTDataSource(context))));
    }
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    createClusterDataSource(context) {
        return new Observable((/**
         * @param {?} d
         * @return {?}
         */
        d => d.next(new ClusterDataSource(context))));
    }
}
DataSourceService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DataSourceService.ctorParameters = () => [
    { type: CapabilitiesService },
    { type: WFSService }
];
/** @nocollapse */ DataSourceService.ngInjectableDef = defineInjectable({ factory: function DataSourceService_Factory() { return new DataSourceService(inject(CapabilitiesService), inject(WFSService)); }, token: DataSourceService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LayerService {
    /**
     * @param {?} styleService
     * @param {?} dataSourceService
     * @param {?} config
     */
    constructor(styleService, dataSourceService, config) {
        this.styleService = styleService;
        this.dataSourceService = dataSourceService;
        this.config = config;
        if (this.config) {
            this.tokenKey = this.config.getConfig('auth.tokenKey');
        }
    }
    /**
     * @param {?} layerOptions
     * @return {?}
     */
    createLayer(layerOptions) {
        if (!layerOptions.source) {
            return;
        }
        if (layerOptions.source.options &&
            layerOptions.source.options.optionsFromCapabilities) {
            layerOptions = ObjectUtils.mergeDeep(((/** @type {?} */ (layerOptions.source.options)))._layerOptionsFromCapabilities ||
                {}, layerOptions || {});
        }
        /** @type {?} */
        let layer;
        switch (layerOptions.source.constructor) {
            case OSMDataSource:
            case WMTSDataSource:
            case XYZDataSource:
            case CartoDataSource:
            case TileArcGISRestDataSource:
                layer = this.createTileLayer((/** @type {?} */ (layerOptions)));
                break;
            case FeatureDataSource:
            case WFSDataSource:
            case ArcGISRestDataSource:
            case WebSocketDataSource:
            case ClusterDataSource:
                layer = this.createVectorLayer((/** @type {?} */ (layerOptions)));
                break;
            case WMSDataSource:
                layer = this.createImageLayer((/** @type {?} */ (layerOptions)));
                break;
            case MVTDataSource:
                layer = this.createVectorTileLayer((/** @type {?} */ (layerOptions)));
                break;
            default:
                break;
        }
        return layer;
    }
    /**
     * @param {?} layerOptions
     * @return {?}
     */
    createAsyncLayer(layerOptions) {
        if (layerOptions.source) {
            return new Observable((/**
             * @param {?} d
             * @return {?}
             */
            d => d.next(this.createLayer(layerOptions))));
        }
        return this.dataSourceService
            .createAsyncDataSource(layerOptions.sourceOptions)
            .pipe(map((/**
         * @param {?} source
         * @return {?}
         */
        source => {
            layerOptions.source = source;
            return this.createLayer(layerOptions);
        })));
    }
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    createImageLayer(layerOptions) {
        if (this.tokenKey) {
            layerOptions.token = localStorage.getItem(this.tokenKey);
        }
        return new ImageLayer(layerOptions);
    }
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    createTileLayer(layerOptions) {
        return new TileLayer(layerOptions);
    }
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    createVectorLayer(layerOptions) {
        /** @type {?} */
        let style$$1;
        if (layerOptions.style !== undefined) {
            style$$1 = this.styleService.createStyle(layerOptions.style);
        }
        if (layerOptions.source instanceof ArcGISRestDataSource) {
            /** @type {?} */
            const source = (/** @type {?} */ (layerOptions.source));
            style$$1 = source.options.params.style;
        }
        else if (layerOptions.styleByAttribute) {
            /** @type {?} */
            const serviceStyle = this.styleService;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            feature => {
                return serviceStyle.createStyleByAttribute(feature, layerOptions.styleByAttribute);
            });
            return new VectorLayer(layerOptions);
        }
        if (layerOptions.source instanceof ClusterDataSource) {
            /** @type {?} */
            const serviceStyle = this.styleService;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            feature => {
                return serviceStyle.createClusterStyle(feature, layerOptions.clusterParam);
            });
            return new VectorLayer(layerOptions);
        }
        /** @type {?} */
        const layerOptionsOl = Object.assign({}, layerOptions, {
            style: style$$1
        });
        return new VectorLayer(layerOptionsOl);
    }
    /**
     * @private
     * @param {?} layerOptions
     * @return {?}
     */
    createVectorTileLayer(layerOptions) {
        /** @type {?} */
        let style$$1;
        if (layerOptions.style !== undefined) {
            style$$1 = this.styleService.createStyle(layerOptions.style);
        }
        if (layerOptions.styleByAttribute) {
            /** @type {?} */
            const serviceStyle = this.styleService;
            layerOptions.style = (/**
             * @param {?} feature
             * @return {?}
             */
            feature => {
                return serviceStyle.createStyleByAttribute(feature, layerOptions.styleByAttribute);
            });
            return new VectorTileLayer(layerOptions);
        }
        /** @type {?} */
        const layerOptionsOl = Object.assign({}, layerOptions, {
            style: style$$1
        });
        return new VectorTileLayer(layerOptionsOl);
    }
}
LayerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LayerService.ctorParameters = () => [
    { type: StyleService },
    { type: DataSourceService },
    { type: ConfigService, decorators: [{ type: Optional }] }
];
/** @nocollapse */ LayerService.ngInjectableDef = defineInjectable({ factory: function LayerService_Factory() { return new LayerService(inject(StyleService), inject(DataSourceService), inject(ConfigService, 8)); }, token: LayerService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const CatalogItemType = {
    Layer: 'layer',
    Group: 'group',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class QueryService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.queryEnabled = true;
    }
    /**
     * @param {?} layers
     * @param {?} options
     * @return {?}
     */
    query(layers, options) {
        return layers
            .filter((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer.visible && layer.isInResolutionsRange))
            .map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => this.queryLayer(layer, options)));
    }
    /**
     * @param {?} layer
     * @param {?} options
     * @return {?}
     */
    queryLayer(layer, options) {
        /** @type {?} */
        const url = this.getQueryUrl(layer.dataSource, options);
        if (!url) {
            return of([]);
        }
        if (((/** @type {?} */ (layer.dataSource))).options.queryFormat === QueryFormat.HTMLGML2) {
            /** @type {?} */
            const urlGml = this.getQueryUrl(layer.dataSource, options, true);
            return this.http.get(urlGml, { responseType: 'text' })
                .pipe(mergeMap((/**
             * @param {?} gmlRes
             * @return {?}
             */
            gmlRes => {
                /** @type {?} */
                const imposedGeom = this.mergeGML(gmlRes, url);
                return this.http.get(url, { responseType: 'text' })
                    .pipe(map(((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => this.extractData(res, layer, options, url, imposedGeom)))));
            })));
        }
        /** @type {?} */
        const request = this.http.get(url, { responseType: 'text' });
        return request.pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => this.extractData(res, layer, options, url))));
    }
    /**
     * @private
     * @param {?} gmlRes
     * @param {?} url
     * @return {?}
     */
    mergeGML(gmlRes, url) {
        /** @type {?} */
        let parser = new olFormatGML2();
        /** @type {?} */
        let features = parser.readFeatures(gmlRes);
        // Handle non standard GML output (MapServer)
        if (features.length === 0) {
            parser = new WMSGetFeatureInfo();
            features = parser.readFeatures(gmlRes);
        }
        /** @type {?} */
        const olmline = new MultiLineString([]);
        /** @type {?} */
        let pts;
        /** @type {?} */
        const ptsArray = [];
        /** @type {?} */
        let olmpoly = new MultiPolygon([]);
        /** @type {?} */
        let firstFeatureType;
        /** @type {?} */
        const nbFeatures = features.length;
        // Check if geometry intersect bbox
        // for geoserver getfeatureinfo response in data projection, not call projection
        /** @type {?} */
        const searchParams = this.getQueryParams(url.toLowerCase());
        /** @type {?} */
        const bboxRaw = searchParams.bbox;
        /** @type {?} */
        const bbox$$1 = bboxRaw.split(',');
        /** @type {?} */
        const bboxExtent = createEmpty();
        extend(bboxExtent, bbox$$1);
        /** @type {?} */
        const outBboxExtent = false;
        features.map((/**
         * @param {?} feature
         * @return {?}
         */
        feature => {
            /*  if (!feature.getGeometry().simplify(100).intersectsExtent(bboxExtent)) {
                    outBboxExtent = true;
                    // TODO: Check to project the geometry?
                  }*/
            /** @type {?} */
            const featureGeometryCoordinates = feature.getGeometry().getCoordinates();
            /** @type {?} */
            const featureGeometryType = feature.getGeometry().getType();
            if (!firstFeatureType && !outBboxExtent) {
                firstFeatureType = featureGeometryType;
            }
            {
                switch (featureGeometryType) {
                    case 'Point':
                        if (nbFeatures === 1) {
                            pts = new Point(featureGeometryCoordinates, 'XY');
                        }
                        else {
                            ptsArray.push(featureGeometryCoordinates);
                        }
                        break;
                    case 'LineString':
                        olmline.appendLineString(new LineString(featureGeometryCoordinates, 'XY'));
                        break;
                    case 'Polygon':
                        olmpoly.appendPolygon(new Polygon(featureGeometryCoordinates, 'XY'));
                        break;
                    case 'MultiPolygon':
                        olmpoly = new MultiPolygon(featureGeometryCoordinates, 'XY');
                        break;
                    default:
                        return;
                }
            }
        }));
        /** @type {?} */
        let olmpts;
        if (ptsArray.length === 0 && pts) {
            olmpts = {
                type: pts.getType(),
                coordinates: pts.getCoordinates()
            };
        }
        else {
            olmpts = {
                type: 'Polygon',
                coordinates: [this.convexHull(ptsArray)]
            };
        }
        switch (firstFeatureType) {
            case 'LineString':
                return {
                    type: olmline.getType(),
                    coordinates: olmline.getCoordinates()
                };
            case 'Point':
                return olmpts;
            case 'Polygon':
                return {
                    type: olmpoly.getType(),
                    coordinates: olmpoly.getCoordinates()
                };
            case 'MultiPolygon':
                return {
                    type: olmpoly.getType(),
                    coordinates: olmpoly.getCoordinates()
                };
            default:
                return;
        }
    }
    /**
     * @param {?} a
     * @param {?} b
     * @param {?} o
     * @return {?}
     */
    cross(a, b, o) {
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    }
    /**
     * @param {?} points An array of [X, Y] coordinates
     * This method is use instead of turf.js convexHull because Turf needs at least 3 point to make a hull.
     * https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
     * @return {?}
     */
    convexHull(points) {
        points.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => {
            return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
        }));
        /** @type {?} */
        const lower = [];
        for (const point of points) {
            while (lower.length >= 2 && this.cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
                lower.pop();
            }
            lower.push(point);
        }
        /** @type {?} */
        const upper = [];
        for (let i = points.length - 1; i >= 0; i--) {
            while (upper.length >= 2 && this.cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
                upper.pop();
            }
            upper.push(points[i]);
        }
        upper.pop();
        lower.pop();
        return lower.concat(upper);
    }
    /**
     * @private
     * @param {?} res
     * @param {?} layer
     * @param {?} options
     * @param {?} url
     * @param {?=} imposedGeometry
     * @return {?}
     */
    extractData(res, layer, options, url, imposedGeometry) {
        /** @type {?} */
        const queryDataSource = (/** @type {?} */ (layer.dataSource));
        /** @type {?} */
        let allowedFieldsAndAlias;
        if (layer.options &&
            layer.options.sourceOptions &&
            layer.options.sourceOptions.sourceFields &&
            layer.options.sourceOptions.sourceFields.length >= 1) {
            allowedFieldsAndAlias = {};
            layer.options.sourceOptions.sourceFields.forEach((/**
             * @param {?} sourceField
             * @return {?}
             */
            sourceField => {
                /** @type {?} */
                const alias = sourceField.alias ? sourceField.alias : sourceField.name;
                allowedFieldsAndAlias[sourceField.name] = alias;
            }));
        }
        /** @type {?} */
        let features = [];
        switch (queryDataSource.options.queryFormat) {
            case QueryFormat.GML3:
                features = this.extractGML3Data(res, layer.zIndex, allowedFieldsAndAlias);
                break;
            case QueryFormat.JSON:
            case QueryFormat.GEOJSON:
                features = this.extractGeoJSONData(res);
                break;
            case QueryFormat.ESRIJSON:
                features = this.extractEsriJSONData(res, layer.zIndex);
                break;
            case QueryFormat.TEXT:
                features = this.extractTextData(res);
                break;
            case QueryFormat.HTML:
                features = this.extractHtmlData(res, queryDataSource.queryHtmlTarget, url);
                break;
            case QueryFormat.HTMLGML2:
                features = this.extractHtmlData(res, queryDataSource.queryHtmlTarget, url, imposedGeometry);
                break;
            case QueryFormat.GML2:
            default:
                features = this.extractGML2Data(res, layer, allowedFieldsAndAlias);
                break;
        }
        return features.map((/**
         * @param {?} feature
         * @param {?} index
         * @return {?}
         */
        (feature, index) => {
            /** @type {?} */
            let title = feature.properties[queryDataSource.queryTitle];
            if (!title && features.length > 1) {
                title = `${layer.title} (${index + 1})`;
            }
            else if (!title) {
                title = layer.title;
            }
            /** @type {?} */
            const meta = Object.assign({}, feature.meta || {}, {
                id: uuid(),
                title,
                mapTitle: title,
                sourceTitle: layer.title,
                order: 1000 - layer.zIndex
            });
            return Object.assign(feature, {
                meta,
                projection: queryDataSource.options.type === 'carto'
                    ? 'EPSG:4326'
                    : options.projection
            });
        }));
    }
    /**
     * @private
     * @param {?} res
     * @param {?} zIndex
     * @param {?=} allowedFieldsAndAlias
     * @return {?}
     */
    extractGML2Data(res, zIndex, allowedFieldsAndAlias) {
        /** @type {?} */
        let parser = new olFormatGML2();
        /** @type {?} */
        let features = parser.readFeatures(res);
        // Handle non standard GML output (MapServer)
        if (features.length === 0) {
            parser = new WMSGetFeatureInfo();
            features = parser.readFeatures(res);
        }
        return features.map((/**
         * @param {?} feature
         * @return {?}
         */
        feature => this.featureToResult(feature, zIndex, allowedFieldsAndAlias)));
    }
    /**
     * @private
     * @param {?} res
     * @param {?} zIndex
     * @param {?=} allowedFieldsAndAlias
     * @return {?}
     */
    extractGML3Data(res, zIndex, allowedFieldsAndAlias) {
        /** @type {?} */
        const parser = new olFormatGML3();
        /** @type {?} */
        const features = parser.readFeatures(res);
        return features.map((/**
         * @param {?} feature
         * @return {?}
         */
        feature => this.featureToResult(feature, zIndex, allowedFieldsAndAlias)));
    }
    /**
     * @private
     * @param {?} res
     * @return {?}
     */
    extractGeoJSONData(res) {
        /** @type {?} */
        let features = [];
        try {
            features = JSON.parse(res).features;
        }
        catch (e) {
            console.warn('query.service: Unable to parse geojson', '\n', res);
        }
        return features;
    }
    /**
     * @private
     * @param {?} res
     * @param {?} zIndex
     * @return {?}
     */
    extractEsriJSONData(res, zIndex) {
        /** @type {?} */
        const parser = new olFormatEsriJSON();
        /** @type {?} */
        const features = parser.readFeatures(res);
        return features.map((/**
         * @param {?} feature
         * @return {?}
         */
        feature => this.featureToResult(feature, zIndex)));
    }
    /**
     * @private
     * @param {?} res
     * @return {?}
     */
    extractTextData(res) {
        // TODO
        return [];
    }
    /**
     * @private
     * @param {?} res
     * @param {?} htmlTarget
     * @param {?} url
     * @param {?=} imposedGeometry
     * @return {?}
     */
    extractHtmlData(res, htmlTarget, url, imposedGeometry) {
        // _blank , iframe or undefined
        /** @type {?} */
        const searchParams = this.getQueryParams(url.toLowerCase());
        /** @type {?} */
        const bboxRaw = searchParams.bbox;
        /** @type {?} */
        const width = parseInt(searchParams.width, 10);
        /** @type {?} */
        const height = parseInt(searchParams.height, 10);
        /** @type {?} */
        const xPosition = parseInt(searchParams.i || searchParams.x, 10);
        /** @type {?} */
        const yPosition = parseInt(searchParams.j || searchParams.y, 10);
        /** @type {?} */
        const projection = searchParams.crs || searchParams.srs || 'EPSG:3857';
        /** @type {?} */
        const bbox$$1 = bboxRaw.split(',');
        /** @type {?} */
        let threshold = (Math.abs(parseFloat(bbox$$1[0])) - Math.abs(parseFloat(bbox$$1[2]))) * 0.05;
        // for context in degree (EPSG:4326,4269...)
        if (Math.abs(parseFloat(bbox$$1[0])) < 180) {
            threshold = 0.045;
        }
        /** @type {?} */
        const clickx = parseFloat(bbox$$1[0]) +
            (Math.abs(parseFloat(bbox$$1[0]) - parseFloat(bbox$$1[2])) * xPosition) /
                width -
            threshold;
        /** @type {?} */
        const clicky = parseFloat(bbox$$1[1]) +
            (Math.abs(parseFloat(bbox$$1[1]) - parseFloat(bbox$$1[3])) * yPosition) /
                height -
            threshold;
        /** @type {?} */
        const clickx1 = clickx + threshold * 2;
        /** @type {?} */
        const clicky1 = clicky + threshold * 2;
        /** @type {?} */
        const wktPoly = 'POLYGON((' +
            clickx +
            ' ' +
            clicky +
            ', ' +
            clickx +
            ' ' +
            clicky1 +
            ', ' +
            clickx1 +
            ' ' +
            clicky1 +
            ', ' +
            clickx1 +
            ' ' +
            clicky +
            ', ' +
            clickx +
            ' ' +
            clicky +
            '))';
        /** @type {?} */
        const format = new WKT();
        /** @type {?} */
        const tenPercentWidthGeom = format.readFeature(wktPoly);
        /** @type {?} */
        const f = (/** @type {?} */ (tenPercentWidthGeom.getGeometry()));
        if (htmlTarget !== QueryHtmlTarget.BLANK &&
            htmlTarget !== QueryHtmlTarget.IFRAME) {
            htmlTarget = QueryHtmlTarget.IFRAME;
        }
        /** @type {?} */
        const bodyTagStart = res.toLowerCase().indexOf('<body>');
        /** @type {?} */
        const bodyTagEnd = res.toLowerCase().lastIndexOf('</body>') + 7;
        // replace \r \n  and ' ' with '' to validate if the body is really empty.
        /** @type {?} */
        const body = res.slice(bodyTagStart, bodyTagEnd).replace(/(\r|\n|\s)/g, '');
        if (body === '<body></body>' || res === '') {
            return [];
        }
        return [
            {
                type: FEATURE,
                projection,
                properties: { target: htmlTarget, body: res, url },
                geometry: imposedGeometry || { type: f.getType(), coordinates: f.getCoordinates() }
            }
        ];
    }
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    getQueryParams(url) {
        /** @type {?} */
        const queryString = url.split('?');
        if (!queryString[1]) {
            return;
        }
        /** @type {?} */
        const pairs = queryString[1].split('&');
        /** @type {?} */
        const result = {};
        pairs.forEach((/**
         * @param {?} pair
         * @return {?}
         */
        pair => {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        }));
        return result;
    }
    /**
     * @private
     * @param {?} featureOL
     * @param {?} zIndex
     * @param {?=} allowedFieldsAndAlias
     * @return {?}
     */
    featureToResult(featureOL, zIndex, allowedFieldsAndAlias) {
        /** @type {?} */
        const featureGeometry = (/** @type {?} */ (featureOL.getGeometry()));
        /** @type {?} */
        const properties = Object.assign({}, featureOL.getProperties());
        delete properties.geometry;
        delete properties.boundedBy;
        delete properties.shape;
        delete properties.SHAPE;
        delete properties.the_geom;
        /** @type {?} */
        let geometry;
        if (featureGeometry !== undefined) {
            geometry = {
                type: featureGeometry.getType(),
                coordinates: featureGeometry.getCoordinates()
            };
        }
        return {
            type: FEATURE,
            projection: undefined,
            properties,
            geometry,
            meta: {
                id: uuid(),
                order: 1000 - zIndex,
                alias: allowedFieldsAndAlias
            }
        };
    }
    /**
     * @private
     * @param {?} datasource
     * @param {?} options
     * @param {?=} forceGML2
     * @return {?}
     */
    getQueryUrl(datasource, options, forceGML2 = false) {
        /** @type {?} */
        let url;
        switch (datasource.constructor) {
            case WMSDataSource:
                /** @type {?} */
                const wmsDatasource = (/** @type {?} */ (datasource));
                /** @type {?} */
                const WMSGetFeatureInfoOptions = {
                    INFO_FORMAT: wmsDatasource.params.info_format ||
                        this.getMimeInfoFormat(datasource.options.queryFormat),
                    QUERY_LAYERS: wmsDatasource.params.layers,
                    FEATURE_COUNT: wmsDatasource.params.feature_count || '5'
                };
                if (forceGML2) {
                    WMSGetFeatureInfoOptions.INFO_FORMAT =
                        this.getMimeInfoFormat(QueryFormat.GML2);
                }
                url = wmsDatasource.ol.getGetFeatureInfoUrl(options.coordinates, options.resolution, options.projection, WMSGetFeatureInfoOptions);
                if (wmsDatasource.params.version !== '1.3.0') {
                    url = url.replace('&I=', '&X=');
                    url = url.replace('&J=', '&Y=');
                }
                break;
            case CartoDataSource:
                /** @type {?} */
                const cartoDatasource = (/** @type {?} */ (datasource));
                /** @type {?} */
                const baseUrl = 'https://' +
                    cartoDatasource.options.account +
                    '.carto.com/api/v2/sql?';
                /** @type {?} */
                const format = 'format=GeoJSON';
                /** @type {?} */
                const sql = '&q=' + cartoDatasource.options.config.layers[0].options.sql;
                /** @type {?} */
                const clause = ' WHERE ST_Intersects(the_geom_webmercator,ST_BUFFER(ST_SetSRID(ST_POINT(';
                /** @type {?} */
                const meters = cartoDatasource.options.queryPrecision
                    ? cartoDatasource.options.queryPrecision
                    : '1000';
                /** @type {?} */
                const coordinates = options.coordinates[0] +
                    ',' +
                    options.coordinates[1] +
                    '),3857),' +
                    meters +
                    '))';
                url = `${baseUrl}${format}${sql}${clause}${coordinates}`;
                break;
            case TileArcGISRestDataSource:
                /** @type {?} */
                const tileArcGISRestDatasource = (/** @type {?} */ (datasource));
                /** @type {?} */
                let extent = boundingExtent([options.coordinates]);
                if (tileArcGISRestDatasource.options.queryPrecision) {
                    extent = buffer(extent, tileArcGISRestDatasource.options.queryPrecision);
                }
                /** @type {?} */
                const serviceUrl = tileArcGISRestDatasource.options.url +
                    '/' +
                    tileArcGISRestDatasource.options.layer +
                    '/query/';
                /** @type {?} */
                const geometry = encodeURIComponent('{"xmin":' +
                    extent[0] +
                    ',"ymin":' +
                    extent[1] +
                    ',"xmax":' +
                    extent[2] +
                    ',"ymax":' +
                    extent[3] +
                    ',"spatialReference":{"wkid":102100}}');
                /** @type {?} */
                const params = [
                    'f=json',
                    `geometry=${geometry}`,
                    'geometryType=esriGeometryEnvelope',
                    'inSR=102100',
                    'spatialRel=esriSpatialRelIntersects',
                    'outFields=*',
                    'returnGeometry=true',
                    'outSR=102100'
                ];
                url = `${serviceUrl}?${params.join('&')}`;
                break;
            default:
                break;
        }
        return url;
    }
    /**
     * @private
     * @param {?} queryFormat
     * @return {?}
     */
    getMimeInfoFormat(queryFormat) {
        /** @type {?} */
        let mime;
        switch (queryFormat) {
            case QueryFormat.GML2:
                mime = 'application/vnd.ogc.gml';
                break;
            case QueryFormat.GML3:
                mime = 'application/vnd.ogc.gml/3.1.1';
                break;
            case QueryFormat.JSON:
                mime = 'application/json';
                break;
            case QueryFormat.GEOJSON:
                mime = 'application/geojson';
                break;
            case QueryFormat.TEXT:
                mime = 'text/plain';
                break;
            case QueryFormat.HTML:
                mime = 'text/html';
                break;
            case QueryFormat.HTMLGML2:
                mime = 'text/html';
                break;
            default:
                mime = 'application/vnd.ogc.gml';
                break;
        }
        return mime;
    }
}
QueryService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
QueryService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ QueryService.ngInjectableDef = defineInjectable({ factory: function QueryService_Factory() { return new QueryService(inject(HttpClient)); }, token: QueryService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This directive makes a map queryable with a click of with a drag box.
 * By default, all layers are queryable but this cna ben controlled at
 * the layer level.
 */
class QueryDirective {
    /**
     * @param {?} component
     * @param {?} queryService
     */
    constructor(component, queryService) {
        this.component = component;
        this.queryService = queryService;
        /**
         * Subscriptions to ongoing queries
         */
        this.queries$$ = [];
        /**
         * Whter to query features or not
         */
        this.queryFeatures = false;
        /**
         * Feature query hit tolerance
         */
        this.queryFeaturesHitTolerance = 0;
        /**
         * Whether all query should complete before emitting an event
         */
        this.waitForAllQueries = true;
        /**
         * Event emitted when a query (or all queries) complete
         */
        this.query = new EventEmitter();
    }
    /**
     * IGO map
     * \@internal
     * @return {?}
     */
    get map() {
        return (/** @type {?} */ (((/** @type {?} */ (this.component.map)))));
    }
    /**
     * Start listening to click and drag box events
     * \@internal
     * @return {?}
     */
    ngAfterViewInit() {
        this.listenToMapClick();
    }
    /**
     * Stop listening to click and drag box events and cancel ongoind requests
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.cancelOngoingQueries();
        this.unlistenToMapClick();
    }
    /**
     * On map click, issue queries
     * @private
     * @return {?}
     */
    listenToMapClick() {
        this.mapClickListener = this.map.ol.on('singleclick', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onMapEvent(event)));
    }
    /**
     * Stop listenig for map clicks
     * @private
     * @return {?}
     */
    unlistenToMapClick() {
        this.map.ol.un(this.mapClickListener.type, this.mapClickListener.listener);
        this.mapClickListener = undefined;
    }
    /**
     * Issue queries from a map event and emit events with the results
     * @private
     * @param {?} event OL map browser pointer event
     * @return {?}
     */
    onMapEvent(event) {
        this.cancelOngoingQueries();
        if (!this.queryService.queryEnabled) {
            return;
        }
        /** @type {?} */
        const queries$ = [];
        if (this.queryFeatures) {
            queries$.push(this.doQueryFeatures(event));
        }
        /** @type {?} */
        const resolution = this.map.ol.getView().getResolution();
        /** @type {?} */
        const queryLayers = this.map.layers.filter(layerIsQueryable);
        queries$.push(...this.queryService.query(queryLayers, {
            coordinates: event.coordinate,
            projection: this.map.projection,
            resolution
        }));
        if (queries$.length === 0) {
            return;
        }
        if (this.waitForAllQueries) {
            this.queries$$.push(zip(...queries$).subscribe((/**
             * @param {?} results
             * @return {?}
             */
            (results) => {
                /** @type {?} */
                const features = [].concat(...results);
                this.query.emit({ features, event });
            })));
        }
        else {
            this.queries$$ = queries$.map((/**
             * @param {?} query$
             * @return {?}
             */
            (query$) => {
                return query$.subscribe((/**
                 * @param {?} features
                 * @return {?}
                 */
                (features) => {
                    this.query.emit({ features, event });
                }));
            }));
        }
    }
    /**
     * Query features already present on the map
     * @private
     * @param {?} event OL map browser pointer event
     * @return {?}
     */
    doQueryFeatures(event) {
        /** @type {?} */
        let feature;
        /** @type {?} */
        const clickedFeatures = [];
        this.map.ol.forEachFeatureAtPixel(event.pixel, (/**
         * @param {?} featureOL
         * @param {?} layerOL
         * @return {?}
         */
        (featureOL, layerOL) => {
            if (featureOL) {
                if (featureOL.get('features')) {
                    featureOL = featureOL.get('features')[0];
                }
                feature = featureFromOl(featureOL, this.map.projection, layerOL);
                clickedFeatures.push(feature);
            }
            else {
                feature = featureFromOl(featureOL, this.map.projection, layerOL);
                clickedFeatures.push(feature);
            }
        }), {
            hitTolerance: this.queryFeaturesHitTolerance || 0,
            layerFilter: this.queryFeaturesCondition ? this.queryFeaturesCondition : olLayerIsQueryable
        });
        return of(clickedFeatures);
    }
    /**
     * Cancel ongoing requests, if any
     * @private
     * @return {?}
     */
    cancelOngoingQueries() {
        this.queries$$.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
        this.queries$$ = [];
    }
}
QueryDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoQuery]'
            },] }
];
/** @nocollapse */
QueryDirective.ctorParameters = () => [
    { type: MapBrowserComponent, decorators: [{ type: Self }] },
    { type: QueryService }
];
QueryDirective.propDecorators = {
    queryFeatures: [{ type: Input }],
    queryFeaturesHitTolerance: [{ type: Input }],
    queryFeaturesCondition: [{ type: Input }],
    waitForAllQueries: [{ type: Input }],
    query: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Base search source class
 */
class SearchSource {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = Object.assign({}, this.getDefaultOptions(), options);
        // Set Default Params from Settings
        this.settings.forEach((/**
         * @param {?} setting
         * @return {?}
         */
        setting => {
            this.setParamFromSetting(setting);
        }));
    }
    /**
     * Get search source's id
     * @return {?} Search source's id
     */
    getId() {
        throw new Error('You have to implement the method "getId".');
    }
    /**
     * Get search source's default options
     * @protected
     * @return {?} Search source default options
     */
    getDefaultOptions() {
        throw new Error('You have to implement the method "getDefaultOptions".');
    }
    /**
     * Search source's title
     * @return {?}
     */
    get title() {
        return this.options.title;
    }
    /**
     * Whether the search source is available
     * @return {?}
     */
    get available() {
        return this.options.available !== false;
    }
    /**
     * Whether the search source is enabled
     * @param {?} value
     * @return {?}
     */
    set enabled(value) {
        this.options.enabled = value;
    }
    /**
     * @return {?}
     */
    get enabled() {
        return this.available && this.options.enabled !== false;
    }
    /**
     * Search url
     * @return {?}
     */
    get searchUrl() {
        return this.options.searchUrl;
    }
    /**
     * Search query params
     * @return {?}
     */
    get params() {
        return this.options.params === undefined ? {} : this.options.params;
    }
    /**
     * Search settings
     * @return {?}
     */
    get settings() {
        return this.options.settings === undefined ? [] : this.options.settings;
    }
    /**
     * Set params from selected settings
     * @param {?} setting
     * @return {?}
     */
    setParamFromSetting(setting) {
        switch (setting.type) {
            case 'radiobutton':
                setting.values.forEach((/**
                 * @param {?} conf
                 * @return {?}
                 */
                conf => {
                    if (conf.enabled) {
                        this.options.params = Object.assign((this.options.params || {}), { [setting.name]: conf.value });
                    }
                }));
                break;
            case 'checkbox':
                /** @type {?} */
                let confValue = '';
                setting.values.forEach((/**
                 * @param {?} conf
                 * @return {?}
                 */
                conf => {
                    if (conf.enabled) {
                        confValue += conf.value + ',';
                    }
                }));
                confValue = confValue.slice(0, -1);
                this.options.params = Object.assign((this.options.params || {}), { [setting.name]: confValue });
                break;
        }
    }
    /**
     * Search results display order
     * @return {?}
     */
    get displayOrder() {
        return this.options.order === undefined ? 99 : this.options.order;
    }
    /**
     * Check if hashtag is valid
     * @param {?} searchSourceSetting
     * @param {?} hashtag hashtag from query
     * @param {?=} completeMatch boolean
     * @return {?}
     */
    hashtagValid(searchSourceSetting, hashtag, completeMatch = false) {
        /** @type {?} */
        let hashtagIsValid = false;
        searchSourceSetting.values.forEach((/**
         * @param {?} conf
         * @return {?}
         */
        conf => {
            /** @type {?} */
            const re = new RegExp('' + hashtag.substring(1) + '', 'g');
            if (typeof conf.value === 'string') {
                if ((completeMatch && conf.value === hashtag.substring(1)) ||
                    (!completeMatch && conf.value.match(re))) {
                    hashtagIsValid = true;
                }
            }
        }));
        return hashtagIsValid;
    }
    /**
     * @param {?} search
     * @return {?}
     */
    getSettingsValues(search) {
        return this.getDefaultOptions().settings.find((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            return value.name === search;
        }));
    }
}
/**
 * Search source ID
 * \@internal
 */
SearchSource.id = '';
/**
 * Search source type
 * \@internal
 */
SearchSource.type = '';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Map search source. For now it has no search capability. All it does
 * is act as a placeholder for the map query results' "search source".
 */
class QuerySearchSource extends SearchSource {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
    }
    /**
     * @return {?}
     */
    getId() {
        return QuerySearchSource.id;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'Carte'
        };
    }
}
QuerySearchSource.id = 'map';
QuerySearchSource.type = FEATURE;
QuerySearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
QuerySearchSource.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CatalogService {
    /**
     * @param {?} http
     * @param {?} config
     * @param {?} languageService
     * @param {?} capabilitiesService
     */
    constructor(http, config, languageService, capabilitiesService) {
        this.http = http;
        this.config = config;
        this.languageService = languageService;
        this.capabilitiesService = capabilitiesService;
    }
    /**
     * @return {?}
     */
    loadCatalogs() {
        /** @type {?} */
        const contextConfig = this.config.getConfig('context') || {};
        /** @type {?} */
        const catalogConfig = this.config.getConfig('catalog') || {};
        /** @type {?} */
        const apiUrl = catalogConfig.url || contextConfig.url;
        /** @type {?} */
        const catalogsFromConfig = catalogConfig.sources || [];
        if (apiUrl === undefined) {
            return of(catalogsFromConfig);
        }
        /** @type {?} */
        const observables$ = [];
        // Base layers catalog
        if (catalogConfig.baseLayers) {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const title = translate.instant('igo.geo.catalog.baseLayers');
            /** @type {?} */
            const baseLayersCatalog = {
                id: 'catalog.baselayers',
                title,
                url: `${apiUrl}/baselayers`,
                type: 'baselayers'
            };
            observables$.push(of(baseLayersCatalog));
        }
        // Catalogs from API
        /** @type {?} */
        const catalogsFromApi$ = this.http
            .get(`${apiUrl}/catalogs`)
            .pipe(catchError((/**
         * @param {?} response
         * @return {?}
         */
        (response) => EMPTY)));
        observables$.push(catalogsFromApi$);
        // Catalogs from config
        if (catalogsFromConfig.length > 0) {
            observables$.push(of(catalogsFromConfig));
        }
        return (/** @type {?} */ (concat(...observables$)));
    }
    /**
     * @param {?} catalog
     * @return {?}
     */
    loadCatalogItems(catalog) {
        if (catalog.type === 'baselayers') {
            return this.loadCatalogBaseLayerItems(catalog);
        }
        else if (catalog.type === 'wmts') {
            return this.loadCatalogWMTSLayerItems(catalog);
        }
        return this.loadCatalogWMSLayerItems(catalog);
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    loadCatalogBaseLayerItems(catalog) {
        // TODO: I'm not sure this works
        return this.getCatalogBaseLayersOptions(catalog)
            .pipe(map((/**
         * @param {?} layersOptions
         * @return {?}
         */
        (layersOptions) => {
            /** @type {?} */
            const items = layersOptions.map((/**
             * @param {?} layerOptions
             * @return {?}
             */
            (layerOptions) => {
                return (/** @type {?} */ ({
                    id: generateIdFromSourceOptions(layerOptions.sourceOptions),
                    title: layerOptions.title,
                    type: CatalogItemType.Layer,
                    options: layerOptions
                }));
            }));
            return [{
                    id: 'catalog.group.baselayers',
                    type: CatalogItemType.Group,
                    title: catalog.title,
                    items
                }];
        })));
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    getCatalogBaseLayersOptions(catalog) {
        return this.http.get(catalog.url);
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    loadCatalogWMSLayerItems(catalog) {
        return this.getCatalogWMSCapabilities(catalog)
            .pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        (capabilities) => {
            /** @type {?} */
            const items = [];
            this.includeRecursiveItems(catalog, capabilities.Capability.Layer, items);
            return items;
        })));
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    loadCatalogWMTSLayerItems(catalog) {
        return this.getCatalogWMTSCapabilities(catalog)
            .pipe(map((/**
         * @param {?} capabilities
         * @return {?}
         */
        (capabilities) => this.getWMTSItems(catalog, capabilities))));
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    getCatalogWMSCapabilities(catalog) {
        return this.capabilitiesService.getCapabilities('wms', catalog.url, catalog.version);
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    getCatalogWMTSCapabilities(catalog) {
        return this.capabilitiesService.getCapabilities('wmts', catalog.url, catalog.version);
    }
    /**
     * @private
     * @param {?} catalog
     * @param {?} layerList
     * @param {?} items
     * @return {?}
     */
    includeRecursiveItems(catalog, layerList, items) {
        // Dig all levels until last level (layer object are not defined on last level)
        /** @type {?} */
        const regexes = (catalog.regFilters || []).map((/**
         * @param {?} pattern
         * @return {?}
         */
        (pattern) => new RegExp(pattern)));
        /** @type {?} */
        const catalogQueryParams = catalog.queryParams || {};
        /** @type {?} */
        const catalogSourceOptions = catalog.sourceOptions || {};
        for (const group of layerList.Layer) {
            if (group.Layer !== undefined) {
                // recursive, check next level
                this.includeRecursiveItems(catalog, group, items);
                continue;
            }
            /** @type {?} */
            const catalogTooltipType = this.retrieveTooltipType(catalog);
            /** @type {?} */
            const layersQueryFormat = this.findCatalogInfoFormat(catalog);
            // TODO: Slice that into multiple methods
            // Define object of group layer
            /** @type {?} */
            const groupItem = {
                id: `catalog.group.${layerList.Name}`,
                type: CatalogItemType.Group,
                title: layerList.Title,
                items: layerList.Layer.reduce((/**
                 * @param {?} layers
                 * @param {?} layer
                 * @return {?}
                 */
                (layers, layer) => {
                    /** @type {?} */
                    const configuredQueryFormat = this.retriveLayerInfoFormat(layer.Name, layersQueryFormat);
                    if (this.testLayerRegexes(layer.Name, regexes) === false) {
                        return layers;
                    }
                    /** @type {?} */
                    const metadata = layer.DataURL ? layer.DataURL[0] : undefined;
                    /** @type {?} */
                    const abstract = layer.Abstract ? layer.Abstract : undefined;
                    /** @type {?} */
                    const keywordList = layer.KeywordList ? layer.KeywordList : undefined;
                    /** @type {?} */
                    const timeFilter = this.capabilitiesService.getTimeFilter(layer);
                    /** @type {?} */
                    const timeFilterable = timeFilter && Object.keys(timeFilter).length > 0 ? true : false;
                    /** @type {?} */
                    const params = Object.assign({}, catalogQueryParams, {
                        layers: layer.Name,
                        feature_count: catalog.count
                    });
                    /** @type {?} */
                    const baseSourceOptions = {
                        type: 'wms',
                        url: catalog.url,
                        crossOrigin: catalog.setCrossOriginAnonymous ? 'anonymous' : undefined,
                        timeFilter: Object.assign({}, timeFilter, catalog.timeFilter),
                        timeFilterable: timeFilterable ? true : false,
                        queryable: layer.queryable,
                        queryFormat: configuredQueryFormat,
                        queryHtmlTarget: catalog.queryHtmlTarget || QueryHtmlTarget.IFRAME
                    };
                    /** @type {?} */
                    const sourceOptions = (/** @type {?} */ (Object.assign({}, baseSourceOptions, catalogSourceOptions, { params })));
                    layers.push({
                        id: generateIdFromSourceOptions(sourceOptions),
                        type: CatalogItemType.Layer,
                        title: layer.Title,
                        options: {
                            title: layer.Title,
                            maxResolution: getResolutionFromScale(layer.MaxScaleDenominator) || Infinity,
                            minResolution: getResolutionFromScale(layer.MinScaleDenominator) || 0,
                            metadata: {
                                url: metadata ? metadata.OnlineResource : undefined,
                                extern: metadata ? true : undefined,
                                abstract,
                                keywordList
                            },
                            tooltip: (/** @type {?} */ ({ type: catalogTooltipType })),
                            sourceOptions
                        }
                    });
                    return layers;
                }), [])
            };
            if (groupItem.items.length !== 0) {
                items.push(groupItem);
            }
            // Break the group (don't add a group of layer for each of their layer!)
            break;
        }
    }
    /**
     * @private
     * @param {?} catalog
     * @param {?} capabilities
     * @return {?}
     */
    getWMTSItems(catalog, capabilities) {
        /** @type {?} */
        const layers = capabilities.Contents.Layer;
        /** @type {?} */
        const regexes = (catalog.regFilters || []).map((/**
         * @param {?} pattern
         * @return {?}
         */
        (pattern) => new RegExp(pattern)));
        /** @type {?} */
        const catalogQueryParams = catalog.queryParams || {};
        /** @type {?} */
        const catalogSourceOptions = catalog.sourceOptions || {};
        return layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            if (this.testLayerRegexes(layer.Identifier, regexes) === false) {
                return undefined;
            }
            /** @type {?} */
            const params = Object.assign({}, catalogQueryParams, {
                version: '1.0.0'
            });
            /** @type {?} */
            const baseSourceOptions = (/** @type {?} */ ({
                type: 'wmts',
                url: catalog.url,
                crossOrigin: catalog.setCrossOriginAnonymous ? 'anonymous' : undefined,
                layer: layer.Identifier,
                matrixSet: catalog.matrixSet,
                optionsFromCapabilities: true,
                requestEncoding: catalog.requestEncoding || 'KVP',
                style: 'default'
            }));
            /** @type {?} */
            const sourceOptions = (/** @type {?} */ (Object.assign({}, baseSourceOptions, catalogSourceOptions, { params })));
            return {
                id: generateIdFromSourceOptions(sourceOptions),
                type: CatalogItemType.Layer,
                title: layer.Title,
                options: {
                    title: layer.Title,
                    sourceOptions
                }
            };
        }))
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item !== undefined));
    }
    /**
     * @private
     * @param {?} layerName
     * @param {?} regexes
     * @return {?}
     */
    testLayerRegexes(layerName, regexes) {
        if (regexes.length === 0) {
            return true;
        }
        return regexes.find((/**
         * @param {?} regex
         * @return {?}
         */
        (regex) => regex.test(layerName))) !== undefined;
    }
    /**
     * @private
     * @param {?} layerNameFromCatalog
     * @param {?} layersQueryFormat
     * @return {?}
     */
    retriveLayerInfoFormat(layerNameFromCatalog, layersQueryFormat) {
        /** @type {?} */
        const currentLayerInfoFormat = layersQueryFormat.find((/**
         * @param {?} f
         * @return {?}
         */
        f => f.layer === layerNameFromCatalog));
        /** @type {?} */
        const baseInfoFormat = layersQueryFormat.find((/**
         * @param {?} f
         * @return {?}
         */
        f => f.layer === '*'));
        /** @type {?} */
        let queryFormat;
        if (currentLayerInfoFormat) {
            queryFormat = currentLayerInfoFormat.queryFormat;
        }
        else if (baseInfoFormat) {
            queryFormat = baseInfoFormat.queryFormat;
        }
        return queryFormat;
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    retrieveTooltipType(catalog) {
        if (!catalog.tooltipType) {
            return TooltipType.TITLE;
        }
        return catalog.tooltipType;
    }
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    findCatalogInfoFormat(catalog) {
        /** @type {?} */
        const layersQueryFormat = [];
        if (!catalog.queryFormat) {
            return layersQueryFormat;
        }
        Object.keys(catalog.queryFormat).forEach((/**
         * @param {?} configuredInfoFormat
         * @return {?}
         */
        configuredInfoFormat => {
            if (catalog.queryFormat[configuredInfoFormat] instanceof Array) {
                catalog.queryFormat[configuredInfoFormat].forEach((/**
                 * @param {?} layerName
                 * @return {?}
                 */
                layerName => {
                    if (!layersQueryFormat.find((/**
                     * @param {?} specific
                     * @return {?}
                     */
                    specific => specific.layer === layerName))) {
                        layersQueryFormat.push({ layer: layerName, queryFormat: (/** @type {?} */ (configuredInfoFormat)) });
                    }
                }));
            }
            else {
                if (!layersQueryFormat.find((/**
                 * @param {?} specific
                 * @return {?}
                 */
                specific => specific.layer === catalog.queryFormat[configuredInfoFormat]))) {
                    layersQueryFormat.push({ layer: catalog.queryFormat[configuredInfoFormat], queryFormat: (/** @type {?} */ (configuredInfoFormat)) });
                }
            }
        }));
        return layersQueryFormat;
    }
}
CatalogService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
CatalogService.ctorParameters = () => [
    { type: HttpClient },
    { type: ConfigService },
    { type: LanguageService },
    { type: CapabilitiesService }
];
/** @nocollapse */ CatalogService.ngInjectableDef = defineInjectable({ factory: function CatalogService_Factory() { return new CatalogService(inject(HttpClient), inject(ConfigService), inject(LanguageService), inject(CapabilitiesService)); }, token: CatalogService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Component to browse a catalog's groups and layers and display them on a map.
 */
class CatalogBrowserComponent {
    /**
     * @param {?} layerService
     * @param {?} cdRef
     */
    constructor(layerService, cdRef) {
        this.layerService = layerService;
        this.cdRef = cdRef;
        /**
         * Whether a group can be toggled when it's collapsed
         */
        this.toggleCollapsedGroup = true;
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const currentItems = this.map.layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            return {
                id: layer.id,
                title: layer.title,
                type: CatalogItemType.Layer
            };
        }));
        this.store.state.updateMany(currentItems, { added: true }, true);
        if (this.catalog && this.catalog.sortDirection !== undefined) {
            this.store.view.sort({
                direction: this.catalog.sortDirection,
                valueAccessor: (/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => item.title)
            });
        }
        this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.watcher.destroy();
    }
    /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    isGroup(item) {
        return item.type === CatalogItemType.Group;
    }
    /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    isLayer(item) {
        return item.type === CatalogItemType.Layer;
    }
    /**
     * When a layer is added or removed, add or remove it from the map
     * \@internal
     * @param {?} event Layer added event
     * @return {?}
     */
    onLayerAddedChange(event) {
        /** @type {?} */
        const layer = event.layer;
        this.store.state.update(layer, { added: event.added }, false);
        event.added ? this.addLayerToMap(layer) : this.removeLayerFromMap(layer);
    }
    /**
     * When a froup is added or removed, add or remove it from the map
     * \@internal
     * @param {?} event Group added event
     * @return {?}
     */
    onGroupAddedChange(event) {
        /** @type {?} */
        const group = event.group;
        this.store.state.update(group, { added: event.added }, false);
        event.added ? this.addGroupToMap(group) : this.removeGroupFromMap(group);
    }
    /**
     * Add layer to map
     * @private
     * @param {?} layer Catalog layer
     * @return {?}
     */
    addLayerToMap(layer) {
        this.addLayersToMap([layer]);
    }
    /**
     * Remove layer from map
     * @private
     * @param {?} layer Catalog layer
     * @return {?}
     */
    removeLayerFromMap(layer) {
        this.removeLayersFromMap([layer]);
    }
    /**
     * Add multiple layers to map
     * @private
     * @param {?} layers Catalog layers
     * @return {?}
     */
    addLayersToMap(layers) {
        /** @type {?} */
        const layers$ = layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            return this.layerService.createAsyncLayer(layer.options);
        }));
        zip(...layers$).subscribe((/**
         * @param {?} oLayers
         * @return {?}
         */
        (oLayers) => {
            this.store.state.updateMany(layers, { added: true });
            this.map.addLayers(oLayers);
        }));
    }
    /**
     * Remove multiple layers from map
     * @private
     * @param {?} layers Catalog layers
     * @return {?}
     */
    removeLayersFromMap(layers) {
        layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            this.store.state.update(layer, { added: false });
            /** @type {?} */
            const oLayer = this.map.getLayerById(layer.id);
            if (oLayer !== undefined) {
                this.map.removeLayer(oLayer);
            }
        }));
    }
    /**
     * Add all the layers of a group to map
     * @private
     * @param {?} group Catalog group
     * @return {?}
     */
    addGroupToMap(group) {
        /** @type {?} */
        const layers = group.items.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            const added = this.store.state.get(item).added || false;
            return this.isLayer(item) && added === false;
        }));
        this.addLayersToMap((/** @type {?} */ (layers)));
    }
    /**
     * Remove all the layers of a groufrom map
     * @private
     * @param {?} group Catalog group
     * @return {?}
     */
    removeGroupFromMap(group) {
        /** @type {?} */
        const layers = group.items.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            const added = this.store.state.get(item).added || false;
            return this.isLayer(item) && added === true;
        }));
        this.removeLayersFromMap((/** @type {?} */ (layers)));
    }
}
CatalogBrowserComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-catalog-browser',
                template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <ng-template ngFor let-item [ngForOf]=\"store.view.all$() | async\">\r\n    <ng-container *ngIf=\"isGroup(item)\">\r\n      <igo-catalog-browser-group\r\n        [catalog]=\"catalog\"\r\n        [group]=\"item\"\r\n        [state]=\"store.state\"\r\n        [toggleCollapsed]=\"toggleCollapsedGroup\"\r\n        (addedChange)=\"onGroupAddedChange($event)\"\r\n        (layerAddedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-group>\r\n    </ng-container>\r\n\r\n    <ng-container *ngIf=\"isLayer(item)\">\r\n      <igo-catalog-browser-layer\r\n        igoListItem\r\n        [layer]=\"item\"\r\n        [added]=\"store.state.get(item).added\"\r\n        [disabled]=\"store.state.get(item).added\"\r\n        (addedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-layer>\r\n    </ng-container>\r\n  </ng-template>\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
CatalogBrowserComponent.ctorParameters = () => [
    { type: LayerService },
    { type: ChangeDetectorRef }
];
CatalogBrowserComponent.propDecorators = {
    catalog: [{ type: Input }],
    store: [{ type: Input }],
    map: [{ type: Input }],
    toggleCollapsedGroup: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Catalog browser layer item
 */
class CatalogBrowserLayerComponent {
    constructor() {
        /**
         * Event emitted when the add/remove button is clicked
         */
        this.addedChange = new EventEmitter();
    }
    /**
     * \@internal
     * @return {?}
     */
    get title() { return getEntityTitle(this.layer); }
    /**
     * \@internal
     * @return {?}
     */
    get icon() { return getEntityIcon(this.layer) || 'layers'; }
    /**
     * On toggle button click, emit the added change event
     * \@internal
     * @return {?}
     */
    onToggleClick() {
        this.added ? this.remove() : this.add();
    }
    /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    add() {
        this.added = true;
        this.addedChange.emit({ added: true, layer: this.layer });
    }
    /**
     * Emit added change event with added = false
     * @private
     * @return {?}
     */
    remove() {
        this.added = false;
        this.addedChange.emit({ added: false, layer: this.layer });
    }
}
CatalogBrowserLayerComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-catalog-browser-layer',
                template: "<mat-list-item>\r\n  <mat-icon mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n  <h4 mat-line>{{title}}</h4>\r\n\r\n  <igo-metadata-button [layer]=\"layer\"></igo-metadata-button>\r\n\r\n  <button\r\n    mat-icon-button\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"(added ? 'igo.geo.catalog.layer.removeFromMap' : 'igo.geo.catalog.layer.addToMap') | translate\"\r\n    [color]=\"added ? 'warn' : ''\"\r\n    (click)=\"onToggleClick()\">\r\n    <mat-icon [svgIcon]=\"added ? 'delete' : 'plus'\"></mat-icon>\r\n  </button>\r\n\r\n</mat-list-item>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
CatalogBrowserLayerComponent.ctorParameters = () => [];
CatalogBrowserLayerComponent.propDecorators = {
    layer: [{ type: Input }],
    added: [{ type: Input }],
    addedChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Catalog browser group item
 */
class CatalogBrowserGroupComponent {
    constructor() {
        /**
         * Group's items store
         * \@internal
         */
        this.store = new EntityStore([]);
        /**
         * Whether all the layers of the group are added
         * \@internal
         */
        this.added$ = new BehaviorSubject(false);
        /**
         * Whether the toggle button is disabled
         * \@internal
         */
        this.disabled$ = new BehaviorSubject(false);
        /**
         * Whether the group is collapsed
         */
        this.collapsed = true;
        /**
         * Whether the group can be toggled when it's collapsed
         */
        this.toggleCollapsed = true;
        /**
         * Event emitted when the add/remove button of the group is clicked
         */
        this.addedChange = new EventEmitter();
        /**
         * Event emitted when the add/remove button of a layer is clicked
         */
        this.layerAddedChange = new EventEmitter();
    }
    /**
     * \@internal
     * @return {?}
     */
    get title() {
        return this.group.title;
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.store.load(this.group.items);
        this.evaluateAdded();
        this.evaluateDisabled(this.collapsed);
        if (this.catalog && this.catalog.sortDirection !== undefined) {
            this.store.view.sort({
                direction: this.catalog.sortDirection,
                valueAccessor: (/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => item.title)
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.store.destroy();
    }
    /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    isGroup(item) {
        return item.type === CatalogItemType.Group;
    }
    /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    isLayer(item) {
        return item.type === CatalogItemType.Layer;
    }
    /**
     * On toggle button click, emit the added change event
     * \@internal
     * @return {?}
     */
    onToggleClick() {
        this.added$.value ? this.remove() : this.add();
    }
    /**
     * On toggle button click, emit the added change event
     * \@internal
     * @param {?} collapsed
     * @return {?}
     */
    onToggleCollapsed(collapsed) {
        this.evaluateDisabled(collapsed);
    }
    /**
     * When a layer is added or removed, evaluate if all the layers of the group
     * are now added or removed. If so, consider that the group itself is added
     * or removed.
     * \@internal
     * @param {?} event Layer added change event
     * @return {?}
     */
    onLayerAddedChange(event) {
        this.layerAddedChange.emit(event);
        this.tryToggleGroup(event);
    }
    /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    add() {
        this.added$.next(true);
        this.addedChange.emit({
            added: true,
            group: this.group
        });
    }
    /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    remove() {
        this.added$.next(false);
        this.addedChange.emit({
            added: false,
            group: this.group
        });
    }
    /**
     * If all the layers of the group added or removed, add or remove the group itself.
     * @private
     * @param {?} event The last layer added change event to occur
     * @return {?}
     */
    tryToggleGroup(event) {
        /** @type {?} */
        const added = event.added;
        /** @type {?} */
        const layer = event.layer;
        /** @type {?} */
        const layersAdded = this.store.view
            .all()
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.id !== layer.id))
            .map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.state.get(item).added || false));
        if (layersAdded.every((/**
         * @param {?} value
         * @return {?}
         */
        value => value === added))) {
            added ? this.add() : this.remove();
        }
        else if (this.added$.value === true) {
            this.added$.next(false);
        }
    }
    /**
     * @private
     * @return {?}
     */
    evaluateAdded() {
        /** @type {?} */
        const added = this.store.all().every((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            return (this.state.get(item).added || false) === true;
        }));
        this.added$.next(added);
    }
    /**
     * @private
     * @param {?} collapsed
     * @return {?}
     */
    evaluateDisabled(collapsed) {
        /** @type {?} */
        let disabled = false;
        if (this.toggleCollapsed === false) {
            disabled = collapsed;
        }
        this.disabled$.next(disabled);
    }
}
CatalogBrowserGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-catalog-browser-group',
                template: "<mat-list-item>\r\n  <mat-icon\r\n    mat-list-avatar\r\n    svgIcon=\"chevron-up\"\r\n    igoCollapse\r\n    class=\"igo-chevron\"\r\n    [target]=\"items\"\r\n    [collapsed]=\"collapsed\"\r\n    (toggle)=\"onToggleCollapsed($event)\">\r\n  </mat-icon>\r\n\r\n  <h4 matLine>{{title}}</h4>\r\n\r\n  <ng-container *ngIf=\"added$ | async; else notadded\">\r\n    <button\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.catalog.group.removeFromMap' | translate\"\r\n      color=\"warn\"\r\n      [disabled]=\"disabled$ | async\"\r\n      (click)=\"onToggleClick()\">\r\n      <mat-icon svgIcon=\"delete\"></mat-icon>\r\n    </button>\r\n  </ng-container>\r\n\r\n  <ng-template #notadded>\r\n    <button\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.catalog.group.addToMap' | translate\"\r\n      [disabled]=\"disabled$ | async\"\r\n      (click)=\"onToggleClick()\">\r\n      <mat-icon svgIcon=\"plus\"></mat-icon>\r\n    </button>\r\n  </ng-template>\r\n</mat-list-item>\r\n\r\n<div #items>\r\n  <ng-template ngFor let-item [ngForOf]=\"store.view.all$() | async\">\r\n    <ng-container *ngIf=\"isGroup(item)\"></ng-container>\r\n    <ng-container *ngIf=\"isLayer(item)\">\r\n      <igo-catalog-browser-layer\r\n        igoListItem\r\n        [layer]=\"item\"\r\n        [added]=\"state.get(item).added\"\r\n        [disabled]=\"state.get(item).added\"\r\n        (addedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-layer>\r\n    </ng-container>\r\n  </ng-template>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
CatalogBrowserGroupComponent.propDecorators = {
    catalog: [{ type: Input }],
    group: [{ type: Input }],
    collapsed: [{ type: Input }],
    toggleCollapsed: [{ type: Input }],
    state: [{ type: Input }],
    addedChange: [{ type: Output }],
    layerAddedChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoCatalogBrowserModule {
}
IgoCatalogBrowserModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatButtonModule,
                    MatIconModule,
                    MatListModule,
                    MatTooltipModule,
                    IgoLanguageModule,
                    IgoListModule,
                    IgoCollapsibleModule,
                    IgoMetadataModule
                ],
                exports: [
                    CatalogBrowserComponent
                ],
                declarations: [
                    CatalogBrowserComponent,
                    CatalogBrowserGroupComponent,
                    CatalogBrowserLayerComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Component to browse a list of available catalogs
 */
class CatalogLibaryComponent {
    constructor() {
        /**
         * Event emitted a catalog is selected or unselected
         */
        this.catalogSelectChange = new EventEmitter();
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.store.state.clear();
    }
    /**
     * When a catalog is selected, update it's state in the store
     * and emit the catalog select change event
     * \@internal
     * @param {?} catalog
     * @return {?}
     */
    onCatalogSelect(catalog) {
        this.store.state.update(catalog, {
            selected: true,
            focused: true
        }, true);
        this.catalogSelectChange.emit({ selected: true, catalog });
    }
}
CatalogLibaryComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-catalog-library',
                template: "<igo-list [navigation]=\"false\">\r\n  <ng-template ngFor let-catalog [ngForOf]=\"store.view.all$() | async\">\r\n    <igo-catalog-library-item\r\n      igoListItem\r\n      color=\"accent\"\r\n      [map]=\"map\"\r\n      [catalog]=\"catalog\"\r\n      (select)=\"onCatalogSelect(catalog)\">\r\n    </igo-catalog-library-item>\r\n  </ng-template>\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
CatalogLibaryComponent.propDecorators = {
    store: [{ type: Input }],
    map: [{ type: Input }],
    catalogSelectChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Catalog library item
 */
class CatalogLibaryItemComponent {
    /**
     * \@internal
     * @return {?}
     */
    get title() { return getEntityTitle(this.catalog); }
    /**
     * \@internal
     * @return {?}
     */
    get icon() { return getEntityIcon(this.catalog) || 'image-multiple'; }
}
CatalogLibaryItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-catalog-library-item',
                template: "<mat-list-item>\r\n  <mat-icon mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n  <h4 mat-line>{{title}}</h4>\r\n</mat-list-item>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
CatalogLibaryItemComponent.propDecorators = {
    catalog: [{ type: Input }],
    map: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoCatalogLibraryModule {
}
IgoCatalogLibraryModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatIconModule,
                    MatListModule,
                    MatTooltipModule,
                    IgoListModule
                ],
                exports: [
                    CatalogLibaryComponent
                ],
                declarations: [
                    CatalogLibaryComponent,
                    CatalogLibaryItemComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoCatalogModule {
}
IgoCatalogModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatIconModule,
                    MatListModule,
                    MatTooltipModule,
                    IgoListModule,
                    IgoCollapsibleModule
                ],
                exports: [
                    IgoCatalogBrowserModule,
                    IgoCatalogLibraryModule
                ],
                declarations: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoDataSourceModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoDataSourceModule,
            providers: []
        };
    }
}
IgoDataSourceModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [],
                declarations: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FilterableDataSourcePipe {
    /**
     * @param {?} value
     * @param {?} arg
     * @return {?}
     */
    transform(value, arg) {
        /** @type {?} */
        let layers;
        if (arg === 'time') {
            layers = value.filter((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => {
                /** @type {?} */
                const datasource = (/** @type {?} */ (layer.dataSource));
                return (this.isTimeFilterable(datasource) &&
                    datasource.options.timeFilter !== undefined &&
                    Object.keys(datasource.options.timeFilter).length);
            }));
        }
        if (arg === 'ogc') {
            layers = value.filter((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => {
                /** @type {?} */
                const datasource = (/** @type {?} */ (layer.dataSource));
                return this.isOgcFilterable(datasource);
            }));
        }
        return layers;
    }
    /**
     * @private
     * @param {?} dataSource
     * @return {?}
     */
    isTimeFilterable(dataSource) {
        if (dataSource.options.type !== 'wms') {
            return false;
        }
        return dataSource.options.timeFilterable;
    }
    /**
     * @private
     * @param {?} dataSource
     * @return {?}
     */
    isOgcFilterable(dataSource) {
        if (dataSource.options.ogcFilters &&
            dataSource.options.ogcFilters.enabled) {
            return true;
        }
        return false;
    }
}
FilterableDataSourcePipe.decorators = [
    { type: Pipe, args: [{
                name: 'filterableDataSource'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimeFilterService {
    constructor() { }
    /**
     * @param {?} datasource
     * @param {?} date
     * @return {?}
     */
    filterByDate(datasource, date) {
        /** @type {?} */
        let time;
        /** @type {?} */
        let newdateform;
        /** @type {?} */
        let newdateformStart;
        /** @type {?} */
        let newdateformEnd;
        if (Array.isArray(date)) {
            /** @type {?} */
            const dates = [];
            if (date[0]) {
                newdateformStart = this.reformatDateTime(date[0]);
                dates.push(date[0]);
            }
            if (date[1]) {
                newdateformEnd = this.reformatDateTime(date[1]);
                dates.push(date[1]);
            }
            if (dates.length === 2 && newdateformStart !== newdateformEnd) {
                if (datasource instanceof TileArcGISRestDataSource) {
                    time = newdateformStart + ',' + newdateformEnd;
                }
                else {
                    time = newdateformStart + '/' + newdateformEnd;
                }
            }
            if (newdateformStart === newdateformEnd) {
                time = newdateformStart;
            }
        }
        else if (date) {
            newdateform = this.reformatDateTime(date);
            time = newdateform;
        }
        /** @type {?} */
        const params = { time };
        datasource.ol.updateParams(params);
    }
    /**
     * @param {?} datasource
     * @param {?} year
     * @return {?}
     */
    filterByYear(datasource, year) {
        /** @type {?} */
        let time;
        /** @type {?} */
        let newdateformStart;
        /** @type {?} */
        let newdateformEnd;
        if (Array.isArray(year)) {
            /** @type {?} */
            const years = [];
            if (year[0]) {
                newdateformStart = year[0];
                years.push(year[0]);
            }
            if (year[1]) {
                newdateformEnd = year[1];
                years.push(year[1]);
            }
            if (years.length === 2 && newdateformStart !== newdateformEnd) {
                if (datasource instanceof TileArcGISRestDataSource) {
                    time = newdateformStart + ',' + newdateformEnd;
                }
                else {
                    time = newdateformStart + '/' + newdateformEnd;
                }
            }
            if (newdateformStart === newdateformEnd) {
                time = newdateformStart;
            }
        }
        else if (year) {
            time = year;
        }
        /** @type {?} */
        const params = { time };
        datasource.ol.updateParams(params);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    reformatDateTime(value) {
        /** @type {?} */
        const year = value.getFullYear();
        /** @type {?} */
        let month = value.getMonth() + 1;
        /** @type {?} */
        let day = value.getUTCDate();
        /** @type {?} */
        let hour = value.getUTCHours();
        /** @type {?} */
        let minute = value.getUTCMinutes();
        if (Number(month) < 10) {
            month = '0' + month;
        }
        if (Number(day) < 10) {
            day = '0' + day;
        }
        if (Number(hour) < 10) {
            hour = '0' + hour;
        }
        if (Number(minute) < 10) {
            minute = '0' + minute;
        }
        return year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00Z';
    }
}
TimeFilterService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TimeFilterService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const OgcFilterOperatorType = {
    BasicNumericOperator: 'BasicNumericOperator',
    Basic: 'Basic',
    BasicAndSpatial: 'BasicAndSpatial',
    Spatial: 'Spatial',
    All: 'All',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OGCFilterService {
    constructor() { }
    /**
     * @param {?} wmsDatasource
     * @param {?} filterString
     * @return {?}
     */
    filterByOgc(wmsDatasource, filterString) {
        /** @type {?} */
        const appliedFilter = new OgcFilterWriter().formatProcessedOgcFilter(filterString, wmsDatasource.options.params.layers);
        wmsDatasource.ol.updateParams({ filter: appliedFilter });
    }
    /**
     * @param {?} wfsDatasource
     * @return {?}
     */
    setOgcWFSFiltersOptions(wfsDatasource) {
        /** @type {?} */
        const options = wfsDatasource.options;
        /** @type {?} */
        const ogcFilterWriter = new OgcFilterWriter();
        if (options.ogcFilters.enabled && options.ogcFilters.filters) {
            options.ogcFilters.filters = ogcFilterWriter.checkIgoFiltersProperties(options.ogcFilters.filters, options.paramsWFS.fieldNameGeometry, true);
            if (!options.ogcFilters.interfaceOgcFilters) {
                options.ogcFilters.interfaceOgcFilters = ogcFilterWriter.defineInterfaceFilterSequence(options.ogcFilters.filters, options.paramsWFS.fieldNameGeometry);
            }
        }
    }
    /**
     * @param {?} wmsDatasource
     * @return {?}
     */
    setOgcWMSFiltersOptions(wmsDatasource) {
        /** @type {?} */
        const options = wmsDatasource.options;
        /** @type {?} */
        const ogcFilterWriter = new OgcFilterWriter();
        if (options.ogcFilters.enabled && options.ogcFilters.filters) {
            options.ogcFilters.filters = ogcFilterWriter.checkIgoFiltersProperties(options.ogcFilters.filters, options.fieldNameGeometry, true);
            if (!options.ogcFilters.interfaceOgcFilters) {
                options.ogcFilters.interfaceOgcFilters = ogcFilterWriter.defineInterfaceFilterSequence(
                // With some wms server, this param must be set to make spatials call.
                options.ogcFilters.filters, options.fieldNameGeometry);
            }
            this.filterByOgc((/** @type {?} */ (wmsDatasource)), ogcFilterWriter.buildFilter(options.ogcFilters.filters));
            options.filtered = true;
        }
        else {
            options.ogcFilters.filters = undefined;
            options.ogcFilters.interfaceOgcFilters = [];
            options.filtered = false;
        }
    }
}
OGCFilterService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OGCFilterService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DownloadService {
    /**
     * @param {?} messageService
     * @param {?} languageService
     */
    constructor(messageService, languageService) {
        this.messageService = messageService;
        this.languageService = languageService;
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    open(layer) {
        /** @type {?} */
        const translate = this.languageService.translate;
        /** @type {?} */
        const title = translate.instant('igo.geo.download.title');
        this.messageService.success(translate.instant('igo.geo.download.start'), title);
        /** @type {?} */
        const DSOptions = layer.dataSource.options;
        if (Object.keys(DSOptions.download).length > 0) {
            if (DSOptions.download.dynamicUrl &&
                DSOptions.download.url === undefined) {
                /** @type {?} */
                let wfsOptions;
                if (((/** @type {?} */ (layer.dataSource.options))).paramsWFS &&
                    Object.keys(((/** @type {?} */ (layer.dataSource.options))).paramsWFS).length > 0) {
                    wfsOptions = ((/** @type {?} */ (layer.dataSource.options))).paramsWFS;
                }
                else {
                    wfsOptions = ((/** @type {?} */ (layer.dataSource.options))).params;
                }
                /** @type {?} */
                const outputFormatDownload = wfsOptions.outputFormatDownload === undefined
                    ? 'outputformat=' + wfsOptions.outputFormat
                    : 'outputformat=' + wfsOptions.outputFormatDownload;
                /** @type {?} */
                const baseurl = DSOptions.download.dynamicUrl
                    .replace(/&?outputformat=[^&]*/gi, '')
                    .replace(/&?filter=[^&]*/gi, '')
                    .replace(/&?bbox=[^&]*/gi, '');
                /** @type {?} */
                const ogcFilters = ((/** @type {?} */ (layer.dataSource.options))).ogcFilters;
                /** @type {?} */
                let filterQueryString;
                filterQueryString = new OgcFilterWriter()
                    .handleOgcFiltersAppliedValue(layer.dataSource.options, ogcFilters.geometryName);
                if (!filterQueryString) {
                    // Prevent getting all the features for empty filter
                    filterQueryString = new OgcFilterWriter().buildFilter(undefined, layer.map.getExtent(), new olProjection({ code: layer.map.projection }), ogcFilters.geometryName);
                }
                else {
                    filterQueryString = 'filter=' + filterQueryString;
                }
                window.open(`${baseurl}&${filterQueryString}&${outputFormatDownload}`, '_blank');
            }
            else if (DSOptions.download) {
                window.open(DSOptions.download.url, '_blank');
            }
        }
    }
}
DownloadService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DownloadService.ctorParameters = () => [
    { type: MessageService },
    { type: LanguageService }
];
/** @nocollapse */ DownloadService.ngInjectableDef = defineInjectable({ factory: function DownloadService_Factory() { return new DownloadService(inject(MessageService), inject(LanguageService)); }, token: DownloadService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DownloadButtonComponent {
    /**
     * @param {?} downloadService
     */
    constructor(downloadService) {
        this.downloadService = downloadService;
        this._color = 'primary';
    }
    /**
     * @return {?}
     */
    get layer() {
        return this._layer;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set layer(value) {
        this._layer = value;
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
     * @param {?} layer
     * @return {?}
     */
    openDownload(layer) {
        this.downloadService.open(layer);
    }
    /**
     * @return {?}
     */
    get options() {
        if (!this.layer) {
            return;
        }
        return this.layer.dataSource.options;
    }
}
DownloadButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-download-button',
                template: "<button\r\n  *ngIf=\"options && options.download && (options.download['dynamicUrl'] || options.download['url']) \"\r\n  mat-icon-button\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.download.action' | translate\"\r\n  [color]=\"color\"\r\n  (click)=\"openDownload(layer)\">\r\n  <mat-icon svgIcon=\"download\"></mat-icon>\r\n</button>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
DownloadButtonComponent.ctorParameters = () => [
    { type: DownloadService }
];
DownloadButtonComponent.propDecorators = {
    layer: [{ type: Input }],
    color: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoDownloadModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoDownloadModule
        };
    }
}
IgoDownloadModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatIconModule,
                    MatButtonModule,
                    MatTooltipModule,
                    IgoLanguageModule
                ],
                exports: [DownloadButtonComponent],
                declarations: [DownloadButtonComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FeatureDetailsComponent {
    /**
     * @param {?} cdRef
     * @param {?} sanitizer
     * @param {?} networkService
     * @param {?} mapService
     */
    constructor(cdRef, sanitizer, networkService, mapService) {
        this.cdRef = cdRef;
        this.sanitizer = sanitizer;
        this.networkService = networkService;
        this.mapService = mapService;
        this.networkService.currentState().subscribe((/**
         * @param {?} state
         * @return {?}
         */
        (state$$1) => {
            this.state = state$$1;
        }));
    }
    /**
     * @return {?}
     */
    get feature() {
        return this._feature;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set feature(value) {
        this._feature = value;
        this.cdRef.detectChanges();
    }
    /**
     * \@internal
     * @return {?}
     */
    get title() {
        return getEntityTitle(this.feature);
    }
    /**
     * \@internal
     * @return {?}
     */
    get icon() {
        return getEntityIcon(this.feature) || 'link';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    htmlSanitizer(value) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isObject(value) {
        return typeof value === 'object';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isUrl(value) {
        if (typeof value === 'string') {
            return (value.slice(0, 8) === 'https://' || value.slice(0, 7) === 'http://');
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} feature
     * @return {?}
     */
    filterFeatureProperties(feature) {
        /** @type {?} */
        let sourceOptions;
        /** @type {?} */
        const allowedFieldsAndAlias = feature.meta ? feature.meta.alias : undefined;
        /** @type {?} */
        const properties = Object.assign({}, feature.properties);
        /** @type {?} */
        const layerName = feature.meta.title;
        /** @type {?} */
        const layers = this.mapService.getMap().layers$.value;
        if (allowedFieldsAndAlias) {
            Object.keys(properties).forEach((/**
             * @param {?} property
             * @return {?}
             */
            property => {
                if (Object.keys(allowedFieldsAndAlias).indexOf(property) === -1) {
                    delete properties[property];
                }
                else {
                    properties[allowedFieldsAndAlias[property]] = properties[property];
                    if (allowedFieldsAndAlias[property] !== property) {
                        delete properties[property];
                    }
                }
            }));
            return properties;
        }
        else {
            layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            layer => {
                if (layer.dataSource.options.type === 'mvt') {
                    sourceOptions = ((/** @type {?} */ (layer.dataSource.options)));
                }
                else if (layer.dataSource.options.type === 'xyz') {
                    sourceOptions = ((/** @type {?} */ (layer.dataSource.options)));
                }
                else if (layer.dataSource.options.type === 'vector') {
                    sourceOptions = ((/** @type {?} */ (layer.dataSource.options)));
                }
                else {
                    return;
                }
                if (this.state.connection && sourceOptions.excludeAttribute) {
                    /** @type {?} */
                    const exclude = sourceOptions.excludeAttribute;
                    exclude.forEach((/**
                     * @param {?} attribute
                     * @return {?}
                     */
                    attribute => {
                        if (layerName === layer.title) {
                            delete feature.properties[attribute];
                        }
                    }));
                }
                else if (!this.state.connection && sourceOptions.excludeAttributeOffline) {
                    /** @type {?} */
                    const excludeAttributeOffline = sourceOptions.excludeAttributeOffline;
                    excludeAttributeOffline.forEach((/**
                     * @param {?} attribute
                     * @return {?}
                     */
                    attribute => {
                        if (layerName === layer.title) {
                            delete feature.properties[attribute];
                        }
                    }));
                }
            }));
            return feature.properties;
        }
    }
}
FeatureDetailsComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-feature-details',
                template: "<table class=\"igo-striped\" *ngIf=\"feature && isObject(feature.properties) && feature.properties.target !== 'iframe'\">\r\n  <tbody>\r\n    <tr *ngFor=\"let property of filterFeatureProperties(feature) | keyvalue\">\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <mat-icon mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === '_blank' && property.key === 'url'\">\r\n        <a href=\"{{property.value}}\" target='_blank'> {{ 'igo.geo.targetHtmlUrl' | translate }} {{title}}</a>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined\">\r\n        {{property.key }}\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && !isUrl(property.value)\" [innerHTML]=property.value>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && !isObject(property.value) && isUrl(property.value)\">\r\n        <a href=\"{{property.value}}\" target='_blank'>{{ 'igo.geo.targetHtmlUrl' | translate }} </a>\r\n      </td>\r\n\r\n      <td *ngIf=\"feature.properties.target === undefined && isObject(property.value)\" [innerHTML]=\"property.value | json\">\r\n      </td>\r\n\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n\r\n<iframe *ngIf=\"feature && isObject(feature.properties) && feature.properties.target === 'iframe'\" [src]='htmlSanitizer(feature.properties.url)'></iframe>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["table{width:100%;white-space:nowrap}table td{padding:5px}iframe{height:calc(100% - 4px);width:100%;border:0}"]
            }] }
];
/** @nocollapse */
FeatureDetailsComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DomSanitizer },
    { type: NetworkService },
    { type: MapService }
];
FeatureDetailsComponent.propDecorators = {
    feature: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoFeatureDetailsModule {
}
IgoFeatureDetailsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatIconModule,
                    IgoLanguageModule,
                    IgoKeyValueModule
                ],
                exports: [FeatureDetailsComponent],
                declarations: [FeatureDetailsComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A configurable form, optionnally bound to a feature.
 * This component creates an entity form and, on submit,
 * returns a feature made out of the submitted data. It also
 * does things like managing the feature visibility while it's being updated
 * as well as disabling the selection of another feature.
 */
class FeatureFormComponent {
    constructor() {
        this.feature$ = new BehaviorSubject(undefined);
        /**
         * Event emitted when the form is submitted
         */
        this.submitForm = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const store = changes.store;
        if (store && store.currentValue !== store.previousValue) {
            this.setStore(store.currentValue);
        }
        /** @type {?} */
        const feature = changes.feature;
        if (feature && feature.currentValue !== feature.previousValue) {
            this.feature$.next(feature.currentValue);
        }
    }
    /**
     * Show the original feature and reactivate the selection
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.setStore(undefined);
    }
    /**
     * Transform the form data to a feature and emit an event
     * \@internal
     * @param {?} data
     * @return {?}
     */
    onSubmit(data) {
        /** @type {?} */
        const feature = this.formDataToFeature(data);
        this.submitForm.emit(feature);
    }
    /**
     * Transform the form data to a feature
     * @private
     * @param {?} data Form data
     * @return {?} A feature
     */
    formDataToFeature(data) {
        /** @type {?} */
        const properties = {};
        /** @type {?} */
        const meta = {};
        if (this.feature === undefined) {
            ((/** @type {?} */ (meta))).id = uuid();
        }
        else {
            Object.assign(properties, this.feature.properties);
            Object.assign(meta, this.feature.meta, {
                revision: getEntityRevision(this.feature) + 1
            });
        }
        /** @type {?} */
        const propertyPrefix = 'properties.';
        Object.entries(data).forEach((/**
         * @param {?} entry
         * @return {?}
         */
        (entry) => {
            const [key, value] = entry;
            if (key.startsWith(propertyPrefix)) {
                /** @type {?} */
                const property = key.substr(propertyPrefix.length);
                properties[property] = value;
            }
        }));
        /** @type {?} */
        let geometry = data.geometry;
        if (geometry === undefined && this.feature !== undefined) {
            geometry = this.feature.geometry;
        }
        return {
            meta: (/** @type {?} */ (meta)),
            type: FEATURE,
            geometry,
            projection: 'EPSG:4326',
            properties
        };
    }
    /**
     * @private
     * @param {?} store
     * @return {?}
     */
    setStore(store) {
        if (this.store !== undefined) {
            this.activateStoreSelection(this.store);
        }
        if (store !== undefined) {
            this.deactivateStoreSelection(store);
        }
        this.store = store;
    }
    /**
     * Deactivate feature selection from the store and from the map
     * @private
     * @param {?} store
     * @return {?}
     */
    deactivateStoreSelection(store) {
        /** @type {?} */
        const selectionStrategy = store.getStrategyOfType(FeatureStoreSelectionStrategy);
        if (selectionStrategy !== undefined) {
            selectionStrategy.deactivate();
            ((/** @type {?} */ (selectionStrategy))).unselectAll();
        }
    }
    /**
     * Reactivate feature selection from the store and from the map
     * @private
     * @param {?} store
     * @return {?}
     */
    activateStoreSelection(store) {
        // TODO: maybe we should recativate the strategies only if they
        // were active in the first place
        store.activateStrategyOfType(FeatureStoreSelectionStrategy);
    }
}
FeatureFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-feature-form',
                template: "\r\n<igo-form\r\n  [form]=\"form\"\r\n  [formData]=\"feature$ | async\"\r\n  (submitForm)=\"onSubmit($event)\">\r\n\r\n  <ng-content></ng-content>\r\n  \r\n  <ng-content select=\"[formButtons]\" formButtons></ng-content>\r\n  \r\n</igo-form>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}igo-form{height:100%}"]
            }] }
];
/** @nocollapse */
FeatureFormComponent.ctorParameters = () => [];
FeatureFormComponent.propDecorators = {
    form: [{ type: Input }],
    feature: [{ type: Input }],
    store: [{ type: Input }],
    submitForm: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoFeatureFormModule {
}
IgoFeatureFormModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoFormModule
                ],
                exports: [
                    IgoFormModule,
                    FeatureFormComponent
                ],
                declarations: [
                    FeatureFormComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoFeatureModule {
}
IgoFeatureModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    IgoFeatureDetailsModule,
                    IgoFeatureFormModule
                ],
                declarations: [],
                providers: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimeFilterFormComponent {
    constructor() {
        this.listYears = [];
        this.startListYears = [];
        this.endListYears = [];
        this.playIcon = 'play_circle_filled';
        this.change = new EventEmitter();
        this.yearChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get options() {
        return this._options;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set options(value) {
        this._options = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set currentValue(value) {
        if (value) {
            if (this.type !== 'year') {
                /** @type {?} */
                const valueArray = value.split('/');
                if (valueArray.length > 0) {
                    /** @type {?} */
                    const startDate = new Date(valueArray[0]);
                    /** @type {?} */
                    const endDate = new Date(valueArray[1]);
                    if (!isNaN(startDate.valueOf())) {
                        this.startDate = startDate;
                    }
                    if (!isNaN(endDate.valueOf())) {
                        this.endDate = endDate;
                    }
                }
            }
        }
    }
    /**
     * @return {?}
     */
    get type() {
        return this.options.type === undefined ? 'date' : this.options.type;
    }
    /**
     * @return {?}
     */
    get isRange() {
        return this.options.range === undefined || this.options.style === 'slider'
            ? false
            : this.options.range;
    }
    /**
     * @return {?}
     */
    get style() {
        return this.options.style === undefined ? 'slider' : this.options.style;
    }
    /**
     * @return {?}
     */
    get step() {
        /** @type {?} */
        let step = 10800000;
        if (this.options.step === undefined) {
            switch (this.type) {
                case 'date':
                case 'datetime':
                    step = 10800000;
                    break;
                case 'time':
                    step = 3600000;
                    break;
                case 'year':
                    step = 31536000000;
                    break;
                default:
                    step = 10800000;
            }
        }
        else {
            step = this.getStepDefinition(this.options.step);
        }
        return step;
    }
    /**
     * @return {?}
     */
    get timeInterval() {
        return this.options.timeInterval === undefined
            ? 2000
            : this.options.timeInterval;
    }
    /**
     * @return {?}
     */
    get min() {
        return this.options.min === undefined
            ? undefined
            : new Date(this.options.min);
    }
    /**
     * @return {?}
     */
    get max() {
        return this.options.max === undefined
            ? undefined
            : new Date(this.options.max);
    }
    /**
     * @return {?}
     */
    get is() {
        return this.options.range === undefined ? false : this.options.range;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.startDate === undefined) {
            /** @type {?} */
            const utcmin = new Date(this.min);
            this.startDate = new Date(utcmin.getTime() + utcmin.getTimezoneOffset() * 60000);
        }
        if (this.endDate === undefined) {
            /** @type {?} */
            const utcmax = new Date(this.max);
            this.endDate = new Date(utcmax.getTime() + utcmax.getTimezoneOffset() * 60000);
        }
        if (this.startYear === undefined) {
            this.startYear = new Date(this.startDate).getFullYear();
            this.initStartYear = this.startYear;
        }
        if (this.endYear === undefined) {
            this.endYear = new Date(this.endDate).getFullYear();
            this.initEndYear = this.endYear;
        }
        if (!this.isRange) {
            for (let i = this.startYear; i <= this.endYear + 1; i++) {
                this.listYears.push(i);
            }
        }
        else {
            for (let i = this.startYear; i < this.endYear; i++) {
                this.startListYears.push(i);
            }
            for (let i = this.startYear + 1; i <= this.endYear; i++) {
                this.endListYears.push(i);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleDateChange(event) {
        this.setupDateOutput();
        this.applyTypeChange();
        // Only if is range, use 2 dates to make the range
        if (this.isRange) {
            this.change.emit([this.startDate, this.endDate]);
        }
        else {
            this.change.emit(this.startDate);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleYearChange(event) {
        if (this.isRange) {
            this.endListYears = [];
            for (let i = this.startYear + 1; i <= this.initEndYear; i++) {
                this.endListYears.push(i);
            }
            this.startListYears = [];
            for (let i = this.initStartYear + 1; i < this.endYear; i++) {
                this.startListYears.push(i);
            }
            this.yearChange.emit([this.startYear, this.endYear]);
        }
        else {
            this.yearChange.emit(this.year);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleListYearChange(event) {
        this.handleYearChange([this.startYear, this.endYear]);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleListYearStartChange(event) {
        this.change.emit([this.startDate, this.endDate]);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    dateToNumber(date) {
        /** @type {?} */
        let newDate;
        if (date) {
            newDate = new Date(date);
        }
        else {
            newDate = new Date(this.min);
        }
        return newDate.getTime();
    }
    /**
     * @param {?} label
     * @return {?}
     */
    setSliderThumbLabel(label) {
        /** @type {?} */
        const thumbLabel = this.findThumbLabel(this.mySlider._elementRef.nativeElement.childNodes);
        if (thumbLabel) {
            thumbLabel.textContent = label;
        }
    }
    /**
     * @param {?} test
     * @return {?}
     */
    findThumbLabel(test) {
        /** @type {?} */
        let thumbLabel;
        test.forEach((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            if (value.className === 'mat-slider-thumb-label-text') {
                thumbLabel = value;
            }
            if (value.children.length > 0 && !thumbLabel) {
                thumbLabel = this.findThumbLabel(value.childNodes);
            }
        }), this);
        return thumbLabel;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    playFilter(event) {
        if (this.interval) {
            this.stopFilter();
        }
        else {
            this.playIcon = 'pause_circle_filled';
            this.interval = setInterval((/**
             * @param {?} that
             * @return {?}
             */
            (that) => {
                /** @type {?} */
                let newMinDateNumber;
                /** @type {?} */
                const maxDateNumber = new Date(that.max);
                newMinDateNumber =
                    that.date === undefined ? that.min.getTime() : that.date.getTime();
                newMinDateNumber += that.mySlider.step;
                that.date = new Date(newMinDateNumber);
                if (newMinDateNumber > maxDateNumber.getTime()) {
                    that.stopFilter();
                }
                that.handleDateChange({ value: that.date, date: that.date });
            }), this.timeInterval, this);
        }
    }
    /**
     * @return {?}
     */
    stopFilter() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = undefined;
        this.playIcon = 'play_circle_filled';
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleSliderDateChange(event) {
        this.date = new Date(event.value);
        this.setSliderThumbLabel(this.handleSliderTooltip());
        this.handleDateChange(event);
    }
    /**
     * @return {?}
     */
    handleSliderValue() {
        if (this.options.current === true || !this.min) {
            /** @type {?} */
            const currentDate = new Date();
            this.date = this.getRoundedDate(currentDate);
        }
        return this.date === undefined ? this.min.getTime() : this.date.getTime();
    }
    /**
     * @return {?}
     */
    handleSliderTooltip() {
        /** @type {?} */
        let label;
        switch (this.type) {
            case 'date':
                label =
                    this.date === undefined
                        ? this.min.toDateString()
                        : this.date.toDateString();
                break;
            case 'time':
                label =
                    this.date === undefined
                        ? this.min.toTimeString()
                        : this.date.toTimeString();
                break;
            // datetime
            default:
                label =
                    this.date === undefined
                        ? this.min.toUTCString()
                        : this.date.toUTCString();
                break;
        }
        return label;
    }
    /**
     * @return {?}
     */
    setupDateOutput() {
        if (this.style === 'slider') {
            this.startDate = new Date(this.date);
            this.startDate.setSeconds(-(this.step / 1000));
            this.endDate = new Date(this.startDate);
            this.endDate.setSeconds(this.step / 1000);
        }
        else if (!this.isRange && !!this.date) {
            this.endDate = new Date(this.date);
            this.startDate = new Date(this.date);
        }
        else if (this.isRange && (!!this.date || !this.date)) {
            this.startDate =
                this.startDate === undefined ? new Date(this.min) : this.startDate;
            this.endDate =
                this.endDate === undefined ? new Date(this.max) : this.endDate;
        }
        else if (!this.date) {
            this.startDate =
                this.startDate === undefined ? new Date(this.min) : this.startDate;
            this.endDate =
                this.endDate === undefined ? new Date(this.max) : this.endDate;
        }
    }
    /**
     * @return {?}
     */
    applyTypeChange() {
        switch (this.type) {
            case 'date':
                if (this.startDate !== undefined || this.endDate !== undefined) {
                    this.startDate.setHours(0);
                    this.startDate.setMinutes(0);
                    this.startDate.setSeconds(0);
                    this.endDate.setHours(23);
                    this.endDate.setMinutes(59);
                    this.endDate.setSeconds(59);
                }
                break;
            case 'time':
                if (this.style === 'calendar') {
                    if (this.startDate.getDay() !== this.min.getDay()) {
                        /** @type {?} */
                        const selectedHour = this.startDate.getHours();
                        /** @type {?} */
                        const selectedMinute = this.startDate.getMinutes();
                        this.startDate = this.min;
                        this.startDate.setHours(selectedHour);
                        this.startDate.setMinutes(selectedMinute);
                    }
                    if (this.endDate.getDay() !== this.min.getDay()) {
                        /** @type {?} */
                        const selectedHour = this.endDate.getHours();
                        /** @type {?} */
                        const selectedMinute = this.endDate.getMinutes();
                        this.endDate = this.min;
                        this.endDate.setHours(selectedHour);
                        this.endDate.setMinutes(selectedMinute);
                    }
                }
                if (!this.isRange && this.step > 60 * 60 * 1000) {
                    this.startDate.setMinutes(0);
                    this.startDate.setSeconds(0);
                    this.endDate.setMinutes(59);
                    this.endDate.setSeconds(59);
                }
                break;
            // datetime
            default:
            // do nothing
        }
    }
    /**
     * @return {?}
     */
    getRangeMinDate() {
        return this.startDate === undefined ? this.min : this.startDate;
    }
    /**
     * @return {?}
     */
    getRangeMaxDate() {
        return this.endDate === undefined ? this.max : this.endDate;
    }
    /**
     * Round date at a certain time, 10 minutes by Default
     * @param {?} date - Date to Round
     * @param {?=} atMinute - round to closest 'atMinute' minute, rounded 10 by default
     * @return {?} the rounded date
     */
    getRoundedDate(date, atMinute = 10) {
        /** @type {?} */
        const coeff = 1000 * 60 * atMinute;
        return new Date(Math.round(date.getTime() / coeff) * coeff);
    }
    /**
     * Get the step (period) definition from the layer dimension tag
     * @param {?} step The step as ISO 8601 example: PT10M for 10 Minutes
     * @return {?} the duration in milliseconds
     */
    getStepDefinition(step) {
        return duration(step).asMilliseconds();
    }
}
TimeFilterFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-time-filter-form',
                template: "<!-- <div *ngIf=\"style === 'calendar' && type !=='year'\">\r\n  <div *ngIf=\"!isRange\" class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <mat-form-field>\r\n      <mat-datetimepicker-toggle [for]=\"datetimePicker\" matSuffix></mat-datetimepicker-toggle>\r\n      <mat-datetimepicker #datetimePicker type=\"{{type}}\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\r\n      <input matInput autocomplete=\"false\"\r\n        placeholder=\"{{'igo.geo.timeFilter.date' | translate}}\"\r\n        [matDatetimepicker]=\"datetimePicker\"\r\n        [(ngModel)]=\"date\"\r\n        [min]=\"min\"\r\n        [max]=\"max\"\r\n        readonly=\"readonly\"\r\n        (dateChange)=\"handleDateChange($event)\">\r\n    </mat-form-field>\r\n\r\n  </div>\r\n\r\n  <div *ngIf=\"isRange\">\r\n    <div class=\"igo-col igo-col-100\">\r\n      <mat-form-field>\r\n        <mat-datetimepicker-toggle [for]=\"minDatetimePicker\" matSuffix></mat-datetimepicker-toggle>\r\n        <mat-datetimepicker #minDatetimePicker type=\"{{type}}\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\r\n        <input matInput autocomplete=\"false\"\r\n          placeholder=\"{{'igo.geo.timeFilter.startDate' | translate}}\"\r\n          [matDatetimepicker]=\"minDatetimePicker\"\r\n          [(ngModel)]=\"startDate\"\r\n          [min]=\"min\"\r\n          [max]=\"getRangeMaxDate()\"\r\n          readonly=\"readonly\"\r\n          (input)=\"startDate\"\r\n          (dateChange)=\"handleDateChange($event)\">\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"igo-col igo-col-100\">\r\n      <mat-form-field>\r\n        <mat-datetimepicker-toggle [for]=\"maxDatetimePicker\" matSuffix></mat-datetimepicker-toggle>\r\n        <mat-datetimepicker #maxDatetimePicker type=\"{{type}}\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\r\n        <input matInput autocomplete=\"false\"\r\n          placeholder=\"{{'igo.geo.timeFilter.endDate' | translate}}\"\r\n          [matDatetimepicker]=\"maxDatetimePicker\"\r\n          [(ngModel)]=\"endDate\"\r\n          [min]=\"getRangeMinDate()\"\r\n          [max]=\"max\"\r\n          readonly=\"readonly\"\r\n          (dateChange)=\"handleDateChange($event)\">\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div *ngIf=\"style === 'calendar' && type ==='year'\">\r\n\r\n  <div *ngIf=\"!isRange\" class=\"igo-col igo-col-100 igo-col-100-m\">\r\n        <mat-form-field>\r\n            <mat-select placeholder=\"{{'igo.geo.timeFilter.date' | translate}}\" [(ngModel)]=\"year\" (selectionChange)=\"handleYearChange($event)\">\r\n                  <mat-option [value]=\"year\" *ngFor=\"let year of listYears\">{{year}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"isRange\">\r\n    <div class=\"igo-col igo-col-100\">\r\n        <mat-form-field>\r\n            <mat-select placeholder=\"{{'igo.geo.timeFilter.startDate' | translate}}\" [(ngModel)]=\"startYear\" (selectionChange)=\"handleYearChange($event)\">\r\n              <mat-option [value]=\"startYear\" *ngFor=\"let startYear of startListYears\">{{startYear}}</mat-option>\r\n            </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div class=\"igo-col igo-col-100\">\r\n    <mat-form-field>\r\n        <mat-select placeholder=\"{{'igo.geo.timeFilter.endDate' | translate}}\" [(ngModel)]=\"endYear\" (selectionChange)=\"handleYearChange($event)\">\r\n              <mat-option [value]=\"endYear\" *ngFor=\"let endYear of endListYears\">{{endYear}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n\r\n  <br>\r\n\r\n\r\n<div *ngIf=\"style === 'slider'\" class=\"igo-col igo-col-100 igo-col-100-m\">\r\n  <mat-slider\r\n      id=\"time-slider\"\r\n      tickInterval=\"auto\"\r\n      step=\"{{step}}\"\r\n      [min]=\"dateToNumber(min)\"\r\n      [max]=\"dateToNumber(max)\"\r\n      [value]=\"handleSliderValue()\"\r\n      thumbLabel\r\n      (input)=\"handleSliderDateChange($event)\"\r\n      (selectionChange)=\"handleSliderDateChange($event)\">\r\n  </mat-slider>\r\n  <p class=\"date-below\">{{handleSliderTooltip()}}</p>\r\n  <button mat-icon-button color=\"primary\" (click)=\"playFilter($event)\">\r\n   <mat-icon svgIcon=\"{{playIcon}}\"></mat-icon>\r\n  </button>\r\n</div> -->\r\n",
                styles: [".igo-layer-filters-container{padding-left:5px}mat-slider>>>div.mat-slider-thumb-label{width:32px;height:32px;margin:0 auto}mat-slider>>>span.mat-slider-thumb-label-text{font-size:8px}#time-slider{width:70%;margin:0 auto}@media only screen and (max-width:450px),only screen and (max-height:450px){#time-slider{width:60%;margin:0 auto}}#playFilterIcon{font-size:32px;cursor:pointer}.date-below{margin:0}mat-form-field{text-align:center}"]
            }] }
];
/** @nocollapse */
TimeFilterFormComponent.ctorParameters = () => [];
TimeFilterFormComponent.propDecorators = {
    options: [{ type: Input }],
    currentValue: [{ type: Input }],
    change: [{ type: Output }],
    yearChange: [{ type: Output }],
    mySlider: [{ type: ViewChild, args: [MatSlider,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimeFilterItemComponent {
    /**
     * @param {?} timeFilterService
     */
    constructor(timeFilterService) {
        this.timeFilterService = timeFilterService;
    }
    /**
     * @return {?}
     */
    get layer() {
        return this._layer;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set layer(value) {
        this._layer = value;
    }
    /**
     * @return {?}
     */
    get datasource() {
        return (/** @type {?} */ (this.layer.dataSource));
    }
    /**
     * @param {?} year
     * @return {?}
     */
    handleYearChange(year) {
        this.timeFilterService.filterByYear(this.datasource, year);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    handleDateChange(date) {
        this.timeFilterService.filterByDate(this.datasource, date);
    }
}
TimeFilterItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-time-filter-item',
                template: "<mat-list-item>\r\n  <mat-icon\r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse\r\n    [target]=\"filters\"\r\n    [collapsed]=\"false\"\r\n    svgIcon=\"chevron-up\" >\r\n  </mat-icon>\r\n  <h4 matLine>{{layer.title}}</h4>\r\n</mat-list-item>\r\n\r\n<div #filters class=\"igo-datasource-filters-container\">\r\n  <igo-time-filter-form\r\n    [options]=\"datasource.options.timeFilter\"\r\n    [currentValue]=\"datasource.options.params.time\"\r\n    (change)=\"handleDateChange($event)\"\r\n    (yearChange)=\"handleYearChange($event)\">\r\n  </igo-time-filter-form>\r\n</div>\r\n",
                styles: [":host{overflow:hidden}.igo-datasource-filters-container{text-align:center;width:100%;display:inline-block}"]
            }] }
];
/** @nocollapse */
TimeFilterItemComponent.ctorParameters = () => [
    { type: TimeFilterService }
];
TimeFilterItemComponent.propDecorators = {
    layer: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimeFilterListComponent {
    /**
     * @param {?} cdRef
     */
    constructor(cdRef) {
        this.cdRef = cdRef;
        this._layers = [];
    }
    /**
     * @return {?}
     */
    get layers() {
        return this._layers;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set layers(value) {
        this._layers = value;
        this.cdRef.detectChanges();
    }
}
TimeFilterListComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-time-filter-list',
                template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <ng-template ngFor let-layer [ngForOf]=\"layers | filterableDataSource: 'time'\">\r\n    <igo-time-filter-item igoListItem [layer]=\"layer\"></igo-time-filter-item>\r\n  </ng-template>\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
TimeFilterListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
TimeFilterListComponent.propDecorators = {
    layers: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimeFilterListBindingDirective {
    /**
     * @param {?} component
     * @param {?} mapService
     */
    constructor(component, mapService) {
        this.mapService = mapService;
        this.component = component;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Override input layers
        this.component.layers = [];
        this.layers$$ = this.mapService.getMap().layers$.subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        layers => {
            this.component.layers = layers;
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.layers$$.unsubscribe();
    }
}
TimeFilterListBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoTimeFilterListBinding]'
            },] }
];
/** @nocollapse */
TimeFilterListBindingDirective.ctorParameters = () => [
    { type: TimeFilterListComponent, decorators: [{ type: Self }] },
    { type: MapService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WktService {
    constructor() { }
    /**
     * @param {?} wkt
     * @param {?} wktProj
     * @param {?=} featureProj
     * @return {?}
     */
    wktToFeature(wkt, wktProj, featureProj = 'EPSG:3857') {
        return new olWKT().readFeature(wkt, {
            dataProjection: wktProj,
            featureProjection: featureProj
        });
    }
    /**
     * @param {?} epsgTO
     * @param {?} extent
     * @param {?} extentProj
     * @return {?}
     */
    extentToWkt(epsgTO, extent, extentProj) {
        /** @type {?} */
        let currentExtent = transformExtent(extent, extentProj, epsgTO);
        currentExtent = this.roundCoordinateArray(currentExtent, epsgTO, 0);
        /** @type {?} */
        const wktPoly = `POLYGON((
      ${extent[0]} ${extent[1]},
      ${extent[0]} ${extent[3]},
      ${extent[2]} ${extent[3]},
      ${extent[2]} ${extent[1]},
      ${extent[0]} ${extent[1]}))`;
        /** @type {?} */
        const wktLine = `LINESTRING(
      ${extent[0]} ${extent[1]},
      ${extent[0]} ${extent[3]},
      ${extent[2]} ${extent[3]},
      ${extent[2]} ${extent[1]},
      ${extent[0]} ${extent[1]})`;
        /** @type {?} */
        const wktMultiPoints = `MULTIPOINT(
        ${extent[0]} ${extent[1]},
        ${extent[0]} ${extent[3]},
        ${extent[2]} ${extent[3]},
        ${extent[2]} ${extent[1]})`;
        return {
            wktPoly,
            wktLine,
            wktMultiPoints
        };
    }
    /**
     * @private
     * @param {?} coordinateArray
     * @param {?} projection
     * @param {?=} decimal
     * @return {?}
     */
    roundCoordinateArray(coordinateArray, projection, decimal = 0) {
        /** @type {?} */
        const lproj = get(projection);
        /** @type {?} */
        const units = lproj.getUnits();
        /** @type {?} */
        const olUnits = ['ft', 'm', 'us-ft'];
        if (olUnits.indexOf(units) !== -1) {
            coordinateArray = this.roundArray(coordinateArray, decimal);
        }
        return coordinateArray;
    }
    /**
     * @private
     * @param {?} array
     * @param {?=} decimal
     * @return {?}
     */
    roundArray(array, decimal = 0) {
        /** @type {?} */
        let x = 0;
        while (x < array.length) {
            array[x] = array[x].toFixed(decimal);
            x++;
        }
        return array;
    }
    /**
     * @param {?} snrc
     * @param {?=} epsgTO
     * @return {?}
     */
    snrcToWkt(snrc, epsgTO = 'EPSG:3857') {
        snrc = snrc.toLowerCase();
        /** @type {?} */
        let wktPoly;
        /** @type {?} */
        const ew = {
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
        const sn = {
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
        const snrc250kIndex = [
            ['m', 'n', 'o', 'p'],
            ['l', 'k', 'j', 'i'],
            ['e', 'f', 'g', 'h'],
            ['d', 'c', 'b', 'a']
        ];
        /** @type {?} */
        const snrc50kIndex = [
            ['13', '14', '15', '16'],
            ['12', '11', '10', '09'],
            ['05', '06', '07', '08'],
            ['04', '03', '02', '01']
        ];
        /** @type {?} */
        const checkSNRC50k = /\d{2,3}[a-p][0,1][0-9]/gi;
        /** @type {?} */
        const checkSNRC250k = /\d{2,3}[a-p]/gi;
        /** @type {?} */
        const checkSNRC1m = /\d{2,3}/gi;
        /** @type {?} */
        let snrc1m = false;
        /** @type {?} */
        let snrc250k = false;
        /** @type {?} */
        let snrc50k = false;
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
            const regex1m = /(?=[a-p])/gi;
            /** @type {?} */
            const ar1m = snrc.split(regex1m);
            /** @type {?} */
            const part1m = ar1m[0];
            /** @type {?} */
            const part250k = ar1m[1][0];
            /** @type {?} */
            const part50k = ar1m[1].split(part250k)[1];
            /** @type {?} */
            let separator = 1;
            if (part1m.length === 3) {
                separator = 2;
            }
            /** @type {?} */
            const partEW = part1m.substring(0, separator);
            /** @type {?} */
            const partSN = part1m.substring(separator);
            /** @type {?} */
            const unit1mEW = 8;
            /** @type {?} */
            const unit1mSN = 4;
            /** @type {?} */
            const unit250kEW = 2;
            /** @type {?} */
            const unit250kSN = 1;
            /** @type {?} */
            const unit50kEW = 0.5;
            /** @type {?} */
            const unit50kSN = 0.25;
            /** @type {?} */
            let index250kEW = 0;
            /** @type {?} */
            let index250kSN = 0;
            /** @type {?} */
            let index50kEW = 0;
            /** @type {?} */
            let index50kSN = 0;
            snrc250kIndex.forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
                if (element.indexOf(part250k) !== -1) {
                    index250kSN = snrc250kIndex.indexOf(element);
                    index250kEW = element.indexOf(part250k);
                }
            }));
            snrc50kIndex.forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
                if (element.indexOf(part50k) !== -1) {
                    index50kSN = snrc50kIndex.indexOf(element);
                    index50kEW = element.indexOf(part50k);
                }
            }));
            /** @type {?} */
            let increment250kEW = 0;
            /** @type {?} */
            let increment250kSN = 0;
            /** @type {?} */
            let increment50kEW = 0;
            /** @type {?} */
            let increment50kSN = 0;
            /** @type {?} */
            let unitPerTypeEW = unit1mEW;
            /** @type {?} */
            let unitPerTypeSN = unit1mSN;
            if (snrc250k) {
                increment250kEW = index250kEW * unit250kEW;
                increment250kSN = index250kSN * unit250kSN;
                increment50kEW = 0;
                increment50kSN = 0;
                unitPerTypeEW = unit250kEW;
                unitPerTypeSN = unit250kSN;
            }
            else if (snrc50k) {
                increment250kEW = index250kEW * unit250kEW;
                increment250kSN = index250kSN * unit250kSN;
                increment50kEW = index50kEW * unit50kEW;
                increment50kSN = index50kSN * unit50kSN;
                unitPerTypeEW = unit50kEW;
                unitPerTypeSN = unit50kSN;
            }
            /** @type {?} */
            const coord = {
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
            coord.ul = transform([coord.ul[0], coord.ul[1]], 'EPSG:4326', epsgTO);
            coord.lr = transform([coord.lr[0], coord.lr[1]], 'EPSG:4326', epsgTO);
            coord.ur = transform([coord.ur[0], coord.ur[1]], 'EPSG:4326', epsgTO);
            coord.ll = transform([coord.ll[0], coord.ll[1]], 'EPSG:4326', epsgTO);
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
            const wktLine = 'LINESTRING(' +
                [
                    coord.ul.join(' '),
                    coord.ur.join(' '),
                    coord.lr.join(' '),
                    coord.ll.join(' '),
                    coord.ul.join(' ')
                ].join(',') +
                ')';
            /** @type {?} */
            const wktMultiPoints = 'MULTIPOINT(' +
                [
                    coord.ul.join(' '),
                    coord.ur.join(' '),
                    coord.lr.join(' '),
                    coord.ll.join(' ')
                ].join(',') +
                ')';
            return {
                wktPoly,
                wktLine,
                wktMultiPoints
            };
        }
    }
}
WktService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WktService.ctorParameters = () => [];
/** @nocollapse */ WktService.ngInjectableDef = defineInjectable({ factory: function WktService_Factory() { return new WktService(); }, token: WktService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OgcFilterFormComponent {
    /**
     * @param {?} wktService
     */
    constructor(wktService) {
        this.wktService = wktService;
        this.value = '';
        this.color = 'primary';
        this.snrc = '';
        this.baseOverlayName = 'ogcFilterOverlay_';
        // TODO: Filter permitted operator based on wfscapabilities
        // Need to work on regex on XML capabilities because
        // comaparison operator's name varies between WFS servers...
        // Ex: IsNull vs PropertyIsNull vs IsNil ...
        this.ogcFilterOperators = new OgcFilterWriter().operators;
        this.igoSpatialSelectors = [
            {
                type: 'fixedExtent'
            },
            {
                type: 'snrc'
            }
        ];
        // TODO: selectFeature & drawFeature
    }
    /**
     * @return {?}
     */
    get activeFilters() {
        this.updateField();
        return this.datasource.options.ogcFilters.interfaceOgcFilters.filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.active === true));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.computeAllowedOperators();
    }
    /**
     * @return {?}
     */
    computeAllowedOperators() {
        /** @type {?} */
        let allowedOperators = this.datasource.options.ogcFilters.allowedOperatorsType;
        /** @type {?} */
        let effectiveOperators = {};
        if (!allowedOperators) {
            allowedOperators = OgcFilterOperatorType.BasicAndSpatial;
        }
        switch (allowedOperators.toLowerCase()) {
            case 'all':
                effectiveOperators = this.ogcFilterOperators;
                break;
            case 'spatial':
                effectiveOperators = {
                    Intersects: { spatial: true, fieldRestrict: [] },
                    Within: { spatial: true, fieldRestrict: [] },
                };
                break;
            case 'basicandspatial':
                effectiveOperators = {
                    PropertyIsEqualTo: { spatial: false, fieldRestrict: [] },
                    PropertyIsNotEqualTo: { spatial: false, fieldRestrict: [] },
                    Intersects: { spatial: true, fieldRestrict: [] },
                    Within: { spatial: true, fieldRestrict: [] },
                };
                break;
            case 'basic':
                effectiveOperators = {
                    PropertyIsEqualTo: { spatial: false, fieldRestrict: [] },
                    PropertyIsNotEqualTo: { spatial: false, fieldRestrict: [] }
                };
                break;
            case 'basicnumeric':
                effectiveOperators = {
                    PropertyIsEqualTo: { spatial: false, fieldRestrict: [] },
                    PropertyIsNotEqualTo: { spatial: false, fieldRestrict: [] },
                    PropertyIsGreaterThan: { spatial: false, fieldRestrict: ['number'] },
                    PropertyIsGreaterThanOrEqualTo: { spatial: false, fieldRestrict: ['number'] },
                    PropertyIsLessThan: { spatial: false, fieldRestrict: ['number'] },
                    PropertyIsLessThanOrEqualTo: { spatial: false, fieldRestrict: ['number'] },
                };
                break;
            default:
                effectiveOperators = {
                    PropertyIsEqualTo: { spatial: false, fieldRestrict: [] },
                    PropertyIsNotEqualTo: { spatial: false, fieldRestrict: [] },
                    Intersects: { spatial: true, fieldRestrict: [] },
                    Within: { spatial: true, fieldRestrict: [] },
                };
        }
        this.ogcFilterOperators = effectiveOperators;
    }
    /**
     * @return {?}
     */
    updateField() {
        if (!this.datasource.options.sourceFields) {
            return;
        }
        this.fields = this.datasource.options.sourceFields
            .filter((/**
         * @param {?} sf
         * @return {?}
         */
        sf => (sf.excludeFromOgcFilters === undefined || !sf.excludeFromOgcFilters)));
        this.fields.filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name === this.currentFilter.propertyName))
            .forEach((/**
         * @param {?} element
         * @return {?}
         */
        element => {
            this.values = element.values !== undefined ? element.values.sort() : [];
        }));
    }
    /**
     * @param {?} event
     * @param {?} filter
     * @param {?} property
     * @return {?}
     */
    toggleFilterState(event, filter, property) {
        this.updateField();
        if (event.checked) {
            this.datasource.options.ogcFilters.interfaceOgcFilters
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            f => f.filterid === filter.filterid))
                .forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
                element[property] = true;
            }));
        }
        else {
            this.removeOverlayByID(filter.filterid);
            this.datasource.options.ogcFilters.interfaceOgcFilters
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            f => f.filterid === filter.filterid))
                .forEach((/**
             * @param {?} element
             * @return {?}
             */
            element => {
                element[property] = false;
            }));
        }
        this.refreshFilters();
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    deleteFilter(filter) {
        /** @type {?} */
        const ogcFilters = this.datasource.options.ogcFilters;
        ogcFilters.interfaceOgcFilters = ogcFilters.interfaceOgcFilters.filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.filterid !== filter.filterid));
        this.removeOverlayByID(filter.filterid);
        this.refreshFilters();
    }
    /**
     * @param {?} filter
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    changeNumericProperty(filter, property, value) {
        this.changeProperty(filter, property, parseFloat(value));
        this.refreshFilters();
    }
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    removeOverlayByID(id) {
        /** @type {?} */
        const overlayId = this.baseOverlayName + id;
        if (this.map.overlay.dataSource.ol.getFeatureById(overlayId)) {
            this.map.overlay.dataSource.ol.removeFeature(this.map.overlay.dataSource.ol.getFeatureById(overlayId));
        }
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    changeOperator(filter) {
        if (this.ogcFilterOperators[filter.operator].spatial === false) {
            this.removeOverlayByID(filter.filterid);
        }
        this.refreshFilters();
    }
    /**
     * @param {?} filter
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    changeProperty(filter, property, value) {
        this.datasource.options.ogcFilters.interfaceOgcFilters
            .filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.filterid === filter.filterid))
            .forEach((/**
         * @param {?} element
         * @return {?}
         */
        element => {
            element[property] = value;
        }));
        this.refreshFilters();
    }
    /**
     * @param {?} filter
     * @param {?=} value
     * @return {?}
     */
    changeGeometry(filter, value) {
        /** @type {?} */
        const checkSNRC50k = /\d{2,3}[a-l][0,1][0-9]/gi;
        /** @type {?} */
        const checkSNRC250k = /\d{2,3}[a-p]/gi;
        /** @type {?} */
        const checkSNRC1m = /\d{2,3}/gi;
        /** @type {?} */
        const mapProjection = this.map.projection;
        this.removeOverlayByID(filter.filterid);
        this.datasource.options.ogcFilters.interfaceOgcFilters
            .filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.filterid === filter.filterid))
            .forEach((/**
         * @param {?} element
         * @return {?}
         */
        element => {
            /** @type {?} */
            let wktPoly;
            if (filter.igoSpatialSelector === 'snrc') {
                if (value === '' && this.snrc !== '') {
                    wktPoly = this.wktService.snrcToWkt(this.snrc).wktPoly;
                    element.wkt_geometry = wktPoly;
                }
                else if (value !== '' &&
                    (checkSNRC1m.test(value) ||
                        checkSNRC250k.test(value) ||
                        checkSNRC50k.test(value))) {
                    wktPoly = this.wktService.snrcToWkt(value).wktPoly;
                    element.wkt_geometry = wktPoly;
                }
            }
            else if (filter.igoSpatialSelector === 'fixedExtent') {
                wktPoly = this.wktService.extentToWkt(mapProjection, this.map.getExtent(), mapProjection).wktPoly;
                element.wkt_geometry = wktPoly;
            }
        }));
        this.refreshFilters();
    }
}
OgcFilterFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filter-form',
                template: "<mat-list-item>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\">\r\n    <mat-select class=\"logical\" [disabled]=\"!currentFilter.active\" (selectionChange)=\"refreshFilters()\" [(ngModel)]=\"currentFilter.parentLogical\"\r\n      *ngIf=\"activeFilters.indexOf(currentFilter) !== 0 && currentFilter.active===true\">\r\n      <mat-option value=\"And\">{{'igo.geo.operators.And' | translate}}</mat-option>\r\n      <mat-option value=\"Or\">{{'igo.geo.operators.Or' | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n  <!-- NON SPATIAL -->\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n    <span *ngIf=\"fields && fields.length > 0 && fields[0].name !== ''\">\r\n      <mat-select [disabled]=\"!currentFilter.active\" *ngIf=\"['Contains','Intersects','Within'].indexOf(currentFilter.operator) === -1\"\r\n        [(ngModel)]=\"currentFilter.propertyName\" tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.sourceFields.selectField' | translate\"\r\n        (selectionChange)=\"updateField()\">\r\n        <mat-option *ngFor=\"let field of fields\" [value]=\"field.name\">{{field.alias}}</mat-option>\r\n      </mat-select>\r\n    </span>\r\n    <span *ngIf=\"fields && fields.length === 1 && fields[0].name === ''\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput #fieldPerUser (keyup)=\"changeProperty(currentFilter,'propertyName',fieldPerUser.value)\"\r\n          (blur)=\"changeProperty(currentFilter,'propertyName',fieldPerUser.value)\" [(ngModel)]=\"currentFilter.propertyName\">\r\n\r\n        <button mat-button *ngIf=\"currentFilter.propertyName\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.propertyName=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n    <mat-select [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.operator\" (selectionChange)=\"changeOperator(currentFilter)\">\r\n      <mat-option *ngFor=\"let operator of ogcFilterOperators | keyvalue\" [value]=\"operator.key\">{{('igo.geo.operators.'+ operator.key) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator !== 'Intersects' && currentFilter.operator !== 'Contains' && currentFilter.operator !== 'Within')\">\r\n\r\n    <!-- PropertyIsEqualTo -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsEqualTo' || currentFilter.operator === 'PropertyIsNotEqualTo'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #expressionequalto (keyup)=\"changeProperty(currentFilter,'expression',expressionequalto.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'expression',expressionequalto.value)\" [ngModel]=\"currentFilter.expression\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.expression\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.expression=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsEqualTo  -->\r\n\r\n\r\n    <!-- PropertyIsLike  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsLike'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #pattern (keyup)=\"changeProperty(currentFilter,'pattern',pattern.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'pattern',pattern.value)\" [ngModel]=\"currentFilter.pattern\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.pattern\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.pattern=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsLike  -->\r\n\r\n    <!-- PropertyIsNull  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsNull'\"></span>\r\n    <!-- PropertyIsNull  -->\r\n\r\n    <!-- PropertyIs_Than  -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsGreaterThan' || currentFilter.operator === 'PropertyIsGreaterThanOrEqualTo' || currentFilter.operator === 'PropertyIsLessThan' || currentFilter.operator === 'PropertyIsLessThanOrEqualTo'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #expressionthan type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'expression',expressionthan.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'expression',expressionthan.value)\" [ngModel]=\"currentFilter.expression\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.expression\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.expression=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n    </span>\r\n    <!-- PropertyIs_Than  -->\r\n\r\n\r\n    <!-- PropertyIsBetween -->\r\n    <span *ngIf=\"currentFilter.operator === 'PropertyIsBetween'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #lowerBoundary type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'lowerBoundary',lowerBoundary.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'lowerBoundary',lowerBoundary.value)\" [ngModel]=\"currentFilter.lowerBoundary\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.lowerBoundary\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.lowerBoundary=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #upperBoundary type=\"number\" (keyup)=\"changeNumericProperty(currentFilter,'upperBoundary',upperBoundary.value)\"\r\n          (ngModelChange)=\"changeNumericProperty(currentFilter,'upperBoundary',upperBoundary.value)\" [ngModel]=\"currentFilter.upperBoundary\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.upperBoundary\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.upperBoundary=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n    </span>\r\n    <!-- PropertyIsBetween  -->\r\n\r\n\r\n    <!-- During -->\r\n    <span *ngIf=\"currentFilter.operator === 'During'\">\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #begin (keyup)=\"changeProperty(currentFilter,'begin',begin.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'begin',begin.value)\" [ngModel]=\"currentFilter.begin\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values \" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.begin\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.begin=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field>\r\n        <input [disabled]=\"!currentFilter.active\" matInput [matAutocomplete]=\"auto\" #end (keyup)=\"changeProperty(currentFilter,'end',end.value)\"\r\n          (ngModelChange)=\"changeProperty(currentFilter,'end',end.value)\" [ngModel]=\"currentFilter.end\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let value of values\" [value]=\"value\">\r\n            <span>{{ value }}</span>\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n        <button mat-button *ngIf=\"currentFilter.end\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"currentFilter.end=''\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n\r\n\r\n    </span>\r\n    <!-- During  -->\r\n  </div>\r\n  <!-- NON SPATIAL -->\r\n\r\n\r\n  <!-- PropertySpatial  -->\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <mat-select [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.operator\" (selectionChange)=\"changeOperator(currentFilter)\">\r\n      <mat-option *ngFor=\"let operator of ogcFilterOperators | keyvalue\" [value]=\"operator.key\">{{('igo.geo.operators.'+ operator.key) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <mat-select [disabled]=\"!currentFilter.active\" [(ngModel)]=\"currentFilter.igoSpatialSelector\" (selectionChange)=\"changeGeometry(currentFilter,value)\">\r\n      <mat-option *ngFor=\"let igoSpatialSelector of igoSpatialSelectors\" [value]=\"igoSpatialSelector.type\">{{('igo.geo.spatialSelector.'+ igoSpatialSelector.type) | translate}}</mat-option>\r\n    </mat-select>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-90 igo-col-100-m\" *ngIf=\"(currentFilter.operator === 'Intersects' || currentFilter.operator === 'Contains' || currentFilter.operator === 'Within')\">\r\n    <button mat-button [disabled]=\"!currentFilter.active\" *ngIf=\"currentFilter.igoSpatialSelector === 'fixedExtent'\"\r\n      matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"changeGeometry(currentFilter,value)\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.spatialSelector.btnSetExtent' | translate\">\r\n      <mat-icon svgIcon=\"arrow-expand-all\"></mat-icon>\r\n    </button>\r\n\r\n\r\n    <mat-form-field *ngIf=\"currentFilter.igoSpatialSelector === 'snrc'\">\r\n      <input matInput #htmlSnrc (keyup)=\"changeGeometry(currentFilter,htmlSnrc.value)\" (blur)=\"changeGeometry(currentFilter,htmlSnrc.value)\"\r\n        [(ngModel)]=\"snrc\">\r\n      <button mat-button *ngIf=\"snrc\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"snrc=''\">\r\n        <mat-icon svgIcon=\"close\"></mat-icon>\r\n      </button>\r\n    </mat-form-field>\r\n  </div>\r\n  <!-- PropertySpatial  -->\r\n\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <div class=\"igo-layer-button-group\">\r\n      <mat-slide-toggle class=\"example-margin\" (change)=\"toggleFilterState($event,currentFilter,'active')\" tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.toggleFilterState' | translate\" [color]=\"color\" [checked]=\"currentFilter.active\"\r\n        [disabled]=\"disabled\">\r\n      </mat-slide-toggle>\r\n      <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.filter.removeFilter' | translate\"\r\n        color=\"warn\" (click)=\"deleteFilter(currentFilter)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <mat-divider></mat-divider>\r\n</mat-list-item>\r\n",
                styles: [":host{overflow:hidden}.mat-list-item{height:auto}.mat-list-item>>>div.mat-list-item-content{display:inline-table}.logical{font-weight:700}input,mat-select{margin-top:10px;text-align:center}.igo-layer-actions-container{width:100%;display:inline-block}.igo-layer-actions-container>div{text-align:center}.igo-layer-button-group{float:center;padding:0 3px}@media only screen and (max-width:450px),only screen and (max-height:450px){.igo-layer-button-group{float:none}}mat-icon.disabled{color:rgba(0,0,0,.38)}"]
            }] }
];
/** @nocollapse */
OgcFilterFormComponent.ctorParameters = () => [
    { type: WktService }
];
OgcFilterFormComponent.propDecorators = {
    refreshFilters: [{ type: Input }],
    datasource: [{ type: Input }],
    map: [{ type: Input }],
    currentFilter: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OgcFilterableFormComponent {
    constructor() {
        this.color = 'primary';
    }
    /**
     * @return {?}
     */
    get refreshFunc() {
        return this.refreshFilters;
    }
    /**
     * @return {?}
     */
    get advancedOgcFilters() {
        if (this.datasource.options.ogcFilters) {
            return this.datasource.options.ogcFilters.advancedOgcFilters;
        }
        return;
    }
}
OgcFilterableFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filterable-form',
                template: "<igo-list *ngIf=\"!advancedOgcFilters\" [navigation]=\"false\" [selection]=\"true\">\r\n  <igo-ogc-filter-toggle-button igoListItem [datasource]=\"datasource\" [map]=\"map\" [refreshFilters]=\"refreshFunc\">\r\n  </igo-ogc-filter-toggle-button>\r\n</igo-list>\r\n\r\n<igo-list *ngIf=\"advancedOgcFilters\" [navigation]=\"false\" [selection]=\"true\">\r\n  <ng-template ngFor let-currentFilter [ngForOf]=\"this.datasource.options.ogcFilters.interfaceOgcFilters\">\r\n    <igo-ogc-filter-form igoListItem [color]=\"color\" [currentFilter]=\"currentFilter\" [datasource]=\"datasource\"\r\n      [map]=\"map\" [refreshFilters]=\"refreshFunc\">\r\n    </igo-ogc-filter-form>\r\n  </ng-template>\r\n</igo-list>\r\n"
            }] }
];
/** @nocollapse */
OgcFilterableFormComponent.ctorParameters = () => [];
OgcFilterableFormComponent.propDecorators = {
    datasource: [{ type: Input }],
    map: [{ type: Input }],
    refreshFilters: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OgcFilterableItemComponent {
    /**
     * @param {?} ogcFilterService
     * @param {?} downloadService
     */
    constructor(ogcFilterService, downloadService) {
        this.ogcFilterService = ogcFilterService;
        this.downloadService = downloadService;
        this.color = 'primary';
        this.defaultLogicalParent = 'And';
        this.hasActiveSpatialFilter = false;
        this.filtersAreEditable = true;
        this.filtersCollapsed = true;
        this.hasPushButton = false;
    }
    /**
     * @return {?}
     */
    get refreshFunc() {
        return this.refreshFilters.bind(this);
    }
    /**
     * @return {?}
     */
    get datasource() {
        return (/** @type {?} */ (this.layer.dataSource));
    }
    /**
     * @return {?}
     */
    get downloadable() {
        return ((/** @type {?} */ (this.datasource.options))).download;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const ogcFilters = this.datasource.options.ogcFilters;
        if (ogcFilters.pushButtons &&
            ogcFilters.pushButtons.length > 0) {
            if (ogcFilters.advancedOgcFilters === undefined) {
                ogcFilters.advancedOgcFilters = false;
            }
            this.hasPushButton = true;
        }
        switch (this.datasource.options.type) {
            case 'wms':
                this.ogcFilterService.setOgcWMSFiltersOptions(this.datasource);
                break;
            case 'wfs':
                this.ogcFilterService.setOgcWFSFiltersOptions(this.datasource);
                break;
            default:
                break;
        }
        if (ogcFilters) {
            if (ogcFilters.interfaceOgcFilters) {
                this.lastRunOgcFilter = JSON.parse(JSON.stringify(ogcFilters.interfaceOgcFilters));
                if (ogcFilters.interfaceOgcFilters.filter((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => f.wkt_geometry)).length >= 1) {
                    this.hasActiveSpatialFilter = true;
                }
            }
            this.filtersAreEditable = ogcFilters.editable
                ? ogcFilters.editable
                : false;
        }
    }
    /**
     * @return {?}
     */
    addFilterToSequence() {
        this.filtersCollapsed = false;
        /** @type {?} */
        const interfaceOgcFilters = this.datasource.options.ogcFilters.interfaceOgcFilters;
        /** @type {?} */
        const arr = interfaceOgcFilters || [];
        /** @type {?} */
        const lastLevel = arr.length === 0 ? 0 : arr[arr.length - 1].level;
        /** @type {?} */
        let firstFieldName = '';
        if (this.datasource.options.sourceFields.length > 0) {
            firstFieldName =
                this.datasource.options.sourceFields[0].name === undefined
                    ? ''
                    : this.datasource.options.sourceFields[0].name;
        }
        /** @type {?} */
        let fieldNameGeometry;
        /** @type {?} */
        const datasourceOptions = (/** @type {?} */ (this.datasource
            .options));
        if (datasourceOptions.fieldNameGeometry) {
            fieldNameGeometry = datasourceOptions.fieldNameGeometry;
        }
        else if (((/** @type {?} */ (this.datasource.options))).paramsWFS &&
            ((/** @type {?} */ (this.datasource.options))).paramsWFS.fieldNameGeometry) {
            fieldNameGeometry = ((/** @type {?} */ (this.datasource.options))).paramsWFS
                .fieldNameGeometry;
        }
        /** @type {?} */
        const status = arr.length === 0 ? true : false;
        arr.push(new OgcFilterWriter().addInterfaceFilter((/** @type {?} */ ({
            propertyName: firstFieldName,
            operator: 'PropertyIsEqualTo',
            active: status,
            igoSpatialSelector: 'fixedExtent'
        })), fieldNameGeometry, lastLevel, this.defaultLogicalParent));
        this.datasource.options.ogcFilters.interfaceOgcFilters = arr;
    }
    /**
     * @return {?}
     */
    openDownload() {
        this.downloadService.open(this.layer);
    }
    /**
     * @param {?=} force
     * @return {?}
     */
    refreshFilters(force) {
        if (force === true) {
            this.lastRunOgcFilter = undefined;
        }
        /** @type {?} */
        const ogcFilters = this.datasource.options.ogcFilters;
        /** @type {?} */
        const ogcFilterWriter = new OgcFilterWriter();
        /** @type {?} */
        const activeFilters = ogcFilters.interfaceOgcFilters.filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.active === true));
        if (activeFilters.length === 0) {
            ogcFilters.filters = undefined;
            ogcFilters.filtered = false;
        }
        if (activeFilters.length > 1) {
            activeFilters[0].parentLogical = activeFilters[1].parentLogical;
        }
        if (activeFilters.filter((/**
         * @param {?} af
         * @return {?}
         */
        af => ['Contains', 'Intersects', 'Within'].indexOf(af.operator) !== -1)).length === 0) {
            this.hasActiveSpatialFilter = false;
        }
        else {
            this.hasActiveSpatialFilter = true;
        }
        if (!(JSON.stringify(this.lastRunOgcFilter) === JSON.stringify(activeFilters))) {
            if (this.layer.dataSource.options.type === 'wfs') {
                /** @type {?} */
                const ogcDataSource = this.layer.dataSource;
                /** @type {?} */
                const ogcLayer = ogcDataSource.options.ogcFilters;
                ogcLayer.filters = ogcFilterWriter.rebuiltIgoOgcFilterObjectFromSequence(activeFilters);
                this.layer.dataSource.ol.clear();
            }
            else if (this.layer.dataSource.options.type === 'wms' &&
                ogcFilters.enabled) {
                /** @type {?} */
                let rebuildFilter = '';
                if (activeFilters.length >= 1) {
                    /** @type {?} */
                    const ogcDataSource = this.layer.dataSource;
                    /** @type {?} */
                    const ogcLayer = ogcDataSource.options.ogcFilters;
                    ogcLayer.filters = ogcFilterWriter.rebuiltIgoOgcFilterObjectFromSequence(activeFilters);
                    rebuildFilter = ogcFilterWriter.buildFilter(ogcLayer.filters, undefined, undefined, ((/** @type {?} */ (this.layer.dataSource.options))).fieldNameGeometry);
                }
                this.ogcFilterService.filterByOgc((/** @type {?} */ (this.datasource)), rebuildFilter);
                this.datasource.options.ogcFilters.filtered =
                    activeFilters.length === 0 ? false : true;
            }
            this.lastRunOgcFilter = JSON.parse(JSON.stringify(activeFilters));
        }
    }
    /**
     * @return {?}
     */
    setVisible() {
        this.layer.visible = true;
    }
    /**
     * @return {?}
     */
    isAdvancedOgcFilters() {
        return this.datasource.options.ogcFilters.advancedOgcFilters;
    }
    /**
     * @return {?}
     */
    addFilterDisabled() {
        return (!this.datasource.options.sourceFields || this.datasource.options.sourceFields.length === 0);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    changeOgcFiltersAdvancedOgcFilters(value) {
        this.datasource.options.ogcFilters.advancedOgcFilters = value;
    }
    /**
     * @param {?} isAdvancedOgcFilters
     * @return {?}
     */
    changeOgcFilterType(isAdvancedOgcFilters) {
        this.changeOgcFiltersAdvancedOgcFilters(isAdvancedOgcFilters.checked);
        if (isAdvancedOgcFilters.checked) {
            this.refreshFilters(true);
        }
    }
}
OgcFilterableItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filterable-item',
                template: "<span *ngIf=\"filtersAreEditable\">\r\n<mat-list-item>\r\n\r\n  <mat-icon *ngIf=\"ogcFiltersHeaderShown\" class=\"igo-chevron\" mat-list-avatar igoCollapse [target]=\"ogcFilters\" [collapsed]=\"filtersCollapsed\" svgIcon=\"chevron-up\">\r\n  </mat-icon>\r\n  <h4 *ngIf=\"ogcFiltersHeaderShown\" matLine [matTooltip]=\"layer.title\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n  <h4 *ngIf=\"!ogcFiltersHeaderShown\" matLine></h4>\r\n\r\n  <span *ngIf=\"downloadable && ogcFiltersHeaderShown\">\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.download.action' | translate\"\r\n      [color]=\"color\" (click)=\"openDownload()\">\r\n      <mat-icon svgIcon=\"download\"></mat-icon>\r\n    </button>\r\n  </span>\r\n  <button *ngIf=\"isAdvancedOgcFilters()\" [disabled]=\"addFilterDisabled()\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.filter.addFilter' | translate\" [color]=\"color\" (click)=\"addFilterToSequence()\">\r\n    <mat-icon svgIcon=\"plus\"></mat-icon>\r\n  </button>\r\n</mat-list-item>\r\n\r\n<button *ngIf=\"!layer.visible && ogcFiltersHeaderShown\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.layer.showLayer' | translate\"\r\ncolor=\"warn\" (click)=\"setVisible()\">\r\n<mat-icon svgIcon=\"error-outline\"></mat-icon>\r\n</button>\r\n\r\n<div #ogcFilters class=\"igo-datasource-filters-container\">\r\n  <igo-ogc-filterable-form [datasource]=\"datasource\" [map]=\"map\" [refreshFilters]=\"refreshFunc\">\r\n  </igo-ogc-filterable-form>\r\n\r\n  <mat-checkbox labelPosition='before' *ngIf=\"hasPushButton\" (change)=\"changeOgcFilterType($event)\"\r\n    [(ngModel)]=\"datasource.options.ogcFilters.advancedOgcFilters\">\r\n    {{'igo.geo.filter.advancedOgcFilters' | translate}}\r\n  </mat-checkbox>\r\n</div>\r\n</span>\r\n",
                styles: [":host{overflow:hidden}.igo-datasource-filters-container{text-align:center;width:100%;display:inline-block}mat-icon.disabled{color:rgba(0,0,0,.38)}"]
            }] }
];
/** @nocollapse */
OgcFilterableItemComponent.ctorParameters = () => [
    { type: OGCFilterService },
    { type: DownloadService }
];
OgcFilterableItemComponent.propDecorators = {
    layer: [{ type: Input }],
    map: [{ type: Input }],
    ogcFiltersHeaderShown: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OgcFilterableListComponent {
    constructor() { }
}
OgcFilterableListComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filterable-list',
                template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <ng-template ngFor let-layer [ngForOf]=\"layers | filterableDataSource: 'ogc'\">\r\n    <igo-ogc-filterable-item igoListItem [ogcFiltersHeaderShown]=\"true\" [layer]=\"layer\" \r\n    [map]=\"layer.map\" ></igo-ogc-filterable-item>\r\n  </ng-template>\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
OgcFilterableListComponent.ctorParameters = () => [];
OgcFilterableListComponent.propDecorators = {
    layers: [{ type: Input }],
    map: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OgcFilterableListBindingDirective {
    /**
     * @param {?} component
     * @param {?} mapService
     */
    constructor(component, mapService) {
        this.mapService = mapService;
        this.component = component;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Override input layers
        this.component.layers = [];
        this.layers$$ = this.mapService.getMap().layers$.subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        layers => {
            this.component.layers = layers;
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.layers$$.unsubscribe();
    }
}
OgcFilterableListBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoOgcFilterableListBinding]'
            },] }
];
/** @nocollapse */
OgcFilterableListBindingDirective.ctorParameters = () => [
    { type: OgcFilterableListComponent, decorators: [{ type: Self }] },
    { type: MapService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OgcFilterButtonComponent {
    constructor() {
        this.color = 'primary';
        this.ogcFilterCollapse = false;
    }
    /**
     * @return {?}
     */
    get options() {
        if (!this.layer) {
            return;
        }
        return this.layer.dataSource.options;
    }
    /**
     * @return {?}
     */
    toggleOgcFilter() {
        if (this.layer.isInResolutionsRange) {
            this.ogcFilterCollapse = !this.ogcFilterCollapse;
        }
    }
}
OgcFilterButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filter-button',
                template: "<button *ngIf=\"ogcFiltersInLayers && options.ogcFilters && (options.ogcFilters.enabled\r\n&& options.ogcFilters.editable)\"\r\n  mat-icon-button\r\n  collapsibleButton\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.filter.filterBy' | translate\"\r\n  [color]=\"color\"\r\n  (click)=\"toggleOgcFilter()\">\r\n  <mat-icon\r\n    [ngClass]='{disabled: !layer.isInResolutionsRange}'svgIcon=\"filter\"></mat-icon>\r\n</button>\r\n\r\n<div #ogcFilter class=\"igo-layer-actions-container\"\r\n*ngIf=\"options.ogcFilters && (options.ogcFilters.enabled\r\n&& options.ogcFilters.editable)\">\r\n  <igo-ogc-filterable-item\r\n    *ngIf=\"ogcFilterCollapse && options.ogcFilters.enabled\"\r\n    igoListItem\r\n    [ogcFiltersHeaderShown]=\"false\"\r\n    [map]=\"layer.map\"\r\n    [layer]=\"layer\">\r\n  </igo-ogc-filterable-item>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
OgcFilterButtonComponent.ctorParameters = () => [];
OgcFilterButtonComponent.propDecorators = {
    layer: [{ type: Input }],
    map: [{ type: Input }],
    color: [{ type: Input }],
    ogcFiltersInLayers: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OgcFilterToggleButtonComponent {
    /**
     * @param {?} ogcFilterService
     */
    constructor(ogcFilterService) {
        this.ogcFilterService = ogcFilterService;
        this.color = 'primary';
        this.pushButtonBundle = [];
        this.ogcFilterWriter = new OgcFilterWriter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.datasource.options.ogcFilters &&
            this.datasource.options.ogcFilters.pushButtons) {
            this.pushButtonBundle = (/** @type {?} */ (this.datasource.options.ogcFilters.pushButtons));
        }
        this.applyFilters();
    }
    /**
     * @param {?} pb
     * @return {?}
     */
    getToolTip(pb) {
        /** @type {?} */
        let tt;
        if (pb.tooltip) {
            tt = pb.tooltip;
        }
        return tt || '';
    }
    /**
     * @param {?} pb
     * @return {?}
     */
    getButtonColor(pb) {
        /** @type {?} */
        let styles;
        if (pb.color) {
            styles = {
                'background-color': pb.enabled ? `rgba(${pb.color})` : `rgba(255,255,255,0)`,
            };
        }
        return styles;
    }
    /**
     * @param {?} bundle
     * @return {?}
     */
    bundleIsVertical(bundle) {
        return bundle.vertical ? bundle.vertical : false;
    }
    /**
     * @param {?=} currentOgcPushButton
     * @return {?}
     */
    applyFilters(currentOgcPushButton) {
        if (currentOgcPushButton) {
            currentOgcPushButton.enabled = !currentOgcPushButton.enabled;
        }
        /** @type {?} */
        let filterQueryString = '';
        /** @type {?} */
        const conditions = [];
        this.pushButtonBundle.map((/**
         * @param {?} buttonBundle
         * @return {?}
         */
        buttonBundle => {
            /** @type {?} */
            const bundleCondition = [];
            buttonBundle.ogcPushButtons
                .filter((/**
             * @param {?} ogcpb
             * @return {?}
             */
            ogcpb => ogcpb.enabled === true))
                .forEach((/**
             * @param {?} enabledPb
             * @return {?}
             */
            enabledPb => bundleCondition.push(enabledPb.filters)));
            if (bundleCondition.length >= 1) {
                if (bundleCondition.length === 1) {
                    conditions.push(bundleCondition[0]);
                }
                else {
                    conditions.push({ logical: buttonBundle.logical, filters: bundleCondition });
                }
            }
        }));
        if (conditions.length >= 1) {
            filterQueryString = this.ogcFilterWriter
                .buildFilter(conditions.length === 1 ?
                conditions[0] : (/** @type {?} */ ({ logical: 'And', filters: conditions })));
        }
        if (this.datasource.options.type === 'wms') {
            this.ogcFilterService.filterByOgc((/** @type {?} */ (this.datasource)), filterQueryString);
        }
        if (this.datasource.options.type === 'wfs') {
            // TODO: Check how to prevent wfs to refresh when filter icon is pushed...
            this.datasource.ol.clear();
        }
    }
}
OgcFilterToggleButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filter-toggle-button',
                template: "<ng-container *ngFor=\"let bundle of pushButtonBundle\">\r\n        <mat-button-toggle-group appearance=\"legacy\" vertical={{bundleIsVertical(bundle)}} multiple=\"true\">\r\n            <mat-button-toggle [ngStyle]=\"getButtonColor(ogcPushButton)\" [checked]=\"ogcPushButton.enabled\"\r\n                (change)=\"applyFilters(ogcPushButton)\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n                [matTooltip]=\"getToolTip(ogcPushButton)\" *ngFor=\"let ogcPushButton of bundle.ogcPushButtons\"\r\n                [value]=\"ogcPushButton\">{{ogcPushButton.title}}\r\n            </mat-button-toggle>\r\n        </mat-button-toggle-group>\r\n</ng-container>\r\n",
                styles: [".mat-button-toggle-checked{font-weight:700}.mat-button-toggle-group{margin:5px;flex-wrap:wrap}"]
            }] }
];
/** @nocollapse */
OgcFilterToggleButtonComponent.ctorParameters = () => [
    { type: OGCFilterService }
];
OgcFilterToggleButtonComponent.propDecorators = {
    refreshFilters: [{ type: Input }],
    datasource: [{ type: Input }],
    map: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoFilterModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoFilterModule,
            providers: [
                {
                    provide: MAT_DATE_LOCALE,
                    useValue: 'fr'
                }
            ]
        };
    }
}
IgoFilterModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatAutocompleteModule,
                    MatIconModule,
                    MatButtonModule,
                    MatButtonToggleModule,
                    MatCheckboxModule,
                    MatSliderModule,
                    MatSlideToggleModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatOptionModule,
                    MatSelectModule,
                    MatListModule,
                    MatTooltipModule,
                    MatDatepickerModule,
                    MatNativeDateModule,
                    // MatDatetimepickerModule,
                    // MatNativeDatetimeModule,
                    IgoLanguageModule,
                    IgoCollapsibleModule,
                    IgoListModule,
                    IgoKeyValueModule
                ],
                exports: [
                    FilterableDataSourcePipe,
                    TimeFilterFormComponent,
                    TimeFilterItemComponent,
                    TimeFilterListComponent,
                    TimeFilterListBindingDirective,
                    OgcFilterFormComponent,
                    OgcFilterButtonComponent,
                    OgcFilterToggleButtonComponent,
                    OgcFilterableFormComponent,
                    OgcFilterableItemComponent,
                    OgcFilterableListComponent,
                    OgcFilterableListBindingDirective
                ],
                declarations: [
                    FilterableDataSourcePipe,
                    TimeFilterFormComponent,
                    TimeFilterItemComponent,
                    TimeFilterListComponent,
                    TimeFilterListBindingDirective,
                    OgcFilterFormComponent,
                    OgcFilterButtonComponent,
                    OgcFilterToggleButtonComponent,
                    OgcFilterableFormComponent,
                    OgcFilterableItemComponent,
                    OgcFilterableListComponent,
                    OgcFilterableListBindingDirective
                ],
                providers: [TimeFilterService, OGCFilterService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This input allows a user to draw a new geometry or to edit
 * an existing one on a map.
 */
let GeometryFormFieldComponent = /**
 * This input allows a user to draw a new geometry or to edit
 * an existing one on a map.
 */
class GeometryFormFieldComponent {
    /**
     * @param {?} cdRef
     */
    constructor(cdRef) {
        this.cdRef = cdRef;
        this.geometryType$ = new BehaviorSubject(undefined);
        this.drawGuide$ = new BehaviorSubject(0);
        this.value$ = new BehaviorSubject(undefined);
        /**
         * Whether a geometry type toggle should be displayed
         */
        this.geometryTypeField = false;
        /**
         * Available geometry types
         */
        this.geometryTypes = ['Point', 'LineString', 'Polygon'];
        /**
         * Whether a draw guide field should be displayed
         */
        this.drawGuideField = false;
        /**
         * The drawGuide around the mouse pointer to help drawing
         */
        this.drawGuide = null;
        /**
         * Draw guide placeholder
         */
        this.drawGuidePlaceholder = '';
        /**
         * Whether a measure tooltip should be displayed
         */
        this.measure = false;
    }
    /**
     * The geometry type model
     * @param {?} value
     * @return {?}
     */
    set geometryTypeModel(value) { this.geometryType$.next(value); }
    /**
     * @return {?}
     */
    get geometryTypeModel() { return this.geometryType$.value; }
    /**
     * The draw guide model
     * @param {?} value
     * @return {?}
     */
    set drawGuideModel(value) { this.drawGuide$.next(value); }
    /**
     * @return {?}
     */
    get drawGuideModel() { return this.drawGuide$.value; }
    /**
     * Set up a value stream
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.geometryType$.next(this.geometryType);
        this.drawGuide$.next(this.drawGuide);
        this.value$.next(this.formControl.value ? this.formControl.value : undefined);
        this.value$$ = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this.value$.next(value ? value : undefined);
        }));
    }
    /**
     * Unsubscribe to the value stream
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.value$$.unsubscribe();
    }
    /**
     * @param {?} geometryType
     * @return {?}
     */
    onGeometryTypeChange(geometryType) {
        if (this.value$.value !== undefined) {
            return;
        }
        this.geometryType$.next(geometryType);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onDrawGuideChange(value) {
        this.drawGuide$.next(value);
    }
};
GeometryFormFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-geometry-form-field',
                template: "<igo-geometry-form-field-input\r\n  [formControl]=\"formControl\"\r\n  [map]=\"map\"\r\n  [geometryType]=\"geometryType$ | async\"\r\n  [drawGuide]=\"drawGuide$ | async\"\r\n  [measure]=\"measure\"\r\n  [drawStyle]=\"drawStyle\"\r\n  [overlayStyle]=\"overlayStyle\">\r\n</igo-geometry-form-field-input>\r\n\r\n<div *ngIf=\"geometryTypeField\" class=\"geometry-type-toggle\">\r\n  <mat-button-toggle-group\r\n    [disabled]=\"(value$ | async) !== undefined\"\r\n    [ngModel]=\"geometryTypeModel\"\r\n    (ngModelChange)=\"onGeometryTypeChange($event)\">\r\n    <mat-button-toggle\r\n      value=\"Point\"\r\n      [disabled]=\"geometryTypes.indexOf('Point') < 0\">\r\n      {{'igo.geo.geometry.point' | translate}}\r\n    </mat-button-toggle>\r\n    <mat-button-toggle\r\n      value=\"LineString\"\r\n      [disabled]=\"geometryTypes.indexOf('LineString') < 0\">\r\n      {{'igo.geo.geometry.line' | translate}}\r\n    </mat-button-toggle>\r\n    <mat-button-toggle\r\n      value=\"Polygon\"\r\n      [disabled]=\"geometryTypes.indexOf('Polygon') < 0\">\r\n      {{'igo.geo.geometry.polygon' | translate}}\r\n    </mat-button-toggle>\r\n  </mat-button-toggle-group>\r\n</div>\r\n\r\n<mat-form-field *ngIf=\"drawGuideField\" class=\"draw-guide-field\">\r\n  <input\r\n    matInput\r\n    type=\"number\"\r\n    [placeholder]=\"drawGuidePlaceholder\"\r\n    [ngModel]=\"drawGuideModel\"\r\n    (ngModelChange)=\"onDrawGuideChange($event)\">\r\n  <mat-icon\r\n    matPrefix\r\n    [color]=\"'primary'\"\r\n    svgIcon=\"adjust\">    \r\n  </mat-icon>\r\n  <span matSuffix class=\"draw-guide-units\">{{'igo.geo.measure.meters' | translate}}</span>\r\n</mat-form-field>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;width:100%}.draw-guide-field,.geometry-type-toggle{width:100%}.geometry-type-toggle{padding:10px;text-align:center}.draw-guide-field mat-icon{margin:0 10px}.draw-guide-units{padding:10px}"]
            }] }
];
/** @nocollapse */
GeometryFormFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
GeometryFormFieldComponent.propDecorators = {
    formControl: [{ type: Input }],
    map: [{ type: Input }],
    geometryType: [{ type: Input }],
    geometryTypeField: [{ type: Input }],
    geometryTypes: [{ type: Input }],
    drawGuideField: [{ type: Input }],
    drawGuide: [{ type: Input }],
    drawGuidePlaceholder: [{ type: Input }],
    measure: [{ type: Input }],
    drawStyle: [{ type: Input }],
    overlayStyle: [{ type: Input }]
};
/**
 * This input allows a user to draw a new geometry or to edit
 * an existing one on a map.
 */
GeometryFormFieldComponent = __decorate([
    FormFieldComponent('geometry'),
    __metadata("design:paramtypes", [ChangeDetectorRef])
], GeometryFormFieldComponent);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MEASURE_UNIT_AUTO = 'auto';
/** @enum {string} */
const MeasureType = {
    Length: 'length',
    Area: 'area',
};
/** @enum {string} */
const MeasureLengthUnit = {
    Meters: 'meters',
    Kilometers: 'kilometers',
    Miles: 'miles',
    Feet: 'feet',
};
/** @type {?} */
const MeasureLengthUnitAbbreviation = {
    [MeasureLengthUnit.Meters]: 'm',
    [MeasureLengthUnit.Kilometers]: 'km',
    [MeasureLengthUnit.Miles]: 'mi',
    [MeasureLengthUnit.Feet]: 'ft'
};
/** @enum {string} */
const MeasureAreaUnit = {
    SquareMeters: 'squareMeters',
    SquareKilometers: 'squareKilometers',
    SquareMiles: 'squareMiles',
    SquareFeet: 'squareFeet',
    Hectares: 'hectares',
    Acres: 'acres',
};
/** @type {?} */
const MeasureAreaUnitAbbreviation = {
    [MeasureAreaUnit.SquareMeters]: 'm²',
    [MeasureAreaUnit.SquareKilometers]: 'km²',
    [MeasureAreaUnit.SquareMiles]: 'mi²',
    [MeasureAreaUnit.SquareFeet]: 'ft²',
    [MeasureAreaUnit.Hectares]: 'ha',
    [MeasureAreaUnit.Acres]: 'ac'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Convert value from meters to kilometers
 * @param {?} value Value in meters
 * @return {?} Value in kilometers
 */
function metersToKilometers(value) {
    return value * 0.001;
}
/**
 * Convert value from meters to feet
 * @param {?} value Value in meters
 * @return {?} Value in feet
 */
function metersToFeet(value) {
    return value * 3.2808;
}
/**
 * Convert value from meters to miles
 * @param {?} value Value in meters
 * @return {?} Value in miles
 */
function metersToMiles(value) {
    return value * 0.000621;
}
/**
 * Convert value from square meters to square kilometers
 * @param {?} value Value in square meters
 * @return {?} Value in square kilometers
 */
function squareMetersToSquareKilometers(value) {
    return value * 0.000001;
}
/**
 * Convert value from square meters to square miles
 * @param {?} value Value in square meters
 * @return {?} Value in square miles
 */
function squareMetersToSquareMiles(value) {
    return value * 0.0000003861;
}
/**
 * Convert value from square meters to square feet
 * @param {?} value Value in square meters
 * @return {?} Value in square feet
 */
function squareMetersToSquareFeet(value) {
    return value * 10.764;
}
/**
 * Convert value from square meters to hectares
 * @param {?} value Value in square meters
 * @return {?} Value in hectares
 */
function squareMetersToHectares(value) {
    return value * 0.0001;
}
/**
 * Convert value from square meters to acres
 * @param {?} value Value in square meters
 * @return {?} Value in acres
 */
function squareMetersToAcres(value) {
    return value * 0.00024711;
}
/**
 * Convert value from meters to the specified length unit
 * @param {?} value Value in meters
 * @param {?} unit Length unit
 * @return {?} Value in unit
 */
function metersToUnit(value, unit) {
    /** @type {?} */
    const conversionMapper = new Map([
        [MeasureLengthUnit.Meters, (/**
             * @param {?} val
             * @return {?}
             */
            (val) => val)],
        [MeasureLengthUnit.Kilometers, metersToKilometers],
        [MeasureLengthUnit.Miles, metersToMiles],
        [MeasureLengthUnit.Feet, metersToFeet],
    ]);
    /** @type {?} */
    const conversion = conversionMapper.get(unit);
    return conversion ? conversion(value) : undefined;
}
/**
 * Convert value from square meters to the specified area unit
 * @param {?} value Value in meters
 * @param {?} unit Area unit
 * @return {?} Value in unit
 */
function squareMetersToUnit(value, unit) {
    /** @type {?} */
    const conversionMapper = new Map([
        [MeasureAreaUnit.SquareMeters, (/**
             * @param {?} val
             * @return {?}
             */
            (val) => val)],
        [MeasureAreaUnit.SquareKilometers, squareMetersToSquareKilometers],
        [MeasureAreaUnit.SquareMiles, squareMetersToSquareMiles],
        [MeasureAreaUnit.SquareFeet, squareMetersToSquareFeet],
        [MeasureAreaUnit.Hectares, squareMetersToHectares],
        [MeasureAreaUnit.Acres, squareMetersToAcres],
    ]);
    /** @type {?} */
    const conversion = conversionMapper.get(unit);
    return conversion ? conversion(value) : undefined;
}
/**
 * This method format a measure to a readable format
 * @param {?} measure Measure
 * @param {?=} options Formatting options
 * @return {?} Formatted measure
 */
function formatMeasure(measure, options) {
    /** @type {?} */
    let decimal = options.decimal;
    if (decimal === undefined || decimal < 0) {
        decimal = 1;
    }
    /** @type {?} */
    const parts = [];
    if (options.locale !== undefined) {
        parts.push(measure.toLocaleString(options.locale, {
            minimumFractionDigits: decimal,
            maximumFractionDigits: decimal
        }));
    }
    else {
        parts.push(measure.toFixed(decimal).toString());
    }
    if (options.unit !== undefined && options.unitAbbr === true) {
        parts.push(MeasureLengthUnitAbbreviation[options.unit] ||
            MeasureAreaUnitAbbreviation[options.unit]);
    }
    return parts.filter((/**
     * @param {?} p
     * @return {?}
     */
    p => p !== undefined)).join(' ');
}
/**
 * Compute best length measure unit for a given measure in meters
 * @param {?} value Value in meters
 * @return {?} Measure unit
 */
function computeBestLengthUnit(value) {
    /** @type {?} */
    let unit = MeasureLengthUnit.Meters;
    /** @type {?} */
    let converted = value;
    /** @type {?} */
    const possibleUnits = [MeasureLengthUnit.Kilometers];
    while (converted > 1000 && possibleUnits.length > 0) {
        unit = possibleUnits.pop();
        converted = metersToUnit(value, unit);
    }
    return unit;
}
/**
 * Compute best length measure unit for a given measure in square meters
 * @param {?} value Value in meters
 * @return {?} Measure unit
 */
function computeBestAreaUnit(value) {
    /** @type {?} */
    let unit = MeasureAreaUnit.SquareMeters;
    /** @type {?} */
    let converted = value;
    /** @type {?} */
    const possibleUnits = [MeasureAreaUnit.SquareKilometers];
    while (converted > 1000000 && possibleUnits.length > 0) {
        unit = possibleUnits.pop();
        converted = squareMetersToUnit(value, unit);
    }
    return unit;
}
/**
 * Create a default style for a measure interaction
 * @return {?} OL style
 */
function createMeasureInteractionStyle() {
    return new Style({
        stroke: new Stroke({
            color: '#ffcc33',
            lineDash: [10, 10],
            width: 2
        }),
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        image: new Circle({
            radius: 5,
            stroke: new Stroke({
                color: '#ffcc33',
            }),
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            })
        })
    });
}
/**
 * Create a default style for a measure layer
 * @return {?} OL style
 */
function createMeasureLayerStyle() {
    return new Style({
        stroke: new Stroke({
            color: '#ffcc33',
            width: 2
        }),
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        })
    });
}
/**
 * Compute the length in meters of an OL geometry with a given projection
 * @param {?} olGeometry Ol geometry
 * @param {?} projection olGeometry's projection
 * @return {?} Length in meters
 */
function measureOlGeometryLength(olGeometry, projection) {
    if (olGeometry instanceof OlPoint) {
        return undefined;
    }
    if (olGeometry.getFlatCoordinates().length === 0) {
        return undefined;
    }
    return getLength(olGeometry, { projection });
}
/**
 * Compute the area in square meters of an OL geometry with a given projection
 * @param {?} olGeometry Ol geometry
 * @param {?} projection olGeometry's projection
 * @return {?} Area in square meters
 */
function measureOlGeometryArea(olGeometry, projection) {
    if (olGeometry instanceof OlPoint || olGeometry instanceof OlLineString) {
        return undefined;
    }
    if (olGeometry.getFlatCoordinates().length === 0) {
        return undefined;
    }
    return getArea$1(olGeometry, { projection });
}
/**
 * Compute the area (square meters), length (meters) and last length (meters)
 * of an OL geometry with a given projection.
 * @param {?} olGeometry Ol geometry
 * @param {?} projection olGeometry's projection
 * @return {?} Computed measure
 */
function measureOlGeometry(olGeometry, projection) {
    /** @type {?} */
    const length = measureOlGeometryLength(olGeometry, projection);
    /** @type {?} */
    const area = measureOlGeometryArea(olGeometry, projection);
    /** @type {?} */
    const lengths = [];
    /** @type {?} */
    const coordinates = olGeometry.flatCoordinates;
    /** @type {?} */
    const coordinatesLength = coordinates.length;
    for (let i = 0; i <= coordinatesLength - 4; i += 2) {
        /** @type {?} */
        const olSegment = new OlLineString([
            [coordinates[i], coordinates[i + 1]],
            [coordinates[i + 2], coordinates[i + 3]]
        ]);
        lengths.push(measureOlGeometryLength(olSegment, projection));
    }
    return {
        area,
        length,
        lengths
    };
}
/**
 * Update an OL geometry midpoints and return an array of those points
 * @param {?} olGeometry OL Geometry
 * @return {?} OL points
 */
function updateOlGeometryMidpoints(olGeometry) {
    /** @type {?} */
    const olMidpoints = getOlGeometryMidpoints(olGeometry);
    // TODO: handle multi geometries
    /** @type {?} */
    const coordinates = olGeometry.flatCoordinates;
    /** @type {?} */
    const midpointsLength = olMidpoints.length;
    for (let i = 0; i < midpointsLength; i++) {
        /** @type {?} */
        const j = i * 2;
        /** @type {?} */
        const olSegment = new OlLineString([
            [coordinates[j], coordinates[j + 1]],
            [coordinates[j + 2], coordinates[j + 3]]
        ]);
        /** @type {?} */
        const midpointCoordinate = olSegment.getCoordinateAt(0.5);
        /** @type {?} */
        const olMidpoint = olMidpoints[i];
        if (olMidpoint !== undefined) {
            olMidpoint.setCoordinates(midpointCoordinate);
        }
        else {
            olMidpoints[i] = new OlPoint(midpointCoordinate);
        }
    }
    return olMidpoints;
}
/**
 * Clear an OL geometry midpoints and return an array of those points
 * @param {?} olGeometry OL Geometry
 * @return {?}
 */
function clearOlGeometryMidpoints(olGeometry) {
    /** @type {?} */
    const olMidpoints = olGeometry.get('_midpoints') || [];
    /** @type {?} */
    const midpointsLength = olMidpoints.length;
    for (let i = 0; i < midpointsLength; i++) {
        /** @type {?} */
        const olMidpoint = olMidpoints[i];
        if (olMidpoint !== undefined) {
            if (olMidpoint !== undefined) {
                clearOlMidpointTooltip(olMidpoint);
            }
        }
    }
    olGeometry.set('_midpoints', undefined, true);
    return olMidpoints;
}
/**
 * Return an array of  OL geometry midpoints, if any
 * @param {?} olGeometry OL Geometry
 * @return {?} OL points
 */
function getOlGeometryMidpoints(olGeometry) {
    /** @type {?} */
    const expectedNumber = Math.max((olGeometry.flatCoordinates.length / 2) - 1, 0);
    // TODO: This works but it's quite messy. If time permits,
    // clean this. Maybe a Tooltip class could handle that
    /** @type {?} */
    let olMidpoints = olGeometry.get('_midpoints');
    if (olMidpoints === undefined) {
        olMidpoints = new Array(expectedNumber);
        olGeometry.set('_midpoints', olMidpoints, true);
        return olMidpoints;
    }
    if (expectedNumber === olMidpoints.length) {
        return olMidpoints;
    }
    if (expectedNumber > olMidpoints.length) {
        olMidpoints.push(...new Array(expectedNumber - olMidpoints.length));
        return olMidpoints;
    }
    for (let i = expectedNumber; i < olMidpoints.length; i++) {
        /** @type {?} */
        const olMidpoint = olMidpoints[expectedNumber];
        if (olMidpoint !== undefined) {
            clearOlMidpointTooltip(olMidpoint);
        }
    }
    olMidpoints.splice(expectedNumber);
    return olMidpoints;
}
/**
 * Remove an OL midpoint's tooltip from the map
 * @param {?} olMidpoint OL Point
 * @return {?}
 */
function clearOlMidpointTooltip(olMidpoint) {
    /** @type {?} */
    const olTooltip = olMidpoint.get('_tooltip');
    if (olTooltip !== undefined) {
        /** @type {?} */
        const olMap$$1 = olTooltip.getMap();
        if (olMap$$1 !== undefined) {
            olMap$$1.removeOverlay(olTooltip);
        }
    }
}
/**
 * Add an OL overlay at each midpoint and return an array of those overlays
 * @param {?} olGeometry OL Geometry
 * @return {?} OL overlays
 */
function updateOlTooltipsAtMidpoints(olGeometry) {
    /** @type {?} */
    const olMidpoints = updateOlGeometryMidpoints(olGeometry);
    /** @type {?} */
    const olTooltips = olMidpoints.map((/**
     * @param {?} olMidpoint
     * @return {?}
     */
    (olMidpoint) => {
        /** @type {?} */
        let olTooltip = olMidpoint.get('_tooltip');
        if (olTooltip === undefined) {
            olTooltip = createOlTooltipAtPoint(olMidpoint);
        }
        else {
            olTooltip.setPosition(olMidpoint.flatCoordinates);
        }
        return olTooltip;
    }));
    return olTooltips;
}
/**
 * Return an array of OL overlay at midspoints, if any
 * @param {?} olGeometry OL Geometry
 * @return {?} OL overlays
 */
function getOlTooltipsAtMidpoints(olGeometry) {
    /** @type {?} */
    const olMidpoints = getOlGeometryMidpoints(olGeometry);
    return olMidpoints.map((/**
     * @param {?} olMidpoint
     * @return {?}
     */
    (olMidpoint) => {
        return olMidpoint ? olMidpoint.get('_tooltip') : undefined;
    }));
}
/**
 * Update an OL geometry center and return it
 * @param {?} olGeometry OL Geometry
 * @return {?} OL point
 */
function updateOlGeometryCenter(olGeometry) {
    /** @type {?} */
    let olCenter = olGeometry.get('_center');
    /** @type {?} */
    const centerCoordinate = getCenter(olGeometry.getExtent());
    if (olCenter !== undefined) {
        olCenter.setCoordinates(centerCoordinate);
    }
    else {
        olCenter = new OlPoint(centerCoordinate);
        olGeometry.set('_center', olCenter);
    }
    return olCenter;
}
/**
 * Add an OL overlay at the center of a geometry and return that overlay
 * @param {?} olGeometry OL Geometry
 * @return {?} OL overlay
 */
function updateOlTooltipAtCenter(olGeometry) {
    /** @type {?} */
    const olCenter = updateOlGeometryCenter(olGeometry);
    /** @type {?} */
    let olTooltip = olCenter.get('_tooltip');
    if (olTooltip === undefined) {
        olTooltip = createOlTooltipAtPoint(olCenter);
    }
    else {
        olTooltip.setPosition(olCenter.flatCoordinates);
    }
    return olTooltip;
}
/**
 * Return an array of OL overlay at midspoints, if any
 * @param {?} olGeometry OL Geometry
 * @return {?} OL overlays
 */
function getOlTooltipAtCenter(olGeometry) {
    /** @type {?} */
    const olCenter = olGeometry.get('_center');
    return olCenter ? olCenter.get('_tooltip') : undefined;
}
/**
 * Get all the tooltips of an OL geometry
 * @param {?} olGeometry OL Geometry
 * @return {?} OL overlays
 */
function getTooltipsOfOlGeometry(olGeometry) {
    /** @type {?} */
    const olTooltips = [].concat(getOlTooltipsAtMidpoints(olGeometry) || []);
    /** @type {?} */
    const olCenterTooltip = getOlTooltipAtCenter(olGeometry);
    if (olCenterTooltip !== undefined) {
        olTooltips.push(olCenterTooltip);
    }
    return olTooltips;
}
/**
 * Create an OL overlay at a point and bind the overlay to the point
 * @param {?} olPoint OL Point
 * @return {?} OL overlay
 */
function createOlTooltipAtPoint(olPoint) {
    /** @type {?} */
    const olTooltip = new OlOverlay({
        element: document.createElement('div'),
        offset: [-30, -10],
        className: [
            'igo-map-tooltip',
            'igo-map-tooltip-measure'
        ].join(' '),
        stopEvent: false
    });
    olTooltip.setPosition(olPoint.flatCoordinates);
    olPoint.set('_tooltip', olTooltip);
    return olTooltip;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable */
// See this issue: https://github.com/Microsoft/TypeScript/issues/13965
// And the solution: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
// for an explanation as to why the prototype is set manually
/* tslint:enable */
class GeometrySliceError extends Error {
}
class GeometrySliceMultiPolygonError extends GeometrySliceError {
    constructor() {
        super('Can\'t slice a MultiPolygon.');
        Object.setPrototypeOf(this, GeometrySliceMultiPolygonError.prototype);
    }
}
class GeometrySliceLineStringError extends GeometrySliceError {
    constructor() {
        super('Can\'t slice with a line that has more than 2 points.');
        Object.setPrototypeOf(this, GeometrySliceLineStringError.prototype);
    }
}
class GeometrySliceTooManyIntersectionError extends GeometrySliceError {
    constructor() {
        super('More than 2 intersections found between the target polygon and the slicing line.');
        Object.setPrototypeOf(this, GeometrySliceTooManyIntersectionError.prototype);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Create a default style for draw and modify interactions
 * @param {?=} color Style color (R, G, B)
 * @return {?} OL style
 */
function createDrawInteractionStyle(color) {
    color = color || [0, 153, 255];
    return new Style({
        stroke: new Stroke({
            color: color.concat([1]),
            width: 2
        }),
        fill: new Fill({
            color: color.concat([0.2])
        }),
        image: new Circle({
            radius: 8,
            stroke: new Stroke({
                color: color.concat([1])
            }),
            fill: new Fill({
                color: color.concat([0.2])
            })
        })
    });
}
/**
 * Create a default style for drawing a hole
 * @return {?} OL style
 */
function createDrawHoleInteractionStyle() {
    return new Style({
        stroke: new Stroke({
            color: [0, 153, 255, 1],
            width: 2
        })
    });
}
/**
 * Slice geometry into two parts
 * @param {?} olGeometry OL geometry
 * @param {?} olSlicer Slicing line
 * @return {?} New OL geometries
 */
function sliceOlGeometry(olGeometry, olSlicer) {
    if (olGeometry instanceof OlPolygon) {
        return sliceOlPolygon(olGeometry, olSlicer);
    }
    else if (olGeometry instanceof OlLineString) {
        return sliceOlLineString(olGeometry, olSlicer);
    }
    return [];
}
/**
 * Slice OL LineString into one or more lines
 * @param {?} olLineString OL line string
 * @param {?} olSlicer Slicing line
 * @return {?} New OL line strings
 */
function sliceOlLineString(olLineString, olSlicer) {
    return [];
}
/**
 * Slice OL Polygon into one or more polygons
 * @param {?} olPolygon OL polygon
 * @param {?} olSlicer Slicing line
 * @return {?} New OL polygons
 */
function sliceOlPolygon(olPolygon, olSlicer) {
    if (olPolygon.getLinearRingCount() > 1) {
        throw new GeometrySliceMultiPolygonError();
    }
    if (olSlicer.getCoordinates().length > 2) {
        throw new GeometrySliceLineStringError();
    }
    /** @type {?} */
    const olGeoJSON = new OlGeoJSON();
    /** @type {?} */
    const slicer = olGeoJSON.writeGeometryObject(olSlicer);
    /** @type {?} */
    const outerCoordinates = olPolygon.getLinearRing(0).getCoordinates();
    /** @type {?} */
    const parts = [[], []];
    /** @type {?} */
    let totalIntersectionCount = 0;
    for (let i = 0, ii = outerCoordinates.length - 1; i < ii; i++) {
        /** @type {?} */
        const segmentCoordinates = [outerCoordinates[i], outerCoordinates[i + 1]];
        /** @type {?} */
        const segment = lineString(segmentCoordinates);
        /** @type {?} */
        const intersections = lineIntersect(segment, slicer).features;
        /** @type {?} */
        const intersectionCount = intersections.length;
        totalIntersectionCount += intersectionCount;
        if (intersectionCount > 1 || totalIntersectionCount > 2) {
            throw new GeometrySliceTooManyIntersectionError();
        }
        parts[0].push(segmentCoordinates[0]);
        if (intersectionCount === 1) {
            /** @type {?} */
            const intersection = intersections[0].geometry.coordinates;
            parts[0].push(intersection);
            parts[1].push(intersection);
            parts.reverse();
        }
    }
    if (totalIntersectionCount <= 1) {
        return [];
    }
    parts[0].push(parts[0][0]);
    parts[1].push(parts[1][0]);
    return [new OlPolygon([parts[0]]), new OlPolygon([parts[1]])];
}
/**
 * Splice geometry into two parts
 * @param {?} olPolygon
 * @param {?} olLinearRing
 * @return {?} New OL geometries
 */
function addLinearRingToOlPolygon(olPolygon, olLinearRing) {
    // TODO: make some validation and support updating an existing linear ring
    olPolygon.appendLinearRing(olLinearRing);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Control to draw geometries
 */
class DrawControl {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = options;
        /**
         * Draw start observable
         */
        this.start$ = new Subject();
        /**
         * Draw end observable
         */
        this.end$ = new Subject();
        /**
         * Geometry changes observable
         */
        this.changes$ = new Subject();
        if (options.layer !== undefined) {
            this.olOverlayLayer = options.layer;
        }
        else {
            this.olOverlayLayer = this.createOlInnerOverlayLayer();
        }
    }
    /**
     * Wheter the control is active
     * @return {?}
     */
    get active() {
        return this.olMap !== undefined;
    }
    /**
     * Geometry type
     * \@internal
     * @return {?}
     */
    get geometryType() {
        return this.options.geometryType;
    }
    /**
     * OL overlay source
     * \@internal
     * @return {?}
     */
    get olOverlaySource() {
        return this.olOverlayLayer.getSource();
    }
    /**
     * Add or remove this control to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    setOlMap(olMap$$1) {
        if (olMap$$1 === undefined) {
            this.clearOlInnerOverlaySource();
            this.removeOlInnerOverlayLayer();
            this.removeOlDrawInteraction();
            this.olMap = olMap$$1;
            return;
        }
        this.olMap = olMap$$1;
        this.addOlInnerOverlayLayer();
        this.addOlDrawInteraction();
    }
    /**
     * Return the overlay source
     * @return {?}
     */
    getSource() {
        return this.olOverlaySource;
    }
    /**
     * Create an overlay source if none is defined in the options
     * @private
     * @return {?}
     */
    createOlInnerOverlayLayer() {
        return new OlVectorLayer({
            source: this.options.source ? this.options.source : new OlVectorSource(),
            style: this.options.layerStyle,
            zIndex: 500
        });
    }
    /**
     * Clear the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    removeOlInnerOverlayLayer() {
        if (this.options.layer === undefined && this.olMap !== undefined) {
            this.olMap.removeLayer(this.olOverlayLayer);
        }
    }
    /**
     * Add the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    addOlInnerOverlayLayer() {
        if (this.options.layer === undefined) {
            this.olMap.addLayer(this.olOverlayLayer);
        }
    }
    /**
     * Clear the overlay source if it wasn't defined in the options
     * @private
     * @return {?}
     */
    clearOlInnerOverlaySource() {
        if (this.options.layer === undefined && this.options.source === undefined) {
            this.olOverlaySource.clear();
        }
    }
    /**
     * Add a draw interaction to the map an set up some listeners
     * @private
     * @return {?}
     */
    addOlDrawInteraction() {
        /** @type {?} */
        const olDrawInteraction = new OlDraw({
            type: this.geometryType,
            source: this.getSource(),
            stopClick: true,
            style: this.options.drawStyle,
            maxPoints: this.options.maxPoints,
            freehand: false,
            freehandCondition: (/**
             * @return {?}
             */
            () => false)
        });
        this.onDrawStartKey = olDrawInteraction
            .on('drawstart', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onDrawStart(event)));
        this.onDrawEndKey = olDrawInteraction
            .on('drawend', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onDrawEnd(event)));
        this.olMap.addInteraction(olDrawInteraction);
        this.olDrawInteraction = olDrawInteraction;
    }
    /**
     * Remove the draw interaction
     * @private
     * @return {?}
     */
    removeOlDrawInteraction() {
        if (this.olDrawInteraction === undefined) {
            return;
        }
        this.unsubscribeToKeyDown();
        unByKey(this.onDrawStartKey);
        unByKey(this.onDrawEndKey);
        if (this.olMap !== undefined) {
            this.olMap.removeInteraction(this.olDrawInteraction);
        }
        this.olDrawInteraction = undefined;
    }
    /**
     * When drawing starts, clear the overlay and start watching from changes
     * @private
     * @param {?} event Draw start event
     * @return {?}
     */
    onDrawStart(event) {
        /** @type {?} */
        const olGeometry = event.feature.getGeometry();
        this.start$.next(olGeometry);
        this.clearOlInnerOverlaySource();
        this.onChangesKey = olGeometry.on('change', (/**
         * @param {?} olGeometryEvent
         * @return {?}
         */
        (olGeometryEvent) => {
            this.changes$.next(olGeometryEvent.target);
        }));
        this.subscribeToKeyDown();
    }
    /**
     * When drawing ends, update the geometry observable and start watching from changes
     * @private
     * @param {?} event Draw end event
     * @return {?}
     */
    onDrawEnd(event) {
        this.unsubscribeToKeyDown();
        if (this.onChangesKey !== undefined) {
            unByKey(this.onChangesKey);
        }
        this.end$.next(event.feature.getGeometry());
    }
    /**
     * Subscribe to CTRL key down to activate the draw control
     * @private
     * @return {?}
     */
    subscribeToKeyDown() {
        this.unsubscribeToKeyDown();
        this.keyDown$$ = fromEvent(document, 'keydown').subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            // On ESC key down, remove the last vertex
            if (event.keyCode === 27) {
                this.olDrawInteraction.removeLastPoint();
            }
        }));
    }
    /**
     * Unsubscribe to key down
     * @private
     * @return {?}
     */
    unsubscribeToKeyDown() {
        if (this.keyDown$$ !== undefined) {
            this.keyDown$$.unsubscribe();
            this.keyDown$$ = undefined;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Control to modify geometries
 */
class ModifyControl {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = options;
        /**
         * Modify start observable
         */
        this.start$ = new Subject();
        /**
         * Modify end observable
         */
        this.end$ = new Subject();
        /**
         * Geometry changes observable
         */
        this.changes$ = new Subject();
        this.olModifyInteractionIsActive = false;
        this.olTranslateInteractionIsActive = false;
        this.olDrawInteractionIsActive = false;
        this.removedOlInteractions = [];
        if (options.layer !== undefined) {
            this.olOverlayLayer = options.layer;
        }
        else {
            this.olOverlayLayer = this.createOlInnerOverlayLayer();
        }
        this.olLinearRingsLayer = this.createOlLinearRingsLayer();
    }
    /**
     * Wheter the control is active
     * @return {?}
     */
    get active() {
        return this.olMap !== undefined;
    }
    /**
     * OL overlay source
     * \@internal
     * @return {?}
     */
    get olOverlaySource() {
        return this.olOverlayLayer.getSource();
    }
    /**
     * OL linear rings source
     * \@internal
     * @return {?}
     */
    get olLinearRingsSource() {
        return this.olLinearRingsLayer.getSource();
    }
    /**
     * Add or remove this control to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    setOlMap(olMap$$1) {
        if (olMap$$1 === undefined) {
            this.clearOlInnerOverlaySource();
            this.removeOlInnerOverlayLayer();
            this.removeOlModifyInteraction();
            this.removeOlTranslateInteraction();
            this.removeOlDrawInteraction();
            this.olMap = olMap$$1;
            return;
        }
        this.olMap = olMap$$1;
        this.addOlInnerOverlayLayer();
        this.addOlDrawInteraction();
        this.addOlTranslateInteraction();
        this.activateTranslateInteraction();
        this.addOlModifyInteraction();
        this.activateModifyInteraction();
    }
    /**
     * Return the overlay source
     * @return {?}
     */
    getSource() {
        return this.olOverlaySource;
    }
    /**
     * Add an OL geometry to the overlay and start modifying it
     * @param {?} olGeometry Ol Geometry
     * @return {?}
     */
    setOlGeometry(olGeometry) {
        /** @type {?} */
        const olFeature$$1 = new olFeature({ geometry: olGeometry });
        this.olOverlaySource.clear();
        this.olOverlaySource.addFeature(olFeature$$1);
    }
    /**
     * Create an overlay source if none is defined in the options
     * @private
     * @return {?}
     */
    createOlInnerOverlayLayer() {
        return new OlVectorLayer({
            source: this.options.source ? this.options.source : new OlVectorSource(),
            style: this.options.layerStyle,
            zIndex: 500
        });
    }
    /**
     * Add the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    addOlInnerOverlayLayer() {
        if (this.options.layer === undefined) {
            this.olMap.addLayer(this.olOverlayLayer);
        }
    }
    /**
     * Clear the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    removeOlInnerOverlayLayer() {
        if (this.options.layer === undefined && this.olMap !== undefined) {
            this.olMap.removeLayer(this.olOverlayLayer);
        }
    }
    /**
     * Clear the overlay source if it wasn't defined in the options
     * @private
     * @return {?}
     */
    clearOlInnerOverlaySource() {
        if (this.options.layer === undefined && this.options.source === undefined) {
            this.olOverlaySource.clear();
        }
    }
    /**
     * @private
     * @return {?}
     */
    createOlLinearRingsLayer() {
        return new OlVectorLayer({
            source: new OlVectorSource(),
            style: createDrawHoleInteractionStyle(),
            zIndex: 500
        });
    }
    /**
     * Add the linear rings layer
     * @private
     * @return {?}
     */
    addOlLinearRingsLayer() {
        this.olMap.addLayer(this.olLinearRingsLayer);
    }
    /**
     * Clear the linear rings layer
     * @private
     * @return {?}
     */
    removeOlLinearRingsLayer() {
        this.olMap.removeLayer(this.olLinearRingsLayer);
    }
    /**
     * Clear the linear rings source
     * @private
     * @return {?}
     */
    clearOlLinearRingsSource() {
        this.olLinearRingsSource.clear(true);
    }
    /**
     * Add a modify interaction to the map an set up some listeners
     * @private
     * @return {?}
     */
    addOlModifyInteraction() {
        /** @type {?} */
        const olModifyInteraction = new OlModify({
            source: this.olOverlaySource,
            style: this.options.drawStyle
        });
        this.olModifyInteraction = olModifyInteraction;
    }
    /**
     * Remove the modify interaction
     * @private
     * @return {?}
     */
    removeOlModifyInteraction() {
        if (this.olModifyInteraction === undefined) {
            return;
        }
        this.deactivateModifyInteraction();
        this.olModifyInteraction = undefined;
    }
    /**
     * @private
     * @return {?}
     */
    activateModifyInteraction() {
        if (this.olModifyInteractionIsActive === true) {
            return;
        }
        this.olModifyInteractionIsActive = true;
        this.onModifyStartKey = this.olModifyInteraction
            .on('modifystart', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onModifyStart(event)));
        this.onModifyEndKey = this.olModifyInteraction
            .on('modifyend', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onModifyEnd(event)));
        this.olMap.addInteraction(this.olModifyInteraction);
    }
    /**
     * @private
     * @return {?}
     */
    deactivateModifyInteraction() {
        if (this.olModifyInteractionIsActive === false) {
            return;
        }
        this.olModifyInteractionIsActive = false;
        unByKey(this.onModifyStartKey);
        unByKey(this.onModifyEndKey);
        if (this.olMap !== undefined) {
            this.olMap.removeInteraction(this.olModifyInteraction);
        }
    }
    /**
     * When modifying starts, clear the overlay and start watching for changes
     * @private
     * @param {?} event Modify start event
     * @return {?}
     */
    onModifyStart(event) {
        /** @type {?} */
        const olGeometry = event.features.item(0).getGeometry();
        this.start$.next(olGeometry);
        this.onModifyKey = olGeometry.on('change', (/**
         * @param {?} olGeometryEvent
         * @return {?}
         */
        (olGeometryEvent) => {
            this.changes$.next(olGeometryEvent.target);
        }));
    }
    /**
     * When modifying ends, update the geometry observable and stop watching for changes
     * @private
     * @param {?} event Modify end event
     * @return {?}
     */
    onModifyEnd(event) {
        if (this.onModifyKey !== undefined) {
            unByKey(this.onModifyKey);
        }
        this.end$.next(event.features.item(0).getGeometry());
    }
    /**
     * Subscribe to CTRL key down to activate the draw control
     * @private
     * @return {?}
     */
    subscribeToKeyDown() {
        this.keyDown$$ = fromEvent(document, 'keydown').subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            // On ESC key down, remove the last vertex
            if (event.keyCode === 27 && this.olDrawInteractionIsActive === true) {
                this.olDrawInteraction.removeLastPoint();
            }
        }));
    }
    /**
     * Unsubscribe to key down
     * @private
     * @return {?}
     */
    unsubscribeToKeyDown() {
        if (this.keyDown$$ !== undefined) {
            this.keyDown$$.unsubscribe();
        }
    }
    /**
     * Add a translate interaction to the map an set up some listeners
     * @private
     * @return {?}
     */
    addOlTranslateInteraction() {
        /** @type {?} */
        const olTranslateInteraction = new OlTranslate({
            layers: [this.olOverlayLayer]
        });
        this.olTranslateInteraction = olTranslateInteraction;
    }
    /**
     * Remove the translate interaction
     * @private
     * @return {?}
     */
    removeOlTranslateInteraction() {
        if (this.olTranslateInteraction === undefined) {
            return;
        }
        this.deactivateTranslateInteraction();
        this.olTranslateInteraction = undefined;
    }
    /**
     * @private
     * @return {?}
     */
    activateTranslateInteraction() {
        if (this.olTranslateInteractionIsActive === true) {
            return;
        }
        this.olTranslateInteractionIsActive = true;
        this.onTranslateStartKey = this.olTranslateInteraction
            .on('translatestart', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onTranslateStart(event)));
        this.onTranslateEndKey = this.olTranslateInteraction
            .on('translateend', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onTranslateEnd(event)));
        this.olMap.addInteraction(this.olTranslateInteraction);
    }
    /**
     * @private
     * @return {?}
     */
    deactivateTranslateInteraction() {
        if (this.olTranslateInteractionIsActive === false) {
            return;
        }
        this.olTranslateInteractionIsActive = false;
        unByKey(this.onTranslateStartKey);
        unByKey(this.onTranslateEndKey);
        if (this.olMap !== undefined) {
            this.olMap.removeInteraction(this.olTranslateInteraction);
        }
    }
    /**
     * When translation starts, clear the overlay and start watching for changes
     * @private
     * @param {?} event Translate start event
     * @return {?}
     */
    onTranslateStart(event) {
        /** @type {?} */
        const olGeometry = event.features.item(0).getGeometry();
        this.start$.next(olGeometry);
        this.onTranslateKey = olGeometry.on('change', (/**
         * @param {?} olGeometryEvent
         * @return {?}
         */
        (olGeometryEvent) => {
            this.changes$.next(olGeometryEvent.target);
        }));
    }
    /**
     * When translation ends, update the geometry observable and stop watchign for changes
     * @private
     * @param {?} event Translate end event
     * @return {?}
     */
    onTranslateEnd(event) {
        if (this.onTranslateKey !== undefined) {
            unByKey(this.onTranslateKey);
        }
        this.end$.next(event.features.item(0).getGeometry());
    }
    /**
     * Add a draw interaction to the map an set up some listeners
     * @private
     * @return {?}
     */
    addOlDrawInteraction() {
        /** @type {?} */
        const olDrawInteraction = new OlDraw({
            type: 'Polygon',
            source: this.olLinearRingsSource,
            stopClick: true,
            style: createDrawHoleInteractionStyle(),
            condition: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                return this.getOlGeometry().intersectsCoordinate(event.coordinate);
            })
        });
        this.olDrawInteraction = olDrawInteraction;
        this.subscribeToDrawKeyDown();
    }
    /**
     * Subscribe to CTRL key down to activate the draw control
     * @private
     * @return {?}
     */
    subscribeToDrawKeyDown() {
        this.drawKeyDown$$ = fromEvent(document, 'keydown').subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event.keyCode !== 17) {
                return;
            }
            this.unsubscribeToDrawKeyDown();
            /** @type {?} */
            const olGeometry = this.getOlGeometry();
            if (!olGeometry || !(olGeometry instanceof OlPolygon)) {
                return;
            }
            this.subscribeToDrawKeyUp();
            this.deactivateModifyInteraction();
            this.deactivateTranslateInteraction();
            this.activateDrawInteraction();
        }));
    }
    /**
     * Subscribe to CTRL key up to deactivate the draw control
     * @private
     * @return {?}
     */
    subscribeToDrawKeyUp() {
        this.drawKeyUp$$ = fromEvent(document, 'keyup').subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event.keyCode !== 17) {
                return;
            }
            this.unsubscribeToDrawKeyUp();
            this.subscribeToDrawKeyDown();
            this.deactivateDrawInteraction();
            this.activateModifyInteraction();
            this.activateTranslateInteraction();
        }));
    }
    /**
     * Unsubscribe to draw key down
     * @private
     * @return {?}
     */
    unsubscribeToDrawKeyDown() {
        if (this.drawKeyDown$$ !== undefined) {
            this.drawKeyDown$$.unsubscribe();
        }
    }
    /**
     * Unsubscribe to key up
     * @private
     * @return {?}
     */
    unsubscribeToDrawKeyUp() {
        if (this.drawKeyUp$$ !== undefined) {
            this.drawKeyUp$$.unsubscribe();
        }
    }
    /**
     * Remove the draw interaction
     * @private
     * @return {?}
     */
    removeOlDrawInteraction() {
        if (this.olDrawInteraction === undefined) {
            return;
        }
        this.unsubscribeToKeyDown();
        this.unsubscribeToDrawKeyUp();
        this.unsubscribeToDrawKeyDown();
        this.deactivateDrawInteraction();
        this.olDrawInteraction = undefined;
    }
    /**
     * Activate the draw interaction
     * @private
     * @return {?}
     */
    activateDrawInteraction() {
        if (this.olDrawInteractionIsActive === true) {
            return;
        }
        this.clearOlLinearRingsSource();
        this.addOlLinearRingsLayer();
        this.olMap.getInteractions().forEach((/**
         * @param {?} olInteraction
         * @return {?}
         */
        (olInteraction) => {
            if (olInteraction instanceof OlDragBoxInteraction) {
                this.olMap.removeInteraction(olInteraction);
                this.removedOlInteractions.push(olInteraction);
            }
        }));
        this.olDrawInteractionIsActive = true;
        this.onDrawStartKey = this.olDrawInteraction
            .on('drawstart', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onDrawStart(event)));
        this.onDrawEndKey = this.olDrawInteraction
            .on('drawend', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onDrawEnd(event)));
        this.olMap.addInteraction(this.olDrawInteraction);
    }
    /**
     * Deactivate the draw interaction
     * @private
     * @return {?}
     */
    deactivateDrawInteraction() {
        if (this.olDrawInteractionIsActive === false) {
            return;
        }
        this.removeOlLinearRingsLayer();
        this.removedOlInteractions.forEach((/**
         * @param {?} olInteraction
         * @return {?}
         */
        (olInteraction) => {
            this.olMap.addInteraction(olInteraction);
        }));
        this.olDrawInteractionIsActive = false;
        unByKey(this.onDrawStartKey);
        unByKey(this.onDrawEndKey);
        if (this.olMap !== undefined) {
            this.olMap.removeInteraction(this.olDrawInteraction);
        }
    }
    /**
     * When draw start, add a new linerar ring to the geometrty and start watching for changes
     * @private
     * @param {?} event Draw start event
     * @return {?}
     */
    onDrawStart(event) {
        /** @type {?} */
        const olGeometry = event.feature.getGeometry();
        /** @type {?} */
        const linearRingCoordinates = olGeometry.getLinearRing().getCoordinates();
        this.addLinearRingToOlGeometry(linearRingCoordinates);
        this.start$.next(this.getOlGeometry());
        this.onDrawKey = olGeometry.on('change', (/**
         * @param {?} olGeometryEvent
         * @return {?}
         */
        (olGeometryEvent) => {
            /** @type {?} */
            const _linearRingCoordinates = olGeometryEvent.target.getLinearRing().getCoordinates();
            this.updateLinearRingOfOlGeometry(_linearRingCoordinates);
            this.changes$.next(this.getOlGeometry());
        }));
        this.subscribeToKeyDown();
    }
    /**
     * When translation ends, update the geometry observable and stop watchign for changes
     * @private
     * @param {?} event Draw end event
     * @return {?}
     */
    onDrawEnd(event) {
        if (this.onDrawKey !== undefined) {
            unByKey(this.onDrawKey);
        }
        /** @type {?} */
        const linearRingCoordinates = event.feature.getGeometry().getLinearRing().getCoordinates();
        this.updateLinearRingOfOlGeometry(linearRingCoordinates);
        this.clearOlLinearRingsSource();
        this.end$.next(this.getOlGeometry());
        this.unsubscribeToKeyDown();
    }
    /**
     * Add a linear ring to the geometry being modified
     * @private
     * @param {?} coordinates Linear ring coordinates
     * @return {?}
     */
    addLinearRingToOlGeometry(coordinates) {
        /** @type {?} */
        const olGeometry = this.getOlGeometry();
        /** @type {?} */
        const olLinearRing = new OlLinearRing(coordinates);
        addLinearRingToOlPolygon(olGeometry, olLinearRing);
    }
    /**
     * Update the last linear ring of the geometry being modified
     * @private
     * @param {?} coordinates Linear ring coordinates
     * @return {?}
     */
    updateLinearRingOfOlGeometry(coordinates) {
        /** @type {?} */
        const olGeometry = this.getOlGeometry();
        // Remove the last linear ring (the one we are updating)
        /** @type {?} */
        const olLinearRings = olGeometry.getLinearRings().slice(0, -1);
        /** @type {?} */
        const newCoordinates = olLinearRings.map((/**
         * @param {?} olLinearRing
         * @return {?}
         */
        (olLinearRing) => {
            return olLinearRing.getCoordinates();
        }));
        newCoordinates.push(coordinates);
        olGeometry.setCoordinates(newCoordinates);
    }
    /**
     * Get the geometry being modified
     * @private
     * @return {?} OL Geometry
     */
    getOlGeometry() {
        /** @type {?} */
        const olFeatures = this.olOverlaySource.getFeatures();
        return olFeatures.length > 0 ? olFeatures[0].getGeometry() : undefined;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Control to modify geometries
 */
class SliceControl {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = options;
        /**
         * Slice end observable
         */
        this.end$ = new Subject();
        /**
         * Slice error, if any
         */
        this.error$ = new Subject();
        if (options.layer !== undefined) {
            this.olOverlayLayer = options.layer;
        }
        else {
            this.olOverlayLayer = this.createOlInnerOverlayLayer();
        }
    }
    /**
     * Wheter the control is active
     * @return {?}
     */
    get active() {
        return this.olMap !== undefined;
    }
    /**
     * OL overlay source
     * \@internal
     * @return {?}
     */
    get olOverlaySource() {
        return this.olOverlayLayer.getSource();
    }
    /**
     * Add or remove this control to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    setOlMap(olMap$$1) {
        if (olMap$$1 === undefined) {
            this.clearOlInnerOverlaySource();
            this.removeOlInnerOverlayLayer();
            this.removeDrawLineControl();
            this.olMap = olMap$$1;
            return;
        }
        this.olMap = olMap$$1;
        this.addOlInnerOverlayLayer();
        this.addDrawLineControl();
    }
    /**
     * Return the overlay source
     * @return {?}
     */
    getSource() {
        return this.olOverlaySource;
    }
    /**
     * Add an OL geometry to the overlay for slicing
     * @param {?} olGeometry Ol Geometry
     * @return {?}
     */
    setOlGeometry(olGeometry) {
        /** @type {?} */
        const olFeature$$1 = new olFeature({ geometry: olGeometry });
        this.olOverlaySource.clear();
        this.olOverlaySource.addFeature(olFeature$$1);
    }
    /**
     * Create an overlay source if none is defined in the options
     * @private
     * @return {?}
     */
    createOlInnerOverlayLayer() {
        return new OlVectorLayer({
            source: this.options.source ? this.options.source : new OlVectorSource(),
            style: this.options.layerStyle,
            zIndex: 500
        });
    }
    /**
     * Clear the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    removeOlInnerOverlayLayer() {
        if (this.options.layer === undefined && this.olMap !== undefined) {
            this.olMap.removeLayer(this.olOverlayLayer);
        }
    }
    /**
     * Add the overlay layer if it wasn't defined in the options
     * @private
     * @return {?}
     */
    addOlInnerOverlayLayer() {
        if (this.options.layer === undefined) {
            this.olMap.addLayer(this.olOverlayLayer);
        }
    }
    /**
     * Clear the overlay source if it wasn't defined in the options
     * @private
     * @return {?}
     */
    clearOlInnerOverlaySource() {
        if (this.options.layer === undefined && this.options.source === undefined) {
            this.olOverlaySource.clear();
        }
    }
    /**
     * Create a draw line control and add it to the map
     * @private
     * @return {?}
     */
    addDrawLineControl() {
        this.drawLineControl = new DrawControl({
            geometryType: 'LineString',
            drawStyle: this.options.drawStyle,
            maxPoints: 2
        });
        this.drawLineStart$$ = this.drawLineControl.start$
            .subscribe((/**
         * @param {?} olLine
         * @return {?}
         */
        (olLine) => this.onDrawLineStart(olLine)));
        this.drawLineEnd$$ = this.drawLineControl.end$
            .subscribe((/**
         * @param {?} olLine
         * @return {?}
         */
        (olLine) => this.onDrawLineEnd(olLine)));
        this.drawLineControl.setOlMap(this.olMap);
    }
    /**
     * Remove draw line control
     * @private
     * @return {?}
     */
    removeDrawLineControl() {
        if (this.drawLineControl === undefined) {
            return;
        }
        this.drawLineStart$$.unsubscribe();
        this.drawLineEnd$$.unsubscribe();
        this.drawLineControl.getSource().clear();
        this.drawLineControl.setOlMap(undefined);
    }
    /**
     * Clear the draw source and track the geometry being draw
     * @private
     * @param {?} olLine Ol linestring or polygon
     * @return {?}
     */
    onDrawLineStart(olLine) {
        this.drawLineControl.getSource().clear();
    }
    /**
     * Slice the first geometry encountered with the drawn line
     * @private
     * @param {?} olLine Ol linestring
     * @return {?}
     */
    onDrawLineEnd(olLine) {
        /** @type {?} */
        const olSlicedGeometries = [];
        /** @type {?} */
        const lineExtent = olLine.getExtent();
        /** @type {?} */
        const olFeaturesToRemove = [];
        try {
            this.olOverlaySource.forEachFeatureInExtent(lineExtent, (/**
             * @param {?} olFeature
             * @return {?}
             */
            (olFeature$$1) => {
                /** @type {?} */
                const olGeometry = olFeature$$1.getGeometry();
                /** @type {?} */
                const olParts = sliceOlGeometry(olGeometry, olLine);
                if (olParts.length > 0) {
                    olSlicedGeometries.push(...olParts);
                    olFeaturesToRemove.push(olFeature$$1);
                }
            }));
        }
        catch (e) {
            if (e instanceof GeometrySliceError) {
                this.error$.next(e);
                return;
            }
            else {
                throw e;
            }
        }
        this.drawLineControl.getSource().clear();
        this.olOverlaySource.addFeatures(olSlicedGeometries.map((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => new olFeature(olGeometry))));
        olFeaturesToRemove.forEach((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature$$1) => {
            this.olOverlaySource.removeFeature(olFeature$$1);
        }));
        this.error$.next(undefined);
        this.end$.next(olSlicedGeometries);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MeasurerDialogComponent {
    /**
     * @param {?} dialogRef
     * @param {?} data
     */
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.measureAreaUnit = MeasureAreaUnit;
        this.measureLengthUnit = MeasureLengthUnit;
    }
    /**
     * @return {?}
     */
    onNoClick() {
        this.dialogRef.close();
    }
}
MeasurerDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-measurer-dialog',
                template: "<div mat-dialog-content>\r\n  <h3>{{'igo.geo.measure.dialog.title' | translate}}</h3>\r\n\r\n  <table>\r\n    <thead>\r\n      <tr>\r\n        <th colspan=\"2\">{{'igo.geo.measure.dialog.length.title' | translate}}</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.lengthInMeters' | translate}}</td>\r\n        <td>{{data.length | measureFormat: measureLengthUnit.Meters}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.lengthInKilometers' | translate}}</td>\r\n        <td>{{data.length | measureFormat: measureLengthUnit.Kilometers}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.lengthInMiles' | translate}}</td>\r\n        <td>{{data.length | measureFormat: measureLengthUnit.Miles}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.lengthInFeet' | translate}}</td>\r\n        <td>{{data.length | measureFormat: measureLengthUnit.Feet}}</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n\r\n  <table>\r\n    <thead>\r\n      <tr>\r\n        <th colspan=\"2\">{{'igo.geo.measure.dialog.area.title' | translate}}</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.areaInSquareMeters' | translate}}</td>\r\n        <td>{{data.area | measureFormat: measureAreaUnit.SquareMeters}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.areaInSquareKilometers' | translate}}</td>\r\n        <td>{{data.area | measureFormat:measureAreaUnit.SquareKilometers}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.areaInSquareMiles' | translate}}</td>\r\n        <td>{{data.area | measureFormat: measureAreaUnit.SquareMiles}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.areaInAcres' | translate}}</td>\r\n        <td>{{data.area | measureFormat: measureAreaUnit.Acres}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.areaInHectares' | translate}}</td>\r\n        <td>{{data.area | measureFormat: measureAreaUnit.Hectares}}</td>\r\n      </tr>\r\n      <tr>\r\n        <td>{{'igo.geo.measure.dialog.perimeterInMeters' | translate}}</td>\r\n        <td>{{data.perimeter | measureFormat: measureLengthUnit.Meters}}</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</div>\r\n",
                styles: ["h3{text-align:center;margin:0}table{width:100%;padding:10px}table tbody tr td:last-child{padding-left:10px}"]
            }] }
];
/** @nocollapse */
MeasurerDialogComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tool to measure lengths and areas
 */
class MeasurerComponent {
    /**
     * @param {?} languageService
     * @param {?} dialog
     */
    constructor(languageService, dialog) {
        this.languageService = languageService;
        this.dialog = dialog;
        /**
         * Table template
         * \@internal
         */
        this.tableTemplate = {
            selection: true,
            selectMany: true,
            selectionCheckbox: true,
            sort: true,
            columns: [
                {
                    name: 'length',
                    title: this.languageService.translate.instant('igo.geo.measure.lengthHeader'),
                    valueAccessor: (/**
                     * @param {?} feature
                     * @return {?}
                     */
                    (feature) => {
                        /** @type {?} */
                        const unit = this.activeLengthUnit;
                        /** @type {?} */
                        const measure = metersToUnit(feature.properties.measure.length, unit);
                        return formatMeasure(measure, {
                            decimal: 1,
                            unit,
                            unitAbbr: false,
                            locale: 'fr'
                        });
                    })
                },
                {
                    name: 'area',
                    title: this.languageService.translate.instant('igo.geo.measure.areaHeader'),
                    valueAccessor: (/**
                     * @param {?} feature
                     * @return {?}
                     */
                    (feature) => {
                        /** @type {?} */
                        const unit = this.activeAreaUnit;
                        /** @type {?} */
                        const measure = squareMetersToUnit(feature.properties.measure.area, unit);
                        return measure ? formatMeasure(measure, {
                            decimal: 1,
                            unit,
                            unitAbbr: false,
                            locale: 'fr'
                        }) : '';
                    })
                }
            ]
        };
        /**
         * Reference to the MeasureType enum
         * \@internal
         */
        this.measureType = MeasureType;
        /**
         * Reference to the AreaMeasureUnit enum
         * \@internal
         */
        this.measureAreaUnit = MeasureAreaUnit;
        /**
         * Reference to the LengthMeasureUnit enum
         * \@internal
         */
        this.measureLengthUnit = MeasureLengthUnit;
        /**
         * Whether measure units should be automatically determined
         * \@internal
         */
        this.measureUnitsAuto = false;
        /**
         * Observable of area
         * \@internal
         */
        this.measure$ = new BehaviorSubject({});
        /**
         * Observable of selected features
         * \@internal
         */
        this.selectedFeatures$ = new BehaviorSubject([]);
        /**
         * OL draw source
         * \@internal
         */
        this.showTooltips = true;
        /**
         * Active mlength unit
         */
        this.activeLengthUnit = MeasureLengthUnit.Meters;
        /**
         * Active area unit
         */
        this.activeAreaUnit = MeasureAreaUnit.SquareMeters;
        /**
         * OL draw source
         */
        this.olDrawSource = new OlVectorSource();
        this._activeMeasureType = MeasureType.Length;
        /**
         * The minimum length a segment must have to display a tooltip.
         * It also applies to area tooltips.
         */
        this.minSegmentLength = 10;
    }
    /**
     * Measure type
     * \@internal
     * @param {?} value
     * @return {?}
     */
    set activeMeasureType(value) { this.setActiveMeasureType(value); }
    /**
     * @return {?}
     */
    get activeMeasureType() { return this._activeMeasureType; }
    /**
     * Wheter one of the draw control is active
     * \@internal
     * @return {?}
     */
    get drawControlIsActive() {
        return this.activeDrawControl !== undefined;
    }
    /**
     * @return {?}
     */
    get projection() {
        return this.map.ol.getView().getProjection();
    }
    /**
     * Add draw controls and activate one
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.initStore();
        this.createDrawLineControl();
        this.createDrawPolygonControl();
        this.createModifyControl();
        this.toggleDrawControl();
        this.onToggleTooltips(this.showTooltips);
        this.updateTooltipsOfOlSource(this.store.source.ol);
    }
    /**
     * Clear the overlay layer and any interaction added by this component.
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.setActiveMeasureType(undefined);
        this.deactivateModifyControl();
        this.freezeStore();
    }
    /**
     * Set the measure type
     * \@internal
     * @param {?} measureType
     * @return {?}
     */
    onMeasureTypeChange(measureType) {
        this.activeMeasureType = measureType;
    }
    /**
     * Activate or deactivate the current draw control
     * \@internal
     * @param {?} toggle
     * @return {?}
     */
    onToggleDrawControl(toggle) {
        if (toggle === true) {
            this.toggleDrawControl();
        }
        else {
            this.deactivateDrawControl();
        }
    }
    /**
     * Activate or deactivate the current draw control
     * \@internal
     * @param {?} toggle
     * @return {?}
     */
    onToggleTooltips(toggle) {
        this.showTooltips = toggle;
        if (toggle === true) {
            this.showTooltipsOfOlSource(this.store.source.ol);
        }
        else {
            this.clearTooltipsOfOlSource(this.store.source.ol);
        }
    }
    /**
     * Activate or deactivate the current draw control
     * \@internal
     * @param {?} toggle
     * @return {?}
     */
    onToggleMeasureUnitsAuto(toggle) {
        this.measureUnitsAuto = toggle;
    }
    /**
     * Set the measure type
     * \@internal
     * @param {?} unit
     * @return {?}
     */
    onLengthUnitChange(unit) {
        this.activeLengthUnit = unit;
        this.table.refresh();
        this.updateTooltipsOfOlSource(this.store.source.ol);
        if (this.activeOlGeometry !== undefined) {
            this.updateTooltipsOfOlGeometry(this.activeOlGeometry);
        }
    }
    /**
     * Set the measure type
     * \@internal
     * @param {?} unit
     * @return {?}
     */
    onAreaUnitChange(unit) {
        this.activeAreaUnit = unit;
        this.table.refresh();
        this.updateTooltipsOfOlSource(this.store.source.ol);
        if (this.activeOlGeometry !== undefined) {
            this.updateTooltipsOfOlGeometry(this.activeOlGeometry);
        }
    }
    /**
     * @return {?}
     */
    onCalculateClick() {
        /** @type {?} */
        const features = this.selectedFeatures$.value;
        /** @type {?} */
        const area = features.reduce((/**
         * @param {?} sum
         * @param {?} feature
         * @return {?}
         */
        (sum, feature) => {
            return sum + feature.properties.measure.area || 0;
        }), 0);
        /** @type {?} */
        const length = features.reduce((/**
         * @param {?} sum
         * @param {?} feature
         * @return {?}
         */
        (sum, feature) => {
            if (feature.geometry.type === 'Polygon') {
                return sum;
            }
            return sum + feature.properties.measure.length || 0;
        }), 0);
        /** @type {?} */
        const perimeter = features.reduce((/**
         * @param {?} sum
         * @param {?} feature
         * @return {?}
         */
        (sum, feature) => {
            if (feature.geometry.type === 'LineString') {
                return sum;
            }
            return sum + feature.properties.measure.length || 0;
        }), 0);
        this.openDialog({
            area,
            length,
            perimeter
        });
    }
    /**
     * @return {?}
     */
    onDeleteClick() {
        this.store.deleteMany(this.selectedFeatures$.value);
    }
    /**
     * @return {?}
     */
    onModifyClick() {
        if (this.selectedFeatures$.value.length !== 1) {
            return;
        }
        if (this.modifyControl.active === true) {
            this.deactivateModifyControl();
            this.toggleDrawControl();
        }
        else {
            /** @type {?} */
            const feature = this.selectedFeatures$.value[0];
            /** @type {?} */
            const olFeatures = this.store.layer.ol.getSource().getFeatures();
            /** @type {?} */
            const olFeature$$1 = olFeatures.find((/**
             * @param {?} _olFeature
             * @return {?}
             */
            (_olFeature) => {
                return _olFeature.get('id') === feature.properties.id;
            }));
            if (olFeature$$1 !== undefined) {
                this.deactivateDrawControl();
                this.activateModifyControl();
                /** @type {?} */
                const olGeometry = olFeature$$1.getGeometry();
                this.clearTooltipsOfOlGeometry(olGeometry);
                this.modifyControl.setOlGeometry(olGeometry);
            }
        }
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    openDialog(data) {
        this.dialog.open(MeasurerDialogComponent, { data });
    }
    /**
     * Initialize the measure store and set up some listeners
     * \@internal
     * @private
     * @return {?}
     */
    initStore() {
        /** @type {?} */
        const store = this.store;
        /** @type {?} */
        const layer = new VectorLayer({
            title: 'Measures',
            zIndex: 200,
            source: new FeatureDataSource(),
            style: createMeasureLayerStyle(),
            showInLayerList: false,
            exportable: false,
            browsable: false
        });
        tryBindStoreLayer(store, layer);
        tryAddLoadingStrategy(store);
        tryAddSelectionStrategy(store, new FeatureStoreSelectionStrategy({
            map: this.map,
            many: true
        }));
        this.onFeatureAddedKey = store.source.ol.on('addfeature', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const feature = event.feature;
            /** @type {?} */
            const olGeometry = feature.getGeometry();
            this.updateMeasureOfOlGeometry(olGeometry, feature.get('measure'));
        }));
        this.onFeatureRemovedKey = store.source.ol.on('removefeature', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const olGeometry = event.feature.getGeometry();
            this.clearTooltipsOfOlGeometry(olGeometry);
        }));
        this.selectedFeatures$$ = store.stateView.manyBy$((/**
         * @param {?} record
         * @return {?}
         */
        (record) => {
            return record.state.selected === true;
        })).pipe(skip(1) // Skip initial emission
        )
            .subscribe((/**
         * @param {?} records
         * @return {?}
         */
        (records) => {
            if (this.modifyControl.active === true) {
                this.deactivateModifyControl();
            }
            this.selectedFeatures$.next(records.map((/**
             * @param {?} record
             * @return {?}
             */
            record => record.entity)));
        }));
    }
    /**
     * Freeze any store, meaning the layer is removed, strategies are deactivated
     * and some listener removed
     * \@internal
     * @private
     * @return {?}
     */
    freezeStore() {
        /** @type {?} */
        const store = this.store;
        this.selectedFeatures$$.unsubscribe();
        unByKey(this.onFeatureAddedKey);
        unByKey(this.onFeatureRemovedKey);
        this.clearTooltipsOfOlSource(store.source.ol);
        this.map.removeLayer(store.layer);
        store.deactivateStrategyOfType(FeatureStoreLoadingStrategy);
        store.deactivateStrategyOfType(FeatureStoreSelectionStrategy);
    }
    /**
     * Create a draw line control
     * @private
     * @return {?}
     */
    createDrawLineControl() {
        this.drawLineControl = new DrawControl({
            geometryType: 'LineString',
            source: this.olDrawSource,
            drawStyle: createMeasureInteractionStyle(),
            layerStyle: new OlStyle({})
        });
    }
    /**
     * Create a draw polygon control
     * @private
     * @return {?}
     */
    createDrawPolygonControl() {
        this.drawPolygonControl = new DrawControl({
            geometryType: 'Polygon',
            source: this.olDrawSource,
            drawStyle: createMeasureInteractionStyle(),
            layerStyle: new OlStyle({})
        });
    }
    /**
     * Create a draw polygon control
     * @private
     * @return {?}
     */
    createModifyControl() {
        this.modifyControl = new ModifyControl({
            source: this.olDrawSource,
            drawStyle: createMeasureInteractionStyle(),
            layerStyle: new OlStyle({})
        });
    }
    /**
     * Activate the right control
     * @private
     * @return {?}
     */
    toggleDrawControl() {
        this.deactivateDrawControl();
        // this.deactivateModifyControl();
        if (this.activeMeasureType === MeasureType.Length) {
            this.activateDrawControl(this.drawLineControl);
        }
        else if (this.activeMeasureType === MeasureType.Area) {
            this.activateDrawControl(this.drawPolygonControl);
        }
    }
    /**
     * Activate a given control
     * @private
     * @param {?} drawControl Draw control
     * @return {?}
     */
    activateDrawControl(drawControl) {
        this.activeDrawControl = drawControl;
        this.drawStart$$ = drawControl.start$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => this.onDrawStart(olGeometry)));
        this.drawEnd$$ = drawControl.end$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => this.onDrawEnd(olGeometry)));
        this.drawChanges$$ = drawControl.changes$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => this.onDrawChanges(olGeometry)));
        drawControl.setOlMap(this.map.ol);
    }
    /**
     * Deactivate the active draw control
     * @private
     * @return {?}
     */
    deactivateDrawControl() {
        if (this.activeDrawControl === undefined) {
            return;
        }
        this.olDrawSource.clear();
        if (this.drawStart$$ !== undefined) {
            this.drawStart$$.unsubscribe();
        }
        if (this.drawEnd$$ !== undefined) {
            this.drawEnd$$.unsubscribe();
        }
        if (this.drawChanges$$ !== undefined) {
            this.drawChanges$$.unsubscribe();
        }
        this.clearTooltipsOfOlSource(this.olDrawSource);
        if (this.activeOlGeometry !== undefined) {
            this.clearTooltipsOfOlGeometry(this.activeOlGeometry);
        }
        this.activeDrawControl.setOlMap(undefined);
        this.activeDrawControl = undefined;
        this.activeOlGeometry = undefined;
    }
    /**
     * @private
     * @param {?} measureType
     * @return {?}
     */
    setActiveMeasureType(measureType) {
        this._activeMeasureType = measureType;
        this.clearMeasures();
        this.toggleDrawControl();
    }
    /**
     * Clear the draw source and track the geometry being drawn
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onDrawStart(olGeometry) {
        this.activeOlGeometry = olGeometry;
    }
    /**
     * Clear the draw source and track the geometry being draw
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onDrawEnd(olGeometry) {
        this.activeOlGeometry = undefined;
        this.finalizeMeasureOfOlGeometry(olGeometry);
        this.addFeatureToStore(olGeometry);
        this.clearTooltipsOfOlGeometry(olGeometry);
        this.olDrawSource.clear(true);
    }
    /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onDrawChanges(olGeometry) {
        /** @type {?} */
        const measure = measureOlGeometry(olGeometry, this.projection);
        this.updateMeasureOfOlGeometry(olGeometry, Object.assign({}, measure, {
            area: undefined // We don't want to display an area tooltip while drawing.
        }));
        this.measure$.next(measure);
    }
    /**
     * Activate a given control
     * @private
     * @return {?}
     */
    activateModifyControl() {
        /** @type {?} */
        const selection = (/** @type {?} */ (this.store.getStrategyOfType(FeatureStoreSelectionStrategy)));
        selection.deactivate();
        selection.clear();
        this.modifyStart$$ = this.modifyControl.start$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => this.onModifyStart(olGeometry)));
        this.modifyEnd$$ = this.modifyControl.end$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => this.onModifyEnd(olGeometry)));
        this.modifyChanges$$ = this.modifyControl.changes$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => this.onModifyChanges(olGeometry)));
        this.modifyControl.setOlMap(this.map.ol);
    }
    /**
     * Deactivate the active modify control
     * @private
     * @return {?}
     */
    deactivateModifyControl() {
        if (this.modifyStart$$ !== undefined) {
            this.modifyStart$$.unsubscribe();
        }
        if (this.modifyEnd$$ !== undefined) {
            this.modifyEnd$$.unsubscribe();
        }
        if (this.modifyChanges$$ !== undefined) {
            this.modifyChanges$$.unsubscribe();
        }
        if (this.activeOlGeometry !== undefined) {
            if (this.selectedFeatures$.value.length === 1) {
                /** @type {?} */
                const feature = this.selectedFeatures$.value[0];
                this.addFeatureToStore(this.activeOlGeometry, feature);
            }
            this.finalizeMeasureOfOlGeometry(this.activeOlGeometry);
        }
        this.olDrawSource.clear();
        this.store.activateStrategyOfType(FeatureStoreSelectionStrategy);
        this.activeOlGeometry = undefined;
        this.modifyControl.setOlMap(undefined);
    }
    /**
     * Clear the draw source and track the geometry being drawn
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onModifyStart(olGeometry) {
        this.onDrawStart(olGeometry);
    }
    /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onModifyChanges(olGeometry) {
        this.onDrawChanges(olGeometry);
    }
    /**
     * Clear the draw source and track the geometry being draw
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onModifyEnd(olGeometry) {
        this.finalizeMeasureOfOlGeometry(olGeometry);
    }
    /**
     * @private
     * @param {?} olGeometry
     * @return {?}
     */
    finalizeMeasureOfOlGeometry(olGeometry) {
        /** @type {?} */
        let measure = measureOlGeometry(olGeometry, this.projection);
        if (olGeometry instanceof OlPolygon) {
            measure = Object.assign({}, measure, {
                lengths: [] // We don't want to display an area tooltip while drawing.
            });
        }
        this.updateMeasureOfOlGeometry(olGeometry, measure);
    }
    /**
     * Update measures observables
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @param {?} measure Measure
     * @return {?}
     */
    updateMeasureOfOlGeometry(olGeometry, measure) {
        olGeometry.setProperties({ _measure: measure }, true);
        this.updateTooltipsOfOlGeometry(olGeometry);
    }
    /**
     * Clear the measures observables
     * @private
     * @return {?}
     */
    clearMeasures() {
        this.measure$.next({});
    }
    /**
     * Add a feature with measures to the store. The loading stragegy of the store
     * will trigger and add the feature to the map.
     * \@internal
     * @private
     * @param {?} olGeometry
     * @param {?=} feature
     * @return {?}
     */
    addFeatureToStore(olGeometry, feature) {
        /** @type {?} */
        const featureId = feature ? feature.properties.id : uuid();
        /** @type {?} */
        const projection = this.map.ol.getView().getProjection();
        /** @type {?} */
        const geometry = new OlGeoJSON().writeGeometryObject(olGeometry, {
            featureProjection: projection,
            dataProjection: projection
        });
        this.store.update({
            type: FEATURE,
            geometry,
            projection: projection.getCode(),
            properties: {
                id: featureId,
                measure: olGeometry.get('_measure')
            },
            meta: {
                id: featureId
            }
        });
    }
    /**
     * Update all the tooltips of an OL geometry
     * @private
     * @param {?} olGeometry OL Geometry
     * @return {?}
     */
    updateTooltipsOfOlGeometry(olGeometry) {
        /** @type {?} */
        const measure = olGeometry.get('_measure');
        /** @type {?} */
        const lengths = measure.lengths;
        /** @type {?} */
        const area = measure.area;
        /** @type {?} */
        const olMidpointsTooltips = updateOlTooltipsAtMidpoints(olGeometry);
        if (lengths.length === olMidpointsTooltips.length) {
            for (let i = 0; i < olMidpointsTooltips.length; i++) {
                /** @type {?} */
                const length = lengths[i];
                if (length !== undefined) {
                    this.updateOlTooltip(olMidpointsTooltips[i], metersToUnit(length, this.activeLengthUnit), this.activeLengthUnit, MeasureType.Length);
                }
            }
        }
        if (area !== undefined) {
            this.updateOlTooltip(updateOlTooltipAtCenter(olGeometry), squareMetersToUnit(area, this.activeAreaUnit), this.activeAreaUnit, MeasureType.Area);
        }
    }
    /**
     * Show the map tooltips of a geoemtry
     * @private
     * @param {?} olGeometry
     * @return {?}
     */
    showTooltipsOfOlGeometry(olGeometry) {
        getTooltipsOfOlGeometry(olGeometry).forEach((/**
         * @param {?} olTooltip
         * @return {?}
         */
        (olTooltip) => {
            if (this.shouldShowTooltip(olTooltip)) {
                this.map.ol.addOverlay(olTooltip);
            }
        }));
    }
    /**
     * Clear the tooltips of an OL geometrys
     * @private
     * @param {?} olGeometry OL geometry with tooltips
     * @return {?}
     */
    clearTooltipsOfOlGeometry(olGeometry) {
        getTooltipsOfOlGeometry(olGeometry).forEach((/**
         * @param {?} olTooltip
         * @return {?}
         */
        (olTooltip) => {
            if (olTooltip !== undefined && olTooltip.getMap() !== undefined) {
                this.map.ol.removeOverlay(olTooltip);
            }
        }));
    }
    /**
     * Show the map tooltips of all the geometries of a source
     * @private
     * @param {?} olSource
     * @return {?}
     */
    updateTooltipsOfOlSource(olSource) {
        olSource.forEachFeature((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature$$1) => {
            this.updateTooltipsOfOlGeometry(olFeature$$1.getGeometry());
        }));
    }
    /**
     * Show the map tooltips of all the geometries of a source
     * @private
     * @param {?} olSource
     * @return {?}
     */
    showTooltipsOfOlSource(olSource) {
        olSource.forEachFeature((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature$$1) => {
            this.showTooltipsOfOlGeometry(olFeature$$1.getGeometry());
        }));
    }
    /**
     * Clear the map tooltips
     * @private
     * @param {?} olSource
     * @return {?}
     */
    clearTooltipsOfOlSource(olSource) {
        olSource.forEachFeature((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature$$1) => {
            /** @type {?} */
            const olGeometry = olFeature$$1.getGeometry();
            if (olGeometry !== undefined) {
                this.clearTooltipsOfOlGeometry(olFeature$$1.getGeometry());
            }
        }));
    }
    /**
     * Update an OL tooltip properties and inner HTML and add it to the map if possible
     * @private
     * @param {?} olTooltip OL tooltip
     * @param {?} measure The measure valeu ti display
     * @param {?} unit
     * @param {?} type
     * @return {?}
     */
    updateOlTooltip(olTooltip, measure, unit, type) {
        olTooltip.setProperties({ _measure: measure, _unit: unit, _type: type }, true);
        olTooltip.getElement().innerHTML = this.computeTooltipInnerHTML(olTooltip);
        if (this.shouldShowTooltip(olTooltip)) {
            this.map.ol.addOverlay(olTooltip);
        }
    }
    /**
     * Compute a tooltip's content
     * @private
     * @param {?} olTooltip OL overlay
     * @return {?} Inner HTML
     */
    computeTooltipInnerHTML(olTooltip) {
        /** @type {?} */
        const properties = (/** @type {?} */ (olTooltip.getProperties()));
        return formatMeasure(properties._measure, {
            decimal: 1,
            unit: properties._unit,
            unitAbbr: true,
            locale: 'fr'
        });
    }
    /**
     * Whether a tooltip should be showned based on the length
     * of the segment it is bound to.
     * @private
     * @param {?} olTooltip OL overlay
     * @return {?} True if the tooltip should be shown
     */
    shouldShowTooltip(olTooltip) {
        if (this.showTooltips === false) {
            return false;
        }
        /** @type {?} */
        const properties = (/** @type {?} */ (olTooltip.getProperties()));
        /** @type {?} */
        const measure = properties._measure;
        if (measure === undefined) {
            return false;
        }
        if (properties._unit === MeasureType.Length) {
            /** @type {?} */
            const minSegmentLength = metersToUnit(this.minSegmentLength, properties._unit) || 0;
            return measure > Math.max(minSegmentLength, 0);
        }
        return true;
    }
}
MeasurerComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-measurer',
                template: "<div>\r\n  <div class=\"measure-type-toggle\">\r\n    <mat-button-toggle-group\r\n      [value]=\"activeMeasureType\"\r\n      (change)=\"onMeasureTypeChange($event.value)\">\r\n      <mat-button-toggle [value]=\"measureType.Length\">\r\n        {{('igo.geo.measure.' + measureType.Length) | translate}}\r\n      </mat-button-toggle>\r\n      <mat-button-toggle [value]=\"measureType.Area\">\r\n        {{('igo.geo.measure.' + measureType.Area) | translate}}\r\n      </mat-button-toggle>\r\n    </mat-button-toggle-group>\r\n  </div>\r\n\r\n  <div class=\"measure-options\">\r\n    <mat-slide-toggle\r\n      [checked]=\"drawControlIsActive\"\r\n      [labelPosition]=\"'before'\"\r\n      (change)=\"onToggleDrawControl($event.checked)\">\r\n      {{'igo.geo.measure.toggleMeasure' | translate}}\r\n    </mat-slide-toggle>\r\n\r\n    <mat-slide-toggle\r\n      [checked]=\"showTooltips\"\r\n      [labelPosition]=\"'before'\"\r\n      (change)=\"onToggleTooltips($event.checked)\">\r\n      {{'igo.geo.measure.toggleMapTooltips' | translate}}\r\n    </mat-slide-toggle>\r\n\r\n    <mat-slide-toggle\r\n      [checked]=\"measureUnitsAuto\"\r\n      [labelPosition]=\"'before'\"\r\n      (change)=\"onToggleMeasureUnitsAuto($event.checked)\">\r\n      {{'igo.geo.measure.toggleAutoUnits' | translate}}\r\n    </mat-slide-toggle>\r\n  </div>\r\n\r\n  <ng-container *ngIf=\"measure$ | async as measure\">\r\n    <igo-measurer-item\r\n      [measureType]=\"measureType.Length\"\r\n      [measureUnit]=\"measureLengthUnit.Meters\"\r\n      [measure]=\"measure.length\"\r\n      [auto]=\"measureUnitsAuto\"\r\n      [placeholder]=\"(activeMeasureType === measureType.Area ? 'igo.geo.measure.perimeter' : 'igo.geo.measure.length') | translate\"\r\n      (measureUnitChange)=\"onLengthUnitChange($event)\">\r\n    </igo-measurer-item>\r\n\r\n    <igo-measurer-item\r\n      [measureType]=\"measureType.Area\"\r\n      [measureUnit]=\"measureAreaUnit.SquareMeters\"\r\n      [measure]=\"measure.area\"\r\n      [auto]=\"measureUnitsAuto\"\r\n      [placeholder]=\"'igo.geo.measure.area' | translate\"\r\n      (measureUnitChange)=\"onAreaUnitChange($event)\">\r\n    </igo-measurer-item>\r\n  </ng-container>\r\n\r\n  <div class=\"measure-store-buttons\">\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.geo.measure.actionbar.calculate.tooltip' | translate\"\r\n      [disabled]=\"(selectedFeatures$ | async).length === 0\"\r\n      (click)=\"onCalculateClick()\">\r\n      <mat-icon svgIcon=\"calculator\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.geo.measure.actionbar.delete.tooltip' | translate\"\r\n      [disabled]=\"(selectedFeatures$ | async).length === 0\"\r\n      (click)=\"onDeleteClick()\">\r\n      <mat-icon svgIcon=\"delete\"></mat-icon>\r\n    </button>\r\n\r\n    <!--button\r\n      mat-icon-button\r\n      [matTooltip]=\"'igo.geo.measure.actionbar.modify.tooltip' | translate\"\r\n      [disabled]=\"(selectedFeatures$ | async).length !== 1\"\r\n      (click)=\"onModifyClick()\">\r\n      <mat-icon svgIcon=\"edit\"></mat-icon>\r\n    </button-->\r\n  </div>\r\n\r\n  <igo-entity-table\r\n    #table\r\n    class=\"table-compact\"\r\n    [store]=\"store\"\r\n    [template]=\"tableTemplate\">\r\n  </igo-entity-table>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".measure-type-toggle{padding:10px;text-align:center}.measure-type-toggle mat-button-toggle-group{width:100%}.measure-type-toggle mat-button-toggle-group mat-button-toggle{width:50%}.measure-options{overflow-x:hidden}.measure-options mat-slide-toggle{width:100%;margin:10px}.measure-options mat-slide-toggle ::ng-deep .mat-slide-toggle-content{width:calc(100% - 60px);font-size:16px}.measure-store-buttons{width:100%;border-top:1px solid #ddd;border-bottom:1px solid #ddd}.measure-store-buttons button:first-of-type{margin-left:14px}"]
            }] }
];
/** @nocollapse */
MeasurerComponent.ctorParameters = () => [
    { type: LanguageService },
    { type: MatDialog }
];
MeasurerComponent.propDecorators = {
    map: [{ type: Input }],
    store: [{ type: Input }],
    activeMeasureType: [{ type: Input }],
    minSegmentLength: [{ type: Input }],
    table: [{ type: ViewChild, args: ['table',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This pipe returns a measure converted from meters (or square meters)
 * to the specified unit. It also keeps a certain number of decimals.
 */
class MeasureFormatPipe {
    /**
     * @ignore
     * @param {?} value
     * @param {?} unit
     * @param {?=} unitAbbr
     * @param {?=} decimal
     * @return {?}
     */
    transform(value, unit, unitAbbr = false, decimal = 1) {
        /** @type {?} */
        let out;
        if (Object.values(MeasureAreaUnit).indexOf(unit) >= 0) {
            out = squareMetersToUnit(value, (/** @type {?} */ (unit)));
        }
        else if (Object.values(MeasureLengthUnit).indexOf(unit) >= 0) {
            out = metersToUnit(value, (/** @type {?} */ (unit)));
        }
        return out ? formatMeasure(out, {
            decimal: 1,
            unit,
            unitAbbr,
            locale: 'fr'
        }) : out;
    }
}
MeasureFormatPipe.decorators = [
    { type: Pipe, args: [{
                name: 'measureFormat'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This input allows a user to draw a new geometry or to edit
 * an existing one on a map. A text input is also displayed in the
 * form with some instructions.
 * This is still WIP.
 */
class GeometryFormFieldInputComponent {
    /**
     * @param {?} cdRef
     * @param {?} ngControl
     */
    constructor(cdRef, ngControl) {
        this.cdRef = cdRef;
        this.ngControl = ngControl;
        this.olGeoJSON = new OlGeoJSON();
        this.ready = false;
        this.olTooltip = OlOverlay;
        /**
         * The drawGuide around the mouse pointer to help drawing
         */
        this.drawGuide = null;
        /**
         * Whether a measure tooltip should be displayed
         */
        this.measure = false;
        this.onChange = (/**
         * @return {?}
         */
        () => { });
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        if (this.ngControl !== undefined) {
            // Setting the value accessor directly (instead of using
            // the providers) to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }
    /**
     * The geometry type
     * @param {?} value
     * @return {?}
     */
    set geometryType(value) {
        this._geometryType = value;
        if (this.ready === false) {
            return;
        }
        this.deactivateControl();
        this.createDrawControl();
        this.toggleControl();
    }
    /**
     * @return {?}
     */
    get geometryType() { return this._geometryType; }
    /**
     * Style for the draw control (applies while the geometry is being drawn)
     * @param {?} value
     * @return {?}
     */
    set drawStyle(value) {
        this._drawStyle = value || createDrawInteractionStyle();
        if (this.isStyleWithRadius(this.drawStyle)) {
            this.defaultDrawStyleRadius = this.drawStyle.getImage().getRadius();
        }
        else {
            this.defaultDrawStyleRadius = null;
        }
    }
    /**
     * @return {?}
     */
    get drawStyle() { return this._drawStyle; }
    /**
     * Style for the overlay layer (applies once the geometry is added to the map)
     * If not specified, drawStyle applies
     * @param {?} value
     * @return {?}
     */
    set overlayStyle(value) {
        this._overlayStyle = value;
    }
    /**
     * @return {?}
     */
    get overlayStyle() {
        return this._overlayStyle || this.drawStyle;
    }
    /**
     * The geometry value (GeoJSON)
     * Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (this.ready === false) {
            this._value = value;
            return;
        }
        if (value) {
            this.addGeoJSONToOverlay(value);
        }
        else {
            this.olOverlaySource.clear();
        }
        this._value = value;
        this.onChange(value);
        this.toggleControl();
        this.cdRef.detectChanges();
    }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * The vector source to add the geometry to
     * \@internal
     * @return {?}
     */
    get olOverlaySource() {
        return this.olOverlayLayer.getSource();
    }
    /**
     * Create an overlay layer, add the initial geometry to it (if any)
     * and toggle the right interaction.
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.addOlOverlayLayer();
        this.createMeasureTooltip();
        this.createDrawControl();
        this.createModifyControl();
        if (this.value) {
            this.addGeoJSONToOverlay(this.value);
        }
        this.toggleControl();
        this.ready = true;
    }
    /**
     * Clear the overlay layer and any interaction added by this component.
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.deactivateControl();
        this.olOverlaySource.clear();
        this.map.ol.removeLayer(this.olOverlayLayer);
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    // tslint:disable-next-line:ban-types
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    // tslint:disable-next-line:ban-types
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * Add an overlay layer to the map
     * @private
     * @return {?}
     */
    addOlOverlayLayer() {
        this.olOverlayLayer = new OlVectorLayer({
            source: new OlVectorSource(),
            zIndex: 500,
            style: null
        });
        this.map.ol.addLayer(this.olOverlayLayer);
    }
    /**
     * Create a draw control and subscribe to it's geometry
     * @private
     * @return {?}
     */
    createDrawControl() {
        this.drawControl = new DrawControl({
            geometryType: this.geometryType || 'Point',
            layer: this.olOverlayLayer,
            drawStyle: (/**
             * @param {?} olFeature
             * @param {?} resolution
             * @return {?}
             */
            (olFeature$$1, resolution) => {
                /** @type {?} */
                const style$$1 = this.drawStyle;
                this.updateDrawStyleWithDrawGuide(style$$1, resolution);
                return style$$1;
            })
        });
    }
    /**
     * Create a modify control and subscribe to it's geometry
     * @private
     * @return {?}
     */
    createModifyControl() {
        this.modifyControl = new ModifyControl({
            layer: this.olOverlayLayer,
            drawStyle: (/**
             * @param {?} olFeature
             * @param {?} resolution
             * @return {?}
             */
            (olFeature$$1, resolution) => {
                /** @type {?} */
                const style$$1 = this.drawStyle;
                this.updateDrawStyleWithDrawGuide(style$$1, resolution);
                return style$$1;
            })
        });
    }
    /**
     * Toggle the proper control (draw or modify)
     * @private
     * @return {?}
     */
    toggleControl() {
        this.deactivateControl();
        if (!this.value && this.geometryType) {
            this.activateControl(this.drawControl);
        }
        else {
            this.activateControl(this.modifyControl);
        }
    }
    /**
     * Activate a given control
     * @private
     * @param {?} control Control
     * @return {?}
     */
    activateControl(control) {
        this.activeControl = control;
        this.olGeometryEnds$$ = control.end$
            .subscribe((/**
         * @param {?} olGeometry
         * @return {?}
         */
        (olGeometry) => this.onOlGeometryEnds(olGeometry)));
        if (this.measure === true && control === this.drawControl) {
            this.olGeometryChanges$$ = control.changes$
                .subscribe((/**
             * @param {?} olGeometry
             * @return {?}
             */
            (olGeometry) => this.onOlGeometryChanges(olGeometry)));
        }
        control.setOlMap(this.map.ol);
    }
    /**
     * Deactivate the active control
     * @private
     * @return {?}
     */
    deactivateControl() {
        this.removeMeasureTooltip();
        if (this.activeControl !== undefined) {
            this.activeControl.setOlMap(undefined);
        }
        if (this.olGeometryEnds$$ !== undefined) {
            this.olGeometryEnds$$.unsubscribe();
        }
        if (this.olGeometryChanges$$ !== undefined) {
            this.olGeometryChanges$$.unsubscribe();
        }
        this.activeControl = undefined;
    }
    /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onOlGeometryEnds(olGeometry) {
        this.removeMeasureTooltip();
        this.setOlGeometry(olGeometry);
    }
    /**
     * Update measures observables and map tooltips
     * @private
     * @param {?} olGeometry Ol linestring or polygon
     * @return {?}
     */
    onOlGeometryChanges(olGeometry) {
        if (olGeometry.getType() !== 'Point') {
            this.updateMeasureTooltip(olGeometry);
        }
    }
    /**
     * When drawing ends, convert the output value to GeoJSON and keep it.
     * Restore the double click interaction.
     * @private
     * @param {?} olGeometry OL geometry
     * @return {?}
     */
    setOlGeometry(olGeometry) {
        if (olGeometry === undefined) {
            return;
        }
        /** @type {?} */
        const value = this.olGeoJSON.writeGeometryObject(olGeometry, {
            featureProjection: this.map.projection,
            dataProjection: 'EPSG:4326'
        });
        this.writeValue(value);
    }
    /**
     * Add a GeoJSON geometry to the overlay
     * @private
     * @param {?} geometry GeoJSON geometry
     * @return {?}
     */
    addGeoJSONToOverlay(geometry) {
        /** @type {?} */
        const olGeometry = this.olGeoJSON.readGeometry(geometry, {
            dataProjection: 'EPSG:4326',
            featureProjection: this.map.projection
        });
        /** @type {?} */
        const olFeature$$1 = new olFeature({
            geometry: olGeometry
        });
        olFeature$$1.setStyle(this.overlayStyle);
        this.olOverlaySource.clear();
        this.olOverlaySource.addFeature(olFeature$$1);
    }
    /**
     * Create the measure tooltip
     * @private
     * @return {?}
     */
    createMeasureTooltip() {
        this.olTooltip = new OlOverlay({
            element: document.createElement('div'),
            offset: [-30, -10],
            className: [
                'igo-map-tooltip',
                'igo-map-tooltip-measure'
            ].join(' '),
            stopEvent: false
        });
    }
    /**
     * Update the measure tooltip of an OL geometry
     * @private
     * @param {?} olGeometry OL Geometry
     * @return {?}
     */
    updateMeasureTooltip(olGeometry) {
        /** @type {?} */
        const measure = measureOlGeometry(olGeometry, this.map.projection);
        /** @type {?} */
        const lengths = measure.lengths;
        /** @type {?} */
        const lastIndex = olGeometry.getType() === 'Polygon' ? lengths.length - 2 : lengths.length - 1;
        /** @type {?} */
        const lastLength = lengths[lastIndex];
        /** @type {?} */
        const olMidpoints = updateOlGeometryMidpoints(olGeometry);
        /** @type {?} */
        const olLastMidpoint = olMidpoints[lastIndex];
        if (olMidpoints.length === 0 || olLastMidpoint === undefined) {
            this.removeMeasureTooltip();
            return;
        }
        this.olTooltip.setPosition(olLastMidpoint.flatCoordinates);
        /** @type {?} */
        const innerHtml = formatMeasure(lastLength, {
            decimal: 1,
            unit: MeasureLengthUnit.Meters,
            unitAbbr: true,
            locale: 'fr'
        });
        this.olTooltip.getElement().innerHTML = innerHtml;
        if (this.olTooltip.getMap() === undefined) {
            this.map.ol.addOverlay(this.olTooltip);
        }
    }
    /**
     * Remove the measure tooltip from the map
     * @private
     * @return {?}
     */
    removeMeasureTooltip() {
        if (this.olTooltip.getMap && this.olTooltip.getMap() !== undefined) {
            this.map.ol.removeOverlay(this.olTooltip);
            this.olTooltip.setMap(undefined);
        }
    }
    /**
     * Adjust the draw style with the specified draw guide distance, if possible
     * @private
     * @param {?} olStyle Draw style to update
     * @param {?} resolution Resolution (to make the screen size of symbol fit the drawGuide value)
     * @return {?}
     */
    updateDrawStyleWithDrawGuide(olStyle, resolution) {
        if (this.isStyleWithRadius(olStyle)) {
            /** @type {?} */
            const drawGuide = this.drawGuide;
            /** @type {?} */
            let radius;
            if (drawGuide === null || drawGuide < 0) {
                radius = this.defaultDrawStyleRadius;
            }
            else {
                radius = drawGuide > 0 ? drawGuide / resolution : drawGuide;
            }
            olStyle.getImage().setRadius(radius);
        }
    }
    /**
     * Returns wether a given Open Layers style has a radius property that can be set (used to set draw guide)
     * @private
     * @param {?} olStyle The style on which to perform the check
     * @return {?}
     */
    isStyleWithRadius(olStyle) {
        return olStyle.getImage && olStyle.getImage().setRadius;
    }
}
GeometryFormFieldInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-geometry-form-field-input',
                template: "<ng-template></ng-template>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
GeometryFormFieldInputComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
];
GeometryFormFieldInputComponent.propDecorators = {
    map: [{ type: Input }],
    geometryType: [{ type: Input }],
    drawGuide: [{ type: Input }],
    measure: [{ type: Input }],
    drawStyle: [{ type: Input }],
    overlayStyle: [{ type: Input }],
    value: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoGeometryFormFieldModule {
}
IgoGeometryFormFieldModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatIconModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatButtonModule,
                    MatButtonToggleModule,
                    IgoLanguageModule
                ],
                exports: [
                    GeometryFormFieldComponent,
                    GeometryFormFieldInputComponent
                ],
                declarations: [
                    GeometryFormFieldComponent,
                    GeometryFormFieldInputComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoGeometryModule {
}
IgoGeometryModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoGeometryFormFieldModule
                ],
                exports: [
                    IgoGeometryFormFieldModule
                ],
                declarations: [],
                providers: [],
                entryComponents: [
                    GeometryFormFieldComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ExportError extends Error {
}
class ExportInvalidFileError extends ExportError {
    constructor() {
        super('Invalid file.');
        Object.setPrototypeOf(this, ExportInvalidFileError.prototype);
    }
}
class ExportNothingToExportError extends ExportError {
    constructor() {
        super('Nothing to export.');
        Object.setPrototypeOf(this, ExportNothingToExportError.prototype);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Export array to CSV
 *
 * @param {?} rows Array of arrays to export as CSV
 * @param {?} fileName
 * @param {?=} separator Cell separator
 * @return {?}
 */
function exportToCSV(rows, fileName, separator = ';') {
    /** @type {?} */
    const lines = rows.map((/**
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    (row, index) => row.join(separator)));
    /** @type {?} */
    const csvContent = lines.join('\n');
    downloadContent(csvContent, 'text/csv;charset=utf-8', fileName);
}
/**
 * Return an array of values from an array of entities.
 *
 * @param {?} entities Array of entities
 * @param {?} columns
 * @return {?}
 */
function entitiesToRowData(entities, columns) {
    return entities.map((/**
     * @param {?} entity
     * @return {?}
     */
    (entity) => {
        return columns.map((/**
         * @param {?} column
         * @return {?}
         */
        (column) => {
            /** @type {?} */
            let valueAccessor;
            if (column.renderer === undefined || column.renderer === EntityTableColumnRenderer.Default) {
                valueAccessor = column.valueAccessor;
            }
            valueAccessor = valueAccessor ? valueAccessor : getEntityProperty;
            return valueAccessor(entity, column.name);
        }));
    }));
}
/**
 * Trigger download of a file
 *
 * @param {?} content File content
 * @param {?} mimeType File mime type
 * @param {?} fileName File name
 * @return {?}
 */
function downloadContent(content, mimeType, fileName) {
    /** @type {?} */
    const element = document.createElement('a');
    element.setAttribute('href', `data:${mimeType},${encodeURIComponent(content)}`);
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
/**
 * @param {?} error
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
function handleFileExportError(error, messageService, languageService) {
    if (error instanceof ExportNothingToExportError) {
        handleNothingToExportError(messageService, languageService);
        return;
    }
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.geo.export.failed.title');
    /** @type {?} */
    const message = translate.instant('igo.geo.export.failed.text');
    messageService.error(message, title);
}
/**
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
function handleNothingToExportError(messageService, languageService) {
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.geo.export.nothing.title');
    /** @type {?} */
    const message = translate.instant('igo.geo.export.nothing.text');
    messageService.error(message, title);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const ExportFormat = strEnum(['GeoJSON', 'GML', 'GPX', 'KML', 'Shapefile']);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ExportService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        this.ogreUrl = this.config.getConfig('importExport.url');
    }
    /**
     * @param {?} olFeatures
     * @param {?} format
     * @param {?} title
     * @param {?=} projectionIn
     * @param {?=} projectionOut
     * @return {?}
     */
    export(olFeatures, format, title, projectionIn = 'EPSG:4326', projectionOut = 'EPSG:4326') {
        /** @type {?} */
        const exportOlFeatures = olFeatures.map((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature$$1) => {
            /** @type {?} */
            const keys = olFeature$$1.getKeys().filter((/**
             * @param {?} key
             * @return {?}
             */
            (key) => !key.startsWith('_')));
            /** @type {?} */
            const properties = keys.reduce((/**
             * @param {?} acc
             * @param {?} key
             * @return {?}
             */
            (acc, key) => {
                acc[key] = olFeature$$1.get(key);
                return acc;
            }), { geometry: olFeature$$1.getGeometry() });
            return new olFeature(properties);
        }));
        return this.exportAsync(exportOlFeatures, format, title, projectionIn, projectionOut);
    }
    /**
     * @private
     * @param {?} olFeatures
     * @param {?} format
     * @param {?} title
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    exportAsync(olFeatures, format, title, projectionIn, projectionOut) {
        /** @type {?} */
        const doExport = (/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            /** @type {?} */
            const nothingToExport = this.nothingToExport(olFeatures, format);
            if (nothingToExport === true) {
                observer.error(new ExportNothingToExportError());
                return;
            }
            /** @type {?} */
            const ogreFormats = Object.keys(ExportService.ogreFormats);
            if (ogreFormats.indexOf(format) >= 0) {
                if (this.ogreUrl === undefined) {
                    if (ExportService.noOgreFallbacks.indexOf(format) >= 0) {
                        this.exportToFile(olFeatures, observer, format, title, projectionIn, projectionOut);
                    }
                    else {
                        observer.error(new ExportInvalidFileError());
                    }
                    return;
                }
                this.exportWithOgre(olFeatures, observer, format, title, projectionIn, projectionOut);
            }
            else {
                this.exportToFile(olFeatures, observer, format, title, projectionIn, projectionOut);
            }
        });
        return new Observable(doExport);
    }
    /**
     * @private
     * @param {?} olFeatures
     * @param {?} observer
     * @param {?} format
     * @param {?} title
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    exportToFile(olFeatures, observer, format, title, projectionIn, projectionOut) {
        /** @type {?} */
        const olFormat = new olformat[format]();
        /** @type {?} */
        const featuresText = olFormat.writeFeatures(olFeatures, {
            dataProjection: projectionOut,
            featureProjection: projectionIn,
            featureType: 'feature',
            featureNS: 'http://example.com/feature'
        });
        /** @type {?} */
        const fileName = `${title}.${format.toLowerCase()}`;
        downloadContent(featuresText, 'text/plain;charset=utf-8', fileName);
        observer.complete();
    }
    /**
     * @private
     * @param {?} olFeatures
     * @param {?} observer
     * @param {?} format
     * @param {?} title
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    exportWithOgre(olFeatures, observer, format, title, projectionIn, projectionOut) {
        /** @type {?} */
        const featuresText = new GeoJSON().writeFeatures(olFeatures, {
            dataProjection: projectionOut,
            featureProjection: projectionIn,
            featureType: 'feature',
            featureNS: 'http://example.com/feature'
        });
        /** @type {?} */
        const url = `${this.ogreUrl}/convert`;
        /** @type {?} */
        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', url);
        /** @type {?} */
        const geojsonField = document.createElement('input');
        geojsonField.setAttribute('type', 'hidden');
        geojsonField.setAttribute('name', 'json');
        geojsonField.setAttribute('value', featuresText);
        form.appendChild(geojsonField);
        /** @type {?} */
        const outputNameField = document.createElement('input');
        /** @type {?} */
        const outputName = format === 'Shapefile' ? `${title}.zip` : title;
        outputNameField.setAttribute('type', 'hidden');
        outputNameField.setAttribute('name', 'outputName');
        outputNameField.setAttribute('value', outputName);
        form.appendChild(outputNameField);
        /** @type {?} */
        const ogreFormat = ExportService.ogreFormats[format];
        /** @type {?} */
        const outputFormatField = document.createElement('input');
        outputFormatField.setAttribute('type', 'hidden');
        outputFormatField.setAttribute('name', 'formatOutput');
        outputFormatField.setAttribute('value', ogreFormat);
        form.appendChild(outputFormatField);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        observer.complete();
    }
    /**
     * @private
     * @param {?} olFeatures
     * @param {?} format
     * @return {?}
     */
    nothingToExport(olFeatures, format) {
        if (olFeatures.length === 0) {
            return true;
        }
        if (format === 'GPX') {
            /** @type {?} */
            const pointOrLine = olFeatures.find((/**
             * @param {?} olFeature
             * @return {?}
             */
            (olFeature$$1) => {
                return ['Point', 'LineString'].indexOf(olFeature$$1.getGeometry().getType()) >= 0;
            }));
            return pointOrLine === undefined;
        }
        return false;
    }
}
ExportService.ogreFormats = {
    GML: 'gml',
    GPX: 'gpx',
    KML: 'kml',
    Shapefile: 'ESRI Shapefile'
};
ExportService.noOgreFallbacks = ['GML', 'GPX', 'KML'];
ExportService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ExportService.ctorParameters = () => [
    { type: ConfigService }
];
/** @nocollapse */ ExportService.ngInjectableDef = defineInjectable({ factory: function ExportService_Factory() { return new ExportService(inject(ConfigService)); }, token: ExportService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImportError extends Error {
}
class ImportInvalidFileError extends ImportError {
    constructor() {
        super('Invalid file.');
        Object.setPrototypeOf(this, ImportInvalidFileError.prototype);
    }
}
class ImportUnreadableFileError extends ImportError {
    constructor() {
        super('Failed to read file.');
        Object.setPrototypeOf(this, ImportUnreadableFileError.prototype);
    }
}
class ImportNothingToImportError extends ImportError {
    constructor() {
        super('Nothing to import.');
        Object.setPrototypeOf(this, ImportNothingToImportError.prototype);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} features
 * @param {?} map
 * @param {?} layerTitle
 * @return {?}
 */
function addLayerAndFeaturesToMap(features, map$$1, layerTitle) {
    /** @type {?} */
    const olFeatures = features.map((/**
     * @param {?} feature
     * @return {?}
     */
    (feature) => featureToOl(feature, map$$1.projection)));
    /** @type {?} */
    const r = Math.floor(Math.random() * 255);
    /** @type {?} */
    const g = Math.floor(Math.random() * 255);
    /** @type {?} */
    const b = Math.floor(Math.random() * 255);
    /** @type {?} */
    const stroke = new Stroke({
        color: [r, g, b, 1],
        width: 2
    });
    /** @type {?} */
    const fill = new Fill({
        color: [r, g, b, 0.4]
    });
    /** @type {?} */
    const sourceOptions = {
        queryable: true
    };
    /** @type {?} */
    const source = new FeatureDataSource(sourceOptions);
    source.ol.addFeatures(olFeatures);
    /** @type {?} */
    const layer = new VectorLayer({
        title: layerTitle,
        source,
        style: new Style({
            stroke,
            fill,
            image: new Circle({
                radius: 5,
                stroke,
                fill
            })
        })
    });
    map$$1.addLayer(layer);
    moveToOlFeatures(map$$1, olFeatures);
    return layer;
}
/**
 * @param {?} file
 * @param {?} features
 * @param {?} map
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
function handleFileImportSuccess(file, features, map$$1, messageService, languageService) {
    if (features.length === 0) {
        this.handleNothingToImportError(file, messageService, languageService);
        return;
    }
    /** @type {?} */
    const layerTitle = computeLayerTitleFromFile(file);
    addLayerAndFeaturesToMap(features, map$$1, layerTitle);
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const messageTitle = translate.instant('igo.geo.dropGeoFile.success.title');
    /** @type {?} */
    const message = translate.instant('igo.geo.dropGeoFile.success.text', {
        value: layerTitle
    });
    messageService.success(message, messageTitle);
}
/**
 * @param {?} file
 * @param {?} error
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
function handleFileImportError(file, error, messageService, languageService) {
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.geo.dropGeoFile.invalid.title');
    /** @type {?} */
    const message = translate.instant('igo.geo.dropGeoFile.invalid.text', {
        value: file.name,
        mimeType: file.type
    });
    messageService.error(message, title);
}
/**
 * @param {?} file
 * @param {?} messageService
 * @param {?} languageService
 * @return {?}
 */
function handleNothingToImportError(file, messageService, languageService) {
    /** @type {?} */
    const translate = languageService.translate;
    /** @type {?} */
    const title = translate.instant('igo.geo.dropGeoFile.empty.title');
    /** @type {?} */
    const message = translate.instant('igo.geo.dropGeoFile.empty.text', {
        value: file.name,
        mimeType: file.type
    });
    messageService.error(message, title);
}
/**
 * @param {?} file
 * @return {?}
 */
function getFileExtension(file) {
    return file.name.split('.').pop().toLowerCase();
}
/**
 * @param {?} file
 * @return {?}
 */
function computeLayerTitleFromFile(file) {
    return file.name.substr(0, file.name.lastIndexOf('.'));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImportService {
    /**
     * @param {?} http
     * @param {?} config
     */
    constructor(http, config) {
        this.http = http;
        this.config = config;
        this.ogreUrl = this.config.getConfig('importExport.url');
    }
    /**
     * @param {?} file
     * @param {?=} projectionIn
     * @param {?=} projectionOut
     * @return {?}
     */
    import(file, projectionIn = 'EPSG:4326', projectionOut = 'EPSG:4326') {
        return this.importAsync(file, projectionIn, projectionOut);
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    getFileImporter(file) {
        /** @type {?} */
        const extension = getFileExtension(file);
        /** @type {?} */
        const mimeType = file.type;
        /** @type {?} */
        const allowedMimeTypes = [...ImportService.allowedMimeTypes, ...ImportService.allowedZipMimeTypes];
        /** @type {?} */
        const allowedExtensions = ImportService.allowedExtensions;
        if (allowedMimeTypes.indexOf(mimeType) < 0 && allowedExtensions.indexOf(extension) < 0) {
            return undefined;
        }
        else if (mimeType === 'application/json' || ['json', 'geojson', 'kml'].indexOf(extension) >= 0) {
            return this.importFile;
        }
        else if (this.ogreUrl !== undefined) {
            return this.importFileWithOgre;
        }
        return undefined;
    }
    /**
     * @private
     * @param {?} file
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    importAsync(file, projectionIn, projectionOut) {
        /** @type {?} */
        const doImport = (/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            /** @type {?} */
            const importer = this.getFileImporter(file);
            if (importer === undefined) {
                observer.error(new ImportInvalidFileError());
                return;
            }
            importer.call(this, file, observer, projectionIn, projectionOut);
        });
        return new Observable(doImport);
    }
    /**
     * @private
     * @param {?} file
     * @param {?} observer
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    importFile(file, observer, projectionIn, projectionOut) {
        /** @type {?} */
        const reader = new FileReader();
        reader.onload = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            try {
                /** @type {?} */
                const features = this.parseFeaturesFromFile(file, event.target.result, projectionIn, projectionOut);
                observer.next(features);
            }
            catch (e) {
                observer.error(new ImportUnreadableFileError());
            }
            observer.complete();
        });
        reader.onerror = (/**
         * @param {?} evt
         * @return {?}
         */
        evt => {
            observer.error(new ImportUnreadableFileError());
        });
        reader.readAsText(file, 'UTF-8');
    }
    /**
     * @private
     * @param {?} file
     * @param {?} observer
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    importFileWithOgre(file, observer, projectionIn, projectionOut) {
        /** @type {?} */
        const url = `${this.ogreUrl}/convert`;
        /** @type {?} */
        const formData = new FormData();
        formData.append('upload', file);
        formData.append('sourceSrs', projectionIn);
        formData.append('targetSrs', projectionOut);
        formData.append('formatOutput', 'GEOJSON');
        formData.append('skipFailures', '');
        this.http
            .post(url, formData, { headers: new HttpHeaders() })
            .subscribe((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            if (response === null) {
                observer.error(new ImportUnreadableFileError());
                return;
            }
            /** @type {?} */
            const errors = ((/** @type {?} */ (response))).errors || [];
            if (errors.length > 0) {
                observer.error(new ImportUnreadableFileError());
            }
            else {
                /** @type {?} */
                const features = this.parseFeaturesFromGeoJSON(file, response, projectionOut);
                observer.next(features);
                observer.complete();
            }
        }), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            observer.error(new ImportUnreadableFileError());
        }));
    }
    /**
     * @private
     * @param {?} file
     * @param {?} data
     * @param {?} projectionIn
     * @param {?} projectionOut
     * @return {?}
     */
    parseFeaturesFromFile(file, data, projectionIn, projectionOut) {
        /** @type {?} */
        const extension = getFileExtension(file);
        /** @type {?} */
        const mimeType = file.type;
        /** @type {?} */
        const GeoJSON$$1 = new GeoJSON();
        /** @type {?} */
        let format;
        if (mimeType === 'application/vnd.google-earth.kml+xml') {
            format = new KML();
        }
        else if (mimeType === 'application/gml+xml') {
            format = new GML();
        }
        else if (mimeType === 'application/gpx+xml') {
            format = new GPX();
        }
        else {
            switch (extension) {
                case 'kml':
                    format = new KML();
                    break;
                case 'gpx':
                    format = new GPX();
                    break;
                case 'gml':
                    format = new GML();
                    break;
                default:
                    format = GeoJSON$$1;
                    break;
            }
        }
        /** @type {?} */
        const olFeatures = format.readFeatures(data, {
            dataProjection: projectionIn,
            featureProjection: projectionOut
        });
        /** @type {?} */
        const features = olFeatures.map((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature$$1) => {
            return Object.assign(GeoJSON$$1.writeFeatureObject(olFeature$$1), {
                projection: projectionOut,
                meta: {
                    id: uuid(),
                    title: computeLayerTitleFromFile(file)
                }
            });
        }));
        return features;
    }
    /**
     * @private
     * @param {?} file
     * @param {?} data
     * @param {?} projectionOut
     * @return {?}
     */
    parseFeaturesFromGeoJSON(file, data, projectionOut) {
        /** @type {?} */
        const olFormat = new GeoJSON();
        /** @type {?} */
        const olFeatures = olFormat.readFeatures(data);
        /** @type {?} */
        const features = olFeatures.map((/**
         * @param {?} olFeature
         * @return {?}
         */
        (olFeature$$1) => {
            return Object.assign(olFormat.writeFeatureObject(olFeature$$1), {
                projection: projectionOut,
                meta: {
                    id: uuid(),
                    title: computeLayerTitleFromFile(file)
                }
            });
        }));
        return features;
    }
}
ImportService.allowedMimeTypes = [
    'application/gml+xml',
    'application/vnd.google-earth.kml+xml',
    'application/gpx+xml',
    'application/json'
];
ImportService.allowedZipMimeTypes = [
    'application/zip',
    'application/x-zip-compressed',
    'application/x-zip'
];
ImportService.allowedExtensions = [
    'geojson',
    'kml',
    'gpx',
    'json',
    'gml'
];
ImportService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ImportService.ctorParameters = () => [
    { type: HttpClient },
    { type: ConfigService }
];
/** @nocollapse */ ImportService.ngInjectableDef = defineInjectable({ factory: function ImportService_Factory() { return new ImportService(inject(HttpClient), inject(ConfigService)); }, token: ImportService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImportExportComponent {
    /**
     * @param {?} importService
     * @param {?} exportService
     * @param {?} languageService
     * @param {?} messageService
     * @param {?} formBuilder
     */
    constructor(importService, exportService, languageService, messageService, formBuilder) {
        this.importService = importService;
        this.exportService = exportService;
        this.languageService = languageService;
        this.messageService = messageService;
        this.formBuilder = formBuilder;
        this.formats = ExportFormat;
        this.inputProj = 'EPSG:4326';
        this.buildForm();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.layers$$ = this.map.layers$.subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        layers => {
            this.layers = (/** @type {?} */ (layers
                .filter((/**
             * @param {?} layer
             * @return {?}
             */
            (layer) => {
                return layer instanceof VectorLayer && layer.exportable === true;
            }))));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.layers$$.unsubscribe();
    }
    /**
     * @param {?} files
     * @return {?}
     */
    importFiles(files) {
        for (const file of files) {
            this.importService
                .import(file, this.inputProj)
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
     * @param {?} data
     * @return {?}
     */
    handleExportFormSubmit(data) {
        /** @type {?} */
        const layer = this.map.getLayerById(data.layer);
        /** @type {?} */
        const olFeatures = layer.dataSource.ol.getFeatures();
        this.exportService
            .export(olFeatures, data.format, layer.title, this.map.projection)
            .subscribe((/**
         * @return {?}
         */
        () => { }), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => this.onFileExportError(error)));
    }
    /**
     * @private
     * @return {?}
     */
    buildForm() {
        this.form = this.formBuilder.group({
            format: ['', [Validators.required]],
            layer: ['', [Validators.required]]
        });
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
    /**
     * @private
     * @param {?} error
     * @return {?}
     */
    onFileExportError(error) {
        handleFileExportError(error, this.messageService, this.languageService);
    }
}
ImportExportComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-import-export',
                template: "<mat-tab-group>\r\n\r\n  <mat-tab [label]=\"'igo.geo.importExportForm.importTabTitle' |\u00A0translate\">\r\n    <form class=\"igo-form\">\r\n      <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n          <input\r\n            matInput\r\n            placeholder=\"{{'igo.geo.importExportForm.importProjPlaceholder' | translate}}\"\r\n            name=\"inputProj\"\r\n            [(ngModel)]=\"inputProj\">\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div class=\"igo-form-button-group\">\r\n        <button mat-raised-button type=\"button\" (click)=\"fileInput.click()\">\r\n          {{'igo.geo.importExportForm.importButton' | translate}}\r\n        </button>\r\n        <input\r\n          #fileInput\r\n          type=\"file\"\r\n          [style.display]=\"'none'\"\r\n          (click)=\"fileInput.value = null\"\r\n          (change)=\"importFiles($event.target.files)\">\r\n      </div>\r\n    </form>\r\n  </mat-tab>\r\n\r\n  <mat-tab [label]=\"'igo.geo.importExportForm.exportTabTitle' |\u00A0translate\">\r\n    <form class=\"igo-form\" [formGroup]=\"form\">\r\n\r\n      <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n          <mat-select\r\n            formControlName=\"layer\"\r\n            placeholder=\"{{'igo.geo.importExportForm.exportLayerPlaceholder' | translate}}\">\r\n            <mat-option *ngFor=\"let layer of layers\" [value]=\"layer.id\">\r\n              {{layer.title}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div class=\"igo-input-container\">\r\n        <mat-form-field>\r\n          <mat-select\r\n            formControlName=\"format\"\r\n            placeholder=\"{{'igo.geo.importExportForm.exportFormatPlaceholder' | translate}}\">\r\n            <mat-option *ngFor=\"let format of formats | keyvalue \" [value]=\"format.key\">\r\n              {{format.value}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div class=\"igo-form-button-group\">\r\n        <button\r\n          mat-raised-button\r\n          type=\"button\"\r\n          [disabled]=\"!form.valid\"\r\n          (click)=\"handleExportFormSubmit(form.value)\">\r\n          {{'igo.geo.importExportForm.exportButton' | translate}}\r\n        </button>\r\n      </div>\r\n\r\n    </form>\r\n  </mat-tab>\r\n\r\n</mat-tab-group>\r\n",
                styles: ["mat-form-field{width:100%}.igo-form{padding:5px}.igo-form-button-group{text-align:center;padding-top:10px}"]
            }] }
];
/** @nocollapse */
ImportExportComponent.ctorParameters = () => [
    { type: ImportService },
    { type: ExportService },
    { type: LanguageService },
    { type: MessageService },
    { type: FormBuilder }
];
ImportExportComponent.propDecorators = {
    map: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DropGeoFileDirective extends DragAndDropDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoImportExportModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoImportExportModule
        };
    }
}
IgoImportExportModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    CommonModule,
                    MatButtonModule,
                    MatTabsModule,
                    MatSelectModule,
                    MatOptionModule,
                    MatFormFieldModule,
                    MatInputModule,
                    IgoLanguageModule,
                    IgoKeyValueModule,
                    IgoDrapDropModule
                ],
                exports: [ImportExportComponent, DropGeoFileDirective],
                declarations: [ImportExportComponent, DropGeoFileDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoLayerModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoLayerModule,
            providers: [LayerService, StyleService, LayerListService]
        };
    }
}
IgoLayerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MatInputModule,
                    MatFormFieldModule,
                    CommonModule,
                    FormsModule,
                    MatIconModule,
                    MatButtonModule,
                    MatTooltipModule,
                    MatListModule,
                    MatSliderModule,
                    MatBadgeModule,
                    IgoLanguageModule,
                    IgoListModule,
                    IgoCollapsibleModule,
                    IgoImageModule
                ],
                exports: [
                    LayerItemComponent,
                    LayerLegendComponent,
                    LayerListComponent,
                    LayerListBindingDirective
                ],
                declarations: [
                    LayerItemComponent,
                    LayerLegendComponent,
                    LayerListComponent,
                    LayerListBindingDirective
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoMapModule {
}
IgoMapModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoLanguageModule,
                    IgoConfirmDialogModule,
                    MatIconModule,
                    MatButtonModule,
                    MatTooltipModule
                ],
                exports: [
                    MapBrowserComponent,
                    ZoomButtonComponent,
                    GeolocateButtonComponent,
                    RotationButtonComponent,
                    BaseLayersSwitcherComponent,
                    MiniBaseMapComponent,
                    MapOfflineDirective
                ],
                declarations: [
                    MapBrowserComponent,
                    ZoomButtonComponent,
                    GeolocateButtonComponent,
                    RotationButtonComponent,
                    BaseLayersSwitcherComponent,
                    MiniBaseMapComponent,
                    MapOfflineDirective
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Measurer item
 */
class MeasurerItemComponent {
    constructor() {
        /**
         * Measure observable
         * \@internal
         */
        this.measure$ = new BehaviorSubject(undefined);
        this._auto = false;
        /**
         * Event emitted when the measure unit changes
         */
        this.measureUnitChange = new EventEmitter();
    }
    /**
     * Measure
     * @param {?} value
     * @return {?}
     */
    set measure(value) {
        this.measure$.next(value);
    }
    /**
     * @return {?}
     */
    get measure() { return this.measure$.value; }
    /**
     * Whther measure units should be automatically determined
     * @param {?} value
     * @return {?}
     */
    set auto(value) { this.toggleAutoUnit(value); }
    /**
     * @return {?}
     */
    get auto() { return this._auto; }
    /**
     * Available measure units for the measure type given
     * \@internal
     * @return {?}
     */
    get measureUnits() {
        if (this.measureType === MeasureType.Area) {
            return Object.values(MeasureAreaUnit);
        }
        return Object.values(MeasureLengthUnit);
    }
    /**
     * Toggle the auto unit off
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.toggleAutoUnit(false);
    }
    /**
     * Set the measure unit
     * \@internal
     * @param {?} unit
     * @return {?}
     */
    onMeasureUnitChange(unit) {
        this.measureUnit = unit;
        this.measureUnitChange.emit(unit);
    }
    /**
     * @private
     * @param {?} toggle
     * @return {?}
     */
    toggleAutoUnit(toggle) {
        if (this.measure$$ !== undefined) {
            this.measure$$.unsubscribe();
        }
        if (toggle === true) {
            this.measure$$ = this.measure$.subscribe((/**
             * @param {?} measure
             * @return {?}
             */
            (measure) => {
                this.computeBestMeasureUnit(measure);
            }));
        }
        this._auto = toggle;
    }
    /**
     * @private
     * @param {?} measure
     * @return {?}
     */
    computeBestMeasureUnit(measure) {
        /** @type {?} */
        let measureUnit = this.measureUnit;
        if (this.measureType === MeasureType.Area) {
            measureUnit = computeBestAreaUnit(measure);
        }
        else if (this.measureType === MeasureType.Length) {
            measureUnit = computeBestLengthUnit(measure);
        }
        if (measureUnit !== this.measureUnit) {
            this.onMeasureUnitChange(measureUnit);
        }
    }
}
MeasurerItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-measurer-item',
                template: "<mat-form-field class=\"measure-field\">\r\n  <input\r\n    matInput\r\n    [readonly]=\"true\"\r\n    [placeholder]=\"placeholder\"\r\n    [value]=\"((measure$ | async) || 0) | measureFormat: measureUnit\">\r\n</mat-form-field>\r\n<mat-form-field class=\"unit-field\">\r\n  <mat-select\r\n    [value]=\"measureUnit\"\r\n    [disabled]=\"auto\"\r\n    (selectionChange)=\"onMeasureUnitChange($event.value)\">\r\n    <mat-option *ngFor=\"let measureUnit of measureUnits\" [value]=\"measureUnit\">\r\n      {{('igo.geo.measure.' + measureUnit) | translate}}\r\n    </mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;width:100%;padding:5px 10px}.measure-field{display:flex;flex-flow:column nowrap;width:100%}.unit-field{width:110px;margin-left:10px}"]
            }] }
];
/** @nocollapse */
MeasurerItemComponent.ctorParameters = () => [];
MeasurerItemComponent.propDecorators = {
    measureType: [{ type: Input }],
    measureUnit: [{ type: Input }],
    measure: [{ type: Input }],
    auto: [{ type: Input }],
    placeholder: [{ type: Input }],
    measureUnitChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoMeasurerModule {
}
IgoMeasurerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatButtonModule,
                    MatButtonToggleModule,
                    MatIconModule,
                    MatTooltipModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatSelectModule,
                    MatSlideToggleModule,
                    IgoLanguageModule,
                    IgoEntityTableModule
                ],
                declarations: [
                    MeasureFormatPipe,
                    MeasurerItemComponent,
                    MeasurerComponent,
                    MeasurerDialogComponent
                ],
                exports: [
                    MeasureFormatPipe,
                    MeasurerComponent
                ],
                entryComponents: [
                    MeasurerDialogComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoMeasureModule {
}
IgoMeasureModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [],
                exports: [
                    IgoMeasurerModule
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const OverlayAction = {
    None: 0,
    Move: 1,
    Zoom: 2,
    ZoomIfOutMapExtent: 3,
};
OverlayAction[OverlayAction.None] = 'None';
OverlayAction[OverlayAction.Move] = 'Move';
OverlayAction[OverlayAction.Zoom] = 'Zoom';
OverlayAction[OverlayAction.ZoomIfOutMapExtent] = 'ZoomIfOutMapExtent';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OverlayService {
    constructor() {
        this.features$ = new BehaviorSubject([
            [],
            undefined
        ]);
    }
    /**
     * @param {?} features
     * @param {?=} action
     * @return {?}
     */
    setFeatures(features, action = OverlayAction.None) {
        this.features$.next([features, action]);
    }
    /**
     * @return {?}
     */
    clear() {
        this.features$.next([[], OverlayAction.None]);
    }
}
OverlayService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
OverlayService.ctorParameters = () => [];
/** @nocollapse */ OverlayService.ngInjectableDef = defineInjectable({ factory: function OverlayService_Factory() { return new OverlayService(); }, token: OverlayService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OverlayDirective {
    /**
     * @param {?} component
     * @param {?} overlayService
     */
    constructor(component, overlayService) {
        this.component = component;
        this.overlayService = overlayService;
        this.format = new OlGeoJSON();
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
        this.features$$ = this.overlayService.features$.subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => this.handleFeatures(res[0], res[1])));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.features$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} features
     * @param {?} action
     * @return {?}
     */
    handleFeatures(features, action) { }
}
OverlayDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoOverlay]'
            },] }
];
/** @nocollapse */
OverlayDirective.ctorParameters = () => [
    { type: MapBrowserComponent, decorators: [{ type: Self }] },
    { type: OverlayService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoOverlayModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoOverlayModule
        };
    }
}
IgoOverlayModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [OverlayDirective],
                declarations: [OverlayDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PrintOutputFormat = strEnum(['Pdf', 'Image']);
/** @type {?} */
const PrintPaperFormat = strEnum([
    'A0',
    'A1',
    'A2',
    'A3',
    'A4',
    'A5',
    'Letter',
    'Legal'
]);
/** @type {?} */
const PrintOrientation = strEnum(['landscape', 'portrait']);
/** @type {?} */
const PrintResolution = strEnum(['72', '96', '150', '300']);
/** @type {?} */
const PrintSaveImageFormat = strEnum([
    'Bmp',
    'Gif',
    'Jpeg',
    'Png',
    'Tiff'
]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const html2canvas = _html2canvas;
class PrintService {
    /**
     * @param {?} messageService
     * @param {?} activityService
     * @param {?} languageService
     */
    constructor(messageService, activityService, languageService) {
        this.messageService = messageService;
        this.activityService = activityService;
        this.languageService = languageService;
    }
    /**
     * @param {?} map
     * @param {?} options
     * @return {?}
     */
    print(map$$1, options) {
        /** @type {?} */
        const status$ = new Subject();
        /** @type {?} */
        const paperFormat = options.paperFormat;
        /** @type {?} */
        const resolution = +options.resolution;
        // Default is 96
        /** @type {?} */
        const orientation = options.orientation;
        this.activityId = this.activityService.register();
        /** @type {?} */
        const doc = new jsPDF({
            orientation,
            format: paperFormat.toLowerCase()
        });
        /** @type {?} */
        const dimensions = [
            doc.internal.pageSize.width,
            doc.internal.pageSize.height
        ];
        /** @type {?} */
        const margins = [20, 10, 20, 10];
        /** @type {?} */
        const width = dimensions[0] - margins[3] - margins[1];
        /** @type {?} */
        const height = dimensions[1] - margins[0] - margins[2];
        /** @type {?} */
        const size = [width, height];
        if (options.title !== undefined) {
            this.addTitle(doc, options.title, dimensions[0]);
        }
        if (options.showProjection === true || options.showScale === true) {
            this.addProjScale(doc, map$$1, resolution, options.showProjection, options.showScale);
        }
        if (options.comment !== '') {
            this.addComment(doc, options.comment);
        }
        this.addMap(doc, map$$1, resolution, size, margins).subscribe((/**
         * @param {?} status
         * @return {?}
         */
        (status) => {
            if (status === SubjectStatus.Done) {
                if (options.showLegend === true) {
                    this.addLegend(doc, map$$1, margins, resolution);
                }
                else {
                    this.saveDoc(doc);
                }
            }
            if (status === SubjectStatus.Done || status === SubjectStatus.Error) {
                this.activityService.unregister(this.activityId);
                status$.next(SubjectStatus.Done);
            }
        }));
        return status$;
    }
    /**
     * Get html code for all layers legend
     * @param {?} map IgoMap
     * @param {?} width The width that the legend need to be
     * @param {?} resolution
     * @return {?} Html code for the legend
     */
    getLayersLegendHtml(map$$1, width, resolution) {
        /** @type {?} */
        let html = '';
        /** @type {?} */
        const legends = getLayersLegends(map$$1.layers, map$$1.viewController.getScale(resolution));
        if (legends.length === 0) {
            return html;
        }
        // Define important style to be sure that all container is convert
        // to image not just visible part
        html += '<style media="screen" type="text/css">';
        html += '.html2canvas-container { width: ' + width;
        html += 'mm !important; height: 2000px !important; }';
        html += '</style>';
        html += '<font size="2" face="Courier New" >';
        html += '<div style="display:inline-block;max-width:' + width + 'mm">';
        // For each legend, define an html table cell
        legends.forEach((/**
         * @param {?} legend
         * @return {?}
         */
        (legend) => {
            html +=
                '<table border=1 style="display:inline-block;vertical-align:top">';
            html += '<tr><th width="170px">' + legend.title + '</th>';
            html += '<td><img class="printImageLegend" src="' + legend.url + '">';
            html += '</td></tr></table>';
        }));
        html += '</div>';
        return html;
    }
    /**
     * Get all the legend in a single image
     * * \@param  format - Image format. default value to "png"
     * @param {?} map
     * @param {?=} format
     * @param {?=} doZipFile
     * @param {?=} resolution
     * @return {?} The image of the legend
     */
    getLayersLegendImage(map$$1, format = 'png', doZipFile, resolution) {
        /** @type {?} */
        const status$ = new Subject();
        // Get html code for the legend
        /** @type {?} */
        const width = 200;
        // milimeters unit, originally define for document pdf
        /** @type {?} */
        let html = this.getLayersLegendHtml(map$$1, width, resolution);
        /** @type {?} */
        const that = this;
        format = format.toLowerCase();
        // If no legend show No LEGEND in an image
        if (html.length === 0) {
            html = '<font size="12" face="Courier New" >';
            html += '<div align="center"><b>NO LEGEND</b></div>';
        }
        // Create div to contain html code for legend
        /** @type {?} */
        const div = window.document.createElement('div');
        // Add html code to convert in the new window
        window.document.body.appendChild(div);
        div.innerHTML = html;
        // Define event to execute after all images are loaded to create the canvas
        setTimeout((/**
         * @return {?}
         */
        () => {
            html2canvas(div, { useCORS: true }).then((/**
             * @param {?} canvas
             * @return {?}
             */
            canvas => {
                /** @type {?} */
                let status = SubjectStatus.Done;
                try {
                    if (!doZipFile) {
                        // Save the canvas as file
                        that.saveCanvasImageAsFile(canvas, 'legendImage', format);
                    }
                    else {
                        // Add the canvas to zip
                        that.generateCanvaFileToZip(canvas, 'legendImage' + '.' + format);
                    }
                    div.parentNode.removeChild(div); // remove temp div (IE)
                }
                catch (err) {
                    status = SubjectStatus.Error;
                }
                status$.next(status);
            }));
        }), 500);
    }
    /**
     * @private
     * @param {?} doc
     * @param {?} title
     * @param {?} pageWidth
     * @return {?}
     */
    addTitle(doc, title, pageWidth) {
        /** @type {?} */
        const pdfResolution = 96;
        /** @type {?} */
        const titleSize = 32;
        /** @type {?} */
        const titleWidth = ((titleSize * 25.4) / pdfResolution) * title.length;
        /** @type {?} */
        let titleMarginLeft;
        if (titleWidth > pageWidth) {
            titleMarginLeft = 0;
        }
        else {
            titleMarginLeft = (pageWidth - titleWidth) / 2;
        }
        doc.setFont('courier');
        doc.setFontSize(32);
        doc.text(title, titleMarginLeft, 15);
    }
    /**
     * Add comment to the document
     * * \@param  doc - pdf document
     * * \@param  comment - Comment to add in the document
     * * \@param  size - Size of the document
     * @private
     * @param {?} doc
     * @param {?} comment
     * @return {?}
     */
    addComment(doc, comment) {
        /** @type {?} */
        const commentSize = 16;
        /** @type {?} */
        const commentMarginLeft = 20;
        /** @type {?} */
        const marginBottom = 5;
        /** @type {?} */
        const heightPixels = doc.internal.pageSize.height - marginBottom;
        doc.setFont('courier');
        doc.setFontSize(commentSize);
        doc.text(comment, commentMarginLeft, heightPixels);
    }
    /**
     * Add projection and/or scale to the document
     * @private
     * @param {?} doc - pdf document
     * @param {?} map - Map of the app
     * @param {?} dpi - DPI resolution of the document
     * @param {?} projection - Bool to indicate if projection need to be added
     * @param {?} scale - Bool to indicate if scale need to be added
     * @return {?}
     */
    addProjScale(doc, map$$1, dpi, projection, scale) {
        /** @type {?} */
        const translate = this.languageService.translate;
        /** @type {?} */
        const projScaleSize = 16;
        /** @type {?} */
        const projScaleMarginLeft = 20;
        /** @type {?} */
        const marginBottom = 15;
        /** @type {?} */
        const heightPixels = doc.internal.pageSize.height - marginBottom;
        /** @type {?} */
        let textProjScale = '';
        if (projection === true) {
            /** @type {?} */
            const projText = translate.instant('igo.geo.printForm.projection');
            textProjScale += projText + ': ' + map$$1.projection;
        }
        if (scale === true) {
            if (projection === true) {
                textProjScale += '   ';
            }
            /** @type {?} */
            const scaleText = translate.instant('igo.geo.printForm.scale');
            /** @type {?} */
            const mapScale = map$$1.viewController.getScale(dpi);
            textProjScale += scaleText + ' ~ 1 ' + formatScale(mapScale);
        }
        doc.setFont('courier');
        doc.setFontSize(projScaleSize);
        doc.text(textProjScale, projScaleMarginLeft, heightPixels);
    }
    /**
     * Add the legend to the document
     * @private
     * @param {?} doc - Pdf document where legend will be added
     * @param {?} map - Map of the app
     * @param {?} margins - Page margins
     * @param {?} resolution
     * @return {?}
     */
    addLegend(doc, map$$1, margins, resolution) {
        /** @type {?} */
        const that = this;
        // Get html code for the legend
        /** @type {?} */
        const width = doc.internal.pageSize.width;
        /** @type {?} */
        const html = this.getLayersLegendHtml(map$$1, width, resolution);
        // If no legend, save the map directly
        if (html === '') {
            this.saveDoc(doc);
            return true;
        }
        // Create div to contain html code for legend
        /** @type {?} */
        const div = window.document.createElement('div');
        html2canvas(div, { useCORS: true }).then((/**
         * @param {?} canvas
         * @return {?}
         */
        canvas => {
            /** @type {?} */
            let imgData;
            /** @type {?} */
            const position = 10;
            imgData = canvas.toDataURL('image/png');
            doc.addPage();
            /** @type {?} */
            const imageSize = this.getImageSizeToFitPdf(doc, canvas, margins);
            doc.addImage(imgData, 'PNG', 10, position, imageSize[0], imageSize[1]);
            that.saveDoc(doc);
            div.parentNode.removeChild(div); // remove temp div (IE style)
        }));
        // Add html code to convert in the new window
        window.document.body.appendChild(div);
        div.innerHTML = html;
    }
    /**
     * @private
     * @param {?} doc
     * @param {?} canvas
     * @param {?} margins
     * @return {?}
     */
    addCanvas(doc, canvas, margins) {
        /** @type {?} */
        let image;
        image = canvas.toDataURL('image/jpeg');
        if (image !== undefined) {
            /** @type {?} */
            const imageSize = this.getImageSizeToFitPdf(doc, canvas, margins);
            doc.addImage(image, 'JPEG', margins[3], margins[0], imageSize[0], imageSize[1]);
            doc.rect(margins[3], margins[0], imageSize[0], imageSize[1]);
        }
    }
    // TODO fix printing with image resolution
    /**
     * @private
     * @param {?} doc
     * @param {?} map
     * @param {?} resolution
     * @param {?} size
     * @param {?} margins
     * @return {?}
     */
    addMap(doc, map$$1, resolution, size, margins) {
        /** @type {?} */
        const status$ = new Subject();
        /** @type {?} */
        const mapSize = map$$1.ol.getSize();
        /** @type {?} */
        const extent = map$$1.ol.getView().calculateExtent(mapSize);
        /** @type {?} */
        const widthPixels = Math.round((size[0] * resolution) / 25.4);
        /** @type {?} */
        const heightPixels = Math.round((size[1] * resolution) / 25.4);
        /** @type {?} */
        let timeout;
        map$$1.ol.once('postcompose', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const canvas = event.context.canvas;
            /** @type {?} */
            const mapStatus$$ = map$$1.status$.subscribe((/**
             * @param {?} mapStatus
             * @return {?}
             */
            (mapStatus) => {
                clearTimeout(timeout);
                if (mapStatus !== SubjectStatus.Done) {
                    return;
                }
                mapStatus$$.unsubscribe();
                /** @type {?} */
                let status = SubjectStatus.Done;
                try {
                    this.addCanvas(doc, canvas, margins);
                }
                catch (err) {
                    status = SubjectStatus.Error;
                    this.messageService.error(this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageBody'), this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageHeader'), 'print');
                }
                this.renderMap(map$$1, mapSize, extent);
                status$.next(status);
            }));
            // If no loading as started after 200ms, then probably no loading
            // is required.
            timeout = window.setTimeout((/**
             * @return {?}
             */
            () => {
                mapStatus$$.unsubscribe();
                /** @type {?} */
                let status = SubjectStatus.Done;
                try {
                    this.addCanvas(doc, canvas, margins);
                }
                catch (err) {
                    status = SubjectStatus.Error;
                    this.messageService.error(this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageBody'), this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageHeader'), 'print');
                }
                this.renderMap(map$$1, mapSize, extent);
                status$.next(status);
            }), 200);
        }));
        this.renderMap(map$$1, [widthPixels, heightPixels], extent);
        return status$;
    }
    /**
     * @param {?} nbFileToProcess
     * @return {?}
     */
    defineNbFileToProcess(nbFileToProcess) {
        this.nbFileToProcess = nbFileToProcess;
    }
    /**
     * Download an image of the map with addition of informations
     * @param {?} map - Map of the app
     * @param {?} resolution
     * @param {?=} format - Image format. default value to "png"
     * @param {?=} projection - Indicate if projection need to be add. Default to false
     * @param {?=} scale - Indicate if scale need to be add. Default to false
     * @param {?=} legend - Indicate if the legend of layers need to be download. Default to false
     * @param {?=} title - Title to add for the map - Default to blank
     * @param {?=} comment - Comment to add for the map - Default to blank
     * @param {?=} doZipFile - Indicate if we do a zip with the file
     * @return {?} Image file of the map with extension format given as parameter
     */
    downloadMapImage(map$$1, resolution, format = 'png', projection = false, scale = false, legend = false, title = '', comment = '', doZipFile = true) {
        /** @type {?} */
        const status$ = new Subject();
        // const resolution = map.ol.getView().getResolution();
        this.activityId = this.activityService.register();
        /** @type {?} */
        const translate = this.languageService.translate;
        map$$1.ol.once('postcompose', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            format = format.toLowerCase();
            /** @type {?} */
            const context = event.context;
            /** @type {?} */
            const newCanvas = document.createElement('canvas');
            /** @type {?} */
            const newContext = newCanvas.getContext('2d');
            // Postion in height to set the canvas in new canvas
            /** @type {?} */
            let positionHCanvas = 0;
            // Position in width to set the Proj/Scale in new canvas
            /** @type {?} */
            let positionWProjScale = 10;
            // Get height/width of map canvas
            /** @type {?} */
            const width = context.canvas.width;
            /** @type {?} */
            let height = context.canvas.height;
            // Set Font to calculate comment width
            newContext.font = '20px Calibri';
            /** @type {?} */
            const commentWidth = newContext.measureText(comment).width;
            // Add height for title if defined
            height = title !== '' ? height + 30 : height;
            // Add height for projection or scale (same line) if defined
            height = projection !== false || scale !== false ? height + 30 : height;
            /** @type {?} */
            const positionHProjScale = height - 10;
            // Define number of line depending of the comment length
            /** @type {?} */
            const commentNbLine = Math.ceil(commentWidth / width);
            // Add height for multiline comment if defined
            height = comment !== '' ? height + commentNbLine * 30 : height;
            /** @type {?} */
            let positionHComment = height - commentNbLine * 20 + 5;
            // Set the new canvas with the new calculated size
            newCanvas.width = width;
            newCanvas.height = height;
            // Patch Jpeg default black background to white
            if (format === 'jpeg') {
                newContext.fillStyle = '#ffffff';
                newContext.fillRect(0, 0, width, height);
                newContext.fillStyle = '#000000';
            }
            // If a title need to be added to canvas
            if (title !== '') {
                // Set font for title
                newContext.font = '26px Calibri';
                positionHCanvas = 30;
                newContext.textAlign = 'center';
                newContext.fillText(title, width / 2, 20);
            }
            // Set font for next section
            newContext.font = '20px Calibri';
            // If projection need to be added to canvas
            if (projection !== false) {
                /** @type {?} */
                const projText = translate.instant('igo.geo.printForm.projection');
                newContext.textAlign = 'start';
                newContext.fillText(projText + ': ' + map$$1.projection, positionWProjScale, positionHProjScale);
                positionWProjScale += 200; // Width position change for scale position
            }
            // If scale need to be added to canvas
            if (scale !== false) {
                /** @type {?} */
                const scaleText = translate.instant('igo.geo.printForm.scale');
                /** @type {?} */
                const mapScale = map$$1.viewController.getScale(resolution);
                newContext.textAlign = 'start';
                newContext.fillText(scaleText + ' ~ 1 : ' + formatScale(mapScale), positionWProjScale, positionHProjScale);
            }
            // If a comment need to be added to canvas
            if (comment !== '') {
                newContext.textAlign = 'center';
                // If only one line, no need to multiline the comment
                if (commentNbLine === 1) {
                    newContext.fillText(comment, width / 2, positionHComment);
                }
                else {
                    // Separate the setenses to be approx. the same length
                    /** @type {?} */
                    const nbCommentChar = comment.length;
                    /** @type {?} */
                    const CommentLengthToCut = Math.floor(nbCommentChar / commentNbLine);
                    /** @type {?} */
                    let commentCurrentLine = '';
                    /** @type {?} */
                    let positionFirstCutChar = 0;
                    /** @type {?} */
                    let positionLastBlank;
                    // Loop for the number of line calculated
                    for (let i = 0; i < commentNbLine; i++) {
                        // For all line except last
                        if (commentNbLine - 1 > i) {
                            // Get comment current line to find the right place tu cut comment
                            commentCurrentLine = comment.substr(positionFirstCutChar, CommentLengthToCut);
                            // Cut the setence at blank
                            positionLastBlank = commentCurrentLine.lastIndexOf(' ');
                            newContext.fillText(commentCurrentLine.substr(0, positionLastBlank), width / 2, positionHComment);
                            positionFirstCutChar += positionLastBlank;
                            // Go to next line for insertion
                            positionHComment += 20;
                        }
                        else {
                            // Don't cut last part
                            newContext.fillText(comment.substr(positionFirstCutChar), width / 2, positionHComment);
                        }
                    }
                }
            }
            // Add map to new canvas
            newContext.drawImage(context.canvas, 0, positionHCanvas);
            /** @type {?} */
            let status = SubjectStatus.Done;
            try {
                // Save the canvas as file
                if (!doZipFile) {
                    this.saveCanvasImageAsFile(newCanvas, 'map', format);
                }
                else if (format.toLowerCase() === 'tiff') {
                    // Add the canvas to zip
                    this.generateCanvaFileToZip(newCanvas, 'map' + map$$1.projection.replace(':', '_') + '.' + format);
                }
                else {
                    // Add the canvas to zip
                    this.generateCanvaFileToZip(newCanvas, 'map' + '.' + format);
                }
            }
            catch (err) {
                status = SubjectStatus.Error;
            }
            status$.next(status);
            if (format.toLowerCase() === 'tiff') {
                /** @type {?} */
                const tiwContent = this.getWorldFileInformation(map$$1);
                /** @type {?} */
                const blob = new Blob([tiwContent], {
                    type: 'text/plain;charset=utf-8'
                });
                if (!doZipFile) {
                    // saveAs automaticly replace ':' for '_'
                    saveAs(blob, 'map' + map$$1.projection + '.tfw');
                    this.saveFileProcessing();
                }
                else {
                    // Add the canvas to zip
                    this.addFileToZip('map' + map$$1.projection.replace(':', '_') + '.tfw', blob);
                }
            }
        }));
        map$$1.ol.renderSync();
    }
    /**
     * @private
     * @param {?} map
     * @param {?} size
     * @param {?} extent
     * @return {?}
     */
    renderMap(map$$1, size, extent) {
        map$$1.ol.renderSync();
    }
    /**
     * Save document
     * @private
     * @param {?} doc - Document to save
     * @return {?}
     */
    saveDoc(doc) {
        doc.save('map.pdf');
    }
    /**
     * Calculate the best Image size to fit in pdf
     * @private
     * @param {?} doc - Pdf Document
     * @param {?} canvas - Canvas of image
     * @param {?} margins - Page margins
     * @return {?}
     */
    getImageSizeToFitPdf(doc, canvas, margins) {
        // Define variable to calculate best size to fit in one page
        /** @type {?} */
        const pageHeight = doc.internal.pageSize.getHeight() - (margins[0] + margins[2]);
        /** @type {?} */
        const pageWidth = doc.internal.pageSize.getWidth() - (margins[1] + margins[3]);
        /** @type {?} */
        const canHeight = canvas.height;
        /** @type {?} */
        const canWidth = canvas.width;
        /** @type {?} */
        const heightRatio = canHeight / pageHeight;
        /** @type {?} */
        const widthRatio = canWidth / pageWidth;
        /** @type {?} */
        const maxRatio = heightRatio > widthRatio ? heightRatio : widthRatio;
        /** @type {?} */
        const imgHeigh = maxRatio > 1 ? canHeight / maxRatio : canHeight;
        /** @type {?} */
        const imgWidth = maxRatio > 1 ? canWidth / maxRatio : canWidth;
        return [imgWidth, imgHeigh];
    }
    /**
     * Get a world file information for tiff
     * @private
     * @param {?} map - Map of the app
     * @return {?}
     */
    getWorldFileInformation(map$$1) {
        /** @type {?} */
        const currentResolution = map$$1.viewController.getResolution();
        /** @type {?} */
        const currentExtent = map$$1.getExtent();
        return [
            currentResolution,
            0,
            0,
            -currentResolution,
            currentExtent[0] + currentResolution / 0.5,
            currentExtent[3] - currentResolution / 0.5
        ].join('\n');
    }
    /**
     * Save canvas image as file
     * @private
     * @param {?} canvas - Canvas to save
     * @param {?} name - Name of the file
     * @param {?} format - file format
     * @return {?}
     */
    saveCanvasImageAsFile(canvas, name, format) {
        /** @type {?} */
        const blobFormat = 'image/' + format;
        /** @type {?} */
        const that = this;
        try {
            canvas.toDataURL(); // Just to make the catch trigger wihtout toBlob Error throw not catched
            // If navigator is Internet Explorer
            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(canvas.msToBlob(), name + '.' + format);
                this.saveFileProcessing();
            }
            else {
                canvas.toBlob((/**
                 * @param {?} blob
                 * @return {?}
                 */
                blob => {
                    // download image
                    saveAs(blob, name + '.' + format);
                    that.saveFileProcessing();
                }), blobFormat);
            }
        }
        catch (err) {
            this.messageService.error(this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageBody'), this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageHeader'), 'print');
        }
    }
    /**
     * Add file to a zip
     * @private
     * @param {?} canvas - File to add to the zip
     * @param {?} name -Name of the fileoverview
     * @return {?}
     */
    generateCanvaFileToZip(canvas, name) {
        /** @type {?} */
        const blobFormat = 'image/' + 'jpeg';
        /** @type {?} */
        const that = this;
        if (!this.hasOwnProperty('zipFile') ||
            typeof this.zipFile === 'undefined') {
            this.zipFile = new JSZip();
        }
        try {
            canvas.toDataURL(); // Just to make the catch trigger wihtout toBlob Error throw not catched
            if (navigator.msSaveBlob) {
                this.addFileToZip(name, canvas.msToBlob());
            }
            else {
                canvas.toBlob((/**
                 * @param {?} blob
                 * @return {?}
                 */
                blob => {
                    that.addFileToZip(name, blob);
                }), blobFormat);
            }
        }
        catch (err) {
            this.messageService.error(this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageBody'), this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageHeader'), 'print');
        }
    }
    /**
     * Add file to zip, if all file are zipped, download
     * @private
     * @param {?} name - Name of the files
     * @param {?} blob - Contain of file
     * @return {?}
     */
    addFileToZip(name, blob) {
        // add file to zip
        this.zipFile.file(name, blob);
        this.nbFileToProcess--;
        // If all files are proccessed
        if (this.nbFileToProcess === 0) {
            // Download zip file
            this.getZipFile();
            // Stop loading
            this.activityService.unregister(this.activityId);
        }
    }
    /**
     * @private
     * @return {?}
     */
    saveFileProcessing() {
        this.nbFileToProcess--;
        // If all files are proccessed
        if (this.nbFileToProcess === 0) {
            // Stop loading
            this.activityService.unregister(this.activityId);
        }
    }
    /**
     * Get the zipped file
     * @private
     * @return {?} Retun a zip file
     */
    getZipFile() {
        /** @type {?} */
        const that = this;
        this.zipFile.generateAsync({ type: 'blob' }).then((/**
         * @param {?} blob
         * @return {?}
         */
        blob => {
            // 1) generate the zip file
            saveAs(blob, 'map.zip');
            delete that.zipFile;
        }));
    }
}
PrintService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
PrintService.ctorParameters = () => [
    { type: MessageService },
    { type: ActivityService },
    { type: LanguageService }
];
/** @nocollapse */ PrintService.ngInjectableDef = defineInjectable({ factory: function PrintService_Factory() { return new PrintService(inject(MessageService), inject(ActivityService), inject(LanguageService)); }, token: PrintService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PrintComponent {
    /**
     * @param {?} printService
     */
    constructor(printService) {
        this.printService = printService;
        this.disabled = false;
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
    get outputFormat() {
        return this._outputFormat;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set outputFormat(value) {
        this._outputFormat = value;
    }
    /**
     * @return {?}
     */
    get paperFormat() {
        return this._paperFormat;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set paperFormat(value) {
        this._paperFormat = value;
    }
    /**
     * @return {?}
     */
    get orientation() {
        return this._orientation;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set orientation(value) {
        this._orientation = value;
    }
    /**
     * @return {?}
     */
    get imageFormat() {
        return this._imageFormat;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set imageFormat(value) {
        this._imageFormat = value;
    }
    /**
     * @return {?}
     */
    get resolution() {
        return this._resolution;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set resolution(value) {
        this._resolution = value;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    handleFormSubmit(data) {
        this.disabled = true;
        if (data.isPrintService === true) {
            this.printService
                .print(this.map, data)
                .subscribe();
        }
        else {
            /** @type {?} */
            let nbFileToProcess = 1;
            if (data.showLegend) {
                nbFileToProcess++;
            }
            if (data.imageFormat.toLowerCase() === 'tiff') {
                nbFileToProcess++;
            }
            this.printService.defineNbFileToProcess(nbFileToProcess);
            /** @type {?} */
            const resolution = +data.resolution;
            this.printService.downloadMapImage(this.map, resolution, data.imageFormat, data.showProjection, data.showScale, data.showLegend, data.title, data.comment, data.doZipFile);
            if (data.showLegend) {
                this.printService.getLayersLegendImage(this.map, data.imageFormat, data.doZipFile, +resolution);
            }
        }
        this.disabled = false;
    }
}
PrintComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-print',
                template: "<igo-print-form\r\n  [outputFormat]=\"outputFormat\"\r\n  [paperFormat]=\"paperFormat\"\r\n  [orientation]=\"orientation\"\r\n  [imageFormat]=\"imageFormat\"\r\n  [resolution]=\"resolution\"\r\n  [disabled]=\"disabled\"\r\n  (submit)=\"handleFormSubmit($event)\">\r\n</igo-print-form>\r\n"
            }] }
];
/** @nocollapse */
PrintComponent.ctorParameters = () => [
    { type: PrintService }
];
PrintComponent.propDecorators = {
    map: [{ type: Input }],
    outputFormat: [{ type: Input }],
    paperFormat: [{ type: Input }],
    orientation: [{ type: Input }],
    imageFormat: [{ type: Input }],
    resolution: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PrintFormComponent {
    /**
     * @param {?} formBuilder
     */
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.outputFormats = PrintOutputFormat;
        this.paperFormats = PrintPaperFormat;
        this.orientations = PrintOrientation;
        this.resolutions = PrintResolution;
        this.imageFormats = PrintSaveImageFormat;
        this.isPrintService = true;
        this._disabled = false;
        this.submit = new EventEmitter();
        this.form = this.formBuilder.group({
            title: ['', []],
            comment: ['', []],
            outputFormat: ['', [Validators.required]],
            paperFormat: ['', [Validators.required]],
            imageFormat: ['', [Validators.required]],
            resolution: ['', [Validators.required]],
            orientation: ['', [Validators.required]],
            showProjection: false,
            showScale: false,
            showLegend: false,
            doZipFile: [{ hidden: this.isPrintService }]
        });
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = value;
    }
    /**
     * @return {?}
     */
    get imageFormat() {
        return this.imageFormatField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set imageFormat(value) {
        this.imageFormatField.setValue(value || PrintSaveImageFormat.Jpeg, {
            onlySelf: true
        });
    }
    /**
     * @return {?}
     */
    get outputFormat() {
        return this.outputFormatField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set outputFormat(value) {
        this.outputFormatField.setValue(value || PrintOutputFormat.Pdf, {
            onlySelf: true
        });
    }
    /**
     * @return {?}
     */
    get paperFormat() {
        return this.paperFormatField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set paperFormat(value) {
        this.paperFormatField.setValue(value || PrintPaperFormat.Letter, {
            onlySelf: true
        });
    }
    /**
     * @return {?}
     */
    get orientation() {
        return this.orientationField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set orientation(value) {
        this.orientationField.setValue(value || PrintOrientation.landscape, {
            onlySelf: true
        });
    }
    /**
     * @return {?}
     */
    get resolution() {
        return this.resolutionField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set resolution(value) {
        this.resolutionField.setValue(value || PrintResolution['96'], {
            onlySelf: true
        });
    }
    /**
     * @return {?}
     */
    get title() {
        return this.titleField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set title(value) {
        this.titleField.setValue(value, { onlySelf: true });
    }
    /**
     * @return {?}
     */
    get comment() {
        return this.commentField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set comment(value) {
        this.commentField.setValue(value, { onlySelf: true });
    }
    /**
     * @return {?}
     */
    get showProjection() {
        return this.showProjectionField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showProjection(value) {
        this.showProjectionField.setValue(value, { onlySelf: true });
    }
    /**
     * @return {?}
     */
    get showScale() {
        return this.showScaleField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showScale(value) {
        this.showScaleField.setValue(value, { onlySelf: true });
    }
    /**
     * @return {?}
     */
    get showLegend() {
        return this.showLegendField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showLegend(value) {
        this.showLegendField.setValue(value, { onlySelf: true });
    }
    /**
     * @return {?}
     */
    get doZipFile() {
        return this.doZipFileField.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set doZipFile(value) {
        this.doZipFileField.setValue(value, { onlySelf: true });
    }
    /**
     * @return {?}
     */
    get outputFormatField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).outputFormat));
    }
    /**
     * @return {?}
     */
    get paperFormatField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).paperFormat));
    }
    /**
     * @return {?}
     */
    get imageFormatField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).imageFormat));
    }
    /**
     * @return {?}
     */
    get orientationField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).orientation));
    }
    /**
     * @return {?}
     */
    get resolutionField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).resolution));
    }
    /**
     * @return {?}
     */
    get commentField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).comment));
    }
    /**
     * @return {?}
     */
    get showProjectionField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).showProjection));
    }
    /**
     * @return {?}
     */
    get showScaleField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).showScale));
    }
    /**
     * @return {?}
     */
    get showLegendField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).showLegend));
    }
    /**
     * @return {?}
     */
    get doZipFileField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).doZipFile));
    }
    /**
     * @return {?}
     */
    get titleField() {
        return (/** @type {?} */ (((/** @type {?} */ (this.form.controls))).title));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.doZipFileField.setValue(false);
    }
    /**
     * @param {?} data
     * @param {?} isValid
     * @return {?}
     */
    handleFormSubmit(data, isValid) {
        this.submitted = true;
        data.isPrintService = this.isPrintService;
        if (isValid) {
            this.submit.emit(data);
        }
    }
    /**
     * @return {?}
     */
    toggleImageSaveProp() {
        if (this.outputFormatField.value === 'Image') {
            this.isPrintService = false;
        }
        else {
            this.isPrintService = true;
        }
    }
}
PrintFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-print-form',
                template: "<form class=\"igo-form\" [formGroup]=\"form\">\r\n  <div class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <input\r\n        matInput\r\n        formControlName=\"title\"\r\n        placeholder=\"{{'igo.geo.printForm.title' | translate}}\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <input\r\n        matInput\r\n        formControlName=\"comment\"\r\n        placeholder=\"{{'igo.geo.printForm.comment' | translate}}\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\">\r\n    <div class=\"print-slide-toggle-container\">\r\n      <mat-slide-toggle\r\n        class=\"print-option\"\r\n        formControlName=\"showProjection\"\r\n        [labelPosition]=\"'before'\">\r\n        {{'igo.geo.printForm.showProjection' | translate}}\r\n      </mat-slide-toggle>\r\n      <mat-slide-toggle\r\n        class=\"print-option\"\r\n        formControlName=\"showScale\"\r\n        [labelPosition]=\"'before'\">\r\n        {{'igo.geo.printForm.showScale' | translate}}\r\n      </mat-slide-toggle>\r\n      <mat-slide-toggle\r\n        class=\"print-option\"\r\n        formControlName=\"showLegend\"\r\n        [labelPosition]=\"'before'\">\r\n        {{'igo.geo.printForm.showLegend' | translate}}\r\n      </mat-slide-toggle>\r\n      <mat-slide-toggle\r\n        class=\"print-option\"\r\n        formControlName=\"doZipFile\"\r\n        [labelPosition]=\"'before'\"\r\n        [style.display]=\"isPrintService ? 'none' : ''\">\r\n        {{'igo.geo.printForm.doZipFile' | translate}}\r\n      </mat-slide-toggle>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\">\r\n    <mat-form-field>\r\n      <mat-select (selectionChange)=\"toggleImageSaveProp()\"\r\n        formControlName=\"outputFormat\"\r\n        placeholder=\"{{'igo.geo.printForm.outputFormat' | translate}}\">\r\n        <mat-option *ngFor=\"let outputFormat of outputFormats | keyvalue \" [value]=\"outputFormat.key\">\r\n            {{outputFormat.value}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\" [style.display]=\"isPrintService ? 'block' : 'none'\">\r\n    <mat-form-field>\r\n      <mat-select\r\n        formControlName=\"paperFormat\"\r\n        placeholder=\"{{'igo.geo.printForm.paperFormat' | translate}}\">\r\n        <mat-option *ngFor=\"let paperFormat of paperFormats | keyvalue \" [value]=\"paperFormat.key\">\r\n          {{('igo.geo.printForm.paperFormats.' + paperFormat.value) | translate}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\" [style.display]=\"isPrintService ? 'none' : 'block'\">\r\n    <mat-form-field>\r\n      <mat-select\r\n        formControlName=\"imageFormat\"\r\n        placeholder=\"{{'igo.geo.printForm.imageFormat' | translate}}\">\r\n        <mat-option *ngFor=\"let imageFormat of imageFormats | keyvalue \" [value]=\"imageFormat.key\">\r\n          {{imageFormat.value}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\" style=\"display: none;\">\r\n    <mat-form-field>\r\n      <mat-select\r\n        formControlName=\"resolution\"\r\n        placeholder=\"{{'igo.geo.printForm.resolution' | translate}}\">\r\n        <mat-option *ngFor=\"let resolution of resolutions | keyvalue \" [value]=\"resolution.key\">\r\n          {{resolution.value + ' PPI'}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-input-container\" [style.display]=\"isPrintService ? 'block' : 'none'\">\r\n    <mat-form-field>\r\n      <mat-select\r\n        formControlName=\"orientation\"\r\n        placeholder=\"{{'igo.geo.printForm.orientation' | translate}}\">\r\n        <mat-option *ngFor=\"let orientation of orientations | keyvalue \" [value]=\"orientation.key\">\r\n          {{('igo.geo.printForm.' + orientation.value) | translate}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"igo-form-button-group print-button-top-padding\">\r\n    <button\r\n      mat-raised-button\r\n      type=\"button\"\r\n      [disabled]=\"!form.valid || disabled\"\r\n      (click)=\"handleFormSubmit(form.value, form.valid)\">\r\n      {{'igo.geo.printForm.saveBtn' | translate}}\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n",
                styles: ["mat-form-field{width:100%}.print-slide-toggle-container{overflow-x:hidden}.print-slide-toggle-container mat-slide-toggle{width:100%;margin:10px}.print-slide-toggle-container mat-slide-toggle ::ng-deep .mat-slide-toggle-content{width:calc(100% - 60px);font-size:16px}.print-option{display:block;margin-right:10px;margin-bottom:15px}.print-button-top-padding{padding-top:25px}.igo-form{padding:10px 5px 5px}.igo-form-button-group{text-align:center}"]
            }] }
];
/** @nocollapse */
PrintFormComponent.ctorParameters = () => [
    { type: FormBuilder }
];
PrintFormComponent.propDecorators = {
    disabled: [{ type: Input }],
    imageFormat: [{ type: Input }],
    outputFormat: [{ type: Input }],
    paperFormat: [{ type: Input }],
    orientation: [{ type: Input }],
    resolution: [{ type: Input }],
    title: [{ type: Input }],
    comment: [{ type: Input }],
    showProjection: [{ type: Input }],
    showScale: [{ type: Input }],
    showLegend: [{ type: Input }],
    doZipFile: [{ type: Input }],
    submit: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoPrintModule {
}
IgoPrintModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatIconModule,
                    MatButtonModule,
                    MatSelectModule,
                    MatOptionModule,
                    MatInputModule,
                    MatFormFieldModule,
                    MatSlideToggleModule,
                    IgoLanguageModule,
                    IgoKeyValueModule
                ],
                exports: [PrintComponent, PrintFormComponent],
                declarations: [PrintComponent, PrintFormComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Map search source factory
 * @ignore
 * @param {?} config
 * @return {?}
 */
function querySearchSourceFactory(config) {
    return new QuerySearchSource(config.getConfig(`searchSources.${QuerySearchSource.id}`) || {});
}
/**
 * Function that returns a provider for the map search source
 * @return {?}
 */
function provideQuerySearchSource() {
    return {
        provide: SearchSource,
        useFactory: querySearchSourceFactory,
        multi: true,
        deps: [ConfigService]
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoQueryModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoQueryModule,
            providers: [provideQuerySearchSource()]
        };
    }
}
IgoQueryModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [QueryDirective],
                declarations: [QueryDirective],
                providers: [QueryService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service where all available search sources are registered.
 */
class SearchSourceService {
    /**
     * @param {?} sources
     */
    constructor(sources) {
        this.sources = sources;
    }
    /**
     * Return available search sources
     * @return {?} Search sources
     */
    getSources() {
        return this.sources;
    }
    /**
     * Return enabled search sources
     * @return {?} Search sources
     */
    getEnabledSources() {
        return this.getSources().filter((/**
         * @param {?} source
         * @return {?}
         */
        (source) => source.enabled === true));
    }
    /**
     * Enable search sources of given type
     * \@todo It would be better to track the enabled search sources
     *  without updating their 'enabled' property.
     * @param {?} type Search type
     * @return {?}
     */
    enableSourcesByType(type) {
        this.getSources().forEach((/**
         * @param {?} source
         * @return {?}
         */
        (source) => {
            if (((/** @type {?} */ (source.constructor))).type === type) {
                source.enabled = true;
            }
            else {
                source.enabled = false;
            }
        }));
    }
    /**
     * Set Param from the selected settings
     * @param {?} source search-source
     * @param {?} setting settings
     * @return {?}
     */
    setParamFromSetting(source, setting) {
        source.setParamFromSetting(setting);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Function that checks whether a search source implements TextSearch
 * @param {?} source Search source
 * @return {?} True if the search source implements TextSearch
 */
function sourceCanSearch(source) {
    return ((/** @type {?} */ (source))).search !== undefined;
}
/**
 * Function that checks whether a search source implements ReverseSearch
 * @param {?} source Search source
 * @return {?} True if the search source implements ReverseSearch
 */
function sourceCanReverseSearch(source) {
    return ((/** @type {?} */ (source))).reverseSearch !== undefined;
}
/**
 * Return a search result out of an Feature. This is used to adapt
 * the IGO query module to the new Feature/SearchResult interfaces
 * @param {?} feature feature
 * @param {?} source Search source
 * @return {?} SearchResult
 */
function featureToSearchResult(feature, source) {
    return {
        source,
        data: feature,
        meta: {
            dataType: FEATURE,
            id: (/** @type {?} */ (feature.meta.id)),
            title: feature.meta.title,
            icon: 'map-marker'
        }
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This service perform researches in all the search sources enabled.
 * It returns Research objects who's 'request' property needs to be
 * subscribed to in order to trigger the research. This services has
 * keeps internal state of the researches it performed
 * and the results they yielded.
 */
class SearchService {
    /**
     * @param {?} searchSourceService
     * @param {?} mapService
     */
    constructor(searchSourceService, mapService) {
        this.searchSourceService = searchSourceService;
        this.mapService = mapService;
    }
    /**
     * Perform a research by text
     * @param {?} term Any text
     * @param {?=} options
     * @return {?} Researches
     */
    search(term, options) {
        if (!this.termIsValid(term)) {
            return [];
        }
        /** @type {?} */
        const response = stringToLonLat(term, this.mapService.getMap().projection);
        if (response.lonLat) {
            return this.reverseSearch(response.lonLat);
        }
        else if (response.message) {
            console.log(response.message);
        }
        /** @type {?} */
        const sources = this.searchSourceService.getEnabledSources()
            .filter(sourceCanSearch);
        return this.searchSources(sources, term, options || {});
    }
    /**
     * Perform a research by lon/lat
     * @param {?} lonLat Any lon/lat coordinates
     * @param {?=} options
     * @return {?} Researches
     */
    reverseSearch(lonLat, options) {
        /** @type {?} */
        const sources = this.searchSourceService.getEnabledSources()
            .filter(sourceCanReverseSearch);
        return this.reverseSearchSources(sources, lonLat, options || {});
    }
    /**
     * Create a text research out of all given search sources
     * @private
     * @param {?} sources Search sources that implement TextSearch
     * @param {?} term Search term
     * @param {?} options
     * @return {?} Observable of Researches
     */
    searchSources(sources, term, options) {
        return sources.map((/**
         * @param {?} source
         * @return {?}
         */
        (source) => {
            return {
                request: ((/** @type {?} */ ((/** @type {?} */ (source))))).search(term, options),
                reverse: false,
                source
            };
        }));
    }
    /**
     * Create a reverse research out of all given search sources
     * @private
     * @param {?} sources Search sources that implement ReverseSearch
     * @param {?} lonLat Any lon/lat coordinates
     * @param {?} options
     * @return {?} Observable of Researches
     */
    reverseSearchSources(sources, lonLat, options) {
        return sources.map((/**
         * @param {?} source
         * @return {?}
         */
        (source) => {
            return {
                request: ((/** @type {?} */ ((/** @type {?} */ (source))))).reverseSearch(lonLat, options),
                reverse: true,
                source
            };
        }));
    }
    /**
     * Validate that a search term is valid
     * @private
     * @param {?} term Search term
     * @return {?} True if the search term is valid
     */
    termIsValid(term) {
        return typeof term === 'string' && term !== '';
    }
}
SearchService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
SearchService.ctorParameters = () => [
    { type: SearchSourceService },
    { type: MapService }
];
/** @nocollapse */ SearchService.ngInjectableDef = defineInjectable({ factory: function SearchService_Factory() { return new SearchService(inject(SearchSourceService), inject(MapService)); }, token: SearchService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class RoutingSource {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RoutingSourceService {
    /**
     * @param {?} sources
     */
    constructor(sources) {
        this.sources = sources;
    }
}
/**
 * @param {?} sources
 * @return {?}
 */
function routingSourceServiceFactory(sources) {
    return new RoutingSourceService(sources);
}
/**
 * @return {?}
 */
function provideRoutingSourceService() {
    return {
        provide: RoutingSourceService,
        useFactory: routingSourceServiceFactory,
        deps: [RoutingSource]
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RoutingService {
    /**
     * @param {?} routingSourceService
     */
    constructor(routingSourceService) {
        this.routingSourceService = routingSourceService;
    }
    /**
     * @param {?} coordinates
     * @return {?}
     */
    route(coordinates) {
        if (coordinates.length === 0) {
            return;
        }
        return this.routingSourceService.sources
            .filter((/**
         * @param {?} source
         * @return {?}
         */
        (source) => source.enabled))
            .map((/**
         * @param {?} source
         * @return {?}
         */
        (source) => this.routeSource(source, coordinates)));
    }
    /**
     * @param {?} source
     * @param {?} coordinates
     * @return {?}
     */
    routeSource(source, coordinates) {
        /** @type {?} */
        const request = source.route(coordinates);
        return request;
    }
}
RoutingService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
RoutingService.ctorParameters = () => [
    { type: RoutingSourceService }
];
/** @nocollapse */ RoutingService.ngInjectableDef = defineInjectable({ factory: function RoutingService_Factory() { return new RoutingService(inject(RoutingSourceService)); }, token: RoutingService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RoutingFormService {
    constructor() {
        this.mapWaitingForRoutingClick = false;
    }
    /**
     * @return {?}
     */
    getStopsCoordinates() {
        return this.stopsCoordinates;
    }
    /**
     * @param {?} stopsCoordinates
     * @return {?}
     */
    setStopsCoordinates(stopsCoordinates) {
        this.stopsCoordinates = stopsCoordinates;
    }
    /**
     * @return {?}
     */
    isMapWaitingForRoutingClick() {
        return this.mapWaitingForRoutingClick;
    }
    /**
     * @return {?}
     */
    setMapWaitingForRoutingClick() {
        this.mapWaitingForRoutingClick = true;
    }
    /**
     * @return {?}
     */
    unsetMapWaitingForRoutingClick() {
        this.mapWaitingForRoutingClick = false;
    }
}
RoutingFormService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
RoutingFormService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RoutingFormComponent {
    /**
     * @param {?} formBuilder
     * @param {?} routingService
     * @param {?} languageService
     * @param {?} messageService
     * @param {?} searchService
     * @param {?} queryService
     * @param {?} routingFormService
     * @param {?} route
     */
    constructor(formBuilder, routingService, languageService, messageService, searchService, queryService, routingFormService, route) {
        this.formBuilder = formBuilder;
        this.routingService = routingService;
        this.languageService = languageService;
        this.messageService = messageService;
        this.searchService = searchService;
        this.queryService = queryService;
        this.routingFormService = routingFormService;
        this.route = route;
        this.invalidKeys = ['Control', 'Shift', 'Alt'];
        this.projection = 'EPSG:4326';
        this.routesQueries$$ = [];
        this.stream$ = new Subject();
        this.focusOnStop = false;
        this.focusKey = [];
        this._term = '';
        this._debounce = 300;
        this._length = 3;
        this.submit = new EventEmitter();
    }
    // https://stackoverflow.com/questions/46364852/create-input-fields-dynamically-in-angular-2
    /**
     * @return {?}
     */
    get term() {
        return this._term;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set term(value) {
        this._term = value;
    }
    /**
     * @return {?}
     */
    get debounce() {
        return this._debounce;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set debounce(value) {
        this._debounce = value;
    }
    /**
     * @return {?}
     */
    get length() {
        return this._length;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set length(value) {
        this._length = value;
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
     * @param {?} selectedRoute
     * @return {?}
     */
    changeRoute(selectedRoute) {
        this.showRouteGeometry();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribeRoutesQueries();
        this.unlistenSingleClick();
        this.queryService.queryEnabled = true;
        /** @type {?} */
        const stopCoordinates = [];
        this.stops.value.forEach((/**
         * @param {?} stop
         * @return {?}
         */
        stop => {
            stopCoordinates.push(stop.stopCoordinates);
        }));
        this.routingRoutesOverlayDataSource.ol.clear();
        this.routingStopsOverlayDataSource.ol.clear();
        this.routingFormService.setStopsCoordinates(stopCoordinates);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.browserLanguage = this.languageService.getLanguage();
        this.stopsForm = this.formBuilder.group({
            routingType: 'car',
            routingMode: 'driving',
            // loop
            stopOrderPriority: true,
            routingFixedStartEnd: false,
            stops: this.formBuilder.array([
                this.createStop('start'),
                this.createStop('end')
            ])
        });
        this.routingStopsOverlayDataSource = new FeatureDataSource({});
        this.routingRoutesOverlayDataSource = new FeatureDataSource({});
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.queryService.queryEnabled = false;
        this.focusOnStop = false;
        /** @type {?} */
        const stopsLayer = new VectorLayer({
            title: 'routingStopOverlay',
            zIndex: 999,
            id: 'routingStops',
            source: this.routingStopsOverlayDataSource,
            showInLayerList: false
        });
        /** @type {?} */
        const routesLayer = new VectorLayer({
            title: 'routingRoutesOverlay',
            zIndex: 999,
            id: 'routingRoutes',
            opacity: 0.75,
            source: this.routingRoutesOverlayDataSource,
            showInLayerList: false
        });
        this.map.addLayer(routesLayer);
        this.map.addLayer(stopsLayer);
        /** @type {?} */
        let selectedStopFeature;
        /** @type {?} */
        const selectStops = new Select({
            layers: [stopsLayer.ol],
            condition: pointerMove,
            hitTolerance: 7
        });
        /** @type {?} */
        const translateStop = new Translate({
            layers: [stopsLayer.ol],
            features: selectedStopFeature
        });
        // TODO: Check to disable pointermove IF a stop is already selected
        /** @type {?} */
        const selectRouteHover = new Select({
            layers: [routesLayer.ol],
            condition: pointerMove,
            hitTolerance: 7
        });
        this.selectRoute = new Select({
            layers: [routesLayer.ol],
            hitTolerance: 7
        });
        this.map.ol.on('pointermove', (/**
         * @param {?} evt
         * @return {?}
         */
        evt => {
            /** @type {?} */
            const selectRouteCnt = selectRouteHover.getFeatures().getLength();
            if (selectRouteCnt === 0) {
                this.routingFormService.unsetMapWaitingForRoutingClick();
            }
            else {
                this.routingFormService.setMapWaitingForRoutingClick();
            }
        }));
        selectStops.on('select', (/**
         * @param {?} evt
         * @return {?}
         */
        evt => {
            selectedStopFeature = evt.target.getFeatures()[0];
        }));
        this.selectRoute.on('select', (/**
         * @param {?} evt
         * @return {?}
         */
        evt => {
            if (this.focusOnStop === false) {
                /** @type {?} */
                const selectCoordinates = transform(((/** @type {?} */ (evt))).mapBrowserEvent.coordinate, this.map.projection, this.projection);
                this.addStop();
                /** @type {?} */
                const pos = this.stops.length - 2;
                this.stops.at(pos).patchValue({ stopCoordinates: selectCoordinates });
                this.handleLocationProposals(selectCoordinates, pos);
                this.addStopOverlay(selectCoordinates, pos);
                this.selectRoute.getFeatures().clear();
            }
            this.selectRoute.getFeatures().clear();
        }));
        this.routesQueries$$.push(this.stopsForm.statusChanges
            .pipe(debounceTime(this._debounce))
            .subscribe((/**
         * @param {?} val
         * @return {?}
         */
        val => this.onFormChange())));
        translateStop.on('translateend', (/**
         * @param {?} evt
         * @return {?}
         */
        evt => {
            /** @type {?} */
            const translatedID = evt.features.getArray()[0].getId();
            /** @type {?} */
            const translatedPos = translatedID.split('_');
            /** @type {?} */
            let p;
            switch (translatedPos[1]) {
                case 'start':
                    p = 0;
                    break;
                case 'end':
                    p = this.stops.length - 1;
                    break;
                default:
                    p = Number(translatedPos[1]);
                    break;
            }
            /** @type {?} */
            const translationEndCoordinates = transform(evt.features
                .getArray()[0]
                .getGeometry()
                .getCoordinates(), this.map.projection, this.projection);
            this.stops
                .at(p)
                .patchValue({ stopCoordinates: translationEndCoordinates });
            this.stops.at(p).patchValue({ stopProposals: [] });
            this.handleLocationProposals(translationEndCoordinates, p);
        }));
        this.map.ol.addInteraction(selectStops);
        this.map.ol.addInteraction(selectRouteHover);
        this.map.ol.addInteraction(this.selectRoute);
        this.map.ol.addInteraction(translateStop);
        this.routesQueries$$.push(this.stream$
            .pipe(debounceTime(this._debounce), distinctUntilChanged())
            .subscribe((/**
         * @param {?} term
         * @return {?}
         */
        (term) => this.handleTermChanged(term))));
    }
    /**
     * @param {?} coordinates
     * @param {?} stopIndex
     * @return {?}
     */
    handleLocationProposals(coordinates, stopIndex) {
        /** @type {?} */
        const groupedLocations = [];
        this.searchService
            .reverseSearch(coordinates, { zoom: this.map.getZoom() })
            .map((/**
         * @param {?} res
         * @return {?}
         */
        res => this.routesQueries$$.push(res.request.pipe(map((/**
         * @param {?} f
         * @return {?}
         */
        f => f))).subscribe((/**
         * @param {?} results
         * @return {?}
         */
        results => {
            results.forEach((/**
             * @param {?} result
             * @return {?}
             */
            result => {
                if (groupedLocations.filter((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => f.source === result.source))
                    .length === 0) {
                    groupedLocations.push({
                        source: result.source,
                        results: results.map((/**
                         * @param {?} r
                         * @return {?}
                         */
                        r => r.data))
                    });
                }
            }));
            this.stops
                .at(stopIndex)
                .patchValue({ stopProposals: groupedLocations });
            // TODO: Prefer another source?
            if (results[0]) {
                if (results[0].source.getId() === 'icherchereverse') {
                    // prefer address type.
                    /** @type {?} */
                    let resultPos = 0;
                    for (let i = 0; i < results.length; i++) {
                        /** @type {?} */
                        const feature = results[i].data;
                        if (feature.properties.type === 'adresse') {
                            resultPos = i;
                            break;
                        }
                    }
                    this.stops.at(stopIndex).patchValue({
                        stopPoint: getEntityTitle(results[resultPos])
                    });
                    if (results[resultPos].data.geometry.type === 'Point') {
                        this.stops.at(stopIndex).patchValue({
                            stopCoordinates: results[resultPos].data.geometry.coordinates
                        });
                    }
                }
            }
            else {
                this.stops.at(stopIndex).patchValue({ stopPoint: coordinates });
                this.stops.at(stopIndex).patchValue({ stopProposals: [] });
            }
        })))));
    }
    /**
     * @param {?} index
     * @return {?}
     */
    routingText(index) {
        if (index === 0) {
            return 'start';
        }
        else if (index === this.stops.length - 1 || this.stops.length === 1) {
            return 'end';
        }
        else {
            return 'intermediate';
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    raiseStop(index) {
        if (index > 0) {
            this.moveStop(index, -1);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    lowerStop(index) {
        if (index < this.stops.length - 1) {
            this.moveStop(index, 1);
        }
    }
    /**
     * @param {?} index
     * @param {?} diff
     * @return {?}
     */
    moveStop(index, diff) {
        /** @type {?} */
        const fromValue = this.stops.at(index);
        this.removeStop(index);
        this.stops.insert(index + diff, fromValue);
        this.stops.at(index).patchValue({ routingText: this.routingText(index) });
        this.stops
            .at(index + diff)
            .patchValue({ routingText: this.routingText(index + diff) });
        if (this.stops.at(index).value.stopCoordinates) {
            this.addStopOverlay(this.stops.at(index).value.stopCoordinates, index);
        }
        if (this.stops.at(index + diff).value.stopCoordinates) {
            this.addStopOverlay(this.stops.at(index + diff).value.stopCoordinates, index + diff);
        }
    }
    /**
     * @return {?}
     */
    get stops() {
        return (/** @type {?} */ (this.stopsForm.get('stops')));
    }
    /**
     * @return {?}
     */
    getStopsCoordinates() {
        /** @type {?} */
        const stopCoordinates = [];
        this.stops.value.forEach((/**
         * @param {?} stop
         * @return {?}
         */
        stop => {
            if (stop.stopCoordinates instanceof Array) {
                stopCoordinates.push(stop.stopCoordinates);
            }
        }));
        this.routingFormService.setStopsCoordinates(stopCoordinates);
        return stopCoordinates;
    }
    /**
     * @return {?}
     */
    addStop() {
        /** @type {?} */
        const insertIndex = this.stops.length - 1;
        this.stops.insert(insertIndex, this.createStop());
    }
    /**
     * @param {?=} routingPos
     * @return {?}
     */
    createStop(routingPos = 'intermediate') {
        return this.formBuilder.group({
            stopPoint: [''],
            stopProposals: [[]],
            routingText: routingPos,
            stopCoordinates: ['', [Validators.required]]
        });
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeStop(index) {
        this.routingStopsOverlayDataSource.ol.clear();
        this.stops.removeAt(index);
        /** @type {?} */
        let cnt = 0;
        this.stops.value.forEach((/**
         * @param {?} stop
         * @return {?}
         */
        stop => {
            this.stops.at(cnt).patchValue({ routingText: this.routingText(cnt) });
            this.addStopOverlay(this.stops.at(cnt).value.stopCoordinates, cnt);
            cnt++;
        }));
    }
    /**
     * @return {?}
     */
    resetForm() {
        this.routesResults = undefined;
        /** @type {?} */
        const nbStops = this.stops.length;
        for (let i = 0; i < nbStops; i++) {
            this.stops.removeAt(0);
        }
        this.stops.insert(0, this.createStop('start'));
        this.stops.insert(1, this.createStop('end'));
        this.routingStopsOverlayDataSource.ol.getFeatures().forEach((/**
         * @param {?} element
         * @return {?}
         */
        element => {
            this.deleteRoutingOverlaybyID(element.getId());
        }));
        this.routingRoutesOverlayDataSource.ol.clear();
        this.routingStopsOverlayDataSource.ol.clear();
        this.selectRoute.getFeatures().clear();
    }
    /**
     * @return {?}
     */
    onFormChange() {
        if (this.stopsForm.valid) {
            this.routingRoutesOverlayDataSource.ol.clear();
            /** @type {?} */
            const coords = this.getStopsCoordinates();
            if (coords.length >= 2) {
                this.getRoutes(coords);
            }
            else {
                this.routingRoutesOverlayDataSource.ol.clear();
            }
        }
    }
    /**
     * @param {?} step
     * @param {?} cnt
     * @return {?}
     */
    formatStep(step, cnt) {
        return this.formatInstruction(step.maneuver.type, step.maneuver.modifier, step.name, step.maneuver.bearing_after, cnt, step.maneuver.exit, cnt === this.activeRoute.steps.length - 1);
    }
    /**
     * @param {?} type
     * @param {?} modifier
     * @param {?} route
     * @param {?} direction
     * @param {?} stepPosition
     * @param {?} exit
     * @param {?=} lastStep
     * @return {?}
     */
    formatInstruction(type, modifier, route, direction, stepPosition, exit, lastStep = false) {
        /** @type {?} */
        let directiveFr;
        /** @type {?} */
        let directiveEn;
        /** @type {?} */
        let image = 'arrow_forward';
        /** @type {?} */
        let cssClass = 'rotate-270';
        /** @type {?} */
        const translatedDirection = this.translateBearing(direction);
        /** @type {?} */
        const translatedModifier = this.translateModifier(modifier);
        /** @type {?} */
        const enPrefix = modifier === 'straight' ? '' : 'on the ';
        /** @type {?} */
        const frPrefix = modifier === 'straight' ? '' : 'à ';
        /** @type {?} */
        let frAggregatedDirection = frPrefix + translatedModifier;
        /** @type {?} */
        let enAggregatedDirection = enPrefix + translatedModifier;
        if (modifier && modifier.search('slight') >= 0) {
            enAggregatedDirection = translatedModifier;
        }
        if (modifier === 'uturn') {
            image = 'fast_forward';
            cssClass = 'rotate-90';
        }
        else if (modifier === 'sharp right') {
            image = 'subdirectory_arrow_right';
            cssClass = 'icon-flipped';
        }
        else if (modifier === 'right') {
            image = 'subdirectory_arrow_right';
            cssClass = 'icon-flipped';
        }
        else if (modifier === 'slight right') {
            image = 'arrow_forward';
            cssClass = 'rotate-290';
        }
        else if (modifier === 'straight') {
            image = 'arrow_forward';
        }
        else if (modifier === 'slight left') {
            image = 'arrow_forward';
            cssClass = 'rotate-250';
        }
        else if (modifier === 'left') {
            image = 'subdirectory_arrow_left';
            cssClass = 'icon-flipped';
        }
        else if (modifier === 'sharp left') {
            image = 'subdirectory_arrow_left';
            cssClass = 'icon-flipped';
        }
        if (type === 'turn') {
            if (modifier === 'straight') {
                directiveFr = 'Continuer sur ' + route;
                directiveEn = 'Continue on ' + route;
            }
            else if (modifier === 'uturn') {
                directiveFr = 'Faire demi-tour sur ' + route;
                directiveEn = 'Make u-turn on ' + route;
            }
            else {
                directiveFr = 'Tourner ' + frAggregatedDirection + ' sur ' + route;
                directiveEn = 'Turn ' + translatedModifier + ' onto ' + route;
            }
        }
        else if (type === 'new name') {
            directiveFr =
                'Continuer en direction ' + translatedDirection + ' sur ' + route;
            directiveEn = 'Head ' + translatedDirection + ' on ' + route;
            image = 'explore';
            cssClass = '';
        }
        else if (type === 'depart') {
            directiveFr =
                'Aller en direction ' + translatedDirection + ' sur ' + route;
            directiveEn = 'Head ' + translatedDirection + ' on ' + route;
            image = 'explore';
            cssClass = '';
        }
        else if (type === 'arrive') {
            if (lastStep) {
                /** @type {?} */
                let coma = ', ';
                if (!translatedModifier) {
                    frAggregatedDirection = '';
                    enAggregatedDirection = '';
                    coma = '';
                }
                directiveFr = 'Vous êtes arrivé' + coma + frAggregatedDirection;
                directiveEn =
                    'You have reached your destination' + coma + enAggregatedDirection;
            }
            else {
                directiveFr = 'Vous atteignez le point intermédiare sur ' + route;
                directiveEn = 'You have reached the intermediate stop onto ' + route;
                image = 'location_on';
                cssClass = '';
            }
        }
        else if (type === 'merge') {
            directiveFr = 'Continuer sur ' + route;
            directiveEn = 'Continue on ' + route;
            image = 'arrow_forward';
            cssClass = 'rotate-270';
        }
        else if (type === 'on ramp') {
            directiveFr = "Prendre l'entrée d'autoroute " + frAggregatedDirection;
            directiveEn = 'Take the ramp ' + enAggregatedDirection;
        }
        else if (type === 'off ramp') {
            directiveFr = "Prendre la sortie d'autoroute " + frAggregatedDirection;
            directiveEn = 'Take exit ' + enAggregatedDirection;
        }
        else if (type === 'fork') {
            if (modifier.search('left') >= 0) {
                directiveFr = 'Garder la gauche sur ' + route;
                directiveEn = 'Merge left onto ' + route;
            }
            else if (modifier.search('right') >= 0) {
                directiveFr = 'Garder la droite sur ' + route;
                directiveEn = 'Merge right onto ' + route;
            }
            else {
                directiveFr = 'Continuer sur ' + route;
                directiveEn = 'Continue on ' + route;
            }
        }
        else if (type === 'end of road') {
            directiveFr =
                'À la fin de la route, tourner ' + translatedModifier + ' sur ' + route;
            directiveEn =
                'At the end of the road, turn ' + translatedModifier + ' onto ' + route;
        }
        else if (type === 'use lane') {
            directiveFr = 'Prendre la voie de ... ';
            directiveEn = 'Take the lane ...';
        }
        else if (type === 'continue' && modifier !== 'uturn') {
            directiveFr = 'Continuer sur ' + route;
            directiveEn = 'Continue on ' + route;
            image = 'arrow_forward';
            cssClass = 'rotate-270';
        }
        else if (type === 'roundabout') {
            directiveFr = 'Au rond-point, prendre la ' + exit;
            directiveFr += exit === 1 ? 're' : 'e';
            directiveFr += ' sortie vers ' + route;
            directiveEn = 'At the roundabout, take the ' + exit;
            directiveEn += exit === 1 ? 'st' : 'rd';
            directiveEn += ' exit towards ' + route;
            image = 'donut_large';
            cssClass = '';
        }
        else if (type === 'rotary') {
            directiveFr = 'Rond-point rotary....';
            directiveEn = 'Roundabout rotary....';
            image = 'donut_large';
            cssClass = '';
        }
        else if (type === 'roundabout turn') {
            directiveFr = 'Rond-point, prendre la ...';
            directiveEn = 'Roundabout, take the ...';
            image = 'donut_large';
            cssClass = '';
        }
        else if (type === 'exit roundabout') {
            directiveFr = 'Poursuivre vers ' + route;
            directiveEn = 'Continue to ' + route;
            image = 'arrow_forward';
            cssClass = 'rotate-270';
        }
        else if (type === 'notification') {
            directiveFr = 'notification ....';
            directiveEn = 'notification ....';
        }
        else if (modifier === 'uturn') {
            directiveFr =
                'Faire demi-tour et continuer en direction ' +
                    translatedDirection +
                    ' sur ' +
                    route;
            directiveEn =
                'Make u-turn and head ' + translatedDirection + ' on ' + route;
        }
        else {
            directiveFr = '???';
            directiveEn = '???';
        }
        if (lastStep) {
            image = 'flag';
            cssClass = '';
        }
        if (stepPosition === 0) {
            image = 'explore';
            cssClass = '';
        }
        /** @type {?} */
        let directive;
        if (this.browserLanguage === 'fr') {
            directive = directiveFr;
        }
        else if (this.browserLanguage === 'en') {
            directive = directiveEn;
        }
        return { instruction: directive, image, cssClass };
    }
    /**
     * @param {?} modifier
     * @return {?}
     */
    translateModifier(modifier) {
        if (modifier === 'uturn') {
            return this.languageService.translate.instant('igo.geo.routing.uturn');
        }
        else if (modifier === 'sharp right') {
            return this.languageService.translate.instant('igo.geo.routing.sharp right');
        }
        else if (modifier === 'right') {
            return this.languageService.translate.instant('igo.geo.routing.right');
        }
        else if (modifier === 'slight right') {
            return this.languageService.translate.instant('igo.geo.routing.slight right');
        }
        else if (modifier === 'sharp left') {
            return this.languageService.translate.instant('igo.geo.routing.sharp left');
        }
        else if (modifier === 'left') {
            return this.languageService.translate.instant('igo.geo.routing.left');
        }
        else if (modifier === 'slight left') {
            return this.languageService.translate.instant('igo.geo.routing.slight left');
        }
        else if (modifier === 'straight') {
            return this.languageService.translate.instant('igo.geo.routing.straight');
        }
        else {
            return modifier;
        }
    }
    /**
     * @param {?} bearing
     * @return {?}
     */
    translateBearing(bearing) {
        if (bearing >= 337 || bearing < 23) {
            return this.languageService.translate.instant('igo.geo.cardinalPoints.n');
        }
        else if (bearing < 67) {
            return this.languageService.translate.instant('igo.geo.cardinalPoints.ne');
        }
        else if (bearing < 113) {
            return this.languageService.translate.instant('igo.geo.cardinalPoints.e');
        }
        else if (bearing < 157) {
            return this.languageService.translate.instant('igo.geo.cardinalPoints.se');
        }
        else if (bearing < 203) {
            return this.languageService.translate.instant('igo.geo.cardinalPoints.s');
        }
        else if (bearing < 247) {
            return this.languageService.translate.instant('igo.geo.cardinalPoints.sw');
        }
        else if (bearing < 293) {
            return this.languageService.translate.instant('igo.geo.cardinalPoints.w');
        }
        else if (bearing < 337) {
            return this.languageService.translate.instant('igo.geo.cardinalPoints.nw');
        }
        else {
            return;
        }
    }
    /**
     * @param {?} distance
     * @return {?}
     */
    formatDistance(distance) {
        if (distance === 0) {
            return;
        }
        if (distance >= 100000) {
            return Math.round(distance / 1000) + ' km';
        }
        if (distance >= 10000) {
            return Math.round(distance / 100) / 10 + ' km';
        }
        if (distance >= 100) {
            return Math.round(distance / 100) / 10 + ' km';
        }
        return distance + ' m';
    }
    /**
     * @param {?} duration
     * @param {?=} summary
     * @return {?}
     */
    formatDuration(duration$$1, summary = false) {
        if (duration$$1 >= 3600) {
            /** @type {?} */
            const hour = Math.floor(duration$$1 / 3600);
            /** @type {?} */
            const minute = Math.round((duration$$1 / 3600 - hour) * 60);
            if (minute === 60) {
                return hour + 1 + ' h';
            }
            return hour + ' h ' + minute + ' min';
        }
        if (duration$$1 >= 60) {
            return Math.round(duration$$1 / 60) + ' min';
        }
        return duration$$1 + ' s';
    }
    /**
     * @param {?} step
     * @param {?=} zoomToExtent
     * @return {?}
     */
    showSegment(step, zoomToExtent = false) {
        this.showRouteSegmentGeometry(step.geometry.coordinates, zoomToExtent);
    }
    /**
     * @param {?} coordinates
     * @param {?=} zoomToExtent
     * @return {?}
     */
    showRouteSegmentGeometry(coordinates, zoomToExtent = false) {
        this.deleteRoutingOverlaybyID('endSegment');
        /** @type {?} */
        const geometry4326 = new LineString(coordinates);
        /** @type {?} */
        const geometry3857 = geometry4326.transform('EPSG:4326', 'EPSG:3857');
        /** @type {?} */
        const routeSegmentCoordinates = ((/** @type {?} */ (geometry3857))).getCoordinates();
        /** @type {?} */
        const lastPoint = routeSegmentCoordinates[0];
        /** @type {?} */
        const geometry = new Point(lastPoint);
        /** @type {?} */
        const feature = new olFeature({ geometry });
        feature.setId('endSegment');
        if (geometry === null) {
            return;
        }
        if (geometry.getType() === 'Point') {
            feature.setStyle([
                new Style({
                    geometry,
                    image: new Circle({
                        radius: 7,
                        stroke: new Stroke({ color: '#FF0000', width: 3 })
                    })
                })
            ]);
        }
        if (zoomToExtent) {
            this.map.viewController.zoomToExtent(feature.getGeometry().getExtent());
        }
        this.routingRoutesOverlayDataSource.ol.addFeature(feature);
    }
    /**
     * @return {?}
     */
    zoomRoute() {
        this.map.viewController.zoomToExtent(this.routingRoutesOverlayDataSource.ol.getExtent());
    }
    /**
     * @param {?=} moveToExtent
     * @return {?}
     */
    showRouteGeometry(moveToExtent = false) {
        /** @type {?} */
        const geom = this.activeRoute.geometry.coordinates;
        /** @type {?} */
        const geometry4326 = new LineString(geom);
        /** @type {?} */
        const geometry3857 = geometry4326.transform('EPSG:4326', 'EPSG:3857');
        this.routingRoutesOverlayDataSource.ol.clear();
        /** @type {?} */
        const routingFeature = new olFeature({ geometry: geometry3857 });
        routingFeature.setStyle([
            new Style({
                stroke: new Stroke({ color: '#6a7982', width: 10 })
            }),
            new Style({
                stroke: new Stroke({ color: '#4fa9dd', width: 6 })
            })
        ]);
        this.routingRoutesOverlayDataSource.ol.addFeature(routingFeature);
        if (moveToExtent) {
            this.map.viewController.zoomToExtent(this.routingRoutesOverlayDataSource.ol.getExtent());
        }
    }
    /**
     * @param {?} stopsArrayCoordinates
     * @param {?=} moveToExtent
     * @return {?}
     */
    getRoutes(stopsArrayCoordinates, moveToExtent = false) {
        /** @type {?} */
        const routeResponse = this.routingService.route(stopsArrayCoordinates);
        if (routeResponse) {
            routeResponse.map((/**
             * @param {?} res
             * @return {?}
             */
            res => this.routesQueries$$.push(res.subscribe((/**
             * @param {?} route
             * @return {?}
             */
            route => {
                this.routesResults = route;
                this.activeRoute = (/** @type {?} */ (this.routesResults[0]));
                this.showRouteGeometry(moveToExtent);
            })))));
        }
    }
    /**
     * @private
     * @return {?}
     */
    unlistenSingleClick() {
        if (this.focusKey.length !== 0) {
            this.focusKey.forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => {
                unByKey(key);
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    unsubscribeRoutesQueries() {
        this.routesQueries$$.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
        this.routesQueries$$ = [];
    }
    /**
     * @return {?}
     */
    copyLinkToClipboard() {
        /** @type {?} */
        const successful = Clipboard.copy(this.getUrl());
        if (successful) {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const title = translate.instant('igo.geo.routingForm.dialog.copyTitle');
            /** @type {?} */
            const msg = translate.instant('igo.geo.routingForm.dialog.copyMsgLink');
            this.messageService.success(msg, title);
        }
    }
    /**
     * @return {?}
     */
    copyDirectionsToClipboard() {
        /** @type {?} */
        const indent = '\t';
        /** @type {?} */
        let activeRouteDirective = this.languageService.translate.instant('igo.geo.routingForm.instructions') + ':\n';
        /** @type {?} */
        let wayPointList = '';
        /** @type {?} */
        const summary = this.languageService.translate.instant('igo.geo.routingForm.summary') +
            ': \n' +
            indent +
            this.activeRoute.title +
            '\n' +
            indent +
            this.formatDistance(this.activeRoute.distance) +
            '\n' +
            indent +
            this.formatDuration(this.activeRoute.duration) +
            '\n\n' +
            this.languageService.translate.instant('igo.geo.routingForm.stopsList') +
            ':\n';
        /** @type {?} */
        const url = this.languageService.translate.instant('igo.geo.routingForm.link') +
            ':\n' +
            indent +
            this.getUrl();
        /** @type {?} */
        let wayPointsCnt = 1;
        this.stops.value.forEach((/**
         * @param {?} stop
         * @return {?}
         */
        stop => {
            /** @type {?} */
            let coord = '';
            /** @type {?} */
            let stopPoint = '';
            if (stop.stopPoint !== stop.stopCoordinates) {
                stopPoint = stop.stopPoint;
                coord =
                    ' (' +
                        [stop.stopCoordinates[1], stop.stopCoordinates[0]].join(',') +
                        ')';
            }
            else {
                stopPoint = [stop.stopCoordinates[1], stop.stopCoordinates[0]].join(',');
            }
            wayPointList =
                wayPointList +
                    indent +
                    wayPointsCnt.toLocaleString() +
                    '. ' +
                    stopPoint +
                    coord +
                    '\n';
            wayPointsCnt++;
        }));
        // Directions
        /** @type {?} */
        let localCnt = 0;
        this.activeRoute.steps.forEach((/**
         * @param {?} step
         * @return {?}
         */
        step => {
            /** @type {?} */
            const instruction = this.formatStep(step, localCnt).instruction;
            /** @type {?} */
            const distance = this.formatDistance(step.distance) === undefined
                ? ''
                : ' (' + this.formatDistance(step.distance) + ')';
            activeRouteDirective =
                activeRouteDirective +
                    indent +
                    (localCnt + 1).toLocaleString() +
                    '. ' +
                    instruction +
                    distance +
                    '\n';
            localCnt++;
        }));
        /** @type {?} */
        const directionsBody = summary + wayPointList + '\n' + url + '\n\n' + activeRouteDirective;
        /** @type {?} */
        const successful = Clipboard.copy(directionsBody);
        if (successful) {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const title = translate.instant('igo.geo.routingForm.dialog.copyTitle');
            /** @type {?} */
            const msg = translate.instant('igo.geo.routingForm.dialog.copyMsg');
            this.messageService.success(msg, title);
        }
    }
    /**
     * @private
     * @param {?} term
     * @return {?}
     */
    handleTermChanged(term) {
        if (term !== undefined || term.length !== 0) {
            /** @type {?} */
            const searchProposals = [];
            /** @type {?} */
            const researches = this.searchService.search(term);
            researches.map((/**
             * @param {?} res
             * @return {?}
             */
            res => this.routesQueries$$.push(res.request.subscribe((/**
             * @param {?} results
             * @return {?}
             */
            results => {
                results
                    .filter((/**
                 * @param {?} r
                 * @return {?}
                 */
                r => r.data.geometry))
                    .forEach((/**
                 * @param {?} element
                 * @return {?}
                 */
                element => {
                    if (searchProposals.filter((/**
                     * @param {?} r
                     * @return {?}
                     */
                    r => r.source === element.source))
                        .length === 0) {
                        searchProposals.push({
                            source: element.source,
                            results: results.map((/**
                             * @param {?} r
                             * @return {?}
                             */
                            r => r.data))
                        });
                    }
                }));
                this.stops
                    .at(this.currentStopIndex)
                    .patchValue({ stopProposals: searchProposals });
            })))));
        }
    }
    /**
     * @param {?} term
     * @return {?}
     */
    setTerm(term) {
        this.term = term;
        if (this.keyIsValid(term) &&
            (term.length >= this.length || term.length === 0)) {
            this.stream$.next(term);
        }
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    keyIsValid(key) {
        return this.invalidKeys.find((/**
         * @param {?} value
         * @return {?}
         */
        value => value === key)) === undefined;
    }
    /**
     * @param {?} i
     * @param {?} event
     * @return {?}
     */
    keyup(i, event) {
        /** @type {?} */
        const term = ((/** @type {?} */ (event.target))).value;
        this.setTerm(term);
        this.map.ol.un('singleclick', (/**
         * @param {?} evt
         * @return {?}
         */
        evt => {
            this.handleMapClick(evt, i);
        }));
    }
    /**
     * @param {?} stopIndex
     * @return {?}
     */
    clearStop(stopIndex) {
        this.deleteRoutingOverlaybyID(this.getStopOverlayID(stopIndex));
        this.stops.removeAt(stopIndex);
        this.stops.insert(stopIndex, this.createStop(this.routingText(stopIndex)));
        this.routingRoutesOverlayDataSource.ol.clear();
    }
    /**
     * @param {?} proposal
     * @param {?} i
     * @return {?}
     */
    chooseProposal(proposal, i) {
        if (proposal !== undefined) {
            /** @type {?} */
            let geomCoord;
            /** @type {?} */
            const geom = ((/** @type {?} */ (proposal))).geometry;
            if (geom.type === 'Point') {
                geomCoord = geom.coordinates;
            }
            else if (geom.type.search('Line') >= 0) {
                /** @type {?} */
                let coordArray = [];
                if (geom.coordinates instanceof Array) {
                    // Middle segment of multilinestring
                    coordArray =
                        geom.coordinates[Math.floor(geom.coordinates.length / 2)];
                }
                else {
                    coordArray = geom.coordinates;
                }
                // middle point of coords
                geomCoord = coordArray[Math.floor(coordArray.length / 2)];
            }
            else if (geom.type.search('Polygon') >= 0) {
                /** @type {?} */
                const polygonExtent = proposal.extent;
                /** @type {?} */
                const long = polygonExtent[0] + (polygonExtent[2] - polygonExtent[0]) / 2;
                /** @type {?} */
                const lat = polygonExtent[1] + (polygonExtent[3] - polygonExtent[1]) / 2;
                geomCoord = [long, lat];
            }
            if (geomCoord !== undefined) {
                this.stops.at(i).patchValue({ stopCoordinates: geomCoord });
                this.addStopOverlay(geomCoord, i);
                /** @type {?} */
                const proposalExtent = this.routingStopsOverlayDataSource.ol
                    .getFeatureById(this.getStopOverlayID(i))
                    .getGeometry()
                    .getExtent();
                if (!intersects$1(proposalExtent, this.map.getExtent())) {
                    this.map.viewController.moveToExtent(proposalExtent);
                }
            }
        }
    }
    /**
     * @param {?} i
     * @return {?}
     */
    focus(i) {
        this.unlistenSingleClick();
        this.currentStopIndex = i;
        this.focusOnStop = true;
        this.routingFormService.setMapWaitingForRoutingClick();
        this.focusKey.push(this.map.ol.once('singleclick', (/**
         * @param {?} evt
         * @return {?}
         */
        evt => {
            this.handleMapClick(evt, i);
        })));
    }
    /**
     * @private
     * @param {?} event
     * @param {?=} indexPos
     * @return {?}
     */
    handleMapClick(event, indexPos) {
        this.stops.at(indexPos).patchValue({ stopProposals: [] });
        if (this.currentStopIndex === undefined) {
            this.addStop();
            indexPos = this.stops.length - 2;
            this.stops.at(indexPos).value.stopProposals = [];
        }
        else {
            indexPos = this.currentStopIndex;
        }
        /** @type {?} */
        const clickCoordinates = transform(event.coordinate, this.map.projection, this.projection);
        this.stops.at(indexPos).patchValue({ stopCoordinates: clickCoordinates });
        this.handleLocationProposals(clickCoordinates, indexPos);
        this.addStopOverlay(clickCoordinates, indexPos);
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.focusOnStop = false; // prevent to trigger map click and Select on routes at same time.
        }), 500);
        this.routingFormService.unsetMapWaitingForRoutingClick();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    geolocateStop(index) {
        moveToOlFeatures(this.map, [this.map.geolocationFeature], FeatureMotion.Move);
        /** @type {?} */
        const geolocateCoordinates = this.map.getCenter(this.projection);
        this.stops.at(index).patchValue({ stopCoordinates: geolocateCoordinates });
        this.addStopOverlay(geolocateCoordinates, index);
        this.handleLocationProposals(geolocateCoordinates, index);
    }
    /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    addStopOverlay(coordinates, index) {
        /** @type {?} */
        const routingText = this.routingText(index);
        /** @type {?} */
        let stopColor;
        /** @type {?} */
        let stopText;
        if (routingText === 'start') {
            stopColor = 'green';
            stopText = this.languageService.translate.instant('igo.geo.routingForm.start');
        }
        else if (routingText === 'end') {
            stopColor = 'red';
            stopText = this.languageService.translate.instant('igo.geo.routingForm.end');
        }
        else {
            stopColor = 'yellow';
            stopText =
                this.languageService.translate.instant('igo.geo.routingForm.intermediate') +
                    ' #' +
                    index;
        }
        /** @type {?} */
        const geometry = new Point(transform(coordinates, this.projection, this.map.projection));
        /** @type {?} */
        const feature = new olFeature({ geometry });
        /** @type {?} */
        const stopID = this.getStopOverlayID(index);
        this.deleteRoutingOverlaybyID(stopID);
        feature.setId(stopID);
        if (geometry === null) {
            return;
        }
        if (geometry.getType() === 'Point') {
            /** @type {?} */
            const olStyle = createOverlayMarkerStyle(stopColor);
            // stopText
            feature.setStyle(olStyle);
        }
        this.routingStopsOverlayDataSource.ol.addFeature(feature);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getStopOverlayID(index) {
        /** @type {?} */
        let txt;
        if (index === 0) {
            txt = 'start';
        }
        else if (index === this.stops.length - 1) {
            txt = 'end';
        }
        else {
            txt = index;
        }
        return 'routingStop_' + txt;
    }
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    deleteRoutingOverlaybyID(id) {
        if (this.routingStopsOverlayDataSource.ol.getFeatureById(id)) {
            this.routingStopsOverlayDataSource.ol.removeFeature(this.routingStopsOverlayDataSource.ol.getFeatureById(id));
        }
        if (this.routingRoutesOverlayDataSource.ol.getFeatureById(id)) {
            this.routingRoutesOverlayDataSource.ol.removeFeature(this.routingRoutesOverlayDataSource.ol.getFeatureById(id));
        }
    }
    /**
     * @private
     * @return {?}
     */
    getUrl() {
        if (!this.route) {
            return;
        }
        /** @type {?} */
        const routingKey = this.route.options.routingCoordKey;
        /** @type {?} */
        const stopsCoordinates = [];
        if (this.routingFormService &&
            this.routingFormService.getStopsCoordinates() &&
            this.routingFormService.getStopsCoordinates().length !== 0) {
            this.routingFormService.getStopsCoordinates().forEach((/**
             * @param {?} coord
             * @return {?}
             */
            coord => {
                stopsCoordinates.push(coord);
            }));
        }
        /** @type {?} */
        let routingUrl = '';
        if (stopsCoordinates.length >= 2) {
            routingUrl = `${routingKey}=${stopsCoordinates.join(';')}`;
        }
        return `${location.origin}${location.pathname}?tool=directions&${routingUrl}`;
    }
}
RoutingFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-routing-form',
                template: "<form class=\"igo-form\" [formGroup]=\"stopsForm\">\r\n  <!-- <div class=\"igo-form-button-group\">\r\n\r\n  </div> -->\r\n  <div #inputs formArrayName=\"stops\" *ngFor=\"let stop of stops.controls; let i = index;\">\r\n    <mat-list-item [formGroupName]=\"i\">\r\n\r\n      <div class=\"igo-input-container\">\r\n        <button *ngIf=\"map.geolocationFeature\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.geolocate' | translate\" (click)=\"geolocateStop(i)\">\r\n          <mat-icon svgIcon=\"crosshairs-gps\"></mat-icon>\r\n        </button>\r\n        <mat-form-field>\r\n          <input matInput formControlName=\"stopPoint\" [matAutocomplete]=\"auto\" placeholder=\"{{'igo.geo.routingForm.'+stop.value.routingText | translate}}\"\r\n            (focus)=\"focus(i)\" (keyup)=\"keyup(i,$event)\">\r\n\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-optgroup *ngFor=\"let source of stop.value.stopProposals\" [label]=\"source.source\" [disabled]=\"source.disabled\">\r\n              <mat-option *ngFor=\"let result of source.results\" [value]=\"result.title\" (onSelectionChange)=\"chooseProposal(result,i)\">\r\n                {{ result.title }}\r\n              </mat-option>\r\n            </mat-optgroup>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n        <button mat-button *ngIf=\"stop.value && (stop.value.stopPoint.length>0 || stop.value.stopProposals.length>0)\" matSuffix mat-icon-button\r\n          aria-label=\"Clear\" (click)=\"clearStop(i)\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n        <!-- <div class=\"igo-form-button-group\"> -->\r\n\r\n\r\n          <!-- <button *ngIf=\"i !== 0\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.raiseStop' | translate\"\r\n            [color]=\"color\" (click)=\"raiseStop(i)\">\r\n            <mat-icon svgIcon=\"arrow-upward\"></mat-icon>\r\n          </button>\r\n          <button *ngIf=\"i !== stops.length - 1\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.lowerStop' | translate\"\r\n            [color]=\"color\" (click)=\"lowerStop(i)\">\r\n            <mat-icon svgIcon=\"arrow-downward\"></mat-icon>\r\n          </button> -->\r\n\r\n          <button *ngIf=\"i !== 0 && i !== stops.length - 1\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.removeStop' | translate\"\r\n            color=\"warn\" (click)=\"removeStop(i)\">\r\n            <mat-icon svgIcon=\"delete\"></mat-icon>\r\n          </button>\r\n        <!-- </div> -->\r\n      </div>\r\n\r\n    </mat-list-item>\r\n  </div>\r\n  <div class=\"igo-form-button-group\">\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.routingForm.zoomRoute' | translate\"\r\n      *ngIf=\"routesResults\" color=\"primary\" (click)=\"zoomRoute()\">\r\n      <mat-icon svgIcon=\"zoom-in\"></mat-icon>\r\n    </button>\r\n      <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.addStop' | translate\"\r\n      color=\"primary\" (click)=\"addStop()\">\r\n      <mat-icon svgIcon=\"map-marker-plus\"></mat-icon>\r\n    </button>\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.resetRoutingBtn' | translate\"\r\n      *ngIf=\"routesResults\" color=\"warn\" (click)=\"resetForm()\">\r\n      <mat-icon svgIcon=\"restore-page\"></mat-icon>\r\n    </button>\r\n    <button mat-icon-button *ngIf=\"routesResults\" tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.copy' | translate\"\r\n      color=\"primary\" (click)=\"copyDirectionsToClipboard()\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n    </button>\r\n    <button mat-icon-button *ngIf=\"routesResults\" tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.link' | translate\"\r\n    color=\"primary\" (click)=\"copyLinkToClipboard()\">\r\n    <mat-icon svgIcon=\"link\"></mat-icon>\r\n  </button>\r\n  </div>\r\n\r\n</form>\r\n\r\n<div class=\"igo-input-container\" *ngIf=\"routesResults\">\r\n  <mat-form-field *ngIf=\"routesResults && routesResults.length > 1\">\r\n    <mat-select placeholder=\"{{'igo.geo.routingForm.drivingOptions' | translate}}\" (selectionChange)=\"changeRoute($event)\" [(ngModel)]=\"activeRoute\">\r\n      <mat-option *ngFor=\"let pathRouting of routesResults; let cnt = index;\" [value]=\"pathRouting\">\r\n        Option {{cnt + 1}} : {{this.formatDistance(pathRouting.distance)}} ({{this.formatDuration(pathRouting.duration)}})\r\n      </mat-option>\r\n    </mat-select>\r\n  </mat-form-field>\r\n\r\n  <mat-divider *ngIf=\"routesResults && routesResults.length === 0\"></mat-divider>\r\n\r\n  <mat-list>\r\n    <h3 mat-header>{{activeRoute.title}}</h3>\r\n    <h3 mat-subheader>{{this.formatDistance(activeRoute.distance)}}, {{this.formatDuration(activeRoute.duration)}}</h3>\r\n\r\n    <mat-list-item (mouseenter)=\"showSegment(step)\" (click)=\"showSegment(step,true)\" *ngFor=\"let step of activeRoute.steps; let cnt = index;\"\r\n      igoListItem>\r\n      <mat-icon [ngClass]=\"this.formatStep(step,cnt).cssClass\" mat-list-icon svgIcon=\"{{this.formatStep(step,cnt).image}}\"></mat-icon>\r\n\r\n      <h4 mat-line (click)=\"showSegment(step,true)\">{{cnt +1}}. {{this.formatStep(step,cnt).instruction}}</h4>\r\n      <h4 mat-line class=\"right\">{{this.formatDistance(step.distance)}}</h4>\r\n    </mat-list-item>\r\n\r\n    <mat-divider></mat-divider>\r\n\r\n  </mat-list>\r\n\r\n</div>\r\n",
                styles: ["mat-form-field{width:70%}.mat-list-item{height:auto}.mat-line{word-wrap:break-word!important;white-space:pre-wrap!important}.mat-line.right{text-align:right}.rotate-90{transform:rotate(90deg)}.rotate-45{transform:rotate(45deg)}.rotate-270{transform:rotate(270deg)}.rotate-250{transform:rotate(250deg)}.rotate-290{transform:rotate(290deg)}.icon-flipped{transform:scaleY(-1)}"]
            }] }
];
/** @nocollapse */
RoutingFormComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: RoutingService },
    { type: LanguageService },
    { type: MessageService },
    { type: SearchService },
    { type: QueryService },
    { type: RoutingFormService },
    { type: RouteService, decorators: [{ type: Optional }] }
];
RoutingFormComponent.propDecorators = {
    term: [{ type: Input }],
    length: [{ type: Input }],
    map: [{ type: Input }],
    submit: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RoutingFormBindingDirective {
    /**
     * @param {?} component
     * @param {?} routingFormService
     * @param {?} route
     */
    constructor(component, routingFormService, route) {
        this.component = component;
        this.routingFormService = routingFormService;
        this.route = route;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const storedStopsCoordinates = this.routingFormService.getStopsCoordinates();
        if (!storedStopsCoordinates &&
            this.route &&
            this.route.options.routingCoordKey) {
            this.route.queryParams.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            params => {
                /** @type {?} */
                const routingParams = params[(/** @type {?} */ (this.route.options.routingCoordKey))];
                /** @type {?} */
                const stopsCoordinatesFromURL = [];
                if (routingParams) {
                    /** @type {?} */
                    const routingCoordUrl = routingParams.split(';');
                    if (routingCoordUrl.length >= 2) {
                        /** @type {?} */
                        let cnt = 0;
                        routingCoordUrl.forEach((/**
                         * @param {?} coord
                         * @return {?}
                         */
                        coord => {
                            if (cnt !== 0 && cnt !== routingCoordUrl.length - 1) {
                                this.component.stops.insert(cnt, this.component.createStop());
                            }
                            /** @type {?} */
                            const stopCoordinatesFromURL = JSON.parse('[' + coord + ']');
                            this.component.stops
                                .at(cnt)
                                .patchValue({ stopCoordinates: stopCoordinatesFromURL });
                            this.component.stops
                                .at(cnt)
                                .patchValue({ stopPoint: stopCoordinatesFromURL });
                            this.component.handleLocationProposals(stopCoordinatesFromURL, cnt);
                            stopsCoordinatesFromURL.push(stopCoordinatesFromURL);
                            this.component.addStopOverlay(stopCoordinatesFromURL, cnt);
                            cnt++;
                        }));
                        this.component.getRoutes(stopsCoordinatesFromURL, true);
                    }
                }
            }));
        }
        else if (storedStopsCoordinates) {
            for (let i = 0; i < storedStopsCoordinates.length; i++) {
                if (i !== 0 && i !== storedStopsCoordinates.length - 1) {
                    this.component.stops.insert(i, this.component.createStop());
                }
                if (storedStopsCoordinates[i] instanceof Array) {
                    this.component.addStopOverlay(storedStopsCoordinates[i], i);
                    this.component.stops
                        .at(i)
                        .patchValue({ stopCoordinates: storedStopsCoordinates[i] });
                    this.component.stops
                        .at(i)
                        .patchValue({ stopPoint: storedStopsCoordinates[i] });
                    this.component.handleLocationProposals(storedStopsCoordinates[i], i);
                }
            }
        }
    }
}
RoutingFormBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoRoutingFormBinding]'
            },] }
];
/** @nocollapse */
RoutingFormBindingDirective.ctorParameters = () => [
    { type: RoutingFormComponent, decorators: [{ type: Self }] },
    { type: RoutingFormService },
    { type: RouteService, decorators: [{ type: Optional }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoRoutingModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoRoutingModule
        };
    }
}
IgoRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatIconModule,
                    MatButtonModule,
                    MatListModule,
                    MatDividerModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatOptionModule,
                    MatSelectModule,
                    MatTooltipModule,
                    MatAutocompleteModule,
                    IgoLanguageModule
                ],
                exports: [RoutingFormComponent, RoutingFormBindingDirective],
                declarations: [RoutingFormComponent, RoutingFormBindingDirective],
                providers: [RoutingFormService, provideRoutingSourceService()]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Search source factory
 * @ignore
 * @param {?} sources
 * @return {?}
 */
function searchSourceServiceFactory(sources) {
    return new SearchSourceService(sources);
}
/**
 * Function that returns a provider for the SearchSource service
 * @return {?}
 */
function provideSearchSourceService() {
    return {
        provide: SearchSourceService,
        useFactory: searchSourceServiceFactory,
        deps: [SearchSource]
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class GoogleLinks {
    /**
     * @param {?} lon
     * @param {?} lat
     * @return {?}
     */
    static getGoogleMapsLink(lon, lat) {
        return 'https://www.google.com/maps?q=' + lat + ',' + lon;
    }
    /**
     * @param {?} lon
     * @param {?} lat
     * @return {?}
     */
    static getGoogleStreetViewLink(lon, lat) {
        return 'https://www.google.com/maps?q=&layer=c&cbll=' + lat + ',' + lon;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IChercheSearchResultFormatter {
    /**
     * @param {?} languageService
     */
    constructor(languageService) {
        this.languageService = languageService;
    }
    /**
     * @param {?} result
     * @return {?}
     */
    formatResult(result) {
        return result;
    }
}
IChercheSearchResultFormatter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
IChercheSearchResultFormatter.ctorParameters = () => [
    { type: LanguageService }
];
/**
 * ICherche search source
 */
class IChercheSearchSource extends SearchSource {
    /**
     * @param {?} http
     * @param {?} options
     * @param {?} formatter
     */
    constructor(http, options, formatter) {
        super(options);
        this.http = http;
        this.formatter = formatter;
    }
    /**
     * @return {?}
     */
    getId() {
        return IChercheSearchSource.id;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'ICherche Québec',
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/icherche/geocode',
            settings: [
                {
                    type: 'checkbox',
                    title: 'results type',
                    name: 'type',
                    values: [
                        {
                            title: 'Adresse',
                            value: 'adresses',
                            enabled: true
                        },
                        // {
                        //   title: 'Ancienne adresse',
                        //   value: 'ancienne_adresse',
                        //   enabled: true
                        // },
                        {
                            title: 'Code Postal',
                            value: 'codes-postaux',
                            enabled: true
                        },
                        {
                            title: 'Route',
                            value: 'routes',
                            enabled: false
                        },
                        {
                            title: 'Municipalité',
                            value: 'municipalites',
                            enabled: true
                        },
                        // {
                        //   title: 'Ancienne municipalité',
                        //   value: 'ancienne_municipalite',
                        //   enabled: true
                        // },
                        {
                            title: 'mrc',
                            value: 'mrc',
                            enabled: true
                        },
                        {
                            title: 'Région administrative',
                            value: 'regadmin',
                            enabled: true
                        },
                        {
                            title: 'Lieu',
                            value: 'lieux',
                            enabled: true
                        },
                        {
                            title: 'Borne',
                            value: 'bornes',
                            enabled: false
                        },
                        {
                            title: 'Entreprise',
                            value: 'entreprises',
                            enabled: false
                        }
                    ]
                },
                {
                    type: 'radiobutton',
                    title: 'results limit',
                    name: 'limit',
                    values: [
                        {
                            title: '1',
                            value: 1,
                            enabled: false
                        },
                        {
                            title: '5',
                            value: 5,
                            enabled: true
                        },
                        {
                            title: '10',
                            value: 10,
                            enabled: false
                        },
                        {
                            title: '25',
                            value: 25,
                            enabled: false
                        },
                        {
                            title: '50',
                            value: 50,
                            enabled: false
                        }
                    ]
                },
                {
                    type: 'radiobutton',
                    title: 'trust level',
                    name: 'ecmax',
                    values: [
                        {
                            title: '10',
                            value: 10,
                            enabled: false
                        },
                        {
                            title: '30',
                            value: 30,
                            enabled: true
                        },
                        {
                            title: '50',
                            value: 50,
                            enabled: false
                        },
                        {
                            title: '75',
                            value: 75,
                            enabled: false
                        },
                        {
                            title: '100',
                            value: 100,
                            enabled: false
                        }
                    ]
                }
            ]
        };
    }
    /**
     * Search a location by name or keyword
     * @param {?} term Location name or keyword
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    search(term, options) {
        /** @type {?} */
        const params = this.computeRequestParams(term, options || {});
        return this.http
            .get(this.searchUrl, { params })
            .pipe(map((/**
         * @param {?} response
         * @return {?}
         */
        (response) => this.extractResults(response))));
    }
    /**
     * @private
     * @param {?} term
     * @param {?} options
     * @return {?}
     */
    computeRequestParams(term, options) {
        return new HttpParams({
            fromObject: Object.assign({
                q: this.computeTerm(term),
                geometry: true,
                type: 'adresses,codes-postaux,municipalites,mrc,regadmin,lieux,entreprises,bornes'
            }, this.params, this.computeOptionsParam(term, options || {}).params)
        });
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    extractResults(response) {
        return response.features.map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            return this.formatter.formatResult(this.dataToResult(data));
        }));
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    dataToResult(data) {
        /** @type {?} */
        const properties = this.computeProperties(data);
        /** @type {?} */
        const id = [this.getId(), properties.type, properties.code].join('.');
        /** @type {?} */
        const subtitleHtml = data.highlight.title2
            ? ' <small> ' + data.highlight.title2 + '</small>'
            : '';
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: data.geometry,
                extent: data.bbox,
                properties,
                meta: {
                    id,
                    title: data.properties.nom
                }
            },
            meta: {
                dataType: FEATURE,
                id,
                title: data.properties.nom,
                titleHtml: data.highlight.title + subtitleHtml,
                icon: 'map-marker'
            }
        };
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeProperties(data) {
        /** @type {?} */
        const properties = ObjectUtils.removeKeys(data.properties, IChercheSearchSource.propertiesBlacklist);
        /** @type {?} */
        const googleLinksProperties = {
            GoogleMaps: GoogleLinks.getGoogleMapsLink(data.geometry.coordinates[0], data.geometry.coordinates[1])
        };
        if (data.geometry.type === 'Point') {
            googleLinksProperties.GoogleStreetView = GoogleLinks.getGoogleStreetViewLink(data.geometry.coordinates[0], data.geometry.coordinates[1]);
        }
        return Object.assign(properties, { type: data.index }, googleLinksProperties);
    }
    /**
     * Remove hashtag from query
     * @private
     * @param {?} term Query with hashtag
     * @return {?}
     */
    computeTerm(term) {
        return term.replace(/(#[^\s]*)/g, '');
    }
    /**
     * Add hashtag to param if valid
     * @private
     * @param {?} term Query with hashtag
     * @param {?} options TextSearchOptions
     * @return {?}
     */
    computeOptionsParam(term, options) {
        /** @type {?} */
        const tags = term.match(/(#[^\s]+)/g);
        if (tags) {
            /** @type {?} */
            let typeValue = '';
            /** @type {?} */
            let hashtagToAdd = false;
            tags.forEach((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                if (super.hashtagValid(super.getSettingsValues('type'), value, true)) {
                    typeValue += value.substring(1) + ',';
                    hashtagToAdd = true;
                }
            }));
            if (hashtagToAdd) {
                options.params = Object.assign(options.params || {}, {
                    type: typeValue.slice(0, -1)
                });
            }
        }
        return options;
    }
}
IChercheSearchSource.id = 'icherche';
IChercheSearchSource.type = FEATURE;
IChercheSearchSource.propertiesBlacklist = [];
IChercheSearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
IChercheSearchSource.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] },
    { type: IChercheSearchResultFormatter, decorators: [{ type: Inject, args: [IChercheSearchResultFormatter,] }] }
];
/**
 * IChercheReverse search source
 */
class IChercheReverseSearchSource extends SearchSource {
    /**
     * @param {?} http
     * @param {?} options
     */
    constructor(http, options) {
        super(options);
        this.http = http;
    }
    /**
     * @return {?}
     */
    getId() {
        return IChercheReverseSearchSource.id;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'Territoire (Géocodage inversé)',
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/territoires/locate',
            settings: [
                {
                    type: 'checkbox',
                    title: 'results type',
                    name: 'type',
                    values: [
                        {
                            title: 'Adresse',
                            value: 'adresses',
                            enabled: true
                        },
                        {
                            title: 'Route',
                            value: 'routes',
                            enabled: false
                        },
                        {
                            title: 'Arrondissement',
                            value: 'arrondissements',
                            enabled: false
                        },
                        {
                            title: 'Municipalité',
                            value: 'municipalites',
                            enabled: true
                        },
                        {
                            title: 'mrc',
                            value: 'mrc',
                            enabled: true
                        },
                        {
                            title: 'Région administrative',
                            value: 'regadmin',
                            enabled: true
                        }
                    ]
                }
            ]
        };
    }
    /**
     * Search a location by coordinates
     * @param {?} lonLat Location coordinates
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    reverseSearch(lonLat, options) {
        /** @type {?} */
        const params = this.computeRequestParams(lonLat, options || {});
        return this.http.get(this.searchUrl, { params }).pipe(map((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            return this.extractResults(response);
        })));
    }
    /**
     * @private
     * @param {?} lonLat
     * @param {?=} options
     * @return {?}
     */
    computeRequestParams(lonLat, options) {
        /** @type {?} */
        const distance = options.distance;
        return new HttpParams({
            fromObject: Object.assign({
                loc: lonLat.join(','),
                buffer: distance ? String(distance) : '100',
                geometry: true
            }, this.params, options.params || {})
        });
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    extractResults(response) {
        return response.features.map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            return this.dataToResult(data);
        }));
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    dataToResult(data) {
        /** @type {?} */
        const properties = this.computeProperties(data);
        /** @type {?} */
        const extent = this.computeExtent(data);
        /** @type {?} */
        const id = [this.getId(), properties.type, properties.code].join('.');
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: data.geometry,
                extent,
                properties,
                meta: {
                    id,
                    title: data.properties.nom
                }
            },
            meta: {
                dataType: FEATURE,
                id,
                title: data.properties.nom,
                icon: 'map-marker'
            }
        };
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeProperties(data) {
        /** @type {?} */
        const properties = ObjectUtils.removeKeys(data.properties, IChercheReverseSearchSource.propertiesBlacklist);
        return properties;
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeExtent(data) {
        return data.bbox
            ? [data.bbox[0], data.bbox[2], data.bbox[1], data.bbox[3]]
            : undefined;
    }
}
IChercheReverseSearchSource.id = 'icherchereverse';
IChercheReverseSearchSource.type = FEATURE;
IChercheReverseSearchSource.propertiesBlacklist = ['doc_type'];
IChercheReverseSearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
IChercheReverseSearchSource.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * ICherche search result formatter factory
 * @ignore
 * @param {?} languageService
 * @return {?}
 */
function defaultIChercheSearchResultFormatterFactory(languageService) {
    return new IChercheSearchResultFormatter(languageService);
}
/**
 * Function that returns a provider for the ICherche search result formatter
 * @return {?}
 */
function provideDefaultIChercheSearchResultFormatter() {
    return {
        provide: IChercheSearchResultFormatter,
        useFactory: defaultIChercheSearchResultFormatterFactory,
        deps: [LanguageService]
    };
}
/**
 * ICherche search source factory
 * @ignore
 * @param {?} http
 * @param {?} config
 * @param {?} formatter
 * @return {?}
 */
function ichercheSearchSourceFactory(http, config, formatter) {
    return new IChercheSearchSource(http, config.getConfig(`searchSources.${IChercheSearchSource.id}`), formatter);
}
/**
 * Function that returns a provider for the ICherche search source
 * @return {?}
 */
function provideIChercheSearchSource() {
    return {
        provide: SearchSource,
        useFactory: ichercheSearchSourceFactory,
        multi: true,
        deps: [HttpClient, ConfigService, IChercheSearchResultFormatter]
    };
}
/**
 * IChercheReverse search source factory
 * @ignore
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
function ichercheReverseSearchSourceFactory(http, config) {
    return new IChercheReverseSearchSource(http, config.getConfig(`searchSources.${IChercheReverseSearchSource.id}`));
}
/**
 * Function that returns a provider for the IChercheReverse search source
 * @return {?}
 */
function provideIChercheReverseSearchSource() {
    return {
        provide: SearchSource,
        useFactory: ichercheReverseSearchSourceFactory,
        multi: true,
        deps: [HttpClient, ConfigService]
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CoordinatesSearchResultFormatter {
    /**
     * @param {?} languageService
     */
    constructor(languageService) {
        this.languageService = languageService;
    }
    /**
     * @param {?} result
     * @return {?}
     */
    formatResult(result) {
        return result;
    }
}
CoordinatesSearchResultFormatter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CoordinatesSearchResultFormatter.ctorParameters = () => [
    { type: LanguageService }
];
/**
 * CoordinatesReverse search source
 */
class CoordinatesReverseSearchSource extends SearchSource {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
    }
    /**
     * @return {?}
     */
    getId() {
        return CoordinatesReverseSearchSource.id;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'Coordinates'
        };
    }
    /**
     * Search a location by coordinates
     * @param {?} lonLat Location coordinates
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    reverseSearch(lonLat, options) {
        return of([this.dataToResult(lonLat)]);
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    dataToResult(data) {
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: {
                    type: 'Point',
                    coordinates: [data[0], data[1]]
                },
                extent: undefined,
                properties: {
                    type: 'point',
                    coordonnees: String(data[0]) + ', ' + String(data[1]),
                    format: 'degrés decimaux',
                    systemeCoordonnees: 'WGS84',
                    GoogleMaps: GoogleLinks.getGoogleMapsLink(data[0], data[1]),
                    GoogleStreetView: GoogleLinks.getGoogleStreetViewLink(data[0], data[1])
                }
            },
            meta: {
                dataType: FEATURE,
                id: '1',
                title: String(data[0]) + ', ' + String(data[1]),
                icon: 'map-marker'
            }
        };
    }
}
CoordinatesReverseSearchSource.id = 'coordinatesreverse';
CoordinatesReverseSearchSource.type = FEATURE;
CoordinatesReverseSearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CoordinatesReverseSearchSource.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * ICherche search result formatter factory
 * @ignore
 * @param {?} languageService
 * @return {?}
 */
function defaultCoordinatesSearchResultFormatterFactory(languageService) {
    return new CoordinatesSearchResultFormatter(languageService);
}
/**
 * Function that returns a provider for the ICherche search result formatter
 * @return {?}
 */
function provideDefaultCoordinatesSearchResultFormatter() {
    return {
        provide: CoordinatesSearchResultFormatter,
        useFactory: defaultCoordinatesSearchResultFormatterFactory,
        deps: [LanguageService]
    };
}
/**
 * CoordinatesReverse search source factory
 * @ignore
 * @param {?} config
 * @return {?}
 */
function CoordinatesReverseSearchSourceFactory(config) {
    return new CoordinatesReverseSearchSource(config.getConfig(`searchSources.${CoordinatesReverseSearchSource.id}`));
}
/**
 * Function that returns a provider for the IChercheReverse search source
 * @return {?}
 */
function provideCoordinatesReverseSearchSource() {
    return {
        provide: SearchSource,
        useFactory: CoordinatesReverseSearchSourceFactory,
        multi: true,
        deps: [ConfigService]
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const SEARCH_TYPES = [FEATURE, LAYER];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ILayerSearchResultFormatter {
    /**
     * @param {?} languageService
     */
    constructor(languageService) {
        this.languageService = languageService;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    formatResult(data) {
        /** @type {?} */
        const allowedKey = ['title', 'abstract', 'groupTitle', 'metadataUrl'];
        /** @type {?} */
        const property = Object.entries(data.properties)
            .filter((/**
         * @param {?} __0
         * @return {?}
         */
        ([key]) => allowedKey.indexOf(key) !== -1))
            .reduce((/**
         * @param {?} out
         * @param {?} entries
         * @return {?}
         */
        (out, entries) => {
            const [key, value] = entries;
            /** @type {?} */
            let newKey;
            try {
                newKey = this.languageService.translate.instant('igo.geo.search.ilayer.properties.' + key);
            }
            catch (e) {
                newKey = key;
            }
            out[newKey] = value ? value : '';
            return out;
        }), {});
        /** @type {?} */
        const dataR = Object.assign({}, data);
        dataR.properties = (/** @type {?} */ (property));
        return dataR;
    }
}
ILayerSearchResultFormatter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ILayerSearchResultFormatter.ctorParameters = () => [
    { type: LanguageService }
];
/**
 * ILayer search source
 */
class ILayerSearchSource extends SearchSource {
    /**
     * @param {?} http
     * @param {?} languageService
     * @param {?} options
     * @param {?} formatter
     */
    constructor(http, languageService, options, formatter) {
        super(options);
        this.http = http;
        this.languageService = languageService;
        this.formatter = formatter;
        this.title$ = new BehaviorSubject('');
        this.languageService.translate.get(this.options.title).subscribe((/**
         * @param {?} title
         * @return {?}
         */
        title => this.title$.next(title)));
    }
    /**
     * @return {?}
     */
    get title() {
        return this.title$.getValue();
    }
    /**
     * @return {?}
     */
    getId() {
        return ILayerSearchSource.id;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'igo.geo.search.ilayer.name',
            searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/layers/search'
        };
    }
    /**
     * Search a layer by name or keyword
     * @param {?} term Layer name or keyword
     * @param {?=} options
     * @return {?} Observable of <SearchResult<LayerOptions>[]
     */
    search(term, options) {
        /** @type {?} */
        const params = this.computeSearchRequestParams(term, options || {});
        return this.http
            .get(this.searchUrl, { params })
            .pipe(map((/**
         * @param {?} response
         * @return {?}
         */
        (response) => this.extractResults(response))));
    }
    /**
     * @private
     * @param {?} term
     * @param {?} options
     * @return {?}
     */
    computeSearchRequestParams(term, options) {
        return new HttpParams({
            fromObject: Object.assign({
                q: term
            }, this.params, options.params || {})
        });
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    extractResults(response) {
        return response.items.map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => this.dataToResult(data)));
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    dataToResult(data) {
        /** @type {?} */
        const layerOptions = this.computeLayerOptions(data);
        return {
            source: this,
            meta: {
                dataType: LAYER,
                id: [this.getId(), data.properties.id].join('.'),
                title: data.properties.title,
                titleHtml: data.highlight.title,
                icon: data.properties.type === 'Layer' ? 'layers' : 'map'
            },
            data: layerOptions
        };
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeLayerOptions(data) {
        /** @type {?} */
        const url = data.properties.url;
        /** @type {?} */
        const queryParams = this.extractQueryParamsFromSourceUrl(url);
        return {
            sourceOptions: {
                id: data.properties.id,
                crossOrigin: 'anonymous',
                type: data.properties.format,
                url,
                queryFormat: queryParams.queryFormat,
                queryHtmlTarget: queryParams.queryHtmlTarget,
                queryable: data.properties.queryable,
                params: {
                    layers: data.properties.name
                }
            },
            title: data.properties.title,
            properties: this.formatter.formatResult(data).properties
        };
    }
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    extractQueryParamsFromSourceUrl(url) {
        /** @type {?} */
        let queryFormat = QueryFormat.GML2;
        /** @type {?} */
        let queryHtmlTarget;
        /** @type {?} */
        const formatOpt = ((/** @type {?} */ (this.options))).queryFormat;
        if (formatOpt) {
            for (const key of Object.keys(formatOpt)) {
                /** @type {?} */
                const value = formatOpt[key];
                if (value === '*') {
                    queryFormat = QueryFormat[key.toUpperCase()];
                    break;
                }
                /** @type {?} */
                const urls = ((/** @type {?} */ ((/** @type {?} */ (value))))).urls;
                if (Array.isArray(urls)) {
                    urls.forEach((/**
                     * @param {?} urlOpt
                     * @return {?}
                     */
                    (urlOpt) => {
                        if (url.indexOf(urlOpt) !== -1) {
                            queryFormat = QueryFormat[key.toUpperCase()];
                        }
                    }));
                    break;
                }
            }
        }
        if (queryFormat === QueryFormat.HTML) {
            queryHtmlTarget = 'iframe';
        }
        return {
            queryFormat,
            queryHtmlTarget
        };
    }
}
ILayerSearchSource.id = 'ilayer';
ILayerSearchSource.type = LAYER;
ILayerSearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ILayerSearchSource.ctorParameters = () => [
    { type: HttpClient },
    { type: LanguageService },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] },
    { type: ILayerSearchResultFormatter, decorators: [{ type: Inject, args: [ILayerSearchResultFormatter,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * ILayer search result formatter factory
 * @ignore
 * @param {?} languageService
 * @return {?}
 */
function ilayerSearchResultFormatterFactory(languageService) {
    return new ILayerSearchResultFormatter(languageService);
}
/**
 * Function that returns a provider for the ILayer search result formatter
 * @return {?}
 */
function provideILayerSearchResultFormatter() {
    return {
        provide: ILayerSearchResultFormatter,
        useFactory: ilayerSearchResultFormatterFactory,
        deps: [LanguageService]
    };
}
/**
 * ILayer search source factory
 * @ignore
 * @param {?} http
 * @param {?} languageService
 * @param {?} config
 * @param {?} formatter
 * @return {?}
 */
function ilayerSearchSourceFactory(http, languageService, config, formatter) {
    return new ILayerSearchSource(http, languageService, config.getConfig(`searchSources.${ILayerSearchSource.id}`), formatter);
}
/**
 * Function that returns a provider for the ILayer search source
 * @return {?}
 */
function provideILayerSearchSource() {
    return {
        provide: SearchSource,
        useFactory: ilayerSearchSourceFactory,
        multi: true,
        deps: [HttpClient, LanguageService, ConfigService, ILayerSearchResultFormatter]
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Nominatim search source
 */
class NominatimSearchSource extends SearchSource {
    /**
     * @param {?} http
     * @param {?} options
     */
    constructor(http, options) {
        super(options);
        this.http = http;
    }
    /**
     * @return {?}
     */
    getId() {
        return NominatimSearchSource.id;
    }
    /*
       * Source : https://wiki.openstreetmap.org/wiki/Key:amenity
      */
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'Nominatim (OSM)',
            searchUrl: 'https://nominatim.openstreetmap.org/search',
            settings: [
                {
                    type: 'checkbox',
                    title: 'results type',
                    name: 'amenity',
                    values: [
                        {
                            title: 'Restauration',
                            value: 'bar,bbq,biergaten,cafe,drinking_water,fast_food,food_court,ice_cream,pub,restaurant',
                            enabled: false
                        },
                        {
                            title: 'Santé',
                            value: 'baby_hatch,clinic,dentist,doctors,hospital,nursing_home,pharmacy,social_facility,veterinary',
                            enabled: false
                        },
                        {
                            title: 'Divertissement',
                            value: 'arts_centre,brothel,casino,cinema,community_center_fountain,gambling,nightclub,planetarium \
                          ,public_bookcase,social_centre,stripclub,studio,swingerclub,theatre,internet_cafe',
                            enabled: false
                        },
                        {
                            title: 'Finance',
                            value: 'atm,bank,bureau_de_change',
                            enabled: false
                        }
                    ]
                },
                {
                    type: 'radiobutton',
                    title: 'results limit',
                    name: 'limit',
                    values: [
                        {
                            title: '10',
                            value: 10,
                            enabled: true
                        },
                        {
                            title: '20',
                            value: 20,
                            enabled: false
                        },
                        {
                            title: '50',
                            value: 50,
                            enabled: false
                        }
                    ]
                },
                {
                    type: 'radiobutton',
                    title: 'country limitation',
                    name: 'countrycodes',
                    values: [
                        {
                            title: 'Canada',
                            value: 'CA',
                            enabled: true
                        },
                        {
                            title: 'Le monde',
                            value: null,
                            enabled: false
                        }
                    ]
                },
                {
                    type: 'radiobutton',
                    title: 'multiple object',
                    name: 'dedupe',
                    values: [
                        {
                            title: 'Oui',
                            value: 0,
                            enabled: false
                        },
                        {
                            title: 'Non',
                            value: 1,
                            enabled: true
                        }
                    ]
                }
            ]
        };
    }
    /**
     * Search a place by name
     * @param {?} term Place name
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    search(term, options) {
        /** @type {?} */
        const params = this.computeSearchRequestParams(term, options || {});
        return this.http
            .get(this.searchUrl, { params })
            .pipe(map((/**
         * @param {?} response
         * @return {?}
         */
        (response) => this.extractResults(response))));
    }
    /**
     * @private
     * @param {?} term
     * @param {?} options
     * @return {?}
     */
    computeSearchRequestParams(term, options) {
        return new HttpParams({
            fromObject: Object.assign({
                q: this.computeTerm(term),
                format: 'json'
            }, this.params, options.params || {})
        });
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    extractResults(response) {
        return response.map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => this.dataToResult(data)));
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    dataToResult(data) {
        /** @type {?} */
        const properties = this.computeProperties(data);
        /** @type {?} */
        const geometry = this.computeGeometry(data);
        /** @type {?} */
        const extent = this.computeExtent(data);
        /** @type {?} */
        const id = [this.getId(), 'place', data.place_id].join('.');
        return {
            source: this,
            meta: {
                dataType: FEATURE,
                id,
                title: data.display_name,
                icon: 'map-marker'
            },
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry,
                extent,
                properties,
                meta: {
                    id,
                    title: data.display_name
                }
            }
        };
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeProperties(data) {
        return {
            display_name: data.display_name,
            place_id: data.place_id,
            osm_type: data.osm_type,
            class: data.class,
            type: data.type
        };
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeGeometry(data) {
        return {
            type: 'Point',
            coordinates: [parseFloat(data.lon), parseFloat(data.lat)]
        };
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeExtent(data) {
        return [
            parseFloat(data.boundingbox[2]),
            parseFloat(data.boundingbox[0]),
            parseFloat(data.boundingbox[3]),
            parseFloat(data.boundingbox[1])
        ];
    }
    /**
     * @private
     * @param {?} term
     * @return {?}
     */
    computeTerm(term) {
        term = this.computeTermTags(term);
        return term;
    }
    /**
     * Add hashtag from query in Nominatim's format (+[])
     * @private
     * @param {?} term Query with hashtag
     * @return {?}
     */
    computeTermTags(term) {
        /** @type {?} */
        const tags = term.match(/(#[^\s]+)/g);
        /** @type {?} */
        let addTagsFromSettings = true;
        if (tags) {
            tags.forEach((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                term = term.replace(value, '');
                if (super.hashtagValid(super.getSettingsValues('amenity'), value)) {
                    term += '+[' + value.substring(1) + ']';
                    addTagsFromSettings = false;
                }
            }));
            addTagsFromSettings = false;
        }
        if (addTagsFromSettings) {
            term = this.computeTermSettings(term);
        }
        return term;
    }
    /**
     * Add hashtag from settings in Nominatim's format (+[])
     * @private
     * @param {?} term Query
     * @return {?}
     */
    computeTermSettings(term) {
        this.options.settings.forEach((/**
         * @param {?} settings
         * @return {?}
         */
        settings => {
            if (settings.name === 'amenity') {
                settings.values.forEach((/**
                 * @param {?} conf
                 * @return {?}
                 */
                conf => {
                    if (conf.enabled && typeof conf.value === 'string') {
                        /** @type {?} */
                        const splitted = conf.value.split(',');
                        splitted.forEach((/**
                         * @param {?} value
                         * @return {?}
                         */
                        value => {
                            term += '+[' + value + ']';
                        }));
                    }
                }));
            }
        }));
        return term;
    }
}
NominatimSearchSource.id = 'nominatim';
NominatimSearchSource.type = FEATURE;
NominatimSearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NominatimSearchSource.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Nominatim search source factory
 * @ignore
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
function nominatimSearchSourceFactory(http, config) {
    return new NominatimSearchSource(http, config.getConfig(`searchSources.${NominatimSearchSource.id}`));
}
/**
 * Function that returns a provider for the Nominatim search source
 * @return {?}
 */
function provideNominatimSearchSource() {
    return {
        provide: SearchSource,
        useFactory: nominatimSearchSourceFactory,
        multi: true,
        deps: [HttpClient, ConfigService]
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * StoredQueries search source
 */
class StoredQueriesSearchSource extends SearchSource {
    /**
     * @param {?} http
     * @param {?} options
     */
    constructor(http, options) {
        super(options);
        this.http = http;
        this.storedQueriesOptions = (/** @type {?} */ (options));
        if (!this.storedQueriesOptions.storedquery_id) {
            /** @type {?} */
            const err = 'Stored Queries :You have to set "storedquery_id" into StoredQueries options. ex: storedquery_id: "nameofstoredquerie"';
            throw new Error(err);
        }
        if (!this.storedQueriesOptions.fields) {
            throw new Error('Stored Queries :You have to set "fields" into options. ex: fields: {"name": "rtss", "defaultValue": "-99"}');
        }
        this.storedQueriesOptions.outputformat = this.storedQueriesOptions.outputformat || 'text/xml; subtype=gml/3.1.1';
        this.storedQueriesOptions.srsname = this.storedQueriesOptions.srsname || 'EPSG:4326';
        /** @type {?} */
        const storedQueryId = this.storedQueriesOptions.storedquery_id.toLowerCase();
        if (storedQueryId.includes('getfeaturebyid') && this.storedQueriesOptions.outputformat.toLowerCase().includes('getfeaturebyid')) {
            /** @type {?} */
            let err = 'You must set a geojson format for your stored query. This is due to an openlayers issue)';
            err += ' (wfs 1.1.0 & gml 3.1.1 limitation)';
            throw new Error(err);
        }
        if (!this.storedQueriesOptions.fields) {
            throw new Error('Stored Queries :You must set a fields definition for your stored query');
        }
        if (!(this.storedQueriesOptions.fields instanceof Array)) {
            this.storedQueriesOptions.fields = [this.storedQueriesOptions.fields];
        }
        this.multipleFieldsQuery = this.storedQueriesOptions.fields.length > 1 ? true : false;
        this.storedQueriesOptions.fields.forEach((/**
         * @param {?} field
         * @param {?} index
         * @return {?}
         */
        (field, index) => {
            if (this.multipleFieldsQuery && !field.splitPrefix && index !== 0) {
                throw new Error('Stored Queries :You must set a field spliter into your field definition (optional for the first one!)');
            }
            if (!field.defaultValue) {
                throw new Error('Stored Queries :You must set a field default value into your field definition');
            }
        }));
        this.storedQueriesOptions.resultTitle = this.storedQueriesOptions.resultTitle || this.resultTitle;
    }
    /**
     * @return {?}
     */
    getId() {
        return StoredQueriesSearchSource.id;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'Stored Queries',
            searchUrl: 'https://ws.mapserver.transports.gouv.qc.ca/swtq'
        };
    }
    // URL CALL EXAMPLES:
    //  GetFeatureById (mandatory storedquery for wfs server) (outputformat must be in geojson)
    //  tslint:disable-next-line:max-line-length
    //  https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=2.0.0&request=GetFeature&storedquery_id=urn:ogc:def:query:OGC-WFS::GetFeatureById&srsname=epsg:4326&outputformat=geojson&ID=a_num_route.132
    //  Custom StoredQuery
    //  tslint:disable-next-line:max-line-length
    //  https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=1.1.0&request=GetFeature&storedquery_id=rtss&srsname=epsg:4326&outputformat=text/xml;%20subtype=gml/3.1.1&rtss=0013801110000c&chainage=12
    /**
     * Search a location by name or keyword
     * @param {?} term Location name or keyword
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    search(term, options) {
        /** @type {?} */
        const storedqueriesParams = this.termSplitter(term, this.storedQueriesOptions.fields);
        /** @type {?} */
        const params = this.computeRequestParams(options || {}, storedqueriesParams);
        if (new RegExp('.*?gml.*?', 'i').test(this.storedQueriesOptions.outputformat)) {
            return this.http
                .get(this.searchUrl, { params, responseType: 'text' })
                .pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                return this.extractResults(this.extractWFSData(response));
            })));
        }
        else {
            return this.http
                .get(this.searchUrl, { params })
                .pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                return this.extractResults(this.extractWFSData(response));
            })));
        }
    }
    /**
     * @private
     * @return {?}
     */
    getFormatFromOptions() {
        /** @type {?} */
        let olFormatCls;
        /** @type {?} */
        const outputFormat = this.storedQueriesOptions.outputformat;
        /** @type {?} */
        const patternGml3 = new RegExp('.*?gml.*?', 'i');
        /** @type {?} */
        const patternGeojson = new RegExp('.*?json.*?', 'i');
        if (patternGeojson.test(outputFormat)) {
            olFormatCls = GeoJSON;
        }
        if (patternGml3.test(outputFormat)) {
            olFormatCls = WFS;
        }
        return new olFormatCls();
    }
    /**
     * @private
     * @param {?} res
     * @return {?}
     */
    extractWFSData(res) {
        /** @type {?} */
        const olFormat = this.getFormatFromOptions();
        /** @type {?} */
        const geojson = GeoJSON;
        /** @type {?} */
        const wfsfeatures = olFormat.readFeatures(res);
        /** @type {?} */
        const features = JSON.parse(new geojson().writeFeatures(wfsfeatures));
        return features;
    }
    /**
     * @private
     * @param {?} term
     * @param {?} fields
     * @return {?}
     */
    termSplitter(term, fields) {
        /** @type {?} */
        const splittedTerm = {};
        /** @type {?} */
        let remainingTerm = term;
        /** @type {?} */
        let cnt = 0;
        // Used to build the default values
        fields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        field => {
            splittedTerm[field.name] = field.defaultValue;
            /** @type {?} */
            const splitterRegex = new RegExp(field.splitPrefix + '(.+)', 'i');
            if (splitterRegex.test(remainingTerm)) {
                cnt = field.splitPrefix ? cnt += 1 : cnt;
                remainingTerm = remainingTerm.split(splitterRegex)[1];
            }
        }));
        if (cnt === 0) {
            splittedTerm[fields[0].name] = term;
            return splittedTerm;
        }
        remainingTerm = term;
        /** @type {?} */
        const localFields = [...fields].reverse();
        localFields.forEach((/**
         * @param {?} field
         * @return {?}
         */
        (field) => {
            /** @type {?} */
            const splitterRegex = new RegExp(field.splitPrefix || '' + '(.+)', 'i');
            if (remainingTerm || remainingTerm !== '') {
                /** @type {?} */
                const values = remainingTerm.split(splitterRegex);
                remainingTerm = values[0];
                if (values[1]) {
                    splittedTerm[field.name] = values[1].trim();
                }
            }
        }));
        return splittedTerm;
    }
    /**
     * @private
     * @param {?} options
     * @param {?} queryParams
     * @return {?}
     */
    computeRequestParams(options, queryParams) {
        /** @type {?} */
        const wfsversion = this.storedQueriesOptions.storedquery_id.toLowerCase().includes('getfeaturebyid') ? '2.0.0' : '1.1.0';
        return new HttpParams({
            fromObject: Object.assign({
                service: 'wfs',
                version: wfsversion,
                request: 'GetFeature',
                storedquery_id: this.storedQueriesOptions.storedquery_id,
                srsname: this.storedQueriesOptions.srsname,
                outputformat: this.storedQueriesOptions.outputformat
            }, queryParams, this.params, options.params || {})
        });
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    extractResults(response) {
        return response.features.map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            return this.dataToResult(data);
        }));
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    dataToResult(data) {
        /** @type {?} */
        const properties = this.computeProperties(data);
        /** @type {?} */
        const id = [this.getId(), properties.type, data.id].join('.');
        /** @type {?} */
        const title = data.properties[this.storedQueriesOptions.resultTitle] ? this.storedQueriesOptions.resultTitle : this.resultTitle;
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: data.geometry,
                // extent: data.bbox,
                properties,
                meta: {
                    id,
                    title: data.properties[title]
                }
            },
            meta: {
                dataType: FEATURE,
                id,
                title: data.properties.title,
                titleHtml: data.properties[title],
                icon: 'map-marker'
            }
        };
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeProperties(data) {
        /** @type {?} */
        const properties = ObjectUtils.removeKeys(data.properties, StoredQueriesSearchSource.propertiesBlacklist);
        return properties;
    }
}
StoredQueriesSearchSource.id = 'storedqueries';
StoredQueriesSearchSource.type = FEATURE;
StoredQueriesSearchSource.propertiesBlacklist = [];
StoredQueriesSearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
StoredQueriesSearchSource.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
];
/**
 * StoredQueriesReverse search source
 */
// EXAMPLE CALLS
// tslint:disable-next-line:max-line-length
// https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=1.1.0&request=GetFeature&storedquery_id=lim_adm&srsname=epsg:4326&outputformat=text/xml;%20subtype=gml/3.1.1&long=-71.292469&lat=46.748107
//
class StoredQueriesReverseSearchSource extends SearchSource {
    /**
     * @param {?} http
     * @param {?} options
     */
    constructor(http, options) {
        super(options);
        this.http = http;
        this.storedQueriesOptions = (/** @type {?} */ (options));
        if (!this.storedQueriesOptions.storedquery_id) {
            /** @type {?} */
            const err = 'Stored Queries :You have to set "storedquery_id" into StoredQueries options. ex: storedquery_id: "nameofstoredquerie"';
            throw new Error(err);
        }
        if (!this.storedQueriesOptions.longField) {
            throw new Error('Stored Queries :You have to set "longField" to map the longitude coordinate to the query params.');
        }
        if (!this.storedQueriesOptions.latField) {
            throw new Error('Stored Queries :You have to set "latField" to map the latitude coordinate to the query params.');
        }
        this.storedQueriesOptions.outputformat = this.storedQueriesOptions.outputformat || 'text/xml; subtype=gml/3.1.1';
        this.storedQueriesOptions.srsname = this.storedQueriesOptions.srsname || 'EPSG:4326';
        this.storedQueriesOptions.resultTitle = this.storedQueriesOptions.resultTitle || this.resultTitle;
    }
    /**
     * @return {?}
     */
    getId() {
        return StoredQueriesReverseSearchSource.id;
    }
    /**
     * @protected
     * @return {?}
     */
    getDefaultOptions() {
        return {
            title: 'Stored Queries (reverse)',
            searchUrl: 'https://ws.mapserver.transports.gouv.qc.ca/swtq'
        };
    }
    /**
     * Search a location by coordinates
     * @param {?} lonLat Location coordinates
     * @param {?=} options
     * @return {?} Observable of <SearchResult<Feature>[]
     */
    reverseSearch(lonLat, options) {
        /** @type {?} */
        const params = this.computeRequestParams(lonLat, options || {});
        if (new RegExp('.*?gml.*?', 'i').test(this.storedQueriesOptions.outputformat)) {
            return this.http
                .get(this.searchUrl, { params, responseType: 'text' })
                .pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                return this.extractResults(this.extractWFSData(response));
            })));
        }
        else {
            return this.http
                .get(this.searchUrl, { params })
                .pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                return this.extractResults(this.extractWFSData(response));
            })));
        }
    }
    /**
     * @private
     * @return {?}
     */
    getFormatFromOptions() {
        /** @type {?} */
        let olFormatCls;
        /** @type {?} */
        const outputFormat = this.storedQueriesOptions.outputformat;
        /** @type {?} */
        const patternGml3 = new RegExp('.*?gml.*?', 'i');
        /** @type {?} */
        const patternGeojson = new RegExp('.*?json.*?', 'i');
        if (patternGeojson.test(outputFormat)) {
            olFormatCls = GeoJSON;
        }
        if (patternGml3.test(outputFormat)) {
            olFormatCls = WFS;
        }
        return new olFormatCls();
    }
    /**
     * @private
     * @param {?} res
     * @return {?}
     */
    extractWFSData(res) {
        /** @type {?} */
        const olFormat = this.getFormatFromOptions();
        /** @type {?} */
        const geojson = GeoJSON;
        /** @type {?} */
        const wfsfeatures = olFormat.readFeatures(res);
        /** @type {?} */
        const features = JSON.parse(new geojson().writeFeatures(wfsfeatures));
        return features;
    }
    /**
     * @private
     * @param {?} lonLat
     * @param {?=} options
     * @return {?}
     */
    computeRequestParams(lonLat, options) {
        /** @type {?} */
        const longLatParams = {};
        longLatParams[this.storedQueriesOptions.longField] = lonLat[0];
        longLatParams[this.storedQueriesOptions.latField] = lonLat[1];
        return new HttpParams({
            fromObject: Object.assign({
                service: 'wfs',
                version: '1.1.0',
                request: 'GetFeature',
                storedquery_id: this.storedQueriesOptions.storedquery_id,
                srsname: this.storedQueriesOptions.srsname,
                outputformat: this.storedQueriesOptions.outputformat,
            }, longLatParams, this.params, options.params || {})
        });
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    extractResults(response) {
        return response.features.map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            return this.dataToResult(data);
        }));
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    dataToResult(data) {
        /** @type {?} */
        const properties = this.computeProperties(data);
        /** @type {?} */
        const id = [this.getId(), properties.type, data.id].join('.');
        /** @type {?} */
        const title = data.properties[this.storedQueriesOptions.resultTitle] ? this.storedQueriesOptions.resultTitle : this.resultTitle;
        return {
            source: this,
            data: {
                type: FEATURE,
                projection: 'EPSG:4326',
                geometry: data.geometry,
                properties,
                meta: {
                    id,
                    title: data.properties[title]
                }
            },
            meta: {
                dataType: FEATURE,
                id,
                title: data.properties[title],
                icon: 'map-marker'
            }
        };
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    computeProperties(data) {
        /** @type {?} */
        const properties = ObjectUtils.removeKeys(data.properties, StoredQueriesReverseSearchSource.propertiesBlacklist);
        return Object.assign(properties, { type: data.properties.doc_type });
    }
}
StoredQueriesReverseSearchSource.id = 'storedqueriesreverse';
StoredQueriesReverseSearchSource.type = FEATURE;
StoredQueriesReverseSearchSource.propertiesBlacklist = [];
StoredQueriesReverseSearchSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
StoredQueriesReverseSearchSource.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: ['options',] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * StoredQueries search source factory
 * @ignore
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
function storedqueriesSearchSourceFactory(http, config) {
    return new StoredQueriesSearchSource(http, config.getConfig(`searchSources.${StoredQueriesSearchSource.id}`));
}
/**
 * Function that returns a provider for the StoredQueries search source
 * @return {?}
 */
function provideStoredQueriesSearchSource() {
    return {
        provide: SearchSource,
        useFactory: storedqueriesSearchSourceFactory,
        multi: true,
        deps: [HttpClient, ConfigService]
    };
}
/**
 * StoredQueriesReverse search source factory
 * @ignore
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
function storedqueriesReverseSearchSourceFactory(http, config) {
    return new StoredQueriesReverseSearchSource(http, config.getConfig(`searchSources.${StoredQueriesReverseSearchSource.id}`));
}
/**
 * Function that returns a provider for the StoredQueriesReverse search source
 * @return {?}
 */
function provideStoredQueriesReverseSearchSource() {
    return {
        provide: SearchSource,
        useFactory: storedqueriesReverseSearchSourceFactory,
        multi: true,
        deps: [HttpClient, ConfigService]
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This component allows a user to select a search type yo enable. In it's
 * current version, only one search type can be selected at once (radio). If
 * this component were to support more than one search source enabled (checkbox),
 * the searchbar component would require a small change to it's
 * placeholder getter. The search source service already supports having
 * more than one search source enabled.
 */
class SearchSelectorComponent {
    /**
     * @param {?} searchSourceService
     */
    constructor(searchSourceService) {
        this.searchSourceService = searchSourceService;
        /**
         * List of available search types
         */
        this.searchTypes = SEARCH_TYPES;
        /**
         * Event emitted when the enabled search type changes
         */
        this.change = new EventEmitter();
    }
    /**
     * Enable the first search type if the enabled input is not defined
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const initial = this.enabled || this.searchTypes[0];
        this.enableSearchType(initial);
    }
    /**
     * Enable the selected search type
     * \@internal
     * @param {?} searchType Search type
     * @return {?}
     */
    onSearchTypeChange(searchType) {
        this.enableSearchType(searchType);
    }
    /**
     * Get a search type's title. The title
     * for all availables search typers needs to be defined in the locale
     * files or an error will be thrown.
     * \@internal
     * @param {?} searchType Search type
     * @return {?}
     */
    getSearchTypeTitle(searchType) {
        return `search.${searchType.toLowerCase()}.title`;
    }
    /**
     * Emit an event and enable the search sources of the given type.
     * @private
     * @param {?} searchType Search type
     * @return {?}
     */
    enableSearchType(searchType) {
        this.enabled = searchType;
        this.searchSourceService.enableSourcesByType(searchType);
        this.change.emit(searchType);
    }
}
SearchSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-selector',
                template: "<div class=\"igo-search-selector\">\r\n  <button\r\n    mat-icon-button\r\n    class=\"igo-search-selector-button\"\r\n    color=\"primary\"\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.search.menu.tooltip' | translate\"\r\n    [matMenuTriggerFor]=\"searchSelectorMenu\">\r\n    <mat-icon svgIcon=\"menu-down\"></mat-icon>\r\n  </button>\r\n\r\n  <mat-menu\r\n    #searchSelectorMenu=\"matMenu\"\r\n    class=\"no-border-radius\"\r\n    xPosition=\"before\"\r\n    yPosition=\"above\">\r\n    <mat-radio-group\r\n      class=\"igo-search-selector-radio-group\"\r\n      [value]=\"enabled\"\r\n      (change)=\"onSearchTypeChange($event.value)\">\r\n      <mat-radio-button *ngFor=\"let searchType of searchTypes\" [value]=\"searchType\">\r\n        {{getSearchTypeTitle(searchType) | translate}}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n  </mat-menu>\r\n\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".igo-search-selector-button ::ng-deep div.mat-button-ripple-round{border-radius:0}.igo-search-selector-radio-group{display:inline-flex;flex-direction:column}.igo-search-selector-radio-group mat-radio-button{margin:5px}"]
            }] }
];
/** @nocollapse */
SearchSelectorComponent.ctorParameters = () => [
    { type: SearchSourceService }
];
SearchSelectorComponent.propDecorators = {
    searchTypes: [{ type: Input }],
    enabled: [{ type: Input }],
    change: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoSearchSelectorModule {
}
IgoSearchSelectorModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatTooltipModule,
                    MatIconModule,
                    MatButtonModule,
                    MatMenuModule,
                    MatRadioModule,
                    MatTabsModule,
                    MatCheckboxModule,
                    IgoLanguageModule
                ],
                exports: [SearchSelectorComponent],
                declarations: [SearchSelectorComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This component allows a user to select a search type yo enable. In it's
 * current version, only one search type can be selected at once (radio). If
 * this component were to support more than one search source enabled (checkbox),
 * the searchbar component would require a small change to it's
 * placeholder getter. The search source service already supports having
 * more than one search source enabled.
 */
class SearchSettingsComponent {
    /**
     * @param {?} searchSourceService
     */
    constructor(searchSourceService) {
        this.searchSourceService = searchSourceService;
        /**
         * Event emitted when the enabled search type changes
         */
        this.change = new EventEmitter();
    }
    /**
     * Get all search sources
     * \@internal
     * @return {?}
     */
    getSearchSources() {
        return this.searchSourceService.getSources();
    }
    /**
     * Triggered when a setting is checked (checkbox style)
     * \@internal
     * @param {?} event
     * @param {?} source
     * @param {?} setting
     * @param {?} settingValue
     * @return {?}
     */
    settingsValueCheckedCheckbox(event, source, setting, settingValue) {
        settingValue.enabled = event.checked;
        source.setParamFromSetting(setting);
    }
    /**
     * Triggered when a setting is checked (radiobutton style)
     * \@internal
     * @param {?} event
     * @param {?} source
     * @param {?} setting
     * @param {?} settingValue
     * @return {?}
     */
    settingsValueCheckedRadioButton(event, source, setting, settingValue) {
        setting.values.forEach((/**
         * @param {?} conf
         * @return {?}
         */
        conf => {
            if (conf.value !== settingValue.value) {
                conf.enabled = !event.source.checked;
            }
            else {
                conf.enabled = event.source.checked;
            }
        }));
        source.setParamFromSetting(setting);
    }
    /**
     * @param {?} event
     * @param {?} source
     * @return {?}
     */
    onCheckSearchSource(event, source) {
        source.enabled = event.checked;
    }
}
SearchSettingsComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-settings',
                template: "<div class=\"igo-search-settings\">\r\n\r\n  <button\r\n    mat-icon-button\r\n    class=\"igo-search-settings-button\"\r\n    color=\"primary\"\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"'igo.geo.search.menu.tooltip' | translate\"\r\n    [matMenuTriggerFor]=\"searchSettingsMenu\">\r\n    <mat-icon svgIcon=\"settings\"></mat-icon>\r\n  </button>\r\n  <mat-menu\r\n    #searchSettingsMenu=\"matMenu\"\r\n    class=\"no-border-radius\">\r\n      <ng-container *ngFor=\"let source of getSearchSources()\">\r\n        <span class=\"igo-search-settings-search-source\">\r\n          <mat-checkbox\r\n            class=\"igo-search-settings-checkbox\"\r\n            [checked]=\"source.enabled\"\r\n            [value]=\"source\"\r\n            (click)=\"$event.stopPropagation()\"\r\n            (change)=\"onCheckSearchSource($event, source)\">\r\n          </mat-checkbox>\r\n          <button *ngIf=\"source.settings.length\u00A0>\u00A00\"\r\n            [matMenuTriggerFor]=\"sub_menu\"\r\n            mat-menu-item>{{source.title}}\r\n          </button>\r\n          <button\r\n            mat-menu-item\r\n            *ngIf=\"source.settings.length\u00A0===\u00A00\">\r\n            {{source.title}}\r\n          </button>\r\n        </span>\r\n          <mat-menu #sub_menu=\"matMenu\">\r\n            <ng-container *ngFor=\"let setting of source.settings\">\r\n              <button\r\n                  mat-menu-item\r\n                  [matMenuTriggerFor]=\"test_sub_menu\">\r\n                {{'igo.geo.search.searchSources.settings.'+ setting.title | translate}}\r\n              </button>\r\n              <mat-menu #test_sub_menu=\"matMenu\"\r\n                [ngSwitch]=\"setting.type\"\r\n                yPosition=\"above\">\r\n                <span *ngSwitchCase=\"'radiobutton'\">\r\n                  <mat-radio-group\r\n                    class=\"igo-search-settings-radio-group\"\r\n                    [value]=\"setting\">\r\n                    <mat-radio-button *ngFor=\"let settingValue of setting.values\"\r\n                      [value]=\"settingValue\"\r\n                      [checked]=\"settingValue.enabled\"\r\n                      (click)=\"$event.stopPropagation()\"\r\n                      (change)=\"settingsValueCheckedRadioButton($event, source, setting, settingValue)\">\r\n                      {{settingValue.title}}\r\n                    </mat-radio-button>\r\n                  </mat-radio-group>\r\n                </span>\r\n                <span *ngSwitchCase=\"'checkbox'\">\r\n                  <mat-checkbox class=\"igo-search-settings-radio-group\"\r\n                    class=\"mat-menu-item\"\r\n                    [checked]=\"settingValue.enabled\"\r\n                    [value]=\"setting\"\r\n                    (click)=\"$event.stopPropagation()\"\r\n                    (change)=\"settingsValueCheckedCheckbox($event, source, setting, settingValue)\"\r\n                    *ngFor=\"let settingValue of setting.values\">{{settingValue.title}}\r\n                  </mat-checkbox>\r\n                </span>\r\n              </mat-menu>\r\n            </ng-container>\r\n          </mat-menu>\r\n      </ng-container>\r\n  </mat-menu>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".igo-search-settings-button ::ng-deep div.mat-button-ripple-round{border-radius:0}.igo-search-settings-radio-group{display:inline-flex;flex-direction:column}.igo-search-settings-radio-group mat-radio-button{margin:5px}.igo-search-settings-checkbox mat-radio-button{display:inline-flex}.igo-search-settings-search-source{display:inline-flex;width:100%}.igo-search-settings-search-source mat-checkbox{display:inline-flex;margin-left:5px;margin-right:5px}"]
            }] }
];
/** @nocollapse */
SearchSettingsComponent.ctorParameters = () => [
    { type: SearchSourceService }
];
SearchSettingsComponent.propDecorators = {
    change: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoSearchSettingsModule {
}
IgoSearchSettingsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SearchSettingsComponent],
                imports: [
                    CommonModule,
                    MatTooltipModule,
                    MatIconModule,
                    MatButtonModule,
                    MatMenuModule,
                    MatRadioModule,
                    MatCheckboxModule,
                    IgoLanguageModule
                ],
                exports: [SearchSettingsComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Searchbar that triggers a research in all search sources enabled.
 * If the store input is defined, the search results will be loaded
 * into that store. An event is always emitted when a research is completed.
 */
class SearchBarComponent {
    /**
     * @param {?} searchService
     */
    constructor(searchService) {
        this.searchService = searchService;
        /**
         * Invalid keys
         */
        this.invalidKeys = ['Control', 'Shift', 'Alt'];
        /**
         * Search term stream
         */
        this.stream$ = new Subject();
        /**
         * Search term
         */
        this.term = '';
        /**
         * Whether a float label should be displayed
         */
        this.floatLabel = 'never';
        /**
         * Whether this component is disabled
         */
        this.disabled = false;
        /**
         * Icons color (search and clear)
         */
        this.color = 'primary';
        /**
         * Debounce time between each keystroke
         */
        this.debounce = 300;
        /**
         * Minimum term length required to trigger a research
         */
        this.minLength = 2;
        /**
         * List of available search types
         */
        this.searchTypes = SEARCH_TYPES;
        /**
         * Event emitted when the search term changes
         */
        this.change = new EventEmitter();
        /**
         * Event emitted when a research is completed
         */
        this.search = new EventEmitter();
        /**
         * Event emitted when the search type changes
         */
        this.searchTypeChange = new EventEmitter();
        /**
         * Event emitted when the search type changes
         */
        this.clearFeature = new EventEmitter();
        this._placeholder = '';
    }
    /**
     * Host's empty class
     * \@internal
     * @return {?}
     */
    get emptyClass() {
        return this.empty;
    }
    /**
     * Whether the search bar is empty
     * \@internal
     * @return {?}
     */
    get empty() {
        return this.term.length === 0;
    }
    /**
     * Search bar palceholder
     * \@internal
     * @param {?} value
     * @return {?}
     */
    set placeholder(value) {
        this._placeholder = value;
    }
    /**
     * @return {?}
     */
    get placeholder() {
        return this.empty ? this._placeholder : '';
    }
    /**
     * Subscribe to the search term stream and trigger researches
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.stream$$ = this.stream$
            .pipe(debounce((/**
         * @param {?} term
         * @return {?}
         */
        (term) => {
            return term === '' ? EMPTY : timer(300);
        })), distinctUntilChanged())
            .subscribe((/**
         * @param {?} term
         * @return {?}
         */
        (term) => this.onTermChange(term)));
    }
    /**
     * Unsubscribe to the search term stream
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.stream$$.unsubscribe();
    }
    /**
     * When a user types, validates the key and send it into the
     * stream if it's valid
     * \@internal
     * @param {?} event Keyboard event
     * @return {?}
     */
    onKeyup(event) {
        /** @type {?} */
        const key = ((/** @type {?} */ (event.target))).value;
        if (!this.keyIsValid(key)) {
            return;
        }
        this.setTerm(key);
    }
    /**
     * Clear the stream and the input
     * \@internal
     * @return {?}
     */
    onClearButtonClick() {
        this.clear();
        this.clearFeature.emit();
    }
    /**
     * Update the placeholder with the enabled search type. The placeholder
     * for all availables search typers needs to be defined in the locale
     * files or an error will be thrown.
     * \@internal
     * @param {?} searchType Enabled search type
     * @return {?}
     */
    onSearchTypeChange(searchType) {
        this.searchTypeChange.emit(searchType);
        this.placeholder = `search.${searchType.toLowerCase()}.placeholder`;
        this.doSearch(this.term);
    }
    /**
     * Send the term into the stream only if this component is not disabled
     * @param {?} term Search term
     * @return {?}
     */
    setTerm(term) {
        if (this.disabled) {
            return;
        }
        this.term = term;
        if (term.replace(/(#[^\s]*)/g, '').trim().length >= this.minLength ||
            term.replace(/(#[^\s]*)/g, '').trim().length === 0) {
            this.stream$.next(term);
        }
    }
    /**
     * Clear the stream and the input
     * @private
     * @return {?}
     */
    clear() {
        this.term = '';
        this.stream$.next(this.term);
        this.input.nativeElement.focus();
    }
    /**
     * Validate if a given key stroke is a valid input
     * @private
     * @param {?} key
     * @return {?}
     */
    keyIsValid(key) {
        return this.invalidKeys.indexOf(key) === -1;
    }
    /**
     * When the search term changes, emit an event and trigger a
     * research in every enabled search sources.
     * @private
     * @param {?} term Search term
     * @return {?}
     */
    onTermChange(term) {
        this.change.emit(term);
        this.doSearch(term);
    }
    /**
     * Execute the search
     * @private
     * @param {?} term Search term
     * @return {?}
     */
    doSearch(term) {
        if (term === undefined || term.replace(/(#[^\s]*)/g, '').trim() === '') {
            if (this.store !== undefined) {
                this.store.clear();
            }
            return;
        }
        if (this.store !== undefined) {
            this.store.softClear();
        }
        /** @type {?} */
        const researches = this.searchService.search(term);
        researches.map((/**
         * @param {?} research
         * @return {?}
         */
        research => {
            research.request.subscribe((/**
             * @param {?} results
             * @return {?}
             */
            (results) => {
                this.onResearchCompleted(research, results);
            }));
        }));
    }
    /**
     * When a research  is completed, emit an event and update
     * the store's items.
     * @private
     * @param {?} research Research
     * @param {?} results Research results
     * @return {?}
     */
    onResearchCompleted(research, results) {
        this.search.emit({ research, results });
        if (this.store !== undefined) {
            /** @type {?} */
            const newResults = this.store.entities$.value
                .filter((/**
             * @param {?} result
             * @return {?}
             */
            result => result.source !== research.source))
                .concat(results);
            this.store.load(newResults);
        }
    }
}
SearchBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-bar',
                template: "<div class=\"igo-search-bar-container\">\r\n  <mat-form-field [floatLabel]=\"floatLabel\">\r\n    <input\r\n      #input\r\n      matInput\r\n      autocomplete=\"off\"\r\n      [ngClass]=\"{'hasSearchIcon': searchIcon}\"\r\n      [disabled]=\"disabled\"\r\n      [placeholder]=\"placeholder | translate\"\r\n      [ngModel]=\"term\"\r\n      (keyup)=\"onKeyup($event)\"\r\n      (touchend)=\"onKeyup($event)\">\r\n  </mat-form-field>\r\n\r\n  <div class=\"search-bar-buttons\">\r\n    <button\r\n      mat-icon-button\r\n      [color]=\"color\"\r\n      *ngIf=\"searchIcon !== undefined\">\r\n      <mat-icon svgIcon=\"{{searchIcon}}\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      [color]=\"color\"\r\n      (click)=\"onClearButtonClick()\"\r\n      *ngIf=\"!empty\">\r\n      <mat-icon svgIcon=\"close\"></mat-icon>\r\n    </button>\r\n\r\n    <igo-search-selector\r\n      [searchTypes]=\"searchTypes\"\r\n      (change)=\"onSearchTypeChange($event)\">\r\n    </igo-search-selector>\r\n\r\n    <igo-search-settings></igo-search-settings>\r\n  </div>\r\n\r\n\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host ::ng-deep .mat-form-field{padding:0 5px}:host ::ng-deep .mat-form-field-wrapper{margin-bottom:-1.5em}:host ::ng-deep span.mat-form-field-label-wrapper{top:-20px}:host ::ng-deep div.mat-form-field-infix{left:5px;right:5px;padding:0 0 12px!important}:host ::ng-deep div.mat-form-field-underline{display:none}.igo-search-bar-container{position:relative;width:100%;display:inline-flex;overflow:hidden}.igo-search-bar-container>mat-form-field{width:calc(100% - (2 * 40px))}:host.empty .igo-search-bar-container>mat-form-field{width:calc(100% - 40px)}.search-bar-buttons{position:relative;right:0;display:inline-flex;top:0}.search-bar-buttons>button:nth-child(2)::before{content:'';left:0;top:5px;border-right:1px solid #ddd;height:28px}igo-search-selector,igo-search-settings{background-color:#fff;top:0;border-radius:0}"]
            }] }
];
/** @nocollapse */
SearchBarComponent.ctorParameters = () => [
    { type: SearchService }
];
SearchBarComponent.propDecorators = {
    term: [{ type: Input }],
    floatLabel: [{ type: Input }],
    disabled: [{ type: Input }],
    color: [{ type: Input }],
    debounce: [{ type: Input }],
    minLength: [{ type: Input }],
    searchIcon: [{ type: Input }],
    store: [{ type: Input }],
    searchTypes: [{ type: Input }],
    change: [{ type: Output }],
    search: [{ type: Output }],
    searchTypeChange: [{ type: Output }],
    clearFeature: [{ type: Output }],
    input: [{ type: ViewChild, args: ['input',] }],
    emptyClass: [{ type: HostBinding, args: ['class.empty',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SearchUrlParamDirective {
    /**
     * @param {?} component
     * @param {?} ref
     * @param {?} route
     */
    constructor(component, ref, route) {
        this.component = component;
        this.ref = ref;
        this.route = route;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.route && this.route.options.searchKey) {
            this.route.queryParams.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            params => {
                /** @type {?} */
                const searchParams = params[(/** @type {?} */ (this.route.options.searchKey))];
                if (searchParams) {
                    this.component.setTerm(searchParams);
                    this.ref.detectChanges();
                }
            }));
        }
    }
}
SearchUrlParamDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoSearchUrlParam]'
            },] }
];
/** @nocollapse */
SearchUrlParamDirective.ctorParameters = () => [
    { type: SearchBarComponent, decorators: [{ type: Self }] },
    { type: ChangeDetectorRef },
    { type: RouteService, decorators: [{ type: Optional }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoSearchBarModule {
}
IgoSearchBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    MatTooltipModule,
                    MatIconModule,
                    MatButtonModule,
                    MatMenuModule,
                    MatRadioModule,
                    MatFormFieldModule,
                    MatInputModule,
                    IgoLanguageModule,
                    IgoSearchSelectorModule,
                    IgoSearchSettingsModule
                ],
                exports: [
                    SearchBarComponent,
                ],
                declarations: [
                    SearchBarComponent,
                    SearchUrlParamDirective
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const SearchResultMode = {
    Grouped: 'grouped',
    Flat: 'flat',
};
/**
 * List of search results with focus and selection capabilities.
 * This component is dumb and only emits events.
 */
class SearchResultsComponent {
    /**
     * @param {?} cdRef
     */
    constructor(cdRef) {
        this.cdRef = cdRef;
        /**
         * Reference to the SearchResultMode enum
         * \@internal
         */
        this.searchResultMode = SearchResultMode;
        /**
         * Search results display mode
         */
        this.mode = SearchResultMode.Grouped;
        /**
         * Event emitted when a result is focused
         */
        this.resultFocus = new EventEmitter();
        /**
         * Event emitted when a result is selected
         */
        this.resultSelect = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get results$() {
        if (this._results$ === undefined) {
            this._results$ = this.liftResults();
        }
        return this._results$;
    }
    /**
     * Bind the search results store to the watcher
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
    }
    /**
     * Unbind the search results store from the watcher
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.watcher.destroy();
    }
    /**
     * When a result is focused, update it's state in the store and emit
     * an event.
     * \@internal
     * @param {?} result Search result
     * @return {?}
     */
    onResultFocus(result) {
        this.store.state.update(result, { focused: true }, true);
        this.resultFocus.emit(result);
    }
    /**
     * Compute a group title
     * \@internal
     * @param {?} group Search results group
     * @return {?} Group title
     */
    computeGroupTitle(group) {
        /** @type {?} */
        const parts = [group.source.title];
        /** @type {?} */
        const count = group.results.length;
        if (count > 1) {
            parts.push(`(${count})`);
        }
        return parts.join(' ');
    }
    /**
     * When a result is selected, update it's state in the store and emit
     * an event. A selected result is also considered focused
     * \@internal
     * @param {?} result Search result
     * @return {?}
     */
    onResultSelect(result) {
        this.store.state.update(result, { focused: true, selected: true }, true);
        this.resultSelect.emit(result);
    }
    /**
     * Return an observable of the search results, grouped by search source
     * \@internal
     * @private
     * @return {?} Observable of grouped search results
     */
    liftResults() {
        return this.store.view.all$().pipe(debounce((/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            return results.length === 0 ? EMPTY : timer(200);
        })), map((/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            return this.groupResults(results.sort(this.sortByOrder));
        })));
    }
    /**
     * Sort the results by display order.
     * @private
     * @param {?} r1 First result
     * @param {?} r2 Second result
     * @return {?}
     */
    sortByOrder(r1, r2) {
        return r1.source.displayOrder - r2.source.displayOrder;
    }
    /**
     * Group results by search source
     * @private
     * @param {?} results Search results from all sources
     * @return {?} Search results grouped by source
     */
    groupResults(results) {
        /** @type {?} */
        const grouped = new Map();
        results.forEach((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            /** @type {?} */
            const source = result.source;
            /** @type {?} */
            let sourceResults = grouped.get(source);
            if (sourceResults === undefined) {
                sourceResults = [];
                grouped.set(source, sourceResults);
            }
            sourceResults.push(result);
        }));
        return Array.from(grouped.keys()).map((/**
         * @param {?} source
         * @return {?}
         */
        (source) => {
            return { source, results: grouped.get(source) };
        }));
    }
}
SearchResultsComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-results',
                template: "<igo-list [navigation]=\"true\">\r\n  <ng-template\r\n    #groupTemplate\r\n    ngFor let-group\r\n    [ngForOf]=\"results$ | async\">\r\n\r\n    <igo-collapsible\r\n      *ngIf=\"mode === searchResultMode.Grouped; else flatTemplate\"\r\n      [title]=\"computeGroupTitle(group)\">\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </igo-collapsible>\r\n\r\n    <ng-template #flatTemplate>\r\n      <ng-container *ngTemplateOutlet=\"storeItemTemplate; context: {results: group.results}\"></ng-container>\r\n    </ng-template>\r\n\r\n    <ng-template #storeItemTemplate let-results=\"results\">\r\n      <ng-template ngFor let-result [ngForOf]=\"results\">\r\n        <igo-search-results-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [result]=\"result\"\r\n          [focused]=\"store.state.get(result).focused\"\r\n          [selected]=\"store.state.get(result).selected\"\r\n          (focus)=\"onResultFocus(result)\"\r\n          (select)=\"onResultSelect(result)\">\r\n\r\n          <ng-container igoSearchItemToolbar\r\n            [ngTemplateOutlet]=\"templateSearchToolbar\"\r\n            [ngTemplateOutletContext]=\"{result: result}\">\r\n          </ng-container>\r\n\r\n        </igo-search-results-item>\r\n      </ng-template>\r\n    </ng-template>\r\n\r\n  </ng-template>\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
SearchResultsComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
SearchResultsComponent.propDecorators = {
    store: [{ type: Input }],
    mode: [{ type: Input }],
    resultFocus: [{ type: Output }],
    resultSelect: [{ type: Output }],
    templateSearchToolbar: [{ type: ContentChild, args: ['igoSearchItemToolbar',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Search results list item
 */
class SearchResultsItemComponent {
    constructor() { }
    /**
     * Search result title
     * \@internal
     * @return {?}
     */
    get title() {
        return getEntityTitle(this.result);
    }
    /**
     * Search result HTML title
     * \@internal
     * @return {?}
     */
    get titleHtml() {
        return getEntityTitleHtml(this.result);
    }
    /**
     * Search result icon
     * \@internal
     * @return {?}
     */
    get icon() {
        return getEntityIcon(this.result);
    }
}
SearchResultsItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-results-item',
                template: "<mat-list-item>\r\n  <mat-icon *ngIf=\"icon\" mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n  <h4 matLine *ngIf=\"titleHtml\" [innerHtml]=\"titleHtml\"></h4>\r\n  <h4 matLine *ngIf=\"!titleHtml\">{{title}}</h4>\r\n\r\n  <ng-content\r\n    select=[igoSearchItemToolbar]>\r\n  </ng-content>\r\n\r\n</mat-list-item>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["h4 :ng-deep small{color:\"#8C8C8C\"}"]
            }] }
];
/** @nocollapse */
SearchResultsItemComponent.ctorParameters = () => [];
SearchResultsItemComponent.propDecorators = {
    result: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SearchResultAddButtonComponent {
    /**
     * @param {?} layerService
     */
    constructor(layerService) {
        this.layerService = layerService;
        this._color = 'primary';
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
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        if (this.layer.meta.dataType === 'Layer') {
            this.added = this.map.layers.findIndex((/**
             * @param {?} lay
             * @return {?}
             */
            (lay) => lay.id === this.layer.data.sourceOptions.id)) !== -1;
        }
    }
    /**
     * On toggle button click, emit the added change event
     * \@internal
     * @return {?}
     */
    onToggleClick() {
        this.added ? this.remove() : this.add();
    }
    /**
     * @private
     * @return {?}
     */
    add() {
        this.added = true;
        this.addLayerToMap();
    }
    /**
     * @private
     * @return {?}
     */
    remove() {
        this.added = false;
        this.removeLayerFromMap();
    }
    /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    addLayerToMap() {
        if (this.map === undefined) {
            return;
        }
        if (this.layer.meta.dataType !== LAYER) {
            return undefined;
        }
        /** @type {?} */
        const layerOptions = ((/** @type {?} */ (this.layer))).data;
        this.layerService
            .createAsyncLayer(layerOptions)
            .subscribe((/**
         * @param {?} layer
         * @return {?}
         */
        layer => this.map.addLayer(layer)));
    }
    /**
     * Emit added change event with added = false
     * @private
     * @return {?}
     */
    removeLayerFromMap() {
        if (this.map === undefined) {
            return;
        }
        if (this.layer.meta.dataType !== LAYER) {
            return undefined;
        }
        /** @type {?} */
        const oLayer = this.map.getLayerById(this.layer.data.sourceOptions.id);
        this.map.removeLayer(oLayer);
    }
}
SearchResultAddButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-add-button',
                template: "<button\r\n*ngIf=\"layer.meta.dataType === 'Layer'\"\r\nmat-icon-button\r\ntooltip-position=\"below\"\r\nmatTooltipShowDelay=\"500\"\r\n[matTooltip]=\"(added ? 'igo.geo.catalog.layer.removeFromMap' : 'igo.geo.catalog.layer.addToMap') | translate\"\r\n[color]=\"added ? 'warn' : ''\"\r\n(click)=\"onToggleClick()\">\r\n<mat-icon [svgIcon]=\"added ? 'delete' : 'plus'\"></mat-icon>\r\n</button>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
SearchResultAddButtonComponent.ctorParameters = () => [
    { type: LayerService }
];
SearchResultAddButtonComponent.propDecorators = {
    layer: [{ type: Input }],
    added: [{ type: Input }],
    map: [{ type: Input }],
    color: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoSearchResultsModule {
}
IgoSearchResultsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatTooltipModule,
                    MatIconModule,
                    MatListModule,
                    MatButtonModule,
                    IgoCollapsibleModule,
                    IgoListModule,
                    IgoLanguageModule,
                    IgoMetadataModule,
                ],
                exports: [
                    SearchResultsComponent,
                    SearchResultAddButtonComponent
                ],
                declarations: [
                    SearchResultsComponent,
                    SearchResultsItemComponent,
                    SearchResultAddButtonComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoSearchModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoSearchModule,
            providers: [
                provideSearchSourceService(),
                provideDefaultIChercheSearchResultFormatter(),
                provideDefaultCoordinatesSearchResultFormatter(),
                provideILayerSearchResultFormatter()
            ]
        };
    }
}
IgoSearchModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoSearchBarModule,
                    IgoSearchSelectorModule,
                    IgoSearchResultsModule,
                    IgoSearchSettingsModule
                ],
                exports: [
                    IgoSearchBarModule,
                    IgoSearchSelectorModule,
                    IgoSearchResultsModule,
                    IgoSearchSettingsModule
                ],
                declarations: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ToastComponent {
    constructor() {
        this.format = new OlGeoJSON();
        this.opened = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        this.state = value ? 'expanded' : 'collapsed';
        this._expanded = value;
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
    get feature() {
        return this._feature;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set feature(value) {
        this._feature = value;
    }
    /**
     * \@internal
     * @return {?}
     */
    get title() { return getEntityTitle(this.feature); }
    /**
     * @return {?}
     */
    toggle() {
        this.expanded = !this.expanded;
        this.opened.emit(this.expanded);
    }
    /**
     * @return {?}
     */
    zoomToFeatureExtent() {
        if (this.feature.geometry) {
            /** @type {?} */
            const olFeature$$1 = this.format.readFeature(this.feature, {
                dataProjection: this.feature.projection,
                featureProjection: this.map.projection
            });
            moveToOlFeatures(this.map, [olFeature$$1], FeatureMotion.Zoom);
        }
    }
    /**
     * @param {?} action
     * @return {?}
     */
    swipe(action) {
        if (action === ToastComponent.SWIPE_ACTION.UP) {
            if (!this.expanded) {
                this.toggle();
            }
        }
        else if (action === ToastComponent.SWIPE_ACTION.DOWN) {
            if (this.expanded) {
                this.toggle();
            }
        }
    }
}
ToastComponent.SWIPE_ACTION = {
    UP: 'swipeup',
    DOWN: 'swipedown'
};
ToastComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-toast',
                template: "<igo-flexible #flex\r\n  collapsedMobile=\"51px\"\r\n  expandedMobile=\"300px\"\r\n  [state]=\"state\"\r\n  (swipeup)=\"swipe($event.type)\"\r\n  (swipedown)=\"swipe($event.type)\">\r\n\r\n  <igo-panel [title]=\"title\">\r\n    <button\r\n      mat-icon-button\r\n      panelLeftButton\r\n      (click)=\"toggle()\">\r\n      <mat-icon [svgIcon]=\"['collapsed', 'initial'].indexOf(flex.state) >= 0 ? 'arrow_upward' : 'arrow_downward'\"></mat-icon>\r\n    </button>\r\n\r\n    <button mat-icon-button panelRightButton class=\"igo-icon-button\" (click)=\"zoomToFeatureExtent()\" *ngIf=\"feature.geometry\">\r\n      <mat-icon svgIcon=\"zoom-in\"></mat-icon>\r\n    </button>\r\n\r\n    <igo-feature-details [feature]=\"feature\"></igo-feature-details>\r\n  </igo-panel>\r\n\r\n</igo-flexible>\r\n",
                styles: [":host{position:absolute;bottom:0;width:100%;max-height:calc(100% - 50px);background-color:#fff}igo-feature-details ::ng-deep table{width:100%}"]
            }] }
];
/** @nocollapse */
ToastComponent.ctorParameters = () => [];
ToastComponent.propDecorators = {
    expanded: [{ type: Input }],
    map: [{ type: Input }],
    feature: [{ type: Input }],
    opened: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoToastModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoToastModule
        };
    }
}
IgoToastModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatIconModule,
                    MatButtonModule,
                    IgoPanelModule,
                    IgoFlexibleModule,
                    IgoFeatureModule
                ],
                exports: [ToastComponent],
                declarations: [ToastComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OgcFilterComponent {
    /**
     * @param {?} cdRef
     */
    constructor(cdRef) {
        this.cdRef = cdRef;
        /**
         * Event emitted on complete
         */
        this.complete = new EventEmitter();
        /**
         * Event emitted on cancel
         */
        this.cancel = new EventEmitter();
    }
    /**
     * Implemented as part of OnUpdateInputs
     * @return {?}
     */
    onUpdateInputs() {
        this.cdRef.detectChanges();
    }
    /**
     * On close, emit the cancel event
     * @return {?}
     */
    onClose() {
        this.cancel.emit();
    }
}
OgcFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-ogc-filter',
                template: "<igo-ogc-filterable-item\r\n  [layer]=\"layer\" \r\n  [map]=\"map\" >\r\n</igo-ogc-filterable-item>\r\n\r\n<div>\r\n  <button\r\n    mat-button\r\n    type=\"button\"\r\n    (click)=\"onClose()\">\r\n    {{ 'igo.geo.workspace.ogcFilter.close' | translate }}\r\n  </button>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
OgcFilterComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
OgcFilterComponent.propDecorators = {
    layer: [{ type: Input }],
    map: [{ type: Input }],
    complete: [{ type: Output }],
    cancel: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const OgcFilterWidget = new InjectionToken('OgcFilterWidget');
/**
 * @param {?} widgetService
 * @return {?}
 */
function ogcFilterWidgetFactory(widgetService) {
    return widgetService.create(OgcFilterComponent);
}
/**
 * @return {?}
 */
function provideOgcFilterWidget() {
    return {
        provide: OgcFilterWidget,
        useFactory: ogcFilterWidgetFactory,
        deps: [WidgetService]
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoOgcFilterModule {
}
IgoOgcFilterModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatButtonModule,
                    IgoLanguageModule,
                    IgoFilterModule
                ],
                exports: [OgcFilterComponent],
                declarations: [OgcFilterComponent],
                entryComponents: [OgcFilterComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WfsWorkspace extends Workspace {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.options = options;
    }
    /**
     * @return {?}
     */
    get layer() { return this.options.layer; }
    /**
     * @return {?}
     */
    get map() { return this.options.map; }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WfsWorkspaceService {
    constructor() { }
    /**
     * @param {?} layer
     * @param {?} map
     * @return {?}
     */
    createWorkspace(layer, map$$1) {
        return new WfsWorkspace({
            id: layer.id,
            title: layer.title,
            layer,
            map: map$$1,
            entityStore: this.createFeatureStore(layer, map$$1),
            actionStore: new ActionStore([]),
            meta: {
                tableTemplate: this.createTableTemplate(layer)
            }
        });
    }
    /**
     * @private
     * @param {?} layer
     * @param {?} map
     * @return {?}
     */
    createFeatureStore(layer, map$$1) {
        /** @type {?} */
        const store = new FeatureStore([], { map: map$$1 });
        store.bindLayer(layer);
        /** @type {?} */
        const loadingStrategy = new FeatureStoreLoadingLayerStrategy({});
        /** @type {?} */
        const selectionStrategy = new FeatureStoreSelectionStrategy({
            map: map$$1,
            hitTolerance: 5
        });
        store.addStrategy(loadingStrategy, true);
        store.addStrategy(selectionStrategy, true);
        return store;
    }
    /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    createTableTemplate(layer) {
        /** @type {?} */
        const fields = layer.dataSource.options.sourceFields || [];
        /** @type {?} */
        const columns = fields.map((/**
         * @param {?} field
         * @return {?}
         */
        (field) => {
            return {
                name: `properties.${field.name}`,
                title: field.alias ? field.alias : field.name
            };
        }));
        return {
            selection: true,
            sort: true,
            columns
        };
    }
}
WfsWorkspaceService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WfsWorkspaceService.ctorParameters = () => [];
/** @nocollapse */ WfsWorkspaceService.ngInjectableDef = defineInjectable({ factory: function WfsWorkspaceService_Factory() { return new WfsWorkspaceService(); }, token: WfsWorkspaceService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WmsWorkspace extends Workspace {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.options = options;
    }
    /**
     * @return {?}
     */
    get layer() { return this.options.layer; }
    /**
     * @return {?}
     */
    get map() { return this.options.map; }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WmsWorkspaceService {
    constructor() { }
    /**
     * @param {?} layer
     * @param {?} map
     * @return {?}
     */
    createWorkspace(layer, map$$1) {
        return new WmsWorkspace({
            id: layer.id,
            title: layer.title,
            layer,
            map: map$$1,
            actionStore: new ActionStore([])
        });
    }
}
WmsWorkspaceService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WmsWorkspaceService.ctorParameters = () => [];
/** @nocollapse */ WmsWorkspaceService.ngInjectableDef = defineInjectable({ factory: function WmsWorkspaceService_Factory() { return new WmsWorkspaceService(); }, token: WmsWorkspaceService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WorkspaceSelectorDirective {
    /**
     * @param {?} component
     * @param {?} wfsWorkspaceService
     * @param {?} wmsWorkspaceService
     */
    constructor(component, wfsWorkspaceService, wmsWorkspaceService) {
        this.component = component;
        this.wfsWorkspaceService = wfsWorkspaceService;
        this.wmsWorkspaceService = wmsWorkspaceService;
    }
    /**
     * @return {?}
     */
    get workspaceStore() {
        return this.component.store;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.layers$$ = this.map.layers$
            .pipe(debounceTime(50))
            .subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        (layers) => this.onLayersChange(layers)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.layers$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    onLayersChange(layers) {
        /** @type {?} */
        const editableLayers = layers.filter((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => this.layerIsEditable(layer)));
        /** @type {?} */
        const editableLayersIds = editableLayers.map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer.id));
        /** @type {?} */
        const workspacesToAdd = editableLayers
            .map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => this.getOrCreateWorkspace(layer)))
            .filter((/**
         * @param {?} workspace
         * @return {?}
         */
        (workspace) => workspace !== undefined));
        /** @type {?} */
        const workspacesToRemove = this.workspaceStore.all()
            .filter((/**
         * @param {?} workspace
         * @return {?}
         */
        (workspace) => {
            return editableLayersIds.indexOf(workspace.id) < 0;
        }));
        if (workspacesToRemove.length > 0) {
            workspacesToRemove.forEach((/**
             * @param {?} workspace
             * @return {?}
             */
            (workspace) => {
                workspace.deactivate();
            }));
            this.workspaceStore.state.updateMany(workspacesToRemove, { active: false, selected: false });
            this.workspaceStore.deleteMany(workspacesToRemove);
        }
        if (workspacesToAdd.length > 0) {
            this.workspaceStore.insertMany(workspacesToAdd);
        }
    }
    /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    getOrCreateWorkspace(layer) {
        /** @type {?} */
        const workspace = this.workspaceStore.get(layer.id);
        if (workspace !== undefined) {
            return;
        }
        if (layer.dataSource instanceof WFSDataSource) {
            return this.wfsWorkspaceService.createWorkspace((/** @type {?} */ (layer)), this.map);
        }
        else if (layer.dataSource instanceof WMSDataSource) {
            return this.wmsWorkspaceService.createWorkspace((/** @type {?} */ (layer)), this.map);
        }
        return;
    }
    /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    layerIsEditable(layer) {
        /** @type {?} */
        const dataSource = layer.dataSource;
        if (dataSource instanceof WFSDataSource) {
            return true;
        }
        if (dataSource instanceof WMSDataSource) {
            /** @type {?} */
            const dataSourceOptions = (/** @type {?} */ ((dataSource.options ||
                {})));
            return (dataSourceOptions.ogcFilters && dataSourceOptions.ogcFilters.enabled);
        }
        return false;
    }
}
WorkspaceSelectorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoWorkspaceSelector]'
            },] }
];
/** @nocollapse */
WorkspaceSelectorDirective.ctorParameters = () => [
    { type: WorkspaceSelectorComponent },
    { type: WfsWorkspaceService },
    { type: WmsWorkspaceService }
];
WorkspaceSelectorDirective.propDecorators = {
    map: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @ignore
 */
class IgoWorkspaceSelectorModule {
}
IgoWorkspaceSelectorModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    WorkspaceSelectorDirective
                ],
                declarations: [
                    WorkspaceSelectorDirective
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoGeoWorkspaceModule {
}
IgoGeoWorkspaceModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoWidgetModule,
                    IgoWorkspaceSelectorModule,
                    IgoOgcFilterModule
                ],
                exports: [
                    IgoWorkspaceSelectorModule,
                    IgoOgcFilterModule
                ],
                declarations: [],
                providers: [
                    provideOgcFilterWidget()
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoWktModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoWktModule,
            providers: []
        };
    }
}
IgoWktModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [],
                declarations: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoGeoModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoGeoModule,
            providers: []
        };
    }
}
IgoGeoModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [],
                exports: [
                    IgoCatalogModule,
                    IgoDataSourceModule,
                    IgoDownloadModule,
                    IgoFeatureModule,
                    IgoFilterModule,
                    IgoGeometryModule,
                    IgoImportExportModule,
                    IgoLayerModule,
                    IgoMapModule,
                    IgoMeasureModule,
                    IgoMetadataModule,
                    IgoOverlayModule,
                    IgoPrintModule,
                    IgoQueryModule,
                    IgoRoutingModule,
                    IgoSearchModule,
                    IgoToastModule,
                    IgoGeoWorkspaceModule,
                    IgoWktModule
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const RoutingFormat = {
    GeoJSON: 0,
    JSON: 1,
};
RoutingFormat[RoutingFormat.GeoJSON] = 'GeoJSON';
RoutingFormat[RoutingFormat.JSON] = 'JSON';
/** @enum {string} */
const SourceRoutingType = {
    Route: 'Route',
    Trip: 'Trip',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OsrmRoutingSource extends RoutingSource {
    /**
     * @param {?} http
     * @param {?} config
     */
    constructor(http, config) {
        super();
        this.http = http;
        this.config = config;
        this.routingUrl = 'https://geoegl.msp.gouv.qc.ca/services/itineraire/route/v1/driving/';
        this.options = this.config.getConfig('routingSources.osrm') || {};
        this.routingUrl = this.options.url || this.routingUrl;
    }
    /**
     * @return {?}
     */
    get enabled() {
        return this.options.enabled !== false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set enabled(value) {
        this.options.enabled = value;
    }
    /**
     * @return {?}
     */
    getName() {
        return OsrmRoutingSource._name;
    }
    /**
     * @param {?} coordinates
     * @return {?}
     */
    route(coordinates) {
        /** @type {?} */
        const routingParams = this.getRouteParams();
        return this.http
            .get(this.routingUrl + coordinates.join(';'), {
            params: routingParams
        })
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => this.extractRoutesData(res))));
    }
    /**
     * @private
     * @param {?} response
     * @return {?}
     */
    extractRoutesData(response) {
        /** @type {?} */
        const routeResponse = [];
        response.routes.forEach((/**
         * @param {?} route
         * @return {?}
         */
        route => {
            routeResponse.push(this.formatRoute(route, response.waypoints));
        }));
        return routeResponse;
    }
    /**
     * @private
     * @return {?}
     */
    getRouteParams() {
        return new HttpParams({
            fromObject: {
                overview: 'full',
                steps: 'true',
                geometries: 'geojson',
                alternatives: 'true'
            }
        });
    }
    /**
     * @private
     * @param {?} roadNetworkRoute
     * @param {?} waypoints
     * @return {?}
     */
    formatRoute(roadNetworkRoute, waypoints) {
        /** @type {?} */
        const stepsUI = [];
        roadNetworkRoute.legs.forEach((/**
         * @param {?} leg
         * @return {?}
         */
        leg => {
            leg.steps.forEach((/**
             * @param {?} step
             * @return {?}
             */
            step => {
                stepsUI.push(step);
            }));
        }));
        return {
            id: uuid(),
            title: roadNetworkRoute.legs[0].summary,
            source: OsrmRoutingSource._name,
            sourceType: SourceRoutingType.Route,
            order: 1,
            format: RoutingFormat.GeoJSON,
            icon: 'directions',
            projection: 'EPSG:4326',
            waypoints,
            distance: roadNetworkRoute.distance,
            duration: roadNetworkRoute.duration,
            geometry: roadNetworkRoute.geometry,
            legs: roadNetworkRoute.legs,
            steps: stepsUI,
            weight: roadNetworkRoute.weight,
            weight_name: roadNetworkRoute.weight_name
        };
    }
}
OsrmRoutingSource._name = 'OSRM Québec';
OsrmRoutingSource.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OsrmRoutingSource.ctorParameters = () => [
    { type: HttpClient },
    { type: ConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
function osrmRoutingSourcesFactory(http, config) {
    return new OsrmRoutingSource(http, config);
}
/**
 * @return {?}
 */
function provideOsrmRoutingSource() {
    return {
        provide: RoutingSource,
        useFactory: osrmRoutingSourcesFactory,
        multi: true,
        deps: [HttpClient, ConfigService]
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { IgoGeoModule, IgoCatalogModule, IgoCatalogBrowserModule, IgoCatalogLibraryModule, IgoDataSourceModule, IgoDownloadModule, IgoGeoWorkspaceModule, IgoWorkspaceSelectorModule, IgoOgcFilterModule, IgoFeatureModule, IgoFeatureFormModule, IgoFeatureDetailsModule, IgoFilterModule, IgoGeometryModule, IgoGeometryFormFieldModule, IgoImportExportModule, IgoLayerModule, IgoMapModule, IgoMeasureModule, IgoMeasurerModule, IgoMetadataModule, IgoOverlayModule, IgoPrintModule, IgoQueryModule, IgoRoutingModule, IgoSearchModule, IgoSearchBarModule, IgoSearchResultsModule, IgoToastModule, IgoWktModule, querySearchSourceFactory, provideQuerySearchSource, defaultIChercheSearchResultFormatterFactory, provideDefaultIChercheSearchResultFormatter, ichercheSearchSourceFactory, provideIChercheSearchSource, ichercheReverseSearchSourceFactory, provideIChercheReverseSearchSource, defaultCoordinatesSearchResultFormatterFactory, provideDefaultCoordinatesSearchResultFormatter, CoordinatesReverseSearchSourceFactory, provideCoordinatesReverseSearchSource, ilayerSearchResultFormatterFactory, provideILayerSearchResultFormatter, ilayerSearchSourceFactory, provideILayerSearchSource, nominatimSearchSourceFactory, provideNominatimSearchSource, storedqueriesSearchSourceFactory, provideStoredQueriesSearchSource, storedqueriesReverseSearchSourceFactory, provideStoredQueriesReverseSearchSource, osrmRoutingSourcesFactory, provideOsrmRoutingSource, routingSourceServiceFactory, provideRoutingSourceService, RoutingSourceService, CatalogService, CatalogItemType, CatalogBrowserComponent, CatalogLibaryComponent, DataService, DataSource, FeatureDataSource, OSMDataSource, XYZDataSource, WFSDataSource, WFSService, WMSDataSource, formatWFSQueryString, checkWfsParams, defaultEpsg, defaultMaxFeatures, defaultWfsVersion, defaultFieldNameGeometry, gmlRegex, jsonRegex, WMTSDataSource, CartoDataSource, ArcGISRestDataSource, TileArcGISRestDataSource, WebSocketDataSource, MVTDataSource, ClusterDataSource, DataSourceService, CapabilitiesService, EsriStyleGenerator, generateIdFromSourceOptions, generateWMSIdFromSourceOptions, generateWMTSIdFromSourceOptions, generateXYZIdFromSourceOptions, generateFeatureIdFromSourceOptions, generateId, createDefaultTileGrid, DownloadService, DownloadButtonComponent, FEATURE, FeatureMotion, featureToOl, featureFromOl, computeOlFeatureExtent, computeOlFeaturesExtent, scaleExtent, featuresAreOutOfView, featuresAreTooDeepInView, moveToOlFeatures, hideOlFeature, tryBindStoreLayer, tryAddLoadingStrategy, tryAddSelectionStrategy, FeatureStore, FeatureStoreLoadingStrategy, FeatureStoreLoadingLayerStrategy, FeatureStoreSelectionStrategy, FeatureStoreStrategy, FilterableDataSourcePipe, TimeFilterService, OgcFilterOperatorType, OGCFilterService, OgcFilterWriter, TimeFilterFormComponent, TimeFilterItemComponent, TimeFilterListComponent, TimeFilterListBindingDirective, OgcFilterableFormComponent, OgcFilterableItemComponent, OgcFilterableListComponent, OgcFilterableListBindingDirective, OgcFilterFormComponent, OgcFilterToggleButtonComponent, OgcFilterButtonComponent, GeometrySliceError, GeometrySliceMultiPolygonError, GeometrySliceLineStringError, GeometrySliceTooManyIntersectionError, createDrawInteractionStyle, createDrawHoleInteractionStyle, sliceOlGeometry, sliceOlLineString, sliceOlPolygon, addLinearRingToOlPolygon, DrawControl, ModifyControl, SliceControl, DropGeoFileDirective, ExportError, ExportInvalidFileError, ExportNothingToExportError, ExportService, ExportFormat, exportToCSV, entitiesToRowData, downloadContent, handleFileExportError, handleNothingToExportError, ImportError, ImportInvalidFileError, ImportUnreadableFileError, ImportNothingToImportError, ImportService, addLayerAndFeaturesToMap, handleFileImportSuccess, handleFileImportError, handleNothingToImportError, getFileExtension, computeLayerTitleFromFile, ImportExportComponent, LayerService, LAYER, Layer, TooltipType, ImageLayer, TileLayer, VectorLayer, VectorTileLayer, StyleService, LayerItemComponent, LayerLegendComponent, LayerListComponent, LayerListBindingDirective, LayerListControlsEnum, LayerListService, ImageWatcher, TileWatcher, VectorWatcher, getLayersLegends, IgoMap, MapViewAction, MapService, stringToLonLat, viewStatesAreEqual, formatScale, getResolutionFromScale, getScaleFromResolution, ctrlKeyDown, MapOfflineDirective, ProjectionService, MapController, MapViewController, MapBrowserComponent, ZoomButtonComponent, GeolocateButtonComponent, BaseLayersSwitcherComponent, MiniBaseMapComponent, RotationButtonComponent, MEASURE_UNIT_AUTO, MeasureType, MeasureLengthUnit, MeasureLengthUnitAbbreviation, MeasureAreaUnit, MeasureAreaUnitAbbreviation, metersToKilometers, metersToFeet, metersToMiles, squareMetersToSquareKilometers, squareMetersToSquareMiles, squareMetersToSquareFeet, squareMetersToHectares, squareMetersToAcres, metersToUnit, squareMetersToUnit, formatMeasure, computeBestLengthUnit, computeBestAreaUnit, createMeasureInteractionStyle, createMeasureLayerStyle, measureOlGeometryLength, measureOlGeometryArea, measureOlGeometry, updateOlGeometryMidpoints, clearOlGeometryMidpoints, updateOlTooltipsAtMidpoints, getOlTooltipsAtMidpoints, updateOlGeometryCenter, updateOlTooltipAtCenter, getOlTooltipAtCenter, getTooltipsOfOlGeometry, createOlTooltipAtPoint, MeasurerComponent, MeasureFormatPipe, MetadataService, MetadataButtonComponent, Overlay, OverlayDirective, OverlayService, OverlayAction, createOverlayLayer, createOverlayMarkerStyle, PrintService, PrintOutputFormat, PrintPaperFormat, PrintOrientation, PrintResolution, PrintSaveImageFormat, PrintComponent, PrintFormComponent, QueryService, QueryDirective, QueryFormat, QueryHtmlTarget, layerIsQueryable, olLayerIsQueryable, QuerySearchSource, RoutingService, RoutingFormat, SourceRoutingType, RoutingSource, OsrmRoutingSource, RoutingFormComponent, RoutingFormBindingDirective, RoutingFormService, SEARCH_TYPES, SearchService, SearchSourceService, sourceCanSearch, sourceCanReverseSearch, featureToSearchResult, SearchSource, IChercheSearchResultFormatter, IChercheSearchSource, IChercheReverseSearchSource, ILayerSearchResultFormatter, ILayerSearchSource, NominatimSearchSource, StoredQueriesSearchSource, StoredQueriesReverseSearchSource, CoordinatesSearchResultFormatter, CoordinatesReverseSearchSource, ToastComponent, GoogleLinks, WktService, CatalogBrowserGroupComponent as ɵj, CatalogBrowserLayerComponent as ɵk, CatalogBrowserComponent as ɵc, CatalogLibaryItemComponent as ɵm, CatalogLibaryComponent as ɵl, CapabilitiesService as ɵg, DataSourceService as ɵf, DataService as ɵi, WFSService as ɵh, DownloadButtonComponent as ɵn, DownloadService as ɵo, FeatureDetailsComponent as ɵp, FeatureFormComponent as ɵr, OgcFilterButtonComponent as ɵba, OgcFilterFormComponent as ɵy, OgcFilterToggleButtonComponent as ɵbb, OgcFilterableFormComponent as ɵbd, OgcFilterableItemComponent as ɵbe, OgcFilterableListBindingDirective as ɵbg, OgcFilterableListComponent as ɵbf, FilterableDataSourcePipe as ɵs, OGCFilterService as ɵbc, TimeFilterService as ɵv, TimeFilterFormComponent as ɵt, TimeFilterItemComponent as ɵu, TimeFilterListBindingDirective as ɵx, TimeFilterListComponent as ɵw, GeometryFormFieldInputComponent as ɵbi, GeometryFormFieldComponent as ɵbh, ImportExportComponent as ɵbj, DropGeoFileDirective as ɵbm, ExportService as ɵbl, ImportService as ɵbk, LayerItemComponent as ɵbo, LayerLegendComponent as ɵbp, LayerListBindingDirective as ɵbs, LayerListComponent as ɵbq, LayerListService as ɵbr, LayerService as ɵd, StyleService as ɵe, baseLayersSwitcherSlideInOut as ɵbx, BaseLayersSwitcherComponent as ɵbw, MiniBaseMapComponent as ɵby, GeolocateButtonComponent as ɵbu, MapBrowserComponent as ɵbn, RotationButtonComponent as ɵbv, MapService as ɵq, MapOfflineDirective as ɵbz, ZoomButtonComponent as ɵbt, MeasureFormatPipe as ɵca, MeasurerDialogComponent as ɵcd, MeasurerItemComponent as ɵcb, MeasurerComponent as ɵcc, MetadataButtonComponent as ɵa, MetadataService as ɵb, OverlayDirective as ɵcf, OverlayService as ɵcg, PrintFormComponent as ɵcj, PrintComponent as ɵch, PrintService as ɵci, QuerySearchSource as ɵco, QueryDirective as ɵck, QueryService as ɵcl, RoutingFormBindingDirective as ɵcv, RoutingFormComponent as ɵcp, RoutingFormService as ɵcu, OsrmRoutingSource as ɵeb, RoutingSource as ɵcr, RoutingService as ɵcq, SearchBarComponent as ɵda, SearchUrlParamDirective as ɵdb, SearchResultAddButtonComponent as ɵdd, SearchResultsItemComponent as ɵde, SearchResultsComponent as ɵdc, SearchSelectorComponent as ɵcx, IgoSearchSelectorModule as ɵcw, SearchSettingsComponent as ɵcz, IgoSearchSettingsModule as ɵcy, provideILayerSearchResultFormatter as ɵdm, provideSearchSourceService as ɵdg, searchSourceServiceFactory as ɵdf, SearchSourceService as ɵct, SearchService as ɵcs, CoordinatesReverseSearchSource as ɵdl, CoordinatesSearchResultFormatter as ɵdk, IChercheReverseSearchSource as ɵdj, IChercheSearchResultFormatter as ɵdh, IChercheSearchSource as ɵdi, ILayerSearchResultFormatter as ɵdv, ILayerSearchSource as ɵdw, NominatimSearchSource as ɵdy, SearchSource as ɵcm, StoredQueriesReverseSearchSource as ɵea, StoredQueriesSearchSource as ɵdz, ToastComponent as ɵdn, WktService as ɵz, WfsWorkspaceService as ɵdp, WmsWorkspaceService as ɵdq, OgcFilterComponent as ɵdr, OgcFilterWidget as ɵds, ogcFilterWidgetFactory as ɵdt, provideOgcFilterWidget as ɵdu, WorkspaceSelectorDirective as ɵdo };

//# sourceMappingURL=igo2-geo.js.map