import React from "react"
import './Score.scss'

const Score = props => {

    const createStaff = (first, last) => {
        return (props.children).slice(first, last)
    }

    return (
        <div className="score-container">
            <div className='notes'>{ createStaff(0, 8) }</div>
            <div className="spacer"></div>
            <div className='notes'>{ createStaff(8, 16) }</div>
        </div>
    )
}

export default Score