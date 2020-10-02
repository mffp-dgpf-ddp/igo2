import * as olstyle from 'ol/style';
import { StyleByAttribute } from './vector-style.interface';
import { ClusterParam } from './clusterParam';
export declare class StyleService {
    style: olstyle.Style;
    createStyle(options: {
        [key: string]: any;
    }): any;
    private parseStyle;
    private getOlKey;
    private getOlCls;
    createStyleByAttribute(feature: any, styleByAttribute: StyleByAttribute): any;
    createClusterStyle(feature: any, clusterParam: ClusterParam, layerStyle: any): any;
    getLabel(feature: any, labelMatch: any): string;
}
