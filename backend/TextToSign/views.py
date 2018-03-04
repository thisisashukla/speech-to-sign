import requests
from django.shortcuts import render
from azure.storage.blob import BlockBlobService
from SpeechToSign.subscriptionKeys import getKey
import urllib
from struct import pack
from Application.models import Blob

base_bingImageSearch_url='https://api.cognitive.microsoft.com/bing/v7.0/images/search'
base_Blob_url=getKey('BASE_BLOB_URL')

# Create your views here.
def getGifURLs(tokens,tokenLabels, trgt_analysis, entity_analysis):

    # blobList=getBlobList()

    signURLs=[]

    for t,l in zip(tokens, tokenLabels):
        full_name=t+'.gif'
        exists=Blob.objects.filter(blob_name=full_name.lower()).exists()
        if(exists):
            signURLs.append(base_Blob_url+full_name.lower())
        elif(l=='ENTITY' and not exists):
            signURLs.append(entity_analysis[t]['metadata'])

    print('urls',signURLs)
    return signURLs


def getBlobList():
    print('getting blobs')
    block_blob_service = BlockBlobService(account_name='gifdata', account_key=getKey('MS_Storage'))
    generator = block_blob_service.list_blobs('gifbucket')
    list=[]

    for blob in generator:
        list.append(blob.name)

    # print(list)
    return list


def getEntityImageURL(entity):

    subscription_key=getKey('MS_ImageSearch')
    headers = {"Ocp-Apim-Subscription-Key" : subscription_key}
    params  = {"q": entity, "license": "public", "imageType": "photo", "count": 2, "offset": 0, "safeSearch": "strict", "h":720, "w":720}
    response = requests.get(base_bingImageSearch_url, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()
    # print('entity bing search result', search_results)
    thumbnail_url=urlValue(search_results)

    result={'entity':entity, 'URL':thumbnail_url}

    return result

def urlValue(search_results):
    thumbnailUrl=''
    try:
        print('relatedSearch')
        thumbnailUrl= search_results['relatedSearches'][0]['thumbnail']['thumbnailUrl']
    except:
        print('relatedSearch dint work')
    try:
        print('pivot search')
        most_relevant=search_results['pivotSuggestions'][0]
        thumbnailUrl= most_relevant['suggestions'][0]['thumbnail']['thumbnailUrl']
    except:
        print('pivot search dint work')
    try:
        print('query Expansion')
        thumbnailUrl= search_results['queryExpansions'][0]['thumbnail']['thumbnailUrl']
    except:
        print('query Expansion dint work')

    return thumbnailUrl
