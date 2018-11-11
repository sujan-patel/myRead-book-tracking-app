# MyReads

I created this project as part of the Udacity React Nanodegree.

This app helps the user keep track of books sorted into three shelves: "currently reading", "want to read", and "read". It allows the user to transfer books between shelves, remove books, and add books by search via the backend API provided by Udacity.

## Installation Instructions

```
git clone https://github.com/zyud/my-reads.git
cd my-reads
yarn install
yarn start
```

## Use Instructions

![Main page instructions](graphics-for-doc/main-page-instructions.png)

![Search page instructions](graphics-for-doc/search-page-instructions.png)

Note: The backend API is provided mostly for demonstration purposes, and thus uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Square Dancing or History of Paper Towels don't come back with any results.
