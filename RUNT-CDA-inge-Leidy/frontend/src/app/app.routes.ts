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
            },
            {
                path: 'panel-busqueda',
                loadComponent: () =>
                    import('./components/panel-busqueda/panel-busqueda.component')
                        .then(m => m.PanelBusquedaComponent)


            },
            {
                path: 'formulario-data/nuevo',
                loadComponent: () =>
                    import('./components/formulario-data/formulario-data.component')
                        .then(m => m.FormularioDataComponent),
                data: { mode: 'create' }
            },
            {
                path: 'formulario-data/actualizar',
                loadComponent: () =>
                    import('./components/formulario-data/formulario-data.component')
                        .then(m => m.FormularioDataComponent),
                data: { mode: 'update' }
            },
            {
                path: 'vista-principal',
                loadComponent: () =>
                    import('./components/vista-principal/vista-principal.component')
                        .then(m => m.VistaPrincipal)
            },
        ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
