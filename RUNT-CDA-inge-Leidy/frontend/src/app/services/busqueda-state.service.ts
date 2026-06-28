import { Injectable, signal, computed } from '@angular/core';
import { PanelBusqueda } from '../components/panel-busqueda/panel-busqueda.component';

@Injectable({ providedIn: 'root' })
export class BusquedaStateService {


    private readonly _filtros = signal<PanelBusqueda | null>(null);
    private readonly _busquedaRealizada = signal(false);


    readonly filtros = this._filtros.asReadonly();
    readonly busquedaRealizada = this._busquedaRealizada.asReadonly();


    emitirFiltros(filtros: PanelBusqueda): void {
        this._filtros.set(filtros);
        this._busquedaRealizada.set(true);
    }


    limpiar(): void {
        this._filtros.set(null);
        this._busquedaRealizada.set(false);
    }
}