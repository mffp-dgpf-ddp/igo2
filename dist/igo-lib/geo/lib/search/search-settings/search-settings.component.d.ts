import { MatCheckboxChange, MatRadioChange } from '@angular/material';
import { EventEmitter } from '@angular/core';
import { SearchSourceService } from '../shared/search-source.service';
import { SearchSource } from '../shared/sources/source';
import { SearchSourceSettings, SettingOptions } from '../shared/sources/source.interfaces';
/**
 * This component allows a user to select a search type yo enable. In it's
 * current version, only one search type can be selected at once (radio). If
 * this component were to support more than one search source enabled (checkbox),
 * the searchbar component would require a small change to it's
 * placeholder getter. The search source service already supports having
 * more than one search source enabled.
 */
export declare class SearchSettingsComponent {
    private searchSourceService;
    /**
     * Event emitted when the enabled search type changes
     */
    change: EventEmitter<string>;
    constructor(searchSourceService: SearchSourceService);
    /**
     * Get all search sources
     * @internal
     */
    getSearchSources(): SearchSource[];
    /**
     * Triggered when a setting is checked (checkbox style)
     * @internal
     */
    settingsValueCheckedCheckbox(event: MatCheckboxChange, source: SearchSource, setting: SearchSourceSettings, settingValue: SettingOptions): void;
    /**
     * Triggered when a setting is checked (radiobutton style)
     * @internal
     */
    settingsValueCheckedRadioButton(event: MatRadioChange, source: SearchSource, setting: SearchSourceSettings, settingValue: SettingOptions): void;
    onCheckSearchSource(event: MatCheckboxChange, source: SearchSource): void;
}
