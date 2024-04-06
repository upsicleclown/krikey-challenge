CREATE TABLE authors (
    id serial PRIMARY KEY, name text, email text, date_of_birth timestamp
);
CREATE TABLE books (
    id serial PRIMARY KEY, author_id integer REFERENCES authors (id), isbn text
);
CREATE TABLE sale_items (
    id serial PRIMARY KEY, book_id integer REFERENCES books (id), customer_name text, item_price money, quantity integer
);

-- Indexes for optimization
CREATE INDEX idx_books_author_id ON books (author_id);

CREATE INDEX idx_sale_items_book_id ON sale_items (book_id);
