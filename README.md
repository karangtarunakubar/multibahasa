# Kamus Bahasa Daerah Multibahasa

A lightweight, browser-based dictionary and translation interface for documenting regional languages from Kutai Barat and East Kalimantan. The project is built with HTML, CSS, and vanilla JavaScript, and is intended to make local vocabulary easy to explore and contribute to.

## Features

- Translate words between Indonesian and regional languages using the in-browser dictionary.
- Choose from Indonesian, Tunjung, Benuaq, Kenyah, Bahau, and Kutai.
- Add vocabulary through the **Tambah Kata** form. Entries are saved in the browser's `localStorage`.
- Listen to source and translated text using browser speech synthesis, where supported.
- Copy translation results, swap languages, and use light or dark mode.
- Browse the project proposal and donation interface.

> **Translation scope:** This is a dictionary-based word lookup, not a machine-translation service. Results depend on the vocabulary available in the app, and unknown words remain unchanged.

## Run locally

No build step or package installation is required.

1. Clone or download this repository.
2. Open `index.html` in a modern web browser.

For more reliable behavior with browser features, you can serve the repository with any static web server and open the local URL. The page loads Tailwind CSS, Google Fonts, and Font Awesome from external CDNs, so those resources require an internet connection.

## Contributing vocabulary

Use **Tambah Kata** in the dictionary tab to add a regional word and its Indonesian meaning. These additions are stored only in the current browser's local storage; they are not automatically submitted to the repository or shared with other users. To contribute vocabulary for everyone, propose changes to the project's dictionary data through a pull request.

## Project files

- `index.html` — application interface, styles, dictionary logic, and initial vocabulary.
- `script.js` — donation form interaction and validation. Payment submission is currently a demo; it logs a payload and does not process a real transaction.
- `language-data.html` and `language-data-notebook.ipynb` — language data materials.
- `language_words.sql` — SQL vocabulary data/schema.
- `data.json` — repository language-composition metadata.

## Language composition

The repository is primarily HTML (87.9%) with JavaScript (12.1%).

## Acknowledgements

Created for the Eunoiaverse regional-language preservation initiative. The app credits Edo Erpani in its interface.
