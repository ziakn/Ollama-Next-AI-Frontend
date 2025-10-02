// lib/auth.js
'use client';

export function isLoggedIn() {
  return typeof window !== 'undefined' && document.cookie.includes('token=');
}
