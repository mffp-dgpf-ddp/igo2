webpackJsonp([1,5],{

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_translate__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__backdrop_backdrop_component__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__flex_flex_component__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sidenav_sidenav_component__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__panel_panel_component__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__collapsible_collapsible_component__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__list_list_component__ = __webpack_require__(721);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__list_list_item_directive__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__directives_clickout_directive__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pipes_keyvalue_pipe__ = __webpack_require__(723);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var SharedModule = SharedModule_1 = (function () {
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: []
        };
    };
    return SharedModule;
}());
SharedModule = SharedModule_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_5_ng2_translate__["b" /* TranslateModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["g" /* JsonpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["MaterialModule"]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__backdrop_backdrop_component__["a" /* BackdropComponent */],
            __WEBPACK_IMPORTED_MODULE_7__flex_flex_component__["a" /* FlexComponent */],
            __WEBPACK_IMPORTED_MODULE_8__sidenav_sidenav_component__["a" /* SidenavComponent */],
            __WEBPACK_IMPORTED_MODULE_9__panel_panel_component__["a" /* PanelComponent */],
            __WEBPACK_IMPORTED_MODULE_10__collapsible_collapsible_component__["a" /* CollapsibleComponent */],
            __WEBPACK_IMPORTED_MODULE_11__list_list_component__["a" /* ListComponent */],
            __WEBPACK_IMPORTED_MODULE_12__list_list_item_directive__["a" /* ListItemDirective */],
            __WEBPACK_IMPORTED_MODULE_13__directives_clickout_directive__["a" /* ClickoutDirective */],
            __WEBPACK_IMPORTED_MODULE_14__pipes_keyvalue_pipe__["a" /* KeyvaluePipe */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_5_ng2_translate__["b" /* TranslateModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["MaterialModule"],
            __WEBPACK_IMPORTED_MODULE_6__backdrop_backdrop_component__["a" /* BackdropComponent */],
            __WEBPACK_IMPORTED_MODULE_7__flex_flex_component__["a" /* FlexComponent */],
            __WEBPACK_IMPORTED_MODULE_8__sidenav_sidenav_component__["a" /* SidenavComponent */],
            __WEBPACK_IMPORTED_MODULE_9__panel_panel_component__["a" /* PanelComponent */],
            __WEBPACK_IMPORTED_MODULE_10__collapsible_collapsible_component__["a" /* CollapsibleComponent */],
            __WEBPACK_IMPORTED_MODULE_11__list_list_component__["a" /* ListComponent */],
            __WEBPACK_IMPORTED_MODULE_12__list_list_item_directive__["a" /* ListItemDirective */],
            __WEBPACK_IMPORTED_MODULE_13__directives_clickout_directive__["a" /* ClickoutDirective */],
            __WEBPACK_IMPORTED_MODULE_14__pipes_keyvalue_pipe__["a" /* KeyvaluePipe */]
        ]
    })
], SharedModule);

var SharedModule_1;
//# sourceMappingURL=/srv/apps/igo/src/shared.module.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ToolService = ToolService_1 = (function () {
    function ToolService() {
    }
    ToolService.register = function (cls) {
        var tool = {
            name: cls.name_,
            title: cls.title,
            icon: cls.icon
        };
        ToolService_1.tools.push(tool);
        ToolService_1.toolClasses.push(cls);
    };
    ToolService.prototype.getTool = function (name) {
        return ToolService_1.tools.find(function (t) { return t.name === name; });
    };
    ToolService.prototype.getToolClass = function (name) {
        return ToolService_1.toolClasses.find(function (t) { return t.name_ === name; });
    };
    return ToolService;
}());
ToolService.toolClasses = [];
ToolService.tools = [];
ToolService = ToolService_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], ToolService);

var ToolService_1;
//# sourceMappingURL=/srv/apps/igo/src/tool.service.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Layer; });
var Layer = (function () {
    function Layer(options, capabilities) {
        this.name = options.name;
        this.type = options.type;
        this.olLayer = this.createOlLayer(options, capabilities);
    }
    Layer.prototype.getSource = function () {
        return this.olLayer.getSource();
    };
    return Layer;
}());

//# sourceMappingURL=/srv/apps/igo/src/layer.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchSource; });
var SearchSource = (function () {
    function SearchSource() {
    }
    return SearchSource;
}());

//# sourceMappingURL=/srv/apps/igo/src/search-source.js.map

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_translate__ = __webpack_require__(188);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LanguageService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LanguageService = (function () {
    function LanguageService(translate) {
        this.translate = translate;
        translate.setDefaultLang('en');
        var browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }
    return LanguageService;
}());
LanguageService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_translate__["e" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_translate__["e" /* TranslateService */]) === "function" && _a || Object])
], LanguageService);

var _a;
//# sourceMappingURL=/srv/apps/igo/src/language.service.js.map

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__map_shared_map__ = __webpack_require__(450);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MapService = (function () {
    function MapService() {
    }
    MapService.prototype.getMap = function () {
        if (!this.map) {
            this.map = new __WEBPACK_IMPORTED_MODULE_1__map_shared_map__["a" /* NgMap */]();
        }
        return this.map;
    };
    return MapService;
}());
MapService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], MapService);

//# sourceMappingURL=/srv/apps/igo/src/map.service.js.map

/***/ }),

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MediaService = (function () {
    function MediaService(store) {
        var _this = this;
        this.store = store;
        this.setMedia();
        window.addEventListener('resize', function (event) {
            _this.setMedia();
        });
    }
    MediaService.prototype.getMedia = function () {
        var width = window.innerWidth;
        var media = 'desktop';
        if (width <= 500) {
            media = 'mobile';
        }
        else if (width <= 800) {
            media = 'tablet';
        }
        return media;
    };
    MediaService.prototype.setMedia = function () {
        var media = this.getMedia();
        if (media !== this.media) {
            this.store.dispatch({ type: 'SET_MEDIA', payload: media });
        }
    };
    return MediaService;
}());
MediaService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === "function" && _a || Object])
], MediaService);

var _a;
//# sourceMappingURL=/srv/apps/igo/src/media.service.js.map

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchSourceService; });
var SearchSourceService = (function () {
    function SearchSourceService(sources) {
        this.sources = sources;
    }
    SearchSourceService.prototype.getSources = function () {
        return this.sources;
    };
    return SearchSourceService;
}());

//# sourceMappingURL=/srv/apps/igo/src/search-source.service.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_source_service__ = __webpack_require__(447);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SearchService = (function () {
    function SearchService(store, searchSourceService) {
        this.store = store;
        this.searchSourceService = searchSourceService;
        this.subscriptions = [];
    }
    SearchService.prototype.search = function (term) {
        var _this = this;
        var sources = this.searchSourceService.getSources();
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe; });
        this.subscriptions = sources.map(function (source) {
            return _this.searchSource(source, term);
        });
    };
    SearchService.prototype.searchSource = function (source, term) {
        var _this = this;
        return source.search(term)
            .catch(this.handleError)
            .subscribe(function (results) {
            return _this.handleSearchResults(results, source);
        });
    };
    SearchService.prototype.clear = function (term) {
        this.store.dispatch({ type: 'CLEAR_SEARCH_RESULTS' });
    };
    SearchService.prototype.handleSearchResults = function (results, source) {
        this.store.dispatch({
            type: 'UPDATE_SEARCH_RESULTS',
            payload: {
                results: results,
                source: source.getName()
            }
        });
    };
    SearchService.prototype.handleError = function (error) {
        // TODO: use a remote logging infrastructure
        var errorMessage;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errorMessage = "\n        " + error.status + " -\n        " + (error.statusText || '') + "\n        " + (err || '');
        }
        else {
            errorMessage = error.message ? error.message : error.toString();
        }
        console.log(errorMessage);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(errorMessage);
    };
    return SearchService;
}());
SearchService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__search_source_service__["a" /* SearchSourceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__search_source_service__["a" /* SearchSourceService */]) === "function" && _b || Object])
], SearchService);

var _a, _b;
//# sourceMappingURL=/srv/apps/igo/src/search.service.js.map

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layer__ = __webpack_require__(178);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VectorLayer; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var VectorLayer = (function (_super) {
    __extends(VectorLayer, _super);
    function VectorLayer(options) {
        return _super.call(this, options) || this;
    }
    VectorLayer.prototype.createOlLayer = function (options) {
        var olLayerOptions = Object.assign(options.view || {}, {
            style: new ol.style.Style(options.style),
            source: new ol.source.Vector(options.source)
        });
        return new ol.layer.Vector(olLayerOptions);
    };
    return VectorLayer;
}(__WEBPACK_IMPORTED_MODULE_0__layer__["a" /* Layer */]));

//# sourceMappingURL=/srv/apps/igo/src/layer-vector.js.map

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layers_layer_vector__ = __webpack_require__(449);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgMap; });

var NgMap = (function () {
    function NgMap() {
        this.layers = [];
        this.olMap = new ol.Map({
            controls: [
                new ol.control.Attribution()
            ]
        });
        this.overlayStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: [0, 161, 222, 1],
                width: 3
            }),
            fill: new ol.style.Fill({
                color: [0, 161, 222, 0.1]
            })
        });
        this.overlayMarkerStyle = new ol.style.Style({
            text: new ol.style.Text({
                text: 'place',
                font: 'normal 36px Material Icons',
                textBaseline: 'Bottom',
                fill: new ol.style.Fill({
                    color: [0, 161, 222, 1]
                }),
                stroke: new ol.style.Stroke({
                    color: [255, 255, 255, 1],
                    width: 2
                })
            })
        });
        this.overlayLayer = new __WEBPACK_IMPORTED_MODULE_0__layers_layer_vector__["a" /* VectorLayer */]({
            name: 'Overlay',
            type: 'vector'
        });
        this.overlaySource = this.overlayLayer.getSource();
        this.olMap.addLayer(this.overlayLayer.olLayer);
        this.overlayLayer.olLayer.setZIndex(999);
    }
    NgMap.prototype.getProjection = function () {
        return this.olMap.getView().getProjection().getCode();
    };
    NgMap.prototype.updateView = function (options) {
        var currentView = this.olMap.getView();
        var viewOptions = Object.assign({
            zoom: currentView.getZoom()
        }, currentView.getProperties());
        var view = new ol.View(Object.assign(viewOptions, options));
        this.olMap.setView(view);
        if (options && options.center) {
            var center = ol.proj.fromLonLat(options.center, this.getProjection());
            view.setCenter(center);
        }
    };
    NgMap.prototype.zoomIn = function () {
        this.zoomTo(this.olMap.getView().getZoom() + 1);
    };
    NgMap.prototype.zoomOut = function () {
        this.zoomTo(this.olMap.getView().getZoom() - 1);
    };
    NgMap.prototype.zoomTo = function (zoom) {
        this.olMap.getView().animate({
            zoom: zoom,
            duration: 250,
            easing: ol.easing.easeOut
        });
    };
    NgMap.prototype.addLayer = function (layer) {
        this.layers.push(layer);
        this.olMap.addLayer(layer.olLayer);
    };
    NgMap.prototype.moveToExtent = function (extent) {
        var view = this.olMap.getView();
        view.fit(extent, this.olMap.getSize(), {
            maxZoom: view.getZoom()
        });
    };
    NgMap.prototype.moveToFeature = function (feature) {
        this.moveToExtent(feature.getGeometry().getExtent());
    };
    NgMap.prototype.zoomToExtent = function (extent) {
        var view = this.olMap.getView();
        view.fit(extent, this.olMap.getSize(), {
            maxZoom: 17
        });
    };
    NgMap.prototype.zoomToFeature = function (feature) {
        this.zoomToExtent(feature.getGeometry().getExtent());
    };
    NgMap.prototype.addMarker = function (feature) {
        var geometry = feature.getGeometry();
        var geometryType = geometry.getType();
        var marker;
        if (geometryType === 'Point') {
            marker = feature;
        }
        else {
            var centroid = ol.extent.getCenter(geometry.getExtent());
            marker = new ol.Feature(new ol.geom.Point(centroid));
            feature.setStyle(this.overlayStyle);
            this.overlaySource.addFeature(feature);
        }
        marker.setStyle(this.overlayMarkerStyle);
        this.overlaySource.addFeature(marker);
    };
    NgMap.prototype.clearOverlay = function () {
        this.overlaySource.clear();
    };
    return NgMap;
}());

