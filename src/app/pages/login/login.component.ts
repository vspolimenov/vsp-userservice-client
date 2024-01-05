import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthenticationService,
    private backendService: BackendService,
    private router: Router
  ) {}

  async onLogin() {
    try {
      const userCredential = await this.authService.SignIn(this.email, this.password);
      const token = await this.authService.getIdToken();
      const user = userCredential.user;
      const userDetails = {
        email: user?.email,
        uid: user?.uid
        // Add other required fields from the user object
      };
      this.backendService.loginUser(userDetails, token).subscribe(response => {
        console.log('User logged in:', response);
        this.router.navigate(['/home']);
      });
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Invalid login credentials';
      // Handle login errors (e.g., show a message to the user)
    }
  }
}
