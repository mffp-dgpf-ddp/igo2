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
var html2canvas = _html2canvas;
var PrintService = /** @class */ (function () {
    function PrintService(messageService, activityService, languageService) {
        this.messageService = messageService;
        this.activityService = activityService;
        this.languageService = languageService;
    }
    /**
     * @param {?} map
     * @param {?} options
     * @return {?}
     */
    PrintService.prototype.print = /**
     * @param {?} map
     * @param {?} options
     * @return {?}
     */
    function (map, options) {
        var _this = this;
        /** @type {?} */
        var status$ = new Subject();
        /** @type {?} */
        var paperFormat = options.paperFormat;
        /** @type {?} */
        var resolution = +options.resolution;
        // Default is 96
        /** @type {?} */
        var orientation = options.orientation;
        this.activityId = this.activityService.register();
        /** @type {?} */
        var doc = new jsPDF({
            orientation: orientation,
            format: paperFormat.toLowerCase()
        });
        /** @type {?} */
        var dimensions = [
            doc.internal.pageSize.width,
            doc.internal.pageSize.height
        ];
        /** @type {?} */
        var margins = [20, 10, 20, 10];
        /** @type {?} */
        var width = dimensions[0] - margins[3] - margins[1];
        /** @type {?} */
        var height = dimensions[1] - margins[0] - margins[2];
        /** @type {?} */
        var size = [width, height];
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
        function (status) {
            if (status === SubjectStatus.Done) {
                if (options.showLegend === true) {
                    _this.addLegend(doc, map, margins, resolution);
                }
                else {
                    _this.saveDoc(doc);
                }
            }
            if (status === SubjectStatus.Done || status === SubjectStatus.Error) {
                _this.activityService.unregister(_this.activityId);
                status$.next(SubjectStatus.Done);
            }
        }));
        return status$;
    };
    /**
     * Get html code for all layers legend
     * @param  map IgoMap
     * @param  width The width that the legend need to be
     * @return Html code for the legend
     */
    /**
     * Get html code for all layers legend
     * @param {?} map IgoMap
     * @param {?} width The width that the legend need to be
     * @param {?} resolution
     * @return {?} Html code for the legend
     */
    PrintService.prototype.getLayersLegendHtml = /**
     * Get html code for all layers legend
     * @param {?} map IgoMap
     * @param {?} width The width that the legend need to be
     * @param {?} resolution
     * @return {?} Html code for the legend
     */
    function (map, width, resolution) {
        /** @type {?} */
        var html = '';
        /** @type {?} */
        var legends = getLayersLegends(map.layers, map.viewController.getScale(resolution));
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
        function (legend) {
            html +=
                '<table border=1 style="display:inline-block;vertical-align:top">';
            html += '<tr><th width="170px">' + legend.title + '</th>';
            html += '<td><img class="printImageLegend" src="' + legend.url + '">';
            html += '</td></tr></table>';
        }));
        html += '</div>';
        return html;
    };
    /**
     * Get all the legend in a single image
     * * @param  format - Image format. default value to "png"
     * @return The image of the legend
     */
    /**
     * Get all the legend in a single image
     * * \@param  format - Image format. default value to "png"
     * @param {?} map
     * @param {?=} format
     * @param {?=} doZipFile
     * @param {?=} resolution
     * @return {?} The image of the legend
     */
    PrintService.prototype.getLayersLegendImage = /**
     * Get all the legend in a single image
     * * \@param  format - Image format. default value to "png"
     * @param {?} map
     * @param {?=} format
     * @param {?=} doZipFile
     * @param {?=} resolution
     * @return {?} The image of the legend
     */
    function (map, format, doZipFile, resolution) {
        if (format === void 0) { format = 'png'; }
        /** @type {?} */
        var status$ = new Subject();
        // Get html code for the legend
        /** @type {?} */
        var width = 200;
        // milimeters unit, originally define for document pdf
        /** @type {?} */
        var html = this.getLayersLegendHtml(map, width, resolution);
        /** @type {?} */
        var that = this;
        format = format.toLowerCase();
        // If no legend show No LEGEND in an image
        if (html.length === 0) {
            html = '<font size="12" face="Courier New" >';
            html += '<div align="center"><b>NO LEGEND</b></div>';
        }
        // Create div to contain html code for legend
        /** @type {?} */
        var div = window.document.createElement('div');
        // Add html code to convert in the new window
        window.document.body.appendChild(div);
        div.innerHTML = html;
        // Define event to execute after all images are loaded to create the canvas
        setTimeout((/**
         * @return {?}
         */
        function () {
            html2canvas(div, { useCORS: true }).then((/**
             * @param {?} canvas
             * @return {?}
             */
            function (canvas) {
                /** @type {?} */
                var status = SubjectStatus.Done;
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
    };
    /**
     * @private
     * @param {?} doc
     * @param {?} title
     * @param {?} pageWidth
     * @return {?}
     */
    PrintService.prototype.addTitle = /**
     * @private
     * @param {?} doc
     * @param {?} title
     * @param {?} pageWidth
     * @return {?}
     */
    function (doc, title, pageWidth) {
        /** @type {?} */
        var pdfResolution = 96;
        /** @type {?} */
        var titleSize = 32;
        /** @type {?} */
        var titleWidth = ((titleSize * 25.4) / pdfResolution) * title.length;
        /** @type {?} */
        var titleMarginLeft;
        if (titleWidth > pageWidth) {
            titleMarginLeft = 0;
        }
        else {
            titleMarginLeft = (pageWidth - titleWidth) / 2;
        }
        doc.setFont('courier');
        doc.setFontSize(32);
        doc.text(title, titleMarginLeft, 15);
    };
    /**
     * Add comment to the document
     * * @param  doc - pdf document
     * * @param  comment - Comment to add in the document
     * * @param  size - Size of the document
     */
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
    PrintService.prototype.addComment = /**
     * Add comment to the document
     * * \@param  doc - pdf document
     * * \@param  comment - Comment to add in the document
     * * \@param  size - Size of the document
     * @private
     * @param {?} doc
     * @param {?} comment
     * @return {?}
     */
    function (doc, comment) {
        /** @type {?} */
        var commentSize = 16;
        /** @type {?} */
        var commentMarginLeft = 20;
        /** @type {?} */
        var marginBottom = 5;
        /** @type {?} */
        var heightPixels = doc.internal.pageSize.height - marginBottom;
        doc.setFont('courier');
        doc.setFontSize(commentSize);
        doc.text(comment, commentMarginLeft, heightPixels);
    };
    /**
     * Add projection and/or scale to the document
     * @param  doc - pdf document
     * @param  map - Map of the app
     * @param  dpi - DPI resolution of the document
     * @param  projection - Bool to indicate if projection need to be added
     * @param  scale - Bool to indicate if scale need to be added
     */
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
    PrintService.prototype.addProjScale = /**
     * Add projection and/or scale to the document
     * @private
     * @param {?} doc - pdf document
     * @param {?} map - Map of the app
     * @param {?} dpi - DPI resolution of the document
     * @param {?} projection - Bool to indicate if projection need to be added
     * @param {?} scale - Bool to indicate if scale need to be added
     * @return {?}
     */
    function (doc, map, dpi, projection, scale) {
        /** @type {?} */
        var translate = this.languageService.translate;
        /** @type {?} */
        var projScaleSize = 16;
        /** @type {?} */
        var projScaleMarginLeft = 20;
        /** @type {?} */
        var marginBottom = 15;
        /** @type {?} */
        var heightPixels = doc.internal.pageSize.height - marginBottom;
        /** @type {?} */
        var textProjScale = '';
        if (projection === true) {
            /** @type {?} */
            var projText = translate.instant('igo.geo.printForm.projection');
            textProjScale += projText + ': ' + map.projection;
        }
        if (scale === true) {
            if (projection === true) {
                textProjScale += '   ';
            }
            /** @type {?} */
            var scaleText = translate.instant('igo.geo.printForm.scale');
            /** @type {?} */
            var mapScale = map.viewController.getScale(dpi);
            textProjScale += scaleText + ' ~ 1 ' + formatScale(mapScale);
        }
        doc.setFont('courier');
        doc.setFontSize(projScaleSize);
        doc.text(textProjScale, projScaleMarginLeft, heightPixels);
    };
    /**
     * Add the legend to the document
     * @param  doc - Pdf document where legend will be added
     * @param  map - Map of the app
     * @param  margins - Page margins
     */
    /**
     * Add the legend to the document
     * @private
     * @param {?} doc - Pdf document where legend will be added
     * @param {?} map - Map of the app
     * @param {?} margins - Page margins
     * @param {?} resolution
     * @return {?}
     */
    PrintService.prototype.addLegend = /**
     * Add the legend to the document
     * @private
     * @param {?} doc - Pdf document where legend will be added
     * @param {?} map - Map of the app
     * @param {?} margins - Page margins
     * @param {?} resolution
     * @return {?}
     */
    function (doc, map, margins, resolution) {
        var _this = this;
        /** @type {?} */
        var that = this;
        // Get html code for the legend
        /** @type {?} */
        var width = doc.internal.pageSize.width;
        /** @type {?} */
        var html = this.getLayersLegendHtml(map, width, resolution);
        // If no legend, save the map directly
        if (html === '') {
            this.saveDoc(doc);
            return true;
        }
        // Create div to contain html code for legend
        /** @type {?} */
        var div = window.document.createElement('div');
        html2canvas(div, { useCORS: true }).then((/**
         * @param {?} canvas
         * @return {?}
         */
        function (canvas) {
            /** @type {?} */
            var imgData;
            /** @type {?} */
            var position = 10;
            imgData = canvas.toDataURL('image/png');
            doc.addPage();
            /** @type {?} */
            var imageSize = _this.getImageSizeToFitPdf(doc, canvas, margins);
            doc.addImage(imgData, 'PNG', 10, position, imageSize[0], imageSize[1]);
            that.saveDoc(doc);
            div.parentNode.removeChild(div); // remove temp div (IE style)
        }));
        // Add html code to convert in the new window
        window.document.body.appendChild(div);
        div.innerHTML = html;
    };
    /**
     * @private
     * @param {?} doc
     * @param {?} canvas
     * @param {?} margins
     * @return {?}
     */
    PrintService.prototype.addCanvas = /**
     * @private
     * @param {?} doc
     * @param {?} canvas
     * @param {?} margins
     * @return {?}
     */
    function (doc, canvas, margins) {
        /** @type {?} */
        var image;
        image = canvas.toDataURL('image/jpeg');
        if (image !== undefined) {
            /** @type {?} */
            var imageSize = this.getImageSizeToFitPdf(doc, canvas, margins);
            doc.addImage(image, 'JPEG', margins[3], margins[0], imageSize[0], imageSize[1]);
            doc.rect(margins[3], margins[0], imageSize[0], imageSize[1]);
        }
    };
    // TODO fix printing with image resolution
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
    PrintService.prototype.addMap = 
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
    function (doc, map, resolution, size, margins) {
        var _this = this;
        /** @type {?} */
        var status$ = new Subject();
        /** @type {?} */
        var mapSize = map.ol.getSize();
        /** @type {?} */
        var extent = map.ol.getView().calculateExtent(mapSize);
        /** @type {?} */
        var widthPixels = Math.round((size[0] * resolution) / 25.4);
        /** @type {?} */
        var heightPixels = Math.round((size[1] * resolution) / 25.4);
        /** @type {?} */
        var timeout;
        map.ol.once('postcompose', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var canvas = event.context.canvas;
            /** @type {?} */
            var mapStatus$$ = map.status$.subscribe((/**
             * @param {?} mapStatus
             * @return {?}
             */
            function (mapStatus) {
                clearTimeout(timeout);
                if (mapStatus !== SubjectStatus.Done) {
                    return;
                }
                mapStatus$$.unsubscribe();
                /** @type {?} */
                var status = SubjectStatus.Done;
                try {
                    _this.addCanvas(doc, canvas, margins);
                }
                catch (err) {
                    status = SubjectStatus.Error;
                    _this.messageService.error(_this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageBody'), _this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageHeader'), 'print');
                }
                _this.renderMap(map, mapSize, extent);
                status$.next(status);
            }));
            // If no loading as started after 200ms, then probably no loading
            // is required.
            timeout = window.setTimeout((/**
             * @return {?}
             */
            function () {
                mapStatus$$.unsubscribe();
                /** @type {?} */
                var status = SubjectStatus.Done;
                try {
                    _this.addCanvas(doc, canvas, margins);
                }
                catch (err) {
                    status = SubjectStatus.Error;
                    _this.messageService.error(_this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageBody'), _this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageHeader'), 'print');
                }
                _this.renderMap(map, mapSize, extent);
                status$.next(status);
            }), 200);
        }));
        this.renderMap(map, [widthPixels, heightPixels], extent);
        return status$;
    };
    /**
     * @param {?} nbFileToProcess
     * @return {?}
     */
    PrintService.prototype.defineNbFileToProcess = /**
     * @param {?} nbFileToProcess
     * @return {?}
     */
    function (nbFileToProcess) {
        this.nbFileToProcess = nbFileToProcess;
    };
    /**
     * Download an image of the map with addition of informations
     * @param  map - Map of the app
     * @param  format - Image format. default value to "png"
     * @param  projection - Indicate if projection need to be add. Default to false
     * @param  scale - Indicate if scale need to be add. Default to false
     * @param  legend - Indicate if the legend of layers need to be download. Default to false
     * @param  title - Title to add for the map - Default to blank
     * @param  comment - Comment to add for the map - Default to blank
     * @param  doZipFile - Indicate if we do a zip with the file
     * @return Image file of the map with extension format given as parameter
     */
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
    PrintService.prototype.downloadMapImage = /**
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
    function (map, resolution, format, projection, scale, legend, title, comment, doZipFile) {
        var _this = this;
        if (format === void 0) { format = 'png'; }
        if (projection === void 0) { projection = false; }
        if (scale === void 0) { scale = false; }
        if (legend === void 0) { legend = false; }
        if (title === void 0) { title = ''; }
        if (comment === void 0) { comment = ''; }
        if (doZipFile === void 0) { doZipFile = true; }
        /** @type {?} */
        var status$ = new Subject();
        // const resolution = map.ol.getView().getResolution();
        this.activityId = this.activityService.register();
        /** @type {?} */
        var translate = this.languageService.translate;
        map.ol.once('postcompose', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            format = format.toLowerCase();
            /** @type {?} */
            var context = event.context;
            /** @type {?} */
            var newCanvas = document.createElement('canvas');
            /** @type {?} */
            var newContext = newCanvas.getContext('2d');
            // Postion in height to set the canvas in new canvas
            /** @type {?} */
            var positionHCanvas = 0;
            // Position in width to set the Proj/Scale in new canvas
            /** @type {?} */
            var positionWProjScale = 10;
            // Get height/width of map canvas
            /** @type {?} */
            var width = context.canvas.width;
            /** @type {?} */
            var height = context.canvas.height;
            // Set Font to calculate comment width
            newContext.font = '20px Calibri';
            /** @type {?} */
            var commentWidth = newContext.measureText(comment).width;
            // Add height for title if defined
            height = title !== '' ? height + 30 : height;
            // Add height for projection or scale (same line) if defined
            height = projection !== false || scale !== false ? height + 30 : height;
            /** @type {?} */
            var positionHProjScale = height - 10;
            // Define number of line depending of the comment length
            /** @type {?} */
            var commentNbLine = Math.ceil(commentWidth / width);
            // Add height for multiline comment if defined
            height = comment !== '' ? height + commentNbLine * 30 : height;
            /** @type {?} */
            var positionHComment = height - commentNbLine * 20 + 5;
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
                var projText = translate.instant('igo.geo.printForm.projection');
                newContext.textAlign = 'start';
                newContext.fillText(projText + ': ' + map.projection, positionWProjScale, positionHProjScale);
                positionWProjScale += 200; // Width position change for scale position
            }
            // If scale need to be added to canvas
            if (scale !== false) {
                /** @type {?} */
                var scaleText = translate.instant('igo.geo.printForm.scale');
                /** @type {?} */
                var mapScale = map.viewController.getScale(resolution);
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
                    var nbCommentChar = comment.length;
                    /** @type {?} */
                    var CommentLengthToCut = Math.floor(nbCommentChar / commentNbLine);
                    /** @type {?} */
                    var commentCurrentLine = '';
                    /** @type {?} */
                    var positionFirstCutChar = 0;
                    /** @type {?} */
                    var positionLastBlank = void 0;
                    // Loop for the number of line calculated
                    for (var i = 0; i < commentNbLine; i++) {
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
            var status = SubjectStatus.Done;
            try {
                // Save the canvas as file
                if (!doZipFile) {
                    _this.saveCanvasImageAsFile(newCanvas, 'map', format);
                }
                else if (format.toLowerCase() === 'tiff') {
                    // Add the canvas to zip
                    _this.generateCanvaFileToZip(newCanvas, 'map' + map.projection.replace(':', '_') + '.' + format);
                }
                else {
                    // Add the canvas to zip
                    _this.generateCanvaFileToZip(newCanvas, 'map' + '.' + format);
                }
            }
            catch (err) {
                status = SubjectStatus.Error;
            }
            status$.next(status);
            if (format.toLowerCase() === 'tiff') {
                /** @type {?} */
                var tiwContent = _this.getWorldFileInformation(map);
                /** @type {?} */
                var blob = new Blob([tiwContent], {
                    type: 'text/plain;charset=utf-8'
                });
                if (!doZipFile) {
                    // saveAs automaticly replace ':' for '_'
                    saveAs(blob, 'map' + map.projection + '.tfw');
                    _this.saveFileProcessing();
                }
                else {
                    // Add the canvas to zip
                    _this.addFileToZip('map' + map.projection.replace(':', '_') + '.tfw', blob);
                }
            }
        }));
        map.ol.renderSync();
    };
    /**
     * @private
     * @param {?} map
     * @param {?} size
     * @param {?} extent
     * @return {?}
     */
    PrintService.prototype.renderMap = /**
     * @private
     * @param {?} map
     * @param {?} size
     * @param {?} extent
     * @return {?}
     */
    function (map, size, extent) {
        map.ol.renderSync();
    };
    /**
     * Save document
     * @param  doc - Document to save
     */
    /**
     * Save document
     * @private
     * @param {?} doc - Document to save
     * @return {?}
     */
    PrintService.prototype.saveDoc = /**
     * Save document
     * @private
     * @param {?} doc - Document to save
     * @return {?}
     */
    function (doc) {
        doc.save('map.pdf');
    };
    /**
     * Calculate the best Image size to fit in pdf
     * @param doc - Pdf Document
     * @param canvas - Canvas of image
     * @param margins - Page margins
     */
    /**
     * Calculate the best Image size to fit in pdf
     * @private
     * @param {?} doc - Pdf Document
     * @param {?} canvas - Canvas of image
     * @param {?} margins - Page margins
     * @return {?}
     */
    PrintService.prototype.getImageSizeToFitPdf = /**
     * Calculate the best Image size to fit in pdf
     * @private
     * @param {?} doc - Pdf Document
     * @param {?} canvas - Canvas of image
     * @param {?} margins - Page margins
     * @return {?}
     */
    function (doc, canvas, margins) {
        // Define variable to calculate best size to fit in one page
        /** @type {?} */
        var pageHeight = doc.internal.pageSize.getHeight() - (margins[0] + margins[2]);
        /** @type {?} */
        var pageWidth = doc.internal.pageSize.getWidth() - (margins[1] + margins[3]);
        /** @type {?} */
        var canHeight = canvas.height;
        /** @type {?} */
        var canWidth = canvas.width;
        /** @type {?} */
        var heightRatio = canHeight / pageHeight;
        /** @type {?} */
        var widthRatio = canWidth / pageWidth;
        /** @type {?} */
        var maxRatio = heightRatio > widthRatio ? heightRatio : widthRatio;
        /** @type {?} */
        var imgHeigh = maxRatio > 1 ? canHeight / maxRatio : canHeight;
        /** @type {?} */
        var imgWidth = maxRatio > 1 ? canWidth / maxRatio : canWidth;
        return [imgWidth, imgHeigh];
    };
    /**
     * Get a world file information for tiff
     * @param  map - Map of the app
     */
    /**
     * Get a world file information for tiff
     * @private
     * @param {?} map - Map of the app
     * @return {?}
     */
    PrintService.prototype.getWorldFileInformation = /**
     * Get a world file information for tiff
     * @private
     * @param {?} map - Map of the app
     * @return {?}
     */
    function (map) {
        /** @type {?} */
        var currentResolution = map.viewController.getResolution();
        /** @type {?} */
        var currentExtent = map.getExtent();
        return [
            currentResolution,
            0,
            0,
            -currentResolution,
            currentExtent[0] + currentResolution / 0.5,
            currentExtent[3] - currentResolution / 0.5
        ].join('\n');
    };
    /**
     * Save canvas image as file
     * @param canvas - Canvas to save
     * @param name - Name of the file
     * @param format - file format
     */
    /**
     * Save canvas image as file
     * @private
     * @param {?} canvas - Canvas to save
     * @param {?} name - Name of the file
     * @param {?} format - file format
     * @return {?}
     */
    PrintService.prototype.saveCanvasImageAsFile = /**
     * Save canvas image as file
     * @private
     * @param {?} canvas - Canvas to save
     * @param {?} name - Name of the file
     * @param {?} format - file format
     * @return {?}
     */
    function (canvas, name, format) {
        /** @type {?} */
        var blobFormat = 'image/' + format;
        /** @type {?} */
        var that = this;
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
                function (blob) {
                    // download image
                    saveAs(blob, name + '.' + format);
                    that.saveFileProcessing();
                }), blobFormat);
            }
        }
        catch (err) {
            this.messageService.error(this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageBody'), this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageHeader'), 'print');
        }
    };
    /**
     * Add file to a zip
     * @param canvas - File to add to the zip
     * @param  name -Name of the fileoverview
     */
    /**
     * Add file to a zip
     * @private
     * @param {?} canvas - File to add to the zip
     * @param {?} name -Name of the fileoverview
     * @return {?}
     */
    PrintService.prototype.generateCanvaFileToZip = /**
     * Add file to a zip
     * @private
     * @param {?} canvas - File to add to the zip
     * @param {?} name -Name of the fileoverview
     * @return {?}
     */
    function (canvas, name) {
        /** @type {?} */
        var blobFormat = 'image/' + 'jpeg';
        /** @type {?} */
        var that = this;
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
                function (blob) {
                    that.addFileToZip(name, blob);
                }), blobFormat);
            }
        }
        catch (err) {
            this.messageService.error(this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageBody'), this.languageService.translate.instant('igo.geo.printForm.corsErrorMessageHeader'), 'print');
        }
    };
    /**
     * Add file to zip, if all file are zipped, download
     * @param name - Name of the files
     * @param blob - Contain of file
     */
    /**
     * Add file to zip, if all file are zipped, download
     * @private
     * @param {?} name - Name of the files
     * @param {?} blob - Contain of file
     * @return {?}
     */
    PrintService.prototype.addFileToZip = /**
     * Add file to zip, if all file are zipped, download
     * @private
     * @param {?} name - Name of the files
     * @param {?} blob - Contain of file
     * @return {?}
     */
    function (name, blob) {
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
    };
    /**
     * @private
     * @return {?}
     */
    PrintService.prototype.saveFileProcessing = /**
     * @private
     * @return {?}
     */
    function () {
        this.nbFileToProcess--;
        // If all files are proccessed
        if (this.nbFileToProcess === 0) {
            // Stop loading
            this.activityService.unregister(this.activityId);
        }
    };
    /**
     * Get the zipped file
     * @return Retun a zip file
     */
    /**
     * Get the zipped file
     * @private
     * @return {?} Retun a zip file
     */
    PrintService.prototype.getZipFile = /**
     * Get the zipped file
     * @private
     * @return {?} Retun a zip file
     */
    function () {
        /** @type {?} */
        var that = this;
        this.zipFile.generateAsync({ type: 'blob' }).then((/**
         * @param {?} blob
         * @return {?}
         */
        function (blob) {
            // 1) generate the zip file
            saveAs(blob, 'map.zip');
            delete that.zipFile;
        }));
    };
    PrintService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    PrintService.ctorParameters = function () { return [
        { type: MessageService },
        { type: ActivityService },
        { type: LanguageService }
    ]; };
    /** @nocollapse */ PrintService.ngInjectableDef = i0.defineInjectable({ factory: function PrintService_Factory() { return new PrintService(i0.inject(i1.MessageService), i0.inject(i1.ActivityService), i0.inject(i1.LanguageService)); }, token: PrintService, providedIn: "root" });
    return PrintService;
}());
export { PrintService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9wcmludC9zaGFyZWQvcHJpbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxLQUFLLFlBQVksTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFL0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHOUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXpELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0lBSXRELFdBQVcsR0FBRyxZQUFZO0FBRWhDO0lBT0Usc0JBQ1UsY0FBOEIsRUFDOUIsZUFBZ0MsRUFDaEMsZUFBZ0M7UUFGaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDdkMsQ0FBQzs7Ozs7O0lBRUosNEJBQUs7Ozs7O0lBQUwsVUFBTSxHQUFXLEVBQUUsT0FBcUI7UUFBeEMsaUJBMERDOztZQXpETyxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUU7O1lBRXZCLFdBQVcsR0FBVyxPQUFPLENBQUMsV0FBVzs7WUFDekMsVUFBVSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVU7OztZQUNoQyxX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LElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN4QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOztnQkF6c0JGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBYlEsY0FBYztnQkFBRSxlQUFlO2dCQUFFLGVBQWU7Ozt1QkFSekQ7Q0E2dEJDLEFBMXNCRCxJQTBzQkM7U0F2c0JZLFlBQVk7OztJQUN2QiwrQkFBZTs7SUFDZix1Q0FBd0I7O0lBQ3hCLGtDQUFtQjs7Ozs7SUFFakIsc0NBQXNDOzs7OztJQUN0Qyx1Q0FBd0M7Ozs7O0lBQ3hDLHVDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBzYXZlQXMgfSBmcm9tICdmaWxlLXNhdmVyJztcclxuaW1wb3J0ICogYXMganNQREYgZnJvbSAnanNwZGYnO1xyXG5pbXBvcnQgKiBhcyBfaHRtbDJjYW52YXMgZnJvbSAnaHRtbDJjYW52YXMnO1xyXG5pbXBvcnQgKiBhcyBKU1ppcCBmcm9tICdqc3ppcCc7XHJcblxyXG5pbXBvcnQgeyBTdWJqZWN0U3RhdHVzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgQWN0aXZpdHlTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgZm9ybWF0U2NhbGUgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcC51dGlscyc7XHJcbmltcG9ydCB7IExheWVyTGVnZW5kIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBnZXRMYXllcnNMZWdlbmRzIH0gZnJvbSAnLi4vLi4vbGF5ZXIvdXRpbHMvbGVnZW5kJztcclxuXHJcbmltcG9ydCB7IFByaW50T3B0aW9ucyB9IGZyb20gJy4vcHJpbnQuaW50ZXJmYWNlJztcclxuXHJcbmNvbnN0IGh0bWwyY2FudmFzID0gX2h0bWwyY2FudmFzO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJpbnRTZXJ2aWNlIHtcclxuICB6aXBGaWxlOiBKU1ppcDtcclxuICBuYkZpbGVUb1Byb2Nlc3M6IG51bWJlcjtcclxuICBhY3Rpdml0eUlkOiBzdHJpbmc7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgYWN0aXZpdHlTZXJ2aWNlOiBBY3Rpdml0eVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBwcmludChtYXA6IElnb01hcCwgb3B0aW9uczogUHJpbnRPcHRpb25zKTogU3ViamVjdDxhbnk+IHtcclxuICAgIGNvbnN0IHN0YXR1cyQgPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAgIGNvbnN0IHBhcGVyRm9ybWF0OiBzdHJpbmcgPSBvcHRpb25zLnBhcGVyRm9ybWF0O1xyXG4gICAgY29uc3QgcmVzb2x1dGlvbiA9ICtvcHRpb25zLnJlc29sdXRpb247ICAvLyBEZWZhdWx0IGlzIDk2XHJcbiAgICBjb25zdCBvcmllbnRhdGlvbiA9IG9wdGlvbnMub3JpZW50YXRpb247XHJcblxyXG4gICAgdGhpcy5hY3Rpdml0eUlkID0gdGhpcy5hY3Rpdml0eVNlcnZpY2UucmVnaXN0ZXIoKTtcclxuICAgIGNvbnN0IGRvYyA9IG5ldyBqc1BERih7XHJcbiAgICAgIG9yaWVudGF0aW9uLFxyXG4gICAgICBmb3JtYXQ6IHBhcGVyRm9ybWF0LnRvTG93ZXJDYXNlKClcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBbXHJcbiAgICAgIGRvYy5pbnRlcm5hbC5wYWdlU2l6ZS53aWR0aCxcclxuICAgICAgZG9jLmludGVybmFsLnBhZ2VTaXplLmhlaWdodFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBtYXJnaW5zID0gWzIwLCAxMCwgMjAsIDEwXTtcclxuICAgIGNvbnN0IHdpZHRoID0gZGltZW5zaW9uc1swXSAtIG1hcmdpbnNbM10gLSBtYXJnaW5zWzFdO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gZGltZW5zaW9uc1sxXSAtIG1hcmdpbnNbMF0gLSBtYXJnaW5zWzJdO1xyXG4gICAgY29uc3Qgc2l6ZSA9IFt3aWR0aCwgaGVpZ2h0XTtcclxuXHJcbiAgICBpZiAob3B0aW9ucy50aXRsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuYWRkVGl0bGUoZG9jLCBvcHRpb25zLnRpdGxlLCBkaW1lbnNpb25zWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5zaG93UHJvamVjdGlvbiA9PT0gdHJ1ZSB8fCBvcHRpb25zLnNob3dTY2FsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmFkZFByb2pTY2FsZShcclxuICAgICAgICBkb2MsXHJcbiAgICAgICAgbWFwLFxyXG4gICAgICAgIHJlc29sdXRpb24sXHJcbiAgICAgICAgb3B0aW9ucy5zaG93UHJvamVjdGlvbixcclxuICAgICAgICBvcHRpb25zLnNob3dTY2FsZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMuY29tbWVudCAhPT0gJycpIHtcclxuICAgICAgdGhpcy5hZGRDb21tZW50KGRvYywgb3B0aW9ucy5jb21tZW50KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZE1hcChkb2MsIG1hcCwgcmVzb2x1dGlvbiwgc2l6ZSwgbWFyZ2lucykuc3Vic2NyaWJlKFxyXG4gICAgICAoc3RhdHVzOiBTdWJqZWN0U3RhdHVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gU3ViamVjdFN0YXR1cy5Eb25lKSB7XHJcbiAgICAgICAgICBpZiAob3B0aW9ucy5zaG93TGVnZW5kID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkTGVnZW5kKGRvYywgbWFwLCBtYXJnaW5zLCByZXNvbHV0aW9uKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZURvYyhkb2MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gU3ViamVjdFN0YXR1cy5Eb25lIHx8IHN0YXR1cyA9PT0gU3ViamVjdFN0YXR1cy5FcnJvcikge1xyXG4gICAgICAgICAgdGhpcy5hY3Rpdml0eVNlcnZpY2UudW5yZWdpc3Rlcih0aGlzLmFjdGl2aXR5SWQpO1xyXG4gICAgICAgICAgc3RhdHVzJC5uZXh0KFN1YmplY3RTdGF0dXMuRG9uZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBzdGF0dXMkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGh0bWwgY29kZSBmb3IgYWxsIGxheWVycyBsZWdlbmRcclxuICAgKiBAcGFyYW0gIG1hcCBJZ29NYXBcclxuICAgKiBAcGFyYW0gIHdpZHRoIFRoZSB3aWR0aCB0aGF0IHRoZSBsZWdlbmQgbmVlZCB0byBiZVxyXG4gICAqIEByZXR1cm4gSHRtbCBjb2RlIGZvciB0aGUgbGVnZW5kXHJcbiAgICovXHJcbiAgZ2V0TGF5ZXJzTGVnZW5kSHRtbChtYXA6IElnb01hcCwgd2lkdGg6IG51bWJlciwgcmVzb2x1dGlvbjogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGxldCBodG1sID0gJyc7XHJcbiAgICBjb25zdCBsZWdlbmRzID0gZ2V0TGF5ZXJzTGVnZW5kcyhtYXAubGF5ZXJzLCBtYXAudmlld0NvbnRyb2xsZXIuZ2V0U2NhbGUocmVzb2x1dGlvbikpO1xyXG4gICAgaWYgKGxlZ2VuZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZmluZSBpbXBvcnRhbnQgc3R5bGUgdG8gYmUgc3VyZSB0aGF0IGFsbCBjb250YWluZXIgaXMgY29udmVydFxyXG4gICAgLy8gdG8gaW1hZ2Ugbm90IGp1c3QgdmlzaWJsZSBwYXJ0XHJcbiAgICBodG1sICs9ICc8c3R5bGUgbWVkaWE9XCJzY3JlZW5cIiB0eXBlPVwidGV4dC9jc3NcIj4nO1xyXG4gICAgaHRtbCArPSAnLmh0bWwyY2FudmFzLWNvbnRhaW5lciB7IHdpZHRoOiAnICsgd2lkdGg7XHJcbiAgICBodG1sICs9ICdtbSAhaW1wb3J0YW50OyBoZWlnaHQ6IDIwMDBweCAhaW1wb3J0YW50OyB9JztcclxuICAgIGh0bWwgKz0gJzwvc3R5bGU+JztcclxuICAgIGh0bWwgKz0gJzxmb250IHNpemU9XCIyXCIgZmFjZT1cIkNvdXJpZXIgTmV3XCIgPic7XHJcbiAgICBodG1sICs9ICc8ZGl2IHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7bWF4LXdpZHRoOicgKyB3aWR0aCArICdtbVwiPic7XHJcbiAgICAvLyBGb3IgZWFjaCBsZWdlbmQsIGRlZmluZSBhbiBodG1sIHRhYmxlIGNlbGxcclxuICAgIGxlZ2VuZHMuZm9yRWFjaCgobGVnZW5kOiBMYXllckxlZ2VuZCkgPT4ge1xyXG4gICAgICBodG1sICs9XHJcbiAgICAgICAgJzx0YWJsZSBib3JkZXI9MSBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOnRvcFwiPic7XHJcbiAgICAgIGh0bWwgKz0gJzx0cj48dGggd2lkdGg9XCIxNzBweFwiPicgKyBsZWdlbmQudGl0bGUgKyAnPC90aD4nO1xyXG4gICAgICBodG1sICs9ICc8dGQ+PGltZyBjbGFzcz1cInByaW50SW1hZ2VMZWdlbmRcIiBzcmM9XCInICsgbGVnZW5kLnVybCArICdcIj4nO1xyXG4gICAgICBodG1sICs9ICc8L3RkPjwvdHI+PC90YWJsZT4nO1xyXG4gICAgfSk7XHJcbiAgICBodG1sICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgIHJldHVybiBodG1sO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFsbCB0aGUgbGVnZW5kIGluIGEgc2luZ2xlIGltYWdlXHJcbiAgICogKiBAcGFyYW0gIGZvcm1hdCAtIEltYWdlIGZvcm1hdC4gZGVmYXVsdCB2YWx1ZSB0byBcInBuZ1wiXHJcbiAgICogQHJldHVybiBUaGUgaW1hZ2Ugb2YgdGhlIGxlZ2VuZFxyXG4gICAqL1xyXG4gIGdldExheWVyc0xlZ2VuZEltYWdlKG1hcCwgZm9ybWF0OiBzdHJpbmcgPSAncG5nJywgZG9aaXBGaWxlOiBib29sZWFuLCByZXNvbHV0aW9uOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHN0YXR1cyQgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgLy8gR2V0IGh0bWwgY29kZSBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgY29uc3Qgd2lkdGggPSAyMDA7IC8vIG1pbGltZXRlcnMgdW5pdCwgb3JpZ2luYWxseSBkZWZpbmUgZm9yIGRvY3VtZW50IHBkZlxyXG4gICAgbGV0IGh0bWwgPSB0aGlzLmdldExheWVyc0xlZ2VuZEh0bWwobWFwLCB3aWR0aCwgcmVzb2x1dGlvbik7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIGZvcm1hdCA9IGZvcm1hdC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIC8vIElmIG5vIGxlZ2VuZCBzaG93IE5vIExFR0VORCBpbiBhbiBpbWFnZVxyXG4gICAgaWYgKGh0bWwubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGh0bWwgPSAnPGZvbnQgc2l6ZT1cIjEyXCIgZmFjZT1cIkNvdXJpZXIgTmV3XCIgPic7XHJcbiAgICAgIGh0bWwgKz0gJzxkaXYgYWxpZ249XCJjZW50ZXJcIj48Yj5OTyBMRUdFTkQ8L2I+PC9kaXY+JztcclxuICAgIH1cclxuICAgIC8vIENyZWF0ZSBkaXYgdG8gY29udGFpbiBodG1sIGNvZGUgZm9yIGxlZ2VuZFxyXG4gICAgY29uc3QgZGl2ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgIC8vIEFkZCBodG1sIGNvZGUgdG8gY29udmVydCBpbiB0aGUgbmV3IHdpbmRvd1xyXG4gICAgd2luZG93LmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgLy8gRGVmaW5lIGV2ZW50IHRvIGV4ZWN1dGUgYWZ0ZXIgYWxsIGltYWdlcyBhcmUgbG9hZGVkIHRvIGNyZWF0ZSB0aGUgY2FudmFzXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaHRtbDJjYW52YXMoZGl2LCB7IHVzZUNPUlM6IHRydWUgfSkudGhlbihjYW52YXMgPT4ge1xyXG4gICAgICAgIGxldCBzdGF0dXMgPSBTdWJqZWN0U3RhdHVzLkRvbmU7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGlmICghZG9aaXBGaWxlKSB7XHJcbiAgICAgICAgICAgIC8vIFNhdmUgdGhlIGNhbnZhcyBhcyBmaWxlXHJcbiAgICAgICAgICAgIHRoYXQuc2F2ZUNhbnZhc0ltYWdlQXNGaWxlKGNhbnZhcywgJ2xlZ2VuZEltYWdlJywgZm9ybWF0KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgY2FudmFzIHRvIHppcFxyXG4gICAgICAgICAgICB0aGF0LmdlbmVyYXRlQ2FudmFGaWxlVG9aaXAoY2FudmFzLCAnbGVnZW5kSW1hZ2UnICsgJy4nICsgZm9ybWF0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRpdi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRpdik7IC8vIHJlbW92ZSB0ZW1wIGRpdiAoSUUpXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBzdGF0dXMgPSBTdWJqZWN0U3RhdHVzLkVycm9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0dXMkLm5leHQoc3RhdHVzKTtcclxuICAgICAgfSk7XHJcbiAgICB9LCA1MDApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRUaXRsZShkb2M6IGpzUERGLCB0aXRsZTogc3RyaW5nLCBwYWdlV2lkdGg6IG51bWJlcikge1xyXG4gICAgY29uc3QgcGRmUmVzb2x1dGlvbiA9IDk2O1xyXG4gICAgY29uc3QgdGl0bGVTaXplID0gMzI7XHJcbiAgICBjb25zdCB0aXRsZVdpZHRoID0gKCh0aXRsZVNpemUgKiAyNS40KSAvIHBkZlJlc29sdXRpb24pICogdGl0bGUubGVuZ3RoO1xyXG5cclxuICAgIGxldCB0aXRsZU1hcmdpbkxlZnQ7XHJcbiAgICBpZiAodGl0bGVXaWR0aCA+IHBhZ2VXaWR0aCkge1xyXG4gICAgICB0aXRsZU1hcmdpbkxlZnQgPSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGl0bGVNYXJnaW5MZWZ0ID0gKHBhZ2VXaWR0aCAtIHRpdGxlV2lkdGgpIC8gMjtcclxuICAgIH1cclxuXHJcbiAgICBkb2Muc2V0Rm9udCgnY291cmllcicpO1xyXG4gICAgZG9jLnNldEZvbnRTaXplKDMyKTtcclxuICAgIGRvYy50ZXh0KHRpdGxlLCB0aXRsZU1hcmdpbkxlZnQsIDE1KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBjb21tZW50IHRvIHRoZSBkb2N1bWVudFxyXG4gICAqICogQHBhcmFtICBkb2MgLSBwZGYgZG9jdW1lbnRcclxuICAgKiAqIEBwYXJhbSAgY29tbWVudCAtIENvbW1lbnQgdG8gYWRkIGluIHRoZSBkb2N1bWVudFxyXG4gICAqICogQHBhcmFtICBzaXplIC0gU2l6ZSBvZiB0aGUgZG9jdW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIGFkZENvbW1lbnQoZG9jOiBqc1BERiwgY29tbWVudDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBjb21tZW50U2l6ZSA9IDE2O1xyXG4gICAgY29uc3QgY29tbWVudE1hcmdpbkxlZnQgPSAyMDtcclxuICAgIGNvbnN0IG1hcmdpbkJvdHRvbSA9IDU7XHJcbiAgICBjb25zdCBoZWlnaHRQaXhlbHMgPSBkb2MuaW50ZXJuYWwucGFnZVNpemUuaGVpZ2h0IC0gbWFyZ2luQm90dG9tO1xyXG5cclxuICAgIGRvYy5zZXRGb250KCdjb3VyaWVyJyk7XHJcbiAgICBkb2Muc2V0Rm9udFNpemUoY29tbWVudFNpemUpO1xyXG4gICAgZG9jLnRleHQoY29tbWVudCwgY29tbWVudE1hcmdpbkxlZnQsIGhlaWdodFBpeGVscyk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEFkZCBwcm9qZWN0aW9uIGFuZC9vciBzY2FsZSB0byB0aGUgZG9jdW1lbnRcclxuICAgKiBAcGFyYW0gIGRvYyAtIHBkZiBkb2N1bWVudFxyXG4gICAqIEBwYXJhbSAgbWFwIC0gTWFwIG9mIHRoZSBhcHBcclxuICAgKiBAcGFyYW0gIGRwaSAtIERQSSByZXNvbHV0aW9uIG9mIHRoZSBkb2N1bWVudFxyXG4gICAqIEBwYXJhbSAgcHJvamVjdGlvbiAtIEJvb2wgdG8gaW5kaWNhdGUgaWYgcHJvamVjdGlvbiBuZWVkIHRvIGJlIGFkZGVkXHJcbiAgICogQHBhcmFtICBzY2FsZSAtIEJvb2wgdG8gaW5kaWNhdGUgaWYgc2NhbGUgbmVlZCB0byBiZSBhZGRlZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkUHJvalNjYWxlKFxyXG4gICAgZG9jOiBqc1BERixcclxuICAgIG1hcDogSWdvTWFwLFxyXG4gICAgZHBpOiBudW1iZXIsXHJcbiAgICBwcm9qZWN0aW9uOiBib29sZWFuLFxyXG4gICAgc2NhbGU6IGJvb2xlYW5cclxuICApIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgIGNvbnN0IHByb2pTY2FsZVNpemUgPSAxNjtcclxuICAgIGNvbnN0IHByb2pTY2FsZU1hcmdpbkxlZnQgPSAyMDtcclxuICAgIGNvbnN0IG1hcmdpbkJvdHRvbSA9IDE1O1xyXG4gICAgY29uc3QgaGVpZ2h0UGl4ZWxzID0gZG9jLmludGVybmFsLnBhZ2VTaXplLmhlaWdodCAtIG1hcmdpbkJvdHRvbTtcclxuXHJcbiAgICBsZXQgdGV4dFByb2pTY2FsZTogc3RyaW5nID0gJyc7XHJcbiAgICBpZiAocHJvamVjdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICBjb25zdCBwcm9qVGV4dCA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnByaW50Rm9ybS5wcm9qZWN0aW9uJyk7XHJcbiAgICAgIHRleHRQcm9qU2NhbGUgKz0gcHJvalRleHQgKyAnOiAnICsgbWFwLnByb2plY3Rpb247XHJcbiAgICB9XHJcbiAgICBpZiAoc2NhbGUgPT09IHRydWUpIHtcclxuICAgICAgaWYgKHByb2plY3Rpb24gPT09IHRydWUpIHtcclxuICAgICAgICB0ZXh0UHJvalNjYWxlICs9ICcgICAnO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHNjYWxlVGV4dCA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnByaW50Rm9ybS5zY2FsZScpO1xyXG4gICAgICBjb25zdCBtYXBTY2FsZSA9IG1hcC52aWV3Q29udHJvbGxlci5nZXRTY2FsZShkcGkpO1xyXG4gICAgICB0ZXh0UHJvalNjYWxlICs9IHNjYWxlVGV4dCArICcgfiAxICcgKyBmb3JtYXRTY2FsZShtYXBTY2FsZSk7XHJcbiAgICB9XHJcbiAgICBkb2Muc2V0Rm9udCgnY291cmllcicpO1xyXG4gICAgZG9jLnNldEZvbnRTaXplKHByb2pTY2FsZVNpemUpO1xyXG4gICAgZG9jLnRleHQodGV4dFByb2pTY2FsZSwgcHJvalNjYWxlTWFyZ2luTGVmdCwgaGVpZ2h0UGl4ZWxzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgbGVnZW5kIHRvIHRoZSBkb2N1bWVudFxyXG4gICAqIEBwYXJhbSAgZG9jIC0gUGRmIGRvY3VtZW50IHdoZXJlIGxlZ2VuZCB3aWxsIGJlIGFkZGVkXHJcbiAgICogQHBhcmFtICBtYXAgLSBNYXAgb2YgdGhlIGFwcFxyXG4gICAqIEBwYXJhbSAgbWFyZ2lucyAtIFBhZ2UgbWFyZ2luc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkTGVnZW5kKGRvYzoganNQREYsIG1hcDogSWdvTWFwLCBtYXJnaW5zOiBBcnJheTxudW1iZXI+LCByZXNvbHV0aW9uOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgLy8gR2V0IGh0bWwgY29kZSBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgY29uc3Qgd2lkdGggPSBkb2MuaW50ZXJuYWwucGFnZVNpemUud2lkdGg7XHJcbiAgICBjb25zdCBodG1sID0gdGhpcy5nZXRMYXllcnNMZWdlbmRIdG1sKG1hcCwgd2lkdGgsIHJlc29sdXRpb24pO1xyXG4gICAgLy8gSWYgbm8gbGVnZW5kLCBzYXZlIHRoZSBtYXAgZGlyZWN0bHlcclxuICAgIGlmIChodG1sID09PSAnJykge1xyXG4gICAgICB0aGlzLnNhdmVEb2MoZG9jKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ3JlYXRlIGRpdiB0byBjb250YWluIGh0bWwgY29kZSBmb3IgbGVnZW5kXHJcbiAgICBjb25zdCBkaXYgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBodG1sMmNhbnZhcyhkaXYsIHsgdXNlQ09SUzogdHJ1ZSB9KS50aGVuKGNhbnZhcyA9PiB7XHJcbiAgICAgIGxldCBpbWdEYXRhO1xyXG4gICAgICBjb25zdCBwb3NpdGlvbiA9IDEwO1xyXG5cclxuICAgICAgaW1nRGF0YSA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xyXG4gICAgICBkb2MuYWRkUGFnZSgpO1xyXG4gICAgICBjb25zdCBpbWFnZVNpemUgPSB0aGlzLmdldEltYWdlU2l6ZVRvRml0UGRmKGRvYywgY2FudmFzLCBtYXJnaW5zKTtcclxuICAgICAgZG9jLmFkZEltYWdlKGltZ0RhdGEsICdQTkcnLCAxMCwgcG9zaXRpb24sIGltYWdlU2l6ZVswXSwgaW1hZ2VTaXplWzFdKTtcclxuICAgICAgdGhhdC5zYXZlRG9jKGRvYyk7XHJcbiAgICAgIGRpdi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRpdik7IC8vIHJlbW92ZSB0ZW1wIGRpdiAoSUUgc3R5bGUpXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBZGQgaHRtbCBjb2RlIHRvIGNvbnZlcnQgaW4gdGhlIG5ldyB3aW5kb3dcclxuICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gaHRtbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkQ2FudmFzKFxyXG4gICAgZG9jOiBqc1BERixcclxuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXHJcbiAgICBtYXJnaW5zOiBBcnJheTxudW1iZXI+XHJcbiAgKSB7XHJcbiAgICBsZXQgaW1hZ2U7XHJcblxyXG4gICAgaW1hZ2UgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9qcGVnJyk7XHJcblxyXG4gICAgaWYgKGltYWdlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc3QgaW1hZ2VTaXplID0gdGhpcy5nZXRJbWFnZVNpemVUb0ZpdFBkZihkb2MsIGNhbnZhcywgbWFyZ2lucyk7XHJcbiAgICAgIGRvYy5hZGRJbWFnZShcclxuICAgICAgICBpbWFnZSxcclxuICAgICAgICAnSlBFRycsXHJcbiAgICAgICAgbWFyZ2luc1szXSxcclxuICAgICAgICBtYXJnaW5zWzBdLFxyXG4gICAgICAgIGltYWdlU2l6ZVswXSxcclxuICAgICAgICBpbWFnZVNpemVbMV1cclxuICAgICAgKTtcclxuICAgICAgZG9jLnJlY3QobWFyZ2luc1szXSwgbWFyZ2luc1swXSwgaW1hZ2VTaXplWzBdLCBpbWFnZVNpemVbMV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gVE9ETyBmaXggcHJpbnRpbmcgd2l0aCBpbWFnZSByZXNvbHV0aW9uXHJcbiAgcHJpdmF0ZSBhZGRNYXAoXHJcbiAgICBkb2M6IGpzUERGLFxyXG4gICAgbWFwOiBJZ29NYXAsXHJcbiAgICByZXNvbHV0aW9uOiBudW1iZXIsXHJcbiAgICBzaXplOiBBcnJheTxudW1iZXI+LFxyXG4gICAgbWFyZ2luczogQXJyYXk8bnVtYmVyPlxyXG4gICkge1xyXG4gICAgY29uc3Qgc3RhdHVzJCA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gICAgY29uc3QgbWFwU2l6ZSA9IG1hcC5vbC5nZXRTaXplKCk7XHJcbiAgICBjb25zdCBleHRlbnQgPSBtYXAub2wuZ2V0VmlldygpLmNhbGN1bGF0ZUV4dGVudChtYXBTaXplKTtcclxuXHJcbiAgICBjb25zdCB3aWR0aFBpeGVscyA9IE1hdGgucm91bmQoKHNpemVbMF0gKiByZXNvbHV0aW9uKSAvIDI1LjQpO1xyXG4gICAgY29uc3QgaGVpZ2h0UGl4ZWxzID0gTWF0aC5yb3VuZCgoc2l6ZVsxXSAqIHJlc29sdXRpb24pIC8gMjUuNCk7XHJcblxyXG4gICAgbGV0IHRpbWVvdXQ7XHJcblxyXG4gICAgbWFwLm9sLm9uY2UoJ3Bvc3Rjb21wb3NlJywgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgY2FudmFzID0gZXZlbnQuY29udGV4dC5jYW52YXM7XHJcbiAgICAgIGNvbnN0IG1hcFN0YXR1cyQkID0gbWFwLnN0YXR1cyQuc3Vic2NyaWJlKChtYXBTdGF0dXM6IFN1YmplY3RTdGF0dXMpID0+IHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcblxyXG4gICAgICAgIGlmIChtYXBTdGF0dXMgIT09IFN1YmplY3RTdGF0dXMuRG9uZSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWFwU3RhdHVzJCQudW5zdWJzY3JpYmUoKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN1YmplY3RTdGF0dXMuRG9uZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgdGhpcy5hZGRDYW52YXMoZG9jLCBjYW52YXMsIG1hcmdpbnMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgc3RhdHVzID0gU3ViamVjdFN0YXR1cy5FcnJvcjtcclxuICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZXJyb3IoXHJcbiAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICdpZ28uZ2VvLnByaW50Rm9ybS5jb3JzRXJyb3JNZXNzYWdlQm9keSdcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgJ2lnby5nZW8ucHJpbnRGb3JtLmNvcnNFcnJvck1lc3NhZ2VIZWFkZXInXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICdwcmludCdcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlck1hcChtYXAsIG1hcFNpemUsIGV4dGVudCk7XHJcbiAgICAgICAgc3RhdHVzJC5uZXh0KHN0YXR1cyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gSWYgbm8gbG9hZGluZyBhcyBzdGFydGVkIGFmdGVyIDIwMG1zLCB0aGVuIHByb2JhYmx5IG5vIGxvYWRpbmdcclxuICAgICAgLy8gaXMgcmVxdWlyZWQuXHJcbiAgICAgIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbWFwU3RhdHVzJCQudW5zdWJzY3JpYmUoKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN1YmplY3RTdGF0dXMuRG9uZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgdGhpcy5hZGRDYW52YXMoZG9jLCBjYW52YXMsIG1hcmdpbnMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgc3RhdHVzID0gU3ViamVjdFN0YXR1cy5FcnJvcjtcclxuICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZXJyb3IoXHJcbiAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICdpZ28uZ2VvLnByaW50Rm9ybS5jb3JzRXJyb3JNZXNzYWdlQm9keSdcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgJ2lnby5nZW8ucHJpbnRGb3JtLmNvcnNFcnJvck1lc3NhZ2VIZWFkZXInXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICdwcmludCdcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlck1hcChtYXAsIG1hcFNpemUsIGV4dGVudCk7XHJcbiAgICAgICAgc3RhdHVzJC5uZXh0KHN0YXR1cyk7XHJcbiAgICAgIH0sIDIwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnJlbmRlck1hcChtYXAsIFt3aWR0aFBpeGVscywgaGVpZ2h0UGl4ZWxzXSwgZXh0ZW50KTtcclxuXHJcbiAgICByZXR1cm4gc3RhdHVzJDtcclxuICB9XHJcblxyXG4gIGRlZmluZU5iRmlsZVRvUHJvY2VzcyhuYkZpbGVUb1Byb2Nlc3MpIHtcclxuICAgIHRoaXMubmJGaWxlVG9Qcm9jZXNzID0gbmJGaWxlVG9Qcm9jZXNzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRG93bmxvYWQgYW4gaW1hZ2Ugb2YgdGhlIG1hcCB3aXRoIGFkZGl0aW9uIG9mIGluZm9ybWF0aW9uc1xyXG4gICAqIEBwYXJhbSAgbWFwIC0gTWFwIG9mIHRoZSBhcHBcclxuICAgKiBAcGFyYW0gIGZvcm1hdCAtIEltYWdlIGZvcm1hdC4gZGVmYXVsdCB2YWx1ZSB0byBcInBuZ1wiXHJcbiAgICogQHBhcmFtICBwcm9qZWN0aW9uIC0gSW5kaWNhdGUgaWYgcHJvamVjdGlvbiBuZWVkIHRvIGJlIGFkZC4gRGVmYXVsdCB0byBmYWxzZVxyXG4gICAqIEBwYXJhbSAgc2NhbGUgLSBJbmRpY2F0ZSBpZiBzY2FsZSBuZWVkIHRvIGJlIGFkZC4gRGVmYXVsdCB0byBmYWxzZVxyXG4gICAqIEBwYXJhbSAgbGVnZW5kIC0gSW5kaWNhdGUgaWYgdGhlIGxlZ2VuZCBvZiBsYXllcnMgbmVlZCB0byBiZSBkb3dubG9hZC4gRGVmYXVsdCB0byBmYWxzZVxyXG4gICAqIEBwYXJhbSAgdGl0bGUgLSBUaXRsZSB0byBhZGQgZm9yIHRoZSBtYXAgLSBEZWZhdWx0IHRvIGJsYW5rXHJcbiAgICogQHBhcmFtICBjb21tZW50IC0gQ29tbWVudCB0byBhZGQgZm9yIHRoZSBtYXAgLSBEZWZhdWx0IHRvIGJsYW5rXHJcbiAgICogQHBhcmFtICBkb1ppcEZpbGUgLSBJbmRpY2F0ZSBpZiB3ZSBkbyBhIHppcCB3aXRoIHRoZSBmaWxlXHJcbiAgICogQHJldHVybiBJbWFnZSBmaWxlIG9mIHRoZSBtYXAgd2l0aCBleHRlbnNpb24gZm9ybWF0IGdpdmVuIGFzIHBhcmFtZXRlclxyXG4gICAqL1xyXG4gIGRvd25sb2FkTWFwSW1hZ2UoXHJcbiAgICBtYXA6IElnb01hcCxcclxuICAgIHJlc29sdXRpb246IG51bWJlcixcclxuICAgIGZvcm1hdCA9ICdwbmcnLFxyXG4gICAgcHJvamVjdGlvbiA9IGZhbHNlLFxyXG4gICAgc2NhbGUgPSBmYWxzZSxcclxuICAgIGxlZ2VuZCA9IGZhbHNlLFxyXG4gICAgdGl0bGUgPSAnJyxcclxuICAgIGNvbW1lbnQgPSAnJyxcclxuICAgIGRvWmlwRmlsZSA9IHRydWVcclxuICApIHtcclxuICAgIGNvbnN0IHN0YXR1cyQgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgLy8gY29uc3QgcmVzb2x1dGlvbiA9IG1hcC5vbC5nZXRWaWV3KCkuZ2V0UmVzb2x1dGlvbigpO1xyXG4gICAgdGhpcy5hY3Rpdml0eUlkID0gdGhpcy5hY3Rpdml0eVNlcnZpY2UucmVnaXN0ZXIoKTtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgIG1hcC5vbC5vbmNlKCdwb3N0Y29tcG9zZScsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIGZvcm1hdCA9IGZvcm1hdC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBjb25zdCBjb250ZXh0ID0gZXZlbnQuY29udGV4dDtcclxuICAgICAgY29uc3QgbmV3Q2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgIGNvbnN0IG5ld0NvbnRleHQgPSBuZXdDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgLy8gUG9zdGlvbiBpbiBoZWlnaHQgdG8gc2V0IHRoZSBjYW52YXMgaW4gbmV3IGNhbnZhc1xyXG4gICAgICBsZXQgcG9zaXRpb25IQ2FudmFzID0gMDtcclxuICAgICAgLy8gUG9zaXRpb24gaW4gd2lkdGggdG8gc2V0IHRoZSBQcm9qL1NjYWxlIGluIG5ldyBjYW52YXNcclxuICAgICAgbGV0IHBvc2l0aW9uV1Byb2pTY2FsZSA9IDEwO1xyXG4gICAgICAvLyBHZXQgaGVpZ2h0L3dpZHRoIG9mIG1hcCBjYW52YXNcclxuICAgICAgY29uc3Qgd2lkdGggPSBjb250ZXh0LmNhbnZhcy53aWR0aDtcclxuICAgICAgbGV0IGhlaWdodCA9IGNvbnRleHQuY2FudmFzLmhlaWdodDtcclxuICAgICAgLy8gU2V0IEZvbnQgdG8gY2FsY3VsYXRlIGNvbW1lbnQgd2lkdGhcclxuICAgICAgbmV3Q29udGV4dC5mb250ID0gJzIwcHggQ2FsaWJyaSc7XHJcbiAgICAgIGNvbnN0IGNvbW1lbnRXaWR0aCA9IG5ld0NvbnRleHQubWVhc3VyZVRleHQoY29tbWVudCkud2lkdGg7XHJcbiAgICAgIC8vIEFkZCBoZWlnaHQgZm9yIHRpdGxlIGlmIGRlZmluZWRcclxuICAgICAgaGVpZ2h0ID0gdGl0bGUgIT09ICcnID8gaGVpZ2h0ICsgMzAgOiBoZWlnaHQ7XHJcbiAgICAgIC8vIEFkZCBoZWlnaHQgZm9yIHByb2plY3Rpb24gb3Igc2NhbGUgKHNhbWUgbGluZSkgaWYgZGVmaW5lZFxyXG4gICAgICBoZWlnaHQgPSBwcm9qZWN0aW9uICE9PSBmYWxzZSB8fCBzY2FsZSAhPT0gZmFsc2UgPyBoZWlnaHQgKyAzMCA6IGhlaWdodDtcclxuICAgICAgY29uc3QgcG9zaXRpb25IUHJvalNjYWxlID0gaGVpZ2h0IC0gMTA7XHJcbiAgICAgIC8vIERlZmluZSBudW1iZXIgb2YgbGluZSBkZXBlbmRpbmcgb2YgdGhlIGNvbW1lbnQgbGVuZ3RoXHJcbiAgICAgIGNvbnN0IGNvbW1lbnROYkxpbmUgPSBNYXRoLmNlaWwoY29tbWVudFdpZHRoIC8gd2lkdGgpO1xyXG4gICAgICAvLyBBZGQgaGVpZ2h0IGZvciBtdWx0aWxpbmUgY29tbWVudCBpZiBkZWZpbmVkXHJcbiAgICAgIGhlaWdodCA9IGNvbW1lbnQgIT09ICcnID8gaGVpZ2h0ICsgY29tbWVudE5iTGluZSAqIDMwIDogaGVpZ2h0O1xyXG4gICAgICBsZXQgcG9zaXRpb25IQ29tbWVudCA9IGhlaWdodCAtIGNvbW1lbnROYkxpbmUgKiAyMCArIDU7XHJcbiAgICAgIC8vIFNldCB0aGUgbmV3IGNhbnZhcyB3aXRoIHRoZSBuZXcgY2FsY3VsYXRlZCBzaXplXHJcbiAgICAgIG5ld0NhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICBuZXdDYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAvLyBQYXRjaCBKcGVnIGRlZmF1bHQgYmxhY2sgYmFja2dyb3VuZCB0byB3aGl0ZVxyXG4gICAgICBpZiAoZm9ybWF0ID09PSAnanBlZycpIHtcclxuICAgICAgICBuZXdDb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmZmZmJztcclxuICAgICAgICBuZXdDb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIG5ld0NvbnRleHQuZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIElmIGEgdGl0bGUgbmVlZCB0byBiZSBhZGRlZCB0byBjYW52YXNcclxuICAgICAgaWYgKHRpdGxlICE9PSAnJykge1xyXG4gICAgICAgIC8vIFNldCBmb250IGZvciB0aXRsZVxyXG4gICAgICAgIG5ld0NvbnRleHQuZm9udCA9ICcyNnB4IENhbGlicmknO1xyXG4gICAgICAgIHBvc2l0aW9uSENhbnZhcyA9IDMwO1xyXG4gICAgICAgIG5ld0NvbnRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XHJcbiAgICAgICAgbmV3Q29udGV4dC5maWxsVGV4dCh0aXRsZSwgd2lkdGggLyAyLCAyMCk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gU2V0IGZvbnQgZm9yIG5leHQgc2VjdGlvblxyXG4gICAgICBuZXdDb250ZXh0LmZvbnQgPSAnMjBweCBDYWxpYnJpJztcclxuICAgICAgLy8gSWYgcHJvamVjdGlvbiBuZWVkIHRvIGJlIGFkZGVkIHRvIGNhbnZhc1xyXG4gICAgICBpZiAocHJvamVjdGlvbiAhPT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBwcm9qVGV4dCA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnByaW50Rm9ybS5wcm9qZWN0aW9uJyk7XHJcbiAgICAgICAgbmV3Q29udGV4dC50ZXh0QWxpZ24gPSAnc3RhcnQnO1xyXG4gICAgICAgIG5ld0NvbnRleHQuZmlsbFRleHQoXHJcbiAgICAgICAgICBwcm9qVGV4dCArICc6ICcgKyBtYXAucHJvamVjdGlvbixcclxuICAgICAgICAgIHBvc2l0aW9uV1Byb2pTY2FsZSxcclxuICAgICAgICAgIHBvc2l0aW9uSFByb2pTY2FsZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcG9zaXRpb25XUHJvalNjYWxlICs9IDIwMDsgLy8gV2lkdGggcG9zaXRpb24gY2hhbmdlIGZvciBzY2FsZSBwb3NpdGlvblxyXG4gICAgICB9XHJcbiAgICAgIC8vIElmIHNjYWxlIG5lZWQgdG8gYmUgYWRkZWQgdG8gY2FudmFzXHJcbiAgICAgIGlmIChzY2FsZSAhPT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBzY2FsZVRleHQgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5wcmludEZvcm0uc2NhbGUnKTtcclxuICAgICAgICBjb25zdCBtYXBTY2FsZSA9IG1hcC52aWV3Q29udHJvbGxlci5nZXRTY2FsZShyZXNvbHV0aW9uKTtcclxuICAgICAgICBuZXdDb250ZXh0LnRleHRBbGlnbiA9ICdzdGFydCc7XHJcbiAgICAgICAgbmV3Q29udGV4dC5maWxsVGV4dChcclxuICAgICAgICAgIHNjYWxlVGV4dCArICcgfiAxIDogJyArIGZvcm1hdFNjYWxlKG1hcFNjYWxlKSxcclxuICAgICAgICAgIHBvc2l0aW9uV1Byb2pTY2FsZSxcclxuICAgICAgICAgIHBvc2l0aW9uSFByb2pTY2FsZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gSWYgYSBjb21tZW50IG5lZWQgdG8gYmUgYWRkZWQgdG8gY2FudmFzXHJcbiAgICAgIGlmIChjb21tZW50ICE9PSAnJykge1xyXG4gICAgICAgIG5ld0NvbnRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XHJcbiAgICAgICAgLy8gSWYgb25seSBvbmUgbGluZSwgbm8gbmVlZCB0byBtdWx0aWxpbmUgdGhlIGNvbW1lbnRcclxuICAgICAgICBpZiAoY29tbWVudE5iTGluZSA9PT0gMSkge1xyXG4gICAgICAgICAgbmV3Q29udGV4dC5maWxsVGV4dChjb21tZW50LCB3aWR0aCAvIDIsIHBvc2l0aW9uSENvbW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBTZXBhcmF0ZSB0aGUgc2V0ZW5zZXMgdG8gYmUgYXBwcm94LiB0aGUgc2FtZSBsZW5ndGhcclxuICAgICAgICAgIGNvbnN0IG5iQ29tbWVudENoYXIgPSBjb21tZW50Lmxlbmd0aDtcclxuICAgICAgICAgIGNvbnN0IENvbW1lbnRMZW5ndGhUb0N1dCA9IE1hdGguZmxvb3IobmJDb21tZW50Q2hhciAvIGNvbW1lbnROYkxpbmUpO1xyXG4gICAgICAgICAgbGV0IGNvbW1lbnRDdXJyZW50TGluZSA9ICcnO1xyXG4gICAgICAgICAgbGV0IHBvc2l0aW9uRmlyc3RDdXRDaGFyID0gMDtcclxuICAgICAgICAgIGxldCBwb3NpdGlvbkxhc3RCbGFuaztcclxuICAgICAgICAgIC8vIExvb3AgZm9yIHRoZSBudW1iZXIgb2YgbGluZSBjYWxjdWxhdGVkXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbW1lbnROYkxpbmU7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBGb3IgYWxsIGxpbmUgZXhjZXB0IGxhc3RcclxuICAgICAgICAgICAgaWYgKGNvbW1lbnROYkxpbmUgLSAxID4gaSkge1xyXG4gICAgICAgICAgICAgIC8vIEdldCBjb21tZW50IGN1cnJlbnQgbGluZSB0byBmaW5kIHRoZSByaWdodCBwbGFjZSB0dSBjdXQgY29tbWVudFxyXG4gICAgICAgICAgICAgIGNvbW1lbnRDdXJyZW50TGluZSA9IGNvbW1lbnQuc3Vic3RyKFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25GaXJzdEN1dENoYXIsXHJcbiAgICAgICAgICAgICAgICBDb21tZW50TGVuZ3RoVG9DdXRcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIC8vIEN1dCB0aGUgc2V0ZW5jZSBhdCBibGFua1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uTGFzdEJsYW5rID0gY29tbWVudEN1cnJlbnRMaW5lLmxhc3RJbmRleE9mKCcgJyk7XHJcbiAgICAgICAgICAgICAgbmV3Q29udGV4dC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgIGNvbW1lbnRDdXJyZW50TGluZS5zdWJzdHIoMCwgcG9zaXRpb25MYXN0QmxhbmspLFxyXG4gICAgICAgICAgICAgICAgd2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25IQ29tbWVudFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb25GaXJzdEN1dENoYXIgKz0gcG9zaXRpb25MYXN0Qmxhbms7XHJcbiAgICAgICAgICAgICAgLy8gR28gdG8gbmV4dCBsaW5lIGZvciBpbnNlcnRpb25cclxuICAgICAgICAgICAgICBwb3NpdGlvbkhDb21tZW50ICs9IDIwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIERvbid0IGN1dCBsYXN0IHBhcnRcclxuICAgICAgICAgICAgICBuZXdDb250ZXh0LmZpbGxUZXh0KFxyXG4gICAgICAgICAgICAgICAgY29tbWVudC5zdWJzdHIocG9zaXRpb25GaXJzdEN1dENoYXIpLFxyXG4gICAgICAgICAgICAgICAgd2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25IQ29tbWVudFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gQWRkIG1hcCB0byBuZXcgY2FudmFzXHJcbiAgICAgIG5ld0NvbnRleHQuZHJhd0ltYWdlKGNvbnRleHQuY2FudmFzLCAwLCBwb3NpdGlvbkhDYW52YXMpO1xyXG5cclxuICAgICAgbGV0IHN0YXR1cyA9IFN1YmplY3RTdGF0dXMuRG9uZTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICAvLyBTYXZlIHRoZSBjYW52YXMgYXMgZmlsZVxyXG4gICAgICAgIGlmICghZG9aaXBGaWxlKSB7XHJcbiAgICAgICAgICB0aGlzLnNhdmVDYW52YXNJbWFnZUFzRmlsZShuZXdDYW52YXMsICdtYXAnLCBmb3JtYXQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0LnRvTG93ZXJDYXNlKCkgPT09ICd0aWZmJykge1xyXG4gICAgICAgICAgLy8gQWRkIHRoZSBjYW52YXMgdG8gemlwXHJcbiAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FudmFGaWxlVG9aaXAoXHJcbiAgICAgICAgICAgIG5ld0NhbnZhcyxcclxuICAgICAgICAgICAgJ21hcCcgKyBtYXAucHJvamVjdGlvbi5yZXBsYWNlKCc6JywgJ18nKSArICcuJyArIGZvcm1hdFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gQWRkIHRoZSBjYW52YXMgdG8gemlwXHJcbiAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FudmFGaWxlVG9aaXAobmV3Q2FudmFzLCAnbWFwJyArICcuJyArIGZvcm1hdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBzdGF0dXMgPSBTdWJqZWN0U3RhdHVzLkVycm9yO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdGF0dXMkLm5leHQoc3RhdHVzKTtcclxuXHJcbiAgICAgIGlmIChmb3JtYXQudG9Mb3dlckNhc2UoKSA9PT0gJ3RpZmYnKSB7XHJcbiAgICAgICAgY29uc3QgdGl3Q29udGVudCA9IHRoaXMuZ2V0V29ybGRGaWxlSW5mb3JtYXRpb24obWFwKTtcclxuICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3Rpd0NvbnRlbnRdLCB7XHJcbiAgICAgICAgICB0eXBlOiAndGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghZG9aaXBGaWxlKSB7XHJcbiAgICAgICAgICAvLyBzYXZlQXMgYXV0b21hdGljbHkgcmVwbGFjZSAnOicgZm9yICdfJ1xyXG4gICAgICAgICAgc2F2ZUFzKGJsb2IsICdtYXAnICsgbWFwLnByb2plY3Rpb24gKyAnLnRmdycpO1xyXG4gICAgICAgICAgdGhpcy5zYXZlRmlsZVByb2Nlc3NpbmcoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gQWRkIHRoZSBjYW52YXMgdG8gemlwXHJcbiAgICAgICAgICB0aGlzLmFkZEZpbGVUb1ppcChcclxuICAgICAgICAgICAgJ21hcCcgKyBtYXAucHJvamVjdGlvbi5yZXBsYWNlKCc6JywgJ18nKSArICcudGZ3JyxcclxuICAgICAgICAgICAgYmxvYlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbWFwLm9sLnJlbmRlclN5bmMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVuZGVyTWFwKG1hcCwgc2l6ZSwgZXh0ZW50KSB7XHJcbiAgICBtYXAub2wucmVuZGVyU3luYygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2F2ZSBkb2N1bWVudFxyXG4gICAqIEBwYXJhbSAgZG9jIC0gRG9jdW1lbnQgdG8gc2F2ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2F2ZURvYyhkb2M6IGpzUERGKSB7XHJcbiAgICBkb2Muc2F2ZSgnbWFwLnBkZicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlIHRoZSBiZXN0IEltYWdlIHNpemUgdG8gZml0IGluIHBkZlxyXG4gICAqIEBwYXJhbSBkb2MgLSBQZGYgRG9jdW1lbnRcclxuICAgKiBAcGFyYW0gY2FudmFzIC0gQ2FudmFzIG9mIGltYWdlXHJcbiAgICogQHBhcmFtIG1hcmdpbnMgLSBQYWdlIG1hcmdpbnNcclxuICAgKi9cclxuICBwcml2YXRlIGdldEltYWdlU2l6ZVRvRml0UGRmKGRvYywgY2FudmFzLCBtYXJnaW5zKSB7XHJcbiAgICAvLyBEZWZpbmUgdmFyaWFibGUgdG8gY2FsY3VsYXRlIGJlc3Qgc2l6ZSB0byBmaXQgaW4gb25lIHBhZ2VcclxuICAgIGNvbnN0IHBhZ2VIZWlnaHQgPVxyXG4gICAgICBkb2MuaW50ZXJuYWwucGFnZVNpemUuZ2V0SGVpZ2h0KCkgLSAobWFyZ2luc1swXSArIG1hcmdpbnNbMl0pO1xyXG4gICAgY29uc3QgcGFnZVdpZHRoID1cclxuICAgICAgZG9jLmludGVybmFsLnBhZ2VTaXplLmdldFdpZHRoKCkgLSAobWFyZ2luc1sxXSArIG1hcmdpbnNbM10pO1xyXG4gICAgY29uc3QgY2FuSGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIGNvbnN0IGNhbldpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgY29uc3QgaGVpZ2h0UmF0aW8gPSBjYW5IZWlnaHQgLyBwYWdlSGVpZ2h0O1xyXG4gICAgY29uc3Qgd2lkdGhSYXRpbyA9IGNhbldpZHRoIC8gcGFnZVdpZHRoO1xyXG4gICAgY29uc3QgbWF4UmF0aW8gPSBoZWlnaHRSYXRpbyA+IHdpZHRoUmF0aW8gPyBoZWlnaHRSYXRpbyA6IHdpZHRoUmF0aW87XHJcbiAgICBjb25zdCBpbWdIZWlnaCA9IG1heFJhdGlvID4gMSA/IGNhbkhlaWdodCAvIG1heFJhdGlvIDogY2FuSGVpZ2h0O1xyXG4gICAgY29uc3QgaW1nV2lkdGggPSBtYXhSYXRpbyA+IDEgPyBjYW5XaWR0aCAvIG1heFJhdGlvIDogY2FuV2lkdGg7XHJcblxyXG4gICAgcmV0dXJuIFtpbWdXaWR0aCwgaW1nSGVpZ2hdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGEgd29ybGQgZmlsZSBpbmZvcm1hdGlvbiBmb3IgdGlmZlxyXG4gICAqIEBwYXJhbSAgbWFwIC0gTWFwIG9mIHRoZSBhcHBcclxuICAgKi9cclxuICBwcml2YXRlIGdldFdvcmxkRmlsZUluZm9ybWF0aW9uKG1hcCkge1xyXG4gICAgY29uc3QgY3VycmVudFJlc29sdXRpb24gPSBtYXAudmlld0NvbnRyb2xsZXIuZ2V0UmVzb2x1dGlvbigpO1xyXG4gICAgY29uc3QgY3VycmVudEV4dGVudCA9IG1hcC5nZXRFeHRlbnQoKTsgLy8gUmV0dXJuIFttaW54LCBtaW55LCBtYXh4LCBtYXh5XVxyXG4gICAgcmV0dXJuIFtcclxuICAgICAgY3VycmVudFJlc29sdXRpb24sXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIC1jdXJyZW50UmVzb2x1dGlvbixcclxuICAgICAgY3VycmVudEV4dGVudFswXSArIGN1cnJlbnRSZXNvbHV0aW9uIC8gMC41LFxyXG4gICAgICBjdXJyZW50RXh0ZW50WzNdIC0gY3VycmVudFJlc29sdXRpb24gLyAwLjVcclxuICAgIF0uam9pbignXFxuJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTYXZlIGNhbnZhcyBpbWFnZSBhcyBmaWxlXHJcbiAgICogQHBhcmFtIGNhbnZhcyAtIENhbnZhcyB0byBzYXZlXHJcbiAgICogQHBhcmFtIG5hbWUgLSBOYW1lIG9mIHRoZSBmaWxlXHJcbiAgICogQHBhcmFtIGZvcm1hdCAtIGZpbGUgZm9ybWF0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzYXZlQ2FudmFzSW1hZ2VBc0ZpbGUoY2FudmFzLCBuYW1lLCBmb3JtYXQpIHtcclxuICAgIGNvbnN0IGJsb2JGb3JtYXQgPSAnaW1hZ2UvJyArIGZvcm1hdDtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNhbnZhcy50b0RhdGFVUkwoKTsgLy8gSnVzdCB0byBtYWtlIHRoZSBjYXRjaCB0cmlnZ2VyIHdpaHRvdXQgdG9CbG9iIEVycm9yIHRocm93IG5vdCBjYXRjaGVkXHJcbiAgICAgIC8vIElmIG5hdmlnYXRvciBpcyBJbnRlcm5ldCBFeHBsb3JlclxyXG4gICAgICBpZiAobmF2aWdhdG9yLm1zU2F2ZUJsb2IpIHtcclxuICAgICAgICBuYXZpZ2F0b3IubXNTYXZlQmxvYihjYW52YXMubXNUb0Jsb2IoKSwgbmFtZSArICcuJyArIGZvcm1hdCk7XHJcbiAgICAgICAgdGhpcy5zYXZlRmlsZVByb2Nlc3NpbmcoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjYW52YXMudG9CbG9iKGJsb2IgPT4ge1xyXG4gICAgICAgICAgLy8gZG93bmxvYWQgaW1hZ2VcclxuICAgICAgICAgIHNhdmVBcyhibG9iLCBuYW1lICsgJy4nICsgZm9ybWF0KTtcclxuICAgICAgICAgIHRoYXQuc2F2ZUZpbGVQcm9jZXNzaW5nKCk7XHJcbiAgICAgICAgfSwgYmxvYkZvcm1hdCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmVycm9yKFxyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgJ2lnby5nZW8ucHJpbnRGb3JtLmNvcnNFcnJvck1lc3NhZ2VCb2R5J1xyXG4gICAgICAgICksXHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAnaWdvLmdlby5wcmludEZvcm0uY29yc0Vycm9yTWVzc2FnZUhlYWRlcidcclxuICAgICAgICApLFxyXG4gICAgICAgICdwcmludCdcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBmaWxlIHRvIGEgemlwXHJcbiAgICogQHBhcmFtIGNhbnZhcyAtIEZpbGUgdG8gYWRkIHRvIHRoZSB6aXBcclxuICAgKiBAcGFyYW0gIG5hbWUgLU5hbWUgb2YgdGhlIGZpbGVvdmVydmlld1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2VuZXJhdGVDYW52YUZpbGVUb1ppcChjYW52YXMsIG5hbWUpIHtcclxuICAgIGNvbnN0IGJsb2JGb3JtYXQgPSAnaW1hZ2UvJyArICdqcGVnJztcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy5oYXNPd25Qcm9wZXJ0eSgnemlwRmlsZScpIHx8XHJcbiAgICAgIHR5cGVvZiB0aGlzLnppcEZpbGUgPT09ICd1bmRlZmluZWQnXHJcbiAgICApIHtcclxuICAgICAgdGhpcy56aXBGaWxlID0gbmV3IEpTWmlwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY2FudmFzLnRvRGF0YVVSTCgpOyAvLyBKdXN0IHRvIG1ha2UgdGhlIGNhdGNoIHRyaWdnZXIgd2lodG91dCB0b0Jsb2IgRXJyb3IgdGhyb3cgbm90IGNhdGNoZWRcclxuICAgICAgaWYgKG5hdmlnYXRvci5tc1NhdmVCbG9iKSB7XHJcbiAgICAgICAgdGhpcy5hZGRGaWxlVG9aaXAobmFtZSwgY2FudmFzLm1zVG9CbG9iKCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNhbnZhcy50b0Jsb2IoYmxvYiA9PiB7XHJcbiAgICAgICAgICB0aGF0LmFkZEZpbGVUb1ppcChuYW1lLCBibG9iKTtcclxuICAgICAgICB9LCBibG9iRm9ybWF0KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZXJyb3IoXHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAnaWdvLmdlby5wcmludEZvcm0uY29yc0Vycm9yTWVzc2FnZUJvZHknXHJcbiAgICAgICAgKSxcclxuICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICdpZ28uZ2VvLnByaW50Rm9ybS5jb3JzRXJyb3JNZXNzYWdlSGVhZGVyJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ3ByaW50J1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGZpbGUgdG8gemlwLCBpZiBhbGwgZmlsZSBhcmUgemlwcGVkLCBkb3dubG9hZFxyXG4gICAqIEBwYXJhbSBuYW1lIC0gTmFtZSBvZiB0aGUgZmlsZXNcclxuICAgKiBAcGFyYW0gYmxvYiAtIENvbnRhaW4gb2YgZmlsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkRmlsZVRvWmlwKG5hbWUsIGJsb2IpIHtcclxuICAgIC8vIGFkZCBmaWxlIHRvIHppcFxyXG4gICAgdGhpcy56aXBGaWxlLmZpbGUobmFtZSwgYmxvYik7XHJcbiAgICB0aGlzLm5iRmlsZVRvUHJvY2Vzcy0tO1xyXG5cclxuICAgIC8vIElmIGFsbCBmaWxlcyBhcmUgcHJvY2Nlc3NlZFxyXG4gICAgaWYgKHRoaXMubmJGaWxlVG9Qcm9jZXNzID09PSAwKSB7XHJcbiAgICAgIC8vIERvd25sb2FkIHppcCBmaWxlXHJcbiAgICAgIHRoaXMuZ2V0WmlwRmlsZSgpO1xyXG4gICAgICAvLyBTdG9wIGxvYWRpbmdcclxuICAgICAgdGhpcy5hY3Rpdml0eVNlcnZpY2UudW5yZWdpc3Rlcih0aGlzLmFjdGl2aXR5SWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzYXZlRmlsZVByb2Nlc3NpbmcoKSB7XHJcbiAgICB0aGlzLm5iRmlsZVRvUHJvY2Vzcy0tO1xyXG5cclxuICAgIC8vIElmIGFsbCBmaWxlcyBhcmUgcHJvY2Nlc3NlZFxyXG4gICAgaWYgKHRoaXMubmJGaWxlVG9Qcm9jZXNzID09PSAwKSB7XHJcbiAgICAgIC8vIFN0b3AgbG9hZGluZ1xyXG4gICAgICB0aGlzLmFjdGl2aXR5U2VydmljZS51bnJlZ2lzdGVyKHRoaXMuYWN0aXZpdHlJZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHppcHBlZCBmaWxlXHJcbiAgICogQHJldHVybiBSZXR1biBhIHppcCBmaWxlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRaaXBGaWxlKCkge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICB0aGlzLnppcEZpbGUuZ2VuZXJhdGVBc3luYyh7IHR5cGU6ICdibG9iJyB9KS50aGVuKGJsb2IgPT4ge1xyXG4gICAgICAvLyAxKSBnZW5lcmF0ZSB0aGUgemlwIGZpbGVcclxuICAgICAgc2F2ZUFzKGJsb2IsICdtYXAuemlwJyk7XHJcbiAgICAgIGRlbGV0ZSB0aGF0LnppcEZpbGU7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19