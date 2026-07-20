const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(token),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()
  let data = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      // no JSON body (e.g. 204 No Content)
    }
  }

  if (!res.ok) {
    const fieldErrorMsg =
      data?.fieldErrors && Object.values(data.fieldErrors).join(', ')
    const message = data?.message || fieldErrorMsg || `Request failed (${res.status})`
    throw new Error(message)
  }

  return data
}

export const authApi = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
}

export const taskApi = {
  list: (token, status) =>
    request(`/tasks${status ? `?status=${status}` : ''}`, { token }),
  get: (token, id) => request(`/tasks/${id}`, { token }),
  create: (token, payload) => request('/tasks', { method: 'POST', body: payload, token }),
  update: (token, id, payload) =>
    request(`/tasks/${id}`, { method: 'PUT', body: payload, token }),
  remove: (token, id) => request(`/tasks/${id}`, { method: 'DELETE', token }),
}
