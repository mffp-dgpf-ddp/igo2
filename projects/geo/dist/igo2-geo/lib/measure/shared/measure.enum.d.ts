export declare const MEASURE_UNIT_AUTO = "auto";
export declare enum MeasureType {
    Length = "length",
    Area = "area"
}
export declare enum MeasureLengthUnit {
    Meters = "meters",
    Kilometers = "kilometers",
    Miles = "miles",
    Feet = "feet"
}
export declare const MeasureLengthUnitAbbreviation: {
    [MeasureLengthUnit.Meters]: string;
    [MeasureLengthUnit.Kilometers]: string;
    [MeasureLengthUnit.Miles]: string;
    [MeasureLengthUnit.Feet]: string;
};
export declare enum MeasureAreaUnit {
    SquareMeters = "squareMeters",
    SquareKilometers = "squareKilometers",
    SquareMiles = "squareMiles",
    SquareFeet = "squareFeet",
    Hectares = "hectares",
    Acres = "acres"
}
export declare const MeasureAreaUnitAbbreviation: {
    [MeasureAreaUnit.SquareMeters]: string;
    [MeasureAreaUnit.SquareKilometers]: string;
    [MeasureAreaUnit.SquareMiles]: string;
    [MeasureAreaUnit.SquareFeet]: string;
    [MeasureAreaUnit.Hectares]: string;
    [MeasureAreaUnit.Acres]: string;
};
