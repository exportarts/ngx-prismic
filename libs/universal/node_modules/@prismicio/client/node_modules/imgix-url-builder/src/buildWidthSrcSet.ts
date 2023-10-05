import type { ImgixURLParams } from "./types.generated";
import { buildURL } from "./buildURL";

/**
 * Parameters for `buildWidthSrcSet`.
 */
export type BuildWidthSrcSetParams = Omit<ImgixURLParams, "width" | "w"> & {
	/**
	 * The pixel widths to include in the resulting `srcset` value.
	 *
	 * @example
	 *
	 * ```ts
	 * [400, 800, 1600];
	 * ```
	 */
	widths: number[];
};

/**
 * Builds an `<img>` `srcset` attribute value for a given set of widths. It can
 * also optinally apply Imgix URL API parameters to the URLs.
 *
 * The `width` URL parameter will be applied for each `srcset` entry. If a
 * `width` or `w` parameter is provided to the `params` parameter, it will be
 * ignored.
 *
 * @example
 *
 * ```ts
 * const srcset = buildWidthSrcSet("https://example.imgix.net/image.png", {
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
 * const srcset = buildWidthSrcSet("https://example.imgix.net/image.png", {
 * 	widths: [400, 800, 1600],
 * 	sat: -100,
 * });
 * // => https://example.imgix.net/image.png?width=400&sat=-100 400w,
 * //    https://example.imgix.net/image.png?width=800&sat=-100 800w,
 * //    https://example.imgix.net/image.png?width=1600&sat=-100 1600w
 * ```
 *
 * @param url - Full absolute URL to the Imgix image.
 * @param params - An object of Imgix URL API parameters. The `widths` parameter
 *   defines the resulting `srcset` widths.
 *
 * @returns A `srcset` attribute value for `url` with the given Imgix URL API
 *   parameters applied.
 */
export const buildWidthSrcSet = (
	url: string,
	{ widths, ...params }: BuildWidthSrcSetParams,
): string => {
	return widths
		.map((width) => {
			return `${buildURL(url, { ...params, w: undefined, width })} ${width}w`;
		})
		.join(", ");
};
