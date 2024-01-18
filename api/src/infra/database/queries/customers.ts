export const queries = {
  findAll: () => `
    SELECT
      id,
      name,
      email,
      phone,
      created_at,
      updated_at
    FROM customers WHERE deleted_at IS NULL;
  `,
}
