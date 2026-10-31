import type { ChronicleCover as ChronicleCoverData } from '../content/chronicle-validation'

type ChronicleCoverProps = {
  cover: ChronicleCoverData
}

export function ChronicleCover({ cover }: ChronicleCoverProps) {
  return <figure className="article-feature"><img src={cover.src} alt={cover.alt} />{cover.caption && <figcaption>{cover.caption}</figcaption>}</figure>
}
