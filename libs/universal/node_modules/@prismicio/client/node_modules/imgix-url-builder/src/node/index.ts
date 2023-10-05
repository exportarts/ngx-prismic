// Re-exports of the root entry.
export { buildURL } from "../buildURL";

// Node.js-specific exports
//
// These exports contain code that should only be run in a Node.js environment.
// They may contain Node.js-specific code or should not be run in a
// client-facing environment.

export { SecureClient } from "./SecureClient";
export type { SecureClientOptions } from "./SecureClient";

export { buildSignedURL } from "./buildSignedURL";

export { buildSignedWidthSrcSet } from "./buildSignedWidthSrcSet";

export { buildSignedPixelDensitySrcSet } from "./buildSignedPixelDensitySrcSet";

export { signURL } from "./signURL";
