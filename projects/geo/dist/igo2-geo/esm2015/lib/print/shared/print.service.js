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
import { getLayersLegends } from '../../layer/utils/outputLegend';
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
            html2canvas(div, { useCORS: true })
                .then((/**
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
            }))
                .catch((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                console.log(e);
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
            textProjScale += scaleText + ': ~ 1 / ' + formatScale(mapScale);
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
        html2canvas(div, { useCORS: true })
            .then((/**
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
        }))
            .catch((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            console.log(e);
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
                newContext.fillText(scaleText + ': ~ 1 / ' + formatScale(mapScale), positionWProjScale, positionHProjScale);
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
        const currentExtent = map.viewController.getExtent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9wcmludC9zaGFyZWQvcHJpbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxLQUFLLFlBQVksTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFL0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHOUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXpELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7O01BSTVELFdBQVcsR0FBRyxZQUFZO0FBS2hDLE1BQU0sT0FBTyxZQUFZOzs7Ozs7SUFJdkIsWUFDVSxjQUE4QixFQUM5QixlQUFnQyxFQUNoQyxlQUFnQztRQUZoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUN2QyxDQUFDOzs7Ozs7SUFFSixLQUFLLENBQUMsR0FBVyxFQUFFLE9BQXFCOztjQUNoQyxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUU7O2NBRXZCLFdBQVcsR0FBVyxPQUFPLENBQUMsV0FBVzs7Y0FDekMsVUFBVSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVU7OztjQUNoQyxXQUFX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b3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzYXZlQXMgfSBmcm9tICdmaWxlLXNhdmVyJztcclxuaW1wb3J0ICogYXMganNQREYgZnJvbSAnanNwZGYnO1xyXG5pbXBvcnQgKiBhcyBfaHRtbDJjYW52YXMgZnJvbSAnaHRtbDJjYW52YXMnO1xyXG5pbXBvcnQgKiBhcyBKU1ppcCBmcm9tICdqc3ppcCc7XHJcblxyXG5pbXBvcnQgeyBTdWJqZWN0U3RhdHVzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgQWN0aXZpdHlTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgZm9ybWF0U2NhbGUgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcC51dGlscyc7XHJcbmltcG9ydCB7IE91dHB1dExheWVyTGVnZW5kIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBnZXRMYXllcnNMZWdlbmRzIH0gZnJvbSAnLi4vLi4vbGF5ZXIvdXRpbHMvb3V0cHV0TGVnZW5kJztcclxuXHJcbmltcG9ydCB7IFByaW50T3B0aW9ucyB9IGZyb20gJy4vcHJpbnQuaW50ZXJmYWNlJztcclxuXHJcbmNvbnN0IGh0bWwyY2FudmFzID0gX2h0bWwyY2FudmFzO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJpbnRTZXJ2aWNlIHtcclxuICB6aXBGaWxlOiBKU1ppcDtcclxuICBuYkZpbGVUb1Byb2Nlc3M6IG51bWJlcjtcclxuICBhY3Rpdml0eUlkOiBzdHJpbmc7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgYWN0aXZpdHlTZXJ2aWNlOiBBY3Rpdml0eVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBwcmludChtYXA6IElnb01hcCwgb3B0aW9uczogUHJpbnRPcHRpb25zKTogU3ViamVjdDxhbnk+IHtcclxuICAgIGNvbnN0IHN0YXR1cyQgPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAgIGNvbnN0IHBhcGVyRm9ybWF0OiBzdHJpbmcgPSBvcHRpb25zLnBhcGVyRm9ybWF0O1xyXG4gICAgY29uc3QgcmVzb2x1dGlvbiA9ICtvcHRpb25zLnJlc29sdXRpb247IC8vIERlZmF1bHQgaXMgOTZcclxuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gb3B0aW9ucy5vcmllbnRhdGlvbjtcclxuXHJcbiAgICB0aGlzLmFjdGl2aXR5SWQgPSB0aGlzLmFjdGl2aXR5U2VydmljZS5yZWdpc3RlcigpO1xyXG4gICAgY29uc3QgZG9jID0gbmV3IGpzUERGKHtcclxuICAgICAgb3JpZW50YXRpb24sXHJcbiAgICAgIGZvcm1hdDogcGFwZXJGb3JtYXQudG9Mb3dlckNhc2UoKVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgZGltZW5zaW9ucyA9IFtcclxuICAgICAgZG9jLmludGVybmFsLnBhZ2VTaXplLndpZHRoLFxyXG4gICAgICBkb2MuaW50ZXJuYWwucGFnZVNpemUuaGVpZ2h0XHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IG1hcmdpbnMgPSBbMjAsIDEwLCAyMCwgMTBdO1xyXG4gICAgY29uc3Qgd2lkdGggPSBkaW1lbnNpb25zWzBdIC0gbWFyZ2luc1szXSAtIG1hcmdpbnNbMV07XHJcbiAgICBjb25zdCBoZWlnaHQgPSBkaW1lbnNpb25zWzFdIC0gbWFyZ2luc1swXSAtIG1hcmdpbnNbMl07XHJcbiAgICBjb25zdCBzaXplID0gW3dpZHRoLCBoZWlnaHRdO1xyXG5cclxuICAgIGlmIChvcHRpb25zLnRpdGxlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5hZGRUaXRsZShkb2MsIG9wdGlvbnMudGl0bGUsIGRpbWVuc2lvbnNbMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLnNob3dQcm9qZWN0aW9uID09PSB0cnVlIHx8IG9wdGlvbnMuc2hvd1NjYWxlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuYWRkUHJvalNjYWxlKFxyXG4gICAgICAgIGRvYyxcclxuICAgICAgICBtYXAsXHJcbiAgICAgICAgcmVzb2x1dGlvbixcclxuICAgICAgICBvcHRpb25zLnNob3dQcm9qZWN0aW9uLFxyXG4gICAgICAgIG9wdGlvbnMuc2hvd1NjYWxlXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucy5jb21tZW50ICE9PSAnJykge1xyXG4gICAgICB0aGlzLmFkZENvbW1lbnQoZG9jLCBvcHRpb25zLmNvbW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkTWFwKGRvYywgbWFwLCByZXNvbHV0aW9uLCBzaXplLCBtYXJnaW5zKS5zdWJzY3JpYmUoXHJcbiAgICAgIChzdGF0dXM6IFN1YmplY3RTdGF0dXMpID0+IHtcclxuICAgICAgICBpZiAoc3RhdHVzID09PSBTdWJqZWN0U3RhdHVzLkRvbmUpIHtcclxuICAgICAgICAgIGlmIChvcHRpb25zLnNob3dMZWdlbmQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRMZWdlbmQoZG9jLCBtYXAsIG1hcmdpbnMsIHJlc29sdXRpb24pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlRG9jKGRvYyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhdHVzID09PSBTdWJqZWN0U3RhdHVzLkRvbmUgfHwgc3RhdHVzID09PSBTdWJqZWN0U3RhdHVzLkVycm9yKSB7XHJcbiAgICAgICAgICB0aGlzLmFjdGl2aXR5U2VydmljZS51bnJlZ2lzdGVyKHRoaXMuYWN0aXZpdHlJZCk7XHJcbiAgICAgICAgICBzdGF0dXMkLm5leHQoU3ViamVjdFN0YXR1cy5Eb25lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHN0YXR1cyQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgaHRtbCBjb2RlIGZvciBhbGwgbGF5ZXJzIGxlZ2VuZFxyXG4gICAqIEBwYXJhbSAgbWFwIElnb01hcFxyXG4gICAqIEBwYXJhbSAgd2lkdGggVGhlIHdpZHRoIHRoYXQgdGhlIGxlZ2VuZCBuZWVkIHRvIGJlXHJcbiAgICogQHJldHVybiBIdG1sIGNvZGUgZm9yIHRoZSBsZWdlbmRcclxuICAgKi9cclxuICBnZXRMYXllcnNMZWdlbmRIdG1sKG1hcDogSWdvTWFwLCB3aWR0aDogbnVtYmVyLCByZXNvbHV0aW9uOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgbGV0IGh0bWwgPSAnJztcclxuICAgIGNvbnN0IGxlZ2VuZHMgPSBnZXRMYXllcnNMZWdlbmRzKFxyXG4gICAgICBtYXAubGF5ZXJzLFxyXG4gICAgICBtYXAudmlld0NvbnRyb2xsZXIuZ2V0U2NhbGUocmVzb2x1dGlvbilcclxuICAgICk7XHJcbiAgICBpZiAobGVnZW5kcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGVmaW5lIGltcG9ydGFudCBzdHlsZSB0byBiZSBzdXJlIHRoYXQgYWxsIGNvbnRhaW5lciBpcyBjb252ZXJ0XHJcbiAgICAvLyB0byBpbWFnZSBub3QganVzdCB2aXNpYmxlIHBhcnRcclxuICAgIGh0bWwgKz0gJzxzdHlsZSBtZWRpYT1cInNjcmVlblwiIHR5cGU9XCJ0ZXh0L2Nzc1wiPic7XHJcbiAgICBodG1sICs9ICcuaHRtbDJjYW52YXMtY29udGFpbmVyIHsgd2lkdGg6ICcgKyB3aWR0aDtcclxuICAgIGh0bWwgKz0gJ21tICFpbXBvcnRhbnQ7IGhlaWdodDogMjAwMHB4ICFpbXBvcnRhbnQ7IH0nO1xyXG4gICAgaHRtbCArPSAnPC9zdHlsZT4nO1xyXG4gICAgaHRtbCArPSAnPGZvbnQgc2l6ZT1cIjJcIiBmYWNlPVwiQ291cmllciBOZXdcIiA+JztcclxuICAgIGh0bWwgKz0gJzxkaXYgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazttYXgtd2lkdGg6JyArIHdpZHRoICsgJ21tXCI+JztcclxuICAgIC8vIEZvciBlYWNoIGxlZ2VuZCwgZGVmaW5lIGFuIGh0bWwgdGFibGUgY2VsbFxyXG4gICAgbGVnZW5kcy5mb3JFYWNoKChsZWdlbmQ6IE91dHB1dExheWVyTGVnZW5kKSA9PiB7XHJcbiAgICAgIGh0bWwgKz1cclxuICAgICAgICAnPHRhYmxlIGJvcmRlcj0xIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246dG9wXCI+JztcclxuICAgICAgaHRtbCArPSAnPHRyPjx0aCB3aWR0aD1cIjE3MHB4XCI+JyArIGxlZ2VuZC50aXRsZSArICc8L3RoPic7XHJcbiAgICAgIGh0bWwgKz0gJzx0ZD48aW1nIGNsYXNzPVwicHJpbnRJbWFnZUxlZ2VuZFwiIHNyYz1cIicgKyBsZWdlbmQudXJsICsgJ1wiPic7XHJcbiAgICAgIGh0bWwgKz0gJzwvdGQ+PC90cj48L3RhYmxlPic7XHJcbiAgICB9KTtcclxuICAgIGh0bWwgKz0gJzwvZGl2Pic7XHJcblxyXG4gICAgcmV0dXJuIGh0bWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYWxsIHRoZSBsZWdlbmQgaW4gYSBzaW5nbGUgaW1hZ2VcclxuICAgKiAqIEBwYXJhbSAgZm9ybWF0IC0gSW1hZ2UgZm9ybWF0LiBkZWZhdWx0IHZhbHVlIHRvIFwicG5nXCJcclxuICAgKiBAcmV0dXJuIFRoZSBpbWFnZSBvZiB0aGUgbGVnZW5kXHJcbiAgICovXHJcbiAgZ2V0TGF5ZXJzTGVnZW5kSW1hZ2UoXHJcbiAgICBtYXAsXHJcbiAgICBmb3JtYXQ6IHN0cmluZyA9ICdwbmcnLFxyXG4gICAgZG9aaXBGaWxlOiBib29sZWFuLFxyXG4gICAgcmVzb2x1dGlvbjogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICBjb25zdCBzdGF0dXMkID0gbmV3IFN1YmplY3QoKTtcclxuICAgIC8vIEdldCBodG1sIGNvZGUgZm9yIHRoZSBsZWdlbmRcclxuICAgIGNvbnN0IHdpZHRoID0gMjAwOyAvLyBtaWxpbWV0ZXJzIHVuaXQsIG9yaWdpbmFsbHkgZGVmaW5lIGZvciBkb2N1bWVudCBwZGZcclxuICAgIGxldCBodG1sID0gdGhpcy5nZXRMYXllcnNMZWdlbmRIdG1sKG1hcCwgd2lkdGgsIHJlc29sdXRpb24pO1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICBmb3JtYXQgPSBmb3JtYXQudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAvLyBJZiBubyBsZWdlbmQgc2hvdyBObyBMRUdFTkQgaW4gYW4gaW1hZ2VcclxuICAgIGlmIChodG1sLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBodG1sID0gJzxmb250IHNpemU9XCIxMlwiIGZhY2U9XCJDb3VyaWVyIE5ld1wiID4nO1xyXG4gICAgICBodG1sICs9ICc8ZGl2IGFsaWduPVwiY2VudGVyXCI+PGI+Tk8gTEVHRU5EPC9iPjwvZGl2Pic7XHJcbiAgICB9XHJcbiAgICAvLyBDcmVhdGUgZGl2IHRvIGNvbnRhaW4gaHRtbCBjb2RlIGZvciBsZWdlbmRcclxuICAgIGNvbnN0IGRpdiA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAvLyBBZGQgaHRtbCBjb2RlIHRvIGNvbnZlcnQgaW4gdGhlIG5ldyB3aW5kb3dcclxuICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIC8vIERlZmluZSBldmVudCB0byBleGVjdXRlIGFmdGVyIGFsbCBpbWFnZXMgYXJlIGxvYWRlZCB0byBjcmVhdGUgdGhlIGNhbnZhc1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGh0bWwyY2FudmFzKGRpdiwgeyB1c2VDT1JTOiB0cnVlIH0pXHJcbiAgICAgICAgLnRoZW4oY2FudmFzID0+IHtcclxuICAgICAgICAgIGxldCBzdGF0dXMgPSBTdWJqZWN0U3RhdHVzLkRvbmU7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoIWRvWmlwRmlsZSkge1xyXG4gICAgICAgICAgICAgIC8vIFNhdmUgdGhlIGNhbnZhcyBhcyBmaWxlXHJcbiAgICAgICAgICAgICAgdGhhdC5zYXZlQ2FudmFzSW1hZ2VBc0ZpbGUoY2FudmFzLCAnbGVnZW5kSW1hZ2UnLCBmb3JtYXQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIEFkZCB0aGUgY2FudmFzIHRvIHppcFxyXG4gICAgICAgICAgICAgIHRoYXQuZ2VuZXJhdGVDYW52YUZpbGVUb1ppcChjYW52YXMsICdsZWdlbmRJbWFnZScgKyAnLicgKyBmb3JtYXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRpdi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRpdik7IC8vIHJlbW92ZSB0ZW1wIGRpdiAoSUUpXHJcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgc3RhdHVzID0gU3ViamVjdFN0YXR1cy5FcnJvcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHN0YXR1cyQubmV4dChzdGF0dXMpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LCA1MDApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRUaXRsZShkb2M6IGpzUERGLCB0aXRsZTogc3RyaW5nLCBwYWdlV2lkdGg6IG51bWJlcikge1xyXG4gICAgY29uc3QgcGRmUmVzb2x1dGlvbiA9IDk2O1xyXG4gICAgY29uc3QgdGl0bGVTaXplID0gMzI7XHJcbiAgICBjb25zdCB0aXRsZVdpZHRoID0gKCh0aXRsZVNpemUgKiAyNS40KSAvIHBkZlJlc29sdXRpb24pICogdGl0bGUubGVuZ3RoO1xyXG5cclxuICAgIGxldCB0aXRsZU1hcmdpbkxlZnQ7XHJcbiAgICBpZiAodGl0bGVXaWR0aCA+IHBhZ2VXaWR0aCkge1xyXG4gICAgICB0aXRsZU1hcmdpbkxlZnQgPSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGl0bGVNYXJnaW5MZWZ0ID0gKHBhZ2VXaWR0aCAtIHRpdGxlV2lkdGgpIC8gMjtcclxuICAgIH1cclxuXHJcbiAgICBkb2Muc2V0Rm9udCgnY291cmllcicpO1xyXG4gICAgZG9jLnNldEZvbnRTaXplKDMyKTtcclxuICAgIGRvYy50ZXh0KHRpdGxlLCB0aXRsZU1hcmdpbkxlZnQsIDE1KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBjb21tZW50IHRvIHRoZSBkb2N1bWVudFxyXG4gICAqICogQHBhcmFtICBkb2MgLSBwZGYgZG9jdW1lbnRcclxuICAgKiAqIEBwYXJhbSAgY29tbWVudCAtIENvbW1lbnQgdG8gYWRkIGluIHRoZSBkb2N1bWVudFxyXG4gICAqICogQHBhcmFtICBzaXplIC0gU2l6ZSBvZiB0aGUgZG9jdW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIGFkZENvbW1lbnQoZG9jOiBqc1BERiwgY29tbWVudDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBjb21tZW50U2l6ZSA9IDE2O1xyXG4gICAgY29uc3QgY29tbWVudE1hcmdpbkxlZnQgPSAyMDtcclxuICAgIGNvbnN0IG1hcmdpbkJvdHRvbSA9IDU7XHJcbiAgICBjb25zdCBoZWlnaHRQaXhlbHMgPSBkb2MuaW50ZXJuYWwucGFnZVNpemUuaGVpZ2h0IC0gbWFyZ2luQm90dG9tO1xyXG5cclxuICAgIGRvYy5zZXRGb250KCdjb3VyaWVyJyk7XHJcbiAgICBkb2Muc2V0Rm9udFNpemUoY29tbWVudFNpemUpO1xyXG4gICAgZG9jLnRleHQoY29tbWVudCwgY29tbWVudE1hcmdpbkxlZnQsIGhlaWdodFBpeGVscyk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEFkZCBwcm9qZWN0aW9uIGFuZC9vciBzY2FsZSB0byB0aGUgZG9jdW1lbnRcclxuICAgKiBAcGFyYW0gIGRvYyAtIHBkZiBkb2N1bWVudFxyXG4gICAqIEBwYXJhbSAgbWFwIC0gTWFwIG9mIHRoZSBhcHBcclxuICAgKiBAcGFyYW0gIGRwaSAtIERQSSByZXNvbHV0aW9uIG9mIHRoZSBkb2N1bWVudFxyXG4gICAqIEBwYXJhbSAgcHJvamVjdGlvbiAtIEJvb2wgdG8gaW5kaWNhdGUgaWYgcHJvamVjdGlvbiBuZWVkIHRvIGJlIGFkZGVkXHJcbiAgICogQHBhcmFtICBzY2FsZSAtIEJvb2wgdG8gaW5kaWNhdGUgaWYgc2NhbGUgbmVlZCB0byBiZSBhZGRlZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkUHJvalNjYWxlKFxyXG4gICAgZG9jOiBqc1BERixcclxuICAgIG1hcDogSWdvTWFwLFxyXG4gICAgZHBpOiBudW1iZXIsXHJcbiAgICBwcm9qZWN0aW9uOiBib29sZWFuLFxyXG4gICAgc2NhbGU6IGJvb2xlYW5cclxuICApIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgIGNvbnN0IHByb2pTY2FsZVNpemUgPSAxNjtcclxuICAgIGNvbnN0IHByb2pTY2FsZU1hcmdpbkxlZnQgPSAyMDtcclxuICAgIGNvbnN0IG1hcmdpbkJvdHRvbSA9IDE1O1xyXG4gICAgY29uc3QgaGVpZ2h0UGl4ZWxzID0gZG9jLmludGVybmFsLnBhZ2VTaXplLmhlaWdodCAtIG1hcmdpbkJvdHRvbTtcclxuXHJcbiAgICBsZXQgdGV4dFByb2pTY2FsZTogc3RyaW5nID0gJyc7XHJcbiAgICBpZiAocHJvamVjdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICBjb25zdCBwcm9qVGV4dCA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnByaW50Rm9ybS5wcm9qZWN0aW9uJyk7XHJcbiAgICAgIHRleHRQcm9qU2NhbGUgKz0gcHJvalRleHQgKyAnOiAnICsgbWFwLnByb2plY3Rpb247XHJcbiAgICB9XHJcbiAgICBpZiAoc2NhbGUgPT09IHRydWUpIHtcclxuICAgICAgaWYgKHByb2plY3Rpb24gPT09IHRydWUpIHtcclxuICAgICAgICB0ZXh0UHJvalNjYWxlICs9ICcgICAnO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHNjYWxlVGV4dCA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnByaW50Rm9ybS5zY2FsZScpO1xyXG4gICAgICBjb25zdCBtYXBTY2FsZSA9IG1hcC52aWV3Q29udHJvbGxlci5nZXRTY2FsZShkcGkpO1xyXG4gICAgICB0ZXh0UHJvalNjYWxlICs9IHNjYWxlVGV4dCArICc6IH4gMSAvICcgKyBmb3JtYXRTY2FsZShtYXBTY2FsZSk7XHJcbiAgICB9XHJcbiAgICBkb2Muc2V0Rm9udCgnY291cmllcicpO1xyXG4gICAgZG9jLnNldEZvbnRTaXplKHByb2pTY2FsZVNpemUpO1xyXG4gICAgZG9jLnRleHQodGV4dFByb2pTY2FsZSwgcHJvalNjYWxlTWFyZ2luTGVmdCwgaGVpZ2h0UGl4ZWxzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgbGVnZW5kIHRvIHRoZSBkb2N1bWVudFxyXG4gICAqIEBwYXJhbSAgZG9jIC0gUGRmIGRvY3VtZW50IHdoZXJlIGxlZ2VuZCB3aWxsIGJlIGFkZGVkXHJcbiAgICogQHBhcmFtICBtYXAgLSBNYXAgb2YgdGhlIGFwcFxyXG4gICAqIEBwYXJhbSAgbWFyZ2lucyAtIFBhZ2UgbWFyZ2luc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkTGVnZW5kKFxyXG4gICAgZG9jOiBqc1BERixcclxuICAgIG1hcDogSWdvTWFwLFxyXG4gICAgbWFyZ2luczogQXJyYXk8bnVtYmVyPixcclxuICAgIHJlc29sdXRpb246IG51bWJlclxyXG4gICkge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAvLyBHZXQgaHRtbCBjb2RlIGZvciB0aGUgbGVnZW5kXHJcbiAgICBjb25zdCB3aWR0aCA9IGRvYy5pbnRlcm5hbC5wYWdlU2l6ZS53aWR0aDtcclxuICAgIGNvbnN0IGh0bWwgPSB0aGlzLmdldExheWVyc0xlZ2VuZEh0bWwobWFwLCB3aWR0aCwgcmVzb2x1dGlvbik7XHJcbiAgICAvLyBJZiBubyBsZWdlbmQsIHNhdmUgdGhlIG1hcCBkaXJlY3RseVxyXG4gICAgaWYgKGh0bWwgPT09ICcnKSB7XHJcbiAgICAgIHRoaXMuc2F2ZURvYyhkb2MpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhdGUgZGl2IHRvIGNvbnRhaW4gaHRtbCBjb2RlIGZvciBsZWdlbmRcclxuICAgIGNvbnN0IGRpdiA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGh0bWwyY2FudmFzKGRpdiwgeyB1c2VDT1JTOiB0cnVlIH0pXHJcbiAgICAgIC50aGVuKGNhbnZhcyA9PiB7XHJcbiAgICAgICAgbGV0IGltZ0RhdGE7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSAxMDtcclxuXHJcbiAgICAgICAgaW1nRGF0YSA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xyXG4gICAgICAgIGRvYy5hZGRQYWdlKCk7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VTaXplID0gdGhpcy5nZXRJbWFnZVNpemVUb0ZpdFBkZihkb2MsIGNhbnZhcywgbWFyZ2lucyk7XHJcbiAgICAgICAgZG9jLmFkZEltYWdlKGltZ0RhdGEsICdQTkcnLCAxMCwgcG9zaXRpb24sIGltYWdlU2l6ZVswXSwgaW1hZ2VTaXplWzFdKTtcclxuICAgICAgICB0aGF0LnNhdmVEb2MoZG9jKTtcclxuICAgICAgICBkaXYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkaXYpOyAvLyByZW1vdmUgdGVtcCBkaXYgKElFIHN0eWxlKVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIC8vIEFkZCBodG1sIGNvZGUgdG8gY29udmVydCBpbiB0aGUgbmV3IHdpbmRvd1xyXG4gICAgd2luZG93LmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRDYW52YXMoXHJcbiAgICBkb2M6IGpzUERGLFxyXG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcclxuICAgIG1hcmdpbnM6IEFycmF5PG51bWJlcj5cclxuICApIHtcclxuICAgIGxldCBpbWFnZTtcclxuXHJcbiAgICBpbWFnZSA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnKTtcclxuXHJcbiAgICBpZiAoaW1hZ2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCBpbWFnZVNpemUgPSB0aGlzLmdldEltYWdlU2l6ZVRvRml0UGRmKGRvYywgY2FudmFzLCBtYXJnaW5zKTtcclxuICAgICAgZG9jLmFkZEltYWdlKFxyXG4gICAgICAgIGltYWdlLFxyXG4gICAgICAgICdKUEVHJyxcclxuICAgICAgICBtYXJnaW5zWzNdLFxyXG4gICAgICAgIG1hcmdpbnNbMF0sXHJcbiAgICAgICAgaW1hZ2VTaXplWzBdLFxyXG4gICAgICAgIGltYWdlU2l6ZVsxXVxyXG4gICAgICApO1xyXG4gICAgICBkb2MucmVjdChtYXJnaW5zWzNdLCBtYXJnaW5zWzBdLCBpbWFnZVNpemVbMF0sIGltYWdlU2l6ZVsxXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPIGZpeCBwcmludGluZyB3aXRoIGltYWdlIHJlc29sdXRpb25cclxuICBwcml2YXRlIGFkZE1hcChcclxuICAgIGRvYzoganNQREYsXHJcbiAgICBtYXA6IElnb01hcCxcclxuICAgIHJlc29sdXRpb246IG51bWJlcixcclxuICAgIHNpemU6IEFycmF5PG51bWJlcj4sXHJcbiAgICBtYXJnaW5zOiBBcnJheTxudW1iZXI+XHJcbiAgKSB7XHJcbiAgICBjb25zdCBzdGF0dXMkID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgICBjb25zdCBtYXBTaXplID0gbWFwLm9sLmdldFNpemUoKTtcclxuICAgIGNvbnN0IGV4dGVudCA9IG1hcC5vbC5nZXRWaWV3KCkuY2FsY3VsYXRlRXh0ZW50KG1hcFNpemUpO1xyXG5cclxuICAgIGNvbnN0IHdpZHRoUGl4ZWxzID0gTWF0aC5yb3VuZCgoc2l6ZVswXSAqIHJlc29sdXRpb24pIC8gMjUuNCk7XHJcbiAgICBjb25zdCBoZWlnaHRQaXhlbHMgPSBNYXRoLnJvdW5kKChzaXplWzFdICogcmVzb2x1dGlvbikgLyAyNS40KTtcclxuXHJcbiAgICBsZXQgdGltZW91dDtcclxuXHJcbiAgICBtYXAub2wub25jZSgncG9zdGNvbXBvc2UnLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBjYW52YXMgPSBldmVudC5jb250ZXh0LmNhbnZhcztcclxuICAgICAgY29uc3QgbWFwU3RhdHVzJCQgPSBtYXAuc3RhdHVzJC5zdWJzY3JpYmUoKG1hcFN0YXR1czogU3ViamVjdFN0YXR1cykgPT4ge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuXHJcbiAgICAgICAgaWYgKG1hcFN0YXR1cyAhPT0gU3ViamVjdFN0YXR1cy5Eb25lKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtYXBTdGF0dXMkJC51bnN1YnNjcmliZSgpO1xyXG5cclxuICAgICAgICBsZXQgc3RhdHVzID0gU3ViamVjdFN0YXR1cy5Eb25lO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB0aGlzLmFkZENhbnZhcyhkb2MsIGNhbnZhcywgbWFyZ2lucyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBzdGF0dXMgPSBTdWJqZWN0U3RhdHVzLkVycm9yO1xyXG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5lcnJvcihcclxuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgJ2lnby5nZW8ucHJpbnRGb3JtLmNvcnNFcnJvck1lc3NhZ2VCb2R5J1xyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAnaWdvLmdlby5wcmludEZvcm0uY29yc0Vycm9yTWVzc2FnZUhlYWRlcidcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgJ3ByaW50J1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyTWFwKG1hcCwgbWFwU2l6ZSwgZXh0ZW50KTtcclxuICAgICAgICBzdGF0dXMkLm5leHQoc3RhdHVzKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBJZiBubyBsb2FkaW5nIGFzIHN0YXJ0ZWQgYWZ0ZXIgMjAwbXMsIHRoZW4gcHJvYmFibHkgbm8gbG9hZGluZ1xyXG4gICAgICAvLyBpcyByZXF1aXJlZC5cclxuICAgICAgdGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBtYXBTdGF0dXMkJC51bnN1YnNjcmliZSgpO1xyXG5cclxuICAgICAgICBsZXQgc3RhdHVzID0gU3ViamVjdFN0YXR1cy5Eb25lO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB0aGlzLmFkZENhbnZhcyhkb2MsIGNhbnZhcywgbWFyZ2lucyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBzdGF0dXMgPSBTdWJqZWN0U3RhdHVzLkVycm9yO1xyXG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5lcnJvcihcclxuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgJ2lnby5nZW8ucHJpbnRGb3JtLmNvcnNFcnJvck1lc3NhZ2VCb2R5J1xyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAnaWdvLmdlby5wcmludEZvcm0uY29yc0Vycm9yTWVzc2FnZUhlYWRlcidcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgJ3ByaW50J1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyTWFwKG1hcCwgbWFwU2l6ZSwgZXh0ZW50KTtcclxuICAgICAgICBzdGF0dXMkLm5leHQoc3RhdHVzKTtcclxuICAgICAgfSwgMjAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucmVuZGVyTWFwKG1hcCwgW3dpZHRoUGl4ZWxzLCBoZWlnaHRQaXhlbHNdLCBleHRlbnQpO1xyXG5cclxuICAgIHJldHVybiBzdGF0dXMkO1xyXG4gIH1cclxuXHJcbiAgZGVmaW5lTmJGaWxlVG9Qcm9jZXNzKG5iRmlsZVRvUHJvY2Vzcykge1xyXG4gICAgdGhpcy5uYkZpbGVUb1Byb2Nlc3MgPSBuYkZpbGVUb1Byb2Nlc3M7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEb3dubG9hZCBhbiBpbWFnZSBvZiB0aGUgbWFwIHdpdGggYWRkaXRpb24gb2YgaW5mb3JtYXRpb25zXHJcbiAgICogQHBhcmFtICBtYXAgLSBNYXAgb2YgdGhlIGFwcFxyXG4gICAqIEBwYXJhbSAgZm9ybWF0IC0gSW1hZ2UgZm9ybWF0LiBkZWZhdWx0IHZhbHVlIHRvIFwicG5nXCJcclxuICAgKiBAcGFyYW0gIHByb2plY3Rpb24gLSBJbmRpY2F0ZSBpZiBwcm9qZWN0aW9uIG5lZWQgdG8gYmUgYWRkLiBEZWZhdWx0IHRvIGZhbHNlXHJcbiAgICogQHBhcmFtICBzY2FsZSAtIEluZGljYXRlIGlmIHNjYWxlIG5lZWQgdG8gYmUgYWRkLiBEZWZhdWx0IHRvIGZhbHNlXHJcbiAgICogQHBhcmFtICBsZWdlbmQgLSBJbmRpY2F0ZSBpZiB0aGUgbGVnZW5kIG9mIGxheWVycyBuZWVkIHRvIGJlIGRvd25sb2FkLiBEZWZhdWx0IHRvIGZhbHNlXHJcbiAgICogQHBhcmFtICB0aXRsZSAtIFRpdGxlIHRvIGFkZCBmb3IgdGhlIG1hcCAtIERlZmF1bHQgdG8gYmxhbmtcclxuICAgKiBAcGFyYW0gIGNvbW1lbnQgLSBDb21tZW50IHRvIGFkZCBmb3IgdGhlIG1hcCAtIERlZmF1bHQgdG8gYmxhbmtcclxuICAgKiBAcGFyYW0gIGRvWmlwRmlsZSAtIEluZGljYXRlIGlmIHdlIGRvIGEgemlwIHdpdGggdGhlIGZpbGVcclxuICAgKiBAcmV0dXJuIEltYWdlIGZpbGUgb2YgdGhlIG1hcCB3aXRoIGV4dGVuc2lvbiBmb3JtYXQgZ2l2ZW4gYXMgcGFyYW1ldGVyXHJcbiAgICovXHJcbiAgZG93bmxvYWRNYXBJbWFnZShcclxuICAgIG1hcDogSWdvTWFwLFxyXG4gICAgcmVzb2x1dGlvbjogbnVtYmVyLFxyXG4gICAgZm9ybWF0ID0gJ3BuZycsXHJcbiAgICBwcm9qZWN0aW9uID0gZmFsc2UsXHJcbiAgICBzY2FsZSA9IGZhbHNlLFxyXG4gICAgbGVnZW5kID0gZmFsc2UsXHJcbiAgICB0aXRsZSA9ICcnLFxyXG4gICAgY29tbWVudCA9ICcnLFxyXG4gICAgZG9aaXBGaWxlID0gdHJ1ZVxyXG4gICkge1xyXG4gICAgY29uc3Qgc3RhdHVzJCA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICAvLyBjb25zdCByZXNvbHV0aW9uID0gbWFwLm9sLmdldFZpZXcoKS5nZXRSZXNvbHV0aW9uKCk7XHJcbiAgICB0aGlzLmFjdGl2aXR5SWQgPSB0aGlzLmFjdGl2aXR5U2VydmljZS5yZWdpc3RlcigpO1xyXG4gICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgbWFwLm9sLm9uY2UoJ3Bvc3Rjb21wb3NlJywgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgZm9ybWF0ID0gZm9ybWF0LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBldmVudC5jb250ZXh0O1xyXG4gICAgICBjb25zdCBuZXdDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgY29uc3QgbmV3Q29udGV4dCA9IG5ld0NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAvLyBQb3N0aW9uIGluIGhlaWdodCB0byBzZXQgdGhlIGNhbnZhcyBpbiBuZXcgY2FudmFzXHJcbiAgICAgIGxldCBwb3NpdGlvbkhDYW52YXMgPSAwO1xyXG4gICAgICAvLyBQb3NpdGlvbiBpbiB3aWR0aCB0byBzZXQgdGhlIFByb2ovU2NhbGUgaW4gbmV3IGNhbnZhc1xyXG4gICAgICBsZXQgcG9zaXRpb25XUHJvalNjYWxlID0gMTA7XHJcbiAgICAgIC8vIEdldCBoZWlnaHQvd2lkdGggb2YgbWFwIGNhbnZhc1xyXG4gICAgICBjb25zdCB3aWR0aCA9IGNvbnRleHQuY2FudmFzLndpZHRoO1xyXG4gICAgICBsZXQgaGVpZ2h0ID0gY29udGV4dC5jYW52YXMuaGVpZ2h0O1xyXG4gICAgICAvLyBTZXQgRm9udCB0byBjYWxjdWxhdGUgY29tbWVudCB3aWR0aFxyXG4gICAgICBuZXdDb250ZXh0LmZvbnQgPSAnMjBweCBDYWxpYnJpJztcclxuICAgICAgY29uc3QgY29tbWVudFdpZHRoID0gbmV3Q29udGV4dC5tZWFzdXJlVGV4dChjb21tZW50KS53aWR0aDtcclxuICAgICAgLy8gQWRkIGhlaWdodCBmb3IgdGl0bGUgaWYgZGVmaW5lZFxyXG4gICAgICBoZWlnaHQgPSB0aXRsZSAhPT0gJycgPyBoZWlnaHQgKyAzMCA6IGhlaWdodDtcclxuICAgICAgLy8gQWRkIGhlaWdodCBmb3IgcHJvamVjdGlvbiBvciBzY2FsZSAoc2FtZSBsaW5lKSBpZiBkZWZpbmVkXHJcbiAgICAgIGhlaWdodCA9IHByb2plY3Rpb24gIT09IGZhbHNlIHx8IHNjYWxlICE9PSBmYWxzZSA/IGhlaWdodCArIDMwIDogaGVpZ2h0O1xyXG4gICAgICBjb25zdCBwb3NpdGlvbkhQcm9qU2NhbGUgPSBoZWlnaHQgLSAxMDtcclxuICAgICAgLy8gRGVmaW5lIG51bWJlciBvZiBsaW5lIGRlcGVuZGluZyBvZiB0aGUgY29tbWVudCBsZW5ndGhcclxuICAgICAgY29uc3QgY29tbWVudE5iTGluZSA9IE1hdGguY2VpbChjb21tZW50V2lkdGggLyB3aWR0aCk7XHJcbiAgICAgIC8vIEFkZCBoZWlnaHQgZm9yIG11bHRpbGluZSBjb21tZW50IGlmIGRlZmluZWRcclxuICAgICAgaGVpZ2h0ID0gY29tbWVudCAhPT0gJycgPyBoZWlnaHQgKyBjb21tZW50TmJMaW5lICogMzAgOiBoZWlnaHQ7XHJcbiAgICAgIGxldCBwb3NpdGlvbkhDb21tZW50ID0gaGVpZ2h0IC0gY29tbWVudE5iTGluZSAqIDIwICsgNTtcclxuICAgICAgLy8gU2V0IHRoZSBuZXcgY2FudmFzIHdpdGggdGhlIG5ldyBjYWxjdWxhdGVkIHNpemVcclxuICAgICAgbmV3Q2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgIG5ld0NhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgIC8vIFBhdGNoIEpwZWcgZGVmYXVsdCBibGFjayBiYWNrZ3JvdW5kIHRvIHdoaXRlXHJcbiAgICAgIGlmIChmb3JtYXQgPT09ICdqcGVnJykge1xyXG4gICAgICAgIG5ld0NvbnRleHQuZmlsbFN0eWxlID0gJyNmZmZmZmYnO1xyXG4gICAgICAgIG5ld0NvbnRleHQuZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgbmV3Q29udGV4dC5maWxsU3R5bGUgPSAnIzAwMDAwMCc7XHJcbiAgICAgIH1cclxuICAgICAgLy8gSWYgYSB0aXRsZSBuZWVkIHRvIGJlIGFkZGVkIHRvIGNhbnZhc1xyXG4gICAgICBpZiAodGl0bGUgIT09ICcnKSB7XHJcbiAgICAgICAgLy8gU2V0IGZvbnQgZm9yIHRpdGxlXHJcbiAgICAgICAgbmV3Q29udGV4dC5mb250ID0gJzI2cHggQ2FsaWJyaSc7XHJcbiAgICAgICAgcG9zaXRpb25IQ2FudmFzID0gMzA7XHJcbiAgICAgICAgbmV3Q29udGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcclxuICAgICAgICBuZXdDb250ZXh0LmZpbGxUZXh0KHRpdGxlLCB3aWR0aCAvIDIsIDIwKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBTZXQgZm9udCBmb3IgbmV4dCBzZWN0aW9uXHJcbiAgICAgIG5ld0NvbnRleHQuZm9udCA9ICcyMHB4IENhbGlicmknO1xyXG4gICAgICAvLyBJZiBwcm9qZWN0aW9uIG5lZWQgdG8gYmUgYWRkZWQgdG8gY2FudmFzXHJcbiAgICAgIGlmIChwcm9qZWN0aW9uICE9PSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnN0IHByb2pUZXh0ID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8ucHJpbnRGb3JtLnByb2plY3Rpb24nKTtcclxuICAgICAgICBuZXdDb250ZXh0LnRleHRBbGlnbiA9ICdzdGFydCc7XHJcbiAgICAgICAgbmV3Q29udGV4dC5maWxsVGV4dChcclxuICAgICAgICAgIHByb2pUZXh0ICsgJzogJyArIG1hcC5wcm9qZWN0aW9uLFxyXG4gICAgICAgICAgcG9zaXRpb25XUHJvalNjYWxlLFxyXG4gICAgICAgICAgcG9zaXRpb25IUHJvalNjYWxlXHJcbiAgICAgICAgKTtcclxuICAgICAgICBwb3NpdGlvbldQcm9qU2NhbGUgKz0gMjAwOyAvLyBXaWR0aCBwb3NpdGlvbiBjaGFuZ2UgZm9yIHNjYWxlIHBvc2l0aW9uXHJcbiAgICAgIH1cclxuICAgICAgLy8gSWYgc2NhbGUgbmVlZCB0byBiZSBhZGRlZCB0byBjYW52YXNcclxuICAgICAgaWYgKHNjYWxlICE9PSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnN0IHNjYWxlVGV4dCA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnByaW50Rm9ybS5zY2FsZScpO1xyXG4gICAgICAgIGNvbnN0IG1hcFNjYWxlID0gbWFwLnZpZXdDb250cm9sbGVyLmdldFNjYWxlKHJlc29sdXRpb24pO1xyXG4gICAgICAgIG5ld0NvbnRleHQudGV4dEFsaWduID0gJ3N0YXJ0JztcclxuICAgICAgICBuZXdDb250ZXh0LmZpbGxUZXh0KFxyXG4gICAgICAgICAgc2NhbGVUZXh0ICsgJzogfiAxIC8gJyArIGZvcm1hdFNjYWxlKG1hcFNjYWxlKSxcclxuICAgICAgICAgIHBvc2l0aW9uV1Byb2pTY2FsZSxcclxuICAgICAgICAgIHBvc2l0aW9uSFByb2pTY2FsZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gSWYgYSBjb21tZW50IG5lZWQgdG8gYmUgYWRkZWQgdG8gY2FudmFzXHJcbiAgICAgIGlmIChjb21tZW50ICE9PSAnJykge1xyXG4gICAgICAgIG5ld0NvbnRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XHJcbiAgICAgICAgLy8gSWYgb25seSBvbmUgbGluZSwgbm8gbmVlZCB0byBtdWx0aWxpbmUgdGhlIGNvbW1lbnRcclxuICAgICAgICBpZiAoY29tbWVudE5iTGluZSA9PT0gMSkge1xyXG4gICAgICAgICAgbmV3Q29udGV4dC5maWxsVGV4dChjb21tZW50LCB3aWR0aCAvIDIsIHBvc2l0aW9uSENvbW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBTZXBhcmF0ZSB0aGUgc2V0ZW5zZXMgdG8gYmUgYXBwcm94LiB0aGUgc2FtZSBsZW5ndGhcclxuICAgICAgICAgIGNvbnN0IG5iQ29tbWVudENoYXIgPSBjb21tZW50Lmxlbmd0aDtcclxuICAgICAgICAgIGNvbnN0IENvbW1lbnRMZW5ndGhUb0N1dCA9IE1hdGguZmxvb3IobmJDb21tZW50Q2hhciAvIGNvbW1lbnROYkxpbmUpO1xyXG4gICAgICAgICAgbGV0IGNvbW1lbnRDdXJyZW50TGluZSA9ICcnO1xyXG4gICAgICAgICAgbGV0IHBvc2l0aW9uRmlyc3RDdXRDaGFyID0gMDtcclxuICAgICAgICAgIGxldCBwb3NpdGlvbkxhc3RCbGFuaztcclxuICAgICAgICAgIC8vIExvb3AgZm9yIHRoZSBudW1iZXIgb2YgbGluZSBjYWxjdWxhdGVkXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbW1lbnROYkxpbmU7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBGb3IgYWxsIGxpbmUgZXhjZXB0IGxhc3RcclxuICAgICAgICAgICAgaWYgKGNvbW1lbnROYkxpbmUgLSAxID4gaSkge1xyXG4gICAgICAgICAgICAgIC8vIEdldCBjb21tZW50IGN1cnJlbnQgbGluZSB0byBmaW5kIHRoZSByaWdodCBwbGFjZSB0dSBjdXQgY29tbWVudFxyXG4gICAgICAgICAgICAgIGNvbW1lbnRDdXJyZW50TGluZSA9IGNvbW1lbnQuc3Vic3RyKFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25GaXJzdEN1dENoYXIsXHJcbiAgICAgICAgICAgICAgICBDb21tZW50TGVuZ3RoVG9DdXRcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIC8vIEN1dCB0aGUgc2V0ZW5jZSBhdCBibGFua1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uTGFzdEJsYW5rID0gY29tbWVudEN1cnJlbnRMaW5lLmxhc3RJbmRleE9mKCcgJyk7XHJcbiAgICAgICAgICAgICAgbmV3Q29udGV4dC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgIGNvbW1lbnRDdXJyZW50TGluZS5zdWJzdHIoMCwgcG9zaXRpb25MYXN0QmxhbmspLFxyXG4gICAgICAgICAgICAgICAgd2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25IQ29tbWVudFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb25GaXJzdEN1dENoYXIgKz0gcG9zaXRpb25MYXN0Qmxhbms7XHJcbiAgICAgICAgICAgICAgLy8gR28gdG8gbmV4dCBsaW5lIGZvciBpbnNlcnRpb25cclxuICAgICAgICAgICAgICBwb3NpdGlvbkhDb21tZW50ICs9IDIwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIERvbid0IGN1dCBsYXN0IHBhcnRcclxuICAgICAgICAgICAgICBuZXdDb250ZXh0LmZpbGxUZXh0KFxyXG4gICAgICAgICAgICAgICAgY29tbWVudC5zdWJzdHIocG9zaXRpb25GaXJzdEN1dENoYXIpLFxyXG4gICAgICAgICAgICAgICAgd2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25IQ29tbWVudFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gQWRkIG1hcCB0byBuZXcgY2FudmFzXHJcbiAgICAgIG5ld0NvbnRleHQuZHJhd0ltYWdlKGNvbnRleHQuY2FudmFzLCAwLCBwb3NpdGlvbkhDYW52YXMpO1xyXG5cclxuICAgICAgbGV0IHN0YXR1cyA9IFN1YmplY3RTdGF0dXMuRG9uZTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICAvLyBTYXZlIHRoZSBjYW52YXMgYXMgZmlsZVxyXG4gICAgICAgIGlmICghZG9aaXBGaWxlKSB7XHJcbiAgICAgICAgICB0aGlzLnNhdmVDYW52YXNJbWFnZUFzRmlsZShuZXdDYW52YXMsICdtYXAnLCBmb3JtYXQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0LnRvTG93ZXJDYXNlKCkgPT09ICd0aWZmJykge1xyXG4gICAgICAgICAgLy8gQWRkIHRoZSBjYW52YXMgdG8gemlwXHJcbiAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FudmFGaWxlVG9aaXAoXHJcbiAgICAgICAgICAgIG5ld0NhbnZhcyxcclxuICAgICAgICAgICAgJ21hcCcgKyBtYXAucHJvamVjdGlvbi5yZXBsYWNlKCc6JywgJ18nKSArICcuJyArIGZvcm1hdFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gQWRkIHRoZSBjYW52YXMgdG8gemlwXHJcbiAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FudmFGaWxlVG9aaXAobmV3Q2FudmFzLCAnbWFwJyArICcuJyArIGZvcm1hdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBzdGF0dXMgPSBTdWJqZWN0U3RhdHVzLkVycm9yO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdGF0dXMkLm5leHQoc3RhdHVzKTtcclxuXHJcbiAgICAgIGlmIChmb3JtYXQudG9Mb3dlckNhc2UoKSA9PT0gJ3RpZmYnKSB7XHJcbiAgICAgICAgY29uc3QgdGl3Q29udGVudCA9IHRoaXMuZ2V0V29ybGRGaWxlSW5mb3JtYXRpb24obWFwKTtcclxuICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3Rpd0NvbnRlbnRdLCB7XHJcbiAgICAgICAgICB0eXBlOiAndGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghZG9aaXBGaWxlKSB7XHJcbiAgICAgICAgICAvLyBzYXZlQXMgYXV0b21hdGljbHkgcmVwbGFjZSAnOicgZm9yICdfJ1xyXG4gICAgICAgICAgc2F2ZUFzKGJsb2IsICdtYXAnICsgbWFwLnByb2plY3Rpb24gKyAnLnRmdycpO1xyXG4gICAgICAgICAgdGhpcy5zYXZlRmlsZVByb2Nlc3NpbmcoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gQWRkIHRoZSBjYW52YXMgdG8gemlwXHJcbiAgICAgICAgICB0aGlzLmFkZEZpbGVUb1ppcChcclxuICAgICAgICAgICAgJ21hcCcgKyBtYXAucHJvamVjdGlvbi5yZXBsYWNlKCc6JywgJ18nKSArICcudGZ3JyxcclxuICAgICAgICAgICAgYmxvYlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbWFwLm9sLnJlbmRlclN5bmMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVuZGVyTWFwKG1hcCwgc2l6ZSwgZXh0ZW50KSB7XHJcbiAgICBtYXAub2wucmVuZGVyU3luYygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2F2ZSBkb2N1bWVudFxyXG4gICAqIEBwYXJhbSAgZG9jIC0gRG9jdW1lbnQgdG8gc2F2ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2F2ZURvYyhkb2M6IGpzUERGKSB7XHJcbiAgICBkb2Muc2F2ZSgnbWFwLnBkZicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlIHRoZSBiZXN0IEltYWdlIHNpemUgdG8gZml0IGluIHBkZlxyXG4gICAqIEBwYXJhbSBkb2MgLSBQZGYgRG9jdW1lbnRcclxuICAgKiBAcGFyYW0gY2FudmFzIC0gQ2FudmFzIG9mIGltYWdlXHJcbiAgICogQHBhcmFtIG1hcmdpbnMgLSBQYWdlIG1hcmdpbnNcclxuICAgKi9cclxuICBwcml2YXRlIGdldEltYWdlU2l6ZVRvRml0UGRmKGRvYywgY2FudmFzLCBtYXJnaW5zKSB7XHJcbiAgICAvLyBEZWZpbmUgdmFyaWFibGUgdG8gY2FsY3VsYXRlIGJlc3Qgc2l6ZSB0byBmaXQgaW4gb25lIHBhZ2VcclxuICAgIGNvbnN0IHBhZ2VIZWlnaHQgPVxyXG4gICAgICBkb2MuaW50ZXJuYWwucGFnZVNpemUuZ2V0SGVpZ2h0KCkgLSAobWFyZ2luc1swXSArIG1hcmdpbnNbMl0pO1xyXG4gICAgY29uc3QgcGFnZVdpZHRoID1cclxuICAgICAgZG9jLmludGVybmFsLnBhZ2VTaXplLmdldFdpZHRoKCkgLSAobWFyZ2luc1sxXSArIG1hcmdpbnNbM10pO1xyXG4gICAgY29uc3QgY2FuSGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIGNvbnN0IGNhbldpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgY29uc3QgaGVpZ2h0UmF0aW8gPSBjYW5IZWlnaHQgLyBwYWdlSGVpZ2h0O1xyXG4gICAgY29uc3Qgd2lkdGhSYXRpbyA9IGNhbldpZHRoIC8gcGFnZVdpZHRoO1xyXG4gICAgY29uc3QgbWF4UmF0aW8gPSBoZWlnaHRSYXRpbyA+IHdpZHRoUmF0aW8gPyBoZWlnaHRSYXRpbyA6IHdpZHRoUmF0aW87XHJcbiAgICBjb25zdCBpbWdIZWlnaCA9IG1heFJhdGlvID4gMSA/IGNhbkhlaWdodCAvIG1heFJhdGlvIDogY2FuSGVpZ2h0O1xyXG4gICAgY29uc3QgaW1nV2lkdGggPSBtYXhSYXRpbyA+IDEgPyBjYW5XaWR0aCAvIG1heFJhdGlvIDogY2FuV2lkdGg7XHJcblxyXG4gICAgcmV0dXJuIFtpbWdXaWR0aCwgaW1nSGVpZ2hdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGEgd29ybGQgZmlsZSBpbmZvcm1hdGlvbiBmb3IgdGlmZlxyXG4gICAqIEBwYXJhbSAgbWFwIC0gTWFwIG9mIHRoZSBhcHBcclxuICAgKi9cclxuICBwcml2YXRlIGdldFdvcmxkRmlsZUluZm9ybWF0aW9uKG1hcCkge1xyXG4gICAgY29uc3QgY3VycmVudFJlc29sdXRpb24gPSBtYXAudmlld0NvbnRyb2xsZXIuZ2V0UmVzb2x1dGlvbigpO1xyXG4gICAgY29uc3QgY3VycmVudEV4dGVudCA9IG1hcC52aWV3Q29udHJvbGxlci5nZXRFeHRlbnQoKTsgLy8gUmV0dXJuIFttaW54LCBtaW55LCBtYXh4LCBtYXh5XVxyXG4gICAgcmV0dXJuIFtcclxuICAgICAgY3VycmVudFJlc29sdXRpb24sXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIC1jdXJyZW50UmVzb2x1dGlvbixcclxuICAgICAgY3VycmVudEV4dGVudFswXSArIGN1cnJlbnRSZXNvbHV0aW9uIC8gMC41LFxyXG4gICAgICBjdXJyZW50RXh0ZW50WzNdIC0gY3VycmVudFJlc29sdXRpb24gLyAwLjVcclxuICAgIF0uam9pbignXFxuJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTYXZlIGNhbnZhcyBpbWFnZSBhcyBmaWxlXHJcbiAgICogQHBhcmFtIGNhbnZhcyAtIENhbnZhcyB0byBzYXZlXHJcbiAgICogQHBhcmFtIG5hbWUgLSBOYW1lIG9mIHRoZSBmaWxlXHJcbiAgICogQHBhcmFtIGZvcm1hdCAtIGZpbGUgZm9ybWF0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzYXZlQ2FudmFzSW1hZ2VBc0ZpbGUoY2FudmFzLCBuYW1lLCBmb3JtYXQpIHtcclxuICAgIGNvbnN0IGJsb2JGb3JtYXQgPSAnaW1hZ2UvJyArIGZvcm1hdDtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNhbnZhcy50b0RhdGFVUkwoKTsgLy8gSnVzdCB0byBtYWtlIHRoZSBjYXRjaCB0cmlnZ2VyIHdpaHRvdXQgdG9CbG9iIEVycm9yIHRocm93IG5vdCBjYXRjaGVkXHJcbiAgICAgIC8vIElmIG5hdmlnYXRvciBpcyBJbnRlcm5ldCBFeHBsb3JlclxyXG4gICAgICBpZiAobmF2aWdhdG9yLm1zU2F2ZUJsb2IpIHtcclxuICAgICAgICBuYXZpZ2F0b3IubXNTYXZlQmxvYihjYW52YXMubXNUb0Jsb2IoKSwgbmFtZSArICcuJyArIGZvcm1hdCk7XHJcbiAgICAgICAgdGhpcy5zYXZlRmlsZVByb2Nlc3NpbmcoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjYW52YXMudG9CbG9iKGJsb2IgPT4ge1xyXG4gICAgICAgICAgLy8gZG93bmxvYWQgaW1hZ2VcclxuICAgICAgICAgIHNhdmVBcyhibG9iLCBuYW1lICsgJy4nICsgZm9ybWF0KTtcclxuICAgICAgICAgIHRoYXQuc2F2ZUZpbGVQcm9jZXNzaW5nKCk7XHJcbiAgICAgICAgfSwgYmxvYkZvcm1hdCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmVycm9yKFxyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgJ2lnby5nZW8ucHJpbnRGb3JtLmNvcnNFcnJvck1lc3NhZ2VCb2R5J1xyXG4gICAgICAgICksXHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAnaWdvLmdlby5wcmludEZvcm0uY29yc0Vycm9yTWVzc2FnZUhlYWRlcidcclxuICAgICAgICApLFxyXG4gICAgICAgICdwcmludCdcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBmaWxlIHRvIGEgemlwXHJcbiAgICogQHBhcmFtIGNhbnZhcyAtIEZpbGUgdG8gYWRkIHRvIHRoZSB6aXBcclxuICAgKiBAcGFyYW0gIG5hbWUgLU5hbWUgb2YgdGhlIGZpbGVvdmVydmlld1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2VuZXJhdGVDYW52YUZpbGVUb1ppcChjYW52YXMsIG5hbWUpIHtcclxuICAgIGNvbnN0IGJsb2JGb3JtYXQgPSAnaW1hZ2UvJyArICdqcGVnJztcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy5oYXNPd25Qcm9wZXJ0eSgnemlwRmlsZScpIHx8XHJcbiAgICAgIHR5cGVvZiB0aGlzLnppcEZpbGUgPT09ICd1bmRlZmluZWQnXHJcbiAgICApIHtcclxuICAgICAgdGhpcy56aXBGaWxlID0gbmV3IEpTWmlwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY2FudmFzLnRvRGF0YVVSTCgpOyAvLyBKdXN0IHRvIG1ha2UgdGhlIGNhdGNoIHRyaWdnZXIgd2lodG91dCB0b0Jsb2IgRXJyb3IgdGhyb3cgbm90IGNhdGNoZWRcclxuICAgICAgaWYgKG5hdmlnYXRvci5tc1NhdmVCbG9iKSB7XHJcbiAgICAgICAgdGhpcy5hZGRGaWxlVG9aaXAobmFtZSwgY2FudmFzLm1zVG9CbG9iKCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNhbnZhcy50b0Jsb2IoYmxvYiA9PiB7XHJcbiAgICAgICAgICB0aGF0LmFkZEZpbGVUb1ppcChuYW1lLCBibG9iKTtcclxuICAgICAgICB9LCBibG9iRm9ybWF0KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZXJyb3IoXHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAnaWdvLmdlby5wcmludEZvcm0uY29yc0Vycm9yTWVzc2FnZUJvZHknXHJcbiAgICAgICAgKSxcclxuICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICdpZ28uZ2VvLnByaW50Rm9ybS5jb3JzRXJyb3JNZXNzYWdlSGVhZGVyJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ3ByaW50J1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGZpbGUgdG8gemlwLCBpZiBhbGwgZmlsZSBhcmUgemlwcGVkLCBkb3dubG9hZFxyXG4gICAqIEBwYXJhbSBuYW1lIC0gTmFtZSBvZiB0aGUgZmlsZXNcclxuICAgKiBAcGFyYW0gYmxvYiAtIENvbnRhaW4gb2YgZmlsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkRmlsZVRvWmlwKG5hbWUsIGJsb2IpIHtcclxuICAgIC8vIGFkZCBmaWxlIHRvIHppcFxyXG4gICAgdGhpcy56aXBGaWxlLmZpbGUobmFtZSwgYmxvYik7XHJcbiAgICB0aGlzLm5iRmlsZVRvUHJvY2Vzcy0tO1xyXG5cclxuICAgIC8vIElmIGFsbCBmaWxlcyBhcmUgcHJvY2Nlc3NlZFxyXG4gICAgaWYgKHRoaXMubmJGaWxlVG9Qcm9jZXNzID09PSAwKSB7XHJcbiAgICAgIC8vIERvd25sb2FkIHppcCBmaWxlXHJcbiAgICAgIHRoaXMuZ2V0WmlwRmlsZSgpO1xyXG4gICAgICAvLyBTdG9wIGxvYWRpbmdcclxuICAgICAgdGhpcy5hY3Rpdml0eVNlcnZpY2UudW5yZWdpc3Rlcih0aGlzLmFjdGl2aXR5SWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzYXZlRmlsZVByb2Nlc3NpbmcoKSB7XHJcbiAgICB0aGlzLm5iRmlsZVRvUHJvY2Vzcy0tO1xyXG5cclxuICAgIC8vIElmIGFsbCBmaWxlcyBhcmUgcHJvY2Nlc3NlZFxyXG4gICAgaWYgKHRoaXMubmJGaWxlVG9Qcm9jZXNzID09PSAwKSB7XHJcbiAgICAgIC8vIFN0b3AgbG9hZGluZ1xyXG4gICAgICB0aGlzLmFjdGl2aXR5U2VydmljZS51bnJlZ2lzdGVyKHRoaXMuYWN0aXZpdHlJZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHppcHBlZCBmaWxlXHJcbiAgICogQHJldHVybiBSZXR1biBhIHppcCBmaWxlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRaaXBGaWxlKCkge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICB0aGlzLnppcEZpbGUuZ2VuZXJhdGVBc3luYyh7IHR5cGU6ICdibG9iJyB9KS50aGVuKGJsb2IgPT4ge1xyXG4gICAgICAvLyAxKSBnZW5lcmF0ZSB0aGUgemlwIGZpbGVcclxuICAgICAgc2F2ZUFzKGJsb2IsICdtYXAuemlwJyk7XHJcbiAgICAgIGRlbGV0ZSB0aGF0LnppcEZpbGU7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19