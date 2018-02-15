import requests
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse

# Create your views here.
def index(request):
    json={'render':'index.html'}
    return JsonResponse(json)

def main(request,lang='en'):

    # API calling method

    # sending get request to SpeechToText
    URL='/totext/{}/{}'.format(lang,lang)
    src_txt = requests.get(url = URL)

    # sending get request to TextProcessor
    URL1='/textprocessor/analyse/{}/{}'.format(src_txt,src_lang)
    src_analysis=request.get(url=URL1)

    # sending get request to TextToSign
    URL='tosign/makegif/{}/{}/{}'.format(src_txt,lang,src_analysis)
    gifResponse=requets.get(url=URL)

    response={'text':src_txt,'gifResponse':gifResponse}
    return JsonResponse(response)

def main(request,src_lang='en',trgt_lang='en'):

    # API calling method

    # sending get request to SpeechToText
    URL='/totext/{}/{}'.format(lang,lang)
    src_txt = requests.get(url = URL)

    # sending get request to TextProcessor
    URL1='/textprocessor/translate/{}/{}'.format(src_txt,trgt_lang)
    trgt_txt=request.get(url=URL1)
    URL2='/textprocessor/analyse/{}/{}'.format(trgt_txt,src_lang)
    trgt_analysis=request.get(url=URL2)

    # sending get request to TextToSign
    URL='tosign/makegif/{}/{}/{}'.format(trgt_txt,lang,src_analysis)
    gifResponse=requets.get(url=URL)

    response={'src_txt':src_txt,'trgt_txt':trgt_txt,'gifResponse':gifResponse}
    return JsonResponse(response)
