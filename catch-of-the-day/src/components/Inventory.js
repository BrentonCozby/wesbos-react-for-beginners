import React, { Component } from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends Component {

    renderInventory = (key) => (
        <div key={key} className="fish-edit">
            <input
                data-key={key}
                type="text"
                name="name"
                placeholder="name"
                value={this.props.fishes[key].name}
                onChange={this.props.updateFish} />
            <input
                data-key={key}
                type="number"
                name="price"
                placeholder="price"
                value={this.props.fishes[key].price}
                onChange={this.props.updateFish} />
            <select
                data-key={key}
                type="text"
                name="status"
                placeholder="status"
                value={this.props.fishes[key].status}
                onChange={this.props.updateFish} >
                    <option value="" disabled>Status</option>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
            <textarea
                data-key={key}
                type="text"
                name="desc"
                placeholder="description"
                value={this.props.fishes[key].desc}
                onChange={this.props.updateFish} />
            <input
                data-key={key}
                type="text"
                name="image"
                placeholder="image"
                value={this.props.fishes[key].image}
                onChange={this.props.updateFish} />
        </div>
    )

    render() {
        return (
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory;
