import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalidad } from 'app/shared/model/persona/localidad.model';

@Component({
  selector: 'jhi-localidad-detail',
  templateUrl: './localidad-detail.component.html',
})
export class LocalidadDetailComponent implements OnInit {
  localidad: ILocalidad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localidad }) => (this.localidad = localidad));
  }

  previousState(): void {
    window.history.back();
  }
}
