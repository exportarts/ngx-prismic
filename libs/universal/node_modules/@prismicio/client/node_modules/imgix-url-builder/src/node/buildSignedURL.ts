import type { ImgixURLParams } from "../types.generated";
import { buildURL } from "../buildURL";
import { signURL } from "./signURL";

/**
 * Builds a URL to an Imgix image with Imgix URL API parameters. The URL is
 * signed by appending a signature to the URL parameters. This locks the URL and
 * its parameters to the signature to prevent URL tampering.
 *
 * The given URL must be a full absolute URL containing the protocol and domain.
 *
 * URL parameters already applied to the image will be retained. To remove
 * existing parameters, set the parameter to `undefined` in the `params`
 * argument.
 *
 * **Important**: This function should only be used in a trusted environment and
 * never in a browser. The `secureURLToken` parameter is a secret and should not
 * be exposed to the public.
 *
 * @example
 *
 * ```ts
 * const url = buildSignedURL(
 * 	"https://example.imgix.net/image.png",
 * 	"example-token",
 * 	{ width: 400 },
 * );
 * // => https://example.imgix.net/image.png?width=400&s=def3e221c3f4c4debda091b8e49420ea
 * ```
 *
 * @example
 *
 * ```ts
 * const url = buildSignedURL(
 * 	"https://example.imgix.net/image.png?width=400",
 * 	"example-token",
 * 	{ height: 300 },
 * );
 * // => https://example.imgix.net/image.png?width=400&height=300&s=f12c7c39333410c10c2930b57116a943
 * ```
 *
 * @param url - Full absolute URL to the Imgix image.
 * @param secureURLToken - The secret secure URL token for the image's Imgix
 *   source.
 * @param params - An object of Imgix URL API parameters.
 *
 * @returns `url` with the given Imgix URL API parameters applied.
 *
 * @see Imgix URL API reference: https://docs.imgix.com/apis/rendering
 * @see Details on securing Imgix images: https://docs.imgix.com/setup/securing-images
 */
export const buildSignedURL = (
	url: string,
	secureURLToken: string,
	params: ImgixURLParams,
): string => {
	return signURL(buildURL(url, params), secureURLToken);
};
