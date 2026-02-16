import { createAction, props } from '@ngrx/store';
import {
    VehicleMake,
    VehicleType,
    VehicleModel
} from '../../core/interfaces/vehicle.interface';

// Actions para cargar marcas
export const loadMakes = createAction('[Vehicle List] Load Makes');

export const loadMakesSuccess = createAction(
    '[Vehicle API] Load Makes Success',
    props<{ makes: VehicleMake[] }>()
);

export const loadMakesFailure = createAction(
    '[Vehicle API] Load Makes Failure',
    props<{ error: string }>()
);

// Actions para filtrar marcas
export const filterMakes = createAction(
    '[Vehicle List] Filter Makes',
    props<{ searchTerm: string }>()
);

// Actions para seleccionar una marca
export const selectMake = createAction(
    '[Vehicle List] Select Make',
    props<{ makeId: number; makeName: string }>()
);

// Actions para cargar tipos de vehículos
export const loadVehicleTypes = createAction(
    '[Vehicle Detail] Load Vehicle Types',
    props<{ makeId: number }>()
);

export const loadVehicleTypesSuccess = createAction(
    '[Vehicle API] Load Vehicle Types Success',
    props<{ types: VehicleType[] }>()
);

export const loadVehicleTypesFailure = createAction(
    '[Vehicle API] Load Vehicle Types Failure',
    props<{ error: string }>()
);

// Actions para cargar modelos
export const loadModels = createAction(
    '[Vehicle Detail] Load Models',
    props<{ makeName: string }>()
);

export const loadModelsSuccess = createAction(
    '[Vehicle API] Load Models Success',
    props<{ models: VehicleModel[] }>()
);

export const loadModelsFailure = createAction(
    '[Vehicle API] Load Models Failure',
    props<{ error: string }>()
);

// Action para limpiar datos al salir del detalle
export const clearVehicleDetail = createAction(
    '[Vehicle Detail] Clear Detail'
);