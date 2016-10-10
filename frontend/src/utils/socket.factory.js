import config from '../config';

export default socketFactory => {
  const messagesSocket = io.connect(config.backendEndpoint); // eslint-disable-line no-undef

  return socketFactory({
    ioSocket: messagesSocket
  });
};
