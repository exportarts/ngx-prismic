import { createHash } from "crypto";

/**
 * Signs an Imgix image URL by appending a signature to the URL parameters. This
 * locks the URL and its parameters to the signature to prevent URL tampering.
 *
 * **Important**: This function should only be used in a trusted environment and
 * never in a browser. The `secureURLToken` parameter is a secret and should not
 * be exposed to the public.
 *
 * @example
 *
 * ```ts
 * const url = signURL(
 * 	"https://example.imgix.net/image.png?width=400",
 * 	"example-token",
 * );
 * // => https://example.imgix.net/image.png?width=400&s=def3e221c3f4c4debda091b8e49420ea
 * ```
 *
 * @param url - Full absolute URL to the Imgix image to sign.
 * @param secureURLToken - The secret Imgix secure URL token used to generate
 *   the signature.
 *
 * @returns `url` with a signature appended via an `s` URL parameter.
 *
 * @see Details on securing Imgix images: https://docs.imgix.com/setup/securing-images
 */
export const signURL = (url: string, secureURLToken: string): string => {
	const instance = new URL(url);

	// If an `s` param is passed explicitly, it will be overridden. It must
	// also not be used when generating the signature.
	instance.searchParams.delete("s");

	// @see https://github.com/imgix/imgix-blueprint#securing-urls
	const signature = createHash("md5")
		.update(secureURLToken + instance.pathname + instance.search)
		.digest("hex");

	instance.searchParams.append("s", signature);

	return instance.toString();
};