//# sourceMappingURL=/srv/apps/igo/src/map.js.map

/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_map__ = __webpack_require__(450);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZoomComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ZoomComponent = (function () {
    function ZoomComponent() {
    }
    return ZoomComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])('map'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_map__["a" /* NgMap */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_map__["a" /* NgMap */]) === "function" && _a || Object)
], ZoomComponent.prototype, "map", void 0);
ZoomComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-zoom',
        template: __webpack_require__(907),
        styles: [__webpack_require__(890)]
    }),
    __metadata("design:paramtypes", [])
], ZoomComponent);

var _a;
//# sourceMappingURL=/srv/apps/igo/src/zoom.component.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_context_service__ = __webpack_require__(688);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigatorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavigatorComponent = (function () {
    function NavigatorComponent(store, contextService) {
        this.store = store;
        this.contextService = contextService;
        this.menuState = 'initial';
    }
    NavigatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contextService.loadContext();
        /* Interactions */
        this.store
            .select(function (s) { return s.browserMedia; })
            .distinctUntilChanged()
            .subscribe(function (media) {
            if (_this.media === undefined && media === 'mobile') {
                _this.menuState = 'expanded';
            }
            _this.media = media;
        });
        this.store
            .select(function (s) { return s.selectedTool; })
            .subscribe(function (tool) {
            _this.selectedTool = tool;
            if (_this.menuState === 'collapsed') {
                _this.resizeMenu();
            }
        });
        this.store
            .select(function (s) { return s.focusedResult; })
            .subscribe(function (result) { return _this.focusedResult = result; });
        this.store
            .select(function (s) { return s.selectedResult; })
            .subscribe(function (result) {
            if (result && _this.media === 'mobile') {
                _this.menuState = 'collapsed';
            }
        });
    };
    NavigatorComponent.prototype.unselectTool = function () {
        this.store.dispatch({ type: 'UNSELECT_TOOL' });
    };
    NavigatorComponent.prototype.goBack = function () {
        this.unselectTool();
    };
    NavigatorComponent.prototype.goHome = function () {
        this.unselectTool();
    };
    NavigatorComponent.prototype.resizeMenu = function () {
        if (this.menuState === 'initial') {
            this.menuState = 'collapsed';
        }
        else if (this.menuState === 'collapsed') {
            this.menuState = (this.media === 'mobile' ? 'expanded' : 'initial');
        }
        else if (this.menuState === 'expanded') {
            this.menuState = (this.media === 'mobile' ? 'collapsed' : 'initial');
        }
    };
    return NavigatorComponent;
}());
NavigatorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-navigator',
        template: __webpack_require__(908),
        styles: [__webpack_require__(891)],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__core_context_service__["a" /* ContextService */]
        ]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__core_context_service__["a" /* ContextService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_context_service__["a" /* ContextService */]) === "function" && _b || Object])
], NavigatorComponent);

var _a, _b;
//# sourceMappingURL=/srv/apps/igo/src/navigator.component.js.map

/***/ }),

/***/ 453:
/***/ (function(module, exports) {

//# sourceMappingURL=/srv/apps/igo/src/search-result.interface.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__flex__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__flex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__flex__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlexComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FlexComponent = FlexComponent_1 = (function () {
    function FlexComponent(el) {
        this.el = el;
        this.collapsed = '0';
        this.expanded = '100%';
        this.direction = 'column';
        this._state = 'initial';
    }
    Object.defineProperty(FlexComponent.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (state) {
            var _this = this;
            var size;
            switch (state) {
                case 'collapsed':
                    size = this.collapsed;
                    break;
                case 'expanded':
                    size = this.expanded;
                    break;
                case 'initial':
                    size = this.initial;
                    break;
                default: break;
            }
            if (size !== undefined) {
                this.setSize(size);
                setTimeout(function () {
                    _this._state = state;
                }, FlexComponent_1.transitionTime);
            }
        },
        enumerable: true,
        configurable: true
    });
    FlexComponent.prototype.ngOnInit = function () {
        this.el.nativeElement.style.flexDirection = this.direction;
    };
    FlexComponent.prototype.setSize = function (size) {
        this._state = 'transition';
        if (this.direction === 'column') {
            this.main.nativeElement.style.height = size;
        }
        else if (this.direction === 'row') {
            this.main.nativeElement.style.width = size;
        }
    };
    return FlexComponent;
}());
FlexComponent.transitionTime = 250;
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ViewChild */])('flexMain'),
    __metadata("design:type", Object)
], FlexComponent.prototype, "main", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])('initial'),
    __metadata("design:type", String)
], FlexComponent.prototype, "initial", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])('collapsed'),
    __metadata("design:type", String)
], FlexComponent.prototype, "collapsed", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])('expanded'),
    __metadata("design:type", String)
], FlexComponent.prototype, "expanded", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])('direction'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__flex__["FlexDirection"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__flex__["FlexDirection"]) === "function" && _a || Object)
], FlexComponent.prototype, "direction", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])('state'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__flex__["FlexState"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__flex__["FlexState"]) === "function" && _b || Object),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__flex__["FlexState"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__flex__["FlexState"]) === "function" && _c || Object])
], FlexComponent.prototype, "state", null);
FlexComponent = FlexComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-flex',
        template: __webpack_require__(915),
        styles: [__webpack_require__(898)]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _d || Object])
], FlexComponent);

var FlexComponent_1, _a, _b, _c, _d;
//# sourceMappingURL=/srv/apps/igo/src/flex.component.js.map

/***/ }),

/***/ 455:
/***/ (function(module, exports) {

//# sourceMappingURL=/srv/apps/igo/src/flex.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListItemDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ListItemDirective = ListItemDirective_1 = (function () {
    function ListItemDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this.focused = false;
        this.selected = false;
        this.clickItem = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]();
        this.focusItem = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]();
        this.unfocusItem = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]();
        this.selectItem = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]();
        this.unselectItem = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]();
    }
    ListItemDirective.prototype.click = function () {
        this.clickItem.emit(this);
    };
    ListItemDirective.prototype.focus = function () {
        this.focused = true;
        this.renderer.setElementClass(this.el.nativeElement, ListItemDirective_1.cls, true);
        // Get a reference to the active element
        var activeElement = window.document.activeElement;
        // Focus on the selected element. This will make
        // any scrollbar scroll to that element when using the
        // arrows for navigation
        this.renderer.invokeElementMethod(this.el.nativeElement, 'focus', []);
        // Refocus on the previously selected element, if it's
        // not anothe list item, otherwise, the scrolling might
        // not behave as expected.
        if (!activeElement.hasAttribute('igolistitem')) {
            this.renderer.invokeElementMethod(activeElement, 'focus', []);
        }
        this.focusItem.emit();
    };
    ListItemDirective.prototype.unfocus = function () {
        this.focused = false;
        this.renderer.setElementClass(this.el.nativeElement, ListItemDirective_1.cls, false);
        this.unfocusItem.emit();
    };
    ListItemDirective.prototype.select = function () {
        this.selected = true;
        this.focus();
        this.selectItem.emit();
    };
    ListItemDirective.prototype.unselect = function () {
        this.selected = false;
        this.unfocus();
        this.unselectItem.emit();
    };
    return ListItemDirective;
}());
ListItemDirective.cls = 'igo-selected';
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", Boolean)
], ListItemDirective.prototype, "focused", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", Boolean)
], ListItemDirective.prototype, "selected", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]) === "function" && _a || Object)
], ListItemDirective.prototype, "clickItem", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]) === "function" && _b || Object)
], ListItemDirective.prototype, "focusItem", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Output */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]) === "function" && _c || Object)
], ListItemDirective.prototype, "unfocusItem", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Output */])(),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]) === "function" && _d || Object)
], ListItemDirective.prototype, "selectItem", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Output */])(),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]) === "function" && _e || Object)
], ListItemDirective.prototype, "unselectItem", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* HostListener */])('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ListItemDirective.prototype, "click", null);
ListItemDirective = ListItemDirective_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Directive */])({
        selector: '[igoListItem]'
    }),
    __metadata("design:paramtypes", [typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* Renderer */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _g || Object])
], ListItemDirective);

var ListItemDirective_1, _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=/srv/apps/igo/src/list-item.directive.js.map

/***/ }),

/***/ 518:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 518;


/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(650);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(687);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/srv/apps/igo/src/main.js.map

/***/ }),

