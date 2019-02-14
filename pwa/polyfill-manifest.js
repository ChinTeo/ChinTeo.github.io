(function(){

      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var manifestJson = JSON.parse(xhr.responseText);
        addTags(manifestJson);
      };

      var manifestEl = document.head.querySelector("link[rel=manifest]");
      if(!!manifestEl === true) {

        xhr.open("GET", manifestEl.href);
        xhr.send();
      }

      var addTags = function(manifest) {

        var webAppCapable = document.createElement("meta");
        var webAppTitle = document.createElement("meta");
        var webAppStartUrl = document.createElement("meta");
        webAppCapable.setAttribute("name", "apple-mobile-web-app-capable");
        var isWebAppCapable = (manifest['display'] == 'standalone' || manifest['display'] == 'fullscreen') ? 'yes' : 'no';
        webAppCapable.setAttribute("content", isWebAppCapable);
        webAppTitle.setAttribute("name", "apple-mobile-web-app-title");
        webAppTitle.setAttribute("content", manifest['short_name'] || manifest['name'] || "");

        webAppStartUrl.setAttribute("name", "msapplication-starturl");
        webAppStartUrl.setAttribute("content", manifest['start_url'] || location.href);

        // Parse the icons.

        var icons = manifest["icons"] || [];

        for(var iconIdx = 0; iconIdx < icons.length; iconIdx++) {
          var iconElement = document.createElement("link");
          var icon = icons[iconIdx];

          iconElement.setAttribute("rel", "apple-touch-icon");
          iconElement.setAttribute("href", icon.src);
          iconElement.setAttribute("sizes", icon.sizes);

          document.head.appendChild(iconElement);
        }
        document.head.appendChild(webAppCapable);
        document.head.appendChild(webAppTitle);
        document.head.appendChild(webAppStartUrl);
      }
    })();



    // This all simulates the start URL.
    (function() {
      var startUrlEl = document.querySelector("meta[name=msapplication-starturl]");
      if(!!startUrlEl === true && navigator.standalone === true) {
        var lastUrl = localStorage["navigate"];
        history.pushState({launched: (!!lastUrl == false && history.length === 1)}, undefined, lastUrl || startUrlEl.content);
        localStorage.removeItem("navigate");

        // Intercept all anchor clicks and keep fullscreen if in origin
        document.addEventListener("click", function(e) {
          var target = e.target;
          if(target.tagName === 'A') {

            var href = target.getAttribute("href");
            var linkedUrl = new URL(target.href);
            if(linkedUrl.origin === location.origin) {
              e.preventDefault();
              location.href = href;
            }
            else {
              // When we are navigating away store the state so we can resume.
              localStorage["navigate"] = location.href;
            }
          }
        });
      }
    })();
