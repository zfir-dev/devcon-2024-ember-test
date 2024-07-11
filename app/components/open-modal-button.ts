// app/components/open-modal-button.ts
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class OpenModalButtonComponent extends Component {
  @tracked isModalOpen = false;

  @action
  openModal() {
    console.log('openModal');
    this.isModalOpen = true;
  }

  @action
  closeModal() {
    this.isModalOpen = false;
  }
}
