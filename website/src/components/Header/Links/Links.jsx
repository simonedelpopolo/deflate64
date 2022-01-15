import './links.css'
import { NavLink } from 'react-router-dom'
import React, { Component } from 'react'

class Links extends Component{
    
    constructor( properties ) {
        super( properties )
        
        this.state = {
            Links: [
                { name: 'Home', path:'/' },
                { name: 'Documentation', path:'/documentation' },
                { name: 'Examples', path:'/examples' },
            ]
        }
    }
    
    render() {
        
        return (
            <>
                <div className={'links'}>
                    {this.state.Links.map( ( link, index ) => (
                        
                        <NavLink
                            key={index}
                            to={link.path}
                            style={( { isActive } ) => ( {
                                height:'50px',
                                alignSelf:'center',
                                color: isActive ? '#1f232a' : '#545e6f',
                                fontWeight: isActive ? '800' : '100',
                                background: isActive ? '#62dafb' : '#1f232a',
                            } )}
        
                        >
                            
                            <div>{link.name}</div>
                            
                        </NavLink>

                    ) )}
                </div>
                
            </>
        )
    }
}

export default Links
