/* Leaf module: imported by both errors.ts and utils.ts, so it must not import either (noImportCycles). */
export function formatErrorMessage(name: string, desc: string) {
	return `${name}: ${desc}`;
}
