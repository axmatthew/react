import FirebaseStore from './firebase-store';

class StoreFactory {

}

StoreFactory.getInstance = function getInstance() {
  if (!StoreFactory.singleton) {
    StoreFactory.singleton = new FirebaseStore();
    StoreFactory.singleton.init();
  }

  return this.singleton;
};

export default StoreFactory;
