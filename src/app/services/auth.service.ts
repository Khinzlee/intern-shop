import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {
    console.log('🔐 AuthService initialized');
    this.initializeAuth();
  }

  private async initializeAuth() {
    // Check for existing session
    const { data: { session } } = await this.supabase.client.auth.getSession();
    
    if (session?.user) {
      console.log('✅ Existing session found for:', session.user.email);
      this.currentUserSubject.next({
        id: session.user.id,
        email: session.user.email || '',
        full_name: session.user.user_metadata['full_name'],
        avatar_url: session.user.user_metadata['avatar_url']
      });
      this.isAuthenticatedSubject.next(true);
    } else {
      console.log('👤 No existing session - user is guest');
    }

    // Listen for auth state changes
    this.supabase.client.auth.onAuthStateChange((event, session) => {
      console.log(`🔔 Auth event: ${event}`);
      
      if (session?.user) {
        this.currentUserSubject.next({
          id: session.user.id,
          email: session.user.email || '',
          full_name: session.user.user_metadata['full_name'],
          avatar_url: session.user.user_metadata['avatar_url']
        });
        this.isAuthenticatedSubject.next(true);
      } else {
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
      }
    });
  }

  // Sign Up
  async signUp(email: string, password: string, fullName?: string): Promise<{ success: boolean; message: string }> {
    console.log(`📝 Attempting to sign up: ${email}`);
    
    try {
      const { data, error } = await this.supabase.client.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || ''
          }
        }
      });

      if (error) {
        console.error('❌ Sign up failed:', error.message);
        return { success: false, message: error.message };
      }

      if (data.user && data.session) {
        console.log('✅ Sign up successful! Auto-logged in.');
        return { 
          success: true, 
          message: 'Account created successfully! Welcome aboard!' 
        };
      } else if (data.user && !data.session) {
        console.log('📧 Sign up successful! Please check your email to verify your account.');
        return { 
          success: true, 
          message: 'Please check your email to verify your account.' 
        };
      }

      return { success: false, message: 'Sign up failed. Please try again.' };
    } catch (error: any) {
      console.error('💥 Unexpected error during sign up:', error);
      return { success: false, message: error.message || 'An unexpected error occurred' };
    }
  }

  // Sign In
  async signIn(email: string, password: string): Promise<{ success: boolean; message: string }> {
    console.log(`🔑 Attempting to sign in: ${email}`);
    
    try {
      const { data, error } = await this.supabase.client.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('❌ Sign in failed:', error.message);
        return { success: false, message: error.message };
      }

      if (data.user && data.session) {
        console.log('✅ Sign in successful!');
        this.router.navigate(['/']);
        return { success: true, message: 'Welcome back!' };
      }

      return { success: false, message: 'Sign in failed. Please try again.' };
    } catch (error: any) {
      console.error('💥 Unexpected error during sign in:', error);
      return { success: false, message: error.message || 'An unexpected error occurred' };
    }
  }

  // Sign Out
  async signOut(): Promise<void> {
    console.log('👋 Signing out...');
    
    try {
      const { error } = await this.supabase.client.auth.signOut();
      
      if (error) {
        console.error('❌ Sign out failed:', error);
        throw error;
      }

      console.log('✅ Signed out successfully');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('💥 Error during sign out:', error);
    }
  }

  // Reset Password
  async resetPassword(email: string): Promise<{ success: boolean; message: string }> {
    console.log(`📧 Sending password reset email to: ${email}`);
    
    try {
      const { error } = await this.supabase.client.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        console.error('❌ Password reset failed:', error.message);
        return { success: false, message: error.message };
      }

      console.log('✅ Password reset email sent');
      return { 
        success: true, 
        message: 'Password reset email sent! Please check your inbox.' 
      };
    } catch (error: any) {
      console.error('💥 Unexpected error during password reset:', error);
      return { success: false, message: error.message || 'An unexpected error occurred' };
    }
  }

  // Update Password
  async updatePassword(newPassword: string): Promise<{ success: boolean; message: string }> {
    console.log('🔒 Updating password...');
    
    try {
      const { error } = await this.supabase.client.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('❌ Password update failed:', error.message);
        return { success: false, message: error.message };
      }

      console.log('✅ Password updated successfully');
      return { success: true, message: 'Password updated successfully!' };
    } catch (error: any) {
      console.error('💥 Unexpected error during password update:', error);
      return { success: false, message: error.message || 'An unexpected error occurred' };
    }
  }

  // Get Current User
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}