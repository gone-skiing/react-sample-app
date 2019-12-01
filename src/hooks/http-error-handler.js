import {useEffect, useState} from 'react';

export default httpClient => {
  const [error, setError] = useState(null);

  // Register interceptors before child components to make sure errors are handled.
  const requestInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
    return req;
  });

  const responseInterceptor = httpClient.interceptors.response.use(
    response => response,
    e => {
      setError(e);
    },
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(requestInterceptor);
      httpClient.interceptors.response.eject(responseInterceptor);
    };
  }, [
    httpClient.interceptors.request,
    httpClient.interceptors.response,
    requestInterceptor,
    responseInterceptor,
  ]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
