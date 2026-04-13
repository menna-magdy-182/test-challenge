// What to do when a 401 is received (e.g. logout, redirect to login).
// Set by AuthContext once on mount.
let onUnauthorizedHandler: (() => Promise<void> | void) | null = null;

// Prevents the handler from running more than once if multiple requests fail with 401 simultaneously.
let isHandlingUnauthorized = false;

/**
 * Bridges the API layer and the auth layer.
 * The API client can't access React context directly, so it calls notifyUnauthorized()
 * here, and AuthContext registers the actual logout/redirect logic via setOnUnauthorized.
 */
export const authSessionEvents = {
  // Register (or clear) the 401 handler.
  setOnUnauthorized(handler: (() => Promise<void> | void) | null) {
    onUnauthorizedHandler = handler;
  },

  // Triggered by the API client on a 401. Runs the handler once, even if multiple requests fail.
  async notifyUnauthorized() {
    if (isHandlingUnauthorized) {
      return;
    }

    isHandlingUnauthorized = true;

    try {
      await onUnauthorizedHandler?.();
    } finally {
      isHandlingUnauthorized = false;
    }
  },
};
