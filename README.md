Project DeLorean - GDG DevFest 2015
===========================

This project is a template for a dynamic web app for a chapter's GDG DevFest. 
It pulls data from the [Google+ API](https://developers.google.com/+/web/api/rest/), utilizes [Firebase](https://www.firebase.com/), and is written in [AngularJS](https://angularjs.org/).

## Prerequisites

Luckily the way this project is written, there is no need for any Angular programming skills to utilize this for your GDG chapter. However, you will need to be comfortable with running commands 
via the comand line.

1. You need a [Google Cloud](https://console.developers.google.com/project) project created for the Google+ API & Google Maps API as well as for Google App Engine (GAE) if you decide to host the DevFest site there for free.

    * After you create a project enable the following APIs:
    
      * Google+ API
      * Google Maps JavaScript API
      * Google Maps Geocoding API
    
    * Create an API key:
    
      * Select 'Browser' when asked the type
      * ~~Secure your API key with the URL where you plan to host the site~~
        * Currently this breaks ngMap, so leave off a referrer for the time being
    
    * If you plan to host on GAE, you will need the GAE SDK
    
      * The GAE SDK can be downloaded from [Google App Engine Downloads](https://developers.google.com/appengine/downloads) page.
      * This project uses the PHP SDK

2. Create a Firebase account, create a new app, and setup [Firebase auth](https://www.firebase.com/docs/web/guide/user-auth.html) for the logins

    * Enable "Email & Password Authentication" under "Login & Auth"
    * Set the following rules in "Security & Rules"
    
    ```
    {
      "rules": {
        ".read": true,
        ".write": "auth != null"
      }
    }
    ```

3. Install `yo`, `grunt`, `bower`, `generator-angularfire` and `generator-karma`

    Example:
    ```
    npm install -g generator-angularfire
    ```
    NOTE: Depending on setup, Mac users may need to use `sudo npm install -g [package name]` instead

## Usage

1. Fork this repository and then clone locally

2. Install `npm` and `bower` dependancies:

    ```
    cd DeLorean && npm install && bower install
    ```
    NOTE: Depending on setup, Mac users may need to use `sudo npm install` instead

3. Update the `app/scripts/config.js` file with:

    * GDG chapter details
    * Google API key
    * GDG DevFest details
    * GDG social account handles

4. Update the `app/index.html` file:

    * Add chapter specific details to meta tags in header
    * Add Google Analytics key on `line: 54`

5. Replace `app/images/background.jpg` with a large photo of your choice. (Your city skyline is always a good option)

6. Replace `app/images/gdg_group.png` with your chapter's logo.

7. Replace `app/images/devfest.png` with your chapter's DevFest logo.

8. Update `app/app.yaml` with your Google Cloud Application ID (if planning to host on GAE)

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma. (NOTE: not all tests have been updated/completed)

## Deploying

NOTE: The following deploy process has only been used with the GAE PHP SDK. Also still working on a better `grunt` process to automate this.

1. Create a directory called `deploy` within your main project folder. 
    This directory name has already been added to _.gitignore_ to keep repo size down

2. Create a directory within the one you just created called `app`. 
    Your path should now look like: `[your projects]/DeLorean/deploy/app`

3. Run `grunt build` to build your site into the `[your path]/DeLorean/dist` directory

4. Copy the files from the `dist` directory into the `app` directory you created in step 2

5. Copy the `app.yaml` file from the root project path

6. Open the GAE launcher, right-click and `Add Existing...` to import this project

7. Click the green run button to test the site using a local GAE

8. When ready, click the blue deploy button to upload your site to GAE, and now you have a DevFest site!
