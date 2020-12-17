from rest_framework import serializers
from .models import Job, Keyword
from accounts.models import Employer, Employee

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class KeywordSerializer(serializers.ModelSerializer):
    jobs = JobSerializer(many=True)
    class Meta:
        model = Keyword
        fields = '__all__'

class ExtendedJobSerializer(serializers.ModelSerializer):
    keywords = KeywordSerializer(many=True, required=False)

    class Meta:
        model = Job
        fields = '__all__'

"""    def create(self, validated_data):
        this_employer = Employer.objects.get(id = validated_data.pop('id'))
        keywords_array = validated_data.pop('keywords')
        for element in keywords_array:
            key
        
        job = Job.objects.create(employer=this_employer, job_title=validated_data.pop('job_title'), min_requirements=validated_data.pop('min_requirements'), recommend_requirements=validated_data.pop('recommend_requirements'), salary=validated_data.pop('salary'), offer_end_date
=validated_data.pop('offer_end_date'), keywords=validated_data.pop('keywords') )"""
