import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from './SignUpForm';

class SignUpPage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      errors: {},
      user: {
        email: '',
        password: '',
        confirm_password: '',
      }
    };
  }

  processForm(event) {
    event.preventDefault();
    const email = this.state.user.email;
    const password = this.state.user.password;
    const confirm_password = this.state.user.confirm_password;

    console.log('email: ' + email);
    console.log('password: ' + password);
    console.log('confirm psd: ' + confirm_password);

    //post sign up data
    const url = 'http://' + window.location.hostname + ':3000' + '/auth/signup';

    const request = new Request(
      url,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.user.email,
          password: this.state.user.password,
        }),
      });

      fetch(request).then(response => {
        if (response.status === 200) {
          this.setState({
            errors: {}
          });

          response.json().then(json => {
            console.log(json);
            this.context.router.replace('/login');
          });
        } else {
          response.json().then(json => {
            console.log('signup failed!');
            const errors = json.errors;
            errors.summary = json.message;
            this.setState({errors});
          })
        }
      });
  }

  changeUser(event) {

    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({user});

    const errors = this.state.errors;
    if (this.state.user.password !== this.state.user.confirm_password) {
      errors.password = "password and Confirm Password don't match.";
    } else {
      errors.password = '';
    }
    this.setState({errors});
  }

  render() {
    return (
      <SignUpForm
        onSubmit={(e) => this.processForm(e)}
        onChange={(e) => this.changeUser(e)}
        errors={ this.state.errors }
        user={ this.state.user }
      />
    )
  }
}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;
