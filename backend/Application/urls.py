from . import views
from django.conf.urls import url

urlpatterns=[
    url(r'^',views.index,name='index'),
    url(r'(?P<lang>^[a-z]{2})',views.main,name='main1'),
    url(r'(?P<src_lang>^[a-z]{2})/(?P<trgt_lang>[a-z]{2})',views.main,name='main2'),
]
