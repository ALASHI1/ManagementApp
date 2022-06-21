from rest_framework.response import Response
from rest_framework.views import APIView
from api.models import Notes
from api.serializers import NotesSerializer
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView
from rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here.

class Get_list(APIView):
    def get(self, request):
        routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
        return Response(routes)
    
class Get_notes(ListAPIView):
    search_fields = ['body']
    serializer_class = NotesSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ('body',)
    def get_queryset(self):
        # omo = Notes.objects.filter(user=self.request.user).order_by('-updated_at')
        # print(omo)
        return Notes.objects.filter(user=self.request.user).order_by('-updated_at')

class Get_note(APIView):
    def get(self, request, id):
        notes = Notes.objects.get(id=id)
        serializer = NotesSerializer(notes,many=False)
        return Response(serializer.data)
    
class Create_note(APIView):
    serializer_class = NotesSerializer
    # authentication_classes = [JWTAuthentication]
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors)
    
    
class Update_note(APIView):
    serializer_class = NotesSerializer
    def put(self, request, id):
        data = request.data
        note = Notes.objects.get(id=id)
        serializer = NotesSerializer(instance=note,data=data)
        if serializer.is_valid():
            # if serializer.validated_data['body'] == "":
            #     note.delete()
            #     return Response({'message': 'Note deleted'})
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

class Delete_note(APIView):
    def delete(self, request, id):
        note = Notes.objects.get(id=id)
        note.delete()
        return Response('Note deleted')

