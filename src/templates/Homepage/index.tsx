import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useBooks } from "../../hooks/useBooks";
import styles from "./styles.module.css";

function Homepage() {
  const [books] = useBooks();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredBooks = books.filter((book) => {
    const title = book.title.toLowerCase();
    const query = searchQuery.toLowerCase();
    return title.includes(query);
  });

  return (
    <div className={styles.app}>
      <main>
        <section className={styles.centeredSection}>
          <div className={styles.searchSection}>
            <h3>Search Books</h3>
            <p>
              Take a look at our wide selection of literature. We provide you
              with entertainment and knowledge, the most important parts of
              life.
            </p>

            <div className={styles.searchContainer}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Enter book title..."
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <button
                className={styles.searchButton}
                onClick={() => setSearchQuery("")}
              >
                Clear
              </button>
            </div>
          </div>
        </section>
        <section>
          {filteredBooks.length > 0 ? (
            <div className={styles.searchResults}>
              {filteredBooks.map((book) => (
                <div key={book.id} className={styles.bookCard}>
                  <Link to={`/books/${book.id}`}>
                    <img src={book.image} alt={book.title} />
                  </Link>
                  <p className={styles.bookTitle}>{book.title}</p>
                  <p className={styles.bookAuthor}>{book.author}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noBooksFound}>No books found</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Homepage;
