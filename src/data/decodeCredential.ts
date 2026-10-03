import type { EncodedCredential } from './credentials.generated'

export async function decodePassword(studentId: string, credential: EncodedCredential) {
  const keyMaterial = new TextEncoder().encode(`${studentId}:${credential.salt}`)
  const key = new Uint8Array(await crypto.subtle.digest('SHA-256', keyMaterial))
  const encrypted = Uint8Array.from(atob(credential.value), (character) => character.charCodeAt(0))
  const password = encrypted.map((value, index) => value ^ key[index % key.length])
  return new TextDecoder().decode(password)
}