import { marked } from 'marked';

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
  const html = marked.parse(markdown);

  return {
    props: {
      title: currentPostMetadata.title,
      date: new Date(currentPostMetadata.date).toLocaleDateString(),
      content: html,
    },
  };
}

export default function Post({ title, date, content }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
