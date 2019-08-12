import { OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataSourceLegendOptions } from '../../datasource/shared/datasources/datasource.interface';
import { Layer } from '../shared/layers';
import { CapabilitiesService } from '../../datasource/shared/capabilities.service';
export declare class LayerLegendComponent implements OnInit, OnDestroy {
    private capabilitiesService;
    updateLegendOnResolutionChange: boolean;
    /**
     * Observable of the legend items
     */
    legendItems$: BehaviorSubject<DataSourceLegendOptions[]>;
    /**
     * Subscription to the map's resolution
     */
    private resolution$$;
    /**
     * Layer
     */
    layer: Layer;
    constructor(capabilitiesService: CapabilitiesService);
    /**
     * On init, subscribe to the map's resolution and update the legend accordingly
     */
    ngOnInit(): void;
    /**
     * On destroy, unsubscribe to the map,s resolution
     */
    ngOnDestroy(): void;
    computeItemTitle(layerLegend: any): Observable<string>;
    /**
     * On resolution change, compute the effective scale level and update the
     * legend accordingly.
     * @param resolutione Map resolution
     */
    private onResolutionChange;
    /**
     * Update the legend according the scale level
     * @param scale Map scale level
     */
    private updateLegend;
}
