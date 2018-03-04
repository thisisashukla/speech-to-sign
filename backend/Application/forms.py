from django.forms import ModelForm
from django import forms
from Application.models import Blob

class Blob_Form(ModelForm):
    class Meta:
        model = Blob
        fields = ['blob_name', 'blob_url']
