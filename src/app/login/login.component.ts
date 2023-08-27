import { Component, OnInit } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  Auth,
} from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}
  ngOnInit(): void {}
  login() {
    this.auth.logIn();
  }
}
