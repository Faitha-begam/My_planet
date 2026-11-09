import { Link } from 'react-router-dom'

const NotFound = () => (
  <main className="grid min-h-screen place-items-center px-6 text-center">
    <div>
      <h1 className="text-5xl font-extrabold">Oops! Lost in the fog</h1>
      <p className="mt-3 font-lore text-xl italic text-mist">We looked everywhere, but this place isn’t on the map. Let’s go back and try again!</p>
      <Link to="/" className="mt-6 inline-block rounded-full border border-wick px-6 py-2 text-wick hover:bg-wick/10">Take me back to the shore</Link>
    </div>
  </main>
)

export default NotFound
