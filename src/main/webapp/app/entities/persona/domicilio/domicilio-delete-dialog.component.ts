import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDomicilio } from 'app/shared/model/persona/domicilio.model';
import { DomicilioService } from './domicilio.service';

@Component({
  templateUrl: './domicilio-delete-dialog.component.html',
})
export class DomicilioDeleteDialogComponent {
  domicilio?: IDomicilio;

  constructor(protected domicilioService: DomicilioService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.domicilioService.delete(id).subscribe(() => {
      this.eventManager.broadcast('domicilioListModification');
      this.activeModal.close();
    });
  }
}
