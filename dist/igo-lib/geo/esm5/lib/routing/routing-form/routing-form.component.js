/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import olFeature from 'ol/Feature';
import * as olgeom from 'ol/geom';
import * as olproj from 'ol/proj';
import * as olstyle from 'ol/style';
import * as olcondition from 'ol/events/condition';
import * as olinteraction from 'ol/interaction';
import * as olextent from 'ol/extent';
import * as olobservable from 'ol/Observable';
import { Clipboard } from '@igo2/utils';
import { LanguageService, MessageService, RouteService } from '@igo2/core';
import { getEntityTitle } from '@igo2/common';
import { IgoMap } from '../../map/shared/map';
import { SearchService } from '../../search/shared/search.service';
import { VectorLayer } from '../../layer/shared/layers/vector-layer';
import { FeatureDataSource } from '../../datasource/shared/datasources/feature-datasource';
import { createOverlayMarkerStyle } from '../../overlay/shared/overlay.utils';
import { FeatureMotion } from '../../feature/shared/feature.enums';
import { moveToOlFeatures } from '../../feature/shared/feature.utils';
import { RoutingService } from '../shared/routing.service';
import { RoutingFormService } from './routing-form.service';
import { QueryService } from '../../query/shared/query.service';
var RoutingFormComponent = /** @class */ (function () {
    function RoutingFormComponent(formBuilder, routingService, languageService, messageService, searchService, queryService, routingFormService, route) {
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
    Object.defineProperty(RoutingFormComponent.prototype, "term", {
        // https://stackoverflow.com/questions/46364852/create-input-fields-dynamically-in-angular-2
        get: 
        // https://stackoverflow.com/questions/46364852/create-input-fields-dynamically-in-angular-2
        /**
         * @return {?}
         */
        function () {
            return this._term;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._term = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoutingFormComponent.prototype, "debounce", {
        get: /**
         * @return {?}
         */
        function () {
            return this._debounce;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._debounce = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoutingFormComponent.prototype, "length", {
        get: /**
         * @return {?}
         */
        function () {
            return this._length;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._length = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoutingFormComponent.prototype, "map", {
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
    /**
     * @param {?} selectedRoute
     * @return {?}
     */
    RoutingFormComponent.prototype.changeRoute = /**
     * @param {?} selectedRoute
     * @return {?}
     */
    function (selectedRoute) {
        this.showRouteGeometry();
    };
    /**
     * @return {?}
     */
    RoutingFormComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribeRoutesQueries();
        this.unlistenSingleClick();
        this.queryService.queryEnabled = true;
        /** @type {?} */
        var stopCoordinates = [];
        this.stops.value.forEach((/**
         * @param {?} stop
         * @return {?}
         */
        function (stop) {
            stopCoordinates.push(stop.stopCoordinates);
        }));
        this.routingRoutesOverlayDataSource.ol.clear();
        this.routingStopsOverlayDataSource.ol.clear();
        this.routingFormService.setStopsCoordinates(stopCoordinates);
    };
    /**
     * @return {?}
     */
    RoutingFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    RoutingFormComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.queryService.queryEnabled = false;
        this.focusOnStop = false;
        /** @type {?} */
        var stopsLayer = new VectorLayer({
            title: 'routingStopOverlay',
            zIndex: 999,
            id: 'routingStops',
            source: this.routingStopsOverlayDataSource,
            showInLayerList: false
        });
        /** @type {?} */
        var routesLayer = new VectorLayer({
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
        var selectedStopFeature;
        /** @type {?} */
        var selectStops = new olinteraction.Select({
            layers: [stopsLayer.ol],
            condition: olcondition.pointerMove,
            hitTolerance: 7
        });
        /** @type {?} */
        var translateStop = new olinteraction.Translate({
            layers: [stopsLayer.ol],
            features: selectedStopFeature
        });
        // TODO: Check to disable pointermove IF a stop is already selected
        /** @type {?} */
        var selectRouteHover = new olinteraction.Select({
            layers: [routesLayer.ol],
            condition: olcondition.pointerMove,
            hitTolerance: 7
        });
        this.selectRoute = new olinteraction.Select({
            layers: [routesLayer.ol],
            hitTolerance: 7
        });
        this.map.ol.on('pointermove', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            /** @type {?} */
            var selectRouteCnt = selectRouteHover.getFeatures().getLength();
            if (selectRouteCnt === 0) {
                _this.routingFormService.unsetMapWaitingForRoutingClick();
            }
            else {
                _this.routingFormService.setMapWaitingForRoutingClick();
            }
        }));
        selectStops.on('select', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            selectedStopFeature = evt.target.getFeatures()[0];
        }));
        this.selectRoute.on('select', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            if (_this.focusOnStop === false) {
                /** @type {?} */
                var selectCoordinates = olproj.transform(((/** @type {?} */ (evt))).mapBrowserEvent.coordinate, _this.map.projection, _this.projection);
                _this.addStop();
                /** @type {?} */
                var pos = _this.stops.length - 2;
                _this.stops.at(pos).patchValue({ stopCoordinates: selectCoordinates });
                _this.handleLocationProposals(selectCoordinates, pos);
                _this.addStopOverlay(selectCoordinates, pos);
                _this.selectRoute.getFeatures().clear();
            }
            _this.selectRoute.getFeatures().clear();
        }));
        this.routesQueries$$.push(this.stopsForm.statusChanges
            .pipe(debounceTime(this._debounce))
            .subscribe((/**
         * @param {?} val
         * @return {?}
         */
        function (val) { return _this.onFormChange(); })));
        translateStop.on('translateend', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            /** @type {?} */
            var translatedID = evt.features.getArray()[0].getId();
            /** @type {?} */
            var translatedPos = translatedID.split('_');
            /** @type {?} */
            var p;
            switch (translatedPos[1]) {
                case 'start':
                    p = 0;
                    break;
                case 'end':
                    p = _this.stops.length - 1;
                    break;
                default:
                    p = Number(translatedPos[1]);
                    break;
            }
            /** @type {?} */
            var translationEndCoordinates = olproj.transform(evt.features
                .getArray()[0]
                .getGeometry()
                .getCoordinates(), _this.map.projection, _this.projection);
            _this.stops
                .at(p)
                .patchValue({ stopCoordinates: translationEndCoordinates });
            _this.stops.at(p).patchValue({ stopProposals: [] });
            _this.handleLocationProposals(translationEndCoordinates, p);
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
        function (term) { return _this.handleTermChanged(term); })));
    };
    /**
     * @param {?} coordinates
     * @param {?} stopIndex
     * @return {?}
     */
    RoutingFormComponent.prototype.handleLocationProposals = /**
     * @param {?} coordinates
     * @param {?} stopIndex
     * @return {?}
     */
    function (coordinates, stopIndex) {
        var _this = this;
        /** @type {?} */
        var groupedLocations = [];
        this.searchService
            .reverseSearch(coordinates, { zoom: this.map.getZoom() })
            .map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return _this.routesQueries$$.push(res.request.pipe(map((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f; }))).subscribe((/**
             * @param {?} results
             * @return {?}
             */
            function (results) {
                results.forEach((/**
                 * @param {?} result
                 * @return {?}
                 */
                function (result) {
                    if (groupedLocations.filter((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) { return f.source === result.source; }))
                        .length === 0) {
                        groupedLocations.push({
                            source: result.source,
                            results: results.map((/**
                             * @param {?} r
                             * @return {?}
                             */
                            function (r) { return r.data; }))
                        });
                    }
                }));
                _this.stops
                    .at(stopIndex)
                    .patchValue({ stopProposals: groupedLocations });
                // TODO: Prefer another source?
                if (results[0]) {
                    if (results[0].source.getId() === 'icherchereverse') {
                        // prefer address type.
                        /** @type {?} */
                        var resultPos = 0;
                        for (var i = 0; i < results.length; i++) {
                            /** @type {?} */
                            var feature = results[i].data;
                            if (feature.properties.type === 'adresse') {
                                resultPos = i;
                                break;
                            }
                        }
                        _this.stops.at(stopIndex).patchValue({
                            stopPoint: getEntityTitle(results[resultPos])
                        });
                        if (results[resultPos].data.geometry.type === 'Point') {
                            _this.stops.at(stopIndex).patchValue({
                                stopCoordinates: results[resultPos].data.geometry.coordinates
                            });
                        }
                        else {
                            // Not moving the translated point Only to suggest value into the UI.
                        }
                    }
                }
                else {
                    _this.stops.at(stopIndex).patchValue({ stopPoint: coordinates });
                    _this.stops.at(stopIndex).patchValue({ stopProposals: [] });
                }
            })));
        }));
    };
    /**
     * @param {?} index
     * @return {?}
     */
    RoutingFormComponent.prototype.routingText = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (index === 0) {
            return 'start';
        }
        else if (index === this.stops.length - 1 || this.stops.length === 1) {
            return 'end';
        }
        else {
            return 'intermediate';
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    RoutingFormComponent.prototype.raiseStop = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (index > 0) {
            this.moveStop(index, -1);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    RoutingFormComponent.prototype.lowerStop = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (index < this.stops.length - 1) {
            this.moveStop(index, 1);
        }
    };
    /**
     * @param {?} index
     * @param {?} diff
     * @return {?}
     */
    RoutingFormComponent.prototype.moveStop = /**
     * @param {?} index
     * @param {?} diff
     * @return {?}
     */
    function (index, diff) {
        /** @type {?} */
        var fromValue = this.stops.at(index);
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
    };
    Object.defineProperty(RoutingFormComponent.prototype, "stops", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.stopsForm.get('stops')));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    RoutingFormComponent.prototype.getStopsCoordinates = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var stopCoordinates = [];
        this.stops.value.forEach((/**
         * @param {?} stop
         * @return {?}
         */
        function (stop) {
            if (stop.stopCoordinates instanceof Array) {
                stopCoordinates.push(stop.stopCoordinates);
            }
        }));
        this.routingFormService.setStopsCoordinates(stopCoordinates);
        return stopCoordinates;
    };
    /**
     * @return {?}
     */
    RoutingFormComponent.prototype.addStop = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var insertIndex = this.stops.length - 1;
        this.stops.insert(insertIndex, this.createStop());
    };
    /**
     * @param {?=} routingPos
     * @return {?}
     */
    RoutingFormComponent.prototype.createStop = /**
     * @param {?=} routingPos
     * @return {?}
     */
    function (routingPos) {
        if (routingPos === void 0) { routingPos = 'intermediate'; }
        return this.formBuilder.group({
            stopPoint: [''],
            stopProposals: [[]],
            routingText: routingPos,
            stopCoordinates: ['', [Validators.required]]
        });
    };
    /**
     * @param {?} index
     * @return {?}
     */
    RoutingFormComponent.prototype.removeStop = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var _this = this;
        this.routingStopsOverlayDataSource.ol.clear();
        this.stops.removeAt(index);
        /** @type {?} */
        var cnt = 0;
        this.stops.value.forEach((/**
         * @param {?} stop
         * @return {?}
         */
        function (stop) {
            _this.stops.at(cnt).patchValue({ routingText: _this.routingText(cnt) });
            _this.addStopOverlay(_this.stops.at(cnt).value.stopCoordinates, cnt);
            cnt++;
        }));
    };
    /**
     * @return {?}
     */
    RoutingFormComponent.prototype.resetForm = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.routesResults = undefined;
        /** @type {?} */
        var nbStops = this.stops.length;
        for (var i = 0; i < nbStops; i++) {
            this.stops.removeAt(0);
        }
        this.stops.insert(0, this.createStop('start'));
        this.stops.insert(1, this.createStop('end'));
        this.routingStopsOverlayDataSource.ol.getFeatures().forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            _this.deleteRoutingOverlaybyID(element.getId());
        }));
        this.routingRoutesOverlayDataSource.ol.clear();
        this.routingStopsOverlayDataSource.ol.clear();
        this.selectRoute.getFeatures().clear();
    };
    /**
     * @return {?}
     */
    RoutingFormComponent.prototype.onFormChange = /**
     * @return {?}
     */
    function () {
        if (this.stopsForm.valid) {
            this.routingRoutesOverlayDataSource.ol.clear();
            /** @type {?} */
            var coords = this.getStopsCoordinates();
            if (coords.length >= 2) {
                this.getRoutes(coords);
            }
            else {
                this.routingRoutesOverlayDataSource.ol.clear();
            }
        }
    };
    /**
     * @param {?} step
     * @param {?} cnt
     * @return {?}
     */
    RoutingFormComponent.prototype.formatStep = /**
     * @param {?} step
     * @param {?} cnt
     * @return {?}
     */
    function (step, cnt) {
        return this.formatInstruction(step.maneuver.type, step.maneuver.modifier, step.name, step.maneuver.bearing_after, cnt, step.maneuver.exit, cnt === this.activeRoute.steps.length - 1);
    };
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
    RoutingFormComponent.prototype.formatInstruction = /**
     * @param {?} type
     * @param {?} modifier
     * @param {?} route
     * @param {?} direction
     * @param {?} stepPosition
     * @param {?} exit
     * @param {?=} lastStep
     * @return {?}
     */
    function (type, modifier, route, direction, stepPosition, exit, lastStep) {
        if (lastStep === void 0) { lastStep = false; }
        /** @type {?} */
        var directiveFr;
        /** @type {?} */
        var directiveEn;
        /** @type {?} */
        var image = 'arrow_forward';
        /** @type {?} */
        var cssClass = 'rotate-270';
        /** @type {?} */
        var translatedDirection = this.translateBearing(direction);
        /** @type {?} */
        var translatedModifier = this.translateModifier(modifier);
        /** @type {?} */
        var enPrefix = modifier === 'straight' ? '' : 'on the ';
        /** @type {?} */
        var frPrefix = modifier === 'straight' ? '' : 'à ';
        /** @type {?} */
        var frAggregatedDirection = frPrefix + translatedModifier;
        /** @type {?} */
        var enAggregatedDirection = enPrefix + translatedModifier;
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
                var coma = ', ';
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
        var directive;
        if (this.browserLanguage === 'fr') {
            directive = directiveFr;
        }
        else if (this.browserLanguage === 'en') {
            directive = directiveEn;
        }
        return { instruction: directive, image: image, cssClass: cssClass };
    };
    /**
     * @param {?} modifier
     * @return {?}
     */
    RoutingFormComponent.prototype.translateModifier = /**
     * @param {?} modifier
     * @return {?}
     */
    function (modifier) {
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
    };
    /**
     * @param {?} bearing
     * @return {?}
     */
    RoutingFormComponent.prototype.translateBearing = /**
     * @param {?} bearing
     * @return {?}
     */
    function (bearing) {
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
    };
    /**
     * @param {?} distance
     * @return {?}
     */
    RoutingFormComponent.prototype.formatDistance = /**
     * @param {?} distance
     * @return {?}
     */
    function (distance) {
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
    };
    /**
     * @param {?} duration
     * @param {?=} summary
     * @return {?}
     */
    RoutingFormComponent.prototype.formatDuration = /**
     * @param {?} duration
     * @param {?=} summary
     * @return {?}
     */
    function (duration, summary) {
        if (summary === void 0) { summary = false; }
        if (duration >= 3600) {
            /** @type {?} */
            var hour = Math.floor(duration / 3600);
            /** @type {?} */
            var minute = Math.round((duration / 3600 - hour) * 60);
            if (minute === 60) {
                return hour + 1 + ' h';
            }
            return hour + ' h ' + minute + ' min';
        }
        if (duration >= 60) {
            return Math.round(duration / 60) + ' min';
        }
        return duration + ' s';
    };
    /**
     * @param {?} step
     * @param {?=} zoomToExtent
     * @return {?}
     */
    RoutingFormComponent.prototype.showSegment = /**
     * @param {?} step
     * @param {?=} zoomToExtent
     * @return {?}
     */
    function (step, zoomToExtent) {
        if (zoomToExtent === void 0) { zoomToExtent = false; }
        this.showRouteSegmentGeometry(step.geometry.coordinates, zoomToExtent);
    };
    /**
     * @param {?} coordinates
     * @param {?=} zoomToExtent
     * @return {?}
     */
    RoutingFormComponent.prototype.showRouteSegmentGeometry = /**
     * @param {?} coordinates
     * @param {?=} zoomToExtent
     * @return {?}
     */
    function (coordinates, zoomToExtent) {
        if (zoomToExtent === void 0) { zoomToExtent = false; }
        this.deleteRoutingOverlaybyID('endSegment');
        /** @type {?} */
        var geometry4326 = new olgeom.LineString(coordinates);
        /** @type {?} */
        var geometry3857 = geometry4326.transform('EPSG:4326', 'EPSG:3857');
        /** @type {?} */
        var routeSegmentCoordinates = ((/** @type {?} */ (geometry3857))).getCoordinates();
        /** @type {?} */
        var lastPoint = routeSegmentCoordinates[0];
        /** @type {?} */
        var geometry = new olgeom.Point(lastPoint);
        /** @type {?} */
        var feature = new olFeature({ geometry: geometry });
        feature.setId('endSegment');
        if (geometry === null) {
            return;
        }
        if (geometry.getType() === 'Point') {
            feature.setStyle([
                new olstyle.Style({
                    geometry: geometry,
                    image: new olstyle.Circle({
                        radius: 7,
                        stroke: new olstyle.Stroke({ color: '#FF0000', width: 3 })
                    })
                })
            ]);
        }
        if (zoomToExtent) {
            this.map.viewController.zoomToExtent(feature.getGeometry().getExtent());
        }
        this.routingRoutesOverlayDataSource.ol.addFeature(feature);
    };
    /**
     * @return {?}
     */
    RoutingFormComponent.prototype.zoomRoute = /**
     * @return {?}
     */
    function () {
        this.map.viewController.zoomToExtent(this.routingRoutesOverlayDataSource.ol.getExtent());
    };
    /**
     * @param {?=} moveToExtent
     * @return {?}
     */
    RoutingFormComponent.prototype.showRouteGeometry = /**
     * @param {?=} moveToExtent
     * @return {?}
     */
    function (moveToExtent) {
        if (moveToExtent === void 0) { moveToExtent = false; }
        /** @type {?} */
        var geom = this.activeRoute.geometry.coordinates;
        /** @type {?} */
        var geometry4326 = new olgeom.LineString(geom);
        /** @type {?} */
        var geometry3857 = geometry4326.transform('EPSG:4326', 'EPSG:3857');
        this.routingRoutesOverlayDataSource.ol.clear();
        /** @type {?} */
        var routingFeature = new olFeature({ geometry: geometry3857 });
        routingFeature.setStyle([
            new olstyle.Style({
                stroke: new olstyle.Stroke({ color: '#6a7982', width: 10 })
            }),
            new olstyle.Style({
                stroke: new olstyle.Stroke({ color: '#4fa9dd', width: 6 })
            })
        ]);
        this.routingRoutesOverlayDataSource.ol.addFeature(routingFeature);
        if (moveToExtent) {
            this.map.viewController.zoomToExtent(this.routingRoutesOverlayDataSource.ol.getExtent());
        }
    };
    /**
     * @param {?} stopsArrayCoordinates
     * @param {?=} moveToExtent
     * @return {?}
     */
    RoutingFormComponent.prototype.getRoutes = /**
     * @param {?} stopsArrayCoordinates
     * @param {?=} moveToExtent
     * @return {?}
     */
    function (stopsArrayCoordinates, moveToExtent) {
        var _this = this;
        if (moveToExtent === void 0) { moveToExtent = false; }
        /** @type {?} */
        var routeResponse = this.routingService.route(stopsArrayCoordinates);
        if (routeResponse) {
            routeResponse.map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                return _this.routesQueries$$.push(res.subscribe((/**
                 * @param {?} route
                 * @return {?}
                 */
                function (route) {
                    _this.routesResults = route;
                    _this.activeRoute = (/** @type {?} */ (_this.routesResults[0]));
                    _this.showRouteGeometry(moveToExtent);
                })));
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    RoutingFormComponent.prototype.unlistenSingleClick = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.focusKey.length !== 0) {
            this.focusKey.forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                olobservable.unByKey(key);
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    RoutingFormComponent.prototype.unsubscribeRoutesQueries = /**
     * @private
     * @return {?}
     */
    function () {
        this.routesQueries$$.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
        this.routesQueries$$ = [];
    };
    /**
     * @return {?}
     */
    RoutingFormComponent.prototype.copyLinkToClipboard = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var successful = Clipboard.copy(this.getUrl());
        if (successful) {
            /** @type {?} */
            var translate = this.languageService.translate;
            /** @type {?} */
            var title = translate.instant('igo.geo.routingForm.dialog.copyTitle');
            /** @type {?} */
            var msg = translate.instant('igo.geo.routingForm.dialog.copyMsgLink');
            this.messageService.success(msg, title);
        }
    };
    /**
     * @return {?}
     */
    RoutingFormComponent.prototype.copyDirectionsToClipboard = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var indent = '\t';
        /** @type {?} */
        var activeRouteDirective = this.languageService.translate.instant('igo.geo.routingForm.instructions') + ':\n';
        /** @type {?} */
        var wayPointList = '';
        /** @type {?} */
        var summary = this.languageService.translate.instant('igo.geo.routingForm.summary') +
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
        var url = this.languageService.translate.instant('igo.geo.routingForm.link') +
            ':\n' +
            indent +
            this.getUrl();
        /** @type {?} */
        var wayPointsCnt = 1;
        this.stops.value.forEach((/**
         * @param {?} stop
         * @return {?}
         */
        function (stop) {
            /** @type {?} */
            var coord = '';
            /** @type {?} */
            var stopPoint = '';
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
        var localCnt = 0;
        this.activeRoute.steps.forEach((/**
         * @param {?} step
         * @return {?}
         */
        function (step) {
            /** @type {?} */
            var instruction = _this.formatStep(step, localCnt).instruction;
            /** @type {?} */
            var distance = _this.formatDistance(step.distance) === undefined
                ? ''
                : ' (' + _this.formatDistance(step.distance) + ')';
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
        var directionsBody = summary + wayPointList + '\n' + url + '\n\n' + activeRouteDirective;
        /** @type {?} */
        var successful = Clipboard.copy(directionsBody);
        if (successful) {
            /** @type {?} */
            var translate = this.languageService.translate;
            /** @type {?} */
            var title = translate.instant('igo.geo.routingForm.dialog.copyTitle');
            /** @type {?} */
            var msg = translate.instant('igo.geo.routingForm.dialog.copyMsg');
            this.messageService.success(msg, title);
        }
    };
    /**
     * @private
     * @param {?} term
     * @return {?}
     */
    RoutingFormComponent.prototype.handleTermChanged = /**
     * @private
     * @param {?} term
     * @return {?}
     */
    function (term) {
        var _this = this;
        if (term !== undefined || term.length !== 0) {
            /** @type {?} */
            var searchProposals_1 = [];
            /** @type {?} */
            var researches = this.searchService.search(term);
            researches.map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                return _this.routesQueries$$.push(res.request.subscribe((/**
                 * @param {?} results
                 * @return {?}
                 */
                function (results) {
                    results
                        .filter((/**
                     * @param {?} r
                     * @return {?}
                     */
                    function (r) { return r.data.geometry; }))
                        .forEach((/**
                     * @param {?} element
                     * @return {?}
                     */
                    function (element) {
                        if (searchProposals_1.filter((/**
                         * @param {?} r
                         * @return {?}
                         */
                        function (r) { return r.source === element.source; }))
                            .length === 0) {
                            searchProposals_1.push({
                                source: element.source,
                                results: results.map((/**
                                 * @param {?} r
                                 * @return {?}
                                 */
                                function (r) { return r.data; }))
                            });
                        }
                    }));
                    _this.stops
                        .at(_this.currentStopIndex)
                        .patchValue({ stopProposals: searchProposals_1 });
                })));
            }));
        }
    };
    /**
     * @param {?} term
     * @return {?}
     */
    RoutingFormComponent.prototype.setTerm = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        this.term = term;
        if (this.keyIsValid(term) &&
            (term.length >= this.length || term.length === 0)) {
            this.stream$.next(term);
        }
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    RoutingFormComponent.prototype.keyIsValid = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.invalidKeys.find((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value === key; })) === undefined;
    };
    /**
     * @param {?} i
     * @param {?} event
     * @return {?}
     */
    RoutingFormComponent.prototype.keyup = /**
     * @param {?} i
     * @param {?} event
     * @return {?}
     */
    function (i, event) {
        var _this = this;
        /** @type {?} */
        var term = ((/** @type {?} */ (event.target))).value;
        this.setTerm(term);
        this.map.ol.un('singleclick', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            _this.handleMapClick(evt, i);
        }));
    };
    /**
     * @param {?} stopIndex
     * @return {?}
     */
    RoutingFormComponent.prototype.clearStop = /**
     * @param {?} stopIndex
     * @return {?}
     */
    function (stopIndex) {
        this.deleteRoutingOverlaybyID(this.getStopOverlayID(stopIndex));
        this.stops.removeAt(stopIndex);
        this.stops.insert(stopIndex, this.createStop(this.routingText(stopIndex)));
        this.routingRoutesOverlayDataSource.ol.clear();
    };
    /**
     * @param {?} proposal
     * @param {?} i
     * @return {?}
     */
    RoutingFormComponent.prototype.chooseProposal = /**
     * @param {?} proposal
     * @param {?} i
     * @return {?}
     */
    function (proposal, i) {
        if (proposal !== undefined) {
            /** @type {?} */
            var geomCoord = void 0;
            /** @type {?} */
            var geom = ((/** @type {?} */ (proposal))).geometry;
            if (geom.type === 'Point') {
                geomCoord = geom.coordinates;
            }
            else if (geom.type.search('Line') >= 0) {
                /** @type {?} */
                var coordArray = [];
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
                var polygonExtent = proposal.extent;
                /** @type {?} */
                var long = polygonExtent[0] + (polygonExtent[2] - polygonExtent[0]) / 2;
                /** @type {?} */
                var lat = polygonExtent[1] + (polygonExtent[3] - polygonExtent[1]) / 2;
                geomCoord = [long, lat];
            }
            if (geomCoord !== undefined) {
                this.stops.at(i).patchValue({ stopCoordinates: geomCoord });
                this.addStopOverlay(geomCoord, i);
                /** @type {?} */
                var proposalExtent = this.routingStopsOverlayDataSource.ol
                    .getFeatureById(this.getStopOverlayID(i))
                    .getGeometry()
                    .getExtent();
                if (!olextent.intersects(proposalExtent, this.map.getExtent())) {
                    this.map.viewController.moveToExtent(proposalExtent);
                }
            }
        }
    };
    /**
     * @param {?} i
     * @return {?}
     */
    RoutingFormComponent.prototype.focus = /**
     * @param {?} i
     * @return {?}
     */
    function (i) {
        var _this = this;
        this.unlistenSingleClick();
        this.currentStopIndex = i;
        this.focusOnStop = true;
        this.routingFormService.setMapWaitingForRoutingClick();
        this.focusKey.push(this.map.ol.once('singleclick', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            _this.handleMapClick(evt, i);
        })));
    };
    /**
     * @private
     * @param {?} event
     * @param {?=} indexPos
     * @return {?}
     */
    RoutingFormComponent.prototype.handleMapClick = /**
     * @private
     * @param {?} event
     * @param {?=} indexPos
     * @return {?}
     */
    function (event, indexPos) {
        var _this = this;
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
        var clickCoordinates = olproj.transform(event.coordinate, this.map.projection, this.projection);
        this.stops.at(indexPos).patchValue({ stopCoordinates: clickCoordinates });
        this.handleLocationProposals(clickCoordinates, indexPos);
        this.addStopOverlay(clickCoordinates, indexPos);
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.focusOnStop = false; // prevent to trigger map click and Select on routes at same time.
        }), 500);
        this.routingFormService.unsetMapWaitingForRoutingClick();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    RoutingFormComponent.prototype.geolocateStop = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        moveToOlFeatures(this.map, [this.map.geolocationFeature], FeatureMotion.Move);
        /** @type {?} */
        var geolocateCoordinates = this.map.getCenter(this.projection);
        this.stops.at(index).patchValue({ stopCoordinates: geolocateCoordinates });
        this.addStopOverlay(geolocateCoordinates, index);
        this.handleLocationProposals(geolocateCoordinates, index);
    };
    /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    RoutingFormComponent.prototype.addStopOverlay = /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    function (coordinates, index) {
        /** @type {?} */
        var routingText = this.routingText(index);
        /** @type {?} */
        var stopColor;
        /** @type {?} */
        var stopText;
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
        var geometry = new olgeom.Point(olproj.transform(coordinates, this.projection, this.map.projection));
        /** @type {?} */
        var feature = new olFeature({ geometry: geometry });
        /** @type {?} */
        var stopID = this.getStopOverlayID(index);
        this.deleteRoutingOverlaybyID(stopID);
        feature.setId(stopID);
        if (geometry === null) {
            return;
        }
        if (geometry.getType() === 'Point') {
            /** @type {?} */
            var olStyle = createOverlayMarkerStyle(stopColor);
            // stopText
            feature.setStyle(olStyle);
        }
        this.routingStopsOverlayDataSource.ol.addFeature(feature);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    RoutingFormComponent.prototype.getStopOverlayID = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var txt;
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
    };
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    RoutingFormComponent.prototype.deleteRoutingOverlaybyID = /**
     * @private
     * @param {?} id
     * @return {?}
     */
    function (id) {
        if (this.routingStopsOverlayDataSource.ol.getFeatureById(id)) {
            this.routingStopsOverlayDataSource.ol.removeFeature(this.routingStopsOverlayDataSource.ol.getFeatureById(id));
        }
        if (this.routingRoutesOverlayDataSource.ol.getFeatureById(id)) {
            this.routingRoutesOverlayDataSource.ol.removeFeature(this.routingRoutesOverlayDataSource.ol.getFeatureById(id));
        }
    };
    /**
     * @private
     * @return {?}
     */
    RoutingFormComponent.prototype.getUrl = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.route) {
            return;
        }
        /** @type {?} */
        var routingKey = this.route.options.routingCoordKey;
        /** @type {?} */
        var stopsCoordinates = [];
        if (this.routingFormService &&
            this.routingFormService.getStopsCoordinates() &&
            this.routingFormService.getStopsCoordinates().length !== 0) {
            this.routingFormService.getStopsCoordinates().forEach((/**
             * @param {?} coord
             * @return {?}
             */
            function (coord) {
                stopsCoordinates.push(coord);
            }));
        }
        /** @type {?} */
        var routingUrl = '';
        if (stopsCoordinates.length >= 2) {
            routingUrl = routingKey + "=" + stopsCoordinates.join(';');
        }
        return "" + location.origin + location.pathname + "?tool=directions&" + routingUrl;
    };
    RoutingFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-routing-form',
                    template: "<form class=\"igo-form\" [formGroup]=\"stopsForm\">\r\n  <!-- <div class=\"igo-form-button-group\">\r\n\r\n  </div> -->\r\n  <div #inputs formArrayName=\"stops\" *ngFor=\"let stop of stops.controls; let i = index;\">\r\n    <mat-list-item [formGroupName]=\"i\">\r\n\r\n      <div class=\"igo-input-container\">\r\n        <button *ngIf=\"map.geolocationFeature\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.geolocate' | translate\" (click)=\"geolocateStop(i)\">\r\n          <mat-icon svgIcon=\"crosshairs-gps\"></mat-icon>\r\n        </button>\r\n        <mat-form-field>\r\n          <input matInput formControlName=\"stopPoint\" [matAutocomplete]=\"auto\" placeholder=\"{{'igo.geo.routingForm.'+stop.value.routingText | translate}}\"\r\n            (focus)=\"focus(i)\" (keyup)=\"keyup(i,$event)\">\r\n\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-optgroup *ngFor=\"let source of stop.value.stopProposals\" [label]=\"source.source\" [disabled]=\"source.disabled\">\r\n              <mat-option *ngFor=\"let result of source.results\" [value]=\"result.title\" (onSelectionChange)=\"chooseProposal(result,i)\">\r\n                {{ result.title }}\r\n              </mat-option>\r\n            </mat-optgroup>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n        <button mat-button *ngIf=\"stop.value && (stop.value.stopPoint.length>0 || stop.value.stopProposals.length>0)\" matSuffix mat-icon-button\r\n          aria-label=\"Clear\" (click)=\"clearStop(i)\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n        <!-- <div class=\"igo-form-button-group\"> -->\r\n\r\n\r\n          <!-- <button *ngIf=\"i !== 0\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.raiseStop' | translate\"\r\n            [color]=\"color\" (click)=\"raiseStop(i)\">\r\n            <mat-icon svgIcon=\"arrow-upward\"></mat-icon>\r\n          </button>\r\n          <button *ngIf=\"i !== stops.length - 1\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.lowerStop' | translate\"\r\n            [color]=\"color\" (click)=\"lowerStop(i)\">\r\n            <mat-icon svgIcon=\"arrow-downward\"></mat-icon>\r\n          </button> -->\r\n\r\n          <button *ngIf=\"i !== 0 && i !== stops.length - 1\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.removeStop' | translate\"\r\n            color=\"warn\" (click)=\"removeStop(i)\">\r\n            <mat-icon svgIcon=\"delete\"></mat-icon>\r\n          </button>\r\n        <!-- </div> -->\r\n      </div>\r\n\r\n    </mat-list-item>\r\n  </div>\r\n  <div class=\"igo-form-button-group\">\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.routingForm.zoomRoute' | translate\"\r\n      *ngIf=\"routesResults\" color=\"primary\" (click)=\"zoomRoute()\">\r\n      <mat-icon svgIcon=\"zoom-in\"></mat-icon>\r\n    </button>\r\n      <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.addStop' | translate\"\r\n      color=\"primary\" (click)=\"addStop()\">\r\n      <mat-icon svgIcon=\"map-marker-plus\"></mat-icon>\r\n    </button>\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.resetRoutingBtn' | translate\"\r\n      *ngIf=\"routesResults\" color=\"warn\" (click)=\"resetForm()\">\r\n      <mat-icon svgIcon=\"restore-page\"></mat-icon>\r\n    </button>\r\n    <button mat-icon-button *ngIf=\"routesResults\" tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.copy' | translate\"\r\n      color=\"primary\" (click)=\"copyDirectionsToClipboard()\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n    </button>\r\n    <button mat-icon-button *ngIf=\"routesResults\" tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.routingForm.link' | translate\"\r\n    color=\"primary\" (click)=\"copyLinkToClipboard()\">\r\n    <mat-icon svgIcon=\"link\"></mat-icon>\r\n  </button>\r\n  </div>\r\n\r\n</form>\r\n\r\n<div class=\"igo-input-container\" *ngIf=\"routesResults\">\r\n  <mat-form-field *ngIf=\"routesResults && routesResults.length > 1\">\r\n    <mat-select placeholder=\"{{'igo.geo.routingForm.drivingOptions' | translate}}\" (selectionChange)=\"changeRoute($event)\" [(ngModel)]=\"activeRoute\">\r\n      <mat-option *ngFor=\"let pathRouting of routesResults; let cnt = index;\" [value]=\"pathRouting\">\r\n        Option {{cnt + 1}} : {{this.formatDistance(pathRouting.distance)}} ({{this.formatDuration(pathRouting.duration)}})\r\n      </mat-option>\r\n    </mat-select>\r\n  </mat-form-field>\r\n\r\n  <mat-divider *ngIf=\"routesResults && routesResults.length === 0\"></mat-divider>\r\n\r\n  <mat-list>\r\n    <h3 mat-header>{{activeRoute.title}}</h3>\r\n    <h3 mat-subheader>{{this.formatDistance(activeRoute.distance)}}, {{this.formatDuration(activeRoute.duration)}}</h3>\r\n\r\n    <mat-list-item (mouseenter)=\"showSegment(step)\" (click)=\"showSegment(step,true)\" *ngFor=\"let step of activeRoute.steps; let cnt = index;\"\r\n      igoListItem>\r\n      <mat-icon [ngClass]=\"this.formatStep(step,cnt).cssClass\" mat-list-icon svgIcon=\"{{this.formatStep(step,cnt).image}}\"></mat-icon>\r\n\r\n      <h4 mat-line (click)=\"showSegment(step,true)\">{{cnt +1}}. {{this.formatStep(step,cnt).instruction}}</h4>\r\n      <h4 mat-line class=\"right\">{{this.formatDistance(step.distance)}}</h4>\r\n    </mat-list-item>\r\n\r\n    <mat-divider></mat-divider>\r\n\r\n  </mat-list>\r\n\r\n</div>\r\n",
                    styles: ["mat-form-field{width:70%}.mat-list-item{height:auto}.mat-line{word-wrap:break-word!important;white-space:pre-wrap!important}.mat-line.right{text-align:right}.rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.rotate-45{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.rotate-250{-webkit-transform:rotate(250deg);transform:rotate(250deg)}.rotate-290{-webkit-transform:rotate(290deg);transform:rotate(290deg)}.icon-flipped{-webkit-transform:scaleY(-1);transform:scaleY(-1)}"]
                }] }
    ];
    /** @nocollapse */
    RoutingFormComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: RoutingService },
        { type: LanguageService },
        { type: MessageService },
        { type: SearchService },
        { type: QueryService },
        { type: RoutingFormService },
        { type: RouteService, decorators: [{ type: Optional }] }
    ]; };
    RoutingFormComponent.propDecorators = {
        term: [{ type: Input }],
        length: [{ type: Input }],
        map: [{ type: Input }],
        submit: [{ type: Output }]
    };
    return RoutingFormComponent;
}());
export { RoutingFormComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype.invalidKeys;
    /** @type {?} */
    RoutingFormComponent.prototype.stopsForm;
    /** @type {?} */
    RoutingFormComponent.prototype.projection;
    /** @type {?} */
    RoutingFormComponent.prototype.currentStopIndex;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype.routesQueries$$;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype.stream$;
    /** @type {?} */
    RoutingFormComponent.prototype.RoutingOverlayMarkerStyle;
    /** @type {?} */
    RoutingFormComponent.prototype.RoutingOverlayStyle;
    /** @type {?} */
    RoutingFormComponent.prototype.routingStopsOverlayDataSource;
    /** @type {?} */
    RoutingFormComponent.prototype.routingRoutesOverlayDataSource;
    /** @type {?} */
    RoutingFormComponent.prototype.routesResults;
    /** @type {?} */
    RoutingFormComponent.prototype.activeRoute;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype.selectRoute;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype.focusOnStop;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype.focusKey;
    /** @type {?} */
    RoutingFormComponent.prototype.initialStopsCoords;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype.browserLanguage;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype._term;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype._debounce;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype._length;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype._map;
    /** @type {?} */
    RoutingFormComponent.prototype.submit;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype.formBuilder;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype.routingService;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype.searchService;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype.queryService;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype.routingFormService;
    /**
     * @type {?}
     * @private
     */
    RoutingFormComponent.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9yb3V0aW5nL3JvdXRpbmctZm9ybS9yb3V0aW5nLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUlaLFFBQVEsRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsV0FBVyxFQUFFLFVBQVUsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQy9FLE9BQU8sRUFBZ0IsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sS0FBSyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxLQUFLLGFBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEtBQUssWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUU5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFFTCxlQUFlLEVBQ2YsY0FBYyxFQUNkLFlBQVksRUFDYixNQUFNLFlBQVksQ0FBQztBQUNwQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTlDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUs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QTBCOzs7OztJQUMxQiwrQ0FBd0I7Ozs7O0lBV3hCLHFDQUFtQjs7Ozs7SUFRbkIseUNBQXdCOzs7OztJQVN4Qix1Q0FBb0I7Ozs7O0lBU3BCLG9DQUFxQjs7SUFFckIsc0NBQXlEOzs7OztJQUd2RCwyQ0FBZ0M7Ozs7O0lBQ2hDLDhDQUFzQzs7Ozs7SUFDdEMsK0NBQXdDOzs7OztJQUN4Qyw4Q0FBc0M7Ozs7O0lBQ3RDLDZDQUFvQzs7Ozs7SUFDcEMsNENBQWtDOzs7OztJQUNsQyxrREFBOEM7Ozs7O0lBQzlDLHFDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25Jbml0LFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9wdGlvbmFsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCAqIGFzIG9sZ2VvbSBmcm9tICdvbC9nZW9tJztcclxuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0ICogYXMgb2xjb25kaXRpb24gZnJvbSAnb2wvZXZlbnRzL2NvbmRpdGlvbic7XHJcbmltcG9ydCAqIGFzIG9saW50ZXJhY3Rpb24gZnJvbSAnb2wvaW50ZXJhY3Rpb24nO1xyXG5pbXBvcnQgKiBhcyBvbGV4dGVudCBmcm9tICdvbC9leHRlbnQnO1xyXG5pbXBvcnQgKiBhcyBvbG9ic2VydmFibGUgZnJvbSAnb2wvT2JzZXJ2YWJsZSc7XHJcblxyXG5pbXBvcnQgeyBDbGlwYm9hcmQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7XHJcbiAgTWVzc2FnZSxcclxuICBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgTWVzc2FnZVNlcnZpY2UsXHJcbiAgUm91dGVTZXJ2aWNlXHJcbn0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IGdldEVudGl0eVRpdGxlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlYXJjaC9zaGFyZWQvc2VhcmNoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvdmVjdG9yLWxheWVyJztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBjcmVhdGVPdmVybGF5TWFya2VyU3R5bGUgfSBmcm9tICcuLi8uLi9vdmVybGF5L3NoYXJlZC9vdmVybGF5LnV0aWxzJztcclxuaW1wb3J0IHsgRmVhdHVyZU1vdGlvbiB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBtb3ZlVG9PbEZlYXR1cmVzIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS51dGlscyc7XHJcblxyXG5pbXBvcnQgeyBSb3V0aW5nIH0gZnJvbSAnLi4vc2hhcmVkL3JvdXRpbmcuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgUm91dGluZ1NlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvcm91dGluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUm91dGluZ0Zvcm1TZXJ2aWNlIH0gZnJvbSAnLi9yb3V0aW5nLWZvcm0uc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBRdWVyeVNlcnZpY2UgfSBmcm9tICcuLi8uLi9xdWVyeS9zaGFyZWQvcXVlcnkuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1yb3V0aW5nLWZvcm0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9yb3V0aW5nLWZvcm0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3JvdXRpbmctZm9ybS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSb3V0aW5nRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGludmFsaWRLZXlzID0gWydDb250cm9sJywgJ1NoaWZ0JywgJ0FsdCddO1xyXG5cclxuICBwdWJsaWMgc3RvcHNGb3JtOiBGb3JtR3JvdXA7XHJcbiAgcHVibGljIHByb2plY3Rpb24gPSAnRVBTRzo0MzI2JztcclxuICBwdWJsaWMgY3VycmVudFN0b3BJbmRleDogbnVtYmVyO1xyXG4gIHByaXZhdGUgcm91dGVzUXVlcmllcyQkOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBwcml2YXRlIHN0cmVhbSQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG4gIHB1YmxpYyBSb3V0aW5nT3ZlcmxheU1hcmtlclN0eWxlOiBvbHN0eWxlLlN0eWxlO1xyXG4gIHB1YmxpYyBSb3V0aW5nT3ZlcmxheVN0eWxlOiBvbHN0eWxlLlN0eWxlO1xyXG4gIHB1YmxpYyByb3V0aW5nU3RvcHNPdmVybGF5RGF0YVNvdXJjZTogRmVhdHVyZURhdGFTb3VyY2U7XHJcbiAgcHVibGljIHJvdXRpbmdSb3V0ZXNPdmVybGF5RGF0YVNvdXJjZTogRmVhdHVyZURhdGFTb3VyY2U7XHJcblxyXG4gIHB1YmxpYyByb3V0ZXNSZXN1bHRzOiBSb3V0aW5nW10gfCBNZXNzYWdlW107XHJcbiAgcHVibGljIGFjdGl2ZVJvdXRlOiBSb3V0aW5nO1xyXG4gIHByaXZhdGUgc2VsZWN0Um91dGU7XHJcblxyXG4gIHByaXZhdGUgZm9jdXNPblN0b3AgPSBmYWxzZTtcclxuICBwcml2YXRlIGZvY3VzS2V5ID0gW107XHJcbiAgcHVibGljIGluaXRpYWxTdG9wc0Nvb3JkcztcclxuICBwcml2YXRlIGJyb3dzZXJMYW5ndWFnZTtcclxuXHJcbiAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDYzNjQ4NTIvY3JlYXRlLWlucHV0LWZpZWxkcy1keW5hbWljYWxseS1pbi1hbmd1bGFyLTJcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgdGVybSgpIHtcclxuICAgIHJldHVybiB0aGlzLl90ZXJtO1xyXG4gIH1cclxuICBzZXQgdGVybSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl90ZXJtID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3Rlcm0gPSAnJztcclxuXHJcbiAgZ2V0IGRlYm91bmNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RlYm91bmNlO1xyXG4gIH1cclxuICBzZXQgZGVib3VuY2UodmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5fZGVib3VuY2UgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGVib3VuY2UgPSAzMDA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGxlbmd0aCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9sZW5ndGg7XHJcbiAgfVxyXG4gIHNldCBsZW5ndGgodmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5fbGVuZ3RoID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2xlbmd0aCA9IDM7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hcDtcclxuICB9XHJcbiAgc2V0IG1hcCh2YWx1ZTogSWdvTWFwKSB7XHJcbiAgICB0aGlzLl9tYXAgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBPdXRwdXQoKSBzdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxyXG4gICAgcHJpdmF0ZSByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHF1ZXJ5U2VydmljZTogUXVlcnlTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0aW5nRm9ybVNlcnZpY2U6IFJvdXRpbmdGb3JtU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGU6IFJvdXRlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgY2hhbmdlUm91dGUoc2VsZWN0ZWRSb3V0ZTogUm91dGluZykge1xyXG4gICAgdGhpcy5zaG93Um91dGVHZW9tZXRyeSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlUm91dGVzUXVlcmllcygpO1xyXG4gICAgdGhpcy51bmxpc3RlblNpbmdsZUNsaWNrKCk7XHJcbiAgICB0aGlzLnF1ZXJ5U2VydmljZS5xdWVyeUVuYWJsZWQgPSB0cnVlO1xyXG4gICAgY29uc3Qgc3RvcENvb3JkaW5hdGVzID0gW107XHJcblxyXG4gICAgdGhpcy5zdG9wcy52YWx1ZS5mb3JFYWNoKHN0b3AgPT4ge1xyXG4gICAgICBzdG9wQ29vcmRpbmF0ZXMucHVzaChzdG9wLnN0b3BDb29yZGluYXRlcyk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucm91dGluZ1JvdXRlc092ZXJsYXlEYXRhU291cmNlLm9sLmNsZWFyKCk7XHJcbiAgICB0aGlzLnJvdXRpbmdTdG9wc092ZXJsYXlEYXRhU291cmNlLm9sLmNsZWFyKCk7XHJcbiAgICB0aGlzLnJvdXRpbmdGb3JtU2VydmljZS5zZXRTdG9wc0Nvb3JkaW5hdGVzKHN0b3BDb29yZGluYXRlcyk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYnJvd3Nlckxhbmd1YWdlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UuZ2V0TGFuZ3VhZ2UoKTtcclxuICAgIHRoaXMuc3RvcHNGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHJvdXRpbmdUeXBlOiAnY2FyJyxcclxuICAgICAgcm91dGluZ01vZGU6ICdkcml2aW5nJywgLy8gbG9vcFxyXG4gICAgICBzdG9wT3JkZXJQcmlvcml0eTogdHJ1ZSxcclxuICAgICAgcm91dGluZ0ZpeGVkU3RhcnRFbmQ6IGZhbHNlLFxyXG4gICAgICBzdG9wczogdGhpcy5mb3JtQnVpbGRlci5hcnJheShbXHJcbiAgICAgICAgdGhpcy5jcmVhdGVTdG9wKCdzdGFydCcpLFxyXG4gICAgICAgIHRoaXMuY3JlYXRlU3RvcCgnZW5kJylcclxuICAgICAgXSlcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucm91dGluZ1N0b3BzT3ZlcmxheURhdGFTb3VyY2UgPSBuZXcgRmVhdHVyZURhdGFTb3VyY2Uoe30pO1xyXG4gICAgdGhpcy5yb3V0aW5nUm91dGVzT3ZlcmxheURhdGFTb3VyY2UgPSBuZXcgRmVhdHVyZURhdGFTb3VyY2Uoe30pO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5xdWVyeVNlcnZpY2UucXVlcnlFbmFibGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmZvY3VzT25TdG9wID0gZmFsc2U7XHJcbiAgICBjb25zdCBzdG9wc0xheWVyID0gbmV3IFZlY3RvckxheWVyKHtcclxuICAgICAgdGl0bGU6ICdyb3V0aW5nU3RvcE92ZXJsYXknLFxyXG4gICAgICB6SW5kZXg6IDk5OSxcclxuICAgICAgaWQ6ICdyb3V0aW5nU3RvcHMnLFxyXG4gICAgICBzb3VyY2U6IHRoaXMucm91dGluZ1N0b3BzT3ZlcmxheURhdGFTb3VyY2UsXHJcbiAgICAgIHNob3dJbkxheWVyTGlzdDogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgcm91dGVzTGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgICB0aXRsZTogJ3JvdXRpbmdSb3V0ZXNPdmVybGF5JyxcclxuICAgICAgekluZGV4OiA5OTksXHJcbiAgICAgIGlkOiAncm91dGluZ1JvdXRlcycsXHJcbiAgICAgIG9wYWNpdHk6IDAuNzUsXHJcbiAgICAgIHNvdXJjZTogdGhpcy5yb3V0aW5nUm91dGVzT3ZlcmxheURhdGFTb3VyY2UsXHJcbiAgICAgIHNob3dJbkxheWVyTGlzdDogZmFsc2VcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMubWFwLmFkZExheWVyKHJvdXRlc0xheWVyKTtcclxuICAgIHRoaXMubWFwLmFkZExheWVyKHN0b3BzTGF5ZXIpO1xyXG5cclxuICAgIGxldCBzZWxlY3RlZFN0b3BGZWF0dXJlO1xyXG5cclxuICAgIGNvbnN0IHNlbGVjdFN0b3BzID0gbmV3IG9saW50ZXJhY3Rpb24uU2VsZWN0KHtcclxuICAgICAgbGF5ZXJzOiBbc3RvcHNMYXllci5vbF0sXHJcbiAgICAgIGNvbmRpdGlvbjogb2xjb25kaXRpb24ucG9pbnRlck1vdmUsXHJcbiAgICAgIGhpdFRvbGVyYW5jZTogN1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdHJhbnNsYXRlU3RvcCA9IG5ldyBvbGludGVyYWN0aW9uLlRyYW5zbGF0ZSh7XHJcbiAgICAgIGxheWVyczogW3N0b3BzTGF5ZXIub2xdLFxyXG4gICAgICBmZWF0dXJlczogc2VsZWN0ZWRTdG9wRmVhdHVyZVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gVE9ETzogQ2hlY2sgdG8gZGlzYWJsZSBwb2ludGVybW92ZSBJRiBhIHN0b3AgaXMgYWxyZWFkeSBzZWxlY3RlZFxyXG4gICAgY29uc3Qgc2VsZWN0Um91dGVIb3ZlciA9IG5ldyBvbGludGVyYWN0aW9uLlNlbGVjdCh7XHJcbiAgICAgIGxheWVyczogW3JvdXRlc0xheWVyLm9sXSxcclxuICAgICAgY29uZGl0aW9uOiBvbGNvbmRpdGlvbi5wb2ludGVyTW92ZSxcclxuICAgICAgaGl0VG9sZXJhbmNlOiA3XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNlbGVjdFJvdXRlID0gbmV3IG9saW50ZXJhY3Rpb24uU2VsZWN0KHtcclxuICAgICAgbGF5ZXJzOiBbcm91dGVzTGF5ZXIub2xdLFxyXG4gICAgICBoaXRUb2xlcmFuY2U6IDdcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMubWFwLm9sLm9uKCdwb2ludGVybW92ZScsIGV2dCA9PiB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdFJvdXRlQ250ID0gc2VsZWN0Um91dGVIb3Zlci5nZXRGZWF0dXJlcygpLmdldExlbmd0aCgpO1xyXG4gICAgICBpZiAoc2VsZWN0Um91dGVDbnQgPT09IDApIHtcclxuICAgICAgICB0aGlzLnJvdXRpbmdGb3JtU2VydmljZS51bnNldE1hcFdhaXRpbmdGb3JSb3V0aW5nQ2xpY2soKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJvdXRpbmdGb3JtU2VydmljZS5zZXRNYXBXYWl0aW5nRm9yUm91dGluZ0NsaWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHNlbGVjdFN0b3BzLm9uKCdzZWxlY3QnLCBldnQgPT4ge1xyXG4gICAgICBzZWxlY3RlZFN0b3BGZWF0dXJlID0gZXZ0LnRhcmdldC5nZXRGZWF0dXJlcygpWzBdO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZWxlY3RSb3V0ZS5vbignc2VsZWN0JywgZXZ0ID0+IHtcclxuICAgICAgaWYgKHRoaXMuZm9jdXNPblN0b3AgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0Q29vcmRpbmF0ZXMgPSBvbHByb2oudHJhbnNmb3JtKFxyXG4gICAgICAgICAgKGV2dCBhcyBhbnkpLm1hcEJyb3dzZXJFdmVudC5jb29yZGluYXRlLFxyXG4gICAgICAgICAgdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgICAgIHRoaXMucHJvamVjdGlvblxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5hZGRTdG9wKCk7XHJcbiAgICAgICAgY29uc3QgcG9zID0gdGhpcy5zdG9wcy5sZW5ndGggLSAyO1xyXG4gICAgICAgIHRoaXMuc3RvcHMuYXQocG9zKS5wYXRjaFZhbHVlKHsgc3RvcENvb3JkaW5hdGVzOiBzZWxlY3RDb29yZGluYXRlcyB9KTtcclxuICAgICAgICB0aGlzLmhhbmRsZUxvY2F0aW9uUHJvcG9zYWxzKHNlbGVjdENvb3JkaW5hdGVzLCBwb3MpO1xyXG4gICAgICAgIHRoaXMuYWRkU3RvcE92ZXJsYXkoc2VsZWN0Q29vcmRpbmF0ZXMsIHBvcyk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RSb3V0ZS5nZXRGZWF0dXJlcygpLmNsZWFyKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZWxlY3RSb3V0ZS5nZXRGZWF0dXJlcygpLmNsZWFyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnJvdXRlc1F1ZXJpZXMkJC5wdXNoKFxyXG4gICAgICB0aGlzLnN0b3BzRm9ybS5zdGF0dXNDaGFuZ2VzXHJcbiAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKHRoaXMuX2RlYm91bmNlKSlcclxuICAgICAgICAuc3Vic2NyaWJlKHZhbCA9PiB0aGlzLm9uRm9ybUNoYW5nZSgpKVxyXG4gICAgKTtcclxuXHJcbiAgICB0cmFuc2xhdGVTdG9wLm9uKCd0cmFuc2xhdGVlbmQnLCBldnQgPT4ge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGVkSUQgPSBldnQuZmVhdHVyZXMuZ2V0QXJyYXkoKVswXS5nZXRJZCgpO1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGVkUG9zID0gdHJhbnNsYXRlZElELnNwbGl0KCdfJyk7XHJcbiAgICAgIGxldCBwO1xyXG4gICAgICBzd2l0Y2ggKHRyYW5zbGF0ZWRQb3NbMV0pIHtcclxuICAgICAgICBjYXNlICdzdGFydCc6XHJcbiAgICAgICAgICBwID0gMDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2VuZCc6XHJcbiAgICAgICAgICBwID0gdGhpcy5zdG9wcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHAgPSBOdW1iZXIodHJhbnNsYXRlZFBvc1sxXSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB0cmFuc2xhdGlvbkVuZENvb3JkaW5hdGVzID0gb2xwcm9qLnRyYW5zZm9ybShcclxuICAgICAgICBldnQuZmVhdHVyZXNcclxuICAgICAgICAgIC5nZXRBcnJheSgpWzBdXHJcbiAgICAgICAgICAuZ2V0R2VvbWV0cnkoKVxyXG4gICAgICAgICAgLmdldENvb3JkaW5hdGVzKCksXHJcbiAgICAgICAgdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgICB0aGlzLnByb2plY3Rpb25cclxuICAgICAgKTtcclxuICAgICAgdGhpcy5zdG9wc1xyXG4gICAgICAgIC5hdChwKVxyXG4gICAgICAgIC5wYXRjaFZhbHVlKHsgc3RvcENvb3JkaW5hdGVzOiB0cmFuc2xhdGlvbkVuZENvb3JkaW5hdGVzIH0pO1xyXG4gICAgICB0aGlzLnN0b3BzLmF0KHApLnBhdGNoVmFsdWUoeyBzdG9wUHJvcG9zYWxzOiBbXSB9KTtcclxuICAgICAgdGhpcy5oYW5kbGVMb2NhdGlvblByb3Bvc2Fscyh0cmFuc2xhdGlvbkVuZENvb3JkaW5hdGVzLCBwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMubWFwLm9sLmFkZEludGVyYWN0aW9uKHNlbGVjdFN0b3BzKTtcclxuICAgIHRoaXMubWFwLm9sLmFkZEludGVyYWN0aW9uKHNlbGVjdFJvdXRlSG92ZXIpO1xyXG4gICAgdGhpcy5tYXAub2wuYWRkSW50ZXJhY3Rpb24odGhpcy5zZWxlY3RSb3V0ZSk7XHJcbiAgICB0aGlzLm1hcC5vbC5hZGRJbnRlcmFjdGlvbih0cmFuc2xhdGVTdG9wKTtcclxuXHJcbiAgICB0aGlzLnJvdXRlc1F1ZXJpZXMkJC5wdXNoKFxyXG4gICAgICB0aGlzLnN0cmVhbSRcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIGRlYm91bmNlVGltZSh0aGlzLl9kZWJvdW5jZSksXHJcbiAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKHRlcm06IHN0cmluZykgPT4gdGhpcy5oYW5kbGVUZXJtQ2hhbmdlZCh0ZXJtKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVMb2NhdGlvblByb3Bvc2Fscyhjb29yZGluYXRlczogW251bWJlciwgbnVtYmVyXSwgc3RvcEluZGV4OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGdyb3VwZWRMb2NhdGlvbnMgPSBbXTtcclxuICAgIHRoaXMuc2VhcmNoU2VydmljZVxyXG4gICAgICAucmV2ZXJzZVNlYXJjaChjb29yZGluYXRlcywgeyB6b29tOiB0aGlzLm1hcC5nZXRab29tKCkgfSlcclxuICAgICAgLm1hcChyZXMgPT5cclxuICAgICAgICB0aGlzLnJvdXRlc1F1ZXJpZXMkJC5wdXNoKFxyXG4gICAgICAgICAgcmVzLnJlcXVlc3QucGlwZShtYXAoZiA9PiBmKSkuc3Vic2NyaWJlKHJlc3VsdHMgPT4ge1xyXG4gICAgICAgICAgICByZXN1bHRzLmZvckVhY2gocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBncm91cGVkTG9jYXRpb25zLmZpbHRlcihmID0+IGYuc291cmNlID09PSByZXN1bHQuc291cmNlKVxyXG4gICAgICAgICAgICAgICAgICAubGVuZ3RoID09PSAwXHJcbiAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBncm91cGVkTG9jYXRpb25zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICBzb3VyY2U6IHJlc3VsdC5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IHJlc3VsdHMubWFwKHIgPT4gci5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wc1xyXG4gICAgICAgICAgICAgIC5hdChzdG9wSW5kZXgpXHJcbiAgICAgICAgICAgICAgLnBhdGNoVmFsdWUoeyBzdG9wUHJvcG9zYWxzOiBncm91cGVkTG9jYXRpb25zIH0pO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBQcmVmZXIgYW5vdGhlciBzb3VyY2U/XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHRzWzBdKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdHNbMF0uc291cmNlLmdldElkKCkgPT09ICdpY2hlcmNoZXJldmVyc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwcmVmZXIgYWRkcmVzcyB0eXBlLlxyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdFBvcyA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgZmVhdHVyZTogYW55ID0gcmVzdWx0c1tpXS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzLnR5cGUgPT09ICdhZHJlc3NlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFBvcyA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcHMuYXQoc3RvcEluZGV4KS5wYXRjaFZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgc3RvcFBvaW50OiBnZXRFbnRpdHlUaXRsZShyZXN1bHRzW3Jlc3VsdFBvc10pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzW3Jlc3VsdFBvc10uZGF0YS5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcHMuYXQoc3RvcEluZGV4KS5wYXRjaFZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9wQ29vcmRpbmF0ZXM6XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzW3Jlc3VsdFBvc10uZGF0YS5nZW9tZXRyeS5jb29yZGluYXRlc1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIE5vdCBtb3ZpbmcgdGhlIHRyYW5zbGF0ZWQgcG9pbnQgT25seSB0byBzdWdnZXN0IHZhbHVlIGludG8gdGhlIFVJLlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLnN0b3BzLmF0KHN0b3BJbmRleCkucGF0Y2hWYWx1ZSh7IHN0b3BQb2ludDogY29vcmRpbmF0ZXMgfSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zdG9wcy5hdChzdG9wSW5kZXgpLnBhdGNoVmFsdWUoeyBzdG9wUHJvcG9zYWxzOiBbXSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICByb3V0aW5nVGV4dChpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gJ3N0YXJ0JztcclxuICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IHRoaXMuc3RvcHMubGVuZ3RoIC0gMSB8fCB0aGlzLnN0b3BzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICByZXR1cm4gJ2VuZCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJ2ludGVybWVkaWF0ZSc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByYWlzZVN0b3AoaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4ID4gMCkge1xyXG4gICAgICB0aGlzLm1vdmVTdG9wKGluZGV4LCAtMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb3dlclN0b3AoaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4IDwgdGhpcy5zdG9wcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMubW92ZVN0b3AoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW92ZVN0b3AoaW5kZXgsIGRpZmYpIHtcclxuICAgIGNvbnN0IGZyb21WYWx1ZSA9IHRoaXMuc3RvcHMuYXQoaW5kZXgpO1xyXG4gICAgdGhpcy5yZW1vdmVTdG9wKGluZGV4KTtcclxuICAgIHRoaXMuc3RvcHMuaW5zZXJ0KGluZGV4ICsgZGlmZiwgZnJvbVZhbHVlKTtcclxuICAgIHRoaXMuc3RvcHMuYXQoaW5kZXgpLnBhdGNoVmFsdWUoeyByb3V0aW5nVGV4dDogdGhpcy5yb3V0aW5nVGV4dChpbmRleCkgfSk7XHJcbiAgICB0aGlzLnN0b3BzXHJcbiAgICAgIC5hdChpbmRleCArIGRpZmYpXHJcbiAgICAgIC5wYXRjaFZhbHVlKHsgcm91dGluZ1RleHQ6IHRoaXMucm91dGluZ1RleHQoaW5kZXggKyBkaWZmKSB9KTtcclxuICAgIGlmICh0aGlzLnN0b3BzLmF0KGluZGV4KS52YWx1ZS5zdG9wQ29vcmRpbmF0ZXMpIHtcclxuICAgICAgdGhpcy5hZGRTdG9wT3ZlcmxheSh0aGlzLnN0b3BzLmF0KGluZGV4KS52YWx1ZS5zdG9wQ29vcmRpbmF0ZXMsIGluZGV4KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnN0b3BzLmF0KGluZGV4ICsgZGlmZikudmFsdWUuc3RvcENvb3JkaW5hdGVzKSB7XHJcbiAgICAgIHRoaXMuYWRkU3RvcE92ZXJsYXkoXHJcbiAgICAgICAgdGhpcy5zdG9wcy5hdChpbmRleCArIGRpZmYpLnZhbHVlLnN0b3BDb29yZGluYXRlcyxcclxuICAgICAgICBpbmRleCArIGRpZmZcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBzdG9wcygpOiBGb3JtQXJyYXkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcHNGb3JtLmdldCgnc3RvcHMnKSBhcyBGb3JtQXJyYXk7XHJcbiAgfVxyXG5cclxuICBnZXRTdG9wc0Nvb3JkaW5hdGVzKCk6IFtudW1iZXIsIG51bWJlcl1bXSB7XHJcbiAgICBjb25zdCBzdG9wQ29vcmRpbmF0ZXMgPSBbXTtcclxuICAgIHRoaXMuc3RvcHMudmFsdWUuZm9yRWFjaChzdG9wID0+IHtcclxuICAgICAgaWYgKHN0b3Auc3RvcENvb3JkaW5hdGVzIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBzdG9wQ29vcmRpbmF0ZXMucHVzaChzdG9wLnN0b3BDb29yZGluYXRlcyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5yb3V0aW5nRm9ybVNlcnZpY2Uuc2V0U3RvcHNDb29yZGluYXRlcyhzdG9wQ29vcmRpbmF0ZXMpO1xyXG4gICAgcmV0dXJuIHN0b3BDb29yZGluYXRlcztcclxuICB9XHJcblxyXG4gIGFkZFN0b3AoKTogdm9pZCB7XHJcbiAgICBjb25zdCBpbnNlcnRJbmRleCA9IHRoaXMuc3RvcHMubGVuZ3RoIC0gMTtcclxuICAgIHRoaXMuc3RvcHMuaW5zZXJ0KGluc2VydEluZGV4LCB0aGlzLmNyZWF0ZVN0b3AoKSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVTdG9wKHJvdXRpbmdQb3MgPSAnaW50ZXJtZWRpYXRlJyk6IEZvcm1Hcm91cCB7XHJcbiAgICByZXR1cm4gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHN0b3BQb2ludDogWycnXSxcclxuICAgICAgc3RvcFByb3Bvc2FsczogW1tdXSxcclxuICAgICAgcm91dGluZ1RleHQ6IHJvdXRpbmdQb3MsXHJcbiAgICAgIHN0b3BDb29yZGluYXRlczogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVN0b3AoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgdGhpcy5yb3V0aW5nU3RvcHNPdmVybGF5RGF0YVNvdXJjZS5vbC5jbGVhcigpO1xyXG4gICAgdGhpcy5zdG9wcy5yZW1vdmVBdChpbmRleCk7XHJcbiAgICBsZXQgY250ID0gMDtcclxuICAgIHRoaXMuc3RvcHMudmFsdWUuZm9yRWFjaChzdG9wID0+IHtcclxuICAgICAgdGhpcy5zdG9wcy5hdChjbnQpLnBhdGNoVmFsdWUoeyByb3V0aW5nVGV4dDogdGhpcy5yb3V0aW5nVGV4dChjbnQpIH0pO1xyXG4gICAgICB0aGlzLmFkZFN0b3BPdmVybGF5KHRoaXMuc3RvcHMuYXQoY250KS52YWx1ZS5zdG9wQ29vcmRpbmF0ZXMsIGNudCk7XHJcbiAgICAgIGNudCsrO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXNldEZvcm0oKSB7XHJcbiAgICB0aGlzLnJvdXRlc1Jlc3VsdHMgPSB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBuYlN0b3BzID0gdGhpcy5zdG9wcy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5iU3RvcHM7IGkrKykge1xyXG4gICAgICB0aGlzLnN0b3BzLnJlbW92ZUF0KDApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdG9wcy5pbnNlcnQoMCwgdGhpcy5jcmVhdGVTdG9wKCdzdGFydCcpKTtcclxuICAgIHRoaXMuc3RvcHMuaW5zZXJ0KDEsIHRoaXMuY3JlYXRlU3RvcCgnZW5kJykpO1xyXG4gICAgdGhpcy5yb3V0aW5nU3RvcHNPdmVybGF5RGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlcygpLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIHRoaXMuZGVsZXRlUm91dGluZ092ZXJsYXlieUlEKGVsZW1lbnQuZ2V0SWQoKSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucm91dGluZ1JvdXRlc092ZXJsYXlEYXRhU291cmNlLm9sLmNsZWFyKCk7XHJcbiAgICB0aGlzLnJvdXRpbmdTdG9wc092ZXJsYXlEYXRhU291cmNlLm9sLmNsZWFyKCk7XHJcbiAgICB0aGlzLnNlbGVjdFJvdXRlLmdldEZlYXR1cmVzKCkuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIG9uRm9ybUNoYW5nZSgpIHtcclxuICAgIGlmICh0aGlzLnN0b3BzRm9ybS52YWxpZCkge1xyXG4gICAgICB0aGlzLnJvdXRpbmdSb3V0ZXNPdmVybGF5RGF0YVNvdXJjZS5vbC5jbGVhcigpO1xyXG4gICAgICBjb25zdCBjb29yZHMgPSB0aGlzLmdldFN0b3BzQ29vcmRpbmF0ZXMoKTtcclxuICAgICAgaWYgKGNvb3Jkcy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgIHRoaXMuZ2V0Um91dGVzKGNvb3Jkcyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yb3V0aW5nUm91dGVzT3ZlcmxheURhdGFTb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9ybWF0U3RlcChzdGVwLCBjbnQpIHtcclxuICAgIHJldHVybiB0aGlzLmZvcm1hdEluc3RydWN0aW9uKFxyXG4gICAgICBzdGVwLm1hbmV1dmVyLnR5cGUsXHJcbiAgICAgIHN0ZXAubWFuZXV2ZXIubW9kaWZpZXIsXHJcbiAgICAgIHN0ZXAubmFtZSxcclxuICAgICAgc3RlcC5tYW5ldXZlci5iZWFyaW5nX2FmdGVyLFxyXG4gICAgICBjbnQsXHJcbiAgICAgIHN0ZXAubWFuZXV2ZXIuZXhpdCxcclxuICAgICAgY250ID09PSB0aGlzLmFjdGl2ZVJvdXRlLnN0ZXBzLmxlbmd0aCAtIDFcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBmb3JtYXRJbnN0cnVjdGlvbihcclxuICAgIHR5cGUsXHJcbiAgICBtb2RpZmllcixcclxuICAgIHJvdXRlLFxyXG4gICAgZGlyZWN0aW9uLFxyXG4gICAgc3RlcFBvc2l0aW9uLFxyXG4gICAgZXhpdCxcclxuICAgIGxhc3RTdGVwID0gZmFsc2VcclxuICApIHtcclxuICAgIGxldCBkaXJlY3RpdmVGcjtcclxuICAgIGxldCBkaXJlY3RpdmVFbjtcclxuICAgIGxldCBpbWFnZSA9ICdhcnJvd19mb3J3YXJkJztcclxuICAgIGxldCBjc3NDbGFzcyA9ICdyb3RhdGUtMjcwJztcclxuICAgIGNvbnN0IHRyYW5zbGF0ZWREaXJlY3Rpb24gPSB0aGlzLnRyYW5zbGF0ZUJlYXJpbmcoZGlyZWN0aW9uKTtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZWRNb2RpZmllciA9IHRoaXMudHJhbnNsYXRlTW9kaWZpZXIobW9kaWZpZXIpO1xyXG4gICAgY29uc3QgZW5QcmVmaXggPSBtb2RpZmllciA9PT0gJ3N0cmFpZ2h0JyA/ICcnIDogJ29uIHRoZSAnO1xyXG4gICAgY29uc3QgZnJQcmVmaXggPSBtb2RpZmllciA9PT0gJ3N0cmFpZ2h0JyA/ICcnIDogJ8OgICc7XHJcblxyXG4gICAgbGV0IGZyQWdncmVnYXRlZERpcmVjdGlvbiA9IGZyUHJlZml4ICsgdHJhbnNsYXRlZE1vZGlmaWVyO1xyXG4gICAgbGV0IGVuQWdncmVnYXRlZERpcmVjdGlvbiA9IGVuUHJlZml4ICsgdHJhbnNsYXRlZE1vZGlmaWVyO1xyXG5cclxuICAgIGlmIChtb2RpZmllciAmJiBtb2RpZmllci5zZWFyY2goJ3NsaWdodCcpID49IDApIHtcclxuICAgICAgZW5BZ2dyZWdhdGVkRGlyZWN0aW9uID0gdHJhbnNsYXRlZE1vZGlmaWVyO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RpZmllciA9PT0gJ3V0dXJuJykge1xyXG4gICAgICBpbWFnZSA9ICdmYXN0X2ZvcndhcmQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICdyb3RhdGUtOTAnO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3NoYXJwIHJpZ2h0Jykge1xyXG4gICAgICBpbWFnZSA9ICdzdWJkaXJlY3RvcnlfYXJyb3dfcmlnaHQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICdpY29uLWZsaXBwZWQnO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICBpbWFnZSA9ICdzdWJkaXJlY3RvcnlfYXJyb3dfcmlnaHQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICdpY29uLWZsaXBwZWQnO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3NsaWdodCByaWdodCcpIHtcclxuICAgICAgaW1hZ2UgPSAnYXJyb3dfZm9yd2FyZCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJ3JvdGF0ZS0yOTAnO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3N0cmFpZ2h0Jykge1xyXG4gICAgICBpbWFnZSA9ICdhcnJvd19mb3J3YXJkJztcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICdzbGlnaHQgbGVmdCcpIHtcclxuICAgICAgaW1hZ2UgPSAnYXJyb3dfZm9yd2FyZCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJ3JvdGF0ZS0yNTAnO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgIGltYWdlID0gJ3N1YmRpcmVjdG9yeV9hcnJvd19sZWZ0JztcclxuICAgICAgY3NzQ2xhc3MgPSAnaWNvbi1mbGlwcGVkJztcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICdzaGFycCBsZWZ0Jykge1xyXG4gICAgICBpbWFnZSA9ICdzdWJkaXJlY3RvcnlfYXJyb3dfbGVmdCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJ2ljb24tZmxpcHBlZCc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGUgPT09ICd0dXJuJykge1xyXG4gICAgICBpZiAobW9kaWZpZXIgPT09ICdzdHJhaWdodCcpIHtcclxuICAgICAgICBkaXJlY3RpdmVGciA9ICdDb250aW51ZXIgc3VyICcgKyByb3V0ZTtcclxuICAgICAgICBkaXJlY3RpdmVFbiA9ICdDb250aW51ZSBvbiAnICsgcm91dGU7XHJcbiAgICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICd1dHVybicpIHtcclxuICAgICAgICBkaXJlY3RpdmVGciA9ICdGYWlyZSBkZW1pLXRvdXIgc3VyICcgKyByb3V0ZTtcclxuICAgICAgICBkaXJlY3RpdmVFbiA9ICdNYWtlIHUtdHVybiBvbiAnICsgcm91dGU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGlyZWN0aXZlRnIgPSAnVG91cm5lciAnICsgZnJBZ2dyZWdhdGVkRGlyZWN0aW9uICsgJyBzdXIgJyArIHJvdXRlO1xyXG4gICAgICAgIGRpcmVjdGl2ZUVuID0gJ1R1cm4gJyArIHRyYW5zbGF0ZWRNb2RpZmllciArICcgb250byAnICsgcm91dGU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ25ldyBuYW1lJykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9XHJcbiAgICAgICAgJ0NvbnRpbnVlciBlbiBkaXJlY3Rpb24gJyArIHRyYW5zbGF0ZWREaXJlY3Rpb24gKyAnIHN1ciAnICsgcm91dGU7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ0hlYWQgJyArIHRyYW5zbGF0ZWREaXJlY3Rpb24gKyAnIG9uICcgKyByb3V0ZTtcclxuICAgICAgaW1hZ2UgPSAnZXhwbG9yZSc7XHJcbiAgICAgIGNzc0NsYXNzID0gJyc7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdkZXBhcnQnKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID1cclxuICAgICAgICAnQWxsZXIgZW4gZGlyZWN0aW9uICcgKyB0cmFuc2xhdGVkRGlyZWN0aW9uICsgJyBzdXIgJyArIHJvdXRlO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9ICdIZWFkICcgKyB0cmFuc2xhdGVkRGlyZWN0aW9uICsgJyBvbiAnICsgcm91dGU7XHJcbiAgICAgIGltYWdlID0gJ2V4cGxvcmUnO1xyXG4gICAgICBjc3NDbGFzcyA9ICcnO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnYXJyaXZlJykge1xyXG4gICAgICBpZiAobGFzdFN0ZXApIHtcclxuICAgICAgICBsZXQgY29tYSA9ICcsICc7XHJcbiAgICAgICAgaWYgKCF0cmFuc2xhdGVkTW9kaWZpZXIpIHtcclxuICAgICAgICAgIGZyQWdncmVnYXRlZERpcmVjdGlvbiA9ICcnO1xyXG4gICAgICAgICAgZW5BZ2dyZWdhdGVkRGlyZWN0aW9uID0gJyc7XHJcbiAgICAgICAgICBjb21hID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpcmVjdGl2ZUZyID0gJ1ZvdXMgw6p0ZXMgYXJyaXbDqScgKyBjb21hICsgZnJBZ2dyZWdhdGVkRGlyZWN0aW9uO1xyXG4gICAgICAgIGRpcmVjdGl2ZUVuID1cclxuICAgICAgICAgICdZb3UgaGF2ZSByZWFjaGVkIHlvdXIgZGVzdGluYXRpb24nICsgY29tYSArIGVuQWdncmVnYXRlZERpcmVjdGlvbjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkaXJlY3RpdmVGciA9ICdWb3VzIGF0dGVpZ25leiBsZSBwb2ludCBpbnRlcm3DqWRpYXJlIHN1ciAnICsgcm91dGU7XHJcbiAgICAgICAgZGlyZWN0aXZlRW4gPSAnWW91IGhhdmUgcmVhY2hlZCB0aGUgaW50ZXJtZWRpYXRlIHN0b3Agb250byAnICsgcm91dGU7XHJcbiAgICAgICAgaW1hZ2UgPSAnbG9jYXRpb25fb24nO1xyXG4gICAgICAgIGNzc0NsYXNzID0gJyc7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ21lcmdlJykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9ICdDb250aW51ZXIgc3VyICcgKyByb3V0ZTtcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnQ29udGludWUgb24gJyArIHJvdXRlO1xyXG4gICAgICBpbWFnZSA9ICdhcnJvd19mb3J3YXJkJztcclxuICAgICAgY3NzQ2xhc3MgPSAncm90YXRlLTI3MCc7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvbiByYW1wJykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9IFwiUHJlbmRyZSBsJ2VudHLDqWUgZCdhdXRvcm91dGUgXCIgKyBmckFnZ3JlZ2F0ZWREaXJlY3Rpb247XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ1Rha2UgdGhlIHJhbXAgJyArIGVuQWdncmVnYXRlZERpcmVjdGlvbjtcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29mZiByYW1wJykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9IFwiUHJlbmRyZSBsYSBzb3J0aWUgZCdhdXRvcm91dGUgXCIgKyBmckFnZ3JlZ2F0ZWREaXJlY3Rpb247XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ1Rha2UgZXhpdCAnICsgZW5BZ2dyZWdhdGVkRGlyZWN0aW9uO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnZm9yaycpIHtcclxuICAgICAgaWYgKG1vZGlmaWVyLnNlYXJjaCgnbGVmdCcpID49IDApIHtcclxuICAgICAgICBkaXJlY3RpdmVGciA9ICdHYXJkZXIgbGEgZ2F1Y2hlIHN1ciAnICsgcm91dGU7XHJcbiAgICAgICAgZGlyZWN0aXZlRW4gPSAnTWVyZ2UgbGVmdCBvbnRvICcgKyByb3V0ZTtcclxuICAgICAgfSBlbHNlIGlmIChtb2RpZmllci5zZWFyY2goJ3JpZ2h0JykgPj0gMCkge1xyXG4gICAgICAgIGRpcmVjdGl2ZUZyID0gJ0dhcmRlciBsYSBkcm9pdGUgc3VyICcgKyByb3V0ZTtcclxuICAgICAgICBkaXJlY3RpdmVFbiA9ICdNZXJnZSByaWdodCBvbnRvICcgKyByb3V0ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkaXJlY3RpdmVGciA9ICdDb250aW51ZXIgc3VyICcgKyByb3V0ZTtcclxuICAgICAgICBkaXJlY3RpdmVFbiA9ICdDb250aW51ZSBvbiAnICsgcm91dGU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2VuZCBvZiByb2FkJykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9XHJcbiAgICAgICAgJ8OAIGxhIGZpbiBkZSBsYSByb3V0ZSwgdG91cm5lciAnICsgdHJhbnNsYXRlZE1vZGlmaWVyICsgJyBzdXIgJyArIHJvdXRlO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9XHJcbiAgICAgICAgJ0F0IHRoZSBlbmQgb2YgdGhlIHJvYWQsIHR1cm4gJyArIHRyYW5zbGF0ZWRNb2RpZmllciArICcgb250byAnICsgcm91dGU7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd1c2UgbGFuZScpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPSAnUHJlbmRyZSBsYSB2b2llIGRlIC4uLiAnO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9ICdUYWtlIHRoZSBsYW5lIC4uLic7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjb250aW51ZScgJiYgbW9kaWZpZXIgIT09ICd1dHVybicpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPSAnQ29udGludWVyIHN1ciAnICsgcm91dGU7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ0NvbnRpbnVlIG9uICcgKyByb3V0ZTtcclxuICAgICAgaW1hZ2UgPSAnYXJyb3dfZm9yd2FyZCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJ3JvdGF0ZS0yNzAnO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAncm91bmRhYm91dCcpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPSAnQXUgcm9uZC1wb2ludCwgcHJlbmRyZSBsYSAnICsgZXhpdDtcclxuICAgICAgZGlyZWN0aXZlRnIgKz0gZXhpdCA9PT0gMSA/ICdyZScgOiAnZSc7XHJcbiAgICAgIGRpcmVjdGl2ZUZyICs9ICcgc29ydGllIHZlcnMgJyArIHJvdXRlO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9ICdBdCB0aGUgcm91bmRhYm91dCwgdGFrZSB0aGUgJyArIGV4aXQ7XHJcbiAgICAgIGRpcmVjdGl2ZUVuICs9IGV4aXQgPT09IDEgPyAnc3QnIDogJ3JkJztcclxuICAgICAgZGlyZWN0aXZlRW4gKz0gJyBleGl0IHRvd2FyZHMgJyArIHJvdXRlO1xyXG4gICAgICBpbWFnZSA9ICdkb251dF9sYXJnZSc7XHJcbiAgICAgIGNzc0NsYXNzID0gJyc7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdyb3RhcnknKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID0gJ1JvbmQtcG9pbnQgcm90YXJ5Li4uLic7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ1JvdW5kYWJvdXQgcm90YXJ5Li4uLic7XHJcbiAgICAgIGltYWdlID0gJ2RvbnV0X2xhcmdlJztcclxuICAgICAgY3NzQ2xhc3MgPSAnJztcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3JvdW5kYWJvdXQgdHVybicpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPSAnUm9uZC1wb2ludCwgcHJlbmRyZSBsYSAuLi4nO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9ICdSb3VuZGFib3V0LCB0YWtlIHRoZSAuLi4nO1xyXG4gICAgICBpbWFnZSA9ICdkb251dF9sYXJnZSc7XHJcbiAgICAgIGNzc0NsYXNzID0gJyc7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdleGl0IHJvdW5kYWJvdXQnKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID0gJ1BvdXJzdWl2cmUgdmVycyAnICsgcm91dGU7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ0NvbnRpbnVlIHRvICcgKyByb3V0ZTtcclxuICAgICAgaW1hZ2UgPSAnYXJyb3dfZm9yd2FyZCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJ3JvdGF0ZS0yNzAnO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnbm90aWZpY2F0aW9uJykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9ICdub3RpZmljYXRpb24gLi4uLic7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ25vdGlmaWNhdGlvbiAuLi4uJztcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICd1dHVybicpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPVxyXG4gICAgICAgICdGYWlyZSBkZW1pLXRvdXIgZXQgY29udGludWVyIGVuIGRpcmVjdGlvbiAnICtcclxuICAgICAgICB0cmFuc2xhdGVkRGlyZWN0aW9uICtcclxuICAgICAgICAnIHN1ciAnICtcclxuICAgICAgICByb3V0ZTtcclxuICAgICAgZGlyZWN0aXZlRW4gPVxyXG4gICAgICAgICdNYWtlIHUtdHVybiBhbmQgaGVhZCAnICsgdHJhbnNsYXRlZERpcmVjdGlvbiArICcgb24gJyArIHJvdXRlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPSAnPz8/JztcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnPz8/JztcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGFzdFN0ZXApIHtcclxuICAgICAgaW1hZ2UgPSAnZmxhZyc7XHJcbiAgICAgIGNzc0NsYXNzID0gJyc7XHJcbiAgICB9XHJcbiAgICBpZiAoc3RlcFBvc2l0aW9uID09PSAwKSB7XHJcbiAgICAgIGltYWdlID0gJ2V4cGxvcmUnO1xyXG4gICAgICBjc3NDbGFzcyA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkaXJlY3RpdmU7XHJcbiAgICBpZiAodGhpcy5icm93c2VyTGFuZ3VhZ2UgPT09ICdmcicpIHtcclxuICAgICAgZGlyZWN0aXZlID0gZGlyZWN0aXZlRnI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYnJvd3Nlckxhbmd1YWdlID09PSAnZW4nKSB7XHJcbiAgICAgIGRpcmVjdGl2ZSA9IGRpcmVjdGl2ZUVuO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IGluc3RydWN0aW9uOiBkaXJlY3RpdmUsIGltYWdlLCBjc3NDbGFzcyB9O1xyXG4gIH1cclxuXHJcbiAgdHJhbnNsYXRlTW9kaWZpZXIobW9kaWZpZXIpIHtcclxuICAgIGlmIChtb2RpZmllciA9PT0gJ3V0dXJuJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8ucm91dGluZy51dHVybicpO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3NoYXJwIHJpZ2h0Jykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5nZW8ucm91dGluZy5zaGFycCByaWdodCdcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICdyaWdodCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnJvdXRpbmcucmlnaHQnKTtcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICdzbGlnaHQgcmlnaHQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5yb3V0aW5nLnNsaWdodCByaWdodCdcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICdzaGFycCBsZWZ0Jykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5nZW8ucm91dGluZy5zaGFycCBsZWZ0J1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5yb3V0aW5nLmxlZnQnKTtcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICdzbGlnaHQgbGVmdCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uZ2VvLnJvdXRpbmcuc2xpZ2h0IGxlZnQnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnc3RyYWlnaHQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5yb3V0aW5nLnN0cmFpZ2h0Jyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbW9kaWZpZXI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFuc2xhdGVCZWFyaW5nKGJlYXJpbmcpIHtcclxuICAgIGlmIChiZWFyaW5nID49IDMzNyB8fCBiZWFyaW5nIDwgMjMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmNhcmRpbmFsUG9pbnRzLm4nKTtcclxuICAgIH0gZWxzZSBpZiAoYmVhcmluZyA8IDY3KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5jYXJkaW5hbFBvaW50cy5uZSdcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoYmVhcmluZyA8IDExMykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uY2FyZGluYWxQb2ludHMuZScpO1xyXG4gICAgfSBlbHNlIGlmIChiZWFyaW5nIDwgMTU3KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5jYXJkaW5hbFBvaW50cy5zZSdcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoYmVhcmluZyA8IDIwMykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uY2FyZGluYWxQb2ludHMucycpO1xyXG4gICAgfSBlbHNlIGlmIChiZWFyaW5nIDwgMjQ3KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5jYXJkaW5hbFBvaW50cy5zdydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoYmVhcmluZyA8IDI5Mykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uY2FyZGluYWxQb2ludHMudycpO1xyXG4gICAgfSBlbHNlIGlmIChiZWFyaW5nIDwgMzM3KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5jYXJkaW5hbFBvaW50cy5udydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvcm1hdERpc3RhbmNlKGRpc3RhbmNlKSB7XHJcbiAgICBpZiAoZGlzdGFuY2UgPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpc3RhbmNlID49IDEwMDAwMCkge1xyXG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChkaXN0YW5jZSAvIDEwMDApICsgJyBrbSc7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlzdGFuY2UgPj0gMTAwMDApIHtcclxuICAgICAgcmV0dXJuIE1hdGgucm91bmQoZGlzdGFuY2UgLyAxMDApIC8gMTAgKyAnIGttJztcclxuICAgIH1cclxuICAgIGlmIChkaXN0YW5jZSA+PSAxMDApIHtcclxuICAgICAgcmV0dXJuIE1hdGgucm91bmQoZGlzdGFuY2UgLyAxMDApIC8gMTAgKyAnIGttJztcclxuICAgIH1cclxuICAgIHJldHVybiBkaXN0YW5jZSArICcgbSc7XHJcbiAgfVxyXG5cclxuICBmb3JtYXREdXJhdGlvbihkdXJhdGlvbjogbnVtYmVyLCBzdW1tYXJ5ID0gZmFsc2UpIHtcclxuICAgIGlmIChkdXJhdGlvbiA+PSAzNjAwKSB7XHJcbiAgICAgIGNvbnN0IGhvdXIgPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gMzYwMCk7XHJcbiAgICAgIGNvbnN0IG1pbnV0ZSA9IE1hdGgucm91bmQoKGR1cmF0aW9uIC8gMzYwMCAtIGhvdXIpICogNjApO1xyXG4gICAgICBpZiAobWludXRlID09PSA2MCkge1xyXG4gICAgICAgIHJldHVybiBob3VyICsgMSArICcgaCc7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGhvdXIgKyAnIGggJyArIG1pbnV0ZSArICcgbWluJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZHVyYXRpb24gPj0gNjApIHtcclxuICAgICAgcmV0dXJuIE1hdGgucm91bmQoZHVyYXRpb24gLyA2MCkgKyAnIG1pbic7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZHVyYXRpb24gKyAnIHMnO1xyXG4gIH1cclxuXHJcbiAgc2hvd1NlZ21lbnQoc3RlcCwgem9vbVRvRXh0ZW50ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuc2hvd1JvdXRlU2VnbWVudEdlb21ldHJ5KHN0ZXAuZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIHpvb21Ub0V4dGVudCk7XHJcbiAgfVxyXG5cclxuICBzaG93Um91dGVTZWdtZW50R2VvbWV0cnkoY29vcmRpbmF0ZXMsIHpvb21Ub0V4dGVudCA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLmRlbGV0ZVJvdXRpbmdPdmVybGF5YnlJRCgnZW5kU2VnbWVudCcpO1xyXG4gICAgY29uc3QgZ2VvbWV0cnk0MzI2ID0gbmV3IG9sZ2VvbS5MaW5lU3RyaW5nKGNvb3JkaW5hdGVzKTtcclxuICAgIGNvbnN0IGdlb21ldHJ5Mzg1NyA9IGdlb21ldHJ5NDMyNi50cmFuc2Zvcm0oJ0VQU0c6NDMyNicsICdFUFNHOjM4NTcnKTtcclxuICAgIGNvbnN0IHJvdXRlU2VnbWVudENvb3JkaW5hdGVzID0gKGdlb21ldHJ5Mzg1NyBhcyBhbnkpLmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICBjb25zdCBsYXN0UG9pbnQgPSByb3V0ZVNlZ21lbnRDb29yZGluYXRlc1swXTtcclxuXHJcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBvbGdlb20uUG9pbnQobGFzdFBvaW50KTtcclxuICAgIGNvbnN0IGZlYXR1cmUgPSBuZXcgb2xGZWF0dXJlKHsgZ2VvbWV0cnkgfSk7XHJcbiAgICBmZWF0dXJlLnNldElkKCdlbmRTZWdtZW50Jyk7XHJcblxyXG4gICAgaWYgKGdlb21ldHJ5ID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChnZW9tZXRyeS5nZXRUeXBlKCkgPT09ICdQb2ludCcpIHtcclxuICAgICAgZmVhdHVyZS5zZXRTdHlsZShbXHJcbiAgICAgICAgbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgICAgZ2VvbWV0cnksXHJcbiAgICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlKHtcclxuICAgICAgICAgICAgcmFkaXVzOiA3LFxyXG4gICAgICAgICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7IGNvbG9yOiAnI0ZGMDAwMCcsIHdpZHRoOiAzIH0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIF0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHpvb21Ub0V4dGVudCkge1xyXG4gICAgICB0aGlzLm1hcC52aWV3Q29udHJvbGxlci56b29tVG9FeHRlbnQoZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldEV4dGVudCgpKTtcclxuICAgIH1cclxuICAgIHRoaXMucm91dGluZ1JvdXRlc092ZXJsYXlEYXRhU291cmNlLm9sLmFkZEZlYXR1cmUoZmVhdHVyZSk7XHJcbiAgfVxyXG5cclxuICB6b29tUm91dGUoKSB7XHJcbiAgICB0aGlzLm1hcC52aWV3Q29udHJvbGxlci56b29tVG9FeHRlbnQodGhpcy5yb3V0aW5nUm91dGVzT3ZlcmxheURhdGFTb3VyY2Uub2wuZ2V0RXh0ZW50KCkpO1xyXG4gIH1cclxuXHJcbiAgc2hvd1JvdXRlR2VvbWV0cnkobW92ZVRvRXh0ZW50ID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGdlb20gPSB0aGlzLmFjdGl2ZVJvdXRlLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xyXG4gICAgY29uc3QgZ2VvbWV0cnk0MzI2ID0gbmV3IG9sZ2VvbS5MaW5lU3RyaW5nKGdlb20pO1xyXG4gICAgY29uc3QgZ2VvbWV0cnkzODU3ID0gZ2VvbWV0cnk0MzI2LnRyYW5zZm9ybSgnRVBTRzo0MzI2JywgJ0VQU0c6Mzg1NycpO1xyXG4gICAgdGhpcy5yb3V0aW5nUm91dGVzT3ZlcmxheURhdGFTb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgIGNvbnN0IHJvdXRpbmdGZWF0dXJlID0gbmV3IG9sRmVhdHVyZSh7IGdlb21ldHJ5OiBnZW9tZXRyeTM4NTcgfSk7XHJcbiAgICByb3V0aW5nRmVhdHVyZS5zZXRTdHlsZShbXHJcbiAgICAgIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7IGNvbG9yOiAnIzZhNzk4MicsIHdpZHRoOiAxMCB9KVxyXG4gICAgICB9KSxcclxuICAgICAgbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHsgY29sb3I6ICcjNGZhOWRkJywgd2lkdGg6IDYgfSlcclxuICAgICAgfSlcclxuICAgIF0pO1xyXG4gICAgdGhpcy5yb3V0aW5nUm91dGVzT3ZlcmxheURhdGFTb3VyY2Uub2wuYWRkRmVhdHVyZShyb3V0aW5nRmVhdHVyZSk7XHJcbiAgICBpZiAobW92ZVRvRXh0ZW50KSB7XHJcbiAgICAgIHRoaXMubWFwLnZpZXdDb250cm9sbGVyLnpvb21Ub0V4dGVudCh0aGlzLnJvdXRpbmdSb3V0ZXNPdmVybGF5RGF0YVNvdXJjZS5vbC5nZXRFeHRlbnQoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRSb3V0ZXMoc3RvcHNBcnJheUNvb3JkaW5hdGVzLCBtb3ZlVG9FeHRlbnQgPSBmYWxzZSkge1xyXG4gICAgY29uc3Qgcm91dGVSZXNwb25zZSA9IHRoaXMucm91dGluZ1NlcnZpY2Uucm91dGUoc3RvcHNBcnJheUNvb3JkaW5hdGVzKTtcclxuICAgIGlmIChyb3V0ZVJlc3BvbnNlKSB7XHJcbiAgICAgIHJvdXRlUmVzcG9uc2UubWFwKHJlcyA9PlxyXG4gICAgICAgIHRoaXMucm91dGVzUXVlcmllcyQkLnB1c2goXHJcbiAgICAgICAgICByZXMuc3Vic2NyaWJlKHJvdXRlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXNSZXN1bHRzID0gcm91dGU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlUm91dGUgPSB0aGlzLnJvdXRlc1Jlc3VsdHNbMF0gYXMgUm91dGluZztcclxuICAgICAgICAgICAgdGhpcy5zaG93Um91dGVHZW9tZXRyeShtb3ZlVG9FeHRlbnQpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVubGlzdGVuU2luZ2xlQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5mb2N1c0tleS5sZW5ndGggIT09IDApIHtcclxuICAgICAgdGhpcy5mb2N1c0tleS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgb2xvYnNlcnZhYmxlLnVuQnlLZXkoa2V5KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVuc3Vic2NyaWJlUm91dGVzUXVlcmllcygpIHtcclxuICAgIHRoaXMucm91dGVzUXVlcmllcyQkLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XHJcbiAgICB0aGlzLnJvdXRlc1F1ZXJpZXMkJCA9IFtdO1xyXG4gIH1cclxuXHJcbiAgY29weUxpbmtUb0NsaXBib2FyZCgpIHtcclxuICAgIGNvbnN0IHN1Y2Nlc3NmdWwgPSBDbGlwYm9hcmQuY29weSh0aGlzLmdldFVybCgpKTtcclxuICAgIGlmIChzdWNjZXNzZnVsKSB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5yb3V0aW5nRm9ybS5kaWFsb2cuY29weVRpdGxlJyk7XHJcbiAgICAgIGNvbnN0IG1zZyA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnJvdXRpbmdGb3JtLmRpYWxvZy5jb3B5TXNnTGluaycpO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobXNnLCB0aXRsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb3B5RGlyZWN0aW9uc1RvQ2xpcGJvYXJkKCkge1xyXG4gICAgY29uc3QgaW5kZW50ID0gJ1xcdCc7XHJcbiAgICBsZXQgYWN0aXZlUm91dGVEaXJlY3RpdmUgPVxyXG4gICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5yb3V0aW5nRm9ybS5pbnN0cnVjdGlvbnMnXHJcbiAgICAgICkgKyAnOlxcbic7XHJcbiAgICBsZXQgd2F5UG9pbnRMaXN0ID0gJyc7XHJcbiAgICBjb25zdCBzdW1tYXJ5ID1cclxuICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8ucm91dGluZ0Zvcm0uc3VtbWFyeScpICtcclxuICAgICAgJzogXFxuJyArXHJcbiAgICAgIGluZGVudCArXHJcbiAgICAgIHRoaXMuYWN0aXZlUm91dGUudGl0bGUgK1xyXG4gICAgICAnXFxuJyArXHJcbiAgICAgIGluZGVudCArXHJcbiAgICAgIHRoaXMuZm9ybWF0RGlzdGFuY2UodGhpcy5hY3RpdmVSb3V0ZS5kaXN0YW5jZSkgK1xyXG4gICAgICAnXFxuJyArXHJcbiAgICAgIGluZGVudCArXHJcbiAgICAgIHRoaXMuZm9ybWF0RHVyYXRpb24odGhpcy5hY3RpdmVSb3V0ZS5kdXJhdGlvbikgK1xyXG4gICAgICAnXFxuXFxuJyArXHJcbiAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnJvdXRpbmdGb3JtLnN0b3BzTGlzdCcpICtcclxuICAgICAgJzpcXG4nO1xyXG5cclxuICAgIGNvbnN0IHVybCA9XHJcbiAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnJvdXRpbmdGb3JtLmxpbmsnKSArXHJcbiAgICAgICc6XFxuJyArXHJcbiAgICAgIGluZGVudCArXHJcbiAgICAgIHRoaXMuZ2V0VXJsKCk7XHJcblxyXG4gICAgbGV0IHdheVBvaW50c0NudCA9IDE7XHJcbiAgICB0aGlzLnN0b3BzLnZhbHVlLmZvckVhY2goc3RvcCA9PiB7XHJcbiAgICAgIGxldCBjb29yZCA9ICcnO1xyXG4gICAgICBsZXQgc3RvcFBvaW50ID0gJyc7XHJcbiAgICAgIGlmIChzdG9wLnN0b3BQb2ludCAhPT0gc3RvcC5zdG9wQ29vcmRpbmF0ZXMpIHtcclxuICAgICAgICBzdG9wUG9pbnQgPSBzdG9wLnN0b3BQb2ludDtcclxuICAgICAgICBjb29yZCA9XHJcbiAgICAgICAgICAnICgnICtcclxuICAgICAgICAgIFtzdG9wLnN0b3BDb29yZGluYXRlc1sxXSwgc3RvcC5zdG9wQ29vcmRpbmF0ZXNbMF1dLmpvaW4oJywnKSArXHJcbiAgICAgICAgICAnKSc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3RvcFBvaW50ID0gW3N0b3Auc3RvcENvb3JkaW5hdGVzWzFdLCBzdG9wLnN0b3BDb29yZGluYXRlc1swXV0uam9pbihcclxuICAgICAgICAgICcsJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHdheVBvaW50TGlzdCA9XHJcbiAgICAgICAgd2F5UG9pbnRMaXN0ICtcclxuICAgICAgICBpbmRlbnQgK1xyXG4gICAgICAgIHdheVBvaW50c0NudC50b0xvY2FsZVN0cmluZygpICtcclxuICAgICAgICAnLiAnICtcclxuICAgICAgICBzdG9wUG9pbnQgK1xyXG4gICAgICAgIGNvb3JkICtcclxuICAgICAgICAnXFxuJztcclxuICAgICAgd2F5UG9pbnRzQ250Kys7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBEaXJlY3Rpb25zXHJcbiAgICBsZXQgbG9jYWxDbnQgPSAwO1xyXG4gICAgdGhpcy5hY3RpdmVSb3V0ZS5zdGVwcy5mb3JFYWNoKHN0ZXAgPT4ge1xyXG4gICAgICBjb25zdCBpbnN0cnVjdGlvbiA9IHRoaXMuZm9ybWF0U3RlcChzdGVwLCBsb2NhbENudCkuaW5zdHJ1Y3Rpb247XHJcbiAgICAgIGNvbnN0IGRpc3RhbmNlID1cclxuICAgICAgICB0aGlzLmZvcm1hdERpc3RhbmNlKHN0ZXAuZGlzdGFuY2UpID09PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gJydcclxuICAgICAgICAgIDogJyAoJyArIHRoaXMuZm9ybWF0RGlzdGFuY2Uoc3RlcC5kaXN0YW5jZSkgKyAnKSc7XHJcbiAgICAgIGFjdGl2ZVJvdXRlRGlyZWN0aXZlID1cclxuICAgICAgICBhY3RpdmVSb3V0ZURpcmVjdGl2ZSArXHJcbiAgICAgICAgaW5kZW50ICtcclxuICAgICAgICAobG9jYWxDbnQgKyAxKS50b0xvY2FsZVN0cmluZygpICtcclxuICAgICAgICAnLiAnICtcclxuICAgICAgICBpbnN0cnVjdGlvbiArXHJcbiAgICAgICAgZGlzdGFuY2UgK1xyXG4gICAgICAgICdcXG4nO1xyXG4gICAgICBsb2NhbENudCsrO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgZGlyZWN0aW9uc0JvZHkgPVxyXG4gICAgICBzdW1tYXJ5ICsgd2F5UG9pbnRMaXN0ICsgJ1xcbicgKyB1cmwgKyAnXFxuXFxuJyArIGFjdGl2ZVJvdXRlRGlyZWN0aXZlO1xyXG5cclxuICAgIGNvbnN0IHN1Y2Nlc3NmdWwgPSBDbGlwYm9hcmQuY29weShkaXJlY3Rpb25zQm9keSk7XHJcbiAgICBpZiAoc3VjY2Vzc2Z1bCkge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8ucm91dGluZ0Zvcm0uZGlhbG9nLmNvcHlUaXRsZScpO1xyXG4gICAgICBjb25zdCBtc2cgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5yb3V0aW5nRm9ybS5kaWFsb2cuY29weU1zZycpO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobXNnLCB0aXRsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVRlcm1DaGFuZ2VkKHRlcm06IHN0cmluZykge1xyXG4gICAgaWYgKHRlcm0gIT09IHVuZGVmaW5lZCB8fCB0ZXJtLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICBjb25zdCBzZWFyY2hQcm9wb3NhbHMgPSBbXTtcclxuICAgICAgY29uc3QgcmVzZWFyY2hlcyA9IHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2godGVybSk7XHJcbiAgICAgIHJlc2VhcmNoZXMubWFwKHJlcyA9PlxyXG4gICAgICAgIHRoaXMucm91dGVzUXVlcmllcyQkLnB1c2goXHJcbiAgICAgICAgICByZXMucmVxdWVzdC5zdWJzY3JpYmUocmVzdWx0cyA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdHNcclxuICAgICAgICAgICAgICAuZmlsdGVyKHIgPT4gci5kYXRhLmdlb21ldHJ5KVxyXG4gICAgICAgICAgICAgIC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICBzZWFyY2hQcm9wb3NhbHMuZmlsdGVyKHIgPT4gci5zb3VyY2UgPT09IGVsZW1lbnQuc291cmNlKVxyXG4gICAgICAgICAgICAgICAgICAgIC5sZW5ndGggPT09IDBcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICBzZWFyY2hQcm9wb3NhbHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBlbGVtZW50LnNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzOiByZXN1bHRzLm1hcChyID0+IHIuZGF0YSlcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcHNcclxuICAgICAgICAgICAgICAuYXQodGhpcy5jdXJyZW50U3RvcEluZGV4KVxyXG4gICAgICAgICAgICAgIC5wYXRjaFZhbHVlKHsgc3RvcFByb3Bvc2Fsczogc2VhcmNoUHJvcG9zYWxzIH0pO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRUZXJtKHRlcm06IHN0cmluZykge1xyXG4gICAgdGhpcy50ZXJtID0gdGVybTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5rZXlJc1ZhbGlkKHRlcm0pICYmXHJcbiAgICAgICh0ZXJtLmxlbmd0aCA+PSB0aGlzLmxlbmd0aCB8fCB0ZXJtLmxlbmd0aCA9PT0gMClcclxuICAgICkge1xyXG4gICAgICB0aGlzLnN0cmVhbSQubmV4dCh0ZXJtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUga2V5SXNWYWxpZChrZXk6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZEtleXMuZmluZCh2YWx1ZSA9PiB2YWx1ZSA9PT0ga2V5KSA9PT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAga2V5dXAoaSwgZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGNvbnN0IHRlcm0gPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG4gICAgdGhpcy5zZXRUZXJtKHRlcm0pO1xyXG4gICAgdGhpcy5tYXAub2wudW4oJ3NpbmdsZWNsaWNrJywgZXZ0ID0+IHtcclxuICAgICAgdGhpcy5oYW5kbGVNYXBDbGljayhldnQsIGkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjbGVhclN0b3Aoc3RvcEluZGV4KSB7XHJcbiAgICB0aGlzLmRlbGV0ZVJvdXRpbmdPdmVybGF5YnlJRCh0aGlzLmdldFN0b3BPdmVybGF5SUQoc3RvcEluZGV4KSk7XHJcbiAgICB0aGlzLnN0b3BzLnJlbW92ZUF0KHN0b3BJbmRleCk7XHJcbiAgICB0aGlzLnN0b3BzLmluc2VydChzdG9wSW5kZXgsIHRoaXMuY3JlYXRlU3RvcCh0aGlzLnJvdXRpbmdUZXh0KHN0b3BJbmRleCkpKTtcclxuICAgIHRoaXMucm91dGluZ1JvdXRlc092ZXJsYXlEYXRhU291cmNlLm9sLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICBjaG9vc2VQcm9wb3NhbChwcm9wb3NhbCwgaSkge1xyXG4gICAgaWYgKHByb3Bvc2FsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgbGV0IGdlb21Db29yZDtcclxuICAgICAgY29uc3QgZ2VvbSA9IChwcm9wb3NhbCBhcyBhbnkpLmdlb21ldHJ5O1xyXG4gICAgICBpZiAoZ2VvbS50eXBlID09PSAnUG9pbnQnKSB7XHJcbiAgICAgICAgZ2VvbUNvb3JkID0gZ2VvbS5jb29yZGluYXRlcztcclxuICAgICAgfSBlbHNlIGlmIChnZW9tLnR5cGUuc2VhcmNoKCdMaW5lJykgPj0gMCkge1xyXG4gICAgICAgIGxldCBjb29yZEFycmF5ID0gW107XHJcbiAgICAgICAgaWYgKGdlb20uY29vcmRpbmF0ZXMgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgLy8gTWlkZGxlIHNlZ21lbnQgb2YgbXVsdGlsaW5lc3RyaW5nXHJcbiAgICAgICAgICBjb29yZEFycmF5ID1cclxuICAgICAgICAgICAgZ2VvbS5jb29yZGluYXRlc1tNYXRoLmZsb29yKGdlb20uY29vcmRpbmF0ZXMubGVuZ3RoIC8gMildO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb29yZEFycmF5ID0gZ2VvbS5jb29yZGluYXRlcztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbWlkZGxlIHBvaW50IG9mIGNvb3Jkc1xyXG4gICAgICAgIGdlb21Db29yZCA9IGNvb3JkQXJyYXlbTWF0aC5mbG9vcihjb29yZEFycmF5Lmxlbmd0aCAvIDIpXTtcclxuICAgICAgfSBlbHNlIGlmIChnZW9tLnR5cGUuc2VhcmNoKCdQb2x5Z29uJykgPj0gMCkge1xyXG4gICAgICAgIGNvbnN0IHBvbHlnb25FeHRlbnQgPSBwcm9wb3NhbC5leHRlbnQ7XHJcbiAgICAgICAgY29uc3QgbG9uZyA9XHJcbiAgICAgICAgICBwb2x5Z29uRXh0ZW50WzBdICsgKHBvbHlnb25FeHRlbnRbMl0gLSBwb2x5Z29uRXh0ZW50WzBdKSAvIDI7XHJcbiAgICAgICAgY29uc3QgbGF0ID1cclxuICAgICAgICAgIHBvbHlnb25FeHRlbnRbMV0gKyAocG9seWdvbkV4dGVudFszXSAtIHBvbHlnb25FeHRlbnRbMV0pIC8gMjtcclxuICAgICAgICBnZW9tQ29vcmQgPSBbbG9uZywgbGF0XTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGdlb21Db29yZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wcy5hdChpKS5wYXRjaFZhbHVlKHsgc3RvcENvb3JkaW5hdGVzOiBnZW9tQ29vcmQgfSk7XHJcbiAgICAgICAgdGhpcy5hZGRTdG9wT3ZlcmxheShnZW9tQ29vcmQsIGkpO1xyXG4gICAgICAgIGNvbnN0IHByb3Bvc2FsRXh0ZW50ID0gdGhpcy5yb3V0aW5nU3RvcHNPdmVybGF5RGF0YVNvdXJjZS5vbFxyXG4gICAgICAgICAgLmdldEZlYXR1cmVCeUlkKHRoaXMuZ2V0U3RvcE92ZXJsYXlJRChpKSlcclxuICAgICAgICAgIC5nZXRHZW9tZXRyeSgpXHJcbiAgICAgICAgICAuZ2V0RXh0ZW50KCk7XHJcblxyXG4gICAgICAgIGlmICghb2xleHRlbnQuaW50ZXJzZWN0cyhwcm9wb3NhbEV4dGVudCwgdGhpcy5tYXAuZ2V0RXh0ZW50KCkpKSB7XHJcbiAgICAgICAgICB0aGlzLm1hcC52aWV3Q29udHJvbGxlci5tb3ZlVG9FeHRlbnQocHJvcG9zYWxFeHRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9jdXMoaSkge1xyXG4gICAgdGhpcy51bmxpc3RlblNpbmdsZUNsaWNrKCk7XHJcbiAgICB0aGlzLmN1cnJlbnRTdG9wSW5kZXggPSBpO1xyXG4gICAgdGhpcy5mb2N1c09uU3RvcCA9IHRydWU7XHJcbiAgICB0aGlzLnJvdXRpbmdGb3JtU2VydmljZS5zZXRNYXBXYWl0aW5nRm9yUm91dGluZ0NsaWNrKCk7XHJcbiAgICB0aGlzLmZvY3VzS2V5LnB1c2goXHJcbiAgICAgIHRoaXMubWFwLm9sLm9uY2UoJ3NpbmdsZWNsaWNrJywgZXZ0ID0+IHtcclxuICAgICAgICB0aGlzLmhhbmRsZU1hcENsaWNrKGV2dCwgaSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVNYXBDbGljayhldmVudDogb2xjb25kaXRpb24sIGluZGV4UG9zPykge1xyXG4gICAgdGhpcy5zdG9wcy5hdChpbmRleFBvcykucGF0Y2hWYWx1ZSh7IHN0b3BQcm9wb3NhbHM6IFtdIH0pO1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFN0b3BJbmRleCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuYWRkU3RvcCgpO1xyXG4gICAgICBpbmRleFBvcyA9IHRoaXMuc3RvcHMubGVuZ3RoIC0gMjtcclxuICAgICAgdGhpcy5zdG9wcy5hdChpbmRleFBvcykudmFsdWUuc3RvcFByb3Bvc2FscyA9IFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5kZXhQb3MgPSB0aGlzLmN1cnJlbnRTdG9wSW5kZXg7XHJcbiAgICB9XHJcbiAgICBjb25zdCBjbGlja0Nvb3JkaW5hdGVzID0gb2xwcm9qLnRyYW5zZm9ybShcclxuICAgICAgZXZlbnQuY29vcmRpbmF0ZSxcclxuICAgICAgdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgdGhpcy5wcm9qZWN0aW9uXHJcbiAgICApO1xyXG4gICAgdGhpcy5zdG9wcy5hdChpbmRleFBvcykucGF0Y2hWYWx1ZSh7IHN0b3BDb29yZGluYXRlczogY2xpY2tDb29yZGluYXRlcyB9KTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZUxvY2F0aW9uUHJvcG9zYWxzKGNsaWNrQ29vcmRpbmF0ZXMsIGluZGV4UG9zKTtcclxuICAgIHRoaXMuYWRkU3RvcE92ZXJsYXkoY2xpY2tDb29yZGluYXRlcywgaW5kZXhQb3MpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuZm9jdXNPblN0b3AgPSBmYWxzZTsgLy8gcHJldmVudCB0byB0cmlnZ2VyIG1hcCBjbGljayBhbmQgU2VsZWN0IG9uIHJvdXRlcyBhdCBzYW1lIHRpbWUuXHJcbiAgICB9LCA1MDApO1xyXG4gICAgdGhpcy5yb3V0aW5nRm9ybVNlcnZpY2UudW5zZXRNYXBXYWl0aW5nRm9yUm91dGluZ0NsaWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZW9sb2NhdGVTdG9wKGluZGV4OiBudW1iZXIpIHtcclxuICAgIG1vdmVUb09sRmVhdHVyZXModGhpcy5tYXAsIFt0aGlzLm1hcC5nZW9sb2NhdGlvbkZlYXR1cmVdLCBGZWF0dXJlTW90aW9uLk1vdmUpO1xyXG4gICAgY29uc3QgZ2VvbG9jYXRlQ29vcmRpbmF0ZXMgPSB0aGlzLm1hcC5nZXRDZW50ZXIodGhpcy5wcm9qZWN0aW9uKTtcclxuICAgIHRoaXMuc3RvcHMuYXQoaW5kZXgpLnBhdGNoVmFsdWUoeyBzdG9wQ29vcmRpbmF0ZXM6IGdlb2xvY2F0ZUNvb3JkaW5hdGVzIH0pO1xyXG4gICAgdGhpcy5hZGRTdG9wT3ZlcmxheShnZW9sb2NhdGVDb29yZGluYXRlcywgaW5kZXgpO1xyXG4gICAgdGhpcy5oYW5kbGVMb2NhdGlvblByb3Bvc2FscyhnZW9sb2NhdGVDb29yZGluYXRlcywgaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZFN0b3BPdmVybGF5KGNvb3JkaW5hdGVzOiBbbnVtYmVyLCBudW1iZXJdLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCByb3V0aW5nVGV4dCA9IHRoaXMucm91dGluZ1RleHQoaW5kZXgpO1xyXG4gICAgbGV0IHN0b3BDb2xvcjtcclxuICAgIGxldCBzdG9wVGV4dDtcclxuICAgIGlmIChyb3V0aW5nVGV4dCA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICBzdG9wQ29sb3IgPSAnZ3JlZW4nO1xyXG4gICAgICBzdG9wVGV4dCA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uZ2VvLnJvdXRpbmdGb3JtLnN0YXJ0J1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChyb3V0aW5nVGV4dCA9PT0gJ2VuZCcpIHtcclxuICAgICAgc3RvcENvbG9yID0gJ3JlZCc7XHJcbiAgICAgIHN0b3BUZXh0ID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5nZW8ucm91dGluZ0Zvcm0uZW5kJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RvcENvbG9yID0gJ3llbGxvdyc7XHJcbiAgICAgIHN0b3BUZXh0ID1cclxuICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICdpZ28uZ2VvLnJvdXRpbmdGb3JtLmludGVybWVkaWF0ZSdcclxuICAgICAgICApICtcclxuICAgICAgICAnICMnICtcclxuICAgICAgICBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBvbGdlb20uUG9pbnQoXHJcbiAgICAgIG9scHJvai50cmFuc2Zvcm0oY29vcmRpbmF0ZXMsIHRoaXMucHJvamVjdGlvbiwgdGhpcy5tYXAucHJvamVjdGlvbilcclxuICAgICk7XHJcbiAgICBjb25zdCBmZWF0dXJlID0gbmV3IG9sRmVhdHVyZSh7IGdlb21ldHJ5IH0pO1xyXG5cclxuICAgIGNvbnN0IHN0b3BJRCA9IHRoaXMuZ2V0U3RvcE92ZXJsYXlJRChpbmRleCk7XHJcbiAgICB0aGlzLmRlbGV0ZVJvdXRpbmdPdmVybGF5YnlJRChzdG9wSUQpO1xyXG4gICAgZmVhdHVyZS5zZXRJZChzdG9wSUQpO1xyXG5cclxuICAgIGlmIChnZW9tZXRyeSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZ2VvbWV0cnkuZ2V0VHlwZSgpID09PSAnUG9pbnQnKSB7XHJcbiAgICAgIGNvbnN0IG9sU3R5bGUgPSBjcmVhdGVPdmVybGF5TWFya2VyU3R5bGUoc3RvcENvbG9yKTtcclxuICAgICAgLy8gc3RvcFRleHRcclxuICAgICAgZmVhdHVyZS5zZXRTdHlsZShvbFN0eWxlKTtcclxuICAgIH1cclxuICAgIHRoaXMucm91dGluZ1N0b3BzT3ZlcmxheURhdGFTb3VyY2Uub2wuYWRkRmVhdHVyZShmZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTdG9wT3ZlcmxheUlEKGluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgbGV0IHR4dDtcclxuICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICB0eHQgPSAnc3RhcnQnO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PT0gdGhpcy5zdG9wcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHR4dCA9ICdlbmQnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdHh0ID0gaW5kZXg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJ3JvdXRpbmdTdG9wXycgKyB0eHQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRlbGV0ZVJvdXRpbmdPdmVybGF5YnlJRChpZCkge1xyXG4gICAgaWYgKHRoaXMucm91dGluZ1N0b3BzT3ZlcmxheURhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQoaWQpKSB7XHJcbiAgICAgIHRoaXMucm91dGluZ1N0b3BzT3ZlcmxheURhdGFTb3VyY2Uub2wucmVtb3ZlRmVhdHVyZShcclxuICAgICAgICB0aGlzLnJvdXRpbmdTdG9wc092ZXJsYXlEYXRhU291cmNlLm9sLmdldEZlYXR1cmVCeUlkKGlkKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucm91dGluZ1JvdXRlc092ZXJsYXlEYXRhU291cmNlLm9sLmdldEZlYXR1cmVCeUlkKGlkKSkge1xyXG4gICAgICB0aGlzLnJvdXRpbmdSb3V0ZXNPdmVybGF5RGF0YVNvdXJjZS5vbC5yZW1vdmVGZWF0dXJlKFxyXG4gICAgICAgIHRoaXMucm91dGluZ1JvdXRlc092ZXJsYXlEYXRhU291cmNlLm9sLmdldEZlYXR1cmVCeUlkKGlkKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRVcmwoKSB7XHJcbiAgICBpZiAoIXRoaXMucm91dGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJvdXRpbmdLZXkgPSB0aGlzLnJvdXRlLm9wdGlvbnMucm91dGluZ0Nvb3JkS2V5O1xyXG4gICAgY29uc3Qgc3RvcHNDb29yZGluYXRlcyA9IFtdO1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJvdXRpbmdGb3JtU2VydmljZSAmJlxyXG4gICAgICB0aGlzLnJvdXRpbmdGb3JtU2VydmljZS5nZXRTdG9wc0Nvb3JkaW5hdGVzKCkgJiZcclxuICAgICAgdGhpcy5yb3V0aW5nRm9ybVNlcnZpY2UuZ2V0U3RvcHNDb29yZGluYXRlcygpLmxlbmd0aCAhPT0gMFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucm91dGluZ0Zvcm1TZXJ2aWNlLmdldFN0b3BzQ29vcmRpbmF0ZXMoKS5mb3JFYWNoKGNvb3JkID0+IHtcclxuICAgICAgICBzdG9wc0Nvb3JkaW5hdGVzLnB1c2goY29vcmQpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGxldCByb3V0aW5nVXJsID0gJyc7XHJcbiAgICBpZiAoc3RvcHNDb29yZGluYXRlcy5sZW5ndGggPj0gMikge1xyXG4gICAgICByb3V0aW5nVXJsID0gYCR7cm91dGluZ0tleX09JHtzdG9wc0Nvb3JkaW5hdGVzLmpvaW4oJzsnKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgJHtsb2NhdGlvbi5vcmlnaW59JHtcclxuICAgICAgbG9jYXRpb24ucGF0aG5hbWVcclxuICAgIH0/dG9vbD1kaXJlY3Rpb25zJiR7cm91dGluZ1VybH1gO1xyXG4gIH1cclxufVxyXG4iXX0=