/***/ 686:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_language_language_service__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_media_service__ = __webpack_require__(446);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(languageService, mediaService) {
        this.languageService = languageService;
        this.mediaService = mediaService;
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-app',
        template: __webpack_require__(905),
        styles: [__webpack_require__(888)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_language_language_service__["a" /* LanguageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_language_language_service__["a" /* LanguageService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__core_media_service__["a" /* MediaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_media_service__["a" /* MediaService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=/srv/apps/igo/src/app.component.js.map

/***/ }),

/***/ 687:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_translate__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw__ = __webpack_require__(927);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_core_module__ = __webpack_require__(689);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_shared_module__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages__ = __webpack_require__(698);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(686);
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_5_ng2_translate__["a" /* TranslateStaticLoader */](http, './assets/locale', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */]],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5_ng2_translate__["b" /* TranslateModule */].forRoot({
                provide: __WEBPACK_IMPORTED_MODULE_5_ng2_translate__["c" /* TranslateLoader */],
                useFactory: createTranslateLoader,
                deps: [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */]]
            }),
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forRoot([]),
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["MaterialModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_9__core_core_module__["a" /* CoreModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_10__shared_shared_module__["a" /* SharedModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_11__pages__["a" /* NavigatorModule */],
            __WEBPACK_IMPORTED_MODULE_11__pages__["b" /* NavigatorRoutingModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=/srv/apps/igo/src/app.module.js.map

/***/ }),

/***/ 688:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tool_service__ = __webpack_require__(177);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* tslint:disable:max-line-length */



var ContextService = (function () {
    function ContextService(store, toolService) {
        this.store = store;
        this.toolService = toolService;
    }
    ContextService.prototype.loadContext = function () {
        // This will go somewhere else eventually
        // Important: For For now we use some new ol.abc
        // in the context but this will have to change because
        // we want to be able to save the context as a JSON
        var _this = this;
        var context = {
            map: {
                view: {
                    projection: 'EPSG:3857',
                    center: [-72, 52],
                    zoom: 6
                }
            },
            layers: [
                {
                    name: 'OSM',
                    type: 'osm'
                }
            ],
            tools: [
                {
                    name: 'context',
                    title: 'Contexts',
                    icon: 'local_offer'
                },
                {
                    name: 'search'
                },
                {
                    name: 'map',
                    title: 'Map',
                    icon: 'map'
                },
                {
                    name: 'add_layers',
                    title: 'Add Layers',
                    icon: 'add_location'
                },
                {
                    name: 'directions',
                    title: 'Directions',
                    icon: 'directions'
                },
                {
                    name: 'historical_analysis',
                    title: 'Historical Analysis',
                    icon: 'history'
                },
                {
                    name: 'print',
                    title: 'Print',
                    icon: 'local_printshop'
                },
                {
                    name: 'measure',
                    title: 'Measure',
                    icon: 'straighten'
                }
            ]
        };
        var view = context.map.view;
        this.store.dispatch({ type: 'UPDATE_VIEW', payload: view });
        var layers = context.layers;
        this.store.dispatch({ type: 'UPDATE_LAYERS', payload: layers });
        var tools = [];
        (context.tools || []).forEach(function (tool_) {
            // TODO: Remove the " || {}" when more tool will be defined
            var tool = _this.toolService.getTool(tool_.name) || {};
            if (tool !== undefined) {
                tools.push(Object.assign(tool, tool_));
            }
        });
        this.store.dispatch({ type: 'UPDATE_TOOLS', payload: tools });
    };
    return ContextService;
}());
ContextService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__tool_service__["a" /* ToolService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__tool_service__["a" /* ToolService */]) === "function" && _b || Object])
], ContextService);

var _a, _b;
//# sourceMappingURL=/srv/apps/igo/src/context.service.js.map

/***/ }),

/***/ 689:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__language_missing_translation_guard__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__language_language_service__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__module_import_guard__ = __webpack_require__(691);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngrx_store__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__reducers__ = __webpack_require__(704);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__media_service__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__map_service__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__tool_service__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__search_service__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__search_source_service__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__search_sources_search_source__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__search_sources_search_source_nominatim__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__search_sources_search_source_msp__ = __webpack_require__(715);
/* unused harmony export searchSourceServiceFactory */
/* unused harmony export provideSearchSourceService */
/* unused harmony export provideSearchSource */
/* unused harmony export provideAppStore */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

















function searchSourceServiceFactory(sources) {
    return new __WEBPACK_IMPORTED_MODULE_13__search_source_service__["a" /* SearchSourceService */](sources);
}
function provideSearchSourceService() {
    return {
        provide: __WEBPACK_IMPORTED_MODULE_13__search_source_service__["a" /* SearchSourceService */],
        useFactory: searchSourceServiceFactory,
        deps: [__WEBPACK_IMPORTED_MODULE_14__search_sources_search_source__["a" /* SearchSource */]]
    };
}
function provideSearchSource() {
    return [
        {
            provide: __WEBPACK_IMPORTED_MODULE_14__search_sources_search_source__["a" /* SearchSource */],
            useClass: __WEBPACK_IMPORTED_MODULE_15__search_sources_search_source_nominatim__["a" /* SearchSourceNominatim */],
            multi: true,
            deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]]
        },
        {
            provide: __WEBPACK_IMPORTED_MODULE_14__search_sources_search_source__["a" /* SearchSource */],
            useClass: __WEBPACK_IMPORTED_MODULE_16__search_sources_search_source_msp__["a" /* SearchSourceMSP */],
            multi: true,
            deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["h" /* Jsonp */]]
        }
    ];
}
function provideAppStore() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__ngrx_store__["b" /* provideStore */])({
        browserMedia: __WEBPACK_IMPORTED_MODULE_8__reducers__["a" /* browserMedia */],
        mapView: __WEBPACK_IMPORTED_MODULE_8__reducers__["b" /* mapView */],
        mapLayers: __WEBPACK_IMPORTED_MODULE_8__reducers__["c" /* mapLayers */],
        selectedTool: __WEBPACK_IMPORTED_MODULE_8__reducers__["d" /* selectedTool */],
        searchResults: __WEBPACK_IMPORTED_MODULE_8__reducers__["e" /* searchResults */],
        selectedResult: __WEBPACK_IMPORTED_MODULE_8__reducers__["f" /* selectedResult */],
        focusedResult: __WEBPACK_IMPORTED_MODULE_8__reducers__["g" /* focusedResult */],
        availableTools: __WEBPACK_IMPORTED_MODULE_8__reducers__["h" /* availableTools */]
    });
}
var CoreModule = CoreModule_1 = (function () {
    function CoreModule(parentModule) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__module_import_guard__["a" /* throwIfAlreadyLoaded */])(parentModule, 'CoreModule');
    }
    CoreModule.forRoot = function () {
        return {
            ngModule: CoreModule_1,
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__language_language_service__["a" /* LanguageService */],
                { provide: __WEBPACK_IMPORTED_MODULE_3_ng2_translate__["d" /* MissingTranslationHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4__language_missing_translation_guard__["a" /* IgoMissingTranslationHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__media_service__["a" /* MediaService */],
                provideAppStore(),
                provideSearchSourceService(),
                __WEBPACK_IMPORTED_MODULE_10__map_service__["a" /* MapService */],
                __WEBPACK_IMPORTED_MODULE_12__search_service__["a" /* SearchService */],
                __WEBPACK_IMPORTED_MODULE_11__tool_service__["a" /* ToolService */]
            ].concat(provideSearchSource())
        };
    };
    return CoreModule;
}());
CoreModule = CoreModule_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */]
        ],
        exports: [],
        declarations: []
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* Optional */])()), __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* SkipSelf */])()),
    __metadata("design:paramtypes", [CoreModule])
], CoreModule);

var CoreModule_1;
//# sourceMappingURL=/srv/apps/igo/src/core.module.js.map

/***/ }),

/***/ 690:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IgoMissingTranslationHandler; });
var IgoMissingTranslationHandler = (function () {
    function IgoMissingTranslationHandler() {
    }
    IgoMissingTranslationHandler.prototype.handle = function (params) {
        throw new Error("The Key \"" + params.key + "\" is missing in locale file.");
    };
    return IgoMissingTranslationHandler;
}());

//# sourceMappingURL=/srv/apps/igo/src/missing-translation.guard.js.map

/***/ }),

/***/ 691:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = throwIfAlreadyLoaded;
function throwIfAlreadyLoaded(parentModule, moduleName) {
    if (parentModule) {
        throw new Error(moduleName + " has already been loaded. Import Core modules in the AppModule only.");
    }
}
//# sourceMappingURL=/srv/apps/igo/src/module-import.guard.js.map

/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__map_map_component__ = __webpack_require__(693);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__zoom_zoom_component__ = __webpack_require__(451);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MapModule = MapModule_1 = (function () {
    function MapModule() {
    }
    MapModule.forRoot = function () {
        return {
            ngModule: MapModule_1,
            providers: []
        };
    };
    return MapModule;
}());
MapModule = MapModule_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_2__map_map_component__["a" /* MapComponent */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__map_map_component__["a" /* MapComponent */],
            __WEBPACK_IMPORTED_MODULE_3__zoom_zoom_component__["a" /* ZoomComponent */]
        ]
    })
], MapModule);

var MapModule_1;
//# sourceMappingURL=/srv/apps/igo/src/map.module.js.map

/***/ }),

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_map_service__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_layer_service__ = __webpack_require__(694);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__zoom_zoom_component__ = __webpack_require__(451);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MapComponent = (function () {
    function MapComponent(store, mapService, layerService) {
        this.store = store;
        this.mapService = mapService;
        this.layerService = layerService;
        this.id = 'igo-map-target';
    }
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.map = this.mapService.getMap();
        this.store
            .select(function (s) { return s.mapView; })
            .subscribe(function (view) { return _this.map.updateView(view); });
        this.store
            .select(function (s) { return s.mapLayers; })
            .subscribe(function (layers) { return _this.handleLayersAdded(layers); });
        this.store
            .select(function (s) { return s.focusedResult; })
            .filter(function (r) { return r !== null; })
            .subscribe(function (result) { return _this.handleFocusedResult(result); });
        this.store
            .select(function (s) { return s.selectedResult; })
            .filter(function (r) { return r !== null; })
            .subscribe(function (result) { return _this.handleSelectedResult(result); });
    };
    MapComponent.prototype.ngAfterViewInit = function () {
        this.map.olMap.setTarget(this.id);
    };
    MapComponent.prototype.resultToFeature = function (result) {
        var destProj = this.map.getProjection();
        var format = new ol.format.GeoJSON();
        var feature = format.readFeature(Object.assign({
            type: 'Feature'
        }, result));
        feature.getGeometry().transform(result.projection, destProj);
        return feature;
    };
    MapComponent.prototype.handleLayersAdded = function (layers) {
        var _this = this;
        // TODO: Handle dynamically added layers
        layers.forEach(function (layerOptions) {
            _this.layerService.createLayer(layerOptions).subscribe(function (layer) { return _this.map.addLayer(layer); });
        });
    };
    MapComponent.prototype.handleFocusedResult = function (result) {
        this.handleResult(result, false);
    };
    MapComponent.prototype.handleSelectedResult = function (result) {
        this.handleResult(result, true);
    };
    MapComponent.prototype.handleResult = function (result, zoom) {
        if (zoom === void 0) { zoom = false; }
        this.map.clearOverlay();
        var feature = this.resultToFeature(result);
        this.map.addMarker(feature);
        var extent;
        if (result.extent) {
            extent = ol.proj.transformExtent(result.extent, result.projection, this.map.getProjection());
        }
        if (extent) {
            if (zoom) {
                this.map.zoomToExtent(extent);
            }
            else {
                this.map.moveToExtent(extent);
            }
        }
        else {
            if (zoom) {
                this.map.zoomToFeature(feature);
            }
            else {
                this.map.moveToFeature(feature);
            }
        }
    };
    return MapComponent;
}());
MapComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-map',
        template: __webpack_require__(906),
        styles: [__webpack_require__(889)],
        providers: [__WEBPACK_IMPORTED_MODULE_3__shared_layer_service__["a" /* LayerService */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_4__zoom_zoom_component__["a" /* ZoomComponent */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__core_map_service__["a" /* MapService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_map_service__["a" /* MapService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_layer_service__["a" /* LayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_layer_service__["a" /* LayerService */]) === "function" && _c || Object])
], MapComponent);

