import { cookie } from '@prismicio/client';

/**
 * Use this as the `ref` when constructing your client.
 */
export const prismicPreviewRef = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookie.preview}`))
    ?.split('=')[1];
