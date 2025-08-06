import { SuperComponent, RelationsOptions, ComponentsOptionsType } from '../common/src/index';
import { PickerItemOption } from './type';
export default class PickerItem extends SuperComponent {
    relations: RelationsOptions;
    options: ComponentsOptionsType;
    externalClasses: string[];
    properties: import("./type").TdPickerItemProps;
    observers: {
        'options, pickerKeys'(): void;
    };
    data: {
        prefix: string;
        classPrefix: string;
        offset: number;
        duration: number;
        value: string;
        curIndex: number;
        columnIndex: number;
        pickerKeys: {
            value: string;
            label: string;
        };
        formatOptions: PickerItemOption[];
    };
    lifetimes: {
        created(): void;
    };
    methods: {
        onClickItem(event: WechatMiniprogram.TouchEvent): void;
        onTouchStart(event: any): void;
        onTouchMove(event: any): void;
        onTouchEnd(event: any): void;
        formatOption(options: PickerItemOption[], columnIndex: number, format: any): any[];
        updateSelected(index: number, trigger: boolean): void;
        update(): void;
        getCount(): any;
    };
}
