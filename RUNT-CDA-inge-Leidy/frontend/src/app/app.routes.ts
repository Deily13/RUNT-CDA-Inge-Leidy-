import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'base',
        loadComponent: () =>
            import('./components/base/base.component').then(m => m.Base),
        children: [
            {
                path: 'tabla-registro',
                loadComponent: () =>
                    import('./components/tabla-registro/tabla-registro.component')
                        .then(m => m.TablaRegistroComponent)
            }
        ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
