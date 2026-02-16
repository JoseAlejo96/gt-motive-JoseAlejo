import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material/icon';

// Store
import * as VehicleActions from '../../store/actions/vehicle.actions';
import * as VehicleSelectors from '../../store/selectors/vehicle.selectors';
import { VehicleMake } from '../../core/interfaces/vehicle.interface';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ScrollingModule,
    MatIconModule
  ],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  // Signals
  filteredMakes = signal<VehicleMake[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Form Control para búsqueda
  searchControl = new FormControl('');

  // Computed para mostrar mensaje cuando no hay resultados
  noResults = computed(() => {
    return !this.isLoading() && this.filteredMakes().length === 0 && this.searchControl.value !== '';
  });

  ngOnInit(): void {
    // Cargar marcas al iniciar
    this.store.dispatch(VehicleActions.loadMakes());

    // Suscribirse a los selectores del store
    this.store.select(VehicleSelectors.selectFilteredMakes).subscribe(makes => {
      this.filteredMakes.set(makes);
    });

    this.store.select(VehicleSelectors.selectMakesLoading).subscribe(loading => {
      this.isLoading.set(loading);
    });

    this.store.select(VehicleSelectors.selectMakesError).subscribe(error => {
      this.error.set(error);
    });

    // Configurar búsqueda con debounce
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.store.dispatch(VehicleActions.filterMakes({ searchTerm: searchTerm || '' }));
      });
  }

  /**
   * Navegar al detalle de una marca
   */
  onSelectMake(make: VehicleMake): void {
    this.store.dispatch(
      VehicleActions.selectMake({
        makeId: make.Make_ID,
        makeName: make.Make_Name
      })
    );
    this.router.navigate(['/vehicle', make.Make_ID]);
  }

  /**
   * Track by para optimizar rendering del virtual scroll
   */
  trackByMakeId(index: number, make: VehicleMake): number {
    return make.Make_ID;
  }
}