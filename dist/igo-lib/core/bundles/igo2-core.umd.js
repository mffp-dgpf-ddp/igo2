(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/platform-browser'), require('@angular/material'), require('@igo2/utils'), require('angular2-notifications'), require('@ngx-translate/core'), require('@angular/common/http'), require('@angular/router'), require('@angular/cdk/layout'), require('rxjs'), require('rxjs/operators'), require('@ionic-native/network/ngx'), require('@ionic/angular'), require('@ionic-native/network/ngx/index'), require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@igo2/core', ['exports', '@angular/platform-browser', '@angular/material', '@igo2/utils', 'angular2-notifications', '@ngx-translate/core', '@angular/common/http', '@angular/router', '@angular/cdk/layout', 'rxjs', 'rxjs/operators', '@ionic-native/network/ngx', '@ionic/angular', '@ionic-native/network/ngx/index', '@angular/core', '@angular/common'], factory) :
    (factory((global.igo2 = global.igo2 || {}, global.igo2.core = {}),global.ng.platformBrowser,global.ng.material,global.utils,global.i1,global.i1$1,global.ng.common.http,global.ng.router,global.ng.cdk.layout,global.rxjs,global.rxjs.operators,global.ngx,global.i3,global.i2,global.ng.core,global.ng.common));
}(this, (function (exports,platformBrowser,material,utils,i1,i1$1,http,i1$2,i1$3,rxjs,operators,ngx,i3,i2,i0,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ActivityService = /** @class */ (function () {
        function ActivityService() {
            this.counter$ = new rxjs.BehaviorSubject(0);
            this.ids = [];
        }
        /**
         * @return {?}
         */
        ActivityService.prototype.register = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var id = utils.uuid();
                this.ids.push(id);
                this.counter$.next(this.ids.length);
                return id;
            };
        /**
         * @param {?} id
         * @return {?}
         */
        ActivityService.prototype.unregister = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                /** @type {?} */
                var index = this.ids.indexOf(id);
                if (index === -1) {
                    return;
                }
                this.ids.splice(index, 1);
                this.counter$.next(this.ids.length);
            };
        ActivityService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ActivityService.ctorParameters = function () { return []; };
        /** @nocollapse */ ActivityService.ngInjectableDef = i0.defineInjectable({ factory: function ActivityService_Factory() { return new ActivityService(); }, token: ActivityService, providedIn: "root" });
        return ActivityService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ActivityInterceptor = /** @class */ (function () {
        function ActivityInterceptor(activityService) {
            this.activityService = activityService;
        }
        /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
        ActivityInterceptor.prototype.intercept = /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
            function (req, next) {
                var _this = this;
                /** @type {?} */
                var activity = req.headers.get('activityInterceptor');
                if (activity) {
                    /** @type {?} */
                    var actReq = req.clone({
                        headers: req.headers.delete('activityInterceptor')
                    });
                    if (activity === 'false') {
                        return next.handle(actReq);
                    }
                }
                /** @type {?} */
                var id = this.activityService.register();
                return next.handle(req).pipe(operators.finalize(( /**
                 * @return {?}
                 */function () {
                    _this.activityService.unregister(id);
                })));
            };
        ActivityInterceptor.decorators = [
            { type: i0.Injectable }
        ];
        /** @nocollapse */
        ActivityInterceptor.ctorParameters = function () {
            return [
                { type: ActivityService }
            ];
        };
        return ActivityInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoActivityModule = /** @class */ (function () {
        function IgoActivityModule() {
        }
        /**
         * @return {?}
         */
        IgoActivityModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoActivityModule,
                    providers: [
                        {
                            provide: http.HTTP_INTERCEPTORS,
                            useClass: ActivityInterceptor,
                            multi: true
                        }
                    ]
                };
            };
        IgoActivityModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        declarations: [],
                        exports: []
                    },] }
        ];
        return IgoActivityModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ConfigService = /** @class */ (function () {
        function ConfigService(injector) {
            this.injector = injector;
            this.config = {};
        }
        /**
         * Use to get the data found in config file
         */
        /**
         * Use to get the data found in config file
         * @param {?} key
         * @return {?}
         */
        ConfigService.prototype.getConfig = /**
         * Use to get the data found in config file
         * @param {?} key
         * @return {?}
         */
            function (key) {
                return utils.ObjectUtils.resolve(this.config, key);
            };
        /**
         * This method loads "[path]" to get all config's variables
         */
        /**
         * This method loads "[path]" to get all config's variables
         * @param {?} options
         * @return {?}
         */
        ConfigService.prototype.load = /**
         * This method loads "[path]" to get all config's variables
         * @param {?} options
         * @return {?}
         */
            function (options) {
                var _this = this;
                /** @type {?} */
                var baseConfig = options.default || {};
                if (!options.path) {
                    this.config = baseConfig;
                    return true;
                }
                /** @type {?} */
                var http$$1 = this.injector.get(http.HttpClient);
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    http$$1
                        .get(options.path)
                        .pipe(operators.catchError(( /**
                 * @param {?} error
                 * @return {?}
                 */function (error) {
                        console.log("Configuration file " + options.path + " could not be read");
                        resolve(true);
                        return rxjs.throwError(error.error || 'Server error');
                    })))
                        .subscribe(( /**
                 * @param {?} configResponse
                 * @return {?}
                 */function (configResponse) {
                        _this.config = utils.ObjectUtils.mergeDeep(baseConfig, configResponse);
                        resolve(true);
                    }));
                }));
            };
        ConfigService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ConfigService.ctorParameters = function () {
            return [
                { type: i0.Injector }
            ];
        };
        /** @nocollapse */ ConfigService.ngInjectableDef = i0.defineInjectable({ factory: function ConfigService_Factory() { return new ConfigService(i0.inject(i0.INJECTOR)); }, token: ConfigService, providedIn: "root" });
        return ConfigService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CONFIG_OPTIONS = new i0.InjectionToken('configOptions');
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
        return ( /**
         * @return {?}
         */function () { return configService.load(options); });
    }
    /**
     * @return {?}
     */
    function provideConfigLoader() {
        return {
            provide: i0.APP_INITIALIZER,
            useFactory: configFactory,
            multi: true,
            deps: [ConfigService, CONFIG_OPTIONS]
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoConfigModule = /** @class */ (function () {
        function IgoConfigModule() {
        }
        /**
         * @return {?}
         */
        IgoConfigModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoConfigModule,
                    providers: [provideConfigOptions({}), provideConfigLoader()]
                };
            };
        IgoConfigModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        declarations: [],
                        exports: []
                    },] }
        ];
        return IgoConfigModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LanguageLoader = /** @class */ (function () {
        function LanguageLoader(http$$1, prefix, suffix, config) {
            if (suffix === void 0) {
                suffix = '.json';
            }
            this.http = http$$1;
            this.prefix = prefix;
            this.suffix = suffix;
            this.config = config;
        }
        /**
         * @param {?} lang
         * @return {?}
         */
        LanguageLoader.prototype.getTranslation = /**
         * @param {?} lang
         * @return {?}
         */
            function (lang) {
                /** @type {?} */
                var translation = require("../locale/" + lang + ".json");
                /** @type {?} */
                var igoLocale$ = rxjs.of(translation);
                if (this.config && !this.prefix) {
                    this.prefix = this.config.getConfig('language.prefix');
                }
                if (!this.prefix) {
                    return igoLocale$;
                }
                /** @type {?} */
                var appLocale$ = this.http.get("" + this.prefix + lang + this.suffix);
                /** @type {?} */
                var locale$ = rxjs.combineLatest(igoLocale$, appLocale$);
                return locale$.pipe(operators.map(( /**
                 * @param {?} translations
                 * @return {?}
                 */function (translations) {
                    return Object.assign(translations[0], translations[1]);
                })));
            };
        return LanguageLoader;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} http
     * @param {?=} config
     * @return {?}
     */
    function defaultLanguageLoader(http$$1, config) {
        return new LanguageLoader(http$$1, undefined, undefined, config);
    }
    /**
     * @param {?=} loader
     * @return {?}
     */
    function provideLanguageLoader(loader) {
        return {
            provide: i1$1.TranslateLoader,
            useFactory: loader || defaultLanguageLoader,
            deps: [http.HttpClient]
        };
    }
    /**
     * @param {?=} loader
     * @return {?}
     */
    function provideDefaultLanguageLoader(loader) {
        return {
            provide: i1$1.TranslateLoader,
            useFactory: loader || defaultLanguageLoader,
            deps: [http.HttpClient, ConfigService]
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoMissingTranslationHandler = /** @class */ (function () {
        function IgoMissingTranslationHandler() {
        }
        /**
         * @param {?} params
         * @return {?}
         */
        IgoMissingTranslationHandler.prototype.handle = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                if (!params.translateService.langs.length) {
                    /** @type {?} */
                    var error = 'Translations are not yet loaded. \
         Check that the LanguageService is injected.';
                    throw new Error(error);
                }
                throw new Error("The Key \"" + params.key + "\" is missing in locale file.");
            };
        return IgoMissingTranslationHandler;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoLanguageModule = /** @class */ (function () {
        function IgoLanguageModule() {
        }
        /**
         * @return {?}
         */
        IgoLanguageModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoLanguageModule,
                    providers: [provideDefaultLanguageLoader()]
                };
            };
        IgoLanguageModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            i1$1.TranslateModule.forRoot({
                                missingTranslationHandler: {
                                    provide: i1$1.MissingTranslationHandler,
                                    useClass: IgoMissingTranslationHandler
                                }
                            })
                        ],
                        declarations: [],
                        exports: [i1$1.TranslateModule]
                    },] }
        ];
        return IgoLanguageModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MessageCenterComponent = /** @class */ (function () {
        function MessageCenterComponent() {
            this._options = {};
        }
        Object.defineProperty(MessageCenterComponent.prototype, "options", {
            get: /**
             * @return {?}
             */ function () {
                return Object.assign({}, MessageCenterComponent.defaultOptions, this._options);
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._options = value;
            },
            enumerable: true,
            configurable: true
        });
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
            { type: i0.Component, args: [{
                        selector: 'igo-message-center',
                        template: "<simple-notifications\r\n  [ngClass]=\"{closeIcon: options.hasCloseIcon}\"\r\n  [options]=\"options\">\r\n</simple-notifications>\r\n",
                        styles: ["@charset \"UTF-8\";:host>>>div.simple-notification-wrapper{bottom:0;right:calc(50% - 150px)}:host>>>div.simple-notification{min-height:50px;margin-bottom:5px;padding-left:45px;padding-right:25px}:host>>>div.simple-notification.noIcon{padding-left:25px}@media only screen and (max-width:450px),only screen and (max-height:450px){:host>>>div.simple-notification-wrapper{right:0;left:0;width:100%}:host>>>div.simple-notification{margin-bottom:0}}:host>>>div.simple-notification .sn-title{line-height:23px;font-size:15px;font-weight:700}:host>>>div.simple-notification .sn-content{line-height:18px;font-size:15px}:host>>>div.simple-notification .icon{top:0;left:0;width:45px;height:100%;padding:7px}:host>>>div.simple-notification .icon mat-icon{display:flex;align-items:center;height:100%;font-size:32px}:host>>>.closeIcon>>>.sn-title:after{content:'close';font-family:'Material Icons';-webkit-font-feature-settings:'liga' 1;font-feature-settings:'liga' 1;font-size:24px;font-weight:400;right:5px;top:5px;position:absolute}"]
                    }] }
        ];
        /** @nocollapse */
        MessageCenterComponent.ctorParameters = function () { return []; };
        MessageCenterComponent.propDecorators = {
            options: [{ type: i0.Input }]
        };
        return MessageCenterComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoMessageModule = /** @class */ (function () {
        function IgoMessageModule() {
        }
        /**
         * @return {?}
         */
        IgoMessageModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoMessageModule,
                    providers: []
                };
            };
        IgoMessageModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [common.CommonModule, i1.SimpleNotificationsModule.forRoot()],
                        declarations: [MessageCenterComponent],
                        exports: [MessageCenterComponent]
                    },] }
        ];
        return IgoMessageModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var MessageType = {
        ERROR: 'error',
        ALERT: 'alert',
        INFO: 'info',
        SUCCESS: 'success',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MessageService = /** @class */ (function () {
        function MessageService(notificationService, configService) {
            this.notificationService = notificationService;
            this.configService = configService;
            this.messages$ = new rxjs.BehaviorSubject([]);
            this.options = this.configService.getConfig('message') || {};
        }
        /**
         * @param {?} httpError
         * @return {?}
         */
        MessageService.prototype.showError = /**
         * @param {?} httpError
         * @return {?}
         */
            function (httpError) {
                httpError.error.caught = true;
                return this.error(httpError.error.message, httpError.error.title);
            };
        /**
         * @param {?} message
         * @return {?}
         */
        MessageService.prototype.message = /**
         * @param {?} message
         * @return {?}
         */
            function (message) {
                this.messages$.next(this.messages$.value.concat([message]));
                message.options = message.options || {};
                message = this.handleTemplate(message);
                /** @type {?} */
                var notification;
                if (message.text) {
                    notification = this.notificationService.create(message.title, message.text, ( /** @type {?} */((( /** @type {?} */(message.type))))), message.options);
                }
                else if (message.html) {
                    if (!message.icon) {
                        message.options.theClass = message.options.theClass
                            ? message.options.theClass + ' noIcon'
                            : 'noIcon';
                    }
                    notification = this.notificationService.html(message.html, ( /** @type {?} */((( /** @type {?} */(message.type))))), message.options);
                }
                else {
                    return;
                }
                if (message.icon !== undefined) {
                    this.addIcon(notification, message.icon);
                }
                return notification;
            };
        /**
         * @param {?} text
         * @param {?=} title
         * @param {?=} options
         * @return {?}
         */
        MessageService.prototype.success = /**
         * @param {?} text
         * @param {?=} title
         * @param {?=} options
         * @return {?}
         */
            function (text, title, options) {
                if (options === void 0) {
                    options = {};
                }
                return this.message({
                    text: text,
                    title: title,
                    icon: options.icon || 'check',
                    options: options,
                    type: MessageType.SUCCESS
                });
            };
        /**
         * @param {?} text
         * @param {?=} title
         * @param {?=} options
         * @return {?}
         */
        MessageService.prototype.error = /**
         * @param {?} text
         * @param {?=} title
         * @param {?=} options
         * @return {?}
         */
            function (text, title, options) {
                if (options === void 0) {
                    options = {};
                }
                return this.message({
                    text: text,
                    title: title,
                    icon: options.icon || 'error_outline',
                    options: options,
                    type: MessageType.ERROR
                });
            };
        /**
         * @param {?} text
         * @param {?=} title
         * @param {?=} options
         * @return {?}
         */
        MessageService.prototype.info = /**
         * @param {?} text
         * @param {?=} title
         * @param {?=} options
         * @return {?}
         */
            function (text, title, options) {
                if (options === void 0) {
                    options = {};
                }
                return this.message({
                    text: text,
                    title: title,
                    icon: options.icon || 'info_outline',
                    options: options,
                    type: MessageType.INFO
                });
            };
        /**
         * @param {?} text
         * @param {?=} title
         * @param {?=} options
         * @return {?}
         */
        MessageService.prototype.alert = /**
         * @param {?} text
         * @param {?=} title
         * @param {?=} options
         * @return {?}
         */
            function (text, title, options) {
                if (options === void 0) {
                    options = {};
                }
                return this.message({
                    text: text,
                    title: title,
                    icon: options.icon || 'access_alarm',
                    options: options,
                    type: MessageType.ALERT
                });
            };
        /**
         * @param {?=} id
         * @return {?}
         */
        MessageService.prototype.remove = /**
         * @param {?=} id
         * @return {?}
         */
            function (id) {
                this.notificationService.remove(id);
            };
        /**
         * @private
         * @param {?} notification
         * @param {?} icon
         * @return {?}
         */
        MessageService.prototype.addIcon = /**
         * @private
         * @param {?} notification
         * @param {?} icon
         * @return {?}
         */
            function (notification, icon) {
                // There is no way to add an icon to a notification when reating
                // it so we simply set it on the notification directly.
                // See https://github.com/flauc/angular2-notifications/issues/165
                notification.icon = "\n      <mat-icon class=\"material-icons mat-icon mat-list-avatar\" svgIcon=\"" + icon + "\">\n      </mat-icon>";
            };
        /**
         * @private
         * @param {?} message
         * @return {?}
         */
        MessageService.prototype.handleTemplate = /**
         * @private
         * @param {?} message
         * @return {?}
         */
            function (message) {
                if (!this.options.template || message.html) {
                    return message;
                }
                /** @type {?} */
                var html = this.options.template;
                html = html.replace('${text}', message.text);
                html = html.replace('${title}', message.title);
                html = html.replace('${icon}', message.icon);
                message.html = html;
                message.text = undefined;
                message.title = undefined;
                message.icon = undefined;
                return message;
            };
        MessageService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        MessageService.ctorParameters = function () {
            return [
                { type: i1.NotificationsService },
                { type: ConfigService }
            ];
        };
        /** @nocollapse */ MessageService.ngInjectableDef = i0.defineInjectable({ factory: function MessageService_Factory() { return new MessageService(i0.inject(i1.NotificationsService), i0.inject(ConfigService)); }, token: MessageService, providedIn: "root" });
        return MessageService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LanguageService = /** @class */ (function () {
        function LanguageService(translate) {
            this.translate = translate;
            /** @type {?} */
            var lang = this.getLanguage();
            this.translate.setDefaultLang(lang);
        }
        /**
         * @return {?}
         */
        LanguageService.prototype.getLanguage = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var browserLang = this.translate.getBrowserLang();
                return browserLang.match(/en|fr/) ? browserLang : 'en';
            };
        /**
         * @param {?} language
         * @return {?}
         */
        LanguageService.prototype.setLanguage = /**
         * @param {?} language
         * @return {?}
         */
            function (language) {
                this.translate.use(language);
                this.translate.reloadLang(language);
            };
        LanguageService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        LanguageService.ctorParameters = function () {
            return [
                { type: i1$1.TranslateService }
            ];
        };
        /** @nocollapse */ LanguageService.ngInjectableDef = i0.defineInjectable({ factory: function LanguageService_Factory() { return new LanguageService(i0.inject(i1$1.TranslateService)); }, token: LanguageService, providedIn: "root" });
        return LanguageService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ErrorInterceptor = /** @class */ (function () {
        function ErrorInterceptor(messageService, injector) {
            this.messageService = messageService;
            this.injector = injector;
        }
        /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
        ErrorInterceptor.prototype.intercept = /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
            function (req, next) {
                var _this = this;
                return next.handle(req).pipe(operators.catchError(( /**
                 * @param {?} error
                 * @return {?}
                 */function (error) { return _this.handleError(error, req); })), operators.finalize(( /**
                 * @return {?}
                 */function () { return _this.handleCaughtError(); })), operators.finalize(( /**
                 * @return {?}
                 */function () { return _this.handleUncaughtError(); })));
            };
        /**
         * @private
         * @param {?} httpError
         * @param {?} req
         * @return {?}
         */
        ErrorInterceptor.prototype.handleError = /**
         * @private
         * @param {?} httpError
         * @param {?} req
         * @return {?}
         */
            function (httpError, req) {
                /** @type {?} */
                var msg = req.method + " " + req.urlWithParams + " " + httpError.status + " (" + httpError.statusText + ")";
                if (httpError instanceof http.HttpErrorResponse) {
                    /** @type {?} */
                    var errorObj = httpError.error === 'object' ? httpError.error : {};
                    errorObj.message = httpError.error.message || httpError.statusText;
                    errorObj.caught = false;
                    console.error(msg, '\n', errorObj.message, '\n\n', httpError);
                    this.httpError = new http.HttpErrorResponse({
                        error: errorObj,
                        headers: httpError.headers,
                        status: httpError.status,
                        statusText: httpError.statusText,
                        url: httpError.url
                    });
                }
                return rxjs.throwError(this.httpError);
            };
        /**
         * @private
         * @return {?}
         */
        ErrorInterceptor.prototype.handleCaughtError = /**
         * @private
         * @return {?}
         */
            function () {
                if (this.httpError && this.httpError.error.toDisplay) {
                    this.httpError.error.caught = true;
                    this.messageService.error(this.httpError.error.message, this.httpError.error.title);
                }
            };
        /**
         * @private
         * @return {?}
         */
        ErrorInterceptor.prototype.handleUncaughtError = /**
         * @private
         * @return {?}
         */
            function () {
                if (this.httpError && !this.httpError.error.caught) {
                    /** @type {?} */
                    var translate = this.injector.get(LanguageService).translate;
                    /** @type {?} */
                    var message = translate.instant('igo.core.errors.uncaught.message');
                    /** @type {?} */
                    var title = translate.instant('igo.core.errors.uncaught.title');
                    this.httpError.error.caught = true;
                    this.messageService.error(message, title);
                }
            };
        ErrorInterceptor.decorators = [
            { type: i0.Injectable }
        ];
        /** @nocollapse */
        ErrorInterceptor.ctorParameters = function () {
            return [
                { type: MessageService },
                { type: i0.Injector }
            ];
        };
        return ErrorInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoErrorModule = /** @class */ (function () {
        function IgoErrorModule() {
        }
        /**
         * @return {?}
         */
        IgoErrorModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoErrorModule,
                    providers: [
                        {
                            provide: http.HTTP_INTERCEPTORS,
                            useClass: ErrorInterceptor,
                            multi: true
                        }
                    ]
                };
            };
        IgoErrorModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        declarations: [],
                        exports: []
                    },] }
        ];
        return IgoErrorModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoCoreModule = /** @class */ (function () {
        function IgoCoreModule(matIconRegistry, domSanitizer) {
            matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/igo2/core/icons/mdi.svg'));
        }
        /**
         * @return {?}
         */
        IgoCoreModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoCoreModule,
                    providers: []
                };
            };
        IgoCoreModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            http.HttpClientModule,
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
        IgoCoreModule.ctorParameters = function () {
            return [
                { type: material.MatIconRegistry },
                { type: platformBrowser.DomSanitizer }
            ];
        };
        return IgoCoreModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LoggingInterceptor = /** @class */ (function () {
        function LoggingInterceptor() {
        }
        /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
        LoggingInterceptor.prototype.intercept = /**
         * @param {?} req
         * @param {?} next
         * @return {?}
         */
            function (req, next) {
                /** @type {?} */
                var started = Date.now();
                /** @type {?} */
                var ok;
                // extend server response observable with logging
                return next.handle(req).pipe(operators.tap((
                // Succeeds when there is a response; ignore other events
                // Succeeds when there is a response; ignore other events
                /**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return (ok = event instanceof http.HttpResponse ? 'succeeded' : ''); }), (
                // Operation failed; error is an HttpErrorResponse
                // Operation failed; error is an HttpErrorResponse
                /**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) { return (ok = 'failed'); })), 
                // Log when response observable either completes or errors
                operators.finalize(( /**
                 * @return {?}
                 */function () {
                    /** @type {?} */
                    var elapsed = Date.now() - started;
                    /** @type {?} */
                    var msg = req.method + " \"" + req.urlWithParams + "\"\n             " + ok + " in " + elapsed + " ms.";
                    console.log(msg);
                })));
            };
        LoggingInterceptor.decorators = [
            { type: i0.Injectable }
        ];
        return LoggingInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoLoggingModule = /** @class */ (function () {
        function IgoLoggingModule() {
        }
        /**
         * @return {?}
         */
        IgoLoggingModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoLoggingModule,
                    providers: [
                        {
                            provide: http.HTTP_INTERCEPTORS,
                            useClass: LoggingInterceptor,
                            multi: true
                        }
                    ]
                };
            };
        IgoLoggingModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        declarations: [],
                        exports: []
                    },] }
        ];
        return IgoLoggingModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var ROUTE_SERVICE_OPTIONS = new i0.InjectionToken('routeServiceOptions');
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
    var RouteService = /** @class */ (function () {
        function RouteService(route, options) {
            this.route = route;
            /** @type {?} */
            var defaultOptions = {
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
        Object.defineProperty(RouteService.prototype, "queryParams", {
            get: /**
             * @return {?}
             */ function () {
                return this.route.queryParams;
            },
            enumerable: true,
            configurable: true
        });
        RouteService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        RouteService.ctorParameters = function () {
            return [
                { type: i1$2.ActivatedRoute },
                { type: undefined, decorators: [{ type: i0.Inject, args: [ROUTE_SERVICE_OPTIONS,] }, { type: i0.Optional }] }
            ];
        };
        /** @nocollapse */ RouteService.ngInjectableDef = i0.defineInjectable({ factory: function RouteService_Factory() { return new RouteService(i0.inject(i1$2.ActivatedRoute), i0.inject(ROUTE_SERVICE_OPTIONS, 8)); }, token: RouteService, providedIn: "root" });
        return RouteService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AnalyticsService = /** @class */ (function () {
        function AnalyticsService(config) {
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
        AnalyticsService.prototype.initMatomo = /**
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.options.url || !this.options.id) {
                    return;
                }
                (( /** @type {?} */(window)))._paq = (( /** @type {?} */(window)))._paq || [];
                /** @type {?} */
                var paq = (( /** @type {?} */(window)))._paq;
                paq.push(['trackPageView']);
                paq.push(['enableLinkTracking']);
                (( /**
                 * @return {?}
                 */function () {
                    paq.push(['setTrackerUrl', _this.options.url + 'matomo.php']);
                    paq.push(['setSiteId', _this.options.id]);
                    /** @type {?} */
                    var g = document.createElement('script');
                    /** @type {?} */
                    var s = document.getElementsByTagName('script')[0];
                    g.type = 'text/javascript';
                    g.async = true;
                    g.defer = true;
                    g.src = _this.options.url + 'matomo.js';
                    s.parentNode.insertBefore(g, s);
                }))();
            };
        AnalyticsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        AnalyticsService.ctorParameters = function () {
            return [
                { type: ConfigService }
            ];
        };
        /** @nocollapse */ AnalyticsService.ngInjectableDef = i0.defineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(i0.inject(ConfigService)); }, token: AnalyticsService, providedIn: "root" });
        return AnalyticsService;
    }());

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
    var Media = {
        Mobile: 'mobile',
        Tablet: 'tablet',
        Desktop: 'desktop',
    };
    /** @enum {string} */
    var MediaOrientation = {
        Portrait: 'portrait',
        Landscape: 'landscape',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MediaService = /** @class */ (function () {
        function MediaService(breakpointObserver) {
            var _this = this;
            this.media$ = new rxjs.BehaviorSubject(undefined);
            this.orientation$ = new rxjs.BehaviorSubject(undefined);
            breakpointObserver
                .observe([i1$3.Breakpoints.HandsetLandscape])
                .subscribe(( /**
         * @param {?} res
         * @return {?}
         */function (res) {
                if (res.matches) {
                    _this.media$.next(Media.Mobile);
                    _this.orientation$.next(MediaOrientation.Landscape);
                }
            }));
            breakpointObserver.observe([i1$3.Breakpoints.HandsetPortrait]).subscribe(( /**
             * @param {?} res
             * @return {?}
             */function (res) {
                if (res.matches) {
                    _this.media$.next(Media.Mobile);
                    _this.orientation$.next(MediaOrientation.Portrait);
                }
            }));
            breakpointObserver.observe([i1$3.Breakpoints.TabletLandscape]).subscribe(( /**
             * @param {?} res
             * @return {?}
             */function (res) {
                if (res.matches) {
                    _this.media$.next(Media.Tablet);
                    _this.orientation$.next(MediaOrientation.Landscape);
                }
            }));
            breakpointObserver.observe([i1$3.Breakpoints.TabletPortrait]).subscribe(( /**
             * @param {?} res
             * @return {?}
             */function (res) {
                if (res.matches) {
                    _this.media$.next(Media.Tablet);
                    _this.orientation$.next(MediaOrientation.Portrait);
                }
            }));
            breakpointObserver.observe([i1$3.Breakpoints.WebLandscape]).subscribe(( /**
             * @param {?} res
             * @return {?}
             */function (res) {
                if (res.matches) {
                    _this.media$.next(Media.Desktop);
                    _this.orientation$.next(MediaOrientation.Landscape);
                }
            }));
            breakpointObserver.observe([i1$3.Breakpoints.WebPortrait]).subscribe(( /**
             * @param {?} res
             * @return {?}
             */function (res) {
                if (res.matches) {
                    _this.media$.next(Media.Desktop);
                    _this.orientation$.next(MediaOrientation.Portrait);
                }
            }));
        }
        /**
         * @return {?}
         */
        MediaService.prototype.getMedia = /**
         * @return {?}
         */
            function () {
                return this.media$.value;
            };
        /**
         * @return {?}
         */
        MediaService.prototype.getOrientation = /**
         * @return {?}
         */
            function () {
                return this.orientation$.value;
            };
        MediaService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        MediaService.ctorParameters = function () {
            return [
                { type: i1$3.BreakpointObserver }
            ];
        };
        /** @nocollapse */ MediaService.ngInjectableDef = i0.defineInjectable({ factory: function MediaService_Factory() { return new MediaService(i0.inject(i1$3.BreakpointObserver)); }, token: MediaService, providedIn: "root" });
        return MediaService;
    }());

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
    var NetworkService = /** @class */ (function () {
        function NetworkService(messageService, injector, network, platform) {
            var _this = this;
            this.messageService = messageService;
            this.injector = injector;
            this.network = network;
            this.platform = platform;
            this.stateChangeEventEmitter = new i0.EventEmitter();
            this.state = {
                connection: window.navigator.onLine
            };
            console.log(this.platform + 'premier');
            this.platform.ready().then(( /**
             * @return {?}
             */function () {
                console.log(_this.platform);
                if (_this.platform.is('cordova')) {
                    console.log('cordova');
                    if (_this.platform.is('android')) {
                        console.log('android');
                        _this.initializeService();
                    }
                }
                else {
                    console.log('browser');
                    _this.checkNetworkState();
                }
            }));
        }
        /**
         * @private
         * @return {?}
         */
        NetworkService.prototype.checkNetworkState = /**
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                this.onlineSubscription = rxjs.fromEvent(window, 'online').subscribe(( /**
                 * @return {?}
                 */function () {
                    /** @type {?} */
                    var translate = _this.injector.get(LanguageService).translate;
                    /** @type {?} */
                    var message = translate.instant('igo.core.network.online.message');
                    /** @type {?} */
                    var title = translate.instant('igo.core.network.online.title');
                    _this.messageService.info(message, title);
                    _this.state.connection = true;
                    _this.emitEvent();
                }));
                this.offlineSubscription = rxjs.fromEvent(window, 'offline').subscribe(( /**
                 * @return {?}
                 */function () {
                    /** @type {?} */
                    var translate = _this.injector.get(LanguageService).translate;
                    /** @type {?} */
                    var message = translate.instant('igo.core.network.offline.message');
                    /** @type {?} */
                    var title = translate.instant('igo.core.network.offline.title');
                    _this.messageService.info(message, title);
                    _this.state.connection = false;
                    _this.emitEvent();
                }));
            };
        /**
         * @return {?}
         */
        NetworkService.prototype.initializeService = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.network.type !== this.network.Connection.NONE) {
                    this.connectionType = this.network.type;
                    this.state.connection = true;
                }
                this.offlineSubscription = this.network.onDisconnect().subscribe(( /**
                 * @return {?}
                 */function () {
                    _this.state.connection = false;
                    setTimeout(( /**
                     * @return {?}
                     */function () {
                        if (!_this.state.connection) {
                            /** @type {?} */
                            var translate = _this.injector.get(LanguageService).translate;
                            /** @type {?} */
                            var message = translate.instant('igo.core.network.offline.message');
                            /** @type {?} */
                            var title = translate.instant('igo.core.network.offline.title');
                            _this.messageService.info(message, title);
                            _this.state.connection = false;
                            _this.emitEvent();
                        }
                    }), 10000);
                }));
                this.onlineSubscription = this.network.onConnect().subscribe(( /**
                 * @return {?}
                 */function () {
                    _this.state.connection = true;
                    setTimeout(( /**
                     * @return {?}
                     */function () {
                        if (!_this.state.connection) {
                            /** @type {?} */
                            var translate = _this.injector.get(LanguageService).translate;
                            /** @type {?} */
                            var message = translate.instant('igo.core.network.online.message');
                            /** @type {?} */
                            var title = translate.instant('igo.core.network.online.title');
                            _this.messageService.info(message, title);
                            _this.state.connection = true;
                            _this.emitEvent();
                        }
                    }), 10000);
                }));
            };
        /**
         * @private
         * @return {?}
         */
        NetworkService.prototype.emitEvent = /**
         * @private
         * @return {?}
         */
            function () {
                this.stateChangeEventEmitter.emit(this.state);
            };
        /**
         * @return {?}
         */
        NetworkService.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                try {
                    this.offlineSubscription.unsubscribe();
                    this.onlineSubscription.unsubscribe();
                }
                catch (e) {
                }
            };
        /**
         * @param {?=} reportState
         * @return {?}
         */
        NetworkService.prototype.currentState = /**
         * @param {?=} reportState
         * @return {?}
         */
            function (reportState) {
                if (reportState === void 0) {
                    reportState = true;
                }
                return reportState ?
                    this.stateChangeEventEmitter.pipe(operators.debounceTime(300), operators.startWith(this.state))
                    :
                        this.stateChangeEventEmitter.pipe(operators.debounceTime(300));
            };
        NetworkService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        NetworkService.ctorParameters = function () {
            return [
                { type: MessageService },
                { type: i0.Injector },
                { type: ngx.Network },
                { type: i3.Platform }
            ];
        };
        /** @nocollapse */ NetworkService.ngInjectableDef = i0.defineInjectable({ factory: function NetworkService_Factory() { return new NetworkService(i0.inject(MessageService), i0.inject(i0.INJECTOR), i0.inject(i2.Network), i0.inject(i3.Platform)); }, token: NetworkService, providedIn: "root" });
        return NetworkService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NetworkModule = /** @class */ (function () {
        function NetworkModule() {
        }
        NetworkModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [],
                        imports: [common.CommonModule],
                        providers: [NetworkService]
                    },] }
        ];
        return NetworkModule;
    }());

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

    exports.IgoCoreModule = IgoCoreModule;
    exports.IgoActivityModule = IgoActivityModule;
    exports.IgoConfigModule = IgoConfigModule;
    exports.IgoLanguageModule = IgoLanguageModule;
    exports.IgoMessageModule = IgoMessageModule;
    exports.IgoErrorModule = IgoErrorModule;
    exports.IgoLoggingModule = IgoLoggingModule;
    exports.provideConfigOptions = provideConfigOptions;
    exports.configFactory = configFactory;
    exports.provideConfigLoader = provideConfigLoader;
    exports.CONFIG_OPTIONS = CONFIG_OPTIONS;
    exports.defaultLanguageLoader = defaultLanguageLoader;
    exports.provideLanguageLoader = provideLanguageLoader;
    exports.provideDefaultLanguageLoader = provideDefaultLanguageLoader;
    exports.provideRouteServiceOptions = provideRouteServiceOptions;
    exports.ROUTE_SERVICE_OPTIONS = ROUTE_SERVICE_OPTIONS;
    exports.RouteService = RouteService;
    exports.ActivityService = ActivityService;
    exports.ActivityInterceptor = ActivityInterceptor;
    exports.AnalyticsService = AnalyticsService;
    exports.ConfigService = ConfigService;
    exports.LanguageLoader = LanguageLoader;
    exports.LanguageService = LanguageService;
    exports.IgoMissingTranslationHandler = IgoMissingTranslationHandler;
    exports.Media = Media;
    exports.MediaOrientation = MediaOrientation;
    exports.MediaService = MediaService;
    exports.MessageCenterComponent = MessageCenterComponent;
    exports.MessageType = MessageType;
    exports.MessageService = MessageService;
    exports.ErrorInterceptor = ErrorInterceptor;
    exports.LoggingInterceptor = LoggingInterceptor;
    exports.NetworkService = NetworkService;
    exports.NetworkModule = NetworkModule;
    exports.ɵa = ActivityInterceptor;
    exports.ɵb = ActivityService;
    exports.ɵc = ConfigService;
    exports.ɵg = LanguageLoader;
    exports.ɵf = IgoMissingTranslationHandler;
    exports.ɵh = MessageCenterComponent;
    exports.ɵe = MessageService;
    exports.ɵd = ErrorInterceptor;
    exports.ɵi = LoggingInterceptor;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=igo2-core.umd.js.map