import React, { Component } from 'react'

class AddFishForm extends Component {
    createFish = (event) => {
        event.preventDefault();
        const fish = {
            name: this.name.value,
            price: +this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value,
            quantity: 0
        }

        this.props.addFish(fish)
        this.fishForm.reset()
    }

    // refs
    inputName = (input) => {this.name = input}
    inputPrice = (input) => {this.price = input}
    inputStatus = (input) => {this.status = input}
    inputDesc = (input) => {this.desc = input}
    inputImage = (input) => {this.image = input}
    fishFormRef = (form) => {this.fishForm = form}

    render() {
        return (
            <form ref={this.fishFormRef} className="fish-edit">
                <input ref={this.inputName} type="text" placeholder="Fish Name"/>
                <input ref={this.inputPrice} type="number" placeholder="Fish Price"/>
                <select ref={this.inputStatus}>
                    <option value="" defaultValue disabled>Status</option>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea ref={this.inputDesc} type="text" placeholder="Fish Description" />
                <input ref={this.inputImage} type="text" placeholder="Fish Image"/>
                <button type="submit" onClick={this.createFish}>+ Add Fish</button>
            </form>
        )
    }
}

export default AddFishForm
