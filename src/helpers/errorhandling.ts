import { AxiosError } from 'axios';

const getFriendlyErrorOrFallback = (error: unknown) =>
  error instanceof AxiosError && error.response?.data.friendlyMessage
    ? error.response.data.friendlyMessage
    : 'An error occurred. Please check your internet connection and try again.';

export default getFriendlyErrorOrFallback;
