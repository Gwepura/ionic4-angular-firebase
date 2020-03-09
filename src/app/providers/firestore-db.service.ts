import { Injectable } from '@angular/core';
import { AngularDelegate } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDbService {

  constructor(private db: AngularFirestore) { }

  getAllData(collectionID) {
    // return this.db.collection('product').valueChanges();
    return this.db.collection(collectionID).snapshotChanges().pipe(
      map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          }
        })
      })
    );

    // Use method below if first method doesn't work

    // return this.db.collection('product').snapshotChanges().pipe(
    //   map(docArray => {
    //     return docArray.map(doc => {
    //       const id = doc.payload.doc.id;
    //       const data = doc.payload.doc.data();

    //       return Object.assign(id, data);
    //     })
    //   })
    // );

    
  }

  async insertData(collectionID, data) {
    try {
      const result = await this.db.collection(collectionID).add(data);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDataById(collectionID, docId) {
    try {
      const result = await this.db.collection(collectionID).doc(docId).ref.get();
      if (result.exists) {
        return result.data();
      } else {
        throw new Error('Data not found with given id');
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
