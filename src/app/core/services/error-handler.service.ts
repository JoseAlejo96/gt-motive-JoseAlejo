import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    handleError(error: HttpErrorResponse): string {
        // Si la URL contiene Error/404.html, la API no tiene datos
        if (error.url?.includes('Error/404.html')) {
            return 'No data available for this vehicle make';
        }

        const message = `Server Error: ${error.status} - ${error.message}`;
        console.error('HTTP Error:', error);
        return message;
    }
}