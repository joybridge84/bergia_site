import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return supabaseResponse
    }

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
              supabaseResponse = NextResponse.next({
                request,
              })
              cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options)
              )
            } catch (e) {
              // Ignore cookie set errors in middleware
            }
          },
        },
      }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake can make it very hard to debug
    // issues with users being logged out.
    await supabase.auth.getUser()

    return supabaseResponse
  } catch (error) {
    // If anything fails, just return the original response to avoid crashing the site
    console.error('Middleware session update error:', error)
    return NextResponse.next({
      request,
    })
  }
}
