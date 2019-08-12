import { OnInit, ElementRef } from '@angular/core';
import { MediaService } from '@igo2/core';
import { FlexibleState, FlexibleDirection } from './flexible.type';
export declare class FlexibleComponent implements OnInit {
    private el;
    private mediaService;
    static transitionTime: number;
    main: any;
    initial: string;
    private _initial;
    collapsed: string;
    private _collapsed;
    expanded: string;
    private _expanded;
    initialMobile: string;
    private _initialMobile;
    collapsedMobile: string;
    private _collapsedMobile;
    expandedMobile: string;
    private _expandedMobile;
    direction: FlexibleDirection;
    private _direction;
    state: FlexibleState;
    private _state;
    constructor(el: ElementRef, mediaService: MediaService);
    ngOnInit(): void;
    private setSize;
}
