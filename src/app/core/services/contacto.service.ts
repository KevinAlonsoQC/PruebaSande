import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ContactoCrearBody, ContactoDeleteBody, ContactoDetalle, ContactoListItem, ContactoUpdateBody } from '../models/contacto.model';

@Injectable({ providedIn: 'root' })
export class ContactosService extends ApiService {

    listarContactos(idUsuario: string) {
        return this.requestAuth<ContactoListItem[]>('GET', `ListarContactos/${idUsuario}`);
    }

    obtenerContacto(idUsuario: string, idContacto: string) {
        return this.requestAuth<ContactoDetalle[]>('GET', `ListaContacto/${idUsuario}/${idContacto}`);
    }

    crearContacto(body: ContactoCrearBody) {
        return this.requestAuth<any>('POST', 'CreaContacto', body);
    }

    updateContacto(body: ContactoUpdateBody) {
        return this.requestAuth<any>('POST', 'UpdateContacto', body);
    }

    deleteContacto(body: ContactoDeleteBody) {
        return this.requestAuth<any>('POST', 'DeleteContacto', body);
    }
}
