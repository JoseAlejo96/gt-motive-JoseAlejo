import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, take } from 'rxjs/operators';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Store
import * as VehicleActions from '../../store/actions/vehicle.actions';
import * as VehicleSelectors from '../../store/selectors/vehicle.selectors';

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

  selectedMake = toSignal(
    this.store.select(VehicleSelectors.selectSelectedMake),
    { initialValue: null }
  );

  vehicleTypes = toSignal(
    this.store.select(VehicleSelectors.selectVehicleTypes),
    { initialValue: [] }
  );

  models = toSignal(
    this.store.select(VehicleSelectors.selectModels),
    { initialValue: [] }
  );

  typesLoading = toSignal(
    this.store.select(VehicleSelectors.selectVehicleTypesLoading),
    { initialValue: false }
  );

  modelsLoading = toSignal(
    this.store.select(VehicleSelectors.selectModelsLoading),
    { initialValue: false }
  );

  ngOnInit(): void {
    const makeId = Number(this.route.snapshot.paramMap.get('id'));

    if (!makeId) {
      this.router.navigate(['/']);
      return;
    }

    if (!this.selectedMake()) {
      this.store.dispatch(VehicleActions.loadMakes());

      this.store
        .select(VehicleSelectors.selectAllMakes)
        .pipe(
          filter(makes => makes.length > 0),
          take(1)
        )
        .subscribe(makes => {
          const make = makes.find(m => m.Make_ID === makeId);

          if (make) {
            this.store.dispatch(
              VehicleActions.selectMake({
                makeId: make.Make_ID,
                makeName: make.Make_Name
              })
            );
          } else {
            this.router.navigate(['/']);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(VehicleActions.clearVehicleDetail());
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}