// The single Vercel serverless function for the shop. vercel.json rewrites
// every /api/* request here; server/router.js decides what to do.
import { handle } from '../server/router.js'

export const GET = handle
export const POST = handle
export const PUT = handle
export const PATCH = handle
export const DELETE = handle
