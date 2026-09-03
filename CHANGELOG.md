# Changelog
 All notable changes to this project will be documented in this file.
 The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [5.0.0] - 2026-09-03
### Changed
- 🔥 Breaking change: the extension now requires PWA 7.32.0 or newer. It uses the theme provided by `@shopgate/engage/styles` (colors, typography, spacing) instead of the static `themeConfig`, so it follows the theme configuration of the shop, including the dark color scheme.
- 🔥 Breaking change: the product slider is now the `ProductSlider` from `@shopgate/engage/product/components`. The number of visible slides comes from the app settings (theme configuration) instead of the widget setting `@shopgate/engage/product/ProductSlider`.
- 🔥 Breaking change: products are rendered with the `ProductCard` provided by the theme. The extension no longer wraps them into its own card, so card colors, borders, radius and shadows follow the theme configuration.
- The `nameLines` configuration is optional now. When it is not set, the number of product name lines configured in the app settings is used.
- The placeholder cards shown while products are loading use theme colors.
- Support for the discontinued GMD theme was removed.
- Updated the development dependencies to PWA 7.32 (eslint 8, jest 29, react 17); the unit tests use the shared `@shopgate/pwa-unit-test` setup.

## [4.1.0] - 2025-03-10
### Added
- improved accessibility for screen readers

## [4.0.0]
### Added
- add ProductListProvider to Slider (only compatible from PWA Version 6.21.0)

## [3.4.1]
### Fixed
- fixed a bug where products from properties weren't fetched

## [3.4.0]
### Changed
- added configuration `hideRatingStars` to toggle rating stars

## [3.3.0]
### Changed
- changed `ProductCard` component from hiding rating to not hiding rating

## [3.2.0]
### Changed
- Extend upselling extension to show more than one slider

## [3.1.4]
### Added
- add `upselling` class to the tablet-adjustments

## [3.1.3]
### Added
- `headline` classname

## [3.1.0]
### Changed
- Added new portal position product.properties.after.

## [3.0.1]
### Changed
- static theme slides per view configuration for default slider
- Changed extension to use ProductCard from engage library.

## [2.1.0] - 2019-09-12
### Added
- New portal position on Product Detail Page

## [2.0.1]
### Changed
- CSS fixes: no left/right padding inside the slider + no background  color + correct headline left margin.

## [2.0.0]
### Added
- Sliders item placeholders which were removed accidentally with 1.2.0.
- 🔥 Breaking change: support for PWA6.x. Extension required PWA 6.1.0 at minimum.

## [1.2.0]
### Added
- Logic to handle unavailable related products.

## [1.1.0] - 2018-10-23
First version of the extension.
### Added
- Upselling slider which is shown on the Product Detail Page within the configured portal position. Slider shows image (always), name (optional) and price (optional).
- Upselling product list shown within a Sheet/Drawer which opens on `AddToCartSuccess` action.
- It's possible to configure how many lines of item name is visible in the Product Card.

## 0.0.1 - 2018-10-02
### Added
Initial commmit.

[5.0.0]: https://github.com/shopgate/ext-upselling/compare/v4.1.0...v5.0.0
[4.1.0]: https://github.com/shopgate/ext-upselling/compare/v4.0.0...v4.1.0
[4.0.0]: https://github.com/shopgate/ext-upselling/compare/v3.4.1...v4.0.0
[3.0.1]: https://github.com/shopgate/ext-upselling/compare/v2.1.0...v3.0.1
[2.1.0]: https://github.com/shopgate/ext-upselling/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/shopgate/ext-upselling/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/shopgate/ext-upselling/compare/v1.2.0...v2.0.0
[1.2.0]: https://github.com/shopgate/ext-upselling/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/shopgate/ext-upselling/compare/v0.0.1...v1.1.0
