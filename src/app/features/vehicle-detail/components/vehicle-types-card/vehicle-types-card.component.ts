import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as VehicleSelectors from '../../../../store/selectors/vehicle.selectors';

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
  private readonly store = inject(Store);

  vehicleTypes = toSignal(
    this.store.select(VehicleSelectors.selectVehicleTypes),
    { initialValue: [] }
  );

  isLoading = toSignal(
    this.store.select(VehicleSelectors.selectVehicleTypesLoading),
    { initialValue: false }
  );
}