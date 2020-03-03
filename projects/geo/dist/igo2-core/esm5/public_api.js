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
export { IgoGestureModule } from './lib/gesture/gesture.module';
export { IgoLanguageModule } from './lib/language/language.module';
export { IgoMessageModule } from './lib/message/message.module';
export { IgoErrorModule } from './lib/request/error.module';
export { IgoLoggingModule } from './lib/request/logging.module';
export { provideConfigOptions, configFactory, provideConfigLoader, CONFIG_OPTIONS } from './lib/config/config.provider';
export { IgoGestureConfig } from './lib/gesture/gesture.provider';
export { defaultLanguageLoader, provideLanguageLoader, provideDefaultLanguageLoader } from './lib/language/shared/language.provider';
export { provideRouteServiceOptions, ROUTE_SERVICE_OPTIONS, RouteService } from './lib/route/route.service';
export {} from './lib/route/route.interface';
export { ActivityService, ActivityInterceptor } from './lib/activity';
export { AnalyticsService } from './lib/analytics';
export { ConfigService, version } from './lib/config';
export { LanguageLoader, LanguageService, IgoMissingTranslationHandler } from './lib/language';
export { Media, MediaOrientation, MediaService } from './lib/media';
export { MessageCenterComponent, MessageType, MessageService } from './lib/message';
export { ErrorInterceptor, LoggingInterceptor } from './lib/request';
export { NetworkService, NetworkIonicService } from './lib/network';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJwdWJsaWNfYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSw4QkFBYyxtQkFBbUIsQ0FBQztBQUNsQyxrQ0FBYyxnQ0FBZ0MsQ0FBQztBQUMvQyxnQ0FBYyw0QkFBNEIsQ0FBQztBQUMzQyxpQ0FBYyw4QkFBOEIsQ0FBQztBQUM3QyxrQ0FBYyxnQ0FBZ0MsQ0FBQztBQUMvQyxpQ0FBYyw4QkFBOEIsQ0FBQztBQUM3QywrQkFBYyw0QkFBNEIsQ0FBQztBQUMzQyxpQ0FBYyw4QkFBOEIsQ0FBQztBQUU3Qyx5RkFBYyw4QkFBOEIsQ0FBQztBQUM3QyxpQ0FBYyxnQ0FBZ0MsQ0FBQztBQUMvQywyRkFBYyx5Q0FBeUMsQ0FBQztBQUN4RCxnRkFBYywyQkFBMkIsQ0FBQztBQUMxQyxlQUFjLDZCQUE2QixDQUFDO0FBRTVDLHFEQUFjLGdCQUFnQixDQUFDO0FBQy9CLGlDQUFjLGlCQUFpQixDQUFDO0FBQ2hDLHVDQUFjLGNBQWMsQ0FBQztBQUM3Qiw4RUFBYyxnQkFBZ0IsQ0FBQztBQUMvQixzREFBYyxhQUFhLENBQUM7QUFDNUIsb0VBQWMsZUFBZSxDQUFDO0FBQzlCLHFEQUFjLGVBQWUsQ0FBQztBQUM5QixvREFBYyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBQdWJsaWMgQVBJIFN1cmZhY2Ugb2YgY29yZVxyXG4gKi9cclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvcmUubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvYWN0aXZpdHkvYWN0aXZpdHkubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvY29uZmlnL2NvbmZpZy5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9nZXN0dXJlL2dlc3R1cmUubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvbGFuZ3VhZ2UvbGFuZ3VhZ2UubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvbWVzc2FnZS9tZXNzYWdlLm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3JlcXVlc3QvZXJyb3IubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvcmVxdWVzdC9sb2dnaW5nLm1vZHVsZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9jb25maWcvY29uZmlnLnByb3ZpZGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvZ2VzdHVyZS9nZXN0dXJlLnByb3ZpZGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvbGFuZ3VhZ2Uvc2hhcmVkL2xhbmd1YWdlLnByb3ZpZGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvcm91dGUvcm91dGUuc2VydmljZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3JvdXRlL3JvdXRlLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9hY3Rpdml0eSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2FuYWx5dGljcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvbmZpZyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2xhbmd1YWdlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvbWVkaWEnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9tZXNzYWdlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvcmVxdWVzdCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL25ldHdvcmsnO1xyXG4iXX0=