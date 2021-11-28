import React, { FC } from 'react'

interface Props {
    buttonClasses: string
    heroIcon: any
    text: string
}

const ButtonWithIcon: FC<Props> = ({ buttonClasses, heroIcon, text }) => {
    return (
        <button className={buttonClasses}>
            {heroIcon}
            <p>{text}</p>
        </button>
    )
}

export default ButtonWithIcon