var _a, _b, _c;
//# sourceMappingURL=/srv/apps/igo/src/map.component.js.map

/***/ }),

/***/ 694:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__layers_layer_osm__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__layers_layer_vector__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__layers_layer_xyz__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__layers_layer_wmts__ = __webpack_require__(696);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayerService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LayerService = LayerService_1 = (function () {
    function LayerService(http) {
        this.http = http;
        this.capabilitiesStore = [];
    }
    LayerService.prototype.createLayer = function (options) {
        var layerCls = LayerService_1.layerClasses[options.type];
        if (options.optionsFromCapabilities) {
            return this.getCapabilities(options).map(function (capabilities) {
                return new layerCls(options, capabilities);
            });
        }
        else {
            return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (layer) { return layer.next(new layerCls(options)); });
        }
    };
    LayerService.prototype.getCapabilities = function (options) {
        var _this = this;
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* URLSearchParams */]();
        params.set('request', 'GetCapabilities');
        params.set('service', options.type);
        params.set('version', (options.version ? options.version : '1.0.0'));
        var request = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Request */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* RequestMethod */].Get,
            url: options.source.url,
            search: params
        });
        var url = options.source.url + '?' + params.toString();
        var capabilities = this.capabilitiesStore.find(function (value) { return value.url === url; });
        if (capabilities) {
            return capabilities.capabilities;
        }
        else {
            return this.http.request(request)
                .map(function (response) {
                var parser;
                switch (options.type) {
                    case 'wmts':
                        parser = new ol.format.WMTSCapabilities();
                        break;
                    case 'wms':
                        parser = new ol.format.WMSCapabilities();
                        break;
                }
                capabilities = parser.read(response.text());
                _this.capabilitiesStore.push({ url: url, capabilities: capabilities });
                return capabilities;
            });
        }
    };
    return LayerService;
}());
LayerService.layerClasses = {
    osm: __WEBPACK_IMPORTED_MODULE_3__layers_layer_osm__["a" /* OSMLayer */],
    vector: __WEBPACK_IMPORTED_MODULE_4__layers_layer_vector__["a" /* VectorLayer */],
    xyz: __WEBPACK_IMPORTED_MODULE_5__layers_layer_xyz__["a" /* XYZLayer */],
    wmts: __WEBPACK_IMPORTED_MODULE_6__layers_layer_wmts__["a" /* WMTSLayer */]
};
LayerService = LayerService_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], LayerService);

var LayerService_1, _a;
//# sourceMappingURL=/srv/apps/igo/src/layer.service.js.map

/***/ }),

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layer__ = __webpack_require__(178);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OSMLayer; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var OSMLayer = (function (_super) {
    __extends(OSMLayer, _super);
    function OSMLayer(options) {
        return _super.call(this, options) || this;
    }
    OSMLayer.prototype.createOlLayer = function (options) {
        var olLayerOptions = Object.assign(options.view || {}, {
            source: new ol.source.OSM(options.source)
        });
        return new ol.layer.Tile(olLayerOptions);
    };
    return OSMLayer;
}(__WEBPACK_IMPORTED_MODULE_0__layer__["a" /* Layer */]));

//# sourceMappingURL=/srv/apps/igo/src/layer-osm.js.map

/***/ }),

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layer__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(935);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WMTSLayer; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


var WMTSLayer = (function (_super) {
    __extends(WMTSLayer, _super);
    function WMTSLayer(options, capabilities) {
        return _super.call(this, options, capabilities) || this;
    }
    WMTSLayer.prototype.createOlLayer = function (options, capabilities) {
        if (capabilities) {
            var olLayerOptionsGetCapabilities = ol.source.WMTS.optionsFromCapabilities(capabilities, options.source);
            var olLayerOptions = Object.assign({}, options.view, {
                source: new ol.source.WMTS(olLayerOptionsGetCapabilities)
            });
            return new ol.layer.Tile(olLayerOptions);
        }
        else {
            var optionsSource = Object.assign({}, options.source, { tileGrid: this.getDefaultTileGrid() });
            return new ol.layer.Tile({ source: new ol.source.WMTS(optionsSource) });
        }
    };
    // TODO Support others projections ?
    WMTSLayer.prototype.getDefaultTileGrid = function () {
        var projection = ol.proj.get('EPSG:3857');
        var projectionExtent = projection.getExtent();
        var size = ol.extent.getWidth(projectionExtent) / 256;
        var resolutions = new Array(14);
        var matrixIds = new Array(14);
        for (var z = 0; z < 14; ++z) {
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = z;
        }
        return new ol.tilegrid.WMTS({ origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds
        });
    };
    return WMTSLayer;
}(__WEBPACK_IMPORTED_MODULE_0__layer__["a" /* Layer */]));

//# sourceMappingURL=/srv/apps/igo/src/layer-wmts.js.map

/***/ }),

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layer__ = __webpack_require__(178);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return XYZLayer; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var XYZLayer = (function (_super) {
    __extends(XYZLayer, _super);
    function XYZLayer(options) {
        return _super.call(this, options) || this;
    }
    XYZLayer.prototype.createOlLayer = function (options) {
        var olLayerOptions = Object.assign(options.view || {}, {
            source: new ol.source.XYZ(options.source)
        });
        return new ol.layer.Tile(olLayerOptions);
    };
    return XYZLayer;
}(__WEBPACK_IMPORTED_MODULE_0__layer__["a" /* Layer */]));

//# sourceMappingURL=/srv/apps/igo/src/layer-xyz.js.map

/***/ }),

/***/ 698:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navigator_navigator_module__ = __webpack_require__(700);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__navigator_navigator_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__navigator_navigator_routing_module__ = __webpack_require__(699);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__navigator_navigator_routing_module__["a"]; });


//# sourceMappingURL=/srv/apps/igo/src/index.js.map

/***/ }),

/***/ 699:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__navigator_component__ = __webpack_require__(452);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigatorRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__navigator_component__["a" /* NavigatorComponent */] }
];
var NavigatorRoutingModule = (function () {
    function NavigatorRoutingModule() {
    }
    return NavigatorRoutingModule;
}());
NavigatorRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]],
        providers: []
    })
], NavigatorRoutingModule);

//# sourceMappingURL=/srv/apps/igo/src/navigator-routing.module.js.map

/***/ }),

/***/ 700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__map_map_module__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search_module__ = __webpack_require__(714);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tool_tool_module__ = __webpack_require__(726);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__navigator_component__ = __webpack_require__(452);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigatorModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var NavigatorModule = (function () {
    function NavigatorModule() {
    }
    return NavigatorModule;
}());
NavigatorModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__map_map_module__["a" /* MapModule */],
            __WEBPACK_IMPORTED_MODULE_3__search_search_module__["a" /* SearchModule */],
            __WEBPACK_IMPORTED_MODULE_4__tool_tool_module__["a" /* ToolModule */],
            __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_5__navigator_component__["a" /* NavigatorComponent */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__navigator_component__["a" /* NavigatorComponent */]
        ]
    })
], NavigatorModule);

//# sourceMappingURL=/srv/apps/igo/src/navigator.module.js.map

/***/ }),

/***/ 701:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return availableTools; });
var availableTools = function (state, _a) {
    if (state === void 0) { state = []; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case 'UPDATE_TOOLS':
            return payload;
        default:
            return state;
    }
};
//# sourceMappingURL=/srv/apps/igo/src/available-tools.reducer.js.map

/***/ }),

/***/ 702:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return browserMedia; });
var browserMedia = function (state, _a) {
    if (state === void 0) { state = null; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case 'SET_MEDIA':
            return payload;
        default:
            return state;
    }
};
//# sourceMappingURL=/srv/apps/igo/src/browser-media.reducer.js.map

/***/ }),

/***/ 703:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return focusedResult; });
var focusedResult = function (state, _a) {
    if (state === void 0) { state = null; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case 'FOCUS_RESULT':
            return Object.assign({}, payload);
        default:
            return state;
    }
};
//# sourceMappingURL=/srv/apps/igo/src/focused-result.reducer.js.map

/***/ }),

/***/ 704:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__browser_media_reducer__ = __webpack_require__(702);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__browser_media_reducer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__available_tools_reducer__ = __webpack_require__(701);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_1__available_tools_reducer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__map_view_reducer__ = __webpack_require__(706);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__map_view_reducer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__map_layers_reducer__ = __webpack_require__(705);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__map_layers_reducer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__selected_tool_reducer__ = __webpack_require__(709);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__selected_tool_reducer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_results_reducer__ = __webpack_require__(707);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__search_results_reducer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__selected_result_reducer__ = __webpack_require__(708);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_6__selected_result_reducer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__focused_result_reducer__ = __webpack_require__(703);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_7__focused_result_reducer__["a"]; });








//# sourceMappingURL=/srv/apps/igo/src/index.js.map

/***/ }),

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mapLayers; });
var mapLayers = function (state, _a) {
    if (state === void 0) { state = []; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case 'UPDATE_LAYERS':
            return payload;
        default:
            return state;
    }
};
//# sourceMappingURL=/srv/apps/igo/src/map-layers.reducer.js.map

/***/ }),

/***/ 706:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mapView; });
var mapView = function (state, _a) {
    if (state === void 0) { state = null; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case 'UPDATE_VIEW':
            return Object.assign({}, payload);
        default:
            return state;
    }
};
//# sourceMappingURL=/srv/apps/igo/src/map-view.reducer.js.map

/***/ }),

