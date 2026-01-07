export function formatedValue(value: number): string {
  const formated = value.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
  });
  return formated;
}
