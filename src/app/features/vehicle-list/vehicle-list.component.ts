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
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

// Store
import * as VehicleActions from '../../store/actions/vehicle.actions';
import * as VehicleSelectors from '../../store/selectors/vehicle.selectors';
import { VehicleMake } from '../../core/interfaces/vehicle.interface';

// Pipes
import { HighlightPipe } from '../../shared/pipes/highlight.pipe';

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
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    HighlightPipe
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
  totalMakes = signal<number>(0);

  // Form Control para búsqueda
  searchControl = new FormControl('');

  // Computed signals
  noResults = computed(() => {
    return (
      !this.isLoading() &&
      this.filteredMakes().length === 0 &&
      this.searchControl.value !== ''
    );
  });

  resultsCount = computed(() => {
    const search = this.searchControl.value;
    if (!search) {
      return `${this.totalMakes()} vehicle makes available`;
    }
    return `${this.filteredMakes().length} of ${this.totalMakes()} makes found`;
  });

  ngOnInit(): void {
    this.store.dispatch(VehicleActions.loadMakes());

    this.store.select(VehicleSelectors.selectFilteredMakes).subscribe(makes => {
      this.filteredMakes.set(makes);
    });

    this.store.select(VehicleSelectors.selectAllMakes).subscribe(makes => {
      this.totalMakes.set(makes.length);
    });

    this.store.select(VehicleSelectors.selectMakesLoading).subscribe(loading => {
      this.isLoading.set(loading);
    });

    this.store.select(VehicleSelectors.selectMakesError).subscribe(error => {
      this.error.set(error);
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(searchTerm => {
        this.store.dispatch(
          VehicleActions.filterMakes({ searchTerm: searchTerm || '' })
        );
      });
  }

  onSelectMake(make: VehicleMake): void {
    this.store.dispatch(
      VehicleActions.selectMake({
        makeId: make.Make_ID,
        makeName: make.Make_Name
      })
    );
    this.router.navigate(['/vehicle', make.Make_ID]);
  }

  trackByMakeId(index: number, make: VehicleMake): number {
    return make.Make_ID;
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }
}