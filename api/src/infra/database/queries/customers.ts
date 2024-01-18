export const queries = {
  findAll: `
    SELECT
      id,
      name,
      email,
      phone,
      created_at,
      updated_at
    FROM customers WHERE deleted_at IS NULL
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
      phone
    ) VALUES (
      $1,
      $2,
      $3,
      $4
    );
  `,
}
