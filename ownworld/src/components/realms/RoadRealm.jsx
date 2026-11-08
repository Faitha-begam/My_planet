import Scene from '../Scene'
import { Wicks } from '../showcases/Culture'
import { stages } from '../../data/content'
import { CuriosityCompass } from '../showcases/Learn'

// The learning road: six rooms in a row. Scroll sideways; there is no front door and no last day.
const RoadRealm = () => (
  <div className="space-y-8">
    <div>
      <h2 className="mb-3 text-xs uppercase tracking-[0.3em] text-mist/60">The road · six places, scroll sideways →</h2>
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
        {stages.map((s, i) => (
          <article key={s.n} className="relative h-96 w-[82vw] shrink-0 snap-center overflow-hidden rounded-3xl border sm:w-[26rem]" style={{ borderColor: `${s.c}66` }}>
            <Scene id={s.scene} color={s.c} className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-abyss/40" />
            <p className="absolute left-5 top-4 text-6xl font-extrabold opacity-30" style={{ color: s.c }}>{i + 1}</p>
            <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
              {s.does.map((w, k) => <span key={w} className="fl rounded-full border border-white/30 bg-abyss/60 px-3 py-1 font-lore text-sm italic" style={{ animationDelay: `${k * 0.6}s` }}>{w}</span>)}
            </div>
            <div className="absolute bottom-4 left-5"><p className="text-xs uppercase tracking-[0.3em]" style={{ color: s.c }}>Age {s.age}</p><h3 className="text-2xl font-extrabold uppercase">{s.n}</h3></div>
          </article>
        ))}
      </div>
    </div>
    <div><h2 className="mb-3 text-xs uppercase tracking-[0.3em] text-mist/60">The Lamplight Trial · how Thalune does exams</h2><Wicks /></div>
    <CuriosityCompass />
  </div>
)

export default RoadRealm
