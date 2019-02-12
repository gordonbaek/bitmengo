const dev = {
  apiUrl: 'http://49.247.206.70:3000/api/v0',
};

const prod = {
  apiUrl: 'http://49.247.206.70:3000/api/v0',
};

const config = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev;

export default {
  // Add common config values here
  ...config
};