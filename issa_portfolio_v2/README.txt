ISSA TSUJI PORTFOLIO
====================

Files
-----
index.html  - page structure
style.css   - design / responsive layout / hover effects
script.js   - works data / carousel / reveal animation / socials

GitHub Pages setup
------------------
1. Upload all three files to the repository root.
2. Create these folders:
   images/filmed/
   images/music-video/
   images/edit/
   images/photos/
3. Upload your images using the exact paths written in script.js,
   or change the paths in script.js.
4. Replace each REPLACE_ME YouTube URL in script.js with the actual link.
5. Replace YOUR-EMAIL@gmail.com with your portfolio email.
6. Replace the social URLs in the contact section in script.js.

Adding a new work
-----------------
Copy one work object inside the appropriate array in script.js.
Example:
{
  title: "New Film",
  type: "Short Film",
  year: "2026",
  image: "images/filmed/new-film.jpg",
  link: null
}

For clickable works, put a URL in link.
For FILMED works, keep link: null.

The page uses horizontal carousels on desktop and touch-swipe on mobile.
You can also shift-wheel over a carousel on desktop.

Page hierarchy
---------------
FILMED
  - INDIE FILMS
  - MUSIC VIDEO
  - DOCUMENTARY

EDIT
  - VIDEO EDIT
  - OTHER WORKS

PHOTOGRAPHS
  - photography grid

MUSIC VIDEO is intentionally a subcategory inside FILMED, not a top-level section.
PHOTOGRAPHS is a separate top-level section because still photography is separate from filming and editing.
