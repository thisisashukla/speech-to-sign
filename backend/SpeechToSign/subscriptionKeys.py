import os

keys = {
    'MS_ImageSearch': 'YOUR-KEY-HERE',
    'MS_Storage': 'YOUR-KEY-HERE,
    'BASE_BLOB_URL': 'BUCKET-URL-HERE'
}

def getKey(API):
    return keys[API]


def setKey():
    JSONPath="CREDENTIAL-JSON-PATH"

    GOOGLE_APPLICATION_CREDENTIALS=None

    try:
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"]
    except:
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = JSONPath
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"]
