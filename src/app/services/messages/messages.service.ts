import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Messages } from 'app/interfaces/messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private db: AngularFirestore) { }

  public getMessages() {
    return this.db.collection<Messages>('messages', ref => ref.orderBy("message_id", "desc")).valueChanges()
  }

  public saveMessage(message:Messages) {
    return this.db.collection<Messages>('messages').doc(`${message.message_id}`).set(message)
  }
}
