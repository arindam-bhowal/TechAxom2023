# Generated by Django 4.0.3 on 2023-03-31 11:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('node_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notemodel',
            name='Topic',
            field=models.CharField(default='NULL', max_length=255),
        ),
    ]
