from . import views
from django.conf.urls import url

urlpatterns=[
    url(r'makegif/(?P<src_text>.*)/(?P<src_lang>[a-z]{2})',views.makegif,name='makegif'),
]
