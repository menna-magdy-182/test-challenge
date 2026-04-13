let onUnauthorizedHandler: (() => Promise<void> | void) | null = null;

export const authSessionEvents = {
  setOnUnauthorized(handler: (() => Promise<void> | void) | null) {
    onUnauthorizedHandler = handler;
  },

  async notifyUnauthorized() {
    await onUnauthorizedHandler?.();
  },
};
