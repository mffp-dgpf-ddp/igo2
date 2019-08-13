import { IgoMap } from '../shared/map';
export declare class RotationButtonComponent {
    map: IgoMap;
    private _map;
    showIfNoRotation: boolean;
    private _showIfNoRotation;
    color: string;
    private _color;
    readonly rotated: boolean;
    constructor();
    rotationStyle(radians: any): {};
}
