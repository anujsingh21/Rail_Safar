from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('user/', views.user, name='user'),
    path('admin/', views.admin, name='admin'),
    path('speech-to-text/',views.speech_to_text,name='speech_to_text')
]