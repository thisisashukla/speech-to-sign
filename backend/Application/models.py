from django.db import models

# Create your models here.
class Blob(models.Model):
    id = models.AutoField(primary_key=True)
    blob_name=models.CharField(max_length=50, unique=True)
    blob_url =  models.URLField(max_length=200, blank=False)

    REQUIRED_FIELDS = ['blob_name','blob_url']
