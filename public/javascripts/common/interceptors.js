const TOKEN = 'token';

axios.interceptors.request.use(request => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
  return request;
});

axios.interceptors.response.use(
  response => {
    if (response.data.token) {
      window.localStorage.setItem(TOKEN, response.data.token);
    }
    return response;
  },
  error => {
    const errRes = error.response;
    if (errRes.status === 401) {
      logout();
      location = '/login';
    } else if (errRes.status === 403) {
      logout();
      location = '/';
    }
    return Promise.reject(error.message);
  });

function logout() {
  window.localStorage.removeItem(TOKEN);
  window.sessionStorage.removeItem('user');
  $navbar.auth = 0;
  $navbar.isLogin = false;
}
