import { OnInit, OnDestroy, ElementRef, QueryList } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Legend } from '../../datasource/shared/datasources/datasource.interface';
import { Layer } from '../shared/layers';
import { CapabilitiesService } from '../../datasource/shared/capabilities.service';
import { LanguageService } from '@igo2/core';
export declare class LayerLegendComponent implements OnInit, OnDestroy {
    private capabilitiesService;
    private languageService;
    updateLegendOnResolutionChange: boolean;
    /**
     * Observable of the legend items
     */
    legendItems$: BehaviorSubject<Legend[]>;
    /**
     * Subscription to the map's resolution
     */
    private resolution$$;
    /**
     * The available styles
     */
    styles: any;
    /**
     * The style used to make the legend
     */
    currentStyle: any;
    /**
     * The scale used to make the legend
     */
    private scale;
    /**
     * Get list of images display
     */
    renderedLegends: QueryList<ElementRef>;
    /**
     * List of size of images displayed
     */
    imagesHeight: {
        [srcKey: string]: number;
    };
    /**
     * Layer
     */
    layer: Layer;
    constructor(capabilitiesService: CapabilitiesService, languageService: LanguageService);
    /**
     * On init, subscribe to the map's resolution and update the legend accordingly
     */
    ngOnInit(): void;
    /**
     * On destroy, unsubscribe to the map,s resolution
     */
    ngOnDestroy(): void;
    toggleLegendItem(collapsed: boolean, item: Legend): void;
    private transfertToggleLegendItem;
    computeItemTitle(layerLegend: any): Observable<string>;
    /**
     * On resolution change, compute the effective scale level and update the
     * legend accordingly.
     * @param resolution Map resolution
     */
    private onResolutionChange;
    /**
     * Update the legend with scale level and style define
     */
    private updateLegend;
    private listStyles;
    onChangeStyle(): void;
    onLoadImage(id: string): void;
}
