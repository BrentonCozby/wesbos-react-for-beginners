import React, {Component} from 'react';
import {getFunName} from '../helpers';

class StorePicker extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    goToStore = (event) => {
        event.preventDefault();

        const storeId = this.storeInput.value;

        this.context.router.transitionTo(`/catch-of-the-day/store/${storeId}`);
    }

    getInput = input => {this.storeInput = input};

    render () {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter A Store</h2>
                <input
                    type="text"
                    required
                    defaultValue={getFunName()}
                    ref={this.getInput}
                />
                <button type="submit">Visit Store →</button>
            </form>
        )
    }
}

export default StorePicker;
