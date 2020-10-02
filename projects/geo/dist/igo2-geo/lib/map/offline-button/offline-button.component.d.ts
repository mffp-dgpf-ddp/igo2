import { EventEmitter } from '@angular/core';
import { IgoMap } from '../shared/map';
import { ConfigService } from '@igo2/core';
export declare class OfflineButtonComponent {
    private config;
    btnStyle: string;
    colorOff: string;
    change: EventEmitter<boolean>;
    map: IgoMap;
    private _map;
    color: string;
    private _color;
    check: boolean;
    readonly checked: boolean;
    visible: boolean;
    constructor(config: ConfigService);
    onToggle(): void;
}
