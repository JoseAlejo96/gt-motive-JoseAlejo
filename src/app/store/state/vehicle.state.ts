import {
    VehicleMake,
    VehicleType,
    VehicleModel
} from '../../core/interfaces/vehicle.interface';

export interface VehicleState {
    // Marcas
    makes: VehicleMake[];
    filteredMakes: VehicleMake[];
    makesLoading: boolean;
    makesError: string | null;

    // Marca seleccionada
    selectedMake: { id: number; name: string } | null;

    // Tipos de vehículos
    vehicleTypes: VehicleType[];
    vehicleTypesLoading: boolean;
    vehicleTypesError: string | null;

    // Modelos
    models: VehicleModel[];
    modelsLoading: boolean;
    modelsError: string | null;
}

export const initialVehicleState: VehicleState = {
    makes: [],
    filteredMakes: [],
    makesLoading: false,
    makesError: null,
    selectedMake: null,
    vehicleTypes: [],
    vehicleTypesLoading: false,
    vehicleTypesError: null,
    models: [],
    modelsLoading: false,
    modelsError: null
};