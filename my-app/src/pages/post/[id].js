import { marked } from 'marked';
import yaml from 'js-yaml'; // Importe a biblioteca js-yaml para analisar o YAML

export async function getStaticPaths() {
  const metadataUrl = new URL('/post/data.json', "http://localhost:3000");
  const metadataResponse = await fetch(metadataUrl);
  const metadata = await metadataResponse.json();

  const paths = metadata.map((postMetadata) => ({
    params: { id: postMetadata.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  const metadataUrl = new URL('/post/data.json', "http://localhost:3000");
  const metadataResponse = await fetch(metadataUrl);
  const metadata = await metadataResponse.json();

  const currentPostMetadata = metadata.find((postMetadata) => postMetadata.id === id);

  const markdownUrl = new URL(`/post/${id}.md`, "http://localhost:3000");
  const markdownResponse = await fetch(markdownUrl);
  const markdown = await markdownResponse.text();

  // Separe o cabeçalho YAML do conteúdo do Markdown
  const [yamlHeader, markdownContent] = markdown.split('---\n').slice(1);
  // Analise o cabeçalho YAML
  const metadataFromYaml = yaml.load(yamlHeader);
  // Mesclar os metadados YAML do arquivo .md com os metadados do arquivo data.json
  const postMetadata = { ...currentPostMetadata, ...metadataFromYaml };

  const html = marked.parse(markdownContent);

  return {
    props: {
      playlistTitle: postMetadata.playlistTitle,
      content: html,
      descricaoPlaylist: postMetadata.descricaoPlaylist,
    },
  };
}


export default function Post({ playlistTitle, content, descricaoPlaylist }) {
  return (
    <div className="first-div">
      <h1>{playlistTitle}</h1>
      <p>{descricaoPlaylist}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
