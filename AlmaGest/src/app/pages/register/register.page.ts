import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    
  }
  
  

  // onSubmitTemplate() {
  //   this.dataService.register(this.usuario);
  //   console.log(this.dataService.getUsers().subscribe(resp => {
  //     console.log('user', resp);      
  //   }));    
  // }
}
