from django.urls import path

from .view import (
    BirthdayListView,
    BirthdayDetailView,
    BirthdayCreateView,
    BirthdayDeleteView,
    BirthdayUpdateView,
)

urlpatterns = [
    path('', BirthdayListView.as_view()),
    path('add/',BirthdayCreateView.as_view()),
    path('<pk>', BirthdayDetailView.as_view()),
    path('<pk>/update/', BirthdayUpdateView.as_view()),
    path('<pk>/delete/', BirthdayDeleteView.as_view()),
]
