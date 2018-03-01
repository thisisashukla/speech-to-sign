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
