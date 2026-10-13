export function getErrorMessage(err: unknown): string {
    if (typeof err === 'object' && err !== null && 'message' in err) {
        return String((err as { message: unknown }).message);
    }
    return String(err);
}