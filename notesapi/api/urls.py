from django.urls import path
from api import views
urlpatterns = [
    path('', views.Get_list.as_view() ),
    path('notes/', views.Get_notes.as_view() ),
    path('note/create/', views.Create_note.as_view() ),
    path('note/<str:id>/', views.Get_note.as_view() ),
    path('note/update/<str:id>/', views.Update_note.as_view() ),
    path('note/delete/<str:id>/', views.Delete_note.as_view() ),
]