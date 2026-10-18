type SectionHeadingProps = {
  number: string
  label: string
  title: string
  id: string
  description?: string
}

export function SectionHeading({ number, label, title, id, description }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="section-kicker"><span>{number}</span> / {label.toUpperCase()}</p>
      <h2 id={id}>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}
