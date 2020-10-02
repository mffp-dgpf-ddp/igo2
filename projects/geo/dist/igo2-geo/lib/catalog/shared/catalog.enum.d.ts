export declare enum CatalogItemType {
    Layer = "layer",
    Group = "group"
}
export declare enum TypeCatalog {
    wms = 0,
    wmts = 1,
    baselayers = 2,
    composite = 3
}
export declare type TypeCatalogStrings = keyof typeof TypeCatalog;
