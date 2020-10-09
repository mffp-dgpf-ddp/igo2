(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@igo2/utils'), require('@angular/common'), require('angular2-notifications'), require('@ngx-translate/core'), require('@angular/platform-browser'), require('@angular/material'), require('@angular/common/http'), require('@angular/router'), require('@angular/cdk/layout'), require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@ionic-native/network/ngx'), require('@ionic/angular'), require('@ionic-native/network/ngx/index')) :
    typeof define === 'function' && define.amd ? define('@igo2/core', ['exports', '@igo2/utils', '@angular/common', 'angular2-notifications', '@ngx-translate/core', '@angular/platform-browser', '@angular/material', '@angular/common/http', '@angular/router', '@angular/cdk/layout', '@angular/core', 'rxjs', 'rxjs/operators', '@ionic-native/network/ngx', '@ionic/angular', '@ionic-native/network/ngx/index'], factory) :
    (factory((global.igo2 = global.igo2 || {}, global.igo2.core = {}),global.utils,global.ng.common,global.ng2notify,global['ngxt-core'],global.ng.platformBrowser,global.ng.material,global.ng.common.http,global.ng.router,global.ng.cdk.layout,global.ng.core,global.rxjs,global.rxjs.operators,global.ngx,global.i3,global.i2));
}(this, (function (exports,utils,common,i1,i1$1,platformBrowser,material,http,i1$2,i1$3,i0,rxjs,operators,ngx,i3,i2) { 'use strict';

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
    /** @type {?} */
    var version = {
        lib: '1.4.1'
    };

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
                 * @param {?} _reject
                 * @return {?}
                 */function (resolve, _reject) {
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
                        _this.config = utils.ObjectUtils.mergeDeep(utils.ObjectUtils.mergeDeep({ version: version }, baseConfig), configResponse);
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
                var locale$ = rxjs.combineLatest([igoLocale$, appLocale$]);
                return locale$.pipe(operators.map(( /**
                 * @param {?} translations
                 * @return {?}
                 */function (translations) {
                    return utils.ObjectUtils.mergeDeep(translations[0], translations[1]);
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
                if (params.key.substr(0, 4) === 'igo.') {
                    throw new Error("The Key \"" + params.key + "\" is missing in locale file.");
                }
                else {
                    return params.key;
                }
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
                        template: "<simple-notifications\r\n  class=\"mat-typography\"\r\n  [ngClass]=\"{closeIcon: options.hasCloseIcon}\"\r\n  [options]=\"options\">\r\n</simple-notifications>\r\n",
                        styles: ["@charset \"UTF-8\";:host>>>div.simple-notification-wrapper{bottom:0;right:calc(50% - 150px)}:host>>>div.simple-notification{min-height:50px;margin-bottom:5px;padding-left:45px;padding-right:25px}:host>>>div.simple-notification.noIcon{padding-left:25px}@media only screen and (orientation:portrait) and (max-width:599px),only screen and (orientation:landscape) and (max-width:959px){:host>>>div.simple-notification-wrapper{right:0;left:0;width:100%}:host>>>div.simple-notification{margin-bottom:0}}:host>>>div.simple-notification .sn-title{line-height:23px;font-size:15px;font-weight:700}:host>>>div.simple-notification .sn-content{line-height:18px;font-size:15px}:host>>>div.simple-notification .icon{top:0;left:0;width:45px;height:100%;padding:7px}:host>>>div.simple-notification .icon mat-icon{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;height:100%;font-size:32px}:host>>>.closeIcon>>>.sn-title:after{content:'close';font-family:'Material Icons';font-feature-settings:'liga' 1;font-size:24px;font-weight:400;right:5px;top:5px;position:absolute}"]
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
            this.language = this.translate.getBrowserLang();
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
                return this.language.match(/en|fr/) ? this.language : 'en';
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
                this.language = language.match(/en|fr/) ? language : 'en';
                this.translate.use(this.language);
                this.translate.reloadLang(this.language);
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
                /** @type {?} */
                var errorContainer = { httpError: undefined };
                return next.handle(req).pipe(operators.catchError(( /**
                 * @param {?} error
                 * @return {?}
                 */function (error) { return _this.handleError(error, errorContainer); })), operators.finalize(( /**
                 * @return {?}
                 */function () {
                    _this.handleCaughtError(errorContainer);
                    _this.handleUncaughtError(errorContainer);
                })));
            };
        /**
         * @private
         * @param {?} httpError
         * @param {?} errorContainer
         * @return {?}
         */
        ErrorInterceptor.prototype.handleError = /**
         * @private
         * @param {?} httpError
         * @param {?} errorContainer
         * @return {?}
         */
            function (httpError, errorContainer) {
                if (httpError instanceof http.HttpErrorResponse) {
                    /** @type {?} */
                    var errorObj = httpError.error === 'object' ? httpError.error : {};
                    errorObj.message = httpError.error.message || httpError.statusText;
                    errorObj.caught = false;
                    httpError = new http.HttpErrorResponse({
                        error: errorObj,
                        headers: httpError.headers,
                        status: httpError.status,
                        statusText: httpError.statusText,
                        url: httpError.url
                    });
                }
                errorContainer.httpError = httpError;
                return rxjs.throwError(httpError);
            };
        /**
         * @private
         * @param {?} errorContainer
         * @return {?}
         */
        ErrorInterceptor.prototype.handleCaughtError = /**
         * @private
         * @param {?} errorContainer
         * @return {?}
         */
            function (errorContainer) {
                /** @type {?} */
                var httpError = errorContainer.httpError;
                if (httpError && httpError.error.toDisplay) {
                    httpError.error.caught = true;
                    this.messageService.error(httpError.error.message, httpError.error.title);
                }
            };
        /**
         * @private
         * @param {?} errorContainer
         * @return {?}
         */
        ErrorInterceptor.prototype.handleUncaughtError = /**
         * @private
         * @param {?} errorContainer
         * @return {?}
         */
            function (errorContainer) {
                /** @type {?} */
                var httpError = errorContainer.httpError;
                if (httpError && !httpError.error.caught) {
                    /** @type {?} */
                    var translate = this.injector.get(LanguageService).translate;
                    /** @type {?} */
                    var message = translate.instant('igo.core.errors.uncaught.message');
                    /** @type {?} */
                    var title = translate.instant('igo.core.errors.uncaught.title');
                    httpError.error.caught = true;
                    this.messageService.error(message, title);
                }
            };
        ErrorInterceptor.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        ErrorInterceptor.ctorParameters = function () {
            return [
                { type: MessageService },
                { type: i0.Injector }
            ];
        };
        /** @nocollapse */ ErrorInterceptor.ngInjectableDef = i0.defineInjectable({ factory: function ErrorInterceptor_Factory() { return new ErrorInterceptor(i0.inject(MessageService), i0.inject(i0.INJECTOR)); }, token: ErrorInterceptor, providedIn: "root" });
        return ErrorInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoErrorModule = /** @class */ (function () {
        function IgoErrorModule(parentModule) {
            if (parentModule) {
                throw new Error('IgoErrorModule is already loaded. Import it in the AppModule only');
            }
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
        /** @nocollapse */
        IgoErrorModule.ctorParameters = function () {
            return [
                { type: IgoErrorModule, decorators: [{ type: i0.Optional }, { type: i0.SkipSelf }] }
            ];
        };
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

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoGestureConfig = /** @class */ (function (_super) {
        __extends(IgoGestureConfig, _super);
        function IgoGestureConfig() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} element
         * @return {?}
         */
        IgoGestureConfig.prototype.buildHammer = /**
         * @param {?} element
         * @return {?}
         */
            function (element) {
                /** @type {?} */
                var mc = ( /** @type {?} */(_super.prototype.buildHammer.call(this, element)));
                mc.set({ touchAction: 'pan-y' });
                return mc;
            };
        IgoGestureConfig.decorators = [
            { type: i0.Injectable }
        ];
        return IgoGestureConfig;
    }(material.GestureConfig));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IgoGestureModule = /** @class */ (function () {
        function IgoGestureModule() {
        }
        /**
         * @return {?}
         */
        IgoGestureModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: IgoGestureModule,
                    providers: [
                        {
                            provide: platformBrowser.HAMMER_GESTURE_CONFIG,
                            useClass: IgoGestureConfig
                        }
                    ]
                };
            };
        IgoGestureModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        declarations: [],
                        exports: []
                    },] }
        ];
        return IgoGestureModule;
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
                directionsCoordKey: 'routing',
                toolKey: 'tool',
                wmsUrlKey: 'wmsUrl',
                wmsLayersKey: 'wmsLayers',
                wmtsUrlKey: 'wmtsUrl',
                wmtsLayersKey: 'wmtsLayers',
                vectorKey: 'vector'
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
        Object.defineProperty(AnalyticsService.prototype, "paq", {
            get: /**
             * @return {?}
             */ function () {
                return ((( /** @type {?} */(window)))._paq = (( /** @type {?} */(window)))._paq || []);
            },
            enumerable: true,
            configurable: true
        });
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
                /** @type {?} */
                var url = this.options.url.substr(-1) === '/'
                    ? this.options.url + 'matomo'
                    : this.options.url;
                // this.paq.push(['trackPageView']);
                // this.paq.push(['enableLinkTracking']);
                (( /**
                 * @return {?}
                 */function () {
                    _this.paq.push(['setTrackerUrl', url + '.php']);
                    _this.paq.push(['setSiteId', _this.options.id]);
                    /** @type {?} */
                    var g = document.createElement('script');
                    /** @type {?} */
                    var s = document.getElementsByTagName('script')[0];
                    g.type = 'text/javascript';
                    g.async = true;
                    g.defer = true;
                    g.src = url + '.js';
                    s.parentNode.insertBefore(g, s);
                }))();
            };
        /**
         * @param {?=} user
         * @param {?=} profils
         * @return {?}
         */
        AnalyticsService.prototype.setUser = /**
         * @param {?=} user
         * @param {?=} profils
         * @return {?}
         */
            function (user, profils) {
                if (this.options.provider === 'matomo') {
                    if (!user) {
                        this.paq.push(['resetUserId']);
                        this.paq.push(['deleteCustomVariable', 1, 'user']);
                        this.paq.push(['deleteCustomVariable', 2, 'name']);
                        this.paq.push(['deleteCustomVariable', 3, 'profils']);
                    }
                    else {
                        this.paq.push(['setUserId', user.id]);
                        /** @type {?} */
                        var name_1 = user.firstName + " " + user.lastName;
                        this.paq.push(['setCustomVariable', 1, 'user', user.sourceId, 'visit']);
                        this.paq.push(['setCustomVariable', 2, 'name', name_1, 'visit']);
                        this.paq.push(['setCustomVariable', 3, 'profils', profils, 'visit']);
                    }
                    this.paq.push(['trackPageView']);
                    this.paq.push(['enableLinkTracking']);
                }
            };
        /**
         * @param {?} term
         * @param {?} nbResults
         * @return {?}
         */
        AnalyticsService.prototype.trackSearch = /**
         * @param {?} term
         * @param {?} nbResults
         * @return {?}
         */
            function (term, nbResults) {
                if (this.options.provider === 'matomo') {
                    this.paq.push(['trackSiteSearch', term, false, nbResults]);
                }
            };
        /**
         * @param {?} category
         * @param {?} action
         * @param {?} name
         * @return {?}
         */
        AnalyticsService.prototype.trackEvent = /**
         * @param {?} category
         * @param {?} action
         * @param {?} name
         * @return {?}
         */
            function (category, action, name) {
                if (this.options.provider === 'matomo') {
                    this.paq.push(['trackEvent', category, action, name]);
                }
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
        /**
         * @return {?}
         */
        MediaService.prototype.isTouchScreen = /**
         * @return {?}
         */
            function () {
                return 'ontouchstart' in document.documentElement ? true : false;
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
    /** @enum {string} */
    var StorageScope = {
        SESSION: 'Session',
        LOCAL: 'Local',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var StorageService = /** @class */ (function () {
        function StorageService(config) {
            this.config = config;
            this.options = this.config.getConfig('storage') || { key: 'igo' };
        }
        /**
         * Use to get the data found in storage file
         */
        /**
         * Use to get the data found in storage file
         * @param {?} key
         * @param {?=} scope
         * @return {?}
         */
        StorageService.prototype.get = /**
         * Use to get the data found in storage file
         * @param {?} key
         * @param {?=} scope
         * @return {?}
         */
            function (key, scope) {
                /** @type {?} */
                var value;
                if (!scope || scope === StorageScope.SESSION) {
                    value = sessionStorage.getItem(this.options.key + "." + key);
                }
                if (scope === StorageScope.LOCAL || (!value && !scope)) {
                    value = localStorage.getItem(this.options.key + "." + key);
                }
                if (value) {
                    try {
                        value = JSON.parse(value);
                    }
                    catch (_a) {
                        value = value;
                    }
                }
                return value;
            };
        /**
         * @param {?} key
         * @param {?} value
         * @param {?=} scope
         * @return {?}
         */
        StorageService.prototype.set = /**
         * @param {?} key
         * @param {?} value
         * @param {?=} scope
         * @return {?}
         */
            function (key, value, scope) {
                if (scope === void 0) {
                    scope = StorageScope.LOCAL;
                }
                if (scope === StorageScope.SESSION) {
                    sessionStorage.setItem(this.options.key + "." + key, JSON.stringify(value));
                }
                else {
                    localStorage.setItem(this.options.key + "." + key, JSON.stringify(value));
                }
            };
        /**
         * @param {?} key
         * @param {?=} scope
         * @return {?}
         */
        StorageService.prototype.remove = /**
         * @param {?} key
         * @param {?=} scope
         * @return {?}
         */
            function (key, scope) {
                if (scope === void 0) {
                    scope = StorageScope.LOCAL;
                }
                if (scope === StorageScope.SESSION) {
                    sessionStorage.removeItem(this.options.key + "." + key);
                }
                else {
                    localStorage.removeItem(this.options.key + "." + key);
                }
            };
        StorageService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        StorageService.ctorParameters = function () {
            return [
                { type: ConfigService }
            ];
        };
        /** @nocollapse */ StorageService.ngInjectableDef = i0.defineInjectable({ factory: function StorageService_Factory() { return new StorageService(i0.inject(ConfigService)); }, token: StorageService, providedIn: "root" });
        return StorageService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NetworkService = /** @class */ (function () {
        function NetworkService(messageService, injector) {
            this.messageService = messageService;
            this.injector = injector;
            this.stateChangeEventEmitter = new i0.EventEmitter();
            this.state = {
                connection: window.navigator.onLine
            };
            this.checkNetworkState();
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
                catch (e) { }
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
                return reportState
                    ? this.stateChangeEventEmitter.pipe(operators.debounceTime(300), operators.startWith(this.state))
                    : this.stateChangeEventEmitter.pipe(operators.debounceTime(300));
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
                { type: i0.Injector }
            ];
        };
        /** @nocollapse */ NetworkService.ngInjectableDef = i0.defineInjectable({ factory: function NetworkService_Factory() { return new NetworkService(i0.inject(MessageService), i0.inject(i0.INJECTOR)); }, token: NetworkService, providedIn: "root" });
        return NetworkService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NetworkIonicService = /** @class */ (function () {
        function NetworkIonicService(messageService, injector, network, platform) {
            var _this = this;
            this.messageService = messageService;
            this.injector = injector;
            this.network = network;
            this.platform = platform;
            this.stateChangeEventEmitter = new i0.EventEmitter();
            this.state = {
                connection: window.navigator.onLine
            };
            this.previousState = !window.navigator.onLine;
            this.platform.ready().then(( /**
             * @return {?}
             */function () {
                if (_this.platform.is('cordova')) {
                    if (_this.platform.is('android')) {
                        _this.checkNetworkStateMobile();
                    }
                }
                else {
                    _this.checkNetworkState();
                }
            }));
        }
        /**
         * @private
         * @return {?}
         */
        NetworkIonicService.prototype.checkNetworkState = /**
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
         * @private
         * @return {?}
         */
        NetworkIonicService.prototype.checkNetworkStateMobile = /**
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                this.offlineSubscription = this.network.onDisconnect().subscribe(( /**
                 * @return {?}
                 */function () {
                    _this.state.connection = false;
                    if (_this.previousState !== _this.state.connection) {
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
                                _this.previousState = _this.state.connection;
                            }
                        }), 10000);
                    }
                }));
                this.onlineSubscription = this.network.onConnect().subscribe(( /**
                 * @return {?}
                 */function () {
                    _this.state.connection = true;
                    if (_this.previousState !== _this.state.connection) {
                        setTimeout(( /**
                         * @return {?}
                         */function () {
                            if (_this.state.connection) {
                                /** @type {?} */
                                var translate = _this.injector.get(LanguageService).translate;
                                /** @type {?} */
                                var message = translate.instant('igo.core.network.online.message');
                                /** @type {?} */
                                var title = translate.instant('igo.core.network.online.title');
                                _this.messageService.info(message, title);
                                _this.state.connection = true;
                                _this.emitEvent();
                                _this.previousState = _this.state.connection;
                            }
                        }), 10000);
                    }
                }));
            };
        /**
         * @private
         * @return {?}
         */
        NetworkIonicService.prototype.emitEvent = /**
         * @private
         * @return {?}
         */
            function () {
                this.stateChangeEventEmitter.emit(this.state);
            };
        /**
         * @return {?}
         */
        NetworkIonicService.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                try {
                    this.offlineSubscription.unsubscribe();
                    this.onlineSubscription.unsubscribe();
                }
                catch (e) { }
            };
        /**
         * @param {?=} reportState
         * @return {?}
         */
        NetworkIonicService.prototype.currentState = /**
         * @param {?=} reportState
         * @return {?}
         */
            function (reportState) {
                if (reportState === void 0) {
                    reportState = true;
                }
                return reportState
                    ? this.stateChangeEventEmitter.pipe(operators.debounceTime(300), operators.startWith(this.state))
                    : this.stateChangeEventEmitter.pipe(operators.debounceTime(300));
            };
        NetworkIonicService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        NetworkIonicService.ctorParameters = function () {
            return [
                { type: MessageService },
                { type: i0.Injector },
                { type: ngx.Network },
                { type: i3.Platform }
            ];
        };
        /** @nocollapse */ NetworkIonicService.ngInjectableDef = i0.defineInjectable({ factory: function NetworkIonicService_Factory() { return new NetworkIonicService(i0.inject(MessageService), i0.inject(i0.INJECTOR), i0.inject(i2.Network), i0.inject(i3.Platform)); }, token: NetworkIonicService, providedIn: "root" });
        return NetworkIonicService;
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
    exports.IgoGestureModule = IgoGestureModule;
    exports.IgoLanguageModule = IgoLanguageModule;
    exports.IgoMessageModule = IgoMessageModule;
    exports.IgoErrorModule = IgoErrorModule;
    exports.IgoLoggingModule = IgoLoggingModule;
    exports.provideConfigOptions = provideConfigOptions;
    exports.configFactory = configFactory;
    exports.provideConfigLoader = provideConfigLoader;
    exports.CONFIG_OPTIONS = CONFIG_OPTIONS;
    exports.IgoGestureConfig = IgoGestureConfig;
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
    exports.version = version;
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
    exports.StorageService = StorageService;
    exports.StorageScope = StorageScope;
    exports.NetworkService = NetworkService;
    exports.NetworkIonicService = NetworkIonicService;
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