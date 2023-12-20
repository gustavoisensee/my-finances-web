export const getError = (errors: unknown, value: string) =>
  // @ts-ignore
  !!errors?.[value] && errors?.[value]?.message || '';