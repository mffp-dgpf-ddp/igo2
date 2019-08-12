/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Public API Surface of core
 */
export { IgoCoreModule } from './lib/core.module';
export { IgoActivityModule } from './lib/activity/activity.module';
export { IgoConfigModule } from './lib/config/config.module';
export { IgoLanguageModule } from './lib/language/language.module';
export { IgoMessageModule } from './lib/message/message.module';
export { IgoErrorModule } from './lib/request/error.module';
export { IgoLoggingModule } from './lib/request/logging.module';
export { provideConfigOptions, configFactory, provideConfigLoader, CONFIG_OPTIONS } from './lib/config/config.provider';
export { defaultLanguageLoader, provideLanguageLoader, provideDefaultLanguageLoader } from './lib/language/shared/language.provider';
export { provideRouteServiceOptions, ROUTE_SERVICE_OPTIONS, RouteService } from './lib/route/route.service';
export {} from './lib/route/route.interface';
export { ActivityService, ActivityInterceptor } from './lib/activity';
export { AnalyticsService } from './lib/analytics';
export { ConfigService } from './lib/config';
export { LanguageLoader, LanguageService, IgoMissingTranslationHandler } from './lib/language';
export { Media, MediaOrientation, MediaService } from './lib/media';
export { MessageCenterComponent, MessageType, MessageService } from './lib/message';
export { ErrorInterceptor, LoggingInterceptor } from './lib/request';
export { NetworkService, NetworkModule } from './lib/network';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJwdWJsaWNfYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSw4QkFBYyxtQkFBbUIsQ0FBQztBQUNsQyxrQ0FBYyxnQ0FBZ0MsQ0FBQztBQUMvQyxnQ0FBYyw0QkFBNEIsQ0FBQztBQUMzQyxrQ0FBYyxnQ0FBZ0MsQ0FBQztBQUMvQyxpQ0FBYyw4QkFBOEIsQ0FBQztBQUM3QywrQkFBYyw0QkFBNEIsQ0FBQztBQUMzQyxpQ0FBYyw4QkFBOEIsQ0FBQztBQUU3Qyx5RkFBYyw4QkFBOEIsQ0FBQztBQUM3QywyRkFBYyx5Q0FBeUMsQ0FBQztBQUN4RCxnRkFBYywyQkFBMkIsQ0FBQztBQUMxQyxlQUFjLDZCQUE2QixDQUFDO0FBRTVDLHFEQUFjLGdCQUFnQixDQUFDO0FBQy9CLGlDQUFjLGlCQUFpQixDQUFDO0FBQ2hDLDhCQUFjLGNBQWMsQ0FBQztBQUM3Qiw4RUFBYyxnQkFBZ0IsQ0FBQztBQUMvQixzREFBYyxhQUFhLENBQUM7QUFDNUIsb0VBQWMsZUFBZSxDQUFDO0FBQzlCLHFEQUFjLGVBQWUsQ0FBQztBQUM5Qiw4Q0FBYyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBQdWJsaWMgQVBJIFN1cmZhY2Ugb2YgY29yZVxyXG4gKi9cclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvcmUubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvYWN0aXZpdHkvYWN0aXZpdHkubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvY29uZmlnL2NvbmZpZy5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9sYW5ndWFnZS9sYW5ndWFnZS5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9tZXNzYWdlL21lc3NhZ2UubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvcmVxdWVzdC9lcnJvci5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9yZXF1ZXN0L2xvZ2dpbmcubW9kdWxlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvbmZpZy9jb25maWcucHJvdmlkZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9sYW5ndWFnZS9zaGFyZWQvbGFuZ3VhZ2UucHJvdmlkZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9yb3V0ZS9yb3V0ZS5zZXJ2aWNlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvcm91dGUvcm91dGUuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2FjdGl2aXR5JztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvYW5hbHl0aWNzJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvY29uZmlnJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvbGFuZ3VhZ2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9tZWRpYSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL21lc3NhZ2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9yZXF1ZXN0JztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvbmV0d29yayc7XHJcbiJdfQ==