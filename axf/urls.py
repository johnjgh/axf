from django.urls import path
from . import views
app_name = 'axf'
urlpatterns = [
    path('home/', views.home, name='home'),
    path('market/<str:categoryid>/<int:cid>/<int:sortid>/', views.market, name='market'),
    path('cart/', views.cart, name='cart'),
    path('changecart/<int:flag>/', views.changecart, name='changecart'),
    path('productpage/<int:productid>/', views.productpage, name='productpage'),
    path('mine/', views.mine, name='mine'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('checkuserid/', views.checkuserid, name = 'checkuserid'),
    path('quit/', views.quit, name='quit'),
    path('saveorder/', views.saveorder, name = 'saveorder'),
]