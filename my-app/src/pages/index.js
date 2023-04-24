import { marked } from 'marked';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const metadataUrl = new URL('/post/data.json', 'http://localhost:3000');
  const metadataResponse = await fetch(metadataUrl);
  const markdownList = await metadataResponse.json();

  const onezerooneDirectory = path.join(process.cwd(), 'public', 'onezeroone');
  const onezerooneFilenames = fs.readdirSync(onezerooneDirectory).filter((filename) => /\.md$/.test(filename));
  const onezerooneList = onezerooneFilenames.map((filename) => {
    const id = filename.replace(/\.md$/, '');
    return { id };
  });

  const fetchMarkdownFile = async (filename) => {
    const markdownUrl = new URL(`/onezeroone/${filename}`, 'http://localhost:3000');
    const markdownResponse = await fetch(markdownUrl);
    return await markdownResponse.text();
  };

  const markdownContents = await Promise.all(onezerooneFilenames.map(fetchMarkdownFile));
  const htmlContents = markdownContents.map((markdown) => marked.parse(markdown));

  const markdownHomeURL = new URL('/home.md', 'http://localhost:3000');
  const metadataHomeResponse = await fetch(markdownHomeURL);
  const markdownHomeText = await metadataHomeResponse.text();
  // Merge YAML metadata from .md file with metadata from data.json file
  const htmlHome = marked.parse(markdownHomeText);

  return {
    props: {
      markdownList,
      htmlHome,
      onezerooneList,
      htmlContents,
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
