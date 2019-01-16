# -*- coding: utf-8 -*-
from rest_framework import views, status
import json
from rest_framework.response import Response
from rest_framework import  status
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
import sendgrid
from sendgrid.helpers.mail import Email, Content, Mail, Attachment



class EmailView(views.APIView):

    def post(self, request, format=None):
        data = json.loads(request.body)
        lesson = data['lesson']
        account = data['account']
        print("lesson : %s"%lesson)
        print("account : %s"%account['email'])
        mail = EmailMultiAlternatives(
            subject="Your Subject",
            body="This is a simple text email body.",
            from_email="laurent.falleri@gmail.com",
            to=["laurentfall@hotmail.fr"],
            headers={"Reply-To": "laurentfall@hotmail.fr"}
        )
        # Add template
        mail.template_id = 'f6581133-5c0b-4cc1-9a86-96a8bcd0db06'

        # Replace substitutions in sendgrid template
        mail.substitutions = {'%type%': 'Hatha',
                              '%date%': 'mercredi 28 juin',
                              '%heure%': '11h30'}


        # Add categories
        mail.categories = [
            'confirmation',
        ]

        mail.send()
        return Response({
            'status': 'OK',
            'message': 'Email sent'
        }, status=status.HTTP_200_OK)


class ContactEmailView(views.APIView):

    def post(self, request, format=None):
        data = json.loads(request.body)

        name = data['name']
        email = data['email']
        tel = data['tel']
        message = data['message']

        subject = "Demande de contact"
        message_content = """
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html>
            <head>
            <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
            <title>Demande de contact 2</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
            </head>
            <p style="font-family : Montserrat;font-size:130%%;">
               CafeAum,<br>
               %s (email : %s / tel : %s) a laissé une demande de contact. Son message :<br>
               "%s"
               <br><br>
               Merci de lui répondre dans les meilleurs délais.
               <br>
            </p>
            </html>
        """%(name, email, tel, '<br>'.join(message.splitlines()))
        
        sg = sendgrid.SendGridAPIClient(apikey="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")

        from_email = Email("contact@cafe-aum.fr")
        to_email = Email("contact@cafe-aum.fr")
        content = Content("text/html", content)
        mail = Mail(from_email, subject, to_email, content)

        response = sg.client.mail.send.post(request_body=mail.get())

        if (response.status_code >= 200) and (response.status_code < 300):
            return Response({
                'status': 'OK',
                'message': 'Email sent'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'status': 'KO',
                'message': 'Error'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
