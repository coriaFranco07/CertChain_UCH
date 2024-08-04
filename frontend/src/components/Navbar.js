import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import "../css/Navbar.css";
import Logo from "../img/logo.png";

const Navbar = () => {
    const location = useLocation(); 

    const handleLogout = () => {
        
    };

    const isActive = (path) => location.pathname === path; 

    return (
        <AppBar position="static" style={{ boxShadow: 'none' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between',backgroundColor: '#003953' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <NavLink to="/">
                        <img src={Logo} alt="Logo" style={{ width: "100px" }} />
                    </NavLink>
                    <Typography variant="h6" component="div" style={{ margin: '0 10px' }}>
                        <NavLink to="/carga-evidencias" className={`nav-link ${isActive('/carga-evidencias') ? 'active-nav-link' : ''}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 20, marginRight: 5 }}>
                                <path d="M15.7161 16.2234H8.49609" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15.7161 12.0369H8.49609" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11.2511 7.86011H8.49609" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.9085 2.74976C15.9085 2.74976 8.23149 2.75376 8.21949 2.75376C5.45949 2.77076 3.75049 4.58676 3.75049 7.35676V16.5528C3.75049 19.3368 5.47249 21.1598 8.25649 21.1598C8.25649 21.1598 15.9325 21.1568 15.9455 21.1568C18.7055 21.1398 20.4155 19.3228 20.4155 16.5528V7.35676C20.4155 4.57276 18.6925 2.74976 15.9085 2.74976Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Subir Certificados
                        </NavLink>
                    </Typography>
                    <Typography variant="h6" component="div" style={{ margin: '0 10px' }}>
                        <NavLink to="/mis-evidencias" className={`nav-link ${isActive('/mis-evidencias') ? 'active-nav-link' : ''}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 20, marginRight: 5 }}>
                                <path d="M12 20V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 20V4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 20V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Certificados
                        </NavLink>
                    </Typography>
                </div>
                <div>
                    <Button
                        variant="contained"
                        className="buttonOutNavbar"
                        onClick={handleLogout}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.016 7.38948V6.45648C15.016 4.42148 13.366 2.77148 11.331 2.77148H6.45597C4.42197 2.77148 2.77197 4.42148 2.77197 6.45648V17.5865C2.77197 19.6215 4.42197 21.2715 6.45597 21.2715H11.341C13.37 21.2715 15.016 19.6265 15.016 17.5975V16.6545" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21.8096 12.0214H9.76855" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.8813 9.10632L21.8093 12.0213L18.8813 14.9373" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
