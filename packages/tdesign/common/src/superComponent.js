import { setData } from '../runtime'
export class SuperComponent {
    constructor() {
        this.setData = setData.bind(this);
        this.app = getApp();
    }
}
