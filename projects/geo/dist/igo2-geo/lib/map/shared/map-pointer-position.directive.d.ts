import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { IgoMap } from '../../map/shared/map';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { MediaService } from '@igo2/core';
/**
 * This directive return the pointer coordinate (on click or pointermove)
 * in [longitude, latitude], delayed by in input (pointerMoveDelay)
 * to avoid too many emitted values.
 */
export declare class PointerPositionDirective implements OnInit, OnDestroy {
    private component;
    private mediaService;
    private lastTimeoutRequest;
    /**
     * Listener to the pointer move event
     */
    private pointerMoveListener;
    /**
     * Listener to the map click event
     */
    private mapClickListener;
    /**
     * Delay before emitting an event
     */
    pointerPositionDelay: number;
    /**
     * Event emitted when the pointer move, delayed by pointerMoveDelay
     */
    pointerPositionCoord: EventEmitter<[number, number]>;
    /**
     * IGO map
     * @internal
     */
    readonly map: IgoMap;
    readonly mapProjection: string;
    constructor(component: MapBrowserComponent, mediaService: MediaService);
    /**
     * Start listening to pointermove
     * @internal
     */
    ngOnInit(): void;
    /**
     * Stop listening to pointermove
     * @internal
     */
    ngOnDestroy(): void;
    /**
     * On map pointermove
     */
    private listenToMapPointerMove;
    /**
     * On map click
     */
    private listenToMapClick;
    /**
     * Stop listening for map pointermove
     */
    private unlistenToMapPointerMove;
    /**
     * Stop listening for map clicks
     */
    private unlistenToMapClick;
    /**
     * emit delayed coordinate (longitude, latitude array) based on pointerMoveDelay or on click
     * @param event OL map browser pointer event
     */
    private onPointerEvent;
}
