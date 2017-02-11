import React from 'react'
import { formatPrice } from '../helpers'

const Fish = ({ name, price, status, desc, image, fishKey, addToOrder }) => (
    <li className="menu-fish">
        <img src={image} alt={name}/>
        <h3 className="fish-name">
            {name}
            <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
            data-key={fishKey}
            disabled={status === 'unavailable'}
            onClick={addToOrder}>
                {(status) === 'available' ? 'Add To Order' : 'SOLD OUT!'}
        </button>
    </li>
)

Fish.propTypes = {
    name: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    status: React.PropTypes.oneOf(['available', 'unavailable']).isRequired,
    desc: React.PropTypes.string,
    image: React.PropTypes.string
}

export default Fish
