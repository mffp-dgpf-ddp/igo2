export declare const PrintOutputFormat: {
    Pdf: "Pdf";
    Image: "Image";
};
export declare type PrintOutputFormat = keyof typeof PrintOutputFormat;
export declare const PrintPaperFormat: {
    A0: "A0";
    A1: "A1";
    A2: "A2";
    A3: "A3";
    A4: "A4";
    A5: "A5";
    Letter: "Letter";
    Legal: "Legal";
};
export declare type PrintPaperFormat = keyof typeof PrintPaperFormat;
export declare const PrintOrientation: {
    landscape: "landscape";
    portrait: "portrait";
};
export declare type PrintOrientation = keyof typeof PrintOrientation;
export declare const PrintResolution: {
    "72": "72";
    "96": "96";
    "150": "150";
    "300": "300";
};
export declare type PrintResolution = keyof typeof PrintResolution;
export declare const PrintSaveImageFormat: {
    Bmp: "Bmp";
    Gif: "Gif";
    Jpeg: "Jpeg";
    Png: "Png";
    Tiff: "Tiff";
};
export declare type PrintSaveImageFormat = keyof typeof PrintSaveImageFormat;
