from . import views
from django.conf.urls import url

urlpatterns = [
    url(r'(?P<src_lang>[a-z]{2})/(?P<trgt_lang>[a-z]{2}$)',
        views.textHandler, name='textHandler'),
    url(r'bulkAdd', views.bulk_update, name='blob add'),
]
