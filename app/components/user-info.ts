import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class UserInfoComponent extends Component {
    @tracked name = '';
    @tracked errorMsg = '';

    constructor(a: never, b: never) {
        super(a, b);

        window.addEventListener('message', (e) => {
            if (e.data.name === 'error-message') this.errorMsg = e.data.message;
        })
        // window.parent.postMessage({ name: 'error-message', message: 'unknown user !' });
        this.setName();
    }

    setName(): void {
        this.name = 'John';
    }
}
