/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, Optional, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, take } from 'rxjs/operators';
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
export class DirectionsFormComponent {
    /**
     * @param {?} formBuilder
     * @param {?} directionsService
     * @param {?} languageService
     * @param {?} messageService
     * @param {?} searchService
     * @param {?} queryService
     * @param {?} directionsFormService
     * @param {?} changeDetectorRefs
     * @param {?} route
     */
    constructor(formBuilder, directionsService, languageService, messageService, searchService, queryService, directionsFormService, changeDetectorRefs, route) {
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
    changeRoute() {
        this.showRouteGeometry();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    prevent(event) {
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
        if (!this.directionsFormService.getStops()) {
            this.map.status$.pipe(take(1)).subscribe((/**
             * @return {?}
             */
            () => {
                this.conditionalInit();
            }));
        }
        else {
            this.conditionalInit();
        }
    }
    /**
     * @private
     * @return {?}
     */
    conditionalInit() {
        this.initStores();
        this.initOlInteraction();
        this.subscribeToFormChange();
        this.routesQueries$$.push(this.stream$
            .pipe(debounceTime(this.debounce), distinctUntilChanged())
            .subscribe((/**
         * @param {?} term
         * @return {?}
         */
        (term) => this.handleTermChanged(term))));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribeRoutesQueries();
        this.unlistenSingleClick();
        this.queryService.queryEnabled = true;
        this.freezeStores();
        this.writeStopsToFormService();
    }
    /**
     * @private
     * @return {?}
     */
    initStores() {
        /** @type {?} */
        const loadingStrategy = new FeatureStoreLoadingStrategy({ motion: FeatureMotion.None });
        // STOP STORE
        /** @type {?} */
        const stopsStore = this.stopsStore;
        /** @type {?} */
        const stopsLayer = new VectorLayer({
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
        const routeStore = this.routeStore;
        /** @type {?} */
        const routeLayer = new VectorLayer({
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
    }
    /**
     * @private
     * @return {?}
     */
    initOlInteraction() {
        /** @type {?} */
        let selectedStopFeature;
        /** @type {?} */
        const selectStop = new olinteraction.Select({
            layers: [this.stopsStore.layer.ol],
            condition: olcondition.pointerMove,
            hitTolerance: 7,
            filter: (/**
             * @param {?} feature
             * @return {?}
             */
            (feature) => {
                return feature.get('type') === 'stop';
            })
        });
        selectStop.on('select', (/**
         * @param {?} evt
         * @return {?}
         */
        evt => {
            selectedStopFeature = evt.target.getFeatures()[0];
        }));
        /** @type {?} */
        const translateStop = new olinteraction.Translate({
            layers: [this.stopsStore.layer.ol],
            features: selectedStopFeature
            // TODO In Openlayers >= 6.x, filter is now allowed.
        });
        translateStop.on('translating', (/**
         * @param {?} evt
         * @return {?}
         */
        evt => {
            /** @type {?} */
            const features = evt.features;
            if (features.getLength() === 0) {
                return;
            }
            this.executeTranslation(features, false, 50, true);
        }));
        translateStop.on('translateend', (/**
         * @param {?} evt
         * @return {?}
         */
        evt => {
            /** @type {?} */
            const features = evt.features;
            if (features.getLength() === 0) {
                return;
            }
            this.executeTranslation(features, true, 0, false);
        }));
        /** @type {?} */
        const selectedRoute = new olinteraction.Select({
            layers: [this.routeStore.layer.ol],
            condition: olcondition.click,
            hitTolerance: 7,
            filter: (/**
             * @param {?} feature
             * @return {?}
             */
            (feature) => {
                return feature.getId() === 'route';
            })
        });
        selectedRoute.on('select', (/**
         * @param {?} evt
         * @return {?}
         */
        evt => {
            if (this.focusOnStop === false) {
                /** @type {?} */
                const selectCoordinates = olproj.transform(((/** @type {?} */ (evt))).mapBrowserEvent.coordinate, this.map.projection, this.projection);
                this.addStop();
                /** @type {?} */
                const pos = this.stops.length - 2;
                this.stops.at(pos).patchValue({ stopCoordinates: selectCoordinates });
                this.handleLocationProposals(selectCoordinates, pos);
                this.addStopOverlay(selectCoordinates, pos);
                selectedRoute.getFeatures().clear();
            }
            selectedRoute.getFeatures().clear();
        }));
        this.map.ol.addInteraction(selectStop);
        this.map.ol.addInteraction(translateStop);
        this.map.ol.addInteraction(selectedRoute);
    }
    /**
     * @private
     * @return {?}
     */
    subscribeToFormChange() {
        this.routesQueries$$.push(this.stopsForm.valueChanges
            .pipe(debounceTime(this.debounce))
            .subscribe((/**
         * @param {?} val
         * @return {?}
         */
        val => {
            this.writeStopsToFormService();
        })));
    }
    /**
     * Freeze any store, meaning the layer is removed, strategies are deactivated
     * and some listener removed
     * \@internal
     * @private
     * @return {?}
     */
    freezeStores() {
        /** @type {?} */
        const stopsStore = this.stopsStore;
        /** @type {?} */
        const routeStore = this.routeStore;
        this.map.removeLayer(stopsStore.layer);
        this.map.removeLayer(routeStore.layer);
        stopsStore.deactivateStrategyOfType(FeatureStoreLoadingStrategy);
        routeStore.deactivateStrategyOfType(FeatureStoreLoadingStrategy);
    }
    /**
     * @private
     * @param {?} features
     * @param {?=} reverseSearchProposal
     * @param {?=} delay
     * @param {?=} overview
     * @return {?}
     */
    executeTranslation(features, reverseSearchProposal = false, delay = 0, overview = false) {
        this.routeStore.clear();
        /** @type {?} */
        const firstFeature = features.getArray()[0];
        /** @type {?} */
        const translatedID = firstFeature.getId();
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
        const translationCoordinates = olproj.transform(firstFeature.getGeometry().getCoordinates(), this.map.projection, this.projection);
        this.stops
            .at(p)
            .patchValue({ stopCoordinates: translationCoordinates, stopProposals: [] });
        if (reverseSearchProposal) {
            this.handleLocationProposals(translationCoordinates, p);
        }
        /** @type {?} */
        const directionsOptions = (/** @type {?} */ ({
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
            () => {
                this.getRoutes(undefined, directionsOptions);
            }), delay);
        }
        else {
            clearTimeout(this.lastTimeoutRequest);
            this.getRoutes(undefined, directionsOptions);
        }
    }
    /**
     * @param {?} coordinates
     * @param {?} stopIndex
     * @return {?}
     */
    handleLocationProposals(coordinates, stopIndex) {
        /** @type {?} */
        const groupedLocations = [];
        /** @type {?} */
        const roundedCoordinates = [coordinates[0].toFixed(5), coordinates[1].toFixed(5)];
        this.stops.at(stopIndex).patchValue({ stopPoint: roundedCoordinates.join(',') });
        this.searchService
            .reverseSearch(coordinates, { zoom: this.map.viewController.getZoom() })
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
                        if (feature.properties.type === 'adresses') {
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
                    else {
                        // Not moving the translated point Only to suggest value into the UI.
                    }
                }
                else if (results[0].source.getId() === 'coordinatesreverse') {
                    this.stops.at(stopIndex).patchValue({
                        stopPoint: [
                            results[0].data.geometry.coordinates[0].toFixed(5),
                            results[0].data.geometry.coordinates[1].toFixed(5)
                        ].join(',')
                    });
                    if (results[0].data.geometry.type === 'Point') {
                        this.stops.at(stopIndex).patchValue({
                            stopCoordinates: results[0].data.geometry.coordinates
                        });
                    }
                    else {
                        // Not moving the translated point Only to suggest value into the UI.
                    }
                }
            }
            else {
                this.stops.at(stopIndex).patchValue({ stopPoint: roundedCoordinates.join(','), stopProposals: [] });
            }
            this.changeDetectorRefs.detectChanges();
        })))));
    }
    /**
     * @param {?} index
     * @param {?=} stopsCounts
     * @return {?}
     */
    directionsText(index, stopsCounts = this.stops.length) {
        if (index === 0) {
            return 'start';
        }
        else if (index === stopsCounts - 1 || stopsCounts === 1) {
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
     * @private
     * @param {?} index
     * @param {?} diff
     * @return {?}
     */
    moveStop(index, diff) {
        /** @type {?} */
        const fromValue = this.stops.at(index);
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
    writeStopsToFormService() {
        /** @type {?} */
        const stops = [];
        this.stops.value.forEach((/**
         * @param {?} stop
         * @return {?}
         */
        stop => {
            if (stop.stopCoordinates instanceof Array) {
                stops.push(stop);
            }
        }));
        this.directionsFormService.setStops(stops);
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
     * @param {?=} directionsPos
     * @return {?}
     */
    createStop(directionsPos = 'intermediate') {
        return this.formBuilder.group({
            stopPoint: [''],
            stopProposals: [[]],
            directionsText: directionsPos,
            stopCoordinates: ['', [Validators.required]]
        });
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeStop(index) {
        /** @type {?} */
        const id = this.getStopOverlayID(index);
        this.deleteStoreFeatureByID(this.stopsStore, id);
        this.stops.removeAt(index);
        /** @type {?} */
        let cnt = 0;
        this.stops.value.forEach((/**
         * @param {?} stop
         * @return {?}
         */
        stop => {
            this.stops.at(cnt).patchValue({ directionsText: this.directionsText(cnt) });
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
        this.stopsStore.clear();
        this.routeStore.clear();
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
        let image = 'forward';
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
    formatDuration(duration, summary = false) {
        if (duration >= 3600) {
            /** @type {?} */
            const hour = Math.floor(duration / 3600);
            /** @type {?} */
            const minute = Math.round((duration / 3600 - hour) * 60);
            if (minute === 60) {
                return hour + 1 + ' h';
            }
            return hour + ' h ' + minute + ' min';
        }
        if (duration >= 60) {
            return Math.round(duration / 60) + ' min';
        }
        return duration + ' s';
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
        /** @type {?} */
        const vertexId = 'vertex';
        /** @type {?} */
        const geometry4326 = new olgeom.LineString(coordinates);
        /** @type {?} */
        const geometryMapProjection = geometry4326.transform('EPSG:4326', this.map.projection);
        /** @type {?} */
        const routeSegmentCoordinates = ((/** @type {?} */ (geometryMapProjection))).getCoordinates();
        /** @type {?} */
        const lastPoint = routeSegmentCoordinates[0];
        /** @type {?} */
        const geometry = new olgeom.Point(lastPoint);
        /** @type {?} */
        const feature = new olFeature({ geometry });
        /** @type {?} */
        const geojsonGeom = new OlGeoJSON().writeGeometryObject(geometry, {
            featureProjection: this.map.projection,
            dataProjection: this.map.projection
        });
        /** @type {?} */
        const previousVertex = this.routeStore.get(vertexId);
        /** @type {?} */
        const previousVertexRevision = previousVertex ? previousVertex.meta.revision : 0;
        /** @type {?} */
        const vertexFeature = {
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
    }
    /**
     * @param {?=} extent
     * @return {?}
     */
    zoomRoute(extent) {
        if (extent) {
            this.map.viewController.zoomToExtent(extent);
        }
        else {
            /** @type {?} */
            const routeFeature = this.routeStore.layer.ol.getSource().getFeatures().find((/**
             * @param {?} f
             * @return {?}
             */
            f => f.getId() === 'route'));
            if (routeFeature) {
                /** @type {?} */
                const routeExtent = routeFeature.getGeometry().getExtent();
                this.map.viewController.zoomToExtent(routeExtent);
            }
        }
    }
    /**
     * @private
     * @param {?=} moveToExtent
     * @return {?}
     */
    showRouteGeometry(moveToExtent = false) {
        /** @type {?} */
        const geom = this.activeRoute.geometry.coordinates;
        /** @type {?} */
        const geometry4326 = new olgeom.LineString(geom);
        /** @type {?} */
        const geometryMapProjection = geometry4326.transform('EPSG:4326', this.map.projection);
        if (moveToExtent) {
            this.zoomRoute(geometryMapProjection.getExtent());
        }
        /** @type {?} */
        const geojsonGeom = new OlGeoJSON().writeGeometryObject(geometryMapProjection, {
            featureProjection: this.map.projection,
            dataProjection: this.map.projection
        });
        /** @type {?} */
        const previousRoute = this.routeStore.get('route');
        /** @type {?} */
        const previousRouteRevision = previousRoute ? previousRoute.meta.revision : 0;
        /** @type {?} */
        const routeFeature = {
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
    }
    /**
     * @param {?=} moveToExtent
     * @param {?=} directionsOptions
     * @return {?}
     */
    getRoutes(moveToExtent = false, directionsOptions = {}) {
        this.deleteStoreFeatureByID(this.routeStore, 'vertex');
        this.writeStopsToFormService();
        /** @type {?} */
        const coords = this.directionsFormService.getStopsCoordinates();
        if (coords.length < 2) {
            return;
        }
        /** @type {?} */
        const routeResponse = this.directionsService.route(coords, directionsOptions);
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
                this.changeDetectorRefs.detectChanges();
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
                olobservable.unByKey(key);
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
            const title = translate.instant('igo.geo.directionsForm.dialog.copyTitle');
            /** @type {?} */
            const msg = translate.instant('igo.geo.directionsForm.dialog.copyMsgLink');
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
        let activeRouteDirective = this.languageService.translate.instant('igo.geo.directionsForm.instructions') + ':\n';
        /** @type {?} */
        let wayPointList = '';
        /** @type {?} */
        const summary = this.languageService.translate.instant('igo.geo.directionsForm.summary') +
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
        const url = this.languageService.translate.instant('igo.geo.directionsForm.link') +
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
            const title = translate.instant('igo.geo.directionsForm.dialog.copyTitle');
            /** @type {?} */
            const msg = translate.instant('igo.geo.directionsForm.dialog.copyMsg');
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
            if (this.search$$) {
                this.search$$.unsubscribe();
            }
            /** @type {?} */
            const researches = this.searchService.search(term, { searchType: 'Feature' });
            researches.map((/**
             * @param {?} res
             * @return {?}
             */
            res => this.search$$ =
                res.request.subscribe((/**
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
                                meta: element.meta,
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
                    this.changeDetectorRefs.detectChanges();
                }))));
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
        // this.deleteDirectionsOverlaybyID(this.getStopOverlayID(stopIndex));
        /** @type {?} */
        const id = this.getStopOverlayID(stopIndex);
        this.deleteStoreFeatureByID(this.stopsStore, id);
        this.routeStore.clear();
        /** @type {?} */
        const stopsCounts = this.stops.length;
        this.stops.removeAt(stopIndex);
        this.stops.insert(stopIndex, this.createStop(this.directionsText(stopIndex, stopsCounts)));
        this.routesResults = undefined;
        this.getRoutes();
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
                const line = (new OlGeoJSON()).readFeatures(geom);
                geomCoord = line[0].getGeometry().getFirstCoordinate();
                geomCoord = [geomCoord[0], geomCoord[1]];
            }
            else if (geom.type.search('Polygon') >= 0) {
                /** @type {?} */
                const poly = (new OlGeoJSON()).readFeatures(geom);
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
    }
    /**
     * @param {?} i
     * @return {?}
     */
    focus(i) {
        this.unlistenSingleClick();
        this.currentStopIndex = i;
        this.focusOnStop = true;
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
        if (this.currentStopIndex === undefined) {
            this.addStop();
            indexPos = this.stops.length - 2;
            this.stops.at(indexPos).value.stopProposals = [];
        }
        else {
            indexPos = this.currentStopIndex;
        }
        /** @type {?} */
        const clickCoordinates = olproj.transform(event.coordinate, this.map.projection, this.projection);
        this.stops.at(indexPos).patchValue({ stopProposals: [], stopCoordinates: clickCoordinates });
        this.handleLocationProposals(clickCoordinates, indexPos);
        this.addStopOverlay(clickCoordinates, indexPos);
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.focusOnStop = false; // prevent to trigger map click and Select on routes at same time.
        }), 500);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    geolocateStop(index) {
        moveToOlFeatures(this.map, [this.map.geolocationFeature], FeatureMotion.Move);
        /** @type {?} */
        const geolocateCoordinates = this.map.viewController.getCenter(this.projection);
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
        const directionsText = this.directionsText(index);
        /** @type {?} */
        let stopColor;
        /** @type {?} */
        let stopText;
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
        const geometry = new olgeom.Point(olproj.transform(coordinates, this.projection, this.map.projection));
        /** @type {?} */
        const stopID = this.getStopOverlayID(index);
        /** @type {?} */
        const geojsonGeom = new OlGeoJSON().writeGeometryObject(geometry, {
            featureProjection: this.map.projection,
            dataProjection: this.map.projection
        });
        /** @type {?} */
        const previousStop = this.stopsStore.get(stopID);
        /** @type {?} */
        const previousStopRevision = previousStop ? previousStop.meta.revision : 0;
        /** @type {?} */
        const stopFeature = {
            type: FEATURE,
            geometry: geojsonGeom,
            projection: this.map.projection,
            properties: {
                id: stopID,
                type: 'stop',
                stopText,
                stopColor,
                stopOpacity: 1
            },
            meta: {
                id: stopID,
                revision: previousStopRevision + 1
            },
            ol: new olFeature({ geometry })
        };
        this.stopsStore.update(stopFeature);
        this.getRoutes();
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
        return 'directionsStop_' + txt;
    }
    /**
     * @private
     * @param {?} store
     * @param {?} id
     * @return {?}
     */
    deleteStoreFeatureByID(store, id) {
        /** @type {?} */
        const entity = store.get(id);
        if (entity) {
            store.delete(entity);
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
        const directionsKey = this.route.options.directionsCoordKey;
        /** @type {?} */
        const stopsCoordinates = [];
        if (this.directionsFormService &&
            this.directionsFormService.getStopsCoordinates() &&
            this.directionsFormService.getStopsCoordinates().length !== 0) {
            this.directionsFormService.getStopsCoordinates().forEach((/**
             * @param {?} coord
             * @return {?}
             */
            coord => {
                stopsCoordinates.push(roundCoordTo(coord, 6));
            }));
        }
        /** @type {?} */
        let directionsUrl = '';
        if (stopsCoordinates.length >= 2) {
            directionsUrl = `${directionsKey}=${stopsCoordinates.join(';')}`;
        }
        return `${location.origin}${location.pathname}?tool=directions&${directionsUrl}`;
    }
}
DirectionsFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-directions-form',
                template: "<form class=\"igo-form\" [formGroup]=\"stopsForm\">\r\n  <!-- <div class=\"igo-form-button-group\">\r\n\r\n  </div> -->\r\n  <div #inputs formArrayName=\"stops\" *ngFor=\"let stop of stops.controls; let i = index;\">\r\n    <mat-list-item [formGroupName]=\"i\">\r\n\r\n      <div class=\"igo-input-container\">\r\n        <button *ngIf=\"map.geolocationFeature\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.directionsForm.geolocate' | translate\" (click)=\"geolocateStop(i)\">\r\n          <mat-icon svgIcon=\"crosshairs-gps\"></mat-icon>\r\n        </button>\r\n        <mat-form-field>\r\n          <input matInput formControlName=\"stopPoint\" [matAutocomplete]=\"auto\"\r\n            placeholder=\"{{'igo.geo.directionsForm.'+stop.value.directionsText | translate}}\" (focus)=\"focus(i)\"\r\n            (keyup)=\"keyup(i,$event)\" (keydown.enter)=\"prevent($event)\">\r\n            <button \r\n              mat-button \r\n              *ngIf=\"stop.value && (stop.value.stopPoint.length > 0 || stop.value.stopProposals.length > 0)\"\r\n              matSuffix mat-icon-button color=\"warn\" aria-label=\"Clear\" (click)=\"clearStop(i)\">\r\n              <mat-icon svgIcon=\"close\"></mat-icon>\r\n            </button>\r\n\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-optgroup *ngFor=\"let source of stop.value.stopProposals\" [label]=\"source.source.title\" [disabled]=\"source.source.enabled === false\">\r\n              <mat-option *ngFor=\"let result of source.results\" [value]=\"result.meta ? result.meta.title : ''\" \r\n              (onSelectionChange)=\"chooseProposal(result,i)\"\r\n              matTooltipShowDelay=\"500\" [matTooltip]=\"result.meta ? result.meta.title : ''\">\r\n                {{ result.meta ? result.meta.title : '' }}\r\n              </mat-option>\r\n            </mat-optgroup>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n\r\n        <!-- <div class=\"igo-form-button-group\"> -->\r\n\r\n\r\n          <!-- <button *ngIf=\"i !== 0\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.directionsForm.raiseStop' | translate\"\r\n            [color]=\"color\" (click)=\"raiseStop(i)\">\r\n            <mat-icon svgIcon=\"arrow-upward\"></mat-icon>\r\n          </button>\r\n          <button *ngIf=\"i !== stops.length - 1\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.directionsForm.lowerStop' | translate\"\r\n            [color]=\"color\" (click)=\"lowerStop(i)\">\r\n            <mat-icon svgIcon=\"arrow-downward\"></mat-icon>\r\n          </button> -->\r\n\r\n          <button *ngIf=\"i !== 0 && i !== stops.length - 1\" mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\" [matTooltip]=\"'igo.geo.directionsForm.removeStop' | translate\"\r\n            color=\"warn\" (click)=\"removeStop(i)\">\r\n            <mat-icon svgIcon=\"delete\"></mat-icon>\r\n          </button>\r\n        <!-- </div> -->\r\n      </div>\r\n\r\n    </mat-list-item>\r\n  </div>\r\n  <div class=\"igo-form-button-group\">\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.directionsForm.addStop' | translate\" color=\"primary\" (click)=\"addStop()\">\r\n      <mat-icon svgIcon=\"map-marker-plus\"></mat-icon>\r\n    </button>\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.directionsForm.zoomRoute' | translate\" *ngIf=\"routesResults\" color=\"primary\"\r\n      (click)=\"zoomRoute()\">\r\n      <mat-icon svgIcon=\"magnify-plus-outline\"></mat-icon>\r\n    </button>\r\n    <button mat-icon-button tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.directionsForm.resetDirectionsBtn' | translate\" *ngIf=\"routesResults\" color=\"warn\"\r\n      (click)=\"resetForm()\">\r\n      <mat-icon svgIcon=\"file-restore\"></mat-icon>\r\n    </button>\r\n    <button mat-icon-button *ngIf=\"routesResults\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.directionsForm.copy' | translate\" color=\"primary\" (click)=\"copyDirectionsToClipboard()\">\r\n      <mat-icon svgIcon=\"content-copy\"></mat-icon>\r\n    </button>\r\n    <button mat-icon-button *ngIf=\"routesResults\" tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.directionsForm.link' | translate\" color=\"primary\" (click)=\"copyLinkToClipboard()\">\r\n      <mat-icon svgIcon=\"link\"></mat-icon>\r\n    </button>\r\n  </div>\r\n\r\n</form>\r\n\r\n<div class=\"igo-input-container\" *ngIf=\"routesResults\">\r\n  <mat-form-field *ngIf=\"routesResults && routesResults.length > 1\">\r\n    <mat-select placeholder=\"{{'igo.geo.directionsForm.drivingOptions' | translate}}\" (selectionChange)=\"changeRoute()\" [(ngModel)]=\"activeRoute\">\r\n      <mat-option *ngFor=\"let pathDirections of routesResults; let cnt = index;\" [value]=\"pathDirections\">\r\n        Option {{cnt + 1}} : {{formatDistance(pathDirections.distance)}} ({{formatDuration(pathDirections.duration)}})\r\n      </mat-option>\r\n    </mat-select>\r\n  </mat-form-field>\r\n\r\n  <mat-divider *ngIf=\"routesResults && routesResults.length === 0\"></mat-divider>\r\n\r\n  <mat-list>\r\n    <h2 mat-header class=\"igo-route-title mat-typography\">{{activeRoute.title}}</h2>\r\n    <h2 mat-subheader>{{formatDistance(activeRoute.distance)}}, {{formatDuration(activeRoute.duration)}}</h2>\r\n\r\n    <mat-list-item \r\n    class=\"igo-steps\"\r\n    (mouseenter)=\"showSegment(step)\" \r\n    (click)=\"showSegment(step,true)\" \r\n    *ngFor=\"let step of activeRoute.steps; let cnt = index;\"\r\n      igoListItem>\r\n      <mat-icon [ngClass]=\"formatStep(step,cnt).cssClass\" mat-list-icon svgIcon=\"{{formatStep(step,cnt).image}}\"></mat-icon>\r\n\r\n      <h4 mat-line>{{cnt +1}}. {{formatStep(step,cnt).instruction}}</h4>\r\n      <h4 mat-line class=\"right\">{{formatDistance(step.distance)}}</h4>\r\n    </mat-list-item>\r\n\r\n    <mat-divider></mat-divider>\r\n\r\n  </mat-list>\r\n\r\n</div>\r\n",
                styles: ["mat-form-field{width:85%}.igo-route-title{font-weight:700}.igo-steps{cursor:pointer}form{padding:10px}h3{padding-left:5px;padding-right:5px}.mat-line{word-wrap:break-word!important;white-space:pre-wrap!important}.mat-line.right{text-align:right}.rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.rotate-45{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.rotate-250{-webkit-transform:rotate(250deg);transform:rotate(250deg)}.rotate-290{-webkit-transform:rotate(290deg);transform:rotate(290deg)}.icon-flipped{-webkit-transform:scaleY(-1);transform:scaleY(-1)}"]
            }] }
];
/** @nocollapse */
DirectionsFormComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: DirectionsService },
    { type: LanguageService },
    { type: MessageService },
    { type: SearchService },
    { type: QueryService },
    { type: DirectionsFormService },
    { type: ChangeDetectorRef },
    { type: RouteService, decorators: [{ type: Optional }] }
];
DirectionsFormComponent.propDecorators = {
    term: [{ type: Input }],
    debounce: [{ type: Input }],
    length: [{ type: Input }],
    map: [{ type: Input }],
    stopsStore: [{ type: Input }],
    routeStore: [{ type: Input }],
    submit: [{ type: Output }]
};
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
    const vertexStyle = [
        new olstyle.Style({
            geometry: feature.getGeometry(),
            image: new olstyle.Circle({
                radius: 7,
                stroke: new olstyle.Stroke({ color: '#FF0000', width: 3 })
            })
        })
    ];
    /** @type {?} */
    const stopStyle = new olstyle.Style({
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
    const routeStyle = [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3Rpb25zL2RpcmVjdGlvbnMtZm9ybS9kaXJlY3Rpb25zLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdaLFFBQVEsRUFDUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFdBQVcsRUFBRSxVQUFVLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvRSxPQUFPLEVBQWdCLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxRixPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxLQUFLLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEtBQUssYUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sS0FBSyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBRTlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUVMLGVBQWUsRUFDZixjQUFjLEVBQ2QsWUFBWSxFQUNiLE1BQU0sWUFBWSxDQUFDO0FBQ3BCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFOUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxN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SSxVQUFVLEdBQUc7UUFDakIsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO1NBQzNFLENBQUM7UUFDRixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDaEIsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDMUUsQ0FBQztLQUNIO0lBRUQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLE1BQU0sRUFBRTtRQUNsQyxPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUNELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDcEMsT0FBTyxXQUFXLENBQUM7S0FDcEI7SUFDRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssT0FBTyxFQUFFO1FBQ25DLE9BQU8sVUFBVSxDQUFDO0tBQ25CO0FBRUgsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPcHRpb25hbCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzLCBGb3JtQXJyYXkgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHRha2UsIHNraXBXaGlsZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XHJcbmltcG9ydCBPbEdlb0pTT04gZnJvbSAnb2wvZm9ybWF0L0dlb0pTT04nO1xyXG5pbXBvcnQgKiBhcyBvbGdlb20gZnJvbSAnb2wvZ2VvbSc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0ICogYXMgb2xzdHlsZSBmcm9tICdvbC9zdHlsZSc7XHJcbmltcG9ydCAqIGFzIG9sY29uZGl0aW9uIGZyb20gJ29sL2V2ZW50cy9jb25kaXRpb24nO1xyXG5pbXBvcnQgKiBhcyBvbGludGVyYWN0aW9uIGZyb20gJ29sL2ludGVyYWN0aW9uJztcclxuaW1wb3J0ICogYXMgb2xvYnNlcnZhYmxlIGZyb20gJ29sL09ic2VydmFibGUnO1xyXG5cclxuaW1wb3J0IHsgQ2xpcGJvYXJkIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQge1xyXG4gIE1lc3NhZ2UsXHJcbiAgTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gIE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIFJvdXRlU2VydmljZVxyXG59IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBnZXRFbnRpdHlUaXRsZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZWFyY2gvc2hhcmVkL3NlYXJjaC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVmVjdG9yTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL3ZlY3Rvci1sYXllcic7XHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZmVhdHVyZS1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgRmVhdHVyZU1vdGlvbiwgRkVBVFVSRSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuZW51bXMnO1xyXG5pbXBvcnQgeyBtb3ZlVG9PbEZlYXR1cmVzLCB0cnlCaW5kU3RvcmVMYXllciwgdHJ5QWRkTG9hZGluZ1N0cmF0ZWd5IH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS51dGlscyc7XHJcblxyXG5pbXBvcnQgeyBEaXJlY3Rpb25zLCBEaXJlY3Rpb25zT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9kaXJlY3Rpb25zLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERpcmVjdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2RpcmVjdGlvbnMuc2VydmljZSc7XHJcbmltcG9ydCB7IERpcmVjdGlvbnNGb3JtU2VydmljZSB9IGZyb20gJy4vZGlyZWN0aW9ucy1mb3JtLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgUXVlcnlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcXVlcnkvc2hhcmVkL3F1ZXJ5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9zdG9yZSc7XHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3kgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9zdHJhdGVnaWVzL2xvYWRpbmcnO1xyXG5pbXBvcnQgeyByb3VuZENvb3JkVG8gfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcC51dGlscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1kaXJlY3Rpb25zLWZvcm0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kaXJlY3Rpb25zLWZvcm0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2RpcmVjdGlvbnMtZm9ybS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaXJlY3Rpb25zRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGludmFsaWRLZXlzID0gWydDb250cm9sJywgJ1NoaWZ0JywgJ0FsdCddO1xyXG5cclxuICBwdWJsaWMgc3RvcHNGb3JtOiBGb3JtR3JvdXA7XHJcbiAgcHVibGljIHByb2plY3Rpb24gPSAnRVBTRzo0MzI2JztcclxuICBwdWJsaWMgY3VycmVudFN0b3BJbmRleDogbnVtYmVyO1xyXG4gIHByaXZhdGUgcm91dGVzUXVlcmllcyQkOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG4gIHByaXZhdGUgc2VhcmNoJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBzdHJlYW0kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG5cclxuICBwdWJsaWMgcm91dGVzUmVzdWx0czogRGlyZWN0aW9uc1tdIHwgTWVzc2FnZVtdO1xyXG4gIHB1YmxpYyBhY3RpdmVSb3V0ZTogRGlyZWN0aW9ucztcclxuICBwcml2YXRlIGxhc3RUaW1lb3V0UmVxdWVzdDtcclxuXHJcbiAgcHJpdmF0ZSBmb2N1c09uU3RvcCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgZm9jdXNLZXkgPSBbXTtcclxuICBwdWJsaWMgaW5pdGlhbFN0b3BzQ29vcmRzO1xyXG4gIHByaXZhdGUgYnJvd3Nlckxhbmd1YWdlO1xyXG5cclxuICBASW5wdXQoKSB0ZXJtOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpIGRlYm91bmNlOiBudW1iZXIgPSAyMDA7XHJcblxyXG4gIEBJbnB1dCgpIGxlbmd0aDogbnVtYmVyID0gMjtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzdG9wcyBzdG9yZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3BzU3RvcmU6IEZlYXR1cmVTdG9yZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHJvdXRlIGFuZCB2ZXJ0ZXggc3RvcmVcclxuICAgKi9cclxuICBASW5wdXQoKSByb3V0ZVN0b3JlOiBGZWF0dXJlU3RvcmU7XHJcblxyXG4gIEBPdXRwdXQoKSBzdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXHJcbiAgICBwcml2YXRlIGRpcmVjdGlvbnNTZXJ2aWNlOiBEaXJlY3Rpb25zU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcclxuICAgIHByaXZhdGUgcXVlcnlTZXJ2aWNlOiBRdWVyeVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGRpcmVjdGlvbnNGb3JtU2VydmljZTogRGlyZWN0aW9uc0Zvcm1TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZnM6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZTogUm91dGVTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBjaGFuZ2VSb3V0ZSgpIHtcclxuICAgIHRoaXMuc2hvd1JvdXRlR2VvbWV0cnkoKTtcclxuICB9XHJcblxyXG4gIHByZXZlbnQoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgdGhpcy5xdWVyeVNlcnZpY2UucXVlcnlFbmFibGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmZvY3VzT25TdG9wID0gZmFsc2U7XHJcbiAgICB0aGlzLmJyb3dzZXJMYW5ndWFnZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLmdldExhbmd1YWdlKCk7XHJcbiAgICB0aGlzLnN0b3BzRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICBkaXJlY3Rpb25zVHlwZTogJ2NhcicsXHJcbiAgICAgIGRpcmVjdGlvbnNNb2RlOiAnZHJpdmluZycsIC8vIGxvb3BcclxuICAgICAgc3RvcE9yZGVyUHJpb3JpdHk6IHRydWUsXHJcbiAgICAgIGRpcmVjdGlvbnNGaXhlZFN0YXJ0RW5kOiBmYWxzZSxcclxuICAgICAgc3RvcHM6IHRoaXMuZm9ybUJ1aWxkZXIuYXJyYXkoW1xyXG4gICAgICAgIHRoaXMuY3JlYXRlU3RvcCgnc3RhcnQnKSxcclxuICAgICAgICB0aGlzLmNyZWF0ZVN0b3AoJ2VuZCcpXHJcbiAgICAgIF0pXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZGlyZWN0aW9uc0Zvcm1TZXJ2aWNlLmdldFN0b3BzKCkpIHtcclxuICAgICAgdGhpcy5tYXAuc3RhdHVzJC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25hbEluaXQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbmRpdGlvbmFsSW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29uZGl0aW9uYWxJbml0KCkge1xyXG4gICAgdGhpcy5pbml0U3RvcmVzKCk7XHJcbiAgICB0aGlzLmluaXRPbEludGVyYWN0aW9uKCk7XHJcbiAgICB0aGlzLnN1YnNjcmliZVRvRm9ybUNoYW5nZSgpO1xyXG5cclxuICAgIHRoaXMucm91dGVzUXVlcmllcyQkLnB1c2goXHJcbiAgICAgIHRoaXMuc3RyZWFtJFxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgZGVib3VuY2VUaW1lKHRoaXMuZGVib3VuY2UpLFxyXG4gICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxyXG4gICAgICAgIClcclxuICAgICAgICAuc3Vic2NyaWJlKCh0ZXJtOiBzdHJpbmcpID0+IHRoaXMuaGFuZGxlVGVybUNoYW5nZWQodGVybSkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlUm91dGVzUXVlcmllcygpO1xyXG4gICAgdGhpcy51bmxpc3RlblNpbmdsZUNsaWNrKCk7XHJcbiAgICB0aGlzLnF1ZXJ5U2VydmljZS5xdWVyeUVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5mcmVlemVTdG9yZXMoKTtcclxuICAgIHRoaXMud3JpdGVTdG9wc1RvRm9ybVNlcnZpY2UoKTtcclxuXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRTdG9yZXMoKSB7XHJcblxyXG4gICAgY29uc3QgbG9hZGluZ1N0cmF0ZWd5ID0gbmV3IEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSh7bW90aW9uOiBGZWF0dXJlTW90aW9uLk5vbmV9KTtcclxuXHJcbiAgICAvLyBTVE9QIFNUT1JFXHJcbiAgICBjb25zdCBzdG9wc1N0b3JlID0gdGhpcy5zdG9wc1N0b3JlO1xyXG4gICAgY29uc3Qgc3RvcHNMYXllciA9IG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICAgIHRpdGxlOiAnRGlyZWN0aW9ucyAtIHN0b3BzJyxcclxuICAgICAgekluZGV4OiA5MTEsXHJcbiAgICAgIHNvdXJjZTogbmV3IEZlYXR1cmVEYXRhU291cmNlKCksXHJcbiAgICAgIHNob3dJbkxheWVyTGlzdDogZmFsc2UsXHJcbiAgICAgIGV4cG9ydGFibGU6IGZhbHNlLFxyXG4gICAgICBicm93c2FibGU6IGZhbHNlLFxyXG4gICAgICBzdHlsZTogc3RvcE1hcmtlclxyXG4gICAgfSk7XHJcbiAgICB0cnlCaW5kU3RvcmVMYXllcihzdG9wc1N0b3JlLCBzdG9wc0xheWVyKTtcclxuICAgIHRyeUFkZExvYWRpbmdTdHJhdGVneShzdG9wc1N0b3JlLCBsb2FkaW5nU3RyYXRlZ3kpO1xyXG5cclxuICAgIC8vIFJPVVRFIEFORCBWRVJURVggU1RPUkVcclxuICAgIGNvbnN0IHJvdXRlU3RvcmUgPSB0aGlzLnJvdXRlU3RvcmU7XHJcbiAgICBjb25zdCByb3V0ZUxheWVyID0gbmV3IFZlY3RvckxheWVyKHtcclxuICAgICAgdGl0bGU6ICdEaXJlY3Rpb25zIC0gcm91dGUgYW5kIHZlcnRleCcsXHJcbiAgICAgIHpJbmRleDogOTEwLFxyXG4gICAgICBzb3VyY2U6IG5ldyBGZWF0dXJlRGF0YVNvdXJjZSgpLFxyXG4gICAgICBzaG93SW5MYXllckxpc3Q6IGZhbHNlLFxyXG4gICAgICBleHBvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgYnJvd3NhYmxlOiBmYWxzZSxcclxuICAgICAgc3R5bGU6IHN0b3BNYXJrZXJcclxuICAgIH0pO1xyXG4gICAgdHJ5QmluZFN0b3JlTGF5ZXIocm91dGVTdG9yZSwgcm91dGVMYXllcik7XHJcbiAgICB0cnlBZGRMb2FkaW5nU3RyYXRlZ3kocm91dGVTdG9yZSwgbG9hZGluZ1N0cmF0ZWd5KTtcclxuXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRPbEludGVyYWN0aW9uKCkge1xyXG4gICAgbGV0IHNlbGVjdGVkU3RvcEZlYXR1cmU7XHJcbiAgICBjb25zdCBzZWxlY3RTdG9wID0gbmV3IG9saW50ZXJhY3Rpb24uU2VsZWN0KHtcclxuICAgICAgbGF5ZXJzOiBbdGhpcy5zdG9wc1N0b3JlLmxheWVyLm9sXSxcclxuICAgICAgY29uZGl0aW9uOiBvbGNvbmRpdGlvbi5wb2ludGVyTW92ZSxcclxuICAgICAgaGl0VG9sZXJhbmNlOiA3LFxyXG4gICAgICBmaWx0ZXI6IChmZWF0dXJlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZlYXR1cmUuZ2V0KCd0eXBlJykgPT09ICdzdG9wJztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgc2VsZWN0U3RvcC5vbignc2VsZWN0JywgZXZ0ID0+IHtcclxuICAgICAgc2VsZWN0ZWRTdG9wRmVhdHVyZSA9IGV2dC50YXJnZXQuZ2V0RmVhdHVyZXMoKVswXTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRyYW5zbGF0ZVN0b3AgPSBuZXcgb2xpbnRlcmFjdGlvbi5UcmFuc2xhdGUoe1xyXG4gICAgICBsYXllcnM6IFt0aGlzLnN0b3BzU3RvcmUubGF5ZXIub2xdLFxyXG4gICAgICBmZWF0dXJlczogc2VsZWN0ZWRTdG9wRmVhdHVyZVxyXG4gICAgICAvLyBUT0RPIEluIE9wZW5sYXllcnMgPj0gNi54LCBmaWx0ZXIgaXMgbm93IGFsbG93ZWQuXHJcbiAgICB9KTtcclxuXHJcbiAgICB0cmFuc2xhdGVTdG9wLm9uKCd0cmFuc2xhdGluZycsIGV2dCA9PiB7XHJcbiAgICAgIGNvbnN0IGZlYXR1cmVzID0gZXZ0LmZlYXR1cmVzO1xyXG4gICAgICBpZiAoZmVhdHVyZXMuZ2V0TGVuZ3RoKCkgPT09IDApIHsgcmV0dXJuOyB9XHJcbiAgICAgIHRoaXMuZXhlY3V0ZVRyYW5zbGF0aW9uKGZlYXR1cmVzLCBmYWxzZSwgNTAsIHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdHJhbnNsYXRlU3RvcC5vbigndHJhbnNsYXRlZW5kJywgZXZ0ID0+IHtcclxuICAgICAgY29uc3QgZmVhdHVyZXMgPSBldnQuZmVhdHVyZXM7XHJcbiAgICAgIGlmIChmZWF0dXJlcy5nZXRMZW5ndGgoKSA9PT0gMCkgeyByZXR1cm47IH1cclxuICAgICAgdGhpcy5leGVjdXRlVHJhbnNsYXRpb24oZmVhdHVyZXMsIHRydWUsIDAsIGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHNlbGVjdGVkUm91dGUgPSBuZXcgb2xpbnRlcmFjdGlvbi5TZWxlY3Qoe1xyXG4gICAgICBsYXllcnM6IFt0aGlzLnJvdXRlU3RvcmUubGF5ZXIub2xdLFxyXG4gICAgICBjb25kaXRpb246IG9sY29uZGl0aW9uLmNsaWNrLFxyXG4gICAgICBoaXRUb2xlcmFuY2U6IDcsXHJcbiAgICAgIGZpbHRlcjogKGZlYXR1cmUpID0+IHtcclxuICAgICAgICByZXR1cm4gZmVhdHVyZS5nZXRJZCgpID09PSAncm91dGUnO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHNlbGVjdGVkUm91dGUub24oJ3NlbGVjdCcsIGV2dCA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmZvY3VzT25TdG9wID09PSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdENvb3JkaW5hdGVzID0gb2xwcm9qLnRyYW5zZm9ybShcclxuICAgICAgICAgIChldnQgYXMgYW55KS5tYXBCcm93c2VyRXZlbnQuY29vcmRpbmF0ZSxcclxuICAgICAgICAgIHRoaXMubWFwLnByb2plY3Rpb24sXHJcbiAgICAgICAgICB0aGlzLnByb2plY3Rpb25cclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuYWRkU3RvcCgpO1xyXG4gICAgICAgIGNvbnN0IHBvcyA9IHRoaXMuc3RvcHMubGVuZ3RoIC0gMjtcclxuICAgICAgICB0aGlzLnN0b3BzLmF0KHBvcykucGF0Y2hWYWx1ZSh7IHN0b3BDb29yZGluYXRlczogc2VsZWN0Q29vcmRpbmF0ZXMgfSk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVMb2NhdGlvblByb3Bvc2FscyhzZWxlY3RDb29yZGluYXRlcywgcG9zKTtcclxuICAgICAgICB0aGlzLmFkZFN0b3BPdmVybGF5KHNlbGVjdENvb3JkaW5hdGVzLCBwb3MpO1xyXG4gICAgICAgIHNlbGVjdGVkUm91dGUuZ2V0RmVhdHVyZXMoKS5jbGVhcigpO1xyXG4gICAgICB9XHJcbiAgICAgIHNlbGVjdGVkUm91dGUuZ2V0RmVhdHVyZXMoKS5jbGVhcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5tYXAub2wuYWRkSW50ZXJhY3Rpb24oc2VsZWN0U3RvcCk7XHJcbiAgICB0aGlzLm1hcC5vbC5hZGRJbnRlcmFjdGlvbih0cmFuc2xhdGVTdG9wKTtcclxuICAgIHRoaXMubWFwLm9sLmFkZEludGVyYWN0aW9uKHNlbGVjdGVkUm91dGUpO1xyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9Gb3JtQ2hhbmdlKCkge1xyXG4gICAgdGhpcy5yb3V0ZXNRdWVyaWVzJCQucHVzaChcclxuICAgICAgdGhpcy5zdG9wc0Zvcm0udmFsdWVDaGFuZ2VzXHJcbiAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKHRoaXMuZGVib3VuY2UpKVxyXG4gICAgICAgIC5zdWJzY3JpYmUodmFsID0+IHtcclxuICAgICAgICAgIHRoaXMud3JpdGVTdG9wc1RvRm9ybVNlcnZpY2UoKTtcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZyZWV6ZSBhbnkgc3RvcmUsIG1lYW5pbmcgdGhlIGxheWVyIGlzIHJlbW92ZWQsIHN0cmF0ZWdpZXMgYXJlIGRlYWN0aXZhdGVkXHJcbiAgICogYW5kIHNvbWUgbGlzdGVuZXIgcmVtb3ZlZFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZnJlZXplU3RvcmVzKCkge1xyXG4gICAgY29uc3Qgc3RvcHNTdG9yZSA9IHRoaXMuc3RvcHNTdG9yZTtcclxuICAgIGNvbnN0IHJvdXRlU3RvcmUgPSB0aGlzLnJvdXRlU3RvcmU7XHJcblxyXG4gICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIoc3RvcHNTdG9yZS5sYXllcik7XHJcbiAgICB0aGlzLm1hcC5yZW1vdmVMYXllcihyb3V0ZVN0b3JlLmxheWVyKTtcclxuICAgIHN0b3BzU3RvcmUuZGVhY3RpdmF0ZVN0cmF0ZWd5T2ZUeXBlKEZlYXR1cmVTdG9yZUxvYWRpbmdTdHJhdGVneSk7XHJcbiAgICByb3V0ZVN0b3JlLmRlYWN0aXZhdGVTdHJhdGVneU9mVHlwZShGZWF0dXJlU3RvcmVMb2FkaW5nU3RyYXRlZ3kpO1xyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXhlY3V0ZVRyYW5zbGF0aW9uKFxyXG4gICAgZmVhdHVyZXMsXHJcbiAgICByZXZlcnNlU2VhcmNoUHJvcG9zYWwgPSBmYWxzZSxcclxuICAgIGRlbGF5OiBudW1iZXIgPSAwLFxyXG4gICAgb3ZlcnZpZXc6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgdGhpcy5yb3V0ZVN0b3JlLmNsZWFyKCk7XHJcbiAgICBjb25zdCBmaXJzdEZlYXR1cmUgPSBmZWF0dXJlcy5nZXRBcnJheSgpWzBdO1xyXG4gICAgY29uc3QgdHJhbnNsYXRlZElEID0gZmlyc3RGZWF0dXJlLmdldElkKCk7XHJcbiAgICBjb25zdCB0cmFuc2xhdGVkUG9zID0gdHJhbnNsYXRlZElELnNwbGl0KCdfJyk7XHJcbiAgICBsZXQgcDtcclxuICAgIHN3aXRjaCAodHJhbnNsYXRlZFBvc1sxXSkge1xyXG4gICAgICBjYXNlICdzdGFydCc6XHJcbiAgICAgICAgcCA9IDA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2VuZCc6XHJcbiAgICAgICAgcCA9IHRoaXMuc3RvcHMubGVuZ3RoIC0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBwID0gTnVtYmVyKHRyYW5zbGF0ZWRQb3NbMV0pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdHJhbnNsYXRpb25Db29yZGluYXRlcyA9IG9scHJvai50cmFuc2Zvcm0oXHJcbiAgICAgIGZpcnN0RmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldENvb3JkaW5hdGVzKCksXHJcbiAgICAgIHRoaXMubWFwLnByb2plY3Rpb24sXHJcbiAgICAgIHRoaXMucHJvamVjdGlvblxyXG4gICAgKTtcclxuICAgIHRoaXMuc3RvcHNcclxuICAgICAgLmF0KHApXHJcbiAgICAgIC5wYXRjaFZhbHVlKHsgc3RvcENvb3JkaW5hdGVzOiB0cmFuc2xhdGlvbkNvb3JkaW5hdGVzLCBzdG9wUHJvcG9zYWxzOiBbXSB9KTtcclxuICAgIGlmIChyZXZlcnNlU2VhcmNoUHJvcG9zYWwpIHtcclxuICAgICAgdGhpcy5oYW5kbGVMb2NhdGlvblByb3Bvc2Fscyh0cmFuc2xhdGlvbkNvb3JkaW5hdGVzLCBwKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkaXJlY3Rpb25zT3B0aW9ucyA9IHtcclxuICAgICAgc3RlcHM6IHRydWUsXHJcbiAgICAgIG92ZXJ2aWV3OiBmYWxzZSxcclxuICAgICAgYWx0ZXJuYXRpdmVzOiB0cnVlXHJcbiAgICB9IGFzIERpcmVjdGlvbnNPcHRpb25zO1xyXG5cclxuICAgIGlmIChvdmVydmlldykge1xyXG4gICAgICBkaXJlY3Rpb25zT3B0aW9ucy5vdmVydmlldyA9IHRydWU7XHJcbiAgICAgIGRpcmVjdGlvbnNPcHRpb25zLnN0ZXBzID0gZmFsc2U7XHJcbiAgICAgIGRpcmVjdGlvbnNPcHRpb25zLmFsdGVybmF0aXZlcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkZWxheSA+IDApIHtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmxhc3RUaW1lb3V0UmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gY2FuY2VsIHRpbWVvdXQgd2hlbiB0aGUgbW91c2UgbW92ZXNcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5sYXN0VGltZW91dFJlcXVlc3QpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGFzdFRpbWVvdXRSZXF1ZXN0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5nZXRSb3V0ZXModW5kZWZpbmVkLCBkaXJlY3Rpb25zT3B0aW9ucyk7XHJcbiAgICAgIH0sIGRlbGF5KTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5sYXN0VGltZW91dFJlcXVlc3QpO1xyXG4gICAgICB0aGlzLmdldFJvdXRlcyh1bmRlZmluZWQsIGRpcmVjdGlvbnNPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBoYW5kbGVMb2NhdGlvblByb3Bvc2Fscyhjb29yZGluYXRlczogW251bWJlciwgbnVtYmVyXSwgc3RvcEluZGV4OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGdyb3VwZWRMb2NhdGlvbnMgPSBbXTtcclxuICAgIGNvbnN0IHJvdW5kZWRDb29yZGluYXRlcyA9IFtjb29yZGluYXRlc1swXS50b0ZpeGVkKDUpLCBjb29yZGluYXRlc1sxXS50b0ZpeGVkKDUpXTtcclxuICAgIHRoaXMuc3RvcHMuYXQoc3RvcEluZGV4KS5wYXRjaFZhbHVlKHsgc3RvcFBvaW50OiByb3VuZGVkQ29vcmRpbmF0ZXMuam9pbignLCcpIH0pO1xyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlXHJcbiAgICAgIC5yZXZlcnNlU2VhcmNoKGNvb3JkaW5hdGVzLCB7IHpvb206IHRoaXMubWFwLnZpZXdDb250cm9sbGVyLmdldFpvb20oKSB9KVxyXG4gICAgICAubWFwKHJlcyA9PlxyXG4gICAgICAgIHRoaXMucm91dGVzUXVlcmllcyQkLnB1c2goXHJcbiAgICAgICAgICByZXMucmVxdWVzdC5waXBlKG1hcChmID0+IGYpKS5zdWJzY3JpYmUocmVzdWx0cyA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdHMuZm9yRWFjaChyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGdyb3VwZWRMb2NhdGlvbnMuZmlsdGVyKGYgPT4gZi5zb3VyY2UgPT09IHJlc3VsdC5zb3VyY2UpXHJcbiAgICAgICAgICAgICAgICAgIC5sZW5ndGggPT09IDBcclxuICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGdyb3VwZWRMb2NhdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgIHNvdXJjZTogcmVzdWx0LnNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgcmVzdWx0czogcmVzdWx0cy5tYXAociA9PiByLmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BzXHJcbiAgICAgICAgICAgICAgLmF0KHN0b3BJbmRleClcclxuICAgICAgICAgICAgICAucGF0Y2hWYWx1ZSh7IHN0b3BQcm9wb3NhbHM6IGdyb3VwZWRMb2NhdGlvbnMgfSk7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IFByZWZlciBhbm90aGVyIHNvdXJjZT9cclxuICAgICAgICAgICAgaWYgKHJlc3VsdHNbMF0pIHtcclxuICAgICAgICAgICAgICBpZiAocmVzdWx0c1swXS5zb3VyY2UuZ2V0SWQoKSA9PT0gJ2ljaGVyY2hlcmV2ZXJzZScpIHtcclxuICAgICAgICAgICAgICAgIC8vIHByZWZlciBhZGRyZXNzIHR5cGUuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0UG9zID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBmZWF0dXJlOiBhbnkgPSByZXN1bHRzW2ldLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMudHlwZSA9PT0gJ2FkcmVzc2VzJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFBvcyA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcHMuYXQoc3RvcEluZGV4KS5wYXRjaFZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgc3RvcFBvaW50OiBnZXRFbnRpdHlUaXRsZShyZXN1bHRzW3Jlc3VsdFBvc10pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzW3Jlc3VsdFBvc10uZGF0YS5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcHMuYXQoc3RvcEluZGV4KS5wYXRjaFZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9wQ29vcmRpbmF0ZXM6XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzW3Jlc3VsdFBvc10uZGF0YS5nZW9tZXRyeS5jb29yZGluYXRlc1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIE5vdCBtb3ZpbmcgdGhlIHRyYW5zbGF0ZWQgcG9pbnQgT25seSB0byBzdWdnZXN0IHZhbHVlIGludG8gdGhlIFVJLlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0c1swXS5zb3VyY2UuZ2V0SWQoKSA9PT0gJ2Nvb3JkaW5hdGVzcmV2ZXJzZScpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcHMuYXQoc3RvcEluZGV4KS5wYXRjaFZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgc3RvcFBvaW50OiBbXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1swXS5kYXRhLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdLnRvRml4ZWQoNSksXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0c1swXS5kYXRhLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdLnRvRml4ZWQoNSlcclxuICAgICAgICAgICAgICAgICAgXS5qb2luKCcsJylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdHNbMF0uZGF0YS5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcHMuYXQoc3RvcEluZGV4KS5wYXRjaFZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9wQ29vcmRpbmF0ZXM6XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzWzBdLmRhdGEuZ2VvbWV0cnkuY29vcmRpbmF0ZXNcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAvLyBOb3QgbW92aW5nIHRoZSB0cmFuc2xhdGVkIHBvaW50IE9ubHkgdG8gc3VnZ2VzdCB2YWx1ZSBpbnRvIHRoZSBVSS5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zdG9wcy5hdChzdG9wSW5kZXgpLnBhdGNoVmFsdWUoeyBzdG9wUG9pbnQ6IHJvdW5kZWRDb29yZGluYXRlcy5qb2luKCcsJyksIHN0b3BQcm9wb3NhbHM6IFtdIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWZzLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgZGlyZWN0aW9uc1RleHQoaW5kZXg6IG51bWJlciwgc3RvcHNDb3VudHMgPSB0aGlzLnN0b3BzLmxlbmd0aCk6IHN0cmluZyB7XHJcbiAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgcmV0dXJuICdzdGFydCc7XHJcbiAgICB9IGVsc2UgaWYgKGluZGV4ID09PSBzdG9wc0NvdW50cyAtIDEgfHwgc3RvcHNDb3VudHMgPT09IDEpIHtcclxuICAgICAgcmV0dXJuICdlbmQnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICdpbnRlcm1lZGlhdGUnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmFpc2VTdG9wKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChpbmRleCA+IDApIHtcclxuICAgICAgdGhpcy5tb3ZlU3RvcChpbmRleCwgLTEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG93ZXJTdG9wKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChpbmRleCA8IHRoaXMuc3RvcHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICB0aGlzLm1vdmVTdG9wKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgbW92ZVN0b3AoaW5kZXgsIGRpZmYpIHtcclxuICAgIGNvbnN0IGZyb21WYWx1ZSA9IHRoaXMuc3RvcHMuYXQoaW5kZXgpO1xyXG4gICAgdGhpcy5yZW1vdmVTdG9wKGluZGV4KTtcclxuICAgIHRoaXMuc3RvcHMuaW5zZXJ0KGluZGV4ICsgZGlmZiwgZnJvbVZhbHVlKTtcclxuICAgIHRoaXMuc3RvcHMuYXQoaW5kZXgpLnBhdGNoVmFsdWUoeyBkaXJlY3Rpb25zVGV4dDogdGhpcy5kaXJlY3Rpb25zVGV4dChpbmRleCkgfSk7XHJcbiAgICB0aGlzLnN0b3BzXHJcbiAgICAgIC5hdChpbmRleCArIGRpZmYpXHJcbiAgICAgIC5wYXRjaFZhbHVlKHsgZGlyZWN0aW9uc1RleHQ6IHRoaXMuZGlyZWN0aW9uc1RleHQoaW5kZXggKyBkaWZmKSB9KTtcclxuICAgIGlmICh0aGlzLnN0b3BzLmF0KGluZGV4KS52YWx1ZS5zdG9wQ29vcmRpbmF0ZXMpIHtcclxuICAgICAgdGhpcy5hZGRTdG9wT3ZlcmxheSh0aGlzLnN0b3BzLmF0KGluZGV4KS52YWx1ZS5zdG9wQ29vcmRpbmF0ZXMsIGluZGV4KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnN0b3BzLmF0KGluZGV4ICsgZGlmZikudmFsdWUuc3RvcENvb3JkaW5hdGVzKSB7XHJcbiAgICAgIHRoaXMuYWRkU3RvcE92ZXJsYXkoXHJcbiAgICAgICAgdGhpcy5zdG9wcy5hdChpbmRleCArIGRpZmYpLnZhbHVlLnN0b3BDb29yZGluYXRlcyxcclxuICAgICAgICBpbmRleCArIGRpZmZcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBzdG9wcygpOiBGb3JtQXJyYXkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcHNGb3JtLmdldCgnc3RvcHMnKSBhcyBGb3JtQXJyYXk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgd3JpdGVTdG9wc1RvRm9ybVNlcnZpY2UoKSB7XHJcbiAgICBjb25zdCBzdG9wcyA9IFtdO1xyXG4gICAgdGhpcy5zdG9wcy52YWx1ZS5mb3JFYWNoKHN0b3AgPT4ge1xyXG4gICAgICBpZiAoc3RvcC5zdG9wQ29vcmRpbmF0ZXMgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIHN0b3BzLnB1c2goc3RvcCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5kaXJlY3Rpb25zRm9ybVNlcnZpY2Uuc2V0U3RvcHMoc3RvcHMpO1xyXG4gIH1cclxuXHJcbiAgYWRkU3RvcCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGluc2VydEluZGV4ID0gdGhpcy5zdG9wcy5sZW5ndGggLSAxO1xyXG4gICAgdGhpcy5zdG9wcy5pbnNlcnQoaW5zZXJ0SW5kZXgsIHRoaXMuY3JlYXRlU3RvcCgpKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVN0b3AoZGlyZWN0aW9uc1BvcyA9ICdpbnRlcm1lZGlhdGUnKTogRm9ybUdyb3VwIHtcclxuICAgIHJldHVybiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgc3RvcFBvaW50OiBbJyddLFxyXG4gICAgICBzdG9wUHJvcG9zYWxzOiBbW11dLFxyXG4gICAgICBkaXJlY3Rpb25zVGV4dDogZGlyZWN0aW9uc1BvcyxcclxuICAgICAgc3RvcENvb3JkaW5hdGVzOiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlU3RvcChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0U3RvcE92ZXJsYXlJRChpbmRleCk7XHJcbiAgICB0aGlzLmRlbGV0ZVN0b3JlRmVhdHVyZUJ5SUQodGhpcy5zdG9wc1N0b3JlLCBpZCk7XHJcbiAgICB0aGlzLnN0b3BzLnJlbW92ZUF0KGluZGV4KTtcclxuICAgIGxldCBjbnQgPSAwO1xyXG4gICAgdGhpcy5zdG9wcy52YWx1ZS5mb3JFYWNoKHN0b3AgPT4ge1xyXG4gICAgICB0aGlzLnN0b3BzLmF0KGNudCkucGF0Y2hWYWx1ZSh7IGRpcmVjdGlvbnNUZXh0OiB0aGlzLmRpcmVjdGlvbnNUZXh0KGNudCkgfSk7XHJcbiAgICAgIHRoaXMuYWRkU3RvcE92ZXJsYXkodGhpcy5zdG9wcy5hdChjbnQpLnZhbHVlLnN0b3BDb29yZGluYXRlcywgY250KTtcclxuICAgICAgY250Kys7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlc2V0Rm9ybSgpIHtcclxuICAgIHRoaXMucm91dGVzUmVzdWx0cyA9IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IG5iU3RvcHMgPSB0aGlzLnN0b3BzLmxlbmd0aDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmJTdG9wczsgaSsrKSB7XHJcbiAgICAgIHRoaXMuc3RvcHMucmVtb3ZlQXQoMCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0b3BzLmluc2VydCgwLCB0aGlzLmNyZWF0ZVN0b3AoJ3N0YXJ0JykpO1xyXG4gICAgdGhpcy5zdG9wcy5pbnNlcnQoMSwgdGhpcy5jcmVhdGVTdG9wKCdlbmQnKSk7XHJcblxyXG4gICAgdGhpcy5zdG9wc1N0b3JlLmNsZWFyKCk7XHJcbiAgICB0aGlzLnJvdXRlU3RvcmUuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIGZvcm1hdFN0ZXAoc3RlcCwgY250KSB7XHJcbiAgICByZXR1cm4gdGhpcy5mb3JtYXRJbnN0cnVjdGlvbihcclxuICAgICAgc3RlcC5tYW5ldXZlci50eXBlLFxyXG4gICAgICBzdGVwLm1hbmV1dmVyLm1vZGlmaWVyLFxyXG4gICAgICBzdGVwLm5hbWUsXHJcbiAgICAgIHN0ZXAubWFuZXV2ZXIuYmVhcmluZ19hZnRlcixcclxuICAgICAgY250LFxyXG4gICAgICBzdGVwLm1hbmV1dmVyLmV4aXQsXHJcbiAgICAgIGNudCA9PT0gdGhpcy5hY3RpdmVSb3V0ZS5zdGVwcy5sZW5ndGggLSAxXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZm9ybWF0SW5zdHJ1Y3Rpb24oXHJcbiAgICB0eXBlLFxyXG4gICAgbW9kaWZpZXIsXHJcbiAgICByb3V0ZSxcclxuICAgIGRpcmVjdGlvbixcclxuICAgIHN0ZXBQb3NpdGlvbixcclxuICAgIGV4aXQsXHJcbiAgICBsYXN0U3RlcCA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICBsZXQgZGlyZWN0aXZlRnI7XHJcbiAgICBsZXQgZGlyZWN0aXZlRW47XHJcbiAgICBsZXQgaW1hZ2UgPSAnZm9yd2FyZCc7XHJcbiAgICBsZXQgY3NzQ2xhc3MgPSAncm90YXRlLTI3MCc7XHJcbiAgICBjb25zdCB0cmFuc2xhdGVkRGlyZWN0aW9uID0gdGhpcy50cmFuc2xhdGVCZWFyaW5nKGRpcmVjdGlvbik7XHJcbiAgICBjb25zdCB0cmFuc2xhdGVkTW9kaWZpZXIgPSB0aGlzLnRyYW5zbGF0ZU1vZGlmaWVyKG1vZGlmaWVyKTtcclxuICAgIGNvbnN0IGVuUHJlZml4ID0gbW9kaWZpZXIgPT09ICdzdHJhaWdodCcgPyAnJyA6ICdvbiB0aGUgJztcclxuICAgIGNvbnN0IGZyUHJlZml4ID0gbW9kaWZpZXIgPT09ICdzdHJhaWdodCcgPyAnJyA6ICfDoCAnO1xyXG5cclxuICAgIGxldCBmckFnZ3JlZ2F0ZWREaXJlY3Rpb24gPSBmclByZWZpeCArIHRyYW5zbGF0ZWRNb2RpZmllcjtcclxuICAgIGxldCBlbkFnZ3JlZ2F0ZWREaXJlY3Rpb24gPSBlblByZWZpeCArIHRyYW5zbGF0ZWRNb2RpZmllcjtcclxuXHJcbiAgICBpZiAobW9kaWZpZXIgJiYgbW9kaWZpZXIuc2VhcmNoKCdzbGlnaHQnKSA+PSAwKSB7XHJcbiAgICAgIGVuQWdncmVnYXRlZERpcmVjdGlvbiA9IHRyYW5zbGF0ZWRNb2RpZmllcjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kaWZpZXIgPT09ICd1dHVybicpIHtcclxuICAgICAgaW1hZ2UgPSAnZm9yd2FyZCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJ3JvdGF0ZS05MCc7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnc2hhcnAgcmlnaHQnKSB7XHJcbiAgICAgIGltYWdlID0gJ3N1YmRpcmVjdG9yeS1hcnJvdy1yaWdodCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJ2ljb24tZmxpcHBlZCc7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAncmlnaHQnKSB7XHJcbiAgICAgIGltYWdlID0gJ3N1YmRpcmVjdG9yeS1hcnJvdy1yaWdodCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJ2ljb24tZmxpcHBlZCc7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnc2xpZ2h0IHJpZ2h0Jykge1xyXG4gICAgICBpbWFnZSA9ICdmb3J3YXJkJztcclxuICAgICAgY3NzQ2xhc3MgPSAncm90YXRlLTI5MCc7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnc3RyYWlnaHQnKSB7XHJcbiAgICAgIGltYWdlID0gJ2ZvcndhcmQnO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3NsaWdodCBsZWZ0Jykge1xyXG4gICAgICBpbWFnZSA9ICdmb3J3YXJkJztcclxuICAgICAgY3NzQ2xhc3MgPSAncm90YXRlLTI1MCc7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnbGVmdCcpIHtcclxuICAgICAgaW1hZ2UgPSAnc3ViZGlyZWN0b3J5LWFycm93LWxlZnQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICdpY29uLWZsaXBwZWQnO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3NoYXJwIGxlZnQnKSB7XHJcbiAgICAgIGltYWdlID0gJ3N1YmRpcmVjdG9yeS1hcnJvdy1sZWZ0JztcclxuICAgICAgY3NzQ2xhc3MgPSAnaWNvbi1mbGlwcGVkJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZSA9PT0gJ3R1cm4nKSB7XHJcbiAgICAgIGlmIChtb2RpZmllciA9PT0gJ3N0cmFpZ2h0Jykge1xyXG4gICAgICAgIGRpcmVjdGl2ZUZyID0gJ0NvbnRpbnVlciBzdXIgJyArIHJvdXRlO1xyXG4gICAgICAgIGRpcmVjdGl2ZUVuID0gJ0NvbnRpbnVlIG9uICcgKyByb3V0ZTtcclxuICAgICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3V0dXJuJykge1xyXG4gICAgICAgIGRpcmVjdGl2ZUZyID0gJ0ZhaXJlIGRlbWktdG91ciBzdXIgJyArIHJvdXRlO1xyXG4gICAgICAgIGRpcmVjdGl2ZUVuID0gJ01ha2UgdS10dXJuIG9uICcgKyByb3V0ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkaXJlY3RpdmVGciA9ICdUb3VybmVyICcgKyBmckFnZ3JlZ2F0ZWREaXJlY3Rpb24gKyAnIHN1ciAnICsgcm91dGU7XHJcbiAgICAgICAgZGlyZWN0aXZlRW4gPSAnVHVybiAnICsgdHJhbnNsYXRlZE1vZGlmaWVyICsgJyBvbnRvICcgKyByb3V0ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnbmV3IG5hbWUnKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID1cclxuICAgICAgICAnQ29udGludWVyIGVuIGRpcmVjdGlvbiAnICsgdHJhbnNsYXRlZERpcmVjdGlvbiArICcgc3VyICcgKyByb3V0ZTtcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnSGVhZCAnICsgdHJhbnNsYXRlZERpcmVjdGlvbiArICcgb24gJyArIHJvdXRlO1xyXG4gICAgICBpbWFnZSA9ICdjb21wYXNzJztcclxuICAgICAgY3NzQ2xhc3MgPSAnJztcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RlcGFydCcpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPVxyXG4gICAgICAgICdBbGxlciBlbiBkaXJlY3Rpb24gJyArIHRyYW5zbGF0ZWREaXJlY3Rpb24gKyAnIHN1ciAnICsgcm91dGU7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ0hlYWQgJyArIHRyYW5zbGF0ZWREaXJlY3Rpb24gKyAnIG9uICcgKyByb3V0ZTtcclxuICAgICAgaW1hZ2UgPSAnY29tcGFzcyc7XHJcbiAgICAgIGNzc0NsYXNzID0gJyc7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdhcnJpdmUnKSB7XHJcbiAgICAgIGlmIChsYXN0U3RlcCkge1xyXG4gICAgICAgIGxldCBjb21hID0gJywgJztcclxuICAgICAgICBpZiAoIXRyYW5zbGF0ZWRNb2RpZmllcikge1xyXG4gICAgICAgICAgZnJBZ2dyZWdhdGVkRGlyZWN0aW9uID0gJyc7XHJcbiAgICAgICAgICBlbkFnZ3JlZ2F0ZWREaXJlY3Rpb24gPSAnJztcclxuICAgICAgICAgIGNvbWEgPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGlyZWN0aXZlRnIgPSAnVm91cyDDqnRlcyBhcnJpdsOpJyArIGNvbWEgKyBmckFnZ3JlZ2F0ZWREaXJlY3Rpb247XHJcbiAgICAgICAgZGlyZWN0aXZlRW4gPVxyXG4gICAgICAgICAgJ1lvdSBoYXZlIHJlYWNoZWQgeW91ciBkZXN0aW5hdGlvbicgKyBjb21hICsgZW5BZ2dyZWdhdGVkRGlyZWN0aW9uO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRpcmVjdGl2ZUZyID0gJ1ZvdXMgYXR0ZWlnbmV6IGxlIHBvaW50IGludGVybcOpZGlhcmUgc3VyICcgKyByb3V0ZTtcclxuICAgICAgICBkaXJlY3RpdmVFbiA9ICdZb3UgaGF2ZSByZWFjaGVkIHRoZSBpbnRlcm1lZGlhdGUgc3RvcCBvbnRvICcgKyByb3V0ZTtcclxuICAgICAgICBpbWFnZSA9ICdtYXAtbWFya2VyJztcclxuICAgICAgICBjc3NDbGFzcyA9ICcnO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdtZXJnZScpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPSAnQ29udGludWVyIHN1ciAnICsgcm91dGU7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ0NvbnRpbnVlIG9uICcgKyByb3V0ZTtcclxuICAgICAgaW1hZ2UgPSAnZm9yd2FyZCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJ3JvdGF0ZS0yNzAnO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb24gcmFtcCcpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPSBcIlByZW5kcmUgbCdlbnRyw6llIGQnYXV0b3JvdXRlIFwiICsgZnJBZ2dyZWdhdGVkRGlyZWN0aW9uO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9ICdUYWtlIHRoZSByYW1wICcgKyBlbkFnZ3JlZ2F0ZWREaXJlY3Rpb247XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvZmYgcmFtcCcpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPSBcIlByZW5kcmUgbGEgc29ydGllIGQnYXV0b3JvdXRlIFwiICsgZnJBZ2dyZWdhdGVkRGlyZWN0aW9uO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9ICdUYWtlIGV4aXQgJyArIGVuQWdncmVnYXRlZERpcmVjdGlvbjtcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2ZvcmsnKSB7XHJcbiAgICAgIGlmIChtb2RpZmllci5zZWFyY2goJ2xlZnQnKSA+PSAwKSB7XHJcbiAgICAgICAgZGlyZWN0aXZlRnIgPSAnR2FyZGVyIGxhIGdhdWNoZSBzdXIgJyArIHJvdXRlO1xyXG4gICAgICAgIGRpcmVjdGl2ZUVuID0gJ01lcmdlIGxlZnQgb250byAnICsgcm91dGU7XHJcbiAgICAgIH0gZWxzZSBpZiAobW9kaWZpZXIuc2VhcmNoKCdyaWdodCcpID49IDApIHtcclxuICAgICAgICBkaXJlY3RpdmVGciA9ICdHYXJkZXIgbGEgZHJvaXRlIHN1ciAnICsgcm91dGU7XHJcbiAgICAgICAgZGlyZWN0aXZlRW4gPSAnTWVyZ2UgcmlnaHQgb250byAnICsgcm91dGU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGlyZWN0aXZlRnIgPSAnQ29udGludWVyIHN1ciAnICsgcm91dGU7XHJcbiAgICAgICAgZGlyZWN0aXZlRW4gPSAnQ29udGludWUgb24gJyArIHJvdXRlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdlbmQgb2Ygcm9hZCcpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPVxyXG4gICAgICAgICfDgCBsYSBmaW4gZGUgbGEgcm91dGUsIHRvdXJuZXIgJyArIHRyYW5zbGF0ZWRNb2RpZmllciArICcgc3VyICcgKyByb3V0ZTtcclxuICAgICAgZGlyZWN0aXZlRW4gPVxyXG4gICAgICAgICdBdCB0aGUgZW5kIG9mIHRoZSByb2FkLCB0dXJuICcgKyB0cmFuc2xhdGVkTW9kaWZpZXIgKyAnIG9udG8gJyArIHJvdXRlO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAndXNlIGxhbmUnKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID0gJ1ByZW5kcmUgbGEgdm9pZSBkZSAuLi4gJztcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnVGFrZSB0aGUgbGFuZSAuLi4nO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnY29udGludWUnICYmIG1vZGlmaWVyICE9PSAndXR1cm4nKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID0gJ0NvbnRpbnVlciBzdXIgJyArIHJvdXRlO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9ICdDb250aW51ZSBvbiAnICsgcm91dGU7XHJcbiAgICAgIGltYWdlID0gJ2ZvcndhcmQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICdyb3RhdGUtMjcwJztcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3JvdW5kYWJvdXQnKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID0gJ0F1IHJvbmQtcG9pbnQsIHByZW5kcmUgbGEgJyArIGV4aXQ7XHJcbiAgICAgIGRpcmVjdGl2ZUZyICs9IGV4aXQgPT09IDEgPyAncmUnIDogJ2UnO1xyXG4gICAgICBkaXJlY3RpdmVGciArPSAnIHNvcnRpZSB2ZXJzICcgKyByb3V0ZTtcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnQXQgdGhlIHJvdW5kYWJvdXQsIHRha2UgdGhlICcgKyBleGl0O1xyXG4gICAgICBkaXJlY3RpdmVFbiArPSBleGl0ID09PSAxID8gJ3N0JyA6ICdyZCc7XHJcbiAgICAgIGRpcmVjdGl2ZUVuICs9ICcgZXhpdCB0b3dhcmRzICcgKyByb3V0ZTtcclxuICAgICAgaW1hZ2UgPSAnY2hhcnQtZG9udXQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICcnO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAncm90YXJ5Jykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9ICdSb25kLXBvaW50IHJvdGFyeS4uLi4nO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9ICdSb3VuZGFib3V0IHJvdGFyeS4uLi4nO1xyXG4gICAgICBpbWFnZSA9ICdjaGFydC1kb251dCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJyc7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdyb3VuZGFib3V0IHR1cm4nKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID0gJ1JvbmQtcG9pbnQsIHByZW5kcmUgbGEgLi4uJztcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnUm91bmRhYm91dCwgdGFrZSB0aGUgLi4uJztcclxuICAgICAgaW1hZ2UgPSAnY2hhcnQtZG9udXQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICcnO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnZXhpdCByb3VuZGFib3V0Jykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9ICdQb3Vyc3VpdnJlIHZlcnMgJyArIHJvdXRlO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9ICdDb250aW51ZSB0byAnICsgcm91dGU7XHJcbiAgICAgIGltYWdlID0gJ2ZvcndhcmQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICdyb3RhdGUtMjcwJztcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ25vdGlmaWNhdGlvbicpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPSAnbm90aWZpY2F0aW9uIC4uLi4nO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9ICdub3RpZmljYXRpb24gLi4uLic7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAndXR1cm4nKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID1cclxuICAgICAgICAnRmFpcmUgZGVtaS10b3VyIGV0IGNvbnRpbnVlciBlbiBkaXJlY3Rpb24gJyArXHJcbiAgICAgICAgdHJhbnNsYXRlZERpcmVjdGlvbiArXHJcbiAgICAgICAgJyBzdXIgJyArXHJcbiAgICAgICAgcm91dGU7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID1cclxuICAgICAgICAnTWFrZSB1LXR1cm4gYW5kIGhlYWQgJyArIHRyYW5zbGF0ZWREaXJlY3Rpb24gKyAnIG9uICcgKyByb3V0ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID0gJz8/Pyc7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJz8/Pyc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhc3RTdGVwKSB7XHJcbiAgICAgIGltYWdlID0gJ2ZsYWctdmFyaWFudCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJyc7XHJcbiAgICB9XHJcbiAgICBpZiAoc3RlcFBvc2l0aW9uID09PSAwKSB7XHJcbiAgICAgIGltYWdlID0gJ2NvbXBhc3MnO1xyXG4gICAgICBjc3NDbGFzcyA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkaXJlY3RpdmU7XHJcbiAgICBpZiAodGhpcy5icm93c2VyTGFuZ3VhZ2UgPT09ICdmcicpIHtcclxuICAgICAgZGlyZWN0aXZlID0gZGlyZWN0aXZlRnI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYnJvd3Nlckxhbmd1YWdlID09PSAnZW4nKSB7XHJcbiAgICAgIGRpcmVjdGl2ZSA9IGRpcmVjdGl2ZUVuO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IGluc3RydWN0aW9uOiBkaXJlY3RpdmUsIGltYWdlLCBjc3NDbGFzcyB9O1xyXG4gIH1cclxuXHJcbiAgdHJhbnNsYXRlTW9kaWZpZXIobW9kaWZpZXIpIHtcclxuICAgIGlmIChtb2RpZmllciA9PT0gJ3V0dXJuJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZGlyZWN0aW9ucy51dHVybicpO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3NoYXJwIHJpZ2h0Jykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5nZW8uZGlyZWN0aW9ucy5zaGFycCByaWdodCdcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICdyaWdodCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRpcmVjdGlvbnMucmlnaHQnKTtcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICdzbGlnaHQgcmlnaHQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5kaXJlY3Rpb25zLnNsaWdodCByaWdodCdcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICdzaGFycCBsZWZ0Jykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5nZW8uZGlyZWN0aW9ucy5zaGFycCBsZWZ0J1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kaXJlY3Rpb25zLmxlZnQnKTtcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICdzbGlnaHQgbGVmdCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uZ2VvLmRpcmVjdGlvbnMuc2xpZ2h0IGxlZnQnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnc3RyYWlnaHQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kaXJlY3Rpb25zLnN0cmFpZ2h0Jyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbW9kaWZpZXI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFuc2xhdGVCZWFyaW5nKGJlYXJpbmcpIHtcclxuICAgIGlmIChiZWFyaW5nID49IDMzNyB8fCBiZWFyaW5nIDwgMjMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmNhcmRpbmFsUG9pbnRzLm4nKTtcclxuICAgIH0gZWxzZSBpZiAoYmVhcmluZyA8IDY3KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5jYXJkaW5hbFBvaW50cy5uZSdcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoYmVhcmluZyA8IDExMykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uY2FyZGluYWxQb2ludHMuZScpO1xyXG4gICAgfSBlbHNlIGlmIChiZWFyaW5nIDwgMTU3KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5jYXJkaW5hbFBvaW50cy5zZSdcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoYmVhcmluZyA8IDIwMykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uY2FyZGluYWxQb2ludHMucycpO1xyXG4gICAgfSBlbHNlIGlmIChiZWFyaW5nIDwgMjQ3KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5jYXJkaW5hbFBvaW50cy5zdydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoYmVhcmluZyA8IDI5Mykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uY2FyZGluYWxQb2ludHMudycpO1xyXG4gICAgfSBlbHNlIGlmIChiZWFyaW5nIDwgMzM3KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5jYXJkaW5hbFBvaW50cy5udydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvcm1hdERpc3RhbmNlKGRpc3RhbmNlKSB7XHJcbiAgICBpZiAoZGlzdGFuY2UgPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpc3RhbmNlID49IDEwMDAwMCkge1xyXG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChkaXN0YW5jZSAvIDEwMDApICsgJyBrbSc7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlzdGFuY2UgPj0gMTAwMDApIHtcclxuICAgICAgcmV0dXJuIE1hdGgucm91bmQoZGlzdGFuY2UgLyAxMDApIC8gMTAgKyAnIGttJztcclxuICAgIH1cclxuICAgIGlmIChkaXN0YW5jZSA+PSAxMDApIHtcclxuICAgICAgcmV0dXJuIE1hdGgucm91bmQoZGlzdGFuY2UgLyAxMDApIC8gMTAgKyAnIGttJztcclxuICAgIH1cclxuICAgIHJldHVybiBkaXN0YW5jZSArICcgbSc7XHJcbiAgfVxyXG5cclxuICBmb3JtYXREdXJhdGlvbihkdXJhdGlvbjogbnVtYmVyLCBzdW1tYXJ5ID0gZmFsc2UpIHtcclxuICAgIGlmIChkdXJhdGlvbiA+PSAzNjAwKSB7XHJcbiAgICAgIGNvbnN0IGhvdXIgPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gMzYwMCk7XHJcbiAgICAgIGNvbnN0IG1pbnV0ZSA9IE1hdGgucm91bmQoKGR1cmF0aW9uIC8gMzYwMCAtIGhvdXIpICogNjApO1xyXG4gICAgICBpZiAobWludXRlID09PSA2MCkge1xyXG4gICAgICAgIHJldHVybiBob3VyICsgMSArICcgaCc7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGhvdXIgKyAnIGggJyArIG1pbnV0ZSArICcgbWluJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZHVyYXRpb24gPj0gNjApIHtcclxuICAgICAgcmV0dXJuIE1hdGgucm91bmQoZHVyYXRpb24gLyA2MCkgKyAnIG1pbic7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZHVyYXRpb24gKyAnIHMnO1xyXG4gIH1cclxuXHJcbiAgc2hvd1NlZ21lbnQoc3RlcCwgem9vbVRvRXh0ZW50ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuc2hvd1JvdXRlU2VnbWVudEdlb21ldHJ5KHN0ZXAuZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIHpvb21Ub0V4dGVudCk7XHJcbiAgfVxyXG5cclxuICBzaG93Um91dGVTZWdtZW50R2VvbWV0cnkoY29vcmRpbmF0ZXMsIHpvb21Ub0V4dGVudCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCB2ZXJ0ZXhJZCA9ICd2ZXJ0ZXgnO1xyXG4gICAgY29uc3QgZ2VvbWV0cnk0MzI2ID0gbmV3IG9sZ2VvbS5MaW5lU3RyaW5nKGNvb3JkaW5hdGVzKTtcclxuICAgIGNvbnN0IGdlb21ldHJ5TWFwUHJvamVjdGlvbiA9IGdlb21ldHJ5NDMyNi50cmFuc2Zvcm0oJ0VQU0c6NDMyNicsIHRoaXMubWFwLnByb2plY3Rpb24pO1xyXG4gICAgY29uc3Qgcm91dGVTZWdtZW50Q29vcmRpbmF0ZXMgPSAoZ2VvbWV0cnlNYXBQcm9qZWN0aW9uIGFzIGFueSkuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuICAgIGNvbnN0IGxhc3RQb2ludCA9IHJvdXRlU2VnbWVudENvb3JkaW5hdGVzWzBdO1xyXG5cclxuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IG9sZ2VvbS5Qb2ludChsYXN0UG9pbnQpO1xyXG4gICAgY29uc3QgZmVhdHVyZSA9IG5ldyBvbEZlYXR1cmUoeyBnZW9tZXRyeSB9KTtcclxuXHJcbiAgICBjb25zdCBnZW9qc29uR2VvbSA9IG5ldyBPbEdlb0pTT04oKS53cml0ZUdlb21ldHJ5T2JqZWN0KGdlb21ldHJ5LCB7XHJcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICBkYXRhUHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvblxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcHJldmlvdXNWZXJ0ZXggPSB0aGlzLnJvdXRlU3RvcmUuZ2V0KHZlcnRleElkKTtcclxuICAgIGNvbnN0IHByZXZpb3VzVmVydGV4UmV2aXNpb24gPSBwcmV2aW91c1ZlcnRleCA/IHByZXZpb3VzVmVydGV4Lm1ldGEucmV2aXNpb24gOiAwO1xyXG5cclxuICAgIGNvbnN0IHZlcnRleEZlYXR1cmU6IEZlYXR1cmUgPSB7XHJcbiAgICAgIHR5cGU6IEZFQVRVUkUsXHJcbiAgICAgIGdlb21ldHJ5OiBnZW9qc29uR2VvbSxcclxuICAgICAgcHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvbixcclxuICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGlkOiB2ZXJ0ZXhJZCxcclxuICAgICAgICB0eXBlOiAndmVydGV4J1xyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgaWQ6IHZlcnRleElkLFxyXG4gICAgICAgIHJldmlzaW9uOiBwcmV2aW91c1ZlcnRleFJldmlzaW9uICsgMVxyXG4gICAgICB9LFxyXG4gICAgICBvbDogZmVhdHVyZVxyXG4gICAgfTtcclxuICAgIHRoaXMucm91dGVTdG9yZS51cGRhdGUodmVydGV4RmVhdHVyZSk7XHJcbiAgICBpZiAoem9vbVRvRXh0ZW50KSB7XHJcbiAgICAgIHRoaXMubWFwLnZpZXdDb250cm9sbGVyLnpvb21Ub0V4dGVudChmZWF0dXJlLmdldEdlb21ldHJ5KCkuZ2V0RXh0ZW50KCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgem9vbVJvdXRlKGV4dGVudD8pIHtcclxuXHJcbiAgICBpZiAoZXh0ZW50KSB7XHJcbiAgICAgIHRoaXMubWFwLnZpZXdDb250cm9sbGVyLnpvb21Ub0V4dGVudChleHRlbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgcm91dGVGZWF0dXJlID0gdGhpcy5yb3V0ZVN0b3JlLmxheWVyLm9sLmdldFNvdXJjZSgpLmdldEZlYXR1cmVzKCkuZmluZChmID0+IGYuZ2V0SWQoKSA9PT0gJ3JvdXRlJyk7XHJcbiAgICAgIGlmIChyb3V0ZUZlYXR1cmUpIHtcclxuICAgICAgICBjb25zdCByb3V0ZUV4dGVudCA9IHJvdXRlRmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldEV4dGVudCgpO1xyXG4gICAgICAgIHRoaXMubWFwLnZpZXdDb250cm9sbGVyLnpvb21Ub0V4dGVudChyb3V0ZUV4dGVudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2hvd1JvdXRlR2VvbWV0cnkobW92ZVRvRXh0ZW50ID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGdlb20gPSB0aGlzLmFjdGl2ZVJvdXRlLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xyXG4gICAgY29uc3QgZ2VvbWV0cnk0MzI2ID0gbmV3IG9sZ2VvbS5MaW5lU3RyaW5nKGdlb20pO1xyXG4gICAgY29uc3QgZ2VvbWV0cnlNYXBQcm9qZWN0aW9uID0gZ2VvbWV0cnk0MzI2LnRyYW5zZm9ybSgnRVBTRzo0MzI2JywgdGhpcy5tYXAucHJvamVjdGlvbik7XHJcbiAgICBpZiAobW92ZVRvRXh0ZW50KSB7XHJcbiAgICAgIHRoaXMuem9vbVJvdXRlKGdlb21ldHJ5TWFwUHJvamVjdGlvbi5nZXRFeHRlbnQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2VvanNvbkdlb20gPSBuZXcgT2xHZW9KU09OKCkud3JpdGVHZW9tZXRyeU9iamVjdChnZW9tZXRyeU1hcFByb2plY3Rpb24sIHtcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHRoaXMubWFwLnByb2plY3Rpb24sXHJcbiAgICAgIGRhdGFQcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBwcmV2aW91c1JvdXRlID0gdGhpcy5yb3V0ZVN0b3JlLmdldCgncm91dGUnKTtcclxuICAgIGNvbnN0IHByZXZpb3VzUm91dGVSZXZpc2lvbiA9IHByZXZpb3VzUm91dGUgPyBwcmV2aW91c1JvdXRlLm1ldGEucmV2aXNpb24gOiAwO1xyXG5cclxuICAgIGNvbnN0IHJvdXRlRmVhdHVyZTogRmVhdHVyZSA9IHtcclxuICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgZ2VvbWV0cnk6IGdlb2pzb25HZW9tLFxyXG4gICAgICBwcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgaWQ6ICdyb3V0ZScsXHJcbiAgICAgICAgdHlwZTogJ3JvdXRlJ1xyXG4gICAgICB9LFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgaWQ6ICdyb3V0ZScsXHJcbiAgICAgICAgcmV2aXNpb246IHByZXZpb3VzUm91dGVSZXZpc2lvbiArIDFcclxuICAgICAgfSxcclxuICAgICAgb2w6IG5ldyBvbEZlYXR1cmUoeyBnZW9tZXRyeTogZ2VvbWV0cnlNYXBQcm9qZWN0aW9uIH0pXHJcbiAgICB9O1xyXG4gICAgdGhpcy5yb3V0ZVN0b3JlLnVwZGF0ZShyb3V0ZUZlYXR1cmUpO1xyXG5cclxuICB9XHJcblxyXG4gIGdldFJvdXRlcyhtb3ZlVG9FeHRlbnQ6IGJvb2xlYW4gPSBmYWxzZSwgZGlyZWN0aW9uc09wdGlvbnM6IERpcmVjdGlvbnNPcHRpb25zID0ge30pIHtcclxuICAgIHRoaXMuZGVsZXRlU3RvcmVGZWF0dXJlQnlJRCh0aGlzLnJvdXRlU3RvcmUsICd2ZXJ0ZXgnKTtcclxuICAgIHRoaXMud3JpdGVTdG9wc1RvRm9ybVNlcnZpY2UoKTtcclxuICAgIGNvbnN0IGNvb3JkcyA9IHRoaXMuZGlyZWN0aW9uc0Zvcm1TZXJ2aWNlLmdldFN0b3BzQ29vcmRpbmF0ZXMoKTtcclxuICAgIGlmIChjb29yZHMubGVuZ3RoIDwgMikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCByb3V0ZVJlc3BvbnNlID0gdGhpcy5kaXJlY3Rpb25zU2VydmljZS5yb3V0ZShjb29yZHMsIGRpcmVjdGlvbnNPcHRpb25zKTtcclxuICAgIGlmIChyb3V0ZVJlc3BvbnNlKSB7XHJcbiAgICAgIHJvdXRlUmVzcG9uc2UubWFwKHJlcyA9PlxyXG4gICAgICAgIHRoaXMucm91dGVzUXVlcmllcyQkLnB1c2goXHJcbiAgICAgICAgICByZXMuc3Vic2NyaWJlKHJvdXRlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXNSZXN1bHRzID0gcm91dGU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlUm91dGUgPSB0aGlzLnJvdXRlc1Jlc3VsdHNbMF0gYXMgRGlyZWN0aW9ucztcclxuICAgICAgICAgICAgdGhpcy5zaG93Um91dGVHZW9tZXRyeShtb3ZlVG9FeHRlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdW5saXN0ZW5TaW5nbGVDbGljaygpIHtcclxuICAgIGlmICh0aGlzLmZvY3VzS2V5Lmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICB0aGlzLmZvY3VzS2V5LmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICBvbG9ic2VydmFibGUudW5CeUtleShrZXkpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVSb3V0ZXNRdWVyaWVzKCkge1xyXG4gICAgdGhpcy5yb3V0ZXNRdWVyaWVzJCQuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcclxuICAgIHRoaXMucm91dGVzUXVlcmllcyQkID0gW107XHJcbiAgfVxyXG5cclxuICBjb3B5TGlua1RvQ2xpcGJvYXJkKCkge1xyXG4gICAgY29uc3Qgc3VjY2Vzc2Z1bCA9IENsaXBib2FyZC5jb3B5KHRoaXMuZ2V0VXJsKCkpO1xyXG4gICAgaWYgKHN1Y2Nlc3NmdWwpIHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRpcmVjdGlvbnNGb3JtLmRpYWxvZy5jb3B5VGl0bGUnKTtcclxuICAgICAgY29uc3QgbXNnID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZGlyZWN0aW9uc0Zvcm0uZGlhbG9nLmNvcHlNc2dMaW5rJyk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2Vzcyhtc2csIHRpdGxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvcHlEaXJlY3Rpb25zVG9DbGlwYm9hcmQoKSB7XHJcbiAgICBjb25zdCBpbmRlbnQgPSAnXFx0JztcclxuICAgIGxldCBhY3RpdmVSb3V0ZURpcmVjdGl2ZSA9XHJcbiAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uZ2VvLmRpcmVjdGlvbnNGb3JtLmluc3RydWN0aW9ucydcclxuICAgICAgKSArICc6XFxuJztcclxuICAgIGxldCB3YXlQb2ludExpc3QgPSAnJztcclxuICAgIGNvbnN0IHN1bW1hcnkgPVxyXG4gICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kaXJlY3Rpb25zRm9ybS5zdW1tYXJ5JykgK1xyXG4gICAgICAnOiBcXG4nICtcclxuICAgICAgaW5kZW50ICtcclxuICAgICAgdGhpcy5hY3RpdmVSb3V0ZS50aXRsZSArXHJcbiAgICAgICdcXG4nICtcclxuICAgICAgaW5kZW50ICtcclxuICAgICAgdGhpcy5mb3JtYXREaXN0YW5jZSh0aGlzLmFjdGl2ZVJvdXRlLmRpc3RhbmNlKSArXHJcbiAgICAgICdcXG4nICtcclxuICAgICAgaW5kZW50ICtcclxuICAgICAgdGhpcy5mb3JtYXREdXJhdGlvbih0aGlzLmFjdGl2ZVJvdXRlLmR1cmF0aW9uKSArXHJcbiAgICAgICdcXG5cXG4nICtcclxuICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZGlyZWN0aW9uc0Zvcm0uc3RvcHNMaXN0JykgK1xyXG4gICAgICAnOlxcbic7XHJcblxyXG4gICAgY29uc3QgdXJsID1cclxuICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uZGlyZWN0aW9uc0Zvcm0ubGluaycpICtcclxuICAgICAgJzpcXG4nICtcclxuICAgICAgaW5kZW50ICtcclxuICAgICAgdGhpcy5nZXRVcmwoKTtcclxuXHJcbiAgICBsZXQgd2F5UG9pbnRzQ250ID0gMTtcclxuICAgIHRoaXMuc3RvcHMudmFsdWUuZm9yRWFjaChzdG9wID0+IHtcclxuICAgICAgbGV0IGNvb3JkID0gJyc7XHJcbiAgICAgIGxldCBzdG9wUG9pbnQgPSAnJztcclxuICAgICAgaWYgKHN0b3Auc3RvcFBvaW50ICE9PSBzdG9wLnN0b3BDb29yZGluYXRlcykge1xyXG4gICAgICAgIHN0b3BQb2ludCA9IHN0b3Auc3RvcFBvaW50O1xyXG4gICAgICAgIGNvb3JkID1cclxuICAgICAgICAgICcgKCcgK1xyXG4gICAgICAgICAgW3N0b3Auc3RvcENvb3JkaW5hdGVzWzFdLCBzdG9wLnN0b3BDb29yZGluYXRlc1swXV0uam9pbignLCcpICtcclxuICAgICAgICAgICcpJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzdG9wUG9pbnQgPSBbc3RvcC5zdG9wQ29vcmRpbmF0ZXNbMV0sIHN0b3Auc3RvcENvb3JkaW5hdGVzWzBdXS5qb2luKFxyXG4gICAgICAgICAgJywnXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgd2F5UG9pbnRMaXN0ID1cclxuICAgICAgICB3YXlQb2ludExpc3QgK1xyXG4gICAgICAgIGluZGVudCArXHJcbiAgICAgICAgd2F5UG9pbnRzQ250LnRvTG9jYWxlU3RyaW5nKCkgK1xyXG4gICAgICAgICcuICcgK1xyXG4gICAgICAgIHN0b3BQb2ludCArXHJcbiAgICAgICAgY29vcmQgK1xyXG4gICAgICAgICdcXG4nO1xyXG4gICAgICB3YXlQb2ludHNDbnQrKztcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIERpcmVjdGlvbnNcclxuICAgIGxldCBsb2NhbENudCA9IDA7XHJcbiAgICB0aGlzLmFjdGl2ZVJvdXRlLnN0ZXBzLmZvckVhY2goc3RlcCA9PiB7XHJcbiAgICAgIGNvbnN0IGluc3RydWN0aW9uID0gdGhpcy5mb3JtYXRTdGVwKHN0ZXAsIGxvY2FsQ250KS5pbnN0cnVjdGlvbjtcclxuICAgICAgY29uc3QgZGlzdGFuY2UgPVxyXG4gICAgICAgIHRoaXMuZm9ybWF0RGlzdGFuY2Uoc3RlcC5kaXN0YW5jZSkgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyAnJ1xyXG4gICAgICAgICAgOiAnICgnICsgdGhpcy5mb3JtYXREaXN0YW5jZShzdGVwLmRpc3RhbmNlKSArICcpJztcclxuICAgICAgYWN0aXZlUm91dGVEaXJlY3RpdmUgPVxyXG4gICAgICAgIGFjdGl2ZVJvdXRlRGlyZWN0aXZlICtcclxuICAgICAgICBpbmRlbnQgK1xyXG4gICAgICAgIChsb2NhbENudCArIDEpLnRvTG9jYWxlU3RyaW5nKCkgK1xyXG4gICAgICAgICcuICcgK1xyXG4gICAgICAgIGluc3RydWN0aW9uICtcclxuICAgICAgICBkaXN0YW5jZSArXHJcbiAgICAgICAgJ1xcbic7XHJcbiAgICAgIGxvY2FsQ250Kys7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBkaXJlY3Rpb25zQm9keSA9XHJcbiAgICAgIHN1bW1hcnkgKyB3YXlQb2ludExpc3QgKyAnXFxuJyArIHVybCArICdcXG5cXG4nICsgYWN0aXZlUm91dGVEaXJlY3RpdmU7XHJcblxyXG4gICAgY29uc3Qgc3VjY2Vzc2Z1bCA9IENsaXBib2FyZC5jb3B5KGRpcmVjdGlvbnNCb2R5KTtcclxuICAgIGlmIChzdWNjZXNzZnVsKSB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5kaXJlY3Rpb25zRm9ybS5kaWFsb2cuY29weVRpdGxlJyk7XHJcbiAgICAgIGNvbnN0IG1zZyA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmRpcmVjdGlvbnNGb3JtLmRpYWxvZy5jb3B5TXNnJyk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2Vzcyhtc2csIHRpdGxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlVGVybUNoYW5nZWQodGVybTogc3RyaW5nKSB7XHJcbiAgICBpZiAodGVybSAhPT0gdW5kZWZpbmVkIHx8IHRlcm0ubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgIGNvbnN0IHNlYXJjaFByb3Bvc2FscyA9IFtdO1xyXG4gICAgICBpZiAodGhpcy5zZWFyY2gkJCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCByZXNlYXJjaGVzID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaCh0ZXJtLCB7c2VhcmNoVHlwZTogJ0ZlYXR1cmUnfSk7XHJcbiAgICAgIHJlc2VhcmNoZXMubWFwKHJlcyA9PlxyXG4gICAgICAgIHRoaXMuc2VhcmNoJCQgPVxyXG4gICAgICAgIHJlcy5yZXF1ZXN0LnN1YnNjcmliZShyZXN1bHRzID0+IHtcclxuICAgICAgICAgIHJlc3VsdHNcclxuICAgICAgICAgICAgLmZpbHRlcihyID0+IHIuZGF0YS5nZW9tZXRyeSlcclxuICAgICAgICAgICAgLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgc2VhcmNoUHJvcG9zYWxzLmZpbHRlcihyID0+IHIuc291cmNlID09PSBlbGVtZW50LnNvdXJjZSlcclxuICAgICAgICAgICAgICAgICAgLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoUHJvcG9zYWxzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICBzb3VyY2U6IGVsZW1lbnQuc291cmNlLFxyXG4gICAgICAgICAgICAgICAgICBtZXRhOiBlbGVtZW50Lm1ldGEsXHJcbiAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IHJlc3VsdHMubWFwKHIgPT4gci5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMuc3RvcHNcclxuICAgICAgICAgICAgLmF0KHRoaXMuY3VycmVudFN0b3BJbmRleClcclxuICAgICAgICAgICAgLnBhdGNoVmFsdWUoeyBzdG9wUHJvcG9zYWxzOiBzZWFyY2hQcm9wb3NhbHMgfSk7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmcy5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldFRlcm0odGVybTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnRlcm0gPSB0ZXJtO1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmtleUlzVmFsaWQodGVybSkgJiZcclxuICAgICAgKHRlcm0ubGVuZ3RoID49IHRoaXMubGVuZ3RoIHx8IHRlcm0ubGVuZ3RoID09PSAwKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuc3RyZWFtJC5uZXh0KHRlcm0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBrZXlJc1ZhbGlkKGtleTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkS2V5cy5maW5kKHZhbHVlID0+IHZhbHVlID09PSBrZXkpID09PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBrZXl1cChpLCBldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgY29uc3QgdGVybSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XHJcbiAgICB0aGlzLnNldFRlcm0odGVybSk7XHJcbiAgICB0aGlzLm1hcC5vbC51bignc2luZ2xlY2xpY2snLCBldnQgPT4ge1xyXG4gICAgICB0aGlzLmhhbmRsZU1hcENsaWNrKGV2dCwgaSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNsZWFyU3RvcChzdG9wSW5kZXgpIHtcclxuICAgIC8vIHRoaXMuZGVsZXRlRGlyZWN0aW9uc092ZXJsYXlieUlEKHRoaXMuZ2V0U3RvcE92ZXJsYXlJRChzdG9wSW5kZXgpKTtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5nZXRTdG9wT3ZlcmxheUlEKHN0b3BJbmRleCk7XHJcbiAgICB0aGlzLmRlbGV0ZVN0b3JlRmVhdHVyZUJ5SUQodGhpcy5zdG9wc1N0b3JlLCBpZCk7XHJcbiAgICB0aGlzLnJvdXRlU3RvcmUuY2xlYXIoKTtcclxuICAgIGNvbnN0IHN0b3BzQ291bnRzID0gdGhpcy5zdG9wcy5sZW5ndGg7XHJcbiAgICB0aGlzLnN0b3BzLnJlbW92ZUF0KHN0b3BJbmRleCk7XHJcbiAgICB0aGlzLnN0b3BzLmluc2VydChzdG9wSW5kZXgsIHRoaXMuY3JlYXRlU3RvcCh0aGlzLmRpcmVjdGlvbnNUZXh0KHN0b3BJbmRleCwgc3RvcHNDb3VudHMpKSk7XHJcbiAgICB0aGlzLnJvdXRlc1Jlc3VsdHMgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmdldFJvdXRlcygpO1xyXG4gIH1cclxuXHJcbiAgY2hvb3NlUHJvcG9zYWwocHJvcG9zYWwsIGkpIHtcclxuICAgIGlmIChwcm9wb3NhbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGxldCBnZW9tQ29vcmQ7XHJcbiAgICAgIGNvbnN0IGdlb20gPSAocHJvcG9zYWwgYXMgYW55KS5nZW9tZXRyeTtcclxuICAgICAgaWYgKGdlb20udHlwZSA9PT0gJ1BvaW50Jykge1xyXG4gICAgICAgIGdlb21Db29yZCA9IGdlb20uY29vcmRpbmF0ZXM7XHJcbiAgICAgIH0gZWxzZSBpZiAoZ2VvbS50eXBlLnNlYXJjaCgnTGluZScpID49IDApIHtcclxuICAgICAgICBjb25zdCBsaW5lID0gKG5ldyBPbEdlb0pTT04oKSkucmVhZEZlYXR1cmVzKGdlb20pO1xyXG4gICAgICAgIGdlb21Db29yZCA9IGxpbmVbMF0uZ2V0R2VvbWV0cnkoKS5nZXRGaXJzdENvb3JkaW5hdGUoKTtcclxuICAgICAgICBnZW9tQ29vcmQgPSBbZ2VvbUNvb3JkWzBdLCBnZW9tQ29vcmRbMV1dO1xyXG4gICAgICB9IGVsc2UgaWYgKGdlb20udHlwZS5zZWFyY2goJ1BvbHlnb24nKSA+PSAwKSB7XHJcbiAgICAgICAgY29uc3QgcG9seSA9IChuZXcgT2xHZW9KU09OKCkpLnJlYWRGZWF0dXJlcyhnZW9tKTtcclxuICAgICAgICBnZW9tQ29vcmQgPSBwb2x5WzBdLmdldEdlb21ldHJ5KCkuZ2V0SW50ZXJpb3JQb2ludHMoKS5nZXRGaXJzdENvb3JkaW5hdGUoKTtcclxuICAgICAgICBnZW9tQ29vcmQgPSBbZ2VvbUNvb3JkWzBdLCBnZW9tQ29vcmRbMV1dO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZ2VvbUNvb3JkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnN0b3BzLmF0KGkpLnBhdGNoVmFsdWUoeyBzdG9wQ29vcmRpbmF0ZXM6IGdlb21Db29yZCB9KTtcclxuICAgICAgICB0aGlzLmFkZFN0b3BPdmVybGF5KGdlb21Db29yZCwgaSk7XHJcbiAgICAgIC8qICBjb25zdCBwcm9wb3NhbEV4dGVudCA9IHRoaXMuZGlyZWN0aW9uc1N0b3BzT3ZlcmxheURhdGFTb3VyY2Uub2xcclxuICAgICAgICAgIC5nZXRGZWF0dXJlQnlJZCh0aGlzLmdldFN0b3BPdmVybGF5SUQoaSkpXHJcbiAgICAgICAgICAuZ2V0R2VvbWV0cnkoKVxyXG4gICAgICAgICAgLmdldEV4dGVudCgpOyovXHJcblxyXG4gICAgICAgLyogaWYgKCFvbGV4dGVudC5pbnRlcnNlY3RzKHByb3Bvc2FsRXh0ZW50LCB0aGlzLm1hcC52aWV3Q29udHJvbGxlci5nZXRFeHRlbnQoKSkpIHtcclxuICAgICAgICAgIHRoaXMubWFwLnZpZXdDb250cm9sbGVyLm1vdmVUb0V4dGVudChwcm9wb3NhbEV4dGVudCk7XHJcbiAgICAgICAgfSovXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvY3VzKGkpIHtcclxuICAgIHRoaXMudW5saXN0ZW5TaW5nbGVDbGljaygpO1xyXG4gICAgdGhpcy5jdXJyZW50U3RvcEluZGV4ID0gaTtcclxuICAgIHRoaXMuZm9jdXNPblN0b3AgPSB0cnVlO1xyXG4gICAgdGhpcy5mb2N1c0tleS5wdXNoKFxyXG4gICAgICB0aGlzLm1hcC5vbC5vbmNlKCdzaW5nbGVjbGljaycsIGV2dCA9PiB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVNYXBDbGljayhldnQsIGkpO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlTWFwQ2xpY2soZXZlbnQ6IG9sY29uZGl0aW9uLCBpbmRleFBvcz8pIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRTdG9wSW5kZXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmFkZFN0b3AoKTtcclxuICAgICAgaW5kZXhQb3MgPSB0aGlzLnN0b3BzLmxlbmd0aCAtIDI7XHJcbiAgICAgIHRoaXMuc3RvcHMuYXQoaW5kZXhQb3MpLnZhbHVlLnN0b3BQcm9wb3NhbHMgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluZGV4UG9zID0gdGhpcy5jdXJyZW50U3RvcEluZGV4O1xyXG4gICAgfVxyXG4gICAgY29uc3QgY2xpY2tDb29yZGluYXRlcyA9IG9scHJvai50cmFuc2Zvcm0oXHJcbiAgICAgIGV2ZW50LmNvb3JkaW5hdGUsXHJcbiAgICAgIHRoaXMubWFwLnByb2plY3Rpb24sXHJcbiAgICAgIHRoaXMucHJvamVjdGlvblxyXG4gICAgKTtcclxuICAgIHRoaXMuc3RvcHMuYXQoaW5kZXhQb3MpLnBhdGNoVmFsdWUoeyBzdG9wUHJvcG9zYWxzOiBbXSwgc3RvcENvb3JkaW5hdGVzOiBjbGlja0Nvb3JkaW5hdGVzIH0pO1xyXG5cclxuICAgIHRoaXMuaGFuZGxlTG9jYXRpb25Qcm9wb3NhbHMoY2xpY2tDb29yZGluYXRlcywgaW5kZXhQb3MpO1xyXG4gICAgdGhpcy5hZGRTdG9wT3ZlcmxheShjbGlja0Nvb3JkaW5hdGVzLCBpbmRleFBvcyk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5mb2N1c09uU3RvcCA9IGZhbHNlOyAvLyBwcmV2ZW50IHRvIHRyaWdnZXIgbWFwIGNsaWNrIGFuZCBTZWxlY3Qgb24gcm91dGVzIGF0IHNhbWUgdGltZS5cclxuICAgIH0sIDUwMCk7XHJcbiAgfVxyXG5cclxuICBnZW9sb2NhdGVTdG9wKGluZGV4OiBudW1iZXIpIHtcclxuICAgIG1vdmVUb09sRmVhdHVyZXModGhpcy5tYXAsIFt0aGlzLm1hcC5nZW9sb2NhdGlvbkZlYXR1cmVdLCBGZWF0dXJlTW90aW9uLk1vdmUpO1xyXG4gICAgY29uc3QgZ2VvbG9jYXRlQ29vcmRpbmF0ZXMgPSB0aGlzLm1hcC52aWV3Q29udHJvbGxlci5nZXRDZW50ZXIodGhpcy5wcm9qZWN0aW9uKTtcclxuICAgIHRoaXMuc3RvcHMuYXQoaW5kZXgpLnBhdGNoVmFsdWUoeyBzdG9wQ29vcmRpbmF0ZXM6IGdlb2xvY2F0ZUNvb3JkaW5hdGVzIH0pO1xyXG4gICAgdGhpcy5hZGRTdG9wT3ZlcmxheShnZW9sb2NhdGVDb29yZGluYXRlcywgaW5kZXgpO1xyXG4gICAgdGhpcy5oYW5kbGVMb2NhdGlvblByb3Bvc2FscyhnZW9sb2NhdGVDb29yZGluYXRlcywgaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZFN0b3BPdmVybGF5KGNvb3JkaW5hdGVzOiBbbnVtYmVyLCBudW1iZXJdLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBkaXJlY3Rpb25zVGV4dCA9IHRoaXMuZGlyZWN0aW9uc1RleHQoaW5kZXgpO1xyXG4gICAgbGV0IHN0b3BDb2xvcjtcclxuICAgIGxldCBzdG9wVGV4dDtcclxuICAgIGlmIChkaXJlY3Rpb25zVGV4dCA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICBzdG9wQ29sb3IgPSAnZ3JlZW4nO1xyXG4gICAgICBzdG9wVGV4dCA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uZ2VvLmRpcmVjdGlvbnNGb3JtLnN0YXJ0J1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb25zVGV4dCA9PT0gJ2VuZCcpIHtcclxuICAgICAgc3RvcENvbG9yID0gJ3JlZCc7XHJcbiAgICAgIHN0b3BUZXh0ID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5nZW8uZGlyZWN0aW9uc0Zvcm0uZW5kJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RvcENvbG9yID0gJ3llbGxvdyc7XHJcbiAgICAgIHN0b3BUZXh0ID1cclxuICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICdpZ28uZ2VvLmRpcmVjdGlvbnNGb3JtLmludGVybWVkaWF0ZSdcclxuICAgICAgICApICtcclxuICAgICAgICAnICMnICtcclxuICAgICAgICBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBvbGdlb20uUG9pbnQoXHJcbiAgICAgIG9scHJvai50cmFuc2Zvcm0oY29vcmRpbmF0ZXMsIHRoaXMucHJvamVjdGlvbiwgdGhpcy5tYXAucHJvamVjdGlvbilcclxuICAgICk7XHJcblxyXG4gICAgY29uc3Qgc3RvcElEID0gdGhpcy5nZXRTdG9wT3ZlcmxheUlEKGluZGV4KTtcclxuICAgIGNvbnN0IGdlb2pzb25HZW9tID0gbmV3IE9sR2VvSlNPTigpLndyaXRlR2VvbWV0cnlPYmplY3QoZ2VvbWV0cnksIHtcclxuICAgICAgZmVhdHVyZVByb2plY3Rpb246IHRoaXMubWFwLnByb2plY3Rpb24sXHJcbiAgICAgIGRhdGFQcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBwcmV2aW91c1N0b3AgPSB0aGlzLnN0b3BzU3RvcmUuZ2V0KHN0b3BJRCk7XHJcbiAgICBjb25zdCBwcmV2aW91c1N0b3BSZXZpc2lvbiA9IHByZXZpb3VzU3RvcCA/IHByZXZpb3VzU3RvcC5tZXRhLnJldmlzaW9uIDogMDtcclxuXHJcbiAgICBjb25zdCBzdG9wRmVhdHVyZTogRmVhdHVyZSA9IHtcclxuICAgICAgdHlwZTogRkVBVFVSRSxcclxuICAgICAgZ2VvbWV0cnk6IGdlb2pzb25HZW9tLFxyXG4gICAgICBwcm9qZWN0aW9uOiB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgaWQ6IHN0b3BJRCxcclxuICAgICAgICB0eXBlOiAnc3RvcCcsXHJcbiAgICAgICAgc3RvcFRleHQsXHJcbiAgICAgICAgc3RvcENvbG9yLFxyXG4gICAgICAgIHN0b3BPcGFjaXR5OiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBpZDogc3RvcElELFxyXG4gICAgICAgIHJldmlzaW9uOiBwcmV2aW91c1N0b3BSZXZpc2lvbiArIDFcclxuICAgICAgfSxcclxuICAgICAgb2w6IG5ldyBvbEZlYXR1cmUoeyBnZW9tZXRyeSB9KVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnN0b3BzU3RvcmUudXBkYXRlKHN0b3BGZWF0dXJlKTtcclxuICAgIHRoaXMuZ2V0Um91dGVzKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFN0b3BPdmVybGF5SUQoaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICBsZXQgdHh0O1xyXG4gICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgIHR4dCA9ICdzdGFydCc7XHJcbiAgICB9IGVsc2UgaWYgKGluZGV4ID09PSB0aGlzLnN0b3BzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdHh0ID0gJ2VuZCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0eHQgPSBpbmRleDtcclxuICAgIH1cclxuICAgIHJldHVybiAnZGlyZWN0aW9uc1N0b3BfJyArIHR4dDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGVsZXRlU3RvcmVGZWF0dXJlQnlJRChzdG9yZSwgaWQpIHtcclxuICAgIGNvbnN0IGVudGl0eSA9IHN0b3JlLmdldChpZCk7XHJcbiAgICBpZiAoZW50aXR5KSB7XHJcbiAgICAgIHN0b3JlLmRlbGV0ZShlbnRpdHkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRVcmwoKSB7XHJcbiAgICBpZiAoIXRoaXMucm91dGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpcmVjdGlvbnNLZXkgPSB0aGlzLnJvdXRlLm9wdGlvbnMuZGlyZWN0aW9uc0Nvb3JkS2V5O1xyXG4gICAgY29uc3Qgc3RvcHNDb29yZGluYXRlcyA9IFtdO1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmRpcmVjdGlvbnNGb3JtU2VydmljZSAmJlxyXG4gICAgICB0aGlzLmRpcmVjdGlvbnNGb3JtU2VydmljZS5nZXRTdG9wc0Nvb3JkaW5hdGVzKCkgJiZcclxuICAgICAgdGhpcy5kaXJlY3Rpb25zRm9ybVNlcnZpY2UuZ2V0U3RvcHNDb29yZGluYXRlcygpLmxlbmd0aCAhPT0gMFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuZGlyZWN0aW9uc0Zvcm1TZXJ2aWNlLmdldFN0b3BzQ29vcmRpbmF0ZXMoKS5mb3JFYWNoKGNvb3JkID0+IHtcclxuICAgICAgICBzdG9wc0Nvb3JkaW5hdGVzLnB1c2gocm91bmRDb29yZFRvKGNvb3JkLCA2KSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbGV0IGRpcmVjdGlvbnNVcmwgPSAnJztcclxuICAgIGlmIChzdG9wc0Nvb3JkaW5hdGVzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgIGRpcmVjdGlvbnNVcmwgPSBgJHtkaXJlY3Rpb25zS2V5fT0ke3N0b3BzQ29vcmRpbmF0ZXMuam9pbignOycpfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGAke2xvY2F0aW9uLm9yaWdpbn0ke1xyXG4gICAgICBsb2NhdGlvbi5wYXRobmFtZVxyXG4gICAgfT90b29sPWRpcmVjdGlvbnMmJHtkaXJlY3Rpb25zVXJsfWA7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgc3R5bGUgZm9yIHRoZSBkaXJlY3Rpb25zIHN0b3BzIGFuZCByb3V0ZXNcclxuICogQHBhcmFtIGZlYXR1cmUgT2xGZWF0dXJlXHJcbiAqIEByZXR1cm5zIE9MIHN0eWxlIGZ1bmN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RvcE1hcmtlcihmZWF0dXJlOiBvbEZlYXR1cmUsIHJlc29sdXRpb246IG51bWJlcik6IG9sc3R5bGUuU3R5bGUge1xyXG5cclxuICBjb25zdCB2ZXJ0ZXhTdHlsZSA9IFtcclxuICAgIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgZ2VvbWV0cnk6IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKSxcclxuICAgICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkNpcmNsZSh7XHJcbiAgICAgICAgcmFkaXVzOiA3LFxyXG4gICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHsgY29sb3I6ICcjRkYwMDAwJywgd2lkdGg6IDMgfSlcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgXTtcclxuXHJcbiAgY29uc3Qgc3RvcFN0eWxlID0gbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgaW1hZ2U6IG5ldyBvbHN0eWxlLkljb24oe1xyXG4gICAgICBzcmM6ICcuL2Fzc2V0cy9pZ28yL2dlby9pY29ucy9wbGFjZV8nICsgZmVhdHVyZS5nZXQoJ3N0b3BDb2xvcicpICsgJ18zNnB4LnN2ZycsXHJcbiAgICAgIG9wYWNpdHkgOiBmZWF0dXJlLmdldCgnc3RvcE9wYWNpdHknKSxcclxuICAgICAgaW1nU2l6ZTogWzM2LCAzNl0sIC8vIGZvciBpZVxyXG4gICAgICBhbmNob3I6IFswLjUsIDAuOTJdXHJcbiAgICB9KSxcclxuXHJcbiAgICB0ZXh0OiBuZXcgb2xzdHlsZS5UZXh0KHtcclxuICAgICAgdGV4dDogZmVhdHVyZS5nZXQoJ3N0b3BUZXh0JyksXHJcbiAgICAgIGZvbnQ6ICcxMnB4IENhbGlicmksc2Fucy1zZXJpZicsXHJcbiAgICAgIGZpbGw6IG5ldyBvbHN0eWxlLkZpbGwoeyBjb2xvcjogJyMwMDAnIH0pLFxyXG4gICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7IGNvbG9yOiAnI2ZmZicsIHdpZHRoOiAzIH0pLFxyXG4gICAgICBvdmVyZmxvdzogdHJ1ZVxyXG4gICAgfSlcclxuICB9KTtcclxuXHJcbiAgY29uc3Qgcm91dGVTdHlsZSA9IFtcclxuICAgIG5ldyBvbHN0eWxlLlN0eWxlKHtcclxuICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2UoeyBjb2xvcjogJyM2YTc5ODInLCB3aWR0aDogMTAsIG9wYWNpdHk6IDAuNzUgfSlcclxuICAgIH0pLFxyXG4gICAgbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICBzdHJva2U6IG5ldyBvbHN0eWxlLlN0cm9rZSh7IGNvbG9yOiAnIzRmYTlkZCcsIHdpZHRoOiA2LCBvcGFjaXR5OiAwLjc1IH0pXHJcbiAgICB9KVxyXG4gIF07XHJcblxyXG4gIGlmIChmZWF0dXJlLmdldCgndHlwZScpID09PSAnc3RvcCcpIHtcclxuICAgIHJldHVybiBzdG9wU3R5bGU7XHJcbiAgfVxyXG4gIGlmIChmZWF0dXJlLmdldCgndHlwZScpID09PSAndmVydGV4Jykge1xyXG4gICAgcmV0dXJuIHZlcnRleFN0eWxlO1xyXG4gIH1cclxuICBpZiAoZmVhdHVyZS5nZXQoJ3R5cGUnKSA9PT0gJ3JvdXRlJykge1xyXG4gICAgcmV0dXJuIHJvdXRlU3R5bGU7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=