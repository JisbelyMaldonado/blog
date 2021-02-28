import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
declare var $: any;
/** INTERFACE */

/** SERVICE */
import { AuthServiceService } from "app/services/authService/auth-service.service";


@Component({
  selector: 'app-is-login',
  templateUrl: './is-login.component.html',
  styleUrls: ['./is-login.component.css']
})
export class IsLoginComponent implements OnInit {

  public user: Users;
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.user = {};
  }
  
   /**
   * *** Funcion para validar e iniciar sesion ***
   * @param user 
   * @param valid 
   */
  public onLogin(user: Users, valid: boolean) {
    if (valid) {
      this.authService.login(this.user.user_email, this.user.user_password).then(() => {
        console.log('obtuvo resultado');
         $('.fade').remove();
         $("#modalLogin").modal("hide");



      });
    }
  }

}
