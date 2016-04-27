/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function (document) {
    'use strict';

    // Grab a reference to our auto-binding template
    // and give it some initial binding values
    // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
    var app = document.querySelector('#app');

    // Sets app default base URL
    app.baseUrl = '/';
    app.allExcercises = [];
    app.postData = {};
    app.activeExcercises = [
    ];
    app.method = "get";
    app.newExcercise = "";
    app.newExcerciseBpm = 0;
    app.today = new Date();
    app.today.setHours(0, 0, 0, 0);
    //add a new excercise
    app.addExcercise = (event) => {
        // alert("add excercise!");
        let modal = document.getElementById("addExcerciseModal");
        modal.open();
    };

    app.addExcerciseClosed = (event) => {
        if (event.detail.confirmed) {
            //make a new excercise
            let newExcercise = { "name": app.newExcercise, "bpm": app.newExcerciseBpm };
            app.allExcercises.push(newExcercise);
            app.activeExcercises = app.remainingExcercisesForDate(app.allExcercises, app.today);

            //call api to persist
            app.postData = { "user": "Feiyang Chen", "excercise": newExcercise };
            app.method = "put";
            app.$.ajaxHandler.generateRequest();
        }

        //clear input
        app.newExcercise = "";
        app.newExcerciseBpm = 0;
    };

    //app.dataUrl = "api";
    app.dataUrl = "http://localhost:3030/api";
    app.excerciseUpdatedUrl = app.dataUrl + "/update";
    app.excerciseCompletedUrl = app.dataUrl + "/complete";

    app.handleResponse = (event) => {
      //  app.today = new Date(event.detail.response.today);
        app.allExcercises = event.detail.response.excercises;
        app.activeExcercises = app.remainingExcercisesForDate(app.allExcercises, app.today);
        app.todayDisplay = (app.today.getMonth() + 1) + "-" + app.today.getDate() + "-" + app.today.getFullYear()
    };

    app.remainingExcercisesForDate = (excercises, date) => {
        let remaining = excercises.filter((excercise) => {
            if (excercise.history && excercise.history.length > 0) {
                let LastExcercise = new Date(excercise.history[excercise.history.length - 1].date);
                return !(LastExcercise.getTime() === date.getTime());
            }

            return true;
        })

        //return excercises;
        return remaining;
    }

    window.addEventListener("excerciseCompleted", (event) => {
        var excercise = findExcerciseById(event.detail.id, app.activeExcercises);

        if (excercise) {
            excercise.history = excercise.history || [];
            excercise.history.push({ "date": app.today });
        }

        app.postData = { "user": "Feiyang Chen", "id": event.detail.id, "date": app.today };
        app.$.ajaxHandler_excerciseCompleted.generateRequest();

        app.activeExcercises = app.remainingExcercisesForDate(app.allExcercises, app.today);
    });

    window.addEventListener("excerciseUpdated", (event) => {
        let excercise = findExcerciseById(event.detail.id, app.activeExcercises);

        app.postData = { "user": "Feiyang Chen", "excercise": excercise };
        app.$.ajaxHandler_excerciseUpdated.generateRequest();
    });

    function findExcerciseById(id, excercises) {
        var match;

        for (let i = 0, l = excercises && excercises.length; i < l; i++) {
            if (excercises[i].id === id) {
                match = excercises[i];
            }
        }

        return match;
    }


    if (window.location.port === '') {  // if production
        // Uncomment app.baseURL below and
        // set app.baseURL to '/your-pathname/' if running from folder in production
        // app.baseUrl = '/polymer-starter-kit/';
    }

    app.displayInstalledToast = function () {
        // Check to make sure caching is actually enabled—it won't be in the dev environment.
        if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
            Polymer.dom(document).querySelector('#caching-complete').show();
        }
    };

    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    app.addEventListener('dom-change', function () {
        console.log('Our app is ready to rock!');
        this.$.ajaxHandler.generateRequest();
    });

    // See https://github.com/Polymer/polymer/issues/1381
    window.addEventListener('WebComponentsReady', function () {
        // imports are loaded and elements have been registered
    });

    // Main area's paper-scroll-header-panel custom condensing transformation of
    // the appName in the middle-container and the bottom title in the bottom-container.
    // The appName is moved to top and shrunk on condensing. The bottom sub title
    // is shrunk to nothing on condensing.
    window.addEventListener('paper-header-transform', function (e) {
        //     var appName = Polymer.dom(document).querySelector('#mainToolbar .app-name');
        //     var middleContainer = Polymer.dom(document).querySelector('#mainToolbar .middle-container');
        //     var bottomContainer = Polymer.dom(document).querySelector('#mainToolbar .bottom-container');
        //     var detail = e.detail;
        //     var heightDiff = detail.height - detail.condensedHeight;
        //     var yRatio = Math.min(1, detail.y / heightDiff);
        //     // appName max size when condensed. The smaller the number the smaller the condensed size.
        //     var maxMiddleScale = 0.50;
        //     var auxHeight = heightDiff - detail.y;
        //     var auxScale = heightDiff / (1 - maxMiddleScale);
        //     var scaleMiddle = Math.max(maxMiddleScale, auxHeight / auxScale + maxMiddleScale);
        //     var scaleBottom = 1 - yRatio;
        // 
        //     // Move/translate middleContainer
        //     Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);
        // 
        //     // Scale bottomContainer and bottom sub title to nothing and back
        //     Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);
        // 
        //     // Scale middleContainer appName
        //     Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
    });

    // Scroll page to top and expand header
    app.scrollPageToTop = function () {
        //   app.$.headerPanelMain.scrollToTop(true);
    };

    app.closeDrawer = function () {
        // app.$.paperDrawerPanel.closeDrawer();
    };

})(document);
