const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');

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
