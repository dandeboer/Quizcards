# Generated by Django 3.0.4 on 2020-03-12 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flashcards', '0003_deck_cards'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deck',
            name='title',
            field=models.CharField(max_length=50),
        ),
    ]
