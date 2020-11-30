import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDomicilio, Domicilio } from 'app/shared/model/persona/domicilio.model';
import { DomicilioService } from './domicilio.service';
import { DomicilioComponent } from './domicilio.component';
import { DomicilioDetailComponent } from './domicilio-detail.component';
import { DomicilioUpdateComponent } from './domicilio-update.component';

@Injectable({ providedIn: 'root' })
export class DomicilioResolve implements Resolve<IDomicilio> {
  constructor(private service: DomicilioService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDomicilio> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((domicilio: HttpResponse<Domicilio>) => {
          if (domicilio.body) {
            return of(domicilio.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Domicilio());
  }
}

export const domicilioRoute: Routes = [
  {
    path: '',
    component: DomicilioComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.personaDomicilio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DomicilioDetailComponent,
    resolve: {
      domicilio: DomicilioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.personaDomicilio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DomicilioUpdateComponent,
    resolve: {
      domicilio: DomicilioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.personaDomicilio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DomicilioUpdateComponent,
    resolve: {
      domicilio: DomicilioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.personaDomicilio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
