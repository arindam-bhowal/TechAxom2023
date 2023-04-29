from django.urls import path
from node_api.views import Notes, NoteDetail, Certificate, CertificateDetail

urlpatterns = [
    path('', Notes.as_view()),
    path('cert/', Certificate.as_view()),
    path('<str:pk>', NoteDetail.as_view()),
    path('cert/<str:pk>', CertificateDetail.as_view())
]