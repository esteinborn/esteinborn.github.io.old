 // Roland Yonaba - 2012
 // Base code (http://aboutcode.net/2010/11/11/list-github-projects-using-javascript.html)
 // Fix for compatibility with Github API v3 (http://developer.github.com/v3/)
 // Fix getJSOn link request for compatibility with Github API v3 (thanks to MJoyce : http://stackoverflow.com/questions/11850527/use-javascript-to-get-the-list-of-a-users-github-repositories)


    jQuery.githubUser = function(username, callback) {
    jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback);
    };

    jQuery.fn.loadRepositories = function(username) {
      this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");

      var target = this;
      $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        sortByStars(repos);

        var list = "";
        target.empty().append(list);
        $(repos).each(function() {
          if (this.name != (username.toLowerCase()+'.github.com')) {
            list += '<div data-repo="' + this.full_name + '" class="github-box-wrap"></div>';
          }
        });
        target.html(list);
        // Run the GitHub wrapper plugin.
        $('[data-repo]').github();
      });

      function sortByName(repos) {
        repos.sort(function(a,b) {
          return a.name - b.name;
        });
      }

      function sortByStars(repos) {
        repos.sort(function(a,b) {
          return b.watchers - a.watchers;
        });
      }
    };