import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VehicleState } from '../state/vehicle.state';

/**
 * Feature Selector
 */
export const selectVehicleState = createFeatureSelector<VehicleState>('vehicle');

/**
 * Selectors para Marcas
 */
export const selectAllMakes = createSelector(
    selectVehicleState,
    state => state.makes
);

export const selectFilteredMakes = createSelector(
    selectVehicleState,
    state => state.filteredMakes
);

export const selectMakesLoading = createSelector(
    selectVehicleState,
    state => state.makesLoading
);

export const selectMakesError = createSelector(
    selectVehicleState,
    state => state.makesError
);

/**
 * Selector para Marca Seleccionada
 */
export const selectSelectedMake = createSelector(
    selectVehicleState,
    state => state.selectedMake
);

/**
 * Selectors para Tipos de Vehículos
 */
export const selectVehicleTypes = createSelector(
    selectVehicleState,
    state => state.vehicleTypes
);

export const selectVehicleTypesLoading = createSelector(
    selectVehicleState,
    state => state.vehicleTypesLoading
);

export const selectVehicleTypesError = createSelector(
    selectVehicleState,
    state => state.vehicleTypesError
);

/**
 * Selectors para Modelos
 */
export const selectModels = createSelector(
    selectVehicleState,
    state => state.models
);

export const selectModelsLoading = createSelector(
    selectVehicleState,
    state => state.modelsLoading
);

export const selectModelsError = createSelector(
    selectVehicleState,
    state => state.modelsError
);