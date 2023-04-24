import Link from 'next/link';

export default function OzoList({markdownList = []}) {
  return (
  <div>
    {markdownList.map(({ id, title, description }) => (
      <section key={id}>
      <aside>
        <Link href={`/onezeroone/${id}`}>
          <h2>{id}</h2>
        </Link>
        <h3>{title}</h3>
        <p>{description}</p>
      </aside>
    </section>
    ))}
  </div>
  )
}