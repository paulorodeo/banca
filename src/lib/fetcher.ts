/** Runtime-neutral fetch call signature; excludes runtime-specific static helpers. */
export type Fetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
