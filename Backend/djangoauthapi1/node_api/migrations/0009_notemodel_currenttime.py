# Generated by Django 4.0.3 on 2023-03-31 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('node_api', '0008_alter_notemodel_timestamped'),
    ]

    operations = [
        migrations.AddField(
            model_name='notemodel',
            name='currentTime',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
