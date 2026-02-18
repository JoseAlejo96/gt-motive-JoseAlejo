import { createAction, props } from '@ngrx/store';
import { VehicleMake, VehicleType, VehicleModel } from '../../core/interfaces/vehicle.interface';

export const loadMakes = createAction('[Vehicle] Load Makes');

export const loadMakesSuccess = createAction(
    '[Vehicle] Load Makes Success',
    props<{ makes: VehicleMake[] }>()
);

export const loadMakesFailure = createAction(
    '[Vehicle] Load Makes Failure',
    props<{ error: string }>()
);

export const filterMakes = createAction(
    '[Vehicle] Filter Makes',
    props<{ searchTerm: string }>()
);

export const selectMake = createAction(
    '[Vehicle] Select Make',
    props<{ makeId: number; makeName: string }>()
);

export const loadVehicleData = createAction(
    '[Vehicle] Load Vehicle Data',
    props<{ makeId: number }>()
);

export const loadVehicleDataSuccess = createAction(
    '[Vehicle] Load Vehicle Data Success',
    props<{ types: VehicleType[]; models: VehicleModel[] }>()
);

export const loadVehicleDataFailure = createAction(
    '[Vehicle] Load Vehicle Data Failure',
    props<{ error: string }>()
);

export const clearVehicleDetail = createAction('[Vehicle] Clear Detail');