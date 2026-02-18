import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VehicleState } from '../state/vehicle.state';

export const selectVehicleState = createFeatureSelector<VehicleState>('vehicle');

export const selectAllMakes = createSelector(selectVehicleState, state => state.makes);

export const selectFilteredMakes = createSelector(selectVehicleState, state => state.filteredMakes);

export const selectMakesLoading = createSelector(selectVehicleState, state => state.makesLoading);

export const selectMakesError = createSelector(selectVehicleState, state => state.makesError);

export const selectSelectedMake = createSelector(selectVehicleState, state => state.selectedMake);

export const selectVehicleTypes = createSelector(selectVehicleState, state => state.vehicleTypes);

export const selectVehicleTypesLoading = createSelector(
    selectVehicleState,
    state => state.vehicleTypesLoading
);

export const selectModels = createSelector(selectVehicleState, state => state.models);

export const selectModelsLoading = createSelector(selectVehicleState, state => state.modelsLoading);