import { Routes } from '@angular/router';
import { VehicleListComponent } from './features/vehicle-list/vehicle-list.component';
import { VehicleDetailComponent } from './features/vehicle-detail/vehicle-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: VehicleListComponent
    },
    {
        path: 'vehicle/:id',
        component: VehicleDetailComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];