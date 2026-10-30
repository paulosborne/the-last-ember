import type { ChronicleSection } from '../content/chronicle'

type ArticleContentProps = {
  sections: ChronicleSection[]
}

export function ArticleContent({ sections }: ArticleContentProps) {
  return sections.map((section) => (
    <section className="article-section" key={section.heading}>
      <h2>{section.heading}</h2>
      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
      {section.image && <figure><img src={section.image.src} alt={section.image.alt} loading="lazy" />{section.image.caption && <figcaption>{section.image.caption}</figcaption>}</figure>}
    </section>
  ))
}
