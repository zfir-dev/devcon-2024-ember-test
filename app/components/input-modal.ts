// app/components/input-modal.ts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface InputModalArgs {
  closeModal: () => void;
}

export default class InputModalComponent extends Component<InputModalArgs> {
  @tracked firstName = '';
  @tracked lastName = '';
  @tracked email = '';

  @action
  updateFirstName(event: Event) {
    this.firstName = (event.target as HTMLInputElement).value;
  }

  @action
  updateLastName(event: Event) {
    this.lastName = (event.target as HTMLInputElement).value;
  }

  @action
  updateEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }

  @action
  closeModal() {
    if (this.args.closeModal) {
      this.args.closeModal();
    }
  }

  @action
  save() {
    alert('Data saved successfully!');
    this.closeModal();
  }
}
