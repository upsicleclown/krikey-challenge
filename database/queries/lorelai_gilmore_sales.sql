SELECT SUM(si.item_price * si.quantity) AS total_sales, a.name AS author_name, a.email AS email
            FROM authors a
            JOIN books b ON a.id = b.author_id AND a.name='Lorelai Gilmore'
            JOIN sale_items si ON b.id = si.book_id
            GROUP BY author_name,email;