import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { IgoMap } from '../../map/shared/map';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { MediaService } from '@igo2/core';
/**
 * This directive return the pointer coordinate (on click or pointermove)
 * in [longitude, latitude], delayed by in input (pointerMoveDelay)
 * to avoid too many emitted values.
 * User needs to hold the key defined by pointerByKeyEventKeyCode to emit a coord.
 */
export declare class PointerPositionByKeyDirective implements OnInit, OnDestroy {
    private component;
    private mediaService;
    private keyDown$$;
    private keyUp$$;
    private definedKeyIsDown$;
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
    pointerPositionByKeyDelay: number;
    /**
     * The key pressed (must be hold) to trigger the output
     */
    pointerPositionByKeyCode: number;
    /**
     * Event emitted when the pointer move, delayed by pointerMoveDelay
     */
    pointerPositionByKeyCoord: EventEmitter<[number, number]>;
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
     * Subscribe to user defined key keyDown, hold down to activate the emit
     */
    private subscribeToKeyDown;
    /**
     * Subscribe to user defined key keyUp, release to desactivate the emit
     */
    private subscribeToKeyUp;
    /**
     * Stop listening for map pointermove
     */
    private unlistenToMapPointerMove;
    /**
     * Stop listening for map clicks
     */
    private unlistenToMapClick;
    /**
     * Unsubscribe to key down
     */
    private unsubscribeToKeyDown;
    /**
     * Unsubscribe to key up
     */
    private unsubscribeToKeyUp;
    /**
     * emit delayed coordinate (longitude, latitude array) based on pointerMoveDelay or on click
     * User must hold the defined key to allow the emit.
     * @param event OL map browser pointer event
     */
    private onPointerEvent;
}
