import uuid
from django.shortcuts import render
from django.views import View
import json
from .serializers import InvoiceSerializer, UserSerializer, ItemSerializer
from django.http import JsonResponse, HttpResponseBadRequest
from .data import users, invoices

# Create your views here.


class Register(View):
    def post(self, request):
        data = json.loads(request.body)
        for user in users:
            if user["email"] == data["email"]:
                return JsonResponse(
                    "Email is already registered, please try with another email",
                    safe=False,
                    status=400,
                )
        data["user_id"] = len(users) + 1
        serialized_data = UserSerializer(data=data)
        if serialized_data.is_valid():
            users.append(serialized_data.data)
            return JsonResponse("Registration Successful", safe=False, status=201)
        return JsonResponse("Registration Failed,Try Again", safe=False, status=400)


class Login(View):
    def post(self, request):
        data = json.loads(request.body)
        for user in users:
            if user["email"] == data["email"] and user["password"] == data["password"]:
                user_uuid = uuid.uuid4()
                # user["uuid"] = user_uuid
                # {"message":"login successful,"token":"uuid"}
                return JsonResponse(
                    {"message": "Login Successful", "token": user_uuid}, status=200
                )
        return JsonResponse(
            "Login Failed, Please provide valid credentials", safe=False, status=400
        )


class GetAllInvoices(View):
    def get(self, request):
        serialized_invoice = InvoiceSerializer(invoices, many=True)
        return JsonResponse(serialized_invoice.data, safe=False)


class AddInvoice(View):
    def post(self, request):
        invoice_data = json.loads(request.body)
        invoice_data["invoice_id"] = len(invoices) + 1
        invoice_serializer = InvoiceSerializer(data=invoice_data)
        if invoice_serializer.is_valid():
            invoices.append(invoice_serializer.data)
            return JsonResponse(invoice_serializer.data, safe=False, status=201)
        else:
            return HttpResponseBadRequest()


class GetSingleInvoice(View):
    def get(self, request, invoice_id):
        for invoice in invoices:
            if invoice["invoice_id"] == invoice_id:
                invoice_serializer = InvoiceSerializer(invoice)
                return JsonResponse(invoice_serializer.data, safe=False)
        return JsonResponse({"message": "Invoice not found"}, status=404)


class InvoiceAddItem(View):
    def post(self, request, invoice_id):
        item = json.loads(request.body)
        item["invoice_id"] = invoice_id
        for invoice in invoices:
            if invoice["invoice_id"] == invoice_id:
                item["item_id"] = len(invoice["items"]) + 1
                serialized_item = ItemSerializer(data=item)
                if serialized_item.is_valid():
                    invoice["items"].append(serialized_item.data)
                    return JsonResponse(serialized_item.data, status=200)
        return HttpResponseBadRequest()
