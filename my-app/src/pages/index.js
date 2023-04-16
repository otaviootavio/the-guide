import Link from 'next/link';

export async function getStaticProps() {
  const metadataUrl = new URL('/post/data.json', "http://localhost:3000");
  const metadataResponse = await fetch(metadataUrl);
  const metadata = await metadataResponse.json();

  const markdownList = metadata.map(({ id, title, date }) => ({
    id,
    title,
    date: new Date(date).toLocaleDateString(),
  }));

  return {
    props: {
      markdownList,
    },
  };
}



export default function HomePage({ markdownList }) {
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {markdownList.map(({ id, title, date }) => (
          <li key={id}>
            <Link href={`/post/${id}`}>
                <span>{title} - {date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
