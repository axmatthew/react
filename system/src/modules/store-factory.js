import FirebaseStore from './firebase-store';

class StoreFactory {

  static getInstance = () => {
    if (!StoreFactory.singleton) {
      StoreFactory.singleton = new FirebaseStore();
      StoreFactory.singleton.init();
    }

    return StoreFactory.singleton;
  };

}

export default StoreFactory;
