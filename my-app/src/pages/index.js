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
    <div className="first-div">
      <h1>PLaylists</h1>
      <ul>
        {markdownList.map(({ playlistTitle, id, descricaoPlaylist }) => (
          <li key={id}>
            <Link href={`/post/${id}`}>
                <h2>{playlistTitle}</h2>
            </Link>
            <p>id:{id}</p>
            <p>{descricaoPlaylist}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
