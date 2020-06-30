/**
 * Represents a slice which you can define in the "Slice Zone"
 * on your custom types.
 * 
 * This interface takes three generic parameters which make it
 * possible to use your own content model.
 * 
 * @param T Type - this slice's name
 * @param I Items - an interface representing the "Repeatable Zone"
 * @param P Primary - an interface representing your "Non-repeatable Zone"
 * 
 * Read more about using this interface in `docs/slices.md`.
 */
export interface Slice<T, I, P> {
  slice_type: T;
  slice_label: any;
  items: I[];
  primary: P;
}
