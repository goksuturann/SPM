from django.db import models
from accounts.models import Employee, Employer

# Create your models here.
class Keyword(models.Model):
    word = models.CharField("Word", max_length=30)

    def __str__(self):
        return self.word

class Job(models.Model):
    job_title = models.CharField("Job Title", max_length=300)
    min_requirements = models.CharField("Minimum Requirements", max_length=300)
    recommend_requirements = models.CharField("Recommended Requirements", max_length=300)
    salary = models.IntegerField("Salary")
    offer_end_date = models.DateField("Offer End Date" )
    company_name = models.CharField("Company", max_length=100)
    company_info = models.CharField("Company Info", max_length=300)
    applicants = models.ManyToManyField(Employee, related_name='jobs')
    employer = models.ForeignKey(Employer,related_name='jobs', on_delete = models.CASCADE)
    keyword = models.ManyToManyField(Keyword, related_name='jobs')

    def __str__(self):
        return self.job_title

