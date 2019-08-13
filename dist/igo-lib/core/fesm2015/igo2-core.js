import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { uuid, ObjectUtils } from '@igo2/utils';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { TranslateLoader, TranslateModule, MissingTranslationHandler, TranslateService } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse, HttpClientModule, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject, throwError, of, combineLatest, fromEvent } from 'rxjs';
import { finalize, catchError, map, tap, debounceTime, startWith } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { Network as Network$1 } from '@ionic-native/network/ngx/index';
import { Injectable, Injector, Component, Input, NgModule, APP_INITIALIZER, InjectionToken, Inject, Optional, EventEmitter, defineInjectable, inject, INJECTOR } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ActivityService {
    constructor() {
        this.counter$ = new BehaviorSubject(0);
        this.ids = [];
    }
    /**
     * @return {?}
     */
    register() {
        /** @type {?} */
        const id = uuid();
        this.ids.push(id);
        this.counter$.next(this.ids.length);
        return id;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    unregister(id) {
        /** @type {?} */
        const index = this.ids.indexOf(id);
        if (index === -1) {
            return;
        }
        this.ids.splice(index, 1);
        this.counter$.next(this.ids.length);
    }
}
ActivityService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ActivityService.ctorParameters = () => [];
/** @nocollapse */ ActivityService.ngInjectableDef = defineInjectable({ factory: function ActivityService_Factory() { return new ActivityService(); }, token: ActivityService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ActivityInterceptor {
    /**
     * @param {?} activityService
     */
    constructor(activityService) {
        this.activityService = activityService;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        /** @type {?} */
        const activity = req.headers.get('activityInterceptor');
        if (activity) {
            /** @type {?} */
            const actReq = req.clone({
                headers: req.headers.delete('activityInterceptor')
            });
            if (activity === 'false') {
                return next.handle(actReq);
            }
        }
        /** @type {?} */
        const id = this.activityService.register();
        return next.handle(req).pipe(finalize((/**
         * @return {?}
         */
        () => {
            this.activityService.unregister(id);
        })));
    }
}
ActivityInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ActivityInterceptor.ctorParameters = () => [
    { type: ActivityService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoActivityModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoActivityModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ActivityInterceptor,
                    multi: true
                }
            ]
        };
    }
}
IgoActivityModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [],
                exports: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ConfigService {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
        this.config = {};
    }
    /**
     * Use to get the data found in config file
     * @param {?} key
     * @return {?}
     */
    getConfig(key) {
        return ObjectUtils.resolve(this.config, key);
    }
    /**
     * This method loads "[path]" to get all config's variables
     * @param {?} options
     * @return {?}
     */
    load(options) {
        /** @type {?} */
        const baseConfig = options.default || {};
        if (!options.path) {
            this.config = baseConfig;
            return true;
        }
        /** @type {?} */
        const http = this.injector.get(HttpClient);
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            http
                .get(options.path)
                .pipe(catchError((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                console.log(`Configuration file ${options.path} could not be read`);
                resolve(true);
                return throwError(error.error || 'Server error');
            })))
                .subscribe((/**
             * @param {?} configResponse
             * @return {?}
             */
            configResponse => {
                this.config = ObjectUtils.mergeDeep(baseConfig, configResponse);
                resolve(true);
            }));
        }));
    }
}
ConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ConfigService.ctorParameters = () => [
    { type: Injector }
];
/** @nocollapse */ ConfigService.ngInjectableDef = defineInjectable({ factory: function ConfigService_Factory() { return new ConfigService(inject(INJECTOR)); }, token: ConfigService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let CONFIG_OPTIONS = new InjectionToken('configOptions');
/**
 * @param {?} options
 * @return {?}
 */
function provideConfigOptions(options) {
    return {
        provide: CONFIG_OPTIONS,
        useValue: options
    };
}
/**
 * @param {?} configService
 * @param {?} options
 * @return {?}
 */
function configFactory(configService, options) {
    return (/**
     * @return {?}
     */
    () => configService.load(options));
}
/**
 * @return {?}
 */
function provideConfigLoader() {
    return {
        provide: APP_INITIALIZER,
        useFactory: configFactory,
        multi: true,
        deps: [ConfigService, CONFIG_OPTIONS]
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoConfigModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoConfigModule,
            providers: [provideConfigOptions({}), provideConfigLoader()]
        };
    }
}
IgoConfigModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [],
                exports: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LanguageLoader {
    /**
     * @param {?} http
     * @param {?=} prefix
     * @param {?=} suffix
     * @param {?=} config
     */
    constructor(http, prefix, suffix = '.json', config) {
        this.http = http;
        this.prefix = prefix;
        this.suffix = suffix;
        this.config = config;
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    getTranslation(lang) {
        /** @type {?} */
        const translation = require(`../locale/${lang}.json`);
        /** @type {?} */
        const igoLocale$ = of(translation);
        if (this.config && !this.prefix) {
            this.prefix = this.config.getConfig('language.prefix');
        }
        if (!this.prefix) {
            return igoLocale$;
        }
        /** @type {?} */
        const appLocale$ = this.http.get(`${this.prefix}${lang}${this.suffix}`);
        /** @type {?} */
        const locale$ = combineLatest(igoLocale$, appLocale$);
        return locale$.pipe(map((/**
         * @param {?} translations
         * @return {?}
         */
        translations => {
            return Object.assign(translations[0], translations[1]);
        })));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?=} config
 * @return {?}
 */
function defaultLanguageLoader(http, config) {
    return new LanguageLoader(http, undefined, undefined, config);
}
/**
 * @param {?=} loader
 * @return {?}
 */
function provideLanguageLoader(loader) {
    return {
        provide: TranslateLoader,
        useFactory: loader || defaultLanguageLoader,
        deps: [HttpClient]
    };
}
/**
 * @param {?=} loader
 * @return {?}
 */
function provideDefaultLanguageLoader(loader) {
    return {
        provide: TranslateLoader,
        useFactory: loader || defaultLanguageLoader,
        deps: [HttpClient, ConfigService]
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoMissingTranslationHandler {
    /**
     * @param {?} params
     * @return {?}
     */
    handle(params) {
        if (!params.translateService.langs.length) {
            /** @type {?} */
            const error = 'Translations are not yet loaded. \
         Check that the LanguageService is injected.';
            throw new Error(error);
        }
        throw new Error(`The Key "${params.key}" is missing in locale file.`);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoLanguageModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoLanguageModule,
            providers: [provideDefaultLanguageLoader()]
        };
    }
}
IgoLanguageModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    TranslateModule.forRoot({
                        missingTranslationHandler: {
                            provide: MissingTranslationHandler,
                            useClass: IgoMissingTranslationHandler
                        }
                    })
                ],
                declarations: [],
                exports: [TranslateModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MessageCenterComponent {
    constructor() {
        this._options = {};
    }
    /**
     * @return {?}
     */
    get options() {
        return Object.assign({}, MessageCenterComponent.defaultOptions, this._options);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set options(value) {
        this._options = value;
    }
}
MessageCenterComponent.defaultOptions = {
    timeOut: 5000,
    hasCloseIcon: false,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 100,
    maxStack: 3,
    preventDuplicates: true
};
MessageCenterComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-message-center',
                template: "<simple-notifications\r\n  [ngClass]=\"{closeIcon: options.hasCloseIcon}\"\r\n  [options]=\"options\">\r\n</simple-notifications>\r\n",
                styles: ["@charset \"UTF-8\";:host>>>div.simple-notification-wrapper{bottom:0;right:calc(50% - 150px)}:host>>>div.simple-notification{min-height:50px;margin-bottom:5px;padding-left:45px;padding-right:25px}:host>>>div.simple-notification.noIcon{padding-left:25px}@media only screen and (max-width:450px),only screen and (max-height:450px){:host>>>div.simple-notification-wrapper{right:0;left:0;width:100%}:host>>>div.simple-notification{margin-bottom:0}}:host>>>div.simple-notification .sn-title{line-height:23px;font-size:15px;font-weight:700}:host>>>div.simple-notification .sn-content{line-height:18px;font-size:15px}:host>>>div.simple-notification .icon{top:0;left:0;width:45px;height:100%;padding:7px}:host>>>div.simple-notification .icon mat-icon{display:flex;align-items:center;height:100%;font-size:32px}:host>>>.closeIcon>>>.sn-title:after{content:'close';font-family:'Material Icons';-webkit-font-feature-settings:'liga' 1;font-feature-settings:'liga' 1;font-size:24px;font-weight:400;right:5px;top:5px;position:absolute}"]
            }] }
];
/** @nocollapse */
MessageCenterComponent.ctorParameters = () => [];
MessageCenterComponent.propDecorators = {
    options: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoMessageModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoMessageModule,
            providers: []
        };
    }
}
IgoMessageModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, SimpleNotificationsModule.forRoot()],
                declarations: [MessageCenterComponent],
                exports: [MessageCenterComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const MessageType = {
    ERROR: 'error',
    ALERT: 'alert',
    INFO: 'info',
    SUCCESS: 'success',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MessageService {
    /**
     * @param {?} notificationService
     * @param {?} configService
     */
    constructor(notificationService, configService) {
        this.notificationService = notificationService;
        this.configService = configService;
        this.messages$ = new BehaviorSubject([]);
        this.options = this.configService.getConfig('message') || {};
    }
    /**
     * @param {?} httpError
     * @return {?}
     */
    showError(httpError) {
        httpError.error.caught = true;
        return this.error(httpError.error.message, httpError.error.title);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    message(message) {
        this.messages$.next(this.messages$.value.concat([message]));
        message.options = message.options || {};
        message = this.handleTemplate(message);
        /** @type {?} */
        let notification;
        if (message.text) {
            notification = this.notificationService.create(message.title, message.text, (/** @type {?} */ (((/** @type {?} */ (message.type))))), message.options);
        }
        else if (message.html) {
            if (!message.icon) {
                message.options.theClass = message.options.theClass
                    ? message.options.theClass + ' noIcon'
                    : 'noIcon';
            }
            notification = this.notificationService.html(message.html, (/** @type {?} */ (((/** @type {?} */ (message.type))))), message.options);
        }
        else {
            return;
        }
        if (message.icon !== undefined) {
            this.addIcon(notification, message.icon);
        }
        return notification;
    }
    /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    success(text, title, options = {}) {
        return this.message({
            text,
            title,
            icon: options.icon || 'check',
            options,
            type: MessageType.SUCCESS
        });
    }
    /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    error(text, title, options = {}) {
        return this.message({
            text,
            title,
            icon: options.icon || 'error_outline',
            options,
            type: MessageType.ERROR
        });
    }
    /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    info(text, title, options = {}) {
        return this.message({
            text,
            title,
            icon: options.icon || 'info_outline',
            options,
            type: MessageType.INFO
        });
    }
    /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    alert(text, title, options = {}) {
        return this.message({
            text,
            title,
            icon: options.icon || 'access_alarm',
            options,
            type: MessageType.ALERT
        });
    }
    /**
     * @param {?=} id
     * @return {?}
     */
    remove(id) {
        this.notificationService.remove(id);
    }
    /**
     * @private
     * @param {?} notification
     * @param {?} icon
     * @return {?}
     */
    addIcon(notification, icon) {
        // There is no way to add an icon to a notification when reating
        // it so we simply set it on the notification directly.
        // See https://github.com/flauc/angular2-notifications/issues/165
        notification.icon = `
      <mat-icon class="material-icons mat-icon mat-list-avatar" svgIcon="${icon}">
      </mat-icon>`;
    }
    /**
     * @private
     * @param {?} message
     * @return {?}
     */
    handleTemplate(message) {
        if (!this.options.template || message.html) {
            return message;
        }
        /** @type {?} */
        let html = this.options.template;
        html = html.replace('${text}', message.text);
        html = html.replace('${title}', message.title);
        html = html.replace('${icon}', message.icon);
        message.html = html;
        message.text = undefined;
        message.title = undefined;
        message.icon = undefined;
        return message;
    }
}
MessageService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
MessageService.ctorParameters = () => [
    { type: NotificationsService },
    { type: ConfigService }
];
/** @nocollapse */ MessageService.ngInjectableDef = defineInjectable({ factory: function MessageService_Factory() { return new MessageService(inject(NotificationsService), inject(ConfigService)); }, token: MessageService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LanguageService {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        /** @type {?} */
        const lang = this.getLanguage();
        this.translate.setDefaultLang(lang);
    }
    /**
     * @return {?}
     */
    getLanguage() {
        /** @type {?} */
        const browserLang = this.translate.getBrowserLang();
        return browserLang.match(/en|fr/) ? browserLang : 'en';
    }
    /**
     * @param {?} language
     * @return {?}
     */
    setLanguage(language) {
        this.translate.use(language);
        this.translate.reloadLang(language);
    }
}
LanguageService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LanguageService.ctorParameters = () => [
    { type: TranslateService }
];
/** @nocollapse */ LanguageService.ngInjectableDef = defineInjectable({ factory: function LanguageService_Factory() { return new LanguageService(inject(TranslateService)); }, token: LanguageService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ErrorInterceptor {
    /**
     * @param {?} messageService
     * @param {?} injector
     */
    constructor(messageService, injector) {
        this.messageService = messageService;
        this.injector = injector;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        return next.handle(req).pipe(catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => this.handleError(error, req))), finalize((/**
         * @return {?}
         */
        () => this.handleCaughtError())), finalize((/**
         * @return {?}
         */
        () => this.handleUncaughtError())));
    }
    /**
     * @private
     * @param {?} httpError
     * @param {?} req
     * @return {?}
     */
    handleError(httpError, req) {
        /** @type {?} */
        const msg = `${req.method} ${req.urlWithParams} ${httpError.status} (${httpError.statusText})`;
        if (httpError instanceof HttpErrorResponse) {
            /** @type {?} */
            const errorObj = httpError.error === 'object' ? httpError.error : {};
            errorObj.message = httpError.error.message || httpError.statusText;
            errorObj.caught = false;
            console.error(msg, '\n', errorObj.message, '\n\n', httpError);
            this.httpError = new HttpErrorResponse({
                error: errorObj,
                headers: httpError.headers,
                status: httpError.status,
                statusText: httpError.statusText,
                url: httpError.url
            });
        }
        return throwError(this.httpError);
    }
    /**
     * @private
     * @return {?}
     */
    handleCaughtError() {
        if (this.httpError && this.httpError.error.toDisplay) {
            this.httpError.error.caught = true;
            this.messageService.error(this.httpError.error.message, this.httpError.error.title);
        }
    }
    /**
     * @private
     * @return {?}
     */
    handleUncaughtError() {
        if (this.httpError && !this.httpError.error.caught) {
            /** @type {?} */
            const translate = this.injector.get(LanguageService).translate;
            /** @type {?} */
            const message = translate.instant('igo.core.errors.uncaught.message');
            /** @type {?} */
            const title = translate.instant('igo.core.errors.uncaught.title');
            this.httpError.error.caught = true;
            this.messageService.error(message, title);
        }
    }
}
ErrorInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ErrorInterceptor.ctorParameters = () => [
    { type: MessageService },
    { type: Injector }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoErrorModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoErrorModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrorInterceptor,
                    multi: true
                }
            ]
        };
    }
}
IgoErrorModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [],
                exports: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoCoreModule {
    /**
     * @param {?} matIconRegistry
     * @param {?} domSanitizer
     */
    constructor(matIconRegistry, domSanitizer) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/igo2/core/icons/mdi.svg'));
    }
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoCoreModule,
            providers: []
        };
    }
}
IgoCoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpClientModule,
                    IgoActivityModule.forRoot(),
                    IgoConfigModule.forRoot(),
                    IgoErrorModule.forRoot(),
                    IgoLanguageModule.forRoot(),
                    IgoMessageModule.forRoot()
                ],
                declarations: [],
                exports: [
                    IgoActivityModule,
                    IgoConfigModule,
                    IgoErrorModule,
                    IgoLanguageModule,
                    IgoMessageModule
                ]
            },] }
];
/** @nocollapse */
IgoCoreModule.ctorParameters = () => [
    { type: MatIconRegistry },
    { type: DomSanitizer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LoggingInterceptor {
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        /** @type {?} */
        const started = Date.now();
        /** @type {?} */
        let ok;
        // extend server response observable with logging
        return next.handle(req).pipe(tap((
        // Succeeds when there is a response; ignore other events
        /**
         * @param {?} event
         * @return {?}
         */
        event => (ok = event instanceof HttpResponse ? 'succeeded' : '')), (
        // Operation failed; error is an HttpErrorResponse
        /**
         * @param {?} error
         * @return {?}
         */
        error => (ok = 'failed'))), 
        // Log when response observable either completes or errors
        finalize((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const elapsed = Date.now() - started;
            /** @type {?} */
            const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
            console.log(msg);
        })));
    }
}
LoggingInterceptor.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IgoLoggingModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoLoggingModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: LoggingInterceptor,
                    multi: true
                }
            ]
        };
    }
}
IgoLoggingModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [],
                exports: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let ROUTE_SERVICE_OPTIONS = new InjectionToken('routeServiceOptions');
