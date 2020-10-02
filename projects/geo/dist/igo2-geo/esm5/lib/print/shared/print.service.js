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
            html2canvas(div, { useCORS: true })
                .then((/**
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
            }))
                .catch((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                console.log(e);
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
            textProjScale += scaleText + ': ~ 1 / ' + formatScale(mapScale);
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
        html2canvas(div, { useCORS: true })
            .then((/**
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
        }))
            .catch((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            console.log(e);
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
     * @protected
     * @param {?} doc - Document to save
     * @return {?}
     */
    PrintService.prototype.saveDoc = /**
     * Save document
     * @protected
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
        var currentExtent = map.viewController.getExtent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9wcmludC9zaGFyZWQvcHJpbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxLQUFLLFlBQVksTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFL0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHOUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXpELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7O0lBSTVELFdBQVcsR0FBRyxZQUFZO0FBRWhDO0lBT0Usc0JBQ1UsY0FBOEIsRUFDOUIsZUFBZ0MsRUFDaEMsZUFBZ0M7UUFGaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDdkMsQ0FBQzs7Ozs7O0lBRUosNEJBQUs7Ozs7O0lBQUwsVUFBTSxHQUFXLEVBQUUsT0FBcUI7UUFBeEMsaUJBMERDOztZQXpETyxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUU7O1lBRXZCLFdBQVcsR0FBVyxPQUFPLENBQUMsV0FBVzs7WUFDekMsVUFBVSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVU7OztZQUNoQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVc7UUFFdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDOztZQUM1QyxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUM7WUFDcEIsV0FBVyxhQUFBO1lBQ1gsTUFBTSxFQUFFLFdBQVcsQ0FBQyxXQUFXLEVBQUU7U0FDbEMsQ0FBQzs7WUFFSSxVQUFVLEdBQUc7WUFDakIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSztZQUMzQixHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNO1NBQzdCOztZQUVLLE9BQU8sR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7WUFDMUIsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQzs7WUFDL0MsTUFBTSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQzs7WUFDaEQsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztRQUU1QixJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEQ7UUFFRCxJQUFJLE9BQU8sQ0FBQyxjQUFjLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxZQUFZLENBQ2YsR0FBRyxFQUNILEdBQUcsRUFDSCxVQUFVLEVBQ1YsT0FBTyxDQUFDLGNBQWMsRUFDdEIsT0FBTyxDQUFDLFNBQVMsQ0FDbEIsQ0FBQztTQUNIO1FBQ0QsSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkM7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTOzs7O1FBQ3hELFVBQUMsTUFBcUI7WUFDcEIsSUFBSSxNQUFNLEtBQUssYUFBYSxDQUFDLElBQUksRUFBRTtnQkFDakMsSUFBSSxPQUFPLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtvQkFDL0IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDL0M7cUJBQU07b0JBQ0wsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDbkI7YUFDRjtZQUVELElBQUksTUFBTSxLQUFLLGFBQWEsQ0FBQyxJQUFJLElBQUksTUFBTSxLQUFLLGFBQWEsQ0FBQyxLQUFLLEVBQUU7Z0JBQ25FLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDakQsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEM7UUFDSCxDQUFDLEVBQ0YsQ0FBQztRQUVGLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCwwQ0FBbUI7Ozs7Ozs7SUFBbkIsVUFBb0IsR0FBVyxFQUFFLEtBQWEsRUFBRSxVQUFrQjs7WUFDNUQsSUFBSSxHQUFHLEVBQUU7O1lBQ1AsT0FBTyxHQUFHLGdCQUFnQixDQUM5QixHQUFHLENBQUMsTUFBTSxFQUNWLEdBQUcsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUN4QztRQUNELElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELGtFQUFrRTtRQUNsRSxpQ0FBaUM7UUFDakMsSUFBSSxJQUFJLHdDQUF3QyxDQUFDO1FBQ2pELElBQUksSUFBSSxrQ0FBa0MsR0FBRyxLQUFLLENBQUM7UUFDbkQsSUFBSSxJQUFJLDZDQUE2QyxDQUFDO1FBQ3RELElBQUksSUFBSSxVQUFVLENBQUM7UUFDbkIsSUFBSSxJQUFJLHFDQUFxQyxDQUFDO1FBQzlDLElBQUksSUFBSSw2Q0FBNkMsR0FBRyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ3ZFLDZDQUE2QztRQUM3QyxPQUFPLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsTUFBeUI7WUFDeEMsSUFBSTtnQkFDRixrRUFBa0UsQ0FBQztZQUNyRSxJQUFJLElBQUksd0JBQXdCLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDMUQsSUFBSSxJQUFJLHlDQUF5QyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ3RFLElBQUksSUFBSSxvQkFBb0IsQ0FBQztRQUMvQixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksSUFBSSxRQUFRLENBQUM7UUFFakIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7OztJQUNILDJDQUFvQjs7Ozs7Ozs7O0lBQXBCLFVBQ0UsR0FBRyxFQUNILE1BQXNCLEVBQ3RCLFNBQWtCLEVBQ2xCLFVBQWtCO1FBRmxCLHVCQUFBLEVBQUEsY0FBc0I7O1lBSWhCLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRTs7O1lBRXZCLEtBQUssR0FBRyxHQUFHOzs7WUFDYixJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDOztZQUNyRCxJQUFJLEdBQUcsSUFBSTtRQUNqQixNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTlCLDBDQUEwQztRQUMxQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLElBQUksR0FBRyxzQ0FBc0MsQ0FBQztZQUM5QyxJQUFJLElBQUksNENBQTRDLENBQUM7U0FDdEQ7OztZQUVLLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFFaEQsNkNBQTZDO1FBQzdDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQiwyRUFBMkU7UUFDM0UsVUFBVTs7O1FBQUM7WUFDVCxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO2lCQUNoQyxJQUFJOzs7O1lBQUMsVUFBQSxNQUFNOztvQkFDTixNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUk7Z0JBQy9CLElBQUk7b0JBQ0YsSUFBSSxDQUFDLFNBQVMsRUFBRTt3QkFDZCwwQkFBMEI7d0JBQzFCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3FCQUMzRDt5QkFBTTt3QkFDTCx3QkFBd0I7d0JBQ3hCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsYUFBYSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQztxQkFDbkU7b0JBQ0QsR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7aUJBQ3pEO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNaLE1BQU0sR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO2lCQUM5QjtnQkFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsRUFBQztpQkFDRCxLQUFLOzs7O1lBQUMsVUFBQSxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEdBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDOzs7Ozs7OztJQUVPLCtCQUFROzs7Ozs7O0lBQWhCLFVBQWlCLEdBQVUsRUFBRSxLQUFhLEVBQUUsU0FBaUI7O1lBQ3JELGFBQWEsR0FBRyxFQUFFOztZQUNsQixTQUFTLEdBQUcsRUFBRTs7WUFDZCxVQUFVLEdBQUcsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTTs7WUFFbEUsZUFBZTtRQUNuQixJQUFJLFVBQVUsR0FBRyxTQUFTLEVBQUU7WUFDMUIsZUFBZSxHQUFHLENBQUMsQ0FBQztTQUNyQjthQUFNO1lBQ0wsZUFBZSxHQUFHLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoRDtRQUVELEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7Ozs7OztJQUNLLGlDQUFVOzs7Ozs7Ozs7O0lBQWxCLFVBQW1CLEdBQVUsRUFBRSxPQUFlOztZQUN0QyxXQUFXLEdBQUcsRUFBRTs7WUFDaEIsaUJBQWlCLEdBQUcsRUFBRTs7WUFDdEIsWUFBWSxHQUFHLENBQUM7O1lBQ2hCLFlBQVksR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsWUFBWTtRQUVoRSxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNEOzs7Ozs7O09BT0c7Ozs7Ozs7Ozs7O0lBQ0ssbUNBQVk7Ozs7Ozs7Ozs7SUFBcEIsVUFDRSxHQUFVLEVBQ1YsR0FBVyxFQUNYLEdBQVcsRUFDWCxVQUFtQixFQUNuQixLQUFjOztZQUVSLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVM7O1lBQzFDLGFBQWEsR0FBRyxFQUFFOztZQUNsQixtQkFBbUIsR0FBRyxFQUFFOztZQUN4QixZQUFZLEdBQUcsRUFBRTs7WUFDakIsWUFBWSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxZQUFZOztZQUU1RCxhQUFhLEdBQVcsRUFBRTtRQUM5QixJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7O2dCQUNqQixRQUFRLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztZQUNsRSxhQUFhLElBQUksUUFBUSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2xCLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtnQkFDdkIsYUFBYSxJQUFJLEtBQUssQ0FBQzthQUN4Qjs7Z0JBQ0ssU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUM7O2dCQUN4RCxRQUFRLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQ2pELGFBQWEsSUFBSSxTQUFTLEdBQUcsVUFBVSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNqRTtRQUNELEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7Ozs7SUFDSyxnQ0FBUzs7Ozs7Ozs7O0lBQWpCLFVBQ0UsR0FBVSxFQUNWLEdBQVcsRUFDWCxPQUFzQixFQUN0QixVQUFrQjtRQUpwQixpQkFxQ0M7O1lBL0JPLElBQUksR0FBRyxJQUFJOzs7WUFFWCxLQUFLLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSzs7WUFDbkMsSUFBSSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQztRQUM3RCxzQ0FBc0M7UUFDdEMsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixPQUFPLElBQUksQ0FBQztTQUNiOzs7WUFHSyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ2hELFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDaEMsSUFBSTs7OztRQUFDLFVBQUEsTUFBTTs7Z0JBQ04sT0FBTzs7Z0JBQ0wsUUFBUSxHQUFHLEVBQUU7WUFFbkIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDOztnQkFDUixTQUFTLEdBQUcsS0FBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDO1lBQ2pFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkJBQTZCO1FBQ2hFLENBQUMsRUFBQzthQUNELEtBQUs7Ozs7UUFBQyxVQUFBLENBQUM7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsRUFBQyxDQUFDO1FBRUwsNkNBQTZDO1FBQzdDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDOzs7Ozs7OztJQUVPLGdDQUFTOzs7Ozs7O0lBQWpCLFVBQ0UsR0FBVSxFQUNWLE1BQXlCLEVBQ3pCLE9BQXNCOztZQUVsQixLQUFLO1FBRVQsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFdkMsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFOztnQkFDakIsU0FBUyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztZQUNqRSxHQUFHLENBQUMsUUFBUSxDQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUNWLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFDVixTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQ1osU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUNiLENBQUM7WUFDRixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQztJQUVELDBDQUEwQzs7Ozs7Ozs7Ozs7SUFDbEMsNkJBQU07Ozs7Ozs7Ozs7O0lBQWQsVUFDRSxHQUFVLEVBQ1YsR0FBVyxFQUNYLFVBQWtCLEVBQ2xCLElBQW1CLEVBQ25CLE9BQXNCO1FBTHhCLGlCQTZFQzs7WUF0RU8sT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFOztZQUV2QixPQUFPLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7O1lBQzFCLE1BQU0sR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7O1lBRWxELFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQzs7WUFDdkQsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDOztZQUUxRCxPQUFPO1FBRVgsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYTs7OztRQUFFLFVBQUMsS0FBVTs7Z0JBQzlCLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU07O2dCQUM3QixXQUFXLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1lBQUMsVUFBQyxTQUF3QjtnQkFDakUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUV0QixJQUFJLFNBQVMsS0FBSyxhQUFhLENBQUMsSUFBSSxFQUFFO29CQUNwQyxPQUFPO2lCQUNSO2dCQUVELFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7b0JBRXRCLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSTtnQkFDL0IsSUFBSTtvQkFDRixLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ3RDO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNaLE1BQU0sR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO29CQUM3QixLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FDdkIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUNwQyx3Q0FBd0MsQ0FDekMsRUFDRCxLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQ3BDLDBDQUEwQyxDQUMzQyxFQUNELE9BQU8sQ0FDUixDQUFDO2lCQUNIO2dCQUVELEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QixDQUFDLEVBQUM7WUFFRixpRUFBaUU7WUFDakUsZUFBZTtZQUNmLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVTs7O1lBQUM7Z0JBQzFCLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7b0JBRXRCLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSTtnQkFDL0IsSUFBSTtvQkFDRixLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ3RDO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNaLE1BQU0sR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO29CQUM3QixLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FDdkIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUNwQyx3Q0FBd0MsQ0FDekMsRUFDRCxLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQ3BDLDBDQUEwQyxDQUMzQyxFQUNELE9BQU8sQ0FDUixDQUFDO2lCQUNIO2dCQUVELEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QixDQUFDLEdBQUUsR0FBRyxDQUFDLENBQUM7UUFDVixDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXpELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRUQsNENBQXFCOzs7O0lBQXJCLFVBQXNCLGVBQWU7UUFDbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHOzs7Ozs7Ozs7Ozs7OztJQUNILHVDQUFnQjs7Ozs7Ozs7Ozs7OztJQUFoQixVQUNFLEdBQVcsRUFDWCxVQUFrQixFQUNsQixNQUFjLEVBQ2QsVUFBa0IsRUFDbEIsS0FBYSxFQUNiLE1BQWMsRUFDZCxLQUFVLEVBQ1YsT0FBWSxFQUNaLFNBQWdCO1FBVGxCLGlCQXVLQztRQXBLQyx1QkFBQSxFQUFBLGNBQWM7UUFDZCwyQkFBQSxFQUFBLGtCQUFrQjtRQUNsQixzQkFBQSxFQUFBLGFBQWE7UUFDYix1QkFBQSxFQUFBLGNBQWM7UUFDZCxzQkFBQSxFQUFBLFVBQVU7UUFDVix3QkFBQSxFQUFBLFlBQVk7UUFDWiwwQkFBQSxFQUFBLGdCQUFnQjs7WUFFVixPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUU7UUFDN0IsdURBQXVEO1FBQ3ZELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7WUFDNUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUztRQUNoRCxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhOzs7O1FBQUUsVUFBQyxLQUFVO1lBQ3BDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7O2dCQUN4QixPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU87O2dCQUN2QixTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7O2dCQUM1QyxVQUFVLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7OztnQkFFekMsZUFBZSxHQUFHLENBQUM7OztnQkFFbkIsa0JBQWtCLEdBQUcsRUFBRTs7O2dCQUVyQixLQUFLLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLOztnQkFDOUIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUNsQyxzQ0FBc0M7WUFDdEMsVUFBVSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUM7O2dCQUMzQixZQUFZLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLO1lBQzFELGtDQUFrQztZQUNsQyxNQUFNLEdBQUcsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzdDLDREQUE0RDtZQUM1RCxNQUFNLEdBQUcsVUFBVSxLQUFLLEtBQUssSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7O2dCQUNsRSxrQkFBa0IsR0FBRyxNQUFNLEdBQUcsRUFBRTs7O2dCQUVoQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ3JELDhDQUE4QztZQUM5QyxNQUFNLEdBQUcsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLGFBQWEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQzs7Z0JBQzNELGdCQUFnQixHQUFHLE1BQU0sR0FBRyxhQUFhLEdBQUcsRUFBRSxHQUFHLENBQUM7WUFDdEQsa0RBQWtEO1lBQ2xELFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQzFCLCtDQUErQztZQUMvQyxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7Z0JBQ3JCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN6QyxVQUFVLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzthQUNsQztZQUNELHdDQUF3QztZQUN4QyxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7Z0JBQ2hCLHFCQUFxQjtnQkFDckIsVUFBVSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUM7Z0JBQ2pDLGVBQWUsR0FBRyxFQUFFLENBQUM7Z0JBQ3JCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO2dCQUNoQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQzNDO1lBQ0QsNEJBQTRCO1lBQzVCLFVBQVUsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO1lBQ2pDLDJDQUEyQztZQUMzQyxJQUFJLFVBQVUsS0FBSyxLQUFLLEVBQUU7O29CQUNsQixRQUFRLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztnQkFDbEUsVUFBVSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7Z0JBQy9CLFVBQVUsQ0FBQyxRQUFRLENBQ2pCLFFBQVEsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLFVBQVUsRUFDaEMsa0JBQWtCLEVBQ2xCLGtCQUFrQixDQUNuQixDQUFDO2dCQUNGLGtCQUFrQixJQUFJLEdBQUcsQ0FBQyxDQUFDLDJDQUEyQzthQUN2RTtZQUNELHNDQUFzQztZQUN0QyxJQUFJLEtBQUssS0FBSyxLQUFLLEVBQUU7O29CQUNiLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDOztvQkFDeEQsUUFBUSxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztnQkFDeEQsVUFBVSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7Z0JBQy9CLFVBQVUsQ0FBQyxRQUFRLENBQ2pCLFNBQVMsR0FBRyxVQUFVLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUM5QyxrQkFBa0IsRUFDbEIsa0JBQWtCLENBQ25CLENBQUM7YUFDSDtZQUNELDBDQUEwQztZQUMxQyxJQUFJLE9BQU8sS0FBSyxFQUFFLEVBQUU7Z0JBQ2xCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO2dCQUNoQyxxREFBcUQ7Z0JBQ3JELElBQUksYUFBYSxLQUFLLENBQUMsRUFBRTtvQkFDdkIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUMzRDtxQkFBTTs7O3dCQUVDLGFBQWEsR0FBRyxPQUFPLENBQUMsTUFBTTs7d0JBQzlCLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQzs7d0JBQ2hFLGtCQUFrQixHQUFHLEVBQUU7O3dCQUN2QixvQkFBb0IsR0FBRyxDQUFDOzt3QkFDeEIsaUJBQWlCLFNBQUE7b0JBQ3JCLHlDQUF5QztvQkFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDdEMsMkJBQTJCO3dCQUMzQixJQUFJLGFBQWEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUN6QixrRUFBa0U7NEJBQ2xFLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQ2pDLG9CQUFvQixFQUNwQixrQkFBa0IsQ0FDbkIsQ0FBQzs0QkFDRiwyQkFBMkI7NEJBQzNCLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDeEQsVUFBVSxDQUFDLFFBQVEsQ0FDakIsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxFQUMvQyxLQUFLLEdBQUcsQ0FBQyxFQUNULGdCQUFnQixDQUNqQixDQUFDOzRCQUNGLG9CQUFvQixJQUFJLGlCQUFpQixDQUFDOzRCQUMxQyxnQ0FBZ0M7NEJBQ2hDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQzt5QkFDeEI7NkJBQU07NEJBQ0wsc0JBQXNCOzRCQUN0QixVQUFVLENBQUMsUUFBUSxDQUNqQixPQUFPLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEVBQ3BDLEtBQUssR0FBRyxDQUFDLEVBQ1QsZ0JBQWdCLENBQ2pCLENBQUM7eUJBQ0g7cUJBQ0Y7aUJBQ0Y7YUFDRjtZQUNELHdCQUF3QjtZQUN4QixVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDOztnQkFFckQsTUFBTSxHQUFHLGFBQWEsQ0FBQyxJQUFJO1lBQy9CLElBQUk7Z0JBQ0YsMEJBQTBCO2dCQUMxQixJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNkLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUN0RDtxQkFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLEVBQUU7b0JBQzFDLHdCQUF3QjtvQkFDeEIsS0FBSSxDQUFDLHNCQUFzQixDQUN6QixTQUFTLEVBQ1QsS0FBSyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUN4RCxDQUFDO2lCQUNIO3FCQUFNO29CQUNMLHdCQUF3QjtvQkFDeEIsS0FBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsRUFBRSxLQUFLLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDO2lCQUM5RDthQUNGO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osTUFBTSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7YUFDOUI7WUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXJCLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sRUFBRTs7b0JBQzdCLFVBQVUsR0FBRyxLQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDOztvQkFDOUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ2xDLElBQUksRUFBRSwwQkFBMEI7aUJBQ2pDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDZCx5Q0FBeUM7b0JBQ3pDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLEdBQUcsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUM7b0JBQzlDLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2lCQUMzQjtxQkFBTTtvQkFDTCx3QkFBd0I7b0JBQ3hCLEtBQUksQ0FBQyxZQUFZLENBQ2YsS0FBSyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxNQUFNLEVBQ2pELElBQUksQ0FDTCxDQUFDO2lCQUNIO2FBQ0Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7Ozs7SUFFTyxnQ0FBUzs7Ozs7OztJQUFqQixVQUFrQixHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU07UUFDakMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ08sOEJBQU87Ozs7OztJQUFqQixVQUFrQixHQUFVO1FBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7Ozs7SUFDSywyQ0FBb0I7Ozs7Ozs7O0lBQTVCLFVBQTZCLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTzs7O1lBRXpDLFVBQVUsR0FDZCxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ3pELFNBQVMsR0FDYixHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ3hELFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTTs7WUFDekIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLOztZQUN2QixXQUFXLEdBQUcsU0FBUyxHQUFHLFVBQVU7O1lBQ3BDLFVBQVUsR0FBRyxRQUFRLEdBQUcsU0FBUzs7WUFDakMsUUFBUSxHQUFHLFdBQVcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVTs7WUFDOUQsUUFBUSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVM7O1lBQzFELFFBQVEsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRO1FBRTlELE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNLLDhDQUF1Qjs7Ozs7O0lBQS9CLFVBQWdDLEdBQUc7O1lBQzNCLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFOztZQUN0RCxhQUFhLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUU7UUFDcEQsT0FBTztZQUNMLGlCQUFpQjtZQUNqQixDQUFDO1lBQ0QsQ0FBQztZQUNELENBQUMsaUJBQWlCO1lBQ2xCLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxpQkFBaUIsR0FBRyxHQUFHO1lBQzFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxpQkFBaUIsR0FBRyxHQUFHO1NBQzNDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7Ozs7SUFDSyw0Q0FBcUI7Ozs7Ozs7O0lBQTdCLFVBQThCLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTTs7WUFDMUMsVUFBVSxHQUFHLFFBQVEsR0FBRyxNQUFNOztZQUM5QixJQUFJLEdBQUcsSUFBSTtRQUVqQixJQUFJO1lBQ0YsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsd0VBQXdFO1lBQzVGLG9DQUFvQztZQUNwQyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3hCLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7Z0JBQzdELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxNQUFNOzs7O2dCQUFDLFVBQUEsSUFBSTtvQkFDaEIsaUJBQWlCO29CQUNqQixNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUM1QixDQUFDLEdBQUUsVUFBVSxDQUFDLENBQUM7YUFDaEI7U0FDRjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FDcEMsd0NBQXdDLENBQ3pDLEVBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUNwQywwQ0FBMEMsQ0FDM0MsRUFDRCxPQUFPLENBQ1IsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0ssNkNBQXNCOzs7Ozs7O0lBQTlCLFVBQStCLE1BQU0sRUFBRSxJQUFJOztZQUNuQyxVQUFVLEdBQUcsUUFBUSxHQUFHLE1BQU07O1lBQzlCLElBQUksR0FBRyxJQUFJO1FBQ2pCLElBQ0UsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztZQUMvQixPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssV0FBVyxFQUNuQztZQUNBLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztTQUM1QjtRQUVELElBQUk7WUFDRixNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyx3RUFBd0U7WUFDNUYsSUFBSSxTQUFTLENBQUMsVUFBVSxFQUFFO2dCQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDTCxNQUFNLENBQUMsTUFBTTs7OztnQkFBQyxVQUFBLElBQUk7b0JBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNoQyxDQUFDLEdBQUUsVUFBVSxDQUFDLENBQUM7YUFDaEI7U0FDRjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FDcEMsd0NBQXdDLENBQ3pDLEVBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUNwQywwQ0FBMEMsQ0FDM0MsRUFDRCxPQUFPLENBQ1IsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0ssbUNBQVk7Ozs7Ozs7SUFBcEIsVUFBcUIsSUFBSSxFQUFFLElBQUk7UUFDN0Isa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsOEJBQThCO1FBQzlCLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxDQUFDLEVBQUU7WUFDOUIsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixlQUFlO1lBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQzs7Ozs7SUFFTyx5Q0FBa0I7Ozs7SUFBMUI7UUFDRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsOEJBQThCO1FBQzlCLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxDQUFDLEVBQUU7WUFDOUIsZUFBZTtZQUNmLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNsRDtJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNLLGlDQUFVOzs7OztJQUFsQjs7WUFDUSxJQUFJLEdBQUcsSUFBSTtRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUk7Ozs7UUFBQyxVQUFBLElBQUk7WUFDcEQsMkJBQTJCO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDeEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBOXRCRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWJRLGNBQWM7Z0JBQUUsZUFBZTtnQkFBRSxlQUFlOzs7dUJBUnpEO0NBa3ZCQyxBQS90QkQsSUErdEJDO1NBNXRCWSxZQUFZOzs7SUFDdkIsK0JBQWU7O0lBQ2YsdUNBQXdCOztJQUN4QixrQ0FBbUI7Ozs7O0lBRWpCLHNDQUFzQzs7Ozs7SUFDdEMsdUNBQXdDOzs7OztJQUN4Qyx1Q0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgc2F2ZUFzIH0gZnJvbSAnZmlsZS1zYXZlcic7XHJcbmltcG9ydCAqIGFzIGpzUERGIGZyb20gJ2pzcGRmJztcclxuaW1wb3J0ICogYXMgX2h0bWwyY2FudmFzIGZyb20gJ2h0bWwyY2FudmFzJztcclxuaW1wb3J0ICogYXMgSlNaaXAgZnJvbSAnanN6aXAnO1xyXG5cclxuaW1wb3J0IHsgU3ViamVjdFN0YXR1cyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIEFjdGl2aXR5U2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IGZvcm1hdFNjYWxlIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAudXRpbHMnO1xyXG5pbXBvcnQgeyBPdXRwdXRMYXllckxlZ2VuZCB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgZ2V0TGF5ZXJzTGVnZW5kcyB9IGZyb20gJy4uLy4uL2xheWVyL3V0aWxzL291dHB1dExlZ2VuZCc7XHJcblxyXG5pbXBvcnQgeyBQcmludE9wdGlvbnMgfSBmcm9tICcuL3ByaW50LmludGVyZmFjZSc7XHJcblxyXG5jb25zdCBodG1sMmNhbnZhcyA9IF9odG1sMmNhbnZhcztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFByaW50U2VydmljZSB7XHJcbiAgemlwRmlsZTogSlNaaXA7XHJcbiAgbmJGaWxlVG9Qcm9jZXNzOiBudW1iZXI7XHJcbiAgYWN0aXZpdHlJZDogc3RyaW5nO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGFjdGl2aXR5U2VydmljZTogQWN0aXZpdHlTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgcHJpbnQobWFwOiBJZ29NYXAsIG9wdGlvbnM6IFByaW50T3B0aW9ucyk6IFN1YmplY3Q8YW55PiB7XHJcbiAgICBjb25zdCBzdGF0dXMkID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgICBjb25zdCBwYXBlckZvcm1hdDogc3RyaW5nID0gb3B0aW9ucy5wYXBlckZvcm1hdDtcclxuICAgIGNvbnN0IHJlc29sdXRpb24gPSArb3B0aW9ucy5yZXNvbHV0aW9uOyAvLyBEZWZhdWx0IGlzIDk2XHJcbiAgICBjb25zdCBvcmllbnRhdGlvbiA9IG9wdGlvbnMub3JpZW50YXRpb247XHJcblxyXG4gICAgdGhpcy5hY3Rpdml0eUlkID0gdGhpcy5hY3Rpdml0eVNlcnZpY2UucmVnaXN0ZXIoKTtcclxuICAgIGNvbnN0IGRvYyA9IG5ldyBqc1BERih7XHJcbiAgICAgIG9yaWVudGF0aW9uLFxyXG4gICAgICBmb3JtYXQ6IHBhcGVyRm9ybWF0LnRvTG93ZXJDYXNlKClcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBbXHJcbiAgICAgIGRvYy5pbnRlcm5hbC5wYWdlU2l6ZS53aWR0aCxcclxuICAgICAgZG9jLmludGVybmFsLnBhZ2VTaXplLmhlaWdodFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBtYXJnaW5zID0gWzIwLCAxMCwgMjAsIDEwXTtcclxuICAgIGNvbnN0IHdpZHRoID0gZGltZW5zaW9uc1swXSAtIG1hcmdpbnNbM10gLSBtYXJnaW5zWzFdO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gZGltZW5zaW9uc1sxXSAtIG1hcmdpbnNbMF0gLSBtYXJnaW5zWzJdO1xyXG4gICAgY29uc3Qgc2l6ZSA9IFt3aWR0aCwgaGVpZ2h0XTtcclxuXHJcbiAgICBpZiAob3B0aW9ucy50aXRsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuYWRkVGl0bGUoZG9jLCBvcHRpb25zLnRpdGxlLCBkaW1lbnNpb25zWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5zaG93UHJvamVjdGlvbiA9PT0gdHJ1ZSB8fCBvcHRpb25zLnNob3dTY2FsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmFkZFByb2pTY2FsZShcclxuICAgICAgICBkb2MsXHJcbiAgICAgICAgbWFwLFxyXG4gICAgICAgIHJlc29sdXRpb24sXHJcbiAgICAgICAgb3B0aW9ucy5zaG93UHJvamVjdGlvbixcclxuICAgICAgICBvcHRpb25zLnNob3dTY2FsZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMuY29tbWVudCAhPT0gJycpIHtcclxuICAgICAgdGhpcy5hZGRDb21tZW50KGRvYywgb3B0aW9ucy5jb21tZW50KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZE1hcChkb2MsIG1hcCwgcmVzb2x1dGlvbiwgc2l6ZSwgbWFyZ2lucykuc3Vic2NyaWJlKFxyXG4gICAgICAoc3RhdHVzOiBTdWJqZWN0U3RhdHVzKSA9PiB7XHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gU3ViamVjdFN0YXR1cy5Eb25lKSB7XHJcbiAgICAgICAgICBpZiAob3B0aW9ucy5zaG93TGVnZW5kID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkTGVnZW5kKGRvYywgbWFwLCBtYXJnaW5zLCByZXNvbHV0aW9uKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZURvYyhkb2MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gU3ViamVjdFN0YXR1cy5Eb25lIHx8IHN0YXR1cyA9PT0gU3ViamVjdFN0YXR1cy5FcnJvcikge1xyXG4gICAgICAgICAgdGhpcy5hY3Rpdml0eVNlcnZpY2UudW5yZWdpc3Rlcih0aGlzLmFjdGl2aXR5SWQpO1xyXG4gICAgICAgICAgc3RhdHVzJC5uZXh0KFN1YmplY3RTdGF0dXMuRG9uZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBzdGF0dXMkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGh0bWwgY29kZSBmb3IgYWxsIGxheWVycyBsZWdlbmRcclxuICAgKiBAcGFyYW0gIG1hcCBJZ29NYXBcclxuICAgKiBAcGFyYW0gIHdpZHRoIFRoZSB3aWR0aCB0aGF0IHRoZSBsZWdlbmQgbmVlZCB0byBiZVxyXG4gICAqIEByZXR1cm4gSHRtbCBjb2RlIGZvciB0aGUgbGVnZW5kXHJcbiAgICovXHJcbiAgZ2V0TGF5ZXJzTGVnZW5kSHRtbChtYXA6IElnb01hcCwgd2lkdGg6IG51bWJlciwgcmVzb2x1dGlvbjogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGxldCBodG1sID0gJyc7XHJcbiAgICBjb25zdCBsZWdlbmRzID0gZ2V0TGF5ZXJzTGVnZW5kcyhcclxuICAgICAgbWFwLmxheWVycyxcclxuICAgICAgbWFwLnZpZXdDb250cm9sbGVyLmdldFNjYWxlKHJlc29sdXRpb24pXHJcbiAgICApO1xyXG4gICAgaWYgKGxlZ2VuZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBodG1sO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZmluZSBpbXBvcnRhbnQgc3R5bGUgdG8gYmUgc3VyZSB0aGF0IGFsbCBjb250YWluZXIgaXMgY29udmVydFxyXG4gICAgLy8gdG8gaW1hZ2Ugbm90IGp1c3QgdmlzaWJsZSBwYXJ0XHJcbiAgICBodG1sICs9ICc8c3R5bGUgbWVkaWE9XCJzY3JlZW5cIiB0eXBlPVwidGV4dC9jc3NcIj4nO1xyXG4gICAgaHRtbCArPSAnLmh0bWwyY2FudmFzLWNvbnRhaW5lciB7IHdpZHRoOiAnICsgd2lkdGg7XHJcbiAgICBodG1sICs9ICdtbSAhaW1wb3J0YW50OyBoZWlnaHQ6IDIwMDBweCAhaW1wb3J0YW50OyB9JztcclxuICAgIGh0bWwgKz0gJzwvc3R5bGU+JztcclxuICAgIGh0bWwgKz0gJzxmb250IHNpemU9XCIyXCIgZmFjZT1cIkNvdXJpZXIgTmV3XCIgPic7XHJcbiAgICBodG1sICs9ICc8ZGl2IHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7bWF4LXdpZHRoOicgKyB3aWR0aCArICdtbVwiPic7XHJcbiAgICAvLyBGb3IgZWFjaCBsZWdlbmQsIGRlZmluZSBhbiBodG1sIHRhYmxlIGNlbGxcclxuICAgIGxlZ2VuZHMuZm9yRWFjaCgobGVnZW5kOiBPdXRwdXRMYXllckxlZ2VuZCkgPT4ge1xyXG4gICAgICBodG1sICs9XHJcbiAgICAgICAgJzx0YWJsZSBib3JkZXI9MSBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOnRvcFwiPic7XHJcbiAgICAgIGh0bWwgKz0gJzx0cj48dGggd2lkdGg9XCIxNzBweFwiPicgKyBsZWdlbmQudGl0bGUgKyAnPC90aD4nO1xyXG4gICAgICBodG1sICs9ICc8dGQ+PGltZyBjbGFzcz1cInByaW50SW1hZ2VMZWdlbmRcIiBzcmM9XCInICsgbGVnZW5kLnVybCArICdcIj4nO1xyXG4gICAgICBodG1sICs9ICc8L3RkPjwvdHI+PC90YWJsZT4nO1xyXG4gICAgfSk7XHJcbiAgICBodG1sICs9ICc8L2Rpdj4nO1xyXG5cclxuICAgIHJldHVybiBodG1sO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFsbCB0aGUgbGVnZW5kIGluIGEgc2luZ2xlIGltYWdlXHJcbiAgICogKiBAcGFyYW0gIGZvcm1hdCAtIEltYWdlIGZvcm1hdC4gZGVmYXVsdCB2YWx1ZSB0byBcInBuZ1wiXHJcbiAgICogQHJldHVybiBUaGUgaW1hZ2Ugb2YgdGhlIGxlZ2VuZFxyXG4gICAqL1xyXG4gIGdldExheWVyc0xlZ2VuZEltYWdlKFxyXG4gICAgbWFwLFxyXG4gICAgZm9ybWF0OiBzdHJpbmcgPSAncG5nJyxcclxuICAgIGRvWmlwRmlsZTogYm9vbGVhbixcclxuICAgIHJlc29sdXRpb246IG51bWJlclxyXG4gICkge1xyXG4gICAgY29uc3Qgc3RhdHVzJCA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICAvLyBHZXQgaHRtbCBjb2RlIGZvciB0aGUgbGVnZW5kXHJcbiAgICBjb25zdCB3aWR0aCA9IDIwMDsgLy8gbWlsaW1ldGVycyB1bml0LCBvcmlnaW5hbGx5IGRlZmluZSBmb3IgZG9jdW1lbnQgcGRmXHJcbiAgICBsZXQgaHRtbCA9IHRoaXMuZ2V0TGF5ZXJzTGVnZW5kSHRtbChtYXAsIHdpZHRoLCByZXNvbHV0aW9uKTtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgZm9ybWF0ID0gZm9ybWF0LnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgLy8gSWYgbm8gbGVnZW5kIHNob3cgTm8gTEVHRU5EIGluIGFuIGltYWdlXHJcbiAgICBpZiAoaHRtbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgaHRtbCA9ICc8Zm9udCBzaXplPVwiMTJcIiBmYWNlPVwiQ291cmllciBOZXdcIiA+JztcclxuICAgICAgaHRtbCArPSAnPGRpdiBhbGlnbj1cImNlbnRlclwiPjxiPk5PIExFR0VORDwvYj48L2Rpdj4nO1xyXG4gICAgfVxyXG4gICAgLy8gQ3JlYXRlIGRpdiB0byBjb250YWluIGh0bWwgY29kZSBmb3IgbGVnZW5kXHJcbiAgICBjb25zdCBkaXYgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgLy8gQWRkIGh0bWwgY29kZSB0byBjb252ZXJ0IGluIHRoZSBuZXcgd2luZG93XHJcbiAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICAvLyBEZWZpbmUgZXZlbnQgdG8gZXhlY3V0ZSBhZnRlciBhbGwgaW1hZ2VzIGFyZSBsb2FkZWQgdG8gY3JlYXRlIHRoZSBjYW52YXNcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBodG1sMmNhbnZhcyhkaXYsIHsgdXNlQ09SUzogdHJ1ZSB9KVxyXG4gICAgICAgIC50aGVuKGNhbnZhcyA9PiB7XHJcbiAgICAgICAgICBsZXQgc3RhdHVzID0gU3ViamVjdFN0YXR1cy5Eb25lO1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKCFkb1ppcEZpbGUpIHtcclxuICAgICAgICAgICAgICAvLyBTYXZlIHRoZSBjYW52YXMgYXMgZmlsZVxyXG4gICAgICAgICAgICAgIHRoYXQuc2F2ZUNhbnZhc0ltYWdlQXNGaWxlKGNhbnZhcywgJ2xlZ2VuZEltYWdlJywgZm9ybWF0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBBZGQgdGhlIGNhbnZhcyB0byB6aXBcclxuICAgICAgICAgICAgICB0aGF0LmdlbmVyYXRlQ2FudmFGaWxlVG9aaXAoY2FudmFzLCAnbGVnZW5kSW1hZ2UnICsgJy4nICsgZm9ybWF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkaXYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkaXYpOyAvLyByZW1vdmUgdGVtcCBkaXYgKElFKVxyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHN0YXR1cyA9IFN1YmplY3RTdGF0dXMuRXJyb3I7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzdGF0dXMkLm5leHQoc3RhdHVzKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSwgNTAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkVGl0bGUoZG9jOiBqc1BERiwgdGl0bGU6IHN0cmluZywgcGFnZVdpZHRoOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHBkZlJlc29sdXRpb24gPSA5NjtcclxuICAgIGNvbnN0IHRpdGxlU2l6ZSA9IDMyO1xyXG4gICAgY29uc3QgdGl0bGVXaWR0aCA9ICgodGl0bGVTaXplICogMjUuNCkgLyBwZGZSZXNvbHV0aW9uKSAqIHRpdGxlLmxlbmd0aDtcclxuXHJcbiAgICBsZXQgdGl0bGVNYXJnaW5MZWZ0O1xyXG4gICAgaWYgKHRpdGxlV2lkdGggPiBwYWdlV2lkdGgpIHtcclxuICAgICAgdGl0bGVNYXJnaW5MZWZ0ID0gMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRpdGxlTWFyZ2luTGVmdCA9IChwYWdlV2lkdGggLSB0aXRsZVdpZHRoKSAvIDI7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jLnNldEZvbnQoJ2NvdXJpZXInKTtcclxuICAgIGRvYy5zZXRGb250U2l6ZSgzMik7XHJcbiAgICBkb2MudGV4dCh0aXRsZSwgdGl0bGVNYXJnaW5MZWZ0LCAxNSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgY29tbWVudCB0byB0aGUgZG9jdW1lbnRcclxuICAgKiAqIEBwYXJhbSAgZG9jIC0gcGRmIGRvY3VtZW50XHJcbiAgICogKiBAcGFyYW0gIGNvbW1lbnQgLSBDb21tZW50IHRvIGFkZCBpbiB0aGUgZG9jdW1lbnRcclxuICAgKiAqIEBwYXJhbSAgc2l6ZSAtIFNpemUgb2YgdGhlIGRvY3VtZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRDb21tZW50KGRvYzoganNQREYsIGNvbW1lbnQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgY29tbWVudFNpemUgPSAxNjtcclxuICAgIGNvbnN0IGNvbW1lbnRNYXJnaW5MZWZ0ID0gMjA7XHJcbiAgICBjb25zdCBtYXJnaW5Cb3R0b20gPSA1O1xyXG4gICAgY29uc3QgaGVpZ2h0UGl4ZWxzID0gZG9jLmludGVybmFsLnBhZ2VTaXplLmhlaWdodCAtIG1hcmdpbkJvdHRvbTtcclxuXHJcbiAgICBkb2Muc2V0Rm9udCgnY291cmllcicpO1xyXG4gICAgZG9jLnNldEZvbnRTaXplKGNvbW1lbnRTaXplKTtcclxuICAgIGRvYy50ZXh0KGNvbW1lbnQsIGNvbW1lbnRNYXJnaW5MZWZ0LCBoZWlnaHRQaXhlbHMpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBBZGQgcHJvamVjdGlvbiBhbmQvb3Igc2NhbGUgdG8gdGhlIGRvY3VtZW50XHJcbiAgICogQHBhcmFtICBkb2MgLSBwZGYgZG9jdW1lbnRcclxuICAgKiBAcGFyYW0gIG1hcCAtIE1hcCBvZiB0aGUgYXBwXHJcbiAgICogQHBhcmFtICBkcGkgLSBEUEkgcmVzb2x1dGlvbiBvZiB0aGUgZG9jdW1lbnRcclxuICAgKiBAcGFyYW0gIHByb2plY3Rpb24gLSBCb29sIHRvIGluZGljYXRlIGlmIHByb2plY3Rpb24gbmVlZCB0byBiZSBhZGRlZFxyXG4gICAqIEBwYXJhbSAgc2NhbGUgLSBCb29sIHRvIGluZGljYXRlIGlmIHNjYWxlIG5lZWQgdG8gYmUgYWRkZWRcclxuICAgKi9cclxuICBwcml2YXRlIGFkZFByb2pTY2FsZShcclxuICAgIGRvYzoganNQREYsXHJcbiAgICBtYXA6IElnb01hcCxcclxuICAgIGRwaTogbnVtYmVyLFxyXG4gICAgcHJvamVjdGlvbjogYm9vbGVhbixcclxuICAgIHNjYWxlOiBib29sZWFuXHJcbiAgKSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICBjb25zdCBwcm9qU2NhbGVTaXplID0gMTY7XHJcbiAgICBjb25zdCBwcm9qU2NhbGVNYXJnaW5MZWZ0ID0gMjA7XHJcbiAgICBjb25zdCBtYXJnaW5Cb3R0b20gPSAxNTtcclxuICAgIGNvbnN0IGhlaWdodFBpeGVscyA9IGRvYy5pbnRlcm5hbC5wYWdlU2l6ZS5oZWlnaHQgLSBtYXJnaW5Cb3R0b207XHJcblxyXG4gICAgbGV0IHRleHRQcm9qU2NhbGU6IHN0cmluZyA9ICcnO1xyXG4gICAgaWYgKHByb2plY3Rpb24gPT09IHRydWUpIHtcclxuICAgICAgY29uc3QgcHJvalRleHQgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5wcmludEZvcm0ucHJvamVjdGlvbicpO1xyXG4gICAgICB0ZXh0UHJvalNjYWxlICs9IHByb2pUZXh0ICsgJzogJyArIG1hcC5wcm9qZWN0aW9uO1xyXG4gICAgfVxyXG4gICAgaWYgKHNjYWxlID09PSB0cnVlKSB7XHJcbiAgICAgIGlmIChwcm9qZWN0aW9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGV4dFByb2pTY2FsZSArPSAnICAgJztcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBzY2FsZVRleHQgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5wcmludEZvcm0uc2NhbGUnKTtcclxuICAgICAgY29uc3QgbWFwU2NhbGUgPSBtYXAudmlld0NvbnRyb2xsZXIuZ2V0U2NhbGUoZHBpKTtcclxuICAgICAgdGV4dFByb2pTY2FsZSArPSBzY2FsZVRleHQgKyAnOiB+IDEgLyAnICsgZm9ybWF0U2NhbGUobWFwU2NhbGUpO1xyXG4gICAgfVxyXG4gICAgZG9jLnNldEZvbnQoJ2NvdXJpZXInKTtcclxuICAgIGRvYy5zZXRGb250U2l6ZShwcm9qU2NhbGVTaXplKTtcclxuICAgIGRvYy50ZXh0KHRleHRQcm9qU2NhbGUsIHByb2pTY2FsZU1hcmdpbkxlZnQsIGhlaWdodFBpeGVscyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdGhlIGxlZ2VuZCB0byB0aGUgZG9jdW1lbnRcclxuICAgKiBAcGFyYW0gIGRvYyAtIFBkZiBkb2N1bWVudCB3aGVyZSBsZWdlbmQgd2lsbCBiZSBhZGRlZFxyXG4gICAqIEBwYXJhbSAgbWFwIC0gTWFwIG9mIHRoZSBhcHBcclxuICAgKiBAcGFyYW0gIG1hcmdpbnMgLSBQYWdlIG1hcmdpbnNcclxuICAgKi9cclxuICBwcml2YXRlIGFkZExlZ2VuZChcclxuICAgIGRvYzoganNQREYsXHJcbiAgICBtYXA6IElnb01hcCxcclxuICAgIG1hcmdpbnM6IEFycmF5PG51bWJlcj4sXHJcbiAgICByZXNvbHV0aW9uOiBudW1iZXJcclxuICApIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgLy8gR2V0IGh0bWwgY29kZSBmb3IgdGhlIGxlZ2VuZFxyXG4gICAgY29uc3Qgd2lkdGggPSBkb2MuaW50ZXJuYWwucGFnZVNpemUud2lkdGg7XHJcbiAgICBjb25zdCBodG1sID0gdGhpcy5nZXRMYXllcnNMZWdlbmRIdG1sKG1hcCwgd2lkdGgsIHJlc29sdXRpb24pO1xyXG4gICAgLy8gSWYgbm8gbGVnZW5kLCBzYXZlIHRoZSBtYXAgZGlyZWN0bHlcclxuICAgIGlmIChodG1sID09PSAnJykge1xyXG4gICAgICB0aGlzLnNhdmVEb2MoZG9jKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ3JlYXRlIGRpdiB0byBjb250YWluIGh0bWwgY29kZSBmb3IgbGVnZW5kXHJcbiAgICBjb25zdCBkaXYgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBodG1sMmNhbnZhcyhkaXYsIHsgdXNlQ09SUzogdHJ1ZSB9KVxyXG4gICAgICAudGhlbihjYW52YXMgPT4ge1xyXG4gICAgICAgIGxldCBpbWdEYXRhO1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gMTA7XHJcblxyXG4gICAgICAgIGltZ0RhdGEgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcclxuICAgICAgICBkb2MuYWRkUGFnZSgpO1xyXG4gICAgICAgIGNvbnN0IGltYWdlU2l6ZSA9IHRoaXMuZ2V0SW1hZ2VTaXplVG9GaXRQZGYoZG9jLCBjYW52YXMsIG1hcmdpbnMpO1xyXG4gICAgICAgIGRvYy5hZGRJbWFnZShpbWdEYXRhLCAnUE5HJywgMTAsIHBvc2l0aW9uLCBpbWFnZVNpemVbMF0sIGltYWdlU2l6ZVsxXSk7XHJcbiAgICAgICAgdGhhdC5zYXZlRG9jKGRvYyk7XHJcbiAgICAgICAgZGl2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZGl2KTsgLy8gcmVtb3ZlIHRlbXAgZGl2IChJRSBzdHlsZSlcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGUgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAvLyBBZGQgaHRtbCBjb2RlIHRvIGNvbnZlcnQgaW4gdGhlIG5ldyB3aW5kb3dcclxuICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gaHRtbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkQ2FudmFzKFxyXG4gICAgZG9jOiBqc1BERixcclxuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXHJcbiAgICBtYXJnaW5zOiBBcnJheTxudW1iZXI+XHJcbiAgKSB7XHJcbiAgICBsZXQgaW1hZ2U7XHJcblxyXG4gICAgaW1hZ2UgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9qcGVnJyk7XHJcblxyXG4gICAgaWYgKGltYWdlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc3QgaW1hZ2VTaXplID0gdGhpcy5nZXRJbWFnZVNpemVUb0ZpdFBkZihkb2MsIGNhbnZhcywgbWFyZ2lucyk7XHJcbiAgICAgIGRvYy5hZGRJbWFnZShcclxuICAgICAgICBpbWFnZSxcclxuICAgICAgICAnSlBFRycsXHJcbiAgICAgICAgbWFyZ2luc1szXSxcclxuICAgICAgICBtYXJnaW5zWzBdLFxyXG4gICAgICAgIGltYWdlU2l6ZVswXSxcclxuICAgICAgICBpbWFnZVNpemVbMV1cclxuICAgICAgKTtcclxuICAgICAgZG9jLnJlY3QobWFyZ2luc1szXSwgbWFyZ2luc1swXSwgaW1hZ2VTaXplWzBdLCBpbWFnZVNpemVbMV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gVE9ETyBmaXggcHJpbnRpbmcgd2l0aCBpbWFnZSByZXNvbHV0aW9uXHJcbiAgcHJpdmF0ZSBhZGRNYXAoXHJcbiAgICBkb2M6IGpzUERGLFxyXG4gICAgbWFwOiBJZ29NYXAsXHJcbiAgICByZXNvbHV0aW9uOiBudW1iZXIsXHJcbiAgICBzaXplOiBBcnJheTxudW1iZXI+LFxyXG4gICAgbWFyZ2luczogQXJyYXk8bnVtYmVyPlxyXG4gICkge1xyXG4gICAgY29uc3Qgc3RhdHVzJCA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gICAgY29uc3QgbWFwU2l6ZSA9IG1hcC5vbC5nZXRTaXplKCk7XHJcbiAgICBjb25zdCBleHRlbnQgPSBtYXAub2wuZ2V0VmlldygpLmNhbGN1bGF0ZUV4dGVudChtYXBTaXplKTtcclxuXHJcbiAgICBjb25zdCB3aWR0aFBpeGVscyA9IE1hdGgucm91bmQoKHNpemVbMF0gKiByZXNvbHV0aW9uKSAvIDI1LjQpO1xyXG4gICAgY29uc3QgaGVpZ2h0UGl4ZWxzID0gTWF0aC5yb3VuZCgoc2l6ZVsxXSAqIHJlc29sdXRpb24pIC8gMjUuNCk7XHJcblxyXG4gICAgbGV0IHRpbWVvdXQ7XHJcblxyXG4gICAgbWFwLm9sLm9uY2UoJ3Bvc3Rjb21wb3NlJywgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgY2FudmFzID0gZXZlbnQuY29udGV4dC5jYW52YXM7XHJcbiAgICAgIGNvbnN0IG1hcFN0YXR1cyQkID0gbWFwLnN0YXR1cyQuc3Vic2NyaWJlKChtYXBTdGF0dXM6IFN1YmplY3RTdGF0dXMpID0+IHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcblxyXG4gICAgICAgIGlmIChtYXBTdGF0dXMgIT09IFN1YmplY3RTdGF0dXMuRG9uZSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWFwU3RhdHVzJCQudW5zdWJzY3JpYmUoKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN1YmplY3RTdGF0dXMuRG9uZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgdGhpcy5hZGRDYW52YXMoZG9jLCBjYW52YXMsIG1hcmdpbnMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgc3RhdHVzID0gU3ViamVjdFN0YXR1cy5FcnJvcjtcclxuICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZXJyb3IoXHJcbiAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICdpZ28uZ2VvLnByaW50Rm9ybS5jb3JzRXJyb3JNZXNzYWdlQm9keSdcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgJ2lnby5nZW8ucHJpbnRGb3JtLmNvcnNFcnJvck1lc3NhZ2VIZWFkZXInXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICdwcmludCdcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlck1hcChtYXAsIG1hcFNpemUsIGV4dGVudCk7XHJcbiAgICAgICAgc3RhdHVzJC5uZXh0KHN0YXR1cyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gSWYgbm8gbG9hZGluZyBhcyBzdGFydGVkIGFmdGVyIDIwMG1zLCB0aGVuIHByb2JhYmx5IG5vIGxvYWRpbmdcclxuICAgICAgLy8gaXMgcmVxdWlyZWQuXHJcbiAgICAgIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbWFwU3RhdHVzJCQudW5zdWJzY3JpYmUoKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXR1cyA9IFN1YmplY3RTdGF0dXMuRG9uZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgdGhpcy5hZGRDYW52YXMoZG9jLCBjYW52YXMsIG1hcmdpbnMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgc3RhdHVzID0gU3ViamVjdFN0YXR1cy5FcnJvcjtcclxuICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZXJyb3IoXHJcbiAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICdpZ28uZ2VvLnByaW50Rm9ybS5jb3JzRXJyb3JNZXNzYWdlQm9keSdcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgJ2lnby5nZW8ucHJpbnRGb3JtLmNvcnNFcnJvck1lc3NhZ2VIZWFkZXInXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICdwcmludCdcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlck1hcChtYXAsIG1hcFNpemUsIGV4dGVudCk7XHJcbiAgICAgICAgc3RhdHVzJC5uZXh0KHN0YXR1cyk7XHJcbiAgICAgIH0sIDIwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnJlbmRlck1hcChtYXAsIFt3aWR0aFBpeGVscywgaGVpZ2h0UGl4ZWxzXSwgZXh0ZW50KTtcclxuXHJcbiAgICByZXR1cm4gc3RhdHVzJDtcclxuICB9XHJcblxyXG4gIGRlZmluZU5iRmlsZVRvUHJvY2VzcyhuYkZpbGVUb1Byb2Nlc3MpIHtcclxuICAgIHRoaXMubmJGaWxlVG9Qcm9jZXNzID0gbmJGaWxlVG9Qcm9jZXNzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRG93bmxvYWQgYW4gaW1hZ2Ugb2YgdGhlIG1hcCB3aXRoIGFkZGl0aW9uIG9mIGluZm9ybWF0aW9uc1xyXG4gICAqIEBwYXJhbSAgbWFwIC0gTWFwIG9mIHRoZSBhcHBcclxuICAgKiBAcGFyYW0gIGZvcm1hdCAtIEltYWdlIGZvcm1hdC4gZGVmYXVsdCB2YWx1ZSB0byBcInBuZ1wiXHJcbiAgICogQHBhcmFtICBwcm9qZWN0aW9uIC0gSW5kaWNhdGUgaWYgcHJvamVjdGlvbiBuZWVkIHRvIGJlIGFkZC4gRGVmYXVsdCB0byBmYWxzZVxyXG4gICAqIEBwYXJhbSAgc2NhbGUgLSBJbmRpY2F0ZSBpZiBzY2FsZSBuZWVkIHRvIGJlIGFkZC4gRGVmYXVsdCB0byBmYWxzZVxyXG4gICAqIEBwYXJhbSAgbGVnZW5kIC0gSW5kaWNhdGUgaWYgdGhlIGxlZ2VuZCBvZiBsYXllcnMgbmVlZCB0byBiZSBkb3dubG9hZC4gRGVmYXVsdCB0byBmYWxzZVxyXG4gICAqIEBwYXJhbSAgdGl0bGUgLSBUaXRsZSB0byBhZGQgZm9yIHRoZSBtYXAgLSBEZWZhdWx0IHRvIGJsYW5rXHJcbiAgICogQHBhcmFtICBjb21tZW50IC0gQ29tbWVudCB0byBhZGQgZm9yIHRoZSBtYXAgLSBEZWZhdWx0IHRvIGJsYW5rXHJcbiAgICogQHBhcmFtICBkb1ppcEZpbGUgLSBJbmRpY2F0ZSBpZiB3ZSBkbyBhIHppcCB3aXRoIHRoZSBmaWxlXHJcbiAgICogQHJldHVybiBJbWFnZSBmaWxlIG9mIHRoZSBtYXAgd2l0aCBleHRlbnNpb24gZm9ybWF0IGdpdmVuIGFzIHBhcmFtZXRlclxyXG4gICAqL1xyXG4gIGRvd25sb2FkTWFwSW1hZ2UoXHJcbiAgICBtYXA6IElnb01hcCxcclxuICAgIHJlc29sdXRpb246IG51bWJlcixcclxuICAgIGZvcm1hdCA9ICdwbmcnLFxyXG4gICAgcHJvamVjdGlvbiA9IGZhbHNlLFxyXG4gICAgc2NhbGUgPSBmYWxzZSxcclxuICAgIGxlZ2VuZCA9IGZhbHNlLFxyXG4gICAgdGl0bGUgPSAnJyxcclxuICAgIGNvbW1lbnQgPSAnJyxcclxuICAgIGRvWmlwRmlsZSA9IHRydWVcclxuICApIHtcclxuICAgIGNvbnN0IHN0YXR1cyQgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgLy8gY29uc3QgcmVzb2x1dGlvbiA9IG1hcC5vbC5nZXRWaWV3KCkuZ2V0UmVzb2x1dGlvbigpO1xyXG4gICAgdGhpcy5hY3Rpdml0eUlkID0gdGhpcy5hY3Rpdml0eVNlcnZpY2UucmVnaXN0ZXIoKTtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgIG1hcC5vbC5vbmNlKCdwb3N0Y29tcG9zZScsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIGZvcm1hdCA9IGZvcm1hdC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBjb25zdCBjb250ZXh0ID0gZXZlbnQuY29udGV4dDtcclxuICAgICAgY29uc3QgbmV3Q2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgIGNvbnN0IG5ld0NvbnRleHQgPSBuZXdDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgLy8gUG9zdGlvbiBpbiBoZWlnaHQgdG8gc2V0IHRoZSBjYW52YXMgaW4gbmV3IGNhbnZhc1xyXG4gICAgICBsZXQgcG9zaXRpb25IQ2FudmFzID0gMDtcclxuICAgICAgLy8gUG9zaXRpb24gaW4gd2lkdGggdG8gc2V0IHRoZSBQcm9qL1NjYWxlIGluIG5ldyBjYW52YXNcclxuICAgICAgbGV0IHBvc2l0aW9uV1Byb2pTY2FsZSA9IDEwO1xyXG4gICAgICAvLyBHZXQgaGVpZ2h0L3dpZHRoIG9mIG1hcCBjYW52YXNcclxuICAgICAgY29uc3Qgd2lkdGggPSBjb250ZXh0LmNhbnZhcy53aWR0aDtcclxuICAgICAgbGV0IGhlaWdodCA9IGNvbnRleHQuY2FudmFzLmhlaWdodDtcclxuICAgICAgLy8gU2V0IEZvbnQgdG8gY2FsY3VsYXRlIGNvbW1lbnQgd2lkdGhcclxuICAgICAgbmV3Q29udGV4dC5mb250ID0gJzIwcHggQ2FsaWJyaSc7XHJcbiAgICAgIGNvbnN0IGNvbW1lbnRXaWR0aCA9IG5ld0NvbnRleHQubWVhc3VyZVRleHQoY29tbWVudCkud2lkdGg7XHJcbiAgICAgIC8vIEFkZCBoZWlnaHQgZm9yIHRpdGxlIGlmIGRlZmluZWRcclxuICAgICAgaGVpZ2h0ID0gdGl0bGUgIT09ICcnID8gaGVpZ2h0ICsgMzAgOiBoZWlnaHQ7XHJcbiAgICAgIC8vIEFkZCBoZWlnaHQgZm9yIHByb2plY3Rpb24gb3Igc2NhbGUgKHNhbWUgbGluZSkgaWYgZGVmaW5lZFxyXG4gICAgICBoZWlnaHQgPSBwcm9qZWN0aW9uICE9PSBmYWxzZSB8fCBzY2FsZSAhPT0gZmFsc2UgPyBoZWlnaHQgKyAzMCA6IGhlaWdodDtcclxuICAgICAgY29uc3QgcG9zaXRpb25IUHJvalNjYWxlID0gaGVpZ2h0IC0gMTA7XHJcbiAgICAgIC8vIERlZmluZSBudW1iZXIgb2YgbGluZSBkZXBlbmRpbmcgb2YgdGhlIGNvbW1lbnQgbGVuZ3RoXHJcbiAgICAgIGNvbnN0IGNvbW1lbnROYkxpbmUgPSBNYXRoLmNlaWwoY29tbWVudFdpZHRoIC8gd2lkdGgpO1xyXG4gICAgICAvLyBBZGQgaGVpZ2h0IGZvciBtdWx0aWxpbmUgY29tbWVudCBpZiBkZWZpbmVkXHJcbiAgICAgIGhlaWdodCA9IGNvbW1lbnQgIT09ICcnID8gaGVpZ2h0ICsgY29tbWVudE5iTGluZSAqIDMwIDogaGVpZ2h0O1xyXG4gICAgICBsZXQgcG9zaXRpb25IQ29tbWVudCA9IGhlaWdodCAtIGNvbW1lbnROYkxpbmUgKiAyMCArIDU7XHJcbiAgICAgIC8vIFNldCB0aGUgbmV3IGNhbnZhcyB3aXRoIHRoZSBuZXcgY2FsY3VsYXRlZCBzaXplXHJcbiAgICAgIG5ld0NhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICBuZXdDYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAvLyBQYXRjaCBKcGVnIGRlZmF1bHQgYmxhY2sgYmFja2dyb3VuZCB0byB3aGl0ZVxyXG4gICAgICBpZiAoZm9ybWF0ID09PSAnanBlZycpIHtcclxuICAgICAgICBuZXdDb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmZmZmJztcclxuICAgICAgICBuZXdDb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIG5ld0NvbnRleHQuZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIElmIGEgdGl0bGUgbmVlZCB0byBiZSBhZGRlZCB0byBjYW52YXNcclxuICAgICAgaWYgKHRpdGxlICE9PSAnJykge1xyXG4gICAgICAgIC8vIFNldCBmb250IGZvciB0aXRsZVxyXG4gICAgICAgIG5ld0NvbnRleHQuZm9udCA9ICcyNnB4IENhbGlicmknO1xyXG4gICAgICAgIHBvc2l0aW9uSENhbnZhcyA9IDMwO1xyXG4gICAgICAgIG5ld0NvbnRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XHJcbiAgICAgICAgbmV3Q29udGV4dC5maWxsVGV4dCh0aXRsZSwgd2lkdGggLyAyLCAyMCk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gU2V0IGZvbnQgZm9yIG5leHQgc2VjdGlvblxyXG4gICAgICBuZXdDb250ZXh0LmZvbnQgPSAnMjBweCBDYWxpYnJpJztcclxuICAgICAgLy8gSWYgcHJvamVjdGlvbiBuZWVkIHRvIGJlIGFkZGVkIHRvIGNhbnZhc1xyXG4gICAgICBpZiAocHJvamVjdGlvbiAhPT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBwcm9qVGV4dCA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnByaW50Rm9ybS5wcm9qZWN0aW9uJyk7XHJcbiAgICAgICAgbmV3Q29udGV4dC50ZXh0QWxpZ24gPSAnc3RhcnQnO1xyXG4gICAgICAgIG5ld0NvbnRleHQuZmlsbFRleHQoXHJcbiAgICAgICAgICBwcm9qVGV4dCArICc6ICcgKyBtYXAucHJvamVjdGlvbixcclxuICAgICAgICAgIHBvc2l0aW9uV1Byb2pTY2FsZSxcclxuICAgICAgICAgIHBvc2l0aW9uSFByb2pTY2FsZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcG9zaXRpb25XUHJvalNjYWxlICs9IDIwMDsgLy8gV2lkdGggcG9zaXRpb24gY2hhbmdlIGZvciBzY2FsZSBwb3NpdGlvblxyXG4gICAgICB9XHJcbiAgICAgIC8vIElmIHNjYWxlIG5lZWQgdG8gYmUgYWRkZWQgdG8gY2FudmFzXHJcbiAgICAgIGlmIChzY2FsZSAhPT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBzY2FsZVRleHQgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5wcmludEZvcm0uc2NhbGUnKTtcclxuICAgICAgICBjb25zdCBtYXBTY2FsZSA9IG1hcC52aWV3Q29udHJvbGxlci5nZXRTY2FsZShyZXNvbHV0aW9uKTtcclxuICAgICAgICBuZXdDb250ZXh0LnRleHRBbGlnbiA9ICdzdGFydCc7XHJcbiAgICAgICAgbmV3Q29udGV4dC5maWxsVGV4dChcclxuICAgICAgICAgIHNjYWxlVGV4dCArICc6IH4gMSAvICcgKyBmb3JtYXRTY2FsZShtYXBTY2FsZSksXHJcbiAgICAgICAgICBwb3NpdGlvbldQcm9qU2NhbGUsXHJcbiAgICAgICAgICBwb3NpdGlvbkhQcm9qU2NhbGVcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIElmIGEgY29tbWVudCBuZWVkIHRvIGJlIGFkZGVkIHRvIGNhbnZhc1xyXG4gICAgICBpZiAoY29tbWVudCAhPT0gJycpIHtcclxuICAgICAgICBuZXdDb250ZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInO1xyXG4gICAgICAgIC8vIElmIG9ubHkgb25lIGxpbmUsIG5vIG5lZWQgdG8gbXVsdGlsaW5lIHRoZSBjb21tZW50XHJcbiAgICAgICAgaWYgKGNvbW1lbnROYkxpbmUgPT09IDEpIHtcclxuICAgICAgICAgIG5ld0NvbnRleHQuZmlsbFRleHQoY29tbWVudCwgd2lkdGggLyAyLCBwb3NpdGlvbkhDb21tZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gU2VwYXJhdGUgdGhlIHNldGVuc2VzIHRvIGJlIGFwcHJveC4gdGhlIHNhbWUgbGVuZ3RoXHJcbiAgICAgICAgICBjb25zdCBuYkNvbW1lbnRDaGFyID0gY29tbWVudC5sZW5ndGg7XHJcbiAgICAgICAgICBjb25zdCBDb21tZW50TGVuZ3RoVG9DdXQgPSBNYXRoLmZsb29yKG5iQ29tbWVudENoYXIgLyBjb21tZW50TmJMaW5lKTtcclxuICAgICAgICAgIGxldCBjb21tZW50Q3VycmVudExpbmUgPSAnJztcclxuICAgICAgICAgIGxldCBwb3NpdGlvbkZpcnN0Q3V0Q2hhciA9IDA7XHJcbiAgICAgICAgICBsZXQgcG9zaXRpb25MYXN0Qmxhbms7XHJcbiAgICAgICAgICAvLyBMb29wIGZvciB0aGUgbnVtYmVyIG9mIGxpbmUgY2FsY3VsYXRlZFxyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21tZW50TmJMaW5lOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gRm9yIGFsbCBsaW5lIGV4Y2VwdCBsYXN0XHJcbiAgICAgICAgICAgIGlmIChjb21tZW50TmJMaW5lIC0gMSA+IGkpIHtcclxuICAgICAgICAgICAgICAvLyBHZXQgY29tbWVudCBjdXJyZW50IGxpbmUgdG8gZmluZCB0aGUgcmlnaHQgcGxhY2UgdHUgY3V0IGNvbW1lbnRcclxuICAgICAgICAgICAgICBjb21tZW50Q3VycmVudExpbmUgPSBjb21tZW50LnN1YnN0cihcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uRmlyc3RDdXRDaGFyLFxyXG4gICAgICAgICAgICAgICAgQ29tbWVudExlbmd0aFRvQ3V0XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAvLyBDdXQgdGhlIHNldGVuY2UgYXQgYmxhbmtcclxuICAgICAgICAgICAgICBwb3NpdGlvbkxhc3RCbGFuayA9IGNvbW1lbnRDdXJyZW50TGluZS5sYXN0SW5kZXhPZignICcpO1xyXG4gICAgICAgICAgICAgIG5ld0NvbnRleHQuZmlsbFRleHQoXHJcbiAgICAgICAgICAgICAgICBjb21tZW50Q3VycmVudExpbmUuc3Vic3RyKDAsIHBvc2l0aW9uTGFzdEJsYW5rKSxcclxuICAgICAgICAgICAgICAgIHdpZHRoIC8gMixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uSENvbW1lbnRcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uRmlyc3RDdXRDaGFyICs9IHBvc2l0aW9uTGFzdEJsYW5rO1xyXG4gICAgICAgICAgICAgIC8vIEdvIHRvIG5leHQgbGluZSBmb3IgaW5zZXJ0aW9uXHJcbiAgICAgICAgICAgICAgcG9zaXRpb25IQ29tbWVudCArPSAyMDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBEb24ndCBjdXQgbGFzdCBwYXJ0XHJcbiAgICAgICAgICAgICAgbmV3Q29udGV4dC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgIGNvbW1lbnQuc3Vic3RyKHBvc2l0aW9uRmlyc3RDdXRDaGFyKSxcclxuICAgICAgICAgICAgICAgIHdpZHRoIC8gMixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uSENvbW1lbnRcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBtYXAgdG8gbmV3IGNhbnZhc1xyXG4gICAgICBuZXdDb250ZXh0LmRyYXdJbWFnZShjb250ZXh0LmNhbnZhcywgMCwgcG9zaXRpb25IQ2FudmFzKTtcclxuXHJcbiAgICAgIGxldCBzdGF0dXMgPSBTdWJqZWN0U3RhdHVzLkRvbmU7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8gU2F2ZSB0aGUgY2FudmFzIGFzIGZpbGVcclxuICAgICAgICBpZiAoIWRvWmlwRmlsZSkge1xyXG4gICAgICAgICAgdGhpcy5zYXZlQ2FudmFzSW1hZ2VBc0ZpbGUobmV3Q2FudmFzLCAnbWFwJywgZm9ybWF0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdC50b0xvd2VyQ2FzZSgpID09PSAndGlmZicpIHtcclxuICAgICAgICAgIC8vIEFkZCB0aGUgY2FudmFzIHRvIHppcFxyXG4gICAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbnZhRmlsZVRvWmlwKFxyXG4gICAgICAgICAgICBuZXdDYW52YXMsXHJcbiAgICAgICAgICAgICdtYXAnICsgbWFwLnByb2plY3Rpb24ucmVwbGFjZSgnOicsICdfJykgKyAnLicgKyBmb3JtYXRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIEFkZCB0aGUgY2FudmFzIHRvIHppcFxyXG4gICAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbnZhRmlsZVRvWmlwKG5ld0NhbnZhcywgJ21hcCcgKyAnLicgKyBmb3JtYXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgc3RhdHVzID0gU3ViamVjdFN0YXR1cy5FcnJvcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3RhdHVzJC5uZXh0KHN0YXR1cyk7XHJcblxyXG4gICAgICBpZiAoZm9ybWF0LnRvTG93ZXJDYXNlKCkgPT09ICd0aWZmJykge1xyXG4gICAgICAgIGNvbnN0IHRpd0NvbnRlbnQgPSB0aGlzLmdldFdvcmxkRmlsZUluZm9ybWF0aW9uKG1hcCk7XHJcbiAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFt0aXdDb250ZW50XSwge1xyXG4gICAgICAgICAgdHlwZTogJ3RleHQvcGxhaW47Y2hhcnNldD11dGYtOCdcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIWRvWmlwRmlsZSkge1xyXG4gICAgICAgICAgLy8gc2F2ZUFzIGF1dG9tYXRpY2x5IHJlcGxhY2UgJzonIGZvciAnXydcclxuICAgICAgICAgIHNhdmVBcyhibG9iLCAnbWFwJyArIG1hcC5wcm9qZWN0aW9uICsgJy50ZncnKTtcclxuICAgICAgICAgIHRoaXMuc2F2ZUZpbGVQcm9jZXNzaW5nKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIEFkZCB0aGUgY2FudmFzIHRvIHppcFxyXG4gICAgICAgICAgdGhpcy5hZGRGaWxlVG9aaXAoXHJcbiAgICAgICAgICAgICdtYXAnICsgbWFwLnByb2plY3Rpb24ucmVwbGFjZSgnOicsICdfJykgKyAnLnRmdycsXHJcbiAgICAgICAgICAgIGJsb2JcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIG1hcC5vbC5yZW5kZXJTeW5jKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbmRlck1hcChtYXAsIHNpemUsIGV4dGVudCkge1xyXG4gICAgbWFwLm9sLnJlbmRlclN5bmMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNhdmUgZG9jdW1lbnRcclxuICAgKiBAcGFyYW0gIGRvYyAtIERvY3VtZW50IHRvIHNhdmVcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgc2F2ZURvYyhkb2M6IGpzUERGKSB7XHJcbiAgICBkb2Muc2F2ZSgnbWFwLnBkZicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlIHRoZSBiZXN0IEltYWdlIHNpemUgdG8gZml0IGluIHBkZlxyXG4gICAqIEBwYXJhbSBkb2MgLSBQZGYgRG9jdW1lbnRcclxuICAgKiBAcGFyYW0gY2FudmFzIC0gQ2FudmFzIG9mIGltYWdlXHJcbiAgICogQHBhcmFtIG1hcmdpbnMgLSBQYWdlIG1hcmdpbnNcclxuICAgKi9cclxuICBwcml2YXRlIGdldEltYWdlU2l6ZVRvRml0UGRmKGRvYywgY2FudmFzLCBtYXJnaW5zKSB7XHJcbiAgICAvLyBEZWZpbmUgdmFyaWFibGUgdG8gY2FsY3VsYXRlIGJlc3Qgc2l6ZSB0byBmaXQgaW4gb25lIHBhZ2VcclxuICAgIGNvbnN0IHBhZ2VIZWlnaHQgPVxyXG4gICAgICBkb2MuaW50ZXJuYWwucGFnZVNpemUuZ2V0SGVpZ2h0KCkgLSAobWFyZ2luc1swXSArIG1hcmdpbnNbMl0pO1xyXG4gICAgY29uc3QgcGFnZVdpZHRoID1cclxuICAgICAgZG9jLmludGVybmFsLnBhZ2VTaXplLmdldFdpZHRoKCkgLSAobWFyZ2luc1sxXSArIG1hcmdpbnNbM10pO1xyXG4gICAgY29uc3QgY2FuSGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIGNvbnN0IGNhbldpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgY29uc3QgaGVpZ2h0UmF0aW8gPSBjYW5IZWlnaHQgLyBwYWdlSGVpZ2h0O1xyXG4gICAgY29uc3Qgd2lkdGhSYXRpbyA9IGNhbldpZHRoIC8gcGFnZVdpZHRoO1xyXG4gICAgY29uc3QgbWF4UmF0aW8gPSBoZWlnaHRSYXRpbyA+IHdpZHRoUmF0aW8gPyBoZWlnaHRSYXRpbyA6IHdpZHRoUmF0aW87XHJcbiAgICBjb25zdCBpbWdIZWlnaCA9IG1heFJhdGlvID4gMSA/IGNhbkhlaWdodCAvIG1heFJhdGlvIDogY2FuSGVpZ2h0O1xyXG4gICAgY29uc3QgaW1nV2lkdGggPSBtYXhSYXRpbyA+IDEgPyBjYW5XaWR0aCAvIG1heFJhdGlvIDogY2FuV2lkdGg7XHJcblxyXG4gICAgcmV0dXJuIFtpbWdXaWR0aCwgaW1nSGVpZ2hdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGEgd29ybGQgZmlsZSBpbmZvcm1hdGlvbiBmb3IgdGlmZlxyXG4gICAqIEBwYXJhbSAgbWFwIC0gTWFwIG9mIHRoZSBhcHBcclxuICAgKi9cclxuICBwcml2YXRlIGdldFdvcmxkRmlsZUluZm9ybWF0aW9uKG1hcCkge1xyXG4gICAgY29uc3QgY3VycmVudFJlc29sdXRpb24gPSBtYXAudmlld0NvbnRyb2xsZXIuZ2V0UmVzb2x1dGlvbigpO1xyXG4gICAgY29uc3QgY3VycmVudEV4dGVudCA9IG1hcC52aWV3Q29udHJvbGxlci5nZXRFeHRlbnQoKTsgLy8gUmV0dXJuIFttaW54LCBtaW55LCBtYXh4LCBtYXh5XVxyXG4gICAgcmV0dXJuIFtcclxuICAgICAgY3VycmVudFJlc29sdXRpb24sXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIC1jdXJyZW50UmVzb2x1dGlvbixcclxuICAgICAgY3VycmVudEV4dGVudFswXSArIGN1cnJlbnRSZXNvbHV0aW9uIC8gMC41LFxyXG4gICAgICBjdXJyZW50RXh0ZW50WzNdIC0gY3VycmVudFJlc29sdXRpb24gLyAwLjVcclxuICAgIF0uam9pbignXFxuJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTYXZlIGNhbnZhcyBpbWFnZSBhcyBmaWxlXHJcbiAgICogQHBhcmFtIGNhbnZhcyAtIENhbnZhcyB0byBzYXZlXHJcbiAgICogQHBhcmFtIG5hbWUgLSBOYW1lIG9mIHRoZSBmaWxlXHJcbiAgICogQHBhcmFtIGZvcm1hdCAtIGZpbGUgZm9ybWF0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzYXZlQ2FudmFzSW1hZ2VBc0ZpbGUoY2FudmFzLCBuYW1lLCBmb3JtYXQpIHtcclxuICAgIGNvbnN0IGJsb2JGb3JtYXQgPSAnaW1hZ2UvJyArIGZvcm1hdDtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNhbnZhcy50b0RhdGFVUkwoKTsgLy8gSnVzdCB0byBtYWtlIHRoZSBjYXRjaCB0cmlnZ2VyIHdpaHRvdXQgdG9CbG9iIEVycm9yIHRocm93IG5vdCBjYXRjaGVkXHJcbiAgICAgIC8vIElmIG5hdmlnYXRvciBpcyBJbnRlcm5ldCBFeHBsb3JlclxyXG4gICAgICBpZiAobmF2aWdhdG9yLm1zU2F2ZUJsb2IpIHtcclxuICAgICAgICBuYXZpZ2F0b3IubXNTYXZlQmxvYihjYW52YXMubXNUb0Jsb2IoKSwgbmFtZSArICcuJyArIGZvcm1hdCk7XHJcbiAgICAgICAgdGhpcy5zYXZlRmlsZVByb2Nlc3NpbmcoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjYW52YXMudG9CbG9iKGJsb2IgPT4ge1xyXG4gICAgICAgICAgLy8gZG93bmxvYWQgaW1hZ2VcclxuICAgICAgICAgIHNhdmVBcyhibG9iLCBuYW1lICsgJy4nICsgZm9ybWF0KTtcclxuICAgICAgICAgIHRoYXQuc2F2ZUZpbGVQcm9jZXNzaW5nKCk7XHJcbiAgICAgICAgfSwgYmxvYkZvcm1hdCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmVycm9yKFxyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgJ2lnby5nZW8ucHJpbnRGb3JtLmNvcnNFcnJvck1lc3NhZ2VCb2R5J1xyXG4gICAgICAgICksXHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAnaWdvLmdlby5wcmludEZvcm0uY29yc0Vycm9yTWVzc2FnZUhlYWRlcidcclxuICAgICAgICApLFxyXG4gICAgICAgICdwcmludCdcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBmaWxlIHRvIGEgemlwXHJcbiAgICogQHBhcmFtIGNhbnZhcyAtIEZpbGUgdG8gYWRkIHRvIHRoZSB6aXBcclxuICAgKiBAcGFyYW0gIG5hbWUgLU5hbWUgb2YgdGhlIGZpbGVvdmVydmlld1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2VuZXJhdGVDYW52YUZpbGVUb1ppcChjYW52YXMsIG5hbWUpIHtcclxuICAgIGNvbnN0IGJsb2JGb3JtYXQgPSAnaW1hZ2UvJyArICdqcGVnJztcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy5oYXNPd25Qcm9wZXJ0eSgnemlwRmlsZScpIHx8XHJcbiAgICAgIHR5cGVvZiB0aGlzLnppcEZpbGUgPT09ICd1bmRlZmluZWQnXHJcbiAgICApIHtcclxuICAgICAgdGhpcy56aXBGaWxlID0gbmV3IEpTWmlwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY2FudmFzLnRvRGF0YVVSTCgpOyAvLyBKdXN0IHRvIG1ha2UgdGhlIGNhdGNoIHRyaWdnZXIgd2lodG91dCB0b0Jsb2IgRXJyb3IgdGhyb3cgbm90IGNhdGNoZWRcclxuICAgICAgaWYgKG5hdmlnYXRvci5tc1NhdmVCbG9iKSB7XHJcbiAgICAgICAgdGhpcy5hZGRGaWxlVG9aaXAobmFtZSwgY2FudmFzLm1zVG9CbG9iKCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNhbnZhcy50b0Jsb2IoYmxvYiA9PiB7XHJcbiAgICAgICAgICB0aGF0LmFkZEZpbGVUb1ppcChuYW1lLCBibG9iKTtcclxuICAgICAgICB9LCBibG9iRm9ybWF0KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuZXJyb3IoXHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAnaWdvLmdlby5wcmludEZvcm0uY29yc0Vycm9yTWVzc2FnZUJvZHknXHJcbiAgICAgICAgKSxcclxuICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICdpZ28uZ2VvLnByaW50Rm9ybS5jb3JzRXJyb3JNZXNzYWdlSGVhZGVyJ1xyXG4gICAgICAgICksXHJcbiAgICAgICAgJ3ByaW50J1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGZpbGUgdG8gemlwLCBpZiBhbGwgZmlsZSBhcmUgemlwcGVkLCBkb3dubG9hZFxyXG4gICAqIEBwYXJhbSBuYW1lIC0gTmFtZSBvZiB0aGUgZmlsZXNcclxuICAgKiBAcGFyYW0gYmxvYiAtIENvbnRhaW4gb2YgZmlsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkRmlsZVRvWmlwKG5hbWUsIGJsb2IpIHtcclxuICAgIC8vIGFkZCBmaWxlIHRvIHppcFxyXG4gICAgdGhpcy56aXBGaWxlLmZpbGUobmFtZSwgYmxvYik7XHJcbiAgICB0aGlzLm5iRmlsZVRvUHJvY2Vzcy0tO1xyXG5cclxuICAgIC8vIElmIGFsbCBmaWxlcyBhcmUgcHJvY2Nlc3NlZFxyXG4gICAgaWYgKHRoaXMubmJGaWxlVG9Qcm9jZXNzID09PSAwKSB7XHJcbiAgICAgIC8vIERvd25sb2FkIHppcCBmaWxlXHJcbiAgICAgIHRoaXMuZ2V0WmlwRmlsZSgpO1xyXG4gICAgICAvLyBTdG9wIGxvYWRpbmdcclxuICAgICAgdGhpcy5hY3Rpdml0eVNlcnZpY2UudW5yZWdpc3Rlcih0aGlzLmFjdGl2aXR5SWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzYXZlRmlsZVByb2Nlc3NpbmcoKSB7XHJcbiAgICB0aGlzLm5iRmlsZVRvUHJvY2Vzcy0tO1xyXG5cclxuICAgIC8vIElmIGFsbCBmaWxlcyBhcmUgcHJvY2Nlc3NlZFxyXG4gICAgaWYgKHRoaXMubmJGaWxlVG9Qcm9jZXNzID09PSAwKSB7XHJcbiAgICAgIC8vIFN0b3AgbG9hZGluZ1xyXG4gICAgICB0aGlzLmFjdGl2aXR5U2VydmljZS51bnJlZ2lzdGVyKHRoaXMuYWN0aXZpdHlJZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHppcHBlZCBmaWxlXHJcbiAgICogQHJldHVybiBSZXR1biBhIHppcCBmaWxlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRaaXBGaWxlKCkge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICB0aGlzLnppcEZpbGUuZ2VuZXJhdGVBc3luYyh7IHR5cGU6ICdibG9iJyB9KS50aGVuKGJsb2IgPT4ge1xyXG4gICAgICAvLyAxKSBnZW5lcmF0ZSB0aGUgemlwIGZpbGVcclxuICAgICAgc2F2ZUFzKGJsb2IsICdtYXAuemlwJyk7XHJcbiAgICAgIGRlbGV0ZSB0aGF0LnppcEZpbGU7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19