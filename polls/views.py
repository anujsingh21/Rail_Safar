from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import speech_recognition as sr


def index(request):
    return render(request,'index.html')

def user(request):
    return render(request,'user.html')

def admin(request):
    return render(request,'admin.html')

def speech_to_text(request):
    if request.method == 'POST':
        try:
            audio_data = request.body
            r = sr.Recognizer()
            with sr.AudioData(audio_data) as source:
                audio = r.record(source)
                text = r.recognize_google(audio)
                return JsonResponse({'text': text})
        except Exception as e:
            return JsonResponse({'error': str(e)})
    else:
        return JsonResponse({'error': 'Invalid request method'})


