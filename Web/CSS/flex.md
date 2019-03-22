# flex 布局摘要

[a-guide-to-flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
flex 布局常用属性

## flex container

```css
.container {
  display: flex;
  flex-direction: row | rowreverse | coloum | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;
  // flex-flow: <‘flex-direction’> || <‘flex-wrap’>
  justify-content: flex-start | flex-end | center | space-between | space-around
    | space-evenly;
  align-items: flex-start | flex-end | center | stretch | baseline;
  align-content: flex-start | flex-end | center | stretch | space-between |
    space-around;
}
```

## flex items

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
  flex-grow: <number>; /* default 0 */
  flex-shrink: <number>; /* default 1 */
  flex-basis: <length> | auto; /* default auto */
  // flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

## 注意

1. `float`, `clear` 和 `vertical-align` 对 flex items 无效。
