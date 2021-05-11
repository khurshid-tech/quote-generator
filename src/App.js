import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './css/App.css'

const App = () => {

  const [values, setValues] = useState({
    quotes: [],
    singleQuote: 'Do one thing out of your comfor zone everyday.',
    quoteIndex: 0,
    author: 'Khurshid',
    backgroundImg: 'background-image-1'
  })

  const [cycle, setCycle] = useState(0);


  const {quotes, singleQuote, quoteIndex, author, backgroundImg} = values;

  const getAllQuotes = () => {
      axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
        .then(response => {
          if(response.status===200){
            setValues({...values, quotes:response.data.quotes});
          }
          
        })
        .catch(err => console.log("error", err));
  }


  const updateQuote = () => {
    let quoteIndexValue = quoteIndex;
    if(quoteIndex===quotes.length-1){
      quoteIndexValue=0;
    }else {
      quoteIndexValue++;
    }

    
    
    setValues({...values,
       singleQuote:quotes[quoteIndexValue].quote,
        author:quotes[quoteIndexValue].author,
         quoteIndex: quoteIndexValue,
        backgroundImg: `background-image-${cycle}`
        });

    //updateing cycle
    setCycle(cycle===5? 1 : cycle+1);
    
  }



  useEffect(() => {
    getAllQuotes();
  }, []);


  return (
    <div className={`base ${backgroundImg}`}>
        <main className="container">
          <div className="quote">
            <p>{singleQuote}</p>
          </div>
          <div className="author author-color-1">
            <span>{author}</span>
          </div>
          <div className="button-wrap">
              <button onClick={updateQuote}  className="new-quote">new quote</button>
          </div>
        </main>
      </div>
  )
}

export default App;