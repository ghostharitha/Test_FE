const DEFAULT_REMOTE_API = 'https://test-be-6kg8.onrender.com';
const ENV_API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').trim();

function isLocalhostUrl(url) {
	return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(url || '');
}

function isLocalFrontendHost() {
	if (typeof window === 'undefined') return false;
	return ['localhost', '127.0.0.1'].includes(window.location.hostname);
}

function resolveApiBaseUrl() {
	if (!ENV_API_BASE_URL) return DEFAULT_REMOTE_API;

	if (isLocalhostUrl(ENV_API_BASE_URL) && !isLocalFrontendHost()) {
		return DEFAULT_REMOTE_API;
	}

	return ENV_API_BASE_URL;
}

const API_BASE_URL = resolveApiBaseUrl().replace(/\/$/, '');

async function request(path, options = {}) {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		headers: {
			'Content-Type': 'application/json',
			...(options.headers || {})
		},
		...options
	});

	const data = await response.json().catch(() => ({}));

	if (!response.ok) {
		throw new Error(data.error || 'Request failed');
	}

	return data;
}

export function register(payload) {
	return request('/api/auth/register', {
		method: 'POST',
		body: JSON.stringify(payload)
	});
}

export function login(payload) {
	return request('/api/auth/login', {
		method: 'POST',
		body: JSON.stringify(payload)
	});
}

export { API_BASE_URL };
