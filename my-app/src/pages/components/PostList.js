import Link from 'next/link';
import { BiHardHat } from 'react-icons/bi';
import { FiAlertTriangle } from 'react-icons/fi';

export function PostList(markdownList) {
  return <details>
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
  </details>;
}

export default PostList;