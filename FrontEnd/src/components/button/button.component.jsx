// Import libraries
import React, { Component } from  'react';

// Import global resources

// Import local resources
import styles from './button.styles.css';

///////////// Component ////////////////
export class Button extends Component {
  render() {
    return (
      <a onClick={() => console.log('Click nuevo boton')} className={styles.button}>
        {this.props.children}
      </a>
    );
  }
}
