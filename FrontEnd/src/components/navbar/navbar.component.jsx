// Import libraries
import React, { Component } from 'react';
import Style from './navbar.css';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";

import { LogOut } from '@Components';
import { cloud } from '../../assets';

export class Navbar extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <div className={Style.navbar}>
                <MDBNavbar color="#90caf9" dark expand="md">
                    <MDBNavbarBrand>
                        <img src={cloud} style={{ width: "8%" }} />
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar >
                        <MDBNavbarNav right>
                            <MDBNavItem >
                                <MDBNavLink to="#!">Mensajeria</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem >
                                <MDBNavLink to="/gestionInvitados">Invitados</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem >
                                <MDBNavLink to="/mesas">Mesas</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem >
                                <MDBNavLink to="/FormularioConfirmacionAdmin">Perfil</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
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