import os

def get_audio_files(folder_path, extensions=('mp3', 'wav')):
    audio_files = []
    for entry in os.scandir(folder_path):
        if entry.is_file() and entry.name.split('.')[-1].lower() in extensions:
            audio_files.append(entry.name.rsplit('.', 1)[0])
    return audio_files

def write_to_text_file(folder_path, audio_files, output_filename='audio_list.txt'):
    with open(os.path.join(folder_path, output_filename), 'w') as output_file:
        output_file.write(str(audio_files))

def main():
    folder_path = './assets_music/music'  # Replace with your folder path
    audio_files = get_audio_files(folder_path)
    write_to_text_file("./", audio_files)

if __name__ == '__main__':
    main()