import { marked } from 'marked';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';

export async function getStaticProps() {
  const metadataUrl = new URL('/post/data.json', "http://localhost:3000");
  const metadataResponse = await fetch(metadataUrl);
  const markdownList = await metadataResponse.json();

  const onezerooneList = [{ "id": "react-solidity-101" }, { "id": "cryptography-101" }, { "id": "solidity-101" }]

  const markdownHomeURL = await new URL('/home.md', "http://localhost:3000");
  const metadataHomeResponse = await fetch(markdownHomeURL);
  const markdownHomeText = await metadataHomeResponse.text();
  // Mesclar os metadados YAML do arquivo .md com os metadados do arquivo data.json
  const htmlHome = marked.parse(markdownHomeText);


  return {
    props: {
      markdownList,
      htmlHome: htmlHome,
      onezerooneList,
    },
  };

}


export default function HomePage({ onezerooneList }) {
  return (
    <div>
      <header>
        <HeaderComponent onezerooneList={onezerooneList} />
      </header>
      <main>
        {/* <div dangerouslySetInnerHTML={{ __html: htmlHome }} /> */}
        {/* {postList(markdownList)} */}
        {/* {ozoList(onezerooneList)} */}
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </div>
  );
}
