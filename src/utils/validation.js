export function isFieldHasError({ errors, fieldName }) {
  return (
    errors.length > 0 && Boolean(errors.find(({ path }) => path === fieldName))
  );
}
