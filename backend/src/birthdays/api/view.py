from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView,
)
from birthdays.models import Birthday
from .serializers import BirthdaySerializer


class BirthdayListView(ListAPIView):
    queryset = Birthday.objects.all()
    serializer_class = BirthdaySerializer


class BirthdayDetailView(RetrieveAPIView):
    queryset = Birthday.objects.all()
    serializer_class = BirthdaySerializer

class BirthdayCreateView(CreateAPIView):
    queryset = Birthday.objects.all()
    serializer_class = BirthdaySerializer

class BirthdayUpdateView(UpdateAPIView):
    queryset = Birthday.objects.all()
    serializer_class = BirthdaySerializer

class BirthdayDeleteView(DestroyAPIView):
    queryset = Birthday.objects.all()
    serializer_class = BirthdaySerializer

