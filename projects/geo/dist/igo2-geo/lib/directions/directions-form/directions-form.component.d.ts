import { EventEmitter, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import olFeature from 'ol/Feature';
import * as olstyle from 'ol/style';
import { Message, LanguageService, MessageService, RouteService } from '@igo2/core';
import { IgoMap } from '../../map/shared/map';
import { SearchService } from '../../search/shared/search.service';
import { Directions, DirectionsOptions } from '../shared/directions.interface';
import { DirectionsService } from '../shared/directions.service';
import { DirectionsFormService } from './directions-form.service';
import { QueryService } from '../../query/shared/query.service';
import { FeatureStore } from '../../feature/shared/store';
export declare class DirectionsFormComponent implements OnInit, OnDestroy {
    private formBuilder;
    private directionsService;
    private languageService;
    private messageService;
    private searchService;
    private queryService;
    private directionsFormService;
    private changeDetectorRefs;
    private route;
    private readonly invalidKeys;
    stopsForm: FormGroup;
    projection: string;
    currentStopIndex: number;
    private routesQueries$$;
    private search$$;
    private stream$;
    routesResults: Directions[] | Message[];
    activeRoute: Directions;
    private lastTimeoutRequest;
    private focusOnStop;
    private focusKey;
    initialStopsCoords: any;
    private browserLanguage;
    term: string;
    debounce: number;
    length: number;
    map: IgoMap;
    /**
     * The stops store
     */
    stopsStore: FeatureStore;
    /**
     * The route and vertex store
     */
    routeStore: FeatureStore;
    submit: EventEmitter<any>;
    constructor(formBuilder: FormBuilder, directionsService: DirectionsService, languageService: LanguageService, messageService: MessageService, searchService: SearchService, queryService: QueryService, directionsFormService: DirectionsFormService, changeDetectorRefs: ChangeDetectorRef, route: RouteService);
    changeRoute(): void;
    prevent(event: any): void;
    ngOnInit(): void;
    private conditionalInit;
    ngOnDestroy(): void;
    private initStores;
    private initOlInteraction;
    private subscribeToFormChange;
    /**
     * Freeze any store, meaning the layer is removed, strategies are deactivated
     * and some listener removed
     * @internal
     */
    private freezeStores;
    private executeTranslation;
    handleLocationProposals(coordinates: [number, number], stopIndex: number): void;
    directionsText(index: number, stopsCounts?: number): string;
    raiseStop(index: number): void;
    lowerStop(index: number): void;
    private moveStop;
    readonly stops: FormArray;
    writeStopsToFormService(): void;
    addStop(): void;
    createStop(directionsPos?: string): FormGroup;
    removeStop(index: number): void;
    resetForm(): void;
    formatStep(step: any, cnt: any): {
        instruction: any;
        image: string;
        cssClass: string;
    };
    formatInstruction(type: any, modifier: any, route: any, direction: any, stepPosition: any, exit: any, lastStep?: boolean): {
        instruction: any;
        image: string;
        cssClass: string;
    };
    translateModifier(modifier: any): any;
    translateBearing(bearing: any): any;
    formatDistance(distance: any): string;
    formatDuration(duration: number, summary?: boolean): string;
    showSegment(step: any, zoomToExtent?: boolean): void;
    showRouteSegmentGeometry(coordinates: any, zoomToExtent?: boolean): void;
    zoomRoute(extent?: any): void;
    private showRouteGeometry;
    getRoutes(moveToExtent?: boolean, directionsOptions?: DirectionsOptions): void;
    private unlistenSingleClick;
    private unsubscribeRoutesQueries;
    copyLinkToClipboard(): void;
    copyDirectionsToClipboard(): void;
    private handleTermChanged;
    setTerm(term: string): void;
    private keyIsValid;
    keyup(i: any, event: KeyboardEvent): void;
    clearStop(stopIndex: any): void;
    chooseProposal(proposal: any, i: any): void;
    focus(i: any): void;
    private handleMapClick;
    geolocateStop(index: number): void;
    addStopOverlay(coordinates: [number, number], index: number): void;
    getStopOverlayID(index: number): string;
    private deleteStoreFeatureByID;
    private getUrl;
}
/**
 * Create a style for the directions stops and routes
 * @param feature OlFeature
 * @returns OL style function
 */
export declare function stopMarker(feature: olFeature, resolution: number): olstyle.Style;
