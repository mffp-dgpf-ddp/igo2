import { AfterViewInit, OnInit, OnDestroy, QueryList, ElementRef } from '@angular/core';
import { ListItemDirective } from './list-item.directive';
export declare class ListComponent implements AfterViewInit, OnInit, OnDestroy {
    private el;
    navigation: boolean;
    private _navigation;
    selection: boolean;
    private _selection;
    selectedItem: ListItemDirective;
    private _selectedItem;
    focusedItem: ListItemDirective;
    private _focusedItem;
    private navigationEnabled;
    private listItems$$;
    private subscriptions;
    listItems: QueryList<ListItemDirective>;
    handleKeyboardEvent(event: KeyboardEvent): void;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    focus(item?: ListItemDirective): void;
    unfocus(): void;
    focusNext(): void;
    focusPrevious(): void;
    select(item?: ListItemDirective): void;
    unselect(): void;
    enableNavigation(): void;
    disableNavigation(): void;
    private init;
    private subscribe;
    private unsubscribe;
    private handleItemBeforeFocus;
    private handleItemFocus;
    private handleItemBeforeSelect;
    private handleItemSelect;
    private findSelectedItem;
    private findFocusedItem;
    private getFocusedIndex;
    private navigate;
    private scrollToItem;
}
