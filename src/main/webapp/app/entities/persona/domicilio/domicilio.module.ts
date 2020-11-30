import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { DomicilioComponent } from './domicilio.component';
import { DomicilioDetailComponent } from './domicilio-detail.component';
import { DomicilioUpdateComponent } from './domicilio-update.component';
import { DomicilioDeleteDialogComponent } from './domicilio-delete-dialog.component';
import { domicilioRoute } from './domicilio.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(domicilioRoute)],
  declarations: [DomicilioComponent, DomicilioDetailComponent, DomicilioUpdateComponent, DomicilioDeleteDialogComponent],
  entryComponents: [DomicilioDeleteDialogComponent],
})
export class PersonaDomicilioModule {}
