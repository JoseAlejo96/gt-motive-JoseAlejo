import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, forkJoin } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom, filter } from 'rxjs/operators';
import { VehicleApiService } from '../../core/services/vehicle-api.service';
import * as VehicleActions from '../actions/vehicle.actions';
import * as VehicleSelectors from '../selectors/vehicle.selectors';

@Injectable()
export class VehicleEffects {
    private readonly actions$ = inject(Actions);
    private readonly store = inject(Store);
    private readonly vehicleApiService = inject(VehicleApiService);

    loadMakes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleActions.loadMakes),
            withLatestFrom(this.store.select(VehicleSelectors.selectAllMakes)),
            filter(([_, makes]) => makes.length === 0),
            switchMap(() =>
                this.vehicleApiService.getAllMakes().pipe(
                    map(response =>
                        VehicleActions.loadMakesSuccess({ makes: response.Results })
                    ),
                    catchError(() =>
                        of(VehicleActions.loadMakesFailure({ error: 'Error loading makes' }))
                    )
                )
            )
        )
    );

    selectMake$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleActions.selectMake),
            switchMap(({ makeId }) =>
                forkJoin({
                    types: this.vehicleApiService.getVehicleTypesForMake(makeId),
                    models: this.vehicleApiService.getModelsForMakeId(makeId)
                }).pipe(
                    switchMap(({ types, models }) => [
                        VehicleActions.loadVehicleTypesSuccess({ types: types.Results }),
                        VehicleActions.loadModelsSuccess({ models: models.Results })
                    ]),
                    catchError(() => [
                        VehicleActions.loadVehicleTypesFailure({ error: 'Error loading data' }),
                        VehicleActions.loadModelsFailure({ error: 'Error loading data' })
                    ])
                )
            )
        )
    );
}