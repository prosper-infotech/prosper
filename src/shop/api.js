// Calls the shop's server functions under /api.
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.status = status
    this.data = data || {}
  }
}

export async function api(path, { method = 'GET', body } = {}) {
  let res
  try {
    res = await fetch(`/api${path}`, {
      method,
      credentials: 'same-origin',
      headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('We could not reach the server. Check your internet connection and try again.', 0)
  }
  const isJson = (res.headers.get('content-type') || '').includes('application/json')
  const data = isJson ? await res.json().catch(() => ({})) : {}
  if (!res.ok || !isJson) {
    throw new ApiError(data.error || 'Something went wrong. Please try again.', res.status, data)
  }
  return data
}
