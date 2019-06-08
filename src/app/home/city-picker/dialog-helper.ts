import { Injectable } from '@angular/core';

@Injectable()
export class DialogHelper {
    public show(container:any) {
        return true;
    }

    public hide() {
        return false;
    }
}