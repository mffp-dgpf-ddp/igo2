import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Feature } from '../shared';
export declare class FeatureDetailsComponent {
    private cdRef;
    private sanitizer;
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
    constructor(cdRef: ChangeDetectorRef, sanitizer: DomSanitizer);
    htmlSanitizer(value: any): SafeResourceUrl;
    isObject(value: any): boolean;
    isUrl(value: any): boolean;
    filterFeatureProperties(feature: any): any;
}
