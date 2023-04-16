import Link from 'next/link';

export async function getStaticProps() {
  const metadataUrl = new URL('/post/data.json', "http://localhost:3000");
  const metadataResponse = await fetch(metadataUrl);
  const markdownList = await metadataResponse.json();

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
        {markdownList.map(({ title, id }) => (
          <li key={id}>
            <Link href={`/post/${id}`}>
                <span>{title} - {id}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
