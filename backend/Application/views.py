import sys
import requests
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse

sys.path.append('../')
from SpeechToText.views import toText
from TextProcessor.views import analyse, text_translate
from TextToSign.views import makegif
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def textHandler(request,src_lang='en',trgt_lang='en'):
    print('hello')

    if(src_lang!=trgt_lang):
        trgt_txt=text_translate(request.body, src_lang, trgt_lang)
    else:
        trgt_txt=src_txt

    print('successful translation')
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
