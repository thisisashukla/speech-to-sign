from . import views
from django.conf.urls import url

urlpatterns=[
    url(r'translate/(?P<src_text>.*)/(?P<trgt_lang>[a-z]{2})',views.text_translate,name='text_translate'),
    url(r'analyse/(?P<src_text>.*)/(?P<src_lang>[a-z]{2})',views.analyse,name='analyse'),
    url(r'(?P<src_text>.*)',views.detect_language,name='detect_language'),
]
