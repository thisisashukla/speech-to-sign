import re
import sys
# importing google speech API
from google.cloud import speech
from google.cloud import translate
from google.cloud.speech import enums
from google.cloud.speech import types
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from SpeechToText.streamInput import MicrophoneStream

# Create your views here.

def toText(speech, src_lang='en',trgt_lang='en'):
    # printing information for sanility check
    print("source language {}".format(src_lang))
    print("target language {}".format(trgt_lang))

    # Audio recording parameters
    RATE = 16000
    CHUNK = int(RATE / 10)  # 100ms

    client = speech.SpeechClient()
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=RATE,
        language_code=src_lang)
    streaming_config = types.StreamingRecognitionConfig(
        config=config,
        interim_results=False)

    with MicrophoneStream(RATE, CHUNK) as stream:
        audio_generator = stream.generator()
        requests = (types.StreamingRecognizeRequest(audio_content=content)
                    for content in audio_generator)

        responses = client.streaming_recognize(streaming_config, requests)

    num_chars_printed = 0
    for response in responses:
        if not response.results:
            continue

        # The `results` list is consecutive. For streaming, we only care about
        # the first result being considered, since once it's `is_final`, it
        # moves on to considering the next utterance.
        result = response.results[0]
        if not result.alternatives:
            continue

        # Display the transcription of the top alternative.
        transcript = result.alternatives[0].transcript

        # Display interim results, but with a carriage return at the end of the
        # line, so subsequent lines will overwrite them.
        #
        # If the previous result was longer than this one, we need to print
        # some extra spaces to overwrite the previous result
        overwrite_chars = ' ' * (num_chars_printed - len(transcript))

        if not result.is_final:
            sys.stdout.write(transcript + overwrite_chars + '\r')
            sys.stdout.flush()

            num_chars_printed = len(transcript)

        else:
            text=transcript + overwrite_chars
            num_chars_printed = 0
            # printing text output
            print('Text output '+text)
            return HttpResponse(text)
