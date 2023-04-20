import Link from 'next/link';
import { marked } from 'marked';

export async function getStaticProps() {
  const metadataUrl = new URL('/post/data.json', "http://localhost:3000");
  const metadataResponse = await fetch(metadataUrl);
  const markdownList = await metadataResponse.json();
  
  const markdownHomeURL = await new URL('/home.md', "http://localhost:3000");
  const metadataHomeResponse = await fetch(markdownHomeURL);
  const markdownHomeText = await metadataHomeResponse.text();
  // Mesclar os metadados YAML do arquivo .md com os metadados do arquivo data.json
  const htmlHome = marked.parse(markdownHomeText);


  return {
    props: {
      markdownList,
      htmlHome: htmlHome,
    },
  };
}



export default function HomePage({ markdownList, htmlHome }) {
  return (
    <div className="first-div">
      <h1>PLaylists</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlHome }} />
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
