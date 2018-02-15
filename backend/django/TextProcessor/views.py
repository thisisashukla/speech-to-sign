import six
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
# iporting google API modules
# Imports the Google Cloud client library
from google.cloud import language
from google.cloud import translate
from google.cloud.language import enums as enums
from google.cloud.language import types as types
from google.protobuf.json_format import MessageToJson,MessageToDict

# Create your views here.
def text_translate(request,src_text, trgt_lang):
    translate_client = translate.Client()

    if isinstance(src_text, six.binary_type):
        src_text = src_text.decode('utf-8')

    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    result = translate_client.translate(src_text, target_language=trgt_lang)

    print('Printing translation responses')
    print(u'Text: {}'.format(result['input']))
    print(u'Translation: {}'.format(result['translatedText'].encode("utf-8")))
    print(u'Detected source language: {}'.format(result['detectedSourceLanguage']))

    return HttpResponse(result['translatedText'])

def analyse(request,src_text,src_lang):
    # Instantiates a client
    client = language.LanguageServiceClient()

    # The text to analyze
    # text = u'Hello, world!'
    document = types.Document(content=src_text,language=src_lang, type=enums.Document.Type.PLAIN_TEXT)

    # Detects the sentiment of the text
    # sentiment = client.analyze_sentiment(document=document).document_sentiment
    analysis=client.analyze_syntax(document=document)


    # analysisJSON = MessageToJson(analysis)
    analysisDICT = MessageToDict(analysis)
    tokens=analysisDICT['tokens']
    dict={}
    for token in tokens:
        dict.update({token['text']['content']:token['partOfSpeech']['tag']})
    print(dict)
    return HttpResponse(dict)

def detect_language(request,src_text):
    """Detects the text's language."""
    translate_client = translate.Client()

    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    result = translate_client.detect_language(src_text)

    print('Printing detection response')
    print('Text: {}'.format(src_text))
    print('Confidence: {}'.format(result['confidence']))
    print('Language: {}'.format(result['language']))

    return HttpResponse(result['language'])
