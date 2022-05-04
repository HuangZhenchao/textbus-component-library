import { Keymap } from '@textbus/core';
export interface UICardConfig {
    label?: string;
    tooltip?: string;
    card?: HTMLElement | string;
    onclick(): void;
    keymap?: Keymap;
}
export interface UICard {
    elementRef: HTMLElement;
    disabled: boolean;
    highlight: boolean;
}
export declare function createCard(config: UICardConfig): UICard;
