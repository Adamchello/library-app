import { useLocalStorage } from "usehooks-ts";

export type Book = {
  id: string;
  title: string;
  author: string;
  status: string;
  image: string;
  description: string;
  history?: { action: string; userId: string }[];
};

const books = [
  {
    id: "life-of-pi",
    title: "Life of Pi",
    author: "Yann Martel",
    status: "available",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320562005l/4214.jpg",
    description:
      'Life of Pi is a fantasy adventure novel by Yann Martel published in 2001. The protagonist, Piscine Molitor "Pi" Patel, a Tamil boy from Pondicherry, explores issues of spirituality and practicality from an early age. He survives 227 days after a shipwreck while stranded on a lifeboat in the Pacific Ocean with a Bengal tiger named Richard Parker.',
  },
  {
    id: "1984",
    title: "1984",
    author: "George Orwell",
    status: "available",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348990566l/5470.jpg",
    description:
      "1984 is a dystopian novella by George Orwell published in 1949, which follows the life of Winston Smith, a low ranking member of 'the Party', who is frustrated by the omnipresent eyes of the party, and its ominous ruler Big Brother.",
  },
  {
    id: "to-kill-a-mockingbird",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    status: "available",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1553383690l/2657.jpg",
    description:
      "To Kill a Mockingbird is a novel by Harper Lee published in 1960. Instantly successful, widely read in high schools and middle schools in the United States, it has become a classic of modern American literature, winning the Pulitzer Prize.",
  },
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    status: "available",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320399351l/1885.jpg",
    description:
      "Pride and Prejudice is a romantic novel of manners written by Jane Austen in 1813. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
  },
  {
    id: "the-great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    status: "available",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1490528560l/4671.jpg",
    description:
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
  },
  {
    id: "moby-dick",
    title: "Moby-Dick",
    author: "Herman Melville",
    status: "available",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327940656l/153747.jpg",
    description:
      "Moby-Dick; or, The Whale is an 1851 novel by American writer Herman Melville. The book is the sailor Ishmael's narrative of the obsessive quest of Ahab, captain of the whaling ship Pequod, for revenge on Moby Dick, the giant white sperm whale that on the ship's previous voyage bit off Ahab's leg at the knee.",
  },
  {
    id: "war-and-peace",
    title: "War and Peace",
    author: "Leo Tolstoy",
    status: "available",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1413215930l/656.jpg",
    description:
      "War and Peace is a novel by the Russian author Leo Tolstoy, published serially, then in its entirety in 1869. It is regarded as one of Tolstoy's finest literary achievements and remains a classic of world literature.",
  },
  {
    id: "crime-and-punishment",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    status: "available",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1382846449l/7144.jpg",
    description:
      "Crime and Punishment is a novel by the Russian author Fyodor Dostoevsky. It was first published in the literary journal The Russian Messenger in twelve monthly installments during 1866. It was later published in a single volume.",
  },
];

export const useBooks = () => {
  return useLocalStorage<Book[]>("books", books);
};
