import { MessageService, LanguageService } from '@igo2/core';
import { Layer } from '../../layer/shared';
export declare class DownloadService {
    private messageService;
    private languageService;
    private ogcFilterWriter;
    constructor(messageService: MessageService, languageService: LanguageService);
    open(layer: Layer): void;
}
