import { OnInit, OnDestroy } from '@angular/core';
import { MessageService, LanguageService } from '@igo2/core';
import { Context, ContextPermission } from '../shared/context.interface';
import { ContextService } from '../shared/context.service';
import { ContextPermissionsComponent } from './context-permissions.component';
export declare class ContextPermissionsBindingDirective implements OnInit, OnDestroy {
    private contextService;
    private languageService;
    private messageService;
    private component;
    private editedContext$$;
    onAddPermission(permission: ContextPermission): void;
    onRemovePermission(permission: ContextPermission): void;
    onScopeChanged(context: Context): void;
    constructor(component: ContextPermissionsComponent, contextService: ContextService, languageService: LanguageService, messageService: MessageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private handleEditedContextChange;
}
