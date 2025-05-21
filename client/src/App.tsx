import 'bulma/css/bulma.css'
import { AppDataProvider } from './component/AppContext'
import {Child} from './component/Child'

function App() {
  return (
    <>
    <AppDataProvider>
        hello world 
        <Child/>
    </AppDataProvider>

    </>
  )
}

export default App
