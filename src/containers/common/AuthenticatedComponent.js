import React from "react";
import Auth from "../../Auth";

var Profile = require("../../util/Profile");
var auth = new Auth();

export default class AuthenticatedComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            displayed: false,
            authProfile: "",
            profile: ""
        };

        auth.getProfile((err, userProfile) => {
            if (err) {
                //squash
            } else {
                this.setState({ authProfile: userProfile });
            }
        });
    }

    logout(path) {
        auth.logout(() => {
            this.props.history.push(path);
        });
    }

    componentDidMount() {
        var path = this.props.history.location.pathname;

        if (!auth.isAuthenticated()) {
            this.setState({ displayed: false });
            auth.login(path);
        } else {
            this.setState({ displayed: true });
        }
    }

    componentDidUpdate() {
        if (!this.state.profile && this.state.authProfile) {
            Profile.getProfile(auth.getSession().access_token, (err, data) => {
                if (err) {
                    console.log("error fetching profile", err);
                } else {
                    this.setState({ profile: data });
                }
            });
        }
    }
}