/**
 * @param {?} options
 * @return {?}
 */
function provideRouteServiceOptions(options) {
    return {
        provide: ROUTE_SERVICE_OPTIONS,
        useValue: options
    };
}
class RouteService {
    /**
     * @param {?} route
     * @param {?} options
     */
    constructor(route, options) {
        this.route = route;
        /** @type {?} */
        const defaultOptions = {
            centerKey: 'center',
            zoomKey: 'zoom',
            projectionKey: 'projection',
            contextKey: 'context',
            searchKey: 'search',
            visibleOnLayersKey: 'visiblelayers',
            visibleOffLayersKey: 'invisiblelayers',
            routingCoordKey: 'routing',
            toolKey: 'tool',
            llcKKey: 'llck',
            llcAKey: 'llca',
            llcVKey: 'llcv',
            llcRKey: 'llcr'
        };
        this.options = Object.assign({}, defaultOptions, options);
    }
    /**
     * @return {?}
     */
    get queryParams() {
        return this.route.queryParams;
    }
}
RouteService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
RouteService.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: undefined, decorators: [{ type: Inject, args: [ROUTE_SERVICE_OPTIONS,] }, { type: Optional }] }
];
/** @nocollapse */ RouteService.ngInjectableDef = defineInjectable({ factory: function RouteService_Factory() { return new RouteService(inject(ActivatedRoute), inject(ROUTE_SERVICE_OPTIONS, 8)); }, token: RouteService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AnalyticsService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        this.options = this.config.getConfig('analytics') || {};
        if (this.options.provider === 'matomo') {
            this.initMatomo();
        }
    }
    /**
     * @private
     * @return {?}
     */
    initMatomo() {
        if (!this.options.url || !this.options.id) {
            return;
        }
        ((/** @type {?} */ (window)))._paq = ((/** @type {?} */ (window)))._paq || [];
        /** @type {?} */
        const paq = ((/** @type {?} */ (window)))._paq;
        paq.push(['trackPageView']);
        paq.push(['enableLinkTracking']);
        ((/**
         * @return {?}
         */
        () => {
            paq.push(['setTrackerUrl', this.options.url + 'matomo.php']);
            paq.push(['setSiteId', this.options.id]);
            /** @type {?} */
            const g = document.createElement('script');
            /** @type {?} */
            const s = document.getElementsByTagName('script')[0];
            g.type = 'text/javascript';
            g.async = true;
            g.defer = true;
            g.src = this.options.url + 'matomo.js';
            s.parentNode.insertBefore(g, s);
        }))();
    }
}
AnalyticsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AnalyticsService.ctorParameters = () => [
    { type: ConfigService }
];
/** @nocollapse */ AnalyticsService.ngInjectableDef = defineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(inject(ConfigService)); }, token: AnalyticsService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const Media = {
    Mobile: 'mobile',
    Tablet: 'tablet',
    Desktop: 'desktop',
};
/** @enum {string} */
const MediaOrientation = {
    Portrait: 'portrait',
    Landscape: 'landscape',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MediaService {
    /**
     * @param {?} breakpointObserver
     */
    constructor(breakpointObserver) {
        this.media$ = new BehaviorSubject(undefined);
        this.orientation$ = new BehaviorSubject(undefined);
        breakpointObserver
            .observe([Breakpoints.HandsetLandscape])
            .subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res.matches) {
                this.media$.next(Media.Mobile);
                this.orientation$.next(MediaOrientation.Landscape);
            }
        }));
        breakpointObserver.observe([Breakpoints.HandsetPortrait]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res.matches) {
                this.media$.next(Media.Mobile);
                this.orientation$.next(MediaOrientation.Portrait);
            }
        }));
        breakpointObserver.observe([Breakpoints.TabletLandscape]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res.matches) {
                this.media$.next(Media.Tablet);
                this.orientation$.next(MediaOrientation.Landscape);
            }
        }));
        breakpointObserver.observe([Breakpoints.TabletPortrait]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res.matches) {
                this.media$.next(Media.Tablet);
                this.orientation$.next(MediaOrientation.Portrait);
            }
        }));
        breakpointObserver.observe([Breakpoints.WebLandscape]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res.matches) {
                this.media$.next(Media.Desktop);
                this.orientation$.next(MediaOrientation.Landscape);
            }
        }));
        breakpointObserver.observe([Breakpoints.WebPortrait]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res.matches) {
                this.media$.next(Media.Desktop);
                this.orientation$.next(MediaOrientation.Portrait);
            }
        }));
    }
    /**
     * @return {?}
     */
    getMedia() {
        return this.media$.value;
    }
    /**
     * @return {?}
     */
    getOrientation() {
        return this.orientation$.value;
    }
}
MediaService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
MediaService.ctorParameters = () => [
    { type: BreakpointObserver }
];
/** @nocollapse */ MediaService.ngInjectableDef = defineInjectable({ factory: function MediaService_Factory() { return new MediaService(inject(BreakpointObserver)); }, token: MediaService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NetworkService {
    /**
     * @param {?} messageService
     * @param {?} injector
     * @param {?} network
     * @param {?} platform
     */
    constructor(messageService, injector, network, platform) {
        this.messageService = messageService;
        this.injector = injector;
        this.network = network;
        this.platform = platform;
        this.stateChangeEventEmitter = new EventEmitter();
        this.state = {
            connection: window.navigator.onLine
        };
        console.log(this.platform + 'premier');
        this.platform.ready().then((/**
         * @return {?}
         */
        () => {
            console.log(this.platform);
            if (this.platform.is('cordova')) {
                console.log('cordova');
                if (this.platform.is('android')) {
                    console.log('android');
                    this.initializeService();
                }
            }
            else {
                console.log('browser');
                this.checkNetworkState();
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    checkNetworkState() {
        this.onlineSubscription = fromEvent(window, 'online').subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const translate = this.injector.get(LanguageService).translate;
            /** @type {?} */
            const message = translate.instant('igo.core.network.online.message');
            /** @type {?} */
            const title = translate.instant('igo.core.network.online.title');
            this.messageService.info(message, title);
            this.state.connection = true;
            this.emitEvent();
        }));
        this.offlineSubscription = fromEvent(window, 'offline').subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const translate = this.injector.get(LanguageService).translate;
            /** @type {?} */
            const message = translate.instant('igo.core.network.offline.message');
            /** @type {?} */
            const title = translate.instant('igo.core.network.offline.title');
            this.messageService.info(message, title);
            this.state.connection = false;
            this.emitEvent();
        }));
    }
    /**
     * @return {?}
     */
    initializeService() {
        if (this.network.type !== this.network.Connection.NONE) {
            this.connectionType = this.network.type;
            this.state.connection = true;
        }
        this.offlineSubscription = this.network.onDisconnect().subscribe((/**
         * @return {?}
         */
        () => {
            this.state.connection = false;
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (!this.state.connection) {
                    /** @type {?} */
                    const translate = this.injector.get(LanguageService).translate;
                    /** @type {?} */
                    const message = translate.instant('igo.core.network.offline.message');
                    /** @type {?} */
                    const title = translate.instant('igo.core.network.offline.title');
                    this.messageService.info(message, title);
                    this.state.connection = false;
                    this.emitEvent();
                }
            }), 10000);
        }));
        this.onlineSubscription = this.network.onConnect().subscribe((/**
         * @return {?}
         */
        () => {
            this.state.connection = true;
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (!this.state.connection) {
                    /** @type {?} */
                    const translate = this.injector.get(LanguageService).translate;
                    /** @type {?} */
                    const message = translate.instant('igo.core.network.online.message');
                    /** @type {?} */
                    const title = translate.instant('igo.core.network.online.title');
                    this.messageService.info(message, title);
                    this.state.connection = true;
                    this.emitEvent();
                }
            }), 10000);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    emitEvent() {
        this.stateChangeEventEmitter.emit(this.state);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        try {
            this.offlineSubscription.unsubscribe();
            this.onlineSubscription.unsubscribe();
        }
        catch (e) {
        }
    }
    /**
     * @param {?=} reportState
     * @return {?}
     */
    currentState(reportState = true) {
        return reportState ?
            this.stateChangeEventEmitter.pipe(debounceTime(300), startWith(this.state))
            :
                this.stateChangeEventEmitter.pipe(debounceTime(300));
    }
}
NetworkService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NetworkService.ctorParameters = () => [
    { type: MessageService },
    { type: Injector },
    { type: Network },
    { type: Platform }
];
/** @nocollapse */ NetworkService.ngInjectableDef = defineInjectable({ factory: function NetworkService_Factory() { return new NetworkService(inject(MessageService), inject(INJECTOR), inject(Network$1), inject(Platform)); }, token: NetworkService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NetworkModule {
}
NetworkModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [CommonModule],
                providers: [NetworkService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { IgoCoreModule, IgoActivityModule, IgoConfigModule, IgoLanguageModule, IgoMessageModule, IgoErrorModule, IgoLoggingModule, provideConfigOptions, configFactory, provideConfigLoader, CONFIG_OPTIONS, defaultLanguageLoader, provideLanguageLoader, provideDefaultLanguageLoader, provideRouteServiceOptions, ROUTE_SERVICE_OPTIONS, RouteService, ActivityService, ActivityInterceptor, AnalyticsService, ConfigService, LanguageLoader, LanguageService, IgoMissingTranslationHandler, Media, MediaOrientation, MediaService, MessageCenterComponent, MessageType, MessageService, ErrorInterceptor, LoggingInterceptor, NetworkService, NetworkModule, ActivityInterceptor as ɵa, ActivityService as ɵb, ConfigService as ɵc, LanguageLoader as ɵg, IgoMissingTranslationHandler as ɵf, MessageCenterComponent as ɵh, MessageService as ɵe, ErrorInterceptor as ɵd, LoggingInterceptor as ɵi };

//# sourceMappingURL=igo2-core.js.map