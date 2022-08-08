import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react"
import { store,persistor } from './redux/app/store'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './styles/tailwind.css'
import "rc-drawer/assets/index.css"

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <App />
        </PersistGate>
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
