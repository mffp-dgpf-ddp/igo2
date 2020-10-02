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
export { StorageService, StorageScope } from './lib/storage';
export { NetworkService, NetworkIonicService } from './lib/network';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvcmUvIiwic291cmNlcyI6WyJwdWJsaWNfYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSw4QkFBYyxtQkFBbUIsQ0FBQztBQUNsQyxrQ0FBYyxnQ0FBZ0MsQ0FBQztBQUMvQyxnQ0FBYyw0QkFBNEIsQ0FBQztBQUMzQyxpQ0FBYyw4QkFBOEIsQ0FBQztBQUM3QyxrQ0FBYyxnQ0FBZ0MsQ0FBQztBQUMvQyxpQ0FBYyw4QkFBOEIsQ0FBQztBQUM3QywrQkFBYyw0QkFBNEIsQ0FBQztBQUMzQyxpQ0FBYyw4QkFBOEIsQ0FBQztBQUU3Qyx5RkFBYyw4QkFBOEIsQ0FBQztBQUM3QyxpQ0FBYyxnQ0FBZ0MsQ0FBQztBQUMvQywyRkFBYyx5Q0FBeUMsQ0FBQztBQUN4RCxnRkFBYywyQkFBMkIsQ0FBQztBQUMxQyxlQUFjLDZCQUE2QixDQUFDO0FBRTVDLHFEQUFjLGdCQUFnQixDQUFDO0FBQy9CLGlDQUFjLGlCQUFpQixDQUFDO0FBQ2hDLHVDQUFjLGNBQWMsQ0FBQztBQUM3Qiw4RUFBYyxnQkFBZ0IsQ0FBQztBQUMvQixzREFBYyxhQUFhLENBQUM7QUFDNUIsb0VBQWMsZUFBZSxDQUFDO0FBQzlCLHFEQUFjLGVBQWUsQ0FBQztBQUM5Qiw2Q0FBYyxlQUFlLENBQUM7QUFDOUIsb0RBQWMsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogUHVibGljIEFQSSBTdXJmYWNlIG9mIGNvcmVcclxuICovXHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9jb3JlLm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2FjdGl2aXR5L2FjdGl2aXR5Lm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvbmZpZy9jb25maWcubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvZ2VzdHVyZS9nZXN0dXJlLm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2xhbmd1YWdlL2xhbmd1YWdlLm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL21lc3NhZ2UvbWVzc2FnZS5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9yZXF1ZXN0L2Vycm9yLm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3JlcXVlc3QvbG9nZ2luZy5tb2R1bGUnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9saWIvY29uZmlnL2NvbmZpZy5wcm92aWRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2dlc3R1cmUvZ2VzdHVyZS5wcm92aWRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2xhbmd1YWdlL3NoYXJlZC9sYW5ndWFnZS5wcm92aWRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3JvdXRlL3JvdXRlLnNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9yb3V0ZS9yb3V0ZS5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9saWIvYWN0aXZpdHknO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9hbmFseXRpY3MnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9jb25maWcnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9sYW5ndWFnZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL21lZGlhJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvbWVzc2FnZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3JlcXVlc3QnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9zdG9yYWdlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvbmV0d29yayc7XHJcbiJdfQ==