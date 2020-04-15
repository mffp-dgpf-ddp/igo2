import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NetworkService } from '@igo2/core';
import { Feature } from '../shared';
import { SearchSource } from '../../search/shared/sources/source';
import { IgoMap } from '../../map/shared/map';
export declare class FeatureDetailsComponent {
    private cdRef;
    private sanitizer;
    private networkService;
    private state;
    private offlineButtonState;
    source: SearchSource;
    map: IgoMap;
    feature: Feature;
    private _feature;
    private _source;
    /**
     * @internal
     */
    readonly title: string;
    /**
     * @internal
     */
    readonly icon: string;
    constructor(cdRef: ChangeDetectorRef, sanitizer: DomSanitizer, networkService: NetworkService);
    htmlSanitizer(value: any): SafeResourceUrl;
    isObject(value: any): boolean;
    isUrl(value: any): boolean;
    filterFeatureProperties(feature: any): any;
}
