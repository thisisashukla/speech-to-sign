import six
import spacy
from google.cloud import language
from google.cloud import translate
from django.shortcuts import render
from Application.models import Blob
from spacy.matcher import PhraseMatcher
from django.http import HttpResponse, JsonResponse
from google.cloud.language import enums as enums
from google.cloud.language import types as types
from SpeechToSign.subscriptionKeys import setKey, getKey
from TextToSign.views import getEntityImageURL, getBlobList
from google.protobuf.json_format import MessageToJson, MessageToDict

base_Blob_url = getKey('BASE_BLOB_URL')

# method for text translation using googel api


def text_translate(text, trgt_lang):
    setKey()
    translate_client = translate.Client()

    if isinstance(text, six.binary_type):
        text = text.decode('utf-8')

    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    result = translate_client.translate(text, target_language=trgt_lang)

    # print('Printing translation responses')
    # print(u'Text: {}'.format(result['input']))
    # print(u'Translation: {}'.format(result['translatedText'].encode("utf-8")))
    # print(u'Detected source language: {}'.format(result['detectedSourceLanguage']))

    return result['translatedText']

# method for analysing text and generating POS tags


def analyse(text, lang):
    setKey()
    # Instantiates a client
    client = language.LanguageServiceClient()

    # The text to analyze
    # text = u'Hello, world!'
    document = types.Document(
        content=text, language=lang, type=enums.Document.Type.PLAIN_TEXT)

    # Detects the sentiment of the text
    # sentiment = client.analyze_sentiment(document=document).document_sentiment
    analysis = client.analyze_syntax(document=document)

    # analysisJSON = MessageToJson(analysis)
    analysisDICT = MessageToDict(analysis)
    print(analysisDICT)
    # print(analysisDICT)
    tokens = analysisDICT['tokens']
    list = []
    for token in tokens:
        # print(token['text']['content'],token['partOfSpeech']['tag'])
        list.append((token['text']['content'], token['partOfSpeech']['tag']))

    return list

# method to detect language


def detect_language(text):
    setKey()
    """Detects the text's language."""
    translate_client = translate.Client()

    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    result = translate_client.detect_language(text)

    # print('Printing detection response')
    # print('Text: {}'.format(text))
    # print('Confidence: {}'.format(result['confidence']))
    # print('Language: {}'.format(result['language']))

    return result['language']

# method to identify entities in the given text


def entity_analyzer(text):
    setKey()
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
                   'EVENT', 'WORK_OF_ART', 'CONSUMER_GOOD', 'OTHER', 'FOOD')

    result = {}
    entityNames = []
    for entity in entities:
        print('=' * 20)
        print(u'{:<16}: {}'.format('name', entity.name))
        # print(u'{:<16}: {}'.format('metadata', entity.metadata))
        # print(u'{:<16}: {}'.format('type', entity_type[entity.type]))
        # print(u'{:<16}: {}'.format('salience', entity.salience))
        # print(u'{:<16}: {}'.format('wikipedia_url',
        #       entity.metadata.get('wikipedia_url', '-')))
        full_name = entity.name + '.gif'
        # metadata=entity.metadata.get('wikipedia_url', '-')
        # if entity.name+'.gif' not in blobList:
        #     metadata=getEntityImageURL(entity.name)['URL']
        # else:
        #     metadata=base_Blob_url+'/'+entity.name+'.gif'
        if not Blob.objects.filter(blob_name=full_name.lower()).exists():
            metadata = getEntityImageURL(entity.name)['URL']
        else:
            metadata = base_Blob_url + '/' + full_name.lower()

        entityNames.append(entity.name)
        result.update(
            {entity.name: {'type': entity_type[entity.type], 'metadata': metadata}})

    return result, entityNames

# method to tokenize text keeping entities intact


def entityTokenizer(txt, entities, analysis):
    nlp = spacy.load('en')
    matcher = PhraseMatcher(nlp.vocab)
    terminology_list = entities
    patterns = [nlp(text) for text in terminology_list]
    matcher.add('TerminologyList', None, *patterns)
    simpleTokens = txt.split(' ')
    doc = nlp(txt)
    matches = matcher(doc)
    # print(matches)

    for match in reversed(matches):
        temp = ' '.join(simpleTokens[match[1]:match[2]])
        del simpleTokens[match[1]:match[2]]
        del analysis[match[1]:match[2]]
        simpleTokens.insert(match[1], temp)
        analysis.insert(match[1], (temp, 'ENTITY'))

    # print(analysis)
    return analysis
