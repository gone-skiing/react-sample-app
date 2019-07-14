import React, { useEffect, useState } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

function WithErrorHandler(WrappedComponent, axios) {
  return function RenderWrappedComponent(props) {
    const [error, setError] = useState(null);

    // Register interceptors before child components to make sure errors are handled.
    const requestInterceptor = axios.interceptors.request.use(req => {
      setError(null);
      return req;
    });

    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      e => {
        setError(e);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      };
    }, [requestInterceptor, responseInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Aux>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
}

export default WithErrorHandler;
