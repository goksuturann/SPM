from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, generics,permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.http import JsonResponse
from .serializers import ExtendedJobSerializer
from accounts.models import Employer, Employee
from accounts.serializers import EmployerSerializer
from .models import Job, Keyword
from django.forms.models import model_to_dict

import json
class JobViewSet(viewsets.ModelViewSet):
    serializer_class = ExtendedJobSerializer

    def get_queryset(self):
        if("employerId" in self.request.query_params):
            queryset = Job.objects.filter(employer = self.request.query_params.get("employerId"))
        else:
            queryset = Job.objects.all()
        return queryset

    @action(methods=['post'],detail=False,url_path="create-job",url_name="create-job")
    def perform_create(self, serializer):
        serialized_obj = {}
        this_employer = Employer.objects.get(user_id = self.request.data.get('employer_id'))

        new_job = Job.objects.create(employer = this_employer, company_name=this_employer.company,\
                job_title=self.request.data.get('job_title'), min_requirements=self.request.data.get('min_req'),\
                recommend_requirements=self.request.data.get('recommend_req'),salary=self.request.data.get('salary'),\
                offer_end_date=self.request.data.get('offer_end_date')      
        )
        keywords_array_request = self.request.data.get('keywords')
        keywords_array = []
        for x in range(len(keywords_array_request)):
            new_keyword = Keyword.objects.create(word=keywords_array_request[x])#keyword array returns list of strings
            new_job.keyword.add(new_keyword)
        
        serialized_obj["status"] = "Success"
        return JsonResponse(serialized_obj)

    @action(methods=['post'],detail=True, url_path="add-applicant", url_name="add-applicant")
    def add_applicant(self, request, pk=True):
        serialized_obj = {}
        job = Jobs.objects.get(id=pk)
        rbody = json.loads(request.body.decode('utf-8'))
        print(rbody)
        jsonUsersString = rbody["data"]["users"]
        usersJson = json.loads(jsonUsersString)
        usersArray = usersJson["userIds"]
        for x in range(len(usersArray)):
            job.applicants.add(Employee.objects.get(id__id = str(usersArray[x])))
        job.save()
        serialized_obj["status"] = "Success"
        return JsonResponse(serialized_obj)



# Create your views here.
