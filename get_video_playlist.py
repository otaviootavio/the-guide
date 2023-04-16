import os
import re
from urllib.parse import urlparse, parse_qs
import requests
from dotenv import load_dotenv
from datetime import datetime
import bleach
import yaml


load_dotenv()
api_key = os.getenv("YOUTUBE_API_KEY")
arquivo_url = "urls_playlists.txt"

def criar_diretorio_build():
    data_hora = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
    diretorio = f"build-{data_hora}"
    os.makedirs(diretorio, exist_ok=True)
    return diretorio


def obter_videos_da_playlist(api_key, playlist_id):
    url_base = "https://www.googleapis.com/youtube/v3/playlistItems"
    parametros = {
        "part": "snippet",
        "maxResults": 50,
        "playlistId": playlist_id,
        "key": api_key,
    }

    videos = []

    while True:
        response = requests.get(url_base, params=parametros)
        resultado = response.json()

        for item in resultado["items"]:
            titulo = item["snippet"]["title"]
            posicao = item["snippet"]["position"] + 1
            video_id = item["snippet"]["resourceId"]["videoId"]
            link = f"https://www.youtube.com/watch?v={video_id}"
            videos.append((posicao, titulo, link))

        if "nextPageToken" in resultado:
            parametros["pageToken"] = resultado["nextPageToken"]
        else:
            break

    return videos


def obter_titulo_da_playlist(api_key, playlist_id):
    url_base = "https://www.googleapis.com/youtube/v3/playlists"
    parametros = {"part": "snippet", "id": playlist_id, "key": api_key}
    response = requests.get(url_base, params=parametros)
    resultado = response.json()

    if resultado["items"]:
        return resultado["items"][0]["snippet"]["title"]
    else:
        return None


def ler_urls_do_arquivo(arquivo):
    with open(arquivo, "r", encoding="utf-8") as f:
        urls = f.read().splitlines()
    return urls


urls_playlists = ler_urls_do_arquivo(arquivo_url)


def salvar_videos_em_arquivo_md(titulo_playlist, videos, arquivo, diretorio, descricao_playlist):
    with open(os.path.join(diretorio, "".join(arquivo)), "w", encoding="utf-8") as f:
        f.write(f"---\n")
        sanitized_yaml = yaml.safe_dump({'descricaoPlaylist': sanitized_descricao})
        
        f.write(f"playlistTitle: {titulo_playlist}\n")
        f.write(sanitized_yaml)
        f.write(f"---\n")
        for posicao, titulo, link in videos:
            f.write(f"### {titulo} + {posicao}\n")
            f.write(f"{link}\n\n")


def obter_descricao_da_playlist(api_key, playlist_id):
    url_base = "https://www.googleapis.com/youtube/v3/playlists"
    parametros = {"part": "snippet", "id": playlist_id, "key": api_key}
    response = requests.get(url_base, params=parametros)
    resultado = response.json()

    if resultado["items"]:
        return resultado["items"][0]["snippet"]["description"]
    else:
        return None


def adicionar_ao_index(
    diretorio,
    titulo_playlist,
    url_playlist,
    descricao_playlist,
    arquivo_index="index.md",
):
    with open(
        os.path.join(diretorio, arquivo_index), "a", encoding="utf-8"
    ) as f:  # Adicione "diretorio" ao caminho do arquivo
        f.write(f"# {titulo_playlist}\n")
        f.write(f"{url_playlist}\n")
        if descricao_playlist:  # Verifique se a descrição não está vazia
            f.write(f"{descricao_playlist}\n\n")
        else:
            f.write("\n")


def obter_descricao_da_playlist(api_key, playlist_id):
    url_base = "https://www.googleapis.com/youtube/v3/playlists"
    parametros = {"part": "snippet", "id": playlist_id, "key": api_key}
    response = requests.get(url_base, params=parametros)
    resultado = response.json()

    if resultado["items"]:
        return resultado["items"][0]["snippet"]["description"]
    else:
        return None


diretorio_build = criar_diretorio_build()

for url_playlist in urls_playlists:
    playlist_id = url_playlist.split("=")[-1]
    titulo_playlist = obter_titulo_da_playlist(api_key, playlist_id)
    descricao_playlist = obter_descricao_da_playlist(api_key, playlist_id)

    # Sanitize the description text using Bleach
    sanitized_descricao = bleach.clean(descricao_playlist, tags=[], attributes={})

    videos = obter_videos_da_playlist(api_key, playlist_id)

    if titulo_playlist and videos:
        arquivo_md = f"playlist_{playlist_id}.md"
        salvar_videos_em_arquivo_md(titulo_playlist, videos, arquivo_md, diretorio_build, sanitized_descricao)
        print(f"Arquivo .md gerado: {arquivo_md}")
    else:
        print(f"Não foi possível obter informações da playlist: {url_playlist}")
