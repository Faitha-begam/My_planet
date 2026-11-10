const scenes = {
  hero: '/images/fayvon/hero.jpg',
  education: '/images/fayvon/education.jpg',
  sports: '/images/fayvon/sports.jpg',
  transport: '/images/fayvon/transport.jpg',
  entertainment: '/images/fayvon/entertainment.jpg',
  government: '/images/fayvon/government.jpg',
  food: '/images/fayvon/food.jpg',
  healthcare: '/images/fayvon/healthcare.jpg',
  culture: '/images/fayvon/culture.jpg',
  technology: '/images/fayvon/technology.jpg',
  relationships: '/images/fayvon/relationships.jpg',
  canopy: '/images/fayvon/canopy.jpg',
  atlas: '/images/fayvon/atlas.jpg',
}

const WorldImage = ({ place, label, priority = false, className = '' }) => (
  <div className={`world-image world-image--${place} ${className}`} aria-hidden={!label}>
    <img
      src={scenes[place] || scenes.atlas}
      alt={label || ''}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  </div>
)

export default WorldImage
