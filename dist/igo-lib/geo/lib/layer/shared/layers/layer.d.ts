import { Subject } from 'rxjs';
import olLayer from 'ol/layer/Layer';
import { DataSource } from '../../../datasource';
import { IgoMap } from '../../../map';
import { SubjectStatus } from '@igo2/utils';
import { LayerOptions } from './layer.interface';
export declare abstract class Layer {
    collapsed: boolean;
    dataSource: DataSource;
    map: IgoMap;
    ol: olLayer;
    options: LayerOptions;
    status$: Subject<SubjectStatus>;
    readonly id: string;
    readonly alias: string;
    title: string;
    zIndex: number;
    baseLayer: boolean;
    visible: boolean;
    opacity: number;
    readonly isInResolutionsRange: boolean;
    readonly showInLayerList: boolean;
    constructor(options: LayerOptions);
    protected abstract createOlLayer(): olLayer;
    setMap(map: IgoMap | undefined): void;
}
