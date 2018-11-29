import { PickingRouteComponent } from './picking-route/picking-route.component';
import { Routes, RouterModule } from '@angular/router';

import { SuppliersOrdersComponent } from './suppliers-orders';
import { CustomersOrdersComponent } from './customers-orders/customers-orders.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'suppliersOrders', component: SuppliersOrdersComponent, canActivate: [AuthGuard] },
    { path: 'customersOrders', component: CustomersOrdersComponent, canActivate: [AuthGuard] },
    { path: 'routing', component: PickingRouteComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
