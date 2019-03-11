# Slices

Prismic gives users the ability to create dynamic regions inside of
their custom types, called slices.

Each slice consists of static (`Non-repeatable Zone`) and repeatable
content (`Repeatable Zone`).

You can read more about slices here:
https://intercom.help/prismicio/content-modeling-and-custom-types/field-reference/slices

## `Slice`-interface

This library contains the `Slice<T, I, P>` interface which you can use to
interact with the slices in your custom types. Read further to learn how
to use this interface.

The examples will try to illustrate a custom type `Menu` in which the user
can use slices to define different meal categories (e.g. Fish, Vegetarian, ...)
with each category containing a list of meals.

### `T` - Slice Type

The first argument is simply the API-name of this slice.

**Example**

```ts
'menu_section'
```

### `I` - Items

This argument specifies the type of the `Repeatable Zone`. Since this section
contains repeatable items, it will always return an `Array` of items.

Suppose the user can create a list of meals for a restaurant's menu.

**Example**

```ts
export interface Meal {
    name: string;
    price: number;
}
```

### `P` - Primary

This argument represents the `Non-repeatable Zone` and is simply an interface
similar to the one in the `I`-part.

Suppose a simple slice in a blog post containing a rich text section.

**Example**

```ts
export interface MenuSection {
    name: string;
    description: string;
}
```

## Usage

To use this interface, it is recommended to create a type alias for
each slice you have in your project.

**Example**

```ts
import { Meal } from './meal.ts';
import { MenuSection } from './menu-section.ts';

export type MenuSlice = Slice<'menu_section', Meal, MenuSection>;

const slice: MenuSlice = {
  slice_type: 'menu_section',
  slice_label: 'some label ...',
  items: [
    {
      name: 'Pizza Funghi',
      price: 7.5
    },
    {
      name: 'Pizza Tonno',
      price: 8
    }
  ],
  primary: {
    name: 'Pizza',
    description: 'Delicious home-made pizza.'
  }
};
```
