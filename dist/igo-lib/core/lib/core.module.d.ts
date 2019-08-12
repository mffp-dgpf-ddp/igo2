import { ModuleWithProviders } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
export declare class IgoCoreModule {
    static forRoot(): ModuleWithProviders;
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer);
}
