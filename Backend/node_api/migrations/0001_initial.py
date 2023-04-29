# Generated by Django 4.0.3 on 2023-03-31 11:28

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='NoteModel',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('url', models.CharField(max_length=255, unique=True)),
                ('title', models.CharField(max_length=255, unique=True)),
                ('content', models.TextField()),
                ('copied', models.TextField()),
                ('snaped', models.ImageField(upload_to='uploads/')),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'notes',
                'ordering': ['-createdAt'],
            },
        ),
    ]
