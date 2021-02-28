import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  /**
   * *** Retorna la data del usuario anexando el id de la collection ***
   */
  public getUsers() {
    this.db
      .collection<Users>("users")
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Users;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  /**
   * *** Retorna la info del usuario consultado por ID ***
   * @param userId 
   */
  public getUserById(userId: string) {
    return this.db.collection("users").doc(`${userId}`).valueChanges();
  }
}