/***/ 707:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return searchResults; });
var searchResults = function (state, _a) {
    if (state === void 0) { state = []; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case 'UPDATE_SEARCH_RESULTS':
            return state
                .filter(function (result) { return result.source !== payload.source; })
                .concat(payload.results);
        case 'CLEAR_SEARCH_RESULTS':
            return [];
        default:
            return state;
    }
};
//# sourceMappingURL=/srv/apps/igo/src/search-results.reducer.js.map

/***/ }),

/***/ 708:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return selectedResult; });
var selectedResult = function (state, _a) {
    if (state === void 0) { state = null; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case 'SELECT_RESULT':
            return Object.assign({}, payload);
        default:
            return state;
    }
};
//# sourceMappingURL=/srv/apps/igo/src/selected-result.reducer.js.map

/***/ }),

/***/ 709:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return selectedTool; });
var selectedTool = function (state, _a) {
    if (state === void 0) { state = null; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case 'SELECT_TOOL':
            return Object.assign({}, payload);
        case 'UNSELECT_TOOL':
            return null;
        default:
            return state;
    }
};
//# sourceMappingURL=/srv/apps/igo/src/selected-tool.reducer.js.map

/***/ }),

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime_js__ = __webpack_require__(928);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_search_service__ = __webpack_require__(448);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SearchBarComponent = (function () {
    function SearchBarComponent(store, searchService) {
        this.store = store;
        this.searchService = searchService;
        this.key = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]();
        this.searchTermsStream = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
    }
    SearchBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store
            .select(function (s) { return s.availableTools; })
            .subscribe(function (tools) {
            _this.searchTool = tools.find(function (t) { return t.name === 'search'; });
        });
        this.searchTermsStream
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(function (term) { return _this.searchService.search(term); });
        this.store
            .select(function (s) { return s.selectedResult; })
            .subscribe(function (result) {
            _this.term = result ? result.title : undefined;
        });
    };
    SearchBarComponent.prototype.keyup = function (event) {
        var term = event.target.value;
        // Prevent searching the same thing twice
        // and searching when clicking "enter" on a search result
        if (term !== this.term) {
            this.key.emit(term);
            this.selectSearchTool();
            this.search(term);
        }
        this.term = term;
    };
    SearchBarComponent.prototype.selectSearchTool = function () {
        this.store.dispatch({ type: 'SELECT_TOOL', payload: this.searchTool });
    };
    SearchBarComponent.prototype.search = function (term) {
        this.searchTermsStream.next(term);
    };
    SearchBarComponent.prototype.focus = function () {
        this.input.nativeElement.focus();
    };
    return SearchBarComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Output */])('key'),
    __metadata("design:type", Object)
], SearchBarComponent.prototype, "key", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ViewChild */])('input'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], SearchBarComponent.prototype, "input", void 0);
SearchBarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-search-bar',
        template: __webpack_require__(909),
        styles: [__webpack_require__(892)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__core_search_service__["a" /* SearchService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_search_service__["a" /* SearchService */]) === "function" && _c || Object])
], SearchBarComponent);

var _a, _b, _c;
//# sourceMappingURL=/srv/apps/igo/src/search-bar.component.js.map

/***/ }),

/***/ 711:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_search_result_interface__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_search_result_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__shared_search_result_interface__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResultDetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchResultDetailsComponent = (function () {
    function SearchResultDetailsComponent() {
    }
    return SearchResultDetailsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])('result'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_search_result_interface__["SearchResult"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_search_result_interface__["SearchResult"]) === "function" && _a || Object)
], SearchResultDetailsComponent.prototype, "result", void 0);
SearchResultDetailsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-search-result-details',
        template: __webpack_require__(910),
        styles: [__webpack_require__(893)]
    }),
    __metadata("design:paramtypes", [])
], SearchResultDetailsComponent);

var _a;
//# sourceMappingURL=/srv/apps/igo/src/search-result-details.component.js.map

/***/ }),

/***/ 712:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_search_result_interface__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_search_result_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__shared_search_result_interface__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResultComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchResultComponent = (function () {
    function SearchResultComponent() {
    }
    return SearchResultComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])('result'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_search_result_interface__["SearchResult"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_search_result_interface__["SearchResult"]) === "function" && _a || Object)
], SearchResultComponent.prototype, "result", void 0);
SearchResultComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-search-result',
        template: __webpack_require__(911),
        styles: [__webpack_require__(894)]
    }),
    __metadata("design:paramtypes", [])
], SearchResultComponent);

var _a;
//# sourceMappingURL=/srv/apps/igo/src/search-result.component.js.map

/***/ }),

/***/ 713:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_tool_service__ = __webpack_require__(177);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchToolComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SearchToolComponent = (function () {
    function SearchToolComponent(store) {
        this.store = store;
    }
    SearchToolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select(function (s) { return s.focusedResult; })
            .subscribe(function (result) { return _this.focusedResult = result; });
        this.store
            .select(function (s) { return s.searchResults; })
            .subscribe(function (results) {
            return _this.handleSearchResults(results);
        });
    };
    SearchToolComponent.prototype.selectResult = function (result) {
        this.store.dispatch({ type: 'SELECT_RESULT', payload: result });
    };
    SearchToolComponent.prototype.focusResult = function (result) {
        this.store.dispatch({ type: 'FOCUS_RESULT', payload: result });
    };
    SearchToolComponent.prototype.handleSearchResults = function (results) {
        var groupedResults = {};
        results.forEach(function (result) {
            var source = result.source;
            if (groupedResults[source] === undefined) {
                groupedResults[source] = [];
            }
            groupedResults[source].push(result);
        });
        var sourceResults = [];
        Object.keys(groupedResults).sort().forEach(function (source) {
            sourceResults.push([source, groupedResults[source]]);
        });
        this.sourceResults = sourceResults;
    };
    return SearchToolComponent;
}());
SearchToolComponent.name_ = 'search';
SearchToolComponent.title = 'Search Results';
SearchToolComponent.icon = 'search';
SearchToolComponent.defaultOptions = {};
SearchToolComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-search-tool',
        template: __webpack_require__(912),
        styles: [__webpack_require__(895)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === "function" && _a || Object])
], SearchToolComponent);

__WEBPACK_IMPORTED_MODULE_2__core_tool_service__["a" /* ToolService */].register(SearchToolComponent);
var _a;
//# sourceMappingURL=/srv/apps/igo/src/search-tool.component.js.map

/***/ }),

/***/ 714:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_bar_search_bar_component__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_result_search_result_component__ = __webpack_require__(712);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_result_details_search_result_details_component__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_tool_search_tool_component__ = __webpack_require__(713);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var SearchModule = (function () {
    function SearchModule() {
    }
    return SearchModule;
}());
SearchModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__search_bar_search_bar_component__["a" /* SearchBarComponent */],
            __WEBPACK_IMPORTED_MODULE_4__search_result_details_search_result_details_component__["a" /* SearchResultDetailsComponent */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__search_bar_search_bar_component__["a" /* SearchBarComponent */],
            __WEBPACK_IMPORTED_MODULE_3__search_result_search_result_component__["a" /* SearchResultComponent */],
            __WEBPACK_IMPORTED_MODULE_4__search_result_details_search_result_details_component__["a" /* SearchResultDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_5__search_tool_search_tool_component__["a" /* SearchToolComponent */]
        ]
    })
], SearchModule);

//# sourceMappingURL=/srv/apps/igo/src/search.module.js.map

/***/ }),

/***/ 715:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_source__ = __webpack_require__(266);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchSourceMSP; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


var SearchSourceMSP = (function (_super) {
    __extends(SearchSourceMSP, _super);
    function SearchSourceMSP(jsonp) {
        var _this = _super.call(this) || this;
        _this.jsonp = jsonp;
        return _this;
    }
    SearchSourceMSP.prototype.getName = function () {
        return SearchSourceMSP.name_;
    };
    SearchSourceMSP.prototype.search = function (term) {
        var _this = this;
        var search = this.getSearchParams(term);
        return this.jsonp
            .get(SearchSourceMSP.searchUrl, { search: search })
            .map(function (res) { return _this.extractData(res); });
    };
    SearchSourceMSP.prototype.extractData = function (response) {
        return response.json().features.map(this.formatResult);
    };
    SearchSourceMSP.prototype.getSearchParams = function (term) {
        var search = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* URLSearchParams */]();
        search.set('q', term);
        search.set('limit', '5');
        search.set('callback', 'JSONP_CALLBACK');
        search.set('geometries', 'geom');
        return search;
    };
    SearchSourceMSP.prototype.formatResult = function (result) {
        return {
            id: result.id,
            source: SearchSourceMSP.name_,
            title: result.properties.recherche,
            title_html: result.highlight,
            icon: 'place',
            projection: 'EPSG:4326',
            properties: Object.assign({
                type: result.doc_type
            }, result.properties),
            geometry: result.geometry,
            extent: result.bbox
        };
    };
    return SearchSourceMSP;
}(__WEBPACK_IMPORTED_MODULE_1__search_source__["a" /* SearchSource */]));

SearchSourceMSP.name_ = 'ICherche Québec';
SearchSourceMSP.searchUrl = 'http://geoegl.msp.gouv.qc.ca/icherche/geopasdecode';
//# sourceMappingURL=/srv/apps/igo/src/search-source-msp.js.map

/***/ }),

/***/ 716:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_source__ = __webpack_require__(266);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchSourceNominatim; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


var SearchSourceNominatim = (function (_super) {
    __extends(SearchSourceNominatim, _super);
    function SearchSourceNominatim(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    SearchSourceNominatim.prototype.getName = function () {
        return SearchSourceNominatim.name_;
    };
    SearchSourceNominatim.prototype.search = function (term) {
        var _this = this;
        var search = this.getSearchParams(term);
        return this.http
            .get(SearchSourceNominatim.searchUrl, { search: search })
            .map(function (res) { return _this.extractData(res); });
    };
    SearchSourceNominatim.prototype.extractData = function (response) {
        return response.json().map(this.formatResult);
    };
    SearchSourceNominatim.prototype.getSearchParams = function (term) {
        var search = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* URLSearchParams */]();
        search.set('q', term);
        search.set('format', 'json');
        search.set('limit', '5');
        return search;
    };
    SearchSourceNominatim.prototype.formatResult = function (result) {
        return {
            id: result.place_id,
            source: SearchSourceNominatim.name_,
            title: result.display_name,
            icon: 'place',
            projection: 'EPSG:4326',
            properties: {
                name: result.display_name,
                place_id: result.place_id,
                osm_type: result.osm_type,
                class: result.class,
                type: result.type
            },
            geometry: {
                type: 'Point',
                coordinates: [
                    parseFloat(result.lon),
                    parseFloat(result.lat)
                ]
            },
            extent: [
                parseFloat(result.boundingbox[2]),
                parseFloat(result.boundingbox[0]),
                parseFloat(result.boundingbox[3]),
                parseFloat(result.boundingbox[1])
            ]
        };
    };
    return SearchSourceNominatim;
}(__WEBPACK_IMPORTED_MODULE_1__search_source__["a" /* SearchSource */]));

