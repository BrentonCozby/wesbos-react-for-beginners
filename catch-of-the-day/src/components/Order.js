import React, { Component } from 'react'
import { formatPrice } from '../helpers'

class Order extends Component {

    renderOrder = (key) => {
        const fish = this.props.fishes[key]
        const quantity = this.props.order[key]

        if(!fish || fish.status === 'unavailable') {
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available!</li>
        }

        return (
            <li key={key}>
                <span>{quantity} lbs {fish.name}</span>
                <span className="price">
                    {formatPrice(fish.price * quantity)}
                </span>

            </li>
        )
    }

    calcTotalPrice = (fishes, order, orderKeys) => {
        var totalPrice = orderKeys.reduce((total, key) => {
            if(fishes[key] && fishes[key].status === 'available') {
                return total + (fishes[key].price * order[key] || 0)
            }
            return total
        }, 0)
        return formatPrice(totalPrice)
    }

    render() {
        const fishes = this.props.fishes
        const order = this.props.order
        const orderKeys = Object.keys(order)

        return (
            <div className="order-wrap">
                <h2>Your Order</h2>
                <ul className="order">
                    {
                        (Object.keys(fishes).length === 0)
                            ? null
                            : orderKeys.map(this.renderOrder)
                    }
                    <li className="total">
                        <strong>Total:</strong>
                        {this.calcTotalPrice(fishes, order, orderKeys)}
                    </li>
                </ul>
            </div>
        )
    }
}

export default Order
