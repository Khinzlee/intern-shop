import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Welcome Back!</h1>
          <p>Sign in to continue shopping</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="auth-form">
          <!-- Email -->
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              id="email"
              type="email"
              [(ngModel)]="email"
              name="email"
              placeholder="Enter your email"
              required
              class="form-input"
            />
          </div>

          <!-- Password -->
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              [type]="showPassword ? 'text' : 'password'"
              [(ngModel)]="password"
              name="password"
              placeholder="Enter your password"
              required
              class="form-input"
            />
            <button 
              type="button" 
              (click)="showPassword = !showPassword" 
              class="toggle-password">
              <i [class]="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </button>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe" />
              <span>Remember me</span>
            </label>
            <a routerLink="/forgot-password" class="forgot-link">Forgot Password?</a>
          </div>

          <!-- Error Message -->
          <div *ngIf="errorMessage" class="error-message">
            <i class="fa fa-exclamation-circle"></i>
            {{ errorMessage }}
          </div>

          <!-- Success Message -->
          <div *ngIf="successMessage" class="success-message">
            <i class="fa fa-check-circle"></i>
            {{ successMessage }}
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            [disabled]="loading"
            class="submit-btn">
            <span *ngIf="!loading">Sign In</span>
            <span *ngIf="loading">
              <i class="fa fa-spinner fa-spin"></i> Signing in...
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="divider">
          <span>OR</span>
        </div>

        <!-- Social Login -->
        <div class="social-login">
          <button class="social-btn google-btn">
            <i class="fab fa-google"></i>
            Continue with Google
          </button>
          <button class="social-btn github-btn">
            <i class="fab fa-github"></i>
            Continue with GitHub
          </button>
        </div>

        <!-- Sign Up Link -->
        <div class="auth-footer">
          <p>Don't have an account? <a routerLink="/register">Sign Up</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .auth-card {
      background: white;
      border-radius: 20px;
      padding: 40px;
      max-width: 450px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .auth-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .auth-header h1 {
      font-size: 28px;
      font-weight: 700;
      color: #333;
      margin-bottom: 8px;
    }

    .auth-header p {
      color: #666;
      font-size: 16px;
    }

    .form-group {
      margin-bottom: 20px;
      position: relative;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
      font-size: 14px;
    }

    .form-input {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 15px;
      transition: border-color 0.3s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
    }

    .toggle-password {
      position: absolute;
      right: 15px;
      top: 38px;
      background: none;
      border: none;
      cursor: pointer;
      color: #666;
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 14px;
      color: #666;
    }

    .checkbox-label input {
      margin-right: 8px;
    }

    .forgot-link {
      color: #667eea;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
    }

    .forgot-link:hover {
      text-decoration: underline;
    }

    .error-message,
    .success-message {
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
    }

    .error-message {
      background: #fee;
      color: #c33;
      border: 1px solid #fcc;
    }

    .success-message {
      background: #efe;
      color: #3c3;
      border: 1px solid #cfc;
    }

    .submit-btn {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .divider {
      text-align: center;
      margin: 30px 0;
      position: relative;
    }

    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #e0e0e0;
    }

    .divider span {
      background: white;
      padding: 0 15px;
      color: #999;
      font-size: 14px;
      position: relative;
    }

    .social-login {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .social-btn {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      font-size: 15px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.3s ease;
    }

    .social-btn:hover {
      border-color: #667eea;
      background: #f8f9ff;
    }

    .social-btn i {
      font-size: 18px;
    }

    .auth-footer {
      text-align: center;
      margin-top: 30px;
      color: #666;
      font-size: 14px;
    }

    .auth-footer a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    .auth-footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      .auth-card {
        padding: 30px 20px;
      }

      .auth-header h1 {
        font-size: 24px;
      }
    }
  `]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const result = await this.authService.signIn(this.email, this.password);

    this.loading = false;

    if (result.success) {
      this.successMessage = result.message;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
    } else {
      this.errorMessage = result.message;
    }
  }
}

// ============================================
// REGISTER COMPONENT
// ============================================

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Create Account</h1>
          <p>Join us and start shopping!</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="auth-form">
          <!-- Full Name -->
          <div class="form-group">
            <label for="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              [(ngModel)]="fullName"
              name="fullName"
              placeholder="Enter your full name"
              required
              class="form-input"
            />
          </div>

          <!-- Email -->
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              id="email"
              type="email"
              [(ngModel)]="email"
              name="email"
              placeholder="Enter your email"
              required
              class="form-input"
            />
          </div>

          <!-- Password -->
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              [type]="showPassword ? 'text' : 'password'"
              [(ngModel)]="password"
              name="password"
              placeholder="Create a password"
              required
              class="form-input"
            />
            <button 
              type="button" 
              (click)="showPassword = !showPassword" 
              class="toggle-password">
              <i [class]="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </button>
          </div>

          <!-- Confirm Password -->
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              [type]="showConfirmPassword ? 'text' : 'password'"
              [(ngModel)]="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              class="form-input"
            />
            <button 
              type="button" 
              (click)="showConfirmPassword = !showConfirmPassword" 
              class="toggle-password">
              <i [class]="showConfirmPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </button>
          </div>

          <!-- Terms Checkbox -->
          <div class="terms-checkbox">
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="agreedToTerms" name="agreedToTerms" />
              <span>I agree to the <a href="#">Terms & Conditions</a></span>
            </label>
          </div>

          <!-- Error Message -->
          <div *ngIf="errorMessage" class="error-message">
            <i class="fa fa-exclamation-circle"></i>
            {{ errorMessage }}
          </div>

          <!-- Success Message -->
          <div *ngIf="successMessage" class="success-message">
            <i class="fa fa-check-circle"></i>
            {{ successMessage }}
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            [disabled]="loading"
            class="submit-btn">
            <span *ngIf="!loading">Create Account</span>
            <span *ngIf="loading">
              <i class="fa fa-spinner fa-spin"></i> Creating account...
            </span>
          </button>
        </form>

        <!-- Sign In Link -->
        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/login">Sign In</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Same styles as Login component */
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .auth-card {
      background: white;
      border-radius: 20px;
      padding: 40px;
      max-width: 450px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .auth-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .auth-header h1 {
      font-size: 28px;
      font-weight: 700;
      color: #333;
      margin-bottom: 8px;
    }

    .auth-header p {
      color: #666;
      font-size: 16px;
    }

    .form-group {
      margin-bottom: 20px;
      position: relative;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
      font-size: 14px;
    }

    .form-input {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 15px;
      transition: border-color 0.3s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
    }

    .toggle-password {
      position: absolute;
      right: 15px;
      top: 38px;
      background: none;
      border: none;
      cursor: pointer;
      color: #666;
    }

    .terms-checkbox {
      margin-bottom: 20px;
    }

    .checkbox-label {
      display: flex;
      align-items: flex-start;
      cursor: pointer;
      font-size: 14px;
      color: #666;
    }

    .checkbox-label input {
      margin-right: 8px;
      margin-top: 3px;
    }

    .checkbox-label a {
      color: #667eea;
      text-decoration: none;
    }

    .error-message,
    .success-message {
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
    }

    .error-message {
      background: #fee;
      color: #c33;
      border: 1px solid #fcc;
    }

    .success-message {
      background: #efe;
      color: #3c3;
      border: 1px solid #cfc;
    }

    .submit-btn {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .auth-footer {
      text-align: center;
      margin-top: 30px;
      color: #666;
      font-size: 14px;
    }

    .auth-footer a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    .auth-footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      .auth-card {
        padding: 30px 20px;
      }

      .auth-header h1 {
        font-size: 24px;
      }
    }
  `]
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  agreedToTerms: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    // Validation
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    if (!this.agreedToTerms) {
      this.errorMessage = 'Please agree to the Terms & Conditions';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const result = await this.authService.signUp(this.email, this.password, this.fullName);

    this.loading = false;

    if (result.success) {
      this.successMessage = result.message;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    } else {
      this.errorMessage = result.message;
    }
  }
}