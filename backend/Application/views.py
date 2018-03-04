import sys
import json
import string
import requests
sys.path.append('../')
from django.shortcuts import render
from Application.models import Blob
from SpeechToText.views import toText
from TextToSign.views import getGifURLs
from Application.forms import Blob_Form
from TextToSign.views import getBlobList
from SpeechToSign.subscriptionKeys import getKey
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from TextProcessor.views import analyse, text_translate, entity_analyzer, entityTokenizer

base_Blob_url = getKey('BASE_BLOB_URL')


@csrf_exempt
def textHandler(request, src_lang='en', trgt_lang='en'):

    # extracting raw text and removing punctuation marks
    raw_txt = request.body.decode("utf-8").split('=')[1]
    for c in string.punctuation:
        raw_txt = raw_txt.replace(c, "")

    # tokenizing raw text into seperate worsd
    if '2B' in raw_txt:
        raw_tokens = raw_txt.split('2B')
    elif '20' in raw_txt:
        raw_tokens = raw_txt.split('20')

    # getting translation if needed
    trgt_txt = None
    src_txt = ' '.join(raw_tokens)
    if(src_lang != trgt_lang):
        trgt_txt = text_translate(src_txt, src_lang, trgt_lang)
    else:
        trgt_txt = src_txt

    # analysing text
    trgt_analysis = analyse(trgt_txt, trgt_lang)

    # identifying entities
    entity_analysis, entities = entity_analyzer(trgt_txt)

    # print('trgt_analysis',trgt_analysis)
    # print('entity_analysis', entity_analysis)
    # print('entities', entities)

    # tokenizing text keeping entities intact
    tuples = entityTokenizer(trgt_txt, entities, trgt_analysis)

    # print('tuples', tuples)
    # print('tokenLabels', tokenLabels)

    # getting GIF URLs
    gifs = getGifURLs(tuples, trgt_analysis, entity_analysis)

    response = {'gif_array': gifs}
    return JsonResponse(response, safe=False)


def blobAdder(request):

    if request.method == 'GET':

        return HttpResponse("nothing to get here")

    if request.method == 'POST':
        print('in post')
        blob_form = Blob_Form(request.POST)
        print(blob_form)
        print(blob_form.errors)
        if blob_form.is_valid():
            print('form data valid')
            blob_instance = blob_form.save(commit=False)

            blob_instance.blob_name = blob_form.cleaned_data['blob_name']
            print(blob_instance.blob_name)
            blob_instance.blob_url = blob_form.cleaned_data['blob_url']
            print(blob_instance.blob_url)

            blob_instance.save()
            print('saved data')
            return HttpResponse('Success.html')
        else:
            print('data invalid')
            return HttpResponse('Failure.html')


def bulk_update(request):
    insert_list = []
    for blob in getBlobList():
        insert_list.append(Blob(blob_name=blob, blob_url=base_Blob_url + blob))
    try:
        Blob.objects.bulk_create(insert_list)
        return HttpResponse('Success')
    except:
        return HttpResponse('error')
