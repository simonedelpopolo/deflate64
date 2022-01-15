import './header.css'
import Links from './Links/Links.jsx'
import React, { Component } from 'react'

class Header extends Component{
    
    constructor( properties ) {
        super( properties )
    }
    
    render() {
        
        return (
            <header className={'header'}>
                <Links />
            </header>
        )
    }
}

export default Header
