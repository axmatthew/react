/* global Firebase */
import credentials from '../../../credentials';

class FirebaseStore {

  init() {
    this.FIREBASE_URL = credentials.FIREBASE_URL;
    this.firebaseRef = new Firebase(this.FIREBASE_URL);
  }

  retrieveAndListen(name, valueCallback) {
    this.firebaseRef.child(name).on('value', snapshot => {
      const val = snapshot.val();
      // Convert firebase map to entity array
      const entities = val ? Object.keys(val).map(_id => val[_id]) : [];
      valueCallback(entities);
    });
  }

  retrieveBy(name, key, value, valueCallback) {
    this.firebaseRef.child(name).orderByChild(key).equalTo(value).once('value', snapshot => {
      const val = snapshot.val();
      // Convert firebase map to entity array
      const entities = val ? Object.keys(val).map(_id => val[_id]) : [];
      valueCallback(entities);
    }, false);
  }

  retrieveOne(name, _id, valueCallback) {
    // FIXME: currently do not listen in retrieveOne as it is difficult to unlisten
    this.firebaseRef.child(`${name}/${_id}`).once('value', snapshot => {
      valueCallback(snapshot.val());
    });
  }

  unlistenAll(name) {
    this.firebaseRef.child(name).off('value');
  }

  insert(name, value, callback) {
    const newRef = this.firebaseRef.child(name).push();
    const objectWithId = Object.assign({}, value, { _id: newRef.key() });
    newRef.set(JSON.parse(JSON.stringify(objectWithId)), () => {
      if (callback) {
        callback(null, objectWithId._id);
      }
    });
  }

  update(name, _id, value, callback) {
    this.firebaseRef.child(`${name}/${_id}`).update(JSON.parse(JSON.stringify(value)), callback);
  }

  remove(name, _id, callback) {
    this.firebaseRef.child(`${name}/${_id}`).remove(callback);
  }

  login(email, password, callback) {
    this.firebaseRef.authWithPassword({ email, password }, callback);
  }

}

export default FirebaseStore;
