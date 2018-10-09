import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

  // if signed in before, return a user. Else null
  observeAuth = () => {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
  }

  // Called when firebase finds authentication. If we weren't signed in, sign in anonymously.
  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
          alert(message);
      }
    }
  }

  // Where the messages are saved in the database
  get ref() {
    return firebase.database().ref('messages');
  }

  // gets last 20 messages and any new ones.
  on = (callback) => {
    this.ref.limitToLast(20).on('child_added', snapshot => callback(this.parse(snapshot)));
  }

  // Reduce the data returned from firebase
  parse = (snapshot) => {
    const { timestamp: numberStamp, text, user} = snapshot.val(); // returns the value associated with the snapshot
    const { key: _id } = snapshot;

    const timestamp = new Date(numberStamp);

    const message = {
      _id,
      timestamp, 
      text,
      user
    }
    return message;
  }

  // Unsubscribes from the database
  off() {
    this.ref.off();
  }
  // Returns unique users id 
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // Takes in an array of messages. Loops through, creating a message object and saving it
  send = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user, 
        timestamp: this.timestamp
      };
      this.append(message);
    }
  }

  append = (message) => {
    this.ref.push(message);
  }

  init = () => {
    firebase.initializeApp({
      apiKey: "AIzaSyDUFFsFCkHAAT0-8amLcSIoV3yJfKfM3Fk",
      authDomain: "chat-app-9bfd5.firebaseapp.com",
      databaseURL: "https://chat-app-9bfd5.firebaseio.com",
      projectId: "chat-app-9bfd5",
      storageBucket: "chat-app-9bfd5.appspot.com",
      messagingSenderId: "12507034925"
    });
  }
}

Fire.shared = new Fire();
export default Fire;