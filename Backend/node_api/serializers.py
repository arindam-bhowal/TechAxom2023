from rest_framework import serializers
from node_api.models import NoteModel, CertificateModel


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteModel
        fields = '__all__'

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificateModel
        fields = '__all__'