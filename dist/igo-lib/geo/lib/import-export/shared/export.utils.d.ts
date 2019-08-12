import { MessageService, LanguageService } from '@igo2/core';
import { EntityTableColumn } from '@igo2/common';
/**
 * Export array to CSV
 *
 * @param rows Array of arrays to export as CSV
 * @param separator Cell separator
 */
export declare function exportToCSV(rows: any[][], fileName: string, separator?: string): void;
/**
 * Return an array of values from an array of entities.
 *
 * @param entities Array of entities
 * @param scolumns Columns definition of the output data
 */
export declare function entitiesToRowData(entities: object[], columns: EntityTableColumn[]): any[][];
/**
 * Trigger download of a file
 *
 * @param content File content
 * @param mimeType File mime type
 * @param fileName File name
 */
export declare function downloadContent(content: string, mimeType: string, fileName: string): void;
export declare function handleFileExportError(error: Error, messageService: MessageService, languageService: LanguageService): void;
export declare function handleNothingToExportError(messageService: MessageService, languageService: LanguageService): void;
