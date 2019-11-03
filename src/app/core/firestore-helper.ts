import {InjectionToken, NgModule, NgZone, PLATFORM_ID} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ENV, ENV_CONFIG} from './env';
import {CommonModule} from '@angular/common';
import {environment} from '../../environments/environment';
import {AngularFireAuth} from '@angular/fire/auth';

export const FIREBASE_REFERENCES = {
  ONE_FIRESTORE: 'project-one-firestore',
  TWO_FIRESTORE: 'project-two-firestore',
  ONE_FIREAUTH: 'project-one-fireauth',
  TWO_FIREAUTH: 'project-two-fireauth',
};

export const FIREBASE_PROJECT_ONE = new InjectionToken('firebase project injector');
export const FIREBASE_PROJECT_TWO = new InjectionToken('firebase project injector');

export function AngularFirestoreFactory(platformId: any, zone: NgZone, env: ENV, projectId: string) {
  return new AngularFirestore(env.firebaseConfig[projectId], projectId, false, null, platformId, zone, null);
}

export function AngularFireAuthFactory(platformId: any, zone: NgZone, env: ENV, projectId: string) {
  return new AngularFireAuth(env.firebaseConfig[projectId], projectId, platformId, zone);
}


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {provide: ENV_CONFIG, useValue: environment},
    {provide: FIREBASE_PROJECT_ONE, useValue: 'PROJECT-ONE'},
    {provide: FIREBASE_PROJECT_TWO, useValue: 'PROJECT-TWO'},
    {
      provide: FIREBASE_REFERENCES.ONE_FIRESTORE,
      deps: [PLATFORM_ID, NgZone, ENV_CONFIG, FIREBASE_PROJECT_ONE],
      useFactory: AngularFirestoreFactory
    },
    {
      provide: FIREBASE_REFERENCES.TWO_FIRESTORE,
      deps: [PLATFORM_ID, NgZone, ENV_CONFIG, FIREBASE_PROJECT_TWO],
      useFactory: AngularFirestoreFactory
    },
    {
      provide: FIREBASE_REFERENCES.ONE_FIREAUTH,
      deps: [PLATFORM_ID, NgZone, ENV_CONFIG, FIREBASE_PROJECT_ONE],
      useFactory: AngularFireAuthFactory
    },
    {
      provide: FIREBASE_REFERENCES.TWO_FIREAUTH,
      deps: [PLATFORM_ID, NgZone, ENV_CONFIG, FIREBASE_PROJECT_TWO],
      useFactory: AngularFireAuthFactory
    }
  ]
})
export class FirebaseBootstrapperModule {

}
