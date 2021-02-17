from django.db import models

class Birthday(models.Model):
    name = models.CharField(max_length=100)
    dob = models.DateField()
    image = models.ImageField(upload_to = 'images/')

    def __str__(self):
        return self.name