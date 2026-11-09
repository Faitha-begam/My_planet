import { Breath, PartyDay } from './showcases/Play'
import { Menu } from './showcases/Culture'
import { PlayGames } from './showcases/Games'
import { WonderDay } from './showcases/Learn'
import { MiniMovie } from './showcases/Movie'
import { HatShow, KindRules } from './showcases/Rule'
import { Hobbies, Traditions } from './showcases/Free'
import { Clock, Current, Frames } from './showcases/Civic'

// Each department opens with its own interactive centrepiece.
const Showcase = ({ d }) => {
  switch (d.show) {
    case 'games': return <PlayGames />
    case 'wagons': return <WonderDay />
    case 'movie': return <MiniMovie />
    case 'hat': return <HatShow />
    case 'rules': return <KindRules />
    case 'hobbies': return <Hobbies />
    case 'traditions': return <Traditions />
    case 'party': return <PartyDay />
    case 'breath': return <Breath />
    case 'menu': return <Menu />
    case 'clock': return <div className="rounded-2xl border border-white/10 bg-lime-300/5 p-6"><Clock /></div>
    case 'current': return <Current />
    case 'frames': return <Frames d={d} />
    default: return null
  }
}

export default Showcase
