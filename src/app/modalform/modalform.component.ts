// form.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './modalform.component.html',
  styleUrls: ['./modalform.component.css']
})
export class FormComponent {
  description: string = '';

  constructor(public dialogRef: MatDialogRef<FormComponent>) {}

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    this.dialogRef.close(this.description);
  }
}
