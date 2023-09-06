import './Layout.css'
import Header from '../Header/Header';

const Layout = ({children}) =>{
    return (
        <div className="App">
            <Header/>
            {children}
      </div>
    );
}

export default Layout