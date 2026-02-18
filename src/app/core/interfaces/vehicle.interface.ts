// Respuesta de la API para marcas
export interface VehicleMakeResponse {
    Count: number;
    Message: string;
    SearchCriteria: string | null;
    Results: VehicleMake[];
}

export interface VehicleMake {
    Make_ID: number;
    Make_Name: string;
}

// Respuesta de la API para tipos de vehículos
export interface VehicleTypeResponse {
    Count: number;
    Message: string;
    SearchCriteria: string | null;
    Results: VehicleType[];
}

export interface VehicleType {
    VehicleTypeId: number;
    VehicleTypeName: string;
}

// Respuesta de la API para modelos
export interface VehicleModelResponse {
    Count: number;
    Message: string;
    SearchCriteria: string | null;
    Results: VehicleModel[];
}

export interface VehicleModel {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}