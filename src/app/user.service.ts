import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  saveUser(user: any) {
    const afApp = initializeApp(environment.firebase);
    const db = getDatabase(afApp);
    set(ref(db, 'users/' + user.uid), {
      username: user.displayName,
      email: user.email,
    })
      .then(() => {
        // Data saved successfully!
      })
      .catch((error) => {
        // The write failed...
      });
  }
}
