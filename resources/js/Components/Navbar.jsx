import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <NavContainer>
            <NavWrapper>
                <Logo to="/">Your Logo Here</Logo>

                <Hamburger onClick={toggleNav}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </Hamburger>

                <NavLinks isOpen={isOpen}>
                    <NavMenu>
                        <NavLink to="/" onClick={toggleNav}>
                            Home
                        </NavLink>
                        <NavLink to="/about" onClick={toggleNav}>
                            About
                        </NavLink>
                        <NavLink to="/contact" onClick={toggleNav}>
                            Contact
                        </NavLink>
                    </NavMenu>
                </NavLinks>
            </NavWrapper>
        </NavContainer>
    );
}

const NavContainer = styled.nav`
    background-color: #222;
    color: #fff;
    padding: 1rem 0;
`;

const NavWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
`;

const Logo = styled(Link)`
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #fff;
`;

const Hamburger = styled.div`
    display: none;

    @media screen and (max-width: 768px) {
        display: block;
        font-size: 2rem;
        cursor: pointer;
    }
`;

const NavLinks = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        position: absolute;
        top: 64px;
        left: 0;
        width: 100%;
        background-color: #222;
        transition: all 0.5s ease-in-out;
        max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
        overflow: hidden;
    }
`;

const NavMenu = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
`;

const NavLink = styled(Link)`
    text-decoration: none;
    color: #fff;
    margin: 0 0.5rem;
    transition: all ease-in-out;
    &:hover {
        color: #ff0;
    }

    @media screen and (max-width: 768px) {
        padding: 1rem;
        margin: 0.5rem 0;
        width: 100%;
        text-align: center;
    }
`;

export default Navbar;
