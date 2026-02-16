import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VehicleType } from '../../../../core/interfaces/vehicle.interface';

@Component({
  selector: 'app-vehicle-types-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './vehicle-types-card.component.html',
  styleUrl: './vehicle-types-card.component.scss'
})
export class VehicleTypesCardComponent {
  vehicleTypes = input.required<VehicleType[]>();
  isLoading = input<boolean>(false);
}