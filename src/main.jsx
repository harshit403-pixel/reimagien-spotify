import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppRoute from './app/routes/AppRoute.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store/store.jsx'

createRoot(document.getElementById('root')).render(
 
    <Provider store={store} >
      <AppRoute/>
    </Provider>
  
)
