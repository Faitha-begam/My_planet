import Scene from '../Scene'
import { wagons } from '../../data/content'
import { WonderDay } from '../showcases/Learn'

// Wonder Wagon Yard: six wagons parked in a row. Scroll sideways to peek at each one.
const RoadRealm = () => (
  <div className="space-y-8">
    <div>
      <h2 className="mb-3 text-xs uppercase tracking-[0.3em] text-mist/60">The wagon yard · scroll sideways to peek at each wagon →</h2>
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
        {wagons.map((w) => (
          <article key={w.id} className="relative h-96 w-[82vw] shrink-0 snap-center overflow-hidden rounded-3xl border sm:w-[26rem]" style={{ borderColor: `${w.c}66` }}>
            <Scene id={w.scene} color={w.c} className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-abyss/30" />
            <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
              {w.does.map((x, k) => <span key={x} className="fl rounded-full border border-white/30 bg-abyss/60 px-3 py-1 font-lore text-sm italic" style={{ animationDelay: `${k * 0.6}s` }}>{x}</span>)}
            </div>
            <div className="absolute bottom-4 left-5"><h3 className="text-2xl font-extrabold uppercase">{w.n}</h3><p className="font-lore text-lg italic text-mist">Here you learn {w.learn}.</p></div>
          </article>
        ))}
      </div>
    </div>
    <WonderDay />
  </div>
)

export default RoadRealm
