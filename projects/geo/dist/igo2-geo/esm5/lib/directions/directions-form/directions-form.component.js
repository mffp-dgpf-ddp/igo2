/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, Optional, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import olFeature from 'ol/Feature';
import OlGeoJSON from 'ol/format/GeoJSON';
import * as olgeom from 'ol/geom';
import * as olproj from 'ol/proj';
import * as olstyle from 'ol/style';
import * as olcondition from 'ol/events/condition';
import * as olinteraction from 'ol/interaction';
import * as olobservable from 'ol/Observable';
import { Clipboard } from '@igo2/utils';
import { LanguageService, MessageService, RouteService } from '@igo2/core';
import { getEntityTitle } from '@igo2/common';
import { IgoMap } from '../../map/shared/map';
import { SearchService } from '../../search/shared/search.service';
import { VectorLayer } from '../../layer/shared/layers/vector-layer';
import { FeatureDataSource } from '../../datasource/shared/datasources/feature-datasource';
import { FeatureMotion, FEATURE } from '../../feature/shared/feature.enums';
import { moveToOlFeatures, tryBindStoreLayer, tryAddLoadingStrategy } from '../../feature/shared/feature.utils';
import { DirectionsService } from '../shared/directions.service';
import { DirectionsFormService } from './directions-form.service';
import { QueryService } from '../../query/shared/query.service';
import { FeatureStore } from '../../feature/shared/store';
import { FeatureStoreLoadingStrategy } from '../../feature/shared/strategies/loading';
import { roundCoordTo } from '../../map/shared/map.utils';
var DirectionsFormComponent = /** @class */ (function () {
    function DirectionsFormComponent(formBuilder, directionsService, languageService, messageService, searchService, queryService, directionsFormService, changeDetectorRefs, route) {
        this.formBuilder = formBuilder;
        this.directionsService = directionsService;
        this.languageService = languageService;
        this.messageService = messageService;
        this.searchService = searchService;
        this.queryService = queryService;
        this.directionsFormService = directionsFormService;
        this.changeDetectorRefs = changeDetectorRefs;
        this.route = route;
        this.invalidKeys = ['Control', 'Shift', 'Alt'];
        this.projection = 'EPSG:4326';
        this.routesQueries$$ = [];
        this.stream$ = new Subject();
        this.focusOnStop = false;
        this.focusKey = [];
        this.debounce = 200;
        this.length = 2;
        this.submit = new EventEmitter();
    }
    /**
     * @return {?}
     */
    DirectionsFormComponent.prototype.changeRoute = /**
     * @return {?}
     */
    function () {
        this.showRouteGeometry();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DirectionsFormComponent.prototype.prevent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    DirectionsFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.queryService.queryEnabled = false;
        this.focusOnStop = false;
        this.browserLanguage = this.languageService.getLanguage();
        this.stopsForm = this.formBuilder.group({
            directionsType: 'car',
            directionsMode: 'driving',
            // loop
            stopOrderPriority: true,
            directionsFixedStartEnd: false,
            stops: this.formBuilder.array([
                this.createStop('start'),
                this.createStop('end')
            ])
        });
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.initStores();
            _this.initOlInteraction();
        }), 1);
        this.subscribeToFormChange();
        this.routesQueries$$.push(this.stream$
            .pipe(debounceTime(this.debounce), distinctUntilChanged())
            .subscribe((/**
         * @param {?} term
         * @return {?}
         */
        function (term) { return _this.handleTermChanged(term); })));
    };
    /**
     * @return {?}
     */
    DirectionsFormComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribeRoutesQueries();
        this.unlistenSingleClick();
        this.queryService.queryEnabled = true;
        this.freezeStores();
        this.writeStopsToFormService();
    };
    /**
     * @private
     * @return {?}
     */
    DirectionsFormComponent.prototype.initStores = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var loadingStrategy = new FeatureStoreLoadingStrategy({ motion: FeatureMotion.None });
        // STOP STORE
        /** @type {?} */
        var stopsStore = this.stopsStore;
        /** @type {?} */
        var stopsLayer = new VectorLayer({
            title: 'Directions - stops',
            zIndex: 911,
            source: new FeatureDataSource(),
            showInLayerList: false,
            exportable: false,
            browsable: false,
            style: stopMarker
        });
        tryBindStoreLayer(stopsStore, stopsLayer);
        tryAddLoadingStrategy(stopsStore, loadingStrategy);
        // ROUTE AND VERTEX STORE
        /** @type {?} */
        var routeStore = this.routeStore;
        /** @type {?} */
        var routeLayer = new VectorLayer({
            title: 'Directions - route and vertex',
            zIndex: 910,
            source: new FeatureDataSource(),
            showInLayerList: false,
            exportable: false,
            browsable: false,
            style: stopMarker
        });
        tryBindStoreLayer(routeStore, routeLayer);
        tryAddLoadingStrategy(routeStore, loadingStrategy);
    };
    /**
     * @private
     * @return {?}
     */
    DirectionsFormComponent.prototype.initOlInteraction = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var selectedStopFeature;
        /** @type {?} */
        var selectStop = new olinteraction.Select({
            layers: [this.stopsStore.layer.ol],
            condition: olcondition.pointerMove,
            hitTolerance: 7,
            filter: (/**
             * @param {?} feature
             * @return {?}
             */
            function (feature) {
                return feature.get('type') === 'stop';
            })
        });
        selectStop.on('select', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            selectedStopFeature = evt.target.getFeatures()[0];
        }));
        /** @type {?} */
        var translateStop = new olinteraction.Translate({
            layers: [this.stopsStore.layer.ol],
            features: selectedStopFeature
            // TODO In Openlayers >= 6.x, filter is now allowed.
        });
        translateStop.on('translating', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            /** @type {?} */
            var features = evt.features;
            if (features.getLength() === 0) {
                return;
            }
            _this.executeTranslation(features, false, 50, true);
        }));
        translateStop.on('translateend', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            /** @type {?} */
            var features = evt.features;
            if (features.getLength() === 0) {
                return;
            }
            _this.executeTranslation(features, true, 0, false);
        }));
        /** @type {?} */
        var selectedRoute = new olinteraction.Select({
            layers: [this.routeStore.layer.ol],
            condition: olcondition.click,
            hitTolerance: 7,
            filter: (/**
             * @param {?} feature
             * @return {?}
             */
            function (feature) {
                return feature.getId() === 'route';
            })
        });
        selectedRoute.on('select', (/**
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
                selectedRoute.getFeatures().clear();
            }
            selectedRoute.getFeatures().clear();
        }));
        this.map.ol.addInteraction(selectStop);
        this.map.ol.addInteraction(translateStop);
        this.map.ol.addInteraction(selectedRoute);
    };
    /**
     * @private
     * @return {?}
     */
    DirectionsFormComponent.prototype.subscribeToFormChange = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.routesQueries$$.push(this.stopsForm.valueChanges
            .pipe(debounceTime(this.debounce))
            .subscribe((/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            _this.writeStopsToFormService();
        })));
    };
    /**
     * Freeze any store, meaning the layer is removed, strategies are deactivated
     * and some listener removed
     * @internal
     */
    /**
     * Freeze any store, meaning the layer is removed, strategies are deactivated
     * and some listener removed
     * \@internal
     * @private
     * @return {?}
     */
    DirectionsFormComponent.prototype.freezeStores = /**
     * Freeze any store, meaning the layer is removed, strategies are deactivated
     * and some listener removed
     * \@internal
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var stopsStore = this.stopsStore;
        /** @type {?} */
        var routeStore = this.routeStore;
        this.map.removeLayer(stopsStore.layer);
        this.map.removeLayer(routeStore.layer);
        stopsStore.deactivateStrategyOfType(FeatureStoreLoadingStrategy);
        routeStore.deactivateStrategyOfType(FeatureStoreLoadingStrategy);
    };
    /**
     * @private
     * @param {?} features
     * @param {?=} reverseSearchProposal
     * @param {?=} delay
     * @param {?=} overview
     * @return {?}
     */
    DirectionsFormComponent.prototype.executeTranslation = /**
     * @private
     * @param {?} features
     * @param {?=} reverseSearchProposal
     * @param {?=} delay
     * @param {?=} overview
     * @return {?}
     */
    function (features, reverseSearchProposal, delay, overview) {
        var _this = this;
        if (reverseSearchProposal === void 0) { reverseSearchProposal = false; }
        if (delay === void 0) { delay = 0; }
        if (overview === void 0) { overview = false; }
        this.routeStore.clear();
        /** @type {?} */
        var firstFeature = features.getArray()[0];
        /** @type {?} */
        var translatedID = firstFeature.getId();
        /** @type {?} */
        var translatedPos = translatedID.split('_');
        /** @type {?} */
        var p;
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
        var translationCoordinates = olproj.transform(firstFeature.getGeometry().getCoordinates(), this.map.projection, this.projection);
        this.stops
            .at(p)
            .patchValue({ stopCoordinates: translationCoordinates, stopProposals: [] });
        if (reverseSearchProposal) {
            this.handleLocationProposals(translationCoordinates, p);
        }
        /** @type {?} */
        var directionsOptions = (/** @type {?} */ ({
            steps: true,
            overview: false,
            alternatives: true
        }));
        if (overview) {
            directionsOptions.overview = true;
            directionsOptions.steps = false;
            directionsOptions.alternatives = false;
        }
        if (delay > 0) {
            if (typeof this.lastTimeoutRequest !== 'undefined') { // cancel timeout when the mouse moves
                clearTimeout(this.lastTimeoutRequest);
            }
            this.lastTimeoutRequest = setTimeout((/**
             * @return {?}
             */
            function () {
                _this.getRoutes(undefined, directionsOptions);
            }), delay);
        }
        else {
            clearTimeout(this.lastTimeoutRequest);
            this.getRoutes(undefined, directionsOptions);
        }
    };
    /**
     * @param {?} coordinates
     * @param {?} stopIndex
     * @return {?}
     */
    DirectionsFormComponent.prototype.handleLocationProposals = /**
     * @param {?} coordinates
     * @param {?} stopIndex
     * @return {?}
     */
    function (coordinates, stopIndex) {
        var _this = this;
        /** @type {?} */
        var groupedLocations = [];
        /** @type {?} */
        var roundedCoordinates = [coordinates[0].toFixed(5), coordinates[1].toFixed(5)];
        this.stops.at(stopIndex).patchValue({ stopPoint: roundedCoordinates.join(',') });
        this.searchService
            .reverseSearch(coordinates, { zoom: this.map.viewController.getZoom() })
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
                            if (feature.properties.type === 'adresses') {
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
                    else if (results[0].source.getId() === 'coordinatesreverse') {
                        _this.stops.at(stopIndex).patchValue({
                            stopPoint: [
                                results[0].data.geometry.coordinates[0].toFixed(5),
                                results[0].data.geometry.coordinates[1].toFixed(5)
                            ].join(',')
                        });
                        if (results[0].data.geometry.type === 'Point') {
                            _this.stops.at(stopIndex).patchValue({
                                stopCoordinates: results[0].data.geometry.coordinates
                            });
                        }
                        else {
                            // Not moving the translated point Only to suggest value into the UI.
                        }
                    }
                }
                else {
                    _this.stops.at(stopIndex).patchValue({ stopPoint: roundedCoordinates.join(','), stopProposals: [] });
                }
                _this.changeDetectorRefs.detectChanges();
            })));
        }));
    };
    /**
     * @param {?} index
     * @param {?=} stopsCounts
     * @return {?}
     */
    DirectionsFormComponent.prototype.directionsText = /**
     * @param {?} index
     * @param {?=} stopsCounts
     * @return {?}
     */
    function (index, stopsCounts) {
        if (stopsCounts === void 0) { stopsCounts = this.stops.length; }
        if (index === 0) {
            return 'start';
        }
        else if (index === stopsCounts - 1 || stopsCounts === 1) {
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
    DirectionsFormComponent.prototype.raiseStop = /**
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
    DirectionsFormComponent.prototype.lowerStop = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (index < this.stops.length - 1) {
            this.moveStop(index, 1);
        }
    };
    /**
     * @private
     * @param {?} index
     * @param {?} diff
     * @return {?}
     */
    DirectionsFormComponent.prototype.moveStop = /**
     * @private
     * @param {?} index
     * @param {?} diff
     * @return {?}
     */
    function (index, diff) {
        /** @type {?} */
        var fromValue = this.stops.at(index);
        this.removeStop(index);
        this.stops.insert(index + diff, fromValue);
        this.stops.at(index).patchValue({ directionsText: this.directionsText(index) });
        this.stops
            .at(index + diff)
            .patchValue({ directionsText: this.directionsText(index + diff) });
        if (this.stops.at(index).value.stopCoordinates) {
            this.addStopOverlay(this.stops.at(index).value.stopCoordinates, index);
        }
        if (this.stops.at(index + diff).value.stopCoordinates) {
            this.addStopOverlay(this.stops.at(index + diff).value.stopCoordinates, index + diff);
        }
    };
    Object.defineProperty(DirectionsFormComponent.prototype, "stops", {
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
    DirectionsFormComponent.prototype.writeStopsToFormService = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var stops = [];
        this.stops.value.forEach((/**
         * @param {?} stop
         * @return {?}
         */
        function (stop) {
            if (stop.stopCoordinates instanceof Array) {
                stops.push(stop);
            }
        }));
        this.directionsFormService.setStops(stops);
    };
    /**
     * @return {?}
     */
    DirectionsFormComponent.prototype.addStop = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var insertIndex = this.stops.length - 1;
        this.stops.insert(insertIndex, this.createStop());
    };
    /**
     * @param {?=} directionsPos
     * @return {?}
     */
    DirectionsFormComponent.prototype.createStop = /**
     * @param {?=} directionsPos
     * @return {?}
     */
    function (directionsPos) {
        if (directionsPos === void 0) { directionsPos = 'intermediate'; }
        return this.formBuilder.group({
            stopPoint: [''],
            stopProposals: [[]],
            directionsText: directionsPos,
            stopCoordinates: ['', [Validators.required]]
        });
    };
    /**
     * @param {?} index
     * @return {?}
     */
    DirectionsFormComponent.prototype.removeStop = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var _this = this;
        /** @type {?} */
        var id = this.getStopOverlayID(index);
        this.deleteStoreFeatureByID(this.stopsStore, id);
        this.stops.removeAt(index);
        /** @type {?} */
        var cnt = 0;
        this.stops.value.forEach((/**
         * @param {?} stop
         * @return {?}
         */
        function (stop) {
            _this.stops.at(cnt).patchValue({ directionsText: _this.directionsText(cnt) });
            _this.addStopOverlay(_this.stops.at(cnt).value.stopCoordinates, cnt);
            cnt++;
        }));
    };
    /**
     * @return {?}
     */
    DirectionsFormComponent.prototype.resetForm = /**
     * @return {?}
     */
    function () {
        this.routesResults = undefined;
        /** @type {?} */
        var nbStops = this.stops.length;
        for (var i = 0; i < nbStops; i++) {
            this.stops.removeAt(0);
        }
        this.stops.insert(0, this.createStop('start'));
        this.stops.insert(1, this.createStop('end'));
        this.stopsStore.clear();
        this.routeStore.clear();
    };
    /**
     * @param {?} step
     * @param {?} cnt
     * @return {?}
     */
    DirectionsFormComponent.prototype.formatStep = /**
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
    DirectionsFormComponent.prototype.formatInstruction = /**
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
        var image = 'forward';
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
            image = 'forward';
            cssClass = 'rotate-90';
        }
        else if (modifier === 'sharp right') {
            image = 'subdirectory-arrow-right';
            cssClass = 'icon-flipped';
        }
        else if (modifier === 'right') {
            image = 'subdirectory-arrow-right';
            cssClass = 'icon-flipped';
        }
        else if (modifier === 'slight right') {
            image = 'forward';
            cssClass = 'rotate-290';
        }
        else if (modifier === 'straight') {
            image = 'forward';
        }
        else if (modifier === 'slight left') {
            image = 'forward';
            cssClass = 'rotate-250';
        }
        else if (modifier === 'left') {
            image = 'subdirectory-arrow-left';
            cssClass = 'icon-flipped';
        }
        else if (modifier === 'sharp left') {
            image = 'subdirectory-arrow-left';
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
            image = 'compass';
            cssClass = '';
        }
        else if (type === 'depart') {
            directiveFr =
                'Aller en direction ' + translatedDirection + ' sur ' + route;
            directiveEn = 'Head ' + translatedDirection + ' on ' + route;
            image = 'compass';
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
                image = 'map-marker';
                cssClass = '';
            }
        }
        else if (type === 'merge') {
            directiveFr = 'Continuer sur ' + route;
            directiveEn = 'Continue on ' + route;
            image = 'forward';
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
            image = 'forward';
            cssClass = 'rotate-270';
        }
        else if (type === 'roundabout') {
            directiveFr = 'Au rond-point, prendre la ' + exit;
            directiveFr += exit === 1 ? 're' : 'e';
            directiveFr += ' sortie vers ' + route;
            directiveEn = 'At the roundabout, take the ' + exit;
            directiveEn += exit === 1 ? 'st' : 'rd';
            directiveEn += ' exit towards ' + route;
            image = 'chart-donut';
            cssClass = '';
        }
        else if (type === 'rotary') {
            directiveFr = 'Rond-point rotary....';
            directiveEn = 'Roundabout rotary....';
            image = 'chart-donut';
            cssClass = '';
        }
        else if (type === 'roundabout turn') {
            directiveFr = 'Rond-point, prendre la ...';
            directiveEn = 'Roundabout, take the ...';
            image = 'chart-donut';
            cssClass = '';
        }
        else if (type === 'exit roundabout') {
            directiveFr = 'Poursuivre vers ' + route;
            directiveEn = 'Continue to ' + route;
            image = 'forward';
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
            image = 'flag-variant';
            cssClass = '';
        }
        if (stepPosition === 0) {
            image = 'compass';
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
    DirectionsFormComponent.prototype.translateModifier = /**
     * @param {?} modifier
     * @return {?}
     */
    function (modifier) {
        if (modifier === 'uturn') {
            return this.languageService.translate.instant('igo.geo.directions.uturn');
        }
        else if (modifier === 'sharp right') {
            return this.languageService.translate.instant('igo.geo.directions.sharp right');
        }
        else if (modifier === 'right') {
            return this.languageService.translate.instant('igo.geo.directions.right');
        }
        else if (modifier === 'slight right') {
            return this.languageService.translate.instant('igo.geo.directions.slight right');
        }
        else if (modifier === 'sharp left') {
            return this.languageService.translate.instant('igo.geo.directions.sharp left');
        }
        else if (modifier === 'left') {
            return this.languageService.translate.instant('igo.geo.directions.left');
        }
        else if (modifier === 'slight left') {
            return this.languageService.translate.instant('igo.geo.directions.slight left');
        }
        else if (modifier === 'straight') {
            return this.languageService.translate.instant('igo.geo.directions.straight');
        }
        else {
            return modifier;
        }
    };
    /**
     * @param {?} bearing
     * @return {?}
     */
    DirectionsFormComponent.prototype.translateBearing = /**
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
    DirectionsFormComponent.prototype.formatDistance = /**
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
    DirectionsFormComponent.prototype.formatDuration = /**
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
    DirectionsFormComponent.prototype.showSegment = /**
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
    DirectionsFormComponent.prototype.showRouteSegmentGeometry = /**
     * @param {?} coordinates
     * @param {?=} zoomToExtent
     * @return {?}
     */
    function (coordinates, zoomToExtent) {
        if (zoomToExtent === void 0) { zoomToExtent = false; }
        /** @type {?} */
        var vertexId = 'vertex';
        /** @type {?} */
        var geometry4326 = new olgeom.LineString(coordinates);
        /** @type {?} */
        var geometryMapProjection = geometry4326.transform('EPSG:4326', this.map.projection);
        /** @type {?} */
        var routeSegmentCoordinates = ((/** @type {?} */ (geometryMapProjection))).getCoordinates();
        /** @type {?} */
        var lastPoint = routeSegmentCoordinates[0];
        /** @type {?} */
        var geometry = new olgeom.Point(lastPoint);
        /** @type {?} */
        var feature = new olFeature({ geometry: geometry });
        /** @type {?} */
        var geojsonGeom = new OlGeoJSON().writeGeometryObject(geometry, {
            featureProjection: this.map.projection,
            dataProjection: this.map.projection
        });
        /** @type {?} */
        var previousVertex = this.routeStore.get(vertexId);
        /** @type {?} */
        var previousVertexRevision = previousVertex ? previousVertex.meta.revision : 0;
        /** @type {?} */
        var vertexFeature = {
            type: FEATURE,
            geometry: geojsonGeom,
            projection: this.map.projection,
            properties: {
                id: vertexId,
                type: 'vertex'
            },
            meta: {
                id: vertexId,
                revision: previousVertexRevision + 1
            },
            ol: feature
        };
        this.routeStore.update(vertexFeature);
        if (zoomToExtent) {
            this.map.viewController.zoomToExtent(feature.getGeometry().getExtent());
        }
    };
    /**
     * @param {?=} extent
     * @return {?}
     */
    DirectionsFormComponent.prototype.zoomRoute = /**
     * @param {?=} extent
     * @return {?}
     */
    function (extent) {
        if (extent) {
            this.map.viewController.zoomToExtent(extent);
        }
        else {
            /** @type {?} */
            var routeFeature = this.routeStore.layer.ol.getSource().getFeatures().find((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.getId() === 'route'; }));
            if (routeFeature) {
                /** @type {?} */
                var routeExtent = routeFeature.getGeometry().getExtent();
                this.map.viewController.zoomToExtent(routeExtent);
            }
        }
    };
    /**
     * @private
     * @param {?=} moveToExtent
     * @return {?}
     */
    DirectionsFormComponent.prototype.showRouteGeometry = /**
     * @private
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
        var geometryMapProjection = geometry4326.transform('EPSG:4326', this.map.projection);
        if (moveToExtent) {
            this.zoomRoute(geometryMapProjection.getExtent());
        }
        /** @type {?} */
        var geojsonGeom = new OlGeoJSON().writeGeometryObject(geometryMapProjection, {
            featureProjection: this.map.projection,
            dataProjection: this.map.projection
        });
        /** @type {?} */
        var previousRoute = this.routeStore.get('route');
        /** @type {?} */
        var previousRouteRevision = previousRoute ? previousRoute.meta.revision : 0;
        /** @type {?} */
        var routeFeature = {
            type: FEATURE,
            geometry: geojsonGeom,
            projection: this.map.projection,
            properties: {
                id: 'route',
                type: 'route'
            },
            meta: {
                id: 'route',
                revision: previousRouteRevision + 1
            },
            ol: new olFeature({ geometry: geometryMapProjection })
        };
        this.routeStore.update(routeFeature);
    };
    /**
     * @param {?=} moveToExtent
     * @param {?=} directionsOptions
     * @return {?}
     */
    DirectionsFormComponent.prototype.getRoutes = /**
     * @param {?=} moveToExtent
     * @param {?=} directionsOptions
     * @return {?}
     */
    function (moveToExtent, directionsOptions) {
        var _this = this;
        if (moveToExtent === void 0) { moveToExtent = false; }
        if (directionsOptions === void 0) { directionsOptions = {}; }
        this.deleteStoreFeatureByID(this.routeStore, 'vertex');
        this.writeStopsToFormService();
        /** @type {?} */
        var coords = this.directionsFormService.getStopsCoordinates();
        if (coords.length < 2) {
            return;
        }
        /** @type {?} */
        var routeResponse = this.directionsService.route(coords, directionsOptions);
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
                    _this.changeDetectorRefs.detectChanges();
                })));
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    DirectionsFormComponent.prototype.unlistenSingleClick = /**
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
    DirectionsFormComponent.prototype.unsubscribeRoutesQueries = /**
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
    DirectionsFormComponent.prototype.copyLinkToClipboard = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var successful = Clipboard.copy(this.getUrl());
        if (successful) {
            /** @type {?} */
            var translate = this.languageService.translate;
            /** @type {?} */
            var title = translate.instant('igo.geo.directionsForm.dialog.copyTitle');
            /** @type {?} */
            var msg = translate.instant('igo.geo.directionsForm.dialog.copyMsgLink');
            this.messageService.success(msg, title);
        }
    };
    /**
     * @return {?}
     */
    DirectionsFormComponent.prototype.copyDirectionsToClipboard = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var indent = '\t';
        /** @type {?} */
        var activeRouteDirective = this.languageService.translate.instant('igo.geo.directionsForm.instructions') + ':\n';
        /** @type {?} */
        var wayPointList = '';
        /** @type {?} */
        var summary = this.languageService.translate.instant('igo.geo.directionsForm.summary') +
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
            this.languageService.translate.instant('igo.geo.directionsForm.stopsList') +
            ':\n';
        /** @type {?} */
        var url = this.languageService.translate.instant('igo.geo.directionsForm.link') +
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
            var title = translate.instant('igo.geo.directionsForm.dialog.copyTitle');
            /** @type {?} */
            var msg = translate.instant('igo.geo.directionsForm.dialog.copyMsg');
            this.messageService.success(msg, title);
        }
    };
    /**
     * @private
     * @param {?} term
     * @return {?}
     */
    DirectionsFormComponent.prototype.handleTermChanged = /**
     * @private
     * @param {?} term
     * @return {?}
     */
    function (term) {
        var _this = this;
        if (term !== undefined || term.length !== 0) {
            /** @type {?} */
            var searchProposals_1 = [];
            if (this.search$$) {
                this.search$$.unsubscribe();
            }
            /** @type {?} */
            var researches = this.searchService.search(term, { searchType: 'Feature' });
            researches.map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                return _this.search$$ =
                    res.request.subscribe((/**
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
                                    meta: element.meta,
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
                        _this.changeDetectorRefs.detectChanges();
                    }));
            }));
        }
    };
    /**
     * @param {?} term
     * @return {?}
     */
    DirectionsFormComponent.prototype.setTerm = /**
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
    DirectionsFormComponent.prototype.keyIsValid = /**
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
    DirectionsFormComponent.prototype.keyup = /**
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
    DirectionsFormComponent.prototype.clearStop = /**
     * @param {?} stopIndex
     * @return {?}
     */
    function (stopIndex) {
        // this.deleteDirectionsOverlaybyID(this.getStopOverlayID(stopIndex));
        /** @type {?} */
        var id = this.getStopOverlayID(stopIndex);
        this.deleteStoreFeatureByID(this.stopsStore, id);
        this.routeStore.clear();
        /** @type {?} */
        var stopsCounts = this.stops.length;
        this.stops.removeAt(stopIndex);
        this.stops.insert(stopIndex, this.createStop(this.directionsText(stopIndex, stopsCounts)));
        this.routesResults = undefined;
        this.getRoutes();
    };
    /**
     * @param {?} proposal
     * @param {?} i
     * @return {?}
     */
    DirectionsFormComponent.prototype.chooseProposal = /**
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
                var line = (new OlGeoJSON()).readFeatures(geom);
                geomCoord = line[0].getGeometry().getFirstCoordinate();
                geomCoord = [geomCoord[0], geomCoord[1]];
            }
            else if (geom.type.search('Polygon') >= 0) {
                /** @type {?} */
                var poly = (new OlGeoJSON()).readFeatures(geom);
                geomCoord = poly[0].getGeometry().getInteriorPoints().getFirstCoordinate();
                geomCoord = [geomCoord[0], geomCoord[1]];
            }
            if (geomCoord !== undefined) {
                this.stops.at(i).patchValue({ stopCoordinates: geomCoord });
                this.addStopOverlay(geomCoord, i);
                /*  const proposalExtent = this.directionsStopsOverlayDataSource.ol
                    .getFeatureById(this.getStopOverlayID(i))
                    .getGeometry()
                    .getExtent();*/
                /* if (!olextent.intersects(proposalExtent, this.map.viewController.getExtent())) {
                   this.map.viewController.moveToExtent(proposalExtent);
                 }*/
            }
        }
    };
    /**
     * @param {?} i
     * @return {?}
     */
    DirectionsFormComponent.prototype.focus = /**
     * @param {?} i
     * @return {?}
     */
    function (i) {
        var _this = this;
        this.unlistenSingleClick();
        this.currentStopIndex = i;
        this.focusOnStop = true;
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
    DirectionsFormComponent.prototype.handleMapClick = /**
     * @private
     * @param {?} event
     * @param {?=} indexPos
     * @return {?}
     */
    function (event, indexPos) {
        var _this = this;
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
        this.stops.at(indexPos).patchValue({ stopProposals: [], stopCoordinates: clickCoordinates });
        this.handleLocationProposals(clickCoordinates, indexPos);
        this.addStopOverlay(clickCoordinates, indexPos);
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.focusOnStop = false; // prevent to trigger map click and Select on routes at same time.
        }), 500);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    DirectionsFormComponent.prototype.geolocateStop = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        moveToOlFeatures(this.map, [this.map.geolocationFeature], FeatureMotion.Move);
        /** @type {?} */
        var geolocateCoordinates = this.map.viewController.getCenter(this.projection);
        this.stops.at(index).patchValue({ stopCoordinates: geolocateCoordinates });
        this.addStopOverlay(geolocateCoordinates, index);
        this.handleLocationProposals(geolocateCoordinates, index);
    };
    /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    DirectionsFormComponent.prototype.addStopOverlay = /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    function (coordinates, index) {
        /** @type {?} */
        var directionsText = this.directionsText(index);
        /** @type {?} */
        var stopColor;
        /** @type {?} */
        var stopText;
        if (directionsText === 'start') {
            stopColor = 'green';
            stopText = this.languageService.translate.instant('igo.geo.directionsForm.start');
        }
        else if (directionsText === 'end') {
            stopColor = 'red';
            stopText = this.languageService.translate.instant('igo.geo.directionsForm.end');
        }
        else {
            stopColor = 'yellow';
            stopText =
                this.languageService.translate.instant('igo.geo.directionsForm.intermediate') +
                    ' #' +
                    index;
        }
        /** @type {?} */
        var geometry = new olgeom.Point(olproj.transform(coordinates, this.projection, this.map.projection));
        /** @type {?} */
        var stopID = this.getStopOverlayID(index);
        /** @type {?} */
        var geojsonGeom = new OlGeoJSON().writeGeometryObject(geometry, {
            featureProjection: this.map.projection,
            dataProjection: this.map.projection
        });
        /** @type {?} */
        var previousStop = this.stopsStore.get(stopID);
        /** @type {?} */
        var previousStopRevision = previousStop ? previousStop.meta.revision : 0;
        /** @type {?} */
        var stopFeature = {
            type: FEATURE,
            geometry: geojsonGeom,
            projection: this.map.projection,
            properties: {
                id: stopID,
                type: 'stop',
                stopText: stopText,
                stopColor: stopColor,
                stopOpacity: 1
            },
            meta: {
                id: stopID,
                revision: previousStopRevision + 1
            },
            ol: new olFeature({ geometry: geometry })
        };
        this.stopsStore.update(stopFeature);
        this.getRoutes();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    DirectionsFormComponent.prototype.getStopOverlayID = /**
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
        return 'directionsStop_' + txt;
    };
    /**
     * @private
     * @param {?} store
     * @param {?} id
     * @return {?}
     */
    DirectionsFormComponent.prototype.deleteStoreFeatureByID = /**
     * @private
     * @param {?} store
     * @param {?} id
     * @return {?}
     */
    function (store, id) {
        /** @type {?} */
        var entity = store.get(id);
        if (entity) {
            store.delete(entity);
        }
    };
    /**
     * @private
     * @return {?}
     */
    DirectionsFormComponent.prototype.getUrl = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.route) {
            return;
        }
        /** @type {?} */
        var directionsKey = this.route.options.directionsCoordKey;
        /** @type {?} */
        var stopsCoordinates = [];
        if (this.directionsFormService &&
            this.directionsFormService.getStopsCoordinates() &&
            this.directionsFormService.getStopsCoordinates().length !== 0) {
            this.directionsFormService.getStopsCoordinates().forEach((/**
             * @param {?} coord
             * @return {?}
             */
            function (coord) {
                stopsCoordinates.push(roundCoordTo(coord, 6));
            }));
        }
        /** @type {?} */
        var directionsUrl = '';
        if (stopsCoordinates.length >= 2) {
            directionsUrl = directionsKey + "=" + stopsCoordinates.join(';');
        }
        return "" + location.origin + location.pathname + "?tool=directions&" + directionsUrl;
    };
    DirectionsFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-directions-form',
                    template: "<form class=\"igo-form\" [formGroup]=\"stopsForm\">\r\n  <!-- <div class=\"igo-form-button-group\">\r\n\r\n  </div> -->\r\n  <div #inputs formArrayName=\"stops\" *ngFor=\"let stop of stops.controls; let i = index;\">\r\n    <mat-list-item [formGroupName]=\"i\">\r\n\r\n      <div class=\"igo-input-container\">\r\n        <button *ngIf=\"map.geolocationFeature\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.directionsForm.geolocate' | translate\" (click)=\"geolocateStop(i)\">\r\n          <mat-icon svgIcon=\"crosshairs-gps\"></mat-icon>\r\n        </button>\r\n        <mat-form-field>\r\n          <input matInput formControlName=\"stopPoint\" [matAutocomplete]=\"auto\"\r\n            placeholder=\"{{'igo.geo.directionsForm.'+stop.value.directionsText | translate}}\" (focus)=\"focus(i)\"\r\n            (keyup)=\"keyup(i,$event)\" (keydown.enter)=\"prevent($event)\">\r\n            <button \r\n              mat-button \r\n              *ngIf=\"stop.value && (stop.value.stopPoint.length > 0 || stop.value.stopProposals.length > 0)\"\r\n              matSuffix mat-icon-button color=\"warn\" aria-label=\"Clear\" (click)=\"clearStop(i)\">\r\n              <mat-icon svgIcon=\"close\"></mat-icon>\r\n            </button>\r\n\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-optgroup *ngFor=\"let source of stop.value.stopProposals\" [label]=\"source.source.title\" [disabled]=\"source.source.enabled === false\">\r\n              <mat-option *ngFor=\"let result of source.results\" [value]=\"result.meta ? result.meta.title : ''\" \r\n              (onSelectionChange)=\"chooseProposal(result,i)\"\r\n              matTooltipShowDelay=\"500\" [matTooltip]=\"result.meta ? result.meta.title : ''\">\r\n                {{ result.meta ? result.meta.title : '' }}\r\n              </mat-option>\r\n            </mat-optgroup>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n\r\n        <!-- <div class=\"igo-form-button-group\"> -->\r\n\r\n\r\n          <!-- <button *ngIf=\"i !== 0\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.directionsForm.raiseStop' | translate\"\r\n            [color]=\"color\" (click)=\"raiseStop(i)\">\r\n            <mat-icon svgIcon=\"arrow-upward\"></mat-icon>\r\n          </button>\r\n          <button *ngIf=\"i !== stops.length - 1\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.directionsForm.lowerStop' | translate\"\r\n            [color]=\"color\" (click)=\"lowerStop(i)\">\r\n            <mat-icon svgIcon=\"arrow-downward\"></mat-icon>\r\n          </button> -->\r\n\r\n          <button *ngIf=\"i !== 0 && i !== stops.length - 1\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.directionsForm.removeStop' | translate\"\r\n            color=\"warn\" (click)=\"removeStop(i)\">\r\n            <mat-icon svgIcon=\"delete\"></mat-icon>\r\n          </button>\r\n        <!-- </div> -->\r\n      </div>\r\n\r\n    </mat-list-item>\r\n  </div>\r\n  <div class=\"igo-form-button-group\">\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.directionsForm.addStop' | translate\" color=\"primary\" (click)=\"addStop()\">\r\n      <mat-icon svgIcon=\"map-marker-plus\"></mat-icon>\r\n    </button>\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.directionsForm.zoomRoute' | translate\" *ngIf=\"routesResults\" color=\"primary\"\r\n      (click)=\"zoomRoute()\">\r\n      <mat-icon svgIcon=\"magnify-plus-outline\"></mat-icon>\r\n    </button>\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.directionsForm.resetDirectionsBtn' | translate\" *ngIf=\"routesResults\" color=\"warn\"\r\n      (click)=\"resetForm()\">\r\n      <mat-icon svgIcon=\"file-restore\"></mat-icon>\r\n    </button>\r\n    <button mat-icon-button *ngIf=\"routesResults\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.directionsForm.copy' | translate\" color=\"primary\" (click)=\"copyDirectionsToClipboard()\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n    </button>\r\n    <button mat-icon-button *ngIf=\"routesResults\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.directionsForm.link' | translate\" color=\"primary\" (click)=\"copyLinkToClipboard()\">\r\n      <mat-icon svgIcon=\"link\"></mat-icon>\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n\r\n<div class=\"igo-input-container\" *ngIf=\"routesResults\">\r\n  <mat-form-field *ngIf=\"routesResults && routesResults.length > 1\">\r\n    <mat-select placeholder=\"{{'igo.geo.directionsForm.drivingOptions' | translate}}\" (selectionChange)=\"changeRoute()\" [(ngModel)]=\"activeRoute\">\r\n      <mat-option *ngFor=\"let pathDirections of routesResults; let cnt = index;\" [value]=\"pathDirections\">\r\n        Option {{cnt + 1}} : {{formatDistance(pathDirections.distance)}} ({{formatDuration(pathDirections.duration)}})\r\n      </mat-option>\r\n    </mat-select>\r\n  </mat-form-field>\r\n\r\n  <mat-divider *ngIf=\"routesResults && routesResults.length === 0\"></mat-divider>\r\n\r\n  <mat-list>\r\n    <h2 mat-header class=\"igo-route-title mat-typography\">{{activeRoute.title}}</h2>\r\n    <h2 mat-subheader>{{formatDistance(activeRoute.distance)}}, {{formatDuration(activeRoute.duration)}}</h2>\r\n\r\n    <mat-list-item \r\n    class=\"igo-steps\"\r\n    (mouseenter)=\"showSegment(step)\" \r\n    (click)=\"showSegment(step,true)\" \r\n    *ngFor=\"let step of activeRoute.steps; let cnt = index;\"\r\n      igoListItem>\r\n      <mat-icon [ngClass]=\"formatStep(step,cnt).cssClass\" mat-list-icon svgIcon=\"{{formatStep(step,cnt).image}}\"></mat-icon>\r\n\r\n      <h4 mat-line>{{cnt +1}}. {{formatStep(step,cnt).instruction}}</h4>\r\n      <h4 mat-line class=\"right\">{{formatDistance(step.distance)}}</h4>\r\n    </mat-list-item>\r\n\r\n    <mat-divider></mat-divider>\r\n\r\n  </mat-list>\r\n\r\n</div>\r\n",
                    styles: ["mat-form-field{width:85%}.igo-route-title{font-weight:700}.igo-steps{cursor:pointer}form{padding:10px}h3{padding-left:5px;padding-right:5px}.mat-line{word-wrap:break-word!important;white-space:pre-wrap!important}.mat-line.right{text-align:right}.rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.rotate-45{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.rotate-250{-webkit-transform:rotate(250deg);transform:rotate(250deg)}.rotate-290{-webkit-transform:rotate(290deg);transform:rotate(290deg)}.icon-flipped{-webkit-transform:scaleY(-1);transform:scaleY(-1)}"]
                }] }
    ];
    /** @nocollapse */
    DirectionsFormComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: DirectionsService },
        { type: LanguageService },
        { type: MessageService },
        { type: SearchService },
        { type: QueryService },
        { type: DirectionsFormService },
        { type: ChangeDetectorRef },
        { type: RouteService, decorators: [{ type: Optional }] }
    ]; };
    DirectionsFormComponent.propDecorators = {
        term: [{ type: Input }],
        debounce: [{ type: Input }],
        length: [{ type: Input }],
        map: [{ type: Input }],
        stopsStore: [{ type: Input }],
        routeStore: [{ type: Input }],
        submit: [{ type: Output }]
    };
    return DirectionsFormComponent;
}());
export { DirectionsFormComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.invalidKeys;
    /** @type {?} */
    DirectionsFormComponent.prototype.stopsForm;
    /** @type {?} */
    DirectionsFormComponent.prototype.projection;
    /** @type {?} */
    DirectionsFormComponent.prototype.currentStopIndex;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.routesQueries$$;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.search$$;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.stream$;
    /** @type {?} */
    DirectionsFormComponent.prototype.routesResults;
    /** @type {?} */
    DirectionsFormComponent.prototype.activeRoute;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.lastTimeoutRequest;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.focusOnStop;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.focusKey;
    /** @type {?} */
    DirectionsFormComponent.prototype.initialStopsCoords;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.browserLanguage;
    /** @type {?} */
    DirectionsFormComponent.prototype.term;
    /** @type {?} */
    DirectionsFormComponent.prototype.debounce;
    /** @type {?} */
    DirectionsFormComponent.prototype.length;
    /** @type {?} */
    DirectionsFormComponent.prototype.map;
    /**
     * The stops store
     * @type {?}
     */
    DirectionsFormComponent.prototype.stopsStore;
    /**
     * The route and vertex store
     * @type {?}
     */
    DirectionsFormComponent.prototype.routeStore;
    /** @type {?} */
    DirectionsFormComponent.prototype.submit;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.formBuilder;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.directionsService;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.searchService;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.queryService;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.directionsFormService;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.changeDetectorRefs;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormComponent.prototype.route;
}
/**
 * Create a style for the directions stops and routes
 * @param {?} feature OlFeature
 * @param {?} resolution
 * @return {?} OL style function
 */
