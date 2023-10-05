import type { BuildPixelDensitySrcSetParams } from "./buildPixelDensitySrcSet";
import type { BuildWidthSrcSetParams } from "./buildWidthSrcSet";
import type { ImgixURLParams } from "./types.generated";
import { buildPixelDensitySrcSet } from "./buildPixelDensitySrcSet";
import { buildURL } from "./buildURL";
import { buildWidthSrcSet } from "./buildWidthSrcSet";

/**
 * Options to instantiate a new client.
 */
export type ClientOptions = {
	/**
	 * The base URL used to construct image URLs from a path. The base URL must
	 * include the protocol, domain, and optionally a path.
	 *
	 * @example `https://example.imgix.net`
	 *
	 * @example `https://example.imgix.net/folder`
	 */
	baseURL: string;
};

/**
 * An Imgix Rendering API client. A client is paired to a single Imgix domain.
 */
export class Client {
	baseURL: string;

	/**
	 * Creates a new `Client` instance for an Imgix domain.
	 *
	 * @param options - Options to instantiate a new client.
	 *
	 * @returns A `Client` instance for the given Imgix domain.
	 */
	constructor(options: ClientOptions) {
		this.baseURL = options.baseURL;
	}

	/**
	 * Builds a URL to an Imgix image with Imgix URL API parameters for the
	 * client's base URL.
	 *
	 * @example
	 *
	 * ```ts
	 * const client = new Client({ baseURL: "https://example.imgix.net" });
	 * const url = client.buildURLForPath("/image.png", { width: 400 });
	 * // => https://example.imgix.net/image.png?width=400
	 * ```
	 *
	 * @example
	 *
	 * ```ts
	 * const client = new Client({
	 * 	baseURL: "https://example.imgix.net/folder",
	 * });
	 * const url = client.buildURLForPath("./image.png", { width: 400 });
	 * // => https://example.imgix.net/folder/image.png?width=400
	 * ```
	 *
	 * @param path - Path to the image relative to the client's base URL.
	 * @param params - An object of Imgix URL API parameters.
	 *
	 * @returns The full absolute URL to the image with the given Imgix URL API
	 *   parameters applied.
	 */
	buildURLForPath(path: string, params: ImgixURLParams = {}) {
		return buildURL(`${new URL(path, this.baseURL)}`, params);
	}

	/**
	 * Builds an `<img>` `srcset` attribute value for a given set of widths for
	 * the client's base URL. It can also optinally apply Imgix URL API parameters
	 * to the URLs.
	 *
	 * The `width` URL parameter will be applied for each `srcset` entry. If a
	 * `width` or `w` parameter is provided to the `params` parameter, it will be
	 * ignored.
	 *
	 * @example
	 *
	 * ```ts
	 * const client = new Client({ baseURL: "https://example.imgix.net" });
	 * const srcset = client.buildWidthSrcSetForPath("/image.png", {
	 * 	widths: [400, 800, 1600],
	 * });
	 * // => https://example.imgix.net/image.png?width=400 400w,
	 * //    https://example.imgix.net/image.png?width=800 800w,
	 * //    https://example.imgix.net/image.png?width=1600 1600w
	 * ```
	 *
	 * @example
	 *
	 * ```ts
	 * const client = new Client({
	 * 	baseURL: "https://example.imgix.net",
	 * });
	 * const srcset = client.buildWidthSrcSetForPath("/image.png", {
	 * 	widths: [400, 800, 1600],
	 * 	sat: -100,
	 * });
	 * // => https://example.imgix.net/image.png?width=400&sat=-100 400w,
	 * //    https://example.imgix.net/image.png?width=800&sat=-100 800w,
	 * //    https://example.imgix.net/image.png?width=1600&sat=-100 1600w
	 * ```
	 *
	 * @param path - Path to the image relative to the client's base URL.
	 * @param params - An object of Imgix URL API parameters. The `widths`
	 *   parameter defines the resulting `srcset` widths.
	 *
	 * @returns A `srcset` attribute value for `url` with the given Imgix URL API
	 *   parameters applied.
	 */
	buildWidthSrcSetForPath(path: string, params: BuildWidthSrcSetParams) {
		return buildWidthSrcSet(`${new URL(path, this.baseURL)}`, params);
	}

	/**
	 * Builds an `<img>` `srcset` attribute value for a given set of pixel
	 * densities for the client's base URL. It can also optinally apply Imgix URL
	 * API parameters to the URLs.
	 *
	 * The `dpr` URL parameter will be applied for each `srcset` entry. If a `dpr`
	 * parameter is provided to the `params` parameter, it will be ignored.
	 *
	 * @example
	 *
	 * ```ts
	 * const client = new Client({ baseURL: "https://example.imgix.net" });
	 * const srcset = client.buildPixelDensitySrcSetForPath("/image.png", {
	 * 	pixelDensities: [1, 2, 3],
	 * });
	 * // => https://example.imgix.net/image.png?dpr=1 1x,
	 * //    https://example.imgix.net/image.png?dpr=2 2x,
	 * //    https://example.imgix.net/image.png?dpr=3 3x
	 * ```
	 *
	 * @example
	 *
	 * ```ts
	 * const client = new Client({ baseURL: "https://example.imgix.net" });
	 * const srcset = client.buildPixelDensitySrcSetForPath("/image.png", {
	 * 	pixelDensities: [1, 2, 3],
	 * 	sat: -100,
	 * });
	 * // => https://example.imgix.net/image.png?dpr=1&sat=-100 1x,
	 * //    https://example.imgix.net/image.png?dpr=2&sat=-100 2x,
	 * //    https://example.imgix.net/image.png?dpr=3&sat=-100 3x
	 * ```
	 *
	 * @param path - Path to the image relative to the client's base URL.
	 * @param params - An object of Imgix URL API parameters. The `pixelDensities`
	 *   parameter defines the resulting `srcset` widths.
	 *
	 * @returns A `srcset` attribute value for `url` with the given Imgix URL API
	 *   parameters applied.
	 */
	buildPixelDensitySrcSetForPath(
		path: string,
		params: BuildPixelDensitySrcSetParams,
	) {
		return buildPixelDensitySrcSet(`${new URL(path, this.baseURL)}`, params);
	}
}
