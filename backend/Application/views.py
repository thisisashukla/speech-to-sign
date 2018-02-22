import sys
import requests
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse

sys.path.append('../')
from SpeechToText.views import toText
from TextProcessor.views import analyse, text_translate
from TextToSign.views import makegif

# Create your views here.
def index(request):
    json={'render':'index.html'}
    return JsonResponse(json)

# def main(request,lang='en'):
#
#     # API calling method
#
#     # getting src_txt transcription
#     src_txt = toText(request.speech, lang, lang)
#
#     # processing text
#     src_analysis=analyse(src_txt, lang)
#
#     # converting to sign
#     gifResponse=makegif(src_txt, src_analysis, lang)
#
#     response={'text':src_txt,'gifResponse':gifResponse}
#     return JsonResponse(response)

def speechToText(request,src_lang='en',trgt_lang='en'):
    print('hello')
    # API calling method

    # getting src_txt transcription
    src_txt = toText(request.speech, src_lang)

    # processing text
    if(src_lang!=trgt_lang):
        trgt_txt=text_translate(src_txt, src_lang, trgt_lang)
    else:
        trgt_txt=src_txt

    # # converting to sign
    # gifResponse=makegif(trgt_txt,trgt_analysis,trgt_lang)
    #
    response={'src_txt':src_txt,'trgt_txt':trgt_txt}
    return JsonResponse(response)

def textToSign(request, trgt_lang='en'):

    # API calling method

    # analysing converted trgt_txt
    trgt_analysis=analyse(request.trgt_txt, trgt_lang)

    # converting to sign
    gifResponse=makegif(request.trgt_txt,trgt_analysis,trgt_lang)

    response={'trgt_txt': request.trgt_txt, 'gif': gifResponse}
    return JsonResponse(response)
