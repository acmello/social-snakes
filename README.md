Social Snakes
=============
Snakes Facebook app. Have fun!!!


Pre-requisites for Development:
-------------------------------
- Mac OS<br>
- Git<br>

Project's Setup:
----------------
1) Create a folder `/projects/Social-Snakes/`<br>
2) Create a file `/projects/Social-Snakes/git-clone.sh` with contents:

    #!/bin/sh
    git clone git@github.com:acmello/social-snakes.git

3) In terminal, go to folder `/projects/Social-Snakes/` and run the script `git-clone.sh`. It will create the folder `/projects/Social-Snakes/social-snakes` with all project files inside.<br>

Apache's Setup:
---------------
1) Edit Apache's configuration file `/etc/apache2/httpd.conf` adding at the end the following:<br>

    Alias /social-snakes /projects/Social-Snakes/social-snakes/
    <Directory "/projects/Social-Snakes/social-snakes/">
        <IfModule mime_module>
            AddType text/html .aspx
        </IfModule><br>
        DirectoryIndex default.aspx
        Allow from all
    </Directory>

2) Start (or restart) Apache with the command: `sudo apachectl graceful`<br>
3) Test in your browser the location: `http://localhost/social-snakes/`<br>

Facebooks's Setup:
------------------
1) You must be an authorized app's collaborator.<br>
2) Test in your browser the location (note it's non secure http; only for development and testing purposes it's NOT https): `http://apps.facebook.com/social-snakes`<br>

Local Personal .git/config File Template:
-----------------------------------------
    
    [core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
    [remote "origin"]
        fetch = +refs/heads/*:refs/remotes/origin/*
        # url = git@github.com:acmello/social-snakes.git
        url = https://github.com/acmello/social-snakes.git
    [branch "master"]
        remote = origin
        merge = refs/heads/master
    [user]
        name = user
        email = user@somewhere

<br>
### See also:<br>
https://developers.facebook.com/docs/guides/games/getting-started/<br>
https://developers.facebook.com/docs/appsonfacebook/tutorial/<br>
http://audio.online-convert.com/convert-to-ogg<br>
