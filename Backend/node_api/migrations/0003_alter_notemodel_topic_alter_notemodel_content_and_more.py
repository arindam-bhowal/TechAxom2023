# Generated by Django 4.0.3 on 2023-03-31 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('node_api', '0002_notemodel_topic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notemodel',
            name='Topic',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='notemodel',
            name='content',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='notemodel',
            name='copied',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='notemodel',
            name='snaped',
            field=models.ImageField(blank=True, upload_to='uploads/'),
        ),
        migrations.AlterField(
            model_name='notemodel',
            name='title',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='notemodel',
            name='url',
            field=models.CharField(max_length=255),
        ),
    ]
