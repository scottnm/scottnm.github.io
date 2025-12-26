# www.scottnm.com

The source for my personal site, [http://www.scottnm.com](http://www.scottnm.com).

* just statically generated HTML and CSS (mostly)
    * javascript usage is limited to only a handful of pages that need it.
* prioritize web-safe fonts
* try to make all site images AVIFs or SVGs for small sizes

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