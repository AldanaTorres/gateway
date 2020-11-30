import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'persona',
        loadChildren: () => import('./persona/persona/persona.module').then(m => m.PersonaPersonaModule),
      },
      {
        path: 'domicilio',
        loadChildren: () => import('./persona/domicilio/domicilio.module').then(m => m.PersonaDomicilioModule),
      },
      {
        path: 'localidad',
        loadChildren: () => import('./persona/localidad/localidad.module').then(m => m.PersonaLocalidadModule),
      },
      {
        path: 'libro',
        loadChildren: () => import('./persona/libro/libro.module').then(m => m.PersonaLibroModule),
      },
      {
        path: 'autor',
        loadChildren: () => import('./persona/autor/autor.module').then(m => m.PersonaAutorModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayEntityModule {}
