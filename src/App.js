import './App.css';
import './reset.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CardList from './components/Card/Card';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Layout>
            <div className='sub-header'>
              <h1>Produtos</h1>
            </div>
            <section className='products'>
              <CardList/>
            </section>
          </Layout>
        </Route>
        <Route exact path="/cart">
          <Cart/>
        </Route>
      </Switch>      
    </Router>
  );
}

export default App;