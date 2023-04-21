import Link from 'next/link';
import { marked } from 'marked';
import { HiAcademicCap } from 'react-icons/hi'
import { BiCodeBlock, BiHardHat } from 'react-icons/bi'
import { FiAlertTriangle } from 'react-icons/fi'

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
    <div>
      <header>
        <h3>The Engineer&apos;s guide to blockchain</h3>
        <p>We help undergrad students to <mark>learn</mark> blockchain</p>
        <br />
        <h1>Learning paths</h1>
        <div>
          Learn about <b>research</b> or about <b>web development</b>
          <section>
          <aside>
              <BiCodeBlock size={100} />
              <h3>Beginner</h3>
              <p>So you wanna <mark>build</mark> on web3? Learn blockchain concepts while build on it!</p>
              <p><small>If you like getting your hands dirty, this is for you</small></p>
            </aside>
          </section>
          <section>
            <aside>
              < HiAcademicCap size={100} />
              <h3>Academic</h3>
              <p>Wanna <mark>read</mark> more articles and papers? Read papers and see what will be build in the next years!</p>
              <p><small>We will focus more on understand than actualy build</small></p>
            </aside>
            <aside>
              <BiCodeBlock size={100} />
              <h3>Developer</h3>
              <p>So you wanna <mark>build</mark> on web3? Learn blockchain concepts while build on it!</p>
              <p><small>If you like getting your hands dirty, this is for you</small></p>
            </aside>
          </section>
        </div>
      </header>
      <main>
        <div dangerouslySetInnerHTML={{ __html: htmlHome }} />
        <details>
          <summary><BiHardHat /><FiAlertTriangle /></summary>
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
        </details>
      </main>
      <footer>
        <hr />
        <p>
          <small>otavio.vac@gmail.com</small>
        </p>
      </footer>
    </div>
  );
}
