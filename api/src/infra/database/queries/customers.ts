export const queries = {
  findAll: `
    SELECT
      id,
      name,
      email,
      phone,
      x_coordinate,
      y_coordinate,
      created_at,
      updated_at
    FROM customers WHERE deleted_at IS NULL
    ORDER BY created_at DESC
  `,
  findByEmail: `
    SELECT
      id,
      name,
      email,
      phone,
      created_at,
      updated_at
    FROM customers
    WHERE deleted_at IS NULL AND email = $1;
  `,
  create: `
    INSERT INTO customers (
      id,
      name,
      email,
      phone,
      x_coordinate,
      y_coordinate
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
    );
  `,
  count: 'SELECT COUNT(*) FROM customers;',
}