export function stopMarker(feature, resolution) {
    /** @type {?} */
    var vertexStyle = [
        new olstyle.Style({
            geometry: feature.getGeometry(),
            image: new olstyle.Circle({
                radius: 7,
                stroke: new olstyle.Stroke({ color: '#FF0000', width: 3 })
            })
        })
    ];
    /** @type {?} */
    var stopStyle = new olstyle.Style({
        image: new olstyle.Icon({
            src: './assets/igo2/geo/icons/place_' + feature.get('stopColor') + '_36px.svg',
            opacity: feature.get('stopOpacity'),
            imgSize: [36, 36],
            // for ie
            anchor: [0.5, 0.92]
        }),
        text: new olstyle.Text({
            text: feature.get('stopText'),
            font: '12px Calibri,sans-serif',
            fill: new olstyle.Fill({ color: '#000' }),
            stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
            overflow: true
        })
    });
    /** @type {?} */
    var routeStyle = [
        new olstyle.Style({
            stroke: new olstyle.Stroke({ color: '#6a7982', width: 10, opacity: 0.75 })
        }),
        new olstyle.Style({
            stroke: new olstyle.Stroke({ color: '#4fa9dd', width: 6, opacity: 0.75 })
        })
    ];
    if (feature.get('type') === 'stop') {
        return stopStyle;
    }
    if (feature.get('type') === 'vertex') {
        return vertexStyle;
    }
    if (feature.get('type') === 'route') {
        return routeStyle;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3Rpb25zL2RpcmVjdGlvbnMtZm9ybS9kaXJlY3Rpb25zLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdaLFFBQVEsRUFDUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFdBQVcsRUFBRSxVQUFVLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvRSxPQUFPLEVBQWdCLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBbUIsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxRixPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxLQUFLLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEtBQUssYUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sS0FBSyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBRTlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUVMLGVBQWUsRUFDZixjQUFjLEVBQ2QsWUFBWSxFQUNiLE1BQU0sWUFBWSxDQUFDO0FBQ3BCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFOUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFz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RUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDMUUsQ0FBQztLQUNIO0lBRUQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLE1BQU0sRUFBRTtRQUNsQyxPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUNELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDcEMsT0FBTyxXQUFXLENBQUM7S0FDcEI7SUFDRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssT0FBTyxFQUFFO1FBQ25DLE9BQU8sVUFBVSxDQUFDO0tBQ25CO0FBRUgsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPcHRpb25hbCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzLCBGb3JtQXJyYXkgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHRha2UsIHNraXBXaGlsZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbEdlb0pTT04gZnJvbSAnb2wvZm9ybWF0L0dlb0pTT04nO1xyXG5pbXBvcnQgKiBhcyBvbGdlb20gZnJvbSAnb2wvZ2VvbSc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCAqIGFzIG9sY29uZGl0aW9uIGZyb20gJ29sL2V2ZW50cy9jb25kaXRpb24nO1xyXG5pbXBvcnQgKiBhcyBvbGludGVyYWN0aW9uIGZyb20gJ29sL2ludGVyYWN0aW9uJztcclxuaW1wb3J0ICogYXMgb2xvYnNlcnZhYmxlIGZyb20gJ29sL09ic2VydmFibGUnO1xyXG5cclxuaW1wb3J0IHsgQ2xpcGJvYXJkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQge1xyXG4gIE1lc3NhZ2UsXHJcbiAgTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gIE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIFJvdXRlU2VydmljZVxyXG59IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBnZXRFbnRpdHlUaXRsZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZWFyY2gvc2hhcmVkL3NlYXJjaC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL3ZlY3Rvci1sYXllcic7XHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZmVhdHVyZS1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgRmVhdHVyZU1vdGlvbiwgRkVBVFVSRSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBtb3ZlVG9PbEZlYXR1cmVzLCB0cnlCaW5kU3RvcmVMYXllciwgdHJ5QWRkTG9hZGluZ1N0cmF0ZWd5IH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS51dGlscyc7XHJcblxyXG5pbXBvcnQgeyBEaXJlY3Rpb25zLCBEaXJlY3Rpb25zT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9kaXJlY3Rpb25zLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERpcmVjdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2RpcmVjdGlvbnMuc2VydmljZSc7XHJcbmltcG9ydCB7IERpcmVjdGlvbnNGb3JtU2VydmljZSB9IGZyb20gJy4vZGlyZWN0aW9ucy1mb3JtLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgUXVlcnlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcXVlcnkvc2hhcmVkL3F1ZXJ5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9zdG9yZSc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3kgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9zdHJhdGVnaWVzL2xvYWRpbmcnO1xyXG5pbXBvcnQgeyByb3VuZENvb3JkVG8gfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcC51dGlscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1kaXJlY3Rpb25zLWZvcm0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kaXJlY3Rpb25zLWZvcm0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2RpcmVjdGlvbnMtZm9ybS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaXJlY3Rpb25zRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGludmFsaWRLZXlzID0gWydDb250cm9sJywgJ1NoaWZ0JywgJ0FsdCddO1xyXG5cclxuICBwdWJsaWMgc3RvcHNGb3JtOiBGb3JtR3JvdXA7XHJcbiAgcHVibGljIHByb2plY3Rpb24gPSAnRVBTRzo0MzI2JztcclxuICBwdWJsaWMgY3VycmVudFN0b3BJbmRleDogbnVtYmVyO1xyXG4gIHByaXZhdGUgcm91dGVzUXVlcmllcyQkOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG4gIHByaXZhdGUgc2VhcmNoJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBzdHJlYW0kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cclxuICBwdWJsaWMgcm91dGVzUmVzdWx0czogRGlyZWN0aW9uc1tdIHwgTWVzc2FnZVtdO1xyXG4gIHB1YmxpYyBhY3RpdmVSb3V0ZTogRGlyZWN0aW9ucztcclxuICBwcml2YXRlIGxhc3RUaW1lb3V0UmVxdWVzdDtcclxuXHJcbiAgcHJpdmF0ZSBmb2N1c09uU3RvcCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgZm9jdXNLZXkgPSBbXTtcclxuICBwdWJsaWMgaW5pdGlhbFN0b3BzQ29vcmRzO1xyXG4gIHByaXZhdGUgYnJvd3Nlckxhbmd1YWdlO1xyXG5cclxuICBASW5wdXQoKSB0ZXJtOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpIGRlYm91bmNlOiBudW1iZXIgPSAyMDA7XHJcblxyXG4gIEBJbnB1dCgpIGxlbmd0aDogbnVtYmVyID0gMjtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzdG9wcyBzdG9yZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3BzU3RvcmU6IEZlYXR1cmVTdG9yZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHJvdXRlIGFuZCB2ZXJ0ZXggc3RvcmVcclxuICAgKi9cclxuICBASW5wdXQoKSByb3V0ZVN0b3JlOiBGZWF0dXJlU3RvcmU7XHJcblxyXG4gIEBPdXRwdXQoKSBzdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXHJcbiAgICBwcml2YXRlIGRpcmVjdGlvbnNTZXJ2aWNlOiBEaXJlY3Rpb25zU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcclxuICAgIHByaXZhdGUgcXVlcnlTZXJ2aWNlOiBRdWVyeVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGRpcmVjdGlvbnNGb3JtU2VydmljZTogRGlyZWN0aW9uc0Zvcm1TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZnM6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZTogUm91dGVTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBjaGFuZ2VSb3V0ZSgpIHtcclxuICAgIHRoaXMuc2hvd1JvdXRlR2VvbWV0cnkoKTtcclxuICB9XHJcblxyXG4gIHByZXZlbnQoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgdGhpcy5xdWVyeVNlcnZpY2UucXVlcnlFbmFibGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmZvY3VzT25TdG9wID0gZmFsc2U7XHJcbiAgICB0aGlzLmJyb3dzZXJMYW5ndWFnZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLmdldExhbmd1YWdlKCk7XHJcbiAgICB0aGlzLnN0b3BzRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICBkaXJlY3Rpb25zVHlwZTogJ2NhcicsXHJcbiAgICAgIGRpcmVjdGlvbnNNb2RlOiAnZHJpdmluZycsIC8vIGxvb3BcclxuICAgICAgc3RvcE9yZGVyUHJpb3JpdHk6IHRydWUsXHJcbiAgICAgIGRpcmVjdGlvbnNGaXhlZFN0YXJ0RW5kOiBmYWxzZSxcclxuICAgICAgc3RvcHM6IHRoaXMuZm9ybUJ1aWxkZXIuYXJyYXkoW1xyXG4gICAgICAgIHRoaXMuY3JlYXRlU3RvcCgnc3RhcnQnKSxcclxuICAgICAgICB0aGlzLmNyZWF0ZVN0b3AoJ2VuZCcpXHJcbiAgICAgIF0pXHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5pbml0U3RvcmVzKCk7XHJcbiAgICAgIHRoaXMuaW5pdE9sSW50ZXJhY3Rpb24oKTtcclxuICAgIH0sIDEpO1xyXG5cclxuICAgIHRoaXMuc3Vic2NyaWJlVG9Gb3JtQ2hhbmdlKCk7XHJcbiAgICB0aGlzLnJvdXRlc1F1ZXJpZXMkJC5wdXNoKFxyXG4gICAgICB0aGlzLnN0cmVhbSRcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIGRlYm91bmNlVGltZSh0aGlzLmRlYm91bmNlKSxcclxuICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcclxuICAgICAgICApXHJcbiAgICAgICAgLnN1YnNjcmliZSgodGVybTogc3RyaW5nKSA9PiB0aGlzLmhhbmRsZVRlcm1DaGFuZ2VkKHRlcm0pKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVJvdXRlc1F1ZXJpZXMoKTtcclxuICAgIHRoaXMudW5saXN0ZW5TaW5nbGVDbGljaygpO1xyXG4gICAgdGhpcy5xdWVyeVNlcnZpY2UucXVlcnlFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuZnJlZXplU3RvcmVzKCk7XHJcbiAgICB0aGlzLndyaXRlU3RvcHNUb0Zvcm1TZXJ2aWNlKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0U3RvcmVzKCkge1xyXG5cclxuICAgIGNvbnN0IGxvYWRpbmdTdHJhdGVneSA9IG5ldyBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3koe21vdGlvbjogRmVhdHVyZU1vdGlvbi5Ob25lfSk7XHJcblxyXG4gICAgLy8gU1RPUCBTVE9SRVxyXG4gICAgY29uc3Qgc3RvcHNTdG9yZSA9IHRoaXMuc3RvcHNTdG9yZTtcclxuICAgIGNvbnN0IHN0b3BzTGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgICB0aXRsZTogJ0RpcmVjdGlvbnMgLSBzdG9wcycsXHJcbiAgICAgIHpJbmRleDogOTExLFxyXG4gICAgICBzb3VyY2U6IG5ldyBGZWF0dXJlRGF0YVNvdXJjZSgpLFxyXG4gICAgICBzaG93SW5MYXllckxpc3Q6IGZhbHNlLFxyXG4gICAgICBleHBvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgYnJvd3NhYmxlOiBmYWxzZSxcclxuICAgICAgc3R5bGU6IHN0b3BNYXJrZXJcclxuICAgIH0pO1xyXG4gICAgdHJ5QmluZFN0b3JlTGF5ZXIoc3RvcHNTdG9yZSwgc3RvcHNMYXllcik7XHJcbiAgICB0cnlBZGRMb2FkaW5nU3RyYXRlZ3koc3RvcHNTdG9yZSwgbG9hZGluZ1N0cmF0ZWd5KTtcclxuXHJcbiAgICAvLyBST1VURSBBTkQgVkVSVEVYIFNUT1JFXHJcbiAgICBjb25zdCByb3V0ZVN0b3JlID0gdGhpcy5yb3V0ZVN0b3JlO1xyXG4gICAgY29uc3Qgcm91dGVMYXllciA9IG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICAgIHRpdGxlOiAnRGlyZWN0aW9ucyAtIHJvdXRlIGFuZCB2ZXJ0ZXgnLFxyXG4gICAgICB6SW5kZXg6IDkxMCxcclxuICAgICAgc291cmNlOiBuZXcgRmVhdHVyZURhdGFTb3VyY2UoKSxcclxuICAgICAgc2hvd0luTGF5ZXJMaXN0OiBmYWxzZSxcclxuICAgICAgZXhwb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgIGJyb3dzYWJsZTogZmFsc2UsXHJcbiAgICAgIHN0eWxlOiBzdG9wTWFya2VyXHJcbiAgICB9KTtcclxuICAgIHRyeUJpbmRTdG9yZUxheWVyKHJvdXRlU3RvcmUsIHJvdXRlTGF5ZXIpO1xyXG4gICAgdHJ5QWRkTG9hZGluZ1N0cmF0ZWd5KHJvdXRlU3RvcmUsIGxvYWRpbmdTdHJhdGVneSk7XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0T2xJbnRlcmFjdGlvbigpIHtcclxuICAgIGxldCBzZWxlY3RlZFN0b3BGZWF0dXJlO1xyXG4gICAgY29uc3Qgc2VsZWN0U3RvcCA9IG5ldyBvbGludGVyYWN0aW9uLlNlbGVjdCh7XHJcbiAgICAgIGxheWVyczogW3RoaXMuc3RvcHNTdG9yZS5sYXllci5vbF0sXHJcbiAgICAgIGNvbmRpdGlvbjogb2xjb25kaXRpb24ucG9pbnRlck1vdmUsXHJcbiAgICAgIGhpdFRvbGVyYW5jZTogNyxcclxuICAgICAgZmlsdGVyOiAoZmVhdHVyZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZWF0dXJlLmdldCgndHlwZScpID09PSAnc3RvcCc7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHNlbGVjdFN0b3Aub24oJ3NlbGVjdCcsIGV2dCA9PiB7XHJcbiAgICAgIHNlbGVjdGVkU3RvcEZlYXR1cmUgPSBldnQudGFyZ2V0LmdldEZlYXR1cmVzKClbMF07XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0cmFuc2xhdGVTdG9wID0gbmV3IG9saW50ZXJhY3Rpb24uVHJhbnNsYXRlKHtcclxuICAgICAgbGF5ZXJzOiBbdGhpcy5zdG9wc1N0b3JlLmxheWVyLm9sXSxcclxuICAgICAgZmVhdHVyZXM6IHNlbGVjdGVkU3RvcEZlYXR1cmVcclxuICAgICAgLy8gVE9ETyBJbiBPcGVubGF5ZXJzID49IDYueCwgZmlsdGVyIGlzIG5vdyBhbGxvd2VkLlxyXG4gICAgfSk7XHJcblxyXG4gICAgdHJhbnNsYXRlU3RvcC5vbigndHJhbnNsYXRpbmcnLCBldnQgPT4ge1xyXG4gICAgICBjb25zdCBmZWF0dXJlcyA9IGV2dC5mZWF0dXJlcztcclxuICAgICAgaWYgKGZlYXR1cmVzLmdldExlbmd0aCgpID09PSAwKSB7IHJldHVybjsgfVxyXG4gICAgICB0aGlzLmV4ZWN1dGVUcmFuc2xhdGlvbihmZWF0dXJlcywgZmFsc2UsIDUwLCB0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRyYW5zbGF0ZVN0b3Aub24oJ3RyYW5zbGF0ZWVuZCcsIGV2dCA9PiB7XHJcbiAgICAgIGNvbnN0IGZlYXR1cmVzID0gZXZ0LmZlYXR1cmVzO1xyXG4gICAgICBpZiAoZmVhdHVyZXMuZ2V0TGVuZ3RoKCkgPT09IDApIHsgcmV0dXJuOyB9XHJcbiAgICAgIHRoaXMuZXhlY3V0ZVRyYW5zbGF0aW9uKGZlYXR1cmVzLCB0cnVlLCAwLCBmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZFJvdXRlID0gbmV3IG9saW50ZXJhY3Rpb24uU2VsZWN0KHtcclxuICAgICAgbGF5ZXJzOiBbdGhpcy5yb3V0ZVN0b3JlLmxheWVyLm9sXSxcclxuICAgICAgY29uZGl0aW9uOiBvbGNvbmRpdGlvbi5jbGljayxcclxuICAgICAgaGl0VG9sZXJhbmNlOiA3LFxyXG4gICAgICBmaWx0ZXI6IChmZWF0dXJlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZlYXR1cmUuZ2V0SWQoKSA9PT0gJ3JvdXRlJztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBzZWxlY3RlZFJvdXRlLm9uKCdzZWxlY3QnLCBldnQgPT4ge1xyXG4gICAgICBpZiAodGhpcy5mb2N1c09uU3RvcCA9PT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBzZWxlY3RDb29yZGluYXRlcyA9IG9scHJvai50cmFuc2Zvcm0oXHJcbiAgICAgICAgICAoZXZ0IGFzIGFueSkubWFwQnJvd3NlckV2ZW50LmNvb3JkaW5hdGUsXHJcbiAgICAgICAgICB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICAgICAgdGhpcy5wcm9qZWN0aW9uXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmFkZFN0b3AoKTtcclxuICAgICAgICBjb25zdCBwb3MgPSB0aGlzLnN0b3BzLmxlbmd0aCAtIDI7XHJcbiAgICAgICAgdGhpcy5zdG9wcy5hdChwb3MpLnBhdGNoVmFsdWUoeyBzdG9wQ29vcmRpbmF0ZXM6IHNlbGVjdENvb3JkaW5hdGVzIH0pO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlTG9jYXRpb25Qcm9wb3NhbHMoc2VsZWN0Q29vcmRpbmF0ZXMsIHBvcyk7XHJcbiAgICAgICAgdGhpcy5hZGRTdG9wT3ZlcmxheShzZWxlY3RDb29yZGluYXRlcywgcG9zKTtcclxuICAgICAgICBzZWxlY3RlZFJvdXRlLmdldEZlYXR1cmVzKCkuY2xlYXIoKTtcclxuICAgICAgfVxyXG4gICAgICBzZWxlY3RlZFJvdXRlLmdldEZlYXR1cmVzKCkuY2xlYXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMubWFwLm9sLmFkZEludGVyYWN0aW9uKHNlbGVjdFN0b3ApO1xyXG4gICAgdGhpcy5tYXAub2wuYWRkSW50ZXJhY3Rpb24odHJhbnNsYXRlU3RvcCk7XHJcbiAgICB0aGlzLm1hcC5vbC5hZGRJbnRlcmFjdGlvbihzZWxlY3RlZFJvdXRlKTtcclxuXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN1YnNjcmliZVRvRm9ybUNoYW5nZSgpIHtcclxuICAgIHRoaXMucm91dGVzUXVlcmllcyQkLnB1c2goXHJcbiAgICAgIHRoaXMuc3RvcHNGb3JtLnZhbHVlQ2hhbmdlc1xyXG4gICAgICAgIC5waXBlKGRlYm91bmNlVGltZSh0aGlzLmRlYm91bmNlKSlcclxuICAgICAgICAuc3Vic2NyaWJlKHZhbCA9PiB7XHJcbiAgICAgICAgICB0aGlzLndyaXRlU3RvcHNUb0Zvcm1TZXJ2aWNlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGcmVlemUgYW55IHN0b3JlLCBtZWFuaW5nIHRoZSBsYXllciBpcyByZW1vdmVkLCBzdHJhdGVnaWVzIGFyZSBkZWFjdGl2YXRlZFxyXG4gICAqIGFuZCBzb21lIGxpc3RlbmVyIHJlbW92ZWRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcml2YXRlIGZyZWV6ZVN0b3JlcygpIHtcclxuICAgIGNvbnN0IHN0b3BzU3RvcmUgPSB0aGlzLnN0b3BzU3RvcmU7XHJcbiAgICBjb25zdCByb3V0ZVN0b3JlID0gdGhpcy5yb3V0ZVN0b3JlO1xyXG5cclxuICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHN0b3BzU3RvcmUubGF5ZXIpO1xyXG4gICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIocm91dGVTdG9yZS5sYXllcik7XHJcbiAgICBzdG9wc1N0b3JlLmRlYWN0aXZhdGVTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3kpO1xyXG4gICAgcm91dGVTdG9yZS5kZWFjdGl2YXRlU3RyYXRlZ3lPZlR5cGUoRmVhdHVyZVN0b3JlTG9hZGluZ1N0cmF0ZWd5KTtcclxuXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4ZWN1dGVUcmFuc2xhdGlvbihcclxuICAgIGZlYXR1cmVzLFxyXG4gICAgcmV2ZXJzZVNlYXJjaFByb3Bvc2FsID0gZmFsc2UsXHJcbiAgICBkZWxheTogbnVtYmVyID0gMCxcclxuICAgIG92ZXJ2aWV3OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIHRoaXMucm91dGVTdG9yZS5jbGVhcigpO1xyXG4gICAgY29uc3QgZmlyc3RGZWF0dXJlID0gZmVhdHVyZXMuZ2V0QXJyYXkoKVswXTtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZWRJRCA9IGZpcnN0RmVhdHVyZS5nZXRJZCgpO1xyXG4gICAgY29uc3QgdHJhbnNsYXRlZFBvcyA9IHRyYW5zbGF0ZWRJRC5zcGxpdCgnXycpO1xyXG4gICAgbGV0IHA7XHJcbiAgICBzd2l0Y2ggKHRyYW5zbGF0ZWRQb3NbMV0pIHtcclxuICAgICAgY2FzZSAnc3RhcnQnOlxyXG4gICAgICAgIHAgPSAwO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdlbmQnOlxyXG4gICAgICAgIHAgPSB0aGlzLnN0b3BzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcCA9IE51bWJlcih0cmFuc2xhdGVkUG9zWzFdKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNvbnN0IHRyYW5zbGF0aW9uQ29vcmRpbmF0ZXMgPSBvbHByb2oudHJhbnNmb3JtKFxyXG4gICAgICBmaXJzdEZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRDb29yZGluYXRlcygpLFxyXG4gICAgICB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICB0aGlzLnByb2plY3Rpb25cclxuICAgICk7XHJcbiAgICB0aGlzLnN0b3BzXHJcbiAgICAgIC5hdChwKVxyXG4gICAgICAucGF0Y2hWYWx1ZSh7IHN0b3BDb29yZGluYXRlczogdHJhbnNsYXRpb25Db29yZGluYXRlcywgc3RvcFByb3Bvc2FsczogW10gfSk7XHJcbiAgICBpZiAocmV2ZXJzZVNlYXJjaFByb3Bvc2FsKSB7XHJcbiAgICAgIHRoaXMuaGFuZGxlTG9jYXRpb25Qcm9wb3NhbHModHJhbnNsYXRpb25Db29yZGluYXRlcywgcCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGlyZWN0aW9uc09wdGlvbnMgPSB7XHJcbiAgICAgIHN0ZXBzOiB0cnVlLFxyXG4gICAgICBvdmVydmlldzogZmFsc2UsXHJcbiAgICAgIGFsdGVybmF0aXZlczogdHJ1ZVxyXG4gICAgfSBhcyBEaXJlY3Rpb25zT3B0aW9ucztcclxuXHJcbiAgICBpZiAob3ZlcnZpZXcpIHtcclxuICAgICAgZGlyZWN0aW9uc09wdGlvbnMub3ZlcnZpZXcgPSB0cnVlO1xyXG4gICAgICBkaXJlY3Rpb25zT3B0aW9ucy5zdGVwcyA9IGZhbHNlO1xyXG4gICAgICBkaXJlY3Rpb25zT3B0aW9ucy5hbHRlcm5hdGl2ZXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGVsYXkgPiAwKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5sYXN0VGltZW91dFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7IC8vIGNhbmNlbCB0aW1lb3V0IHdoZW4gdGhlIG1vdXNlIG1vdmVzXHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubGFzdFRpbWVvdXRSZXF1ZXN0KTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxhc3RUaW1lb3V0UmVxdWVzdCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2V0Um91dGVzKHVuZGVmaW5lZCwgZGlyZWN0aW9uc09wdGlvbnMpO1xyXG4gICAgICB9LCBkZWxheSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubGFzdFRpbWVvdXRSZXF1ZXN0KTtcclxuICAgICAgdGhpcy5nZXRSb3V0ZXModW5kZWZpbmVkLCBkaXJlY3Rpb25zT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgaGFuZGxlTG9jYXRpb25Qcm9wb3NhbHMoY29vcmRpbmF0ZXM6IFtudW1iZXIsIG51bWJlcl0sIHN0b3BJbmRleDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBncm91cGVkTG9jYXRpb25zID0gW107XHJcbiAgICBjb25zdCByb3VuZGVkQ29vcmRpbmF0ZXMgPSBbY29vcmRpbmF0ZXNbMF0udG9GaXhlZCg1KSwgY29vcmRpbmF0ZXNbMV0udG9GaXhlZCg1KV07XHJcbiAgICB0aGlzLnN0b3BzLmF0KHN0b3BJbmRleCkucGF0Y2hWYWx1ZSh7IHN0b3BQb2ludDogcm91bmRlZENvb3JkaW5hdGVzLmpvaW4oJywnKSB9KTtcclxuICAgIHRoaXMuc2VhcmNoU2VydmljZVxyXG4gICAgICAucmV2ZXJzZVNlYXJjaChjb29yZGluYXRlcywgeyB6b29tOiB0aGlzLm1hcC52aWV3Q29udHJvbGxlci5nZXRab29tKCkgfSlcclxuICAgICAgLm1hcChyZXMgPT5cclxuICAgICAgICB0aGlzLnJvdXRlc1F1ZXJpZXMkJC5wdXNoKFxyXG4gICAgICAgICAgcmVzLnJlcXVlc3QucGlwZShtYXAoZiA9PiBmKSkuc3Vic2NyaWJlKHJlc3VsdHMgPT4ge1xyXG4gICAgICAgICAgICByZXN1bHRzLmZvckVhY2gocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBncm91cGVkTG9jYXRpb25zLmZpbHRlcihmID0+IGYuc291cmNlID09PSByZXN1bHQuc291cmNlKVxyXG4gICAgICAgICAgICAgICAgICAubGVuZ3RoID09PSAwXHJcbiAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBncm91cGVkTG9jYXRpb25zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICBzb3VyY2U6IHJlc3VsdC5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IHJlc3VsdHMubWFwKHIgPT4gci5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wc1xyXG4gICAgICAgICAgICAgIC5hdChzdG9wSW5kZXgpXHJcbiAgICAgICAgICAgICAgLnBhdGNoVmFsdWUoeyBzdG9wUHJvcG9zYWxzOiBncm91cGVkTG9jYXRpb25zIH0pO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBQcmVmZXIgYW5vdGhlciBzb3VyY2U/XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHRzWzBdKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdHNbMF0uc291cmNlLmdldElkKCkgPT09ICdpY2hlcmNoZXJldmVyc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwcmVmZXIgYWRkcmVzcyB0eXBlLlxyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdFBvcyA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgZmVhdHVyZTogYW55ID0gcmVzdWx0c1tpXS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoZmVhdHVyZS5wcm9wZXJ0aWVzLnR5cGUgPT09ICdhZHJlc3NlcycpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRQb3MgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BzLmF0KHN0b3BJbmRleCkucGF0Y2hWYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICAgIHN0b3BQb2ludDogZ2V0RW50aXR5VGl0bGUocmVzdWx0c1tyZXN1bHRQb3NdKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0c1tyZXN1bHRQb3NdLmRhdGEuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnN0b3BzLmF0KHN0b3BJbmRleCkucGF0Y2hWYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcENvb3JkaW5hdGVzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1tyZXN1bHRQb3NdLmRhdGEuZ2VvbWV0cnkuY29vcmRpbmF0ZXNcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAvLyBOb3QgbW92aW5nIHRoZSB0cmFuc2xhdGVkIHBvaW50IE9ubHkgdG8gc3VnZ2VzdCB2YWx1ZSBpbnRvIHRoZSBVSS5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdHNbMF0uc291cmNlLmdldElkKCkgPT09ICdjb29yZGluYXRlc3JldmVyc2UnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BzLmF0KHN0b3BJbmRleCkucGF0Y2hWYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICAgIHN0b3BQb2ludDogW1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbMF0uZGF0YS5nZW9tZXRyeS5jb29yZGluYXRlc1swXS50b0ZpeGVkKDUpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbMF0uZGF0YS5nZW9tZXRyeS5jb29yZGluYXRlc1sxXS50b0ZpeGVkKDUpXHJcbiAgICAgICAgICAgICAgICAgIF0uam9pbignLCcpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzWzBdLmRhdGEuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnN0b3BzLmF0KHN0b3BJbmRleCkucGF0Y2hWYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcENvb3JkaW5hdGVzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1swXS5kYXRhLmdlb21ldHJ5LmNvb3JkaW5hdGVzXHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgLy8gTm90IG1vdmluZyB0aGUgdHJhbnNsYXRlZCBwb2ludCBPbmx5IHRvIHN1Z2dlc3QgdmFsdWUgaW50byB0aGUgVUkuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMuc3RvcHMuYXQoc3RvcEluZGV4KS5wYXRjaFZhbHVlKHsgc3RvcFBvaW50OiByb3VuZGVkQ29vcmRpbmF0ZXMuam9pbignLCcpLCBzdG9wUHJvcG9zYWxzOiBbXSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGRpcmVjdGlvbnNUZXh0KGluZGV4OiBudW1iZXIsIHN0b3BzQ291bnRzID0gdGhpcy5zdG9wcy5sZW5ndGgpOiBzdHJpbmcge1xyXG4gICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgIHJldHVybiAnc3RhcnQnO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PT0gc3RvcHNDb3VudHMgLSAxIHx8IHN0b3BzQ291bnRzID09PSAxKSB7XHJcbiAgICAgIHJldHVybiAnZW5kJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAnaW50ZXJtZWRpYXRlJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJhaXNlU3RvcChpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaW5kZXggPiAwKSB7XHJcbiAgICAgIHRoaXMubW92ZVN0b3AoaW5kZXgsIC0xKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvd2VyU3RvcChpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaW5kZXggPCB0aGlzLnN0b3BzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5tb3ZlU3RvcChpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1vdmVTdG9wKGluZGV4LCBkaWZmKSB7XHJcbiAgICBjb25zdCBmcm9tVmFsdWUgPSB0aGlzLnN0b3BzLmF0KGluZGV4KTtcclxuICAgIHRoaXMucmVtb3ZlU3RvcChpbmRleCk7XHJcbiAgICB0aGlzLnN0b3BzLmluc2VydChpbmRleCArIGRpZmYsIGZyb21WYWx1ZSk7XHJcbiAgICB0aGlzLnN0b3BzLmF0KGluZGV4KS5wYXRjaFZhbHVlKHsgZGlyZWN0aW9uc1RleHQ6IHRoaXMuZGlyZWN0aW9uc1RleHQoaW5kZXgpIH0pO1xyXG4gICAgdGhpcy5zdG9wc1xyXG4gICAgICAuYXQoaW5kZXggKyBkaWZmKVxyXG4gICAgICAucGF0Y2hWYWx1ZSh7IGRpcmVjdGlvbnNUZXh0OiB0aGlzLmRpcmVjdGlvbnNUZXh0KGluZGV4ICsgZGlmZikgfSk7XHJcbiAgICBpZiAodGhpcy5zdG9wcy5hdChpbmRleCkudmFsdWUuc3RvcENvb3JkaW5hdGVzKSB7XHJcbiAgICAgIHRoaXMuYWRkU3RvcE92ZXJsYXkodGhpcy5zdG9wcy5hdChpbmRleCkudmFsdWUuc3RvcENvb3JkaW5hdGVzLCBpbmRleCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zdG9wcy5hdChpbmRleCArIGRpZmYpLnZhbHVlLnN0b3BDb29yZGluYXRlcykge1xyXG4gICAgICB0aGlzLmFkZFN0b3BPdmVybGF5KFxyXG4gICAgICAgIHRoaXMuc3RvcHMuYXQoaW5kZXggKyBkaWZmKS52YWx1ZS5zdG9wQ29vcmRpbmF0ZXMsXHJcbiAgICAgICAgaW5kZXggKyBkaWZmXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgc3RvcHMoKTogRm9ybUFycmF5IHtcclxuICAgIHJldHVybiB0aGlzLnN0b3BzRm9ybS5nZXQoJ3N0b3BzJykgYXMgRm9ybUFycmF5O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHdyaXRlU3RvcHNUb0Zvcm1TZXJ2aWNlKCkge1xyXG4gICAgY29uc3Qgc3RvcHMgPSBbXTtcclxuICAgIHRoaXMuc3RvcHMudmFsdWUuZm9yRWFjaChzdG9wID0+IHtcclxuICAgICAgaWYgKHN0b3Auc3RvcENvb3JkaW5hdGVzIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBzdG9wcy5wdXNoKHN0b3ApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuZGlyZWN0aW9uc0Zvcm1TZXJ2aWNlLnNldFN0b3BzKHN0b3BzKTtcclxuICB9XHJcblxyXG4gIGFkZFN0b3AoKTogdm9pZCB7XHJcbiAgICBjb25zdCBpbnNlcnRJbmRleCA9IHRoaXMuc3RvcHMubGVuZ3RoIC0gMTtcclxuICAgIHRoaXMuc3RvcHMuaW5zZXJ0KGluc2VydEluZGV4LCB0aGlzLmNyZWF0ZVN0b3AoKSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVTdG9wKGRpcmVjdGlvbnNQb3MgPSAnaW50ZXJtZWRpYXRlJyk6IEZvcm1Hcm91cCB7XHJcbiAgICByZXR1cm4gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHN0b3BQb2ludDogWycnXSxcclxuICAgICAgc3RvcFByb3Bvc2FsczogW1tdXSxcclxuICAgICAgZGlyZWN0aW9uc1RleHQ6IGRpcmVjdGlvbnNQb3MsXHJcbiAgICAgIHN0b3BDb29yZGluYXRlczogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZF1dXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVN0b3AoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLmdldFN0b3BPdmVybGF5SUQoaW5kZXgpO1xyXG4gICAgdGhpcy5kZWxldGVTdG9yZUZlYXR1cmVCeUlEKHRoaXMuc3RvcHNTdG9yZSwgaWQpO1xyXG4gICAgdGhpcy5zdG9wcy5yZW1vdmVBdChpbmRleCk7XHJcbiAgICBsZXQgY250ID0gMDtcclxuICAgIHRoaXMuc3RvcHMudmFsdWUuZm9yRWFjaChzdG9wID0+IHtcclxuICAgICAgdGhpcy5zdG9wcy5hdChjbnQpLnBhdGNoVmFsdWUoeyBkaXJlY3Rpb25zVGV4dDogdGhpcy5kaXJlY3Rpb25zVGV4dChjbnQpIH0pO1xyXG4gICAgICB0aGlzLmFkZFN0b3BPdmVybGF5KHRoaXMuc3RvcHMuYXQoY250KS52YWx1ZS5zdG9wQ29vcmRpbmF0ZXMsIGNudCk7XHJcbiAgICAgIGNudCsrO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXNldEZvcm0oKSB7XHJcbiAgICB0aGlzLnJvdXRlc1Jlc3VsdHMgPSB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBuYlN0b3BzID0gdGhpcy5zdG9wcy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5iU3RvcHM7IGkrKykge1xyXG4gICAgICB0aGlzLnN0b3BzLnJlbW92ZUF0KDApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdG9wcy5pbnNlcnQoMCwgdGhpcy5jcmVhdGVTdG9wKCdzdGFydCcpKTtcclxuICAgIHRoaXMuc3RvcHMuaW5zZXJ0KDEsIHRoaXMuY3JlYXRlU3RvcCgnZW5kJykpO1xyXG5cclxuICAgIHRoaXMuc3RvcHNTdG9yZS5jbGVhcigpO1xyXG4gICAgdGhpcy5yb3V0ZVN0b3JlLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICBmb3JtYXRTdGVwKHN0ZXAsIGNudCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0SW5zdHJ1Y3Rpb24oXHJcbiAgICAgIHN0ZXAubWFuZXV2ZXIudHlwZSxcclxuICAgICAgc3RlcC5tYW5ldXZlci5tb2RpZmllcixcclxuICAgICAgc3RlcC5uYW1lLFxyXG4gICAgICBzdGVwLm1hbmV1dmVyLmJlYXJpbmdfYWZ0ZXIsXHJcbiAgICAgIGNudCxcclxuICAgICAgc3RlcC5tYW5ldXZlci5leGl0LFxyXG4gICAgICBjbnQgPT09IHRoaXMuYWN0aXZlUm91dGUuc3RlcHMubGVuZ3RoIC0gMVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZvcm1hdEluc3RydWN0aW9uKFxyXG4gICAgdHlwZSxcclxuICAgIG1vZGlmaWVyLFxyXG4gICAgcm91dGUsXHJcbiAgICBkaXJlY3Rpb24sXHJcbiAgICBzdGVwUG9zaXRpb24sXHJcbiAgICBleGl0LFxyXG4gICAgbGFzdFN0ZXAgPSBmYWxzZVxyXG4gICkge1xyXG4gICAgbGV0IGRpcmVjdGl2ZUZyO1xyXG4gICAgbGV0IGRpcmVjdGl2ZUVuO1xyXG4gICAgbGV0IGltYWdlID0gJ2ZvcndhcmQnO1xyXG4gICAgbGV0IGNzc0NsYXNzID0gJ3JvdGF0ZS0yNzAnO1xyXG4gICAgY29uc3QgdHJhbnNsYXRlZERpcmVjdGlvbiA9IHRoaXMudHJhbnNsYXRlQmVhcmluZyhkaXJlY3Rpb24pO1xyXG4gICAgY29uc3QgdHJhbnNsYXRlZE1vZGlmaWVyID0gdGhpcy50cmFuc2xhdGVNb2RpZmllcihtb2RpZmllcik7XHJcbiAgICBjb25zdCBlblByZWZpeCA9IG1vZGlmaWVyID09PSAnc3RyYWlnaHQnID8gJycgOiAnb24gdGhlICc7XHJcbiAgICBjb25zdCBmclByZWZpeCA9IG1vZGlmaWVyID09PSAnc3RyYWlnaHQnID8gJycgOiAnw6AgJztcclxuXHJcbiAgICBsZXQgZnJBZ2dyZWdhdGVkRGlyZWN0aW9uID0gZnJQcmVmaXggKyB0cmFuc2xhdGVkTW9kaWZpZXI7XHJcbiAgICBsZXQgZW5BZ2dyZWdhdGVkRGlyZWN0aW9uID0gZW5QcmVmaXggKyB0cmFuc2xhdGVkTW9kaWZpZXI7XHJcblxyXG4gICAgaWYgKG1vZGlmaWVyICYmIG1vZGlmaWVyLnNlYXJjaCgnc2xpZ2h0JykgPj0gMCkge1xyXG4gICAgICBlbkFnZ3JlZ2F0ZWREaXJlY3Rpb24gPSB0cmFuc2xhdGVkTW9kaWZpZXI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGlmaWVyID09PSAndXR1cm4nKSB7XHJcbiAgICAgIGltYWdlID0gJ2ZvcndhcmQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICdyb3RhdGUtOTAnO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3NoYXJwIHJpZ2h0Jykge1xyXG4gICAgICBpbWFnZSA9ICdzdWJkaXJlY3RvcnktYXJyb3ctcmlnaHQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICdpY29uLWZsaXBwZWQnO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICBpbWFnZSA9ICdzdWJkaXJlY3RvcnktYXJyb3ctcmlnaHQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICdpY29uLWZsaXBwZWQnO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3NsaWdodCByaWdodCcpIHtcclxuICAgICAgaW1hZ2UgPSAnZm9yd2FyZCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJ3JvdGF0ZS0yOTAnO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3N0cmFpZ2h0Jykge1xyXG4gICAgICBpbWFnZSA9ICdmb3J3YXJkJztcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICdzbGlnaHQgbGVmdCcpIHtcclxuICAgICAgaW1hZ2UgPSAnZm9yd2FyZCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJ3JvdGF0ZS0yNTAnO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgIGltYWdlID0gJ3N1YmRpcmVjdG9yeS1hcnJvdy1sZWZ0JztcclxuICAgICAgY3NzQ2xhc3MgPSAnaWNvbi1mbGlwcGVkJztcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICdzaGFycCBsZWZ0Jykge1xyXG4gICAgICBpbWFnZSA9ICdzdWJkaXJlY3RvcnktYXJyb3ctbGVmdCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJ2ljb24tZmxpcHBlZCc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGUgPT09ICd0dXJuJykge1xyXG4gICAgICBpZiAobW9kaWZpZXIgPT09ICdzdHJhaWdodCcpIHtcclxuICAgICAgICBkaXJlY3RpdmVGciA9ICdDb250aW51ZXIgc3VyICcgKyByb3V0ZTtcclxuICAgICAgICBkaXJlY3RpdmVFbiA9ICdDb250aW51ZSBvbiAnICsgcm91dGU7XHJcbiAgICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICd1dHVybicpIHtcclxuICAgICAgICBkaXJlY3RpdmVGciA9ICdGYWlyZSBkZW1pLXRvdXIgc3VyICcgKyByb3V0ZTtcclxuICAgICAgICBkaXJlY3RpdmVFbiA9ICdNYWtlIHUtdHVybiBvbiAnICsgcm91dGU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGlyZWN0aXZlRnIgPSAnVG91cm5lciAnICsgZnJBZ2dyZWdhdGVkRGlyZWN0aW9uICsgJyBzdXIgJyArIHJvdXRlO1xyXG4gICAgICAgIGRpcmVjdGl2ZUVuID0gJ1R1cm4gJyArIHRyYW5zbGF0ZWRNb2RpZmllciArICcgb250byAnICsgcm91dGU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ25ldyBuYW1lJykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9XHJcbiAgICAgICAgJ0NvbnRpbnVlciBlbiBkaXJlY3Rpb24gJyArIHRyYW5zbGF0ZWREaXJlY3Rpb24gKyAnIHN1ciAnICsgcm91dGU7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ0hlYWQgJyArIHRyYW5zbGF0ZWREaXJlY3Rpb24gKyAnIG9uICcgKyByb3V0ZTtcclxuICAgICAgaW1hZ2UgPSAnY29tcGFzcyc7XHJcbiAgICAgIGNzc0NsYXNzID0gJyc7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdkZXBhcnQnKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID1cclxuICAgICAgICAnQWxsZXIgZW4gZGlyZWN0aW9uICcgKyB0cmFuc2xhdGVkRGlyZWN0aW9uICsgJyBzdXIgJyArIHJvdXRlO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9ICdIZWFkICcgKyB0cmFuc2xhdGVkRGlyZWN0aW9uICsgJyBvbiAnICsgcm91dGU7XHJcbiAgICAgIGltYWdlID0gJ2NvbXBhc3MnO1xyXG4gICAgICBjc3NDbGFzcyA9ICcnO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnYXJyaXZlJykge1xyXG4gICAgICBpZiAobGFzdFN0ZXApIHtcclxuICAgICAgICBsZXQgY29tYSA9ICcsICc7XHJcbiAgICAgICAgaWYgKCF0cmFuc2xhdGVkTW9kaWZpZXIpIHtcclxuICAgICAgICAgIGZyQWdncmVnYXRlZERpcmVjdGlvbiA9ICcnO1xyXG4gICAgICAgICAgZW5BZ2dyZWdhdGVkRGlyZWN0aW9uID0gJyc7XHJcbiAgICAgICAgICBjb21hID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpcmVjdGl2ZUZyID0gJ1ZvdXMgw6p0ZXMgYXJyaXbDqScgKyBjb21hICsgZnJBZ2dyZWdhdGVkRGlyZWN0aW9uO1xyXG4gICAgICAgIGRpcmVjdGl2ZUVuID1cclxuICAgICAgICAgICdZb3UgaGF2ZSByZWFjaGVkIHlvdXIgZGVzdGluYXRpb24nICsgY29tYSArIGVuQWdncmVnYXRlZERpcmVjdGlvbjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkaXJlY3RpdmVGciA9ICdWb3VzIGF0dGVpZ25leiBsZSBwb2ludCBpbnRlcm3DqWRpYXJlIHN1ciAnICsgcm91dGU7XHJcbiAgICAgICAgZGlyZWN0aXZlRW4gPSAnWW91IGhhdmUgcmVhY2hlZCB0aGUgaW50ZXJtZWRpYXRlIHN0b3Agb250byAnICsgcm91dGU7XHJcbiAgICAgICAgaW1hZ2UgPSAnbWFwLW1hcmtlcic7XHJcbiAgICAgICAgY3NzQ2xhc3MgPSAnJztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnbWVyZ2UnKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID0gJ0NvbnRpbnVlciBzdXIgJyArIHJvdXRlO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9ICdDb250aW51ZSBvbiAnICsgcm91dGU7XHJcbiAgICAgIGltYWdlID0gJ2ZvcndhcmQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICdyb3RhdGUtMjcwJztcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29uIHJhbXAnKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID0gXCJQcmVuZHJlIGwnZW50csOpZSBkJ2F1dG9yb3V0ZSBcIiArIGZyQWdncmVnYXRlZERpcmVjdGlvbjtcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnVGFrZSB0aGUgcmFtcCAnICsgZW5BZ2dyZWdhdGVkRGlyZWN0aW9uO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2ZmIHJhbXAnKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID0gXCJQcmVuZHJlIGxhIHNvcnRpZSBkJ2F1dG9yb3V0ZSBcIiArIGZyQWdncmVnYXRlZERpcmVjdGlvbjtcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnVGFrZSBleGl0ICcgKyBlbkFnZ3JlZ2F0ZWREaXJlY3Rpb247XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdmb3JrJykge1xyXG4gICAgICBpZiAobW9kaWZpZXIuc2VhcmNoKCdsZWZ0JykgPj0gMCkge1xyXG4gICAgICAgIGRpcmVjdGl2ZUZyID0gJ0dhcmRlciBsYSBnYXVjaGUgc3VyICcgKyByb3V0ZTtcclxuICAgICAgICBkaXJlY3RpdmVFbiA9ICdNZXJnZSBsZWZ0IG9udG8gJyArIHJvdXRlO1xyXG4gICAgICB9IGVsc2UgaWYgKG1vZGlmaWVyLnNlYXJjaCgncmlnaHQnKSA+PSAwKSB7XHJcbiAgICAgICAgZGlyZWN0aXZlRnIgPSAnR2FyZGVyIGxhIGRyb2l0ZSBzdXIgJyArIHJvdXRlO1xyXG4gICAgICAgIGRpcmVjdGl2ZUVuID0gJ01lcmdlIHJpZ2h0IG9udG8gJyArIHJvdXRlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRpcmVjdGl2ZUZyID0gJ0NvbnRpbnVlciBzdXIgJyArIHJvdXRlO1xyXG4gICAgICAgIGRpcmVjdGl2ZUVuID0gJ0NvbnRpbnVlIG9uICcgKyByb3V0ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnZW5kIG9mIHJvYWQnKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID1cclxuICAgICAgICAnw4AgbGEgZmluIGRlIGxhIHJvdXRlLCB0b3VybmVyICcgKyB0cmFuc2xhdGVkTW9kaWZpZXIgKyAnIHN1ciAnICsgcm91dGU7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID1cclxuICAgICAgICAnQXQgdGhlIGVuZCBvZiB0aGUgcm9hZCwgdHVybiAnICsgdHJhbnNsYXRlZE1vZGlmaWVyICsgJyBvbnRvICcgKyByb3V0ZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3VzZSBsYW5lJykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9ICdQcmVuZHJlIGxhIHZvaWUgZGUgLi4uICc7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ1Rha2UgdGhlIGxhbmUgLi4uJztcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2NvbnRpbnVlJyAmJiBtb2RpZmllciAhPT0gJ3V0dXJuJykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9ICdDb250aW51ZXIgc3VyICcgKyByb3V0ZTtcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnQ29udGludWUgb24gJyArIHJvdXRlO1xyXG4gICAgICBpbWFnZSA9ICdmb3J3YXJkJztcclxuICAgICAgY3NzQ2xhc3MgPSAncm90YXRlLTI3MCc7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdyb3VuZGFib3V0Jykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9ICdBdSByb25kLXBvaW50LCBwcmVuZHJlIGxhICcgKyBleGl0O1xyXG4gICAgICBkaXJlY3RpdmVGciArPSBleGl0ID09PSAxID8gJ3JlJyA6ICdlJztcclxuICAgICAgZGlyZWN0aXZlRnIgKz0gJyBzb3J0aWUgdmVycyAnICsgcm91dGU7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ0F0IHRoZSByb3VuZGFib3V0LCB0YWtlIHRoZSAnICsgZXhpdDtcclxuICAgICAgZGlyZWN0aXZlRW4gKz0gZXhpdCA9PT0gMSA/ICdzdCcgOiAncmQnO1xyXG4gICAgICBkaXJlY3RpdmVFbiArPSAnIGV4aXQgdG93YXJkcyAnICsgcm91dGU7XHJcbiAgICAgIGltYWdlID0gJ2NoYXJ0LWRvbnV0JztcclxuICAgICAgY3NzQ2xhc3MgPSAnJztcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3JvdGFyeScpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPSAnUm9uZC1wb2ludCByb3RhcnkuLi4uJztcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnUm91bmRhYm91dCByb3RhcnkuLi4uJztcclxuICAgICAgaW1hZ2UgPSAnY2hhcnQtZG9udXQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICcnO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAncm91bmRhYm91dCB0dXJuJykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9ICdSb25kLXBvaW50LCBwcmVuZHJlIGxhIC4uLic7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ1JvdW5kYWJvdXQsIHRha2UgdGhlIC4uLic7XHJcbiAgICAgIGltYWdlID0gJ2NoYXJ0LWRvbnV0JztcclxuICAgICAgY3NzQ2xhc3MgPSAnJztcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2V4aXQgcm91bmRhYm91dCcpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPSAnUG91cnN1aXZyZSB2ZXJzICcgKyByb3V0ZTtcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnQ29udGludWUgdG8gJyArIHJvdXRlO1xyXG4gICAgICBpbWFnZSA9ICdmb3J3YXJkJztcclxuICAgICAgY3NzQ2xhc3MgPSAncm90YXRlLTI3MCc7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdub3RpZmljYXRpb24nKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID0gJ25vdGlmaWNhdGlvbiAuLi4uJztcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnbm90aWZpY2F0aW9uIC4uLi4nO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3V0dXJuJykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9XHJcbiAgICAgICAgJ0ZhaXJlIGRlbWktdG91ciBldCBjb250aW51ZXIgZW4gZGlyZWN0aW9uICcgK1xyXG4gICAgICAgIHRyYW5zbGF0ZWREaXJlY3Rpb24gK1xyXG4gICAgICAgICcgc3VyICcgK1xyXG4gICAgICAgIHJvdXRlO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9XHJcbiAgICAgICAgJ01ha2UgdS10dXJuIGFuZCBoZWFkICcgKyB0cmFuc2xhdGVkRGlyZWN0aW9uICsgJyBvbiAnICsgcm91dGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXJlY3RpdmVGciA9ICc/Pz8nO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9ICc/Pz8nO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXN0U3RlcCkge1xyXG4gICAgICBpbWFnZSA9ICdmbGFnLXZhcmlhbnQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICcnO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0ZXBQb3NpdGlvbiA9PT0gMCkge1xyXG4gICAgICBpbWFnZSA9ICdjb21wYXNzJztcclxuICAgICAgY3NzQ2xhc3MgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZGlyZWN0aXZlO1xyXG4gICAgaWYgKHRoaXMuYnJvd3Nlckxhbmd1YWdlID09PSAnZnInKSB7XHJcbiAgICAgIGRpcmVjdGl2ZSA9IGRpcmVjdGl2ZUZyO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmJyb3dzZXJMYW5ndWFnZSA9PT0gJ2VuJykge1xyXG4gICAgICBkaXJlY3RpdmUgPSBkaXJlY3RpdmVFbjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyBpbnN0cnVjdGlvbjogZGlyZWN0aXZlLCBpbWFnZSwgY3NzQ2xhc3MgfTtcclxuICB9XHJcblxyXG4gIHRyYW5zbGF0ZU1vZGlmaWVyKG1vZGlmaWVyKSB7XHJcbiAgICBpZiAobW9kaWZpZXIgPT09ICd1dHVybicpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRpcmVjdGlvbnMudXR1cm4nKTtcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICdzaGFycCByaWdodCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uZ2VvLmRpcmVjdGlvbnMuc2hhcnAgcmlnaHQnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAncmlnaHQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kaXJlY3Rpb25zLnJpZ2h0Jyk7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnc2xpZ2h0IHJpZ2h0Jykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5nZW8uZGlyZWN0aW9ucy5zbGlnaHQgcmlnaHQnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnc2hhcnAgbGVmdCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uZ2VvLmRpcmVjdGlvbnMuc2hhcnAgbGVmdCdcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICdsZWZ0Jykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZGlyZWN0aW9ucy5sZWZ0Jyk7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnc2xpZ2h0IGxlZnQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5kaXJlY3Rpb25zLnNsaWdodCBsZWZ0J1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3N0cmFpZ2h0Jykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZGlyZWN0aW9ucy5zdHJhaWdodCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG1vZGlmaWVyO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhbnNsYXRlQmVhcmluZyhiZWFyaW5nKSB7XHJcbiAgICBpZiAoYmVhcmluZyA+PSAzMzcgfHwgYmVhcmluZyA8IDIzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5jYXJkaW5hbFBvaW50cy5uJyk7XHJcbiAgICB9IGVsc2UgaWYgKGJlYXJpbmcgPCA2Nykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5nZW8uY2FyZGluYWxQb2ludHMubmUnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKGJlYXJpbmcgPCAxMTMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmNhcmRpbmFsUG9pbnRzLmUnKTtcclxuICAgIH0gZWxzZSBpZiAoYmVhcmluZyA8IDE1Nykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5nZW8uY2FyZGluYWxQb2ludHMuc2UnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKGJlYXJpbmcgPCAyMDMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmNhcmRpbmFsUG9pbnRzLnMnKTtcclxuICAgIH0gZWxzZSBpZiAoYmVhcmluZyA8IDI0Nykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5nZW8uY2FyZGluYWxQb2ludHMuc3cnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKGJlYXJpbmcgPCAyOTMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmNhcmRpbmFsUG9pbnRzLncnKTtcclxuICAgIH0gZWxzZSBpZiAoYmVhcmluZyA8IDMzNykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5nZW8uY2FyZGluYWxQb2ludHMubncnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3JtYXREaXN0YW5jZShkaXN0YW5jZSkge1xyXG4gICAgaWYgKGRpc3RhbmNlID09PSAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChkaXN0YW5jZSA+PSAxMDAwMDApIHtcclxuICAgICAgcmV0dXJuIE1hdGgucm91bmQoZGlzdGFuY2UgLyAxMDAwKSArICcga20nO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpc3RhbmNlID49IDEwMDAwKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKGRpc3RhbmNlIC8gMTAwKSAvIDEwICsgJyBrbSc7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlzdGFuY2UgPj0gMTAwKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKGRpc3RhbmNlIC8gMTAwKSAvIDEwICsgJyBrbSc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGlzdGFuY2UgKyAnIG0nO1xyXG4gIH1cclxuXHJcbiAgZm9ybWF0RHVyYXRpb24oZHVyYXRpb246IG51bWJlciwgc3VtbWFyeSA9IGZhbHNlKSB7XHJcbiAgICBpZiAoZHVyYXRpb24gPj0gMzYwMCkge1xyXG4gICAgICBjb25zdCBob3VyID0gTWF0aC5mbG9vcihkdXJhdGlvbiAvIDM2MDApO1xyXG4gICAgICBjb25zdCBtaW51dGUgPSBNYXRoLnJvdW5kKChkdXJhdGlvbiAvIDM2MDAgLSBob3VyKSAqIDYwKTtcclxuICAgICAgaWYgKG1pbnV0ZSA9PT0gNjApIHtcclxuICAgICAgICByZXR1cm4gaG91ciArIDEgKyAnIGgnO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBob3VyICsgJyBoICcgKyBtaW51dGUgKyAnIG1pbic7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGR1cmF0aW9uID49IDYwKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKGR1cmF0aW9uIC8gNjApICsgJyBtaW4nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGR1cmF0aW9uICsgJyBzJztcclxuICB9XHJcblxyXG4gIHNob3dTZWdtZW50KHN0ZXAsIHpvb21Ub0V4dGVudCA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnNob3dSb3V0ZVNlZ21lbnRHZW9tZXRyeShzdGVwLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCB6b29tVG9FeHRlbnQpO1xyXG4gIH1cclxuXHJcbiAgc2hvd1JvdXRlU2VnbWVudEdlb21ldHJ5KGNvb3JkaW5hdGVzLCB6b29tVG9FeHRlbnQgPSBmYWxzZSkge1xyXG4gICAgY29uc3QgdmVydGV4SWQgPSAndmVydGV4JztcclxuICAgIGNvbnN0IGdlb21ldHJ5NDMyNiA9IG5ldyBvbGdlb20uTGluZVN0cmluZyhjb29yZGluYXRlcyk7XHJcbiAgICBjb25zdCBnZW9tZXRyeU1hcFByb2plY3Rpb24gPSBnZW9tZXRyeTQzMjYudHJhbnNmb3JtKCdFUFNHOjQzMjYnLCB0aGlzLm1hcC5wcm9qZWN0aW9uKTtcclxuICAgIGNvbnN0IHJvdXRlU2VnbWVudENvb3JkaW5hdGVzID0gKGdlb21ldHJ5TWFwUHJvamVjdGlvbiBhcyBhbnkpLmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICBjb25zdCBsYXN0UG9pbnQgPSByb3V0ZVNlZ21lbnRDb29yZGluYXRlc1swXTtcclxuXHJcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBvbGdlb20uUG9pbnQobGFzdFBvaW50KTtcclxuICAgIGNvbnN0IGZlYXR1cmUgPSBuZXcgb2xGZWF0dXJlKHsgZ2VvbWV0cnkgfSk7XHJcblxyXG4gICAgY29uc3QgZ2VvanNvbkdlb20gPSBuZXcgT2xHZW9KU09OKCkud3JpdGVHZW9tZXRyeU9iamVjdChnZW9tZXRyeSwge1xyXG4gICAgICBmZWF0dXJlUHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgZGF0YVByb2plY3Rpb246IHRoaXMubWFwLnByb2plY3Rpb25cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHByZXZpb3VzVmVydGV4ID0gdGhpcy5yb3V0ZVN0b3JlLmdldCh2ZXJ0ZXhJZCk7XHJcbiAgICBjb25zdCBwcmV2aW91c1ZlcnRleFJldmlzaW9uID0gcHJldmlvdXNWZXJ0ZXggPyBwcmV2aW91c1ZlcnRleC5tZXRhLnJldmlzaW9uIDogMDtcclxuXHJcbiAgICBjb25zdCB2ZXJ0ZXhGZWF0dXJlOiBGZWF0dXJlID0ge1xyXG4gICAgICB0eXBlOiBGRUFUVVJFLFxyXG4gICAgICBnZW9tZXRyeTogZ2VvanNvbkdlb20sXHJcbiAgICAgIHByb2plY3Rpb246IHRoaXMubWFwLnByb2plY3Rpb24sXHJcbiAgICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBpZDogdmVydGV4SWQsXHJcbiAgICAgICAgdHlwZTogJ3ZlcnRleCdcclxuICAgICAgfSxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGlkOiB2ZXJ0ZXhJZCxcclxuICAgICAgICByZXZpc2lvbjogcHJldmlvdXNWZXJ0ZXhSZXZpc2lvbiArIDFcclxuICAgICAgfSxcclxuICAgICAgb2w6IGZlYXR1cmVcclxuICAgIH07XHJcbiAgICB0aGlzLnJvdXRlU3RvcmUudXBkYXRlKHZlcnRleEZlYXR1cmUpO1xyXG4gICAgaWYgKHpvb21Ub0V4dGVudCkge1xyXG4gICAgICB0aGlzLm1hcC52aWV3Q29udHJvbGxlci56b29tVG9FeHRlbnQoZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldEV4dGVudCgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHpvb21Sb3V0ZShleHRlbnQ/KSB7XHJcblxyXG4gICAgaWYgKGV4dGVudCkge1xyXG4gICAgICB0aGlzLm1hcC52aWV3Q29udHJvbGxlci56b29tVG9FeHRlbnQoZXh0ZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHJvdXRlRmVhdHVyZSA9IHRoaXMucm91dGVTdG9yZS5sYXllci5vbC5nZXRTb3VyY2UoKS5nZXRGZWF0dXJlcygpLmZpbmQoZiA9PiBmLmdldElkKCkgPT09ICdyb3V0ZScpO1xyXG4gICAgICBpZiAocm91dGVGZWF0dXJlKSB7XHJcbiAgICAgICAgY29uc3Qgcm91dGVFeHRlbnQgPSByb3V0ZUZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRFeHRlbnQoKTtcclxuICAgICAgICB0aGlzLm1hcC52aWV3Q29udHJvbGxlci56b29tVG9FeHRlbnQocm91dGVFeHRlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNob3dSb3V0ZUdlb21ldHJ5KG1vdmVUb0V4dGVudCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBnZW9tID0gdGhpcy5hY3RpdmVSb3V0ZS5nZW9tZXRyeS5jb29yZGluYXRlcztcclxuICAgIGNvbnN0IGdlb21ldHJ5NDMyNiA9IG5ldyBvbGdlb20uTGluZVN0cmluZyhnZW9tKTtcclxuICAgIGNvbnN0IGdlb21ldHJ5TWFwUHJvamVjdGlvbiA9IGdlb21ldHJ5NDMyNi50cmFuc2Zvcm0oJ0VQU0c6NDMyNicsIHRoaXMubWFwLnByb2plY3Rpb24pO1xyXG4gICAgaWYgKG1vdmVUb0V4dGVudCkge1xyXG4gICAgICB0aGlzLnpvb21Sb3V0ZShnZW9tZXRyeU1hcFByb2plY3Rpb24uZ2V0RXh0ZW50KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdlb2pzb25HZW9tID0gbmV3IE9sR2VvSlNPTigpLndyaXRlR2VvbWV0cnlPYmplY3QoZ2VvbWV0cnlNYXBQcm9qZWN0aW9uLCB7XHJcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICBkYXRhUHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvblxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcHJldmlvdXNSb3V0ZSA9IHRoaXMucm91dGVTdG9yZS5nZXQoJ3JvdXRlJyk7XHJcbiAgICBjb25zdCBwcmV2aW91c1JvdXRlUmV2aXNpb24gPSBwcmV2aW91c1JvdXRlID8gcHJldmlvdXNSb3V0ZS5tZXRhLnJldmlzaW9uIDogMDtcclxuXHJcbiAgICBjb25zdCByb3V0ZUZlYXR1cmU6IEZlYXR1cmUgPSB7XHJcbiAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgIGdlb21ldHJ5OiBnZW9qc29uR2VvbSxcclxuICAgICAgcHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGlkOiAncm91dGUnLFxyXG4gICAgICAgIHR5cGU6ICdyb3V0ZSdcclxuICAgICAgfSxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIGlkOiAncm91dGUnLFxyXG4gICAgICAgIHJldmlzaW9uOiBwcmV2aW91c1JvdXRlUmV2aXNpb24gKyAxXHJcbiAgICAgIH0sXHJcbiAgICAgIG9sOiBuZXcgb2xGZWF0dXJlKHsgZ2VvbWV0cnk6IGdlb21ldHJ5TWFwUHJvamVjdGlvbiB9KVxyXG4gICAgfTtcclxuICAgIHRoaXMucm91dGVTdG9yZS51cGRhdGUocm91dGVGZWF0dXJlKTtcclxuXHJcbiAgfVxyXG5cclxuICBnZXRSb3V0ZXMobW92ZVRvRXh0ZW50OiBib29sZWFuID0gZmFsc2UsIGRpcmVjdGlvbnNPcHRpb25zOiBEaXJlY3Rpb25zT3B0aW9ucyA9IHt9KSB7XHJcbiAgICB0aGlzLmRlbGV0ZVN0b3JlRmVhdHVyZUJ5SUQodGhpcy5yb3V0ZVN0b3JlLCAndmVydGV4Jyk7XHJcbiAgICB0aGlzLndyaXRlU3RvcHNUb0Zvcm1TZXJ2aWNlKCk7XHJcbiAgICBjb25zdCBjb29yZHMgPSB0aGlzLmRpcmVjdGlvbnNGb3JtU2VydmljZS5nZXRTdG9wc0Nvb3JkaW5hdGVzKCk7XHJcbiAgICBpZiAoY29vcmRzLmxlbmd0aCA8IDIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgcm91dGVSZXNwb25zZSA9IHRoaXMuZGlyZWN0aW9uc1NlcnZpY2Uucm91dGUoY29vcmRzLCBkaXJlY3Rpb25zT3B0aW9ucyk7XHJcbiAgICBpZiAocm91dGVSZXNwb25zZSkge1xyXG4gICAgICByb3V0ZVJlc3BvbnNlLm1hcChyZXMgPT5cclxuICAgICAgICB0aGlzLnJvdXRlc1F1ZXJpZXMkJC5wdXNoKFxyXG4gICAgICAgICAgcmVzLnN1YnNjcmliZShyb3V0ZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVzUmVzdWx0cyA9IHJvdXRlO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVJvdXRlID0gdGhpcy5yb3V0ZXNSZXN1bHRzWzBdIGFzIERpcmVjdGlvbnM7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1JvdXRlR2VvbWV0cnkobW92ZVRvRXh0ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZnMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVubGlzdGVuU2luZ2xlQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5mb2N1c0tleS5sZW5ndGggIT09IDApIHtcclxuICAgICAgdGhpcy5mb2N1c0tleS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgb2xvYnNlcnZhYmxlLnVuQnlLZXkoa2V5KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVuc3Vic2NyaWJlUm91dGVzUXVlcmllcygpIHtcclxuICAgIHRoaXMucm91dGVzUXVlcmllcyQkLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XHJcbiAgICB0aGlzLnJvdXRlc1F1ZXJpZXMkJCA9IFtdO1xyXG4gIH1cclxuXHJcbiAgY29weUxpbmtUb0NsaXBib2FyZCgpIHtcclxuICAgIGNvbnN0IHN1Y2Nlc3NmdWwgPSBDbGlwYm9hcmQuY29weSh0aGlzLmdldFVybCgpKTtcclxuICAgIGlmIChzdWNjZXNzZnVsKSB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kaXJlY3Rpb25zRm9ybS5kaWFsb2cuY29weVRpdGxlJyk7XHJcbiAgICAgIGNvbnN0IG1zZyA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRpcmVjdGlvbnNGb3JtLmRpYWxvZy5jb3B5TXNnTGluaycpO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobXNnLCB0aXRsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb3B5RGlyZWN0aW9uc1RvQ2xpcGJvYXJkKCkge1xyXG4gICAgY29uc3QgaW5kZW50ID0gJ1xcdCc7XHJcbiAgICBsZXQgYWN0aXZlUm91dGVEaXJlY3RpdmUgPVxyXG4gICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5kaXJlY3Rpb25zRm9ybS5pbnN0cnVjdGlvbnMnXHJcbiAgICAgICkgKyAnOlxcbic7XHJcbiAgICBsZXQgd2F5UG9pbnRMaXN0ID0gJyc7XHJcbiAgICBjb25zdCBzdW1tYXJ5ID1cclxuICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZGlyZWN0aW9uc0Zvcm0uc3VtbWFyeScpICtcclxuICAgICAgJzogXFxuJyArXHJcbiAgICAgIGluZGVudCArXHJcbiAgICAgIHRoaXMuYWN0aXZlUm91dGUudGl0bGUgK1xyXG4gICAgICAnXFxuJyArXHJcbiAgICAgIGluZGVudCArXHJcbiAgICAgIHRoaXMuZm9ybWF0RGlzdGFuY2UodGhpcy5hY3RpdmVSb3V0ZS5kaXN0YW5jZSkgK1xyXG4gICAgICAnXFxuJyArXHJcbiAgICAgIGluZGVudCArXHJcbiAgICAgIHRoaXMuZm9ybWF0RHVyYXRpb24odGhpcy5hY3RpdmVSb3V0ZS5kdXJhdGlvbikgK1xyXG4gICAgICAnXFxuXFxuJyArXHJcbiAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRpcmVjdGlvbnNGb3JtLnN0b3BzTGlzdCcpICtcclxuICAgICAgJzpcXG4nO1xyXG5cclxuICAgIGNvbnN0IHVybCA9XHJcbiAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRpcmVjdGlvbnNGb3JtLmxpbmsnKSArXHJcbiAgICAgICc6XFxuJyArXHJcbiAgICAgIGluZGVudCArXHJcbiAgICAgIHRoaXMuZ2V0VXJsKCk7XHJcblxyXG4gICAgbGV0IHdheVBvaW50c0NudCA9IDE7XHJcbiAgICB0aGlzLnN0b3BzLnZhbHVlLmZvckVhY2goc3RvcCA9PiB7XHJcbiAgICAgIGxldCBjb29yZCA9ICcnO1xyXG4gICAgICBsZXQgc3RvcFBvaW50ID0gJyc7XHJcbiAgICAgIGlmIChzdG9wLnN0b3BQb2ludCAhPT0gc3RvcC5zdG9wQ29vcmRpbmF0ZXMpIHtcclxuICAgICAgICBzdG9wUG9pbnQgPSBzdG9wLnN0b3BQb2ludDtcclxuICAgICAgICBjb29yZCA9XHJcbiAgICAgICAgICAnICgnICtcclxuICAgICAgICAgIFtzdG9wLnN0b3BDb29yZGluYXRlc1sxXSwgc3RvcC5zdG9wQ29vcmRpbmF0ZXNbMF1dLmpvaW4oJywnKSArXHJcbiAgICAgICAgICAnKSc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3RvcFBvaW50ID0gW3N0b3Auc3RvcENvb3JkaW5hdGVzWzFdLCBzdG9wLnN0b3BDb29yZGluYXRlc1swXV0uam9pbihcclxuICAgICAgICAgICcsJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHdheVBvaW50TGlzdCA9XHJcbiAgICAgICAgd2F5UG9pbnRMaXN0ICtcclxuICAgICAgICBpbmRlbnQgK1xyXG4gICAgICAgIHdheVBvaW50c0NudC50b0xvY2FsZVN0cmluZygpICtcclxuICAgICAgICAnLiAnICtcclxuICAgICAgICBzdG9wUG9pbnQgK1xyXG4gICAgICAgIGNvb3JkICtcclxuICAgICAgICAnXFxuJztcclxuICAgICAgd2F5UG9pbnRzQ250Kys7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBEaXJlY3Rpb25zXHJcbiAgICBsZXQgbG9jYWxDbnQgPSAwO1xyXG4gICAgdGhpcy5hY3RpdmVSb3V0ZS5zdGVwcy5mb3JFYWNoKHN0ZXAgPT4ge1xyXG4gICAgICBjb25zdCBpbnN0cnVjdGlvbiA9IHRoaXMuZm9ybWF0U3RlcChzdGVwLCBsb2NhbENudCkuaW5zdHJ1Y3Rpb247XHJcbiAgICAgIGNvbnN0IGRpc3RhbmNlID1cclxuICAgICAgICB0aGlzLmZvcm1hdERpc3RhbmNlKHN0ZXAuZGlzdGFuY2UpID09PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gJydcclxuICAgICAgICAgIDogJyAoJyArIHRoaXMuZm9ybWF0RGlzdGFuY2Uoc3RlcC5kaXN0YW5jZSkgKyAnKSc7XHJcbiAgICAgIGFjdGl2ZVJvdXRlRGlyZWN0aXZlID1cclxuICAgICAgICBhY3RpdmVSb3V0ZURpcmVjdGl2ZSArXHJcbiAgICAgICAgaW5kZW50ICtcclxuICAgICAgICAobG9jYWxDbnQgKyAxKS50b0xvY2FsZVN0cmluZygpICtcclxuICAgICAgICAnLiAnICtcclxuICAgICAgICBpbnN0cnVjdGlvbiArXHJcbiAgICAgICAgZGlzdGFuY2UgK1xyXG4gICAgICAgICdcXG4nO1xyXG4gICAgICBsb2NhbENudCsrO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgZGlyZWN0aW9uc0JvZHkgPVxyXG4gICAgICBzdW1tYXJ5ICsgd2F5UG9pbnRMaXN0ICsgJ1xcbicgKyB1cmwgKyAnXFxuXFxuJyArIGFjdGl2ZVJvdXRlRGlyZWN0aXZlO1xyXG5cclxuICAgIGNvbnN0IHN1Y2Nlc3NmdWwgPSBDbGlwYm9hcmQuY29weShkaXJlY3Rpb25zQm9keSk7XHJcbiAgICBpZiAoc3VjY2Vzc2Z1bCkge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZGlyZWN0aW9uc0Zvcm0uZGlhbG9nLmNvcHlUaXRsZScpO1xyXG4gICAgICBjb25zdCBtc2cgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kaXJlY3Rpb25zRm9ybS5kaWFsb2cuY29weU1zZycpO1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobXNnLCB0aXRsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVRlcm1DaGFuZ2VkKHRlcm06IHN0cmluZykge1xyXG4gICAgaWYgKHRlcm0gIT09IHVuZGVmaW5lZCB8fCB0ZXJtLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICBjb25zdCBzZWFyY2hQcm9wb3NhbHMgPSBbXTtcclxuICAgICAgaWYgKHRoaXMuc2VhcmNoJCQpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaCQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcmVzZWFyY2hlcyA9IHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2godGVybSwge3NlYXJjaFR5cGU6ICdGZWF0dXJlJ30pO1xyXG4gICAgICByZXNlYXJjaGVzLm1hcChyZXMgPT5cclxuICAgICAgICB0aGlzLnNlYXJjaCQkID1cclxuICAgICAgICByZXMucmVxdWVzdC5zdWJzY3JpYmUocmVzdWx0cyA9PiB7XHJcbiAgICAgICAgICByZXN1bHRzXHJcbiAgICAgICAgICAgIC5maWx0ZXIociA9PiByLmRhdGEuZ2VvbWV0cnkpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIHNlYXJjaFByb3Bvc2Fscy5maWx0ZXIociA9PiByLnNvdXJjZSA9PT0gZWxlbWVudC5zb3VyY2UpXHJcbiAgICAgICAgICAgICAgICAgIC5sZW5ndGggPT09IDBcclxuICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaFByb3Bvc2Fscy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgc291cmNlOiBlbGVtZW50LnNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgbWV0YTogZWxlbWVudC5tZXRhLFxyXG4gICAgICAgICAgICAgICAgICByZXN1bHRzOiByZXN1bHRzLm1hcChyID0+IHIuZGF0YSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLnN0b3BzXHJcbiAgICAgICAgICAgIC5hdCh0aGlzLmN1cnJlbnRTdG9wSW5kZXgpXHJcbiAgICAgICAgICAgIC5wYXRjaFZhbHVlKHsgc3RvcFByb3Bvc2Fsczogc2VhcmNoUHJvcG9zYWxzIH0pO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZnMuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRUZXJtKHRlcm06IHN0cmluZykge1xyXG4gICAgdGhpcy50ZXJtID0gdGVybTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5rZXlJc1ZhbGlkKHRlcm0pICYmXHJcbiAgICAgICh0ZXJtLmxlbmd0aCA+PSB0aGlzLmxlbmd0aCB8fCB0ZXJtLmxlbmd0aCA9PT0gMClcclxuICAgICkge1xyXG4gICAgICB0aGlzLnN0cmVhbSQubmV4dCh0ZXJtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUga2V5SXNWYWxpZChrZXk6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZEtleXMuZmluZCh2YWx1ZSA9PiB2YWx1ZSA9PT0ga2V5KSA9PT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAga2V5dXAoaSwgZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGNvbnN0IHRlcm0gPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG4gICAgdGhpcy5zZXRUZXJtKHRlcm0pO1xyXG4gICAgdGhpcy5tYXAub2wudW4oJ3NpbmdsZWNsaWNrJywgZXZ0ID0+IHtcclxuICAgICAgdGhpcy5oYW5kbGVNYXBDbGljayhldnQsIGkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjbGVhclN0b3Aoc3RvcEluZGV4KSB7XHJcbiAgICAvLyB0aGlzLmRlbGV0ZURpcmVjdGlvbnNPdmVybGF5YnlJRCh0aGlzLmdldFN0b3BPdmVybGF5SUQoc3RvcEluZGV4KSk7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0U3RvcE92ZXJsYXlJRChzdG9wSW5kZXgpO1xyXG4gICAgdGhpcy5kZWxldGVTdG9yZUZlYXR1cmVCeUlEKHRoaXMuc3RvcHNTdG9yZSwgaWQpO1xyXG4gICAgdGhpcy5yb3V0ZVN0b3JlLmNsZWFyKCk7XHJcbiAgICBjb25zdCBzdG9wc0NvdW50cyA9IHRoaXMuc3RvcHMubGVuZ3RoO1xyXG4gICAgdGhpcy5zdG9wcy5yZW1vdmVBdChzdG9wSW5kZXgpO1xyXG4gICAgdGhpcy5zdG9wcy5pbnNlcnQoc3RvcEluZGV4LCB0aGlzLmNyZWF0ZVN0b3AodGhpcy5kaXJlY3Rpb25zVGV4dChzdG9wSW5kZXgsIHN0b3BzQ291bnRzKSkpO1xyXG4gICAgdGhpcy5yb3V0ZXNSZXN1bHRzID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5nZXRSb3V0ZXMoKTtcclxuICB9XHJcblxyXG4gIGNob29zZVByb3Bvc2FsKHByb3Bvc2FsLCBpKSB7XHJcbiAgICBpZiAocHJvcG9zYWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBsZXQgZ2VvbUNvb3JkO1xyXG4gICAgICBjb25zdCBnZW9tID0gKHByb3Bvc2FsIGFzIGFueSkuZ2VvbWV0cnk7XHJcbiAgICAgIGlmIChnZW9tLnR5cGUgPT09ICdQb2ludCcpIHtcclxuICAgICAgICBnZW9tQ29vcmQgPSBnZW9tLmNvb3JkaW5hdGVzO1xyXG4gICAgICB9IGVsc2UgaWYgKGdlb20udHlwZS5zZWFyY2goJ0xpbmUnKSA+PSAwKSB7XHJcbiAgICAgICAgY29uc3QgbGluZSA9IChuZXcgT2xHZW9KU09OKCkpLnJlYWRGZWF0dXJlcyhnZW9tKTtcclxuICAgICAgICBnZW9tQ29vcmQgPSBsaW5lWzBdLmdldEdlb21ldHJ5KCkuZ2V0Rmlyc3RDb29yZGluYXRlKCk7XHJcbiAgICAgICAgZ2VvbUNvb3JkID0gW2dlb21Db29yZFswXSwgZ2VvbUNvb3JkWzFdXTtcclxuICAgICAgfSBlbHNlIGlmIChnZW9tLnR5cGUuc2VhcmNoKCdQb2x5Z29uJykgPj0gMCkge1xyXG4gICAgICAgIGNvbnN0IHBvbHkgPSAobmV3IE9sR2VvSlNPTigpKS5yZWFkRmVhdHVyZXMoZ2VvbSk7XHJcbiAgICAgICAgZ2VvbUNvb3JkID0gcG9seVswXS5nZXRHZW9tZXRyeSgpLmdldEludGVyaW9yUG9pbnRzKCkuZ2V0Rmlyc3RDb29yZGluYXRlKCk7XHJcbiAgICAgICAgZ2VvbUNvb3JkID0gW2dlb21Db29yZFswXSwgZ2VvbUNvb3JkWzFdXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGdlb21Db29yZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wcy5hdChpKS5wYXRjaFZhbHVlKHsgc3RvcENvb3JkaW5hdGVzOiBnZW9tQ29vcmQgfSk7XHJcbiAgICAgICAgdGhpcy5hZGRTdG9wT3ZlcmxheShnZW9tQ29vcmQsIGkpO1xyXG4gICAgICAvKiAgY29uc3QgcHJvcG9zYWxFeHRlbnQgPSB0aGlzLmRpcmVjdGlvbnNTdG9wc092ZXJsYXlEYXRhU291cmNlLm9sXHJcbiAgICAgICAgICAuZ2V0RmVhdHVyZUJ5SWQodGhpcy5nZXRTdG9wT3ZlcmxheUlEKGkpKVxyXG4gICAgICAgICAgLmdldEdlb21ldHJ5KClcclxuICAgICAgICAgIC5nZXRFeHRlbnQoKTsqL1xyXG5cclxuICAgICAgIC8qIGlmICghb2xleHRlbnQuaW50ZXJzZWN0cyhwcm9wb3NhbEV4dGVudCwgdGhpcy5tYXAudmlld0NvbnRyb2xsZXIuZ2V0RXh0ZW50KCkpKSB7XHJcbiAgICAgICAgICB0aGlzLm1hcC52aWV3Q29udHJvbGxlci5tb3ZlVG9FeHRlbnQocHJvcG9zYWxFeHRlbnQpO1xyXG4gICAgICAgIH0qL1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb2N1cyhpKSB7XHJcbiAgICB0aGlzLnVubGlzdGVuU2luZ2xlQ2xpY2soKTtcclxuICAgIHRoaXMuY3VycmVudFN0b3BJbmRleCA9IGk7XHJcbiAgICB0aGlzLmZvY3VzT25TdG9wID0gdHJ1ZTtcclxuICAgIHRoaXMuZm9jdXNLZXkucHVzaChcclxuICAgICAgdGhpcy5tYXAub2wub25jZSgnc2luZ2xlY2xpY2snLCBldnQgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlTWFwQ2xpY2soZXZ0LCBpKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZU1hcENsaWNrKGV2ZW50OiBvbGNvbmRpdGlvbiwgaW5kZXhQb3M/KSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50U3RvcEluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5hZGRTdG9wKCk7XHJcbiAgICAgIGluZGV4UG9zID0gdGhpcy5zdG9wcy5sZW5ndGggLSAyO1xyXG4gICAgICB0aGlzLnN0b3BzLmF0KGluZGV4UG9zKS52YWx1ZS5zdG9wUHJvcG9zYWxzID0gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbmRleFBvcyA9IHRoaXMuY3VycmVudFN0b3BJbmRleDtcclxuICAgIH1cclxuICAgIGNvbnN0IGNsaWNrQ29vcmRpbmF0ZXMgPSBvbHByb2oudHJhbnNmb3JtKFxyXG4gICAgICBldmVudC5jb29yZGluYXRlLFxyXG4gICAgICB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICB0aGlzLnByb2plY3Rpb25cclxuICAgICk7XHJcbiAgICB0aGlzLnN0b3BzLmF0KGluZGV4UG9zKS5wYXRjaFZhbHVlKHsgc3RvcFByb3Bvc2FsczogW10sIHN0b3BDb29yZGluYXRlczogY2xpY2tDb29yZGluYXRlcyB9KTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZUxvY2F0aW9uUHJvcG9zYWxzKGNsaWNrQ29vcmRpbmF0ZXMsIGluZGV4UG9zKTtcclxuICAgIHRoaXMuYWRkU3RvcE92ZXJsYXkoY2xpY2tDb29yZGluYXRlcywgaW5kZXhQb3MpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuZm9jdXNPblN0b3AgPSBmYWxzZTsgLy8gcHJldmVudCB0byB0cmlnZ2VyIG1hcCBjbGljayBhbmQgU2VsZWN0IG9uIHJvdXRlcyBhdCBzYW1lIHRpbWUuXHJcbiAgICB9LCA1MDApO1xyXG4gIH1cclxuXHJcbiAgZ2VvbG9jYXRlU3RvcChpbmRleDogbnVtYmVyKSB7XHJcbiAgICBtb3ZlVG9PbEZlYXR1cmVzKHRoaXMubWFwLCBbdGhpcy5tYXAuZ2VvbG9jYXRpb25GZWF0dXJlXSwgRmVhdHVyZU1vdGlvbi5Nb3ZlKTtcclxuICAgIGNvbnN0IGdlb2xvY2F0ZUNvb3JkaW5hdGVzID0gdGhpcy5tYXAudmlld0NvbnRyb2xsZXIuZ2V0Q2VudGVyKHRoaXMucHJvamVjdGlvbik7XHJcbiAgICB0aGlzLnN0b3BzLmF0KGluZGV4KS5wYXRjaFZhbHVlKHsgc3RvcENvb3JkaW5hdGVzOiBnZW9sb2NhdGVDb29yZGluYXRlcyB9KTtcclxuICAgIHRoaXMuYWRkU3RvcE92ZXJsYXkoZ2VvbG9jYXRlQ29vcmRpbmF0ZXMsIGluZGV4KTtcclxuICAgIHRoaXMuaGFuZGxlTG9jYXRpb25Qcm9wb3NhbHMoZ2VvbG9jYXRlQ29vcmRpbmF0ZXMsIGluZGV4KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRTdG9wT3ZlcmxheShjb29yZGluYXRlczogW251bWJlciwgbnVtYmVyXSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgY29uc3QgZGlyZWN0aW9uc1RleHQgPSB0aGlzLmRpcmVjdGlvbnNUZXh0KGluZGV4KTtcclxuICAgIGxldCBzdG9wQ29sb3I7XHJcbiAgICBsZXQgc3RvcFRleHQ7XHJcbiAgICBpZiAoZGlyZWN0aW9uc1RleHQgPT09ICdzdGFydCcpIHtcclxuICAgICAgc3RvcENvbG9yID0gJ2dyZWVuJztcclxuICAgICAgc3RvcFRleHQgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5kaXJlY3Rpb25zRm9ybS5zdGFydCdcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uc1RleHQgPT09ICdlbmQnKSB7XHJcbiAgICAgIHN0b3BDb2xvciA9ICdyZWQnO1xyXG4gICAgICBzdG9wVGV4dCA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uZ2VvLmRpcmVjdGlvbnNGb3JtLmVuZCdcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0b3BDb2xvciA9ICd5ZWxsb3cnO1xyXG4gICAgICBzdG9wVGV4dCA9XHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAnaWdvLmdlby5kaXJlY3Rpb25zRm9ybS5pbnRlcm1lZGlhdGUnXHJcbiAgICAgICAgKSArXHJcbiAgICAgICAgJyAjJyArXHJcbiAgICAgICAgaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgb2xnZW9tLlBvaW50KFxyXG4gICAgICBvbHByb2oudHJhbnNmb3JtKGNvb3JkaW5hdGVzLCB0aGlzLnByb2plY3Rpb24sIHRoaXMubWFwLnByb2plY3Rpb24pXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHN0b3BJRCA9IHRoaXMuZ2V0U3RvcE92ZXJsYXlJRChpbmRleCk7XHJcbiAgICBjb25zdCBnZW9qc29uR2VvbSA9IG5ldyBPbEdlb0pTT04oKS53cml0ZUdlb21ldHJ5T2JqZWN0KGdlb21ldHJ5LCB7XHJcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICBkYXRhUHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvblxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcHJldmlvdXNTdG9wID0gdGhpcy5zdG9wc1N0b3JlLmdldChzdG9wSUQpO1xyXG4gICAgY29uc3QgcHJldmlvdXNTdG9wUmV2aXNpb24gPSBwcmV2aW91c1N0b3AgPyBwcmV2aW91c1N0b3AubWV0YS5yZXZpc2lvbiA6IDA7XHJcblxyXG4gICAgY29uc3Qgc3RvcEZlYXR1cmU6IEZlYXR1cmUgPSB7XHJcbiAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgIGdlb21ldHJ5OiBnZW9qc29uR2VvbSxcclxuICAgICAgcHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGlkOiBzdG9wSUQsXHJcbiAgICAgICAgdHlwZTogJ3N0b3AnLFxyXG4gICAgICAgIHN0b3BUZXh0LFxyXG4gICAgICAgIHN0b3BDb2xvcixcclxuICAgICAgICBzdG9wT3BhY2l0eTogMVxyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgaWQ6IHN0b3BJRCxcclxuICAgICAgICByZXZpc2lvbjogcHJldmlvdXNTdG9wUmV2aXNpb24gKyAxXHJcbiAgICAgIH0sXHJcbiAgICAgIG9sOiBuZXcgb2xGZWF0dXJlKHsgZ2VvbWV0cnkgfSlcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zdG9wc1N0b3JlLnVwZGF0ZShzdG9wRmVhdHVyZSk7XHJcbiAgICB0aGlzLmdldFJvdXRlcygpO1xyXG5cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTdG9wT3ZlcmxheUlEKGluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgbGV0IHR4dDtcclxuICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICB0eHQgPSAnc3RhcnQnO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PT0gdGhpcy5zdG9wcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHR4dCA9ICdlbmQnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdHh0ID0gaW5kZXg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJ2RpcmVjdGlvbnNTdG9wXycgKyB0eHQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRlbGV0ZVN0b3JlRmVhdHVyZUJ5SUQoc3RvcmUsIGlkKSB7XHJcbiAgICBjb25zdCBlbnRpdHkgPSBzdG9yZS5nZXQoaWQpO1xyXG4gICAgaWYgKGVudGl0eSkge1xyXG4gICAgICBzdG9yZS5kZWxldGUoZW50aXR5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0VXJsKCkge1xyXG4gICAgaWYgKCF0aGlzLnJvdXRlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkaXJlY3Rpb25zS2V5ID0gdGhpcy5yb3V0ZS5vcHRpb25zLmRpcmVjdGlvbnNDb29yZEtleTtcclxuICAgIGNvbnN0IHN0b3BzQ29vcmRpbmF0ZXMgPSBbXTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5kaXJlY3Rpb25zRm9ybVNlcnZpY2UgJiZcclxuICAgICAgdGhpcy5kaXJlY3Rpb25zRm9ybVNlcnZpY2UuZ2V0U3RvcHNDb29yZGluYXRlcygpICYmXHJcbiAgICAgIHRoaXMuZGlyZWN0aW9uc0Zvcm1TZXJ2aWNlLmdldFN0b3BzQ29vcmRpbmF0ZXMoKS5sZW5ndGggIT09IDBcclxuICAgICkge1xyXG4gICAgICB0aGlzLmRpcmVjdGlvbnNGb3JtU2VydmljZS5nZXRTdG9wc0Nvb3JkaW5hdGVzKCkuZm9yRWFjaChjb29yZCA9PiB7XHJcbiAgICAgICAgc3RvcHNDb29yZGluYXRlcy5wdXNoKHJvdW5kQ29vcmRUbyhjb29yZCwgNikpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGxldCBkaXJlY3Rpb25zVXJsID0gJyc7XHJcbiAgICBpZiAoc3RvcHNDb29yZGluYXRlcy5sZW5ndGggPj0gMikge1xyXG4gICAgICBkaXJlY3Rpb25zVXJsID0gYCR7ZGlyZWN0aW9uc0tleX09JHtzdG9wc0Nvb3JkaW5hdGVzLmpvaW4oJzsnKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgJHtsb2NhdGlvbi5vcmlnaW59JHtcclxuICAgICAgbG9jYXRpb24ucGF0aG5hbWVcclxuICAgIH0/dG9vbD1kaXJlY3Rpb25zJiR7ZGlyZWN0aW9uc1VybH1gO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIHN0eWxlIGZvciB0aGUgZGlyZWN0aW9ucyBzdG9wcyBhbmQgcm91dGVzXHJcbiAqIEBwYXJhbSBmZWF0dXJlIE9sRmVhdHVyZVxyXG4gKiBAcmV0dXJucyBPTCBzdHlsZSBmdW5jdGlvblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BNYXJrZXIoZmVhdHVyZTogb2xGZWF0dXJlLCByZXNvbHV0aW9uOiBudW1iZXIpOiBvbHN0eWxlLlN0eWxlIHtcclxuXHJcbiAgY29uc3QgdmVydGV4U3R5bGUgPSBbXHJcbiAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgIGdlb21ldHJ5OiBmZWF0dXJlLmdldEdlb21ldHJ5KCksXHJcbiAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICAgIHJhZGl1czogNyxcclxuICAgICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7IGNvbG9yOiAnI0ZGMDAwMCcsIHdpZHRoOiAzIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIF07XHJcblxyXG4gIGNvbnN0IHN0b3BTdHlsZSA9IG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgIGltYWdlOiBuZXcgb2xzdHlsZS5JY29uKHtcclxuICAgICAgc3JjOiAnLi9hc3NldHMvaWdvMi9nZW8vaWNvbnMvcGxhY2VfJyArIGZlYXR1cmUuZ2V0KCdzdG9wQ29sb3InKSArICdfMzZweC5zdmcnLFxyXG4gICAgICBvcGFjaXR5IDogZmVhdHVyZS5nZXQoJ3N0b3BPcGFjaXR5JyksXHJcbiAgICAgIGltZ1NpemU6IFszNiwgMzZdLCAvLyBmb3IgaWVcclxuICAgICAgYW5jaG9yOiBbMC41LCAwLjkyXVxyXG4gICAgfSksXHJcblxyXG4gICAgdGV4dDogbmV3IG9sc3R5bGUuVGV4dCh7XHJcbiAgICAgIHRleHQ6IGZlYXR1cmUuZ2V0KCdzdG9wVGV4dCcpLFxyXG4gICAgICBmb250OiAnMTJweCBDYWxpYnJpLHNhbnMtc2VyaWYnLFxyXG4gICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHsgY29sb3I6ICcjMDAwJyB9KSxcclxuICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2UoeyBjb2xvcjogJyNmZmYnLCB3aWR0aDogMyB9KSxcclxuICAgICAgb3ZlcmZsb3c6IHRydWVcclxuICAgIH0pXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJvdXRlU3R5bGUgPSBbXHJcbiAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHsgY29sb3I6ICcjNmE3OTgyJywgd2lkdGg6IDEwLCBvcGFjaXR5OiAwLjc1IH0pXHJcbiAgICB9KSxcclxuICAgIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2UoeyBjb2xvcjogJyM0ZmE5ZGQnLCB3aWR0aDogNiwgb3BhY2l0eTogMC43NSB9KVxyXG4gICAgfSlcclxuICBdO1xyXG5cclxuICBpZiAoZmVhdHVyZS5nZXQoJ3R5cGUnKSA9PT0gJ3N0b3AnKSB7XHJcbiAgICByZXR1cm4gc3RvcFN0eWxlO1xyXG4gIH1cclxuICBpZiAoZmVhdHVyZS5nZXQoJ3R5cGUnKSA9PT0gJ3ZlcnRleCcpIHtcclxuICAgIHJldHVybiB2ZXJ0ZXhTdHlsZTtcclxuICB9XHJcbiAgaWYgKGZlYXR1cmUuZ2V0KCd0eXBlJykgPT09ICdyb3V0ZScpIHtcclxuICAgIHJldHVybiByb3V0ZVN0eWxlO1xyXG4gIH1cclxuXHJcbn1cclxuIl19