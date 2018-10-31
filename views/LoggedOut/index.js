import { createStackNavigator } from 'react-navigation'

import SignupLogin from '../../components/SignupLogin'
import Signup from '../../components/Signup'

const LoggedOutNavigator = createStackNavigator({
  Login: {
    screen: SignupLogin
  },
  Signup: {
    screen: Signup
  },
});

export default LoggedOutNavigator
