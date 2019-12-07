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
      window.localStorage.removeItem(TOKEN);
      // swal('Auth Error!', `${errRes.data.error.message}, please login!`, 'error')
      //   .then(() => {
      //     history.push('/login');
      //   });
      location = '/login';
    } else if (errRes.status === 403) {
      window.localStorage.removeItem(TOKEN);
      location = '/login';
    }
    return Promise.reject(error.message);
  });
