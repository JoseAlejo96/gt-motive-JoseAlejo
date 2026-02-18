import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    handleError(error: HttpErrorResponse): string {
        if (error.url?.includes('Error/404.html')) {
            return 'No data available for this vehicle make';
        }
        console.error('HTTP Error:', error);
        return 'An error occurred while loading data';
    }
}