import { Injectable } from '@angular/core';
import { AngularDelegate } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDbService {

  constructor(private db: AngularFirestore) { }

  getProductList() {
    // return this.db.collection('product').valueChanges();
    return this.db.collection('product').snapshotChanges().pipe(
      map(docArray => {
        return docArray.map(doc => {
          console.log('==', {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          });
          

          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          }
        })
      })
    );
  }
}
