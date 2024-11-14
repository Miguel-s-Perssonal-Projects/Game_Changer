import { CommonModule } from '@angular/common'; // Import CommonModule
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-custom-modal',
  standalone: true,
  template: `
    <div class="modal" *ngIf="show">
      <div class="modal-content">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <button (click)="closeModal()">OK</button>
      </div>
    </div>
  `,
  styleUrls: ['./custom-modal.component.css'],
  imports: [CommonModule, RouterModule]  // Make sure CommonModule is imported here
})
export class CustomModalComponent {
  @Input() title: string = 'Alert';
  @Input() message: string = 'This is a custom alert.';
  show: boolean = false;

  openModal(message: string) {
    this.message = message;
    this.show = true;
  }

  closeModal() {
    this.show = false;
    window.location.reload();
  }
}
