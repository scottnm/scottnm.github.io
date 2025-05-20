# www.scottnm.com

The source for my personal site, [http://www.scottnm.com](http://www.scottnm.com).

For simplicity's sake, the whole site is implemented with just HTML, CSS, and vanilla ES6 JS.

![W3C Validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fscottnm.com) [\[Validation Details\]](https://validator.w3.org/nu/?doc=https%3A%2F%2Fscottnm.com%2F)

## Layout

source:
* `sitegen/`: where the site and all of its subpages are authored
* `files/`: assets for projects and pages
* `scripts/`: JS scripts for the main page and all subpages
* `site_images/`: assets for the main site layout

site:
* `pages/`: the generated subpages built from `sitegen/`
* `index.html`: the generated home page built from `sitegen/`
* `styles.css`: stylesheet shared across all pages