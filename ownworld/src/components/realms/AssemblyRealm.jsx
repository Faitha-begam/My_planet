import Character from '../Character'
import Scene from '../Scene'
import { sectorById } from '../../data/story'
import { Choices } from '../showcases/Systems'
import { HatShow, KindRules } from '../showcases/Rule'

// The Big Picnic Lawn in Hello Harbor, where the whole village decides things together.
const Lawn = () => (
  <div className="relative overflow-hidden rounded-3xl border border-teal-300/30">
    <Scene id="government" color="#5eead4" className="h-64 w-full sm:h-80" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-8">
      <Character kind="hat" color="#5eead4" className="h-32 sm:h-44" /><Character kind="scroll" color="#7dd3fc" className="h-28 sm:h-40" /><Character kind="flower" color="#fbbf24" className="h-28 sm:h-40" />
    </div>
  </div>
)

const AssemblyRealm = () => (
  <div className="space-y-8">
    <Lawn />
    <div><h2 className="mb-3 text-xs uppercase tracking-[0.3em] text-mist/60">The Big Hat Council · you wear the hat</h2><HatShow /></div>
    <div><h2 className="mb-3 text-xs uppercase tracking-[0.3em] text-mist/60">The Three Kind Rules · and the Make-It-Right Table</h2><KindRules /></div>
    <div><h2 className="mb-1 text-xs uppercase tracking-[0.3em] text-mist/60">The Rescue Helpers · when someone needs help</h2><Choices d={sectorById.safety} /></div>
  </div>
)

export default AssemblyRealm
