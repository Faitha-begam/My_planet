import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Character from './Character'

export const Crumbs = ({ crumbs }) => (
  <nav aria-label="You are here" className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-mist/60">
    {crumbs.map(([label, to], i) => (
      <Fragment key={label}>
        {i > 0 && <span aria-hidden="true">›</span>}
        {to ? <Link to={to} className="hover:text-white">{label}</Link> : <span className="text-white/80">{label}</span>}
      </Fragment>
    ))}
  </nav>
)

// Every page opens by answering: where am I, what is this place, what can I do here?
const PageHeader = ({ crumbs, eyebrow, title, plain, does = [], color = '#ffb347', guide }) => (
  <header className="mx-auto max-w-6xl px-4 pt-24 sm:px-8">
    <Crumbs crumbs={crumbs} />
    <div className="mt-4 flex items-end justify-between gap-6">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.35em]" style={{ color }}>{eyebrow}</p>
        <h1 className="mt-1 text-[clamp(2.2rem,7.5vw,5.2rem)] font-extrabold uppercase leading-[0.95]">{title}</h1>
        <p className="mt-3 max-w-2xl font-lore text-xl text-white/85 sm:text-2xl">{plain}</p>
        {does.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="What you can do here">
            {does.map((x) => <li key={x} className="rounded-full border px-4 py-1.5 text-sm" style={{ borderColor: `${color}77`, color }}>{x}</li>)}
          </ul>
        )}
      </div>
      {guide && (
        <div className="hidden shrink-0 items-end gap-2 md:flex">
          <p className="mb-24 max-w-[13rem] rounded-2xl rounded-br-none border border-white/20 bg-deep/80 p-3 font-lore text-base italic">“{guide.quote}”<span className="mt-1 block text-xs not-italic text-mist/60">{guide.name}, {guide.role}</span></p>
          <Character kind={guide.kind} color={guide.color} className="h-44" />
        </div>
      )}
    </div>
  </header>
)

export default PageHeader
