from rest_framework import serializers
from .models import Subscription


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['id', 'service_name', 'monthly_cost', 'billing_date', 'is_active', 'category', 'created_at']
        read_only_fields = ['id', 'created_at']
