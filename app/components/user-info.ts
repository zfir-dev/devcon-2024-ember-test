import { waitFor } from '@ember/test-helpers';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Promise } from 'rsvp';

export default class UserInfoComponent extends Component {
    @tracked name: string = '';
    @tracked errorMsg: string = '';
    @tracked userDate: Date | undefined = undefined;

    constructor(a: never, b: never) {
        super(a, b);

        window.addEventListener('message', (e) => {
            if (e.data.name === 'error-message') this.errorMsg = e.data.message;
        })
        this.setName();
        this.setDate();
        // window.parent.postMessage({ name: 'error-message', message: 'unknown user !' });
       
    }

    // setName(): void {
    //     this.name = 'John';
    // }

    async setName() {
        return new Promise((resolve) => {
            setTimeout(() => { 
                this.name = 'John';
                resolve(); 
            }, 2000);
        });
    }

    async setDate() {
        return new Promise((resolve) => {
            setTimeout(() => { 
                this.userDate = new Date();
                const div = document.querySelector('.date-container') as HTMLDivElement;
                div.innerHTML = `<h1 class="date">${this.userDate}</h1>`;
                resolve(); 
            }, 2000);
        });
    }
}
