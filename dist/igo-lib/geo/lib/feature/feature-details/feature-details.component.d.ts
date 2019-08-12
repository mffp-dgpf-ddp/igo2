import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Feature } from '../shared';
import { MapService } from '../../map/shared/map.service';
export declare class FeatureDetailsComponent {
    private cdRef;
    private sanitizer;
    private mapService;
    feature: Feature;
    private _feature;
    /**
     * @internal
     */
    readonly title: string;
    /**
     * @internal
     */
    readonly icon: string;
    constructor(cdRef: ChangeDetectorRef, sanitizer: DomSanitizer, mapService: MapService);
    htmlSanitizer(value: any): SafeResourceUrl;
    isObject(value: any): boolean;
    isUrl(value: any): boolean;
    filterFeatureProperties(feature: any): any;
}
