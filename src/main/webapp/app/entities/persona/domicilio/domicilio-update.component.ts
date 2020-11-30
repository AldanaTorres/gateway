import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDomicilio, Domicilio } from 'app/shared/model/persona/domicilio.model';
import { DomicilioService } from './domicilio.service';
import { ILocalidad } from 'app/shared/model/persona/localidad.model';
import { LocalidadService } from 'app/entities/persona/localidad/localidad.service';

@Component({
  selector: 'jhi-domicilio-update',
  templateUrl: './domicilio-update.component.html',
})
export class DomicilioUpdateComponent implements OnInit {
  isSaving = false;
  localidads: ILocalidad[] = [];

  editForm = this.fb.group({
    id: [],
    calle: [],
    numero: [],
    localidad: [],
  });

  constructor(
    protected domicilioService: DomicilioService,
    protected localidadService: LocalidadService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ domicilio }) => {
      this.updateForm(domicilio);

      this.localidadService.query().subscribe((res: HttpResponse<ILocalidad[]>) => (this.localidads = res.body || []));
    });
  }

  updateForm(domicilio: IDomicilio): void {
    this.editForm.patchValue({
      id: domicilio.id,
      calle: domicilio.calle,
      numero: domicilio.numero,
      localidad: domicilio.localidad,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const domicilio = this.createFromForm();
    if (domicilio.id !== undefined) {
      this.subscribeToSaveResponse(this.domicilioService.update(domicilio));
    } else {
      this.subscribeToSaveResponse(this.domicilioService.create(domicilio));
    }
  }

  private createFromForm(): IDomicilio {
    return {
      ...new Domicilio(),
      id: this.editForm.get(['id'])!.value,
      calle: this.editForm.get(['calle'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      localidad: this.editForm.get(['localidad'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDomicilio>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ILocalidad): any {
    return item.id;
  }
}
