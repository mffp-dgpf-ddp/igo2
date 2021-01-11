import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tool } from '@igo2/common';
import { ConfigService, RouteService, Message, MessageService, LanguageService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { IgoMap, Layer } from '@igo2/geo';
import { TypePermission } from './context.enum';
import { ContextsList, Context, DetailedContext, ContextPermission, ContextProfils } from './context.interface';
export declare class ContextService {
    private http;
    private authService;
    private languageService;
    private config;
    private messageService;
    private route;
    context$: BehaviorSubject<DetailedContext>;
    contexts$: BehaviorSubject<ContextsList>;
    defaultContextId$: BehaviorSubject<string>;
    editedContext$: BehaviorSubject<DetailedContext>;
    importedContext: Array<DetailedContext>;
    private mapViewFromRoute;
    private options;
    private baseUrl;
    private contextMessage;
    private tools;
    private toolbar;
    defaultContextUri: string;
    private _defaultContextUri;
    constructor(http: HttpClient, authService: AuthService, languageService: LanguageService, config: ConfigService, messageService: MessageService, route: RouteService);
    get(permissions?: string[], hidden?: boolean): Observable<ContextsList>;
    getById(id: string): Observable<Context>;
    getDetails(id: string): Observable<DetailedContext>;
    getDefault(): Observable<DetailedContext>;
    getProfilByUser(): Observable<ContextProfils[]>;
    setDefault(id: string): Observable<any>;
    hideContext(id: string): Observable<Object>;
    showContext(id: string): Observable<Object>;
    delete(id: string, imported?: boolean): Observable<void>;
    create(context: DetailedContext): Observable<Context>;
    clone(id: string, properties?: {}): Observable<Context>;
    update(id: string, context: Context): Observable<Context>;
    addToolAssociation(contextId: string, toolId: string): Observable<void>;
    deleteToolAssociation(contextId: string, toolId: string): Observable<any>;
    getPermissions(id: string): Observable<ContextPermission[]>;
    addPermissionAssociation(contextId: string, profil: string, type: TypePermission): Observable<ContextPermission[] | Message[]>;
    deletePermissionAssociation(contextId: string, permissionId: string): Observable<void>;
    getLocalContexts(): Observable<ContextsList>;
    getLocalContext(uri: string): Observable<DetailedContext>;
    loadContexts(permissions?: string[], hidden?: boolean): void;
    loadDefaultContext(): void;
    loadContext(uri: string): void;
    setContext(context: DetailedContext): void;
    loadEditedContext(uri: string): void;
    setEditedContext(context: DetailedContext): void;
    getContextFromMap(igoMap: IgoMap, empty?: boolean): DetailedContext;
    getContextFromLayers(igoMap: IgoMap, layers: Layer[], name: string): DetailedContext;
    setTools(tools: Tool[]): void;
    setToolbar(toolbar: string[]): void;
    private handleContextMessage;
    private getContextByUri;
    getContextLayers(igoMap: IgoMap): Layer[];
    private readParamsFromRoute;
    private getPath;
    private handleError;
    private handleContextsChange;
    private addContextToList;
    private findContext;
}