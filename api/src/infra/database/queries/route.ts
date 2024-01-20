export const queries = {
  findAll: `
    SELECT 
      id,
      name,
      x_coordinate,
      y_coordinate
    FROM customers WHERE deleted_at IS NULL;
  `,
}
