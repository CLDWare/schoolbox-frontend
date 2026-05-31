export function timeAgo(dateInput: string | number | Date) {
	const timeMs = new Date(dateInput).getTime();
	const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

	const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];
	const units: Intl.RelativeTimeFormatUnit[] = [
		'second',
		'minute',
		'hour',
		'day',
		'week',
		'month',
		'year'
	];

	// Find the appropriate unit
	const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds));
	const divider = unitIndex ? cutoffs[unitIndex - 1] : 1;

	// Format the relative time ('numeric: auto' turns "1 day ago" into "yesterday")
	const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
	return rtf.format(Math.floor(deltaSeconds / divider), units[unitIndex]);
}
