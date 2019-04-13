from django.shortcuts import render,redirect
from .models import Wheel,Nav,Mustbuy,Shop,MainShow,FoodTypes,Goods,User,Cart,Order
from django.http import JsonResponse
import time,random,os
from django.conf import settings
from django.contrib.auth import logout
from .forms.login import LoginForm

# Create your views here.
def home(request):
    wheelsList = Wheel.objects.all()
    navList = Nav.objects.all()
    mustbuyList = Mustbuy.objects.all()
    shopList = Shop.objects.all()
    shop1 = shopList[0]
    shop2 = shopList[1:3]
    shop3 = shopList[3:7]
    shop4 = shopList[7:]
    mainList = MainShow.objects.all()
    return render(request, 'axf/home.html', {'title':'主页','wheelsList':wheelsList,'navList':navList,'mustbuyList':mustbuyList,'shop1':shop1,'shop2':shop2,'shop3':shop3,'shop4':shop4,'mainList':mainList})

def market(request, categoryid, cid, sortid):
    leftSlider = FoodTypes.objects.all()
    if not cid:
        if categoryid == '104749':
            productList = Goods.objects.filter(is_sellwell=True)
        else:
            productList = Goods.objects.filter(categoryid=categoryid)
    else:
        if categoryid == '104749':
            productList = Goods.objects.filter(is_sellwell=True, childcid=cid)
        else:
            productList = Goods.objects.filter(categoryid=categoryid, childcid=cid)

    ordername = '综合排序'
    if sortid == 1:
        ordername = '销量排序'
        productList = productList.order_by('productnum')
    elif sortid == 2:
        ordername = '价格最低'
        productList = productList.order_by('price')
    elif sortid == 3:
        ordername = '价格最高'
        productList = productList.order_by('-price')
    group = leftSlider.get(typeid=categoryid)
    arr1 = group.childtypenames.split('#')
    childList=[]
    categoryname = '全部分类'
    for each in arr1:
        arr2 = each.split(':')
        if int(arr2[1]) == cid:
            categoryname = arr2[0]
        obj = {'childName':arr2[0], 'childId':arr2[1]}
        childList.append(obj)

    cartlist = []
    token = request.session.get('token')
    if token:
        user = User.objects.get(userToken=token)
        cartlist = Cart.objects.filter(userAccount=user.userAccount)
    for p in productList:
        for c in cartlist:
            if c.productid == p.productid:
                p.num = c.productnum
                print(p.num)
                continue
    return render(request, 'axf/market.html', {'title':'闪送超市','leftSlider':leftSlider, 'productList':productList, 'childList':childList, 'categoryid':categoryid, 'cid':cid, 'categoryname':categoryname, 'ordername':ordername,'cartlist':cartlist})

def cart(request):
    cartslist = []
    choseflag = ' '
    token = request.session.get('token')
    tprice = 0
    if token:
        user = User.objects.get(userToken=token)
        cartslist = Cart.objects.filter(userAccount=user.userAccount)
        for each in cartslist.filter(isChose=True):
            tprice += float(each.productprice)
        if cartslist.count() == cartslist.filter(isChose=True).count():
            choseflag = '√'
    return render(request, 'axf/cart.html', {'title':'购物车','cartslist':cartslist,'tprice':('%.2f'%tprice),'choseflag':choseflag})


