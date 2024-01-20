-- Tables
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(11) NOT NULL,
    x_coordinate INTEGER NOT NULL,
    y_coordinate INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_customers_pkey ON customers USING btree (id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers USING btree (email);