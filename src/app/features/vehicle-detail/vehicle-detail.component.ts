import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

// Store
import * as VehicleActions from '../../store/actions/vehicle.actions';
import * as VehicleSelectors from '../../store/selectors/vehicle.selectors';
import { VehicleType, VehicleModel } from '../../core/interfaces/vehicle.interface';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule
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
    // Obtener el makeId de la ruta
    const makeId = Number(this.route.snapshot.paramMap.get('id'));

    // Suscribirse a los datos del store
    this.store.select(VehicleSelectors.selectSelectedMake).subscribe(make => {
      this.selectedMake.set(make);

      // Si no hay marca seleccionada, cargar desde la ruta
      if (!make && makeId) {
        // Aquí necesitaríamos obtener el nombre de la marca
        // Por ahora, redirigimos a la lista si no hay datos
        this.router.navigate(['/']);
      }
    });

    this.store.select(VehicleSelectors.selectVehicleTypes).subscribe(types => {
      this.vehicleTypes.set(types);
    });

    this.store.select(VehicleSelectors.selectModels).subscribe(models => {
      this.models.set(models);
    });

    this.store.select(VehicleSelectors.selectVehicleTypesLoading).subscribe(loading => {
      this.typesLoading.set(loading);
    });

    this.store.select(VehicleSelectors.selectModelsLoading).subscribe(loading => {
      this.modelsLoading.set(loading);
    });
  }

  ngOnDestroy(): void {
    // Limpiar los datos del detalle al salir
    this.store.dispatch(VehicleActions.clearVehicleDetail());
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}