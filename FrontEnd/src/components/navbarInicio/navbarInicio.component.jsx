// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";
import Style from './navbarInicio.css';
import { cloud } from '../../assets';
import { style } from 'react-toastify';
import { PaginaResgisLog} from '@Components';

export class NavbarInicio extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <div className={Style.navbar}>
            <MDBNavbar className="navbar-fixed z-depth-1-half" dark expand="md">
                <MDBNavbarBrand>
                <img src={cloud} style={{width:"8%"}}/>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar > 
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            {/* <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <div className="d-none d-md-inline">Dropdown</div>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default" right>
                                    <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown> */}
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        {/* <MDBNavItem>
                            <MDBNavLink className="waves-effect waves-light" to="#!">
                                <MDBIcon fab icon="twitter" />
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink className="waves-effect waves-light" to="#!">
                                <MDBIcon fab icon="google-plus-g" />
                            </MDBNavLink>
                        </MDBNavItem> */}
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <MDBIcon icon="user" />
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default" right>
                                 <PaginaResgisLog/>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
            </div>
        );
    }
}