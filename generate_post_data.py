import os
import json
import yaml

build_folders = [f for f in os.listdir() if os.path.isdir(f) and f.startswith('build')]
if not build_folders:
    print("Nenhuma pasta build encontrada.")
    exit()

posts_directory = sorted(build_folders)[-1]
posts_data = []

for filename in os.listdir(posts_directory):
    if filename.endswith(".md"):
        post_id = filename[:-3]
        post_path = os.path.join(posts_directory, filename)
        with open(post_path, 'r') as f:
            yaml_header = f.read().split('---')[1]
            post_metadata = yaml.safe_load(yaml_header)
        post_data = {
            "id": post_id,
            "descricaoPlaylist": post_metadata['descricaoPlaylist'],
            "playlistTitle": post_metadata['playlistTitle']
        }
        posts_data.append(post_data)

with open(posts_directory+"/"+"data.json", "w") as f:
    json.dump(posts_data, f)
