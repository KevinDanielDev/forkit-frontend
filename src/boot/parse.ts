import Parse from 'parse';
import { boot } from 'quasar/wrappers';

export default boot(() => {
  Parse.initialize(import.meta.env.VITE_PARSE_APP_ID, import.meta.env.VITE_PARSE_JAVASCRIPT_KEY);
  Parse.serverURL = import.meta.env.VITE_PARSE_SERVER_URL;
});
