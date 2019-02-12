// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
// Import global resources

// Import local resources
import styles from './galeria.styles.css';

//import componenet react-materialize
import {Button} from 'react-materialize';

///////////// Component ////////////////
export class Galeria extends Component {

    componentDidMount() {
        axios.get('http://localhost:3000/galeria/get')
          .then(response => {
            this.setState({ pizza: response.data })
          })
      }

  render() {
    return (
      
            <Button waves='light' className={styles.Button}>
             Hola
            </Button>
    );
  }
}
