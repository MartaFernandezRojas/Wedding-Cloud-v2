// Import libraries
import { cloud } from '../../assets';
import React, { Component } from 'react';


import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";

import Style from './navbarInvitados.css';
import { LogOut } from '@Components';

export class NavbarInvitados extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <div className={Style.navbar}>
                <MDBNavbar color="#90caf9 lighten-3" dark expand="md">
                    <MDBNavbarBrand>
                        <img src={cloud} style={{ width: "8%" }} />
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav right>
                            <MDBNavItem >
                                <MDBNavLink to="/mensajeriaInvitados">Mensajeria</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active >
                                <MDBNavLink to="/FormularioConfirmacion">Confirmacion</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem right>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="user" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" right>
                                        <LogOut />
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