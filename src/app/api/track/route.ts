import { NextResponse } from 'next/server'

/**
 * Sběr návštěvnosti je v samostatné verzi prezentace vypnutý — události se
 * zahazují, takže běh nevyžaduje databázi ani žádné proměnné prostředí.
 *
 * Pokud chcete návštěvnost měřit, nahraďte tělo funkce vlastním zápisem.
 */
export async function POST() {
  return NextResponse.json({ ok: true })
}
