import Base from './Base/Base';
import App from './App/App';
import Auth from './Auth/Auth';
import LoginPage from './Login/LoginPage';
import SignUpPage from './SignUp/SignUpPage';

const routes = {
  component: Base,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, App);
        } else {
          callback(null, LoginPage);
        }
      }
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the corrent URL to /
        replace('/');
      }
    }
  ]
}

export default routes;