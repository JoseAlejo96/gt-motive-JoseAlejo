import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VehicleModel } from '../../../../core/interfaces/vehicle.interface';

@Component({
  selector: 'app-vehicle-models-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './vehicle-models-card.component.html',
  styleUrl: './vehicle-models-card.component.scss'
})
export class VehicleModelsCardComponent {
  models = input.required<VehicleModel[]>();
  isLoading = input<boolean>(false);
}