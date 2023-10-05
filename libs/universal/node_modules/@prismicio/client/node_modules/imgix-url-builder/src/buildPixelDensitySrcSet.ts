import type { ImgixURLParams } from "./types.generated";
import { buildURL } from "./buildURL";

/**
 * Parameters for `buildPixelDensitySrcSet`.
 */
export type BuildPixelDensitySrcSetParams = Omit<ImgixURLParams, "dpr"> & {
	/**
	 * The pixel densities to include in the resulting `srcset` value.
	 *
	 * @example
	 *
	 * ```ts
	 * [1, 2, 3];
	 * ```
	 */
	pixelDensities: number[];
};

/**
 * Builds an `<img>` `srcset` attribute value for a given set of pixel
 * densities. It can also optinally apply Imgix URL API parameters to the URLs.
 *
 * The `dpr` URL parameter will be applied for each `srcset` entry. If a `dpr`
 * parameter is provided to the `params` parameter, it will be ignored.
 *
 * @example
 *
 * ```ts
 * const srcset = buildPixelDensitySrcSet(
 * 	"https://example.imgix.net/image.png",
 * 	{ pixelDensities: [1, 2, 3] },
 * );
 * // => https://example.imgix.net/image.png?dpr=1 1x,
 * //    https://example.imgix.net/image.png?dpr=2 2x,
 * //    https://example.imgix.net/image.png?dpr=3 3x
 * ```
 *
 * @example
 *
 * ```ts
 * const srcset = buildPixelDensitySrcSet(
 * 	"https://example.imgix.net/image.png",
 * 	{
 * 		pixelDensities: [1, 2, 3],
 * 		sat: -100,
 * 	},
 * );
 * // => https://example.imgix.net/image.png?dpr=1&sat=-100 1x,
 * //    https://example.imgix.net/image.png?dpr=2&sat=-100 2x,
 * //    https://example.imgix.net/image.png?dpr=3&sat=-100 3x
 * ```
 *
 * @param url - Full absolute URL to the Imgix image.
 * @param params - An object of Imgix URL API parameters. The `pixelDensities`
 *   parameter defines the resulting `srcset` widths.
 *
 * @returns A `srcset` attribute value for `url` with the given Imgix URL API
 *   parameters applied.
 */
export const buildPixelDensitySrcSet = (
	url: string,
	{ pixelDensities, ...params }: BuildPixelDensitySrcSetParams,
): string => {
	return pixelDensities
		.map((dpr) => {
			return `${buildURL(url, { ...params, dpr })} ${dpr}x`;
		})
		.join(", ");
};
