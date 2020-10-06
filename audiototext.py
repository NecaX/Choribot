import os
import sys
from pocketsphinx import AudioFile, get_model_path, get_data_path

model_path = get_model_path()
data_path = get_data_path()

config = {
    'audio_file': 'user_audio',
    'hmm': os.path.join(model_path, 'es-es'),
    'lm': os.path.join(model_path, 'es-es.lm.bin'),
    'dict': os.path.join(model_path, 'es.dict')
}

print("Reconociendo....")
sys.stdout.flush()
audio = AudioFile(**config)
for phrase in audio:
    print(phrase)
    sys.stdout.flush()