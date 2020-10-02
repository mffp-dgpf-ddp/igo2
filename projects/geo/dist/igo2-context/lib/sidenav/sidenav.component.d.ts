import { Title } from '@angular/platform-browser';
import { Media } from '@igo2/core';
import { FlexibleState, Tool } from '@igo2/common';
import { Feature, IgoMap } from '@igo2/geo';
export declare class SidenavComponent {
    titleService: Title;
    private format;
    map: IgoMap;
    private _map;
    opened: boolean;
    private _opened;
    feature: Feature;
    private _feature;
    tool: Tool;
    private _tool;
    media: Media;
    private _media;
    title: string;
    private _title;
    topPanelState: FlexibleState;
    readonly featureTitle: string;
    constructor(titleService: Title);
    zoomToFeatureExtent(): void;
    toggleTopPanel(): void;
}
