from django.db import models


# Create your models here.
class User(models.Model):
    user_id = models.IntegerField()
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=300)
    password = models.CharField(max_length=20)


class Item(models.Model):
    desc = models.CharField(max_length=200)
    quantity = models.IntegerField()
    rate = models.DecimalField(max_digits=10, decimal_places=2)


class Invoice(models.Model):
    invoice_id = models.IntegerField()
    date = models.DateTimeField()
    client_name = models.CharField(max_length=200)
    items = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="items", blank=True, null=True)
