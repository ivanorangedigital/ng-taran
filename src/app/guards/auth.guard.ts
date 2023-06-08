import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { CookieService } from "ngx-cookie-service";
import { tap } from "rxjs";

export const AuthGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const cookieService = inject(CookieService);
    const router = inject(Router);

    if (cookieService.check('password')) {
        return authService.comparePassword(cookieService.get('password'));
    } else {
        const password = prompt('password: ') || '';
        return authService.comparePassword(password).pipe(
            tap(res => {
                if (res) {
                    cookieService.set('password', password);
                } else {
                    router.navigateByUrl('/');
                }
            })
        );
    }
}