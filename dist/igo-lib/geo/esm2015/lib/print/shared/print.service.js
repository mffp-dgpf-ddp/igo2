/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf';
import * as _html2canvas from 'html2canvas';
import * as JSZip from 'jszip';
import { SubjectStatus } from '@igo2/utils';
import { MessageService, ActivityService, LanguageService } from '@igo2/core';
import { formatScale } from '../../map/shared/map.utils';
import { getLayersLegends } from '../../layer/utils/legend';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
/** @type {?} */
const html2canvas = _html2canvas;
export class PrintService {
    /**
     * @param {?} messageService
     * @param {?} activityService
     * @param {?} languageService
     */
    constructor(messageService, activityService, languageService) {
        this.messageService = messageService;
        this.activityService = activityService;
        this.languageService = languageService;
    }
    /**
     * @param {?} map
     * @param {?} options
     * @return {?}
     */
    print(map, options) {
        /** @type {?} */
        const status$ = new Subject();
        /** @type {?} */
        const paperFormat = options.paperFormat;
        /** @type {?} */
        const resolution = +options.resolution;
        // Default is 96
        /** @type {?} */
        const orientation = options.orientation;
        this.activityId = this.activityService.register();
        /** @type {?} */
        const doc = new jsPDF({
            orientation,
            format: paperFormat.toLowerCase()
        });
        /** @type {?} */
        const dimensions = [
            doc.internal.pageSize.width,
            doc.internal.pageSize.height
        ];
        /** @type {?} */
        const margins = [20, 10, 20, 10];
        /** @type {?} */
        const width = dimensions[0] - margins[3] - margins[1];
        /** @type {?} */
        const height = dimensions[1] - margins[0] - margins[2];
        /** @type {?} */
        const size = [width, height];
        if (options.title !== undefined) {
            this.addTitle(doc, options.title, dimensions[0]);
        }
        if (options.showProjection === true || options.showScale === true) {
            this.addProjScale(doc, map, resolution, options.showProjection, options.showScale);
        }
        if (options.comment !== '') {
            this.addComment(doc, options.comment);
        }
        this.addMap(doc, map, resolution, size, margins).subscribe((/**
         * @param {?} status
         * @return {?}
         */
        (status) => {
            if (status === SubjectStatus.Done) {
                if (options.showLegend === true) {
                    this.addLegend(doc, map, margins, resolution);
                }
                else {
                    this.saveDoc(doc);
                }
            }
            if (status === SubjectStatus.Done || status === SubjectStatus.Error) {
                this.activityService.unregister(this.activityId);
                status$.next(SubjectStatus.Done);
            }
        }));
        return status$;
    }
    /**
     * Get html code for all layers legend
     * @param {?} map IgoMap
     * @param {?} width The width that the legend need to be
     * @param {?} resolution
     * @return {?} Html code for the legend
     */
    getLayersLegendHtml(map, width, resolution) {
        /** @type {?} */
        let html = '';
        /** @type {?} */
        const legends = getLayersLegends(map.layers, map.viewController.getScale(resolution));
        if (legends.length === 0) {
            return html;
        }
        // Define important style to be sure that all container is convert
        // to image not just visible part
        html += '<style media="screen" type="text/css">';
        html += '.html2canvas-container { width: ' + width;
        html += 'mm !important; height: 2000px !important; }';
        html += '</style>';
        html += '<font size="2" face="Courier New" >';
        html += '<div style="display:inline-block;max-width:' + width + 'mm">';
        // For each legend, define an html table cell
        legends.forEach((/**
         * @param {?} legend
         * @return {?}
         */
        (legend) => {
            html +=
                '<table border=1 style="display:inline-block;vertical-align:top">';
            html += '<tr><th width="170px">' + legend.title + '</th>';
            html += '<td><img class="printImageLegend" src="' + legend.url + '">';
            html += '</td></tr></table>';
        }));
        html += '</div>';
        return html;
    }
    /**
     * Get all the legend in a single image
     * * \@param  format - Image format. default value to "png"
     * @param {?} map
     * @param {?=} format
     * @param {?=} doZipFile
     * @param {?=} resolution
     * @return {?} The image of the legend
     */
    getLayersLegendImage(map, format = 'png', doZipFile, resolution) {
        /** @type {?} */
        const status$ = new Subject();
        // Get html code for the legend
        /** @type {?} */
        const width = 200;
        // milimeters unit, originally define for document pdf
        /** @type {?} */
        let html = this.getLayersLegendHtml(map, width, resolution);
        /** @type {?} */
        const that = this;
        format = format.toLowerCase();
        // If no legend show No LEGEND in an image
        if (html.length === 0) {
            html = '<font size="12" face="Courier New" >';
            html += '<div align="center"><b>NO LEGEND</b></div>';
        }
        // Create div to contain html code for legend
        /** @type {?} */
        const div = window.document.createElement('div');
        // Add html code to convert in the new window
        window.document.body.appendChild(div);
        div.innerHTML = html;
        // Define event to execute after all images are loaded to create the canvas
        setTimeout((/**
         * @return {?}
         */
        () => {
            html2canvas(div, { useCORS: true }).then((/**
             * @param {?} canvas
             * @return {?}
             */
            canvas => {
                /** @type {?} */
                let status = SubjectStatus.Done;
                try {
                    if (!doZipFile) {
                        // Save the canvas as file
                        that.saveCanvasImageAsFile(canvas, 'legendImage', format);
                    }
                    else {
                        // Add the canvas to zip
                        that.generateCanvaFileToZip(canvas, 'legendImage' + '.' + format);
                    }
                    div.parentNode.removeChild(div); // remove temp div (IE)
                }
                catch (err) {
                    status = SubjectStatus.Error;
                }
                status$.next(status);
            }));
        }), 500);
    }
    /**
     * @private
     * @param {?} doc
     * @param {?} title
     * @param {?} pageWidth
     * @return {?}
     */
    addTitle(doc, title, pageWidth) {
        /** @type {?} */
        const pdfResolution = 96;
        /** @type {?} */
        const titleSize = 32;
        /** @type {?} */
        const titleWidth = ((titleSize * 25.4) / pdfResolution) * title.length;
        /** @type {?} */
        let titleMarginLeft;
        if (titleWidth > pageWidth) {
            titleMarginLeft = 0;
        }
        else {
            titleMarginLeft = (pageWidth - titleWidth) / 2;
        }
        doc.setFont('courier');
        doc.setFontSize(32);
        doc.text(title, titleMarginLeft, 15);
    }
    /**
     * Add comment to the document
     * * \@param  doc - pdf document
     * * \@param  comment - Comment to add in the document
     * * \@param  size - Size of the document
     * @private
     * @param {?} doc
     * @param {?} comment
     * @return {?}
     */
    addComment(doc, comment) {
        /** @type {?} */
        const commentSize = 16;
        /** @type {?} */
        const commentMarginLeft = 20;
        /** @type {?} */
        const marginBottom = 5;
        /** @type {?} */
        const heightPixels = doc.internal.pageSize.height - marginBottom;
        doc.setFont('courier');
        doc.setFontSize(commentSize);
        doc.text(comment, commentMarginLeft, heightPixels);
    }
    /**
     * Add projection and/or scale to the document
     * @private
     * @param {?} doc - pdf document
     * @param {?} map - Map of the app
     * @param {?} dpi - DPI resolution of the document
     * @param {?} projection - Bool to indicate if projection need to be added
     * @param {?} scale - Bool to indicate if scale need to be added
     * @return {?}
     */
    addProjScale(doc, map, dpi, projection, scale) {
        /** @type {?} */
        const translate = this.languageService.translate;
        /** @type {?} */
        const projScaleSize = 16;
        /** @type {?} */
        const projScaleMarginLeft = 20;
        /** @type {?} */
        const marginBottom = 15;
        /** @type {?} */
        const heightPixels = doc.internal.pageSize.height - marginBottom;
        /** @type {?} */
        let textProjScale = '';
        if (projection === true) {
            /** @type {?} */
            const projText = translate.instant('igo.geo.printForm.projection');
            textProjScale += projText + ': ' + map.projection;
        }
        if (scale === true) {
            if (projection === true) {
                textProjScale += '   ';
            }
            /** @type {?} */
            const scaleText = translate.instant('igo.geo.printForm.scale');
            /** @type {?} */
            const mapScale = map.viewController.getScale(dpi);
            textProjScale += scaleText + ' ~ 1 ' + formatScale(mapScale);
        }
        doc.setFont('courier');
        doc.setFontSize(projScaleSize);
        doc.text(textProjScale, projScaleMarginLeft, heightPixels);
    }
    /**
     * Add the legend to the document
     * @private
     * @param {?} doc - Pdf document where legend will be added
     * @param {?} map - Map of the app
     * @param {?} margins - Page margins
     * @param {?} resolution
     * @return {?}
     */
    addLegend(doc, map, margins, resolution) {
        /** @type {?} */
        const that = this;
        // Get html code for the legend
        /** @type {?} */
        const width = doc.internal.pageSize.width;
        /** @type {?} */
        const html = this.getLayersLegendHtml(map, width, resolution);
        // If no legend, save the map directly
        if (html === '') {
            this.saveDoc(doc);
            return true;
        }
        // Create div to contain html code for legend
        /** @type {?} */
        const div = window.document.createElement('div');
        html2canvas(div, { useCORS: true }).then((/**
         * @param {?} canvas
         * @return {?}
         */
        canvas => {
            /** @type {?} */
            let imgData;
            /** @type {?} */
            const position = 10;
            imgData = canvas.toDataURL('image/png');
            doc.addPage();
            /** @type {?} */
            const imageSize = this.getImageSizeToFitPdf(doc, canvas, margins);
            doc.addImage(imgData, 'PNG', 10, position, imageSize[0], imageSize[1]);
            that.saveDoc(doc);
            div.parentNode.removeChild(div); // remove temp div (IE style)
        }));
        // Add html code to convert in the new window
        window.document.body.appendChild(div);
        div.innerHTML = html;
    }
    /**
     * @private
     * @param {?} doc
     * @param {?} canvas
     * @param {?} margins
     * @return {?}
     */
    addCanvas(doc, canvas, margins) {
        /** @type {?} */
        let image;
        image = canvas.toDataURL('image/jpeg');
        if (image !== undefined) {
            /** @type {?} */
            const imageSize = this.getImageSizeToFitPdf(doc, canvas, margins);
            doc.addImage(image, 'JPEG', margins[3], margins[0], imageSize[0], imageSize[1]);
            doc.rect(margins[3], margins[0], imageSize[0], imageSize[1]);
        }
    }
    // TODO fix printing with image resolution
    /**
     * @private
     * @param {?} doc
     * @param {?} map
     * @param {?} resolution
     * @param {?} size
     * @param {?} margins
     * @return {?}
     */
    addMap(doc, map, resolution, size, margins) {
        /** @type {?} */
        const status$ = new Subject();
        /** @type {?} */
        const mapSize = map.ol.getSize();
        /** @type {?} */
        const extent = map.ol.getView().calculateExtent(mapSize);
        /** @type {?} */
        const widthPixels = Math.round((size[0] * resolution) / 25.4);
        /** @type {?} */
        const heightPixels = Math.round((size[1] * resolution) / 25.4);
        /** @type {?} */
        let timeout;
        map.ol.once('postcompose', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const canvas = event.context.canvas;
            /** @type {?} */
            const mapStatus$$ = map.status$.subscribe((/**
             * @param {?} mapStatus
             * @return {?}
             */
            (mapStatus) => {
                clearTimeout(timeout);
                if (mapStatus !== SubjectStatus.Done) {
                    return;
                }
                mapStatus$$.unsubscribe();
                /** @type {?} */
                let status = SubjectStatus.Done;
                try {
                    this.addCanvas(doc, canvas, margins);
                }
                catch (err) {
                    status = SubjectStatus.Error;
                    this.messageService.error(this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageBody'), this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageHeader'), 'print');
                }
                this.renderMap(map, mapSize, extent);
                status$.next(status);
            }));
            // If no loading as started after 200ms, then probably no loading
            // is required.
            timeout = window.setTimeout((/**
             * @return {?}
             */
            () => {
                mapStatus$$.unsubscribe();
                /** @type {?} */
                let status = SubjectStatus.Done;
                try {
                    this.addCanvas(doc, canvas, margins);
                }
                catch (err) {
                    status = SubjectStatus.Error;
                    this.messageService.error(this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageBody'), this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageHeader'), 'print');
                }
                this.renderMap(map, mapSize, extent);
                status$.next(status);
            }), 200);
        }));
        this.renderMap(map, [widthPixels, heightPixels], extent);
        return status$;
    }
    /**
     * @param {?} nbFileToProcess
     * @return {?}
     */
    defineNbFileToProcess(nbFileToProcess) {
        this.nbFileToProcess = nbFileToProcess;
    }
    /**
     * Download an image of the map with addition of informations
     * @param {?} map - Map of the app
     * @param {?} resolution
     * @param {?=} format - Image format. default value to "png"
     * @param {?=} projection - Indicate if projection need to be add. Default to false
     * @param {?=} scale - Indicate if scale need to be add. Default to false
     * @param {?=} legend - Indicate if the legend of layers need to be download. Default to false
     * @param {?=} title - Title to add for the map - Default to blank
     * @param {?=} comment - Comment to add for the map - Default to blank
     * @param {?=} doZipFile - Indicate if we do a zip with the file
     * @return {?} Image file of the map with extension format given as parameter
     */
    downloadMapImage(map, resolution, format = 'png', projection = false, scale = false, legend = false, title = '', comment = '', doZipFile = true) {
        /** @type {?} */
        const status$ = new Subject();
        // const resolution = map.ol.getView().getResolution();
        this.activityId = this.activityService.register();
        /** @type {?} */
        const translate = this.languageService.translate;
        map.ol.once('postcompose', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            format = format.toLowerCase();
            /** @type {?} */
            const context = event.context;
            /** @type {?} */
            const newCanvas = document.createElement('canvas');
            /** @type {?} */
            const newContext = newCanvas.getContext('2d');
            // Postion in height to set the canvas in new canvas
            /** @type {?} */
            let positionHCanvas = 0;
            // Position in width to set the Proj/Scale in new canvas
            /** @type {?} */
            let positionWProjScale = 10;
            // Get height/width of map canvas
            /** @type {?} */
            const width = context.canvas.width;
            /** @type {?} */
            let height = context.canvas.height;
            // Set Font to calculate comment width
            newContext.font = '20px Calibri';
            /** @type {?} */
            const commentWidth = newContext.measureText(comment).width;
            // Add height for title if defined
            height = title !== '' ? height + 30 : height;
            // Add height for projection or scale (same line) if defined
            height = projection !== false || scale !== false ? height + 30 : height;
            /** @type {?} */
            const positionHProjScale = height - 10;
            // Define number of line depending of the comment length
            /** @type {?} */
            const commentNbLine = Math.ceil(commentWidth / width);
            // Add height for multiline comment if defined
            height = comment !== '' ? height + commentNbLine * 30 : height;
            /** @type {?} */
            let positionHComment = height - commentNbLine * 20 + 5;
            // Set the new canvas with the new calculated size
            newCanvas.width = width;
            newCanvas.height = height;
            // Patch Jpeg default black background to white
            if (format === 'jpeg') {
                newContext.fillStyle = '#ffffff';
                newContext.fillRect(0, 0, width, height);
                newContext.fillStyle = '#000000';
            }
            // If a title need to be added to canvas
            if (title !== '') {
                // Set font for title
                newContext.font = '26px Calibri';
                positionHCanvas = 30;
                newContext.textAlign = 'center';
                newContext.fillText(title, width / 2, 20);
            }
            // Set font for next section
            newContext.font = '20px Calibri';
            // If projection need to be added to canvas
            if (projection !== false) {
                /** @type {?} */
                const projText = translate.instant('igo.geo.printForm.projection');
                newContext.textAlign = 'start';
                newContext.fillText(projText + ': ' + map.projection, positionWProjScale, positionHProjScale);
                positionWProjScale += 200; // Width position change for scale position
            }
            // If scale need to be added to canvas
            if (scale !== false) {
                /** @type {?} */
                const scaleText = translate.instant('igo.geo.printForm.scale');
                /** @type {?} */
                const mapScale = map.viewController.getScale(resolution);
                newContext.textAlign = 'start';
                newContext.fillText(scaleText + ' ~ 1 : ' + formatScale(mapScale), positionWProjScale, positionHProjScale);
            }
            // If a comment need to be added to canvas
            if (comment !== '') {
                newContext.textAlign = 'center';
                // If only one line, no need to multiline the comment
                if (commentNbLine === 1) {
                    newContext.fillText(comment, width / 2, positionHComment);
                }
                else {
                    // Separate the setenses to be approx. the same length
                    /** @type {?} */
                    const nbCommentChar = comment.length;
                    /** @type {?} */
                    const CommentLengthToCut = Math.floor(nbCommentChar / commentNbLine);
                    /** @type {?} */
                    let commentCurrentLine = '';
                    /** @type {?} */
                    let positionFirstCutChar = 0;
                    /** @type {?} */
                    let positionLastBlank;
                    // Loop for the number of line calculated
                    for (let i = 0; i < commentNbLine; i++) {
                        // For all line except last
                        if (commentNbLine - 1 > i) {
                            // Get comment current line to find the right place tu cut comment
                            commentCurrentLine = comment.substr(positionFirstCutChar, CommentLengthToCut);
                            // Cut the setence at blank
                            positionLastBlank = commentCurrentLine.lastIndexOf(' ');
                            newContext.fillText(commentCurrentLine.substr(0, positionLastBlank), width / 2, positionHComment);
                            positionFirstCutChar += positionLastBlank;
                            // Go to next line for insertion
                            positionHComment += 20;
                        }
                        else {
                            // Don't cut last part
                            newContext.fillText(comment.substr(positionFirstCutChar), width / 2, positionHComment);
                        }
                    }
                }
            }
            // Add map to new canvas
            newContext.drawImage(context.canvas, 0, positionHCanvas);
            /** @type {?} */
            let status = SubjectStatus.Done;
            try {
                // Save the canvas as file
                if (!doZipFile) {
                    this.saveCanvasImageAsFile(newCanvas, 'map', format);
                }
                else if (format.toLowerCase() === 'tiff') {
                    // Add the canvas to zip
                    this.generateCanvaFileToZip(newCanvas, 'map' + map.projection.replace(':', '_') + '.' + format);
                }
                else {
                    // Add the canvas to zip
                    this.generateCanvaFileToZip(newCanvas, 'map' + '.' + format);
                }
            }
            catch (err) {
                status = SubjectStatus.Error;
            }
            status$.next(status);
            if (format.toLowerCase() === 'tiff') {
                /** @type {?} */
                const tiwContent = this.getWorldFileInformation(map);
                /** @type {?} */
                const blob = new Blob([tiwContent], {
                    type: 'text/plain;charset=utf-8'
                });
                if (!doZipFile) {
                    // saveAs automaticly replace ':' for '_'
                    saveAs(blob, 'map' + map.projection + '.tfw');
                    this.saveFileProcessing();
                }
                else {
                    // Add the canvas to zip
                    this.addFileToZip('map' + map.projection.replace(':', '_') + '.tfw', blob);
                }
            }
        }));
        map.ol.renderSync();
    }
    /**
     * @private
     * @param {?} map
     * @param {?} size
     * @param {?} extent
     * @return {?}
     */
    renderMap(map, size, extent) {
        map.ol.renderSync();
    }
    /**
     * Save document
     * @private
     * @param {?} doc - Document to save
     * @return {?}
     */
    saveDoc(doc) {
        doc.save('map.pdf');
    }
    /**
     * Calculate the best Image size to fit in pdf
     * @private
     * @param {?} doc - Pdf Document
     * @param {?} canvas - Canvas of image
     * @param {?} margins - Page margins
     * @return {?}
     */
    getImageSizeToFitPdf(doc, canvas, margins) {
        // Define variable to calculate best size to fit in one page
        /** @type {?} */
        const pageHeight = doc.internal.pageSize.getHeight() - (margins[0] + margins[2]);
        /** @type {?} */
        const pageWidth = doc.internal.pageSize.getWidth() - (margins[1] + margins[3]);
        /** @type {?} */
        const canHeight = canvas.height;
        /** @type {?} */
        const canWidth = canvas.width;
        /** @type {?} */
        const heightRatio = canHeight / pageHeight;
        /** @type {?} */
        const widthRatio = canWidth / pageWidth;
        /** @type {?} */
        const maxRatio = heightRatio > widthRatio ? heightRatio : widthRatio;
        /** @type {?} */
        const imgHeigh = maxRatio > 1 ? canHeight / maxRatio : canHeight;
        /** @type {?} */
        const imgWidth = maxRatio > 1 ? canWidth / maxRatio : canWidth;
        return [imgWidth, imgHeigh];
    }
    /**
     * Get a world file information for tiff
     * @private
     * @param {?} map - Map of the app
     * @return {?}
     */
    getWorldFileInformation(map) {
        /** @type {?} */
        const currentResolution = map.viewController.getResolution();
        /** @type {?} */
        const currentExtent = map.getExtent();
        return [
            currentResolution,
            0,
            0,
            -currentResolution,
            currentExtent[0] + currentResolution / 0.5,
            currentExtent[3] - currentResolution / 0.5
        ].join('\n');
    }
    /**
     * Save canvas image as file
     * @private
     * @param {?} canvas - Canvas to save
     * @param {?} name - Name of the file
     * @param {?} format - file format
     * @return {?}
     */
    saveCanvasImageAsFile(canvas, name, format) {
        /** @type {?} */
        const blobFormat = 'image/' + format;
        /** @type {?} */
        const that = this;
        try {
            canvas.toDataURL(); // Just to make the catch trigger wihtout toBlob Error throw not catched
            // If navigator is Internet Explorer
            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(canvas.msToBlob(), name + '.' + format);
                this.saveFileProcessing();
            }
            else {
                canvas.toBlob((/**
                 * @param {?} blob
                 * @return {?}
                 */
                blob => {
                    // download image
                    saveAs(blob, name + '.' + format);
                    that.saveFileProcessing();
                }), blobFormat);
            }
        }
        catch (err) {
            this.messageService.error(this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageBody'), this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageHeader'), 'print');
        }
    }
    /**
     * Add file to a zip
     * @private
     * @param {?} canvas - File to add to the zip
     * @param {?} name -Name of the fileoverview
     * @return {?}
     */
    generateCanvaFileToZip(canvas, name) {
        /** @type {?} */
        const blobFormat = 'image/' + 'jpeg';
        /** @type {?} */
        const that = this;
        if (!this.hasOwnProperty('zipFile') ||
            typeof this.zipFile === 'undefined') {
            this.zipFile = new JSZip();
        }
        try {
            canvas.toDataURL(); // Just to make the catch trigger wihtout toBlob Error throw not catched
            if (navigator.msSaveBlob) {
                this.addFileToZip(name, canvas.msToBlob());
            }
            else {
                canvas.toBlob((/**
                 * @param {?} blob
                 * @return {?}
                 */
                blob => {
                    that.addFileToZip(name, blob);
                }), blobFormat);
            }
        }
        catch (err) {
            this.messageService.error(this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageBody'), this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageHeader'), 'print');
        }
    }
    /**
     * Add file to zip, if all file are zipped, download
     * @private
     * @param {?} name - Name of the files
     * @param {?} blob - Contain of file
     * @return {?}
     */
    addFileToZip(name, blob) {
        // add file to zip
        this.zipFile.file(name, blob);
        this.nbFileToProcess--;
        // If all files are proccessed
        if (this.nbFileToProcess === 0) {
            // Download zip file
            this.getZipFile();
            // Stop loading
            this.activityService.unregister(this.activityId);
        }
    }
    /**
     * @private
     * @return {?}
     */
    saveFileProcessing() {
        this.nbFileToProcess--;
        // If all files are proccessed
        if (this.nbFileToProcess === 0) {
            // Stop loading
            this.activityService.unregister(this.activityId);
        }
    }
    /**
     * Get the zipped file
     * @private
     * @return {?} Retun a zip file
     */
    getZipFile() {
        /** @type {?} */
        const that = this;
        this.zipFile.generateAsync({ type: 'blob' }).then((/**
         * @param {?} blob
         * @return {?}
         */
        blob => {
            // 1) generate the zip file
            saveAs(blob, 'map.zip');
            delete that.zipFile;
        }));
    }
}
PrintService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
PrintService.ctorParameters = () => [
    { type: MessageService },
    { type: ActivityService },
    { type: LanguageService }
];
/** @nocollapse */ PrintService.ngInjectableDef = i0.defineInjectable({ factory: function PrintService_Factory() { return new PrintService(i0.inject(i1.MessageService), i0.inject(i1.ActivityService), i0.inject(i1.LanguageService)); }, token: PrintService, providedIn: "root" });
if (false) {
    /** @type {?} */
    PrintService.prototype.zipFile;
    /** @type {?} */
    PrintService.prototype.nbFileToProcess;
    /** @type {?} */
    PrintService.prototype.activityId;
    /**
     * @type {?}
     * @private
     */
    PrintService.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    PrintService.prototype.activityService;
    /**
     * @type {?}
     * @private
     */
    PrintService.prototype.languageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9wcmludC9zaGFyZWQvcHJpbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxLQUFLLFlBQVksTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFL0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHOUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXpELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O01BSXRELFdBQVcsR0FBRyxZQUFZO0FBS2hDLE1BQU0sT0FBTyxZQUFZOzs7Ozs7SUFJdkIsWUFDVSxjQUE4QixFQUM5QixlQUFnQyxFQUNoQyxlQUFnQztRQUZoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUN2QyxDQUFDOzs7Ozs7SUFFSixLQUFLLENBQUMsR0FBVyxFQUFFLE9BQXFCOztjQUNoQyxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUU7O2NBRXZCLFdBQVcsR0FBVyxPQUFPLENBQUMsV0FBVzs7Y0FDekMsVUFBVSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVU7OztjQUNoQyxXQUFX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Q0FBQyxVQUFVLENBQUMsQ0FBQztTQUNsRDtJQUNILENBQUM7Ozs7O0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV2Qiw4QkFBOEI7UUFDOUIsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLENBQUMsRUFBRTtZQUM5QixlQUFlO1lBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQzs7Ozs7O0lBTU8sVUFBVTs7Y0FDVixJQUFJLEdBQUcsSUFBSTtRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUk7Ozs7UUFBQyxJQUFJLENBQUMsRUFBRTtZQUN2RCwyQkFBMkI7WUFDM0IsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN4QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF6c0JGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQWJRLGNBQWM7WUFBRSxlQUFlO1lBQUUsZUFBZTs7Ozs7SUFldkQsK0JBQWU7O0lBQ2YsdUNBQXdCOztJQUN4QixrQ0FBbUI7Ozs7O0lBRWpCLHNDQUFzQzs7Ozs7SUFDdEMsdUNBQXdDOzs7OztJQUN4Qyx1Q0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgc2F2ZUFzIH0gZnJvbSAnZmlsZS1zYXZlcic7XHJcbmltcG9ydCAqIGFzIGpzUERGIGZyb20gJ2pzcGRmJztcclxuaW1wb3J0ICogYXMgX2h0bWwyY2FudmFzIGZyb20gJ2h0bWwyY2FudmFzJztcclxuaW1wb3J0ICogYXMgSlNaaXAgZnJvbSAnanN6aXAnO1xyXG5cclxuaW1wb3J0IHsgU3ViamVjdFN0YXR1cyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIEFjdGl2aXR5U2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IGZvcm1hdFNjYWxlIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAudXRpbHMnO1xyXG5pbXBvcnQgeyBMYXllckxlZ2VuZCB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgZ2V0TGF5ZXJzTGVnZW5kcyB9IGZyb20gJy4uLy4uL2xheWVyL3V0aWxzL2xlZ2VuZCc7XHJcblxyXG5pbXBvcnQgeyBQcmludE9wdGlvbnMgfSBmcm9tICcuL3ByaW50LmludGVyZmFjZSc7XHJcblxyXG5jb25zdCBodG1sMmNhbnZhcyA9IF9odG1sMmNhbnZhcztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFByaW50U2VydmljZSB7XHJcbiAgemlwRmlsZTogSlNaaXA7XHJcbiAgbmJGaWxlVG9Qcm9jZXNzOiBudW1iZXI7XHJcbiAgYWN0aXZpdHlJZDogc3RyaW5nO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGFjdGl2aXR5U2VydmljZTogQWN0aXZpdHlTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgcHJpbnQobWFwOiBJZ29NYXAsIG9wdGlvbnM6IFByaW50T3B0aW9ucyk6IFN1YmplY3Q8YW55PiB7XHJcbiAgICBjb25zdCBzdGF0dXMkID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgICBjb25zdCBwYXBlckZvcm1hdDogc3RyaW5nID0gb3B0aW9ucy5wYXBlckZvcm1hdDtcclxuICAgIGNvbnN0IHJlc29sdXRpb24gPSArb3B0aW9ucy5yZXNvbHV0aW9uOyAgLy8gRGVmYXVsdCBpcyA5NlxyXG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBvcHRpb25zLm9yaWVudGF0aW9uO1xyXG5cclxuICAgIHRoaXMuYWN0aXZpdHlJZCA9IHRoaXMuYWN0aXZpdHlTZXJ2aWNlLnJlZ2lzdGVyKCk7XHJcbiAgICBjb25zdCBkb2MgPSBuZXcganNQREYoe1xyXG4gICAgICBvcmllbnRhdGlvbixcclxuICAgICAgZm9ybWF0OiBwYXBlckZvcm1hdC50b0xvd2VyQ2FzZSgpXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBkaW1lbnNpb25zID0gW1xyXG4gICAgICBkb2MuaW50ZXJuYWwucGFnZVNpemUud2lkdGgsXHJcbiAgICAgIGRvYy5pbnRlcm5hbC5wYWdlU2l6ZS5oZWlnaHRcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgbWFyZ2lucyA9IFsyMCwgMTAsIDIwLCAxMF07XHJcbiAgICBjb25zdCB3aWR0aCA9IGRpbWVuc2lvbnNbMF0gLSBtYXJnaW5zWzNdIC0gbWFyZ2luc1sxXTtcclxuICAgIGNvbnN0IGhlaWdodCA9IGRpbWVuc2lvbnNbMV0gLSBtYXJnaW5zWzBdIC0gbWFyZ2luc1syXTtcclxuICAgIGNvbnN0IHNpemUgPSBbd2lkdGgsIGhlaWdodF07XHJcblxyXG4gICAgaWYgKG9wdGlvbnMudGl0bGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmFkZFRpdGxlKGRvYywgb3B0aW9ucy50aXRsZSwgZGltZW5zaW9uc1swXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnMuc2hvd1Byb2plY3Rpb24gPT09IHRydWUgfHwgb3B0aW9ucy5zaG93U2NhbGUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5hZGRQcm9qU2NhbGUoXHJcbiAgICAgICAgZG9jLFxyXG4gICAgICAgIG1hcCxcclxuICAgICAgICByZXNvbHV0aW9uLFxyXG4gICAgICAgIG9wdGlvbnMuc2hvd1Byb2plY3Rpb24sXHJcbiAgICAgICAgb3B0aW9ucy5zaG93U2NhbGVcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmNvbW1lbnQgIT09ICcnKSB7XHJcbiAgICAgIHRoaXMuYWRkQ29tbWVudChkb2MsIG9wdGlvbnMuY29tbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hZGRNYXAoZG9jLCBtYXAsIHJlc29sdXRpb24sIHNpemUsIG1hcmdpbnMpLnN1YnNjcmliZShcclxuICAgICAgKHN0YXR1czogU3ViamVjdFN0YXR1cykgPT4ge1xyXG4gICAgICAgIGlmIChzdGF0dXMgPT09IFN1YmplY3RTdGF0dXMuRG9uZSkge1xyXG4gICAgICAgICAgaWYgKG9wdGlvbnMuc2hvd0xlZ2VuZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZExlZ2VuZChkb2MsIG1hcCwgbWFyZ2lucywgcmVzb2x1dGlvbik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVEb2MoZG9jKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMgPT09IFN1YmplY3RTdGF0dXMuRG9uZSB8fCBzdGF0dXMgPT09IFN1YmplY3RTdGF0dXMuRXJyb3IpIHtcclxuICAgICAgICAgIHRoaXMuYWN0aXZpdHlTZXJ2aWNlLnVucmVnaXN0ZXIodGhpcy5hY3Rpdml0eUlkKTtcclxuICAgICAgICAgIHN0YXR1cyQubmV4dChTdWJqZWN0U3RhdHVzLkRvbmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gc3RhdHVzJDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBodG1sIGNvZGUgZm9yIGFsbCBsYXllcnMgbGVnZW5kXHJcbiAgICogQHBhcmFtICBtYXAgSWdvTWFwXHJcbiAgICogQHBhcmFtICB3aWR0aCBUaGUgd2lkdGggdGhhdCB0aGUgbGVnZW5kIG5lZWQgdG8gYmVcclxuICAgKiBAcmV0dXJuIEh0bWwgY29kZSBmb3IgdGhlIGxlZ2VuZFxyXG4gICAqL1xyXG4gIGdldExheWVyc0xlZ2VuZEh0bWwobWFwOiBJZ29NYXAsIHdpZHRoOiBudW1iZXIsIHJlc29sdXRpb246IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICBsZXQgaHRtbCA9ICcnO1xyXG4gICAgY29uc3QgbGVnZW5kcyA9IGdldExheWVyc0xlZ2VuZHMobWFwLmxheWVycywgbWFwLnZpZXdDb250cm9sbGVyLmdldFNjYWxlKHJlc29sdXRpb24pKTtcclxuICAgIGlmIChsZWdlbmRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWZpbmUgaW1wb3J0YW50IHN0eWxlIHRvIGJlIHN1cmUgdGhhdCBhbGwgY29udGFpbmVyIGlzIGNvbnZlcnRcclxuICAgIC8vIHRvIGltYWdlIG5vdCBqdXN0IHZpc2libGUgcGFydFxyXG4gICAgaHRtbCArPSAnPHN0eWxlIG1lZGlhPVwic2NyZWVuXCIgdHlwZT1cInRleHQvY3NzXCI+JztcclxuICAgIGh0bWwgKz0gJy5odG1sMmNhbnZhcy1jb250YWluZXIgeyB3aWR0aDogJyArIHdpZHRoO1xyXG4gICAgaHRtbCArPSAnbW0gIWltcG9ydGFudDsgaGVpZ2h0OiAyMDAwcHggIWltcG9ydGFudDsgfSc7XHJcbiAgICBodG1sICs9ICc8L3N0eWxlPic7XHJcbiAgICBodG1sICs9ICc8Zm9udCBzaXplPVwiMlwiIGZhY2U9XCJDb3VyaWVyIE5ld1wiID4nO1xyXG4gICAgaHRtbCArPSAnPGRpdiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO21heC13aWR0aDonICsgd2lkdGggKyAnbW1cIj4nO1xyXG4gICAgLy8gRm9yIGVhY2ggbGVnZW5kLCBkZWZpbmUgYW4gaHRtbCB0YWJsZSBjZWxsXHJcbiAgICBsZWdlbmRzLmZvckVhY2goKGxlZ2VuZDogTGF5ZXJMZWdlbmQpID0+IHtcclxuICAgICAgaHRtbCArPVxyXG4gICAgICAgICc8dGFibGUgYm9yZGVyPTEgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjp0b3BcIj4nO1xyXG4gICAgICBodG1sICs9ICc8dHI+PHRoIHdpZHRoPVwiMTcwcHhcIj4nICsgbGVnZW5kLnRpdGxlICsgJzwvdGg+JztcclxuICAgICAgaHRtbCArPSAnPHRkPjxpbWcgY2xhc3M9XCJwcmludEltYWdlTGVnZW5kXCIgc3JjPVwiJyArIGxlZ2VuZC51cmwgKyAnXCI+JztcclxuICAgICAgaHRtbCArPSAnPC90ZD48L3RyPjwvdGFibGU+JztcclxuICAgIH0pO1xyXG4gICAgaHRtbCArPSAnPC9kaXY+JztcclxuXHJcbiAgICByZXR1cm4gaHRtbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhbGwgdGhlIGxlZ2VuZCBpbiBhIHNpbmdsZSBpbWFnZVxyXG4gICAqICogQHBhcmFtICBmb3JtYXQgLSBJbWFnZSBmb3JtYXQuIGRlZmF1bHQgdmFsdWUgdG8gXCJwbmdcIlxyXG4gICAqIEByZXR1cm4gVGhlIGltYWdlIG9mIHRoZSBsZWdlbmRcclxuICAgKi9cclxuICBnZXRMYXllcnNMZWdlbmRJbWFnZShtYXAsIGZvcm1hdDogc3RyaW5nID0gJ3BuZycsIGRvWmlwRmlsZTogYm9vbGVhbiwgcmVzb2x1dGlvbjogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBzdGF0dXMkID0gbmV3IFN1YmplY3QoKTtcclxuICAgIC8vIEdldCBodG1sIGNvZGUgZm9yIHRoZSBsZWdlbmRcclxuICAgIGNvbnN0IHdpZHRoID0gMjAwOyAvLyBtaWxpbWV0ZXJzIHVuaXQsIG9yaWdpbmFsbHkgZGVmaW5lIGZvciBkb2N1bWVudCBwZGZcclxuICAgIGxldCBodG1sID0gdGhpcy5nZXRMYXllcnNMZWdlbmRIdG1sKG1hcCwgd2lkdGgsIHJlc29sdXRpb24pO1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICBmb3JtYXQgPSBmb3JtYXQudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAvLyBJZiBubyBsZWdlbmQgc2hvdyBObyBMRUdFTkQgaW4gYW4gaW1hZ2VcclxuICAgIGlmIChodG1sLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBodG1sID0gJzxmb250IHNpemU9XCIxMlwiIGZhY2U9XCJDb3VyaWVyIE5ld1wiID4nO1xyXG4gICAgICBodG1sICs9ICc8ZGl2IGFsaWduPVwiY2VudGVyXCI+PGI+Tk8gTEVHRU5EPC9iPjwvZGl2Pic7XHJcbiAgICB9XHJcbiAgICAvLyBDcmVhdGUgZGl2IHRvIGNvbnRhaW4gaHRtbCBjb2RlIGZvciBsZWdlbmRcclxuICAgIGNvbnN0IGRpdiA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAvLyBBZGQgaHRtbCBjb2RlIHRvIGNvbnZlcnQgaW4gdGhlIG5ldyB3aW5kb3dcclxuICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIC8vIERlZmluZSBldmVudCB0byBleGVjdXRlIGFmdGVyIGFsbCBpbWFnZXMgYXJlIGxvYWRlZCB0byBjcmVhdGUgdGhlIGNhbnZhc1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGh0bWwyY2FudmFzKGRpdiwgeyB1c2VDT1JTOiB0cnVlIH0pLnRoZW4oY2FudmFzID0+IHtcclxuICAgICAgICBsZXQgc3RhdHVzID0gU3ViamVjdFN0YXR1cy5Eb25lO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBpZiAoIWRvWmlwRmlsZSkge1xyXG4gICAgICAgICAgICAvLyBTYXZlIHRoZSBjYW52YXMgYXMgZmlsZVxyXG4gICAgICAgICAgICB0aGF0LnNhdmVDYW52YXNJbWFnZUFzRmlsZShjYW52YXMsICdsZWdlbmRJbWFnZScsIGZvcm1hdCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBBZGQgdGhlIGNhbnZhcyB0byB6aXBcclxuICAgICAgICAgICAgdGhhdC5nZW5lcmF0ZUNhbnZhRmlsZVRvWmlwKGNhbnZhcywgJ2xlZ2VuZEltYWdlJyArICcuJyArIGZvcm1hdCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkaXYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkaXYpOyAvLyByZW1vdmUgdGVtcCBkaXYgKElFKVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgc3RhdHVzID0gU3ViamVjdFN0YXR1cy5FcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdHVzJC5uZXh0KHN0YXR1cyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgNTAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkVGl0bGUoZG9jOiBqc1BERiwgdGl0bGU6IHN0cmluZywgcGFnZVdpZHRoOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHBkZlJlc29sdXRpb24gPSA5NjtcclxuICAgIGNvbnN0IHRpdGxlU2l6ZSA9IDMyO1xyXG4gICAgY29uc3QgdGl0bGVXaWR0aCA9ICgodGl0bGVTaXplICogMjUuNCkgLyBwZGZSZXNvbHV0aW9uKSAqIHRpdGxlLmxlbmd0aDtcclxuXHJcbiAgICBsZXQgdGl0bGVNYXJnaW5MZWZ0O1xyXG4gICAgaWYgKHRpdGxlV2lkdGggPiBwYWdlV2lkdGgpIHtcclxuICAgICAgdGl0bGVNYXJnaW5MZWZ0ID0gMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRpdGxlTWFyZ2luTGVmdCA9IChwYWdlV2lkdGggLSB0aXRsZVdpZHRoKSAvIDI7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jLnNldEZvbnQoJ2NvdXJpZXInKTtcclxuICAgIGRvYy5zZXRGb250U2l6ZSgzMik7XHJcbiAgICBkb2MudGV4dCh0aXRsZSwgdGl0bGVNYXJnaW5MZWZ0LCAxNSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgY29tbWVudCB0byB0aGUgZG9jdW1lbnRcclxuICAgKiAqIEBwYXJhbSAgZG9jIC0gcGRmIGRvY3VtZW50XHJcbiAgICogKiBAcGFyYW0gIGNvbW1lbnQgLSBDb21tZW50IHRvIGFkZCBpbiB0aGUgZG9jdW1lbnRcclxuICAgKiAqIEBwYXJhbSAgc2l6ZSAtIFNpemUgb2YgdGhlIGRvY3VtZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRDb21tZW50KGRvYzoganNQREYsIGNvbW1lbnQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgY29tbWVudFNpemUgPSAxNjtcclxuICAgIGNvbnN0IGNvbW1lbnRNYXJnaW5MZWZ0ID0gMjA7XHJcbiAgICBjb25zdCBtYXJnaW5Cb3R0b20gPSA1O1xyXG4gICAgY29uc3QgaGVpZ2h0UGl4ZWxzID0gZG9jLmludGVybmFsLnBhZ2VTaXplLmhlaWdodCAtIG1hcmdpbkJvdHRvbTtcclxuXHJcbiAgICBkb2Muc2V0Rm9udCgnY291cmllcicpO1xyXG4gICAgZG9jLnNldEZvbnRTaXplKGNvbW1lbnRTaXplKTtcclxuICAgIGRvYy50ZXh0KGNvbW1lbnQsIGNvbW1lbnRNYXJnaW5MZWZ0LCBoZWlnaHRQaXhlbHMpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBBZGQgcHJvamVjdGlvbiBhbmQvb3Igc2NhbGUgdG8gdGhlIGRvY3VtZW50XHJcbiAgICogQHBhcmFtICBkb2MgLSBwZGYgZG9jdW1lbnRcclxuICAgKiBAcGFyYW0gIG1hcCAtIE1hcCBvZiB0aGUgYXBwXHJcbiAgICogQHBhcmFtICBkcGkgLSBEUEkgcmVzb2x1dGlvbiBvZiB0aGUgZG9jdW1lbnRcclxuICAgKiBAcGFyYW0gIHByb2plY3Rpb24gLSBCb29sIHRvIGluZGljYXRlIGlmIHByb2plY3Rpb24gbmVlZCB0byBiZSBhZGRlZFxyXG4gICAqIEBwYXJhbSAgc2NhbGUgLSBCb29sIHRvIGluZGljYXRlIGlmIHNjYWxlIG5lZWQgdG8gYmUgYWRkZWRcclxuICAgKi9cclxuICBwcml2YXRlIGFkZFByb2pTY2FsZShcclxuICAgIGRvYzoganNQREYsXHJcbiAgICBtYXA6IElnb01hcCxcclxuICAgIGRwaTogbnVtYmVyLFxyXG4gICAgcHJvamVjdGlvbjogYm9vbGVhbixcclxuICAgIHNjYWxlOiBib29sZWFuXHJcbiAgKSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICBjb25zdCBwcm9qU2NhbGVTaXplID0gMTY7XHJcbiAgICBjb25zdCBwcm9qU2NhbGVNYXJnaW5MZWZ0ID0gMjA7XHJcbiAgICBjb25zdCBtYXJnaW5Cb3R0b20gPSAxNTtcclxuICAgIGNvbnN0IGhlaWdodFBpeGVscyA9IGRvYy5pbnRlcm5hbC5wYWdlU2l6ZS5oZWlnaHQgLSBtYXJnaW5Cb3R0b207XHJcblxyXG4gICAgbGV0IHRleHRQcm9qU2NhbGU6IHN0cmluZyA9ICcnO1xyXG4gICAgaWYgKHByb2plY3Rpb24gPT09IHRydWUpIHtcclxuICAgICAgY29uc3QgcHJvalRleHQgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5wcmludEZvcm0ucHJvamVjdGlvbicpO1xyXG4gICAgICB0ZXh0UHJvalNjYWxlICs9IHByb2pUZXh0ICsgJzogJyArIG1hcC5wcm9qZWN0aW9uO1xyXG4gICAgfVxyXG4gICAgaWYgKHNjYWxlID09PSB0cnVlKSB7XHJcbiAgICAgIGlmIChwcm9qZWN0aW9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGV4dFByb2pTY2FsZSArPSAnICAgJztcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBzY2FsZVRleHQgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5wcmludEZvcm0uc2NhbGUnKTtcclxuICAgICAgY29uc3QgbWFwU2NhbGUgPSBtYXAudmlld0NvbnRyb2xsZXIuZ2V0U2NhbGUoZHBpKTtcclxuICAgICAgdGV4dFByb2pTY2FsZSArPSBzY2FsZVRleHQgKyAnIH4gMSAnICsgZm9ybWF0U2NhbGUobWFwU2NhbGUpO1xyXG4gICAgfVxyXG4gICAgZG9jLnNldEZvbnQoJ2NvdXJpZXInKTtcclxuICAgIGRvYy5zZXRGb250U2l6ZShwcm9qU2NhbGVTaXplKTtcclxuICAgIGRvYy50ZXh0KHRleHRQcm9qU2NhbGUsIHByb2pTY2FsZU1hcmdpbkxlZnQsIGhlaWdodFBpeGVscyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdGhlIGxlZ2VuZCB0byB0aGUgZG9jdW1lbnRcclxuICAgKiBAcGFyYW0gIGRvYyAtIFBkZiBkb2N1bWVudCB3aGVyZSBsZWdlbmQgd2lsbCBiZSBhZGRlZFxyXG4gICAqIEBwYXJhbSAgbWFwIC0gTWFwIG9mIHRoZSBhcHBcclxuICAgKiBAcGFyYW0gIG1hcmdpbnMgLSBQYWdlIG1hcmdpbnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZExlZ2VuZChkb2M6IGpzUERGLCBtYXA6IElnb01hcCwgbWFyZ2luczogQXJyYXk8bnVtYmVyPiwgcmVzb2x1dGlvbjogbnVtYmVyKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIC8vIEdldCBodG1sIGNvZGUgZm9yIHRoZSBsZWdlbmRcclxuICAgIGNvbnN0IHdpZHRoID0gZG9jLmludGVybmFsLnBhZ2VTaXplLndpZHRoO1xyXG4gICAgY29uc3QgaHRtbCA9IHRoaXMuZ2V0TGF5ZXJzTGVnZW5kSHRtbChtYXAsIHdpZHRoLCByZXNvbHV0aW9uKTtcclxuICAgIC8vIElmIG5vIGxlZ2VuZCwgc2F2ZSB0aGUgbWFwIGRpcmVjdGx5XHJcbiAgICBpZiAoaHRtbCA9PT0gJycpIHtcclxuICAgICAgdGhpcy5zYXZlRG9jKGRvYyk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENyZWF0ZSBkaXYgdG8gY29udGFpbiBodG1sIGNvZGUgZm9yIGxlZ2VuZFxyXG4gICAgY29uc3QgZGl2ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaHRtbDJjYW52YXMoZGl2LCB7IHVzZUNPUlM6IHRydWUgfSkudGhlbihjYW52YXMgPT4ge1xyXG4gICAgICBsZXQgaW1nRGF0YTtcclxuICAgICAgY29uc3QgcG9zaXRpb24gPSAxMDtcclxuXHJcbiAgICAgIGltZ0RhdGEgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcclxuICAgICAgZG9jLmFkZFBhZ2UoKTtcclxuICAgICAgY29uc3QgaW1hZ2VTaXplID0gdGhpcy5nZXRJbWFnZVNpemVUb0ZpdFBkZihkb2MsIGNhbnZhcywgbWFyZ2lucyk7XHJcbiAgICAgIGRvYy5hZGRJbWFnZShpbWdEYXRhLCAnUE5HJywgMTAsIHBvc2l0aW9uLCBpbWFnZVNpemVbMF0sIGltYWdlU2l6ZVsxXSk7XHJcbiAgICAgIHRoYXQuc2F2ZURvYyhkb2MpO1xyXG4gICAgICBkaXYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkaXYpOyAvLyByZW1vdmUgdGVtcCBkaXYgKElFIHN0eWxlKVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQWRkIGh0bWwgY29kZSB0byBjb252ZXJ0IGluIHRoZSBuZXcgd2luZG93XHJcbiAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZENhbnZhcyhcclxuICAgIGRvYzoganNQREYsXHJcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxyXG4gICAgbWFyZ2luczogQXJyYXk8bnVtYmVyPlxyXG4gICkge1xyXG4gICAgbGV0IGltYWdlO1xyXG5cclxuICAgIGltYWdlID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvanBlZycpO1xyXG5cclxuICAgIGlmIChpbWFnZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IGltYWdlU2l6ZSA9IHRoaXMuZ2V0SW1hZ2VTaXplVG9GaXRQZGYoZG9jLCBjYW52YXMsIG1hcmdpbnMpO1xyXG4gICAgICBkb2MuYWRkSW1hZ2UoXHJcbiAgICAgICAgaW1hZ2UsXHJcbiAgICAgICAgJ0pQRUcnLFxyXG4gICAgICAgIG1hcmdpbnNbM10sXHJcbiAgICAgICAgbWFyZ2luc1swXSxcclxuICAgICAgICBpbWFnZVNpemVbMF0sXHJcbiAgICAgICAgaW1hZ2VTaXplWzFdXHJcbiAgICAgICk7XHJcbiAgICAgIGRvYy5yZWN0KG1hcmdpbnNbM10sIG1hcmdpbnNbMF0sIGltYWdlU2l6ZVswXSwgaW1hZ2VTaXplWzFdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFRPRE8gZml4IHByaW50aW5nIHdpdGggaW1hZ2UgcmVzb2x1dGlvblxyXG4gIHByaXZhdGUgYWRkTWFwKFxyXG4gICAgZG9jOiBqc1BERixcclxuICAgIG1hcDogSWdvTWFwLFxyXG4gICAgcmVzb2x1dGlvbjogbnVtYmVyLFxyXG4gICAgc2l6ZTogQXJyYXk8bnVtYmVyPixcclxuICAgIG1hcmdpbnM6IEFycmF5PG51bWJlcj5cclxuICApIHtcclxuICAgIGNvbnN0IHN0YXR1cyQgPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAgIGNvbnN0IG1hcFNpemUgPSBtYXAub2wuZ2V0U2l6ZSgpO1xyXG4gICAgY29uc3QgZXh0ZW50ID0gbWFwLm9sLmdldFZpZXcoKS5jYWxjdWxhdGVFeHRlbnQobWFwU2l6ZSk7XHJcblxyXG4gICAgY29uc3Qgd2lkdGhQaXhlbHMgPSBNYXRoLnJvdW5kKChzaXplWzBdICogcmVzb2x1dGlvbikgLyAyNS40KTtcclxuICAgIGNvbnN0IGhlaWdodFBpeGVscyA9IE1hdGgucm91bmQoKHNpemVbMV0gKiByZXNvbHV0aW9uKSAvIDI1LjQpO1xyXG5cclxuICAgIGxldCB0aW1lb3V0O1xyXG5cclxuICAgIG1hcC5vbC5vbmNlKCdwb3N0Y29tcG9zZScsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNhbnZhcyA9IGV2ZW50LmNvbnRleHQuY2FudmFzO1xyXG4gICAgICBjb25zdCBtYXBTdGF0dXMkJCA9IG1hcC5zdGF0dXMkLnN1YnNjcmliZSgobWFwU3RhdHVzOiBTdWJqZWN0U3RhdHVzKSA9PiB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG5cclxuICAgICAgICBpZiAobWFwU3RhdHVzICE9PSBTdWJqZWN0U3RhdHVzLkRvbmUpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1hcFN0YXR1cyQkLnVuc3Vic2NyaWJlKCk7XHJcblxyXG4gICAgICAgIGxldCBzdGF0dXMgPSBTdWJqZWN0U3RhdHVzLkRvbmU7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHRoaXMuYWRkQ2FudmFzKGRvYywgY2FudmFzLCBtYXJnaW5zKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIHN0YXR1cyA9IFN1YmplY3RTdGF0dXMuRXJyb3I7XHJcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmVycm9yKFxyXG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAnaWdvLmdlby5wcmludEZvcm0uY29yc0Vycm9yTWVzc2FnZUJvZHknXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICdpZ28uZ2VvLnByaW50Rm9ybS5jb3JzRXJyb3JNZXNzYWdlSGVhZGVyJ1xyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAncHJpbnQnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJNYXAobWFwLCBtYXBTaXplLCBleHRlbnQpO1xyXG4gICAgICAgIHN0YXR1cyQubmV4dChzdGF0dXMpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIElmIG5vIGxvYWRpbmcgYXMgc3RhcnRlZCBhZnRlciAyMDBtcywgdGhlbiBwcm9iYWJseSBubyBsb2FkaW5nXHJcbiAgICAgIC8vIGlzIHJlcXVpcmVkLlxyXG4gICAgICB0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIG1hcFN0YXR1cyQkLnVuc3Vic2NyaWJlKCk7XHJcblxyXG4gICAgICAgIGxldCBzdGF0dXMgPSBTdWJqZWN0U3RhdHVzLkRvbmU7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHRoaXMuYWRkQ2FudmFzKGRvYywgY2FudmFzLCBtYXJnaW5zKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIHN0YXR1cyA9IFN1YmplY3RTdGF0dXMuRXJyb3I7XHJcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmVycm9yKFxyXG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAnaWdvLmdlby5wcmludEZvcm0uY29yc0Vycm9yTWVzc2FnZUJvZHknXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICdpZ28uZ2VvLnByaW50Rm9ybS5jb3JzRXJyb3JNZXNzYWdlSGVhZGVyJ1xyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAncHJpbnQnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJNYXAobWFwLCBtYXBTaXplLCBleHRlbnQpO1xyXG4gICAgICAgIHN0YXR1cyQubmV4dChzdGF0dXMpO1xyXG4gICAgICB9LCAyMDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJNYXAobWFwLCBbd2lkdGhQaXhlbHMsIGhlaWdodFBpeGVsc10sIGV4dGVudCk7XHJcblxyXG4gICAgcmV0dXJuIHN0YXR1cyQ7XHJcbiAgfVxyXG5cclxuICBkZWZpbmVOYkZpbGVUb1Byb2Nlc3MobmJGaWxlVG9Qcm9jZXNzKSB7XHJcbiAgICB0aGlzLm5iRmlsZVRvUHJvY2VzcyA9IG5iRmlsZVRvUHJvY2VzcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERvd25sb2FkIGFuIGltYWdlIG9mIHRoZSBtYXAgd2l0aCBhZGRpdGlvbiBvZiBpbmZvcm1hdGlvbnNcclxuICAgKiBAcGFyYW0gIG1hcCAtIE1hcCBvZiB0aGUgYXBwXHJcbiAgICogQHBhcmFtICBmb3JtYXQgLSBJbWFnZSBmb3JtYXQuIGRlZmF1bHQgdmFsdWUgdG8gXCJwbmdcIlxyXG4gICAqIEBwYXJhbSAgcHJvamVjdGlvbiAtIEluZGljYXRlIGlmIHByb2plY3Rpb24gbmVlZCB0byBiZSBhZGQuIERlZmF1bHQgdG8gZmFsc2VcclxuICAgKiBAcGFyYW0gIHNjYWxlIC0gSW5kaWNhdGUgaWYgc2NhbGUgbmVlZCB0byBiZSBhZGQuIERlZmF1bHQgdG8gZmFsc2VcclxuICAgKiBAcGFyYW0gIGxlZ2VuZCAtIEluZGljYXRlIGlmIHRoZSBsZWdlbmQgb2YgbGF5ZXJzIG5lZWQgdG8gYmUgZG93bmxvYWQuIERlZmF1bHQgdG8gZmFsc2VcclxuICAgKiBAcGFyYW0gIHRpdGxlIC0gVGl0bGUgdG8gYWRkIGZvciB0aGUgbWFwIC0gRGVmYXVsdCB0byBibGFua1xyXG4gICAqIEBwYXJhbSAgY29tbWVudCAtIENvbW1lbnQgdG8gYWRkIGZvciB0aGUgbWFwIC0gRGVmYXVsdCB0byBibGFua1xyXG4gICAqIEBwYXJhbSAgZG9aaXBGaWxlIC0gSW5kaWNhdGUgaWYgd2UgZG8gYSB6aXAgd2l0aCB0aGUgZmlsZVxyXG4gICAqIEByZXR1cm4gSW1hZ2UgZmlsZSBvZiB0aGUgbWFwIHdpdGggZXh0ZW5zaW9uIGZvcm1hdCBnaXZlbiBhcyBwYXJhbWV0ZXJcclxuICAgKi9cclxuICBkb3dubG9hZE1hcEltYWdlKFxyXG4gICAgbWFwOiBJZ29NYXAsXHJcbiAgICByZXNvbHV0aW9uOiBudW1iZXIsXHJcbiAgICBmb3JtYXQgPSAncG5nJyxcclxuICAgIHByb2plY3Rpb24gPSBmYWxzZSxcclxuICAgIHNjYWxlID0gZmFsc2UsXHJcbiAgICBsZWdlbmQgPSBmYWxzZSxcclxuICAgIHRpdGxlID0gJycsXHJcbiAgICBjb21tZW50ID0gJycsXHJcbiAgICBkb1ppcEZpbGUgPSB0cnVlXHJcbiAgKSB7XHJcbiAgICBjb25zdCBzdGF0dXMkID0gbmV3IFN1YmplY3QoKTtcclxuICAgIC8vIGNvbnN0IHJlc29sdXRpb24gPSBtYXAub2wuZ2V0VmlldygpLmdldFJlc29sdXRpb24oKTtcclxuICAgIHRoaXMuYWN0aXZpdHlJZCA9IHRoaXMuYWN0aXZpdHlTZXJ2aWNlLnJlZ2lzdGVyKCk7XHJcbiAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICBtYXAub2wub25jZSgncG9zdGNvbXBvc2UnLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICBmb3JtYXQgPSBmb3JtYXQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgY29uc3QgY29udGV4dCA9IGV2ZW50LmNvbnRleHQ7XHJcbiAgICAgIGNvbnN0IG5ld0NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICBjb25zdCBuZXdDb250ZXh0ID0gbmV3Q2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgIC8vIFBvc3Rpb24gaW4gaGVpZ2h0IHRvIHNldCB0aGUgY2FudmFzIGluIG5ldyBjYW52YXNcclxuICAgICAgbGV0IHBvc2l0aW9uSENhbnZhcyA9IDA7XHJcbiAgICAgIC8vIFBvc2l0aW9uIGluIHdpZHRoIHRvIHNldCB0aGUgUHJvai9TY2FsZSBpbiBuZXcgY2FudmFzXHJcbiAgICAgIGxldCBwb3NpdGlvbldQcm9qU2NhbGUgPSAxMDtcclxuICAgICAgLy8gR2V0IGhlaWdodC93aWR0aCBvZiBtYXAgY2FudmFzXHJcbiAgICAgIGNvbnN0IHdpZHRoID0gY29udGV4dC5jYW52YXMud2lkdGg7XHJcbiAgICAgIGxldCBoZWlnaHQgPSBjb250ZXh0LmNhbnZhcy5oZWlnaHQ7XHJcbiAgICAgIC8vIFNldCBGb250IHRvIGNhbGN1bGF0ZSBjb21tZW50IHdpZHRoXHJcbiAgICAgIG5ld0NvbnRleHQuZm9udCA9ICcyMHB4IENhbGlicmknO1xyXG4gICAgICBjb25zdCBjb21tZW50V2lkdGggPSBuZXdDb250ZXh0Lm1lYXN1cmVUZXh0KGNvbW1lbnQpLndpZHRoO1xyXG4gICAgICAvLyBBZGQgaGVpZ2h0IGZvciB0aXRsZSBpZiBkZWZpbmVkXHJcbiAgICAgIGhlaWdodCA9IHRpdGxlICE9PSAnJyA/IGhlaWdodCArIDMwIDogaGVpZ2h0O1xyXG4gICAgICAvLyBBZGQgaGVpZ2h0IGZvciBwcm9qZWN0aW9uIG9yIHNjYWxlIChzYW1lIGxpbmUpIGlmIGRlZmluZWRcclxuICAgICAgaGVpZ2h0ID0gcHJvamVjdGlvbiAhPT0gZmFsc2UgfHwgc2NhbGUgIT09IGZhbHNlID8gaGVpZ2h0ICsgMzAgOiBoZWlnaHQ7XHJcbiAgICAgIGNvbnN0IHBvc2l0aW9uSFByb2pTY2FsZSA9IGhlaWdodCAtIDEwO1xyXG4gICAgICAvLyBEZWZpbmUgbnVtYmVyIG9mIGxpbmUgZGVwZW5kaW5nIG9mIHRoZSBjb21tZW50IGxlbmd0aFxyXG4gICAgICBjb25zdCBjb21tZW50TmJMaW5lID0gTWF0aC5jZWlsKGNvbW1lbnRXaWR0aCAvIHdpZHRoKTtcclxuICAgICAgLy8gQWRkIGhlaWdodCBmb3IgbXVsdGlsaW5lIGNvbW1lbnQgaWYgZGVmaW5lZFxyXG4gICAgICBoZWlnaHQgPSBjb21tZW50ICE9PSAnJyA/IGhlaWdodCArIGNvbW1lbnROYkxpbmUgKiAzMCA6IGhlaWdodDtcclxuICAgICAgbGV0IHBvc2l0aW9uSENvbW1lbnQgPSBoZWlnaHQgLSBjb21tZW50TmJMaW5lICogMjAgKyA1O1xyXG4gICAgICAvLyBTZXQgdGhlIG5ldyBjYW52YXMgd2l0aCB0aGUgbmV3IGNhbGN1bGF0ZWQgc2l6ZVxyXG4gICAgICBuZXdDYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgbmV3Q2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgLy8gUGF0Y2ggSnBlZyBkZWZhdWx0IGJsYWNrIGJhY2tncm91bmQgdG8gd2hpdGVcclxuICAgICAgaWYgKGZvcm1hdCA9PT0gJ2pwZWcnKSB7XHJcbiAgICAgICAgbmV3Q29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZmZmZic7XHJcbiAgICAgICAgbmV3Q29udGV4dC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBuZXdDb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwMDAwJztcclxuICAgICAgfVxyXG4gICAgICAvLyBJZiBhIHRpdGxlIG5lZWQgdG8gYmUgYWRkZWQgdG8gY2FudmFzXHJcbiAgICAgIGlmICh0aXRsZSAhPT0gJycpIHtcclxuICAgICAgICAvLyBTZXQgZm9udCBmb3IgdGl0bGVcclxuICAgICAgICBuZXdDb250ZXh0LmZvbnQgPSAnMjZweCBDYWxpYnJpJztcclxuICAgICAgICBwb3NpdGlvbkhDYW52YXMgPSAzMDtcclxuICAgICAgICBuZXdDb250ZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInO1xyXG4gICAgICAgIG5ld0NvbnRleHQuZmlsbFRleHQodGl0bGUsIHdpZHRoIC8gMiwgMjApO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFNldCBmb250IGZvciBuZXh0IHNlY3Rpb25cclxuICAgICAgbmV3Q29udGV4dC5mb250ID0gJzIwcHggQ2FsaWJyaSc7XHJcbiAgICAgIC8vIElmIHByb2plY3Rpb24gbmVlZCB0byBiZSBhZGRlZCB0byBjYW52YXNcclxuICAgICAgaWYgKHByb2plY3Rpb24gIT09IGZhbHNlKSB7XHJcbiAgICAgICAgY29uc3QgcHJvalRleHQgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5wcmludEZvcm0ucHJvamVjdGlvbicpO1xyXG4gICAgICAgIG5ld0NvbnRleHQudGV4dEFsaWduID0gJ3N0YXJ0JztcclxuICAgICAgICBuZXdDb250ZXh0LmZpbGxUZXh0KFxyXG4gICAgICAgICAgcHJvalRleHQgKyAnOiAnICsgbWFwLnByb2plY3Rpb24sXHJcbiAgICAgICAgICBwb3NpdGlvbldQcm9qU2NhbGUsXHJcbiAgICAgICAgICBwb3NpdGlvbkhQcm9qU2NhbGVcclxuICAgICAgICApO1xyXG4gICAgICAgIHBvc2l0aW9uV1Byb2pTY2FsZSArPSAyMDA7IC8vIFdpZHRoIHBvc2l0aW9uIGNoYW5nZSBmb3Igc2NhbGUgcG9zaXRpb25cclxuICAgICAgfVxyXG4gICAgICAvLyBJZiBzY2FsZSBuZWVkIHRvIGJlIGFkZGVkIHRvIGNhbnZhc1xyXG4gICAgICBpZiAoc2NhbGUgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgY29uc3Qgc2NhbGVUZXh0ID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8ucHJpbnRGb3JtLnNjYWxlJyk7XHJcbiAgICAgICAgY29uc3QgbWFwU2NhbGUgPSBtYXAudmlld0NvbnRyb2xsZXIuZ2V0U2NhbGUocmVzb2x1dGlvbik7XHJcbiAgICAgICAgbmV3Q29udGV4dC50ZXh0QWxpZ24gPSAnc3RhcnQnO1xyXG4gICAgICAgIG5ld0NvbnRleHQuZmlsbFRleHQoXHJcbiAgICAgICAgICBzY2FsZVRleHQgKyAnIH4gMSA6ICcgKyBmb3JtYXRTY2FsZShtYXBTY2FsZSksXHJcbiAgICAgICAgICBwb3NpdGlvbldQcm9qU2NhbGUsXHJcbiAgICAgICAgICBwb3NpdGlvbkhQcm9qU2NhbGVcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIElmIGEgY29tbWVudCBuZWVkIHRvIGJlIGFkZGVkIHRvIGNhbnZhc1xyXG4gICAgICBpZiAoY29tbWVudCAhPT0gJycpIHtcclxuICAgICAgICBuZXdDb250ZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInO1xyXG4gICAgICAgIC8vIElmIG9ubHkgb25lIGxpbmUsIG5vIG5lZWQgdG8gbXVsdGlsaW5lIHRoZSBjb21tZW50XHJcbiAgICAgICAgaWYgKGNvbW1lbnROYkxpbmUgPT09IDEpIHtcclxuICAgICAgICAgIG5ld0NvbnRleHQuZmlsbFRleHQoY29tbWVudCwgd2lkdGggLyAyLCBwb3NpdGlvbkhDb21tZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gU2VwYXJhdGUgdGhlIHNldGVuc2VzIHRvIGJlIGFwcHJveC4gdGhlIHNhbWUgbGVuZ3RoXHJcbiAgICAgICAgICBjb25zdCBuYkNvbW1lbnRDaGFyID0gY29tbWVudC5sZW5ndGg7XHJcbiAgICAgICAgICBjb25zdCBDb21tZW50TGVuZ3RoVG9DdXQgPSBNYXRoLmZsb29yKG5iQ29tbWVudENoYXIgLyBjb21tZW50TmJMaW5lKTtcclxuICAgICAgICAgIGxldCBjb21tZW50Q3VycmVudExpbmUgPSAnJztcclxuICAgICAgICAgIGxldCBwb3NpdGlvbkZpcnN0Q3V0Q2hhciA9IDA7XHJcbiAgICAgICAgICBsZXQgcG9zaXRpb25MYXN0Qmxhbms7XHJcbiAgICAgICAgICAvLyBMb29wIGZvciB0aGUgbnVtYmVyIG9mIGxpbmUgY2FsY3VsYXRlZFxyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21tZW50TmJMaW5lOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gRm9yIGFsbCBsaW5lIGV4Y2VwdCBsYXN0XHJcbiAgICAgICAgICAgIGlmIChjb21tZW50TmJMaW5lIC0gMSA+IGkpIHtcclxuICAgICAgICAgICAgICAvLyBHZXQgY29tbWVudCBjdXJyZW50IGxpbmUgdG8gZmluZCB0aGUgcmlnaHQgcGxhY2UgdHUgY3V0IGNvbW1lbnRcclxuICAgICAgICAgICAgICBjb21tZW50Q3VycmVudExpbmUgPSBjb21tZW50LnN1YnN0cihcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uRmlyc3RDdXRDaGFyLFxyXG4gICAgICAgICAgICAgICAgQ29tbWVudExlbmd0aFRvQ3V0XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAvLyBDdXQgdGhlIHNldGVuY2UgYXQgYmxhbmtcclxuICAgICAgICAgICAgICBwb3NpdGlvbkxhc3RCbGFuayA9IGNvbW1lbnRDdXJyZW50TGluZS5sYXN0SW5kZXhPZignICcpO1xyXG4gICAgICAgICAgICAgIG5ld0NvbnRleHQuZmlsbFRleHQoXHJcbiAgICAgICAgICAgICAgICBjb21tZW50Q3VycmVudExpbmUuc3Vic3RyKDAsIHBvc2l0aW9uTGFzdEJsYW5rKSxcclxuICAgICAgICAgICAgICAgIHdpZHRoIC8gMixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uSENvbW1lbnRcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uRmlyc3RDdXRDaGFyICs9IHBvc2l0aW9uTGFzdEJsYW5rO1xyXG4gICAgICAgICAgICAgIC8vIEdvIHRvIG5leHQgbGluZSBmb3IgaW5zZXJ0aW9uXHJcbiAgICAgICAgICAgICAgcG9zaXRpb25IQ29tbWVudCArPSAyMDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBEb24ndCBjdXQgbGFzdCBwYXJ0XHJcbiAgICAgICAgICAgICAgbmV3Q29udGV4dC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgIGNvbW1lbnQuc3Vic3RyKHBvc2l0aW9uRmlyc3RDdXRDaGFyKSxcclxuICAgICAgICAgICAgICAgIHdpZHRoIC8gMixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uSENvbW1lbnRcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBtYXAgdG8gbmV3IGNhbnZhc1xyXG4gICAgICBuZXdDb250ZXh0LmRyYXdJbWFnZShjb250ZXh0LmNhbnZhcywgMCwgcG9zaXRpb25IQ2FudmFzKTtcclxuXHJcbiAgICAgIGxldCBzdGF0dXMgPSBTdWJqZWN0U3RhdHVzLkRvbmU7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8gU2F2ZSB0aGUgY2FudmFzIGFzIGZpbGVcclxuICAgICAgICBpZiAoIWRvWmlwRmlsZSkge1xyXG4gICAgICAgICAgdGhpcy5zYXZlQ2FudmFzSW1hZ2VBc0ZpbGUobmV3Q2FudmFzLCAnbWFwJywgZm9ybWF0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdC50b0xvd2VyQ2FzZSgpID09PSAndGlmZicpIHtcclxuICAgICAgICAgIC8vIEFkZCB0aGUgY2FudmFzIHRvIHppcFxyXG4gICAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbnZhRmlsZVRvWmlwKFxyXG4gICAgICAgICAgICBuZXdDYW52YXMsXHJcbiAgICAgICAgICAgICdtYXAnICsgbWFwLnByb2plY3Rpb24ucmVwbGFjZSgnOicsICdfJykgKyAnLicgKyBmb3JtYXRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIEFkZCB0aGUgY2FudmFzIHRvIHppcFxyXG4gICAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbnZhRmlsZVRvWmlwKG5ld0NhbnZhcywgJ21hcCcgKyAnLicgKyBmb3JtYXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgc3RhdHVzID0gU3ViamVjdFN0YXR1cy5FcnJvcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3RhdHVzJC5uZXh0KHN0YXR1cyk7XHJcblxyXG4gICAgICBpZiAoZm9ybWF0LnRvTG93ZXJDYXNlKCkgPT09ICd0aWZmJykge1xyXG4gICAgICAgIGNvbnN0IHRpd0NvbnRlbnQgPSB0aGlzLmdldFdvcmxkRmlsZUluZm9ybWF0aW9uKG1hcCk7XHJcbiAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFt0aXdDb250ZW50XSwge1xyXG4gICAgICAgICAgdHlwZTogJ3RleHQvcGxhaW47Y2hhcnNldD11dGYtOCdcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIWRvWmlwRmlsZSkge1xyXG4gICAgICAgICAgLy8gc2F2ZUFzIGF1dG9tYXRpY2x5IHJlcGxhY2UgJzonIGZvciAnXydcclxuICAgICAgICAgIHNhdmVBcyhibG9iLCAnbWFwJyArIG1hcC5wcm9qZWN0aW9uICsgJy50ZncnKTtcclxuICAgICAgICAgIHRoaXMuc2F2ZUZpbGVQcm9jZXNzaW5nKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIEFkZCB0aGUgY2FudmFzIHRvIHppcFxyXG4gICAgICAgICAgdGhpcy5hZGRGaWxlVG9aaXAoXHJcbiAgICAgICAgICAgICdtYXAnICsgbWFwLnByb2plY3Rpb24ucmVwbGFjZSgnOicsICdfJykgKyAnLnRmdycsXHJcbiAgICAgICAgICAgIGJsb2JcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIG1hcC5vbC5yZW5kZXJTeW5jKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbmRlck1hcChtYXAsIHNpemUsIGV4dGVudCkge1xyXG4gICAgbWFwLm9sLnJlbmRlclN5bmMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNhdmUgZG9jdW1lbnRcclxuICAgKiBAcGFyYW0gIGRvYyAtIERvY3VtZW50IHRvIHNhdmVcclxuICAgKi9cclxuICBwcml2YXRlIHNhdmVEb2MoZG9jOiBqc1BERikge1xyXG4gICAgZG9jLnNhdmUoJ21hcC5wZGYnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZSB0aGUgYmVzdCBJbWFnZSBzaXplIHRvIGZpdCBpbiBwZGZcclxuICAgKiBAcGFyYW0gZG9jIC0gUGRmIERvY3VtZW50XHJcbiAgICogQHBhcmFtIGNhbnZhcyAtIENhbnZhcyBvZiBpbWFnZVxyXG4gICAqIEBwYXJhbSBtYXJnaW5zIC0gUGFnZSBtYXJnaW5zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRJbWFnZVNpemVUb0ZpdFBkZihkb2MsIGNhbnZhcywgbWFyZ2lucykge1xyXG4gICAgLy8gRGVmaW5lIHZhcmlhYmxlIHRvIGNhbGN1bGF0ZSBiZXN0IHNpemUgdG8gZml0IGluIG9uZSBwYWdlXHJcbiAgICBjb25zdCBwYWdlSGVpZ2h0ID1cclxuICAgICAgZG9jLmludGVybmFsLnBhZ2VTaXplLmdldEhlaWdodCgpIC0gKG1hcmdpbnNbMF0gKyBtYXJnaW5zWzJdKTtcclxuICAgIGNvbnN0IHBhZ2VXaWR0aCA9XHJcbiAgICAgIGRvYy5pbnRlcm5hbC5wYWdlU2l6ZS5nZXRXaWR0aCgpIC0gKG1hcmdpbnNbMV0gKyBtYXJnaW5zWzNdKTtcclxuICAgIGNvbnN0IGNhbkhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICBjb25zdCBjYW5XaWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIGNvbnN0IGhlaWdodFJhdGlvID0gY2FuSGVpZ2h0IC8gcGFnZUhlaWdodDtcclxuICAgIGNvbnN0IHdpZHRoUmF0aW8gPSBjYW5XaWR0aCAvIHBhZ2VXaWR0aDtcclxuICAgIGNvbnN0IG1heFJhdGlvID0gaGVpZ2h0UmF0aW8gPiB3aWR0aFJhdGlvID8gaGVpZ2h0UmF0aW8gOiB3aWR0aFJhdGlvO1xyXG4gICAgY29uc3QgaW1nSGVpZ2ggPSBtYXhSYXRpbyA+IDEgPyBjYW5IZWlnaHQgLyBtYXhSYXRpbyA6IGNhbkhlaWdodDtcclxuICAgIGNvbnN0IGltZ1dpZHRoID0gbWF4UmF0aW8gPiAxID8gY2FuV2lkdGggLyBtYXhSYXRpbyA6IGNhbldpZHRoO1xyXG5cclxuICAgIHJldHVybiBbaW1nV2lkdGgsIGltZ0hlaWdoXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhIHdvcmxkIGZpbGUgaW5mb3JtYXRpb24gZm9yIHRpZmZcclxuICAgKiBAcGFyYW0gIG1hcCAtIE1hcCBvZiB0aGUgYXBwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRXb3JsZEZpbGVJbmZvcm1hdGlvbihtYXApIHtcclxuICAgIGNvbnN0IGN1cnJlbnRSZXNvbHV0aW9uID0gbWFwLnZpZXdDb250cm9sbGVyLmdldFJlc29sdXRpb24oKTtcclxuICAgIGNvbnN0IGN1cnJlbnRFeHRlbnQgPSBtYXAuZ2V0RXh0ZW50KCk7IC8vIFJldHVybiBbbWlueCwgbWlueSwgbWF4eCwgbWF4eV1cclxuICAgIHJldHVybiBbXHJcbiAgICAgIGN1cnJlbnRSZXNvbHV0aW9uLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAtY3VycmVudFJlc29sdXRpb24sXHJcbiAgICAgIGN1cnJlbnRFeHRlbnRbMF0gKyBjdXJyZW50UmVzb2x1dGlvbiAvIDAuNSxcclxuICAgICAgY3VycmVudEV4dGVudFszXSAtIGN1cnJlbnRSZXNvbHV0aW9uIC8gMC41XHJcbiAgICBdLmpvaW4oJ1xcbicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2F2ZSBjYW52YXMgaW1hZ2UgYXMgZmlsZVxyXG4gICAqIEBwYXJhbSBjYW52YXMgLSBDYW52YXMgdG8gc2F2ZVxyXG4gICAqIEBwYXJhbSBuYW1lIC0gTmFtZSBvZiB0aGUgZmlsZVxyXG4gICAqIEBwYXJhbSBmb3JtYXQgLSBmaWxlIGZvcm1hdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2F2ZUNhbnZhc0ltYWdlQXNGaWxlKGNhbnZhcywgbmFtZSwgZm9ybWF0KSB7XHJcbiAgICBjb25zdCBibG9iRm9ybWF0ID0gJ2ltYWdlLycgKyBmb3JtYXQ7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjYW52YXMudG9EYXRhVVJMKCk7IC8vIEp1c3QgdG8gbWFrZSB0aGUgY2F0Y2ggdHJpZ2dlciB3aWh0b3V0IHRvQmxvYiBFcnJvciB0aHJvdyBub3QgY2F0Y2hlZFxyXG4gICAgICAvLyBJZiBuYXZpZ2F0b3IgaXMgSW50ZXJuZXQgRXhwbG9yZXJcclxuICAgICAgaWYgKG5hdmlnYXRvci5tc1NhdmVCbG9iKSB7XHJcbiAgICAgICAgbmF2aWdhdG9yLm1zU2F2ZUJsb2IoY2FudmFzLm1zVG9CbG9iKCksIG5hbWUgKyAnLicgKyBmb3JtYXQpO1xyXG4gICAgICAgIHRoaXMuc2F2ZUZpbGVQcm9jZXNzaW5nKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2FudmFzLnRvQmxvYihibG9iID0+IHtcclxuICAgICAgICAgIC8vIGRvd25sb2FkIGltYWdlXHJcbiAgICAgICAgICBzYXZlQXMoYmxvYiwgbmFtZSArICcuJyArIGZvcm1hdCk7XHJcbiAgICAgICAgICB0aGF0LnNhdmVGaWxlUHJvY2Vzc2luZygpO1xyXG4gICAgICAgIH0sIGJsb2JGb3JtYXQpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5lcnJvcihcclxuICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICdpZ28uZ2VvLnByaW50Rm9ybS5jb3JzRXJyb3JNZXNzYWdlQm9keSdcclxuICAgICAgICApLFxyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgJ2lnby5nZW8ucHJpbnRGb3JtLmNvcnNFcnJvck1lc3NhZ2VIZWFkZXInXHJcbiAgICAgICAgKSxcclxuICAgICAgICAncHJpbnQnXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgZmlsZSB0byBhIHppcFxyXG4gICAqIEBwYXJhbSBjYW52YXMgLSBGaWxlIHRvIGFkZCB0byB0aGUgemlwXHJcbiAgICogQHBhcmFtICBuYW1lIC1OYW1lIG9mIHRoZSBmaWxlb3ZlcnZpZXdcclxuICAgKi9cclxuICBwcml2YXRlIGdlbmVyYXRlQ2FudmFGaWxlVG9aaXAoY2FudmFzLCBuYW1lKSB7XHJcbiAgICBjb25zdCBibG9iRm9ybWF0ID0gJ2ltYWdlLycgKyAnanBlZyc7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIGlmIChcclxuICAgICAgIXRoaXMuaGFzT3duUHJvcGVydHkoJ3ppcEZpbGUnKSB8fFxyXG4gICAgICB0eXBlb2YgdGhpcy56aXBGaWxlID09PSAndW5kZWZpbmVkJ1xyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuemlwRmlsZSA9IG5ldyBKU1ppcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNhbnZhcy50b0RhdGFVUkwoKTsgLy8gSnVzdCB0byBtYWtlIHRoZSBjYXRjaCB0cmlnZ2VyIHdpaHRvdXQgdG9CbG9iIEVycm9yIHRocm93IG5vdCBjYXRjaGVkXHJcbiAgICAgIGlmIChuYXZpZ2F0b3IubXNTYXZlQmxvYikge1xyXG4gICAgICAgIHRoaXMuYWRkRmlsZVRvWmlwKG5hbWUsIGNhbnZhcy5tc1RvQmxvYigpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjYW52YXMudG9CbG9iKGJsb2IgPT4ge1xyXG4gICAgICAgICAgdGhhdC5hZGRGaWxlVG9aaXAobmFtZSwgYmxvYik7XHJcbiAgICAgICAgfSwgYmxvYkZvcm1hdCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmVycm9yKFxyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgJ2lnby5nZW8ucHJpbnRGb3JtLmNvcnNFcnJvck1lc3NhZ2VCb2R5J1xyXG4gICAgICAgICksXHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAnaWdvLmdlby5wcmludEZvcm0uY29yc0Vycm9yTWVzc2FnZUhlYWRlcidcclxuICAgICAgICApLFxyXG4gICAgICAgICdwcmludCdcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBmaWxlIHRvIHppcCwgaWYgYWxsIGZpbGUgYXJlIHppcHBlZCwgZG93bmxvYWRcclxuICAgKiBAcGFyYW0gbmFtZSAtIE5hbWUgb2YgdGhlIGZpbGVzXHJcbiAgICogQHBhcmFtIGJsb2IgLSBDb250YWluIG9mIGZpbGVcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEZpbGVUb1ppcChuYW1lLCBibG9iKSB7XHJcbiAgICAvLyBhZGQgZmlsZSB0byB6aXBcclxuICAgIHRoaXMuemlwRmlsZS5maWxlKG5hbWUsIGJsb2IpO1xyXG4gICAgdGhpcy5uYkZpbGVUb1Byb2Nlc3MtLTtcclxuXHJcbiAgICAvLyBJZiBhbGwgZmlsZXMgYXJlIHByb2NjZXNzZWRcclxuICAgIGlmICh0aGlzLm5iRmlsZVRvUHJvY2VzcyA9PT0gMCkge1xyXG4gICAgICAvLyBEb3dubG9hZCB6aXAgZmlsZVxyXG4gICAgICB0aGlzLmdldFppcEZpbGUoKTtcclxuICAgICAgLy8gU3RvcCBsb2FkaW5nXHJcbiAgICAgIHRoaXMuYWN0aXZpdHlTZXJ2aWNlLnVucmVnaXN0ZXIodGhpcy5hY3Rpdml0eUlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2F2ZUZpbGVQcm9jZXNzaW5nKCkge1xyXG4gICAgdGhpcy5uYkZpbGVUb1Byb2Nlc3MtLTtcclxuXHJcbiAgICAvLyBJZiBhbGwgZmlsZXMgYXJlIHByb2NjZXNzZWRcclxuICAgIGlmICh0aGlzLm5iRmlsZVRvUHJvY2VzcyA9PT0gMCkge1xyXG4gICAgICAvLyBTdG9wIGxvYWRpbmdcclxuICAgICAgdGhpcy5hY3Rpdml0eVNlcnZpY2UudW5yZWdpc3Rlcih0aGlzLmFjdGl2aXR5SWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSB6aXBwZWQgZmlsZVxyXG4gICAqIEByZXR1cm4gUmV0dW4gYSB6aXAgZmlsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0WmlwRmlsZSgpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgdGhpcy56aXBGaWxlLmdlbmVyYXRlQXN5bmMoeyB0eXBlOiAnYmxvYicgfSkudGhlbihibG9iID0+IHtcclxuICAgICAgLy8gMSkgZ2VuZXJhdGUgdGhlIHppcCBmaWxlXHJcbiAgICAgIHNhdmVBcyhibG9iLCAnbWFwLnppcCcpO1xyXG4gICAgICBkZWxldGUgdGhhdC56aXBGaWxlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==