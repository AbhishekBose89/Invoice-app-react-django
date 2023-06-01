from django.urls import path
from .views import *
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path("users/register/", csrf_exempt(Register.as_view()), name="user_register"),
    path("users/login/", csrf_exempt(Login.as_view()), name="user_login"),
    path("invoices/", GetAllInvoices.as_view(), name="get_all_invoices"),
    path("invoices/new/", csrf_exempt(AddInvoice.as_view()), name="add_new_invoice"),
    path(
        "invoices/<int:invoice_id>/",
        GetSingleInvoice.as_view(),
        name="get_single_invoice",
    ),
    path(
        "invoices/<int:invoice_id>/items/",
        csrf_exempt(InvoiceAddItem.as_view()),
        name="invoice_item_add",
    ),
]
