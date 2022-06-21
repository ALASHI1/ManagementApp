from rest_framework import serializers
from api.models import Notes

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ('id','user', 'body', 'created_at', 'updated_at')