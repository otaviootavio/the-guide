import os
import json

build_folders = [f for f in os.listdir() if os.path.isdir(f) and f.startswith('build')]
if not build_folders:
    print("Nenhuma pasta build encontrada.")
    exit()

posts_directory = sorted(build_folders)[0]
posts_data = []

for filename in os.listdir(posts_directory):
    if filename.endswith(".md"):
        post_id = filename[:-3]
        post_path = os.path.join(posts_directory, filename)
        post_data = {
            "id": post_id,
            "title": post_id, # utiliza o nome do arquivo como título
        }
        posts_data.append(post_data)

with open(posts_directory+"/"+"posts_data.json", "w") as f:
    json.dump(posts_data, f)
