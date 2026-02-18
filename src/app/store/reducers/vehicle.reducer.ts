import { createReducer, on } from '@ngrx/store';
import * as VehicleActions from '../actions/vehicle.actions';
import { initialVehicleState } from '../state/vehicle.state';

export const vehicleReducer = createReducer(
    initialVehicleState,

    // Load Makes
    on(VehicleActions.loadMakes, state => {
        if (state.makes.length > 0) {
            return state;
        }
        return {
            ...state,
            makesLoading: true,
            makesError: null
        };
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

    // Filter Makes - Búsqueda mejorada
    on(VehicleActions.filterMakes, (state, { searchTerm }) => {
        const search = searchTerm.toLowerCase().trim();
        const filtered = state.makes.filter(make =>
            make.Make_Name.toLowerCase().includes(search)
        );
        return { ...state, filteredMakes: filtered };
    }),

    // Select Make
    on(VehicleActions.selectMake, (state, { makeId, makeName }) => ({
        ...state,
        selectedMake: { id: makeId, name: makeName }
    })),

    // Load Vehicle Types
    on(VehicleActions.loadVehicleTypes, state => ({
        ...state,
        vehicleTypesLoading: true,
        vehicleTypesError: null
    })),

    on(VehicleActions.loadVehicleTypesSuccess, (state, { types }) => ({
        ...state,
        vehicleTypes: types,
        vehicleTypesLoading: false
    })),

    on(VehicleActions.loadVehicleTypesFailure, (state, { error }) => ({
        ...state,
        vehicleTypesLoading: false,
        vehicleTypesError: error
    })),

    // Load Models
    on(VehicleActions.loadModels, state => ({
        ...state,
        modelsLoading: true,
        modelsError: null
    })),

    on(VehicleActions.loadModelsSuccess, (state, { models }) => ({
        ...state,
        models,
        modelsLoading: false
    })),

    on(VehicleActions.loadModelsFailure, (state, { error }) => ({
        ...state,
        modelsLoading: false,
        modelsError: error
    })),

    // Clear Detail
    on(VehicleActions.clearVehicleDetail, state => ({
        ...state,
        selectedMake: null,
        vehicleTypes: [],
        vehicleTypesLoading: false,
        vehicleTypesError: null,
        models: [],
        modelsLoading: false,
        modelsError: null
    }))
);