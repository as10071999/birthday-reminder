from rest_framework import serializers
from birthdays.models import Birthday

class BirthdaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Birthday
        fields = ('id','name',"dob","image")