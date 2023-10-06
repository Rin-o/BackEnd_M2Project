import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AllBabysittersPage from './pages/AllBabysittersPage'
import BabysitterDetailsPage from './pages/BabysitterDetailsPage'
import AddBabysitterPage from './pages/AddBabysitterPage'
import FavouritePage from './pages/FavouritePage'

function App() {

  return (
    <div className='App'>
    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/babysitters' element={<AllBabysittersPage />}></Route>
      <Route path='/babysitters/:babysitterId' element={<BabysitterDetailsPage />}></Route>
      <Route path='/babysitters/new' element={<AddBabysitterPage />}></Route>
      <Route path='/babysitters/favourite' element={<FavouritePage />}></Route>
      
      <Route path='*' element={<h1>404 Page</h1>}></Route>
    </Routes>
    </div>
  );
}

export default App
