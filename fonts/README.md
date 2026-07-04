This folder is reserved for self-hosted font files.

The site currently loads **Poppins** (display) and **Inter** (body) from
Google Fonts via a `<link>` tag with `preconnect`/`preload` hints in each
page's `<head>` — no files are needed here for that to work.

If you'd rather self-host fonts (removes the Google Fonts network request
entirely, which can shave a few tens of milliseconds off first paint):

1. Download the `.woff2` files for Poppins (500/600/700) and Inter
   (400/500/600/700) from [Google Fonts](https://fonts.google.com).
2. Place them in this folder.
3. Replace the Google Fonts `<link>` tags in every HTML file with local
   `@font-face` rules in `css/input.css`, pointing at `../fonts/*.woff2`.
