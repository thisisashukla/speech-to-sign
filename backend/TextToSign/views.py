import requests
from django.shortcuts import render
from azure.storage.blob import BlockBlobService
# Create your views here.
def getGifs(tokens,analysis,entity_analysis,lang):
    # print('hello')

    # signList=getBlobList()
    signURLs=[]

    # for word in tokens:

    return signURLs


def getBlobList():
    block_blob_service = BlockBlobService(account_name='gifData', account_key='tXcPC2c26DsOIfrlVCLTpcEA8Jkr0VIcqYkIoTAjhifwwobDuRPrUtlwquJ0Tg55KhqmPuAcBKZO60xXuri8jg==/w+zyIZLd2F/d/BJw4OLxzbMl0Z5g4g4YSg0m1lNqd41cOgJa7F7iPdf0LnyUDA==')
    generator = block_blob_service.list_blobs('gifbucket')
    list=[]
    for blob in generator:
        list.append(blob.split('.')[0])

    print(list)
    return list


def getEntityImageURL(entity):
    URL='https://api.cognitive.microsoft.com/bing/v7.0/images/search'
    subscription_key='5fae96554fda4fec9918c59af4201707'
    headers = {"Ocp-Apim-Subscription-Key" : subscription_key}
    params  = {"q": entity, "license": "public", "imageType": "photo"}
    response = requests.get(URL, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()
    most_relevant=search_results['relatedSearches'][0]
    thumbnail_url=most_relevant['thumbnail']['thumbnailUrl']
    result={'entity':entity, 'URL':thumbnail_url}

    return result
