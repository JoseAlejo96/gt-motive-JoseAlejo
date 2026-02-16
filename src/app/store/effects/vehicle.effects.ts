import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { VehicleApiService } from '../../core/services/vehicle-api.service';
import * as VehicleActions from '../actions/vehicle.actions';

@Injectable()
export class VehicleEffects {
    private readonly actions$ = inject(Actions);
    private readonly vehicleApiService = inject(VehicleApiService);

    /**
     * Effect: Cargar todas las marcas
     */
    loadMakes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleActions.loadMakes),
            switchMap(() =>
                this.vehicleApiService.getAllMakes().pipe(
                    map(response =>
                        VehicleActions.loadMakesSuccess({ makes: response.Results })
                    ),
                    catchError(error =>
                        of(
                            VehicleActions.loadMakesFailure({
                                error: error.message || 'Error loading makes'
                            })
                        )
                    )
                )
            )
        )
    );

    /**
     * Effect: Cargar tipos de vehículos para una marca
     */
    loadVehicleTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleActions.loadVehicleTypes),
            switchMap(({ makeId }) =>
                this.vehicleApiService.getVehicleTypesForMake(makeId).pipe(
                    map(response =>
                        VehicleActions.loadVehicleTypesSuccess({ types: response.Results })
                    ),
                    catchError(error =>
                        of(
                            VehicleActions.loadVehicleTypesFailure({
                                error: error.message || 'Error loading vehicle types'
                            })
                        )
                    )
                )
            )
        )
    );

    /**
     * Effect: Cargar modelos para una marca
     */
    loadModels$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleActions.loadModels),
            switchMap(({ makeName }) =>
                this.vehicleApiService.getModelsForMake(makeName).pipe(
                    map(response =>
                        VehicleActions.loadModelsSuccess({ models: response.Results })
                    ),
                    catchError(error =>
                        of(
                            VehicleActions.loadModelsFailure({
                                error: error.message || 'Error loading models'
                            })
                        )
                    )
                )
            )
        )
    );

    /**
     * Effect: Cargar tipos y modelos cuando se selecciona una marca
     */
    selectMake$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleActions.selectMake),
            switchMap(({ makeId, makeName }) => [
                VehicleActions.loadVehicleTypes({ makeId }),
                VehicleActions.loadModels({ makeName })
            ])
        )
    );
}