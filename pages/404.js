import Link from 'next/link'

// pages/404.js
export default function Custom404() {
  return (
    <>
      <div
        style={{ textAlign: 'center', paddingTop: '100px' }}
        id="not-found"
      >
        <h4> 404 </h4><p> This page could not be found</p>
        <Link href="/">
          Home
        </Link>
      </div>
    </>
  )
}
