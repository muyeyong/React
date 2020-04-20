import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUserAuth } from '../../redux/actions';
class Home extends Component {
    componentDidMount() {
        const { getUserAuth, user: { role_id }, user } = this.props;
        getUserAuth(role_id);
    }
    render() {
        return (
            <div >
                Home
            </div>
        )
    }
}

export default connect(state => ({ user: state.user }), { getUserAuth })(Home); 