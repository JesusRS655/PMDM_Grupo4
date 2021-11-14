import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private register: DataService) { 

  }

  usuario = {
    firstname: '',
    secondname: '',
    email: '',
    password: '',
    c_password: '',
    company_id: ''
  }

  ngOnInit() {

  }

  submit() {
    return this.register.register(this.usuario);
  }

}
