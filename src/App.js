import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
class App extends Component {
    // state = {
    //     show: true
    // }

    // componentDidMount() {
    //     setTimeout(() => {this.setState({show: false})}, 5000);
    // }

    render() {
        return (
            <Layout>
                <BurgerBuilder/>
            </Layout>
        );
    }
}

export default App;
