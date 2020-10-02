export declare class WktService {
    constructor();
    wktToFeature(wkt: any, wktProj: any, featureProj: any): any;
    extentToWkt(epsgTO: any, extent: any, extentProj: any): {
        wktPoly: string;
        wktLine: string;
        wktMultiPoints: string;
    };
    private roundCoordinateArray;
    private roundArray;
    snrcToWkt(snrc: any, epsgTO: any): {
        wktPoly: any;
        wktLine: string;
        wktMultiPoints: string;
    };
}
