from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


# Create your models here.
# class User(models.Model):
#     user_id = models.IntegerField()
#     name = models.CharField(max_length=200)
#     email = models.EmailField(max_length=300)
#     password = models.CharField(max_length=20)


class UserManager(BaseUserManager):
    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError("username should be provided")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(username, password, **extra_fields)


class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    password = models.CharField(max_length=20)
    username = models.CharField(max_length=200, unique=True)

    USERNAME_FIELD = "username"
    objects = UserManager()


class Invoice(models.Model):
    invoice_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="invoices")
    date = models.DateTimeField()
    client_name = models.CharField(max_length=200)


class Item(models.Model):
    item_id = models.AutoField(primary_key=True)
    invoice = models.ForeignKey(
        Invoice, on_delete=models.CASCADE, related_name="items", blank=True, null=True
    )
    desc = models.CharField(max_length=200)
    quantity = models.IntegerField()
    rate = models.DecimalField(max_digits=10, decimal_places=2)
