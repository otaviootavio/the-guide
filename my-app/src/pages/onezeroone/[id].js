import { marked } from 'marked';
import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'public', 'onezeroone');
  const postFileNames = fs.readdirSync(postsDirectory);

  const paths = postFileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));

  return { paths, fallback: false };
}


export async function getStaticProps(context) {
  const { id } = context.params;

  const markdownURL = new URL(`/onezeroone/${id}.md`, "http://localhost:3000");
  const markdownResponse = await fetch(markdownURL);
  const markdown = await markdownResponse.text();

  // Separe o cabeçalho YAML do conteúdo do Markdown
  const [, markdownContent] = markdown.split('---\n').slice(1);

  const html = marked.parse(markdownContent);

  return {
    props: {
      content: html,
    },
  };
}


export default function Post({content }) {
  return (
    <div>
      <main>
        <div className="first-div">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </main>
  </div>
  );
}
