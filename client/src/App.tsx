import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AppDataProvider } from './component/AppContext'
import { ItemList } from './component/ItemList'
import { PageLayout } from './component/MainLayout'

function App() {
  return (
    <>
    <AppDataProvider>
        <PageLayout>
          <ItemList/>
        </PageLayout>
    </AppDataProvider>

    </>
  )
}

export default App