SearchSourceNominatim.name_ = 'Nominatim';
SearchSourceNominatim.searchUrl = 'https://nominatim.openstreetmap.org/search';
//# sourceMappingURL=/srv/apps/igo/src/search-source-nominatim.js.map

/***/ }),

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackdropComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BackdropComponent = (function () {
    function BackdropComponent() {
        this.shown = false;
    }
    return BackdropComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", Boolean)
], BackdropComponent.prototype, "shown", void 0);
BackdropComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-backdrop',
        template: __webpack_require__(913),
        styles: [__webpack_require__(896)]
    }),
    __metadata("design:paramtypes", [])
], BackdropComponent);

//# sourceMappingURL=/srv/apps/igo/src/backdrop.component.js.map

/***/ }),

/***/ 718:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__flex__ = __webpack_require__(720);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CollapsibleComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CollapsibleComponent = (function () {
    function CollapsibleComponent() {
        this.state = 'expanded';
    }
    CollapsibleComponent.prototype.handleClick = function () {
        if (this.state !== 'collapsed') {
            this.state = 'collapsed';
        }
        else {
            this.state = 'expanded';
        }
    };
    return CollapsibleComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ViewChild */])('content'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__flex__["FlexComponent"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__flex__["FlexComponent"]) === "function" && _a || Object)
], CollapsibleComponent.prototype, "content", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__flex__["FlexState"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__flex__["FlexState"]) === "function" && _b || Object)
], CollapsibleComponent.prototype, "state", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", String)
], CollapsibleComponent.prototype, "title", void 0);
CollapsibleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-collapsible',
        template: __webpack_require__(914),
        styles: [__webpack_require__(897)]
    }),
    __metadata("design:paramtypes", [])
], CollapsibleComponent);

var _a, _b;
//# sourceMappingURL=/srv/apps/igo/src/collapsible.component.js.map

/***/ }),

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClickoutDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ClickoutDirective = (function () {
    function ClickoutDirective(el) {
        this.el = el;
        this.clickout = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]();
    }
    ClickoutDirective.prototype.handleMouseClick = function (event, target) {
        if (!target) {
            return;
        }
        if (!this.el.nativeElement.contains(target)) {
            this.clickout.emit(event);
        }
    };
    return ClickoutDirective;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Output */])(),
    __metadata("design:type", Object)
], ClickoutDirective.prototype, "clickout", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* HostListener */])('document:click', ['$event', '$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ClickoutDirective.prototype, "handleMouseClick", null);
ClickoutDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Directive */])({
        selector: '[igoClickout]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object])
], ClickoutDirective);

var _a;
//# sourceMappingURL=/srv/apps/igo/src/clickout.directive.js.map

/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__flex__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__flex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__flex__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__flex__, "FlexComponent")) __webpack_require__.d(__webpack_exports__, "FlexComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__flex__["FlexComponent"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__flex__, "FlexState")) __webpack_require__.d(__webpack_exports__, "FlexState", function() { return __WEBPACK_IMPORTED_MODULE_0__flex__["FlexState"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__flex_component__ = __webpack_require__(454);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "FlexComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__flex_component__["a"]; });


//# sourceMappingURL=/srv/apps/igo/src/index.js.map

/***/ }),

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__list_item_directive__ = __webpack_require__(456);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListComponent = (function () {
    function ListComponent() {
        this.subscriptions = [];
        this.navigation = true;
    }
    ListComponent.prototype.handleKeyboardEvent = function (event) {
        // It would be nice to be able to unsubscribe to the event
        // completely but until ES7 this won't be possible because
        // document events are not observables
        if (this.navigationEnabled) {
            if (event.keyCode === 38 || event.keyCode === 40) {
                event.preventDefault();
                this.navigate(event.keyCode);
            }
            else if (event.keyCode === 13) {
                this.select(this.focusedItem);
            }
        }
    };
    ListComponent.prototype.ngOnInit = function () {
        this.enableNavigation();
    };
    ListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.listItems.length) {
            this.init();
        }
        this.listItems.changes.subscribe(function (items) {
            _this.init();
        });
    };
    ListComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe();
    };
    ListComponent.prototype.focus = function (item) {
        this.unfocus();
        // We need to make this check because dynamic
        // lists such as in the search tool may fail
        if (item !== undefined) {
            item.focus();
            this.focusedItem = item;
        }
    };
    ListComponent.prototype.unfocus = function () {
        if (this.focusedItem !== undefined) {
            this.focusedItem.unfocus();
        }
        this.focusedItem = undefined;
    };
    ListComponent.prototype.focusNext = function () {
        var index = this.getFocusedIndex();
        if (index === undefined) {
            index = -1;
        }
        var items = this.listItems.toArray();
        if (index !== items.length - 1) {
            this.focus(items[index + 1]);
        }
    };
    ListComponent.prototype.focusPrevious = function () {
        var index = this.getFocusedIndex();
        var items = this.listItems.toArray();
        if (index !== 0) {
            this.focus(items[index - 1]);
        }
    };
    ListComponent.prototype.select = function (item) {
        this.unselect();
        if (item !== undefined) {
            item.select();
            this.selectedItem = item;
            this.focusedItem = item;
        }
    };
    ListComponent.prototype.unselect = function () {
        this.unfocus();
        if (this.selectedItem !== undefined) {
            this.selectedItem.unselect();
        }
        this.selectedItem = undefined;
    };
    ListComponent.prototype.enableNavigation = function () {
        if (this.navigation) {
            this.navigationEnabled = true;
        }
    };
    ListComponent.prototype.disableNavigation = function () {
        this.navigationEnabled = false;
    };
    ListComponent.prototype.init = function () {
        this.subscribe();
        this.focus(this.findFocusedItem());
        this.enableNavigation();
    };
    ListComponent.prototype.subscribe = function () {
        var _this = this;
        this.unsubscribe();
        this.listItems.toArray().forEach(function (item) {
            _this.subscriptions.push(item.clickItem.subscribe(function (item_) { return _this.select(item_); }));
        }, this);
    };
    ListComponent.prototype.unsubscribe = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this.subscriptions = [];
    };
    ListComponent.prototype.findFocusedItem = function () {
        return this.listItems.toArray().find(function (item) { return item.focused; });
    };
    ListComponent.prototype.getFocusedIndex = function () {
        var _this = this;
        return this.listItems.toArray().findIndex(function (item) { return item === _this.focusedItem; });
    };
    ListComponent.prototype.navigate = function (key) {
        switch (key) {
            case 38:
                this.focusPrevious();
                break;
            case 40:
                this.focusNext();
                break;
            default:
                break;
        }
    };
    return ListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])('navigation'),
    __metadata("design:type", Boolean)
], ListComponent.prototype, "navigation", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* ContentChildren */])(__WEBPACK_IMPORTED_MODULE_1__list_item_directive__["a" /* ListItemDirective */], { descendants: true }),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* QueryList */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* QueryList */]) === "function" && _a || Object)
], ListComponent.prototype, "listItems", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* HostListener */])('document:keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ListComponent.prototype, "handleKeyboardEvent", null);
ListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-list',
        template: __webpack_require__(916),
        styles: [__webpack_require__(899)]
    }),
    __metadata("design:paramtypes", [])
], ListComponent);

var _a;
//# sourceMappingURL=/srv/apps/igo/src/list.component.js.map

/***/ }),

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PanelComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PanelComponent = (function () {
    function PanelComponent() {
    }
    return PanelComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", String)
], PanelComponent.prototype, "title", void 0);
PanelComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-panel',
        template: __webpack_require__(917),
        styles: [__webpack_require__(900)]
    }),
    __metadata("design:paramtypes", [])
], PanelComponent);

//# sourceMappingURL=/srv/apps/igo/src/panel.component.js.map

/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyvaluePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var KeyvaluePipe = (function () {
    function KeyvaluePipe() {
    }
    KeyvaluePipe.prototype.transform = function (value, args) {
        var keys = [];
        Object.getOwnPropertyNames(value).forEach(function (key) {
            return keys.push({ key: key, value: value[key] });
        });
        return keys;
    };
    return KeyvaluePipe;
}());
KeyvaluePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Pipe */])({
        name: 'keyvalue'
    })
], KeyvaluePipe);

//# sourceMappingURL=/srv/apps/igo/src/keyvalue.pipe.js.map

/***/ }),

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidenavComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SidenavComponent = (function () {
    function SidenavComponent() {
        this.opened = false;
    }
    SidenavComponent.prototype.close = function () {
        this.opened = false;
    };
    SidenavComponent.prototype.open = function () {
        this.opened = true;
    };
    SidenavComponent.prototype.toggle = function () {
        if (this.opened) {
            this.close();
        }
        else {
            this.open();
        }
    };
    return SidenavComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", Boolean)
], SidenavComponent.prototype, "opened", void 0);
SidenavComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-sidenav',
        template: __webpack_require__(918),
        styles: [__webpack_require__(901)]
    }),
    __metadata("design:paramtypes", [])
], SidenavComponent);

//# sourceMappingURL=/srv/apps/igo/src/sidenav.component.js.map

/***/ }),

/***/ 725:
/***/ (function(module, exports) {

//# sourceMappingURL=/srv/apps/igo/src/tool.interface.js.map

/***/ }),

/***/ 726:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toolbar_toolbar_component__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__toolbar_item_toolbar_item_component__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__toolbox_toolbox_component__ = __webpack_require__(729);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ToolModule = (function () {
    function ToolModule() {
    }
    return ToolModule;
}());
ToolModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__toolbar_toolbar_component__["a" /* ToolbarComponent */],
            __WEBPACK_IMPORTED_MODULE_4__toolbox_toolbox_component__["a" /* ToolboxComponent */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__toolbar_toolbar_component__["a" /* ToolbarComponent */],
            __WEBPACK_IMPORTED_MODULE_3__toolbar_item_toolbar_item_component__["a" /* ToolbarItemComponent */],
            __WEBPACK_IMPORTED_MODULE_4__toolbox_toolbox_component__["a" /* ToolboxComponent */]
        ]
    })
], ToolModule);

//# sourceMappingURL=/srv/apps/igo/src/tool.module.js.map

/***/ }),

