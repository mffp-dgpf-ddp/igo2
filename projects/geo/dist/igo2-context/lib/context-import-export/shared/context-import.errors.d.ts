export declare class ImportError extends Error {
}
export declare class ImportInvalidFileError extends ImportError {
    constructor();
}
export declare class ImportUnreadableFileError extends ImportError {
    constructor();
}
export declare class ImportNothingToImportError extends ImportError {
    constructor();
}
export declare class ImportSizeError extends ImportError {
    constructor();
}
export declare class ImportSRSError extends ImportError {
    constructor();
}
