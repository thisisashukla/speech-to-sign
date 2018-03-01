import requests
from django.shortcuts import render
from azure.storage.blob import BlockBlobService
from SpeechToSign.subscriptionKeys import getKey
# Create your views here.
def getGifs(tokens,trgt_analysis,entity_analysis,entityLocs, tokenLabels):
    # print('hello')

    # signList=getBlobList()
    signURLs=[]

    # for word in tokens:

    return signURLs


def getBlobList():
    block_blob_service = BlockBlobService(account_name='gifData', account_key=getKey('MS_Storage'))
    generator = block_blob_service.list_blobs('gifbucket')
    list=[]
    for blob in generator:
        list.append(blob.split('.')[0])

    print(list)
    return list


def getEntityImageURL(entity):
    URL='https://api.cognitive.microsoft.com/bing/v7.0/images/search'
    subscription_key=getKey('MS_ImageSearch')
    headers = {"Ocp-Apim-Subscription-Key" : subscription_key}
    params  = {"q": entity, "license": "public", "imageType": "photo"}
    response = requests.get(URL, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()
    most_relevant=search_results['relatedSearches'][0]
    thumbnail_url=most_relevant['thumbnail']['thumbnailUrl']
    result={'entity':entity, 'URL':thumbnail_url}

    return result