/***/ 727:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_tool_interface__ = __webpack_require__(725);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_tool_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__shared_tool_interface__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolbarItemComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ToolbarItemComponent = (function () {
    function ToolbarItemComponent() {
        this.toolSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]();
    }
    return ToolbarItemComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_tool_interface__["Tool"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_tool_interface__["Tool"]) === "function" && _a || Object)
], ToolbarItemComponent.prototype, "tool", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]) === "function" && _b || Object)
], ToolbarItemComponent.prototype, "toolSelected", void 0);
ToolbarItemComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-toolbar-item',
        template: __webpack_require__(919),
        styles: [__webpack_require__(902)]
    }),
    __metadata("design:paramtypes", [])
], ToolbarItemComponent);

var _a, _b;
//# sourceMappingURL=/srv/apps/igo/src/toolbar-item.component.js.map

/***/ }),

/***/ 728:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ToolbarComponent = (function () {
    function ToolbarComponent(store) {
        this.store = store;
    }
    ToolbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store
            .select(function (s) { return s.availableTools; })
            .subscribe(function (tools) {
            _this.tools = tools;
        });
    };
    ToolbarComponent.prototype.track = function (tool) {
        return tool.name;
    };
    ToolbarComponent.prototype.selectTool = function (tool) {
        this.store.dispatch({ type: 'SELECT_TOOL', payload: tool });
    };
    return ToolbarComponent;
}());
ToolbarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-toolbar',
        template: __webpack_require__(920),
        styles: [__webpack_require__(903)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === "function" && _a || Object])
], ToolbarComponent);

var _a;
//# sourceMappingURL=/srv/apps/igo/src/toolbar.component.js.map

/***/ }),

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_tool_service__ = __webpack_require__(177);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolboxComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ToolboxComponent = (function () {
    function ToolboxComponent(store, resolver, cdRef, toolService) {
        this.store = store;
        this.resolver = resolver;
        this.cdRef = cdRef;
        this.toolService = toolService;
        this.isViewInitialized = false;
    }
    ToolboxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store
            .select(function (s) { return s.availableTools; })
            .subscribe(function (tools) {
            _this.tools = tools;
        });
        this.store
            .select(function (s) { return s.selectedTool; })
            .subscribe(function (tool) {
            _this.selectedTool = tool;
        });
    };
    ToolboxComponent.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    ToolboxComponent.prototype.ngOnChanges = function (changes) {
        this.createComponent();
    };
    ToolboxComponent.prototype.ngAfterViewInit = function () {
        this.isViewInitialized = true;
        this.createComponent();
    };
    ToolboxComponent.prototype.createComponent = function () {
        if (!this.isViewInitialized || !this.selectedTool) {
            return;
        }
        /* If the component is created already, simply update its options */
        if (this.component && this.component.instance.name === this.selectedTool.name) {
            this.component.instance.options = this.selectedTool.options;
            return;
        }
        var toolCls = this.toolService.getToolClass(this.selectedTool.name);
        if (toolCls === undefined) {
            return;
        }
        this.destroy();
        var factory = this.resolver.resolveComponentFactory(toolCls);
        var component = this.target.createComponent(factory);
        this.component = component;
        this.component.instance.name = this.selectedTool.name;
        this.component.instance.options = this.selectedTool.options;
        this.cdRef.detectChanges();
    };
    ToolboxComponent.prototype.destroy = function () {
        if (this.component !== undefined) {
            this.component.destroy();
        }
    };
    return ToolboxComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ViewChild */])('target', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ViewContainerRef */] }),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ViewContainerRef */]) === "function" && _a || Object)
], ToolboxComponent.prototype, "target", void 0);
ToolboxComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'igo-toolbox',
        template: __webpack_require__(921),
        styles: [__webpack_require__(904)],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_2__core_tool_service__["a" /* ToolService */].toolClasses]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ComponentFactoryResolver */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ComponentFactoryResolver */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* ChangeDetectorRef */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__core_tool_service__["a" /* ToolService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_tool_service__["a" /* ToolService */]) === "function" && _e || Object])
], ToolboxComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=/srv/apps/igo/src/toolbox.component.js.map

/***/ }),

/***/ 730:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    title: 'Igo-dev'
};
//# sourceMappingURL=/srv/apps/igo/src/environment.js.map

/***/ }),

/***/ 888:
/***/ (function(module, exports) {

module.exports = ":host,\nmain {\n  width: 100%;\n  height: 100%;\n}\nmain {\n  position: fixed;\n  padding: 0;\n  -webkit-transition: 0.5s;\n  transition: 0.5s;\n}\n"

/***/ }),

/***/ 889:
/***/ (function(module, exports) {

module.exports = ":host,\n.igo-map-target {\n  width: 100%;\n  height: 100%;\n}\n"

/***/ }),

/***/ 890:
/***/ (function(module, exports) {

module.exports = ".igo-zoom-container {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  width: 40px;\n}\n@media only screen and (max-width: 500px) {\n  .igo-zoom-container {\n    display: none;\n  }\n}\n.igo-zoom-container button:first-child {\n  margin-bottom: 2px;\n}\n"

/***/ }),

/***/ 891:
/***/ (function(module, exports) {

module.exports = "/*--- Sidenav ---*/\nmd-sidenav-container {\n  width: 100%;\n  height: 100%;\n}\n:host >>> igo-sidenav md-sidenav {\n  width: 400px;\n}\n@media only screen and (max-width: 500px) {\n  :host >>> igo-sidenav md-sidenav {\n    width: calc(100% - 40px - 5px);\n  }\n}\n:host >>> igo-sidenav .igo-sidenav-content {\n  margin-top: 50px;\n  height: calc(100% - 50px);\n}\n:host >>> igo-sidenav .igo-sidenav {\n  background-color: #fff;\n}\n/*--- Menu button ---*/\n#igo-menu-button {\n  position: absolute;\n  left: 400px;\n  top: 5px;\n  z-index: 2;\n}\n@media only screen and (max-width: 500px) {\n  #igo-menu-button {\n    right: 5px;\n    left: inherit;\n  }\n}\n#igo-menu-button:hover .md-button-focus-overlay {\n  background-color: rgba(51,102,153,0.2);\n}\n/*--- Search bar ---*/\n:host >>> igo-search-bar .igo-search-bar {\n  position: absolute;\n  left: 0;\n  top: 5px;\n  z-index: 4;\n  width: calc(400px - 2 * 5px);\n  margin: 0 5px;\n}\n@media only screen and (max-width: 500px) {\n  :host >>> igo-search-bar .igo-search-bar {\n    width: calc(100% - 40px - (3 * 5px));\n  }\n}\n#igo-lower-panel {\n  border-top-width: 1px;\n  border-top-style: solid;\n  border-top-color: rgba(0,0,0,0.2);\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n}\n"

/***/ }),

/***/ 892:
/***/ (function(module, exports) {

module.exports = ".igo-search-bar {\n  background-color: #fff;\n}\n:host >>> .md-input-wrapper {\n  margin: 0;\n}\n:host >>> label.md-input-placeholder.md-float:not(.md-empty),\n:host >>> label.md-input-placeholder.md-float.md-focused {\n  display: none;\n}\n"

/***/ }),

/***/ 893:
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%;\n  padding: 5px;\n}\ntable tbody tr td:first-child {\n  font-weight: bold;\n}\n"

/***/ }),

/***/ 894:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 895:
/***/ (function(module, exports) {

module.exports = "igo-search-result >>> md-list-item {\n  margin: 5px;\n}\n"

/***/ }),

/***/ 896:
/***/ (function(module, exports) {

module.exports = ".igo-backdrop {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(100,100,100,0.5);\n  z-index: 2;\n  display: none;\n}\n.igo-backdrop-shown {\n  display: block;\n}\n@media only screen and (min-width: 501px) and (max-width: 800px), only screen and (min-width: 801px) {\n  .igo-backdrop-shown {\n    display: none;\n  }\n}\n"

/***/ }),

/***/ 897:
/***/ (function(module, exports) {

module.exports = ".igo-collapsible-header {\n  color: #000;\n  height: 40px;\n  padding: 8px;\n  text-align: center;\n}\n.igo-collapsible-header h4 {\n  margin-top: 0px;\n  margin-bottom: 0px;\n}\n.igo-collapsible-header md-icon {\n  float: left;\n}\n.igo-collapsible-header >>> md-icon {\n  cursor: pointer;\n}\n.igo-collapsible-content {\n  padding-left: 5px;\n}\n.igo-collapsible-title {\n  display: inline-block;\n  max-width: calc(100% - 30px - 5px);\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  margin-left: 5px;\n  float: left;\n  padding: 4px 0;\n}\n"

/***/ }),

/***/ 898:
/***/ (function(module, exports) {

module.exports = ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 100%;\n  width: 100%;\n}\n.igo-flex-main {\n  -webkit-box-flex: 0;\n          flex: 0 0 auto;\n  -webkit-flex: 0 0 auto;\n  -ms-flex: 0 0 auto;\n  overflow: hidden;\n}\n.igo-flex-main.column {\n  -webkit-transition: height 0.25s ease-in;\n  transition: height 0.25s ease-in;\n}\n.igo-flex-main.row {\n  -webkit-transition: width 0.25s ease-in;\n  transition: width 0.25s ease-in;\n}\n.igo-flex-fill {\n  -webkit-box-flex: 1;\n          flex: 1 1 auto;\n  -webkit-flex: 1 1 auto;\n  -ms-flex: 1 1 auto;\n  overflow: hidden;\n  position: relative;\n}\n.igo-flex-fill > div {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n"

/***/ }),

/***/ 899:
/***/ (function(module, exports) {

module.exports = "md-list {\n  padding-top: 0;\n}\n:host >>> md-list-item .md-list-item {\n  height: 46px !important;\n}\n:host >>> [igolistitem] md-list-item [md-list-avatar] {\n  height: auto;\n  width: auto;\n}\n:host >>> [igolistitem]:hover md-list-item {\n  background-color: rgba(153,153,153,0.1);\n  cursor: pointer;\n}\n:host >>> [igolistitem].igo-selected md-list-item {\n  background-color: #999;\n}\n:host >>> [igolistitem]:focus {\n  outline: none;\n}\n"

/***/ }),

/***/ 900:
/***/ (function(module, exports) {

module.exports = ".igo-panel-header {\n  background-color: #369;\n  color: #fff;\n  height: 40px;\n  text-align: center;\n}\n.igo-panel-header h3 {\n  margin-top: 0px;\n  margin-bottom: 0px;\n  height: 40px;\n}\n.igo-panel-header >>> button {\n  height: 40px;\n}\n.igo-panel-header >>> [panelleftbutton] {\n  float: left;\n}\n.igo-panel-header >>> [panelrightbutton] {\n  float: right;\n}\n.igo-panel-content {\n  height: calc(100% - 40px);\n  overflow: auto;\n}\n.igo-panel-title {\n  display: inline-block;\n  max-width: calc(100% - 80px);\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  padding: 9px 0;\n}\n"

/***/ }),

