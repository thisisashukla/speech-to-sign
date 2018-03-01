import sys
import requests
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse

sys.path.append('../')
from SpeechToText.views import toText
from TextProcessor.views import analyse, text_translate
from TextToSign.views import makegif
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def textHandler(request,src_lang='en',trgt_lang='en'):
    # print('hello')
    # print(request.body)
    # print(request)
    # print(src_lang,trgt_lang)
    # src_txt=text.split('=')[1]
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
    print('print',trgt_analysis)

    # # converting to sign
    # gifResponse=makegif(trgt_txt,trgt_analysis,trgt_lang)
    #
    response={'src_txt':src_txt,'trgt_txt':trgt_txt}
    return JsonResponse(response, safe=False)

def textToSign(request, trgt_lang='en'):

    # API calling method

    # analysing converted trgt_txt
    trgt_analysis=analyse(request.trgt_txt, trgt_lang)

    # converting to sign
    gifResponse=makegif(request.trgt_txt,trgt_analysis,trgt_lang)

    response={'trgt_txt': request.trgt_txt, 'gif': gifResponse}
    return JsonResponse(response, safe=False)
