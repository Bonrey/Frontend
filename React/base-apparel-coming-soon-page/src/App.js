import React, {useState, useEffect} from 'react';
import './App.scss';

import Logo from './components/Logo';
import Header from './components/Header';
import Form from './components/Form';
import Attribution from './components/Attribution';

function App() {
  const [width, setWidth] = useState(window.outerWidth);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.outerWidth);
    };

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth)
  }, []);

  return (
    <div className={width <= 700 ? "WrapperMobile" : "WrapperDesktop"}>
      <main className={width <= 700 ? "MainMobile" : "MainDesktop"}>
        <div className="MainContent">
          <Logo />
          <Header />
          <Form />
        </div>
      </main>
      {/*<Attribution />*/}
    </div>
  );
}

export default App;