/***/ 901:
/***/ (function(module, exports) {

module.exports = "md-sidenav {\n  background-color: #fff;\n}\n"

/***/ }),

/***/ 902:
/***/ (function(module, exports) {

module.exports = "md-list-item [md-list-avatar] {\n  height: auto;\n  width: auto;\n}\nmd-list-item:hover {\n  background-color: rgba(51,102,153,0.2);\n  cursor: pointer;\n}\n"

/***/ }),

/***/ 903:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 904:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 905:
/***/ (function(module, exports) {

module.exports = "<main>\n  <router-outlet></router-outlet>\n</main>\n"

/***/ }),

/***/ 906:
/***/ (function(module, exports) {

module.exports = "<div [id]=\"id\" class=\"igo-map-target\"></div>\n<igo-zoom [map]=\"map\"></igo-zoom>\n"

/***/ }),

/***/ 907:
/***/ (function(module, exports) {

module.exports = "<div class=\"igo-zoom-container\">\n  <button\n    md-icon-button\n    class=\"igo-primary\"\n    (click)=\"map.zoomIn()\">\n    <md-icon>\n      add\n    </md-icon>\n  </button>\n\n  <button\n    md-icon-button\n    class=\"igo-primary\"\n    (click)=\"map.zoomOut()\">\n    <md-icon>\n      remove\n    </md-icon>\n  </button>\n</div>\n"

/***/ }),

/***/ 908:
/***/ (function(module, exports) {

module.exports = "<md-sidenav-container>\n\n  <igo-backdrop\n    [shown]=\"sidenav.opened\"\n    (click)=\"sidenav.close()\">\n  </igo-backdrop>\n\n  <button\n    md-icon-button\n    id=\"igo-menu-button\"\n    class=\"igo-primary\"\n    (click)=\"sidenav.toggle()\">\n    <md-icon>\n      <ng-container *ngIf=\"!sidenav.opened\">\n        menu\n      </ng-container>\n      <ng-container *ngIf=\"sidenav.opened\">\n        keyboard_arrow_left\n      </ng-container>\n    </md-icon>\n  </button>\n\n  <igo-search-bar\n    #searchBar\n    (key)=\"sidenav.open()\">\n  </igo-search-bar>\n\n  <igo-sidenav\n    #sidenav\n    [opened]=\"false\"\n    (open)=\"searchBar.focus()\">\n\n    <igo-flex\n      #menu\n      direction=\"column\"\n      initial=\"50%\"\n      collapsed=\"51px\"\n      expanded=\"calc(100% - 51px)\"\n      [state]=\"menuState\">\n\n      <div\n        id=\"igo-upper-panel\"\n        class=\"igo-container\">\n\n        <div class=\"igo-content\"  *ngIf=\"!selectedTool\">\n          <igo-toolbar>\n          </igo-toolbar>\n        </div>\n\n        <igo-panel\n          [title]=\"selectedTool.title | translate\"\n          *ngIf=\"selectedTool\">\n\n          <button\n            md-icon-button\n            panelLeftButton\n            class=\"igo-icon-button\"\n            (click)=\"goBack()\">\n            <md-icon>arrow_back</md-icon>\n          </button>\n\n          <button\n            md-icon-button\n            panelRightButton\n            class=\"igo-icon-button\"\n            (click)=\"goHome()\">\n            <md-icon>menu</md-icon>\n          </button>\n\n          <igo-toolbox\n            *ngIf=\"menu.state === 'initial' ||\n                   menu.state === 'expanded'\">\n          </igo-toolbox>\n        </igo-panel>\n\n      </div>\n\n      <div\n        igoFlexFill\n        id=\"igo-lower-panel\"\n        class=\"igo-container\">\n\n        <igo-panel\n          [title]=\"focusedResult.title\"\n          *ngIf=\"focusedResult\">\n          <button\n            md-icon-button\n            panelLeftButton\n            class=\"igo-icon-button\"\n            (click)=\"resizeMenu()\">\n            <md-icon>\n              <ng-container *ngIf=\"menu.state === 'initial'\">\n                arrow_upward\n              </ng-container>\n              <ng-container *ngIf=\"menu.state === 'collapsed'\">\n                arrow_downward\n              </ng-container>\n              <ng-container *ngIf=\"menu.state === 'expanded'\">\n                arrow_upward\n              </ng-container>\n            </md-icon>\n          </button>\n\n          <button\n            md-icon-button\n            panelRightButton\n            class=\"igo-icon-button\"\n            *ngIf=\"media !== 'mobile'\">\n            <md-icon>open_in_new</md-icon>\n          </button>\n          <igo-search-result-details\n            [result]=\"focusedResult\"\n            *ngIf=\"menu.state === 'initial' ||\n                   menu.state === 'collapsed'\">\n          </igo-search-result-details>\n        </igo-panel>\n      </div>\n\n    </igo-flex>\n  </igo-sidenav>\n\n  <igo-map></igo-map>\n\n</md-sidenav-container>\n"

/***/ }),

/***/ 909:
/***/ (function(module, exports) {

module.exports = "<md-input-container class=\"igo-search-bar\">\n  <input\n  \t#input\n  \tmd-input\n    [placeholder]=\"'Search for an address or a place' | translate\"\n    (keyup)=\"keyup($event)\"\n    [ngModel]=\"term\">\n</md-input-container>\n"

/***/ }),

/***/ 910:
/***/ (function(module, exports) {

module.exports = "<table class=\"igo-striped\">\n  <tbody>\n    <tr *ngFor=\"let property of result.properties | keyvalue\">\n      <td>\n        {{property.key}}\n      </td>\n      <td>\n        {{property.value}}\n      </td>\n    </tr>\n  </tbody>\n</table>\n"

/***/ }),

/***/ 911:
/***/ (function(module, exports) {

module.exports = "<md-list-item>\n  <md-icon md-list-avatar>{{result.icon}}</md-icon>\n  <h4 md-line *ngIf=\"result.title_html\" [innerHtml]=\"result.title_html\"></h4>\n  <h4 md-line *ngIf=\"!result.title_html\">{{result.title}}</h4>\n</md-list-item>\n"

/***/ }),

/***/ 912:
/***/ (function(module, exports) {

module.exports = "<igo-list [navigation]=\"true\"> \n  <template ngFor let-sourceResult [ngForOf]=\"sourceResults\">\n    <igo-collapsible\n        title=\"{{sourceResult[0]}} ({{sourceResult[1].length}})\">\n\n      <template ngFor let-result [ngForOf]=\"sourceResult[1]\" let-i=\"index\">\n        <igo-search-result\n          igoListItem\n          tabindex=\"{{i}}\"\n          [focused]=\"focusedResult && focusedResult.id === result.id\n                     && focusedResult.source === sourceResult[0]\"\n          [result]=\"result\"\n          (focusItem)=\"focusResult(result)\"\n          (selectItem)=\"selectResult(result)\">\n        </igo-search-result>\n      </template>\n\n    </igo-collapsible>\n  </template>\n</igo-list>\n"

/***/ }),

/***/ 913:
/***/ (function(module, exports) {

module.exports = "<div class=\"igo-backdrop\" [ngClass]=\"{'igo-backdrop-shown': shown}\"></div>\n"

/***/ }),

/***/ 914:
/***/ (function(module, exports) {

module.exports = "<div class=\"igo-collapsible-header\">\n  <h4>\n  \t<md-icon\n  \t  (click)=\"handleClick()\">\n      <ng-container *ngIf=\"state === 'collapsed'\">\n        expand_more\n      </ng-container>\n      <ng-container *ngIf=\"state !== 'collapsed'\">\n        expand_less\n      </ng-container>\n    </md-icon>\n    <div class=\"igo-collapsible-title\">{{title}}</div>\n  </h4>\n</div>\n<ng-content></ng-content>\n<igo-flex\n  #content\n  direction=\"column\"\n  initial=\"auto\"\n  collapsed=\"0\"\n  expanded=\"auto\"\n  [state]=\"state\">\n  <ng-content></ng-content>\n</igo-flex>\n"

/***/ }),

/***/ 915:
/***/ (function(module, exports) {

module.exports = "<div #flexMain class=\"igo-flex-main {{state}} {{direction}}\">\n  <ng-content></ng-content>\n</div>\n<div class=\"igo-flex-fill\">\n  <div>\n    <ng-content select=\"[igoFlexFill]\"></ng-content>\n  </div>\n</div>\n"

/***/ }),

/***/ 916:
/***/ (function(module, exports) {

module.exports = "<md-list igoClickout (clickout)=\"disableNavigation()\" (click)=\"enableNavigation()\">\n  <ng-content></ng-content>\n</md-list>\n"

/***/ }),

/***/ 917:
/***/ (function(module, exports) {

module.exports = "<div class=\"igo-panel-header\">\n  <h3>\n    <ng-content select=\"[panelLeftButton]\"></ng-content>\n    <div class=\"igo-panel-title\">{{title}}</div>\n    <ng-content select=\"[panelRightButton]\"></ng-content>\n  </h3>\n</div>\n<div class=\"igo-panel-content\">\n  <ng-content></ng-content>\n</div>\n"

/***/ }),

/***/ 918:
/***/ (function(module, exports) {

module.exports = "<md-sidenav [opened]=\"opened\" mode=\"side\">\n  <div class=\"igo-sidenav-content\">\n  \t<ng-content></ng-content>\n  </div>\n</md-sidenav>\n"

/***/ }),

/***/ 919:
/***/ (function(module, exports) {

module.exports = "<md-list-item (click)=\"toolSelected.emit(tool)\">\n  <md-icon md-list-avatar>{{tool.icon}}</md-icon>\n  <h4 md-line>{{tool.title | translate}}</h4>\n</md-list-item>\n"

/***/ }),

/***/ 920:
/***/ (function(module, exports) {

module.exports = "<igo-list> \n  <template ngFor let-tool [ngForOf]=\"tools\" [ngForTrackBy]=\"trackBy\">\n    <igo-toolbar-item\n      igoListItem\n      navigation=\"false\"\n      [tool]=tool\n      (toolSelected)=\"selectTool(tool)\">\n    </igo-toolbar-item>\n  </template>\n</igo-list>\n"

/***/ }),

/***/ 921:
/***/ (function(module, exports) {

module.exports = "<template #target></template>\n"

/***/ }),

/***/ 971:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(519);


/***/ })

},[971]);
//# sourceMappingURL=main.bundle.map
