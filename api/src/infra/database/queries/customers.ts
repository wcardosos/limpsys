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
    FROM customers
    WHERE
      deleted_at IS NULL
      AND name LIKE $1
      AND email LIKE $2
      AND phone LIKE $3
    ORDER BY created_at DESC
    OFFSET $4 LIMIT $5;
  `,
  findById: `
    SELECT
      id,
      name,
      email,
      phone,
      x_coordinate,
      y_coordinate,
      created_at,
      updated_at
    FROM customers
    WHERE deleted_at IS NULL AND id = $1;
  `,
  findByEmail: `
    SELECT
      id,
      name,
      email,
      phone,
      x_coordinate,
      y_coordinate,
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
  count: `
    SELECT
      COUNT(*)
    FROM customers
    WHERE
      deleted_at IS NULL
      AND name LIKE $1
      AND email LIKE $2
      AND phone LIKE $3;
`,
  delete: 'UPDATE customers SET deleted_at = NOW() WHERE id = $1;',
}
