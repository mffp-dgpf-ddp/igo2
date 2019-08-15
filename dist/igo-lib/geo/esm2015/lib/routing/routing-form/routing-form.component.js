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
export class RoutingFormComponent {
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
        const selectStops = new olinteraction.Select({
            layers: [stopsLayer.ol],
            condition: olcondition.pointerMove,
            hitTolerance: 7
        });
        /** @type {?} */
        const translateStop = new olinteraction.Translate({
            layers: [stopsLayer.ol],
            features: selectedStopFeature
        });
        // TODO: Check to disable pointermove IF a stop is already selected
        /** @type {?} */
        const selectRouteHover = new olinteraction.Select({
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
                const selectCoordinates = olproj.transform(((/** @type {?} */ (evt))).mapBrowserEvent.coordinate, this.map.projection, this.projection);
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
            const translationEndCoordinates = olproj.transform(evt.features
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
                    else {
                        // Not moving the translated point Only to suggest value into the UI.
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
        this.deleteRoutingOverlaybyID('endSegment');
        /** @type {?} */
        const geometry4326 = new olgeom.LineString(coordinates);
        /** @type {?} */
        const geometry3857 = geometry4326.transform('EPSG:4326', 'EPSG:3857');
        /** @type {?} */
        const routeSegmentCoordinates = ((/** @type {?} */ (geometry3857))).getCoordinates();
        /** @type {?} */
        const lastPoint = routeSegmentCoordinates[0];
        /** @type {?} */
        const geometry = new olgeom.Point(lastPoint);
        /** @type {?} */
        const feature = new olFeature({ geometry });
        feature.setId('endSegment');
        if (geometry === null) {
            return;
        }
        if (geometry.getType() === 'Point') {
            feature.setStyle([
                new olstyle.Style({
                    geometry,
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
        const geometry4326 = new olgeom.LineString(geom);
        /** @type {?} */
        const geometry3857 = geometry4326.transform('EPSG:4326', 'EPSG:3857');
        this.routingRoutesOverlayDataSource.ol.clear();
        /** @type {?} */
        const routingFeature = new olFeature({ geometry: geometry3857 });
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
                if (!olextent.intersects(proposalExtent, this.map.getExtent())) {
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
        const clickCoordinates = olproj.transform(event.coordinate, this.map.projection, this.projection);
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
        const geometry = new olgeom.Point(olproj.transform(coordinates, this.projection, this.map.projection));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9yb3V0aW5nL3JvdXRpbmctZm9ybS9yb3V0aW5nLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUlaLFFBQVEsRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsV0FBVyxFQUFFLFVBQVUsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQy9FLE9BQU8sRUFBZ0IsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxPQUFPLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sS0FBSyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxLQUFLLGFBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEtBQUssWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUU5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFFTCxlQUFlLEVBQ2YsY0FBYyxFQUNkLFlBQVksRUFDYixNQUFNLFlBQVksQ0FBQztBQUNwQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTlDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUs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REFBZ0Q7O0lBQ2hELG1EQUEwQzs7SUFDMUMsNkRBQXdEOztJQUN4RCw4REFBeUQ7O0lBRXpELDZDQUE0Qzs7SUFDNUMsMkNBQTRCOzs7OztJQUM1QiwyQ0FBb0I7Ozs7O0lBRXBCLDJDQUE0Qjs7Ozs7SUFDNUIsd0NBQXNCOztJQUN0QixrREFBMEI7Ozs7O0lBQzFCLCtDQUF3Qjs7Ozs7SUFXeEIscUNBQW1COzs7OztJQVFuQix5Q0FBd0I7Ozs7O0lBU3hCLHVDQUFvQjs7Ozs7SUFTcEIsb0NBQXFCOztJQUVyQixzQ0FBeUQ7Ozs7O0lBR3ZELDJDQUFnQzs7Ozs7SUFDaEMsOENBQXNDOzs7OztJQUN0QywrQ0FBd0M7Ozs7O0lBQ3hDLDhDQUFzQzs7Ozs7SUFDdEMsNkNBQW9DOzs7OztJQUNwQyw0Q0FBa0M7Ozs7O0lBQ2xDLGtEQUE4Qzs7Ozs7SUFDOUMscUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkluaXQsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3B0aW9uYWxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycywgRm9ybUFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0ICogYXMgb2xnZW9tIGZyb20gJ29sL2dlb20nO1xyXG5pbXBvcnQgKiBhcyBvbHByb2ogZnJvbSAnb2wvcHJvaic7XHJcbmltcG9ydCAqIGFzIG9sc3R5bGUgZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgKiBhcyBvbGNvbmRpdGlvbiBmcm9tICdvbC9ldmVudHMvY29uZGl0aW9uJztcclxuaW1wb3J0ICogYXMgb2xpbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbic7XHJcbmltcG9ydCAqIGFzIG9sZXh0ZW50IGZyb20gJ29sL2V4dGVudCc7XHJcbmltcG9ydCAqIGFzIG9sb2JzZXJ2YWJsZSBmcm9tICdvbC9PYnNlcnZhYmxlJztcclxuXHJcbmltcG9ydCB7IENsaXBib2FyZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHtcclxuICBNZXNzYWdlLFxyXG4gIExhbmd1YWdlU2VydmljZSxcclxuICBNZXNzYWdlU2VydmljZSxcclxuICBSb3V0ZVNlcnZpY2VcclxufSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgZ2V0RW50aXR5VGl0bGUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VhcmNoL3NoYXJlZC9zZWFyY2guc2VydmljZSc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy92ZWN0b3ItbGF5ZXInO1xyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2ZlYXR1cmUtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IGNyZWF0ZU92ZXJsYXlNYXJrZXJTdHlsZSB9IGZyb20gJy4uLy4uL292ZXJsYXkvc2hhcmVkL292ZXJsYXkudXRpbHMnO1xyXG5pbXBvcnQgeyBGZWF0dXJlTW90aW9uIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5lbnVtcyc7XHJcbmltcG9ydCB7IG1vdmVUb09sRmVhdHVyZXMgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLnV0aWxzJztcclxuXHJcbmltcG9ydCB7IFJvdXRpbmcgfSBmcm9tICcuLi9zaGFyZWQvcm91dGluZy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9yb3V0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSb3V0aW5nRm9ybVNlcnZpY2UgfSBmcm9tICcuL3JvdXRpbmctZm9ybS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IFF1ZXJ5U2VydmljZSB9IGZyb20gJy4uLy4uL3F1ZXJ5L3NoYXJlZC9xdWVyeS5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXJvdXRpbmctZm9ybScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3JvdXRpbmctZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcm91dGluZy1mb3JtLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFJvdXRpbmdGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgaW52YWxpZEtleXMgPSBbJ0NvbnRyb2wnLCAnU2hpZnQnLCAnQWx0J107XHJcblxyXG4gIHB1YmxpYyBzdG9wc0Zvcm06IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgcHJvamVjdGlvbiA9ICdFUFNHOjQzMjYnO1xyXG4gIHB1YmxpYyBjdXJyZW50U3RvcEluZGV4OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSByb3V0ZXNRdWVyaWVzJCQ6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIHByaXZhdGUgc3RyZWFtJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHJcbiAgcHVibGljIFJvdXRpbmdPdmVybGF5TWFya2VyU3R5bGU6IG9sc3R5bGUuU3R5bGU7XHJcbiAgcHVibGljIFJvdXRpbmdPdmVybGF5U3R5bGU6IG9sc3R5bGUuU3R5bGU7XHJcbiAgcHVibGljIHJvdXRpbmdTdG9wc092ZXJsYXlEYXRhU291cmNlOiBGZWF0dXJlRGF0YVNvdXJjZTtcclxuICBwdWJsaWMgcm91dGluZ1JvdXRlc092ZXJsYXlEYXRhU291cmNlOiBGZWF0dXJlRGF0YVNvdXJjZTtcclxuXHJcbiAgcHVibGljIHJvdXRlc1Jlc3VsdHM6IFJvdXRpbmdbXSB8IE1lc3NhZ2VbXTtcclxuICBwdWJsaWMgYWN0aXZlUm91dGU6IFJvdXRpbmc7XHJcbiAgcHJpdmF0ZSBzZWxlY3RSb3V0ZTtcclxuXHJcbiAgcHJpdmF0ZSBmb2N1c09uU3RvcCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgZm9jdXNLZXkgPSBbXTtcclxuICBwdWJsaWMgaW5pdGlhbFN0b3BzQ29vcmRzO1xyXG4gIHByaXZhdGUgYnJvd3Nlckxhbmd1YWdlO1xyXG5cclxuICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NjM2NDg1Mi9jcmVhdGUtaW5wdXQtZmllbGRzLWR5bmFtaWNhbGx5LWluLWFuZ3VsYXItMlxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCB0ZXJtKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Rlcm07XHJcbiAgfVxyXG4gIHNldCB0ZXJtKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3Rlcm0gPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfdGVybSA9ICcnO1xyXG5cclxuICBnZXQgZGVib3VuY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGVib3VuY2U7XHJcbiAgfVxyXG4gIHNldCBkZWJvdW5jZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9kZWJvdW5jZSA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9kZWJvdW5jZSA9IDMwMDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgbGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xlbmd0aDtcclxuICB9XHJcbiAgc2V0IGxlbmd0aCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9sZW5ndGggPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbGVuZ3RoID0gMztcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuXHJcbiAgQE91dHB1dCgpIHN1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXHJcbiAgICBwcml2YXRlIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcclxuICAgIHByaXZhdGUgcXVlcnlTZXJ2aWNlOiBRdWVyeVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRpbmdGb3JtU2VydmljZTogUm91dGluZ0Zvcm1TZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZTogUm91dGVTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBjaGFuZ2VSb3V0ZShzZWxlY3RlZFJvdXRlOiBSb3V0aW5nKSB7XHJcbiAgICB0aGlzLnNob3dSb3V0ZUdlb21ldHJ5KCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMudW5zdWJzY3JpYmVSb3V0ZXNRdWVyaWVzKCk7XHJcbiAgICB0aGlzLnVubGlzdGVuU2luZ2xlQ2xpY2soKTtcclxuICAgIHRoaXMucXVlcnlTZXJ2aWNlLnF1ZXJ5RW5hYmxlZCA9IHRydWU7XHJcbiAgICBjb25zdCBzdG9wQ29vcmRpbmF0ZXMgPSBbXTtcclxuXHJcbiAgICB0aGlzLnN0b3BzLnZhbHVlLmZvckVhY2goc3RvcCA9PiB7XHJcbiAgICAgIHN0b3BDb29yZGluYXRlcy5wdXNoKHN0b3Auc3RvcENvb3JkaW5hdGVzKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yb3V0aW5nUm91dGVzT3ZlcmxheURhdGFTb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgIHRoaXMucm91dGluZ1N0b3BzT3ZlcmxheURhdGFTb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgIHRoaXMucm91dGluZ0Zvcm1TZXJ2aWNlLnNldFN0b3BzQ29vcmRpbmF0ZXMoc3RvcENvb3JkaW5hdGVzKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5icm93c2VyTGFuZ3VhZ2UgPSB0aGlzLmxhbmd1YWdlU2VydmljZS5nZXRMYW5ndWFnZSgpO1xyXG4gICAgdGhpcy5zdG9wc0Zvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgcm91dGluZ1R5cGU6ICdjYXInLFxyXG4gICAgICByb3V0aW5nTW9kZTogJ2RyaXZpbmcnLCAvLyBsb29wXHJcbiAgICAgIHN0b3BPcmRlclByaW9yaXR5OiB0cnVlLFxyXG4gICAgICByb3V0aW5nRml4ZWRTdGFydEVuZDogZmFsc2UsXHJcbiAgICAgIHN0b3BzOiB0aGlzLmZvcm1CdWlsZGVyLmFycmF5KFtcclxuICAgICAgICB0aGlzLmNyZWF0ZVN0b3AoJ3N0YXJ0JyksXHJcbiAgICAgICAgdGhpcy5jcmVhdGVTdG9wKCdlbmQnKVxyXG4gICAgICBdKVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yb3V0aW5nU3RvcHNPdmVybGF5RGF0YVNvdXJjZSA9IG5ldyBGZWF0dXJlRGF0YVNvdXJjZSh7fSk7XHJcbiAgICB0aGlzLnJvdXRpbmdSb3V0ZXNPdmVybGF5RGF0YVNvdXJjZSA9IG5ldyBGZWF0dXJlRGF0YVNvdXJjZSh7fSk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnF1ZXJ5U2VydmljZS5xdWVyeUVuYWJsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZm9jdXNPblN0b3AgPSBmYWxzZTtcclxuICAgIGNvbnN0IHN0b3BzTGF5ZXIgPSBuZXcgVmVjdG9yTGF5ZXIoe1xyXG4gICAgICB0aXRsZTogJ3JvdXRpbmdTdG9wT3ZlcmxheScsXHJcbiAgICAgIHpJbmRleDogOTk5LFxyXG4gICAgICBpZDogJ3JvdXRpbmdTdG9wcycsXHJcbiAgICAgIHNvdXJjZTogdGhpcy5yb3V0aW5nU3RvcHNPdmVybGF5RGF0YVNvdXJjZSxcclxuICAgICAgc2hvd0luTGF5ZXJMaXN0OiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCByb3V0ZXNMYXllciA9IG5ldyBWZWN0b3JMYXllcih7XHJcbiAgICAgIHRpdGxlOiAncm91dGluZ1JvdXRlc092ZXJsYXknLFxyXG4gICAgICB6SW5kZXg6IDk5OSxcclxuICAgICAgaWQ6ICdyb3V0aW5nUm91dGVzJyxcclxuICAgICAgb3BhY2l0eTogMC43NSxcclxuICAgICAgc291cmNlOiB0aGlzLnJvdXRpbmdSb3V0ZXNPdmVybGF5RGF0YVNvdXJjZSxcclxuICAgICAgc2hvd0luTGF5ZXJMaXN0OiBmYWxzZVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5tYXAuYWRkTGF5ZXIocm91dGVzTGF5ZXIpO1xyXG4gICAgdGhpcy5tYXAuYWRkTGF5ZXIoc3RvcHNMYXllcik7XHJcblxyXG4gICAgbGV0IHNlbGVjdGVkU3RvcEZlYXR1cmU7XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0U3RvcHMgPSBuZXcgb2xpbnRlcmFjdGlvbi5TZWxlY3Qoe1xyXG4gICAgICBsYXllcnM6IFtzdG9wc0xheWVyLm9sXSxcclxuICAgICAgY29uZGl0aW9uOiBvbGNvbmRpdGlvbi5wb2ludGVyTW92ZSxcclxuICAgICAgaGl0VG9sZXJhbmNlOiA3XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0cmFuc2xhdGVTdG9wID0gbmV3IG9saW50ZXJhY3Rpb24uVHJhbnNsYXRlKHtcclxuICAgICAgbGF5ZXJzOiBbc3RvcHNMYXllci5vbF0sXHJcbiAgICAgIGZlYXR1cmVzOiBzZWxlY3RlZFN0b3BGZWF0dXJlXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBUT0RPOiBDaGVjayB0byBkaXNhYmxlIHBvaW50ZXJtb3ZlIElGIGEgc3RvcCBpcyBhbHJlYWR5IHNlbGVjdGVkXHJcbiAgICBjb25zdCBzZWxlY3RSb3V0ZUhvdmVyID0gbmV3IG9saW50ZXJhY3Rpb24uU2VsZWN0KHtcclxuICAgICAgbGF5ZXJzOiBbcm91dGVzTGF5ZXIub2xdLFxyXG4gICAgICBjb25kaXRpb246IG9sY29uZGl0aW9uLnBvaW50ZXJNb3ZlLFxyXG4gICAgICBoaXRUb2xlcmFuY2U6IDdcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0Um91dGUgPSBuZXcgb2xpbnRlcmFjdGlvbi5TZWxlY3Qoe1xyXG4gICAgICBsYXllcnM6IFtyb3V0ZXNMYXllci5vbF0sXHJcbiAgICAgIGhpdFRvbGVyYW5jZTogN1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5tYXAub2wub24oJ3BvaW50ZXJtb3ZlJywgZXZ0ID0+IHtcclxuICAgICAgY29uc3Qgc2VsZWN0Um91dGVDbnQgPSBzZWxlY3RSb3V0ZUhvdmVyLmdldEZlYXR1cmVzKCkuZ2V0TGVuZ3RoKCk7XHJcbiAgICAgIGlmIChzZWxlY3RSb3V0ZUNudCA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMucm91dGluZ0Zvcm1TZXJ2aWNlLnVuc2V0TWFwV2FpdGluZ0ZvclJvdXRpbmdDbGljaygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucm91dGluZ0Zvcm1TZXJ2aWNlLnNldE1hcFdhaXRpbmdGb3JSb3V0aW5nQ2xpY2soKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgc2VsZWN0U3RvcHMub24oJ3NlbGVjdCcsIGV2dCA9PiB7XHJcbiAgICAgIHNlbGVjdGVkU3RvcEZlYXR1cmUgPSBldnQudGFyZ2V0LmdldEZlYXR1cmVzKClbMF07XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNlbGVjdFJvdXRlLm9uKCdzZWxlY3QnLCBldnQgPT4ge1xyXG4gICAgICBpZiAodGhpcy5mb2N1c09uU3RvcCA9PT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBzZWxlY3RDb29yZGluYXRlcyA9IG9scHJvai50cmFuc2Zvcm0oXHJcbiAgICAgICAgICAoZXZ0IGFzIGFueSkubWFwQnJvd3NlckV2ZW50LmNvb3JkaW5hdGUsXHJcbiAgICAgICAgICB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICAgICAgdGhpcy5wcm9qZWN0aW9uXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmFkZFN0b3AoKTtcclxuICAgICAgICBjb25zdCBwb3MgPSB0aGlzLnN0b3BzLmxlbmd0aCAtIDI7XHJcbiAgICAgICAgdGhpcy5zdG9wcy5hdChwb3MpLnBhdGNoVmFsdWUoeyBzdG9wQ29vcmRpbmF0ZXM6IHNlbGVjdENvb3JkaW5hdGVzIH0pO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlTG9jYXRpb25Qcm9wb3NhbHMoc2VsZWN0Q29vcmRpbmF0ZXMsIHBvcyk7XHJcbiAgICAgICAgdGhpcy5hZGRTdG9wT3ZlcmxheShzZWxlY3RDb29yZGluYXRlcywgcG9zKTtcclxuICAgICAgICB0aGlzLnNlbGVjdFJvdXRlLmdldEZlYXR1cmVzKCkuY2xlYXIoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNlbGVjdFJvdXRlLmdldEZlYXR1cmVzKCkuY2xlYXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucm91dGVzUXVlcmllcyQkLnB1c2goXHJcbiAgICAgIHRoaXMuc3RvcHNGb3JtLnN0YXR1c0NoYW5nZXNcclxuICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUodGhpcy5fZGVib3VuY2UpKVxyXG4gICAgICAgIC5zdWJzY3JpYmUodmFsID0+IHRoaXMub25Gb3JtQ2hhbmdlKCkpXHJcbiAgICApO1xyXG5cclxuICAgIHRyYW5zbGF0ZVN0b3Aub24oJ3RyYW5zbGF0ZWVuZCcsIGV2dCA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZWRJRCA9IGV2dC5mZWF0dXJlcy5nZXRBcnJheSgpWzBdLmdldElkKCk7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZWRQb3MgPSB0cmFuc2xhdGVkSUQuc3BsaXQoJ18nKTtcclxuICAgICAgbGV0IHA7XHJcbiAgICAgIHN3aXRjaCAodHJhbnNsYXRlZFBvc1sxXSkge1xyXG4gICAgICAgIGNhc2UgJ3N0YXJ0JzpcclxuICAgICAgICAgIHAgPSAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZW5kJzpcclxuICAgICAgICAgIHAgPSB0aGlzLnN0b3BzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgcCA9IE51bWJlcih0cmFuc2xhdGVkUG9zWzFdKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0aW9uRW5kQ29vcmRpbmF0ZXMgPSBvbHByb2oudHJhbnNmb3JtKFxyXG4gICAgICAgIGV2dC5mZWF0dXJlc1xyXG4gICAgICAgICAgLmdldEFycmF5KClbMF1cclxuICAgICAgICAgIC5nZXRHZW9tZXRyeSgpXHJcbiAgICAgICAgICAuZ2V0Q29vcmRpbmF0ZXMoKSxcclxuICAgICAgICB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICAgIHRoaXMucHJvamVjdGlvblxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnN0b3BzXHJcbiAgICAgICAgLmF0KHApXHJcbiAgICAgICAgLnBhdGNoVmFsdWUoeyBzdG9wQ29vcmRpbmF0ZXM6IHRyYW5zbGF0aW9uRW5kQ29vcmRpbmF0ZXMgfSk7XHJcbiAgICAgIHRoaXMuc3RvcHMuYXQocCkucGF0Y2hWYWx1ZSh7IHN0b3BQcm9wb3NhbHM6IFtdIH0pO1xyXG4gICAgICB0aGlzLmhhbmRsZUxvY2F0aW9uUHJvcG9zYWxzKHRyYW5zbGF0aW9uRW5kQ29vcmRpbmF0ZXMsIHApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5tYXAub2wuYWRkSW50ZXJhY3Rpb24oc2VsZWN0U3RvcHMpO1xyXG4gICAgdGhpcy5tYXAub2wuYWRkSW50ZXJhY3Rpb24oc2VsZWN0Um91dGVIb3Zlcik7XHJcbiAgICB0aGlzLm1hcC5vbC5hZGRJbnRlcmFjdGlvbih0aGlzLnNlbGVjdFJvdXRlKTtcclxuICAgIHRoaXMubWFwLm9sLmFkZEludGVyYWN0aW9uKHRyYW5zbGF0ZVN0b3ApO1xyXG5cclxuICAgIHRoaXMucm91dGVzUXVlcmllcyQkLnB1c2goXHJcbiAgICAgIHRoaXMuc3RyZWFtJFxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgZGVib3VuY2VUaW1lKHRoaXMuX2RlYm91bmNlKSxcclxuICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcclxuICAgICAgICApXHJcbiAgICAgICAgLnN1YnNjcmliZSgodGVybTogc3RyaW5nKSA9PiB0aGlzLmhhbmRsZVRlcm1DaGFuZ2VkKHRlcm0pKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUxvY2F0aW9uUHJvcG9zYWxzKGNvb3JkaW5hdGVzOiBbbnVtYmVyLCBudW1iZXJdLCBzdG9wSW5kZXg6IG51bWJlcikge1xyXG4gICAgY29uc3QgZ3JvdXBlZExvY2F0aW9ucyA9IFtdO1xyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlXHJcbiAgICAgIC5yZXZlcnNlU2VhcmNoKGNvb3JkaW5hdGVzLCB7IHpvb206IHRoaXMubWFwLmdldFpvb20oKSB9KVxyXG4gICAgICAubWFwKHJlcyA9PlxyXG4gICAgICAgIHRoaXMucm91dGVzUXVlcmllcyQkLnB1c2goXHJcbiAgICAgICAgICByZXMucmVxdWVzdC5waXBlKG1hcChmID0+IGYpKS5zdWJzY3JpYmUocmVzdWx0cyA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdHMuZm9yRWFjaChyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGdyb3VwZWRMb2NhdGlvbnMuZmlsdGVyKGYgPT4gZi5zb3VyY2UgPT09IHJlc3VsdC5zb3VyY2UpXHJcbiAgICAgICAgICAgICAgICAgIC5sZW5ndGggPT09IDBcclxuICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGdyb3VwZWRMb2NhdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgIHNvdXJjZTogcmVzdWx0LnNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgcmVzdWx0czogcmVzdWx0cy5tYXAociA9PiByLmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BzXHJcbiAgICAgICAgICAgICAgLmF0KHN0b3BJbmRleClcclxuICAgICAgICAgICAgICAucGF0Y2hWYWx1ZSh7IHN0b3BQcm9wb3NhbHM6IGdyb3VwZWRMb2NhdGlvbnMgfSk7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IFByZWZlciBhbm90aGVyIHNvdXJjZT9cclxuICAgICAgICAgICAgaWYgKHJlc3VsdHNbMF0pIHtcclxuICAgICAgICAgICAgICBpZiAocmVzdWx0c1swXS5zb3VyY2UuZ2V0SWQoKSA9PT0gJ2ljaGVyY2hlcmV2ZXJzZScpIHtcclxuICAgICAgICAgICAgICAgIC8vIHByZWZlciBhZGRyZXNzIHR5cGUuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0UG9zID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBmZWF0dXJlOiBhbnkgPSByZXN1bHRzW2ldLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlLnByb3BlcnRpZXMudHlwZSA9PT0gJ2FkcmVzc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0UG9zID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wcy5hdChzdG9wSW5kZXgpLnBhdGNoVmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgICBzdG9wUG9pbnQ6IGdldEVudGl0eVRpdGxlKHJlc3VsdHNbcmVzdWx0UG9zXSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdHNbcmVzdWx0UG9zXS5kYXRhLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wcy5hdChzdG9wSW5kZXgpLnBhdGNoVmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3BDb29yZGluYXRlczpcclxuICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbcmVzdWx0UG9zXS5kYXRhLmdlb21ldHJ5LmNvb3JkaW5hdGVzXHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgLy8gTm90IG1vdmluZyB0aGUgdHJhbnNsYXRlZCBwb2ludCBPbmx5IHRvIHN1Z2dlc3QgdmFsdWUgaW50byB0aGUgVUkuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMuc3RvcHMuYXQoc3RvcEluZGV4KS5wYXRjaFZhbHVlKHsgc3RvcFBvaW50OiBjb29yZGluYXRlcyB9KTtcclxuICAgICAgICAgICAgICB0aGlzLnN0b3BzLmF0KHN0b3BJbmRleCkucGF0Y2hWYWx1ZSh7IHN0b3BQcm9wb3NhbHM6IFtdIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHJvdXRpbmdUZXh0KGluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgIHJldHVybiAnc3RhcnQnO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PT0gdGhpcy5zdG9wcy5sZW5ndGggLSAxIHx8IHRoaXMuc3RvcHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHJldHVybiAnZW5kJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAnaW50ZXJtZWRpYXRlJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJhaXNlU3RvcChpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaW5kZXggPiAwKSB7XHJcbiAgICAgIHRoaXMubW92ZVN0b3AoaW5kZXgsIC0xKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvd2VyU3RvcChpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaW5kZXggPCB0aGlzLnN0b3BzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5tb3ZlU3RvcChpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3ZlU3RvcChpbmRleCwgZGlmZikge1xyXG4gICAgY29uc3QgZnJvbVZhbHVlID0gdGhpcy5zdG9wcy5hdChpbmRleCk7XHJcbiAgICB0aGlzLnJlbW92ZVN0b3AoaW5kZXgpO1xyXG4gICAgdGhpcy5zdG9wcy5pbnNlcnQoaW5kZXggKyBkaWZmLCBmcm9tVmFsdWUpO1xyXG4gICAgdGhpcy5zdG9wcy5hdChpbmRleCkucGF0Y2hWYWx1ZSh7IHJvdXRpbmdUZXh0OiB0aGlzLnJvdXRpbmdUZXh0KGluZGV4KSB9KTtcclxuICAgIHRoaXMuc3RvcHNcclxuICAgICAgLmF0KGluZGV4ICsgZGlmZilcclxuICAgICAgLnBhdGNoVmFsdWUoeyByb3V0aW5nVGV4dDogdGhpcy5yb3V0aW5nVGV4dChpbmRleCArIGRpZmYpIH0pO1xyXG4gICAgaWYgKHRoaXMuc3RvcHMuYXQoaW5kZXgpLnZhbHVlLnN0b3BDb29yZGluYXRlcykge1xyXG4gICAgICB0aGlzLmFkZFN0b3BPdmVybGF5KHRoaXMuc3RvcHMuYXQoaW5kZXgpLnZhbHVlLnN0b3BDb29yZGluYXRlcywgaW5kZXgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc3RvcHMuYXQoaW5kZXggKyBkaWZmKS52YWx1ZS5zdG9wQ29vcmRpbmF0ZXMpIHtcclxuICAgICAgdGhpcy5hZGRTdG9wT3ZlcmxheShcclxuICAgICAgICB0aGlzLnN0b3BzLmF0KGluZGV4ICsgZGlmZikudmFsdWUuc3RvcENvb3JkaW5hdGVzLFxyXG4gICAgICAgIGluZGV4ICsgZGlmZlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IHN0b3BzKCk6IEZvcm1BcnJheSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9wc0Zvcm0uZ2V0KCdzdG9wcycpIGFzIEZvcm1BcnJheTtcclxuICB9XHJcblxyXG4gIGdldFN0b3BzQ29vcmRpbmF0ZXMoKTogW251bWJlciwgbnVtYmVyXVtdIHtcclxuICAgIGNvbnN0IHN0b3BDb29yZGluYXRlcyA9IFtdO1xyXG4gICAgdGhpcy5zdG9wcy52YWx1ZS5mb3JFYWNoKHN0b3AgPT4ge1xyXG4gICAgICBpZiAoc3RvcC5zdG9wQ29vcmRpbmF0ZXMgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIHN0b3BDb29yZGluYXRlcy5wdXNoKHN0b3Auc3RvcENvb3JkaW5hdGVzKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJvdXRpbmdGb3JtU2VydmljZS5zZXRTdG9wc0Nvb3JkaW5hdGVzKHN0b3BDb29yZGluYXRlcyk7XHJcbiAgICByZXR1cm4gc3RvcENvb3JkaW5hdGVzO1xyXG4gIH1cclxuXHJcbiAgYWRkU3RvcCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGluc2VydEluZGV4ID0gdGhpcy5zdG9wcy5sZW5ndGggLSAxO1xyXG4gICAgdGhpcy5zdG9wcy5pbnNlcnQoaW5zZXJ0SW5kZXgsIHRoaXMuY3JlYXRlU3RvcCgpKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVN0b3Aocm91dGluZ1BvcyA9ICdpbnRlcm1lZGlhdGUnKTogRm9ybUdyb3VwIHtcclxuICAgIHJldHVybiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgc3RvcFBvaW50OiBbJyddLFxyXG4gICAgICBzdG9wUHJvcG9zYWxzOiBbW11dLFxyXG4gICAgICByb3V0aW5nVGV4dDogcm91dGluZ1BvcyxcclxuICAgICAgc3RvcENvb3JkaW5hdGVzOiBbJycsIFtWYWxpZGF0b3JzLnJlcXVpcmVkXV1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlU3RvcChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLnJvdXRpbmdTdG9wc092ZXJsYXlEYXRhU291cmNlLm9sLmNsZWFyKCk7XHJcbiAgICB0aGlzLnN0b3BzLnJlbW92ZUF0KGluZGV4KTtcclxuICAgIGxldCBjbnQgPSAwO1xyXG4gICAgdGhpcy5zdG9wcy52YWx1ZS5mb3JFYWNoKHN0b3AgPT4ge1xyXG4gICAgICB0aGlzLnN0b3BzLmF0KGNudCkucGF0Y2hWYWx1ZSh7IHJvdXRpbmdUZXh0OiB0aGlzLnJvdXRpbmdUZXh0KGNudCkgfSk7XHJcbiAgICAgIHRoaXMuYWRkU3RvcE92ZXJsYXkodGhpcy5zdG9wcy5hdChjbnQpLnZhbHVlLnN0b3BDb29yZGluYXRlcywgY250KTtcclxuICAgICAgY250Kys7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlc2V0Rm9ybSgpIHtcclxuICAgIHRoaXMucm91dGVzUmVzdWx0cyA9IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IG5iU3RvcHMgPSB0aGlzLnN0b3BzLmxlbmd0aDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmJTdG9wczsgaSsrKSB7XHJcbiAgICAgIHRoaXMuc3RvcHMucmVtb3ZlQXQoMCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0b3BzLmluc2VydCgwLCB0aGlzLmNyZWF0ZVN0b3AoJ3N0YXJ0JykpO1xyXG4gICAgdGhpcy5zdG9wcy5pbnNlcnQoMSwgdGhpcy5jcmVhdGVTdG9wKCdlbmQnKSk7XHJcbiAgICB0aGlzLnJvdXRpbmdTdG9wc092ZXJsYXlEYXRhU291cmNlLm9sLmdldEZlYXR1cmVzKCkuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgdGhpcy5kZWxldGVSb3V0aW5nT3ZlcmxheWJ5SUQoZWxlbWVudC5nZXRJZCgpKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yb3V0aW5nUm91dGVzT3ZlcmxheURhdGFTb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgIHRoaXMucm91dGluZ1N0b3BzT3ZlcmxheURhdGFTb3VyY2Uub2wuY2xlYXIoKTtcclxuICAgIHRoaXMuc2VsZWN0Um91dGUuZ2V0RmVhdHVyZXMoKS5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgb25Gb3JtQ2hhbmdlKCkge1xyXG4gICAgaWYgKHRoaXMuc3RvcHNGb3JtLnZhbGlkKSB7XHJcbiAgICAgIHRoaXMucm91dGluZ1JvdXRlc092ZXJsYXlEYXRhU291cmNlLm9sLmNsZWFyKCk7XHJcbiAgICAgIGNvbnN0IGNvb3JkcyA9IHRoaXMuZ2V0U3RvcHNDb29yZGluYXRlcygpO1xyXG4gICAgICBpZiAoY29vcmRzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgdGhpcy5nZXRSb3V0ZXMoY29vcmRzKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJvdXRpbmdSb3V0ZXNPdmVybGF5RGF0YVNvdXJjZS5vbC5jbGVhcigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3JtYXRTdGVwKHN0ZXAsIGNudCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0SW5zdHJ1Y3Rpb24oXHJcbiAgICAgIHN0ZXAubWFuZXV2ZXIudHlwZSxcclxuICAgICAgc3RlcC5tYW5ldXZlci5tb2RpZmllcixcclxuICAgICAgc3RlcC5uYW1lLFxyXG4gICAgICBzdGVwLm1hbmV1dmVyLmJlYXJpbmdfYWZ0ZXIsXHJcbiAgICAgIGNudCxcclxuICAgICAgc3RlcC5tYW5ldXZlci5leGl0LFxyXG4gICAgICBjbnQgPT09IHRoaXMuYWN0aXZlUm91dGUuc3RlcHMubGVuZ3RoIC0gMVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZvcm1hdEluc3RydWN0aW9uKFxyXG4gICAgdHlwZSxcclxuICAgIG1vZGlmaWVyLFxyXG4gICAgcm91dGUsXHJcbiAgICBkaXJlY3Rpb24sXHJcbiAgICBzdGVwUG9zaXRpb24sXHJcbiAgICBleGl0LFxyXG4gICAgbGFzdFN0ZXAgPSBmYWxzZVxyXG4gICkge1xyXG4gICAgbGV0IGRpcmVjdGl2ZUZyO1xyXG4gICAgbGV0IGRpcmVjdGl2ZUVuO1xyXG4gICAgbGV0IGltYWdlID0gJ2Fycm93X2ZvcndhcmQnO1xyXG4gICAgbGV0IGNzc0NsYXNzID0gJ3JvdGF0ZS0yNzAnO1xyXG4gICAgY29uc3QgdHJhbnNsYXRlZERpcmVjdGlvbiA9IHRoaXMudHJhbnNsYXRlQmVhcmluZyhkaXJlY3Rpb24pO1xyXG4gICAgY29uc3QgdHJhbnNsYXRlZE1vZGlmaWVyID0gdGhpcy50cmFuc2xhdGVNb2RpZmllcihtb2RpZmllcik7XHJcbiAgICBjb25zdCBlblByZWZpeCA9IG1vZGlmaWVyID09PSAnc3RyYWlnaHQnID8gJycgOiAnb24gdGhlICc7XHJcbiAgICBjb25zdCBmclByZWZpeCA9IG1vZGlmaWVyID09PSAnc3RyYWlnaHQnID8gJycgOiAnw6AgJztcclxuXHJcbiAgICBsZXQgZnJBZ2dyZWdhdGVkRGlyZWN0aW9uID0gZnJQcmVmaXggKyB0cmFuc2xhdGVkTW9kaWZpZXI7XHJcbiAgICBsZXQgZW5BZ2dyZWdhdGVkRGlyZWN0aW9uID0gZW5QcmVmaXggKyB0cmFuc2xhdGVkTW9kaWZpZXI7XHJcblxyXG4gICAgaWYgKG1vZGlmaWVyICYmIG1vZGlmaWVyLnNlYXJjaCgnc2xpZ2h0JykgPj0gMCkge1xyXG4gICAgICBlbkFnZ3JlZ2F0ZWREaXJlY3Rpb24gPSB0cmFuc2xhdGVkTW9kaWZpZXI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGlmaWVyID09PSAndXR1cm4nKSB7XHJcbiAgICAgIGltYWdlID0gJ2Zhc3RfZm9yd2FyZCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJ3JvdGF0ZS05MCc7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnc2hhcnAgcmlnaHQnKSB7XHJcbiAgICAgIGltYWdlID0gJ3N1YmRpcmVjdG9yeV9hcnJvd19yaWdodCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJ2ljb24tZmxpcHBlZCc7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAncmlnaHQnKSB7XHJcbiAgICAgIGltYWdlID0gJ3N1YmRpcmVjdG9yeV9hcnJvd19yaWdodCc7XHJcbiAgICAgIGNzc0NsYXNzID0gJ2ljb24tZmxpcHBlZCc7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnc2xpZ2h0IHJpZ2h0Jykge1xyXG4gICAgICBpbWFnZSA9ICdhcnJvd19mb3J3YXJkJztcclxuICAgICAgY3NzQ2xhc3MgPSAncm90YXRlLTI5MCc7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnc3RyYWlnaHQnKSB7XHJcbiAgICAgIGltYWdlID0gJ2Fycm93X2ZvcndhcmQnO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3NsaWdodCBsZWZ0Jykge1xyXG4gICAgICBpbWFnZSA9ICdhcnJvd19mb3J3YXJkJztcclxuICAgICAgY3NzQ2xhc3MgPSAncm90YXRlLTI1MCc7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnbGVmdCcpIHtcclxuICAgICAgaW1hZ2UgPSAnc3ViZGlyZWN0b3J5X2Fycm93X2xlZnQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICdpY29uLWZsaXBwZWQnO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3NoYXJwIGxlZnQnKSB7XHJcbiAgICAgIGltYWdlID0gJ3N1YmRpcmVjdG9yeV9hcnJvd19sZWZ0JztcclxuICAgICAgY3NzQ2xhc3MgPSAnaWNvbi1mbGlwcGVkJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZSA9PT0gJ3R1cm4nKSB7XHJcbiAgICAgIGlmIChtb2RpZmllciA9PT0gJ3N0cmFpZ2h0Jykge1xyXG4gICAgICAgIGRpcmVjdGl2ZUZyID0gJ0NvbnRpbnVlciBzdXIgJyArIHJvdXRlO1xyXG4gICAgICAgIGRpcmVjdGl2ZUVuID0gJ0NvbnRpbnVlIG9uICcgKyByb3V0ZTtcclxuICAgICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3V0dXJuJykge1xyXG4gICAgICAgIGRpcmVjdGl2ZUZyID0gJ0ZhaXJlIGRlbWktdG91ciBzdXIgJyArIHJvdXRlO1xyXG4gICAgICAgIGRpcmVjdGl2ZUVuID0gJ01ha2UgdS10dXJuIG9uICcgKyByb3V0ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkaXJlY3RpdmVGciA9ICdUb3VybmVyICcgKyBmckFnZ3JlZ2F0ZWREaXJlY3Rpb24gKyAnIHN1ciAnICsgcm91dGU7XHJcbiAgICAgICAgZGlyZWN0aXZlRW4gPSAnVHVybiAnICsgdHJhbnNsYXRlZE1vZGlmaWVyICsgJyBvbnRvICcgKyByb3V0ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnbmV3IG5hbWUnKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID1cclxuICAgICAgICAnQ29udGludWVyIGVuIGRpcmVjdGlvbiAnICsgdHJhbnNsYXRlZERpcmVjdGlvbiArICcgc3VyICcgKyByb3V0ZTtcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnSGVhZCAnICsgdHJhbnNsYXRlZERpcmVjdGlvbiArICcgb24gJyArIHJvdXRlO1xyXG4gICAgICBpbWFnZSA9ICdleHBsb3JlJztcclxuICAgICAgY3NzQ2xhc3MgPSAnJztcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RlcGFydCcpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPVxyXG4gICAgICAgICdBbGxlciBlbiBkaXJlY3Rpb24gJyArIHRyYW5zbGF0ZWREaXJlY3Rpb24gKyAnIHN1ciAnICsgcm91dGU7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ0hlYWQgJyArIHRyYW5zbGF0ZWREaXJlY3Rpb24gKyAnIG9uICcgKyByb3V0ZTtcclxuICAgICAgaW1hZ2UgPSAnZXhwbG9yZSc7XHJcbiAgICAgIGNzc0NsYXNzID0gJyc7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdhcnJpdmUnKSB7XHJcbiAgICAgIGlmIChsYXN0U3RlcCkge1xyXG4gICAgICAgIGxldCBjb21hID0gJywgJztcclxuICAgICAgICBpZiAoIXRyYW5zbGF0ZWRNb2RpZmllcikge1xyXG4gICAgICAgICAgZnJBZ2dyZWdhdGVkRGlyZWN0aW9uID0gJyc7XHJcbiAgICAgICAgICBlbkFnZ3JlZ2F0ZWREaXJlY3Rpb24gPSAnJztcclxuICAgICAgICAgIGNvbWEgPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGlyZWN0aXZlRnIgPSAnVm91cyDDqnRlcyBhcnJpdsOpJyArIGNvbWEgKyBmckFnZ3JlZ2F0ZWREaXJlY3Rpb247XHJcbiAgICAgICAgZGlyZWN0aXZlRW4gPVxyXG4gICAgICAgICAgJ1lvdSBoYXZlIHJlYWNoZWQgeW91ciBkZXN0aW5hdGlvbicgKyBjb21hICsgZW5BZ2dyZWdhdGVkRGlyZWN0aW9uO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRpcmVjdGl2ZUZyID0gJ1ZvdXMgYXR0ZWlnbmV6IGxlIHBvaW50IGludGVybcOpZGlhcmUgc3VyICcgKyByb3V0ZTtcclxuICAgICAgICBkaXJlY3RpdmVFbiA9ICdZb3UgaGF2ZSByZWFjaGVkIHRoZSBpbnRlcm1lZGlhdGUgc3RvcCBvbnRvICcgKyByb3V0ZTtcclxuICAgICAgICBpbWFnZSA9ICdsb2NhdGlvbl9vbic7XHJcbiAgICAgICAgY3NzQ2xhc3MgPSAnJztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnbWVyZ2UnKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID0gJ0NvbnRpbnVlciBzdXIgJyArIHJvdXRlO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9ICdDb250aW51ZSBvbiAnICsgcm91dGU7XHJcbiAgICAgIGltYWdlID0gJ2Fycm93X2ZvcndhcmQnO1xyXG4gICAgICBjc3NDbGFzcyA9ICdyb3RhdGUtMjcwJztcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29uIHJhbXAnKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID0gXCJQcmVuZHJlIGwnZW50csOpZSBkJ2F1dG9yb3V0ZSBcIiArIGZyQWdncmVnYXRlZERpcmVjdGlvbjtcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnVGFrZSB0aGUgcmFtcCAnICsgZW5BZ2dyZWdhdGVkRGlyZWN0aW9uO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2ZmIHJhbXAnKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID0gXCJQcmVuZHJlIGxhIHNvcnRpZSBkJ2F1dG9yb3V0ZSBcIiArIGZyQWdncmVnYXRlZERpcmVjdGlvbjtcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnVGFrZSBleGl0ICcgKyBlbkFnZ3JlZ2F0ZWREaXJlY3Rpb247XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdmb3JrJykge1xyXG4gICAgICBpZiAobW9kaWZpZXIuc2VhcmNoKCdsZWZ0JykgPj0gMCkge1xyXG4gICAgICAgIGRpcmVjdGl2ZUZyID0gJ0dhcmRlciBsYSBnYXVjaGUgc3VyICcgKyByb3V0ZTtcclxuICAgICAgICBkaXJlY3RpdmVFbiA9ICdNZXJnZSBsZWZ0IG9udG8gJyArIHJvdXRlO1xyXG4gICAgICB9IGVsc2UgaWYgKG1vZGlmaWVyLnNlYXJjaCgncmlnaHQnKSA+PSAwKSB7XHJcbiAgICAgICAgZGlyZWN0aXZlRnIgPSAnR2FyZGVyIGxhIGRyb2l0ZSBzdXIgJyArIHJvdXRlO1xyXG4gICAgICAgIGRpcmVjdGl2ZUVuID0gJ01lcmdlIHJpZ2h0IG9udG8gJyArIHJvdXRlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRpcmVjdGl2ZUZyID0gJ0NvbnRpbnVlciBzdXIgJyArIHJvdXRlO1xyXG4gICAgICAgIGRpcmVjdGl2ZUVuID0gJ0NvbnRpbnVlIG9uICcgKyByb3V0ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnZW5kIG9mIHJvYWQnKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID1cclxuICAgICAgICAnw4AgbGEgZmluIGRlIGxhIHJvdXRlLCB0b3VybmVyICcgKyB0cmFuc2xhdGVkTW9kaWZpZXIgKyAnIHN1ciAnICsgcm91dGU7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID1cclxuICAgICAgICAnQXQgdGhlIGVuZCBvZiB0aGUgcm9hZCwgdHVybiAnICsgdHJhbnNsYXRlZE1vZGlmaWVyICsgJyBvbnRvICcgKyByb3V0ZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3VzZSBsYW5lJykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9ICdQcmVuZHJlIGxhIHZvaWUgZGUgLi4uICc7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ1Rha2UgdGhlIGxhbmUgLi4uJztcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2NvbnRpbnVlJyAmJiBtb2RpZmllciAhPT0gJ3V0dXJuJykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9ICdDb250aW51ZXIgc3VyICcgKyByb3V0ZTtcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnQ29udGludWUgb24gJyArIHJvdXRlO1xyXG4gICAgICBpbWFnZSA9ICdhcnJvd19mb3J3YXJkJztcclxuICAgICAgY3NzQ2xhc3MgPSAncm90YXRlLTI3MCc7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdyb3VuZGFib3V0Jykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9ICdBdSByb25kLXBvaW50LCBwcmVuZHJlIGxhICcgKyBleGl0O1xyXG4gICAgICBkaXJlY3RpdmVGciArPSBleGl0ID09PSAxID8gJ3JlJyA6ICdlJztcclxuICAgICAgZGlyZWN0aXZlRnIgKz0gJyBzb3J0aWUgdmVycyAnICsgcm91dGU7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ0F0IHRoZSByb3VuZGFib3V0LCB0YWtlIHRoZSAnICsgZXhpdDtcclxuICAgICAgZGlyZWN0aXZlRW4gKz0gZXhpdCA9PT0gMSA/ICdzdCcgOiAncmQnO1xyXG4gICAgICBkaXJlY3RpdmVFbiArPSAnIGV4aXQgdG93YXJkcyAnICsgcm91dGU7XHJcbiAgICAgIGltYWdlID0gJ2RvbnV0X2xhcmdlJztcclxuICAgICAgY3NzQ2xhc3MgPSAnJztcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3JvdGFyeScpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPSAnUm9uZC1wb2ludCByb3RhcnkuLi4uJztcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnUm91bmRhYm91dCByb3RhcnkuLi4uJztcclxuICAgICAgaW1hZ2UgPSAnZG9udXRfbGFyZ2UnO1xyXG4gICAgICBjc3NDbGFzcyA9ICcnO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAncm91bmRhYm91dCB0dXJuJykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9ICdSb25kLXBvaW50LCBwcmVuZHJlIGxhIC4uLic7XHJcbiAgICAgIGRpcmVjdGl2ZUVuID0gJ1JvdW5kYWJvdXQsIHRha2UgdGhlIC4uLic7XHJcbiAgICAgIGltYWdlID0gJ2RvbnV0X2xhcmdlJztcclxuICAgICAgY3NzQ2xhc3MgPSAnJztcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2V4aXQgcm91bmRhYm91dCcpIHtcclxuICAgICAgZGlyZWN0aXZlRnIgPSAnUG91cnN1aXZyZSB2ZXJzICcgKyByb3V0ZTtcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnQ29udGludWUgdG8gJyArIHJvdXRlO1xyXG4gICAgICBpbWFnZSA9ICdhcnJvd19mb3J3YXJkJztcclxuICAgICAgY3NzQ2xhc3MgPSAncm90YXRlLTI3MCc7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdub3RpZmljYXRpb24nKSB7XHJcbiAgICAgIGRpcmVjdGl2ZUZyID0gJ25vdGlmaWNhdGlvbiAuLi4uJztcclxuICAgICAgZGlyZWN0aXZlRW4gPSAnbm90aWZpY2F0aW9uIC4uLi4nO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3V0dXJuJykge1xyXG4gICAgICBkaXJlY3RpdmVGciA9XHJcbiAgICAgICAgJ0ZhaXJlIGRlbWktdG91ciBldCBjb250aW51ZXIgZW4gZGlyZWN0aW9uICcgK1xyXG4gICAgICAgIHRyYW5zbGF0ZWREaXJlY3Rpb24gK1xyXG4gICAgICAgICcgc3VyICcgK1xyXG4gICAgICAgIHJvdXRlO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9XHJcbiAgICAgICAgJ01ha2UgdS10dXJuIGFuZCBoZWFkICcgKyB0cmFuc2xhdGVkRGlyZWN0aW9uICsgJyBvbiAnICsgcm91dGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXJlY3RpdmVGciA9ICc/Pz8nO1xyXG4gICAgICBkaXJlY3RpdmVFbiA9ICc/Pz8nO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXN0U3RlcCkge1xyXG4gICAgICBpbWFnZSA9ICdmbGFnJztcclxuICAgICAgY3NzQ2xhc3MgPSAnJztcclxuICAgIH1cclxuICAgIGlmIChzdGVwUG9zaXRpb24gPT09IDApIHtcclxuICAgICAgaW1hZ2UgPSAnZXhwbG9yZSc7XHJcbiAgICAgIGNzc0NsYXNzID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRpcmVjdGl2ZTtcclxuICAgIGlmICh0aGlzLmJyb3dzZXJMYW5ndWFnZSA9PT0gJ2ZyJykge1xyXG4gICAgICBkaXJlY3RpdmUgPSBkaXJlY3RpdmVGcjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5icm93c2VyTGFuZ3VhZ2UgPT09ICdlbicpIHtcclxuICAgICAgZGlyZWN0aXZlID0gZGlyZWN0aXZlRW47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHsgaW5zdHJ1Y3Rpb246IGRpcmVjdGl2ZSwgaW1hZ2UsIGNzc0NsYXNzIH07XHJcbiAgfVxyXG5cclxuICB0cmFuc2xhdGVNb2RpZmllcihtb2RpZmllcikge1xyXG4gICAgaWYgKG1vZGlmaWVyID09PSAndXR1cm4nKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5yb3V0aW5nLnV0dXJuJyk7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnc2hhcnAgcmlnaHQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5yb3V0aW5nLnNoYXJwIHJpZ2h0J1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8ucm91dGluZy5yaWdodCcpO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3NsaWdodCByaWdodCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uZ2VvLnJvdXRpbmcuc2xpZ2h0IHJpZ2h0J1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3NoYXJwIGxlZnQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5yb3V0aW5nLnNoYXJwIGxlZnQnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnbGVmdCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnJvdXRpbmcubGVmdCcpO1xyXG4gICAgfSBlbHNlIGlmIChtb2RpZmllciA9PT0gJ3NsaWdodCBsZWZ0Jykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5nZW8ucm91dGluZy5zbGlnaHQgbGVmdCdcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICdzdHJhaWdodCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnJvdXRpbmcuc3RyYWlnaHQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBtb2RpZmllcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRyYW5zbGF0ZUJlYXJpbmcoYmVhcmluZykge1xyXG4gICAgaWYgKGJlYXJpbmcgPj0gMzM3IHx8IGJlYXJpbmcgPCAyMykge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uY2FyZGluYWxQb2ludHMubicpO1xyXG4gICAgfSBlbHNlIGlmIChiZWFyaW5nIDwgNjcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uZ2VvLmNhcmRpbmFsUG9pbnRzLm5lJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChiZWFyaW5nIDwgMTEzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5jYXJkaW5hbFBvaW50cy5lJyk7XHJcbiAgICB9IGVsc2UgaWYgKGJlYXJpbmcgPCAxNTcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uZ2VvLmNhcmRpbmFsUG9pbnRzLnNlJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChiZWFyaW5nIDwgMjAzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5jYXJkaW5hbFBvaW50cy5zJyk7XHJcbiAgICB9IGVsc2UgaWYgKGJlYXJpbmcgPCAyNDcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uZ2VvLmNhcmRpbmFsUG9pbnRzLnN3J1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChiZWFyaW5nIDwgMjkzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5jYXJkaW5hbFBvaW50cy53Jyk7XHJcbiAgICB9IGVsc2UgaWYgKGJlYXJpbmcgPCAzMzcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uZ2VvLmNhcmRpbmFsUG9pbnRzLm53J1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9ybWF0RGlzdGFuY2UoZGlzdGFuY2UpIHtcclxuICAgIGlmIChkaXN0YW5jZSA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZGlzdGFuY2UgPj0gMTAwMDAwKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKGRpc3RhbmNlIC8gMTAwMCkgKyAnIGttJztcclxuICAgIH1cclxuICAgIGlmIChkaXN0YW5jZSA+PSAxMDAwMCkge1xyXG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChkaXN0YW5jZSAvIDEwMCkgLyAxMCArICcga20nO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpc3RhbmNlID49IDEwMCkge1xyXG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChkaXN0YW5jZSAvIDEwMCkgLyAxMCArICcga20nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRpc3RhbmNlICsgJyBtJztcclxuICB9XHJcblxyXG4gIGZvcm1hdER1cmF0aW9uKGR1cmF0aW9uOiBudW1iZXIsIHN1bW1hcnkgPSBmYWxzZSkge1xyXG4gICAgaWYgKGR1cmF0aW9uID49IDM2MDApIHtcclxuICAgICAgY29uc3QgaG91ciA9IE1hdGguZmxvb3IoZHVyYXRpb24gLyAzNjAwKTtcclxuICAgICAgY29uc3QgbWludXRlID0gTWF0aC5yb3VuZCgoZHVyYXRpb24gLyAzNjAwIC0gaG91cikgKiA2MCk7XHJcbiAgICAgIGlmIChtaW51dGUgPT09IDYwKSB7XHJcbiAgICAgICAgcmV0dXJuIGhvdXIgKyAxICsgJyBoJztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gaG91ciArICcgaCAnICsgbWludXRlICsgJyBtaW4nO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkdXJhdGlvbiA+PSA2MCkge1xyXG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChkdXJhdGlvbiAvIDYwKSArICcgbWluJztcclxuICAgIH1cclxuICAgIHJldHVybiBkdXJhdGlvbiArICcgcyc7XHJcbiAgfVxyXG5cclxuICBzaG93U2VnbWVudChzdGVwLCB6b29tVG9FeHRlbnQgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5zaG93Um91dGVTZWdtZW50R2VvbWV0cnkoc3RlcC5nZW9tZXRyeS5jb29yZGluYXRlcywgem9vbVRvRXh0ZW50KTtcclxuICB9XHJcblxyXG4gIHNob3dSb3V0ZVNlZ21lbnRHZW9tZXRyeShjb29yZGluYXRlcywgem9vbVRvRXh0ZW50ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuZGVsZXRlUm91dGluZ092ZXJsYXlieUlEKCdlbmRTZWdtZW50Jyk7XHJcbiAgICBjb25zdCBnZW9tZXRyeTQzMjYgPSBuZXcgb2xnZW9tLkxpbmVTdHJpbmcoY29vcmRpbmF0ZXMpO1xyXG4gICAgY29uc3QgZ2VvbWV0cnkzODU3ID0gZ2VvbWV0cnk0MzI2LnRyYW5zZm9ybSgnRVBTRzo0MzI2JywgJ0VQU0c6Mzg1NycpO1xyXG4gICAgY29uc3Qgcm91dGVTZWdtZW50Q29vcmRpbmF0ZXMgPSAoZ2VvbWV0cnkzODU3IGFzIGFueSkuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuICAgIGNvbnN0IGxhc3RQb2ludCA9IHJvdXRlU2VnbWVudENvb3JkaW5hdGVzWzBdO1xyXG5cclxuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IG9sZ2VvbS5Qb2ludChsYXN0UG9pbnQpO1xyXG4gICAgY29uc3QgZmVhdHVyZSA9IG5ldyBvbEZlYXR1cmUoeyBnZW9tZXRyeSB9KTtcclxuICAgIGZlYXR1cmUuc2V0SWQoJ2VuZFNlZ21lbnQnKTtcclxuXHJcbiAgICBpZiAoZ2VvbWV0cnkgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGdlb21ldHJ5LmdldFR5cGUoKSA9PT0gJ1BvaW50Jykge1xyXG4gICAgICBmZWF0dXJlLnNldFN0eWxlKFtcclxuICAgICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgICBnZW9tZXRyeSxcclxuICAgICAgICAgIGltYWdlOiBuZXcgb2xzdHlsZS5DaXJjbGUoe1xyXG4gICAgICAgICAgICByYWRpdXM6IDcsXHJcbiAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHsgY29sb3I6ICcjRkYwMDAwJywgd2lkdGg6IDMgfSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgXSk7XHJcbiAgICB9XHJcbiAgICBpZiAoem9vbVRvRXh0ZW50KSB7XHJcbiAgICAgIHRoaXMubWFwLnZpZXdDb250cm9sbGVyLnpvb21Ub0V4dGVudChmZWF0dXJlLmdldEdlb21ldHJ5KCkuZ2V0RXh0ZW50KCkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yb3V0aW5nUm91dGVzT3ZlcmxheURhdGFTb3VyY2Uub2wuYWRkRmVhdHVyZShmZWF0dXJlKTtcclxuICB9XHJcblxyXG4gIHpvb21Sb3V0ZSgpIHtcclxuICAgIHRoaXMubWFwLnZpZXdDb250cm9sbGVyLnpvb21Ub0V4dGVudCh0aGlzLnJvdXRpbmdSb3V0ZXNPdmVybGF5RGF0YVNvdXJjZS5vbC5nZXRFeHRlbnQoKSk7XHJcbiAgfVxyXG5cclxuICBzaG93Um91dGVHZW9tZXRyeShtb3ZlVG9FeHRlbnQgPSBmYWxzZSkge1xyXG4gICAgY29uc3QgZ2VvbSA9IHRoaXMuYWN0aXZlUm91dGUuZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XHJcbiAgICBjb25zdCBnZW9tZXRyeTQzMjYgPSBuZXcgb2xnZW9tLkxpbmVTdHJpbmcoZ2VvbSk7XHJcbiAgICBjb25zdCBnZW9tZXRyeTM4NTcgPSBnZW9tZXRyeTQzMjYudHJhbnNmb3JtKCdFUFNHOjQzMjYnLCAnRVBTRzozODU3Jyk7XHJcbiAgICB0aGlzLnJvdXRpbmdSb3V0ZXNPdmVybGF5RGF0YVNvdXJjZS5vbC5jbGVhcigpO1xyXG4gICAgY29uc3Qgcm91dGluZ0ZlYXR1cmUgPSBuZXcgb2xGZWF0dXJlKHsgZ2VvbWV0cnk6IGdlb21ldHJ5Mzg1NyB9KTtcclxuICAgIHJvdXRpbmdGZWF0dXJlLnNldFN0eWxlKFtcclxuICAgICAgbmV3IG9sc3R5bGUuU3R5bGUoe1xyXG4gICAgICAgIHN0cm9rZTogbmV3IG9sc3R5bGUuU3Ryb2tlKHsgY29sb3I6ICcjNmE3OTgyJywgd2lkdGg6IDEwIH0pXHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXcgb2xzdHlsZS5TdHlsZSh7XHJcbiAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2UoeyBjb2xvcjogJyM0ZmE5ZGQnLCB3aWR0aDogNiB9KVxyXG4gICAgICB9KVxyXG4gICAgXSk7XHJcbiAgICB0aGlzLnJvdXRpbmdSb3V0ZXNPdmVybGF5RGF0YVNvdXJjZS5vbC5hZGRGZWF0dXJlKHJvdXRpbmdGZWF0dXJlKTtcclxuICAgIGlmIChtb3ZlVG9FeHRlbnQpIHtcclxuICAgICAgdGhpcy5tYXAudmlld0NvbnRyb2xsZXIuem9vbVRvRXh0ZW50KHRoaXMucm91dGluZ1JvdXRlc092ZXJsYXlEYXRhU291cmNlLm9sLmdldEV4dGVudCgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFJvdXRlcyhzdG9wc0FycmF5Q29vcmRpbmF0ZXMsIG1vdmVUb0V4dGVudCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCByb3V0ZVJlc3BvbnNlID0gdGhpcy5yb3V0aW5nU2VydmljZS5yb3V0ZShzdG9wc0FycmF5Q29vcmRpbmF0ZXMpO1xyXG4gICAgaWYgKHJvdXRlUmVzcG9uc2UpIHtcclxuICAgICAgcm91dGVSZXNwb25zZS5tYXAocmVzID0+XHJcbiAgICAgICAgdGhpcy5yb3V0ZXNRdWVyaWVzJCQucHVzaChcclxuICAgICAgICAgIHJlcy5zdWJzY3JpYmUocm91dGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlc1Jlc3VsdHMgPSByb3V0ZTtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVSb3V0ZSA9IHRoaXMucm91dGVzUmVzdWx0c1swXSBhcyBSb3V0aW5nO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dSb3V0ZUdlb21ldHJ5KG1vdmVUb0V4dGVudCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdW5saXN0ZW5TaW5nbGVDbGljaygpIHtcclxuICAgIGlmICh0aGlzLmZvY3VzS2V5Lmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICB0aGlzLmZvY3VzS2V5LmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICBvbG9ic2VydmFibGUudW5CeUtleShrZXkpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVSb3V0ZXNRdWVyaWVzKCkge1xyXG4gICAgdGhpcy5yb3V0ZXNRdWVyaWVzJCQuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcclxuICAgIHRoaXMucm91dGVzUXVlcmllcyQkID0gW107XHJcbiAgfVxyXG5cclxuICBjb3B5TGlua1RvQ2xpcGJvYXJkKCkge1xyXG4gICAgY29uc3Qgc3VjY2Vzc2Z1bCA9IENsaXBib2FyZC5jb3B5KHRoaXMuZ2V0VXJsKCkpO1xyXG4gICAgaWYgKHN1Y2Nlc3NmdWwpIHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnJvdXRpbmdGb3JtLmRpYWxvZy5jb3B5VGl0bGUnKTtcclxuICAgICAgY29uc3QgbXNnID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8ucm91dGluZ0Zvcm0uZGlhbG9nLmNvcHlNc2dMaW5rJyk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2Vzcyhtc2csIHRpdGxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvcHlEaXJlY3Rpb25zVG9DbGlwYm9hcmQoKSB7XHJcbiAgICBjb25zdCBpbmRlbnQgPSAnXFx0JztcclxuICAgIGxldCBhY3RpdmVSb3V0ZURpcmVjdGl2ZSA9XHJcbiAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICdpZ28uZ2VvLnJvdXRpbmdGb3JtLmluc3RydWN0aW9ucydcclxuICAgICAgKSArICc6XFxuJztcclxuICAgIGxldCB3YXlQb2ludExpc3QgPSAnJztcclxuICAgIGNvbnN0IHN1bW1hcnkgPVxyXG4gICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5yb3V0aW5nRm9ybS5zdW1tYXJ5JykgK1xyXG4gICAgICAnOiBcXG4nICtcclxuICAgICAgaW5kZW50ICtcclxuICAgICAgdGhpcy5hY3RpdmVSb3V0ZS50aXRsZSArXHJcbiAgICAgICdcXG4nICtcclxuICAgICAgaW5kZW50ICtcclxuICAgICAgdGhpcy5mb3JtYXREaXN0YW5jZSh0aGlzLmFjdGl2ZVJvdXRlLmRpc3RhbmNlKSArXHJcbiAgICAgICdcXG4nICtcclxuICAgICAgaW5kZW50ICtcclxuICAgICAgdGhpcy5mb3JtYXREdXJhdGlvbih0aGlzLmFjdGl2ZVJvdXRlLmR1cmF0aW9uKSArXHJcbiAgICAgICdcXG5cXG4nICtcclxuICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8ucm91dGluZ0Zvcm0uc3RvcHNMaXN0JykgK1xyXG4gICAgICAnOlxcbic7XHJcblxyXG4gICAgY29uc3QgdXJsID1cclxuICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8ucm91dGluZ0Zvcm0ubGluaycpICtcclxuICAgICAgJzpcXG4nICtcclxuICAgICAgaW5kZW50ICtcclxuICAgICAgdGhpcy5nZXRVcmwoKTtcclxuXHJcbiAgICBsZXQgd2F5UG9pbnRzQ250ID0gMTtcclxuICAgIHRoaXMuc3RvcHMudmFsdWUuZm9yRWFjaChzdG9wID0+IHtcclxuICAgICAgbGV0IGNvb3JkID0gJyc7XHJcbiAgICAgIGxldCBzdG9wUG9pbnQgPSAnJztcclxuICAgICAgaWYgKHN0b3Auc3RvcFBvaW50ICE9PSBzdG9wLnN0b3BDb29yZGluYXRlcykge1xyXG4gICAgICAgIHN0b3BQb2ludCA9IHN0b3Auc3RvcFBvaW50O1xyXG4gICAgICAgIGNvb3JkID1cclxuICAgICAgICAgICcgKCcgK1xyXG4gICAgICAgICAgW3N0b3Auc3RvcENvb3JkaW5hdGVzWzFdLCBzdG9wLnN0b3BDb29yZGluYXRlc1swXV0uam9pbignLCcpICtcclxuICAgICAgICAgICcpJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzdG9wUG9pbnQgPSBbc3RvcC5zdG9wQ29vcmRpbmF0ZXNbMV0sIHN0b3Auc3RvcENvb3JkaW5hdGVzWzBdXS5qb2luKFxyXG4gICAgICAgICAgJywnXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgd2F5UG9pbnRMaXN0ID1cclxuICAgICAgICB3YXlQb2ludExpc3QgK1xyXG4gICAgICAgIGluZGVudCArXHJcbiAgICAgICAgd2F5UG9pbnRzQ250LnRvTG9jYWxlU3RyaW5nKCkgK1xyXG4gICAgICAgICcuICcgK1xyXG4gICAgICAgIHN0b3BQb2ludCArXHJcbiAgICAgICAgY29vcmQgK1xyXG4gICAgICAgICdcXG4nO1xyXG4gICAgICB3YXlQb2ludHNDbnQrKztcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIERpcmVjdGlvbnNcclxuICAgIGxldCBsb2NhbENudCA9IDA7XHJcbiAgICB0aGlzLmFjdGl2ZVJvdXRlLnN0ZXBzLmZvckVhY2goc3RlcCA9PiB7XHJcbiAgICAgIGNvbnN0IGluc3RydWN0aW9uID0gdGhpcy5mb3JtYXRTdGVwKHN0ZXAsIGxvY2FsQ250KS5pbnN0cnVjdGlvbjtcclxuICAgICAgY29uc3QgZGlzdGFuY2UgPVxyXG4gICAgICAgIHRoaXMuZm9ybWF0RGlzdGFuY2Uoc3RlcC5kaXN0YW5jZSkgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyAnJ1xyXG4gICAgICAgICAgOiAnICgnICsgdGhpcy5mb3JtYXREaXN0YW5jZShzdGVwLmRpc3RhbmNlKSArICcpJztcclxuICAgICAgYWN0aXZlUm91dGVEaXJlY3RpdmUgPVxyXG4gICAgICAgIGFjdGl2ZVJvdXRlRGlyZWN0aXZlICtcclxuICAgICAgICBpbmRlbnQgK1xyXG4gICAgICAgIChsb2NhbENudCArIDEpLnRvTG9jYWxlU3RyaW5nKCkgK1xyXG4gICAgICAgICcuICcgK1xyXG4gICAgICAgIGluc3RydWN0aW9uICtcclxuICAgICAgICBkaXN0YW5jZSArXHJcbiAgICAgICAgJ1xcbic7XHJcbiAgICAgIGxvY2FsQ250Kys7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBkaXJlY3Rpb25zQm9keSA9XHJcbiAgICAgIHN1bW1hcnkgKyB3YXlQb2ludExpc3QgKyAnXFxuJyArIHVybCArICdcXG5cXG4nICsgYWN0aXZlUm91dGVEaXJlY3RpdmU7XHJcblxyXG4gICAgY29uc3Qgc3VjY2Vzc2Z1bCA9IENsaXBib2FyZC5jb3B5KGRpcmVjdGlvbnNCb2R5KTtcclxuICAgIGlmIChzdWNjZXNzZnVsKSB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5yb3V0aW5nRm9ybS5kaWFsb2cuY29weVRpdGxlJyk7XHJcbiAgICAgIGNvbnN0IG1zZyA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnJvdXRpbmdGb3JtLmRpYWxvZy5jb3B5TXNnJyk7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2Vzcyhtc2csIHRpdGxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlVGVybUNoYW5nZWQodGVybTogc3RyaW5nKSB7XHJcbiAgICBpZiAodGVybSAhPT0gdW5kZWZpbmVkIHx8IHRlcm0ubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgIGNvbnN0IHNlYXJjaFByb3Bvc2FscyA9IFtdO1xyXG4gICAgICBjb25zdCByZXNlYXJjaGVzID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaCh0ZXJtKTtcclxuICAgICAgcmVzZWFyY2hlcy5tYXAocmVzID0+XHJcbiAgICAgICAgdGhpcy5yb3V0ZXNRdWVyaWVzJCQucHVzaChcclxuICAgICAgICAgIHJlcy5yZXF1ZXN0LnN1YnNjcmliZShyZXN1bHRzID0+IHtcclxuICAgICAgICAgICAgcmVzdWx0c1xyXG4gICAgICAgICAgICAgIC5maWx0ZXIociA9PiByLmRhdGEuZ2VvbWV0cnkpXHJcbiAgICAgICAgICAgICAgLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIHNlYXJjaFByb3Bvc2Fscy5maWx0ZXIociA9PiByLnNvdXJjZSA9PT0gZWxlbWVudC5zb3VyY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgIHNlYXJjaFByb3Bvc2Fscy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGVsZW1lbnQuc291cmNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IHJlc3VsdHMubWFwKHIgPT4gci5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wc1xyXG4gICAgICAgICAgICAgIC5hdCh0aGlzLmN1cnJlbnRTdG9wSW5kZXgpXHJcbiAgICAgICAgICAgICAgLnBhdGNoVmFsdWUoeyBzdG9wUHJvcG9zYWxzOiBzZWFyY2hQcm9wb3NhbHMgfSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldFRlcm0odGVybTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnRlcm0gPSB0ZXJtO1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmtleUlzVmFsaWQodGVybSkgJiZcclxuICAgICAgKHRlcm0ubGVuZ3RoID49IHRoaXMubGVuZ3RoIHx8IHRlcm0ubGVuZ3RoID09PSAwKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuc3RyZWFtJC5uZXh0KHRlcm0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBrZXlJc1ZhbGlkKGtleTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkS2V5cy5maW5kKHZhbHVlID0+IHZhbHVlID09PSBrZXkpID09PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBrZXl1cChpLCBldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgY29uc3QgdGVybSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XHJcbiAgICB0aGlzLnNldFRlcm0odGVybSk7XHJcbiAgICB0aGlzLm1hcC5vbC51bignc2luZ2xlY2xpY2snLCBldnQgPT4ge1xyXG4gICAgICB0aGlzLmhhbmRsZU1hcENsaWNrKGV2dCwgaSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNsZWFyU3RvcChzdG9wSW5kZXgpIHtcclxuICAgIHRoaXMuZGVsZXRlUm91dGluZ092ZXJsYXlieUlEKHRoaXMuZ2V0U3RvcE92ZXJsYXlJRChzdG9wSW5kZXgpKTtcclxuICAgIHRoaXMuc3RvcHMucmVtb3ZlQXQoc3RvcEluZGV4KTtcclxuICAgIHRoaXMuc3RvcHMuaW5zZXJ0KHN0b3BJbmRleCwgdGhpcy5jcmVhdGVTdG9wKHRoaXMucm91dGluZ1RleHQoc3RvcEluZGV4KSkpO1xyXG4gICAgdGhpcy5yb3V0aW5nUm91dGVzT3ZlcmxheURhdGFTb3VyY2Uub2wuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIGNob29zZVByb3Bvc2FsKHByb3Bvc2FsLCBpKSB7XHJcbiAgICBpZiAocHJvcG9zYWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBsZXQgZ2VvbUNvb3JkO1xyXG4gICAgICBjb25zdCBnZW9tID0gKHByb3Bvc2FsIGFzIGFueSkuZ2VvbWV0cnk7XHJcbiAgICAgIGlmIChnZW9tLnR5cGUgPT09ICdQb2ludCcpIHtcclxuICAgICAgICBnZW9tQ29vcmQgPSBnZW9tLmNvb3JkaW5hdGVzO1xyXG4gICAgICB9IGVsc2UgaWYgKGdlb20udHlwZS5zZWFyY2goJ0xpbmUnKSA+PSAwKSB7XHJcbiAgICAgICAgbGV0IGNvb3JkQXJyYXkgPSBbXTtcclxuICAgICAgICBpZiAoZ2VvbS5jb29yZGluYXRlcyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAvLyBNaWRkbGUgc2VnbWVudCBvZiBtdWx0aWxpbmVzdHJpbmdcclxuICAgICAgICAgIGNvb3JkQXJyYXkgPVxyXG4gICAgICAgICAgICBnZW9tLmNvb3JkaW5hdGVzW01hdGguZmxvb3IoZ2VvbS5jb29yZGluYXRlcy5sZW5ndGggLyAyKV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvb3JkQXJyYXkgPSBnZW9tLmNvb3JkaW5hdGVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBtaWRkbGUgcG9pbnQgb2YgY29vcmRzXHJcbiAgICAgICAgZ2VvbUNvb3JkID0gY29vcmRBcnJheVtNYXRoLmZsb29yKGNvb3JkQXJyYXkubGVuZ3RoIC8gMildO1xyXG4gICAgICB9IGVsc2UgaWYgKGdlb20udHlwZS5zZWFyY2goJ1BvbHlnb24nKSA+PSAwKSB7XHJcbiAgICAgICAgY29uc3QgcG9seWdvbkV4dGVudCA9IHByb3Bvc2FsLmV4dGVudDtcclxuICAgICAgICBjb25zdCBsb25nID1cclxuICAgICAgICAgIHBvbHlnb25FeHRlbnRbMF0gKyAocG9seWdvbkV4dGVudFsyXSAtIHBvbHlnb25FeHRlbnRbMF0pIC8gMjtcclxuICAgICAgICBjb25zdCBsYXQgPVxyXG4gICAgICAgICAgcG9seWdvbkV4dGVudFsxXSArIChwb2x5Z29uRXh0ZW50WzNdIC0gcG9seWdvbkV4dGVudFsxXSkgLyAyO1xyXG4gICAgICAgIGdlb21Db29yZCA9IFtsb25nLCBsYXRdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZ2VvbUNvb3JkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnN0b3BzLmF0KGkpLnBhdGNoVmFsdWUoeyBzdG9wQ29vcmRpbmF0ZXM6IGdlb21Db29yZCB9KTtcclxuICAgICAgICB0aGlzLmFkZFN0b3BPdmVybGF5KGdlb21Db29yZCwgaSk7XHJcbiAgICAgICAgY29uc3QgcHJvcG9zYWxFeHRlbnQgPSB0aGlzLnJvdXRpbmdTdG9wc092ZXJsYXlEYXRhU291cmNlLm9sXHJcbiAgICAgICAgICAuZ2V0RmVhdHVyZUJ5SWQodGhpcy5nZXRTdG9wT3ZlcmxheUlEKGkpKVxyXG4gICAgICAgICAgLmdldEdlb21ldHJ5KClcclxuICAgICAgICAgIC5nZXRFeHRlbnQoKTtcclxuXHJcbiAgICAgICAgaWYgKCFvbGV4dGVudC5pbnRlcnNlY3RzKHByb3Bvc2FsRXh0ZW50LCB0aGlzLm1hcC5nZXRFeHRlbnQoKSkpIHtcclxuICAgICAgICAgIHRoaXMubWFwLnZpZXdDb250cm9sbGVyLm1vdmVUb0V4dGVudChwcm9wb3NhbEV4dGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb2N1cyhpKSB7XHJcbiAgICB0aGlzLnVubGlzdGVuU2luZ2xlQ2xpY2soKTtcclxuICAgIHRoaXMuY3VycmVudFN0b3BJbmRleCA9IGk7XHJcbiAgICB0aGlzLmZvY3VzT25TdG9wID0gdHJ1ZTtcclxuICAgIHRoaXMucm91dGluZ0Zvcm1TZXJ2aWNlLnNldE1hcFdhaXRpbmdGb3JSb3V0aW5nQ2xpY2soKTtcclxuICAgIHRoaXMuZm9jdXNLZXkucHVzaChcclxuICAgICAgdGhpcy5tYXAub2wub25jZSgnc2luZ2xlY2xpY2snLCBldnQgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlTWFwQ2xpY2soZXZ0LCBpKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZU1hcENsaWNrKGV2ZW50OiBvbGNvbmRpdGlvbiwgaW5kZXhQb3M/KSB7XHJcbiAgICB0aGlzLnN0b3BzLmF0KGluZGV4UG9zKS5wYXRjaFZhbHVlKHsgc3RvcFByb3Bvc2FsczogW10gfSk7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50U3RvcEluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5hZGRTdG9wKCk7XHJcbiAgICAgIGluZGV4UG9zID0gdGhpcy5zdG9wcy5sZW5ndGggLSAyO1xyXG4gICAgICB0aGlzLnN0b3BzLmF0KGluZGV4UG9zKS52YWx1ZS5zdG9wUHJvcG9zYWxzID0gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbmRleFBvcyA9IHRoaXMuY3VycmVudFN0b3BJbmRleDtcclxuICAgIH1cclxuICAgIGNvbnN0IGNsaWNrQ29vcmRpbmF0ZXMgPSBvbHByb2oudHJhbnNmb3JtKFxyXG4gICAgICBldmVudC5jb29yZGluYXRlLFxyXG4gICAgICB0aGlzLm1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICB0aGlzLnByb2plY3Rpb25cclxuICAgICk7XHJcbiAgICB0aGlzLnN0b3BzLmF0KGluZGV4UG9zKS5wYXRjaFZhbHVlKHsgc3RvcENvb3JkaW5hdGVzOiBjbGlja0Nvb3JkaW5hdGVzIH0pO1xyXG5cclxuICAgIHRoaXMuaGFuZGxlTG9jYXRpb25Qcm9wb3NhbHMoY2xpY2tDb29yZGluYXRlcywgaW5kZXhQb3MpO1xyXG4gICAgdGhpcy5hZGRTdG9wT3ZlcmxheShjbGlja0Nvb3JkaW5hdGVzLCBpbmRleFBvcyk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5mb2N1c09uU3RvcCA9IGZhbHNlOyAvLyBwcmV2ZW50IHRvIHRyaWdnZXIgbWFwIGNsaWNrIGFuZCBTZWxlY3Qgb24gcm91dGVzIGF0IHNhbWUgdGltZS5cclxuICAgIH0sIDUwMCk7XHJcbiAgICB0aGlzLnJvdXRpbmdGb3JtU2VydmljZS51bnNldE1hcFdhaXRpbmdGb3JSb3V0aW5nQ2xpY2soKTtcclxuICB9XHJcblxyXG4gIGdlb2xvY2F0ZVN0b3AoaW5kZXg6IG51bWJlcikge1xyXG4gICAgbW92ZVRvT2xGZWF0dXJlcyh0aGlzLm1hcCwgW3RoaXMubWFwLmdlb2xvY2F0aW9uRmVhdHVyZV0sIEZlYXR1cmVNb3Rpb24uTW92ZSk7XHJcbiAgICBjb25zdCBnZW9sb2NhdGVDb29yZGluYXRlcyA9IHRoaXMubWFwLmdldENlbnRlcih0aGlzLnByb2plY3Rpb24pO1xyXG4gICAgdGhpcy5zdG9wcy5hdChpbmRleCkucGF0Y2hWYWx1ZSh7IHN0b3BDb29yZGluYXRlczogZ2VvbG9jYXRlQ29vcmRpbmF0ZXMgfSk7XHJcbiAgICB0aGlzLmFkZFN0b3BPdmVybGF5KGdlb2xvY2F0ZUNvb3JkaW5hdGVzLCBpbmRleCk7XHJcbiAgICB0aGlzLmhhbmRsZUxvY2F0aW9uUHJvcG9zYWxzKGdlb2xvY2F0ZUNvb3JkaW5hdGVzLCBpbmRleCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkU3RvcE92ZXJsYXkoY29vcmRpbmF0ZXM6IFtudW1iZXIsIG51bWJlcl0sIGluZGV4OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHJvdXRpbmdUZXh0ID0gdGhpcy5yb3V0aW5nVGV4dChpbmRleCk7XHJcbiAgICBsZXQgc3RvcENvbG9yO1xyXG4gICAgbGV0IHN0b3BUZXh0O1xyXG4gICAgaWYgKHJvdXRpbmdUZXh0ID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIHN0b3BDb2xvciA9ICdncmVlbic7XHJcbiAgICAgIHN0b3BUZXh0ID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgJ2lnby5nZW8ucm91dGluZ0Zvcm0uc3RhcnQnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKHJvdXRpbmdUZXh0ID09PSAnZW5kJykge1xyXG4gICAgICBzdG9wQ29sb3IgPSAncmVkJztcclxuICAgICAgc3RvcFRleHQgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAnaWdvLmdlby5yb3V0aW5nRm9ybS5lbmQnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdG9wQ29sb3IgPSAneWVsbG93JztcclxuICAgICAgc3RvcFRleHQgPVxyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgJ2lnby5nZW8ucm91dGluZ0Zvcm0uaW50ZXJtZWRpYXRlJ1xyXG4gICAgICAgICkgK1xyXG4gICAgICAgICcgIycgK1xyXG4gICAgICAgIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IG9sZ2VvbS5Qb2ludChcclxuICAgICAgb2xwcm9qLnRyYW5zZm9ybShjb29yZGluYXRlcywgdGhpcy5wcm9qZWN0aW9uLCB0aGlzLm1hcC5wcm9qZWN0aW9uKVxyXG4gICAgKTtcclxuICAgIGNvbnN0IGZlYXR1cmUgPSBuZXcgb2xGZWF0dXJlKHsgZ2VvbWV0cnkgfSk7XHJcblxyXG4gICAgY29uc3Qgc3RvcElEID0gdGhpcy5nZXRTdG9wT3ZlcmxheUlEKGluZGV4KTtcclxuICAgIHRoaXMuZGVsZXRlUm91dGluZ092ZXJsYXlieUlEKHN0b3BJRCk7XHJcbiAgICBmZWF0dXJlLnNldElkKHN0b3BJRCk7XHJcblxyXG4gICAgaWYgKGdlb21ldHJ5ID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChnZW9tZXRyeS5nZXRUeXBlKCkgPT09ICdQb2ludCcpIHtcclxuICAgICAgY29uc3Qgb2xTdHlsZSA9IGNyZWF0ZU92ZXJsYXlNYXJrZXJTdHlsZShzdG9wQ29sb3IpO1xyXG4gICAgICAvLyBzdG9wVGV4dFxyXG4gICAgICBmZWF0dXJlLnNldFN0eWxlKG9sU3R5bGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yb3V0aW5nU3RvcHNPdmVybGF5RGF0YVNvdXJjZS5vbC5hZGRGZWF0dXJlKGZlYXR1cmUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFN0b3BPdmVybGF5SUQoaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICBsZXQgdHh0O1xyXG4gICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgIHR4dCA9ICdzdGFydCc7XHJcbiAgICB9IGVsc2UgaWYgKGluZGV4ID09PSB0aGlzLnN0b3BzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdHh0ID0gJ2VuZCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0eHQgPSBpbmRleDtcclxuICAgIH1cclxuICAgIHJldHVybiAncm91dGluZ1N0b3BfJyArIHR4dDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGVsZXRlUm91dGluZ092ZXJsYXlieUlEKGlkKSB7XHJcbiAgICBpZiAodGhpcy5yb3V0aW5nU3RvcHNPdmVybGF5RGF0YVNvdXJjZS5vbC5nZXRGZWF0dXJlQnlJZChpZCkpIHtcclxuICAgICAgdGhpcy5yb3V0aW5nU3RvcHNPdmVybGF5RGF0YVNvdXJjZS5vbC5yZW1vdmVGZWF0dXJlKFxyXG4gICAgICAgIHRoaXMucm91dGluZ1N0b3BzT3ZlcmxheURhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQoaWQpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5yb3V0aW5nUm91dGVzT3ZlcmxheURhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQoaWQpKSB7XHJcbiAgICAgIHRoaXMucm91dGluZ1JvdXRlc092ZXJsYXlEYXRhU291cmNlLm9sLnJlbW92ZUZlYXR1cmUoXHJcbiAgICAgICAgdGhpcy5yb3V0aW5nUm91dGVzT3ZlcmxheURhdGFTb3VyY2Uub2wuZ2V0RmVhdHVyZUJ5SWQoaWQpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFVybCgpIHtcclxuICAgIGlmICghdGhpcy5yb3V0ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgcm91dGluZ0tleSA9IHRoaXMucm91dGUub3B0aW9ucy5yb3V0aW5nQ29vcmRLZXk7XHJcbiAgICBjb25zdCBzdG9wc0Nvb3JkaW5hdGVzID0gW107XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMucm91dGluZ0Zvcm1TZXJ2aWNlICYmXHJcbiAgICAgIHRoaXMucm91dGluZ0Zvcm1TZXJ2aWNlLmdldFN0b3BzQ29vcmRpbmF0ZXMoKSAmJlxyXG4gICAgICB0aGlzLnJvdXRpbmdGb3JtU2VydmljZS5nZXRTdG9wc0Nvb3JkaW5hdGVzKCkubGVuZ3RoICE9PSAwXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5yb3V0aW5nRm9ybVNlcnZpY2UuZ2V0U3RvcHNDb29yZGluYXRlcygpLmZvckVhY2goY29vcmQgPT4ge1xyXG4gICAgICAgIHN0b3BzQ29vcmRpbmF0ZXMucHVzaChjb29yZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbGV0IHJvdXRpbmdVcmwgPSAnJztcclxuICAgIGlmIChzdG9wc0Nvb3JkaW5hdGVzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgIHJvdXRpbmdVcmwgPSBgJHtyb3V0aW5nS2V5fT0ke3N0b3BzQ29vcmRpbmF0ZXMuam9pbignOycpfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGAke2xvY2F0aW9uLm9yaWdpbn0ke1xyXG4gICAgICBsb2NhdGlvbi5wYXRobmFtZVxyXG4gICAgfT90b29sPWRpcmVjdGlvbnMmJHtyb3V0aW5nVXJsfWA7XHJcbiAgfVxyXG59XHJcbiJdfQ==