import { jwtDecode } from "jwt-decode";

// const token = "eyJ0eXAiO.../// jwt token";
// const decoded = jwtDecode(token);

// console.log(decoded);


class AuthService {
  getProfile() {
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  hasUser() {
    return jwtDecode(this.getToken()).data?.userId ? true : false;
  }

  hasCompany() {
    return jwtDecode(this.getToken()).data?.companyId ? true : false;
  }

  isTokenExpired(token) {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/account');
  }

  logout() {
    localStorage.removeItem('id_token');
  }
}

export default new AuthService();