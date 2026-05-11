export function getDaisyColor(variable: string, alpha = 1): string {
	const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();

	return value.replace(')', ` / ${alpha})`);
}
export const daisyChartColors = (alpha = 0.4) => [getDaisyColor('--color-primary', alpha)];
