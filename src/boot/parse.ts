import Parse from 'parse';
import { boot } from 'quasar/wrappers';

/**
 * Parse SDK initialization and configuration.
 *
 * Initializes the Parse JavaScript SDK with credentials from environment variables
 * to establish connection with the Parse Server for backend data operations.
 *
 * **Environment Variables Required**
 * - `VITE_PARSE_APP_ID` — Parse Application ID (unique identifier for the app)
 * - `VITE_PARSE_JAVASCRIPT_KEY` — Parse JavaScript key (client-side authorization)
 * - `VITE_PARSE_SERVER_URL` — Parse Server URL (e.g., https://parse.example.com/parse)
 *
 * **What Happens During Initialization**
 * 1. Parse.initialize() configures the SDK with App ID and JavaScript Key
 * 2. Parse.serverURL sets the backend Parse Server location
 * 3. All subsequent Parse operations (queries, mutations, auth) use this configuration
 *
 * **Usage**
 * After boot, all services can use Parse:
 * ```typescript
 * import { createOrder, getOrders, deleteOrder } from 'src/infrastructure/parse/order';
 * import { signIn, signUp, logout } from 'src/infrastructure/parse/auth';
 * ```
 *
 * **Security Notes**
 * - JavaScript Key is public-side code, not a security risk
 * - Parse Server enforces security through Class-Level Permissions (CLPs) and ACLs
 * - All data access is validated server-side
 * - Users must authenticate before accessing protected data
 *
 * **Required Configuration**
 * Create `.env` file with:
 * ```
 * VITE_PARSE_APP_ID=your_app_id_here
 * VITE_PARSE_JAVASCRIPT_KEY=your_js_key_here
 * VITE_PARSE_SERVER_URL=https://your-parse-server.com/parse
 * ```
 *
 * @example
 * // This boot file runs automatically on app startup
 * // No manual initialization needed in components
 *
 * // Once initialized, use Parse in services:
 * import Parse from 'parse';
 * const user = Parse.User.current(); // Get current authenticated user
 *
 * @see https://docs.parseplatform.org/js/guide/
 */
export default boot(() => {
  // Initialize Parse SDK with App ID and JavaScript Key from environment
  Parse.initialize(import.meta.env.VITE_PARSE_APP_ID, import.meta.env.VITE_PARSE_JAVASCRIPT_KEY);

  // Configure Parse Server URL for backend connection
  Parse.serverURL = import.meta.env.VITE_PARSE_SERVER_URL;
});
