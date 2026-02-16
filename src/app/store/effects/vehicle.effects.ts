import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom, filter } from 'rxjs/operators';
import { VehicleApiService } from '../../core/services/vehicle-api.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import * as VehicleActions from '../actions/vehicle.actions';
import * as VehicleSelectors from '../selectors/vehicle.selectors';

@Injectable()
export class VehicleEffects {
    private readonly actions$ = inject(Actions);
    private readonly store = inject(Store);
    private readonly vehicleApiService = inject(VehicleApiService);
    private readonly errorHandler = inject(ErrorHandlerService);

    /**
     * Effect: Cargar marcas solo si no están en el store
     */
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
                    catchError(error =>
                        of(
                            VehicleActions.loadMakesFailure({
                                error: this.errorHandler.handleError(error)
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
                                error: this.errorHandler.handleError(error)
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
                                error: this.errorHandler.handleError(error)
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