import React, { Component } from 'react'
import AddFishForm from './AddFishForm'
import base from '../base'

class Inventory extends Component {

    state = {
        uid: null,
        owner: null
    }

    static propTypes = {
        fishes: React.PropTypes.object.isRequired,
        storeId: React.PropTypes.string.isRequired,
        addFish: React.PropTypes.func.isRequired,
        updateFish: React.PropTypes.func.isRequired,
        removeFish: React.PropTypes.func.isRequired,
        loadSamples: React.PropTypes.func.isRequired
    }

    componentWillMount() {
        // check if client has previously logged in, and then log in if yes
        base.onAuth((user) => {
            if(user) {
                this.authHandler(null, { user })
            } else {
                this.setState({
                    owner: 'nobody is logged in'
                })
            }
        })
    }

    renderLogin = () => (
        <nav className="login">
            <h2>Inventory</h2>
            <p>Sign-in to manage your store's inventory</p>
            <button className="github" data-provider="github" onClick={this.authenticate}>Log In with GitHub</button>
            <button className="facebook" data-provider="facebook" onClick={this.authenticate}>Log In with Facebook</button>
            <button className="twitter" data-provider="twitter" onClick={this.authenticate}>Log In With Twitter</button>
        </nav>
    )

    authenticate = (event) => {
        const provider = event.target.dataset.provider
        base.authWithOAuthPopup(provider, this.authHandler)
    }

    authHandler = (err, authData) => {
        if(err) return console.log(err);

        const Inventory = this
        const storeId = this.props.storeId

        // connect to firebase store
        const storeRef = base.database().ref(storeId)

        // get store data
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {}

            // save owner, if no owner exists
            if(!data.owner) {
                storeRef.set({
                    owner: authData.user.uid
                })
            }

            // set state with stored owner if it exists, or with new uid
            Inventory.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            })
        })
    }

    logout = () => {
        base.unauth()

        this.setState({
            uid: null,
            owner: 'nobody is logged in'
        })
    }

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
            <button data-key={key} onClick={this.props.removeFish}>Remove Fish</button>
        </div>
    )

    render() {
        if(!this.state.owner) return <div>Loading...</div>

        if(this.state.owner === 'nobody is logged in') return <div>{this.renderLogin()}</div>

        if(this.state.uid !== this.state.owner) return (
            <div>
                <p>Sorry, you are not the owner of this store.</p>
                <button onClick={this.logout}>Log Out</button>
            </div>
        )

        return (
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
                <button onClick={this.logout}>Log Out</button>
            </div>
        )
    }
}

export default Inventory;
