from . import views
from django.conf.urls import url

urlpatterns=[
    url(r'(?P<src_lang>^[a-z]{2})/(?P<trgt_lang>[a-z]{2})',views.toText,name='main'),
]
