import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as VehicleSelectors from '../../../../store/selectors/vehicle.selectors';

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
  private readonly store = inject(Store);

  models = toSignal(
    this.store.select(VehicleSelectors.selectModels),
    { initialValue: [] }
  );

  isLoading = toSignal(
    this.store.select(VehicleSelectors.selectModelsLoading),
    { initialValue: false }
  );
}