import React, { Component } from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import base from '../base'

import sampleFishes from '../sample-fishes'

class App extends Component {
    state = {
        fishes: {},
        order: {}
    }

    componentWillMount() {
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref)
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(
            `order-${this.props.params.storeId}`,
            JSON.stringify(nextState.order)
        )
    }

    addToOrder = (event) => {
        var order = {...this.state.order}
        const fishKey = event.target.dataset.key
        order[fishKey] = order[fishKey] + 1 || 1

        this.setState({ order })
    }

    removeFromOrder = (event) => {
        var order = {...this.state.order}
        const fishKey = event.target.dataset.key
        delete order[fishKey]

        this.setState({ order })
    }

    // Inventory.js methods
    loadSamples = () => {
        this.setState({ fishes: {...sampleFishes} })
    }

    addFish = (fish) => {
        var fishes = {...this.state.fishes}
        fishes['fish-' + Date.now()] = fish

        this.setState({ fishes });
    }

    updateFish = (event) => {
        const input = event.target
        var fishes = {...this.state.fishes}
        fishes[input.dataset.key][input.name] = (input.name === 'price')
            ? parseInt(input.value, 10)
            : input.value

        this.setState({ fishes })
    }

    removeFish = (event) => {
        const input = event.target
        var fishes = {...this.state.fishes}
        fishes[input.dataset.key] = null

        this.setState({ fishes })
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {
                            Object.keys(this.state.fishes)
                            .map(key =>
                                <Fish
                                    key={key}
                                    fishKey={key}
                                    {...this.state.fishes[key]}
                                    addToOrder={this.addToOrder}
                                />
                            )
                        }
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    storeId={this.props.params.storeId}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    fishes={this.state.fishes}
                    storeId={this.props.params.storeId}
                    addFish={this.addFish}
                    loadSamples={this.loadSamples}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                />
            </div>
        )
    }
}

export default App
