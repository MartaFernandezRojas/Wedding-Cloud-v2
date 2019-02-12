import React, { Component } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

export class Footer extends Component {
    render() {
        return (
            <MDBFooter color="grey" className="font-small pt-4 mt-4">
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Copyright: <a href="https://www.myweddingcloud.com"> www.weddingcloud.com </a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        );
    }
}

