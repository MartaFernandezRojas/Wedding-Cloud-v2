// Import libraries
import React, { Component } from 'react';
import Style from './navbar.css';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon,MDBBtn
} from "mdbreact";
import { mensInv, Inv, postMens, mensPriv, borrarPriva } from '@Models'
import { connect } from 'react-redux';
import { LogOut } from '@Components';
import { cloud } from '../../assets';

 class Navbar extends Component {
    state = {
        isOpen: false
    };
    componentDidMount() {
        var invitado = JSON.parse(localStorage.getItem("invitado"));
        this.props.loadInv({ idb: invitado.id_boda })
        this.props.loadPriv({ id_invReceptor: invitado.id })
        console.log(this.props.invitados)
        
    }

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
                        <MDBNavbarNav style={{ fontSize: "14px" }} right>
                            <MDBNavItem >
                                <MDBNavLink to="/mensajeriaAdmin">Mensajeria</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem >
                                <MDBNavLink to="/gestionInvitados">Invitados</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem >
                                <MDBNavLink to="/mesas">Mesas</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem >
                                <MDBNavLink to="/mensajeriaPrivada">Privados</MDBNavLink>
                                
                            </MDBNavItem>
                            <span style={{color:"red"}} className="counter"></span>
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

const mapStateToProps = (state, props) => {
    return {
        ...props,
        invitados: state.rootReducer.invitados,
        privados: state.rootReducer.privados,
    };
}

const mapDispatchToProps = {
    loadInv: Inv,
    loadPriv: mensPriv,
    deleteMens: borrarPriva
}

export const ConnectNavbar = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navbar);
