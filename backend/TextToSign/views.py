import requests
from django.shortcuts import render
from azure.storage.blob import BlockBlobService
from SpeechToSign.subscriptionKeys import getKey
# Create your views here.
def getGifURLs(tokens,tokenLabels, entityLocs, trgt_analysis, entity_analysis):

    blobList=getBlobList()
    base_url=getKey('BASE_BLOB_URL')
    signURLs=[]

    for t,l in zip(tokens, tokenLabels):
        if(l!='ENTITY' and t+'.gif' in blobList):
            signURLs.append(base_url+t+'.gif')
        elif(l=='ENTITY'):
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
