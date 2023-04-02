import React from 'react'
import './Components.css'
import fw from './FW200.svg'
function Header() {
    return (
        <div className='Header'>
            <img src={fw} alt='fw' />
        </div>
    )
}

export default Header