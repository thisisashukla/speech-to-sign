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
def text_translate(text, trgt_lang):
    translate_client = translate.Client()

    if isinstance(text, six.binary_type):
        text = text.decode('utf-8')

    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    result = translate_client.translate(text, target_language=trgt_lang)

    print('Printing translation responses')
    print(u'Text: {}'.format(result['input']))
    print(u'Translation: {}'.format(result['translatedText'].encode("utf-8")))
    print(u'Detected source language: {}'.format(result['detectedSourceLanguage']))

    return result['translatedText']

def analyse(text,lang):
    # Instantiates a client
    client = language.LanguageServiceClient()

    # The text to analyze
    # text = u'Hello, world!'
    document = types.Document(content=text,language=lang, type=enums.Document.Type.PLAIN_TEXT)

    # Detects the sentiment of the text
    # sentiment = client.analyze_sentiment(document=document).document_sentiment
    analysis=client.analyze_syntax(document=document)


    # analysisJSON = MessageToJson(analysis)
    analysisDICT = MessageToDict(analysis)
    print(analysisDICT)
    tokens=analysisDICT['tokens']
    dict={}
    for token in tokens:
        dict.update({token['text']['content']:token['partOfSpeech']['tag']})
    print(dict)
    return dict

def detect_language(text):
    """Detects the text's language."""
    translate_client = translate.Client()

    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    result = translate_client.detect_language(text)

    print('Printing detection response')
    print('Text: {}'.format(text))
    print('Confidence: {}'.format(result['confidence']))
    print('Language: {}'.format(result['language']))

    return result['language']


def entity_analyzer(text):
    """Detects entities in the text."""
    client = language.LanguageServiceClient()

    if isinstance(text, six.binary_type):
        text = text.decode('utf-8')

    # Instantiates a plain text document.
    document = types.Document(
        content=text,
        type=enums.Document.Type.PLAIN_TEXT)

    # Detects entities in the document. You can also analyze HTML with:
    #   document.type == enums.Document.Type.HTML
    entities = client.analyze_entities(document).entities

    # entity types from enums.Entity.Type
    entity_type = ('UNKNOWN', 'PERSON', 'LOCATION', 'ORGANIZATION',
                   'EVENT', 'WORK_OF_ART', 'CONSUMER_GOOD', 'OTHER')

    for entity in entities:
        print('=' * 20)
        print(u'{:<16}: {}'.format('name', entity.name))
        print(u'{:<16}: {}'.format('type', entity_type[entity.type]))
        print(u'{:<16}: {}'.format('metadata', entity.metadata))
        print(u'{:<16}: {}'.format('salience', entity.salience))
        print(u'{:<16}: {}'.format('wikipedia_url',
              entity.metadata.get('wikipedia_url', '-')))

    return entities
