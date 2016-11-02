# Page Content Navigation

Add scrolling navigation to page content. Requires jQuery 1.7+.

Tested support: Chrome, Firefox, Safari.

## Setup

Include jQuery (1.7+) and the Page Content Navigation plugin files.

```html
<!-- Page Content Navigation Stylesheet -->
<link rel="stylesheet" href="page-content-navigation/page-content-navigation.css">

<!-- Page Content Navigation jQuery Plugin -->
<script src="page-content-navigation/page-content-navigation.js"></script>
```

Call the plugin on elements to which you want to add scrolling navigation.

```javascript
// simple
$( '.navigable' ).contentNavigation();

// custom settings
$( '.navigable' ).contentNavigation({
  includeTopNav: false,
  offsetIndicator: '-33%'
});
```

## Settings

Setting | Type | Default | Description
--- | --- | --- | ---
includeTopNav | boolean | false | Include an extra navigation button to scroll users to the top of the page.
offsetIndicator | integer or string | 0 | A number of pixels (integer value) or percentage of the window height (string value) above (negative value) or below (positive value)* the actual top of a navigation element when the navigation button switches to its "on state."

\*Note: using a positive offsetIndicator value will result in strange behavior where clicking a navigation button scrolls the user to the top of an element but does not switch the button to its "on state," due to this offset. Typically, this is not desirable.