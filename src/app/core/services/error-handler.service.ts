import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    /**
     * Procesa errores HTTP y devuelve un mensaje amigable
     */
    handleError(error: HttpErrorResponse): string {
        let errorMessage = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
            errorMessage = `Client Error: ${error.error.message}`;
        } else {
            errorMessage = `Server Error: ${error.status} - ${error.message}`;
        }

        console.error('Error details:', error);
        return errorMessage;
    }
}