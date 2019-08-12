import { StyleByAttribute } from './stylebyattribute';
import { ClusterParam } from './clusterParam';
export declare class StyleService {
    constructor();
    createStyle(options: {
        [key: string]: any;
    }): any;
    private parseStyle;
    private getOlKey;
    private getOlCls;
    createStyleByAttribute(feature: any, styleByAttribute: StyleByAttribute): any;
    createClusterStyle(feature: any, clusterParam: ClusterParam): any;
}
