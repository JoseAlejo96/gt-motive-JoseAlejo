import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/vehicle-list/vehicle-list.component').then(
                m => m.VehicleListComponent
            )
    },
    {
        path: 'vehicle/:id',
        loadComponent: () =>
            import('./features/vehicle-detail/vehicle-detail.component').then(
                m => m.VehicleDetailComponent
            )
    },
    { path: '**', redirectTo: '' }
];