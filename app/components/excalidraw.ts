import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import RSVP from 'rsvp';

export default class ExcalidrawComponent extends Component {
    @tracked isLoaded = false;
    deferredIframeLoad = RSVP.defer();

    load = task({ enqueue: true }, async (element: HTMLElement) => {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://excalidraw.com';
        iframe.width = '100%';
        iframe.height = '400px';
        iframe.style.border = 'none';
        iframe.onload = () => {
            this.isLoaded = true;
            this.deferredIframeLoad.resolve();
        };
        element.appendChild(iframe);
        await this.deferredIframeLoad.promise;
        console.log('Iframe has loaded.');
    });
}
