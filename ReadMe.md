Readme.Txt:
===========


IMPORTANT : PLEASE BE SURE TO READ THIS ENTIRE DOCUMENT, AS IT DESCRIBES THE FORMAT AND REQUIREMENTS OF THE SAMPLE CODE
DOWNLOAD ZIP ARCHIVES.


0. Table of Contents
=================================================================================================================

0. Table of Contents
1. Introduction
2. Installation/Upgrade Instruction


SpeechToSign.ZIP
    |
    --backend
        |
        -- Application
           |
           --__init__.py
           --_pycache_
           -- admin.py
           -- apps.py
           -- forms.py
           -- migrations
           -- models.py
           -- tests.py
           -- urls.py
           -- views.py
        -- SpeechToSign
        -- SpeechToText
        -- TextProcessor
        -- TextToSign

      -- manage.py
      -- requirements.Txt
      -- runtime.Txt

   |
   --frontend
        |
        --assests
        --design
        --dist
        --public
        --src
        --node_modules
        --packag-lock.json
        --package.json
        --webpack.config.js


1. Introduction
===============================================================================================================================================================
Thank you downloading SpeechToSign.zip from https://github.com/daas-ankur-shukla/SpeechToSign. This version is the first of its kind.

At this point of development, we need your help with testing , bug report and feature discussion, feel free to provide your feedback to work.ankurshukla@gmail.com
and bneogy92@gmail.com.

SpeechToSign should run on any python versiona above 3.5.x.
However, this release has only been tested on the following :

on the following databases:
    - postgreSQL 7.3

on the following OS:
    - Windows 10
    - macOS High-Sierra

Developed by
- Ankur Shukla <work.ankurshukla@gmail.com>
- Bodhisattwa Neogy <bneogy92@gmail.com>


2. Installation/Upgrade Instruction
============================================================================================================================================================
For rendering the frontend :

 - Install npm (Node package manage)
 - Copy subscriptionKey.js file to src folder of frontend
 - Move to frontend folder and execute "npm install" on command-line.
 - Execute webpack
 - Install webpack-dev-server by "npm install webpack-dev-server" on command-line/terminal.
 - Move to the webpack.config.js file in frontend folder and change the value of backend API variable to your corresponding localhost IP.
 - Finally, invoke the frontend by "npm run dev" on command-line/terminal(while being in the frontend folder)

For starting the backend :

 - Install django and postgres
 - requirements.txt file contains all the installable dependencies. Make sure you have the correct version of each dependencies installed on the client system.
 - install all the depencies in requirements.txt by "pip3 install -r requirements.txt" while being in the backend folder
 - Obtain the essential google application credentials file by activating the Google Natural Language API.
 - Make sure credentials.json file is present in your system.
 - Copy subscriptionkeys.py file to the SpeechToSign folder in the backend.
 - In the subscriptionkeys.py file, replace the JSONPath with the full path to the credentials.json file
 - Open PostgreSQL and create a database "app_data" and a corresponding role in it.
 - In settings.py file of SpeechToSign folder move to the DATABASES part and list down the appropiate configuration details.
     'NAME': "app_data", 'USER' : Role you created on postgres ,'PASSWORD': Password corresponding to the created Role.
 - Finally, invoke the backend web server by "python3 manage.py runserver".


================================================================================================================================================================

Cheers!

Ankur Shukla
Bodhisattwa Neogy
