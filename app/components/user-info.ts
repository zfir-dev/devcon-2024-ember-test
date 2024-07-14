import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class UserInfoComponent extends Component {
    @tracked name = '';

    constructor(a: never, b: never) {
        super(a, b);
        this.setName();
    }

    @action 
    async setName(): Promise<void> {
        setTimeout(  
        () => this.name = 'John', 2000);
    }
}
