import { Breath, Release } from './showcases/Play'
import { Menu, Tablets } from './showcases/Culture'
import { TideGames } from './showcases/Games'
import { CuriosityCompass, LearningJourney } from './showcases/Learn'
import { DreamLoom } from './showcases/Dream'
import { GovernmentShow } from './showcases/Rule'
import { Clock, Current, Frames } from './showcases/Civic'

// Each department opens with its own interactive centrepiece.
const Showcase = ({ d }) => {
  switch (d.show) {
    case 'games': return <TideGames />
    case 'learn': return <><LearningJourney /><CuriosityCompass /></>
    case 'dream': return <DreamLoom />
    case 'rule': return <GovernmentShow />
    case 'none': return null
    case 'release': return <Release />
    case 'breath': return <Breath />
    case 'menu': return <Menu />
    case 'tablets': return <Tablets />
    case 'clock': return <div className="rounded-2xl border border-white/10 bg-lime-300/5 p-6"><Clock /></div>
    case 'current': return <Current />
    default: return <Frames d={d} />
  }
}

export default Showcase
