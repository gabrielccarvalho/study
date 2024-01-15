export function formatCurrency(
	amount: number,
	locale = 'pt-BR',
	currencyCode = 'BRL',
): string {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: currencyCode,
	}).format(amount)
}
