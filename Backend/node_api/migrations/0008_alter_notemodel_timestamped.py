# Generated by Django 4.0.3 on 2023-03-31 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('node_api', '0007_rename_timestamp_notemodel_timestamped'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notemodel',
            name='timestamped',
            field=models.CharField(blank=True, default=0, max_length=255, null=True),
        ),
    ]
