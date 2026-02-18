import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  private readonly destroy$ = new Subject<void>();

  selectedMake = toSignal(
    this.store.select(VehicleSelectors.selectSelectedMake),
    { initialValue: null }
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
          take(1),
          takeUntil(this.destroy$)
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
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(VehicleActions.clearVehicleDetail());
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}