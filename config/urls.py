from django.contrib import admin
from django.conf import settings
from django.urls import include, path
from flashcards import views

urlpatterns = [
    path('', views.home),
    path('admin/', admin.site.urls),
    path('accounts/', include('registration.backends.simple.urls')),
    path('deck/', views.deck_page),
    path('deck/add/', views.add_deck),
    path('deck/card/', views.add_card),
    path('details/<int:pk>/', views.deck_details, name='deck-details'),
    path('details/<int:pk>/quiz/', views.quiz_me),
    path('details/<int:pk>/quiz/cards/', views.quiz_cards),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),

        # For django versions before 2.0:
        # url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
