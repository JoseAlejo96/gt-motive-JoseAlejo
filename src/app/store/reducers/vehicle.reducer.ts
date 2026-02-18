import { createReducer, on } from '@ngrx/store';
import * as VehicleActions from '../actions/vehicle.actions';
import { initialVehicleState } from '../state/vehicle.state';

export const vehicleReducer = createReducer(
    initialVehicleState,

    on(VehicleActions.loadMakes, state => {
        if (state.makes.length > 0) return state;
        return { ...state, makesLoading: true, makesError: null };
    }),

    on(VehicleActions.loadMakesSuccess, (state, { makes }) => ({
        ...state,
        makes,
        filteredMakes: makes,
        makesLoading: false
    })),

    on(VehicleActions.loadMakesFailure, (state, { error }) => ({
        ...state,
        makesLoading: false,
        makesError: error
    })),

    on(VehicleActions.filterMakes, (state, { searchTerm }) => {
        const search = searchTerm.toLowerCase().trim();
        const filtered = state.makes.filter(make =>
            make.Make_Name.toLowerCase().includes(search)
        );
        return { ...state, filteredMakes: filtered };
    }),

    on(VehicleActions.selectMake, (state, { makeId, makeName }) => ({
        ...state,
        selectedMake: { id: makeId, name: makeName }
    })),

    on(VehicleActions.loadVehicleData, state => ({
        ...state,
        vehicleTypesLoading: true,
        modelsLoading: true,
        vehicleTypesError: null,
        modelsError: null
    })),

    on(VehicleActions.loadVehicleDataSuccess, (state, { types, models }) => ({
        ...state,
        vehicleTypes: types,
        models,
        vehicleTypesLoading: false,
        modelsLoading: false
    })),

    on(VehicleActions.loadVehicleDataFailure, (state, { error }) => ({
        ...state,
        vehicleTypesLoading: false,
        modelsLoading: false,
        vehicleTypesError: error,
        modelsError: error
    })),

    on(VehicleActions.clearVehicleDetail, state => ({
        ...state,
        selectedMake: null,
        vehicleTypes: [],
        models: [],
        vehicleTypesLoading: false,
        modelsLoading: false,
        vehicleTypesError: null,
        modelsError: null
    }))
);