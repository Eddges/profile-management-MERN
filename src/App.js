import React from 'react';
// import image from '../public/images/shekharlol.jpg'

class App extends React.Component{
  render(){
    return(
      <div>
        <img src={process.env.PUBLIC_URL + '/images/shekharlol.jpg'} alt="Wont show" />
      </div>
    )
  }
}

export default App;
