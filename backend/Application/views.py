import sys
import requests
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse

sys.path.append('../')
from SpeechToText.views import toText
from TextProcessor.views import analyse, text_translate, entity_analyzer
from TextToSign.views import getGifs
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def textHandler(request,src_lang='en',trgt_lang='en'):

    raw_txt=request.body.decode("utf-8")
    tokens=raw_txt.split('=')[1].split('%2B')
    print(tokens)
    trgt_txt=None
    src_txt=' '.join(tokens)
    if(src_lang!=trgt_lang):
        trgt_txt=text_translate(src_txt, src_lang, trgt_lang)
        print('successful translation')
    else:
        trgt_txt=src_txt

    trgt_analysis=analyse(trgt_txt, trgt_lang)
    entity_analysis=entity_analyzer(trgt_txt)
    print('print',trgt_analysis, entity_analysis)

    gifs=getGifs(tokens,trgt_analysis,entity_analysis,trgt_lang)

    response={'src_txt':src_txt,'trgt_txt':trgt_txt, 'gif_array': gifs, 'anaysis':trgt_analysis}
    return JsonResponse(response, safe=False)

def textToSign(analysis, trgt_lang='en'):

    # API calling method

    # analysing converted trgt_txt
    trgt_analysis=analyse(request.trgt_txt, trgt_lang)

    # converting to sign
    gifResponse=makegif(request.trgt_txt,trgt_analysis,trgt_lang)

    response={'trgt_txt': request.trgt_txt, 'gif': gifResponse}
    return JsonResponse(response, safe=False)
