import * as firebase from 'firebase';
import cards from '../db/cards';

firebase.initializeApp({
  apiKey: 'AIzaSyCSwlvuRhaIFd5iqu8jdrMnKKkntEUFyls',
  authDomain: 'phone-store-15c0b.firebaseapp.com',
  databaseURL: 'https://phone-store-15c0b.firebaseio.com',
  projectId: 'phone-store-15c0b',
  storageBucket: 'phone-store-15c0b.appspot.com',
  messagingSenderId: '535310979412',
  appId: '1:535310979412:web:6c3bd7b41b22c29770b8c1'
});

const database = firebase.database();


// const createDataBase = (dataArray) => {
//   dataArray.map(({title, src, price, old}) => {
//     database.ref('cards').push({ title, src, price, old }).off();
//   })
// };
//
// createDataBase(cards);


export const onceData = new Promise((resolve, reject) => {
  database.ref('cards').once('value')
    .then(snapshot => {
      const dataValue = snapshot.val();

      const card = Object.keys(dataValue).map(key => {
        return {
          ...dataValue[key],
          id: key
        }
      });

      resolve(card);
    })
    .catch((error) => {
      reject(error)
    });
});

function writeNewCard(title, src, price, old) {
  const postCard = {
    title: title,
    src: src,
    price: price,
    old: old
  };

  // Get a key for a new Post.
  const newCardKey = database.ref().child('cards').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/cards/' + newCardKey] = postCard;

  return database.ref().update(updates);
}
// writeNewCard('Super Phone', 'src/images/goods/5.png', '$100', '$500');


