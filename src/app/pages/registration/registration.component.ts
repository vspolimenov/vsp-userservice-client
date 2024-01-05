import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  email = '';
  password = '';
  nickname = '';
  age = null;
  gender = '';
  role = '';

  constructor(
    private authService: AuthenticationService,
    private backendService: BackendService,
    private router: Router
  ) {}

  async onRegister() {
    try {
      const userCredential = await this.authService.SignUp(this.email, this.password);
      const userDetails = {
        id:userCredential.user?.uid,
        email: this.email,
        nickname: this.nickname,
        age: this.age,
        gender: this.gender,
        role: this.role
        // ... other fields as needed
      };
      this.backendService.registerUser(userDetails).subscribe(response => {
        console.log('User registered in backend:', response);
        this.router.navigate(['/login']);
      });
    } catch (error) {
      console.error(error);
      // Handle registration errors (e.g., show a message to the user)
    }
  }


}
