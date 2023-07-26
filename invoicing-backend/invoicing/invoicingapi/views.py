import json
from .serializers import (
    InvoiceSerializer,
    LoginSerializer,
    UserSerializer,
    ItemSerializer,
)
from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import *


# Create your views here.


class Register(APIView):
    def post(self, request):
        data = json.loads(request.body)
        exist_user = User.objects.filter(username=data["username"]).first()
        if not exist_user:
            serialized = UserSerializer(data=data)
            if serialized.is_valid():
                user = serialized.save()
                return JsonResponse(
                    {"msg": "Registration Successful"}, status=status.HTTP_201_CREATED
                )
            return JsonResponse(
                {"msg": "Registration Failed"}, status=status.HTTP_400_BAD_REQUEST
            )
        return JsonResponse({"msg": "user is already exist"}, status=status.HTTP_200_OK)


class Login(APIView):
    def post(self, request):
        data = json.loads(request.body)
        serialized = LoginSerializer(data=data)
        if serialized.is_valid():
            user = serialized.validated_data
            refresh = RefreshToken.for_user(user)
            return JsonResponse(
                {"msg": "Login Successful", "token": str(refresh.access_token)},
                status=status.HTTP_200_OK,
            )
        return JsonResponse(
            {"msg": "Login failed. Try again"}, status=status.HTTP_401_UNAUTHORIZED
        )


class GetAllInvoices(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        invoices = Invoice.objects.all()
        serialized_invoice = InvoiceSerializer(invoices, many=True)
        return JsonResponse(
            serialized_invoice.data, safe=False, status=status.HTTP_200_OK
        )


class AddInvoice(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        invoice_data = json.loads(request.body)
        invoice_data["user"] = request.user.id
        invoice_serializer = InvoiceSerializer(data=invoice_data)
        try:
            if invoice_serializer.is_valid():
                # Invoice.objects.create(**invoice_data)
                invoice_serializer.save()
                return JsonResponse(
                    invoice_serializer.data, safe=False, status=status.HTTP_201_CREATED
                )
            return JsonResponse(
                invoice_serializer.errors,
                safe=False,
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return HttpResponseBadRequest(str(e))


class GetSingleInvoice(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, invoice_id):
        invoice = Invoice.objects.filter(invoice_id=invoice_id).first()
        if invoice:
            invoice_serializer = InvoiceSerializer(invoice)
            return JsonResponse(
                invoice_serializer.data, safe=False, status=status.HTTP_200_OK
            )
        return JsonResponse(
            {"message": "Invoice not found"}, status=status.HTTP_404_NOT_FOUND
        )


class InvoiceAddItem(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, invoice_id):
        invoice = Invoice.objects.filter(invoice_id=invoice_id).first()
        try:
            if invoice:
                item = json.loads(request.body)
                item["invoice"] = invoice_id
                serialized_item = ItemSerializer(data=item)
                if serialized_item.is_valid():
                    # Item.objects.create(**item)
                    serialized_item.save()
                    return JsonResponse(
                        serialized_item.data, status=status.HTTP_201_CREATED
                    )
                return JsonResponse(
                    serialized_item.errors,
                    safe=False,
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            return HttpResponseBadRequest(str(e))
