import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD1-o6VpQz7i_YHMT_HvPEphjKgnWBPGLc',
  authDomain: 'octa-level-node.firebaseapp.com',
  projectId: 'octa-level-node',
  storageBucket: 'octa-level-node.appspot.com',
  messagingSenderId: '277455373687',
  appId: '1:277455373687:web:9525b96786f63b9b738d72',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const storage = getStorage()
export { storage }
