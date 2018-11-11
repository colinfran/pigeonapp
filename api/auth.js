import { AsyncStorage } from 'react-native'

import TokenService from '@around25/jwt-utils'
const Token = new TokenService({
  storageSystem: AsyncStorage
});

const login = (credentials) => {
  // Make API call to retrieve an access token
  let r = Math.random().toString(36).substring(7);
  const tok = r;

  return Token.store(tok);
}

const isLoggedIn = async () => {
  const tok = await Token.get();
  return !!tok
}

const logout = () => {
  return Token.remove();
}

export {
  login,
  isLoggedIn,
  logout
}
