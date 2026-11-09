import { useParams } from 'react-router-dom'
import ArenaRealm from '../components/realms/ArenaRealm'
import AssemblyRealm from '../components/realms/AssemblyRealm'
import PanoramaRealm from '../components/realms/PanoramaRealm'
import RoadRealm from '../components/realms/RoadRealm'
import TheatreRealm from '../components/realms/TheatreRealm'
import PageHeader from '../components/PageHeader'
import RealmNav from '../components/RealmNav'
import SectorStrip from '../components/SectorStrip'
import { peopleById, realmById } from '../data/story'
import NotFound from './NotFound'

// Each layout is a different kind of place: arena, road, theatre, assembly, or open panorama.
const layouts = { arena: ArenaRealm, road: RoadRealm, theatre: TheatreRealm, assembly: AssemblyRealm, panorama: PanoramaRealm }

const Realm = () => {
  const { id } = useParams()
  const r = realmById[id]
  if (!r) return <NotFound />
  const Layout = layouts[r.layout]
  return (
    <main>
      <PageHeader crumbs={[['Mirabloom', '/'], ['Realms', '/realms'], [r.name]]} eyebrow={`Realm · ${r.short}`} title={r.name} plain={r.tag} does={r.does} color={r.color} guide={peopleById[r.guide]} />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8"><Layout realm={r} /></div>
      <SectorStrip realm={r} />
      <RealmNav id={r.id} />
    </main>
  )
}

export default Realm
