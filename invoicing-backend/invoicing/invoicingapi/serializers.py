from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Invoice, Item, User


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ["desc", "quantity", "rate"]


class InvoiceSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True)

    class Meta:
        model = Invoice
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    invoices = InvoiceSerializer(many=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["name", "username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            name=validated_data["name"],
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Please provide the valid credentials")