def changecart(request,flag):
    message = {}
    token = request.session.get('token')
    if token == None:
        return JsonResponse({'data':-1, 'status':'error'})
    try:
        productid = request.POST.get('productid')
        product = Goods.objects.get(productid=productid)
    except Goods.DoesNotExist:
        pass
    user = User.objects.get(userToken=token)
    carts = Cart.objects.filter(userAccount=user.userAccount)
    if flag == 0:
        if product.storenums == 0:
            message = {'data':-2,'status':'error'}
        else:
            try:
                c = carts.get(productid=productid)
                c.productnum += 1
                c.productprice = '%.2f'%(float(product.price) * c.productnum)
                c.save()
            except Cart.DoesNotExist as e:
                c = Cart.createcart(user.userAccount, productid, 1, product.price, True, product.productimg,product.productlongname, False)
                c.save()
            product.storenums -= 1
            product.save()
            message = {'data':c.productnum, 'price':c.productprice, 'status':'success'}
    elif flag == 1:
        try:
            c = carts.get(productid=productid)
            c.productnum -= 1
            c.productprice = '%.2f' % (float(product.price) * c.productnum)
            if c.productnum == 0:
                c.delete()
            else:
                c.save()
            product.storenums += 1
            product.save()
            message = {'data': c.productnum, 'price': c.productprice, 'status': 'success'}
        except Cart.DoesNotExist as e:
            message = {'data': -2, 'status': 'error'}
    elif flag == 2:
        c = carts.get(productid=productid)
        c.isChose = not c.isChose
        c.save()
        str = ''
        if c.isChose:
            str = '√'
        message = {'data':str, 'status':'success'}
    elif flag == 3:
        if request.POST.get('chose') == '√':
            for i in carts:
                i.isChose = False
                i.save()
            string = ''
        else:
            for j in carts.filter(isChose=False):
                j.isChose = True
                j.save()
            string = '√'
        message = {'data':string, 'status':'success'}
    tprice = 0
    for each in carts.filter(isChose=True):
        tprice += float(each.productprice)
    message['totalprice'] = '%.2f' % tprice
    message['allchose'] = ''
    if carts.count() == carts.filter(isChose=True).count():
        message['allchose'] = '√'
    print(message)
    return JsonResponse(message)


def mine(request):
    username = request.session.get('username', '未登录')
    return render(request, 'axf/mine.html', {'title':'我的', 'username':username})


def login(request):
    if request.method == 'POST':
        f = LoginForm(request.POST)
        if f.is_valid():
            userid = f.cleaned_data['username']
            pswd = f.cleaned_data['passwd']
            try:
                user = User.objects.get(userAccount=userid)
                if user.userPasswd != pswd:
                    return redirect('/login/')
            except User.DoesNotExist as e:
                return redirect('/login/')
            user.userToken = str(time.time() + random.randrange(1, 100000))
            user.save()
            request.session['username'] = user.userName
            request.session['token'] = user.userToken
            return redirect('/mine/')
        else:
            return render(request, 'axf/login.html', {'title':'登陆', 'form':f, 'error':f.errors})
    else:
        f = LoginForm()
        return render(request, 'axf/login.html', {'title':'登陆', 'form':f})


def register(request):
    if request.method == 'POST':
        userAccount = request.POST.get('userAccount')
        userPasswd = request.POST.get('userPasswd')
        userName = request.POST.get('userName')
        userPhone = request.POST.get('userPhone')
        userAdderss = request.POST.get('userAdderss')
        userRank = 0
        userToken = str(time.time() + random.randrange(1, 100000))
        f = request.FILES['userImg']
        userImg = os.path.join(settings.MEDIA_ROOT, userAccount + '.png')
        with open(userImg, 'wb') as fp:
            for data in f.chunks():
                fp.write(data)
        user = User.createuser(userAccount,userPasswd,userName,userPhone,userAdderss,userImg,userRank,userToken)
        user.save()
        request.session['username'] = userName
        request.session['token'] = userToken
        return redirect('/mine/')
    else:
        return render(request, 'axf/register.html', {'title':'注册'})

def quit(request):
    logout(request)
    return redirect('/mine/')

def checkuserid(request):
    userid = request.POST.get('userid')
    try:
        user = User.objects.get(userAccount = userid)
        return JsonResponse({'data':'该用户名已经被注册', 'status':'error'})
    except User.DoesNotExist as e:
        return JsonResponse({'data':'可以注册', 'status':'success'})

def saveorder(request):
    token = request.session.get('token')
    if not token:
        return JsonResponse({'data':-1, 'status':'error'})
    user = User.objects.get(userToken=token)
    carts = Cart.objects.filter(isChose=True, userAccount=user.userAccount)
    if not carts.count():
        return JsonResponse({'data':-1, 'status':'error'})
    oid = time.time() + random.randrange(1, 10000)
    oid = "%d" % oid
    o = Order.createorder(oid, user.userAccount, 0)
    o.save()
    for item in carts:
        item.isDelete = True
        item.orderid = oid
        item.save()
    return JsonResponse({'status': 'success'})