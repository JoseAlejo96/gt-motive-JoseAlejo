import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    VehicleMakeResponse,
    VehicleTypeResponse,
    VehicleModelResponse
} from '../interfaces/vehicle.interface';

@Injectable({
    providedIn: 'root'
})
export class VehicleApiService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';

    /**
     * Obtiene todas las marcas de vehículos
     */
    getAllMakes(): Observable<VehicleMakeResponse> {
        return this.http.get<VehicleMakeResponse>(
            `${this.baseUrl}/GetAllMakes?format=json`
        );
    }

    /**
     * Obtiene los tipos de vehículos para una marca específica
     */
    getVehicleTypesForMake(makeId: number): Observable<VehicleTypeResponse> {
        return this.http.get<VehicleTypeResponse>(
            `${this.baseUrl}/GetVehicleTypesForMakeId/${makeId}?format=json`
        );
    }

    /**
     * Obtiene los modelos para una marca específica
     */
    getModelsForMakeId(makeId: number): Observable<VehicleModelResponse> {
        return this.http.get<VehicleModelResponse>(
            `${this.baseUrl}/GetModelsForMakeId/${makeId}?format=json`
        );
    }
}