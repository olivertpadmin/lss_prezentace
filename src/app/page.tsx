import { redirect } from 'next/navigation'

/** Kořen webu vede rovnou do prezentace. */
export default function Home() {
  redirect('/lss')
}
