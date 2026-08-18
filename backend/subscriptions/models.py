from django.db import models
from django.conf import settings


class Subscription(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="subscriptions")
    service_name = models.CharField(max_length=120)
    monthly_cost = models.DecimalField(max_digits=8, decimal_places=2)
    billing_date = models.PositiveSmallIntegerField(help_text="Day of month the charge occurs, 1–31")
    is_active = models.BooleanField(default=True)
    category = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["billing_date"]
