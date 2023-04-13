import './App.css';
import About from './pages/about';
import Contact from './pages/contact';
import Footer from './pages/footer';
import Header from './pages/header';
import Intro from './pages/intro';
import News from './pages/news_article';
import Product from './pages/product';




function App() {
  return ( 
    <div className="App">
    <Header/>
    <main>
      <Intro/>
      <Product/>
      <News/>
      <About/>
      <Contact/>
    </main>

    <Footer/>
    </div>
   
  
  );
}

export default App;
