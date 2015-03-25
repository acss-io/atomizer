# Atomic classes

Atomic classes ultimately increase the speed of development as they follow a consistent and easy to remember syntax. The inspiration comes from [Emmet](http://emmet.io/), a plugin for many popular text editors which greatly improves HTML & CSS workflow.

It might take you a short time to get familiar with these class names but as soon as you start using them you'll be at full speed in no time.

<div class="noteBox info">The [reference page](/reference) lets you quickly search for properties, values, or class names.</div>

You use a config object to create the styles you need but you can also *rely on the tool to create many of these styles for you* (to some extend).

## Simple classes

These classes are the ones Atomizer can make sense of without the need to check the config object; classes like `W-20px` (`width:20px`), `Lh-1.5` (`line-height:1.5`), etc.

## Custom classes

The value identifier of these classes is mapped to a custom value set in the config object. For example, the following:

```javascript
'font-size': {
    custom: [
        {suffix: 'verylarge', values: ['3em']}
    ]
},
'padding': {
    'custom': [
        {suffix: 'gutter', values: ['10px']}
    ]
}
```

creates 2 classes:

<ul class="ul-list">
    <li>`Fz-verylarge` (`font-size:3em`)</li>
    <li>`P-gutter` (`padding:10px`)</li>
</ul>

## Aliases

Atomic CSS uses aliases whenever they make more sense than the class the regular [Atomic syntax](syntax.html) creates. For example, most `transform` properties have aliases:

<table class="Ta-start W-100%">
    <caption class="hidden">Aliases for Atomic classes</caption>
    <thead>
        <tr>
            <th scope="col" class="P-10px">Atomic classes</th>
            <th scope="col" class="P-10px">Styles</th>
            <th scope="col" class="P-10px">Aliases</th>
        </tr>
    </thead>
    <tbody>
        <tr class="Bdt-1">
            <th scope="row" class="Va-t Whs-nw P-10px">`Trfr-90deg`</th>
            <td class="Va-t P-10px">`transform:rotate(90°)`</td>
            <td class="Va-t P-10px">`Rot-90deg`</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Va-t Whs-nw P-10px">`Trfsc-1,2`</th>
            <td class="Va-t P-10px">`transform:scale(1,2)`</td>
            <td class="Va-t P-10px">`Scale-1,2`</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Va-t Whs-nw P-10px">`Trfscx-2`</th>
            <td class="Va-t P-10px">`transform:scaleX(2)`</td>
            <td class="Va-t P-10px">`Scalex-2`</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Va-t Whs-nw P-10px">`Trfscy-2`</th>
            <td class="Va-t P-10px">`transform:scaleY(2)`</td>
            <td class="Va-t P-10px">`Scaley-2`</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Va-t Whs-nw P-10px">`Trfskx-20deg`</th>
            <td class="Va-t P-10px">`transform:skewX(20°)`</td>
            <td class="Va-t P-10px">`Skewx-20deg`</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Va-t Whs-nw P-10px">`Trfsky-20deg`</th>
            <td class="Va-t P-10px">`transform:skewY(20°)`</td>
            <td class="Va-t P-10px">`Skewy-20deg`</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Va-t Whs-nw P-10px">`Trft-10px,20px`</th>
            <td class="Va-t P-10px">`transform:translate(10px,20px)`</td>
            <td class="Va-t P-10px">`Trans-10px,20px`</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Va-t Whs-nw P-10px">`Trftx-10px`</th>
            <td class="Va-t P-10px">`transform:translateX(10px)`</td>
            <td class="Va-t P-10px">`Transx-10px`</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Va-t Whs-nw P-10px">`Trfty-10px`</th>
            <td class="Va-t P-10px">`transform:translateY(10px)`</td>
            <td class="Va-t P-10px">`Transy-10px`</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Va-t Whs-nw P-10px">`Trfo-50%`</th>
            <td class="Va-t P-10px">`transform-origin:50%`</td>
            <td class="Va-t P-10px">No alias</td>
        </tr>
        <tr class="Bdt-1">
            <th scope="row" class="Va-t Whs-nw P-10px">`Trfs-p3`</th>
            <td class="Va-t P-10px">`transform-style:preserve-3d(2)`</td>
            <td class="Va-t P-10px">No alias</td>
        </tr>
    </tbody>
</table>

## Variables

You can use custom value identifiers to be used as variables across different styles. You set such classes via the config object, for example:

```javascript
custom: {
    "headerHeight": "20px"
}
```

Then you could use this value identifier like this:

```javascript
<body class="Pt-headerHeight">
    <header class="Mih-headerHeight Bgc-primary">...</header>
```

This way, even if the value of `headerHeight` changes, the padding of body will allways be in sync with the height of the header.

Variables are also an easy way to abstract colors to create themes:

```javascript
custom: {
    "primaryColor": "blue",
    "secondaryColor": "orange",
    "tertiaryColor": "tomato"
}
```

## Advanced classes

These classes are mostly contextual; they take into consideration ancestor nodes or media query breakpoints.

### Descendant selectors

You can style a node according to its relationship with a parent or ancestor, for example:

The class `myList_Td-u` on links inside an element to which the class `myList` is applied to will be underline.

The class `myList>V-h` on list items that are direct children of the `myList` will be invisible.

<p class="noteBox info"><strong>Practical example</strong>: we use the class `home-page_D-b!` to style `#main` differently on the home page.</p>

#### pseudo-classes on ancestors

You can use pseudo-classes with classes relying on contextual selectors, for example `myList:h>V-h` will hide the direct children of `.myList` only when users hover over the said list.

### Breakpoints

You use the config object to create breakpoints then you can add a modifier to your classes so its styling comes into play only within the breakpoint it relates to.

```javascript
'padding': {
    'custom': [
        {suffix: '10', values: ['10px'], breakPoints: ['sm']},
        {suffix: '20', values: ['20px'], breakPoints: ['lg']}
    ]
}
```

The above creates 2 classes: `P-10--sm` and `P-20--lg`. The former will be applied inside the small (`--sm`) breakpoint, the latter inside the large (`--lg`) breakpoint.

<p class="noteBox info">You can choose any name you want for the breakpoints you create via the config object.</p>
