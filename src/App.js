// Library
import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import { useState } from 'react';
import style from 'styled-components';

// Views
import Home from './views/Home';
import Favorite from './views/Favorite';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Files
import { FavoriteContext } from './context/Favorite.Context';

// style & CSS
import './App.css';
const Page = style.div`
  display: flex;
  min-height: 45.1rem;
  flex-direction: column;
  justify-content: space-between;
`;

function App() {
    const [favoriteCity, setfavoriteCity] = useState([]);

  return (
    <BrowserRouter>
        <FavoriteContext.Provider value={{favoriteCity, setfavoriteCity}}>
        <Page>
            <Navbar />
            <Switch>
                <Route exact path="/weatherApp" component={Home} />
                <Route path="/weatherApp/favorite" component={Favorite} />
            </Switch>
            <Footer />
        </Page>
        </FavoriteContext.Provider>
    </BrowserRouter>
  );
}

export default App;
