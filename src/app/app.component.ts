import {Component} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  readonly document$: Observable<{ [key: string]: any }>;

  constructor(private readonly afs: AngularFirestore) {
    this.document$ = this.afs.collection('test', ref => ref
      .where('hello', '==', 'world')
      .limit(10)
    )
      .snapshotChanges()
      .pipe(
        map(documentsQueryResult =>
          documentsQueryResult.map(document => ({
            [document.payload.doc.id]: document.payload.doc.data()
          })))
      );

  }

}
