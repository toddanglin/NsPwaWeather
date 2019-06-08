import { Injectable } from '@angular/core';
import { FilterableListpicker } from 'nativescript-filterable-listpicker';

@Injectable()
export class DialogHelper {
    public show(container:any) {
        let filterList = <FilterableListpicker>container.nativeElement;
        filterList.show();

        return true;
    }

    public hide() {
        return false;
    }
}