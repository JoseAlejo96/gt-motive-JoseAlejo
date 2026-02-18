import { Component, OnInit, OnDestroy, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

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
    MatTooltipModule
  ],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  filteredMakes = toSignal(
    this.store.select(VehicleSelectors.selectFilteredMakes),
    { initialValue: [] }
  );

  totalMakes = toSignal(
    this.store.select(VehicleSelectors.selectAllMakes),
    { initialValue: [] }
  );

  isLoading = toSignal(
    this.store.select(VehicleSelectors.selectMakesLoading),
    { initialValue: false }
  );

  error = toSignal(
    this.store.select(VehicleSelectors.selectMakesError),
    { initialValue: null }
  );

  searchControl = new FormControl('');
  searchValue = signal('');

  hasSearch = computed(() => !!this.searchValue());

  noResults = computed(() =>
    !this.isLoading() && this.filteredMakes().length === 0 && this.hasSearch()
  );

  resultsCount = computed(() => {
    const total = this.totalMakes().length;
    const filtered = this.filteredMakes().length;
    return this.hasSearch()
      ? `${filtered} of ${total} makes found`
      : `${total} vehicle makes available`;
  });

  ngOnInit(): void {
    this.store.dispatch(VehicleActions.filterMakes({ searchTerm: '' }));
    this.searchControl.setValue('', { emitEvent: false });
    this.store.dispatch(VehicleActions.loadMakes());

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm => {
        this.searchValue.set(searchTerm || '');
        this.store.dispatch(
          VehicleActions.filterMakes({ searchTerm: searchTerm || '' })
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  trackByMakeId(_index: number, make: VehicleMake): number {
    return make.Make_ID;
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.searchValue.set('');
  }
}