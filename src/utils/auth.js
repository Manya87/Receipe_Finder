// Simple client-side password hashing using SubtleCrypto (SHA-256)
export async function hashPassword(password) {
  const enc = new TextEncoder()
  const data = enc.encode(password)
  const hashBuffer = await (typeof crypto !== 'undefined' ? crypto.subtle.digest('SHA-256', data) : Promise.reject(new Error('No crypto')))
  const bytes = new Uint8Array(hashBuffer)
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password, expectedHash) {
  const h = await hashPassword(password)
  return h === expectedHash
}
