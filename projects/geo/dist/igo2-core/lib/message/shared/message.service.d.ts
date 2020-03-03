import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Notification, NotificationsService } from 'angular2-notifications';
import { ConfigService } from '../../config/config.service';
import { Message } from './message.interface';
export declare class MessageService {
    private notificationService;
    private configService;
    messages$: BehaviorSubject<Message[]>;
    private options;
    constructor(notificationService: NotificationsService, configService: ConfigService);
    showError(httpError: HttpErrorResponse): Notification;
    message(message: Message): Notification;
    success(text: string, title?: string, options?: any): Notification;
    error(text: string, title?: string, options?: any): Notification;
    info(text: string, title?: string, options?: any): Notification;
    alert(text: string, title?: string, options?: any): Notification;
    remove(id?: string): void;
    private addIcon;
    private handleTemplate;
}
