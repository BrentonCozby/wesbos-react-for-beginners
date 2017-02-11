import React, { Component } from 'react'
import { formatPrice } from '../helpers'
import CSSTransitionGroup from 'react-addons-css-transition-group'

class Order extends Component {

    static proptypes = {
        fishes: React.PropTypes.object.isRequired,
        order: React.PropTypes.object.isRequired,
        removeFromOrder: React.PropTypes.func.isRequired
    }

    renderOrder = (key) => {
        const fish = this.props.fishes[key]
        const quantity = this.props.order[key] || 0
        const removeButton = (
            <button
                data-key={key}
                onClick={this.props.removeFromOrder}>
                    &times;
            </button>
        )

        if(!fish || fish.status === 'unavailable') {
            return (
                <li key={key}>
                    Sorry, {(fish) ? fish.name : 'fish'} is no longer available!
                    {removeButton}
                </li>)
        }

        return (
            <li key={key}>
                <span>
                    <CSSTransitionGroup
                        component="span"
                        className="quantity"
                        transitionName="quantity"
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200}>
                            <span key={quantity}>{quantity}</span>
                    </CSSTransitionGroup>
                    &nbsp;lbs {fish.name} {removeButton}
                </span>
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

                <CSSTransitionGroup
                    component="ul"
                    className="order"
                    transitionName="order"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                        {
                            (Object.keys(fishes).length > 0)
                            ? orderKeys.map(this.renderOrder)
                            : null
                        }
                        <li className="total">
                            <strong>Total:</strong>
                            {this.calcTotalPrice(fishes, order, orderKeys)}
                        </li>
                </CSSTransitionGroup>

            </div>
        )
    }
}

export default Order
