/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Public API Surface of common
 */
export { IgoActionModule } from './lib/action/action.module';
export { IgoActionbarModule } from './lib/action/actionbar/actionbar.module';
export { IgoBackdropModule } from './lib/backdrop/backdrop.module';
export { IgoClickoutModule } from './lib/clickout/clickout.module';
export { IgoCloneModule } from './lib/clone/clone.module';
export { IgoCollapsibleModule } from './lib/collapsible/collapsible.module';
export { IgoConfirmDialogModule } from './lib/confirm-dialog/confirm-dialog.module';
export { IgoContextMenuModule } from './lib/context-menu/context-menu.module';
export { IgoCustomHtmlModule } from './lib/custom-html/custom-html.module';
export { IgoDrapDropModule } from './lib/drag-drop/drag-drop.module';
export { IgoDynamicComponentModule } from './lib/dynamic-component/dynamic-component.module';
export { IgoDynamicOutletModule } from './lib/dynamic-component/dynamic-outlet/dynamic-outlet.module';
export { IgoFlexibleModule } from './lib/flexible/flexible.module';
export { IgoFormModule } from './lib/form/form.module';
export { IgoFormFormModule } from './lib/form/form/form.module';
export { IgoFormFieldModule } from './lib/form/form-field/form-field.module';
export { IgoFormGroupModule } from './lib/form/form-group/form-group.module';
export { IgoEntityModule } from './lib/entity/entity.module';
export { IgoEntitySelectorModule } from './lib/entity/entity-selector/entity-selector.module';
export { IgoEntityTableModule } from './lib/entity/entity-table/entity-table.module';
export { IgoImageModule } from './lib/image/image.module';
export { IgoJsonDialogModule } from './lib/json-dialog/json-dialog.module';
export { IgoKeyValueModule } from './lib/keyvalue/keyvalue.module';
export { IgoListModule } from './lib/list/list.module';
export { IgoPanelModule } from './lib/panel/panel.module';
export { IgoSidenavModule } from './lib/sidenav/sidenav.module';
export { IgoSpinnerModule } from './lib/spinner/spinner.module';
export { IgoStopPropagationModule } from './lib/stop-propagation/stop-propagation.module';
export { IgoTableModule } from './lib/table/table.module';
export { IgoToolModule } from './lib/tool/tool.module';
export { IgoToolboxModule } from './lib/tool/toolbox/toolbox.module';
export { IgoWidgetModule } from './lib/widget/widget.module';
export { IgoWidgetOutletModule } from './lib/widget/widget-outlet/widget-outlet.module';
export { IgoWorkspaceModule } from './lib/workspace/workspace.module';
export { IgoWorkspaceSelectorModule } from './lib/workspace/workspace-selector/workspace-selector.module';
export { IgoWorkspaceWidgetOutletModule } from './lib/workspace/workspace-widget-outlet/workspace-widget-outlet.module';
export { ActionbarMode, ActionStore } from './lib/action';
export { BackdropComponent } from './lib/backdrop';
export { ClickoutDirective } from './lib/clickout';
export { ClonePipe } from './lib/clone';
export { CollapsibleComponent, CollapseDirective } from './lib/collapsible';
export { ConfirmDialogComponent, ConfirmDialogService } from './lib/confirm-dialog';
export { ContextMenuDirective } from './lib/context-menu';
export { CustomHtmlComponent, SanitizeHtmlPipe } from './lib/custom-html';
export { DragAndDropDirective } from './lib/drag-drop';
export { DynamicComponent, DynamicComponentService } from './lib/dynamic-component';
export { formControlIsRequired, getDefaultErrorMessages, getControlErrorMessage, getAllFormFields, FormService, FormFieldService, FormFieldComponent } from './lib/form';
export { EntityOperationType, EntityTableColumnRenderer, EntityTableScrollBehavior, EntityTableSelectionState, getEntityProperty, getEntityId, getEntityTitle, getEntityTitleHtml, getEntityIcon, getEntityRevision, EntityStore, EntityStateManager, EntityStoreWatcher, EntityTransaction, EntityView, EntitySelectorComponent, EntityTableComponent } from './lib/entity';
export { FlexibleComponent } from './lib/flexible';
export { SecureImagePipe } from './lib/image';
export { JsonDialogComponent, JsonDialogService } from './lib/json-dialog';
export { KeyValuePipe } from './lib/keyvalue';
export { ListComponent, ListItemDirective } from './lib/list';
export { PanelComponent } from './lib/panel';
export { SidenavShimDirective } from './lib/sidenav';
export { SpinnerComponent, SpinnerActivityDirective } from './lib/spinner';
export { StopPropagationDirective, StopDropPropagationDirective } from './lib/stop-propagation';
export { TableComponent, TableDatabase, TableDataSource, TableActionColor } from './lib/table';
export { ToolService, ToolComponent, Toolbox } from './lib/tool';
export { Widget, WidgetService } from './lib/widget';
export { WorkspaceStore, Workspace } from './lib/workspace';
export { WorkspaceSelectorComponent } from './lib/workspace/workspace-selector/workspace-selector.component';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbInB1YmxpY19hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLGdDQUFjLDRCQUE0QixDQUFDO0FBQzNDLG1DQUFjLHlDQUF5QyxDQUFDO0FBQ3hELGtDQUFjLGdDQUFnQyxDQUFDO0FBQy9DLGtDQUFjLGdDQUFnQyxDQUFDO0FBQy9DLCtCQUFjLDBCQUEwQixDQUFDO0FBQ3pDLHFDQUFjLHNDQUFzQyxDQUFDO0FBQ3JELHVDQUFjLDRDQUE0QyxDQUFDO0FBQzNELHFDQUFjLHdDQUF3QyxDQUFDO0FBQ3ZELG9DQUFjLHNDQUFzQyxDQUFDO0FBQ3JELGtDQUFjLGtDQUFrQyxDQUFDO0FBQ2pELDBDQUFjLGtEQUFrRCxDQUFDO0FBQ2pFLHVDQUFjLDhEQUE4RCxDQUFDO0FBQzdFLGtDQUFjLGdDQUFnQyxDQUFDO0FBQy9DLDhCQUFjLHdCQUF3QixDQUFDO0FBQ3ZDLGtDQUFjLDZCQUE2QixDQUFDO0FBQzVDLG1DQUFjLHlDQUF5QyxDQUFDO0FBQ3hELG1DQUFjLHlDQUF5QyxDQUFDO0FBQ3hELGdDQUFjLDRCQUE0QixDQUFDO0FBQzNDLHdDQUFjLHFEQUFxRCxDQUFDO0FBQ3BFLHFDQUFjLCtDQUErQyxDQUFDO0FBQzlELCtCQUFjLDBCQUEwQixDQUFDO0FBQ3pDLG9DQUFjLHNDQUFzQyxDQUFDO0FBQ3JELGtDQUFjLGdDQUFnQyxDQUFDO0FBQy9DLDhCQUFjLHdCQUF3QixDQUFDO0FBQ3ZDLCtCQUFjLDBCQUEwQixDQUFDO0FBQ3pDLGlDQUFjLDhCQUE4QixDQUFDO0FBQzdDLGlDQUFjLDhCQUE4QixDQUFDO0FBQzdDLHlDQUFjLGdEQUFnRCxDQUFDO0FBQy9ELCtCQUFjLDBCQUEwQixDQUFDO0FBQ3pDLDhCQUFjLHdCQUF3QixDQUFDO0FBQ3ZDLGlDQUFjLG1DQUFtQyxDQUFDO0FBQ2xELGdDQUFjLDRCQUE0QixDQUFDO0FBQzNDLHNDQUFjLGlEQUFpRCxDQUFDO0FBQ2hFLG1DQUFjLGtDQUFrQyxDQUFDO0FBQ2pELDJDQUFjLDhEQUE4RCxDQUFDO0FBQzdFLCtDQUFjLHdFQUF3RSxDQUFDO0FBRXZGLDJDQUFjLGNBQWMsQ0FBQztBQUM3QixrQ0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixrQ0FBYyxnQkFBZ0IsQ0FBQztBQUMvQiwwQkFBYyxhQUFhLENBQUM7QUFDNUIsd0RBQWMsbUJBQW1CLENBQUM7QUFDbEMsNkRBQWMsc0JBQXNCLENBQUM7QUFDckMscUNBQWMsb0JBQW9CLENBQUM7QUFDbkMsc0RBQWMsbUJBQW1CLENBQUM7QUFDbEMscUNBQWMsaUJBQWlCLENBQUM7QUFDaEMsMERBQWMseUJBQXlCLENBQUM7QUFDeEMsNEpBQWMsWUFBWSxDQUFDO0FBQzNCLDhWQUFjLGNBQWMsQ0FBQztBQUM3QixrQ0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixnQ0FBYyxhQUFhLENBQUM7QUFDNUIsdURBQWMsbUJBQW1CLENBQUM7QUFDbEMsNkJBQWMsZ0JBQWdCLENBQUM7QUFDL0IsaURBQWMsWUFBWSxDQUFDO0FBQzNCLCtCQUFjLGFBQWEsQ0FBQztBQUM1QixxQ0FBYyxlQUFlLENBQUM7QUFDOUIsMkRBQWMsZUFBZSxDQUFDO0FBQzlCLHVFQUFjLHdCQUF3QixDQUFDO0FBQ3ZDLGlGQUFjLGFBQWEsQ0FBQztBQUM1QixvREFBYyxZQUFZLENBQUM7QUFDM0Isc0NBQWMsY0FBYyxDQUFDO0FBQzdCLDBDQUFjLGlCQUFpQixDQUFDO0FBQ2hDLDJDQUFjLGlFQUFpRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogUHVibGljIEFQSSBTdXJmYWNlIG9mIGNvbW1vblxyXG4gKi9cclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2FjdGlvbi9hY3Rpb24ubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvYWN0aW9uL2FjdGlvbmJhci9hY3Rpb25iYXIubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvYmFja2Ryb3AvYmFja2Ryb3AubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvY2xpY2tvdXQvY2xpY2tvdXQubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvY2xvbmUvY2xvbmUubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvY29sbGFwc2libGUvY29sbGFwc2libGUubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvY29uZmlybS1kaWFsb2cvY29uZmlybS1kaWFsb2cubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvY29udGV4dC1tZW51L2NvbnRleHQtbWVudS5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9jdXN0b20taHRtbC9jdXN0b20taHRtbC5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9kcmFnLWRyb3AvZHJhZy1kcm9wLm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2R5bmFtaWMtY29tcG9uZW50L2R5bmFtaWMtY29tcG9uZW50Lm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2R5bmFtaWMtY29tcG9uZW50L2R5bmFtaWMtb3V0bGV0L2R5bmFtaWMtb3V0bGV0Lm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2ZsZXhpYmxlL2ZsZXhpYmxlLm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2Zvcm0vZm9ybS5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9mb3JtL2Zvcm0vZm9ybS5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9mb3JtL2Zvcm0tZmllbGQvZm9ybS1maWVsZC5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9mb3JtL2Zvcm0tZ3JvdXAvZm9ybS1ncm91cC5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9lbnRpdHkvZW50aXR5Lm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2VudGl0eS9lbnRpdHktc2VsZWN0b3IvZW50aXR5LXNlbGVjdG9yLm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2VudGl0eS9lbnRpdHktdGFibGUvZW50aXR5LXRhYmxlLm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2ltYWdlL2ltYWdlLm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2pzb24tZGlhbG9nL2pzb24tZGlhbG9nLm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2tleXZhbHVlL2tleXZhbHVlLm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2xpc3QvbGlzdC5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9wYW5lbC9wYW5lbC5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9zaWRlbmF2L3NpZGVuYXYubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvc3Bpbm5lci9zcGlubmVyLm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3N0b3AtcHJvcGFnYXRpb24vc3RvcC1wcm9wYWdhdGlvbi5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi90YWJsZS90YWJsZS5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi90b29sL3Rvb2wubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvdG9vbC90b29sYm94L3Rvb2xib3gubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvd2lkZ2V0L3dpZGdldC5tb2R1bGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi93aWRnZXQvd2lkZ2V0LW91dGxldC93aWRnZXQtb3V0bGV0Lm1vZHVsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3dvcmtzcGFjZS93b3Jrc3BhY2UubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvd29ya3NwYWNlL3dvcmtzcGFjZS1zZWxlY3Rvci93b3Jrc3BhY2Utc2VsZWN0b3IubW9kdWxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvd29ya3NwYWNlL3dvcmtzcGFjZS13aWRnZXQtb3V0bGV0L3dvcmtzcGFjZS13aWRnZXQtb3V0bGV0Lm1vZHVsZSc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9hY3Rpb24nO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9iYWNrZHJvcCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2NsaWNrb3V0JztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvY2xvbmUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9jb2xsYXBzaWJsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvbmZpcm0tZGlhbG9nJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvY29udGV4dC1tZW51JztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvY3VzdG9tLWh0bWwnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9kcmFnLWRyb3AnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9keW5hbWljLWNvbXBvbmVudCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2Zvcm0nO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9lbnRpdHknO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9mbGV4aWJsZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2ltYWdlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvanNvbi1kaWFsb2cnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9rZXl2YWx1ZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL2xpc3QnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9wYW5lbCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NpZGVuYXYnO1xyXG5leHBvcnQgKiBmcm9tICcuL2xpYi9zcGlubmVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvc3RvcC1wcm9wYWdhdGlvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3RhYmxlJztcclxuZXhwb3J0ICogZnJvbSAnLi9saWIvdG9vbCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3dpZGdldCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3dvcmtzcGFjZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbGliL3dvcmtzcGFjZS93b3Jrc3BhY2Utc2VsZWN0b3Ivd29ya3NwYWNlLXNlbGVjdG9yLmNvbXBvbmVudCc7XHJcbiJdfQ==