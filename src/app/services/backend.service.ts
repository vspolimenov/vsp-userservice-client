import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

interface RegistrationResponse {
  // Define the structure based on your User model in Kotlin
  id: string;
  email: string;
  // ... other fields
}

interface LoginResponse {
  // Define the structure based on the response from loginUser endpoint
  // ...
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private backendUrl = 'http://localhost:8080/users'; // Adjust as needed

  constructor(private http: HttpClient) {}

  registerUser(userDetails: any): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.backendUrl}/register`, userDetails);
  }

  loginUser(userDetails: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.backendUrl}/login`, userDetails, { headers });
  }

  deleteUser(userId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.backendUrl}/${userId}`);
  }
}
