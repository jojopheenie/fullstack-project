from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from intsureview_be.apps.api.serializers import UserSerializer, GroupSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

# bypassing cors and csrf errors for development purposes only
@csrf_exempt
def ProcessFormData(request):
    if request.method == "POST":
        body = json.loads(request.body)

        expected = set(['email', 'alive', 'amount','size','shiny','colorful','smellsGood','highOxygen'])
        got = set(body.keys())
        
        if not expected.issubset(got):
            print(expected.difference(got))
            return JsonResponse({"error": "Something is missing.",
                                            "success": ""})
        
        email = body["email"]
        alive = body["alive"]
        amount = body["amount"]
        size = body["size"]
        shiny = body["shiny"]
        colorful = body["colorful"]
        smellsGood = body["smellsGood"]
        highOxygen = body["highOxygen"]

        if email == None or email == "":
            return JsonResponse({"error": "Email cannot be empty.",
                                 "success": ""})
        elif alive == None:
            return JsonResponse({"error": "Alive required.",
                                 "success": ""})
        elif amount == None:
            return JsonResponse({"error": "Amount required.",
                                 "success": ""})
        elif size == None:
            return JsonResponse({"error": "Size required.",
                                 "success": ""})
        elif shiny == None:
            return JsonResponse({"error": "Shiny required.",
                                 "success": ""})
        elif colorful == None:
            return JsonResponse({"error": "Colorful required.",
                                 "success": ""})
        elif smellsGood == None:
            return JsonResponse({"error": "SmellsGood required.",
                                 "success": ""})
        elif highOxygen == None:
            return JsonResponse({"error": "High Oxygen required.",
                                 "success": ""})
        else:
            return JsonResponse({"error": "",
                                 "success": "Form submitted!"})
    else:
        return JsonResponse({"error": "POST requests only",
                             "success": ""})
