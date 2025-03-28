# Generated by Django 5.1.3 on 2024-12-05 03:23

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sprint_8', '0012_rename_new_iban_auditoria_cuenta_new_cbu_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='empleado',
            name='usuario',
        ),
        migrations.AddField(
            model_name='empleado',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='empleado', to=settings.AUTH_USER_MODEL),
        ),
        migrations.RemoveField(
            model_name='empleado',
            name='branch',
        ),
        migrations.AddField(
            model_name='empleado',
            name='branch',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='sprint_8.sucursal'),
            preserve_default=False,
        ),
    ]
