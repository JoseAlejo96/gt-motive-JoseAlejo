import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Store
import * as VehicleActions from '../../store/actions/vehicle.actions';
import * as VehicleSelectors from '../../store/selectors/vehicle.selectors';
import { VehicleType, VehicleModel } from '../../core/interfaces/vehicle.interface';

// Subcomponents
import { VehicleTypesCardComponent } from './components/vehicle-types-card/vehicle-types-card.component';
import { VehicleModelsCardComponent } from './components/vehicle-models-card/vehicle-models-card.component';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    VehicleTypesCardComponent,
    VehicleModelsCardComponent
  ],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // Signals
  selectedMake = signal<{ id: number; name: string } | null>(null);
  vehicleTypes = signal<VehicleType[]>([]);
  models = signal<VehicleModel[]>([]);
  typesLoading = signal<boolean>(false);
  modelsLoading = signal<boolean>(false);

  ngOnInit(): void {
    const makeId = Number(this.route.snapshot.paramMap.get('id'));

    this.store.select(VehicleSelectors.selectSelectedMake).subscribe(make => {
      this.selectedMake.set(make);

      if (!make && makeId) {
        this.router.navigate(['/']);
      }
    });

    this.store.select(VehicleSelectors.selectVehicleTypes).subscribe(types => {
      this.vehicleTypes.set(types);
    });

    this.store.select(VehicleSelectors.selectModels).subscribe(models => {
      this.models.set(models);
    });

    this.store
      .select(VehicleSelectors.selectVehicleTypesLoading)
      .subscribe(loading => {
        this.typesLoading.set(loading);
      });

    this.store.select(VehicleSelectors.selectModelsLoading).subscribe(loading => {
      this.modelsLoading.set(loading);
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(VehicleActions.clearVehicleDetail());
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}