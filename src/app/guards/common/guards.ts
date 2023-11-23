import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { inject } from '@angular/core';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinerType } from 'src/app/base/base.component';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

    const spinner = inject(NgxSpinnerService);
    spinner.show(NgxSpinerType.BallAtom)
    const jwtHelperService = inject(JwtHelperService);
    const router = inject(Router);
    const toastrService = inject(CustomToastrService);
    
    
    const token: string = localStorage.getItem("accessToken");

  
    let expired: boolean;
    try {
      expired = jwtHelperService.isTokenExpired(token);
    } catch {
      expired = true;
    }

    if (!token || expired) {
      router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      toastrService.message("Oturum açmanız gerekiyor!", "Yetkisiz Erişim!", {
        messageType: ToastrMessageType.Warning,
        positon: ToastrPosition.BottomRight
        
      })
    }


      spinner.hide(NgxSpinerType.BallAtom);

    return true;
  }

